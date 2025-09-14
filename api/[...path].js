import { db } from '../src/lib/db.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const path = req.query.path ? req.query.path.join('/') : '';

  try {
    // Handle posts endpoints
    if (path === 'posts' && req.method === 'GET') {
      const { tenant = 'laurie-personal', limit = 100 } = req.query;

      const tenantRecord = await db.tenants.findFirst({
        where: { subdomain: tenant }
      });

      if (!tenantRecord) {
        return res.status(404).json({ success: false, message: 'Tenant not found' });
      }

      const posts = await db.posts.findMany({
        where: {
          tenantId: tenantRecord.id,
          status: 'PUBLISHED',
          publishDate: { lte: new Date() }
        },
        include: {
          users: {
            select: { id: true, name: true, email: true }
          },
          post_categories: {
            include: { categories: true }
          },
          post_tags: {
            include: { tags: true }
          }
        },
        orderBy: { publishDate: 'desc' },
        take: parseInt(limit)
      });

      return res.json({
        success: true,
        posts,
        pagination: { page: 1, limit: parseInt(limit), total: posts.length }
      });
    }

    // Handle single post by slug
    if (path.startsWith('posts/') && req.method === 'GET') {
      const slug = path.replace('posts/', '');
      const { tenant = 'laurie-personal' } = req.query;

      const tenantRecord = await db.tenants.findFirst({
        where: { subdomain: tenant }
      });

      if (!tenantRecord) {
        return res.status(404).json({ success: false, message: 'Tenant not found' });
      }

      const post = await db.posts.findFirst({
        where: {
          slug,
          tenantId: tenantRecord.id
        },
        include: {
          users: {
            select: { id: true, name: true, email: true }
          },
          post_categories: {
            include: { categories: true }
          },
          post_tags: {
            include: { tags: true }
          }
        }
      });

      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }

      // Increment view count
      await db.posts.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } }
      });

      return res.json({ success: true, post });
    }

    // Default 404
    return res.status(404).json({ success: false, message: 'Endpoint not found' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}