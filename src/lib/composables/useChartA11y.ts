import { useCallback, useEffect, useState } from 'react';
import { ChartDataset } from '../types/components';

/**
 * Hook for chart accessibility features
 */
export function useChartA11y(
  datasets: ChartDataset[],
  options?: {
    enableKeyboardNavigation?: boolean;
    enableScreenReader?: boolean;
    announceDataChanges?: boolean;
  }
) {
  const {
    enableKeyboardNavigation = true,
    enableScreenReader = true,
    announceDataChanges = true,
  } = options || {};

  const [focusedPoint, setFocusedPoint] = useState({ datasetIndex: 0, pointIndex: 0 });
  const [announcement, setAnnouncement] = useState('');

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent, onPointSelect?: (datasetIndex: number, pointIndex: number) => void) => {
      if (!enableKeyboardNavigation || !datasets.length) return;

      const maxDatasetIndex = datasets.length - 1;
      const maxPointIndex = (datasets[focusedPoint.datasetIndex]?.data?.length || 1) - 1;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          setFocusedPoint(prev => ({
            ...prev,
            pointIndex: Math.max(0, prev.pointIndex - 1),
          }));
          break;
        case 'ArrowRight':
          event.preventDefault();
          setFocusedPoint(prev => ({
            ...prev,
            pointIndex: Math.min(maxPointIndex, prev.pointIndex + 1),
          }));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedPoint(prev => ({
            ...prev,
            datasetIndex: Math.max(0, prev.datasetIndex - 1),
          }));
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedPoint(prev => ({
            ...prev,
            datasetIndex: Math.min(maxDatasetIndex, prev.datasetIndex + 1),
          }));
          break;
        case 'Home':
          event.preventDefault();
          setFocusedPoint(prev => ({ ...prev, pointIndex: 0 }));
          break;
        case 'End':
          event.preventDefault();
          setFocusedPoint(prev => ({ ...prev, pointIndex: maxPointIndex }));
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          onPointSelect?.(focusedPoint.datasetIndex, focusedPoint.pointIndex);
          break;
      }
    },
    [enableKeyboardNavigation, datasets, focusedPoint]
  );

  // Screen reader announcements
  const announceData = useCallback(
    (message: string) => {
      if (!enableScreenReader) return;

      setAnnouncement(message);
      // Clear announcement after a delay to allow screen readers to read it
      setTimeout(() => setAnnouncement(''), 1000);
    },
    [enableScreenReader]
  );

  // Announce data changes
  useEffect(() => {
    if (!announceDataChanges || !datasets.length) return;

    const totalDataPoints = datasets.reduce((sum, dataset) => sum + (dataset.data?.length || 0), 0);
    announceData(
      `Chart updated with ${datasets.length} datasets and ${totalDataPoints} data points`
    );
  }, [datasets, announceDataChanges, announceData]);

  // Generate accessible description
  const getAccessibleDescription = useCallback(() => {
    if (!datasets.length) return 'Empty chart';

    const datasetDescriptions = datasets
      .map((dataset, i) => {
        const dataCount = dataset.data?.length || 0;
        const values = dataset.data?.map(d => d.value).filter(v => typeof v === 'number') || [];
        const min = values.length > 0 ? Math.min(...values) : 0;
        const max = values.length > 0 ? Math.max(...values) : 0;

        return `Dataset ${i + 1}: ${dataset.label}, ${dataCount} points, range ${min} to ${max}`;
      })
      .join('. ');

    return `Chart with ${datasets.length} datasets. ${datasetDescriptions}`;
  }, [datasets]);

  return {
    focusedPoint,
    announcement,
    handleKeyDown,
    announceData,
    getAccessibleDescription,
    setFocusedPoint,
  };
}
