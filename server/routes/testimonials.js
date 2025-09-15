import express from 'express';
import { db } from '../../src/lib/db.js';

const router = express.Router();

// GET /api/testimonials - Get all testimonials
router.get('/', async (req, res) => {
  try {
    const { tenant = 'laurie-personal' } = req.query;

    const tenantRecord = await db.tenants.findFirst({
      where: { subdomain: tenant }
    });

    if (!tenantRecord) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const testimonials = await db.testimonials.findMany({
      where: {
        tenantId: tenantRecord.id
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/testimonials - Create new testimonial
router.post('/', async (req, res) => {
  try {
    const { name, text, rating, image } = req.body;
    const { tenant = 'laurie-personal' } = req.query;

    if (!name || !text) {
      return res.status(400).json({ error: 'Name and text are required' });
    }

    const tenantRecord = await db.tenants.findFirst({
      where: { subdomain: tenant }
    });

    if (!tenantRecord) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const newTestimonial = await db.testimonials.create({
      data: {
        id: `testimonial-${Date.now()}`,
        name,
        text,
        rating: rating || 5,
        image: image || null,
        tenantId: tenantRecord.id,
        updatedAt: new Date()
      }
    });

    res.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/testimonials/:id - Update testimonial
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, text, rating, image } = req.body;

    if (!name || !text) {
      return res.status(400).json({ error: 'Name and text are required' });
    }

    const updatedTestimonial = await db.testimonials.update({
      where: { id },
      data: {
        name,
        text,
        rating: rating || 5,
        image: image || null,
        updatedAt: new Date()
      }
    });

    res.json({ success: true, testimonial: updatedTestimonial });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/testimonials/:id - Delete testimonial
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.testimonials.delete({
      where: { id }
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;