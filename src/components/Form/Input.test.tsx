import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

// Mock AtomixGlass component
vi.mock('../AtomixGlass/AtomixGlass', () => ({
  AtomixGlass: ({ children, ...props }: any) => (
    <div data-testid="atomix-glass" data-glass-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}));

describe('Input Component', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Test Input" />);
    expect(screen.getByPlaceholderText('Test Input')).toBeInTheDocument();
  });

  it('handles controlled value', () => {
    render(<Input value="Controlled Value" onChange={() => {}} />);
    const input = screen.getByDisplayValue('Controlled Value');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Controlled Value');
  });

  it('handles uncontrolled defaultValue', () => {
    render(<Input defaultValue="Default Value" />);
    const input = screen.getByDisplayValue('Default Value');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Default Value');
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies accessibility attributes', () => {
    render(<Input aria-label="Accessible Label" aria-describedby="description-id" invalid />);
    const input = screen.getByLabelText('Accessible Label');
    expect(input).toHaveAttribute('aria-describedby', 'description-id');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders as glass when enabled', () => {
    render(<Input glass placeholder="Glass Input" />);
    expect(screen.getByTestId('atomix-glass')).toBeInTheDocument();
  });
});
