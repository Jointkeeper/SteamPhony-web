import { logEvent } from '../analytics';

/**
 * measure – utility to wrap synchronous code and report its execution time.
 * @param {string} metricName GA4 event label
 * @param {Function} fn       Function to measure
 * @returns {*}               Return value of fn
 */
export function measure(metricName, fn) {
  const t0 = performance.now();
  const result = fn();
  const duration = performance.now() - t0;
  queueMicrotask(() => {
    logEvent('perf', metricName, undefined, Math.round(duration));
  });
  return result;
}

/**
 * sendDuration – convenience wrapper to send a numeric duration metric.
 */
export function sendDuration(metricName, duration) {
  logEvent('perf', metricName, undefined, Math.round(duration));
} 