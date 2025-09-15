// Database configuration for Vercel serverless functions
import { PrismaClient } from '@prisma/client';

let db;

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  db = global.prisma;
}

export { db };

// Handle GCS key file
if (process.env.GCS_KEY_FILE && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  const fs = require('fs');
  const path = require('path');
  const keyPath = path.join('/tmp', 'gcs-key.json');
  fs.writeFileSync(keyPath, process.env.GCS_KEY_FILE);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
}