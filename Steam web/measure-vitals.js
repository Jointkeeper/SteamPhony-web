import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Performance metrics storage
const metrics = {
  CLS: null,
  FID: null, 
  FCP: null,
  LCP: null,
  TTFB: null
};

// Analytics function to store metrics
function sendToAnalytics(metric) {
  console.log(`${metric.name}: ${metric.value}`);
  
  // Store metric
  metrics[metric.name] = {
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    timestamp: Date.now()
  };
  
  // Send to analytics service (implement as needed)
  // Example: Google Analytics, custom endpoint, etc.
  
  // Local storage for testing purposes
  localStorage.setItem('webVitals', JSON.stringify(metrics));
}

// Collect all Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// Export for testing
export { metrics, sendToAnalytics }; 