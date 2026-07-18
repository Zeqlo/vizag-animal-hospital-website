import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// Migration endpoint: /api/migrate-images?page=0
// Migrates base64 images to Supabase Storage and replaces the `image`
// column with the resulting public URL.
//
// Processes 5 products per page to stay within the Vercel function timeout.
// Only processes products whose `image` column contains base64 data
// (starts with "data:"). URL-based images are left as-is.
//
// Returns: { page, migrated, skipped, failed, hasMore, details: [...] }

const BUCKET_NAME = 'product-images'
const PER_PAGE = 5

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Step 1: Ensure the storage bucket exists
    const { error: bucketError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: '10MB',
    })

    // Ignore "already exists" errors
    if (bucketError && !bucketError.message.includes('already exists')) {
      throw bucketError
    }

    // Step 2: Get the IDs for this page (metadata only, fast)
    const page = parseInt(req.query.page || '0', 10)
    let lastId = 0
    for (let p = 0; p < page; p++) {
      const { data } = await supabase
        .from('products')
        .select('id')
        .gt('id', lastId)
        .order('id', { ascending: true })
        .range(0, PER_PAGE - 1)
      if (!data || data.length === 0) {
        return res.status(200).json({ page, done: true, hasMore: false })
      }
      lastId = data[data.length - 1].id
    }

    const { data: pageIds, error: idsError } = await supabase
      .from('products')
      .select('id')
      .gt('id', lastId)
      .order('id', { ascending: true })
      .range(0, PER_PAGE - 1)

    if (idsError) throw idsError

    if (!pageIds || pageIds.length === 0) {
      return res.status(200).json({ page, done: true, hasMore: false })
    }

    // Step 3: For each product on this page, check if its image is base64.
    // If so, upload to Storage and update the database row with the URL.
    const details = []
    let migrated = 0
    let skipped = 0
    let failed = 0

    for (const { id } of pageIds) {
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('id,name,image')
        .eq('id', id)
        .single()

      if (fetchError) {
        details.push({ id, status: 'fetch_error', error: fetchError.message })
        failed++
        continue
      }

      const image = product.image || ''

      // Skip if no image or already a URL
      if (!image || image.startsWith('http')) {
        details.push({ id, status: 'skipped_url_or_empty' })
        skipped++
        continue
      }

      // Only process base64 images
      if (!image.startsWith('data:')) {
        details.push({ id, status: 'skipped_not_base64' })
        skipped++
        continue
      }

      try {
        // Parse the base64 data URI
        // Format: data:image/jpeg;base64,/9j/4AAQ...
        const match = image.match(/^data:(image\/[a-z]+);base64,(.+)$/i)
        if (!match) {
          details.push({ id, status: 'invalid_base64_format' })
          failed++
          continue
        }

        const mimeType = match[1] // e.g. "image/jpeg"
        const base64Data = match[2]
        const ext = mimeType.split('/')[1] // e.g. "jpeg" -> need to normalize
        const extNormalized = ext === 'jpeg' ? 'jpg' : ext

        // Convert base64 to binary
        const buffer = Buffer.from(base64Data, 'base64')

        // Upload to Supabase Storage
        const fileName = `product-${id}.${extNormalized}`
        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(fileName, buffer, {
            contentType: mimeType,
            upsert: true,
          })

        if (uploadError) {
          // If upload fails (e.g. file too large), skip this product
          details.push({ id, status: 'upload_failed', error: uploadError.message })
          failed++
          continue
        }

        // Get the public URL
        const { data: urlData } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(fileName)

        const publicUrl = urlData.publicUrl

        // Update the database row with the URL
        const { error: updateError } = await supabase
          .from('products')
          .update({ image: publicUrl })
          .eq('id', id)

        if (updateError) {
          details.push({ id, status: 'db_update_failed', error: updateError.message, url: publicUrl })
          failed++
          continue
        }

        details.push({ id, status: 'migrated', url: publicUrl, sizeKB: Math.round(buffer.length / 1024) })
        migrated++
      } catch (e) {
        details.push({ id, status: 'error', error: String(e).slice(0, 200) })
        failed++
      }
    }

    // Check if there are more pages
    const nextLastId = pageIds[pageIds.length - 1].id
    const { data: checkMore } = await supabase
      .from('products')
      .select('id')
      .gt('id', nextLastId)
      .range(0, 0)

    const hasMore = (checkMore || []).length > 0

    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({
      page,
      migrated,
      skipped,
      failed,
      hasMore,
      details,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err)
    console.error('[api/migrate-images] Error:', message)
    return res.status(500).json({ error: 'Migration failed', debug: message })
  }
}