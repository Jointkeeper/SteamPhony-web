import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';
describe('Button', () => {
    it('renders children', () => {
        render(_jsx(Button, { children: "Click" }));
        expect(screen.getByRole('button', { name: /click/i })).toBeInTheDocument();
    });
});
