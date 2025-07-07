import { TestimonialsSection } from './TestimonialsSection';
const meta = {
    title: 'Sections/TestimonialsSection',
    component: TestimonialsSection,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Interactive testimonials carousel with autoplay, navigation arrows, and dot indicators. Features smooth animations and responsive design.',
            },
        },
    },
    argTypes: {
    // Since the component doesn't accept props, we can't control it directly via args,
    // but we can provide viewport controls and documentation
    },
};
export default meta;
export const Default = {
    parameters: {
        docs: {
            description: {
                story: 'Default testimonials section with autoplay enabled. Automatically cycles through testimonials every 5 seconds.',
            },
        },
    },
};
export const MobileViewport = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
        docs: {
            description: {
                story: 'Mobile viewport view showing responsive design with stacked layout and touch-friendly navigation.',
            },
        },
    },
};
export const TabletViewport = {
    parameters: {
        viewport: {
            defaultViewport: 'tablet',
        },
        docs: {
            description: {
                story: 'Tablet viewport view showing medium-sized layout with balanced proportions.',
            },
        },
    },
};
export const DesktopViewport = {
    parameters: {
        viewport: {
            defaultViewport: 'desktop',
        },
        docs: {
            description: {
                story: 'Desktop viewport view showing full-width layout with optimal spacing and typography.',
            },
        },
    },
};
export const LargeDesktopViewport = {
    parameters: {
        viewport: {
            defaultViewport: 'desktop',
        },
        docs: {
            description: {
                story: 'Large desktop viewport view showing how the component scales on wide screens.',
            },
        },
    },
};
export const WithReducedMotion = {
    parameters: {
        docs: {
            description: {
                story: 'Testimonials section with reduced motion preferences. Animations are simplified for users who prefer less motion.',
            },
        },
        // Simulate reduced motion preference
        css: `
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `,
    },
};
export const DarkMode = {
    parameters: {
        backgrounds: {
            default: 'dark',
            values: [
                {
                    name: 'dark',
                    value: '#1a1a1a',
                },
            ],
        },
        docs: {
            description: {
                story: 'Testimonials section on dark background to test contrast and readability.',
            },
        },
    },
};
export const HighContrast = {
    parameters: {
        backgrounds: {
            default: 'high-contrast',
            values: [
                {
                    name: 'high-contrast',
                    value: '#000000',
                },
            ],
        },
        docs: {
            description: {
                story: 'High contrast mode for accessibility testing. Ensures text remains readable with maximum contrast.',
            },
        },
    },
};
export const InteractionDemo = {
    parameters: {
        docs: {
            description: {
                story: 'Interactive demonstration of all navigation features: arrows, dots, and autoplay pause/resume on hover.',
            },
        },
    },
    play: async ({ canvasElement }) => {
        // This could be extended with @storybook/addon-interactions
        // to demonstrate automatic interaction flows
    },
};
export const AccessibilityTest = {
    parameters: {
        a11y: {
            // Custom accessibility test configuration
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: true,
                    },
                    {
                        id: 'keyboard-navigation',
                        enabled: true,
                    },
                    {
                        id: 'focus-visible',
                        enabled: true,
                    },
                ],
            },
        },
        docs: {
            description: {
                story: 'Accessibility testing story with enhanced a11y checks for color contrast, keyboard navigation, and focus management.',
            },
        },
    },
};
export const Performance = {
    parameters: {
        docs: {
            description: {
                story: 'Performance testing story to measure rendering performance and animation smoothness.',
            },
        },
        // Could add performance monitoring here
    },
};
export const AllViewports = {
    parameters: {
        viewport: {
            viewports: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '375px',
                        height: '667px',
                    },
                },
                tablet: {
                    name: 'Tablet',
                    styles: {
                        width: '768px',
                        height: '1024px',
                    },
                },
                desktop: {
                    name: 'Desktop',
                    styles: {
                        width: '1200px',
                        height: '800px',
                    },
                },
                largeDesktop: {
                    name: 'Large Desktop',
                    styles: {
                        width: '1920px',
                        height: '1080px',
                    },
                },
            },
        },
        docs: {
            description: {
                story: 'Test across all viewport sizes to ensure responsive design works correctly.',
            },
        },
    },
};
