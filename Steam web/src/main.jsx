import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App.jsx';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { initPerformanceMonitoring } from './utils/performanceMonitor';
import { initOptimizedCSS } from './utils/criticalCss';
import { preloadCriticalChunks } from './utils/bundleOptimizer';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || '',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

// Initialize performance optimizations
initOptimizedCSS();
initPerformanceMonitoring();
preloadCriticalChunks();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
