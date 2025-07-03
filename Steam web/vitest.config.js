import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.js',
  },
  resolve: {
    alias: {
      '@atoms': resolve(__dirname, 'src/atoms'),
      '@molecules': resolve(__dirname, 'src/molecules'),
      '@organisms': resolve(__dirname, 'src/organisms'),
      '@layouts': resolve(__dirname, 'src/layouts'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },
}); 