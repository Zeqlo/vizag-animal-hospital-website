import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true })
      if (error) throw error
      const services = (data || []).map(row => ({
        slug: row.slug,
        title: row.title,
        shortDescription: row.shortDescription || '',
        longDescription: row.longDescription || '',
        icon: row.icon || 'Stethoscope',
        features: row.features || [],
        category: row.category,
        featured: row.featured || false,
        comingSoon: row.comingSoon || undefined,
      }))
      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json(services)
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const { title, slug, shortDescription, longDescription, icon, features, category, featured, comingSoon } = body

      if (!title || !slug || !category) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Missing required fields: title, slug, category' })
      }

      const { data, error } = await supabase
        .from('services')
        .upsert({
          slug,
          title,
          shortDescription: shortDescription || '',
          longDescription: longDescription || '',
          icon: icon || 'Stethoscope',
          features: Array.isArray(features) ? features : [],
          category,
          featured: featured || false,
          comingSoon: comingSoon || false,
        })
        .select()
        .single()

      if (error) throw error

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json({
        slug: data.slug,
        title: data.title,
        shortDescription: data.shortDescription || '',
        longDescription: data.longDescription || '',
        icon: data.icon || 'Stethoscope',
        features: data.features || [],
        category: data.category,
        featured: data.featured || false,
        comingSoon: data.comingSoon || undefined,
      })
    }

    if (req.method === 'DELETE') {
      const slug = req.query.slug
      if (!slug) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Missing slug query parameter' })
      }

      const { error } = await supabase
        .from('services')
        .delete()
        .eq('slug', slug)

      if (error) throw error

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json({ success: true, slug })
    }

    res.setHeader('Content-Type', 'application/json')
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[api/services] Error:', message)
    res.setHeader('Content-Type', 'application/json')
    return res.status(500).json({ error: 'Internal server error', debug: message })
  }
}