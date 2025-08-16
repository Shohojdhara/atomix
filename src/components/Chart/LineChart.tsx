import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from '../../lib/types/components';
import Chart from './Chart';

interface LineChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Line chart specific options
   */
  lineOptions?: {
    /**
     * Whether to show area fill under lines
     */
    showArea?: boolean;

    /**
     * Whether to show data points
     */
    showDataPoints?: boolean;

    /**
     * Whether to smooth the line
     */
    smooth?: boolean;

    /**
     * Line tension for curve smoothing (0-1)
     */
    tension?: number;

    /**
     * Opacity of the area fill (0-1)
     */
    fillOpacity?: number;

    /**
     * Whether to use gradient fill
     */
    useGradient?: boolean;

    /**
     * Gradient direction for area fill
     */
    gradientDirection?: 'vertical' | 'horizontal' | 'radial';

    /**
     * Whether to show area border
     */
    showBorder?: boolean;

    /**
     * Border width for area
     */
    borderWidth?: number;

    /**
     * Line width
     */
    lineWidth?: number;

    /**
     * Data point radius
     */
    pointRadius?: number;

    /**
     * Whether to show point labels on hover
     */
    showPointLabels?: boolean;

    /**
     * Animation duration in milliseconds
     */
    animationDuration?: number;

    /**
     * Whether to enable zoom functionality
     */
    enableZoom?: boolean;

    /**
     * Whether to enable pan functionality
     */
    enablePan?: boolean;

    /**
     * Whether to enable real-time updates
     */
    enableRealTime?: boolean;

    /**
     * Real-time update interval in milliseconds
     */
    realTimeInterval?: number;

    /**
     * Whether to show crosshair on hover
     */
    showCrosshair?: boolean;

    /**
     * Whether to enable brush selection
     */
    enableBrush?: boolean;

    /**
     * Whether to show mini chart navigator
     */
    showNavigator?: boolean;

    /**
     * Navigator height ratio (0-1)
     */
    navigatorHeight?: number;

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
     * Maximum number of data points to display (for performance)
     */
    maxDataPoints?: number;

    /**
     * Whether to enable data decimation for performance
     */
    enableDecimation?: boolean;
  };

  /**
   * Real-time data update handler
   */
  onRealTimeUpdate?: () => void;

  /**
   * Zoom change handler
   */
  onZoomChange?: (zoomLevel: number, centerX: number) => void;

  /**
   * Pan change handler
   */
  onPanChange?: (offsetX: number, offsetY: number) => void;

  /**
   * Brush selection handler
   */
  onBrushSelection?: (startIndex: number, endIndex: number) => void;
}

const LineChart = memo(
  forwardRef<HTMLDivElement, LineChartProps>(
    (
      {
        datasets = [],
        config = {},
        lineOptions = {
          showArea: false,
          showDataPoints: true,
          smooth: false,
          tension: 0.4,
          fillOpacity: 0.2,
          useGradient: false,
          gradientDirection: 'vertical',
          showBorder: false,
          borderWidth: 1,
          lineWidth: 2,
          pointRadius: 4,
          showPointLabels: true,
          animationDuration: 1000,
          enableZoom: false,
          enablePan: false,
          enableRealTime: false,
          realTimeInterval: 1000,
          showCrosshair: false,
          enableBrush: false,
          showNavigator: false,
          navigatorHeight: 0.2,
          enableKeyboardNavigation: false,
          showTrendLines: false,
          showMovingAverages: false,
          movingAveragePeriods: [7, 14, 30],
          maxDataPoints: 1000,
          enableDecimation: true,
        },
        onDataPointClick,
        onRealTimeUpdate,
        onZoomChange,
        onPanChange,
        onBrushSelection,
        ...props
      },
      ref
    ) => {
      const svgRef = useRef<SVGSVGElement>(null);
      const [hoveredPoint, setHoveredPoint] = useState<{
        datasetIndex: number;
        pointIndex: number;
        x: number;
        y: number;
        clientX: number;
        clientY: number;
      } | null>(null);

      const [zoomLevel, setZoomLevel] = useState(1);
      const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
      const [crosshair, setCrosshair] = useState<{ x: number; y: number } | null>(null);
      const [brushSelection, setBrushSelection] = useState<{ start: number; end: number } | null>(
        null
      );
      const [focusedPointIndex, setFocusedPointIndex] = useState(0);
      const [realTimeData, setRealTimeData] = useState(datasets);
      const [isDragging, setIsDragging] = useState(false);
      const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

      // Real-time data updates
      useEffect(() => {
        if (!lineOptions.enableRealTime) return;

        const interval = setInterval(() => {
          onRealTimeUpdate?.();
        }, lineOptions.realTimeInterval);

        return () => clearInterval(interval);
      }, [lineOptions.enableRealTime, lineOptions.realTimeInterval, onRealTimeUpdate]);

      // Update real-time data when datasets change
      useEffect(() => {
        setRealTimeData(datasets);
      }, [datasets]);

      // Keyboard navigation
      useEffect(() => {
        if (!lineOptions.enableKeyboardNavigation) return;

        const handleKeyDown = (event: KeyboardEvent) => {
          if (!realTimeData.length) return;

          const maxIndex = realTimeData[0]?.data?.length - 1 || 0;

          switch (event.key) {
            case 'ArrowLeft':
              event.preventDefault();
              setFocusedPointIndex(prev => Math.max(0, prev - 1));
              break;
            case 'ArrowRight':
              event.preventDefault();
              setFocusedPointIndex(prev => Math.min(maxIndex, prev + 1));
              break;
            case 'Home':
              event.preventDefault();
              setFocusedPointIndex(0);
              break;
            case 'End':
              event.preventDefault();
              setFocusedPointIndex(maxIndex);
              break;
            case 'Enter':
            case ' ':
              event.preventDefault();
              const focusedData = realTimeData[0]?.data?.[focusedPointIndex];
              if (focusedData) {
                onDataPointClick?.(focusedData, 0, focusedPointIndex);
              }
              break;
          }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [lineOptions.enableKeyboardNavigation, realTimeData, focusedPointIndex, onDataPointClick]);

      // Calculate moving averages
      const calculateMovingAverage = useCallback((data: number[], period: number) => {
        const result: number[] = [];
        for (let i = 0; i < data.length; i++) {
          if (i < period - 1) {
            result.push(NaN);
          } else {
            const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
            result.push(sum / period);
          }
        }
        return result;
      }, []);

      // Data decimation for performance
      const decimateData = useCallback(
        (datasets: any[], maxPoints: number) => {
          if (!lineOptions.enableDecimation || !datasets.length) return datasets;

          const dataLength = datasets[0]?.data?.length || 0;
          if (dataLength <= maxPoints) return datasets;

          const step = Math.ceil(dataLength / maxPoints);

          return datasets.map(dataset => ({
            ...dataset,
            data: dataset.data.filter((_: any, index: number) => index % step === 0),
          }));
        },
        [lineOptions.enableDecimation]
      );

      // Handle mouse interactions
      const handleMouseMove = useCallback(
        (event: React.MouseEvent<SVGSVGElement>) => {
          if (!svgRef.current) return;

          const rect = svgRef.current.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          if (lineOptions.showCrosshair) {
            setCrosshair({ x, y });
          }

          if (isDragging && dragStart && lineOptions.enablePan) {
            const deltaX = x - dragStart.x;
            const deltaY = y - dragStart.y;

            setPanOffset(prev => ({
              x: prev.x + deltaX,
              y: prev.y + deltaY,
            }));

            setDragStart({ x, y });
            onPanChange?.(panOffset.x + deltaX, panOffset.y + deltaY);
          }
        },
        [
          lineOptions.showCrosshair,
          lineOptions.enablePan,
          isDragging,
          dragStart,
          panOffset,
          onPanChange,
        ]
      );

      const handleMouseDown = useCallback(
        (event: React.MouseEvent<SVGSVGElement>) => {
          if (!lineOptions.enablePan) return;

          setIsDragging(true);
          setDragStart({ x: event.clientX, y: event.clientY });
        },
        [lineOptions.enablePan]
      );

      const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setDragStart(null);
      }, []);

      const handleWheel = useCallback(
        (event: React.WheelEvent<SVGSVGElement>) => {
          if (!lineOptions.enableZoom) return;

          event.preventDefault();
          const delta = event.deltaY > 0 ? 0.9 : 1.1;
          const newZoomLevel = Math.max(0.1, Math.min(10, zoomLevel * delta));

          setZoomLevel(newZoomLevel);
          onZoomChange?.(newZoomLevel, event.clientX);
        },
        [lineOptions.enableZoom, zoomLevel, onZoomChange]
      );

      // Handle point hover
      const handlePointHover = useCallback(
        (
          datasetIndex: number,
          pointIndex: number,
          x: number,
          y: number,
          clientX: number,
          clientY: number
        ) => {
          setHoveredPoint({ datasetIndex, pointIndex, x, y, clientX, clientY });
          setFocusedPointIndex(pointIndex);
        },
        []
      );

      const handlePointLeave = useCallback(() => {
        setHoveredPoint(null);
      }, []);

      // Process data with decimation and real-time updates
      const processedDatasets = useMemo(() => {
        let data = lineOptions.enableRealTime ? realTimeData : datasets;

        if (lineOptions.maxDataPoints) {
          data = decimateData(data, lineOptions.maxDataPoints);
        }

        return data;
      }, [
        datasets,
        realTimeData,
        lineOptions.enableRealTime,
        lineOptions.maxDataPoints,
        decimateData,
      ]);

      // Calculate dimensions and scales
      const chartContent = useMemo(() => {
        if (!processedDatasets.length) return null;

        // Calculate chart dimensions
        const width = 800;
        const baseHeight = 400;
        const navigatorHeight = lineOptions.showNavigator
          ? baseHeight * (lineOptions.navigatorHeight || 0.2)
          : 0;
        const height = baseHeight + navigatorHeight;
        const padding = { top: 20, right: 30, bottom: 40 + navigatorHeight, left: 50 };
        const innerWidth = width - padding.left - padding.right;
        const innerHeight = baseHeight - padding.top - (40 + navigatorHeight);

        // Find min/max values for scaling
        const allValues = processedDatasets.flatMap(dataset => dataset.data.map(d => d.value));
        const minValue = config.yAxis?.min ?? Math.min(0, ...allValues);
        const maxValue = config.yAxis?.max ?? Math.max(...allValues);

        // Calculate scales with zoom and pan
        const xScale = (i: number) => {
          const firstDataset = processedDatasets[0];
          if (!firstDataset?.data?.length) return padding.left;
          const baseX = padding.left + (i / (firstDataset.data.length - 1)) * innerWidth;
          return baseX * zoomLevel + panOffset.x;
        };

        const yScale = (value: number) => {
          const baseY =
            padding.top + innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;
          return baseY * zoomLevel + panOffset.y;
        };

        // Generate colors if not provided
        const defaultColors = ['#7AFFD7', '#1AFFD2', '#00E6C3', '#4DFF9F', '#1AFF85', '#00E66B'];

        // Generate smooth curve path
        const generateSmoothPath = (points: Array<{ x: number; y: number }>) => {
          if (points.length < 2) return '';

          if (!lineOptions.smooth) {
            return points
              .map((point, i) => (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`))
              .join(' ');
          }

          // Catmull-Rom spline for smooth curves
          const tension = lineOptions.tension || 0.4;
          const firstPoint = points[0];
          if (!firstPoint) return '';
          let path = `M ${firstPoint.x},${firstPoint.y}`;

          for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];
            const prev = i > 0 ? points[i - 1] : current;
            const nextNext = i < points.length - 2 ? points[i + 2] : next;

            if (!current || !next || !prev || !nextNext) continue;

            const cp1x = current.x + ((next.x - prev.x) * tension) / 6;
            const cp1y = current.y + ((next.y - prev.y) * tension) / 6;
            const cp2x = next.x - ((nextNext.x - current.x) * tension) / 6;
            const cp2y = next.y - ((nextNext.y - current.y) * tension) / 6;

            path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
          }

          return path;
        };

        const chartElements = [];

        // Moving averages
        if (lineOptions.showMovingAverages && lineOptions.movingAveragePeriods) {
          processedDatasets.forEach((dataset, datasetIndex) => {
            lineOptions.movingAveragePeriods?.forEach((period, periodIndex) => {
              const values = dataset.data.map(d => d.value);
              const movingAvg = calculateMovingAverage(values, period);

              const points = movingAvg
                .map((value, i) => ({
                  x: xScale(i),
                  y: yScale(value),
                }))
                .filter(p => !isNaN(p.y));

              if (points.length > 1) {
                const color =
                  defaultColors[(datasetIndex + periodIndex + 1) % defaultColors.length];
                const path = generateSmoothPath(points);

                chartElements.push(
                  <path
                    key={`ma-${datasetIndex}-${period}`}
                    d={path}
                    stroke={color}
                    fill="none"
                    strokeWidth={1}
                    strokeDasharray="4,4"
                    opacity={0.6}
                  />
                );
              }
            });
          });
        }

        // Generate path for each dataset
        const paths = processedDatasets.map((dataset, datasetIndex) => {
          const color = dataset.color || defaultColors[datasetIndex % defaultColors.length];

          // Generate points for the path
          const points = dataset.data.map((point, i) => ({
            x: xScale(i),
            y: yScale(point.value),
            originalX: padding.left + (i / (dataset.data.length - 1)) * innerWidth,
            originalY:
              padding.top +
              innerHeight -
              ((point.value - minValue) / (maxValue - minValue)) * innerHeight,
          }));

          // Generate line path
          const linePath = generateSmoothPath(points);

          // Generate area path if needed
          const areaPath = lineOptions.showArea
            ? `${linePath} L ${xScale(dataset.data.length - 1)},${yScale(minValue)} L ${xScale(0)},${yScale(minValue)} Z`
            : '';

          // Generate gradient if needed
          const gradientId = `gradient-${datasetIndex}`;
          const gradient =
            lineOptions.useGradient && lineOptions.showArea ? (
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={color} stopOpacity={lineOptions.fillOpacity} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              </defs>
            ) : null;

          // Generate data points if needed
          const dataPoints = lineOptions.showDataPoints
            ? dataset.data.map((point, i) => {
                const x = xScale(i);
                const y = yScale(point.value);
                const isHovered =
                  hoveredPoint?.datasetIndex === datasetIndex && hoveredPoint?.pointIndex === i;

                return (
                  <g key={`point-${datasetIndex}-${i}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? lineOptions.pointRadius! * 1.5 : lineOptions.pointRadius}
                      fill={color}
                      stroke="#ffffff"
                      strokeWidth={2}
                      className={CHART.DATA_POINT_CLASS}
                      onClick={() => onDataPointClick?.(point, datasetIndex, i)}
                      onMouseEnter={e => {
                        const rect = svgRef.current?.getBoundingClientRect();
                        const clientX = rect ? e.clientX : 0;
                        const clientY = rect ? e.clientY : 0;
                        handlePointHover(datasetIndex, i, x, y, clientX, clientY);
                      }}
                      onMouseLeave={handlePointLeave}
                      data-tooltip={`${point.label}: ${point.value}`}
                    />
                    {isHovered && lineOptions.showPointLabels && (
                      <text
                        x={x}
                        y={y - 15}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#111827"
                        fontSize="12"
                        fontWeight="bold"
                        className="chart-point-label"
                      >
                        {point.value}
                      </text>
                    )}
                  </g>
                );
              })
            : null;

          return (
            <g key={`dataset-${datasetIndex}`} data-name={dataset.label}>
              {gradient}
              {lineOptions.showArea && (
                <path
                  d={areaPath}
                  fill={lineOptions.useGradient ? `url(#${gradientId})` : color}
                  className="area-path"
                  opacity={lineOptions.useGradient ? 1 : lineOptions.fillOpacity}
                />
              )}
              <path
                d={linePath}
                stroke={color}
                className="line-path"
                fill="none"
                strokeWidth={lineOptions.lineWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {dataPoints}
            </g>
          );
        });

        // Generate X and Y axes
        const xAxis = (
          <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--x`}>
            {datasets[0]?.data?.map((point, i) => (
              <text
                key={`x-label-${i}`}
                x={xScale(i)}
                y={height - 10}
                textAnchor="middle"
                fontSize="12"
                fill="#374151"
              >
                {point.label}
              </text>
            ))}
          </g>
        );

        const yAxis = (
          <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--y`}>
            {Array.from({ length: 5 }).map((_, i) => {
              const value = minValue + ((maxValue - minValue) * i) / 4;
              return (
                <text
                  key={`y-label-${i}`}
                  x={padding.left - 10}
                  y={yScale(value)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill="#374151"
                >
                  {value.toFixed(value % 1 === 0 ? 0 : 1)}
                </text>
              );
            })}
          </g>
        );

        // Generate grid lines if enabled
        const grid = (
          <g className={CHART.GRID_CLASS}>
            {config.xAxis?.showGrid &&
              datasets[0]?.data?.map((_, i) => (
                <line
                  key={`x-grid-${i}`}
                  x1={xScale(i)}
                  y1={padding.top}
                  x2={xScale(i)}
                  y2={height - padding.bottom}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                  strokeDasharray="4,4"
                  opacity={0.3}
                />
              ))}
            {config.yAxis?.showGrid &&
              Array.from({ length: 5 }).map((_, i) => {
                const value = minValue + ((maxValue - minValue) * i) / 4;
                return (
                  <line
                    key={`y-grid-${i}`}
                    x1={padding.left}
                    y1={yScale(value)}
                    x2={width - padding.right}
                    y2={yScale(value)}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="4,4"
                    opacity={0.3}
                  />
                );
              })}
          </g>
        );

        // Crosshair
        const crosshairElement =
          crosshair && lineOptions.showCrosshair ? (
            <g key="crosshair" style={{ pointerEvents: 'none' }}>
              <line
                x1={crosshair.x}
                y1={padding.top}
                x2={crosshair.x}
                y2={height - padding.bottom}
                stroke="#e5e7eb"
                strokeWidth={1}
                strokeDasharray="2,2"
                opacity={0.8}
              />
              <line
                x1={padding.left}
                y1={crosshair.y}
                x2={width - padding.right}
                y2={crosshair.y}
                stroke="#e5e7eb"
                strokeWidth={1}
                strokeDasharray="2,2"
                opacity={0.8}
              />
            </g>
          ) : null;

        // Navigator mini chart
        const navigator = lineOptions.showNavigator ? (
          <g key="navigator" className="chart-navigator">
            <rect
              x={padding.left}
              y={baseHeight - navigatorHeight + 10}
              width={innerWidth}
              height={navigatorHeight - 20}
              fill="rgba(0, 0, 0, 0.05)"
              stroke="#e5e7eb"
              strokeWidth={1}
            />
            {/* Simple overview of all data */}
            {processedDatasets.map((dataset, i) => {
              const miniPoints = dataset.data.map((point, index) => ({
                x: padding.left + (index / (dataset.data.length - 1)) * innerWidth,
                y:
                  baseHeight -
                  navigatorHeight +
                  10 +
                  (navigatorHeight - 20) * (1 - (point.value - minValue) / (maxValue - minValue)),
              }));

              const miniPath = miniPoints
                .map((point, index) =>
                  index === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`
                )
                .join(' ');

              return (
                <path
                  key={`mini-${i}`}
                  d={miniPath}
                  stroke={dataset.color || defaultColors[i % defaultColors.length]}
                  fill="none"
                  strokeWidth={1}
                  opacity={0.6}
                />
              );
            })}
          </g>
        ) : null;

        chartElements.push(...paths);

        return (
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              setCrosshair(null);
              handleMouseUp();
            }}
            onWheel={handleWheel}
            style={{
              cursor: isDragging
                ? 'grabbing'
                : lineOptions.enableZoom || lineOptions.enablePan
                  ? 'grab'
                  : 'default',
            }}
          >
            {grid}
            {xAxis}
            {yAxis}
            {chartElements}
            {crosshairElement}
            {navigator}
          </svg>
        );
      }, [
        processedDatasets,
        config,
        lineOptions,
        hoveredPoint,
        crosshair,
        zoomLevel,
        panOffset,
        focusedPointIndex,
        calculateMovingAverage,
        handleMouseMove,
        handleMouseDown,
        handleMouseUp,
        handleWheel,
        onDataPointClick,
        handlePointHover,
        handlePointLeave,
      ]);

      // Enhanced tooltip with real-time data
      const enhancedTooltip = useMemo(() => {
        if (!hoveredPoint || !lineOptions.showPointLabels) return null;

        const dataset = processedDatasets[hoveredPoint.datasetIndex];
        const dataPoint = dataset?.data[hoveredPoint.pointIndex];

        if (!dataPoint) return null;

        return (
          <div
            className={CHART.TOOLTIP_CLASS}
            style={{
              position: 'absolute',
              left: hoveredPoint.clientX + 10,
              top: hoveredPoint.clientY - 10,
            }}
          >
            <div className="c-chart__tooltip-title">{dataPoint.label}</div>
            <div className="c-chart__tooltip-content">
              <div className="c-chart__tooltip-item">
                <div className="c-chart__tooltip-item-color" />
                <div className="c-chart__tooltip-item-label">{dataPoint.label}</div>
              </div>
              <span style={{ fontWeight: '500', color: 'var(--atomix-primary-text-emphasis)' }}>
                {dataset.label}: {dataPoint.value}
              </span>
            </div>
            {dataPoint.metadata && (
              <div className="c-chart__tooltip-metadata">
                {Object.entries(dataPoint.metadata).map(([key, value]) => (
                  <div key={key} className="c-chart__tooltip-metadata-item">
                    {key}: {String(value)}
                  </div>
                ))}
              </div>
            )}
            {lineOptions.enableRealTime && (
              <div className="c-chart__tooltip-real-time">Real-time data</div>
            )}
          </div>
        );
      }, [
        hoveredPoint,
        lineOptions.showPointLabels,
        lineOptions.enableRealTime,
        processedDatasets,
      ]);

      // Render legend if enabled
      const legend = useMemo(() => {
        if (!config.showLegend || !datasets.length) return null;

        return (
          <div className={CHART.LEGEND_CLASS}>
            {datasets.map((dataset, i) => (
              <div
                key={`legend-${i}`}
                className={CHART.LEGEND_ITEM_CLASS}
                data-visible={dataset.visible !== false}
                onClick={() => props.onLegendItemClick?.(i, dataset.visible === false)}
              >
                <div
                  className={CHART.LEGEND_COLOR_CLASS}
                  style={{ backgroundColor: dataset.color || `#7c3aed` }}
                />
                <span className={CHART.LEGEND_LABEL_CLASS}>{dataset.label}</span>
              </div>
            ))}
          </div>
        );
      }, [datasets, config.showLegend, props.onLegendItemClick]);

      return (
        <Chart ref={ref} type="line" datasets={datasets} config={config} {...props}>
          <div className={CHART.CANVAS_CLASS} style={{ position: 'relative' }}>
            {chartContent}
            {enhancedTooltip}
            {lineOptions.enableKeyboardNavigation && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  fontSize: '11px',
                  color: '#6b7280',
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  pointerEvents: 'none',
                }}
              >
                Use ← → keys to navigate
              </div>
            )}
            {lineOptions.enableZoom && (
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '11px',
                  color: '#6b7280',
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  pointerEvents: 'none',
                }}
              >
                Zoom: {Math.round(zoomLevel * 100)}%
              </div>
            )}
          </div>
          {legend}
        </Chart>
      );
    }
  )
);

LineChart.displayName = 'LineChart';
export default LineChart;
export type { LineChartProps };
