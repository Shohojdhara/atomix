import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Badge } from './Badge';

// Mock AtomixGlass component
vi.mock('../AtomixGlass/AtomixGlass', () => ({
    AtomixGlass: ({ children, ...props }: any) => (
        <div data-testid="atomix-glass" data-glass-props={JSON.stringify(props)}>
            {children}
        </div>
    ),
}));

describe('Badge Component', () => {
    it('renders correctly', () => {
        render(<Badge label="Test Badge" />);
        expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders with aria-label', () => {
        render(<Badge label="Badge" aria-label="Accessible Badge" />);
        expect(screen.getByLabelText('Accessible Badge')).toBeInTheDocument();
    });

    it('renders close button when onRemove is provided', () => {
        const handleRemove = vi.fn();
        render(<Badge label="Removable" onRemove={handleRemove} />);

        const closeButton = screen.getByRole('button', { name: 'Remove badge' });
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);
        expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('does not render close button when onRemove is not provided', () => {
        render(<Badge label="Static" />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('disables close button when badge is disabled', () => {
        const handleRemove = vi.fn();
        render(<Badge label="Disabled" onRemove={handleRemove} disabled />);

        const closeButton = screen.getByRole('button', { name: 'Remove badge' });
        expect(closeButton).toBeDisabled();

        fireEvent.click(closeButton);
        expect(handleRemove).not.toHaveBeenCalled();
    });
});
