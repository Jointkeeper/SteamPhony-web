/**
 * Bundle Optimization Utility
 * Analyzes and optimizes bundle sizes for better performance
 */

import { devLogger } from './devTools';

export interface BundleAnalysis {
  totalSize: number;
  gzippedSize: number;
  chunks: ChunkInfo[];
  recommendations: string[];
}

export interface ChunkInfo {
  name: string;
  size: number;
  gzippedSize: number;
  modules: string[];
  type: 'vendor' | 'app' | 'async' | 'css';
}

// Critical dependencies that should be in main bundle
const CRITICAL_DEPENDENCIES = [
  'react',
  'react-dom',
  'react-router-dom',
];

// Heavy dependencies that should be code-split
const HEAVY_DEPENDENCIES = [
  'framer-motion',
  'three',
  'lodash',
  'moment',
  'chart.js',
  'monaco-editor',
];

// Async loading patterns
const ASYNC_PATTERNS = {
  components: /^\.\/pages\/|^\.\/components\/.*Modal/,
  utils: /^\.\/utils\/.*(?:Chart|Analytics|Editor)/,
  locales: /^\.\/locales\//,
};

/**
 * Analyzes current bundle composition
 */
export const analyzeBundleComposition = async (): Promise<BundleAnalysis> => {
  const analysis: BundleAnalysis = {
    totalSize: 0,
    gzippedSize: 0,
    chunks: [],
    recommendations: [],
  };

  try {
    // In development, simulate bundle analysis
    if (process.env.NODE_ENV === 'development') {
      return simulateProductionAnalysis();
    }

    // In production, use real bundle stats
    const bundleStats = await fetchBundleStats();
    return processBundleStats(bundleStats);
  } catch (error) {
    devLogger.error('Bundle analysis failed:', error);
    return analysis;
  }
};

/**
 * Simulates production bundle analysis for development
 */
const simulateProductionAnalysis = (): BundleAnalysis => {
  const chunks: ChunkInfo[] = [
    {
      name: 'main',
      size: 450 * 1024, // 450KB
      gzippedSize: 150 * 1024, // 150KB
      modules: ['react', 'react-dom', 'app'],
      type: 'app',
    },
    {
      name: 'vendors',
      size: 320 * 1024, // 320KB
      gzippedSize: 110 * 1024, // 110KB
      modules: ['react', 'react-dom', 'react-router-dom'],
      type: 'vendor',
    },
    {
      name: 'animations',
      size: 180 * 1024, // 180KB
      gzippedSize: 65 * 1024, // 65KB
      modules: ['framer-motion', 'lottie-react'],
      type: 'async',
    },
    {
      name: 'styles',
      size: 85 * 1024, // 85KB
      gzippedSize: 25 * 1024, // 25KB
      modules: ['tailwind', 'custom-styles'],
      type: 'css',
    },
  ];

  const totalSize = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
  const gzippedSize = chunks.reduce((sum, chunk) => sum + chunk.gzippedSize, 0);

  return {
    totalSize,
    gzippedSize,
    chunks,
    recommendations: generateRecommendations(chunks),
  };
};

/**
 * Fetches real bundle statistics
 */
const fetchBundleStats = async (): Promise<any> => {
  // This would integrate with webpack-bundle-analyzer or similar
  throw new Error('Production bundle analysis not implemented');
};

/**
 * Processes bundle statistics
 */
const processBundleStats = (stats: any): BundleAnalysis => {
  // Process real bundle stats
  throw new Error('Production bundle processing not implemented');
};

/**
 * Generates optimization recommendations
 */
const generateRecommendations = (chunks: ChunkInfo[]): string[] => {
  const recommendations: string[] = [];

  // Check for oversized main bundle
  const mainChunk = chunks.find(chunk => chunk.name === 'main');
  if (mainChunk && mainChunk.size > 500 * 1024) {
    recommendations.push('Main bundle is too large. Consider code splitting heavy components.');
  }

  // Check for vendor bundle optimization
  const vendorChunk = chunks.find(chunk => chunk.type === 'vendor');
  if (vendorChunk && vendorChunk.size > 300 * 1024) {
    recommendations.push('Vendor bundle is large. Consider splitting into multiple vendor chunks.');
  }

  // Check for async chunk optimization
  const asyncChunks = chunks.filter(chunk => chunk.type === 'async');
  if (asyncChunks.length === 0) {
    recommendations.push('No async chunks detected. Implement code splitting for better performance.');
  }

  // Check for CSS optimization
  const cssChunk = chunks.find(chunk => chunk.type === 'css');
  if (cssChunk && cssChunk.size > 100 * 1024) {
    recommendations.push('CSS bundle is large. Consider critical CSS extraction.');
  }

  return recommendations;
};

/**
 * Dynamic import helper with error handling
 */
export const lazyImport = <T>(
  importFn: () => Promise<T>,
  retryCount: number = 3
): Promise<T> => {
  let attempts = 0;
  
  const attemptImport = async (): Promise<T> => {
    try {
      return await importFn();
    } catch (error) {
      attempts++;
      devLogger.warn(`Lazy import failed, attempt ${attempts}/${retryCount}`, error);
      
      if (attempts >= retryCount) {
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
      return attemptImport();
    }
  };
  
  return attemptImport();
};

/**
 * Preloads critical chunks
 */
export const preloadCriticalChunks = (): void => {
  const criticalChunks = [
    '/js/vendors.js',
    '/js/main.js',
    '/css/main.css',
  ];

  criticalChunks.forEach(chunk => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = chunk;
    link.as = chunk.endsWith('.js') ? 'script' : 'style';
    document.head.appendChild(link);
  });
};

/**
 * Monitors bundle loading performance
 */
export const monitorBundleLoading = (): void => {
  // Track script loading times
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.name.includes('.js') || entry.name.includes('.css')) {
        devLogger.performance(`Bundle loaded: ${entry.name}`, {
          duration: entry.duration,
          size: entry.transferSize,
          type: entry.initiatorType,
        });
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
};

/**
 * Code splitting configuration helper
 */
export const createSplitConfig = () => ({
  // Vendor chunk splitting
  vendor: {
    name: 'vendor',
    test: /[\\/]node_modules[\\/]/,
    priority: 10,
    chunks: 'all',
  },
  
  // Common chunk splitting
  common: {
    name: 'common',
    minChunks: 2,
    chunks: 'all',
    priority: 5,
  },
  
  // Async chunk splitting
  async: {
    name: 'async',
    chunks: 'async',
    priority: 1,
  },
});

/**
 * Tree shaking helper
 */
export const getTreeShakingConfig = () => ({
  usedExports: true,
  sideEffects: false,
  optimization: {
    providedExports: true,
    usedExports: true,
    sideEffects: false,
  },
});

/**
 * Performance budget enforcement
 */
export const PERFORMANCE_BUDGETS = {
  maxAssetSize: 500 * 1024, // 500KB
  maxEntrypointSize: 750 * 1024, // 750KB
  maxChunkSize: 300 * 1024, // 300KB
};

/**
 * Checks if bundle sizes exceed performance budgets
 */
export const checkPerformanceBudgets = (analysis: BundleAnalysis): string[] => {
  const violations: string[] = [];

  if (analysis.totalSize > PERFORMANCE_BUDGETS.maxEntrypointSize) {
    violations.push(`Total bundle size (${formatBytes(analysis.totalSize)}) exceeds budget (${formatBytes(PERFORMANCE_BUDGETS.maxEntrypointSize)})`);
  }

  analysis.chunks.forEach(chunk => {
    if (chunk.size > PERFORMANCE_BUDGETS.maxChunkSize) {
      violations.push(`Chunk ${chunk.name} (${formatBytes(chunk.size)}) exceeds budget (${formatBytes(PERFORMANCE_BUDGETS.maxChunkSize)})`);
    }
  });

  return violations;
};

/**
 * Formats bytes to human readable format
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export default {
  analyzeBundleComposition,
  lazyImport,
  preloadCriticalChunks,
  monitorBundleLoading,
  createSplitConfig,
  getTreeShakingConfig,
  checkPerformanceBudgets,
  formatBytes,
  PERFORMANCE_BUDGETS,
}; 