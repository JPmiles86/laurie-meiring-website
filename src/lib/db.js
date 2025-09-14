import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis ?? global;

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

/**
 * Get tenant by domain or subdomain
 * @param {string} identifier - Domain or subdomain
 * @returns {Promise<Object|null>} - Tenant object or null
 */
export async function getTenantByDomain(identifier) {
  try {
    return await db.tenants.findFirst({
      where: {
        OR: [
          { domain: identifier },
          { subdomain: identifier }
        ],
        isActive: true
      },
      include: {
        users: {
          where: { isActive: true }
        }
      }
    });
  } catch (error) {
    console.error('Error finding tenant:', error);
    return null;
  }
}

/**
 * Get all posts for a tenant with pagination
 * @param {string} tenantId - Tenant ID
 * @param {Object} options - Query options
 * @returns {Promise<Object>} - Posts with pagination info
 */
export async function getPostsForTenant(tenantId, options = {}) {
  const {
    status = 'PUBLISHED',
    page = 1,
    limit = 10,
    includeCategories = true,
    includeTags = true
  } = options;

  const offset = (page - 1) * limit;

  try {
    const [posts, total] = await Promise.all([
      db.posts.findMany({
        where: {
          tenantId,
          status,
          ...(status === 'PUBLISHED' && {
            publishDate: {
              lte: new Date()
            }
          })
        },
        include: {
          users: {
            select: { id: true, name: true, email: true }
          },
          ...(includeCategories && {
            post_categories: {
              include: { categories: true }
            }
          }),
          ...(includeTags && {
            post_tags: {
              include: { tags: true }
            }
          })
        },
        orderBy: {
          publishDate: 'desc'
        },
        skip: offset,
        take: limit
      }),
      db.posts.count({
        where: {
          tenantId,
          status,
          ...(status === 'PUBLISHED' && {
            publishDate: {
              lte: new Date()
            }
          })
        }
      })
    ]);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

/**
 * Get a single post by slug for a tenant
 * @param {string} tenantId - Tenant ID
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} - Post object or null
 */
export async function getPostBySlug(tenantId, slug) {
  try {
    return await db.posts.findFirst({
      where: {
        slug,
        tenantId
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
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

/**
 * Create or update a post
 * @param {Object} postData - Post data
 * @returns {Promise<Object>} - Created/updated post
 */
export async function upsertPost(postData) {
  const {
    id,
    tenantId,
    authorId,
    title,
    content,
    excerpt,
    status = 'DRAFT',
    publishDate,
    featuredImage,
    metaDescription,
    metaKeywords,
    categories = [],
    tags = []
  } = postData;

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  try {
    return await db.$transaction(async (tx) => {
      // Upsert the post
      const post = await tx.posts.upsert({
        where: { id: id || 'new-post' },
        update: {
          title,
          slug,
          content,
          excerpt,
          status,
          publishDate: publishDate ? new Date(publishDate) : null,
          featuredImage,
          metaDescription,
          metaKeywords,
          updatedAt: new Date()
        },
        create: {
          title,
          slug,
          content,
          excerpt,
          status,
          publishDate: publishDate ? new Date(publishDate) : null,
          featuredImage,
          metaDescription,
          metaKeywords,
          tenantId,
          authorId
        }
      });

      // Handle categories
      if (categories.length > 0) {
        // Remove existing category associations
        await tx.post_categories.deleteMany({
          where: { postId: post.id }
        });

        // Add new category associations
        for (const categoryName of categories) {
          const category = await tx.categories.upsert({
            where: {
              slug_tenantId: {
                slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                tenantId
              }
            },
            update: {},
            create: {
              name: categoryName,
              slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              tenantId
            }
          });

          await tx.post_categories.create({
            data: {
              postId: post.id,
              categoryId: category.id
            }
          });
        }
      }

      // Handle tags
      if (tags.length > 0) {
        // Remove existing tag associations
        await tx.post_tags.deleteMany({
          where: { postId: post.id }
        });

        // Add new tag associations
        for (const tagName of tags) {
          const tag = await tx.tags.upsert({
            where: {
              slug_tenantId: {
                slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                tenantId
              }
            },
            update: {
              useCount: { increment: 1 }
            },
            create: {
              name: tagName,
              slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              tenantId,
              useCount: 1
            }
          });

          await tx.post_tags.create({
            data: {
              postId: post.id,
              tagId: tag.id
            }
          });
        }
      }

      return post;
    });
  } catch (error) {
    console.error('Error upserting post:', error);
    throw new Error('Failed to save post');
  }
}

export default db;