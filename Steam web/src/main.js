import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App.jsx';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || '',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
});
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(App, {}) }));
