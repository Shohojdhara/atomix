import { useCallback, useMemo, useRef, useState } from 'react';
import { ChartDataPoint, ChartDataset } from '../types/components';

/**
 * Performance optimization hook for charts
 * Provides memoization, virtualization, and efficient re-rendering
 */
export function useChartPerformance() {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(Date.now());
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderCount: 0,
    averageRenderTime: 0,
    lastRenderDuration: 0,
  });

  /**
   * Memoized chart data processing
   */
  const processDatasetsOptimized = useCallback((datasets: ChartDataset[]) => {
    const startTime = performance.now();

    // Process datasets with optimizations
    const processedDatasets = datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.map((point, index) => ({
        ...point,
        // Add index for efficient lookups
        _index: index,
        // Pre-calculate commonly used values
        _stringValue: point.value.toString(),
        _hasMetadata: Boolean(point.metadata && Object.keys(point.metadata).length > 0),
      })),
      // Pre-calculate dataset statistics
      _stats: {
        min: Math.min(...dataset.data.map(p => p.value)),
        max: Math.max(...dataset.data.map(p => p.value)),
        average: dataset.data.reduce((sum, p) => sum + p.value, 0) / dataset.data.length,
        count: dataset.data.length,
      },
    }));

    const endTime = performance.now();
    const processingTime = endTime - startTime;

    // Update performance metrics
    renderCountRef.current += 1;
    const currentTime = Date.now();
    const timeSinceLastRender = currentTime - lastRenderTimeRef.current;
    lastRenderTimeRef.current = currentTime;

    setPerformanceMetrics(prev => ({
      renderCount: renderCountRef.current,
      averageRenderTime:
        (prev.averageRenderTime * (renderCountRef.current - 1) + processingTime) /
        renderCountRef.current,
      lastRenderDuration: processingTime,
    }));

    return processedDatasets;
  }, []);

  /**
   * Optimized scale calculations with caching
   */
  const createOptimizedScales = useCallback(
    (
      datasets: ChartDataset[],
      width: number,
      height: number,
      padding: { top: number; right: number; bottom: number; left: number }
    ) => {
      return useMemo(() => {
        if (!datasets.length) return null;

        const innerWidth = width - padding.left - padding.right;
        const innerHeight = height - padding.top - padding.bottom;

        // Calculate bounds efficiently
        const allValues = datasets.flatMap(dataset => dataset.data.map(d => d.value));
        const minValue = Math.min(...allValues);
        const maxValue = Math.max(...allValues);
        const valueRange = maxValue - minValue;

        // Pre-calculate scale functions for better performance
        const xScale = (i: number, dataLength: number) =>
          padding.left + (i / (dataLength - 1)) * innerWidth;

        const yScale = (value: number) =>
          padding.top + innerHeight - ((value - minValue) / valueRange) * innerHeight;

        return {
          xScale,
          yScale,
          minValue,
          maxValue,
          valueRange,
          innerWidth,
          innerHeight,
        };
      }, [datasets, width, height, padding.top, padding.right, padding.bottom, padding.left]);
    },
    []
  );

  /**
   * Virtualization for large datasets
   */
  const useDataVirtualization = useCallback(
    (
      data: ChartDataPoint[],
      viewportStart: number,
      viewportEnd: number,
      bufferSize: number = 50
    ) => {
      return useMemo(() => {
        if (data.length <= 1000) {
          // No virtualization needed for small datasets
          return {
            visibleData: data,
            startIndex: 0,
            endIndex: data.length - 1,
            isVirtualized: false,
          };
        }

        const start = Math.max(0, viewportStart - bufferSize);
        const end = Math.min(data.length - 1, viewportEnd + bufferSize);

        return {
          visibleData: data.slice(start, end + 1),
          startIndex: start,
          endIndex: end,
          isVirtualized: true,
          totalLength: data.length,
        };
      }, [data, viewportStart, viewportEnd, bufferSize]);
    },
    []
  );

  /**
   * Debounced data updates for real-time charts
   */
  const useDebouncedUpdates = useCallback((updateFunction: () => void, delay: number = 100) => {
    const timeoutRef = useRef<NodeJS.Timeout>();

    return useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        updateFunction();
      }, delay);
    }, [updateFunction, delay]);
  }, []);

  /**
   * Memory-efficient color palette generation using CSS custom properties
   */
  const generateOptimizedColorPalette = useMemo(() => {
    const baseColors = [
      'var(--atomix-primary)',
      'var(--atomix-secondary)',
      'var(--atomix-success)',
      'var(--atomix-info)',
      'var(--atomix-warning)',
      'var(--atomix-error)',
      'var(--atomix-primary-5)',
      'var(--atomix-primary-7)',
      'var(--atomix-primary-3)',
      'var(--atomix-gray-6)',
      'var(--atomix-gray-8)',
      'var(--atomix-gray-4)',
      'var(--atomix-primary-2)',
      'var(--atomix-primary-8)',
      'var(--atomix-gray-5)',
      'var(--atomix-gray-7)',
      'var(--atomix-primary-4)',
      'var(--atomix-primary-6)',
    ];

    // Pre-generate a large palette to avoid runtime calculations
    const extendedColors: string[] = [];
    for (let i = 0; i < 100; i++) {
      extendedColors.push(baseColors[i % baseColors.length]);
    }

    return (index: number) => extendedColors[index % extendedColors.length];
  }, []);

  /**
   * Optimized animation frame handling
   */
  const useAnimationFrame = useCallback((callback: () => void) => {
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();

    const animate = useCallback(
      (time: number) => {
        if (previousTimeRef.current !== undefined) {
          const deltaTime = time - previousTimeRef.current;
          callback();
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
      },
      [callback]
    );

    const startAnimation = useCallback(() => {
      requestRef.current = requestAnimationFrame(animate);
    }, [animate]);

    const stopAnimation = useCallback(() => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }, []);

    return { startAnimation, stopAnimation };
  }, []);

  /**
   * Smart re-rendering based on data changes
   */
  const shouldUpdateChart = useCallback(
    (prevDatasets: ChartDataset[], newDatasets: ChartDataset[], threshold: number = 0.01) => {
      if (prevDatasets.length !== newDatasets.length) return true;

      // Check if any significant data changes occurred
      for (let i = 0; i < prevDatasets.length; i++) {
        const prevData = prevDatasets[i].data;
        const newData = newDatasets[i].data;

        if (prevData.length !== newData.length) return true;

        // Check for significant value changes
        for (let j = 0; j < prevData.length; j++) {
          const valueDiff = Math.abs(prevData[j].value - newData[j].value);
          const relativeChange = valueDiff / Math.abs(prevData[j].value);

          if (relativeChange > threshold) return true;
        }
      }

      return false;
    },
    []
  );

  /**
   * Canvas optimization for better performance
   */
  const optimizeCanvasRendering = useCallback(
    (
      canvasRef: React.RefObject<HTMLCanvasElement>,
      pixelRatio: number = window.devicePixelRatio || 1
    ) => {
      if (!canvasRef.current) return null;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return null;

      // Set up high-DPI rendering
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(pixelRatio, pixelRatio);

      // Optimize canvas settings for better performance
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = 'transparent';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      return { canvas, ctx, width: rect.width, height: rect.height };
    },
    []
  );

  /**
   * Batch DOM updates for better performance
   */
  const batchDOMUpdates = useCallback((updates: (() => void)[]) => {
    // Use requestAnimationFrame to batch DOM updates
    requestAnimationFrame(() => {
      updates.forEach(update => update());
    });
  }, []);

  return {
    // Data processing
    processDatasetsOptimized,
    createOptimizedScales,
    useDataVirtualization,

    // Performance monitoring
    performanceMetrics,
    shouldUpdateChart,

    // Rendering optimizations
    generateOptimizedColorPalette,
    optimizeCanvasRendering,
    batchDOMUpdates,

    // Animation and updates
    useAnimationFrame,
    useDebouncedUpdates,
  };
}
