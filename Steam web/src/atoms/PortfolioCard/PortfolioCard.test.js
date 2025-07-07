import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PortfolioCard } from './PortfolioCard';
const props = {
    title: 'Test Project',
    category: 'Web',
    image: 'https://via.placeholder.com/600x400',
    description: 'Project description.',
};
describe('PortfolioCard', () => {
    it('renders title and category', () => {
        render(_jsx(PortfolioCard, { ...props }));
        expect(screen.getByText('Test Project')).toBeInTheDocument();
        expect(screen.getByText('Web')).toBeInTheDocument();
    });
});
