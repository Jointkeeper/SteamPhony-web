/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        accent: {
          500: '#f59e0b',
          600: '#d97706',
        },
        purple: {
          deep: 'var(--color-purple-deep)',    // Deep Purple - премиальность, инновации
          bright: 'var(--color-purple-bright)',  // Bright Purple - акценты, интерактивные элементы
        },
        brown: {
          trust: 'var(--color-brown-trust)',   // Trust Brown - основные CTA
          action: 'var(--color-brown-action)',  // Action Brown - вторичные CTA
        },
        peach: {
          warm: 'var(--color-peach-warm)',    // Warm Peach - фоны, мягкие акценты
        },
        cream: 'var(--color-cream)',    // Cream - светлые секции
        gray: {
          deep: 'var(--color-gray-deep)',    // Deep Gray - тексты
          light: 'var(--color-gray-light)',   // Light Gray - фоны
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1-mobile': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1-desktop': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2-mobile': ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2-desktop': ['36px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3-mobile': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'h3-desktop': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
