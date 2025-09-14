import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../../src/lib/db.js';
import { hashPassword, verifyPassword } from '../../src/lib/encryption.js';

const router = express.Router();

/**
 * Simple password login for initial setup
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { password, tenantId = 'laurie-personal' } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    // For now, use simple password check
    // TODO: Replace with proper user authentication
    const adminPassword = process.env.ADMIN_PASSWORD || 'LaurieIsAPickleBallGod2025';
    
    if (password !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Find or create tenant
    let tenant = await db.tenants.findFirst({
      where: { subdomain: tenantId }
    });

    if (!tenant) {
      // Create default tenant for Laurie
      tenant = await db.tenants.create({
        data: {
          name: 'Laurie Meiring Personal',
          domain: 'laurie-pickleball.com',
          subdomain: tenantId,
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
            path: tenantId
          },
          planTier: 'professional'
        }
      });

      // Create default admin user
      await db.user.create({
        data: {
          email: 'laurie@example.com',
          name: 'Laurie Meiring',
          role: 'ADMIN',
          tenantId: tenant.id,
          passwordHash: await hashPassword(adminPassword)
        }
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        tenantId: tenant.id,
        role: 'ADMIN',
        subdomain: tenant.subdomain
      },
      process.env.JWT_SECRET || 'default-jwt-secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      tenant: {
        id: tenant.id,
        name: tenant.name,
        subdomain: tenant.subdomain,
        config: tenant.config
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

/**
 * Verify JWT token middleware
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'default-jwt-secret', (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
};

/**
 * Get current user info
 * GET /api/auth/me
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const tenant = await db.tenant.findUnique({
      where: { id: req.user.tenantId },
      include: {
        users: {
          where: { isActive: true },
          select: { id: true, name: true, email: true, role: true }
        }
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
      user: req.user,
      tenant: {
        id: tenant.id,
        name: tenant.name,
        subdomain: tenant.subdomain,
        config: tenant.config,
        users: tenant.users
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user info'
    });
  }
});

/**
 * Logout (client-side token removal, server just confirms)
 * POST /api/auth/logout
 */
router.post('/logout', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

export default router;