import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toggle } from './Toggle';
import React from 'react';

describe('Toggle Component', () => {
    it('renders correctly', () => {
        render(<Toggle />);
        const toggle = screen.getByRole('switch');
        expect(toggle).toBeInTheDocument();
        expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('handles defaultChecked (uncontrolled)', () => {
        render(<Toggle defaultChecked={true} />);
        const toggle = screen.getByRole('switch');
        expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('toggles state when clicked (uncontrolled)', () => {
        const handleChange = vi.fn();
        render(<Toggle onChange={handleChange} />);
        const toggle = screen.getByRole('switch');

        fireEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-checked', 'true');
        expect(handleChange).toHaveBeenCalledWith(true);

        fireEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-checked', 'false');
        expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('handles checked (controlled)', () => {
        const { rerender } = render(<Toggle checked={true} />);
        const toggle = screen.getByRole('switch');
        expect(toggle).toHaveAttribute('aria-checked', 'true');

        rerender(<Toggle checked={false} />);
        expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('calls onChange but does not toggle internally when controlled', () => {
        const handleChange = vi.fn();
        render(<Toggle checked={false} onChange={handleChange} />);
        const toggle = screen.getByRole('switch');

        fireEvent.click(toggle);
        expect(handleChange).toHaveBeenCalledWith(true);
        // Should still be false because it's controlled and we haven't rerendered with checked={true}
        expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    it('does not toggle when disabled', () => {
        const handleChange = vi.fn();
        render(<Toggle disabled onChange={handleChange} />);
        const toggle = screen.getByRole('switch');

        fireEvent.click(toggle);
        expect(handleChange).not.toHaveBeenCalled();
        expect(toggle).toHaveAttribute('aria-checked', 'false');
        expect(toggle).toHaveAttribute('aria-disabled', 'true');
        expect(toggle).toHaveAttribute('tabindex', '-1');
    });

    it('handles keyboard interaction', () => {
        const handleChange = vi.fn();
        render(<Toggle onChange={handleChange} />);
        const toggle = screen.getByRole('switch');

        fireEvent.keyDown(toggle, { key: 'Enter' });
        expect(toggle).toHaveAttribute('aria-checked', 'true');
        expect(handleChange).toHaveBeenCalledWith(true);

        fireEvent.keyDown(toggle, { key: ' ' });
        expect(toggle).toHaveAttribute('aria-checked', 'false');
        expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('applies accessibility attributes', () => {
        render(
            <Toggle
                aria-label="Accessible Toggle"
                aria-describedby="description-id"
            />
        );
        const toggle = screen.getByRole('switch');
        expect(toggle).toHaveAttribute('aria-label', 'Accessible Toggle');
        expect(toggle).toHaveAttribute('aria-describedby', 'description-id');
    });
});
