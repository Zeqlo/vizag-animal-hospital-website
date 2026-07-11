import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { category, search } = req.query

      // Supabase caps queries at 1000 rows by default, so we paginate
      const PAGE_SIZE = 1000
      let allData = []
      let offset = 0
      let hasMore = true

      while (hasMore) {
        let query = supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true })
          .range(offset, offset + PAGE_SIZE - 1)

        if (category && category !== 'All') {
          query = query.eq('category', category)
        }

        if (search) {
          query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%`)
        }

        const { data, error } = await query

        if (error) throw error

        allData = allData.concat(data || [])
        hasMore = (data || []).length === PAGE_SIZE
        offset += PAGE_SIZE
      }

      const items = allData.map(row => ({
        id: row.id,
        name: row.name,
        category: row.category,
        price: Number(row.price),
        image: row.image,
        description: row.description,
      }))

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json({ items, total: items.length })
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const { name, category, price, image, description } = body

      if (!name || !category) {
        res.setHeader('Content-Type', 'application/json')
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

      res.setHeader('Content-Type', 'application/json')
      return res.status(201).json({
        id: data.id,
        name: data.name,
        category: data.category,
        price: Number(data.price),
        image: data.image,
        description: data.description,
      })
    }

    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const id = body.id || req.query.id

      if (!id) {
        res.setHeader('Content-Type', 'application/json')
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

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json({
        id: data.id,
        name: data.name,
        category: data.category,
        price: Number(data.price),
        image: data.image,
        description: data.description,
      })
    }

    if (req.method === 'DELETE') {
      const id = req.query.id
      if (!id) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Missing id query parameter' })
      }

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json({ success: true, id: Number(id) })
    }

    res.setHeader('Content-Type', 'application/json')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[api/products] Error:', message)
    res.setHeader('Content-Type', 'application/json')
    return res.status(500).json({ error: 'Internal server error', debug: message })
  }
}