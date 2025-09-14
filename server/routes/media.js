import express from 'express';
import multer from 'multer';
import { uploadToGCS, getUploadSignedUrl } from '../../src/lib/storage.js';
import { authenticateToken } from './auth.js';
import { db } from '../../src/lib/db.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images, videos, and documents
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|pdf|doc|docx/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

/**
 * Upload file to GCS
 * POST /api/media/upload
 */
router.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { alt, caption, folder = 'uploads' } = req.body;
    const tenantSubdomain = req.user.subdomain || 'laurie-personal';

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${folder}/${timestamp}-${sanitizedName}`;

    // Upload to GCS
    const uploadResult = await uploadToGCS(
      req.file.buffer,
      fileName,
      tenantSubdomain
    );

    // Save media record to database
    const media = await db.media.create({
      data: {
        filename: sanitizedName,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: uploadResult.url,
        path: uploadResult.path,
        alt: alt || '',
        caption: caption || '',
        tenantId: req.user.tenantId,
        uploadedById: req.user.tenantId, // Simplified for now
        isPublic: true,
        metadata: {
          folder,
          uploadedAt: new Date().toISOString(),
          ...(req.body.metadata ? JSON.parse(req.body.metadata) : {})
        }
      }
    });

    res.json({
      success: true,
      media,
      url: uploadResult.url
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Upload failed'
    });
  }
});

/**
 * Get signed upload URL for browser-direct upload
 * POST /api/media/upload-url
 */
router.post('/upload-url', authenticateToken, async (req, res) => {
  try {
    const { fileName, contentType, folder = 'uploads' } = req.body;

    if (!fileName || !contentType) {
      return res.status(400).json({
        success: false,
        message: 'fileName and contentType are required'
      });
    }

    const tenantSubdomain = req.user.subdomain || 'laurie-personal';
    const result = await getUploadSignedUrl(fileName, contentType, tenantSubdomain);

    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Upload URL error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate upload URL'
    });
  }
});

/**
 * Get media list for gallery
 * GET /api/media/list
 */
router.get('/list', authenticateToken, async (req, res) => {
  try {
    const media = await db.media.findMany({
      where: {
        tenantId: req.user.tenantId,
        mimeType: { startsWith: 'image/' }
      },
      orderBy: { createdAt: 'desc' },
      take: 100, // Limit to recent 100 images
      select: {
        id: true,
        url: true,
        filename: true,
        alt: true,
        caption: true,
        size: true,
        mimeType: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      media: media.map(item => ({
        ...item,
        uploadedAt: item.createdAt
      }))
    });

  } catch (error) {
    console.error('Media list error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media'
    });
  }
});

/**
 * Get media files for tenant
 * GET /api/media
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, type } = req.query;

    const whereClause = {
      tenantId: req.user.tenantId,
      ...(type && { mimeType: { startsWith: type } })
    };

    const [media, total] = await Promise.all([
      db.media.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit)
      }),
      db.media.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      media,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media'
    });
  }
});

export default router;