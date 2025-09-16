import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to check authentication
function checkAuthentication(req) {
  const authHeader = req.headers.authorization;
  const sessionAuth = req.headers['x-session-auth'];

  // Check for session-based auth (from sessionStorage)
  if (sessionAuth === 'authenticated') {
    return true;
  }

  // Check for bearer token auth
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    // For now, we'll just check if it's the expected admin token
    // In production, you'd validate JWT or other token type
    return token === 'authenticated';
  }

  return false;
}

// Helper function to require authentication
function requireAuth(req, res) {
  if (!checkAuthentication(req)) {
    res.status(401).json({
      success: false,
      error: 'Authentication required. Please log in to access admin features.'
    });
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Session-Auth');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.url;

  try {
    // Handle /api/posts/admin/all - fetch all posts for admin
    if (url.includes('/api/posts/admin/all')) {
      if (!requireAuth(req, res)) return;

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
      if (!requireAuth(req, res)) return;

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
      if (!requireAuth(req, res)) return;

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
      if (!requireAuth(req, res)) return;

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

    // Handle /api/testimonials - GET all testimonials
    if (url.includes('/api/testimonials') && !url.includes('/api/testimonials/') && req.method === 'GET') {
      const { tenant = 'laurie-personal' } = req.query;

      const tenantRecord = await prisma.tenants.findFirst({
        where: { subdomain: tenant }
      });

      if (!tenantRecord) {
        return res.status(404).json({ error: 'Tenant not found' });
      }

      const testimonials = await prisma.testimonials.findMany({
        where: {
          tenantId: tenantRecord.id
        },
        orderBy: { createdAt: 'desc' }
      });

      return res.json({ success: true, testimonials });
    }

    // Handle POST /api/testimonials - create new testimonial
    if (req.method === 'POST' && url.includes('/api/testimonials') && !url.includes('/api/testimonials/')) {
      if (!requireAuth(req, res)) return;

      const { name, text, rating, image } = req.body;
      const { tenant = 'laurie-personal' } = req.query;

      if (!name || !text) {
        return res.status(400).json({ error: 'Name and text are required' });
      }

      const tenantRecord = await prisma.tenants.findFirst({
        where: { subdomain: tenant }
      });

      if (!tenantRecord) {
        return res.status(404).json({ error: 'Tenant not found' });
      }

      const newTestimonial = await prisma.testimonials.create({
        data: {
          id: `testimonial-${Date.now()}`,
          name,
          text,
          rating: rating || 5,
          image: image || null,
          tenantId: tenantRecord.id,
          updatedAt: new Date()
        }
      });

      return res.json({ success: true, testimonial: newTestimonial });
    }

    // Handle PUT /api/testimonials/[id] - update testimonial
    if (req.method === 'PUT' && url.includes('/api/testimonials/')) {
      if (!requireAuth(req, res)) return;

      const testimonialId = url.split('/api/testimonials/')[1].split('?')[0];
      const { name, text, rating, image } = req.body;

      if (!name || !text) {
        return res.status(400).json({ error: 'Name and text are required' });
      }

      const updatedTestimonial = await prisma.testimonials.update({
        where: { id: testimonialId },
        data: {
          name,
          text,
          rating: rating || 5,
          image: image || null,
          updatedAt: new Date()
        }
      });

      return res.json({ success: true, testimonial: updatedTestimonial });
    }

    // Handle DELETE /api/testimonials/[id] - delete testimonial
    if (req.method === 'DELETE' && url.includes('/api/testimonials/')) {
      if (!requireAuth(req, res)) return;

      const testimonialId = url.split('/api/testimonials/')[1].split('?')[0];

      await prisma.testimonials.delete({
        where: { id: testimonialId }
      });

      return res.json({ success: true });
    }

    // Handle /api/clubs - GET all clubs
    if (url.includes('/api/clubs') && !url.includes('/api/clubs/') && req.method === 'GET') {
      const { tenant = 'laurie-personal' } = req.query;

      const tenantRecord = await prisma.tenants.findFirst({
        where: { subdomain: tenant }
      });

      if (!tenantRecord) {
        return res.status(404).json({ error: 'Tenant not found' });
      }

      const clubs = await prisma.clubs.findMany({
        where: {
          tenantId: tenantRecord.id
        },
        orderBy: { createdAt: 'desc' }
      });

      return res.json({ success: true, clubs });
    }

    // Handle POST /api/clubs - create new club
    if (req.method === 'POST' && url.includes('/api/clubs') && !url.includes('/api/clubs/')) {
      if (!requireAuth(req, res)) return;

      const {
        name,
        location,
        contactInfo,
        courtDetails,
        playInfo,
        amenities,
        images,
        description,
        listingType,
        upcomingEvents
      } = req.body;
      const { tenant = 'laurie-personal' } = req.query;

      if (!name || !location) {
        return res.status(400).json({ error: 'Name and location are required' });
      }

      const tenantRecord = await prisma.tenants.findFirst({
        where: { subdomain: tenant }
      });

      if (!tenantRecord) {
        return res.status(404).json({ error: 'Tenant not found' });
      }

      const newClub = await prisma.clubs.create({
        data: {
          id: `club-${Date.now()}`,
          name,
          location: location || {},
          contactInfo: contactInfo || {},
          courtDetails: courtDetails || {},
          playInfo: playInfo || {},
          amenities: amenities || [],
          images: images || [],
          description: description || null,
          listingType: listingType || 'basic',
          upcomingEvents: upcomingEvents || [],
          tenantId: tenantRecord.id,
          updatedAt: new Date()
        }
      });

      return res.json({ success: true, club: newClub });
    }

    // Handle PUT /api/clubs/[id] - update club
    if (req.method === 'PUT' && url.includes('/api/clubs/')) {
      if (!requireAuth(req, res)) return;

      const clubId = url.split('/api/clubs/')[1].split('?')[0];
      const {
        name,
        location,
        contactInfo,
        courtDetails,
        playInfo,
        amenities,
        images,
        description,
        listingType,
        upcomingEvents
      } = req.body;

      if (!name || !location) {
        return res.status(400).json({ error: 'Name and location are required' });
      }

      const updatedClub = await prisma.clubs.update({
        where: { id: clubId },
        data: {
          name,
          location: location || {},
          contactInfo: contactInfo || {},
          courtDetails: courtDetails || {},
          playInfo: playInfo || {},
          amenities: amenities || [],
          images: images || [],
          description: description || null,
          listingType: listingType || 'basic',
          upcomingEvents: upcomingEvents || [],
          updatedAt: new Date()
        }
      });

      return res.json({ success: true, club: updatedClub });
    }

    // Handle DELETE /api/clubs/[id] - delete club
    if (req.method === 'DELETE' && url.includes('/api/clubs/')) {
      if (!requireAuth(req, res)) return;

      const clubId = url.split('/api/clubs/')[1].split('?')[0];

      await prisma.clubs.delete({
        where: { id: clubId }
      });

      return res.json({ success: true });
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