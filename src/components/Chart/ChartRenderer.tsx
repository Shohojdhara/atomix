import { forwardRef, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  useChart,
  useChartAccessibility,
  useChartData,
  useChartPerformance,
} from '../../lib/composables/useChart';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from '../../lib/types/components';
import {
  ChartDataset,
  ChartScales,
  ChartRenderContentParams,
  ChartHandlers,
  ChartAccessibility,
  ChartHoveredPoint,
  ChartDataPoint,
} from './types';
import { ChartContext } from './Chart';

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
      renderContent: (params: ChartRenderContentParams) => React.ReactNode;
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
      // Always call useContext to maintain consistent hook order
      const chartContext = useContext(ChartContext);

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
      const [hoveredPoint, setHoveredPoint] = useState<ChartHoveredPoint | null>(null);

      // Ref for SVG element and container
      const svgRef = useRef<SVGSVGElement>(null);
      const containerRef = useRef<HTMLDivElement>(null);
      const [isInitialized, setIsInitialized] = useState(false);
      
      // Responsive dimensions state - initialize with 0 to prevent layout shifts
      const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
      });

      // Initialize dimensions immediately when container is available
      useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Get initial dimensions immediately
        const updateDimensions = () => {
          const rect = container.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            setDimensions({
              width: Math.floor(rect.width),
              height: Math.floor(rect.height),
            });
            setIsInitialized(true);
          }
        };

        // Try to get dimensions immediately
        updateDimensions();

        // Fallback: use requestAnimationFrame to ensure layout is complete
        const rafId = requestAnimationFrame(() => {
          updateDimensions();
        });

        // Use ResizeObserver to track container size changes
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width: containerWidth, height: containerHeight } = entry.contentRect;
            if (containerWidth > 0 && containerHeight > 0) {
              setDimensions({
                width: Math.floor(containerWidth),
                height: Math.floor(containerHeight),
              });
              setIsInitialized(true);
            }
          }
        });

        resizeObserver.observe(container);

        return () => {
          cancelAnimationFrame(rafId);
          resizeObserver.disconnect();
        };
      }, []);

      // Update dimensions when props change
      useEffect(() => {
        if (width !== CHART.DEFAULT_WIDTH || height !== CHART.DEFAULT_HEIGHT) {
          setDimensions({ width, height });
          setIsInitialized(true);
        }
      }, [width, height]);

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

      // Memoized handlers
      const handlers = useMemo<ChartHandlers>(
        () => ({
          onDataPointClick,
          onPointHover: handlePointHover,
          onPointLeave: handlePointLeave,
          onMouseMove: handleMouseMove,
          onMouseDown: handleMouseDown,
          onMouseUp: handleMouseUp,
          onWheel: () => {
            // Wheel handling is done via native event listener (non-passive)
            // This is kept for API compatibility but not used
          },
        }),
        [
          onDataPointClick,
          handlePointHover,
          handlePointLeave,
          handleMouseMove,
          handleMouseDown,
          handleMouseUp,
        ]
      );

      // Memoized accessibility props
      const accessibility = useMemo<ChartAccessibility>(
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

      // Calculate chart data with enhanced features using responsive dimensions
      // This MUST be called before any early returns to maintain consistent hook order
      const chartData = useMemo(() => {
        // Return null if dimensions not ready to prevent calculation with invalid dimensions
        if (!isInitialized || dimensions.width === 0 || dimensions.height === 0) {
          return null;
        }

        const scales = calculateScales(processedData, dimensions.width, dimensions.height, undefined, config);
        if (!scales) return null;

        const colors = getChartColors(processedData.length).filter(
          (color): color is string => color !== undefined
        );

        return {
          scales,
          colors,
          datasets: processedData.map((dataset: ChartDataset, i) => ({
            ...dataset,
            color: dataset.color || colors[i],
          })),
        };
      }, [processedData, config, dimensions.width, dimensions.height, isInitialized, calculateScales, getChartColors]);

      useEffect(() => {
        return () => {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
        };
      }, []);

      // Add native wheel event listener with non-passive option to allow preventDefault
      useEffect(() => {
        const svg = svgRef.current;
        if (!svg || !interactive || !chartContext) return;

        const handleNativeWheel = (event: WheelEvent) => {
          if (chartContext.zoomLevel === undefined) return;

          event.preventDefault();

          const delta = -event.deltaY * 0.001;
          const newZoom = Math.max(0.2, Math.min(5, chartContext.zoomLevel + delta));
          chartContext.setZoomLevel(newZoom);
        };

        // Add event listener with { passive: false } to allow preventDefault
        svg.addEventListener('wheel', handleNativeWheel, { passive: false });

        return () => {
          svg.removeEventListener('wheel', handleNativeWheel);
        };
      }, [interactive, chartContext]);

      // Early returns AFTER all hooks have been called
      if (isOptimizing) {
        return (
          <div className={`${CHART.CONTENT_CLASS} ${CHART.LOADING_CLASS}`}>
            <div className={CHART.LOADING_SPINNER_CLASS}></div>
            <span className={CHART.LOADING_TEXT_CLASS}>Optimizing chart...</span>
          </div>
        );
      }

      // Don't render until dimensions are initialized to prevent layout shifts
      if (!isInitialized || dimensions.width === 0 || dimensions.height === 0) {
        return (
          <div 
            ref={containerRef} 
            className={CHART.CANVAS_CLASS} 
            style={{ 
              width: '100%', 
              height: '100%', 
              minHeight: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        );
      }

      if (!chartData) {
        return null;
      }

      const svgWidth = dimensions.width;
      const svgHeight = dimensions.height;

      return (
        <>
          <div ref={containerRef} className={CHART.CANVAS_CLASS} style={{ width: '100%', height: '100%' }}>
            <svg
              ref={svgRef}
              width={svgWidth}
              height={svgHeight}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Chart visualization"
              tabIndex={0}
              style={{
                width: '100%',
                height: '100%',
                transform: transform,
                transformOrigin: 'center center',
                willChange: chartContext?.panEnabled ? 'transform' : 'auto',
              }}
              className="c-chart__svg"
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
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
                    y2={svgHeight}
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
                      x2={svgWidth}
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
                interactionState: {
                  hoveredIndex: hoveredPoint?.pointIndex ?? null,
                  selectedIndex: null,
                },
                handlers,
                accessibility,
                hoveredPoint,
                toolbarState: chartContext
                  ? {
                      showTooltips: chartContext.toolbarState?.showTooltips,
                      showLegend: chartContext.toolbarState?.showLegend,
                      animationsEnabled: chartContext.toolbarState?.animationsEnabled,
                      showGrid: chartContext.toolbarState?.showGrid,
                    }
                  : undefined,
                config,
              })}

              {/* Crosshair for enhanced interaction */}
              {interactive && chartContext?.panEnabled && (
                <g className="c-chart__crosshair">
                  <line
                    x1={0}
                    y1={svgHeight / 2}
                    x2={svgWidth}
                    y2={svgHeight / 2}
                    className="c-chart__crosshair-line c-chart__crosshair-line--horizontal"
                  />
                  <line
                    x1={svgWidth / 2}
                    y1={0}
                    x2={svgWidth / 2}
                    y2={svgHeight}
                    className="c-chart__crosshair-line c-chart__crosshair-line--vertical"
                  />
                </g>
              )}
            </svg>
          </div>

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
