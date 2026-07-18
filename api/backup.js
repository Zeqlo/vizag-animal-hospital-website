import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// Paginated backup endpoint: /api/backup?page=0
// Returns 50 products per page WITH full image data.
// Fetch each page separately to avoid Vercel's 5-minute function timeout.
// Page 0 = products 0-49, page 1 = products 50-99, etc.
// Returns { page, totalPages, totalProducts, products: [...] }

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const page = parseInt(req.query.page || '0', 10)
    const PER_PAGE = 50

    // Step 1: Get the IDs for this page (metadata only, fast)
    let lastId = 0
    for (let p = 0; p < page; p++) {
      const { data } = await supabase
        .from('products')
        .select('id')
        .gt('id', lastId)
        .order('id', { ascending: true })
        .range(0, PER_PAGE - 1)
      if (!data || data.length === 0) {
        return res.status(200).json({ page, products: [], totalPages: 0, totalProducts: 0, done: true })
      }
      lastId = data[data.length - 1].id
    }

    // Get IDs for THIS page
    const { data: pageIds, error: idsError } = await supabase
      .from('products')
      .select('id')
      .gt('id', lastId)
      .order('id', { ascending: true })
      .range(0, PER_PAGE - 1)

    if (idsError) throw idsError

    if (!pageIds || pageIds.length === 0) {
      return res.status(200).json({ page, products: [], totalPages: page, done: true })
    }

    const ids = pageIds.map(r => r.id)

    // Step 2: Fetch full data for these IDs — one at a time to avoid timeout.
    // Each single-product query is fast (under 7s even for 4MB images).
    const products = []
    for (const id of ids) {
      const { data, error } = await supabase
        .from('products')
        .select('id,name,category,price,image,description,deleted_at')
        .eq('id', id)
        .single()

      if (error) {
        products.push({ id, _error: error.message, name: '', category: '', price: 0, image: '', description: '', deleted_at: null })
      } else {
        products.push(data)
      }
    }

    // Check if there are more pages
    const nextLastId = ids[ids.length - 1]
    const { data: checkMore } = await supabase
      .from('products')
      .select('id')
      .gt('id', nextLastId)
      .range(0, 0)

    const hasMore = (checkMore || []).length > 0

    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({
      page,
      products,
      hasMore,
      count: products.length,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err)
    console.error('[api/backup] Error:', message)
    return res.status(500).json({ error: 'Backup page failed', debug: message })
  }
}