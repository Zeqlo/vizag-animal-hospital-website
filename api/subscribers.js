import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

/**
 * GET /api/subscribers        — return all subscribers
 * POST /api/subscribers       — add a subscriber { email }
 * DELETE /api/subscribers?id=x — delete subscriber by id
 */
export default async function handler(req, res) {
  try {
    let subscribers = [];
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf-8');
      subscribers = JSON.parse(raw);
    } catch {
      subscribers = [];
    }

    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(subscribers);
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { email } = body;

      if (!email) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'Missing required field: email' });
      }

      // Avoid duplicates
      const existing = subscribers.find((s) => s.email === email);
      if (existing) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(existing);
      }

      const newSub = {
        id: subscribers.length > 0 ? Math.max(...subscribers.map((s) => s.id)) + 1 : 1,
        email,
        subscribedAt: new Date().toISOString(),
      };

      subscribers.push(newSub);
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');

      res.setHeader('Content-Type', 'application/json');
      return res.status(201).json(newSub);
    }

    if (req.method === 'DELETE') {
      const id = parseInt(req.query.id, 10);
      if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'Invalid or missing id query parameter' });
      }

      const filtered = subscribers.filter((s) => s.id !== id);
      await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({ success: true, id });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/subscribers] Error:', message);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: 'Internal server error', debug: message });
  }
}