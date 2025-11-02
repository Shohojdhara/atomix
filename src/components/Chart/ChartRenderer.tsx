import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  useChart,
  useChartAccessibility,
  useChartData,
  useChartPerformance,
} from '../../lib/composables/useChart';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from '../../lib/types/components';
import { useChartContext } from './Chart';

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
          onPointHover: (
            datasetIndex: number,
            pointIndex: number,
            x: number,
            y: number,
            clientX: number,
            clientY: number
          ) => void;
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
        hoveredPoint: {
          datasetIndex: number;
          pointIndex: number;
          x: number;
          y: number;
          clientX: number;
          clientY: number;
        } | null;
      }) => React.ReactNode;
    }
  >(
    (
      {
        datasets = [],
        config,
        width = CHART.DEFAULT_WIDTH,
        height = CHART.DEFAULT_HEIGHT,
        onDataPointClick,
        interactive = true,
        enableRealTime = false,
        enableAccessibility = true,
        enablePerformanceOptimization = true,
        renderContent,
      },
      ref
    ) => {
      // Get chart context (zoom/pan state from toolbar) - optional
      let chartContext: ReturnType<typeof useChartContext> | null = null;
      try {
        chartContext = useChartContext();
      } catch (e) {
        // ChartRenderer used outside of Chart component - use internal state only
      }

      // Chart composition hooks
      const { calculateScales, getChartColors } = useChart();
      const { processedData, isProcessing } = useChartData(datasets, {
        enableRealTime,
        enableDecimation: enablePerformanceOptimization,
        maxDataPoints: 1000,
      });
      const { isOptimizing, memoizedScales } = useChartPerformance(processedData, {
        enableVirtualization: false,
        enableMemoization: enablePerformanceOptimization,
        debounceMs: 100,
      });
      const { announcement, focusedPoint } = useChartAccessibility(processedData, {
        enableScreenReader: enableAccessibility,
        enableKeyboardNavigation: enableAccessibility,
        announceDataChanges: enableAccessibility,
      });

      // Interaction state
      const interactionStateRef = useRef({
        isDragging: false,
        dragStart: { x: 0, y: 0 },
        lastPan: { x: 0, y: 0 },
      });

      // Hovered point state
      const [hoveredPoint, setHoveredPoint] = useState<{
        datasetIndex: number;
        pointIndex: number;
        x: number;
        y: number;
        clientX: number;
        clientY: number;
      } | null>(null);

      // Ref for SVG element
      const svgRef = useRef<SVGSVGElement>(null);

      // Event handlers
      const handlePointHover = useCallback(
        (
          datasetIndex: number,
          pointIndex: number,
          x: number,
          y: number,
          clientX: number,
          clientY: number
        ) => {
          // Handle point hover
          setHoveredPoint({ datasetIndex, pointIndex, x, y, clientX, clientY });
        },
        []
      );

      const handlePointLeave = useCallback(() => {
        // Reset hover state
        setHoveredPoint(null);
      }, []);

      const rafRef = useRef<number | null>(null);

      const handleMouseMove = useCallback(
        (event: React.MouseEvent<SVGSVGElement>) => {
          if (!interactive || !chartContext || !chartContext.panEnabled) return;
          if (!interactionStateRef.current.isDragging) return;

          if (rafRef.current) return;

          rafRef.current = requestAnimationFrame(() => {
            const svg = svgRef.current;
            if (!svg) {
              rafRef.current = null;
              return;
            }

            const rect = svg.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const deltaX = x - interactionStateRef.current.dragStart.x;
            const deltaY = y - interactionStateRef.current.dragStart.y;

            chartContext.setPanOffset({
              x: interactionStateRef.current.lastPan.x + deltaX,
              y: interactionStateRef.current.lastPan.y + deltaY,
            });

            rafRef.current = null;
          });
        },
        [interactive, chartContext]
      );

      const handleMouseDown = useCallback(
        (event: React.MouseEvent<SVGSVGElement>) => {
          if (!interactive || !chartContext || !chartContext.panEnabled) return;

          const svg = svgRef.current;
          if (!svg) return;

          const rect = svg.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          interactionStateRef.current.isDragging = true;
          interactionStateRef.current.dragStart = { x, y };
          interactionStateRef.current.lastPan = { ...chartContext.panOffset };
        },
        [interactive, chartContext]
      );

      const handleMouseUp = useCallback(() => {
        interactionStateRef.current.isDragging = false;
      }, []);

      const handleWheel = useCallback(
        (event: React.WheelEvent<SVGSVGElement>) => {
          if (!interactive || !chartContext) return;

          event.preventDefault();

          const delta = -event.deltaY * 0.001;
          const newZoom = Math.max(0.2, Math.min(5, chartContext.zoomLevel + delta));
          chartContext.setZoomLevel(newZoom);
        },
        [interactive, chartContext]
      );

      // Memoized handlers
      const handlers = useMemo(
        () => ({
          onDataPointClick,
          onPointHover: handlePointHover,
          onPointLeave: handlePointLeave,
          onMouseMove: handleMouseMove,
          onMouseDown: handleMouseDown,
          onMouseUp: handleMouseUp,
          onWheel: handleWheel,
        }),
        [
          onDataPointClick,
          handlePointHover,
          handlePointLeave,
          handleMouseMove,
          handleMouseDown,
          handleMouseUp,
          handleWheel,
        ]
      );

      // Memoized accessibility props
      const accessibility = useMemo(
        () => ({
          announcement,
          focusedPoint,
          getAccessibleDescription: () => 'Chart description',
        }),
        [announcement, focusedPoint]
      );

      const transform = useMemo(() => {
        if (!chartContext) return '';
        return `translate(${chartContext.panOffset.x}px, ${chartContext.panOffset.y}px) scale(${chartContext.zoomLevel})`;
      }, [chartContext?.panOffset.x, chartContext?.panOffset.y, chartContext?.zoomLevel]);

      useEffect(() => {
        return () => {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
        };
      }, []);

      if (isOptimizing) {
        return (
          <div className={`${CHART.CONTENT_CLASS} ${CHART.LOADING_CLASS}`}>
            <div className={CHART.LOADING_SPINNER_CLASS}></div>
            <span className={CHART.LOADING_TEXT_CLASS}>Optimizing chart...</span>
          </div>
        );
      }

      // Calculate chart data with enhanced features
      const chartData = useMemo(() => {
        const scales = calculateScales(processedData, width, height, undefined, config);
        if (!scales) return null;

        const colors = getChartColors(processedData.length).filter(
          (color): color is string => color !== undefined
        );

        return {
          scales,
          colors,
          datasets: processedData.map((dataset: any, i) => ({
            ...dataset,
            color: dataset.color || colors[i],
          })),
        };
      }, [processedData, config, width, height, calculateScales, getChartColors]);

      if (!chartData) {
        return null;
      }

      return (
        <>
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className={CHART.CANVAS_CLASS}
            role="img"
            aria-label="Chart visualization"
            tabIndex={0}
            style={{
              transform: transform,
              transformOrigin: 'center center',
              willChange: chartContext?.panEnabled ? 'transform' : 'auto',
            }}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {/* Chart grid */}
            <g className="c-chart__grid-group">
              {/* X-axis grid lines */}
              {chartData.datasets[0]?.data.map((_: any, index: number) => (
                <line
                  key={`x-grid-${index}`}
                  x1={chartData.scales.xScale(index, chartData.datasets[0]?.data.length)}
                  y1={0}
                  x2={chartData.scales.xScale(index, chartData.datasets[0]?.data.length)}
                  y2={height}
                  className="c-chart__grid c-chart__grid--vertical"
                />
              ))}

              {/* Y-axis grid lines - generate 5 ticks by default */}
              {Array.from({ length: 5 }).map((_: any, index: number) => {
                const value =
                  chartData.scales.minValue +
                  (chartData.scales.maxValue - chartData.scales.minValue) * (index / 4);
                return (
                  <line
                    key={`y-grid-${index}`}
                    x1={0}
                    y1={chartData.scales.yScale(value)}
                    x2={width}
                    y2={chartData.scales.yScale(value)}
                    className="c-chart__grid c-chart__grid--horizontal"
                  />
                );
              })}
            </g>

            {/* Render chart content */}
            {renderContent({
              scales: chartData.scales,
              colors: chartData.colors,
              datasets: chartData.datasets,
              interactionState: interactionStateRef.current,
              handlers,
              accessibility,
              hoveredPoint,
            })}

            {/* Crosshair for enhanced interaction */}
            {interactive && chartContext?.panEnabled && (
              <g className="c-chart__crosshair">
                <line
                  x1={0}
                  y1={height / 2}
                  x2={width}
                  y2={height / 2}
                  className="c-chart__crosshair-line c-chart__crosshair-line--horizontal"
                />
                <line
                  x1={width / 2}
                  y1={0}
                  x2={width / 2}
                  y2={height}
                  className="c-chart__crosshair-line c-chart__crosshair-line--vertical"
                />
              </g>
            )}
          </svg>

          {/* Screen reader announcements */}
          <div aria-live="polite" className="u-visually-hidden">
            {announcement}
          </div>
        </>
      );
    }
  )
);

ChartRenderer.displayName = 'ChartRenderer';
export default ChartRenderer;
