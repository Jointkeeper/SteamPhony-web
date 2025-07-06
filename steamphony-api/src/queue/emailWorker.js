import { Worker, QueueEvents } from 'bullmq';
import emailService from '../services/emailService.js';
import dotenv from 'dotenv';

dotenv.config();

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
};

const worker = new Worker(
  'email:contactNotification',
  async (job) => {
    try {
      const leadData = job.data;
      await emailService.sendContactNotification(leadData);
      return { success: true };
    } catch (err) {
      console.error('Email worker error:', err);
      throw err;
    }
  },
  { connection, concurrency: 2 }
);

// Logging queue events
const queueEvents = new QueueEvents('email:contactNotification', { connection });
queueEvents.on('completed', ({ jobId }) => {
  console.log(`✅ Email job ${jobId} completed`);
});
queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.error(`❌ Email job ${jobId} failed:`, failedReason);
});

console.log('📮 Email worker started, waiting for jobs...'); 