import { forwardRef, memo } from 'react';
import BaseChart from './BaseChart';
import { ChartProps, ChartRenderContentParams } from './types';

export interface GaugeChartProps extends Omit<ChartProps, 'type' | 'datasets'> {
  /**
   * Current value to display
   */
  value: number;

  /**
   * Minimum value
   */
  min?: number;

  /**
   * Maximum value
   */
  max?: number;

  /**
   * Gauge chart specific options
   */
  gaugeOptions?: {
    /**
     * Start angle in degrees (0 = right, 90 = bottom, 180 = left, 270 = top)
     */
    startAngle?: number;
    /**
     * End angle in degrees
     */
    endAngle?: number;
    /**
     * Gauge thickness (0-1, where 1 is full radius)
     */
    thickness?: number;
    /**
     * Whether to show the needle
     */
    showNeedle?: boolean;
    /**
     * Needle color
     */
    needleColor?: string;
    /**
     * Whether to show value text in center
     */
    showValue?: boolean;
    /**
     * Value text format function
     */
    valueFormatter?: (value: number) => string;
    /**
     * Whether to show min/max labels
     */
    showMinMaxLabels?: boolean;
    /**
     * Whether to show tick marks
     */
    showTicks?: boolean;
    /**
     * Number of major ticks
     */
    majorTicks?: number;
    /**
     * Number of minor ticks between major ticks
     */
    minorTicks?: number;
    /**
     * Color zones for different value ranges
     */
    colorZones?: Array<{
      from: number;
      to: number;
      color: string;
      label?: string;
    }>;
    /**
     * Whether to animate value changes
     */
    animate?: boolean;
    /**
     * Animation duration in milliseconds
     */
    animationDuration?: number;
    /**
     * Animation easing function
     */
    animationEasing?: string;
    /**
     * Whether to show a gradient effect
     */
    useGradient?: boolean;
    /**
     * Custom label
     */
    label?: string;
    /**
     * Label position
     */
    labelPosition?: 'top' | 'bottom' | 'center';
  };
}

const GaugeChart = memo(
  forwardRef<HTMLDivElement, GaugeChartProps>(
    (
      { value, min = 0, max = 100, config = {}, gaugeOptions = {}, onDataPointClick, ...props },
      ref
    ) => {
      const {
        startAngle = 180, // Default to left side (180 degrees)
        endAngle = 0, // Default to right side (0 degrees)
        thickness = 0.2,
        showNeedle = true,
        needleColor = 'var(--atomix-brand-text-emphasis)',
        showValue = true,
        valueFormatter = (val: number) => val.toFixed(1),
        showMinMaxLabels = true,
        showTicks = true,
        majorTicks = 5,
        minorTicks = 4,
        colorZones = [],
        animate = true,
        animationDuration = 1000,
        animationEasing = 'easeOutCubic',
        useGradient = false,
        label = '',
        labelPosition = 'bottom',
      } = gaugeOptions;

      const renderContent = ({
        scales,
        colors,
        datasets: renderedDatasets,
        handlers,
        hoveredPoint,
        toolbarState,
        config: renderConfig,
      }: ChartRenderContentParams) => {
        const width = scales.width;

        // Use toolbar state if available, fallback to config for backward compatibility
        const shouldAnimate = toolbarState?.animationsEnabled ?? renderConfig?.animate ?? animate;
        const height = scales.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = (Math.min(width, height) / 2) * 0.9;

        // Calculate angles in radians
        // In SVG, y-axis points down, so we need to adjust our angles accordingly
        // We negate the angles to account for the SVG coordinate system
        const startAngleRad = (-startAngle * Math.PI) / 180;
        const endAngleRad = (-endAngle * Math.PI) / 180;
        const angleRange = endAngleRad - startAngleRad;

        // Clamp value to min/max range
        const clampedValue = Math.min(Math.max(value, min), max);
        const normalizedValue = (clampedValue - min) / (max - min);
        const valueAngle = startAngleRad + normalizedValue * angleRange;

        // Create SVG path for the track
        const createArcPath = (
          centerX: number,
          centerY: number,
          radius: number,
          startAngle: number,
          endAngle: number,
          thickness: number
        ) => {
          const innerRadius = radius * (1 - thickness);
          const x1 = centerX + radius * Math.cos(startAngle);
          const y1 = centerY + radius * Math.sin(startAngle);
          const x2 = centerX + radius * Math.cos(endAngle);
          const y2 = centerY + radius * Math.sin(endAngle);
          const x3 = centerX + innerRadius * Math.cos(endAngle);
          const y3 = centerY + innerRadius * Math.sin(endAngle);
          const x4 = centerX + innerRadius * Math.cos(startAngle);
          const y4 = centerY + innerRadius * Math.sin(startAngle);

          // Determine large arc flag based on angle difference
          const angleDiff = Math.abs(endAngle - startAngle);
          const largeArcFlag = angleDiff > Math.PI ? 1 : 0;
          // Sweep flag (1 for positive angle direction)
          const sweepFlag = endAngle > startAngle ? 1 : 0;

          return `M ${x1} ${y1} 
                  A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}
                  L ${x3} ${y3}
                  A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} ${1 - sweepFlag} ${x4} ${y4}
                  Z`;
        };

        // Create color zones
        const zones = [];
        for (const zone of colorZones) {
          const zoneStart = startAngleRad + ((zone.from - min) / (max - min)) * angleRange;
          const zoneEnd = startAngleRad + ((zone.to - min) / (max - min)) * angleRange;

          zones.push(
            <path
              key={`zone-${zone.from}-${zone.to}`}
              d={createArcPath(centerX, centerY, radius, zoneStart, zoneEnd, thickness)}
              fill={zone.color}
            />
          );
        }

        // Create ticks
        const ticks = [];
        if (showTicks) {
          // Major ticks
          for (let i = 0; i <= majorTicks; i++) {
            const tickValue = min + (max - min) * (i / majorTicks);
            const tickAngle = startAngleRad + (i / majorTicks) * angleRange;
            const tickRadius = radius * 0.95;
            const tickLength = radius * 0.05;
            const x1 = centerX + tickRadius * Math.cos(tickAngle);
            const y1 = centerY + tickRadius * Math.sin(tickAngle);
            const x2 = centerX + (tickRadius - tickLength) * Math.cos(tickAngle);
            const y2 = centerY + (tickRadius - tickLength) * Math.sin(tickAngle);

            ticks.push(
              <line
                key={`major-tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--atomix-brand-border-subtle)"
                strokeWidth="2"
              />
            );

            // Labels for major ticks
            if (showMinMaxLabels) {
              const labelX = centerX + (tickRadius - tickLength - 10) * Math.cos(tickAngle);
              const labelY = centerY + (tickRadius - tickLength - 10) * Math.sin(tickAngle);

              ticks.push(
                <text
                  key={`label-${i}`}
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill="var(--atomix-brand-text-emphasis)"
                >
                  {tickValue}
                </text>
              );
            }
          }

          // Minor ticks
          for (let i = 0; i < majorTicks * minorTicks; i++) {
            const tickAngle = startAngleRad + (i / (majorTicks * minorTicks)) * angleRange;
            const tickRadius = radius * 0.95;
            const tickLength = radius * 0.025;
            const x1 = centerX + tickRadius * Math.cos(tickAngle);
            const y1 = centerY + tickRadius * Math.sin(tickAngle);
            const x2 = centerX + (tickRadius - tickLength) * Math.cos(tickAngle);
            const y2 = centerY + (tickRadius - tickLength) * Math.sin(tickAngle);

            ticks.push(
              <line
                key={`minor-tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--atomix-brand-border-subtle)"
                strokeWidth="1"
              />
            );
          }
        }

        // Create needle
        const needle = showNeedle ? (
          <g>
            <line
              x1={centerX}
              y1={centerY}
              x2={centerX + radius * 0.8 * Math.cos(valueAngle)}
              y2={centerY + radius * 0.8 * Math.sin(valueAngle)}
              stroke={needleColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx={centerX} cy={centerY} r="8" fill={needleColor} />
          </g>
        ) : null;

        // Value text
        const valueText = showValue ? (
          <text
            x={centerX}
            y={centerY + 10}
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill="var(--atomix-primary-text-emphasis)"
          >
            {valueFormatter(clampedValue)}
          </text>
        ) : null;

        // Label
        const labelText = label ? (
          <text
            x={centerX}
            y={labelPosition === 'top' ? centerY - radius * 0.7 : centerY + radius * 0.7}
            textAnchor="middle"
            fontSize="16"
            fill="var(--atomix-brand-text-emphasis)"
          >
            {label}
          </text>
        ) : null;

        return (
          <g>
            {/* Background track */}
            <path
              d={createArcPath(centerX, centerY, radius, startAngleRad, endAngleRad, thickness)}
              fill="var(--atomix-secondary-bg-subtle)"
            />

            {/* Color zones */}
            {zones}

            {/* Value track */}
            <path
              d={createArcPath(centerX, centerY, radius, startAngleRad, valueAngle, thickness)}
              fill="var(--atomix-brand-bg-subtle)"
              style={{
                transition: shouldAnimate ? `all ${animationDuration}ms ${animationEasing}` : 'none',
              }}
            />

            {/* Ticks */}
            {ticks}

            {/* Needle */}
            {needle}

            {/* Value text */}
            {valueText}

            {/* Label */}
            {labelText}
          </g>
        );
      };

      // Convert value to datasets format for BaseChart
      const datasets = [
        {
          label: 'Gauge Value',
          data: [{ label: 'Value', value }],
        },
      ];

      return (
        <BaseChart
          ref={ref}
          type="gauge"
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

GaugeChart.displayName = 'GaugeChart';
export default GaugeChart;
