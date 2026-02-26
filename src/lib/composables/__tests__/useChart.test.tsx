import { renderHook, act } from '@testing-library/react';
import { useChartData } from '../useChart';
import { ChartDataset } from '../../types/components';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useChartData - Real-time Optimization', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not update processedData if data has not changed', () => {
    const datasets: ChartDataset[] = [
      {
        label: 'Dataset 1',
        data: [
          { label: '1', value: 10 },
          { label: '2', value: 20 },
        ],
      },
    ];

    const { result } = renderHook(() =>
      useChartData(datasets, {
        enableRealTime: true,
        realTimeInterval: 1000,
        enableDecimation: false,
      })
    );

    const initialData = result.current.processedData;

    // Advance time
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(result.current.processedData).toBe(initialData);
  });

  it('should update processedData if data length changes (mutation)', () => {
    const datasets: ChartDataset[] = [
      {
        label: 'Dataset 1',
        data: [
          { label: '1', value: 10 },
          { label: '2', value: 20 },
        ],
      },
    ];

    const { result } = renderHook(() =>
      useChartData(datasets, {
        enableRealTime: true,
        realTimeInterval: 1000,
        enableDecimation: false,
      })
    );

    const initialData = result.current.processedData;

    datasets[0].data.push({ label: '3', value: 30 });

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(result.current.processedData).not.toBe(initialData);
    expect(result.current.processedData[0].data.length).toBe(3);
  });

  it('should update processedData if data value changes (mutation)', () => {
    const datasets: ChartDataset[] = [
      {
        label: 'Dataset 1',
        data: [
          { label: '1', value: 10 },
          { label: '2', value: 20 },
        ],
      },
    ];

    const { result } = renderHook(() =>
      useChartData(datasets, {
        enableRealTime: true,
        realTimeInterval: 1000,
        enableDecimation: false,
      })
    );

    const initialData = result.current.processedData;

    datasets[0].data[1].value = 25;

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(result.current.processedData).not.toBe(initialData);
    expect(result.current.processedData[0].data[1].value).toBe(25);
  });

  it('should update processedData if historical data changes (mutation)', () => {
    const datasets: ChartDataset[] = [
      {
        label: 'Dataset 1',
        data: [
          { label: '1', value: 10 },
          { label: '2', value: 20 },
          { label: '3', value: 30 },
        ],
      },
    ];

    const { result } = renderHook(() =>
      useChartData(datasets, {
        enableRealTime: true,
        realTimeInterval: 1000,
        enableDecimation: false,
      })
    );

    const initialData = result.current.processedData;

    // Mutate historical data (index 0)
    datasets[0].data[0].value = 15;

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    // Should update
    expect(result.current.processedData).not.toBe(initialData);
    expect(result.current.processedData[0].data[0].value).toBe(15);
  });
});
