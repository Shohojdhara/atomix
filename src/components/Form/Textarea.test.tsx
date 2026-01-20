import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from './Textarea';

// Mock AtomixGlass component
vi.mock('../AtomixGlass/AtomixGlass', () => ({
    AtomixGlass: ({ children, ...props }: any) => (
        <div data-testid="atomix-glass" data-glass-props={JSON.stringify(props)}>
            {children}
        </div>
    ),
}));

describe('Textarea Component', () => {
    it('renders correctly', () => {
        render(<Textarea placeholder="Test Textarea" />);
        expect(screen.getByPlaceholderText('Test Textarea')).toBeInTheDocument();
    });

    it('handles uncontrolled defaultValue', () => {
        render(<Textarea defaultValue="Default Textarea Value" />);
        const textarea = screen.getByDisplayValue('Default Textarea Value');
        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveValue('Default Textarea Value');
    });

    it('calls onChange when typing', () => {
        const handleChange = vi.fn();
        render(<Textarea onChange={handleChange} />);
        const textarea = screen.getByRole('textbox');
        fireEvent.change(textarea, { target: { value: 'New Textarea Value' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('applies accessibility attributes', () => {
        render(
            <Textarea
                aria-label="Accessible Textarea"
                invalid
            />
        );
        const textarea = screen.getByLabelText('Accessible Textarea');
        expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });
});
