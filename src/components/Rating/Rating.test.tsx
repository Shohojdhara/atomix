import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import Rating from './Rating';

// Mock AtomixGlass since it's used in Rating
vi.mock('../AtomixGlass/AtomixGlass', () => ({
  AtomixGlass: ({ children }: any) => <div data-testid="glass-wrapper">{children}</div>,
}));

describe('Rating', () => {
  it('renders correctly', () => {
    render(<Rating value={3} />);
    const stars = screen.getAllByRole('button');
    expect(stars).toHaveLength(5);
    // 3 full stars, 2 empty
    expect(stars[0]).toHaveAttribute('aria-checked', 'true');
    expect(stars[1]).toHaveAttribute('aria-checked', 'true');
    expect(stars[2]).toHaveAttribute('aria-checked', 'true');
    expect(stars[3]).toHaveAttribute('aria-checked', 'false');
  });

  it('calculates half star on hover when allowHalf is true', () => {
    render(<Rating allowHalf />);
    const stars = screen.getAllByRole('button');
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
    } as DOMRect);

    // Hover on left half (105 is < 100 + 10 = 110)
    fireEvent.mouseEnter(firstStar, { clientX: 105 });
    fireEvent.mouseMove(firstStar, { clientX: 105 });

    // Check if the star has the half class
    // RATING.CLASSES.HALF is 'c-rating__star--half'
    expect(firstStar).toHaveClass('c-rating__star--half');
  });

  it('calculates full star on hover right half when allowHalf is true', () => {
    render(<Rating allowHalf />);
    const stars = screen.getAllByRole('button');
    const firstStar = stars[0];

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
    } as DOMRect);

    // Hover on right half (115 is > 100 + 10 = 110)
    fireEvent.mouseEnter(firstStar, { clientX: 115 });
    fireEvent.mouseMove(firstStar, { clientX: 115 });

    expect(firstStar).toHaveClass('c-rating__star--full');
  });
});
