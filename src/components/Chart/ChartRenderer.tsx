import { forwardRef, memo, useMemo, useCallback } from 'react';
import { useChart, useChartData, useChartAccessibility, useChartPerformance } from '../../lib/composables/useChart';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from '../../lib/types/components';

/**
 * Enhanced chart renderer component with comprehensive functionality
 */
const ChartRenderer = memo(
  forwardRef<
    SVGSVGElement,
    {
      datasets: ChartProps['datasets'];
      config?: ChartProps['config'];
      width?: number;
      height?: number;
      onDataPointClick?: ChartProps['onDataPointClick'];
      interactive?: boolean;
      enableRealTime?: boolean;
      enableAccessibility?: boolean;
      enablePerformanceOptimization?: boolean;
      renderContent: (params: {
        scales: any;
        colors: string[];
        datasets: any[];
        interactionState: any;
        handlers: {
          onDataPointClick?: ChartProps['onDataPointClick'];
          onPointHover: (datasetIndex: number, pointIndex: number, x: number, y: number, clientX: number, clientY: number) => void;
          onPointLeave: () => void;
          onMouseMove: (event: React.MouseEvent<SVGSVGElement>) => void;
          onMouseDown: (event: React.MouseEvent<SVGSVGElement>) => void;
          onMouseUp: () => void;
          onWheel: (event: React.WheelEvent<SVGSVGElement>) => void;
        };
        accessibility: {
          announcement: string;
          focusedPoint: { datasetIndex: number; pointIndex: number };
          getAccessibleDescription: () => string;
        };
      }) => React.ReactNode;
    }
  >(({ 
    datasets = [], 
    config, 
    width = CHART.DEFAULT_WIDTH, 
    height = CHART.DEFAULT_HEIGHT, 
    onDataPointClick,
    interactive = true,
    enableRealTime = false,
    enableAccessibility = true,
    enablePerformanceOptimization = true,
    renderContent 
  }, ref) => {
    // Enhanced chart hooks
    const {
      calculateScales,
      getChartColors,
      interactionState,
      handlePointHover,
      handlePointLeave,
      handlePointClick,
      handleZoom,
      handlePan,
      handleDragStart,
      handleDragEnd,
      handleCrosshair,
      clearCrosshair,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      handlePointerDown,
      handlePointerMove,
      handlePointerUp,
      svgRef,
    } = useChart({ interactive });

    const {
      processedData,
      isProcessing,
    } = useChartData(datasets, {
      enableRealTime,
      enableDecimation: enablePerformanceOptimization,
      maxDataPoints: 1000,
    });

    const {
      announcement,
      focusedPoint,
      getAccessibleDescription,
      handleKeyDown,
    } = useChartAccessibility(processedData, {
      enableKeyboardNavigation: enableAccessibility,
      enableScreenReader: enableAccessibility,
    });

    const {
      isOptimizing,
      debouncedUpdate,
    } = useChartPerformance(processedData, {
      enableMemoization: enablePerformanceOptimization,
      debounceMs: 100,
    });

    // Enhanced interaction handlers with touch/pen support
    const handleMouseMove = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
      if (!interactive || interactionState.touchState.isTouch) return;
      
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      handleCrosshair(x, y);
      
      if (interactionState.isDragging && interactionState.dragStart) {
        const deltaX = x - interactionState.dragStart.x;
        const deltaY = y - interactionState.dragStart.y;
        handlePan(deltaX, deltaY);
      }
    }, [interactive, interactionState, handleCrosshair, handlePan]);

    const handleMouseDown = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
      if (!interactive || interactionState.touchState.isTouch) return;
      
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      handleDragStart(x, y);
    }, [interactive, interactionState.touchState.isTouch, handleDragStart]);

    const handleMouseUp = useCallback(() => {
      if (!interactive || interactionState.touchState.isTouch) return;
      handleDragEnd();
    }, [interactive, interactionState.touchState.isTouch, handleDragEnd]);

    const handleWheel = useCallback((event: React.WheelEvent<SVGSVGElement>) => {
      if (!interactive) return;
      
      event.preventDefault();
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = event.clientX - rect.left;
      const centerY = event.clientY - rect.top;
      
      // Detect trackpad vs mouse wheel
      const isTrackpad = Math.abs(event.deltaY) < 50;
      const sensitivity = isTrackpad ? 0.01 : 0.1;
      const adjustedDelta = event.deltaY * sensitivity;
      
      handleZoom(adjustedDelta, centerX, centerY);
    }, [interactive, handleZoom]);

    const enhancedOnDataPointClick = useCallback((dataPoint: any, datasetIndex: number, pointIndex: number) => {
      if (!interactive) return;
      
      handlePointClick(datasetIndex, pointIndex);
      onDataPointClick?.(dataPoint, datasetIndex, pointIndex);
    }, [interactive, handlePointClick, onDataPointClick]);

    // Calculate chart data with enhanced features
    const chartData = useMemo(() => {
      const scales = calculateScales(processedData, width, height, undefined, config);
      if (!scales) return null;

      const colors = getChartColors(processedData.length).filter((color): color is string => color !== undefined);

      return {
        scales,
        colors,
        datasets: processedData.map((dataset, i) => ({
          ...dataset,
          color: dataset.color || colors[i],
        })),
      };
    }, [processedData, config, width, height, calculateScales, getChartColors]);

    if (!chartData) {
      return null;
    }

    return (
      <svg
        ref={ref || svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${chartData.scales.width} ${chartData.scales.height}`}
        preserveAspectRatio="xMidYMid meet"
        className={CHART.CHART_SVG_CLASS}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          clearCrosshair();
          handleMouseUp();
        }}
        onWheel={handleWheel}
        onTouchStart={(e) => handleTouchStart(e.nativeEvent)}
        onTouchMove={(e) => handleTouchMove(e.nativeEvent)}
        onTouchEnd={(e) => handleTouchEnd(e.nativeEvent)}
        onPointerDown={(e) => handlePointerDown(e.nativeEvent)}
        onPointerMove={(e) => handlePointerMove(e.nativeEvent)}
        onPointerUp={(e) => handlePointerUp(e.nativeEvent)}
        tabIndex={enableAccessibility ? 0 : undefined}
        role={enableAccessibility ? 'img' : undefined}
        aria-label={enableAccessibility ? getAccessibleDescription() : undefined}
        onKeyDown={enableAccessibility ? (e) => handleKeyDown(e.nativeEvent, (datasetIndex: number, pointIndex: number) => {
          const dataPoint = processedData[datasetIndex]?.data[pointIndex];
          enhancedOnDataPointClick(dataPoint, datasetIndex, pointIndex);
        }) : undefined}
        style={{
          cursor: interactionState.isDragging ? 'grabbing' : (interactive ? 'grab' : 'default'),
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {/* Accessibility announcement */}
        {enableAccessibility && announcement && (
          <text
            x="-9999"
            y="-9999"
            className="sr-only"
            aria-live="polite"
          >
            {announcement}
          </text>
        )}
        
        {renderContent({
          ...chartData,
          interactionState,
          handlers: {
            onDataPointClick: enhancedOnDataPointClick,
            onPointHover: handlePointHover,
            onPointLeave: handlePointLeave,
            onMouseMove: handleMouseMove,
            onMouseDown: handleMouseDown,
            onMouseUp: handleMouseUp,
            onWheel: handleWheel,
          },
          accessibility: {
            announcement,
            focusedPoint,
            getAccessibleDescription,
          },
        })}
        
        {/* Crosshair overlay */}
        {interactive && interactionState.crosshair && (
          <g className="chart-crosshair" style={{ pointerEvents: 'none' }}>
            <line
              x1={interactionState.crosshair.x}
              y1={0}
              x2={interactionState.crosshair.x}
              y2={chartData.scales.height}
              stroke="var(--atomix-gray-4)"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.6"
            />
            <line
              x1={0}
              y1={interactionState.crosshair.y}
              x2={chartData.scales.width}
              y2={interactionState.crosshair.y}
              stroke="var(--atomix-gray-4)"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.6"
            />
          </g>
        )}
        
        {/* Zoom indicator */}
        {interactive && interactionState.zoomLevel !== 1 && (
          <g className="chart-zoom-indicator">
            <rect
              x={chartData.scales.width - 80}
              y={10}
              width="70"
              height="20"
              fill="rgba(0, 0, 0, 0.8)"
              rx="4"
            />
            <text
              x={chartData.scales.width - 45}
              y={24}
              textAnchor="middle"
              fill="white"
              fontSize="12"
            >
              {Math.round(interactionState.zoomLevel * 100)}%
            </text>
          </g>
        )}
      </svg>
    );
  })
);

ChartRenderer.displayName = 'ChartRenderer';
export default ChartRenderer;
