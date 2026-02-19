import { useCallback, useEffect, useRef, useState } from 'react';
import { CHART } from '../constants/components';
import { ChartDataset, ChartProps } from '../types/components';

export { useChartProcessing } from './useChartProcessing';
export { useChartOptimization } from './useChartOptimization';
export { useChartA11y } from './useChartA11y';

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
