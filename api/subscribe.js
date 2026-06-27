import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Serverless API endpoint: /api/subscribe
 * Handles newsletter subscriptions from the footer form.
 * - POST: { email } — adds email to subscribers table (prevents duplicates)
 */
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')

  try {
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const { email } = body

      if (!email || !email.includes('@')) {
        return res.status(400).json({ status: 'error', message: 'Valid email is required' })
      }

      // Upsert to avoid duplicates (email has unique constraint)
      const { data, error } = await supabase
        .from('subscribers')
        .upsert({ email }, { onConflict: 'email' })
        .select()
        .single()

      if (error) {
        // If it's a duplicate, that's fine
        if (error.code === '23505') {
          return res.status(200).json({ status: 'success', message: 'Already subscribed' })
        }
        throw error
      }

      return res.status(200).json({ status: 'success', message: 'Subscribed successfully' })
    }

    return res.status(405).json({ status: 'error', message: 'Method not allowed' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('[subscribe] Error:', message)
    return res.status(500).json({ status: 'error', message })
  }
}