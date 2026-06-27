import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('team')
        .select('*')
        .order('created_at', { ascending: true })
      if (error) throw error
      const members = (data || []).map(row => ({
        id: row.id,
        name: row.name,
        qualifications: row.qualifications || '',
        specialization: row.specialization,
        bio: row.bio || '',
        image: row.image || '',
        role: row.role,
      }))
      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json(members)
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const { id, name, qualifications, specialization, bio, image, role } = body

      if (!name || !specialization || !role) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Missing required fields: name, specialization, role' })
      }

      const memberId = id || slugify(name)

      const { data, error } = await supabase
        .from('team')
        .upsert({
          id: memberId,
          name,
          qualifications: qualifications || '',
          specialization,
          bio: bio || '',
          image: image || '',
          role,
        })
        .select()
        .single()

      if (error) throw error

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json({
        id: data.id,
        name: data.name,
        qualifications: data.qualifications || '',
        specialization: data.specialization,
        bio: data.bio || '',
        image: data.image || '',
        role: data.role,
      })
    }

    if (req.method === 'DELETE') {
      const id = req.query.id
      if (!id) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Missing id query parameter' })
      }

      const { error } = await supabase
        .from('team')
        .delete()
        .eq('id', id)

      if (error) throw error

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json({ success: true, id })
    }

    res.setHeader('Content-Type', 'application/json')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[api/team] Error:', message)
    res.setHeader('Content-Type', 'application/json')
    return res.status(500).json({ error: 'Internal server error', debug: message })
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}