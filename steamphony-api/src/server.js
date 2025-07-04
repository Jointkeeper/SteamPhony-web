import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import emailService from './services/emailService.js';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import xss from 'xss-clean';
import { errorHandler } from '../middleware/errorHandler.js';
import { createError } from '../utils/createError.js';
import { requireApiKey } from '../middleware/requireApiKey.js';
import { rateLimiter } from '../middleware/rateLimiter.js';
import { dirname, resolve as pathResolve } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? (process.env.CORS_ORIGIN || '').split(',')
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// XSS protection
app.use(xss());

// Initialise Prisma
const prisma = new PrismaClient();

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Validation rules for contact form
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Message must be at least 10 characters long'),
  body('phone')
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid phone number'),
  body('businessType')
    .optional()
    .isIn(['restaurant', 'beauty', 'retail', 'other'])
    .withMessage('Invalid business type'),
];

// Rate limiting for contact form
app.use('/api/contact', rateLimiter);

// Contact form endpoint
app.post('/api/contact', contactValidation, async (req, res, next) => {
  try {
    // validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError('VALIDATION_ERROR', 'Validation failed', errors.array(), 400, 'validation'));
    }

    const { name, email, phone, businessType, message, language = 'en' } = req.body;

    // Persist to database
    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        businessType: businessType || null,
        message: message.trim(),
        language,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
      },
    });

    console.log('📧 New contact submission:', {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      businessType: lead.businessType,
      language: lead.language,
      timestamp: lead.createdAt,
    });

    // Отправка email уведомлений (асинхронно)
    emailService
      .sendContactNotification({
        ...lead,
        timestamp: lead.createdAt,
      })
      .then((success) => {
        if (success) {
          console.log('📧 Email notifications sent successfully');
        } else {
          console.log('⚠️ Email sending failed, but form was saved');
        }
      })
      .catch((err) => {
        console.error('❌ Email service error:', err.message);
      });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      lead: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        createdAt: lead.createdAt,
      },
    });
  } catch (error) {
    console.error('❌ Contact form error:', error);
    next(error);
  }
});

// Analytics endpoint
app.post('/api/analytics/event', requireApiKey, (req, res, next) => {
  try {
    const { event, data } = req.body;

    const analyticsEvent = {
      event,
      data,
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    };

    console.log('📊 Analytics event:', analyticsEvent);

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// GA4 proxy endpoint (server-side collection to bypass ad-block)
app.post('/api/ga4', requireApiKey, async (req, res, next) => {
  try {
    const { client_id, events } = req.body;

    if (!client_id || !Array.isArray(events)) {
      return next(createError('VALIDATION_ERROR', 'client_id and events are required', null, 400, 'validation'));
    }

    const measurementId = process.env.GA_MEASUREMENT_ID;
    const apiSecret = process.env.GA_API_SECRET;

    if (!measurementId || !apiSecret) {
      return next(createError('CONFIG_ERROR', 'GA credentials not configured', null, 500, 'network'));
    }

    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;

    const gaRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id, events }),
    });

    if (!gaRes.ok) {
      const text = await gaRes.text();
      throw createError('GA_ERROR', `GA4 error: ${text}`, null, 502, 'network');
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Swagger UI (dev only)
if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_SWAGGER_UI === 'true') {
  import('swagger-ui-express').then(({ default: swaggerUi }) => {
    import('yamljs').then(({ default: YAML }) => {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const swaggerDocument = YAML.load(pathResolve(__dirname, '../openapi.yaml'));
      app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      console.log('📚 Swagger UI available at /api/docs');
    });
  });
}

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Centralized error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Steamphony API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});

export default app; 