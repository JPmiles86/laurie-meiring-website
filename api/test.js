export default async function handler(req, res) {
  try {
    // Test basic response
    const envVars = {
      hasDatabase: !!process.env.DATABASE_URL,
      hasGCSBucket: !!process.env.GCS_BUCKET_NAME,
      hasGCSKey: !!process.env.GCS_KEY_FILE,
      nodeEnv: process.env.NODE_ENV
    };

    // Test database connection
    let dbStatus = 'not tested';
    try {
      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
      const count = await prisma.tenants.count();
      dbStatus = `connected - ${count} tenants`;
      await prisma.$disconnect();
    } catch (dbError) {
      dbStatus = `error: ${dbError.message}`;
    }

    return res.status(200).json({
      success: true,
      message: 'API is working',
      environment: envVars,
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}