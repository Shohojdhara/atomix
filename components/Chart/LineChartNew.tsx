import { forwardRef, memo, useState } from 'react';
import { useChartData } from '../../lib/composables/useChartData';
import { useChartInteraction } from '../../lib/composables/useChartInteraction';
import { useChartScale } from '../../lib/composables/useChartScale';
import Chart from './Chart';
import ChartTooltip from './ChartTooltip';
import { ChartDataPoint, ChartProps } from './types';

interface LineChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Whether to show area fill
   */
  showArea?: boolean;
  /**
   * Whether to show data points
   */
  showPoints?: boolean;
  /**
   * Whether to use smooth curves
   */
  smooth?: boolean;
}

/**
 * Simplified LineChart component
 */
const LineChart = memo(
  forwardRef<HTMLDivElement, LineChartProps>(
    (
      {
        datasets,
        showArea = false,
        showPoints = true,
        smooth = false,
        onDataPointClick,
        interactive = true,
        ...props
      },
      ref
    ) => {
      const chartData = datasets?.[0]?.data || [];
      const { data: processedData, stats } = useChartData(chartData);
      const { interaction, handlePointHover, handlePointClick } = useChartInteraction();
      const [tooltipData, setTooltipData] = useState<{
        point: ChartDataPoint;
        position: { x: number; y: number };
      } | null>(null);

      const scales = useChartScale(processedData, 800, 400);

      const generatePath = () => {
        if (!processedData.length) return '';
        return processedData
          .map((point, index) => {
            const x = scales.xScale(index);
            const y = scales.yScale(point.value);
            return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
          })
          .join(' ');
      };

      const generateAreaPath = () => {
        if (!processedData.length) return '';
        const linePath = generatePath();
        const lastPoint = scales.xScale(processedData.length - 1);
        const firstPoint = scales.xScale(0);
        const baseline = scales.yScale(0);

        return `${linePath} L ${lastPoint},${baseline} L ${firstPoint},${baseline} Z`;
      };

      const renderChart = () => (
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

          {/* Area fill */}
          {showArea && <path d={generateAreaPath()} className="c-chart__area-path" />}

          {/* Line path */}
          <path
            d={generatePath()}
            fill="none"
            stroke="var(--atomix-primary)"
            className="c-chart__line-path"
          />

          {/* Data points */}
          {showPoints &&
            processedData.map((point, index) => {
              const x = scales.xScale(index);
              const y = scales.yScale(point.value);
              const isHovered = interaction.hoveredIndex === index;
              const isSelected = interaction.selectedIndex === index;

              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r={isHovered || isSelected ? 6 : 4}
                  fill={point.color || 'var(--atomix-primary)'}
                  className="c-chart__data-point"
                  style={{ cursor: interactive ? 'pointer' : 'default' }}
                  onMouseEnter={e => {
                    if (interactive) {
                      handlePointHover(index);
                      const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                      const clientX = rect ? rect.left + x : e.clientX;
                      const clientY = rect ? rect.top + y : e.clientY;
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
                      onDataPointClick?.(point, 0, index);
                    }
                  }}
                />
              );
            })}
        </svg>
      );

      return (
        <Chart
          ref={ref}
          type="line"
          datasets={[{ label: 'Line Chart', data: chartData }]}
          {...props}
        >
          {renderChart()}
          {tooltipData && (
            <ChartTooltip
              dataPoint={tooltipData.point}
              datasetLabel="Line Chart"
              position={tooltipData.position}
              visible={true}
            />
          )}
        </Chart>
      );
    }
  )
);

LineChart.displayName = 'LineChart';
export default LineChart;
export type { LineChartProps };
