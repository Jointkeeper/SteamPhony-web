import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:5173',
    headless: true,
    trace: 'on-first-retry',
  },
  testDir: './e2e',
  timeout: 60000,
}); 