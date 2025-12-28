import { forwardRef, memo } from 'react';
import { PieChartOptions, usePieChart } from '../../lib/composables/usePieChart';
import BaseChart from './BaseChart';
import ChartTooltip from './ChartTooltip';
import { ChartDataPoint, ChartProps, ChartRenderContentParams } from './types';

interface PieChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Pie chart specific options
   */
  pieOptions?: PieChartOptions;
}

const PieChart = memo(
  forwardRef<HTMLDivElement, PieChartProps>(
    ({ datasets = [], config = {}, pieOptions = {}, onDataPointClick, ...props }, ref) => {
      const data = datasets[0]?.data || [];
      const {
        slices,
        handleSliceHover,
        handleSliceLeave,
        handleSliceClick,
        formatLabel,
        hoveredSlice,
        selectedSlices,
      } = usePieChart(data, pieOptions);

      const renderContent = ({
        scales,
        colors,
        datasets: renderedDatasets,
        handlers,
        hoveredPoint,
        toolbarState,
        config: renderConfig,
      }: ChartRenderContentParams) => {
        if (!slices.length) return null;

        // Use actual container dimensions from scales
        const width = scales.width;
        const height = scales.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const outerRadius = (Math.min(width, height) / 2) * 0.8;

        // Recalculate slices with actual dimensions
        const recalculatedSlices = slices.map(slice => {
          // Recalculate path with actual center and radius
          const outerStartX = centerX + outerRadius * Math.cos(slice.startAngle);
          const outerStartY = centerY + outerRadius * Math.sin(slice.startAngle);
          const outerEndX = centerX + outerRadius * Math.cos(slice.endAngle);
          const outerEndY = centerY + outerRadius * Math.sin(slice.endAngle);

          const angle = slice.endAngle - slice.startAngle;
          const largeArcFlag = angle > Math.PI ? 1 : 0;

          const path = [
            `M ${centerX},${centerY}`,
            `L ${outerStartX},${outerStartY}`,
            `A ${outerRadius},${outerRadius} 0 ${largeArcFlag},1 ${outerEndX},${outerEndY}`,
            'Z',
          ].join(' ');

          // Recalculate label position
          const labelRadius = outerRadius * 0.7;
          const labelX = centerX + labelRadius * Math.cos(slice.midAngle);
          const labelY = centerY + labelRadius * Math.sin(slice.midAngle);

          return {
            ...slice,
            path,
            labelPosition: { x: labelX, y: labelY },
          };
        });

        const showTooltips = toolbarState?.showTooltips ?? renderConfig?.showTooltips ?? true;

        return (
          <>
            {recalculatedSlices.map((slice, index) => {
              const isHovered = hoveredPoint?.pointIndex === index;

              return (
                <g key={`slice-${index}`}>
                  <path
                    d={slice.path}
                    fill={slice.color}
                    className={`c-chart__pie-slice ${isHovered ? 'c-chart__pie-slice--hovered' : ''}`}
                    onClick={() => {
                      handleSliceClick(index);
                      handlers.onDataPointClick?.(slice.dataPoint, 0, index);
                    }}
                    onMouseEnter={e => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      handlers.onPointHover(
                        0,
                        index,
                        slice.labelPosition.x,
                        slice.labelPosition.y,
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2
                      );
                    }}
                    onMouseLeave={handlers.onPointLeave}
                  />
                  {pieOptions.showLabels && (
                    <text
                      x={slice.labelPosition.x}
                      y={slice.labelPosition.y}
                      textAnchor="middle"
                      className="c-chart__pie-label"
                    >
                      {formatLabel(slice)}
                    </text>
                  )}
                </g>
              );
            })}
            {showTooltips && hoveredPoint && data[hoveredPoint.pointIndex] && (
              <ChartTooltip
                dataPoint={data[hoveredPoint.pointIndex] as ChartDataPoint}
                datasetLabel={renderedDatasets[0]?.label}
                datasetColor={slices[hoveredPoint.pointIndex]?.color}
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

      return (
        <BaseChart
          ref={ref}
          type="pie"
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

PieChart.displayName = 'PieChart';
export default PieChart;
export type { PieChartProps };
