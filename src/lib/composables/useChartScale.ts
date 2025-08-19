import { useMemo } from 'react';
import { ChartDataPoint, ChartScales } from '../../components/Chart/types';

/**
 * Simplified hook for chart scale calculations
 */
export function useChartScale(
  data: ChartDataPoint[],
  width: number = 400,
  height: number = 300
): ChartScales {
  return useMemo(() => {
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;

    if (!data.length) {
      return {
        xScale: () => padding.left,
        yScale: () => padding.top + innerHeight,
        width,
        height,
        padding,
      };
    }

    const values = data.map(d => d.value);
    const minValue = Math.min(0, ...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;

    const xScale = (index: number) => {
      return padding.left + (index / Math.max(data.length - 1, 1)) * innerWidth;
    };

    const yScale = (value: number) => {
      return padding.top + innerHeight - ((value - minValue) / valueRange) * innerHeight;
    };

    return {
      xScale,
      yScale,
      width,
      height,
      padding,
    };
  }, [data, width, height]);
}