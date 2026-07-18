import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

const BUCKET_NAME = 'product-images'

// POST /api/upload-image
// Body: { image: "data:image/jpeg;base64,..." } or { image: "https://..." }
// Returns: { url: "https://...supabase.co/storage/v1/object/public/product-images/..." }
//
// If the image is already a URL, returns it as-is.
// If it's base64, uploads to Supabase Storage and returns the public URL.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const image = body.image || ''

    // If already a URL, return as-is
    if (!image || image.startsWith('http')) {
      return res.status(200).json({ url: image })
    }

    // Must be base64
    if (!image.startsWith('data:')) {
      return res.status(400).json({ error: 'Image must be a URL or base64 data URI' })
    }

    // Parse the base64 data URI
    const match = image.match(/^data:(image\/[a-z]+);base64,(.+)$/i)
    if (!match) {
      return res.status(400).json({ error: 'Invalid base64 image format' })
    }

    const mimeType = match[1]
    const base64Data = match[2]
    const ext = mimeType.split('/')[1]
    const extNormalized = ext === 'jpeg' ? 'jpg' : ext

    const buffer = Buffer.from(base64Data, 'base64')

    // Generate a unique filename using timestamp
    const fileName = `upload-${Date.now()}.${extNormalized}`

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, buffer, {
        contentType: mimeType,
        upsert: true,
      })

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName)

    return res.status(200).json({ url: urlData.publicUrl })
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err)
    console.error('[api/upload-image] Error:', message)
    return res.status(500).json({ error: 'Upload failed', debug: message })
  }
}