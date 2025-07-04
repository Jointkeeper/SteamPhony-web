import { logger } from '../utils/logger.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const type = err.type || 'unknown';

  // Log full stack in non-test env
  if (process.env.NODE_ENV !== 'test') {
    logger.error(`${code} ${type}: ${err.message}`);
    if (err.stack) logger.error(err.stack);
  }

  res.status(status).json({
    success: false,
    code,
    type,
    message: err.message,
    details: err.details || null,
  });
}; 