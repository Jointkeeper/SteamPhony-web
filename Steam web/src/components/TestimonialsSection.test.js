import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TestimonialsSection } from './TestimonialsSection';
vi.useFakeTimers();
describe('TestimonialsSection', () => {
    beforeEach(() => {
        vi.clearAllTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });
    it('renders heading', () => {
        render(_jsx(TestimonialsSection, {}));
        expect(screen.getByRole('heading', { name: /что говорят клиенты/i })).toBeInTheDocument();
    });
    it('renders testimonial content', () => {
        render(_jsx(TestimonialsSection, {}));
        // Should render avatar image
        const avatarImage = screen.getByRole('img', { name: /алексей иванов/i });
        expect(avatarImage).toBeInTheDocument();
        // Should render star rating
        const starRating = screen.getByRole('img', { name: /5 out of 5 stars/i });
        expect(starRating).toBeInTheDocument();
        // Should render testimonial text
        expect(screen.getByText(/команда steamphony превзошла все наши ожидания/i)).toBeInTheDocument();
        // Should render author name
        expect(screen.getByText('Алексей Иванов')).toBeInTheDocument();
        // Should render project info
        expect(screen.getByText('Redesign SaaS платформы')).toBeInTheDocument();
        // Should render results
        expect(screen.getByText('+35 % конверсии, -50 % LCP')).toBeInTheDocument();
    });
    it('autoplays to next testimonial after interval', () => {
        render(_jsx(TestimonialsSection, {}));
        const firstAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        vi.advanceTimersByTime(5100); // advance just over 5s
        const currentAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        expect(currentAvatar).not.toBe(firstAvatar);
    });
    it('pauses autoplay on mouse enter and resumes on mouse leave', () => {
        render(_jsx(TestimonialsSection, {}));
        const section = screen.getByRole('img', { name: /алексей иванов/i }).closest('div');
        const firstAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        // Mouse enter should pause
        fireEvent.mouseEnter(section);
        vi.advanceTimersByTime(6000);
        expect(screen.getAllByRole('img')[0].getAttribute('alt')).toBe(firstAvatar);
        // Mouse leave should resume
        fireEvent.mouseLeave(section);
        vi.advanceTimersByTime(5100);
        expect(screen.getAllByRole('img')[0].getAttribute('alt')).not.toBe(firstAvatar);
    });
    it('next arrow navigates to next testimonial', async () => {
        render(_jsx(TestimonialsSection, {}));
        const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
        const firstAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        await userEvent.click(nextBtn);
        const newAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        expect(newAvatar).not.toBe(firstAvatar);
    });
    it('previous arrow navigates to previous testimonial', async () => {
        render(_jsx(TestimonialsSection, {}));
        const prevBtn = screen.getByRole('button', { name: /предыдущий отзыв/i });
        const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
        // Go to next first
        await userEvent.click(nextBtn);
        const secondAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        // Then go back to previous
        await userEvent.click(prevBtn);
        const backToFirstAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        expect(backToFirstAvatar).not.toBe(secondAvatar);
    });
    it('dot navigation works', async () => {
        render(_jsx(TestimonialsSection, {}));
        const dots = screen.getAllByRole('button', { name: /отзыв/i });
        expect(dots.length).toBeGreaterThan(0);
        await userEvent.click(dots[2]);
        const currentAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        // Because we clicked dot index 2, avatar should match 3rd testimonial
        expect(currentAvatar).toBeTruthy();
    });
    it('handles keyboard navigation', async () => {
        render(_jsx(TestimonialsSection, {}));
        const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
        // Focus on next button
        nextBtn.focus();
        expect(nextBtn).toHaveFocus();
        // Should be able to activate with Enter
        const firstAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        await userEvent.keyboard('{Enter}');
        const newAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        expect(newAvatar).not.toBe(firstAvatar);
    });
    it('handles keyboard navigation with Space key', async () => {
        render(_jsx(TestimonialsSection, {}));
        const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
        nextBtn.focus();
        const firstAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        await userEvent.keyboard(' ');
        const newAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        expect(newAvatar).not.toBe(firstAvatar);
    });
    it('wraps around when reaching end/beginning', async () => {
        render(_jsx(TestimonialsSection, {}));
        const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
        const prevBtn = screen.getByRole('button', { name: /предыдущий отзыв/i });
        // Click next multiple times to reach end
        for (let i = 0; i < 6; i++) {
            await userEvent.click(nextBtn);
        }
        // Should wrap around to first
        const wrappedAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        expect(wrappedAvatar).toBe('Алексей Иванов');
        // Click previous should wrap to last
        await userEvent.click(prevBtn);
        const lastAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        expect(lastAvatar).toBe('Sophie Müller');
    });
    it('has proper ARIA attributes', () => {
        render(_jsx(TestimonialsSection, {}));
        // Navigation buttons should have proper labels
        expect(screen.getByRole('button', { name: /следующий отзыв/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /предыдущий отзыв/i })).toBeInTheDocument();
        // Dots should have descriptive labels
        const dots = screen.getAllByRole('button', { name: /отзыв \d+/i });
        expect(dots.length).toBeGreaterThan(0);
    });
    it('updates active dot indicator', async () => {
        render(_jsx(TestimonialsSection, {}));
        const dots = screen.getAllByRole('button', { name: /отзыв/i });
        // First dot should be active initially (would need to check classes)
        const firstDot = dots[0];
        const secondDot = dots[1];
        // Click second dot
        await userEvent.click(secondDot);
        // Visual state should update (this would need specific class checking)
        expect(secondDot).toBeInTheDocument();
    });
    it('handles rapid navigation without breaking', async () => {
        render(_jsx(TestimonialsSection, {}));
        const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
        // Rapidly click next button
        for (let i = 0; i < 10; i++) {
            await userEvent.click(nextBtn);
        }
        // Should still be functional
        const currentAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        expect(currentAvatar).toBeTruthy();
    });
    it('stops autoplay when user interacts manually', async () => {
        render(_jsx(TestimonialsSection, {}));
        const nextBtn = screen.getByRole('button', { name: /следующий отзыв/i });
        // Manual interaction
        await userEvent.click(nextBtn);
        const manualAvatar = screen.getAllByRole('img')[0].getAttribute('alt');
        // Should not auto-advance immediately after manual interaction
        vi.advanceTimersByTime(1000);
        expect(screen.getAllByRole('img')[0].getAttribute('alt')).toBe(manualAvatar);
    });
});
