import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('id', { ascending: true })
      if (error) throw error
      // Map DB columns to camelCase for frontend
      const items = (data || []).map(row => ({
        id: row.id,
        title: row.title,
        category: row.category,
        image: row.image,
        youtubeUrl: row.youtubeUrl || undefined,
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

    if (req.method === 'DELETE') {
      const id = req.query.id
      if (!id) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Missing id query parameter' })
      }

      const { error } = await supabase
        .from('gallery')
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
    console.error('[api/gallery] Error:', message)
    res.setHeader('Content-Type', 'application/json')
    return res.status(500).json({ error: 'Internal server error', debug: message })
  }
}