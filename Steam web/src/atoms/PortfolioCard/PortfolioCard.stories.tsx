import type { Meta, StoryObj } from '@storybook/react';
import { PortfolioCard } from './PortfolioCard';

const meta: Meta<typeof PortfolioCard> = {
  title: 'Atoms/PortfolioCard',
  component: PortfolioCard,
  args: {
    title: 'Restaurant Website Redesign',
    category: 'Web Design',
    image: 'https://picsum.photos/seed/restaurant/600/400',
    description: 'Redesign of a restaurant website with online booking and menu showcase.',
    results: ['+35% online bookings', '+20% page speed'],
  },
};

export default meta;

type Story = StoryObj<typeof PortfolioCard>;

export const Default: Story = {}; 