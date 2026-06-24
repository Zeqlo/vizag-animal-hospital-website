import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

/**
 * GET /api/blog-posts         — return all posts
 * POST /api/blog-posts        — create or update a post
 * PUT  /api/blog-posts?slug=x — update a post by slug
 * DELETE /api/blog-posts?slug=x — delete post by slug
 *
 * POST body: { title, slug, excerpt?, content, category, readTime, image?, youtubeUrl? }
 * When slug matches an existing post, the post is updated; otherwise a new post is created.
 */
export default async function handler(req, res) {
  try {
    let posts = [];
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf-8');
      posts = JSON.parse(raw);
    } catch {
      posts = [];
    }

    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(posts);
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { title, slug, content, category, readTime, excerpt, image, youtubeUrl } = body;

      if (!title || !slug || !content || !category || !readTime) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'Missing required fields: title, slug, content, category, readTime' });
      }

      const existingIndex = posts.findIndex((p) => p.slug === slug);

      const postData = {
        slug,
        title,
        excerpt: excerpt || title,
        content,
        category,
        readTime,
        image: image || '',
        ...(youtubeUrl ? { youtubeUrl } : {}),
      };

      if (existingIndex >= 0) {
        // Update existing
        posts[existingIndex] = { ...posts[existingIndex], ...postData };
      } else {
        // Create new
        posts.push(postData);
      }

      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(postData);
    }

    if (req.method === 'DELETE') {
      const slug = req.query.slug;
      if (!slug) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: 'Missing slug query parameter' });
      }

      const filtered = posts.filter((p) => p.slug !== slug);
      await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({ success: true, slug });
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/blog-posts] Error:', message);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: 'Internal server error', debug: message });
  }
}