import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StarRating } from './StarRating';

describe('StarRating', () => {
  it('renders correct aria label', () => {
    render(<StarRating rating={4} />);
    expect(screen.getByRole('img', { name: /4 out of 5 stars/i })).toBeInTheDocument();
  });

  it('renders five stars', () => {
    render(<StarRating rating={3} />);
    const container = screen.getByRole('img');
    expect(container.querySelectorAll('svg')).toHaveLength(5);
  });
}); 