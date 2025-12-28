import { forwardRef, memo } from 'react';
import { BarChartOptions, useBarChart } from '../../lib/composables/useBarChart';
import BaseChart from './BaseChart';
import ChartTooltip from './ChartTooltip';
import { ChartDataPoint, ChartProps, ChartRenderContentParams } from './types';

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

      const renderContent = ({
        scales,
        colors,
        datasets: renderedDatasets,
        handlers,
        hoveredPoint,
        toolbarState,
        config: renderConfig,
      }: ChartRenderContentParams) => {
        if (!renderedDatasets.length) return null;

        const showTooltips = toolbarState?.showTooltips ?? renderConfig?.showTooltips ?? true;

        const barDimensions = calculateBarDimensions(
          renderedDatasets,
          scales.width,
          scales.height,
          scales.padding,
          horizontal
        );

        return (
          <>
            {barDimensions.map((bar, index) => {
              const dataset = renderedDatasets[bar.datasetIndex];
              if (!dataset) return null;
              const point = dataset.data?.[bar.pointIndex];
              const color = dataset.color || colors[bar.datasetIndex];
              const isHovered =
                hoveredPoint?.datasetIndex === bar.datasetIndex &&
                hoveredPoint?.pointIndex === bar.pointIndex;

              return (
                <g key={`bar-${index}`}>
                  <rect
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={color}
                    className={`c-chart__bar ${isHovered ? 'c-chart__bar--hovered' : ''}`}
                    onClick={() =>
                      point && handlers.onDataPointClick?.(point, bar.datasetIndex, bar.pointIndex)
                    }
                    onMouseEnter={e => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      handlers.onPointHover(
                        bar.datasetIndex,
                        bar.pointIndex,
                        bar.x,
                        bar.y,
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2
                      );
                    }}
                    onMouseLeave={handlers.onPointLeave}
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
            })}
            {showTooltips && hoveredPoint && (
              <ChartTooltip
                dataPoint={
                  renderedDatasets[hoveredPoint.datasetIndex]?.data?.[
                    hoveredPoint.pointIndex
                  ] as ChartDataPoint
                }
                datasetLabel={renderedDatasets[hoveredPoint.datasetIndex]?.label}
                datasetColor={renderedDatasets[hoveredPoint.datasetIndex]?.color}
                position={{ x: hoveredPoint.clientX, y: hoveredPoint.clientY }}
                visible={true}
              />
            )}
          </>
        );
      };

      return (
        <BaseChart
          ref={ref}
          type="bar"
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

BarChart.displayName = 'BarChart';
export default BarChart;
export type { BarChartProps };
