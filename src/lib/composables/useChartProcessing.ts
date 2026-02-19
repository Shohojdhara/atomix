import { useCallback, useEffect, useState } from 'react';
import { ChartDataset } from '../types/components';

/**
 * Hook for chart data processing and transformation
 */
export function useChartProcessing(
  datasets: ChartDataset[],
  options?: {
    enableDecimation?: boolean;
    maxDataPoints?: number;
    enableRealTime?: boolean;
    realTimeInterval?: number;
  }
) {
  const [processedData, setProcessedData] = useState(datasets);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    enableDecimation = false,
    maxDataPoints = 1000,
    enableRealTime = false,
    realTimeInterval = 1000,
  } = options || {};

  // Data decimation for performance
  const decimateData = useCallback(
    (data: ChartDataset[], maxPoints: number) => {
      if (!enableDecimation || !data.length) return data;

      const dataLength = data[0]?.data?.length || 0;
      if (dataLength <= maxPoints) return data;

      const step = Math.ceil(dataLength / maxPoints);
      return data.map(dataset => ({
        ...dataset,
        data: dataset.data?.filter((_, index) => index % step === 0) || [],
      }));
    },
    [enableDecimation]
  );

  // Moving average calculation
  const calculateMovingAverage = useCallback((values: number[], period: number) => {
    const result: (number | null)[] = [];
    for (let i = 0; i < values.length; i++) {
      if (i < period - 1) {
        result.push(null);
      } else {
        const sum = values.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
        result.push(sum / period);
      }
    }
    return result;
  }, []);

  // Trend line calculation (linear regression)
  const calculateTrendLine = useCallback((values: number[]): (number | null)[] => {
    const n = values.length;
    if (n < 2) return values.map((): null => null);

    const xSum = values.reduce((sum, _, i) => sum + i, 0);
    const ySum = values.reduce((sum, val) => sum + val, 0);
    const xySum = values.reduce((sum, val, i) => sum + i * val, 0);
    const x2Sum = values.reduce((sum, _, i) => sum + i * i, 0);

    const slope = (n * xySum - xSum * ySum) / (n * x2Sum - xSum * xSum);
    const intercept = (ySum - slope * xSum) / n;

    return values.map((_, i) => slope * i + intercept);
  }, []);

  // Process data when datasets change
  useEffect(() => {
    setIsProcessing(true);

    const processData = async () => {
      let processed = [...datasets];

      if (enableDecimation && maxDataPoints) {
        processed = decimateData(processed, maxDataPoints);
      }

      setProcessedData(processed);
      setIsProcessing(false);
    };

    processData();
  }, [datasets, decimateData, enableDecimation, maxDataPoints]);

  // Real-time data updates
  useEffect(() => {
    if (!enableRealTime) return undefined;

    const interval = setInterval(() => {
      setProcessedData(prev => [...prev]); // Trigger re-render for real-time updates
    }, realTimeInterval);

    return () => clearInterval(interval);
  }, [enableRealTime, realTimeInterval]);

  return {
    processedData,
    isProcessing,
    decimateData,
    calculateMovingAverage,
    calculateTrendLine,
    setProcessedData,
  };
}
