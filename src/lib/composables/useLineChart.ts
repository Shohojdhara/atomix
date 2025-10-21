import { useCallback, useMemo, useState } from 'react';
import { ChartDataPoint, ChartDataset } from '../types/components';

/**
 * Line chart specific options
 */
export interface LineChartOptions {
  /**
   * Whether to show area fill under the line
   */
  showArea?: boolean;

  /**
   * Whether to show data points
   */
  showDataPoints?: boolean;

  /**
   * Whether to use smooth curves
   */
  smooth?: boolean;

  /**
   * Curve tension (0-1)
   */
  tension?: number;

  /**
   * Fill opacity for area charts
   */
  fillOpacity?: number;

  /**
   * Whether to use gradient fills
   */
  useGradient?: boolean;

  /**
   * Gradient direction
   */
  gradientDirection?: 'horizontal' | 'vertical';

  /**
   * Line width in pixels
   */
  lineWidth?: number;

  /**
   * Point radius in pixels
   */
  pointRadius?: number;

  /**
   * Whether to show point labels
   */
  showPointLabels?: boolean;

  /**
   * Whether to enable zoom functionality
   */
  enableZoom?: boolean;

  /**
   * Whether to enable pan functionality
   */
  enablePan?: boolean;

  /**
   * Whether to show crosshair
   */
  showCrosshair?: boolean;

  /**
   * Whether to enable keyboard navigation
   */
  enableKeyboardNavigation?: boolean;

  /**
   * Whether to show trend lines
   */
  showTrendLines?: boolean;

  /**
   * Whether to show moving averages
   */
  showMovingAverages?: boolean;

  /**
   * Moving average periods
   */
  movingAveragePeriods?: number[];

  /**
   * Whether to enable real-time updates
   */
  enableRealTime?: boolean;

  /**
   * Real-time update interval in milliseconds
   */
  realTimeInterval?: number;

  /**
   * Maximum number of data points for performance
   */
  maxDataPoints?: number;

  /**
   * Whether to enable data decimation
   */
  enableDecimation?: boolean;
}

/**
 * Hook for line chart functionality
 */
export function useLineChart(datasets: ChartDataset[], options: LineChartOptions = {}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [hoveredPoint, setHoveredPoint] = useState<{
    datasetIndex: number;
    pointIndex: number;
    x: number;
    y: number;
    clientX?: number;
    clientY?: number;
  } | null>(null);

  // Calculate moving averages
  const calculateMovingAverage = useCallback((data: ChartDataPoint[], period: number) => {
    const result: ChartDataPoint[] = [];

    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, point) => acc + point.value, 0);
      const average = sum / period;

      const dataPoint = data[i];
      if (dataPoint) {
        result.push({
          label: dataPoint.label,
          value: average,
          color: 'rgba(255, 255, 255, 0.5)',
        });
      }
    }

    return result;
  }, []);

  // Calculate trend line using linear regression
  const calculateTrendLine = useCallback((data: ChartDataPoint[]): (ChartDataPoint | null)[] => {
    const n = data.length;
    if (n < 2) return data.map((): null => null);

    const xSum = data.reduce((sum, _, i) => sum + i, 0);
    const ySum = data.reduce((sum, point) => sum + point.value, 0);
    const xySum = data.reduce((sum, point, i) => sum + i * point.value, 0);
    const x2Sum = data.reduce((sum, _, i) => sum + i * i, 0);

    const slope = (n * xySum - xSum * ySum) / (n * x2Sum - xSum * xSum);
    const intercept = (ySum - slope * xSum) / n;

    return data.map((point, i) => ({
      label: point.label,
      value: slope * i + intercept,
      color: 'rgba(255, 255, 255, 0.3)',
    }));
  }, []);

  // Generate SVG path for smooth curves
  const generateSmoothPath = useCallback(
    (points: Array<{ x: number; y: number }>, tension = 0.4) => {
      if (points.length < 2) return '';

      const controlPoints = points.map((point, i) => {
        if (i === 0 || i === points.length - 1) {
          return { cp1x: point.x, cp1y: point.y, cp2x: point.x, cp2y: point.y };
        }

        const prev = points[i - 1];
        const next = points[i + 1];
        if (!prev || !next) {
          return { cp1x: point.x, cp1y: point.y, cp2x: point.x, cp2y: point.y };
        }
        const dx = next.x - prev.x;
        const dy = next.y - prev.y;

        return {
          cp1x: point.x - dx * tension,
          cp1y: point.y - dy * tension,
          cp2x: point.x + dx * tension,
          cp2y: point.y + dy * tension,
        };
      });

      const firstPoint = points[0];
      if (!firstPoint) return '';
      let path = `M ${firstPoint.x},${firstPoint.y}`;

      for (let i = 1; i < points.length; i++) {
        const cp = controlPoints[i - 1];
        const currentControlPoint = controlPoints[i];
        const currentPoint = points[i];

        if (!cp || !currentControlPoint || !currentPoint) continue;

        path += ` C ${cp.cp2x},${cp.cp2y} ${currentControlPoint.cp1x},${currentControlPoint.cp1y} ${currentPoint.x},${currentPoint.y}`;
      }

      return path;
    },
    []
  );

  // Zoom handlers
  const handleZoom = useCallback(
    (delta: number, centerX: number, centerY: number) => {
      if (!options.enableZoom) return;

      const zoomFactor = delta > 0 ? 0.9 : 1.1;
      const newZoomLevel = Math.max(0.1, Math.min(10, zoomLevel * zoomFactor));

      setZoomLevel(newZoomLevel);

      // Adjust pan offset to zoom towards center
      const zoomRatio = newZoomLevel / zoomLevel;
      setPanOffset(prev => ({
        x: centerX - (centerX - prev.x) * zoomRatio,
        y: centerY - (centerY - prev.y) * zoomRatio,
      }));
    },
    [zoomLevel, options.enableZoom]
  );

  // Pan handlers
  const handlePan = useCallback(
    (deltaX: number, deltaY: number) => {
      if (!options.enablePan) return;

      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    },
    [options.enablePan]
  );

  // Reset view
  const resetView = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  // Point hover handlers
  const handlePointHover = useCallback(
    (datasetIndex: number, pointIndex: number, x: number, y: number, clientX: number, clientY: number) => {
      setHoveredPoint({ datasetIndex, pointIndex, x, y, clientX, clientY });
    },
    []
  );

  const handlePointLeave = useCallback(() => {
    setHoveredPoint(null);
  }, []);

  // Process datasets with additional data
  const processedDatasets = useMemo(() => {
    return datasets.map(dataset => {
      const processed = { ...dataset } as any;

      // Add moving averages if enabled
      if (options.showMovingAverages && options.movingAveragePeriods) {
        processed.movingAverages = options.movingAveragePeriods.map(period => ({
          period,
          data: calculateMovingAverage(dataset.data, period),
        }));
      }

      // Add trend line if enabled
      if (options.showTrendLines) {
        processed.trendLine = calculateTrendLine(dataset.data);
      }

      return processed;
    });
  }, [
    datasets,
    options.showMovingAverages,
    options.movingAveragePeriods,
    options.showTrendLines,
    calculateMovingAverage,
    calculateTrendLine,
  ]);

  return {
    // State
    zoomLevel,
    panOffset,
    hoveredPoint,

    // Data
    processedDatasets,

    // Handlers
    handleZoom,
    handlePan,
    resetView,
    handlePointHover,
    handlePointLeave,

    // Utilities
    calculateMovingAverage,
    calculateTrendLine,
    generateSmoothPath,

    // State setters
    setZoomLevel,
    setPanOffset,
    setHoveredPoint,
  };
}
