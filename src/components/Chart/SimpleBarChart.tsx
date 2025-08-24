import { forwardRef, memo } from 'react';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from './types';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';

interface SimpleBarChartProps extends Omit<ChartProps, 'type'> {
  horizontal?: boolean;
  stacked?: boolean;
  showValues?: boolean;
}

const SimpleBarChart = memo(
  forwardRef<HTMLDivElement, SimpleBarChartProps>(
    (
      {
        datasets = [],
        config = {},
        horizontal = false,
        stacked = false,
        showValues = true,
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      const renderBars = ({
        scales,
        colors,
        datasets: processedDatasets,
        onDataPointClick: handleClick,
      }) => {
        if (!scales || !processedDatasets.length) return null;

        const { xScale, yScale, minValue, maxValue, padding, width, height } = scales;
        const numCategories = processedDatasets[0]?.data?.length || 0;
        const numDatasets = processedDatasets.length;

        if (numCategories === 0) return null;

        const bars = [];
        const stackedPositions = Array(numCategories).fill(0);

        processedDatasets.forEach((dataset, datasetIndex) => {
          dataset.data.forEach((point, categoryIndex) => {
            const value = typeof point.value === 'number' ? point.value : 0;
            if (isNaN(value) || !isFinite(value)) return;

            let barX, barY, barWidth, barHeight;

            if (horizontal) {
              const categoryHeight = (height - padding.top - padding.bottom) / numCategories;
              const availableHeight = categoryHeight * 0.8;

              barHeight = stacked ? availableHeight : availableHeight / numDatasets;
              barY =
                padding.top +
                categoryIndex * categoryHeight +
                (categoryHeight - availableHeight) / 2;

              if (!stacked) {
                barY += datasetIndex * barHeight;
              }

              barX = padding.left;
              barWidth =
                ((value - minValue) / (maxValue - minValue)) *
                (width - padding.left - padding.right);

              if (stacked && datasetIndex > 0) {
                barX =
                  padding.left +
                  ((stackedPositions[categoryIndex] - minValue) / (maxValue - minValue)) *
                    (width - padding.left - padding.right);
                stackedPositions[categoryIndex] += value;
              } else if (stacked) {
                stackedPositions[categoryIndex] = value;
              }
            } else {
              const categoryWidth = (width - padding.left - padding.right) / numCategories;
              const availableWidth = categoryWidth * 0.8;

              barWidth = stacked ? availableWidth : availableWidth / numDatasets;
              barX =
                padding.left + categoryIndex * categoryWidth + (categoryWidth - availableWidth) / 2;

              if (!stacked) {
                barX += datasetIndex * barWidth;
              }

              barHeight =
                ((value - minValue) / (maxValue - minValue)) *
                (height - padding.top - padding.bottom);
              barY = height - padding.bottom - barHeight;

              if (stacked && datasetIndex > 0) {
                const stackedHeight =
                  ((stackedPositions[categoryIndex] - minValue) / (maxValue - minValue)) *
                  (height - padding.top - padding.bottom);
                barY = height - padding.bottom - stackedHeight - barHeight;
                stackedPositions[categoryIndex] += value;
              } else if (stacked) {
                stackedPositions[categoryIndex] = value;
              }
            }

            bars.push(
              <g key={`bar-${datasetIndex}-${categoryIndex}`}>
                <rect
                  x={barX}
                  y={barY}
                  width={Math.max(barWidth, 0)}
                  height={Math.max(barHeight, 0)}
                  fill={dataset.color}
                  rx={4}
                  className="c-chart__bar"
                  onClick={() => handleClick?.(point, datasetIndex, categoryIndex)}
                  style={{ cursor: handleClick ? 'pointer' : 'default' }}
                />
                {showValues && (horizontal ? barWidth > 30 : barHeight > 20) && (
                  <text
                    x={horizontal ? barX + barWidth + 5 : barX + barWidth / 2}
                    y={horizontal ? barY + barHeight / 2 : barY - 5}
                    textAnchor={horizontal ? 'start' : 'middle'}
                    dominantBaseline={horizontal ? 'middle' : 'auto'}
                    className="c-chart__bar-value-label"
                  >
                    {value}
                  </text>
                )}
              </g>
            );
          });
        });

        // Axes
        const xAxis = (
          <g className="c-chart__axis c-chart__axis--x">
            {processedDatasets[0]?.data?.map((point, i) => (
              <text
                key={`x-label-${i}`}
                x={
                  horizontal
                    ? padding.left - 10
                    : padding.left +
                      i * ((width - padding.left - padding.right) / numCategories) +
                      (width - padding.left - padding.right) / numCategories / 2
                }
                y={
                  horizontal
                    ? padding.top +
                      i * ((height - padding.top - padding.bottom) / numCategories) +
                      (height - padding.top - padding.bottom) / numCategories / 2
                    : height - 10
                }
                textAnchor={horizontal ? 'end' : 'middle'}
                dominantBaseline={horizontal ? 'middle' : 'auto'}
                className="c-chart__axis-label"
              >
                {point.label}
              </text>
            ))}
          </g>
        );

        const yAxis = (
          <g className="c-chart__axis c-chart__axis--y">
            {Array.from({ length: 5 }).map((_, i) => {
              const value = minValue + ((maxValue - minValue) * i) / 4;
              return (
                <text
                  key={`y-label-${i}`}
                  x={
                    horizontal
                      ? padding.left + (i / 4) * (width - padding.left - padding.right)
                      : padding.left - 10
                  }
                  y={
                    horizontal
                      ? height - 10
                      : height - padding.bottom - (i / 4) * (height - padding.top - padding.bottom)
                  }
                  textAnchor={horizontal ? 'middle' : 'end'}
                  dominantBaseline={horizontal ? 'auto' : 'middle'}
                  className="c-chart__axis-label"
                >
                  {value.toFixed(value % 1 === 0 ? 0 : 1)}
                </text>
              );
            })}
          </g>
        );

        return (
          <>
            {xAxis}
            {yAxis}
            {bars}
          </>
        );
      };

      return (
        <Chart
          ref={ref}
          type={horizontal ? 'horizontal-bar' : 'bar'}
          datasets={datasets}
          config={config}
          {...props}
        >
          <div className={CHART.CANVAS_CLASS}>
            <ChartRenderer
              datasets={datasets}
              config={config}
              onDataPointClick={onDataPointClick}
              renderContent={renderBars}
            />
          </div>
        </Chart>
      );
    }
  )
);

SimpleBarChart.displayName = 'SimpleBarChart';
export default SimpleBarChart;
export type { SimpleBarChartProps };
