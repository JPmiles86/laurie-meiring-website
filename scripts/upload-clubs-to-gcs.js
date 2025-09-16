#!/usr/bin/env node

/**
 * Script to upload club images to Google Cloud Storage
 * and update the database with GCS URLs
 */

import { Storage } from '@google-cloud/storage';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEYFILE_PATH
});

const bucketName = 'laurie-meiring-blog-media';
const bucket = storage.bucket(bucketName);

// Images to upload
const IMAGES_TO_UPLOAD = [
  // Pura Pickleball
  {
    localPath: 'public/clubs/Pura/purapickle1.jpg',
    gcsPath: 'laurie-personal/clubs/Pura/purapickle1.jpg',
    oldUrl: '/clubs/Pura/purapickle1.jpg'
  },
  {
    localPath: 'public/clubs/Pura/purapickle2.jpg',
    gcsPath: 'laurie-personal/clubs/Pura/purapickle2.jpg',
    oldUrl: '/clubs/Pura/purapickle2.jpg'
  },
  {
    localPath: 'public/clubs/Pura/PuraHero1.jpg',
    gcsPath: 'laurie-personal/clubs/Pura/PuraHero1.jpg',
    oldUrl: '/clubs/Pura/PuraHero1.jpg'
  },
  // Jungle Pickleball
  {
    localPath: 'public/clubs/Jungle/JunglePB1.jpg',
    gcsPath: 'laurie-personal/clubs/Jungle/JunglePB1.jpg',
    oldUrl: '/clubs/Jungle/JunglePB1.jpg'
  },
  {
    localPath: 'public/clubs/Jungle/JungleHero1.jpg',
    gcsPath: 'laurie-personal/clubs/Jungle/JungleHero1.jpg',
    oldUrl: '/clubs/Jungle/JungleHero1.jpg'
  }
];

async function uploadToGCS(localFilePath, gcsFilePath) {
  try {
    const fullPath = path.join(process.cwd(), localFilePath);

    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found: ${fullPath}`);
      return null;
    }

    console.log(`📤 Uploading ${localFilePath} to GCS...`);

    await bucket.upload(fullPath, {
      destination: gcsFilePath,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    const gcsUrl = `https://storage.googleapis.com/${bucketName}/${gcsFilePath}`;
    console.log(`✅ Uploaded to: ${gcsUrl}`);
    return gcsUrl;
  } catch (error) {
    console.error(`❌ Failed to upload ${localFilePath}:`, error);
    return null;
  }
}

async function updateClubImages() {
  try {
    console.log('🚀 Starting club image upload and migration...\n');

    // Create mapping of old URLs to new GCS URLs
    const urlMapping = {};

    // Upload all images
    for (const image of IMAGES_TO_UPLOAD) {
      const gcsUrl = await uploadToGCS(image.localPath, image.gcsPath);
      if (gcsUrl) {
        urlMapping[image.oldUrl] = gcsUrl;
      }
    }

    console.log('\n📊 Updating database with GCS URLs...');

    // Get all clubs from database
    const clubs = await prisma.clubs.findMany();
    console.log(`Found ${clubs.length} clubs to process\n`);

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
          const gcsUrl = urlMapping[imagePath];
          if (gcsUrl) {
            updated = true;
            console.log(`  📝 ${club.name}: Updating image URL`);
            return gcsUrl;
          }

          // If no mapping found, keep original
          console.warn(`  ⚠️ No GCS mapping for ${imagePath} in ${club.name}`);
          return imagePath;
        });
      }

      // Update club if images changed
      if (updated) {
        await prisma.clubs.update({
          where: { id: club.id },
          data: { images: updatedImages }
        });
        console.log(`  ✅ Updated ${club.name}\n`);
      }
    }

    console.log('✅ Migration complete!');
    console.log('\nClubs are now using Google Cloud Storage for images.');
    console.log('When you add/edit clubs in admin, images will be uploaded to GCS automatically.');

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
uploadToGCS().then(() => updateClubImages());