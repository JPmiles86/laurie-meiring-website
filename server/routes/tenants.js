import express from 'express';
import { db } from '../../src/lib/db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

/**
 * Get tenant info (public endpoint for basic config)
 * GET /api/tenants/:subdomain
 */
router.get('/:subdomain', async (req, res) => {
  try {
    const { subdomain } = req.params;

    const tenant = await db.tenant.findFirst({
      where: { 
        subdomain,
        isActive: true 
      },
      select: {
        id: true,
        name: true,
        subdomain: true,
        config: true,
        planTier: true
      }
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: 'Tenant not found'
      });
    }

    res.json({
      success: true,
      tenant
    });

  } catch (error) {
    console.error('Get tenant error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tenant'
    });
  }
});

export default router;