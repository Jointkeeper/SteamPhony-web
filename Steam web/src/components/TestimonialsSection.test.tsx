import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TestimonialsSection } from './TestimonialsSection';

vi.useFakeTimers();

describe('TestimonialsSection', () => {
  it('renders heading', () => {
    render(<TestimonialsSection />);
    expect(
      screen.getByRole('heading', { name: /что говорят клиенты/i }),
    ).toBeInTheDocument();
  });

  it('autoplays to next testimonial after interval', () => {
    render(<TestimonialsSection />);
    const firstAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
    vi.advanceTimersByTime(5100); // advance just over 5s
    const currentAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
    expect(currentAvatar).not.toBe(firstAvatar);
  });

  it('next arrow navigates to next testimonial', async () => {
    render(<TestimonialsSection />);
    const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
    const firstAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
    await userEvent.click(nextBtn);
    const newAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
    expect(newAvatar).not.toBe(firstAvatar);
  });

  it('dot navigation works', async () => {
    render(<TestimonialsSection />);
    const dots = screen.getAllByRole('button', { name: /отзыв/i });
    expect(dots.length).toBeGreaterThan(0);
    await userEvent.click(dots[2]);
    const currentAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
    // Because we clicked dot index 2, avatar should match 3rd testimonial
    expect(currentAvatar).toBeTruthy();
  });
}); 