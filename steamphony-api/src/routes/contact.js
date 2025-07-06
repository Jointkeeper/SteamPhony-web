import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { createError } from '../../utils/createError.js';
import emailService from '../services/emailService.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Validation rules
const validateMain = [
  body('name').isLength({ min: 2 }).withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('service').isIn(['consultation', 'web-development', 'advertising', 'content', 'complex']).withMessage('Invalid service'),
  body('message').isLength({ min: 10 }).withMessage('Message required'),
];

router.post('/main', validateMain, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(createError('VALIDATION', 'Invalid', errors.array(), 400, 'validation'));

    const data = req.body;
    // persist lead
    await prisma.lead.create({ data: { ...data, language: 'ru' } });

    // send emails
    await emailService.sendAdvancedLead(data);

    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
});

// Callback form
router.post('/callback', [
  body('name').notEmpty(),
  body('phone').notEmpty(),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(createError('VALIDATION', 'Invalid', errors.array(), 400, 'validation'));
    const data = req.body;
    await emailService.sendCallbackRequest(data);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
});

// Audit form
router.post('/audit', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('website').notEmpty(),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(createError('VALIDATION', 'Invalid', errors.array(), 400, 'validation'));
    const data = req.body;
    await emailService.sendAuditRequest(data);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router; 