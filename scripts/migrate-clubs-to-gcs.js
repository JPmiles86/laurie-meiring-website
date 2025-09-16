#!/usr/bin/env node

/**
 * Script to migrate club images from local paths to Google Cloud Storage
 * This will update the database with GCS URLs for all club images
 */

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Map local image paths to GCS URLs
// These images should be uploaded to GCS bucket: laurie-meiring-blog-media
const IMAGE_MAPPING = {
  // Pura Pickleball
  '/clubs/Pura/purapickle1.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/Pura/purapickle1.jpg',
  '/clubs/Pura/purapickle2.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/Pura/purapickle2.jpg',
  '/clubs/Pura/PuraHero1.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/Pura/PuraHero1.jpg',

  // Jungle Pickleball
  '/clubs/jungle/jungle-pv1.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/jungle/jungle-pv1.jpg',
  '/clubs/jungle/jungle-pv2.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/jungle/jungle-pv2.jpg',
  '/clubs/jungle/junglehero1.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/jungle/junglehero1.jpg',

  // Playpickleball Heredia
  '/clubs/PlaypickleballH/Heredia.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/PlaypickleballH/Heredia.jpg',
  '/clubs/PlaypickleballH/Heredia2.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/PlaypickleballH/Heredia2.jpg',

  // Maria Moya Tennis and Pickleball Academy
  '/clubs/MariaMoya/MariaMoya1.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/MariaMoya/MariaMoya1.jpg',
  '/clubs/MariaMoya/MariaMoya2.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/MariaMoya/MariaMoya2.jpg',

  // The Club at Coco Bay
  '/clubs/CocoBay/CocoBay.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/CocoBay/CocoBay.jpg',
  '/clubs/CocoBay/CocoBay2.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/CocoBay/CocoBay2.jpg',

  // Solis Pickleball
  '/clubs/Solis/solis1.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/Solis/solis1.jpg',
  '/clubs/Solis/solis2.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/Solis/solis2.jpg',

  // Ojochal Racquet Club
  '/clubs/ORC/orc1.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/ORC/orc1.jpg',
  '/clubs/ORC/orc2.jpg': 'https://storage.googleapis.com/laurie-meiring-blog-media/laurie-personal/clubs/ORC/orc2.jpg'
};

async function migrateClubImages() {
  try {
    console.log('Starting club image migration to GCS...');

    // Get all clubs from database
    const clubs = await prisma.clubs.findMany();
    console.log(`Found ${clubs.length} clubs to process`);

    for (const club of clubs) {
      let updated = false;
      let updatedImages = [];

      // Process images array
      if (club.images && Array.isArray(club.images)) {
        updatedImages = club.images.map(imagePath => {
          // If already a GCS URL, keep it
          if (imagePath.startsWith('https://storage.googleapis.com')) {
            return imagePath;
          }

          // Map local path to GCS URL
          const gcsUrl = IMAGE_MAPPING[imagePath];
          if (gcsUrl) {
            updated = true;
            console.log(`  Mapping ${imagePath} -> GCS`);
            return gcsUrl;
          }

          // If no mapping found, keep original (shouldn't happen)
          console.warn(`  No GCS mapping for ${imagePath}`);
          return imagePath;
        });
      }

      // Update club if images changed
      if (updated) {
        await prisma.clubs.update({
          where: { id: club.id },
          data: { images: updatedImages }
        });
        console.log(`✅ Updated ${club.name}`);
      } else if (club.images && club.images.length > 0) {
        const hasGCS = club.images.some(img => img.startsWith('https://storage.googleapis.com'));
        if (hasGCS) {
          console.log(`✓ ${club.name} already using GCS`);
        } else {
          console.log(`⚠️ ${club.name} has unmapped images`);
        }
      } else {
        console.log(`- ${club.name} has no images`);
      }
    }

    console.log('\n✅ Migration complete!');
    console.log('\nNOTE: Make sure to upload the actual image files to GCS:');
    console.log('Bucket: laurie-meiring-blog-media');
    console.log('Path: laurie-personal/clubs/[club-name]/[image-name]');

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
migrateClubImages();