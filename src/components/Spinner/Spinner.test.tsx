import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Spinner } from './Spinner';

// Mock AtomixGlass component
vi.mock('../AtomixGlass/AtomixGlass', () => ({
    AtomixGlass: ({ children, ...props }: any) => (
        <div data-testid="atomix-glass" data-glass-props={JSON.stringify(props)}>
            {children}
        </div>
    ),
}));

describe('Spinner Component', () => {
    it('renders with default accessibility props', () => {
        render(<Spinner />);
        const spinner = screen.getByRole('status');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveAttribute('aria-label', 'Loading');
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders with custom accessibility props', () => {
        render(<Spinner role="alert" aria-label="Please wait" />);
        const spinner = screen.getByRole('alert');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveAttribute('aria-label', 'Please wait');
        expect(screen.getByText('Please wait')).toBeInTheDocument();
    });

    it('renders as glass when enabled', () => {
        render(<Spinner glass />);
        expect(screen.getByTestId('atomix-glass')).toBeInTheDocument();
    });
});
