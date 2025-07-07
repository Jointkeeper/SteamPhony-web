import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ContactForm } from './ContactForm';
describe('ContactForm', () => {
    it('renders required fields', () => {
        render(_jsx(ContactForm, {}));
        expect(screen.getByLabelText(/Имя/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Сообщение/i)).toBeInTheDocument();
    });
});
