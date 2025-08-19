import { useMemo } from 'react';
import { ChartDataPoint } from '../../components/Chart/types';

/**
 * Simplified hook for chart data processing
 */
export function useChartData(data: ChartDataPoint[]) {
  const processedData = useMemo(() => {
    if (!data.length) return [];

    // Basic validation and processing
    return data.map((point, index) => ({
      ...point,
      value: typeof point.value === 'number' ? point.value : 0,
      label: point.label || `Point ${index + 1}`,
    }));
  }, [data]);

  const stats = useMemo(() => {
    if (!processedData.length) {
      return { min: 0, max: 0, total: 0, average: 0 };
    }

    const values = processedData.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = total / values.length;

    return { min, max, total, average };
  }, [processedData]);

  return {
    data: processedData,
    stats,
    isEmpty: processedData.length === 0,
  };
}