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
    // Handle /api/posts/admin/all - fetch all posts for admin
    if (url.includes('/api/posts/admin/all')) {
      const { tenant = 'laurie-personal' } = req.query;

      const tenantRecord = await prisma.tenants.findFirst({
        where: { subdomain: tenant }
      });

      if (!tenantRecord) {
        // If no tenant found, create one
        const newTenant = await prisma.tenants.create({
          data: {
            subdomain: 'laurie-personal',
            name: 'Laurie Personal Blog'
          }
        });
        tenantRecord = newTenant;
      }

      const posts = await prisma.posts.findMany({
        where: {
          tenantId: tenantRecord.id
        },
        include: {
          users: true,
          post_categories: {
            include: { categories: true }
          }
        },
        orderBy: { publishDate: 'desc' }
      });

      return res.json({
        success: true,
        posts,
        pagination: { page: 1, limit: 100, total: posts.length }
      });
    }

    // Handle DELETE /api/posts/[id]
    if (req.method === 'DELETE' && url.includes('/api/posts/')) {
      const postId = url.split('/api/posts/')[1].split('?')[0];

      // Delete related records first
      await prisma.post_categories.deleteMany({
        where: { postId }
      });

      await prisma.post_tags.deleteMany({
        where: { postId }
      });

      // Delete the post
      await prisma.posts.delete({
        where: { id: postId }
      });

      return res.json({ success: true });
    }

    // Handle PUT /api/posts/[id] - update post
    if (req.method === 'PUT' && url.includes('/api/posts/')) {
      const postId = url.split('/api/posts/')[1].split('?')[0];
      const { title, content, slug, status, featuredImage, publishDate, categories, tags, metadata } = req.body;

      const tenantRecord = await prisma.tenants.findFirst({
        where: { subdomain: 'laurie-personal' }
      });

      // Extract author from metadata if provided
      const metaDescription = metadata?.description || null;
      const metaKeywords = metadata?.keywords || null;

      // Update post - only include fields that exist in the schema
      const updatedPost = await prisma.posts.update({
        where: { id: postId },
        data: {
          title,
          content,
          slug: slug || undefined,
          status: status || 'PUBLISHED',
          featuredImage,
          publishDate: publishDate ? new Date(publishDate) : new Date(),
          metaDescription,
          metaKeywords,
          updatedAt: new Date()
        },
        include: {
          users: true,
          post_categories: {
            include: { categories: true }
          }
        }
      });

      return res.json({ success: true, post: updatedPost });
    }

    // Handle POST /api/posts - create new post
    if (req.method === 'POST' && url.includes('/api/posts')) {
      const { title, content, slug, status, featuredImage, publishDate, categories, tags, metadata } = req.body;

      const tenantRecord = await prisma.tenants.findFirst({
        where: { subdomain: 'laurie-personal' }
      });

      // Get or create user
      let user = await prisma.users.findFirst({
        where: { email: 'laurie@pbguidecr.com' }
      });

      if (!user) {
        user = await prisma.users.create({
          data: {
            email: 'laurie@pbguidecr.com',
            name: 'Laurie Meiring',
            tenantId: tenantRecord.id
          }
        });
      }

      // Extract metadata fields if provided
      const metaDescription = metadata?.description || null;
      const metaKeywords = metadata?.keywords || null;

      // Create post with correct field names
      const newPost = await prisma.posts.create({
        data: {
          id: `blog-${Date.now()}`,
          title,
          content,
          slug,
          status: status || 'PUBLISHED',
          featuredImage,
          publishDate: publishDate ? new Date(publishDate) : new Date(),
          tenantId: tenantRecord.id,
          authorId: user.id,  // Changed from userId to authorId
          metaDescription,
          metaKeywords,
          viewCount: 0,
          updatedAt: new Date()
        },
        include: {
          users: true,
          post_categories: {
            include: { categories: true }
          }
        }
      });

      return res.json({ success: true, post: newPost });
    }

    // Handle /api/posts - get published posts
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

    // Handle /api/posts/[slug] - get single post
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