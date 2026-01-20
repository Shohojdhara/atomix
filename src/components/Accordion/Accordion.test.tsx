import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Accordion } from './Accordion';
import React from 'react';

describe('Accordion Component', () => {
    it('renders correctly with title', () => {
        render(<Accordion title="Test Accordion">Content</Accordion>);
        expect(screen.getByText('Test Accordion')).toBeInTheDocument();
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('toggles when clicked', () => {
        const onOpenChange = vi.fn();
        render(<Accordion title="Test" onOpenChange={onOpenChange}>Content</Accordion>);
        const button = screen.getByRole('button');

        fireEvent.click(button);
        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(button).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(button);
        expect(onOpenChange).toHaveBeenCalledWith(false);
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('calls legacy onOpen/onClose handlers', () => {
        const onOpen = vi.fn();
        const onClose = vi.fn();
        render(<Accordion title="Test" onOpen={onOpen} onClose={onClose}>Content</Accordion>);
        const button = screen.getByRole('button');

        fireEvent.click(button);
        expect(onOpen).toHaveBeenCalled();

        fireEvent.click(button);
        expect(onClose).toHaveBeenCalled();
    });

    it('handles controlled state', () => {
        const onOpenChange = vi.fn();
        const { rerender } = render(<Accordion title="Test" isOpen={false} onOpenChange={onOpenChange}>Content</Accordion>);
        const button = screen.getByRole('button');

        fireEvent.click(button);
        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(button).toHaveAttribute('aria-expanded', 'false'); // Should not change internally

        rerender(<Accordion title="Test" isOpen={true} onOpenChange={onOpenChange}>Content</Accordion>);
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('supports glass effect', () => {
        const { container } = render(<Accordion title="Test" glass>Content</Accordion>);
        expect(container.querySelector('.c-accordion--glass')).toBeInTheDocument();
    });
});
