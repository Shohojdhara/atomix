import { describe, it, expect } from 'vitest';
import { getDatasetBounds } from '../useChart';
import { ChartDataPoint } from '../../types/components';

describe('useChart', () => {
  describe('getDatasetBounds', () => {
    it('should correctly calculate min and max for valid numeric data', () => {
      const data: ChartDataPoint[] = [
        { label: 'A', value: 10 },
        { label: 'B', value: 5 },
        { label: 'C', value: 20 },
      ];
      const result = getDatasetBounds(data);
      expect(result).toEqual({ min: 5, max: 20, hasValid: true });
    });

    it('should handle empty data', () => {
      const data: ChartDataPoint[] = [];
      const result = getDatasetBounds(data);
      expect(result).toEqual({ min: Infinity, max: -Infinity, hasValid: false });
    });

    it('should handle undefined data', () => {
      const result = getDatasetBounds(undefined);
      expect(result).toEqual({ min: Infinity, max: -Infinity, hasValid: false });
    });

    it('should ignore invalid values', () => {
      const data: any[] = [
        { label: 'A', value: 10 },
        { label: 'B', value: 'invalid' },
        { label: 'C', value: null },
        { label: 'D', value: 30 },
      ];
      const result = getDatasetBounds(data as ChartDataPoint[]);
      expect(result).toEqual({ min: 10, max: 30, hasValid: true });
    });

    it('should handle large datasets without stack overflow', () => {
        const size = 150000;
        const data: ChartDataPoint[] = Array.from({ length: size }, (_, i) => ({
            label: `Point ${i}`,
            value: i
        }));

        const result = getDatasetBounds(data);
        expect(result).toEqual({ min: 0, max: size - 1, hasValid: true });
    });
  });
});
