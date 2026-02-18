import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChartDataset } from '../types/components';

/**
 * Hook for chart performance optimization
 */
export function useChartOptimization(
  datasets: ChartDataset[],
  options?: {
    enableVirtualization?: boolean;
    enableMemoization?: boolean;
    debounceMs?: number;
  }
) {
  const {
    enableVirtualization = false,
    enableMemoization = true,
    debounceMs = 100,
  } = options || {};

  const [isOptimizing, setIsOptimizing] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Memoized calculations
  const memoizedScales = useMemo(() => {
    if (!enableMemoization) return null;

    // Cache expensive scale calculations
    return datasets.map(dataset => {
      const values = dataset.data?.map(d => d.value).filter(v => typeof v === 'number') || [];
      const validValues = values.length > 0 ? values : [0];

      return {
        label: dataset.label,
        dataLength: dataset.data?.length || 0,
        minValue: Math.min(...validValues),
        maxValue: Math.max(...validValues),
      };
    });
  }, [datasets, enableMemoization]);

  // Debounced updates
  const debouncedUpdate = useCallback(
    (callback: () => void) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        callback();
        setIsOptimizing(false);
      }, debounceMs);

      setIsOptimizing(true);
    },
    [debounceMs]
  );

  // Virtualization helpers
  const getVisibleRange = useCallback(
    (scrollTop: number, itemHeight: number, containerHeight: number) => {
      if (!enableVirtualization) return { start: 0, end: datasets[0]?.data?.length || 0 };

      const start = Math.floor(scrollTop / itemHeight);
      const visibleCount = Math.ceil(containerHeight / itemHeight);
      const end = Math.min(start + visibleCount + 1, datasets[0]?.data?.length || 0);

      return { start: Math.max(0, start - 1), end };
    },
    [enableVirtualization, datasets]
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    isOptimizing,
    memoizedScales,
    debouncedUpdate,
    getVisibleRange,
  };
}
