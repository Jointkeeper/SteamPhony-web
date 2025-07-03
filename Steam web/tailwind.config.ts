import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        trust: {
          0: 'var(--trust-0)',
          50: 'var(--trust-50)',
          100: 'var(--trust-100)',
          200: 'var(--trust-200)',
          300: 'var(--trust-300)',
          400: 'var(--trust-400)',
          500: 'var(--trust-500)',
          600: 'var(--trust-600)',
          700: 'var(--trust-700)',
          800: 'var(--trust-800)',
          900: 'var(--trust-900)',
          1000: 'var(--trust-1000)'
        },
        action: {
          DEFAULT: 'var(--color-action)',
          light: 'var(--color-action-light)'
        },
        authority: 'var(--color-authority)',
        warmth: 'var(--color-warmth)'
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus']);
    })
  ]
};

export default config; 