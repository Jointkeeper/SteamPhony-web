import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { createError } from '../utils/createError.js';

const prisma = new PrismaClient();

export const requireRole = (...allowedRoles) => {
  return async (req, _res, next) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

      if (!token) {
        return next(createError('UNAUTHORIZED', 'Token missing', null, 401, 'auth'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
      const user = await prisma.user.findUnique({ where: { id: decoded.sub } });
      if (!user) {
        return next(createError('UNAUTHORIZED', 'User not found', null, 401, 'auth'));
      }

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return next(createError('FORBIDDEN', 'Insufficient role', null, 403, 'auth'));
      }

      req.user = user;
      return next();
    } catch (err) {
      return next(createError('UNAUTHORIZED', err.message, null, 401, 'auth'));
    }
  };
}; 