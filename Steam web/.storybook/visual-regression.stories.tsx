import { Meta } from '@storybook/react';
import { Button, PortfolioCard } from '@atoms';
import { ContactForm } from '@molecules';

const meta: Meta = {
  title: 'Visual Regression/Complete UI State Matrix',
  parameters: {
    percy: { skip: false },
    a11y: { disable: true },
  },
};

export default meta;

const mockCard = {
  title: 'Marketing Website',
  category: 'Web',
  image: 'https://picsum.photos/seed/x/600/400',
  description: 'Landing page redesign with conversion boost',
};

export const CompleteUIStateMatrix = () => (
  <div className="p-8 space-y-12">
    <section>
      <h2 className="text-2xl mb-4">Button States</h2>
      <div className="grid grid-cols-6 gap-4">
        {(['trust', 'action', 'neutral'] as const).map((variant) => (
          <>
            <Button key={`${variant}-default`} variant={variant}>
              {variant}
            </Button>
            <Button key={`${variant}-loading`} variant={variant} loading>
              {variant}
            </Button>
            <Button key={`${variant}-disabled`} variant={variant} disabled>
              {variant}
            </Button>
          </>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-2xl mb-4">PortfolioCard</h2>
      <div className="grid grid-cols-3 gap-6">
        <PortfolioCard {...mockCard} />
        <PortfolioCard {...mockCard} />
        <PortfolioCard {...mockCard} />
      </div>
    </section>

    <section>
      <h2 className="text-2xl mb-4">ContactForm</h2>
      <ContactForm />
    </section>
  </div>
); 