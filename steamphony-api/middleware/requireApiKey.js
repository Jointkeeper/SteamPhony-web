import { createError } from '../utils/createError.js';

export const requireApiKey = (req, _res, next) => {
  const apiKeyHeader = req.get('X-API-Key');
  const validKey = process.env.API_KEY;

  if (!validKey) {
    // If key not configured, allow all (development) – can tighten later
    return next();
  }

  if (!apiKeyHeader || apiKeyHeader !== validKey) {
    return next(createError('UNAUTHORIZED', 'Invalid API key', null, 401, 'network'));
  }

  return next();
}; 