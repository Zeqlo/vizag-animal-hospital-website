import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'services.json');

/**
 * GET /api/services         — return all services
 * POST /api/services        — create or update a service (by slug)
 * DELETE /api/services?slug=x — delete service by slug
 *
 * POST body: { slug, title, shortDescription, longDescription, icon, features[], category, featured, comingSoon? }
 */
export default async function handler(req, res) {
  try {
    let services = [];
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf-8');
      services = JSON.parse(raw);
    } catch {
      services = [];
    }

    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(services);
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { title, slug, shortDescription, longDescription, icon, features, category, featured } = body;

      if (!title || !slug || !category) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'Missing required fields: title, slug, category' });
      }

      const existingIndex = services.findIndex((s) => s.slug === slug);

      const serviceData = {
        slug,
        title,
        shortDescription: shortDescription || '',
        longDescription: longDescription || '',
        icon: icon || 'Stethoscope',
        features: Array.isArray(features) ? features : [],
        category,
        featured: featured ?? false,
        ...(body.comingSoon ? { comingSoon: true } : {}),
      };

      if (existingIndex >= 0) {
        services[existingIndex] = { ...services[existingIndex], ...serviceData };
      } else {
        services.push(serviceData);
      }

      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(services, null, 2), 'utf-8');

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(serviceData);
    }

    if (req.method === 'DELETE') {
      const slug = req.query.slug;
      if (!slug) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'Missing slug query parameter' });
      }

      const filtered = services.filter((s) => s.slug !== slug);
      await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({ success: true, slug });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/services] Error:', message);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: 'Internal server error', debug: message });
  }
}