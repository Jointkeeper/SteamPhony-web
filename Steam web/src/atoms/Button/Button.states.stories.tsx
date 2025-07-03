import { Meta } from '@storybook/react';
import { Button } from './Button';

const meta: Meta = {
  title: 'Atoms/Button/StatesMatrix',
  parameters: {
    percy: { skip: false },
    a11y: { disable: true },
  },
};

export default meta;

const variants: Array<Parameters<typeof Button>[0]['variant']> = [
  'trust',
  'action',
  'neutral',
];

export const Matrix = () => (
  <div className="grid grid-cols-5 gap-4">
    {variants.map((variant) => (
      <div key={variant} className="flex flex-col items-start gap-2">
        <Button variant={variant}>Default</Button>
        <Button variant={variant} className="hover:-translate-y-0.5">
          Hover
        </Button>
        <Button variant={variant} className="active:scale-95">
          Active
        </Button>
        <Button variant={variant} disabled>
          Disabled
        </Button>
        <Button variant={variant} loading>
          Loading
        </Button>
      </div>
    ))}
  </div>
); 