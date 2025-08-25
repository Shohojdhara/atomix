import { forwardRef, memo, useCallback } from 'react';
import { PieChartOptions, usePieChart } from '../../lib/composables/usePieChart';
import Chart from './Chart';
import ChartTooltip from './ChartTooltip';
import { ChartProps } from './types';

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

      const renderContent = useCallback(() => {
        if (!slices.length) return null;

        return slices.map((slice, index) => {
          const isHovered = hoveredSlice === index;
          const isSelected = selectedSlices.has(index);

          return (
            <g key={`slice-${index}`}>
              <path
                d={slice.path}
                fill={slice.color}
                className={`c-chart__pie-slice ${isHovered ? 'c-chart__pie-slice--hovered' : ''} ${isSelected ? 'c-chart__pie-slice--selected' : ''}`}
                onClick={() => {
                  handleSliceClick(index);
                  onDataPointClick?.(slice.dataPoint, 0, index);
                }}
                onMouseEnter={e => {
                  const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  const clientX = rect ? rect.left + slice.labelPosition.x : e.clientX;
                  const clientY = rect ? rect.top + slice.labelPosition.y : e.clientY;
                  handleSliceHover(index, clientX, clientY);
                }}
                onMouseLeave={handleSliceLeave}
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
        });
      }, [
        slices,
        hoveredSlice,
        selectedSlices,
        pieOptions.showLabels,
        handleSliceClick,
        handleSliceHover,
        handleSliceLeave,
        formatLabel,
        onDataPointClick,
      ]);

      return (
        <Chart ref={ref} type="pie" datasets={datasets} config={config} {...props}>
          <svg width="100%" height="100%" viewBox="0 0 800 400">
            {renderContent()}
          </svg>
          {hoveredSlice !== null && data[hoveredSlice] && (
            <ChartTooltip
              dataPoint={data[hoveredSlice]}
              datasetLabel={datasets[0]?.label}
              datasetColor={slices[hoveredSlice]?.color}
              position={{
                x: slices[hoveredSlice]?.clientX || 0,
                y: slices[hoveredSlice]?.clientY || 0,
              }}
              visible={true}
            />
          )}
        </Chart>
      );
    }
  )
);

PieChart.displayName = 'PieChart';
export default PieChart;
export type { PieChartProps };
