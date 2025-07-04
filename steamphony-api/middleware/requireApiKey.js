import { createError } from '../utils/createError.js';

export const requireApiKey = (req, _res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  const expected = process.env.API_KEY;

  if (!expected) {
    console.warn('⚠️  API_KEY env variable not set – skipping API key check');
    return next();
  }

  if (apiKey !== expected) {
    return next(createError('UNAUTHORIZED', 'Invalid API key', null, 401, 'auth'));
  }
  return next();
}; 