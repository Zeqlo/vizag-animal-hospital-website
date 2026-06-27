import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('subscribedAt', { ascending: false })
      if (error) throw error
      const subs = (data || []).map(row => ({
        id: row.id,
        email: row.email,
        subscribedAt: row.subscribedAt,
      }))
      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json(subs)
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const { email } = body

      if (!email) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Missing required field: email' })
      }

      // Use upsert to avoid duplicates (email has unique constraint)
      const { data, error } = await supabase
        .from('subscribers')
        .upsert({ email }, { onConflict: 'email' })
        .select()
        .single()

      if (error) throw error

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json({
        id: data.id,
        email: data.email,
        subscribedAt: data.subscribedAt,
      })
    }

    if (req.method === 'DELETE') {
      const id = parseInt(req.query.id, 10)
      if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Invalid or missing id query parameter' })
      }

      const { error } = await supabase
        .from('subscribers')
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
    console.error('[api/subscribers] Error:', message)
    res.setHeader('Content-Type', 'application/json')
    return res.status(500).json({ error: 'Internal server error', debug: message })
  }
}