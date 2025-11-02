import { forwardRef, memo } from 'react';
import { ChartDataset, ChartProps } from '../../lib/types/components';
import BaseChart from './BaseChart';
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
   * X-axis ID this dataset should use
   */
  xAxisId?: string;
}

export interface MultiAxisChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Multi-axis chart datasets
   */
  datasets: MultiAxisDataset[];

  /**
   * Y-axis configurations
   */
  yAxes?: AxisConfig[];

  /**
   * X-axis configurations
   */
  xAxes?: AxisConfig[];

  /**
   * Multi-axis chart specific options
   */
  multiAxisOptions?: {
    /**
     * Whether to show legend
     */
    showLegend?: boolean;
    /**
     * Legend position
     */
    legendPosition?: 'top' | 'bottom' | 'left' | 'right';
    /**
     * Whether to synchronize axis ranges
     */
    syncAxes?: boolean;
    /**
     * Padding between axes
     */
    axisPadding?: number;
    /**
     * Whether to show tooltips
     */
    showTooltips?: boolean;
    /**
     * Tooltip position
     */
    tooltipPosition?: 'auto' | 'nearest' | 'average';
    /**
     * Interpolation method for line charts
     */
    interpolation?: 'linear' | 'step' | 'natural' | 'monotone';
    /**
     * Whether to show area under lines
     */
    showArea?: boolean;
    /**
     * Area opacity (0-1)
     */
    areaOpacity?: number;
    /**
     * Whether to show data points
     */
    showDataPoints?: boolean;
    /**
     * Data point radius
     */
    pointRadius?: number;
    /**
     * Whether to connect points across null values
     */
    spanGaps?: boolean;
  };
}

const MultiAxisChart = memo(
  forwardRef<HTMLDivElement, MultiAxisChartProps>(
    (
      {
        datasets = [],
        config = {},
        yAxes = [],
        xAxes = [],
        multiAxisOptions = {},
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      const {
        showLegend = true,
        legendPosition = 'top',
        syncAxes = false,
        axisPadding = 20,
        showTooltips = true,
        tooltipPosition = 'nearest',
        interpolation = 'linear',
        showArea = false,
        areaOpacity = 0.3,
        showDataPoints = true,
        pointRadius = 4,
        spanGaps = false,
      } = multiAxisOptions;

      const renderContent = ({
        scales,
        colors,
        datasets: renderedDatasets,
        handlers,
        hoveredPoint,
      }: {
        scales: any;
        colors: string[];
        datasets: any[];
        handlers: any;
        hoveredPoint: {
          datasetIndex: number;
          pointIndex: number;
          x: number;
          y: number;
          clientX: number;
          clientY: number;
        } | null;
      }) => {
        if (!datasets.length) return null;

        const padding = 60;
        const chartWidth = scales.width - padding * 2;
        const chartHeight = scales.height - padding * 2;

        // Create axis configurations
        const yAxisConfigs: AxisConfig[] = yAxes.length
          ? yAxes
          : [
              {
                id: 'y-axis-1',
                position: 'left',
                label: 'Y Axis',
              },
            ];

        const xAxisConfigs: AxisConfig[] = xAxes.length
          ? xAxes
          : [
              {
                id: 'x-axis-1',
                position: 'bottom',
                label: 'X Axis',
              },
            ];

        // Group datasets by axis
        const datasetsByYAxis: Record<string, any[]> = {};
        datasets.forEach((dataset, index) => {
          const axisId = dataset.yAxisId || yAxisConfigs[0]?.id || 'y-axis-1';
          if (!datasetsByYAxis[axisId]) {
            datasetsByYAxis[axisId] = [];
          }
          datasetsByYAxis[axisId].push({ ...dataset, index });
        });

        // Calculate scales for each axis
        const axisScales: Record<string, { min: number; max: number; scale: number }> = {};
        Object.entries(datasetsByYAxis).forEach(([axisId, axisDatasets]) => {
          const allValues = axisDatasets.flatMap(dataset =>
            dataset.data.map((d: any) => d.value)
          );
          const min = Math.min(...allValues);
          const max = Math.max(...allValues);
          const range = max - min || 1; // Avoid division by zero
          axisScales[axisId] = {
            min,
            max,
            scale: chartHeight / range,
          };
        });

        // Generate chart elements
        const elements: React.ReactNode[] = [];

        // Draw grid lines
        for (let i = 0; i <= 5; i++) {
          const y = padding + (i / 5) * chartHeight;
          elements.push(
            <line
              key={`grid-${i}`}
              x1={padding}
              y1={y}
              x2={padding + chartWidth}
              y2={y}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          );
        }

        // Draw datasets
        datasets.forEach((dataset, datasetIndex) => {
          const axisId = dataset.yAxisId || yAxisConfigs[0]?.id || 'y-axis-1';
          const axisScale = axisScales[axisId];
          const color = dataset.color || colors[datasetIndex % colors.length];

          // Generate points
          const points = dataset.data.map((point: any, pointIndex: number) => ({
            x: padding + (pointIndex / (dataset.data.length - 1)) * chartWidth,
            y: axisScale ? padding + chartHeight - (point.value - axisScale.min) * axisScale.scale : 0,
          }));

          // Generate line path
          let linePath = '';
          if (points.length > 0) {
            linePath = `M ${points.map((p: any) => `${p.x},${p.y}`).join(' L ')}`;
          }

          // Draw area under line
          if (showArea && linePath) {
            const areaPath = `${linePath} L ${padding + chartWidth},${padding + chartHeight} L ${padding},${padding + chartHeight} Z`;
            elements.push(
              <path
                key={`area-${datasetIndex}`}
                d={areaPath}
                fill={color}
                fillOpacity={areaOpacity}
              />
            );
          }

          // Draw line
          elements.push(
            <path
              key={`line-${datasetIndex}`}
              d={linePath}
              stroke={color}
              fill="none"
              strokeWidth="2"
            />
          );

          // Draw data points
          if (showDataPoints) {
            points.forEach((point: any, pointIndex: number) => {
              const dataPoint = dataset.data[pointIndex];
              if (dataPoint) {
                elements.push(
                  <circle
                    key={`point-${datasetIndex}-${pointIndex}`}
                    cx={point.x}
                    cy={point.y}
                    r={pointRadius}
                    fill={color}
                    onClick={() => handlers.onDataPointClick?.(dataPoint, datasetIndex, pointIndex)}
                  />
                );
              }
            });
          }
        });

        // Draw axes
        yAxisConfigs.forEach(axis => {
          elements.push(
            <line
              key={`y-axis-${axis.id}`}
              x1={padding}
              y1={padding}
              x2={padding}
              y2={padding + chartHeight}
              stroke={axis.color || '#000'}
              strokeWidth="2"
            />
          );
        });

        xAxisConfigs.forEach(axis => {
          elements.push(
            <line
              key={`x-axis-${axis.id}`}
              x1={padding}
              y1={padding + chartHeight}
              x2={padding + chartWidth}
              y2={padding + chartHeight}
              stroke={axis.color || '#000'}
              strokeWidth="2"
            />
          );
        });

        // Draw legend
        if (showLegend) {
          const legendY = legendPosition === 'top' ? 20 : scales.height - 30;
          datasets.forEach((dataset, index) => {
            const color = dataset.color || colors[index % colors.length];
            const legendX = padding + (index * chartWidth) / datasets.length;
            
            elements.push(
              <g key={`legend-${index}`}>
                <rect
                  x={legendX}
                  y={legendY}
                  width="12"
                  height="12"
                  fill={color}
                />
                <text
                  x={legendX + 16}
                  y={legendY + 10}
                  fontSize="12"
                  fill="#000"
                >
                  {dataset.label}
                </text>
              </g>
            );
          });
        }

        return <g>{elements}</g>;
      };

      return (
        <BaseChart
          ref={ref}
          type="line"
          datasets={datasets}
          config={config}
          renderContent={renderContent}
          onDataPointClick={onDataPointClick}
          {...props}
        />
      );
    }
  )
);

MultiAxisChart.displayName = 'MultiAxisChart';
export default MultiAxisChart;