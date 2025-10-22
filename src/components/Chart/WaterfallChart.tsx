import { forwardRef, memo } from 'react';
import BaseChart from './BaseChart';
import { ChartProps } from '../../lib/types/components';

export interface WaterfallDataPoint {
  label: string;
  value: number;
  type?: 'positive' | 'negative' | 'total' | 'subtotal';
  color?: string;
  isConnector?: boolean;
}

export interface WaterfallChartProps extends Omit<ChartProps, 'type' | 'datasets'> {
  /**
   * Waterfall chart data
   */
  waterfallData: WaterfallDataPoint[];

  /**
   * Waterfall chart specific options
   */
  waterfallOptions?: {
    /**
     * Whether to show connecting lines
     */
    showConnectors?: boolean;
    /**
     * Connector line color
     */
    connectorColor?: string;
    /**
     * Connector line style
     */
    connectorStyle?: 'solid' | 'dashed' | 'dotted';
    /**
     * Whether to show values on bars
     */
    showValues?: boolean;
    /**
     * Value position on bars
     */
    valuePosition?: 'top' | 'center' | 'bottom';
    /**
     * Colors for different bar types
     */
    colors?: {
      positive?: string;
      negative?: string;
      total?: string;
      subtotal?: string;
    };
    /**
     * Bar width ratio (0-1)
     */
    barWidth?: number;
    /**
     * Whether to show cumulative line
     */
    showCumulativeLine?: boolean;
    /**
     * Cumulative line color
     */
    cumulativeLineColor?: string;
    /**
     * Whether to animate bars
     */
    animate?: boolean;
    /**
     * Animation duration in milliseconds
     */
    animationDuration?: number;
    /**
     * Animation delay between bars
     */
    animationDelay?: number;
    /**
     * Value formatter function
     */
    valueFormatter?: (value: number) => string;
    /**
     * Whether to show baseline at zero
     */
    showBaseline?: boolean;
    /**
     * Baseline color
     */
    baselineColor?: string;
  };
}

const WaterfallChart = memo(
  forwardRef<HTMLDivElement, WaterfallChartProps>(
    (
      { waterfallData = [], config = {}, waterfallOptions = {}, onDataPointClick, ...props },
      ref
    ) => {
      const {
        showConnectors = true,
        connectorColor = '#f9fafb',
        connectorStyle = 'dashed',
        showValues = true,
        valuePosition = 'top',
        colors: waterfallColors = {
          positive: 'var(--atomix-success)',
          negative: 'var(--atomix-error)',
          total: 'var(--atomix-primary)',
          subtotal: 'var(--atomix-secondary)',
        },
        barWidth = 0.6,
        showCumulativeLine = false,
        cumulativeLineColor = '#3b82f6',
        animate = true,
        animationDuration = 1000,
        animationDelay = 100,
        valueFormatter = value => value.toLocaleString(),
        showBaseline = true,
        baselineColor = '#f3f4f6',
      } = waterfallOptions;

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
          if (!waterfallData.length) return null;

          const padding = 60;
          const chartWidth = scales.width - padding * 2;
          const chartHeight = scales.height - padding * 2;

          // Calculate cumulative values and positions
          let cumulativeValue = 0;
          const processedData = waterfallData.map((item, index) => {
            const startValue =
              item.type === 'total' || item.type === 'subtotal' ? 0 : cumulativeValue;

            let endValue: number;
            if (item.type === 'total' || item.type === 'subtotal') {
              endValue = item.value;
              cumulativeValue = item.value;
            } else {
              endValue = cumulativeValue + item.value;
              cumulativeValue = endValue;
            }

            return {
              ...item,
              startValue,
              endValue,
              cumulativeValue,
              index,
            };
          });

          // Calculate scales
          const allValues = processedData.flatMap(d => [d.startValue, d.endValue]);
          const minValue = Math.min(0, ...allValues);
          const maxValue = Math.max(...allValues);
          const valueRange = maxValue - minValue;

          const barWidthPx = (chartWidth / waterfallData.length) * barWidth;
          const barSpacing = chartWidth / waterfallData.length;

          const xScale = (index: number) => padding + index * barSpacing + barSpacing / 2;
          const yScale = (value: number) =>
            padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;

          const elements = [];

          // Baseline
          if (showBaseline) {
            const baselineY = yScale(0);
            elements.push(
              <line
                key="baseline"
                x1={padding}
                y1={baselineY}
                x2={scales.width - padding}
                y2={baselineY}
                stroke={baselineColor}
                strokeWidth="2"
                opacity="0.7"
              />
            );
          }

          // Bars
          processedData.forEach((item, index) => {
            const x = xScale(index);
            const barTop = Math.min(yScale(item.startValue), yScale(item.endValue));
            const barBottom = Math.max(yScale(item.startValue), yScale(item.endValue));
            const barHeight = barBottom - barTop;

            // Determine bar color
            let barColor = item.color;
            if (!barColor) {
              if (item.type === 'total') barColor = waterfallColors.total;
              else if (item.type === 'subtotal') barColor = waterfallColors.subtotal;
              else if (item.value >= 0) barColor = waterfallColors.positive;
              else barColor = waterfallColors.negative;
            }

            // Bar rectangle
            elements.push(
              <rect
                key={`bar-${index}`}
                x={x - barWidthPx / 2}
                y={barTop}
                width={barWidthPx}
                height={Math.max(barHeight, 2)}
                fill={barColor}
                rx="4"
                className={`c-chart__waterfall-bar ${animate ? 'c-chart__waterfall-bar--animated' : ''}`}
                style={{
                  animationDelay: animate ? `${index * animationDelay}ms` : '0ms',
                }}
                onClick={() => handlers.onDataPointClick?.(item as any, 0, index)}
              />
            );

            // Value labels
            if (showValues) {
              let labelY = barTop;
              let labelValue = item.value;

              if (valuePosition === 'center') {
                labelY = barTop + barHeight / 2;
              } else if (valuePosition === 'bottom') {
                labelY = barBottom + 15;
              } else {
                labelY = barTop - 5;
              }

              // For total/subtotal bars, show the cumulative value
              if (item.type === 'total' || item.type === 'subtotal') {
                labelValue = item.endValue;
              }

              elements.push(
                <text
                  key={`value-${index}`}
                  x={x}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline={valuePosition === 'center' ? 'middle' : 'auto'}
                  className={`c-chart__waterfall-value ${valuePosition === 'center' ? 'c-chart__waterfall-value--center' : 'c-chart__waterfall-value--outside'}`}
                >
                  {valueFormatter(labelValue)}
                </text>
              );
            }

            // Connectors
            if (showConnectors && index < processedData.length - 1) {
              const nextItem = processedData[index + 1];
              if (nextItem) {
                const currentEndY = yScale(item.endValue);
                const nextStartY = yScale(nextItem.startValue);
                const nextX = xScale(index + 1);

                // Only show connector if there's a gap to bridge
                if (Math.abs(item.endValue - nextItem.startValue) > 0.01) {
                  const strokeDasharray =
                    connectorStyle === 'dashed'
                      ? '5,5'
                      : connectorStyle === 'dotted'
                        ? '2,2'
                        : 'none';

                  elements.push(
                    <line
                      key={`connector-${index}`}
                      x1={x + barWidthPx / 2}
                      y1={currentEndY}
                      x2={nextX - barWidthPx / 2}
                      y2={nextStartY}
                      stroke={connectorColor}
                      strokeDasharray={strokeDasharray}
                      className="c-chart__waterfall-connector"
                    />
                  );
                }
              }
            }
          });

          // Cumulative line
          if (showCumulativeLine) {
            const linePoints = processedData.map((item, index) => ({
              x: xScale(index),
              y: yScale(item.cumulativeValue),
            }));

            const linePath = `M ${linePoints.map(p => `${p.x},${p.y}`).join(' L ')}`;

            elements.push(
              <path
                key="cumulative-line"
                d={linePath}
                fill="none"
                stroke={cumulativeLineColor}
                className="c-chart__waterfall-cumulative-line"
              />
            );

            // Line points
            linePoints.forEach((point, index) => {
              elements.push(
                <circle
                  key={`line-point-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={cumulativeLineColor}
                  className="c-chart__waterfall-cumulative-point"
                />
              );
            });
          }

          // X-axis
          elements.push(
            <line
              key="x-axis"
              x1={padding}
              y1={scales.height - padding}
              x2={scales.width - padding}
              y2={scales.height - padding}
              stroke="var(--atomix-gray-4)"
              strokeWidth="2"
            />
          );

          // Y-axis
          elements.push(
            <line
              key="y-axis"
              x1={padding}
              y1={padding}
              x2={padding}
              y2={scales.height - padding}
              stroke="var(--atomix-gray-4)"
              strokeWidth="2"
            />
          );

          // X-axis labels
          processedData.forEach((item, index) => {
            const x = padding + index * barSpacing + barSpacing / 2;
            elements.push(
              <text
                key={`x-label-${index}`}
                x={x}
                y={scales.height - padding + 20}
                textAnchor="middle"
                fontSize="11"
                fill="var(--atomix-gray-6)"
                transform={`rotate(-45, ${x}, ${scales.height - padding + 20})`}
              >
                {item.label}
              </text>
            );
          });

          return <g>{elements}</g>;
        };

      // Convert waterfallData to datasets format for BaseChart
      const datasets = [
        {
          label: 'Waterfall Data',
          data: waterfallData,
        },
      ];

      return (
        <BaseChart
          ref={ref}
          type="waterfall"
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

WaterfallChart.displayName = 'WaterfallChart';
export default WaterfallChart;
export type { WaterfallChartProps, WaterfallDataPoint };
