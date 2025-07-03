import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    children: 'Click me',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Neutral: Story = {};

export const Trust: Story = {
  args: { variant: 'trust' },
};

export const Action: Story = {
  args: { variant: 'action' },
}; 