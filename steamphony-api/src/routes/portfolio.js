import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';

const router = Router();

const dataPath = path.resolve('src/../data/portfolio-demo.json');
let portfolios = [];
try {
  portfolios = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (err) {
  console.error('Cannot read portfolio data', err);
  portfolios = [];
}

// GET /api/portfolio – все проекты
router.get('/', (req, res) => {
  res.json(portfolios);
});

// GET /api/portfolio/categories – уникальные категории
router.get('/categories', (req, res) => {
  const categories = [...new Set(portfolios.map((p) => p.category))];
  res.json(categories);
});

// GET /api/portfolio/:id – один проект
router.get('/:id', (req, res) => {
  const item = portfolios.find((p) => p.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Portfolio not found' });
  res.json(item);
});

export default router; 