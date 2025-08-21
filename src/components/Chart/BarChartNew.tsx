import { forwardRef, memo, useState } from 'react';
import { useChartData } from '../../lib/composables/useChartData';
import { useChartInteraction } from '../../lib/composables/useChartInteraction';
import { useChartScale } from '../../lib/composables/useChartScale';
import Chart from './ChartNew';
import ChartTooltip from './ChartTooltip';
import { ChartProps } from './types';

interface BarChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Whether to render horizontal bars
   */
  horizontal?: boolean;
  /**
   * Whether to show value labels
   */
  showValues?: boolean;
}

/**
 * Simplified BarChart component
 */
const BarChart = memo(
  forwardRef<HTMLDivElement, BarChartProps>(
    (
      {
        data,
        horizontal = false,
        showValues = false,
        onDataPointClick,
        interactive = true,
        ...props
      },
      ref
    ) => {
      const { data: processedData } = useChartData(data);
      const scales = useChartScale(processedData, 400, 300);
      const { interaction, handlePointHover, handlePointClick } = useChartInteraction();
      const [tooltipData, setTooltipData] = useState<{
        point: any;
        position: { x: number; y: number };
      } | null>(null);

      const renderChart = () => {
        if (!processedData.length) return null;

        const barWidth = horizontal
          ? ((scales.height - scales.padding.top - scales.padding.bottom) / processedData.length) *
            0.8
          : ((scales.width - scales.padding.left - scales.padding.right) / processedData.length) *
            0.8;

        return (
          <svg width="100%" height="100%" viewBox={`0 0 ${scales.width} ${scales.height}`}>
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Bars */}
            {processedData.map((point, index) => {
              const isHovered = interaction.hoveredIndex === index;
              const isSelected = interaction.selectedIndex === index;

              if (horizontal) {
                const barHeight = barWidth;
                const barY =
                  scales.padding.top +
                  (index * (scales.height - scales.padding.top - scales.padding.bottom)) /
                    processedData.length +
                  barWidth * 0.1;
                const barX = scales.padding.left;
                const barLength = scales.xScale(index) - scales.padding.left;

                return (
                  <g key={index}>
                    <rect
                      x={barX}
                      y={barY}
                      width={Math.max(
                        0,
                        (point.value / Math.max(...processedData.map(d => d.value))) *
                          (scales.width - scales.padding.left - scales.padding.right)
                      )}
                      height={barHeight}
                      fill={point.color || 'var(--atomix-primary)'}
                      rx="4"
                      className={`c-chart__bar ${isHovered || isSelected ? 'c-chart__bar--hovered' : ''}`}
                      style={{ cursor: interactive ? 'pointer' : 'default' }}
                      onMouseEnter={e => {
                        if (interactive) {
                          handlePointHover(index);
                          const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                          const clientX = rect
                            ? rect.left +
                              (barX +
                                ((point.value / Math.max(...processedData.map(d => d.value))) *
                                  (scales.width - scales.padding.left - scales.padding.right)) /
                                  2)
                            : e.clientX;
                          const clientY = rect ? rect.top + barY : e.clientY;
                          setTooltipData({ point, position: { x: clientX, y: clientY } });
                        }
                      }}
                      onMouseLeave={() => {
                        if (interactive) {
                          handlePointHover(null);
                          setTooltipData(null);
                        }
                      }}
                      onClick={() => {
                        if (interactive) {
                          handlePointClick(index);
                          onDataPointClick?.(point, index);
                        }
                      }}
                    />
                    {showValues && (
                      <text
                        x={
                          barX +
                          (point.value / Math.max(...processedData.map(d => d.value))) *
                            (scales.width - scales.padding.left - scales.padding.right) +
                          5
                        }
                        y={barY + barHeight / 2}
                        dominantBaseline="middle"
                        className="c-chart__bar-value-label"
                      >
                        {point.value}
                      </text>
                    )}
                  </g>
                );
              } else {
                const barX = scales.xScale(index) - barWidth / 2;
                const barY = scales.yScale(point.value);
                const barHeight = scales.yScale(0) - barY;

                return (
                  <g key={index}>
                    <rect
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={Math.max(0, barHeight)}
                      fill={point.color || 'var(--atomix-primary)'}
                      rx="4"
                      className={`c-chart__bar ${isHovered || isSelected ? 'c-chart__bar--hovered' : ''}`}
                      style={{ cursor: interactive ? 'pointer' : 'default' }}
                      onMouseMove={e => {
                        if (interactive) {
                          handlePointHover(index);
                          const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                          const clientX = rect ? rect.left + (barX + barWidth / 2) : e.clientX;
                          const clientY = rect ? rect.top + barY : e.clientY;
                          setTooltipData({ point, position: { x: clientX, y: clientY } });
                        }
                      }}
                      onMouseLeave={() => {
                        if (interactive) {
                          handlePointHover(null);
                          setTooltipData(null);
                        }
                      }}
                      onClick={() => {
                        if (interactive) {
                          handlePointClick(index);
                          onDataPointClick?.(point, index);
                        }
                      }}
                    />
                    {showValues && (
                      <text
                        x={barX + barWidth / 2}
                        y={barY - 5}
                        textAnchor="middle"
                        className="c-chart__bar-value-label"
                      >
                        {point.value}
                      </text>
                    )}
                  </g>
                );
              }
            })}

            {/* Axis labels */}
            {processedData.map((point, index) => (
              <text
                key={`label-${index}`}
                x={horizontal ? scales.padding.left - 10 : scales.xScale(index)}
                y={
                  horizontal
                    ? scales.padding.top +
                      (index * (scales.height - scales.padding.top - scales.padding.bottom)) /
                        processedData.length +
                      barWidth / 2
                    : scales.height - 10
                }
                textAnchor={horizontal ? 'end' : 'middle'}
                dominantBaseline={horizontal ? 'middle' : 'auto'}
                fontSize="12"
                fill="var(--atomix-gray-8)"
              >
                {point.label}
              </text>
            ))}
          </svg>
        );
      };

      return (
        <Chart ref={ref} type="bar" data={data} {...props}>
          {renderChart()}
          {tooltipData && (
            <ChartTooltip
              dataPoint={tooltipData.point}
              datasetLabel="Bar Chart"
              position={tooltipData.position}
              visible={true}
            />
          )}
        </Chart>
      );
    }
  )
);

BarChart.displayName = 'BarChart';
export default BarChart;
export type { BarChartProps };
