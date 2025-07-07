/**
 * Critical CSS Extraction Utility
 * Extracts above-the-fold CSS for better performance
 */

// Critical CSS for immediate rendering
export const CRITICAL_CSS = `
  :root {
    --color-purple-deep: #2E1A47;
    --color-purple-bright: #9966CC;
    --color-brown-trust: #8B4513;
    --color-brown-action: #A0522D;
    --color-peach-warm: #E7B2A4;
    --color-cream: #F7E7CE;
    --color-gray-deep: #1A1A1A;
    --color-gray-light: #F5F5F5;
    
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    font-weight: 400;
    color: var(--color-gray-deep);
    background-color: #ffffff;
    
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Header critical styles */
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    z-index: 1000;
    transition: all 0.3s ease;
  }
  
  /* Navigation critical styles */
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  
  /* Hero section critical styles */
  .hero {
    padding-top: 80px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, var(--color-purple-deep), var(--color-purple-bright));
  }
  
  /* Typography critical styles */
  h1, h2, h3 {
    font-weight: 700;
    line-height: 1.2;
    color: var(--color-gray-deep);
  }
  
  h1 {
    font-size: 3rem;
  }
  
  h2 {
    font-size: 2.5rem;
  }
  
  h3 {
    font-size: 2rem;
  }
  
  /* Loading states */
  .loading-skeleton {
    background: linear-gradient(90deg, var(--color-gray-light) 25%, transparent 50%, var(--color-gray-light) 75%);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .container {
      padding: 0 0.5rem;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.75rem;
    }
    
    h3 {
      font-size: 1.5rem;
    }
  }
`;

// Non-critical CSS that can be loaded later
export const NON_CRITICAL_CSS_MODULES = [
  '/src/styles/blog.css',
  '/src/styles/tokens/motion.css',
  '/src/components/TestimonialsSection.css',
  '/src/components/ContactForm.css',
  '/src/components/Portfolio.css',
];

/**
 * Injects critical CSS into the document head
 */
export const injectCriticalCSS = (): void => {
  const styleElement = document.createElement('style');
  styleElement.textContent = CRITICAL_CSS;
  styleElement.dataset.critical = 'true';
  document.head.appendChild(styleElement);
};

/**
 * Preloads non-critical CSS modules
 */
export const preloadNonCriticalCSS = (): void => {
  NON_CRITICAL_CSS_MODULES.forEach(cssPath => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = cssPath;
    link.as = 'style';
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  });
};

/**
 * Loads non-critical CSS after page load
 */
export const loadNonCriticalCSS = (): void => {
  if (document.readyState === 'complete') {
    preloadNonCriticalCSS();
  } else {
    window.addEventListener('load', preloadNonCriticalCSS);
  }
};

/**
 * Performance-optimized CSS loading strategy
 */
export const initOptimizedCSS = (): void => {
  // 1. Inject critical CSS immediately
  injectCriticalCSS();
  
  // 2. Preload non-critical CSS
  requestIdleCallback(() => {
    loadNonCriticalCSS();
  }, { timeout: 2000 });
};

// Browser compatibility check
declare global {
  interface Window {
    requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback: (handle: number) => void;
  }
}

// Polyfill for requestIdleCallback
if (!window.requestIdleCallback) {
  window.requestIdleCallback = (callback, options = {}) => {
    const start = Date.now();
    return setTimeout(() => {
      callback({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
      });
    }, 1);
  };
}

export default {
  CRITICAL_CSS,
  NON_CRITICAL_CSS_MODULES,
  injectCriticalCSS,
  preloadNonCriticalCSS,
  loadNonCriticalCSS,
  initOptimizedCSS,
}; 