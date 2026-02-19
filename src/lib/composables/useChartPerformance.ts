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
    const processedDatasets = datasets.map(dataset => {
      let min = Infinity;
      let max = -Infinity;
      let sum = 0;
      const count = dataset.data.length;

      const processedData = dataset.data.map((point, index) => {
        const value = point.value;
        if (value < min) min = value;
        if (value > max) max = value;
        sum += value;

        return {
          ...point,
          // Add index for efficient lookups
          _index: index,
          // Pre-calculate commonly used values
          _stringValue: point.value.toString(),
          _hasMetadata: Boolean(point.metadata && Object.keys(point.metadata).length > 0),
        };
      });

      // Handle empty dataset case
      if (count === 0) {
        min = 0;
        max = 0;
      }

      return {
        ...dataset,
        data: processedData,
        // Pre-calculate dataset statistics
        _stats: {
          min,
          max,
          average: count > 0 ? sum / count : 0,
          count,
        },
      };
    });

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
      if (!datasets.length) return null;

      const innerWidth = width - padding.left - padding.right;
      const innerHeight = height - padding.top - padding.bottom;

      // Calculate bounds efficiently
      let minValue = Infinity;
      let maxValue = -Infinity;
      let hasData = false;

      for (const dataset of datasets) {
        for (const d of dataset.data) {
          const value = d.value;
          if (value < minValue) minValue = value;
          if (value > maxValue) maxValue = value;
          hasData = true;
        }
      }

      if (!hasData) {
        minValue = 0;
        maxValue = 0;
      }
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
    },
    []
  );

  /**
   * Debounced data updates for real-time charts
   * Returns a debounced function that maintains timeout state across calls
   * Uses a closure to maintain state - each call to useDebouncedUpdates creates
   * a new debounced function with its own persistent timeout state
   */
  const useDebouncedUpdates = useCallback((updateFunction: () => void, delay: number = 100) => {
    // Use a closure variable to maintain timeout state across multiple calls to the returned function
    // This variable is created once when useDebouncedUpdates is called and persists
    // across all invocations of the returned debounced function
    let timeoutId: NodeJS.Timeout | null = null;

    const debouncedFn: (() => void) & { cancel: () => void } = () => {
      // Clear any existing timeout before setting a new one
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      // Set new timeout and store the ID
      timeoutId = setTimeout(() => {
        updateFunction();
        timeoutId = null;
      }, delay);
    };

    // Add cleanup method to cancel pending debounced calls
    debouncedFn.cancel = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    return debouncedFn;
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
      extendedColors.push(baseColors[i % baseColors.length] || '#000000');
    }

    return (index: number) => extendedColors[index % extendedColors.length];
  }, []);

  /**
   * Optimized animation frame handling
   * Returns animation control functions that maintain state across calls
   * Uses closures to maintain state - each call to useAnimationFrame creates
   * a new animation controller with its own persistent state
   */
  const useAnimationFrame = useCallback((callback: () => void) => {
    // Use closure variables to maintain animation state across multiple calls
    // These variables are created once when useAnimationFrame is called and persist
    // across all invocations of the returned animation control functions
    let requestId: number | null = null;
    let previousTime: number | null = null;

    const animate = (time: number) => {
      if (previousTime !== null && previousTime !== undefined) {
        const deltaTime = time - previousTime;
        callback();
      }
      previousTime = time;
      requestId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      // Only start if not already running
      if (requestId === null) {
        requestId = requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      if (requestId !== null) {
        cancelAnimationFrame(requestId);
        requestId = null;
      }
      previousTime = null;
    };

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
        const prevDataset = prevDatasets[i];
        const newDataset = newDatasets[i];
        if (!prevDataset || !newDataset) continue;

        const prevData = prevDataset.data;
        const newData = newDataset.data;

        if (prevData.length !== newData.length) return true;

        // Check for significant value changes
        for (let j = 0; j < prevData.length; j++) {
          const prevPoint = prevData[j];
          const newPoint = newData[j];
          if (!prevPoint || !newPoint) continue;

          const valueDiff = Math.abs(prevPoint.value - newPoint.value);
          const relativeChange = valueDiff / Math.abs(prevPoint.value);

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
