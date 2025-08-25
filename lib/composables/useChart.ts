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
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  /**
   * Generate chart class based on properties
   */
  const generateChartClass = useCallback(
    (props: Partial<ChartProps>): string => {
      const {
        type = defaultProps.type,
        size = defaultProps.size,
        variant = defaultProps.variant,
        loading = defaultProps.loading,
        error,
        className = '',
      } = props;

      const typeClass = type ? `${CHART.TYPE_PREFIX}${type}` : '';
      const sizeClass = size === 'md' ? '' : `${CHART.SIZE_PREFIX}${size}`;
      const variantClass = variant ? `${CHART.VARIANT_PREFIX}${variant}` : '';
      const loadingClass = loading ? CHART.LOADING_STATE_CLASS : '';
      const errorClass = error ? CHART.ERROR_STATE_CLASS : '';

      return `${CHART.BASE_CLASS} ${typeClass} ${variantClass} ${sizeClass} ${loadingClass} ${errorClass} ${className}`.trim();
    },
    [defaultProps]
  );

  /**
   * Generate chart attributes for accessibility
   */
  const generateChartAttributes = useCallback((props: Partial<ChartProps>) => {
    const { loading, error, type } = props;

    const attributes: Record<string, string> = {
      role: 'img',
      'aria-live': 'polite',
    };

    if (loading) {
      attributes['aria-busy'] = 'true';
    }

    if (error) {
      attributes['aria-invalid'] = 'true';
    }

    if (type) {
      attributes['data-chart-type'] = type;
    }

    return attributes;
  }, []);

  /**
   * Calculate chart dimensions and scales with zoom and pan support
   */
  const calculateScales = useCallback(
    (
      datasets: ChartDataset[],
      width: number = CHART.DEFAULT_WIDTH,
      height: number = CHART.DEFAULT_HEIGHT,
      padding = { top: 20, right: 30, bottom: 40, left: 50 },
      config?: any
    ): ChartScales | null => {
      if (!datasets.length) return null;

      const innerWidth = width - padding.left - padding.right;
      const innerHeight = height - padding.top - padding.bottom;

      // Calculate value bounds
      const allValues = datasets.flatMap(
        dataset => dataset.data?.map(d => (typeof d.value === 'number' ? d.value : 0)) || []
      );

      if (allValues.length === 0) return null;

      const minValue = config?.yAxis?.min ?? Math.min(0, ...allValues);
      const maxValue = config?.yAxis?.max ?? Math.max(...allValues, 1);
      const valueRange = maxValue - minValue;

      // Scale functions with zoom and pan support
      const xScale = (index: number, dataLength?: number) => {
        const totalLength = dataLength || datasets[0]?.data?.length || 1;
        if (totalLength <= 1) return padding.left + innerWidth / 2;

        const baseX = padding.left + (index / (totalLength - 1)) * innerWidth;
        return baseX * interactionState.zoomLevel + interactionState.panOffset.x;
      };

      const yScale = (value: number) => {
        if (valueRange === 0) return padding.top + innerHeight / 2;

        const baseY = padding.top + innerHeight - ((value - minValue) / valueRange) * innerHeight;
        return baseY * interactionState.zoomLevel + interactionState.panOffset.y;
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
    [interactionState.zoomLevel, interactionState.panOffset]
  );

  /**
   * Generate color palette using CSS custom properties
   */
  const getChartColors = useCallback((count: number) => {
    const colors = [
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
    ];

    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  }, []);

  /**
   * Enhanced point interaction handlers
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
        focusedPointIndex: pointIndex,
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

  const handlePointClick = useCallback(
    (datasetIndex: number, pointIndex: number, multiSelect: boolean = false) => {
      setInteractionState(prev => {
        const pointKey = { datasetIndex, pointIndex };
        const existingIndex = prev.selectedPoints.findIndex(
          p => p.datasetIndex === datasetIndex && p.pointIndex === pointIndex
        );

        let newSelectedPoints;
        if (existingIndex >= 0) {
          // Remove if already selected
          newSelectedPoints = prev.selectedPoints.filter((_, i) => i !== existingIndex);
        } else {
          // Add to selection
          newSelectedPoints = multiSelect ? [...prev.selectedPoints, pointKey] : [pointKey];
        }

        return {
          ...prev,
          selectedPoints: newSelectedPoints,
        };
      });
    },
    []
  );

  /**
   * Enhanced zoom and pan handlers
   */
  const handleZoom = useCallback((delta: number, centerX: number, centerY?: number) => {
    setInteractionState(prev => {
      const zoomFactor = 1 - delta * 0.001;
      const newZoomLevel = Math.max(0.1, Math.min(10, prev.zoomLevel * zoomFactor));

      // Adjust pan offset to zoom towards the center point
      const zoomRatio = newZoomLevel / prev.zoomLevel;
      const newPanOffset = {
        x: centerX - (centerX - prev.panOffset.x) * zoomRatio,
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

      // Single touch - start dragging
      if (touches.length === 1 && touches[0]) {
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

      // Single touch - pan
      if (touches.length === 1 && touches[0] && prev.isDragging && prev.dragStart) {
        const x = touches[0].x - rect.left;
        const y = touches[0].y - rect.top;
        const deltaX = x - prev.dragStart.x;
        const deltaY = y - prev.dragStart.y;

        return {
          ...prev,
          panOffset: {
            x: prev.panOffset.x + deltaX,
            y: prev.panOffset.y + deltaY,
          },
          dragStart: { x, y },
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
      // Reset states when no touches remain
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

      // Single touch remaining - switch from pinch to pan
      if (touches.length === 1 && touches[0] && prev.touchState.isPinching) {
        const rect = (event.target as Element).getBoundingClientRect();
        const x = touches[0].x - rect.left;
        const y = touches[0].y - rect.top;

        return {
          ...prev,
          isDragging: true,
          dragStart: { x, y },
          touchState: {
            ...prev.touchState,
            touches,
            isPinching: false,
            lastDistance: 0,
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

  const handlePointerDown = useCallback(
    (event: PointerEvent | React.PointerEvent) => {
      const isPen = event.pointerType === 'pen';
      const isTouch = event.pointerType === 'touch';

      if (isPen) {
        setInteractionState(prev => ({
          ...prev,
          penState: {
            isPen: true,
            pressure: event.pressure || 0,
            tiltX: (event as any).tiltX || 0,
            tiltY: (event as any).tiltY || 0,
          },
          isDragging: true,
          dragStart: {
            x: event.clientX - (event.target as Element).getBoundingClientRect().left,
            y: event.clientY - (event.target as Element).getBoundingClientRect().top,
          },
        }));
      } else if (!isTouch) {
        // Regular mouse interaction
        const rect = (event.target as Element).getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        handleDragStart(x, y);
      }
    },
    [handleDragStart]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent | React.PointerEvent) => {
      const rect = (event.target as Element).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (event.pointerType === 'pen' && interactionState.penState.isPen) {
        setInteractionState(prev => {
          if (prev.isDragging && prev.dragStart) {
            const deltaX = x - prev.dragStart.x;
            const deltaY = y - prev.dragStart.y;

            // Pen pressure affects pan sensitivity
            const pressureMultiplier = Math.max(0.1, event.pressure || 0.5);

            return {
              ...prev,
              panOffset: {
                x: prev.panOffset.x + deltaX * pressureMultiplier,
                y: prev.panOffset.y + deltaY * pressureMultiplier,
              },
              dragStart: { x, y },
              penState: {
                ...prev.penState,
                pressure: event.pressure || 0,
                tiltX: (event as any).tiltX || 0,
                tiltY: (event as any).tiltY || 0,
              },
            };
          }

          return {
            ...prev,
            penState: {
              ...prev.penState,
              pressure: event.pressure || 0,
              tiltX: (event as any).tiltX || 0,
              tiltY: (event as any).tiltY || 0,
            },
          };
        });
      } else if (event.pointerType !== 'touch') {
        // Regular mouse move
        handleCrosshair(x, y);

        if (interactionState.isDragging && interactionState.dragStart) {
          const deltaX = x - interactionState.dragStart.x;
          const deltaY = y - interactionState.dragStart.y;
          handlePan(deltaX, deltaY);
        }
      }
    },
    [interactionState, handleCrosshair, handlePan]
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent | React.PointerEvent) => {
      if (event.pointerType === 'pen') {
        setInteractionState(prev => ({
          ...prev,
          isDragging: false,
          dragStart: null,
          penState: {
            isPen: false,
            pressure: 0,
            tiltX: 0,
            tiltY: 0,
          },
        }));
      } else if (event.pointerType !== 'touch') {
        handleDragEnd();
      }
    },
    [handleDragEnd]
  );

  /**
   * Reset all interactions
   */
  const resetView = useCallback(() => {
    setInteractionState(prev => ({
      ...prev,
      zoomLevel: 1,
      panOffset: { x: 0, y: 0 },
      selectedPoints: [],
      crosshair: null,
      brushSelection: null,
    }));
  }, []);

  /**
   * Enhanced animation helpers
   */
  const startAnimation = useCallback((duration: number = 1000) => {
    setInteractionState(prev => ({ ...prev, isAnimating: true }));

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setInteractionState(prev => ({ ...prev, isAnimating: false }));
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setInteractionState(prev => ({ ...prev, isAnimating: false }));
  }, []);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    // State
    interactionState,
    hoveredPoint: interactionState.hoveredPoint,
    selectedPoints: interactionState.selectedPoints,
    zoomLevel: interactionState.zoomLevel,
    panOffset: interactionState.panOffset,
    isAnimating: interactionState.isAnimating,
    isDragging: interactionState.isDragging,
    crosshair: interactionState.crosshair,
    brushSelection: interactionState.brushSelection,
    focusedPointIndex: interactionState.focusedPointIndex,

    // Refs
    containerRef,
    svgRef,

    // Props and attributes
    defaultProps,
    generateChartClass,
    chartAttributes: generateChartAttributes(initialProps || {}),

    // Calculations
    calculateScales,
    getChartColors,

    // Enhanced interactions
    handlePointHover,
    handlePointLeave,
    handlePointClick,
    handleZoom,
    handlePan,
    handleDragStart,
    handleDragEnd,
    handleCrosshair,
    clearCrosshair,
    resetView,

    // Touch and pointer handlers
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,

    // Animation
    startAnimation,
    stopAnimation,

    // State setters for advanced use cases
    setInteractionState,
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
        const min = Math.min(...values);
        const max = Math.max(...values);

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
    return datasets.map(dataset => ({
      label: dataset.label,
      dataLength: dataset.data?.length || 0,
      minValue: Math.min(
        ...(dataset.data?.map(d => d.value).filter(v => typeof v === 'number') || [0])
      ),
      maxValue: Math.max(
        ...(dataset.data?.map(d => d.value).filter(v => typeof v === 'number') || [0])
      ),
    }));
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
