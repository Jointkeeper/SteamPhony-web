import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialsSection } from './TestimonialsSection';

const meta: Meta<typeof TestimonialsSection> = {
  title: 'Sections/TestimonialsSection',
  component: TestimonialsSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof TestimonialsSection>;

export const Default: Story = {};

export const NoAutoplay: Story = {
  args: {}, // Component controls autoPlay internally; in this basic variant we simply render.
  parameters: {
    // Disable storyboard animation snapshot testing if needed
  },
}; 