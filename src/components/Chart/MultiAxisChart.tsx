import { forwardRef, memo, useCallback, useMemo } from 'react';
import { ChartDataset, ChartProps } from '../../lib/types/components';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';
import { ChartDataPoint } from './types';

interface AxisConfig {
  /**
   * Axis ID
   */
  id: string;
  /**
   * Axis position
   */
  position: 'left' | 'right' | 'top' | 'bottom';
  /**
   * Axis label
   */
  label?: string;
  /**
   * Axis color
   */
  color?: string;
  /**
   * Min value
   */
  min?: number;
  /**
   * Max value
   */
  max?: number;
  /**
   * Number format
   */
  format?: (value: number) => string;
  /**
   * Grid lines
   */
  showGrid?: boolean;
  /**
   * Tick count
   */
  tickCount?: number;
}

interface MultiAxisDataset extends ChartDataset {
  /**
   * Y-axis ID this dataset should use
   */
  yAxisId?: string;
  /**
   * Chart type for this dataset
   */
  type?: 'line' | 'bar' | 'area';
}

interface MultiAxisChartProps extends Omit<ChartProps, 'type' | 'datasets'> {
  /**
   * Multi-axis datasets
   */
  datasets: MultiAxisDataset[];

  /**
   * Y-axis configurations
   */
  yAxes: AxisConfig[];

  /**
   * X-axis configuration
   */
  xAxis?: AxisConfig;

  /**
   * Whether to sync zoom across axes
   */
  syncZoom?: boolean;

  /**
   * Whether to show crosshair across all axes
   */
  showCrosshair?: boolean;
}

const MultiAxisChart = memo(
  forwardRef<HTMLDivElement, MultiAxisChartProps>(
    (
      {
        datasets = [],
        yAxes = [],
        xAxis,
        config = {},
        syncZoom = true,
        showCrosshair = true,
        ...props
      },
      ref
    ) => {
      // Calculate scales for each axis
      const axisScales = useMemo(() => {
        const scales: Record<string, any> = {};

        // Default dimensions
        const width = 800;
        const height = 400;
        const leftAxisWidth = 60;
        const rightAxisWidth = 60;
        const topAxisHeight = 40;
        const bottomAxisHeight = 60;

        // Calculate available space
        const leftAxes = yAxes.filter(axis => axis.position === 'left');
        const rightAxes = yAxes.filter(axis => axis.position === 'right');

        const totalLeftWidth = leftAxes.length * leftAxisWidth;
        const totalRightWidth = rightAxes.length * rightAxisWidth;

        const plotAreaLeft = totalLeftWidth;
        const plotAreaRight = width - totalRightWidth;
        const plotAreaTop = topAxisHeight;
        const plotAreaBottom = height - bottomAxisHeight;
        const plotAreaWidth = plotAreaRight - plotAreaLeft;
        const plotAreaHeight = plotAreaBottom - plotAreaTop;

        // Create scales for each Y-axis
        yAxes.forEach((axis, index) => {
          // Find datasets using this axis
          const axisDatasets = datasets.filter(d => d.yAxisId === axis.id);

          if (axisDatasets.length === 0) return;

          // Calculate value range
          const allValues = axisDatasets.flatMap(
            dataset => dataset.data?.map(d => d.value).filter(v => typeof v === 'number') || []
          );

          const minValue = axis.min ?? Math.min(0, ...allValues);
          const maxValue = axis.max ?? Math.max(...allValues, 1);
          const valueRange = maxValue - minValue;

          // Create scale function
          const yScale = (value: number) => {
            if (valueRange === 0) return plotAreaTop + plotAreaHeight / 2;
            return (
              plotAreaTop + plotAreaHeight - ((value - minValue) / valueRange) * plotAreaHeight
            );
          };

          // Calculate axis position
          let axisX;
          if (axis.position === 'left') {
            const leftIndex = leftAxes.findIndex(a => a.id === axis.id);
            axisX = leftIndex * leftAxisWidth + leftAxisWidth / 2;
          } else {
            const rightIndex = rightAxes.findIndex(a => a.id === axis.id);
            axisX = plotAreaRight + rightIndex * rightAxisWidth + rightAxisWidth / 2;
          }

          scales[axis.id] = {
            yScale,
            minValue,
            maxValue,
            valueRange,
            axisX,
            tickCount: axis.tickCount || 5,
            format: axis.format || ((v: number) => v.toFixed(1)),
          };
        });

        // X-axis scale
        const maxDataLength = Math.max(...datasets.map(d => d.data?.length || 0));
        const xScale = (index: number, dataLength?: number) => {
          const totalLength = dataLength || maxDataLength;
          if (totalLength <= 1) return plotAreaLeft + plotAreaWidth / 2;
          return plotAreaLeft + (index / (totalLength - 1)) * plotAreaWidth;
        };

        scales.x = {
          xScale,
          plotAreaLeft,
          plotAreaRight,
          plotAreaTop,
          plotAreaBottom,
          plotAreaWidth,
          plotAreaHeight,
          maxDataLength,
        };

        return scales;
      }, [datasets, yAxes, xAxis]);

      // Render multi-axis content
      const renderContent = useCallback(
        ({
          scales: _,
          colors,
          datasets: renderedDatasets,
          handlers,
        }: {
          scales: any;
          colors: string[];
          datasets: MultiAxisDataset[];
          handlers: {
            onDataPointClick?: (
              dataPoint: ChartDataPoint,
              datasetIndex: number,
              pointIndex: number
            ) => void;
          };
        }) => {
          if (!renderedDatasets.length || !axisScales.x) return null;

          const {
            xScale,
            plotAreaLeft,
            plotAreaRight,
            plotAreaTop,
            plotAreaBottom,
            plotAreaWidth,
            plotAreaHeight,
          } = axisScales.x;

          return (
            <g>
              {/* Plot area background */}
              <rect
                x={plotAreaLeft}
                y={plotAreaTop}
                width={plotAreaWidth}
                height={plotAreaHeight}
                className="c-chart__plot-area"
              />

              {/* Y-axis grids and axes */}
              {yAxes.map((axis, axisIndex) => {
                const axisScale = axisScales[axis.id];
                if (!axisScale) return null;

                const ticks = Array.from({ length: axisScale.tickCount }, (_, i) => {
                  const value =
                    axisScale.minValue +
                    (axisScale.maxValue - axisScale.minValue) * (i / (axisScale.tickCount - 1));
                  return {
                    value,
                    y: axisScale.yScale(value),
                    label: axisScale.format(value),
                  };
                });

                return (
                  <g key={`y-axis-${axis.id}`}>
                    {/* Grid lines */}
                    {axis.showGrid &&
                      ticks.map((tick, i) => (
                        <line
                          key={`grid-${i}`}
                          x1={plotAreaLeft}
                          y1={tick.y}
                          x2={plotAreaRight}
                          y2={tick.y}
                          className="c-chart__grid"
                        />
                      ))}

                    {/* Axis line */}
                    <line
                      x1={axisScale.axisX}
                      y1={plotAreaTop}
                      x2={axisScale.axisX}
                      y2={plotAreaBottom}
                      stroke={axis.color || 'var(--atomix-secondary-text)'}
                      className="c-chart__axis-line"
                    />

                    {/* Ticks and labels */}
                    {ticks.map((tick, i) => (
                      <g key={`tick-${i}`}>
                        <line
                          x1={axisScale.axisX - 5}
                          y1={tick.y}
                          x2={axisScale.axisX + 5}
                          y2={tick.y}
                          stroke={axis.color || 'var(--atomix-gray-6)'}
                          strokeWidth="1"
                        />
                        <text
                          x={axis.position === 'left' ? axisScale.axisX - 10 : axisScale.axisX + 10}
                          y={tick.y}
                          textAnchor={axis.position === 'left' ? 'end' : 'start'}
                          dominantBaseline="middle"
                          className="c-chart__tick-label"
                        >
                          {tick.label}
                        </text>
                      </g>
                    ))}

                    {/* Axis label */}
                    {axis.label && (
                      <text
                        x={axisScale.axisX}
                        y={axis.position === 'left' ? 20 : plotAreaBottom + 40}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="bold"
                        fill={axis.color || 'var(--atomix-gray-8)'}
                        transform={
                          axis.position === 'left' ? `rotate(-90, ${axisScale.axisX}, 20)` : ''
                        }
                      >
                        {axis.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* X-axis */}
              <g>
                <line
                  x1={plotAreaLeft}
                  y1={plotAreaBottom}
                  x2={plotAreaRight}
                  y2={plotAreaBottom}
                  stroke="var(--atomix-gray-6)"
                  strokeWidth="2"
                />

                {/* X-axis ticks and labels */}
                {renderedDatasets[0]?.data?.map((point: ChartDataPoint, i: number) => {
                  const x = xScale(i, renderedDatasets[0]?.data?.length || 0);
                  return (
                    <g key={`x-tick-${i}`}>
                      <line
                        x1={x}
                        y1={plotAreaBottom}
                        x2={x}
                        y2={plotAreaBottom + 5}
                        stroke="var(--atomix-gray-6)"
                        strokeWidth="1"
                      />
                      <text
                        x={x}
                        y={plotAreaBottom + 20}
                        textAnchor="middle"
                        fontSize="12"
                        fill="var(--atomix-gray-7)"
                      >
                        {point.label}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Data visualization */}
              {renderedDatasets.map((dataset: MultiAxisDataset, datasetIndex: number) => {
                const axisScale =
                  axisScales[(dataset as MultiAxisDataset).yAxisId || yAxes[0]?.id || ''];
                if (!axisScale) return null;

                const color = dataset.color || colors[datasetIndex];
                const chartType = (dataset as MultiAxisDataset).type || 'line';

                if (chartType === 'line' || chartType === 'area') {
                  const points =
                    dataset.data?.map((point: ChartDataPoint, i: number) => ({
                      x: xScale(i, dataset.data?.length),
                      y: axisScale.yScale(point.value),
                    })) || [];

                  const path =
                    points.length > 1
                      ? `M ${points.map((p: { x: number; y: number }) => `${p.x},${p.y}`).join(' L ')}`
                      : '';

                  return (
                    <g key={`dataset-${datasetIndex}`}>
                      {/* Area fill */}
                      {chartType === 'area' && (
                        <path
                          d={`${path} L ${points[points.length - 1]?.x || 0},${plotAreaBottom} L ${points[0]?.x || 0},${plotAreaBottom} Z`}
                          fill={color}
                          opacity="0.3"
                        />
                      )}

                      {/* Line */}
                      <path
                        d={path}
                        stroke={color}
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Data points */}
                      {dataset.data?.map((point: ChartDataPoint, i: number) => {
                        const x = xScale(i, dataset.data?.length);
                        const y = axisScale.yScale(point.value);

                        return (
                          <circle
                            key={`point-${i}`}
                            cx={x}
                            cy={y}
                            r="4"
                            fill={color}
                            className="c-chart__data-point"
                            onClick={() => handlers.onDataPointClick?.(point, datasetIndex, i)}
                          />
                        );
                      })}
                    </g>
                  );
                }

                if (chartType === 'bar') {
                  const barWidth = (plotAreaWidth / (dataset.data?.length || 1)) * 0.6;

                  return (
                    <g key={`bars-${datasetIndex}`}>
                      {dataset.data?.map((point: ChartDataPoint, i: number) => {
                        const x = xScale(i, dataset.data?.length || 0);
                        const y = axisScale.yScale(point.value);
                        const barHeight = plotAreaBottom - y;

                        return (
                          <rect
                            key={`bar-${i}`}
                            x={x - barWidth / 2}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            fill={color}
                            rx="4"
                            onClick={() => handlers.onDataPointClick?.(point, datasetIndex, i)}
                            style={{ cursor: 'pointer' }}
                          />
                        );
                      })}
                    </g>
                  );
                }

                return null;
              })}

              {/* Legend */}
              <g transform={`translate(${plotAreaLeft}, ${plotAreaBottom + 50})`}>
                {renderedDatasets.map((dataset: MultiAxisDataset, i: number) => {
                  const color = dataset.color || colors[i];
                  const x = i * 120;

                  return (
                    <g key={`legend-${i}`} transform={`translate(${x}, 0)`}>
                      <rect x="0" y="0" width="12" height="12" fill={color} rx="2" />
                      <text x="18" y="9" fontSize="12" fill="var(--atomix-gray-8)">
                        {dataset.label} ({(dataset as MultiAxisDataset).yAxisId})
                      </text>
                    </g>
                  );
                })}
              </g>
            </g>
          );
        },
        [axisScales, yAxes]
      );

      return (
        <Chart
          ref={ref}
          type="line"
          datasets={datasets}
          config={config}
          title="Multi-Axis Chart"
          showToolbar
          {...props}
        >
          <ChartRenderer
            datasets={datasets}
            config={config}
            width={800}
            height={500}
            renderContent={renderContent}
            interactive
            enableAccessibility
          />
        </Chart>
      );
    }
  )
);

MultiAxisChart.displayName = 'MultiAxisChart';
export default MultiAxisChart;
export type { AxisConfig, MultiAxisChartProps, MultiAxisDataset };
