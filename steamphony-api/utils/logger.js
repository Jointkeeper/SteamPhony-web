// Winston logger configuration for Steamphony API
import fs from 'fs';
import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import LokiTransport from 'winston-loki';

const {
  LOG_LEVEL = 'info',
  LOG_TO_FILE = 'false',
  LOG_DIR = './logs',
  NODE_ENV = 'development',
  LOG_ROTATE_DAYS = '14',
  LOG_MAX_SIZE_MB = '5',
  LOKI_ENABLED = 'false',
  LOKI_HOST = '',
  LOKI_LABELS = '{"app":"steamphony-api"}',
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
    new DailyRotateFile({
      filename: path.join(LOG_DIR, 'app-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: `${LOG_ROTATE_DAYS}d`,
      maxSize: `${LOG_MAX_SIZE_MB}m`,
      level: LOG_LEVEL,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    })
  );
}

// Loki transport (optional)
if (LOKI_ENABLED === 'true' && LOKI_HOST) {
  try {
    const labels = JSON.parse(LOKI_LABELS);
    transports.push(
      new LokiTransport({
        host: LOKI_HOST,
        json: true,
        labels,
        level: LOG_LEVEL,
      })
    );
  } catch (err) {
    console.error('Invalid LOKI_LABELS JSON', err);
  }
}

export const logger = winston.createLogger({
  level: LOG_LEVEL,
  transports,
}); 