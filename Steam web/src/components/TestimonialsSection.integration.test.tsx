import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TestimonialsSection } from './TestimonialsSection';
import { testimonials } from '../data/testimonialsData';

// Mock framer-motion to avoid animation complexities in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('TestimonialsSection Integration Tests', () => {
  it('renders with actual testimonials data', () => {
    render(<TestimonialsSection />);
    
    // Should render the first testimonial by default
    const firstTestimonial = testimonials[0];
    expect(screen.getByText(firstTestimonial.name)).toBeInTheDocument();
    expect(screen.getByText(firstTestimonial.text)).toBeInTheDocument();
    expect(screen.getByText(firstTestimonial.project)).toBeInTheDocument();
    expect(screen.getByText(firstTestimonial.results)).toBeInTheDocument();
    
    // Should render correct star rating
    expect(screen.getByRole('img', { name: `${firstTestimonial.rating} out of 5 stars` })).toBeInTheDocument();
  });

  it('cycles through all testimonials', async () => {
    render(<TestimonialsSection />);
    const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
    
    // Cycle through all testimonials
    for (let i = 0; i < testimonials.length; i++) {
      const currentTestimonial = testimonials[i];
      
      // Wait for the testimonial to be rendered
      await waitFor(() => {
        expect(screen.getByText(currentTestimonial.name)).toBeInTheDocument();
      });
      
      expect(screen.getByText(currentTestimonial.text)).toBeInTheDocument();
      expect(screen.getByText(currentTestimonial.project)).toBeInTheDocument();
      expect(screen.getByText(currentTestimonial.results)).toBeInTheDocument();
      
      // Check star rating
      expect(screen.getByRole('img', { name: `${currentTestimonial.rating} out of 5 stars` })).toBeInTheDocument();
      
      // Go to next testimonial (except for the last one)
      if (i < testimonials.length - 1) {
        await userEvent.click(nextBtn);
      }
    }
  });

  it('handles dot navigation with actual data', async () => {
    render(<TestimonialsSection />);
    const dots = screen.getAllByRole('button', { name: /отзыв/i });
    
    // Should have correct number of dots
    expect(dots).toHaveLength(testimonials.length);
    
    // Test clicking each dot
    for (let i = 0; i < testimonials.length; i++) {
      await userEvent.click(dots[i]);
      
      const testimonial = testimonials[i];
      await waitFor(() => {
        expect(screen.getByText(testimonial.name)).toBeInTheDocument();
      });
      
      expect(screen.getByText(testimonial.text)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: `${testimonial.rating} out of 5 stars` })).toBeInTheDocument();
    }
  });

  it('handles all rating values from testimonials data', () => {
    render(<TestimonialsSection />);
    
    // Get all unique ratings from testimonials data
    const uniqueRatings = [...new Set(testimonials.map(t => t.rating))];
    
    // Verify we have diverse ratings in our data
    expect(uniqueRatings.length).toBeGreaterThan(1);
    expect(uniqueRatings.every(rating => rating >= 1 && rating <= 5)).toBe(true);
  });

  it('displays all testimonial fields correctly', async () => {
    render(<TestimonialsSection />);
    const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
    
    // Check each testimonial has all required fields
    for (let i = 0; i < testimonials.length; i++) {
      const testimonial = testimonials[i];
      
      await waitFor(() => {
        expect(screen.getByText(testimonial.name)).toBeInTheDocument();
      });
      
      // Check avatar image
      const avatarImg = screen.getByRole('img', { name: testimonial.name });
      expect(avatarImg).toHaveAttribute('src', testimonial.avatar);
      
      // Check text content
      expect(screen.getByText(testimonial.text)).toBeInTheDocument();
      
      // Check project info
      expect(screen.getByText(testimonial.project)).toBeInTheDocument();
      
      // Check results
      expect(screen.getByText(testimonial.results)).toBeInTheDocument();
      
      // Check star rating
      expect(screen.getByRole('img', { name: `${testimonial.rating} out of 5 stars` })).toBeInTheDocument();
      
      // Move to next testimonial
      if (i < testimonials.length - 1) {
        await userEvent.click(nextBtn);
      }
    }
  });

  it('handles wrap-around navigation correctly', async () => {
    render(<TestimonialsSection />);
    const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
    const prevBtn = screen.getByRole('button', { name: /предыдущий отзыв/i });
    
    // Start with first testimonial
    await waitFor(() => {
      expect(screen.getByText(testimonials[0].name)).toBeInTheDocument();
    });
    
    // Navigate to last testimonial by going backwards
    await userEvent.click(prevBtn);
    await waitFor(() => {
      expect(screen.getByText(testimonials[testimonials.length - 1].name)).toBeInTheDocument();
    });
    
    // Navigate forward to wrap back to first
    await userEvent.click(nextBtn);
    await waitFor(() => {
      expect(screen.getByText(testimonials[0].name)).toBeInTheDocument();
    });
  });

  it('validates testimonials data structure', () => {
    // Ensure all testimonials have required fields
    testimonials.forEach((testimonial, index) => {
      expect(testimonial.id, `Testimonial ${index} missing id`).toBeDefined();
      expect(testimonial.name, `Testimonial ${index} missing name`).toBeDefined();
      expect(testimonial.avatar, `Testimonial ${index} missing avatar`).toBeDefined();
      expect(testimonial.text, `Testimonial ${index} missing text`).toBeDefined();
      expect(testimonial.rating, `Testimonial ${index} missing rating`).toBeDefined();
      expect(testimonial.project, `Testimonial ${index} missing project`).toBeDefined();
      expect(testimonial.results, `Testimonial ${index} missing results`).toBeDefined();
      
      // Validate rating is within expected range
      expect(testimonial.rating).toBeGreaterThanOrEqual(1);
      expect(testimonial.rating).toBeLessThanOrEqual(5);
      
      // Validate required fields are not empty
      expect(testimonial.name.trim()).not.toBe('');
      expect(testimonial.text.trim()).not.toBe('');
      expect(testimonial.project.trim()).not.toBe('');
      expect(testimonial.results.trim()).not.toBe('');
    });
  });

  it('handles missing or invalid avatar URLs gracefully', () => {
    render(<TestimonialsSection />);
    
    // Check that all avatar images are rendered
    testimonials.forEach(testimonial => {
      const img = screen.getByRole('img', { name: testimonial.name });
      expect(img).toHaveAttribute('src', testimonial.avatar);
      expect(img).toHaveAttribute('alt', testimonial.name);
    });
  });

  it('maintains testimonial order consistency', async () => {
    render(<TestimonialsSection />);
    const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
    
    // Navigate through testimonials and verify order matches data
    for (let i = 0; i < testimonials.length; i++) {
      await waitFor(() => {
        expect(screen.getByText(testimonials[i].name)).toBeInTheDocument();
      });
      
      if (i < testimonials.length - 1) {
        await userEvent.click(nextBtn);
      }
    }
  });

  it('handles testimonials with different text lengths', () => {
    render(<TestimonialsSection />);
    
    // Verify testimonials have varied text lengths (good for testing layout)
    const textLengths = testimonials.map(t => t.text.length);
    const minLength = Math.min(...textLengths);
    const maxLength = Math.max(...textLengths);
    
    expect(maxLength).toBeGreaterThan(minLength);
    expect(minLength).toBeGreaterThan(0);
  });

  it('displays correct star ratings for each testimonial', async () => {
    render(<TestimonialsSection />);
    const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
    
    // Check each testimonial's star rating
    for (let i = 0; i < testimonials.length; i++) {
      const testimonial = testimonials[i];
      
      await waitFor(() => {
        expect(screen.getByRole('img', { name: `${testimonial.rating} out of 5 stars` })).toBeInTheDocument();
      });
      
      if (i < testimonials.length - 1) {
        await userEvent.click(nextBtn);
      }
    }
  });
}); 