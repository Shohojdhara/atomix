import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CHART } from '../../lib/constants/components';
import { ChartDataPoint, ChartProps } from './types';
import Chart from './Chart';
import ChartTooltip from './ChartTooltip';

interface InteractiveChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Interactive chart specific options
   */
  interactiveOptions?: {
    /**
     * Chart type for interactive rendering
     */
    chartType?: 'line' | 'area' | 'bar' | 'scatter';

    /**
     * Whether to enable advanced tooltips with rich content
     */
    richTooltips?: boolean;

    /**
     * Whether to enable crosshair cursor
     */
    showCrosshair?: boolean;

    /**
     * Whether to enable brush selection
     */
    enableBrush?: boolean;

    /**
     * Whether to enable zooming with mouse wheel
     */
    enableMouseWheelZoom?: boolean;

    /**
     * Whether to enable data point highlighting on hover
     */
    highlightOnHover?: boolean;

    /**
     * Animation duration in milliseconds
     */
    animationDuration?: number;

    /**
     * Animation easing function
     */
    animationEasing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

    /**
     * Whether to show data labels
     */
    showDataLabels?: boolean;

    /**
     * Whether to enable keyboard navigation
     */
    enableKeyboardNavigation?: boolean;

    /**
     * Custom tooltip renderer
     */
    customTooltipRenderer?: (
      dataPoint: ChartDataPoint,
      datasetIndex: number,
      pointIndex: number
    ) => React.ReactNode;

    /**
     * Whether to show minimap for navigation
     */
    showMinimap?: boolean;

    /**
     * Whether to enable data filtering
     */
    enableDataFiltering?: boolean;
  };
}

const InteractiveChart = memo(
  forwardRef<HTMLDivElement, InteractiveChartProps>(
    (
      {
        datasets = [],
        config = {},
        interactiveOptions = {
          chartType: 'line',
          richTooltips: true,
          showCrosshair: true,
          enableBrush: false,
          enableMouseWheelZoom: false,
          highlightOnHover: true,
          animationDuration: 750,
          animationEasing: 'ease-out',
          showDataLabels: false,
          enableKeyboardNavigation: true,
          showMinimap: false,
          enableDataFiltering: false,
        },
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      const chartRef = useRef<SVGSVGElement>(null);
      const [hoveredPoint, setHoveredPoint] = useState<{
        datasetIndex: number;
        pointIndex: number;
        x: number;
        y: number;
        clientX: number;
        clientY: number;
        dataPoint: ChartDataPoint;
      } | null>(null);

      const [crosshair, setCrosshair] = useState<{ x: number; y: number } | null>(null);
      const [zoom, setZoom] = useState({ scale: 1, translateX: 0, translateY: 0, lastDistance: 0 });
      const [brushSelection, setBrushSelection] = useState<{ startX: number; endX: number } | null>(
        null
      );
      const [filteredDatasets, setFilteredDatasets] = useState(datasets);
      const [focusedPointIndex, setFocusedPointIndex] = useState<number>(0);

      // Update filtered datasets when original datasets change
      useEffect(() => {
        setFilteredDatasets(datasets);
      }, [datasets]);

      // Keyboard navigation
      useEffect(() => {
        if (!interactiveOptions.enableKeyboardNavigation) return;

        const handleKeyDown = (event: KeyboardEvent) => {
          if (!filteredDatasets.length) return;

          switch (event.key) {
            case 'ArrowLeft':
              event.preventDefault();
              setFocusedPointIndex(prev => Math.max(0, prev - 1));
              break;
            case 'ArrowRight':
              event.preventDefault();
              setFocusedPointIndex(prev =>
                Math.min((filteredDatasets[0]?.data?.length ?? 1) - 1, prev + 1)
              );
              break;
            case 'Enter':
            case ' ':
              event.preventDefault();
              if (filteredDatasets[0]?.data[focusedPointIndex]) {
                onDataPointClick?.(
                  filteredDatasets[0].data[focusedPointIndex],
                  0,
                  focusedPointIndex
                );
              }
              break;
          }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [
        interactiveOptions.enableKeyboardNavigation,
        filteredDatasets,
        focusedPointIndex,
        onDataPointClick,
      ]);

      // Mouse wheel zoom
      const handleMouseWheel = useCallback(
        (event: WheelEvent) => {
          if (!interactiveOptions.enableMouseWheelZoom) return;

          event.preventDefault();
          const delta = event.deltaY > 0 ? 0.9 : 1.1;

          setZoom(prev => ({
            ...prev,
            scale: Math.max(0.5, Math.min(5, prev.scale * delta)),
          }));
        },
        [interactiveOptions.enableMouseWheelZoom]
      );

      // Touch gesture handlers
      const handleTouchStart = useCallback((event: React.TouchEvent<SVGSVGElement>) => {
        event.preventDefault();
        const touches = Array.from(event.touches);

        if (touches.length === 1) {
          // Single touch - start panning
          const rect = chartRef.current?.getBoundingClientRect();
          if (rect) {
            const x = touches[0].clientX - rect.left;
            const y = touches[0].clientY - rect.top;
            setCrosshair({ x, y });
          }
        } else if (touches.length === 2) {
          // Two touches - prepare for pinch zoom
          const distance = Math.sqrt(
            Math.pow(touches[1].clientX - touches[0].clientX, 2) +
              Math.pow(touches[1].clientY - touches[0].clientY, 2)
          );
          setZoom(prev => ({ ...prev, lastDistance: distance }));
        }
      }, []);

      const handleTouchMove = useCallback((event: React.TouchEvent<SVGSVGElement>) => {
        event.preventDefault();
        const touches = Array.from(event.touches);

        if (touches.length === 1) {
          // Single touch - update crosshair
          const rect = chartRef.current?.getBoundingClientRect();
          if (rect) {
            const x = touches[0].clientX - rect.left;
            const y = touches[0].clientY - rect.top;
            setCrosshair({ x, y });
          }
        } else if (touches.length === 2) {
          // Two touches - pinch zoom
          const distance = Math.sqrt(
            Math.pow(touches[1].clientX - touches[0].clientX, 2) +
              Math.pow(touches[1].clientY - touches[0].clientY, 2)
          );

          setZoom(prev => {
            if (prev.lastDistance && prev.lastDistance > 0) {
              const scale = distance / prev.lastDistance;
              const newScale = Math.max(0.5, Math.min(5, prev.scale * scale));

              return {
                ...prev,
                scale: newScale,
                lastDistance: distance,
              };
            }
            return { ...prev, lastDistance: distance };
          });
        }
      }, []);

      const handleTouchEnd = useCallback((event: React.TouchEvent<SVGSVGElement>) => {
        const touches = Array.from(event.touches);

        if (touches.length === 0) {
          setCrosshair(null);
          setZoom(prev => ({ ...prev, lastDistance: 0 }));
        } else if (touches.length === 1) {
          // Switch from pinch to single touch
          const rect = chartRef.current?.getBoundingClientRect();
          if (rect) {
            const x = touches[0].clientX - rect.left;
            const y = touches[0].clientY - rect.top;
            setCrosshair({ x, y });
          }
          setZoom(prev => ({ ...prev, lastDistance: 0 }));
        }
      }, []);

      // Mouse move handler for crosshair
      const handleMouseMove = useCallback(
        (event: React.MouseEvent<SVGSVGElement>) => {
          if (!interactiveOptions.showCrosshair || !chartRef.current) return;

          const rect = chartRef.current.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          setCrosshair({ x, y });
        },
        [interactiveOptions.showCrosshair]
      );

      // Point hover handler
      const handlePointHover = useCallback(
        (
          datasetIndex: number,
          pointIndex: number,
          x: number,
          y: number,
          clientX: number,
          clientY: number,
          dataPoint: ChartDataPoint
        ) => {
          setHoveredPoint({ datasetIndex, pointIndex, x, y, clientX, clientY, dataPoint });
          setFocusedPointIndex(pointIndex);
        },
        []
      );

      const handlePointLeave = useCallback(() => {
        setHoveredPoint(null);
      }, []);

      // Chart content calculation
      const chartContent = useMemo(() => {
        if (!filteredDatasets.length) return null;

        const width = 800;
        const height = 400;
        const padding = { top: 40, right: 50, bottom: 60, left: 70 };
        const innerWidth = width - padding.left - padding.right;
        const innerHeight = height - padding.top - padding.bottom;

        // Calculate scales
        const allValues = filteredDatasets.flatMap(dataset => dataset.data.map(d => d.value));
        const minValue = config.yAxis?.min ?? Math.min(0, ...allValues);
        const maxValue = config.yAxis?.max ?? Math.max(...allValues);

        const xScale = (i: number) => {
          const firstDataset = filteredDatasets[0];
          if (!firstDataset?.data?.length) return padding.left;
          const baseX = padding.left + (i / (firstDataset.data.length - 1)) * innerWidth;
          return baseX * zoom.scale + zoom.translateX;
        };

        const yScale = (value: number) => {
          const baseY =
            padding.top + innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;
          return baseY * zoom.scale + zoom.translateY;
        };

        // Generate colors
        const defaultColors = ['#7AFFD7', '#1AFFD2', '#00E6C3', '#4DFF9F', '#1AFF85', '#00E66B'];

        // Generate chart elements
        const chartElements = filteredDatasets.map((dataset, datasetIndex) => {
          const color = dataset.color || defaultColors[datasetIndex % defaultColors.length];
          const elements = [];

          if (interactiveOptions.chartType === 'line' || interactiveOptions.chartType === 'area') {
            // Line/Area chart
            const points = dataset.data.map((point, i) => ({
              x: xScale(i),
              y: yScale(point.value),
            }));

            const pathData = points
              .map((point, i) => (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`))
              .join(' ');

            if (interactiveOptions.chartType === 'area') {
              elements.push(
                <path
                  key={`area-${datasetIndex}`}
                  d={`${pathData} L ${xScale(dataset.data.length - 1)},${yScale(minValue)} L ${xScale(0)},${yScale(minValue)} Z`}
                  fill={color}
                  opacity={0.3}
                />
              );
            }

            elements.push(
              <path
                key={`line-${datasetIndex}`}
                d={pathData}
                stroke={color}
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          }

          // Data points
          dataset.data.forEach((point, pointIndex) => {
            const x = xScale(pointIndex);
            const y = yScale(point.value);
            const isHovered =
              hoveredPoint?.datasetIndex === datasetIndex &&
              hoveredPoint?.pointIndex === pointIndex;
            const isFocused = focusedPointIndex === pointIndex && datasetIndex === 0;
            const isHighlighted = interactiveOptions.highlightOnHover && (isHovered || isFocused);

            elements.push(
              <g key={`point-group-${datasetIndex}-${pointIndex}`}>
                {/* Highlight ring */}
                {isHighlighted && (
                  <circle
                    cx={x}
                    cy={y}
                    r={12}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    opacity={0.3}
                  />
                )}

                {/* Data point */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHighlighted ? 6 : 4}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth={2}
                  className={CHART.DATA_POINT_CLASS}
                  onClick={() => onDataPointClick?.(point, datasetIndex, pointIndex)}
                  onMouseEnter={e => {
                    const rect = chartRef.current?.getBoundingClientRect();
                    if (rect) {
                      handlePointHover(datasetIndex, pointIndex, x, y, e.clientX, e.clientY, point);
                    }
                  }}
                  onMouseLeave={handlePointLeave}
                  tabIndex={isFocused ? 0 : -1}
                  role="button"
                  aria-label={`Data point: ${point.label}, value: ${point.value}`}
                />

                {/* Data labels */}
                {interactiveOptions.showDataLabels && (
                  <text x={x} y={y - 15} textAnchor="middle" className="c-chart__data-label">
                    {point.value}
                  </text>
                )}
              </g>
            );
          });

          return elements;
        });

        // Crosshair
        const crosshairElement =
          crosshair && interactiveOptions.showCrosshair ? (
            <g className="crosshair" style={{ pointerEvents: 'none' }}>
              <line
                x1={crosshair.x}
                y1={padding.top}
                x2={crosshair.x}
                y2={height - padding.bottom}
                className="c-chart__crosshair-line c-chart__crosshair-line--vertical"
              />
              <line
                x1={padding.left}
                y1={crosshair.y}
                x2={width - padding.right}
                y2={crosshair.y}
                className="c-chart__crosshair-line c-chart__crosshair-line--horizontal"
              />
            </g>
          ) : null;

        // Grid
        const grid = (
          <g className={CHART.GRID_CLASS}>
            {/* Vertical grid lines */}
            {config.xAxis?.showGrid &&
              filteredDatasets[0]?.data?.map((_, i) => (
                <line
                  key={`x-grid-${i}`}
                  x1={xScale(i)}
                  y1={padding.top}
                  x2={xScale(i)}
                  y2={height - padding.bottom}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                  strokeDasharray="2,2"
                  opacity={0.2}
                />
              ))}

            {/* Horizontal grid lines */}
            {config.yAxis?.showGrid &&
              Array.from({ length: 6 }).map((_, i) => {
                const value = minValue + ((maxValue - minValue) * i) / 5;
                return (
                  <line
                    key={`y-grid-${i}`}
                    x1={padding.left}
                    y1={yScale(value)}
                    x2={width - padding.right}
                    y2={yScale(value)}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="2,2"
                    opacity={0.2}
                  />
                );
              })}
          </g>
        );

        // Axes
        const axes = (
          <>
            {/* X-axis */}
            <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--x`}>
              <line
                x1={padding.left}
                y1={height - padding.bottom}
                x2={width - padding.right}
                y2={height - padding.bottom}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              {filteredDatasets[0]?.data?.map((point, i) => (
                <g key={`x-axis-${i}`}>
                  <line
                    x1={xScale(i)}
                    y1={height - padding.bottom}
                    x2={xScale(i)}
                    y2={height - padding.bottom + 5}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                  />
                  <text
                    x={xScale(i)}
                    y={height - padding.bottom + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#374151"
                  >
                    {point.label}
                  </text>
                </g>
              ))}
            </g>

            {/* Y-axis */}
            <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--y`}>
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left}
                y2={height - padding.bottom}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              {Array.from({ length: 6 }).map((_, i) => {
                const value = minValue + ((maxValue - minValue) * i) / 5;
                return (
                  <g key={`y-axis-${i}`}>
                    <line
                      x1={padding.left - 5}
                      y1={yScale(value)}
                      x2={padding.left}
                      y2={yScale(value)}
                      stroke="#e5e7eb"
                      strokeWidth={1}
                    />
                    <text
                      x={padding.left - 10}
                      y={yScale(value)}
                      textAnchor="end"
                      dominantBaseline="middle"
                      fontSize="12"
                      fill="#374151"
                    >
                      {value.toFixed(value % 1 === 0 ? 0 : 1)}
                    </text>
                  </g>
                );
              })}
            </g>
          </>
        );

        return (
          <svg
            ref={chartRef}
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setCrosshair(null)}
            onWheel={e => handleMouseWheel(e.nativeEvent)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              cursor: 'crosshair',
              touchAction: 'none', // Prevent default touch behaviors
            }}
          >
            {grid}
            {axes}
            {chartElements.flat()}
            {crosshairElement}
          </svg>
        );
      }, [
        filteredDatasets,
        config,
        interactiveOptions,
        hoveredPoint,
        crosshair,
        zoom,
        focusedPointIndex,
        handleMouseMove,
        handleMouseWheel,
        handlePointHover,
        handlePointLeave,
        onDataPointClick,
      ]);

      // Rich tooltip
      const richTooltip = useMemo(() => {
        if (!interactiveOptions.richTooltips || !hoveredPoint) return null;

        const { dataPoint, datasetIndex, clientX, clientY } = hoveredPoint;
        const dataset = filteredDatasets[datasetIndex];

        return (
          <ChartTooltip
            dataPoint={dataPoint}
            datasetLabel={dataset?.label}
            datasetColor={dataset?.color}
            position={{ x: clientX, y: clientY }}
            visible={true}
            customRenderer={
              interactiveOptions.customTooltipRenderer
                ? () =>
                    interactiveOptions.customTooltipRenderer!(
                      dataPoint,
                      datasetIndex,
                      hoveredPoint.pointIndex
                    )
                : undefined
            }
          />
        );
      }, [
        interactiveOptions.richTooltips,
        interactiveOptions.customTooltipRenderer,
        hoveredPoint,
        filteredDatasets,
      ]);

      // Legend with interactive features
      const interactiveLegend = useMemo(() => {
        if (!config.showLegend || !filteredDatasets.length) return null;

        return (
          <div
            className={CHART.LEGEND_CLASS}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '0.75rem',
            }}
          >
            {filteredDatasets.map((dataset, i) => (
              <div
                key={`legend-${i}`}
                className={CHART.LEGEND_ITEM_CLASS}
                data-visible={dataset.visible !== false}
                onClick={() => props.onLegendItemClick?.(i, dataset.visible === false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  opacity: dataset.visible === false ? 0.5 : 1,
                  transition: 'opacity 0.2s ease-in-out',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div
                  className={CHART.LEGEND_COLOR_CLASS}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: dataset.color || `var(--atomix-color-${i + 1})`,
                    marginRight: '0.5rem',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                />
                <span className={CHART.LEGEND_LABEL_CLASS} style={{ fontSize: '0.875rem' }}>
                  {dataset.label}
                </span>
              </div>
            ))}
          </div>
        );
      }, [config.showLegend, filteredDatasets, props.onLegendItemClick]);

      return (
        <Chart ref={ref} type="interactive" datasets={filteredDatasets} config={config} {...props}>
          <div className={CHART.CANVAS_CLASS} style={{ position: 'relative' }}>
            {chartContent}
            {richTooltip}
          </div>
          {interactiveLegend}
          {interactiveOptions.enableKeyboardNavigation && (
            <div
              style={{
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                color: '#6b7280',
              }}
            >
              Use arrow keys to navigate, Enter/Space to select
            </div>
          )}
        </Chart>
      );
    }
  )
);

InteractiveChart.displayName = 'InteractiveChart';
export default InteractiveChart;
export type { InteractiveChartProps };
