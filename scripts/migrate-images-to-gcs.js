import { PrismaClient } from '@prisma/client';
import { Storage } from '@google-cloud/storage';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Prisma and GCS
const prisma = new PrismaClient();
const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID || 'pbguisecr-laurie-meirling',
  keyFilename: path.join(__dirname, '..', 'laurie-storage-key.json')
});

const BUCKET_NAME = process.env.GCS_BUCKET_NAME || 'laurie-meiring-blog-media';
const bucket = storage.bucket(BUCKET_NAME);
const TENANT_ID = 'cmcdr6c2o0000iemz9qc2qckn';
const TENANT_SUBDOMAIN = 'laurie-personal';

// Dry run mode - set to false to actually perform migration
const DRY_RUN = false;

async function uploadFileToGCS(localPath, gcsPath) {
  try {
    const fileBuffer = await fs.readFile(localPath);
    const file = bucket.file(gcsPath);
    
    await file.save(fileBuffer, {
      metadata: {
        cacheControl: 'public, max-age=86400',
        metadata: {
          uploadedAt: new Date().toISOString(),
          tenantId: TENANT_SUBDOMAIN,
          migratedFrom: 'local'
        }
      },
      validation: 'md5'
    });
    
    const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${gcsPath}`;
    return publicUrl;
  } catch (error) {
    console.error(`Failed to upload ${localPath}:`, error.message);
    throw error;
  }
}

async function migrateImages() {
  console.log('🚀 Starting blog image migration to GCS');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE MIGRATION'}`);
  console.log(`Bucket: ${BUCKET_NAME}`);
  console.log('');
  
  try {
    // Get all posts from database
    const posts = await prisma.posts.findMany({
      where: { 
        tenantId: TENANT_ID,
        status: 'PUBLISHED'
      },
      orderBy: { publishDate: 'desc' }
    });
    
    console.log(`Found ${posts.length} published posts to process\n`);
    
    const updates = [];
    const uploadedImages = new Set();
    
    for (const post of posts) {
      console.log(`\n📝 Processing: ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      
      let contentUpdated = post.content;
      let featuredImageUrl = post.featuredImage;
      const imagesToUpload = [];
      
      // Process featured image
      if (featuredImageUrl && featuredImageUrl.startsWith('/blog')) {
        const localPath = path.join(__dirname, '..', 'public', featuredImageUrl);
        const gcsPath = `${TENANT_SUBDOMAIN}/blog-images${featuredImageUrl}`;
        
        try {
          await fs.access(localPath);
          imagesToUpload.push({
            local: localPath,
            gcs: gcsPath,
            original: featuredImageUrl,
            type: 'featured'
          });
        } catch {
          console.log(`   ⚠️  Featured image not found: ${localPath}`);
        }
      }
      
      // Find images in content
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      const localVideoRegex = /\[localvideo:([^\]]+)\]/g;
      
      let match;
      while ((match = imageRegex.exec(post.content)) !== null) {
        const imagePath = match[2];
        if (imagePath.startsWith('/blog')) {
          const localPath = path.join(__dirname, '..', 'public', imagePath);
          const gcsPath = `${TENANT_SUBDOMAIN}/blog-images${imagePath}`;
          
          try {
            await fs.access(localPath);
            imagesToUpload.push({
              local: localPath,
              gcs: gcsPath,
              original: imagePath,
              type: 'content',
              fullMatch: match[0]
            });
          } catch {
            console.log(`   ⚠️  Content image not found: ${localPath}`);
          }
        }
      }
      
      // Find local videos
      while ((match = localVideoRegex.exec(post.content)) !== null) {
        const videoPath = match[1];
        if (videoPath.startsWith('/blog')) {
          const localPath = path.join(__dirname, '..', 'public', videoPath);
          const gcsPath = `${TENANT_SUBDOMAIN}/blog-videos${videoPath}`;
          
          try {
            await fs.access(localPath);
            imagesToUpload.push({
              local: localPath,
              gcs: gcsPath,
              original: videoPath,
              type: 'video',
              fullMatch: match[0]
            });
          } catch {
            console.log(`   ⚠️  Video not found: ${localPath}`);
          }
        }
      }
      
      // Upload images and update URLs
      if (imagesToUpload.length > 0) {
        console.log(`   📤 Found ${imagesToUpload.length} media files to migrate`);
        
        for (const img of imagesToUpload) {
          // Skip if already uploaded
          if (uploadedImages.has(img.gcs)) {
            console.log(`   ⏭️  Already uploaded: ${img.original}`);
            const gcsUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${img.gcs}`;
            
            if (img.type === 'featured') {
              featuredImageUrl = gcsUrl;
            } else if (img.type === 'content') {
              const newMatch = img.fullMatch.replace(img.original, gcsUrl);
              contentUpdated = contentUpdated.replace(img.fullMatch, newMatch);
            } else if (img.type === 'video') {
              contentUpdated = contentUpdated.replace(img.fullMatch, `[localvideo:${gcsUrl}]`);
            }
            continue;
          }
          
          if (!DRY_RUN) {
            try {
              const gcsUrl = await uploadFileToGCS(img.local, img.gcs);
              console.log(`   ✅ Uploaded: ${img.original} -> ${gcsUrl}`);
              uploadedImages.add(img.gcs);
              
              // Update URLs
              if (img.type === 'featured') {
                featuredImageUrl = gcsUrl;
              } else if (img.type === 'content') {
                const newMatch = img.fullMatch.replace(img.original, gcsUrl);
                contentUpdated = contentUpdated.replace(img.fullMatch, newMatch);
              } else if (img.type === 'video') {
                contentUpdated = contentUpdated.replace(img.fullMatch, `[localvideo:${gcsUrl}]`);
              }
            } catch (error) {
              console.log(`   ❌ Failed to upload: ${img.original}`);
            }
          } else {
            console.log(`   [DRY RUN] Would upload: ${img.original} -> GCS:${img.gcs}`);
            
            // Simulate URL replacement for dry run
            const gcsUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${img.gcs}`;
            if (img.type === 'featured') {
              featuredImageUrl = gcsUrl;
            } else if (img.type === 'content') {
              const newMatch = img.fullMatch.replace(img.original, gcsUrl);
              contentUpdated = contentUpdated.replace(img.fullMatch, newMatch);
            } else if (img.type === 'video') {
              contentUpdated = contentUpdated.replace(img.fullMatch, `[localvideo:${gcsUrl}]`);
            }
          }
        }
        
        // Prepare update for this post
        if (contentUpdated !== post.content || featuredImageUrl !== post.featuredImage) {
          updates.push({
            id: post.id,
            title: post.title,
            updates: {
              ...(contentUpdated !== post.content && { content: contentUpdated }),
              ...(featuredImageUrl !== post.featuredImage && { featuredImage: featuredImageUrl })
            }
          });
        }
      } else {
        console.log(`   ℹ️  No local images to migrate`);
      }
    }
    
    // Update database
    if (updates.length > 0) {
      console.log(`\n📊 Database Updates Required: ${updates.length} posts`);
      
      if (!DRY_RUN) {
        for (const update of updates) {
          await prisma.posts.update({
            where: { id: update.id },
            data: update.updates
          });
          console.log(`   ✅ Updated: ${update.title}`);
        }
      } else {
        for (const update of updates) {
          console.log(`   [DRY RUN] Would update: ${update.title}`);
          if (update.updates.featuredImage) {
            console.log(`      Featured image: ${update.updates.featuredImage}`);
          }
          if (update.updates.content) {
            console.log(`      Content: Updated with GCS URLs`);
          }
        }
      }
    }
    
    console.log('\n✅ Migration complete!');
    console.log(`   Total posts processed: ${posts.length}`);
    console.log(`   Posts updated: ${updates.length}`);
    console.log(`   Unique files uploaded: ${uploadedImages.size}`);
    
    if (DRY_RUN) {
      console.log('\n⚠️  This was a DRY RUN. To perform actual migration:');
      console.log('   1. Set DRY_RUN = false in the script');
      console.log('   2. Run the script again');
    }
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Check if GCS is accessible
async function checkGCSAccess() {
  try {
    console.log('🔍 Checking GCS access...');
    
    // Check if our specific bucket exists (don't list all buckets)
    const [exists] = await bucket.exists();
    if (exists) {
      console.log(`✅ Bucket '${BUCKET_NAME}' exists and is accessible`);
      
      // Try to list files to confirm access
      const [files] = await bucket.getFiles({ maxResults: 1 });
      console.log(`✅ GCS access confirmed (found ${files.length} existing files)`);
    } else {
      console.log(`❌ Bucket '${BUCKET_NAME}' not found.`);
      console.log('   Please create the bucket first or check the bucket name');
      return false;
    }
    return true;
  } catch (error) {
    console.error('❌ GCS access failed:', error.message);
    console.error('   Please check your credentials and bucket configuration');
    return false;
  }
}

// Main execution
async function main() {
  console.log('='.repeat(60));
  console.log('   BLOG IMAGE MIGRATION TO GOOGLE CLOUD STORAGE');
  console.log('='.repeat(60));
  
  // Check GCS access first
  const hasAccess = await checkGCSAccess();
  if (!hasAccess) {
    console.log('\n⚠️  Cannot proceed without GCS access');
    process.exit(1);
  }
  
  // Run migration
  await migrateImages();
}

main().catch(console.error);