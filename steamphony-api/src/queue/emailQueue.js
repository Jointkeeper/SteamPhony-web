import { Queue, QueueScheduler } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config();

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
};

// Scheduler is required for delayed jobs and retries
new QueueScheduler('email:contactNotification', { connection });

export const emailQueue = new Queue('email:contactNotification', {
  connection,
}); 