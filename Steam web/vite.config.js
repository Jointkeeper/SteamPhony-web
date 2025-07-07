import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
    },
    server: {
      port: 3000,
      host: true,
    },
    preview: {
      port: 3000,
      host: true,
    },
    build: {
      // Performance optimization
      chunkSizeWarningLimit: 300, // Stricter warning at 300KB instead of 500KB
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching and loading performance
          manualChunks: (id) => {
            // Vendor chunk for React ecosystem
            if (id.includes('node_modules')) {
              // React core libraries
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              
              // Router and navigation
              if (id.includes('react-router') || id.includes('react-helmet')) {
                return 'router-vendor';
              }
              
              // Animation libraries
              if (id.includes('framer-motion')) {
                return 'animations-vendor';
              }
              
              // UI and styling utilities
              if (id.includes('clsx') || id.includes('tailwindcss')) {
                return 'ui-vendor';
              }
              
              // Internationalization
              if (id.includes('i18next') || id.includes('react-i18next')) {
                return 'i18n-vendor';
              }
              
              // Analytics and monitoring
              if (id.includes('sentry') || id.includes('react-ga4')) {
                return 'analytics-vendor';
              }
              
              // Utility libraries
              if (id.includes('uuid') || id.includes('js-cookie')) {
                return 'utils-vendor';
              }
              
              // Testing libraries (shouldn't be in production but just in case)
              if (id.includes('@testing-library') || id.includes('vitest')) {
                return 'test-vendor';
              }
              
              // All other vendor libraries
              return 'vendor';
            }
            
            // Split large page components
            if (id.includes('/pages/Home')) {
              return 'page-home';
            }
            if (id.includes('/pages/Services')) {
              return 'page-services';
            }
            if (id.includes('/pages/Portfolio')) {
              return 'page-portfolio';
            }
            if (id.includes('/pages/Contact')) {
              return 'page-contact';
            }
            
            // Split component libraries
            if (id.includes('/components/TestimonialsSection')) {
              return 'testimonials';
            }
            if (id.includes('/components/Header') || id.includes('/components/Footer')) {
              return 'layout';
            }
            
            // Split data and utilities
            if (id.includes('/data/') || id.includes('/hooks/')) {
              return 'app-utils';
            }
          },
        },
      },
      // Additional optimization
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: mode !== 'production',
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
  }
})
