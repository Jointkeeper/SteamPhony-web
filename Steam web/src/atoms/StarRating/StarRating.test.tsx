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

  it('renders correct number of filled stars', () => {
    const { container } = render(<StarRating rating={3} />);
    const filledStars = container.querySelectorAll('svg[fill="currentColor"]');
    expect(filledStars).toHaveLength(3);
  });

  it('renders correct number of empty stars', () => {
    const { container } = render(<StarRating rating={2} />);
    const emptyStars = container.querySelectorAll('svg[fill="none"]');
    expect(emptyStars).toHaveLength(3);
  });

  it('handles all rating values correctly', () => {
    const ratings = [1, 2, 3, 4, 5] as const;
    
    ratings.forEach(rating => {
      const { container } = render(<StarRating rating={rating} />);
      const filledStars = container.querySelectorAll('svg[fill="currentColor"]');
      expect(filledStars).toHaveLength(rating);
    });
  });

  it('applies custom className', () => {
    const { container } = render(<StarRating rating={5} className="custom-class" />);
    const starRating = container.querySelector('.custom-class');
    expect(starRating).toBeInTheDocument();
  });

  it('applies custom size', () => {
    const { container } = render(<StarRating rating={5} size={24} />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveAttribute('width', '24');
      expect(star).toHaveAttribute('height', '24');
    });
  });

  it('uses default size when not specified', () => {
    const { container } = render(<StarRating rating={5} />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveAttribute('width', '20');
      expect(star).toHaveAttribute('height', '20');
    });
  });

  it('spreads additional props to container', () => {
    const { container } = render(
      <StarRating rating={5} data-testid="star-rating" title="Rating" />
    );
    const starRating = container.querySelector('[data-testid="star-rating"]');
    expect(starRating).toBeInTheDocument();
    expect(starRating).toHaveAttribute('title', 'Rating');
  });

  it('has proper accessibility attributes', () => {
    render(<StarRating rating={4} />);
    const starRating = screen.getByRole('img', { name: /4 out of 5 stars/i });
    expect(starRating).toHaveAttribute('role', 'img');
    expect(starRating).toHaveAttribute('aria-label', '4 out of 5 stars');
  });

  it('renders with correct CSS classes', () => {
    const { container } = render(<StarRating rating={3} />);
    const starRating = container.querySelector('.inline-flex.gap-0\\.5.text-yellow-400');
    expect(starRating).toBeInTheDocument();
  });

  it('has proper SVG attributes for accessibility', () => {
    const { container } = render(<StarRating rating={3} />);
    const stars = container.querySelectorAll('svg');
    
    stars.forEach(star => {
      expect(star).toHaveAttribute('role', 'presentation');
      expect(star).toHaveAttribute('viewBox', '0 0 24 24');
      expect(star).toHaveAttribute('stroke', 'currentColor');
      expect(star).toHaveAttribute('stroke-width', '2');
      expect(star).toHaveAttribute('stroke-linecap', 'round');
      expect(star).toHaveAttribute('stroke-linejoin', 'round');
    });
  });

  it('handles edge cases', () => {
    // Test minimum rating
    const { container: minContainer } = render(<StarRating rating={1} />);
    const minFilledStars = minContainer.querySelectorAll('svg[fill="currentColor"]');
    expect(minFilledStars).toHaveLength(1);
    
    // Test maximum rating
    const { container: maxContainer } = render(<StarRating rating={5} />);
    const maxFilledStars = maxContainer.querySelectorAll('svg[fill="currentColor"]');
    expect(maxFilledStars).toHaveLength(5);
  });

  it('has correct displayName', () => {
    expect(StarRating.displayName).toBe('StarRating');
  });

  it('renders consistently with same props', () => {
    const { container: container1 } = render(<StarRating rating={3} />);
    const { container: container2 } = render(<StarRating rating={3} />);
    
    expect(container1.innerHTML).toBe(container2.innerHTML);
  });
}); 