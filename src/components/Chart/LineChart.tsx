import { forwardRef, memo, useCallback } from 'react';
import { LineChartOptions, useLineChart } from '../../lib/composables/useLineChart';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';
import ChartTooltip from './ChartTooltip';
import { ChartProps } from './types';

interface LineChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Line chart specific options
   */
  lineOptions?: LineChartOptions;

  /**
   * Real-time data update handler
   */
  onRealTimeUpdate?: () => void;

  /**
   * Zoom change handler
   */
  onZoomChange?: (zoomLevel: number, centerX: number) => void;

  /**
   * Pan change handler
   */
  onPanChange?: (offsetX: number, offsetY: number) => void;

  /**
   * Brush selection handler
   */
  onBrushSelection?: (startIndex: number, endIndex: number) => void;
}

const LineChart = memo(
  forwardRef<HTMLDivElement, LineChartProps>(
    (
      {
        datasets = [],
        config = {},
        lineOptions = {},
        onDataPointClick,
        onRealTimeUpdate,
        onZoomChange,
        onPanChange,
        onBrushSelection,
        ...props
      },
      ref
    ) => {
      const {
        processedDatasets,
        generateSmoothPath,
        calculateMovingAverage,
        handlePointHover,
        handlePointLeave,
        hoveredPoint,
      } = useLineChart(datasets, lineOptions);

      const renderContent = useCallback(
        ({ scales, colors, datasets: renderedDatasets, handlers }) => {
          if (!renderedDatasets.length) return null;

          return renderedDatasets.map((dataset, datasetIndex) => {
            const color = dataset.color || colors[datasetIndex];
            const points =
              dataset.data?.map((point, i) => ({
                x: scales.xScale(i, dataset.data?.length),
                y: scales.yScale(point.value),
              })) || [];

            const path = lineOptions.smooth
              ? generateSmoothPath(points)
              : `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

            return (
              <g key={`dataset-${datasetIndex}`}>
                {lineOptions.showArea && (
                  <path
                    d={`${path} L ${points[points.length - 1]?.x || 0},${scales.yScale(0)} L ${points[0]?.x || 0},${scales.yScale(0)} Z`}
                    fill={color}
                    className="c-chart__area-path"
                  />
                )}
                <path d={path} stroke={color} fill="none" className="c-chart__line-path" />
                {lineOptions.showDataPoints &&
                  dataset.data?.map((point, i) => {
                    const x = scales.xScale(i, dataset.data?.length);
                    const y = scales.yScale(point.value);
                    const isHovered =
                      hoveredPoint?.datasetIndex === datasetIndex && hoveredPoint?.pointIndex === i;

                    return (
                      <circle
                        key={`point-${i}`}
                        cx={x}
                        cy={y}
                        r={lineOptions.pointRadius || 4}
                        fill={color}
                        className={`c-chart__data-point ${isHovered ? 'c-chart__data-point--hovered' : ''}`}
                        onClick={() => handlers.onDataPointClick?.(point, datasetIndex, i)}
                        onMouseEnter={e => {
                          const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                          const clientX = rect ? rect.left + x : e.clientX;
                          const clientY = rect ? rect.top + y : e.clientY;
                          handlePointHover(datasetIndex, i, x, y, clientX, clientY);
                        }}
                        onMouseLeave={handlePointLeave}
                      />
                    );
                  })}
              </g>
            );
          });
        },
        [lineOptions, generateSmoothPath, hoveredPoint, handlePointHover, handlePointLeave]
      );

      return (
        <Chart
          ref={ref}
          type="line"
          datasets={datasets}
          config={config}
          toolbarConfig={{
            defaults: {
              zoom: true,
              pan: true,
              reset: true,
              grid: true,
              tooltips: true,
            },
          }}
          {...props}
        >
          <ChartRenderer
            datasets={processedDatasets}
            config={config}
            onDataPointClick={onDataPointClick}
            renderContent={renderContent}
          />
          {hoveredPoint && (
            <ChartTooltip
              dataPoint={
                processedDatasets[hoveredPoint.datasetIndex]?.data?.[hoveredPoint.pointIndex]
              }
              datasetLabel={processedDatasets[hoveredPoint.datasetIndex]?.label}
              datasetColor={processedDatasets[hoveredPoint.datasetIndex]?.color}
              position={{ x: hoveredPoint.clientX, y: hoveredPoint.clientY }}
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
