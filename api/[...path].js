import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.url;

  try {
    // Handle /api/posts
    if (url.includes('/api/posts') && !url.includes('/api/posts/')) {
      const { tenant = 'laurie-personal' } = req.query;

      const tenantRecord = await prisma.tenants.findFirst({
        where: { subdomain: tenant }
      });

      const posts = await prisma.posts.findMany({
        where: {
          tenantId: tenantRecord.id,
          status: 'PUBLISHED'
        },
        include: {
          users: true,
          post_categories: {
            include: { categories: true }
          }
        },
        orderBy: { publishDate: 'desc' }
      });

      return res.json({ success: true, posts });
    }

    // Handle /api/posts/[slug]
    if (url.includes('/api/posts/')) {
      const slug = url.split('/api/posts/')[1].split('?')[0];
      const { tenant = 'laurie-personal' } = req.query;

      const tenantRecord = await prisma.tenants.findFirst({
        where: { subdomain: tenant }
      });

      const post = await prisma.posts.findFirst({
        where: {
          slug,
          tenantId: tenantRecord.id
        },
        include: {
          users: true,
          post_categories: {
            include: { categories: true }
          }
        }
      });

      return res.json({ success: true, post });
    }

    return res.status(404).json({ error: 'Not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}