import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

export const errorHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  logger.error(err.stack || err.message);

  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Internal server error',
      details: err.details || null,
    },
  });
}; 