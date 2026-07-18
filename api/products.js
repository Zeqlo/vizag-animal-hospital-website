import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  try {
    // ── Single-product image endpoint ──────────────────────────────
    // GET /api/products?id=123  →  { id, image, description }
    // Returns one product's heavy columns (image, description) only.
    // The frontend lazy-loads these per-card via IntersectionObserver so
    // the initial product list (metadata only) is fast.
    if (req.method === 'GET' && req.query.id) {
      const id = Number(req.query.id)
      if (!id) {
        return res.status(400).json({ error: 'Invalid id' })
      }
      const { data, error } = await supabase
        .from('products')
        .select('id,image,description')
        .eq('id', id)
        .single()

      if (error) throw error

      return res.status(200).json({
        id: data.id,
        image: data.image || '',
        description: data.description || '',
      })
    }

    // ── Trash endpoint (admin only) ────────────────────────────────
    if (req.method === 'GET' && req.query.trash === 'true') {
      const { data, error } = await supabase
        .from('products')
        .select('id,name,category,price,image,description,deleted_at')
        .not('deleted_at', 'is', null)
        .order('deleted_at', { ascending: false })

      if (error) throw error

      const items = (data || []).map(row => ({
        id: row.id,
        name: row.name,
        category: row.category,
        price: Number(row.price),
        image: row.image,
        description: row.description,
        deletedAt: row.deleted_at || undefined,
      }))

      return res.status(200).json({ items, total: items.length })
    }

    // ── Main product list (metadata only — NO image data) ─────────
    // Images are stored as large base64 strings in the `image` column
    // (some are 4 MB each, totalling 126 MB across 1813 products).
    // Selecting `image` in the list query causes Supabase free-tier
    // statement timeouts (PostgreSQL 57014). Instead we return only
    // lightweight metadata here and the frontend fetches each image
    // lazily via GET /api/products?id=<id>.
    if (req.method === 'GET') {
      const { category, search } = req.query

      // Cursor-based pagination on the primary key — fast regardless of
      // table size. We do NOT filter .is('deleted_at', null) in SQL
      // (no index on that column → seq scan → timeout). We filter in JS.
      const PAGE_SIZE = 1000
      let allMeta = []
      let lastId = 0
      let hasMore = true

      while (hasMore) {
        let query = supabase
          .from('products')
          .select('id,name,category,price,image,description,deleted_at')
          .gt('id', lastId)
          .order('id', { ascending: true })
          .range(0, PAGE_SIZE - 1)

        if (category && category !== 'All') {
          query = query.eq('category', category)
        }

        if (search) {
          query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%`)
        }

        const { data: pageData, error: pageError } = await query
        if (pageError) throw pageError

        allMeta = allMeta.concat(pageData || [])
        hasMore = (pageData || []).length === PAGE_SIZE
        if (hasMore) {
          lastId = pageData[pageData.length - 1].id
        }
      }

      // Filter out soft-deleted items in JS (only ~3 at any time)
      const items = allMeta
        .filter(row => !row.deleted_at)
        .map(row => ({
          id: row.id,
          name: row.name,
          category: row.category,
          price: Number(row.price),
          image: row.image || '',
          description: row.description || '',
        }))

      return res.status(200).json({ items, total: items.length })
    }

    // ── Create ─────────────────────────────────────────────────────
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const { name, category, price, image, description } = body

      if (!name || !category) {
        return res.status(400).json({ error: 'Missing required fields: name, category' })
      }

      const { data, error } = await supabase
        .from('products')
        .insert({
          name,
          category,
          price: price || 0,
          image: image || '',
          description: description || '',
        })
        .select()
        .single()

      if (error) throw error

      return res.status(201).json({
        id: data.id,
        name: data.name,
        category: data.category,
        price: Number(data.price),
        image: data.image,
        description: data.description,
      })
    }

    // ── Update / Restore ───────────────────────────────────────────
    if (req.method === 'PUT') {
      const restoreId = req.query.restore
      if (restoreId) {
        const { error } = await supabase
          .from('products')
          .update({ deleted_at: null })
          .eq('id', restoreId)
        if (error) throw error
        return res.status(200).json({ success: true, id: Number(restoreId) })
      }

      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const id = body.id || req.query.id
      if (!id) {
        return res.status(400).json({ error: 'Missing product id' })
      }

      const updateFields = {}
      if (body.name !== undefined) updateFields.name = body.name
      if (body.category !== undefined) updateFields.category = body.category
      if (body.price !== undefined) updateFields.price = body.price
      if (body.image !== undefined) updateFields.image = body.image
      if (body.description !== undefined) updateFields.description = body.description

      const { data, error } = await supabase
        .from('products')
        .update(updateFields)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return res.status(200).json({
        id: data.id,
        name: data.name,
        category: data.category,
        price: Number(data.price),
        image: data.image,
        description: data.description,
      })
    }

    // ── Delete ─────────────────────────────────────────────────────
    if (req.method === 'DELETE') {
      const id = req.query.id
      const permanent = req.query.permanent === 'true'
      if (!id) {
        return res.status(400).json({ error: 'Missing id query parameter' })
      }

      if (permanent) {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id)
        if (error) throw error
        return res.status(200).json({ success: true, id: Number(id) })
      }

      // Soft delete — fall back to hard delete if column missing
      const { error: softError } = await supabase
        .from('products')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id)

      if (softError) {
        const { error: hardError } = await supabase
          .from('products')
          .delete()
          .eq('id', id)
        if (hardError) throw hardError
      }

      return res.status(200).json({ success: true, id: Number(id) })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    const message = err instanceof Error ? err.message : (typeof err === 'object' ? JSON.stringify(err) : 'Unknown error')
    console.error('[api/products] Error:', message)
    return res.status(500).json({ error: 'Internal server error', debug: message })
  }
}