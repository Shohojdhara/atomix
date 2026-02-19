import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import { Rating } from './Rating';

expect.extend(toHaveNoViolations);

// Mock AtomixGlass component
vi.mock('../AtomixGlass/AtomixGlass', () => ({
  AtomixGlass: ({ children, ...props }: any) => (
    <div data-testid="atomix-glass" data-glass-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}));

describe('Rating Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props (0 stars selected)', () => {
    render(<Rating />);
    const stars = screen.getAllByRole('radio');
    expect(stars).toHaveLength(5);
    // None selected
    stars.forEach((star) => {
      expect(star).toHaveAttribute('aria-checked', 'false');
    });
  });

  it('renders correctly with specific value', () => {
    render(<Rating value={3} />);
    const stars = screen.getAllByRole('radio');
    expect(stars[0]).toHaveAttribute('aria-checked', 'true');
    expect(stars[1]).toHaveAttribute('aria-checked', 'true');
    expect(stars[2]).toHaveAttribute('aria-checked', 'true');
    expect(stars[3]).toHaveAttribute('aria-checked', 'false');
    expect(stars[4]).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange when clicked (Controlled)', () => {
    const handleChange = vi.fn();
    render(<Rating value={2} onChange={handleChange} />);
    const stars = screen.getAllByRole('radio');

    // Click 4th star
    fireEvent.click(stars[3]);
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('supports readOnly mode', () => {
    const handleChange = vi.fn();
    render(<Rating value={3} readOnly onChange={handleChange} />);
    const stars = screen.getAllByRole('presentation'); // Role changes to presentation in readOnly
    expect(stars).toHaveLength(5);

    // Click shouldn't trigger change
    fireEvent.click(stars[3]);
    expect(handleChange).not.toHaveBeenCalled();

    // Should have aria-checked
    expect(stars[2]).toHaveAttribute('aria-checked', 'true');
  });

  it('supports allowHalf prop', () => {
    const handleChange = vi.fn();
    render(<Rating value={0} allowHalf onChange={handleChange} />);
    const stars = screen.getAllByRole('radio');
    const firstStar = stars[0];

    // Mock getBoundingClientRect
    vi.spyOn(firstStar, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      width: 20,
      top: 0,
      bottom: 20,
      right: 120,
      height: 20,
      x: 100,
      y: 0,
      toJSON: () => {},
    });

    // Click on left half (105 is < 100 + 10 = 110)
    fireEvent.click(firstStar, { clientX: 105 });
    expect(handleChange).toHaveBeenCalledWith(0.5);

    // Click on right half (115 is > 110)
    fireEvent.click(firstStar, { clientX: 115 });
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('renders with custom maxValue', () => {
    render(<Rating maxValue={10} />);
    expect(screen.getAllByRole('radio')).toHaveLength(10);
  });

  it('renders with glass effect', () => {
    render(<Rating glass />);
    expect(screen.getByTestId('atomix-glass')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Rating label="Rate this" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Failing tests (Bug Reproduction)
  describe('Uncontrolled Component Bugs', () => {
    it('uses defaultValue correctly', () => {
      // Currently fails because defaultValue is ignored if value prop defaults to 0
      render(<Rating defaultValue={3} />);
      const stars = screen.getAllByRole('radio');
      // Should default to 3 selected
      expect(stars[2]).toHaveAttribute('aria-checked', 'true');
      expect(stars[3]).toHaveAttribute('aria-checked', 'false');
    });

    it('updates internal state on click when uncontrolled', () => {
      // Currently fails because internal state isn't updated on click
      render(<Rating defaultValue={1} />);
      const stars = screen.getAllByRole('radio');

      // Initial state
      expect(stars[0]).toHaveAttribute('aria-checked', 'true');
      expect(stars[1]).toHaveAttribute('aria-checked', 'false');

      // Click 3rd star
      fireEvent.click(stars[2]);

      // Should update to 3 selected
      expect(stars[0]).toHaveAttribute('aria-checked', 'true');
      expect(stars[1]).toHaveAttribute('aria-checked', 'true');
      expect(stars[2]).toHaveAttribute('aria-checked', 'true');
    });
  });
});
