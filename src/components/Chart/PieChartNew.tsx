import { forwardRef, memo } from 'react';
import Chart from './ChartNew';
import { ChartProps } from './types';
import { useChartData } from '../../lib/composables/useChartData';
import { useChartInteraction } from '../../lib/composables/useChartInteraction';

interface PieChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Whether to render as donut chart
   */
  donut?: boolean;
  /**
   * Whether to show value labels
   */
  showLabels?: boolean;
}

/**
 * Simplified PieChart component
 */
const PieChart = memo(
  forwardRef<HTMLDivElement, PieChartProps>(
    (
      { data, donut = false, showLabels = true, onDataPointClick, interactive = true, ...props },
      ref
    ) => {
      const { data: processedData, stats } = useChartData(data);
      const { interaction, handlePointHover, handlePointClick } = useChartInteraction();

      const renderChart = () => {
        if (!processedData.length || stats.total === 0) return null;

        const size = 300;
        const center = size / 2;
        const radius = size * 0.35;
        const innerRadius = donut ? radius * 0.5 : 0;

        let currentAngle = -Math.PI / 2; // Start at top

        return (
          <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
            {processedData.map((point, index) => {
              const percentage = point.value / stats.total;
              const angle = percentage * 2 * Math.PI;
              const isHovered = interaction.hoveredIndex === index;
              const isSelected = interaction.selectedIndex === index;

              // Calculate arc path
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;

              const x1 = center + Math.cos(startAngle) * radius;
              const y1 = center + Math.sin(startAngle) * radius;
              const x2 = center + Math.cos(endAngle) * radius;
              const y2 = center + Math.sin(endAngle) * radius;

              const largeArcFlag = angle > Math.PI ? 1 : 0;

              let pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

              if (donut) {
                const ix1 = center + Math.cos(startAngle) * innerRadius;
                const iy1 = center + Math.sin(startAngle) * innerRadius;
                const ix2 = center + Math.cos(endAngle) * innerRadius;
                const iy2 = center + Math.sin(endAngle) * innerRadius;

                pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${ix1} ${iy1} Z`;
              }

              // Label position
              const labelAngle = startAngle + angle / 2;
              const labelRadius = radius + 20;
              const labelX = center + Math.cos(labelAngle) * labelRadius;
              const labelY = center + Math.sin(labelAngle) * labelRadius;

              currentAngle += angle;

              return (
                <g key={index}>
                  <path
                    d={pathData}
                    fill={point.color || 'var(--atomix-primary)'}
                    className={`c-chart__pie-slice ${isHovered || isSelected ? 'c-chart__pie-slice--hovered' : ''}`}
                    style={{
                      cursor: interactive ? 'pointer' : 'default',
                      transformOrigin: `${center}px ${center}px`,
                    }}
                    onMouseEnter={() => interactive && handlePointHover(index)}
                    onMouseLeave={() => interactive && handlePointHover(null)}
                    onClick={() => {
                      if (interactive) {
                        handlePointClick(index);
                        onDataPointClick?.(point, index);
                      }
                    }}
                  />
                  {showLabels && percentage > 0.05 && (
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="c-chart__pie-label"
                    >
                      {Math.round(percentage * 100)}%
                    </text>
                  )}
                </g>
              );
            })}

            {/* Center label for donut */}
            {donut && (
              <text
                x={center}
                y={center}
                textAnchor="middle"
                dominantBaseline="middle"
                className="c-chart__donut-center-value"
              >
                {stats.total}
              </text>
            )}
          </svg>
        );
      };

      return (
        <Chart ref={ref} type="pie" data={data} {...props}>
          {renderChart()}
        </Chart>
      );
    }
  )
);

PieChart.displayName = 'PieChart';
export default PieChart;
export type { PieChartProps };
