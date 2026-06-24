import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'gallery.json');

/**
 * GET /api/gallery  — return all gallery items
 * POST /api/gallery — add a new item  { title, category, image, youtubeUrl? }
 * DELETE /api/gallery?id=123 — delete item by id
 */
export default async function handler(req, res) {
  try {
    // Ensure data file exists
    let items = [];
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf-8');
      items = JSON.parse(raw);
    } catch {
      items = [];
    }

    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(items);
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { title, category, image, youtubeUrl } = body;

      if (!title || !category || !image) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'Missing required fields: title, category, image' });
      }

      const newItem = {
        id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        title,
        category,
        image,
        ...(youtubeUrl ? { youtubeUrl } : {}),
      };

      items.push(newItem);
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');

      res.setHeader('Content-Type', 'application/json');
      return res.status(201).json(newItem);
    }

    if (req.method === 'DELETE') {
      const id = parseInt(req.query.id, 10);
      if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'Invalid or missing id query parameter' });
      }

      const filtered = items.filter((i) => i.id !== id);
      await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({ success: true, id });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/gallery] Error:', message);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: 'Internal server error', debug: message });
  }
}