// УСТАНОВИТЕ ЭТО В ПЕРВЫЙ ДЕНЬ:

export const isDev = import.meta.env.DEV;

export const debugLog = (message: string, data?: any) => {
  if (isDev) {
    console.log(`🔧 [DEBUG] ${message}`, data);
  }
};

export const performanceLog = (metric: string, value: number) => {
  if (isDev) {
    console.log(`⚡ [PERF] ${metric}: ${value}ms`);
  }
};

export const performanceStart = (label: string) => {
  if (isDev) {
    performance.mark(`${label}-start`);
  }
};

export const performanceEnd = (label: string) => {
  if (isDev) {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const measure = performance.getEntriesByName(label)[0];
    if (measure) {
      performanceLog(label, measure.duration);
    }
  }
};

export const networkLog = (url: string, method: string, status: number, time: number) => {
  if (isDev) {
    const statusColor = status >= 400 ? '🔴' : status >= 300 ? '🟡' : '🟢';
    console.log(`${statusColor} [NETWORK] ${method} ${url} - ${status} (${time}ms)`);
  }
};

export const errorLog = (error: Error, context?: string) => {
  if (isDev) {
    console.error(`🚨 [ERROR] ${context ? `[${context}] ` : ''}`, error);
  }
  
  // В production можно отправлять в Sentry
  if (!isDev && window.Sentry) {
    window.Sentry.captureException(error, {
      tags: { context }
    });
  }
};

// Unified logger for performance monitoring
export const devLogger = {
  info: (message: string, data?: any) => {
    if (isDev) {
      console.log(`ℹ️  [INFO] ${message}`, data);
    }
  },
  
  warn: (message: string, data?: any) => {
    if (isDev) {
      console.warn(`⚠️  [WARN] ${message}`, data);
    }
  },
  
  error: (message: string, data?: any) => {
    if (isDev) {
      console.error(`🚨 [ERROR] ${message}`, data);
    }
  },
  
  performance: (message: string, data?: any) => {
    if (isDev) {
      console.log(`⚡ [PERF] ${message}`, data);
    }
  },
  
  debug: (message: string, data?: any) => {
    if (isDev) {
      console.log(`🔧 [DEBUG] ${message}`, data);
    }
  }
};

// Hook для компонентов
export const usePerformanceLogger = (componentName: string) => {
  const startTime = performance.now();
  
  return {
    logRender: () => {
      const endTime = performance.now();
      performanceLog(`${componentName} render`, endTime - startTime);
    },
    logMount: () => {
      const endTime = performance.now();
      performanceLog(`${componentName} mount`, endTime - startTime);
    }
  };
};

// Performance baseline measurement
export const measureBaseline = () => {
  if (!isDev) return;
  
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'paint') {
        performanceLog(entry.name, entry.startTime);
      }
      
      if (entry.entryType === 'largest-contentful-paint') {
        performanceLog('LCP', entry.startTime);
      }
      
      if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
        debugLog('Layout Shift detected', {
          value: entry.value,
          sources: entry.sources
        });
      }
    });
  });
  
  observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
  
  // Cleanup
  return () => observer.disconnect();
}; 