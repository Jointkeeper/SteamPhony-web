import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger.js';
import { createError } from '../utils/createError.js';

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const maxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100);

export const rateLimiter = rateLimit({
  windowMs,
  max: maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, _res, next) => {
    logger.warn(`Rate limit exceeded for ${req.ip} ${req.method} ${req.originalUrl}`);
    next(createError('RATE_LIMIT', 'Too many requests, please try again later', null, 429));
  },
}); 