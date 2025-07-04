// Winston logger configuration for Steamphony API
import fs from 'fs';
import path from 'path';
import winston from 'winston';

const {
  LOG_LEVEL = 'info',
  LOG_TO_FILE = 'false',
  LOG_DIR = './logs',
  NODE_ENV = 'development',
} = process.env;

const transports = [
  new winston.transports.Console({
    level: LOG_LEVEL,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
  }),
];

if (LOG_TO_FILE === 'true' || NODE_ENV === 'production') {
  // ensure log directory exists
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }

  transports.push(
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'error.log'),
      level: 'error',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    })
  );

  transports.push(
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'app.log'),
      level: LOG_LEVEL,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    })
  );
}

export const logger = winston.createLogger({
  level: LOG_LEVEL,
  transports,
}); 