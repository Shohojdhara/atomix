import { forwardRef, memo, useCallback } from 'react';
import { BarChartOptions, useBarChart } from '../../lib/composables/useBarChart';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';
import ChartTooltip from './ChartTooltip';
import { ChartProps } from './types';

interface BarChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Bar chart specific options
   */
  barOptions?: BarChartOptions;

  /**
   * Whether to render as horizontal bar chart
   */
  horizontal?: boolean;
}

const BarChart = memo(
  forwardRef<HTMLDivElement, BarChartProps>(
    (
      {
        datasets = [],
        config = {},
        barOptions = {},
        horizontal = false,
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      const { calculateBarDimensions, handleBarHover, handleBarLeave, hoveredBar, formatValue } =
        useBarChart(datasets, barOptions);

      const renderContent = useCallback(
        ({
          scales,
          colors,
          datasets: renderedDatasets,
          handlers,
        }: {
          scales: any;
          colors: any;
          datasets: any;
          handlers: any;
        }) => {
          if (!renderedDatasets.length) return null;

          const barDimensions = calculateBarDimensions(
            renderedDatasets,
            scales.width,
            scales.height,
            scales.padding,
            horizontal
          );

          return barDimensions.map((bar, index) => {
            const dataset = renderedDatasets[bar.datasetIndex];
            const point = dataset.data?.[bar.pointIndex];
            const color = dataset.color || colors[bar.datasetIndex];
            const isHovered =
              hoveredBar?.datasetIndex === bar.datasetIndex &&
              hoveredBar?.pointIndex === bar.pointIndex;

            return (
              <g key={`bar-${index}`}>
                <rect
                  x={bar.x}
                  y={bar.y}
                  width={bar.width}
                  height={bar.height}
                  fill={color}
                  rx={barOptions.cornerRadius || 4}
                  className={`c-chart__bar ${isHovered ? 'c-chart__bar--hovered' : ''}`}
                  onClick={() =>
                    point && handlers.onDataPointClick?.(point, bar.datasetIndex, bar.pointIndex)
                  }
                  onMouseEnter={e => {
                    const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                    const clientX = rect ? rect.left + bar.x + bar.width / 2 : e.clientX;
                    const clientY = rect ? rect.top + bar.y : e.clientY;
                    handleBarHover(bar.datasetIndex, bar.pointIndex, clientX, clientY);
                  }}
                  onMouseLeave={handleBarLeave}
                />
                {barOptions.showValues && (
                  <text
                    x={bar.x + bar.width / 2}
                    y={bar.y - 5}
                    textAnchor="middle"
                    className="c-chart__bar-value-label"
                  >
                    {formatValue(bar.value)}
                  </text>
                )}
              </g>
            );
          });
        },
        [
          calculateBarDimensions,
          horizontal,
          barOptions,
          hoveredBar,
          handleBarHover,
          handleBarLeave,
          formatValue,
        ]
      );

      return (
        <Chart
          ref={ref}
          type={horizontal ? 'horizontal-bar' : 'bar'}
          datasets={datasets}
          config={config}
          {...props}
        >
          <ChartRenderer
            datasets={datasets}
            config={config}
            onDataPointClick={onDataPointClick}
            renderContent={renderContent}
          />
          {hoveredBar && (
            <ChartTooltip
              dataPoint={
                datasets[hoveredBar.datasetIndex]?.data?.[hoveredBar.pointIndex] || {
                  label: '',
                  value: 0,
                }
              }
              datasetLabel={datasets[hoveredBar.datasetIndex]?.label}
              datasetColor={datasets[hoveredBar.datasetIndex]?.color}
              position={{ x: hoveredBar.x, y: hoveredBar.y }}
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
