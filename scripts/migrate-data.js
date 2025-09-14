import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { db } from '../src/lib/db.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Migrate existing blog data from JSON to database
 */
async function migrateData() {
  try {
    console.log('🚀 Starting data migration...');

    // Read existing blog data
    const blogsPath = join(__dirname, '../src/data/blogs.json');
    const blogsData = JSON.parse(readFileSync(blogsPath, 'utf8'));

    console.log(`📚 Found ${blogsData.posts.length} posts to migrate`);

    // Create or find tenant
    let tenant = await db.tenant.findFirst({
      where: { subdomain: 'laurie-personal' }
    });

    if (!tenant) {
      console.log('🏢 Creating tenant...');
      tenant = await db.tenant.create({
        data: {
          name: 'Laurie Meiring Personal',
          domain: 'laurie-pickleball.com',
          subdomain: 'laurie-personal',
          config: {
            branding: {
              primaryColor: '#2563eb',
              secondaryColor: '#64748b',
              logo: '/assets/logo.png'
            },
            features: {
              blog: true,
              ai_writer: false,
              google_maps: true
            }
          },
          storageConfig: {
            bucket: 'laurie-blog-media',
            path: 'laurie-personal'
          },
          planTier: 'professional'
        }
      });
    }

    // Create or find admin user
    let adminUser = await db.user.findFirst({
      where: { 
        tenantId: tenant.id,
        role: 'ADMIN'
      }
    });

    if (!adminUser) {
      console.log('👤 Creating admin user...');
      adminUser = await db.user.create({
        data: {
          email: 'laurie@example.com',
          name: 'Laurie Meiring',
          role: 'ADMIN',
          tenantId: tenant.id
        }
      });
    }

    // Migrate each post
    console.log('📝 Migrating posts...');
    let migratedCount = 0;
    
    for (const post of blogsData.posts) {
      try {
        // Check if post already exists
        const existingPost = await db.post.findFirst({
          where: {
            slug: post.slug,
            tenantId: tenant.id
          }
        });

        if (existingPost) {
          console.log(`⏭️  Skipping existing post: ${post.title}`);
          continue;
        }

        // Create the post
        const newPost = await db.post.create({
          data: {
            id: `migrated-${post.id}`,
            title: post.title,
            slug: post.slug,
            content: post.content,
            excerpt: post.content.substring(0, 200) + '...',
            status: post.status === 'published' ? 'PUBLISHED' : 'DRAFT',
            publishDate: new Date(post.publishDate),
            featuredImage: post.featuredImage,
            authorId: adminUser.id,
            tenantId: tenant.id,
            createdAt: new Date(post.publishDate),
            updatedAt: new Date()
          }
        });

        // Handle categories
        if (post.categories && post.categories.length > 0) {
          for (const categoryName of post.categories) {
            const category = await db.category.upsert({
              where: {
                slug_tenantId: {
                  slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                  tenantId: tenant.id
                }
              },
              update: {},
              create: {
                name: categoryName,
                slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                tenantId: tenant.id
              }
            });

            await db.postCategory.create({
              data: {
                postId: newPost.id,
                categoryId: category.id
              }
            });
          }
        }

        // Handle tags
        if (post.tags && post.tags.length > 0) {
          for (const tagName of post.tags) {
            const tag = await db.tag.upsert({
              where: {
                slug_tenantId: {
                  slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                  tenantId: tenant.id
                }
              },
              update: {
                useCount: { increment: 1 }
              },
              create: {
                name: tagName,
                slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                tenantId: tenant.id,
                useCount: 1
              }
            });

            await db.postTag.create({
              data: {
                postId: newPost.id,
                tagId: tag.id
              }
            });
          }
        }

        migratedCount++;
        console.log(`✅ Migrated: ${post.title}`);

      } catch (error) {
        console.error(`❌ Failed to migrate post "${post.title}":`, error.message);
      }
    }

    console.log(`🎉 Migration complete! Migrated ${migratedCount} posts`);
    console.log(`🏢 Tenant ID: ${tenant.id}`);
    console.log(`👤 Admin User ID: ${adminUser.id}`);

  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

// Run migration if called directly
if (process.argv[1] === __filename) {
  migrateData();
}

export default migrateData;