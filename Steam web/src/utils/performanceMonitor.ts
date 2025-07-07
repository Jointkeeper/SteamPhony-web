/**
 * Performance Monitor Utility
 * Real-time performance monitoring and Web Vitals tracking
 */

import { devLogger } from './devTools';

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  tti: number; // Time to Interactive
  tbt: number; // Total Blocking Time
  si: number; // Speed Index
}

export interface PerformanceThresholds {
  fcp: { good: number; poor: number };
  lcp: { good: number; poor: number };
  fid: { good: number; poor: number };
  cls: { good: number; poor: number };
  ttfb: { good: number; poor: number };
  tti: { good: number; poor: number };
}

// Google's Web Vitals thresholds
export const WEB_VITALS_THRESHOLDS: PerformanceThresholds = {
  fcp: { good: 1800, poor: 3000 },
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  ttfb: { good: 800, poor: 1800 },
  tti: { good: 3800, poor: 7300 },
};

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: Map<string, PerformanceObserver> = new Map();
  private isMonitoring: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      this.initializeMonitoring();
    }
  }

  /**
   * Initialize performance monitoring
   */
  private initializeMonitoring(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.measureTTFB();
    this.measureFCP();
    this.measureLCP();
    this.measureFID();
    this.measureCLS();
    this.measureTTI();
    this.measureTBT();
    this.setupResourceMonitoring();
  }

  /**
   * Measure Time to First Byte (TTFB)
   */
  private measureTTFB(): void {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      this.metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      this.logMetric('TTFB', this.metrics.ttfb);
    }
  }

  /**
   * Measure First Contentful Paint (FCP)
   */
  private measureFCP(): void {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
          this.logMetric('FCP', this.metrics.fcp);
        }
      });
    });

    observer.observe({ entryTypes: ['paint'] });
    this.observers.set('fcp', observer);
  }

  /**
   * Measure Largest Contentful Paint (LCP)
   */
  private measureLCP(): void {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        this.metrics.lcp = lastEntry.startTime;
        this.logMetric('LCP', this.metrics.lcp);
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.set('lcp', observer);
  }

  /**
   * Measure First Input Delay (FID)
   */
  private measureFID(): void {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-input') {
          this.metrics.fid = (entry as any).processingStart - entry.startTime;
          this.logMetric('FID', this.metrics.fid);
        }
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
    this.observers.set('fid', observer);
  }

  /**
   * Measure Cumulative Layout Shift (CLS)
   */
  private measureCLS(): void {
    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries: PerformanceEntry[] = [];

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (!(entry as any).hadRecentInput) {
          sessionValue += (entry as any).value;
          sessionEntries.push(entry);
        }
      });

      // Update CLS value
      clsValue = Math.max(clsValue, sessionValue);
      this.metrics.cls = clsValue;
      this.logMetric('CLS', this.metrics.cls);
    });

    observer.observe({ entryTypes: ['layout-shift'] });
    this.observers.set('cls', observer);
  }

  /**
   * Measure Time to Interactive (TTI)
   */
  private measureTTI(): void {
    // Simplified TTI measurement
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'interactive') {
          this.metrics.tti = entry.startTime;
          this.logMetric('TTI', this.metrics.tti);
        }
      });
    });

    // Fallback TTI calculation
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (!this.metrics.tti) {
          this.metrics.tti = performance.now();
          this.logMetric('TTI (estimated)', this.metrics.tti);
        }
      }, 5000);
    });

    this.observers.set('tti', observer);
  }

  /**
   * Measure Total Blocking Time (TBT)
   */
  private measureTBT(): void {
    let totalBlockingTime = 0;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.duration > 50) {
          totalBlockingTime += entry.duration - 50;
        }
      });
      
      this.metrics.tbt = totalBlockingTime;
      this.logMetric('TBT', this.metrics.tbt);
    });

    observer.observe({ entryTypes: ['longtask'] });
    this.observers.set('tbt', observer);
  }

  /**
   * Setup resource monitoring
   */
  private setupResourceMonitoring(): void {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.duration > 100) {
          devLogger.warn(`Slow resource: ${entry.name}`, {
            duration: entry.duration,
            size: (entry as any).transferSize,
            type: (entry as any).initiatorType,
          });
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
    this.observers.set('resource', observer);
  }

  /**
   * Log performance metric
   */
  private logMetric(name: string, value: number): void {
    const threshold = this.getThreshold(name.toLowerCase());
    const rating = this.getRating(value, threshold);
    
    devLogger.performance(`${name}: ${value.toFixed(2)}ms (${rating})`, {
      value,
      threshold,
      rating,
    });
  }

  /**
   * Get threshold for metric
   */
  private getThreshold(metric: string): { good: number; poor: number } | null {
    const key = metric.toLowerCase().replace(/[^a-z]/g, '') as keyof PerformanceThresholds;
    return WEB_VITALS_THRESHOLDS[key] || null;
  }

  /**
   * Get rating for metric value
   */
  private getRating(value: number, threshold: { good: number; poor: number } | null): string {
    if (!threshold) return 'unknown';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Get current metrics
   */
  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  /**
   * Get performance score
   */
  public getPerformanceScore(): number {
    const scores = {
      fcp: this.getMetricScore('fcp', this.metrics.fcp),
      lcp: this.getMetricScore('lcp', this.metrics.lcp),
      fid: this.getMetricScore('fid', this.metrics.fid),
      cls: this.getMetricScore('cls', this.metrics.cls),
      ttfb: this.getMetricScore('ttfb', this.metrics.ttfb),
      tti: this.getMetricScore('tti', this.metrics.tti),
    };

    const validScores = Object.values(scores).filter(score => score !== null);
    if (validScores.length === 0) return 0;

    return validScores.reduce((sum, score) => sum + score!, 0) / validScores.length;
  }

  /**
   * Get metric score (0-100)
   */
  private getMetricScore(metric: string, value: number | undefined): number | null {
    if (value === undefined) return null;
    
    const threshold = this.getThreshold(metric);
    if (!threshold) return null;

    if (value <= threshold.good) return 100;
    if (value <= threshold.poor) return 50;
    return 0;
  }

  /**
   * Generate performance report
   */
  public generateReport(): string {
    const metrics = this.getMetrics();
    const score = this.getPerformanceScore();
    
    let report = `Performance Report\n`;
    report += `===================\n`;
    report += `Overall Score: ${score.toFixed(1)}/100\n\n`;
    
    Object.entries(metrics).forEach(([key, value]) => {
      const threshold = this.getThreshold(key);
      const rating = this.getRating(value, threshold);
      report += `${key.toUpperCase()}: ${value.toFixed(2)}ms (${rating})\n`;
    });
    
    return report;
  }

  /**
   * Cleanup observers
   */
  public cleanup(): void {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
    this.isMonitoring = false;
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = (): void => {
  if (process.env.NODE_ENV === 'development') {
    devLogger.info('Performance monitoring initialized');
  }
};

/**
 * Track custom performance mark
 */
export const trackPerformanceMark = (name: string): void => {
  if ('performance' in window) {
    performance.mark(name);
  }
};

/**
 * Track custom performance measure
 */
export const trackPerformanceMeasure = (name: string, startMark: string, endMark?: string): void => {
  if ('performance' in window) {
    try {
      performance.measure(name, startMark, endMark);
      const entries = performance.getEntriesByName(name, 'measure');
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        devLogger.performance(`${name}: ${lastEntry.duration.toFixed(2)}ms`);
      }
    } catch (error) {
      devLogger.warn(`Performance measure failed for ${name}:`, error);
    }
  }
};

/**
 * Track component render time
 */
export const trackComponentRender = (componentName: string) => {
  const startMark = `${componentName}-render-start`;
  const endMark = `${componentName}-render-end`;
  
  return {
    start: () => trackPerformanceMark(startMark),
    end: () => {
      trackPerformanceMark(endMark);
      trackPerformanceMeasure(`${componentName}-render`, startMark, endMark);
    },
  };
};

/**
 * Get Web Vitals summary
 */
export const getWebVitalsSummary = (): { metric: string; value: number; rating: string }[] => {
  const metrics = performanceMonitor.getMetrics();
  const summary: { metric: string; value: number; rating: string }[] = [];
  
  Object.entries(metrics).forEach(([key, value]) => {
    const threshold = performanceMonitor['getThreshold'](key);
    const rating = performanceMonitor['getRating'](value, threshold);
    
    summary.push({
      metric: key.toUpperCase(),
      value,
      rating,
    });
  });
  
  return summary;
};

export default {
  performanceMonitor,
  initPerformanceMonitoring,
  trackPerformanceMark,
  trackPerformanceMeasure,
  trackComponentRender,
  getWebVitalsSummary,
  WEB_VITALS_THRESHOLDS,
}; 