import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import xss from 'xss-clean';
import { errorHandler } from '../middleware/errorHandler.js';
import { createError } from '../utils/createError.js';
import { requireApiKey } from '../middleware/requireApiKey.js';
import { rateLimiter } from '../middleware/rateLimiter.js';
import { dirname, resolve as pathResolve } from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import client from 'prom-client';
import { emailQueue } from './queue/emailQueue.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { requireRole } from '../middleware/requireRole.js';
import { logger } from './utils/logger.js';
import crypto from 'crypto';
import portfolioRouter from './routes/portfolio.js';
import servicesRouter from './routes/services.js';
import contactRouter from './routes/contact.js';

dotenv.config();

// Startup security checks
if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'changeme') {
  // eslint-disable-next-line no-console
  console.error('FATAL: JWT_SECRET missing or default value');
  process.exit(1);
}

const app = express();

// Prometheus metrics
client.collectDefaultMetrics();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').filter(Boolean)
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Per-request CSP with nonce (no 'unsafe-inline')
app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.cspNonce = nonce;

  const cspDirectives = {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", 'data:', 'https:'],
    scriptSrc: ["'self'", `'nonce-${nonce}'`, 'https:'],
    styleSrc: ["'self'", `'nonce-${nonce}'`, 'https:'],
    connectSrc: ["'self'", ...allowedOrigins],
  };

  helmet({
    contentSecurityPolicy: { directives: cspDirectives },
    crossOriginEmbedderPolicy: false,
  })(req, res, next);
});

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
  body('captchaToken').notEmpty().withMessage('Captcha token is required'),
];

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

    logger.info('Analytics event', analyticsEvent);

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
      logger.info('Swagger UI available at /api/docs');
    });
  });
}

// Liveness probe
app.get('/live', (req, res) => {
  res.status(200).send('OK');
});

// Readiness probe – проверяем БД
app.get('/ready', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).send('READY');
  } catch (err) {
    logger.error('Readiness DB check failed', err);
    res.status(503).json({ status: 'ERROR', message: 'Database not reachable' });
  }
});

// AUTH routes
const authValidationRegister = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
];

app.post('/api/auth/register', authValidationRegister, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError('VALIDATION_ERROR', 'Validation failed', errors.array(), 400, 'validation'));
    }

    const { email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return next(createError('CONFLICT', 'User already exists', null, 409, 'auth'));
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, passwordHash } });

    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'changeme', {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
});

const authValidationLogin = [
  body('email').isEmail(),
  body('password').exists(),
];

app.post('/api/auth/login', authValidationLogin, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError('VALIDATION_ERROR', 'Validation failed', errors.array(), 400, 'validation'));
    }
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return next(createError('UNAUTHORIZED', 'Invalid credentials', null, 401, 'auth'));
    }
    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'changeme', {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
});

// Example protected route
app.get('/api/admin/ping', requireRole('admin'), (req, res) => {
  res.json({ success: true, message: 'pong', user: req.user.id });
});

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
  logger.info(`Steamphony API server running on port ${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/api/health`);
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
});

app.use('/api/portfolio', portfolioRouter);
app.use('/api/services', servicesRouter);
app.use('/api/contact', contactRouter);

export default app; 