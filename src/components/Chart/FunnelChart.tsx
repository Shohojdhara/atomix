import { forwardRef, memo } from 'react';
import BaseChart from './BaseChart';
import ChartTooltip from './ChartTooltip';
import { ChartProps, ChartRenderContentParams } from './types';

export interface FunnelDataPoint {
  label: string;
  value: number;
  color?: string;
  percentage?: number;
  metadata?: Record<string, any>;
}

export interface FunnelChartProps extends Omit<ChartProps, 'type' | 'datasets'> {
  /**
   * Funnel chart data
   */
  funnelData: FunnelDataPoint[];

  /**
   * Funnel chart specific options
   */
  funnelOptions?: {
    /**
     * Funnel direction
     */
    direction?: 'vertical' | 'horizontal';
    /**
     * Whether to show labels
     */
    showLabels?: boolean;
    /**
     * Whether to show values
     */
    showValues?: boolean;
    /**
     * Whether to show percentages
     */
    showPercentages?: boolean;
    /**
     * Label position
     */
    labelPosition?: 'inside' | 'outside' | 'center';
    /**
     * Funnel neck width ratio (0-1)
     */
    neckWidth?: number;
    /**
     * Funnel neck height ratio (0-1)
     */
    neckHeight?: number;
    /**
     * Gap between segments
     */
    segmentGap?: number;
    /**
     * Color scheme
     */
    colorScheme?: string[];
    /**
     * Whether to use gradient
     */
    useGradient?: boolean;
    /**
     * Whether to animate
     */
    animate?: boolean;
    /**
     * Animation duration in milliseconds
     */
    animationDuration?: number;
    /**
     * Animation delay between segments
     */
    animationDelay?: number;
    /**
     * Value formatter function
     */
    valueFormatter?: (value: number) => string;
    /**
     * Whether to show conversion rates
     */
    showConversionRates?: boolean;
    /**
     * Conversion rate position
     */
    conversionRatePosition?: 'between' | 'onSegment';
    /**
     * Whether to use proportional segments
     */
    proportional?: boolean;
    /**
     * Minimum segment ratio (0-1)
     */
    minSegmentRatio?: number;
  };
}

const FunnelChart = memo(
  forwardRef<HTMLDivElement, FunnelChartProps>(
    ({ funnelData = [], config = {}, funnelOptions = {}, onDataPointClick, ...props }, ref) => {
      const {
        direction = 'vertical',
        showLabels = true,
        showValues = true,
        showPercentages = false,
        labelPosition = 'outside',
        neckWidth = 0.3,
        neckHeight = 0.2,
        segmentGap = 2,
        colorScheme = [
          'var(--atomix-primary)',
          'var(--atomix-secondary)',
          'var(--atomix-success)',
          'var(--atomix-warning)',
          'var(--atomix-error)',
          'var(--atomix-info)',
        ],
        useGradient = true,
        animate = true,
        animationDuration = 1000,
        animationDelay = 200,
        valueFormatter = value => value.toLocaleString(),
        showConversionRates = true,
        conversionRatePosition = 'between',
        proportional = true,
        minSegmentRatio = 0.1,
      } = funnelOptions;

      const renderContent = ({
        scales,
        colors,
        datasets: renderedDatasets,
        handlers,
        hoveredPoint,
        toolbarState,
        config: renderConfig,
      }: ChartRenderContentParams) => {
        if (!funnelData.length) return null;

        // Use toolbar state if available, fallback to config for backward compatibility
        const showTooltips = toolbarState?.showTooltips ?? renderConfig?.showTooltips ?? true;
        const shouldAnimate = toolbarState?.animationsEnabled ?? renderConfig?.animate ?? animate;

        const padding = 60;
        const chartWidth = scales.width - padding * 2;
        const chartHeight = scales.height - padding * 2;

        // Calculate percentages and conversion rates
        const maxValue = Math.max(...funnelData.map(d => d.value));
        const processedData = funnelData.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          const conversionRate =
            index > 0 && funnelData[index - 1]
              ? (item.value / funnelData[index - 1]!.value) * 100
              : 100;

          return {
            ...item,
            percentage,
            conversionRate,
            index,
          };
        });

        const elements: React.ReactNode[] = [];

        if (direction === 'vertical') {
          // Vertical funnel
          const segmentHeight =
            (chartHeight - (funnelData.length - 1) * segmentGap) / funnelData.length;

          processedData.forEach((item, index) => {
            const y = padding + index * (segmentHeight + segmentGap);

            // Calculate segment width based on value
            let segmentWidth: number;
            if (proportional) {
              const ratio = Math.max(item.percentage / 100, minSegmentRatio);
              segmentWidth = chartWidth * ratio;
            } else {
              // Linear decrease
              const ratio = Math.max(
                1 - (index / (funnelData.length - 1)) * (1 - neckWidth),
                minSegmentRatio
              );
              segmentWidth = chartWidth * ratio;
            }

            const x = padding + (chartWidth - segmentWidth) / 2;

            // Determine color
            let segmentColor = item.color || colorScheme[index % colorScheme.length];

            // Create trapezoid path
            const nextItem = processedData[index + 1];
            let nextWidth: number;
            if (nextItem) {
              if (proportional) {
                const nextRatio = Math.max(nextItem.percentage / 100, minSegmentRatio);
                nextWidth = chartWidth * nextRatio;
              } else {
                const nextRatio = Math.max(
                  1 - ((index + 1) / (funnelData.length - 1)) * (1 - neckWidth),
                  minSegmentRatio
                );
                nextWidth = chartWidth * nextRatio;
              }
            } else {
              nextWidth = segmentWidth * neckWidth;
            }

            const nextX = padding + (chartWidth - nextWidth) / 2;
            const nextY = y + segmentHeight;

            // Create trapezoid shape
            const path = `
              M ${x} ${y}
              L ${x + segmentWidth} ${y}
              L ${nextX + nextWidth} ${nextY}
              L ${nextX} ${nextY}
              Z
            `;

            elements.push(
              <g key={`segment-${index}`}>
                <path
                  d={path}
                  fill={segmentColor}
                  className="c-chart__funnel-segment"
                  style={{
                    transition: animate
                      ? `all ${animationDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1) ${index * animationDelay}ms`
                      : 'none',
                  }}
                  onClick={() => handlers.onDataPointClick?.(item, 0, index)}
                />
                {(showLabels || showValues || showPercentages) && (
                  <text
                    x={x + segmentWidth / 2}
                    y={y + segmentHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="c-chart__funnel-label"
                  >
                    {showLabels && item.label}
                    {showValues && (
                      <tspan x={x + segmentWidth / 2} dy="1.2em">
                        {valueFormatter(item.value)}
                      </tspan>
                    )}
                    {showPercentages && (
                      <tspan x={x + segmentWidth / 2} dy="1.2em">
                        {item.percentage.toFixed(1)}%
                      </tspan>
                    )}
                  </text>
                )}
              </g>
            );

            // Add conversion rate labels
            if (showConversionRates && nextItem && conversionRatePosition === 'between') {
              elements.push(
                <text
                  key={`conversion-${index}`}
                  x={x + segmentWidth / 2}
                  y={y + segmentHeight + segmentGap / 2}
                  textAnchor="middle"
                  className="c-chart__funnel-conversion"
                >
                  ↓ {item.conversionRate.toFixed(1)}%
                </text>
              );
            }
          });
        }

        return (
          <>
            <g>{elements}</g>
            {showTooltips && hoveredPoint && funnelData[hoveredPoint.pointIndex] && (
              <ChartTooltip
                dataPoint={funnelData[hoveredPoint.pointIndex]!}
                datasetLabel="Funnel Data"
                datasetColor={funnelData[hoveredPoint.pointIndex]?.color || colors[hoveredPoint.pointIndex % colors.length]}
                position={{
                  x: hoveredPoint.clientX,
                  y: hoveredPoint.clientY,
                }}
                visible={true}
              />
            )}
          </>
        );
      };

      // Convert funnelData to datasets format for BaseChart
      const datasets = [
        {
          label: 'Funnel Data',
          data: funnelData,
        },
      ];

      return (
        <BaseChart
          ref={ref}
          type="funnel"
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

FunnelChart.displayName = 'FunnelChart';
export default FunnelChart;
