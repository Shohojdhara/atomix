import { renderHook } from '@testing-library/react';
import { useChartPerformance } from '../useChartPerformance';
import { ChartDataset } from '../../types/components';
import { describe, it, expect } from 'vitest';

describe('useChartPerformance', () => {
  it('should process small datasets correctly', () => {
    const { result } = renderHook(() => useChartPerformance());

    const datasets: ChartDataset[] = [{
      label: 'Test',
      data: [
        { label: '1', value: 10 },
        { label: '2', value: 20 },
        { label: '3', value: 30 },
      ]
    }];

    const processed = result.current.processDatasetsOptimized(datasets);

    expect(processed[0]._stats).toEqual({
      min: 10,
      max: 30,
      average: 20,
      count: 3
    });
  });

  it('should handle large datasets without stack overflow', () => {
    const { result } = renderHook(() => useChartPerformance());

    // Create a large dataset that would cause stack overflow with spread operator
    // 1,000,000 items to ensure stack overflow
    const largeData = Array.from({ length: 1000000 }, (_, i) => ({
      label: `${i}`,
      value: i
    }));

    const datasets: ChartDataset[] = [{
      label: 'Large',
      data: largeData
    }];

    // This should not throw
    const start = performance.now();
    let processed: any;
    try {
        processed = result.current.processDatasetsOptimized(datasets);
    } catch (e: any) {
        if (e instanceof RangeError && e.message.includes('call stack size')) {
            throw new Error('Stack overflow detected!');
        }
        throw e;
    }
    const end = performance.now();

    expect(processed[0]._stats.min).toBe(0);
    expect(processed[0]._stats.max).toBe(999999);
    expect(processed[0]._stats.count).toBe(1000000);
  });

  it('should calculate scales for large datasets without stack overflow', () => {
    const { result } = renderHook(() => useChartPerformance());
    const largeData = Array.from({ length: 1000000 }, (_, i) => ({
      label: `${i}`,
      value: i
    }));
    const datasets: ChartDataset[] = [{ label: 'Large', data: largeData }];

    // This should trigger stack overflow in createOptimizedScales if not fixed
    let scales: any;
    try {
        scales = result.current.createOptimizedScales(datasets, 500, 300, { top: 10, right: 10, bottom: 10, left: 10 });
    } catch (e: any) {
        if (e instanceof RangeError && e.message.includes('call stack size')) {
            throw new Error('Stack overflow in createOptimizedScales!');
        }
        throw e;
    }
    expect(scales).not.toBeNull();
    expect(scales.minValue).toBe(0);
    expect(scales.maxValue).toBe(999999);
  });
});
