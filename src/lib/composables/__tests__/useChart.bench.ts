import { bench, describe } from 'vitest';
import { ChartDataset, ChartDataPoint } from '../../types/components';

// Mock data generation
const generateDatasets = (numDatasets: number, pointsPerDataset: number): ChartDataset[] => {
  return Array.from({ length: numDatasets }, (_, i) => ({
    label: `Dataset ${i}`,
    data: Array.from({ length: pointsPerDataset }, (_, j) => ({
      label: `Point ${j}`,
      value: Math.random() * 1000,
    })),
  }));
};

// Reduced sizes to avoid timeout
const mediumDatasets = generateDatasets(5, 100);
const largeDatasets = generateDatasets(10, 1000);

describe('Chart Scale Calculation', () => {
  bench('Original (medium)', () => {
    const datasets = mediumDatasets;
    const allDataPoints = datasets.flatMap(dataset => dataset.data);
    if (allDataPoints.length === 0) return;

    Math.min(...allDataPoints.map(point => point.value));
    Math.max(...allDataPoints.map(point => point.value));
  });

  bench('Optimized (medium)', () => {
    const datasets = mediumDatasets;
    let minValue = Infinity;
    let maxValue = -Infinity;
    let hasData = false;

    for (const dataset of datasets) {
      for (const point of dataset.data) {
        if (point.value < minValue) minValue = point.value;
        if (point.value > maxValue) maxValue = point.value;
        hasData = true;
      }
    }
  });

  bench('Original (large)', () => {
    const datasets = largeDatasets;
    const allDataPoints = datasets.flatMap(dataset => dataset.data);
    if (allDataPoints.length === 0) return;

    Math.min(...allDataPoints.map(point => point.value));
    Math.max(...allDataPoints.map(point => point.value));
  });

  bench('Optimized (large)', () => {
    const datasets = largeDatasets;
    let minValue = Infinity;
    let maxValue = -Infinity;
    let hasData = false;

    for (const dataset of datasets) {
      for (const point of dataset.data) {
        if (point.value < minValue) minValue = point.value;
        if (point.value > maxValue) maxValue = point.value;
        hasData = true;
      }
    }
  });
});
