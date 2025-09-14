import express from 'express';
import { db, getPostsForTenant, getPostBySlug, upsertPost } from '../../src/lib/db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

/**
 * Get all posts for a tenant (public endpoint)
 * GET /api/posts?tenant=subdomain&status=published&page=1&limit=10
 */
router.get('/', async (req, res) => {
  try {
    const { 
      tenant = 'laurie-personal', 
      status = 'PUBLISHED', 
      page = 1, 
      limit = 10 
    } = req.query;

    // Find tenant by subdomain
    const tenantRecord = await db.tenants.findFirst({
      where: { subdomain: tenant }
    });

    if (!tenantRecord) {
      return res.status(404).json({
        success: false,
        message: 'Tenant not found'
      });
    }

    const result = await getPostsForTenant(tenantRecord.id, {
      status,
      page: parseInt(page),
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts'
    });
  }
});

/**
 * Get all posts for admin (authenticated)
 * GET /api/posts/admin/all
 */
router.get('/admin/all', authenticateToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;

    const whereClause = {
      tenantId: req.user.tenantId,
      ...(status && { status })
    };

    const [posts, total] = await Promise.all([
      db.posts.findMany({
        where: whereClause,
        include: {
          author: {
            select: { id: true, name: true, email: true }
          },
          categories: {
            include: { category: true }
          },
          tags: {
            include: { tag: true }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit)
      }),
      db.posts.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get admin posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts'
    });
  }
});

/**
 * Get a single post by slug (public endpoint)
 * GET /api/posts/:slug?tenant=subdomain
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { tenant = 'laurie-personal' } = req.query;

    // Find tenant by subdomain
    const tenantRecord = await db.tenants.findFirst({
      where: { subdomain: tenant }
    });

    if (!tenantRecord) {
      return res.status(404).json({
        success: false,
        message: 'Tenant not found'
      });
    }

    const post = await getPostBySlug(tenantRecord.id, slug);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Increment view count
    await db.posts.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } }
    });

    res.json({
      success: true,
      post
    });

  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch post'
    });
  }
});

/**
 * Create or update a post (authenticated)
 * POST /api/posts
 * PUT /api/posts/:id
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const postData = {
      ...req.body,
      tenantId: req.user.tenantId,
      authorId: req.user.userId || req.user.tenantId // Fallback for simple auth
    };

    const post = await upsertPost(postData);

    res.json({
      success: true,
      post
    });

  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create post'
    });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const postData = {
      ...req.body,
      id,
      tenantId: req.user.tenantId,
      authorId: req.user.userId || req.user.tenantId
    };

    const post = await upsertPost(postData);

    res.json({
      success: true,
      post
    });

  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update post'
    });
  }
});

/**
 * Delete a post (authenticated)
 * DELETE /api/posts/:id
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const post = await db.posts.findFirst({
      where: {
        id,
        tenantId: req.user.tenantId
      }
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    await db.posts.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });

  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete post'
    });
  }
});

export default router;