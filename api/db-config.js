// Database configuration for Vercel serverless functions
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

// Handle GCS key file
if (process.env.GCS_KEY_FILE && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  const fs = require('fs');
  const path = require('path');
  const keyPath = path.join('/tmp', 'gcs-key.json');
  fs.writeFileSync(keyPath, process.env.GCS_KEY_FILE);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
}