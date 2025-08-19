import { forwardRef, memo, useCallback, useState } from 'react';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';
import ChartTooltip from './ChartTooltip';
import { ChartProps } from './types';

export interface BubbleDataPoint {
  label: string;
  x: number;
  y: number;
  size: number;
  value?: number;
  color?: string;
  metadata?: Record<string, any>;
}

export interface BubbleChartProps extends Omit<ChartProps, 'type' | 'datasets'> {
  /**
   * Bubble chart data
   */
  bubbleData: BubbleDataPoint[];

  /**
   * Bubble chart specific options
   */
  bubbleOptions?: {
    /**
     * Minimum bubble size
     */
    minBubbleSize?: number;
    /**
     * Maximum bubble size
     */
    maxBubbleSize?: number;
    /**
     * Bubble opacity
     */
    bubbleOpacity?: number;
    /**
     * Whether to show bubble labels
     */
    showLabels?: boolean;
    /**
     * Label position relative to bubble
     */
    labelPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
    /**
     * Whether to enable bubble animations
     */
    enableAnimations?: boolean;
    /**
     * Animation duration in milliseconds
     */
    animationDuration?: number;
    /**
     * Whether to show size legend
     */
    showSizeLegend?: boolean;
    /**
     * Size legend title
     */
    sizeLegendTitle?: string;
    /**
     * Color scheme for bubbles
     */
    colorScheme?: string[];
    /**
     * Whether to use size-based coloring
     */
    sizeBasedColoring?: boolean;
  };
}

const BubbleChart = memo(
  forwardRef<HTMLDivElement, BubbleChartProps>(
    ({ bubbleData = [], config = {}, bubbleOptions = {}, onDataPointClick, ...props }, ref) => {
      const {
        minBubbleSize = 5,
        maxBubbleSize = 50,
        bubbleOpacity = 0.7,
        showLabels = true,
        labelPosition = 'center',
        enableAnimations = true,
        animationDuration = 1000,
        showSizeLegend = true,
        sizeLegendTitle = 'Size',
        colorScheme = [
          'var(--atomix-primary)',
          'var(--atomix-secondary)',
          'var(--atomix-success)',
          'var(--atomix-warning)',
          'var(--atomix-error)',
          'var(--atomix-info)',
        ],
        sizeBasedColoring = false,
      } = bubbleOptions;

      const [hoveredBubble, setHoveredBubble] = useState<{
        index: number;
        clientX: number;
        clientY: number;
      } | null>(null);

      const renderContent = useCallback(
        ({ scales, colors, handlers }: { scales: any; colors: any; handlers: any }) => {
          if (!bubbleData.length) return null;

          // Calculate scales
          const xValues = bubbleData.map(d => d.x);
          const yValues = bubbleData.map(d => d.y);
          const sizeValues = bubbleData.map(d => d.size);

          const xMin = Math.min(...xValues);
          const xMax = Math.max(...xValues);
          const yMin = Math.min(...yValues);
          const yMax = Math.max(...yValues);
          const sizeMin = Math.min(...sizeValues);
          const sizeMax = Math.max(...sizeValues);

          const padding = 60;
          const chartWidth = scales.width - padding * 2;
          const chartHeight = scales.height - padding * 2;

          const xScale = (value: number) => padding + ((value - xMin) / (xMax - xMin)) * chartWidth;
          const yScale = (value: number) =>
            padding + chartHeight - ((value - yMin) / (yMax - yMin)) * chartHeight;
          const sizeScale = (value: number) =>
            minBubbleSize +
            ((value - sizeMin) / (sizeMax - sizeMin)) * (maxBubbleSize - minBubbleSize);

          // Generate bubbles
          const bubbleElements = bubbleData.map((bubble, index) => {
            const x = xScale(bubble.x);
            const y = yScale(bubble.y);
            const radius = sizeScale(bubble.size);

            let bubbleColor = bubble.color;
            if (!bubbleColor) {
              if (sizeBasedColoring) {
                const colorIndex = Math.floor(
                  ((bubble.size - sizeMin) / (sizeMax - sizeMin)) * (colorScheme.length - 1)
                );
                bubbleColor = colorScheme[colorIndex];
              } else {
                bubbleColor = colorScheme[index % colorScheme.length];
              }
            }

            const elements = [];

            // Bubble circle
            elements.push(
              <circle
                key={`bubble-${index}`}
                cx={x}
                cy={y}
                r={radius}
                fill={bubbleColor}
                className={`c-chart__bubble ${enableAnimations ? 'c-chart__bubble--animated' : ''}`}
                style={{ opacity: bubbleOpacity }}
                onClick={() => handlers.onDataPointClick?.(bubble as any, 0, index)}
                onMouseEnter={e => {
                  const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const clientX = rect ? rect.left + x : e.clientX;
                  const clientY = rect ? rect.top + y : e.clientY;
                  setHoveredBubble({ index, clientX, clientY });
                }}
                onMouseLeave={() => setHoveredBubble(null)}
              />
            );

            // Bubble label
            if (showLabels) {
              let labelX = x;
              let labelY = y;
              let textAnchor: 'start' | 'middle' | 'end' = 'middle';
              let dominantBaseline: 'auto' | 'middle' | 'hanging' = 'middle';

              switch (labelPosition) {
                case 'top':
                  labelY = y - radius - 5;
                  dominantBaseline = 'auto';
                  break;
                case 'bottom':
                  labelY = y + radius + 15;
                  dominantBaseline = 'hanging';
                  break;
                case 'left':
                  labelX = x - radius - 5;
                  textAnchor = 'end';
                  break;
                case 'right':
                  labelX = x + radius + 5;
                  textAnchor = 'start';
                  break;
                case 'center':
                default:
                  // Keep center position
                  break;
              }

              elements.push(
                <text
                  key={`label-${index}`}
                  x={labelX}
                  y={labelY}
                  textAnchor={textAnchor}
                  dominantBaseline={dominantBaseline}
                  className={`c-chart__bubble-label ${labelPosition === 'center' ? 'c-chart__bubble-label--center' : ''}`}
                >
                  {bubble.label}
                </text>
              );
            }

            return <g key={`bubble-group-${index}`}>{elements}</g>;
          });

          // Generate axes
          const axisElements = [];

          // X-axis
          axisElements.push(
            <line
              key="x-axis"
              x1={padding}
              y1={scales.height - padding}
              x2={scales.width - padding}
              y2={scales.height - padding}
              className="c-chart__axis-line c-chart__axis-line--x"
            />
          );

          // Y-axis
          axisElements.push(
            <line
              key="y-axis"
              x1={padding}
              y1={padding}
              x2={padding}
              y2={scales.height - padding}
              className="c-chart__axis-line c-chart__axis-line--y"
            />
          );

          // X-axis labels
          const xTicks = 5;
          for (let i = 0; i <= xTicks; i++) {
            const value = xMin + (i / xTicks) * (xMax - xMin);
            const x = xScale(value);

            axisElements.push(
              <g key={`x-tick-${i}`}>
                <line
                  x1={x}
                  y1={scales.height - padding}
                  x2={x}
                  y2={scales.height - padding + 5}
                  className="c-chart__tick-line"
                />
                <text
                  x={x}
                  y={scales.height - padding + 20}
                  textAnchor="middle"
                  className="c-chart__tick-label"
                >
                  {value.toFixed(1)}
                </text>
              </g>
            );
          }

          // Y-axis labels
          const yTicks = 5;
          for (let i = 0; i <= yTicks; i++) {
            const value = yMin + (i / yTicks) * (yMax - yMin);
            const y = yScale(value);

            axisElements.push(
              <g key={`y-tick-${i}`}>
                <line x1={padding - 5} y1={y} x2={padding} y2={y} className="c-chart__tick-line" />
                <text
                  x={padding - 10}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="c-chart__tick-label"
                >
                  {value.toFixed(1)}
                </text>
              </g>
            );
          }

          // Size legend
          const legendElements = [];
          if (showSizeLegend) {
            const legendX = scales.width - 120;
            const legendY = 30;

            legendElements.push(
              <g key="size-legend">
                <text
                  x={legendX}
                  y={legendY}
                  fontSize="12"
                  fontWeight="bold"
                  fill="var(--atomix-gray-8)"
                >
                  {sizeLegendTitle}
                </text>

                {[sizeMin, (sizeMin + sizeMax) / 2, sizeMax].map((size, i) => {
                  const radius = sizeScale(size);
                  const y = legendY + 20 + i * 30;

                  return (
                    <g key={`legend-${i}`}>
                      <circle
                        cx={legendX + 15}
                        cy={y}
                        r={radius / 2}
                        fill="var(--atomix-gray-5)"
                        opacity="0.7"
                      />
                      <text
                        x={legendX + 35}
                        y={y}
                        dominantBaseline="middle"
                        fontSize="10"
                        fill="var(--atomix-gray-6)"
                      >
                        {size.toFixed(0)}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          }

          return (
            <g>
              {axisElements}
              {bubbleElements}
              {legendElements}
            </g>
          );
        },
        [
          bubbleData,
          minBubbleSize,
          maxBubbleSize,
          bubbleOpacity,
          showLabels,
          labelPosition,
          enableAnimations,
          animationDuration,
          showSizeLegend,
          sizeLegendTitle,
          colorScheme,
          sizeBasedColoring,
        ]
      );

      // Convert bubble data to datasets format for ChartRenderer
      const datasets = [
        {
          label: 'Bubble Data',
          data: bubbleData.map(bubble => ({
            label: bubble.label,
            value: bubble.size,
            x: bubble.x,
            y: bubble.y,
          })),
        },
      ];

      return (
        <Chart ref={ref} type="bubble" datasets={datasets} config={config} {...props}>
          <ChartRenderer
            datasets={datasets}
            config={config}
            onDataPointClick={onDataPointClick}
            renderContent={renderContent}
          />
          {hoveredBubble && bubbleData[hoveredBubble.index] && (
            <ChartTooltip
              dataPoint={{
                label: bubbleData[hoveredBubble.index]?.label || '',
                value: bubbleData[hoveredBubble.index]?.size || 0,
                metadata: {
                  x: bubbleData[hoveredBubble.index]?.x,
                  y: bubbleData[hoveredBubble.index]?.y,
                  ...bubbleData[hoveredBubble.index]?.metadata,
                },
              }}
              datasetLabel="Bubble Data"
              datasetColor={bubbleData[hoveredBubble.index]?.color}
              position={{ x: hoveredBubble.clientX, y: hoveredBubble.clientY }}
              visible={true}
            />
          )}
        </Chart>
      );
    }
  )
);

BubbleChart.displayName = 'BubbleChart';
export default BubbleChart;
