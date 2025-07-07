import plugin from 'tailwindcss/plugin';
const config = {
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
            },
            fontSize: {
                xs: 'var(--font-size-xs)',
                sm: 'var(--font-size-sm)',
                base: 'var(--font-size-md)',
                lg: 'var(--font-size-lg)',
                xl: 'var(--font-size-xl)',
                '2xl': 'var(--font-size-2xl)',
                '3xl': 'var(--font-size-3xl)',
                '4xl': 'var(--font-size-4xl)',
                hero: 'var(--font-size-hero)',
            },
            lineHeight: {
                tight: 'var(--line-height-tight)',
                snug: 'var(--line-height-snug)',
                normal: 'var(--line-height-normal)',
                relaxed: 'var(--line-height-relaxed)',
                loose: 'var(--line-height-loose)',
            },
        }
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant('hocus', ['&:hover', '&:focus']);
        }),
        plugin(({ addUtilities, theme }) => {
            const sizes = theme('fontSize');
            const lineHeights = theme('lineHeight');
            const utilities = Object.keys(sizes).reduce((acc, key) => {
                acc[`.text-${key}-tight`] = {
                    fontSize: sizes[key],
                    lineHeight: lineHeights.tight,
                };
                acc[`.text-${key}-normal`] = {
                    fontSize: sizes[key],
                    lineHeight: lineHeights.normal,
                };
                return acc;
            }, {});
            addUtilities(utilities, [{ variants: ['responsive'] }]);
        }),
    ]
};
export default config;
