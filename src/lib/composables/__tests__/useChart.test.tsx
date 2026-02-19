import { renderHook } from '@testing-library/react';
import { useChart } from '../useChart';
import { describe, it, expect } from 'vitest';

describe('useChart', () => {
  it('calculateScales computes correct min/max and scales', () => {
    const { result } = renderHook(() => useChart());
    const { calculateScales } = result.current;

    const datasets = [
      {
        label: 'D1',
        data: [
          { label: 'A', value: 10 },
          { label: 'B', value: 20 },
        ],
      },
      {
        label: 'D2',
        data: [
          { label: 'C', value: 5 },
          { label: 'D', value: 25 },
        ],
      },
    ];

    const scales = calculateScales(datasets, 100, 100, { top: 0, right: 0, bottom: 0, left: 0 });

    expect(scales).not.toBeNull();
    if (!scales) return;

    expect(scales.minValue).toBe(5);
    expect(scales.maxValue).toBe(25);

    // yScale(5) should be 100 (bottom). yScale(25) should be 0 (top).
    expect(scales.yScale(5)).toBe(100);
    expect(scales.yScale(25)).toBe(0);
    expect(scales.yScale(15)).toBe(50); // Midpoint

    // Total points = 4.
    // xScale default length is 4.
    // xScale(0) -> 0. xScale(3) -> 100.
    expect(scales.xScale(0)).toBe(0);
    expect(scales.xScale(3)).toBe(100);
    expect(scales.xScale(1.5)).toBe(50); // Midpoint
  });

  it('calculateScales returns null for empty datasets', () => {
      const { result } = renderHook(() => useChart());
      const { calculateScales } = result.current;
      expect(calculateScales([])).toBeNull();
  });

  it('calculateScales handles single point correctly', () => {
    const { result } = renderHook(() => useChart());
    const { calculateScales } = result.current;

    const datasets = [
      {
        label: 'D1',
        data: [
          { label: 'A', value: 10 },
        ],
      },
    ];

    const scales = calculateScales(datasets, 100, 100, { top: 0, right: 0, bottom: 0, left: 0 });
    expect(scales).not.toBeNull();
    if (!scales) return;

    expect(scales.minValue).toBe(10);
    expect(scales.maxValue).toBe(10);
    // Value range becomes 1 to avoid division by zero

    // xScale should center the point if dataLength <= 1
    // implementation: if (dataLength <= 1) return padding.left + innerWidth / 2;
    expect(scales.xScale(0)).toBe(50);
  });
});
