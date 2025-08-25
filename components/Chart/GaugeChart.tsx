import { forwardRef, memo, useCallback, useEffect, useState } from 'react';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';
import ChartTooltip from './ChartTooltip';
import { ChartProps } from './types';

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
    ({ value, min = 0, max = 100, config = {}, gaugeOptions = {}, ...props }, ref) => {
      const {
        startAngle = 225,
        endAngle = 315,
        thickness = 0.3,
        showNeedle = true,
        needleColor = 'var(--atomix-gray-8)',
        showValue = true,
        valueFormatter = v => v.toFixed(0),
        showMinMaxLabels = true,
        showTicks = true,
        majorTicks = 5,
        minorTicks = 4,
        colorZones = [
          { from: 0, to: 30, color: 'var(--atomix-success)', label: 'Good' },
          { from: 30, to: 70, color: 'var(--atomix-warning)', label: 'Warning' },
          { from: 70, to: 100, color: 'var(--atomix-error)', label: 'Critical' },
        ],
        animate = true,
        animationDuration = 1000,
        animationEasing = 'ease-out',
        useGradient = true,
        label,
        labelPosition = 'bottom',
      } = gaugeOptions;

      const [animatedValue, setAnimatedValue] = useState(animate ? min : value);
      const [hoveredElement, setHoveredElement] = useState<{
        clientX: number;
        clientY: number;
      } | null>(null);

      useEffect(() => {
        if (animate) {
          const startTime = Date.now();
          const startValue = animatedValue;
          const targetValue = Math.max(min, Math.min(max, value));
          const valueChange = targetValue - startValue;

          const animateStep = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);

            // Apply easing
            let easedProgress = progress;
            if (animationEasing === 'ease-out') {
              easedProgress = 1 - Math.pow(1 - progress, 3);
            } else if (animationEasing === 'ease-in') {
              easedProgress = Math.pow(progress, 3);
            } else if (animationEasing === 'ease-in-out') {
              easedProgress =
                progress < 0.5 ? 4 * Math.pow(progress, 3) : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            }

            const currentValue = startValue + valueChange * easedProgress;
            setAnimatedValue(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animateStep);
            }
          };

          requestAnimationFrame(animateStep);
        } else {
          setAnimatedValue(value);
        }
      }, [value, min, max, animate, animationDuration, animationEasing, animatedValue]);

      const renderContent = useCallback(
        ({ scales, colors, handlers }: { scales: any; colors: any; handlers: any }) => {
          const centerX = scales.width / 2;
          const centerY = scales.height / 2;
          const radius = Math.min(centerX, centerY) * 0.8;
          const innerRadius = radius * (1 - thickness);

          // Convert angles to radians
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const totalAngle = endRad - startRad;

          // Normalize value
          const normalizedValue = (animatedValue - min) / (max - min);
          const valueAngle = startRad + totalAngle * normalizedValue;

          const elements = [];

          // Background arc
          const backgroundPath = describeArc(
            centerX,
            centerY,
            radius,
            innerRadius,
            startAngle,
            endAngle
          );
          elements.push(
            <path key="background" d={backgroundPath} className="c-chart__gauge-background" />
          );

          // Color zones
          colorZones.forEach((zone, index) => {
            const zoneStartAngle =
              startAngle + ((zone.from - min) / (max - min)) * (endAngle - startAngle);
            const zoneEndAngle =
              startAngle + ((zone.to - min) / (max - min)) * (endAngle - startAngle);

            const zonePath = describeArc(
              centerX,
              centerY,
              radius,
              innerRadius,
              zoneStartAngle,
              zoneEndAngle
            );

            let fillColor = zone.color;
            if (useGradient) {
              const gradientId = `gauge-gradient-${index}`;
              elements.push(
                <defs key={`gradient-def-${index}`}>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={zone.color} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={zone.color} stopOpacity="1" />
                  </linearGradient>
                </defs>
              );
              fillColor = `url(#${gradientId})`;
            }

            elements.push(
              <path
                key={`zone-${index}`}
                d={zonePath}
                fill={fillColor}
                className="c-chart__gauge-zone"
              />
            );
          });

          // Ticks
          if (showTicks) {
            for (let i = 0; i <= majorTicks; i++) {
              const tickAngle = startAngle + (i / majorTicks) * (endAngle - startAngle);
              const tickRad = (tickAngle * Math.PI) / 180;

              // Major tick
              const majorTickStart = {
                x: centerX + Math.cos(tickRad) * (radius - 10),
                y: centerY + Math.sin(tickRad) * (radius - 10),
              };
              const majorTickEnd = {
                x: centerX + Math.cos(tickRad) * radius,
                y: centerY + Math.sin(tickRad) * radius,
              };

              elements.push(
                <line
                  key={`major-tick-${i}`}
                  x1={majorTickStart.x}
                  y1={majorTickStart.y}
                  x2={majorTickEnd.x}
                  y2={majorTickEnd.y}
                  className="c-chart__gauge-tick c-chart__gauge-tick--major"
                />
              );

              // Tick label
              const tickValue = min + (i / majorTicks) * (max - min);
              const labelRadius = radius + 15;
              const labelX = centerX + Math.cos(tickRad) * labelRadius;
              const labelY = centerY + Math.sin(tickRad) * labelRadius;

              elements.push(
                <text
                  key={`tick-label-${i}`}
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="c-chart__gauge-tick-label"
                >
                  {tickValue.toFixed(0)}
                </text>
              );

              // Minor ticks
              if (i < majorTicks) {
                for (let j = 1; j <= minorTicks; j++) {
                  const minorTickAngle =
                    tickAngle + (j / (minorTicks + 1)) * ((endAngle - startAngle) / majorTicks);
                  const minorTickRad = (minorTickAngle * Math.PI) / 180;

                  const minorTickStart = {
                    x: centerX + Math.cos(minorTickRad) * (radius - 5),
                    y: centerY + Math.sin(minorTickRad) * (radius - 5),
                  };
                  const minorTickEnd = {
                    x: centerX + Math.cos(minorTickRad) * radius,
                    y: centerY + Math.sin(minorTickRad) * radius,
                  };

                  elements.push(
                    <line
                      key={`minor-tick-${i}-${j}`}
                      x1={minorTickStart.x}
                      y1={minorTickStart.y}
                      x2={minorTickEnd.x}
                      y2={minorTickEnd.y}
                      className="c-chart__gauge-tick c-chart__gauge-tick--minor"
                    />
                  );
                }
              }
            }
          }

          // Min/Max labels
          if (showMinMaxLabels) {
            const minLabelRadius = radius + 30;
            const maxLabelRadius = radius + 30;

            const minLabelX = centerX + Math.cos(startRad) * minLabelRadius;
            const minLabelY = centerY + Math.sin(startRad) * minLabelRadius;
            const maxLabelX = centerX + Math.cos(endRad) * maxLabelRadius;
            const maxLabelY = centerY + Math.sin(endRad) * maxLabelRadius;

            elements.push(
              <text
                key="min-label"
                x={minLabelX}
                y={minLabelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="c-chart__gauge-min-max-label"
              >
                {min}
              </text>
            );

            elements.push(
              <text
                key="max-label"
                x={maxLabelX}
                y={maxLabelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="c-chart__gauge-min-max-label"
              >
                {max}
              </text>
            );
          }

          // Needle
          if (showNeedle) {
            const needleLength = radius * 0.8;
            const needleX = centerX + Math.cos(valueAngle) * needleLength;
            const needleY = centerY + Math.sin(valueAngle) * needleLength;

            elements.push(
              <g key="needle" className="c-chart__gauge-needle">
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={needleX}
                  y2={needleY}
                  stroke={needleColor}
                  className="c-chart__gauge-needle-line"
                />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="6"
                  fill={needleColor}
                  className="c-chart__gauge-needle-center"
                  onMouseEnter={e => {
                    const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                    const clientX = rect ? rect.left + centerX : e.clientX;
                    const clientY = rect ? rect.top + centerY : e.clientY;
                    setHoveredElement({ clientX, clientY });
                  }}
                  onMouseLeave={() => setHoveredElement(null)}
                />
              </g>
            );
          }

          // Value text
          if (showValue) {
            let valueY = centerY;
            if (labelPosition === 'top') valueY = centerY - 20;
            if (labelPosition === 'bottom') valueY = centerY + 20;

            elements.push(
              <text
                key="value-text"
                x={centerX}
                y={valueY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="c-chart__gauge-value"
              >
                {valueFormatter(animatedValue)}
              </text>
            );
          }

          // Custom label
          if (label) {
            let labelY = centerY + 40;
            if (labelPosition === 'top') labelY = centerY - 40;
            if (labelPosition === 'center') labelY = centerY + 10;

            elements.push(
              <text
                key="custom-label"
                x={centerX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="c-chart__gauge-label"
              >
                {label}
              </text>
            );
          }

          return <g>{elements}</g>;
        },
        [
          animatedValue,
          min,
          max,
          startAngle,
          endAngle,
          thickness,
          showNeedle,
          needleColor,
          showValue,
          valueFormatter,
          showMinMaxLabels,
          showTicks,
          majorTicks,
          minorTicks,
          colorZones,
          useGradient,
          label,
          labelPosition,
        ]
      );

      // Helper function to create arc path
      const describeArc = (
        x: number,
        y: number,
        radius: number,
        innerRadius: number,
        startAngle: number,
        endAngle: number
      ) => {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);
        const innerStart = polarToCartesian(x, y, innerRadius, endAngle);
        const innerEnd = polarToCartesian(x, y, innerRadius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

        return [
          'M',
          start.x,
          start.y,
          'A',
          radius,
          radius,
          0,
          largeArcFlag,
          0,
          end.x,
          end.y,
          'L',
          innerEnd.x,
          innerEnd.y,
          'A',
          innerRadius,
          innerRadius,
          0,
          largeArcFlag,
          1,
          innerStart.x,
          innerStart.y,
          'Z',
        ].join(' ');
      };

      const polarToCartesian = (
        centerX: number,
        centerY: number,
        radius: number,
        angleInDegrees: number
      ) => {
        const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
        return {
          x: centerX + radius * Math.cos(angleInRadians),
          y: centerY + radius * Math.sin(angleInRadians),
        };
      };

      // Convert gauge value to datasets format for ChartRenderer
      const datasets = [
        {
          label: 'Gauge Value',
          data: [{ label: 'Current', value: animatedValue }],
        },
      ];

      return (
        <Chart ref={ref} type="gauge" datasets={datasets} config={config} {...props}>
          <ChartRenderer datasets={datasets} config={config} renderContent={renderContent} />
          {hoveredElement && (
            <ChartTooltip
              dataPoint={{
                label: label || 'Current Value',
                value: animatedValue,
                metadata: {
                  min,
                  max,
                  percentage: (((animatedValue - min) / (max - min)) * 100).toFixed(1) + '%',
                },
              }}
              datasetLabel="Gauge"
              position={{ x: hoveredElement.clientX, y: hoveredElement.clientY }}
              visible={true}
            />
          )}
        </Chart>
      );
    }
  )
);

GaugeChart.displayName = 'GaugeChart';
export default GaugeChart;
