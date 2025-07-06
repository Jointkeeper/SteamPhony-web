import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const dataPath = path.resolve('data/services-content.json');
let services = [];
try {
  services = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  services = Object.values(services);
} catch (err) {
  console.error('Cannot read services content', err.message);
}

// GET /api/services
router.get('/', (req, res) => {
  res.json(services);
});

// GET /api/services/:category
router.get('/:category', (req, res) => {
  const item = services.find((s) => s.category === req.params.category);
  if (!item) return res.status(404).json({ message: 'Service not found' });
  res.json(item);
});

export default router; 