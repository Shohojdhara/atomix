import { forwardRef, memo } from 'react';
import { PieChartOptions, usePieChart } from '../../lib/composables/usePieChart';
import BaseChart from './BaseChart';
import ChartTooltip from './ChartTooltip';
import { ChartDataPoint, ChartProps } from './types';

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
      }: {
        scales: any;
        colors: any;
        datasets: any;
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
        if (!slices.length) return null;

        return (
          <>
            {slices.map((slice, index) => {
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
                      handlers.onPointHover(0, index, slice.labelPosition.x, slice.labelPosition.y, rect.left + rect.width / 2, rect.top + rect.height / 2);
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
            {config?.showTooltips !== false && hoveredPoint && data[hoveredPoint.pointIndex] && (
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
