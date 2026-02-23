import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CHART } from '../constants/components';
import { ChartDataset, ChartProps } from '../types/components';

/**
 * Chart interaction state interface
 */
export interface ChartInteractionState {
  hoveredPoint: {
    datasetIndex: number;
    pointIndex: number;
    x: number;
    y: number;
    clientX: number;
    clientY: number;
  } | null;
  selectedPoints: Array<{ datasetIndex: number; pointIndex: number }>;
  zoomLevel: number;
  panOffset: { x: number; y: number };
  panEnabled: boolean;
  isAnimating: boolean;
  isDragging: boolean;
  dragStart: { x: number; y: number } | null;
  crosshair: { x: number; y: number } | null;
  brushSelection: { start: number; end: number } | null;
  focusedPointIndex: number;
  // Touch and pen support
  touchState: {
    touches: Array<{ id: number; x: number; y: number }>;
    lastDistance: number;
    isPinching: boolean;
    isTouch: boolean;
    lastTouchTime: number;
  };
  penState: {
    isPen: boolean;
    pressure: number;
    tiltX: number;
    tiltY: number;
  };
}

/**
 * Chart scales interface
 */
export interface ChartScales {
  xScale: (index: number, dataLength?: number) => number;
  yScale: (value: number) => number;
  minValue: number;
  maxValue: number;
  valueRange: number;
  innerWidth: number;
  innerHeight: number;
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
}

/**
 * Comprehensive chart hook with shared functionality
 * @param initialProps - Initial chart properties
 * @returns Chart state and methods
 */
export function useChart(initialProps?: Partial<ChartProps>) {
  const [interactionState, setInteractionState] = useState<ChartInteractionState>({
    hoveredPoint: null,
    selectedPoints: [],
    zoomLevel: 1,
    panOffset: { x: 0, y: 0 },
    panEnabled: false,
    isAnimating: false,
    isDragging: false,
    dragStart: null,
    crosshair: null,
    brushSelection: null,
    focusedPointIndex: 0,
    touchState: {
      touches: [],
      lastDistance: 0,
      isPinching: false,
      isTouch: false,
      lastTouchTime: 0,
    },
    penState: {
      isPen: false,
      pressure: 0,
      tiltX: 0,
      tiltY: 0,
    },
  });

  // Default chart properties
  const defaultProps: Partial<ChartProps> = {
    type: 'line',
    size: 'md',
    variant: 'primary',
    loading: false,
    interactive: true,
    ...initialProps,
  };

  // Animation frame ref for smooth updates
  const animationFrameRef = useRef<number | null>(null);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  /**
   * Point interaction handlers
   */
  const handlePointHover = useCallback(
    (
      datasetIndex: number,
      pointIndex: number,
      x: number,
      y: number,
      clientX: number,
      clientY: number
    ) => {
      setInteractionState(prev => ({
        ...prev,
        hoveredPoint: { datasetIndex, pointIndex, x, y, clientX, clientY },
      }));
    },
    []
  );

  const handlePointLeave = useCallback(() => {
    setInteractionState(prev => ({
      ...prev,
      hoveredPoint: null,
    }));
  }, []);

  const handlePointClick = useCallback((datasetIndex: number, pointIndex: number) => {
    setInteractionState(prev => {
      const isSelected = prev.selectedPoints.some(
        point => point.datasetIndex === datasetIndex && point.pointIndex === pointIndex
      );

      return {
        ...prev,
        selectedPoints: isSelected
          ? prev.selectedPoints.filter(
              point => !(point.datasetIndex === datasetIndex && point.pointIndex === pointIndex)
            )
          : [...prev.selectedPoints, { datasetIndex, pointIndex }],
      };
    });
  }, []);

  /**
   * Zoom and pan handlers
   */
  const handleZoom = useCallback((delta: number, centerX?: number, centerY?: number) => {
    setInteractionState(prev => {
      const zoomFactor = 1 - delta * 0.001;
      const newZoomLevel = Math.max(0.1, Math.min(10, prev.zoomLevel * zoomFactor));
      const zoomRatio = newZoomLevel / prev.zoomLevel;

      // Adjust pan offset to zoom towards center point
      const newPanOffset = {
        x: centerX ? centerX - (centerX - prev.panOffset.x) * zoomRatio : prev.panOffset.x,
        y: centerY ? centerY - (centerY - prev.panOffset.y) * zoomRatio : prev.panOffset.y,
      };

      return {
        ...prev,
        zoomLevel: newZoomLevel,
        panOffset: newPanOffset,
      };
    });
  }, []);

  const handlePan = useCallback((deltaX: number, deltaY: number) => {
    setInteractionState(prev => ({
      ...prev,
      panOffset: {
        x: prev.panOffset.x + deltaX,
        y: prev.panOffset.y + deltaY,
      },
    }));
  }, []);

  const handleDragStart = useCallback((x: number, y: number) => {
    setInteractionState(prev => ({
      ...prev,
      isDragging: true,
      dragStart: { x, y },
    }));
  }, []);

  const handleDragEnd = useCallback(() => {
    setInteractionState(prev => ({
      ...prev,
      isDragging: false,
      dragStart: null,
    }));
  }, []);

  const handleCrosshair = useCallback((x: number, y: number) => {
    setInteractionState(prev => ({
      ...prev,
      crosshair: { x, y },
    }));
  }, []);

  const clearCrosshair = useCallback(() => {
    setInteractionState(prev => ({
      ...prev,
      crosshair: null,
    }));
  }, []);

  /**
   * Touch and pen interaction handlers
   */
  const handleTouchStart = useCallback((event: TouchEvent | React.TouchEvent) => {
    const touches = Array.from(event.touches).map(touch => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
    }));

    setInteractionState(prev => {
      const newState = {
        ...prev,
        touchState: {
          ...prev.touchState,
          touches,
          isTouch: true,
          lastTouchTime: Date.now(),
        },
      };

      // Single touch - start dragging only if pan is enabled
      if (touches.length === 1 && touches[0] && prev.panEnabled) {
        const rect = (event.target as Element).getBoundingClientRect();
        const x = touches[0].x - rect.left;
        const y = touches[0].y - rect.top;

        return {
          ...newState,
          isDragging: true,
          dragStart: { x, y },
        };
      }

      // Multi-touch - prepare for pinch
      if (touches.length === 2 && touches[0] && touches[1]) {
        const distance = Math.sqrt(
          Math.pow(touches[1].x - touches[0].x, 2) + Math.pow(touches[1].y - touches[0].y, 2)
        );

        return {
          ...newState,
          touchState: {
            ...newState.touchState,
            lastDistance: distance,
            isPinching: true,
          },
          isDragging: false,
        };
      }

      return newState;
    });
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent | React.TouchEvent) => {
    event.preventDefault(); // Prevent scrolling

    const touches = Array.from(event.touches).map(touch => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
    }));

    setInteractionState(prev => {
      const rect = (event.target as Element).getBoundingClientRect();

      // Single touch - pan (only if pan is enabled)
      if (
        touches.length === 1 &&
        touches[0] &&
        prev.isDragging &&
        prev.dragStart &&
        prev.panEnabled
      ) {
        const x = touches[0].x - rect.left;
        const y = touches[0].y - rect.top;

        // Use previous touch position for delta calculation if available
        const prevTouch = prev.touchState.touches[0];
        let deltaX, deltaY;

        if (prevTouch) {
          // Calculate delta from previous touch position
          const prevX = prevTouch.x - rect.left;
          const prevY = prevTouch.y - rect.top;
          deltaX = x - prevX;
          deltaY = y - prevY;
        } else {
          // Fallback to drag start position
          deltaX = x - prev.dragStart.x;
          deltaY = y - prev.dragStart.y;
        }

        // Apply sensitivity reduction for touch
        const sensitivity = 0.6; // Slightly higher than mouse for touch comfort
        const adjustedDeltaX = deltaX * sensitivity;
        const adjustedDeltaY = deltaY * sensitivity;

        // Only pan if there's meaningful movement (reduces jitter)
        if (Math.abs(adjustedDeltaX) > 1 || Math.abs(adjustedDeltaY) > 1) {
          return {
            ...prev,
            panOffset: {
              x: prev.panOffset.x + adjustedDeltaX,
              y: prev.panOffset.y + adjustedDeltaY,
            },
            touchState: {
              ...prev.touchState,
              touches,
            },
          };
        }

        // Update touch state even if no panning occurred
        return {
          ...prev,
          touchState: {
            ...prev.touchState,
            touches,
          },
        };
      }

      // Two touches - pinch zoom
      if (touches.length === 2 && touches[0] && touches[1] && prev.touchState.isPinching) {
        const distance = Math.sqrt(
          Math.pow(touches[1].x - touches[0].x, 2) + Math.pow(touches[1].y - touches[0].y, 2)
        );

        if (prev.touchState.lastDistance > 0) {
          const scale = distance / prev.touchState.lastDistance;
          const newZoomLevel = Math.max(0.1, Math.min(10, prev.zoomLevel * scale));

          // Calculate center point for zoom
          const centerX = (touches[0]!.x + touches[1]!.x) / 2 - rect.left;
          const centerY = (touches[0]!.y + touches[1]!.y) / 2 - rect.top;

          // Adjust pan offset to zoom towards center
          const zoomRatio = newZoomLevel / prev.zoomLevel;
          const newPanOffset = {
            x: centerX - (centerX - prev.panOffset.x) * zoomRatio,
            y: centerY - (centerY - prev.panOffset.y) * zoomRatio,
          };

          return {
            ...prev,
            zoomLevel: newZoomLevel,
            panOffset: newPanOffset,
            touchState: {
              ...prev.touchState,
              touches,
              lastDistance: distance,
            },
          };
        }

        return {
          ...prev,
          touchState: {
            ...prev.touchState,
            touches,
            lastDistance: distance,
          },
        };
      }

      return {
        ...prev,
        touchState: {
          ...prev.touchState,
          touches,
        },
      };
    });
  }, []);

  const handleTouchEnd = useCallback((event: TouchEvent | React.TouchEvent) => {
    const touches = Array.from(event.touches).map(touch => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
    }));

    setInteractionState(prev => {
      // If no touches left, end all touch interactions
      if (touches.length === 0) {
        return {
          ...prev,
          isDragging: false,
          dragStart: null,
          touchState: {
            ...prev.touchState,
            touches: [],
            isPinching: false,
            lastDistance: 0,
            isTouch: false,
          },
        };
      }

      // If one touch left, continue dragging if pan is enabled
      if (touches.length === 1 && prev.panEnabled) {
        const rect = (event.target as Element).getBoundingClientRect();
        const x = touches[0]!.x - rect.left;
        const y = touches[0]!.y - rect.top;

        return {
          ...prev,
          dragStart: { x, y },
          touchState: {
            ...prev.touchState,
            touches,
            isPinching: false,
            lastDistance: 0,
          },
        };
      }

      // If two touches left, continue pinching
      if (touches.length === 2) {
        const distance = Math.sqrt(
          Math.pow(touches[1]!.x - touches[0]!.x, 2) + Math.pow(touches[1]!.y - touches[0]!.y, 2)
        );

        return {
          ...prev,
          touchState: {
            ...prev.touchState,
            touches,
            lastDistance: distance,
            isPinching: true,
          },
          isDragging: false,
        };
      }

      return {
        ...prev,
        touchState: {
          ...prev.touchState,
          touches,
        },
      };
    });
  }, []);

  const handlePointerDown = useCallback((event: PointerEvent) => {
    if (event.pointerType === 'pen') {
      setInteractionState(prev => ({
        ...prev,
        penState: {
          ...prev.penState,
          isPen: true,
          pressure: event.pressure,
          tiltX: event.tiltX,
          tiltY: event.tiltY,
        },
      }));
    }
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    if (event.pointerType === 'pen') {
      setInteractionState(prev => ({
        ...prev,
        penState: {
          ...prev.penState,
          pressure: event.pressure,
          tiltX: event.tiltX,
          tiltY: event.tiltY,
        },
      }));
    }
  }, []);

  const handlePointerUp = useCallback((event: PointerEvent) => {
    if (event.pointerType === 'pen') {
      setInteractionState(prev => ({
        ...prev,
        penState: {
          ...prev.penState,
          isPen: false,
          pressure: 0,
          tiltX: 0,
          tiltY: 0,
        },
      }));
    }
  }, []);

  /**
   * Chart calculations and utilities
   */
  const calculateScales = useCallback(
    (
      datasets: ChartDataset[],
      width: number = CHART.DEFAULT_WIDTH,
      height: number = CHART.DEFAULT_HEIGHT,
      padding: { top: number; right: number; bottom: number; left: number } = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40,
      },
      config?: ChartProps['config']
    ): ChartScales | null => {
      if (!datasets || datasets.length === 0) return null;

      // Flatten all data points to find min/max values
      const allDataPoints = datasets.flatMap(dataset => dataset.data);
      if (allDataPoints.length === 0) return null;

      const minValue = Math.min(...allDataPoints.map(point => point.value));
      const maxValue = Math.max(...allDataPoints.map(point => point.value));
      const valueRange = maxValue - minValue || 1; // Avoid division by zero

      // Apply padding
      const innerWidth = width - padding.left - padding.right;
      const innerHeight = height - padding.top - padding.bottom;

      // Create scale functions
      const xScale = (index: number, dataLength: number = allDataPoints.length) => {
        if (dataLength <= 1) return padding.left + innerWidth / 2;
        return padding.left + (index / (dataLength - 1)) * innerWidth;
      };

      const yScale = (value: number) => {
        // Invert Y axis (SVG coordinates start from top)
        return padding.top + innerHeight - ((value - minValue) / valueRange) * innerHeight;
      };

      return {
        xScale,
        yScale,
        minValue,
        maxValue,
        valueRange,
        innerWidth,
        innerHeight,
        width,
        height,
        padding,
      };
    },
    []
  );

  const getChartColors = useCallback((count: number): (string | undefined)[] => {
    if (count <= 0) return [];

    // Generate colors from the theme
    const colors = [];
    for (let i = 0; i < count; i++) {
      // Cycle through available colors
      const colorIndex = i % CHART.DEFAULT_COLORS.length;
      colors.push(CHART.DEFAULT_COLORS[colorIndex]);
    }

    return colors;
  }, []);

  // Ref for SVG element
  const svgRef = useRef<SVGSVGElement>(null);

  // Return all chart functionality
  return {
    // State
    interactionState,
    setInteractionState,

    // Point interaction handlers
    handlePointHover,
    handlePointLeave,
    handlePointClick,

    // Zoom and pan handlers
    handleZoom,
    handlePan,
    handleDragStart,
    handleDragEnd,

    // Crosshair handlers
    handleCrosshair,
    clearCrosshair,

    // Touch and pen handlers
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,

    // Utilities
    calculateScales,
    getChartColors,
    svgRef,
  };
}

/**
 * Hook for chart data processing and transformation
 */
export function useChartData(
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

    let xSum = 0;
    let ySum = 0;
    let xySum = 0;
    let x2Sum = 0;

    for (let i = 0; i < n; i++) {
      const val = values[i];
      xSum += i;
      ySum += val;
      xySum += i * val;
      x2Sum += i * i;
    }

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

/**
 * Hook for chart accessibility features
 */
export function useChartAccessibility(
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

/**
 * Hook for chart performance optimization
 */
export function useChartPerformance(
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
