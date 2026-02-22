import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Checkbox } from './Checkbox';
import React from 'react';

expect.extend(toHaveNoViolations);

// Mock AtomixGlass
vi.mock('../AtomixGlass/AtomixGlass', () => ({
  AtomixGlass: ({ children }: any) => <div>{children}</div>,
}));

describe('Checkbox Component', () => {
  it('renders correctly with label', () => {
    render(<Checkbox label="Accept Terms" />);
    // In current implementation, if no ID is provided, htmlFor is undefined, so label is not associated.
    // screen.getByLabelText might fail or might not find the input.
    // Let's see.
    expect(screen.getByText('Accept Terms')).toBeInTheDocument();
  });

  it('associates label with input when ID is provided', () => {
    render(<Checkbox label="Subscribe" id="subscribe-check" />);
    expect(screen.getByLabelText('Subscribe')).toBeInTheDocument();
  });

  it('associates label with input WITHOUT ID', () => {
    // This tests my proposed improvement: wrapping input in label or auto-ID
    render(<Checkbox label="No ID Checkbox" />);
    // If not associated, this throws
    expect(screen.getByLabelText('No ID Checkbox')).toBeInTheDocument();
  });

  it('handles checked state', () => {
    const handleChange = vi.fn();
    render(<Checkbox checked onChange={handleChange} label="Checked" id="checked-id" />);
    const input = screen.getByLabelText('Checked');
    expect(input).toBeChecked();

    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} label="Ref Checkbox" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('handles indeterminate state', () => {
    // This might need manual DOM check as indeterminate is a property, not attribute
    const { getByRole } = render(<Checkbox indeterminate label="Indeterminate" id="indet" />);
    const input = getByRole('checkbox') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Checkbox label="Accessible Checkbox" id="a11y-check" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
