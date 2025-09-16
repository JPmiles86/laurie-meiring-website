import express from 'express';
import { db } from '../../src/lib/db.js';

const router = express.Router();

// GET /api/clubs - fetch all clubs
router.get('/', async (req, res) => {
  try {
    const { tenant = 'laurie-personal' } = req.query;

    const tenantRecord = await db.tenants.findFirst({
      where: { subdomain: tenant }
    });

    if (!tenantRecord) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const clubs = await db.clubs.findMany({
      where: {
        tenantId: tenantRecord.id
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({ success: true, clubs });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return res.status(500).json({ error: error.message });
  }
});

// POST /api/clubs - create new club
router.post('/', async (req, res) => {
  try {
    const {
      name,
      location,
      contactInfo,
      courtDetails,
      playInfo,
      amenities,
      images,
      description,
      listingType,
      upcomingEvents
    } = req.body;
    const { tenant = 'laurie-personal' } = req.query;

    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }

    const tenantRecord = await db.tenants.findFirst({
      where: { subdomain: tenant }
    });

    if (!tenantRecord) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const newClub = await db.clubs.create({
      data: {
        id: `club-${Date.now()}`,
        name,
        location: location || {},
        contactInfo: contactInfo || {},
        courtDetails: courtDetails || {},
        playInfo: playInfo || {},
        amenities: amenities || [],
        images: images || [],
        description: description || null,
        listingType: listingType || 'basic',
        upcomingEvents: upcomingEvents || [],
        tenantId: tenantRecord.id,
        updatedAt: new Date()
      }
    });

    return res.json({ success: true, club: newClub });
  } catch (error) {
    console.error('Error creating club:', error);
    return res.status(500).json({ error: error.message });
  }
});

// PUT /api/clubs/:id - update club
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      location,
      contactInfo,
      courtDetails,
      playInfo,
      amenities,
      images,
      description,
      listingType,
      upcomingEvents
    } = req.body;

    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }

    const updatedClub = await db.clubs.update({
      where: { id },
      data: {
        name,
        location: location || {},
        contactInfo: contactInfo || {},
        courtDetails: courtDetails || {},
        playInfo: playInfo || {},
        amenities: amenities || [],
        images: images || [],
        description: description || null,
        listingType: listingType || 'basic',
        upcomingEvents: upcomingEvents || [],
        updatedAt: new Date()
      }
    });

    return res.json({ success: true, club: updatedClub });
  } catch (error) {
    console.error('Error updating club:', error);
    return res.status(500).json({ error: error.message });
  }
});

// DELETE /api/clubs/:id - delete club
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.clubs.delete({
      where: { id }
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('Error deleting club:', error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;