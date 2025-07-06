/* eslint-env node, jest */
/* global vi, describe, it, expect, global */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../../../components/ContactForm';

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true, id: 'test' }),
  })
);

vi.spyOn(global, 'fetch');

describe('ContactForm E2E', () => {
  it('submits contact form successfully', async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message content');

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });

    // ensure fetch was called
    expect(fetch).toHaveBeenCalledTimes(1);
  });
}); 