import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// Auto-purge items soft-deleted more than 30 days ago. Runs silently.
async function autoPurge() {
  try {
    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    await supabase
      .from('gallery')
      .delete()
      .lt('deleted_at', cutoff)
  } catch {
    /* ignore - column may not exist yet */
  }
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { trash } = req.query

      // Auto-purge expired soft-deleted items
      await autoPurge()

      let query = supabase.from('gallery').select('*')

      if (trash === 'true') {
        query = query.not('deleted_at', 'is', null).order('deleted_at', { ascending: false })
      } else {
        query = query.is('deleted_at', null).order('id', { ascending: true })
      }

      const { data, error } = await query
      if (error) throw error

      const items = (data || []).map(row => ({
        id: row.id,
        title: row.title,
        category: row.category,
        image: row.image,
        youtubeUrl: row.youtubeUrl || undefined,
        deletedAt: row.deleted_at || undefined,
      }))
      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json(items)
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const { title, category, image, youtubeUrl } = body

      if (!title || !category || !image) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Missing required fields: title, category, image' })
      }

      const { data, error } = await supabase
        .from('gallery')
        .insert({
          title,
          category,
          image,
          youtubeUrl: youtubeUrl || null,
        })
        .select()
        .single()

      if (error) throw error

      res.setHeader('Content-Type', 'application/json')
      return res.status(201).json({
        id: data.id,
        title: data.title,
        category: data.category,
        image: data.image,
        youtubeUrl: data.youtubeUrl || undefined,
      })
    }

    if (req.method === 'PUT') {
      // Restore: PUT ?restore=<id>
      const restoreId = req.query.restore
      if (restoreId) {
        const { error } = await supabase
          .from('gallery')
          .update({ deleted_at: null })
          .eq('id', restoreId)

        if (error) throw error

        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({ success: true, id: Number(restoreId) })
      }

      res.setHeader('Content-Type', 'application/json')
      return res.status(400).json({ error: 'Missing restore query parameter' })
    }

    if (req.method === 'DELETE') {
      const id = req.query.id
      const permanent = req.query.permanent === 'true'

      if (!id) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Missing id query parameter' })
      }

      if (permanent) {
        // Hard delete
        const { error } = await supabase
          .from('gallery')
          .delete()
          .eq('id', id)

        if (error) throw error

        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({ success: true, id: Number(id) })
      }

      // Soft delete - try to set deleted_at; fall back to hard delete if column missing
      const { error: softError } = await supabase
        .from('gallery')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id)

      if (softError) {
        // Fallback: hard delete
        const { error: hardError } = await supabase
          .from('gallery')
          .delete()
          .eq('id', id)

        if (hardError) throw hardError
      }

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json({ success: true, id: Number(id) })
    }

    res.setHeader('Content-Type', 'application/json')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[api/gallery] Error:', message)
    res.setHeader('Content-Type', 'application/json')
    return res.status(500).json({ error: 'Internal server error', debug: message })
  }
}