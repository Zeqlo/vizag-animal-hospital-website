import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

/**
 * POST /api/send-newsletter — { subject, body }
 * Sends a newsletter to all subscribers.
 * In production, integrate with an email service (Resend, SendGrid, etc.).
 * For now, this stub logs the newsletter and returns a success response.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { subject, body: newsletterBody } = body;

    if (!subject || !newsletterBody) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ error: 'Missing required fields: subject, body' });
    }

    // Read subscriber list
    let subscribers = [];
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf-8');
      subscribers = JSON.parse(raw);
    } catch {
      subscribers = [];
    }

    if (subscribers.length === 0) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({
        success: true,
        message: 'No subscribers to send to.',
        sentCount: 0,
      });
    }

    // TODO: Replace with actual email sending logic (Resend, SendGrid, etc.)
    // For now, we log the newsletter details.
    console.log('[send-newsletter] Subject:', subject);
    console.log('[send-newsletter] Body:', newsletterBody);
    console.log(`[send-newsletter] Would send to ${subscribers.length} subscriber(s)`);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      success: true,
      message: `Newsletter queued for ${subscribers.length} subscriber(s).`,
      sentCount: subscribers.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/send-newsletter] Error:', message);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: 'Internal server error', debug: message });
  }
}