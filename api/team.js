import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'team.json');

/**
 * GET /api/team         — return all team members
 * POST /api/team        — create a new member  { id, name, qualifications, specialization, bio, image, role }
 * PUT  /api/team?id=x   — update a member by id
 * DELETE /api/team?id=x — delete member by id
 */
export default async function handler(req, res) {
  try {
    let members = [];
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf-8');
      members = JSON.parse(raw);
    } catch {
      members = [];
    }

    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(members);
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { name, qualifications, specialization, bio, image, role } = body;

      if (!name || !specialization || !role) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'Missing required fields: name, specialization, role' });
      }

      const newMember = {
        id: body.id || slugify(name),
        name,
        qualifications: qualifications || '',
        specialization,
        bio: bio || '',
        image: image || '',
        role,
      };

      // Check if id already exists — update instead of duplicate
      const existingIndex = members.findIndex((m) => m.id === newMember.id);
      if (existingIndex >= 0) {
        members[existingIndex] = { ...members[existingIndex], ...newMember };
      } else {
        members.push(newMember);
      }

      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(members, null, 2), 'utf-8');

      res.setHeader('Content-Type', 'application/json');
      return res.status(201).json(newMember);
    }

    if (req.method === 'PUT') {
      const id = req.query.id;
      if (!id) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'Missing id query parameter' });
      }

      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const idx = members.findIndex((m) => m.id === id);
      if (idx < 0) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({ error: 'Team member not found' });
      }

      members[idx] = { ...members[idx], ...body, id };
      await fs.writeFile(DATA_FILE, JSON.stringify(members, null, 2), 'utf-8');

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(members[idx]);
    }

    if (req.method === 'DELETE') {
      const id = req.query.id;
      if (!id) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'Missing id query parameter' });
      }

      const filtered = members.filter((m) => m.id !== id);
      await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({ success: true, id });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/team] Error:', message);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: 'Internal server error', debug: message });
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}