import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      const posts = (data || []).map(row => ({
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt || '',
        content: row.content,
        category: row.category,
        readTime: row.readTime,
        image: row.image || '',
        youtubeUrl: row.youtubeUrl || undefined,
      }))
      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json(posts)
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const { slug, title, excerpt, content, category, readTime, image, youtubeUrl } = body

      if (!slug || !title || !content) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Missing required fields: slug, title, content' })
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .upsert({
          slug,
          title,
          excerpt: excerpt || title,
          content,
          category: category || 'General',
          readTime: readTime || '5 min read',
          image: image || '',
          youtubeUrl: youtubeUrl || null,
        })
        .select()
        .single()

      if (error) throw error

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json({
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || '',
        content: data.content,
        category: data.category,
        readTime: data.readTime,
        image: data.image || '',
        youtubeUrl: data.youtubeUrl || undefined,
      })
    }

    if (req.method === 'DELETE') {
      const slug = req.query.slug
      if (!slug) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Missing slug query parameter' })
      }

      const { error } = await supabase
        .from('blog_posts')
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
    console.error('[api/blog-posts] Error:', message)
    res.setHeader('Content-Type', 'application/json')
    return res.status(500).json({ error: 'Internal server error', debug: message })
  }
}