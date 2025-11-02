import { forwardRef, memo, useState } from 'react';
import BaseChart from './BaseChart';
import ChartTooltip from './ChartTooltip';
import { ChartProps, ScatterDataPoint } from './types';

interface ScatterChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Scatter chart specific options
   */
  scatterOptions?: {
    /**
     * Point radius
     */
    pointRadius?: number;

    /**
     * Whether to show point labels
     */
    showLabels?: boolean;

    /**
     * Enable hover effects
     */
    enableHoverEffects?: boolean;
  };
}

const ScatterChart = memo(
  forwardRef<HTMLDivElement, ScatterChartProps>(
    (
      {
        datasets = [],
        config = {},
        scatterOptions = {
          pointRadius: 4,
          showLabels: false,
          enableHoverEffects: true,
        },
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      const renderContent = ({
        scales,
        colors,
        datasets: renderedDatasets,
        handlers,
        hoveredPoint,
      }: {
        scales: any;
        colors: string[];
        datasets: any[];
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
        if (!renderedDatasets.length) return null;

        const points: React.ReactNode[] = [];

        renderedDatasets.forEach((dataset: any, datasetIndex: number) => {
          const color = dataset.color || colors[datasetIndex % colors.length];

          dataset.data?.forEach((point: any, pointIndex: number) => {
            const x =
              point.x !== undefined
                ? scales.padding.left + (point.x / 100) * scales.innerWidth
                : scales.xScale(pointIndex, dataset.data?.length);

            const y =
              point.y !== undefined
                ? scales.padding.top +
                  scales.innerHeight -
                  (point.y / 100) * scales.innerHeight
                : scales.yScale(point.value);

            points.push(
              <g key={`point-${datasetIndex}-${pointIndex}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={point.size || scatterOptions.pointRadius || 4}
                  fill={point.color || color}
                  className="c-chart__scatter-point"
                  onClick={() => handlers.onDataPointClick?.(point, datasetIndex, pointIndex)}
                  onMouseEnter={e => {
                    if (scatterOptions.enableHoverEffects) {
                      e.currentTarget.setAttribute(
                        'r',
                        String((point.size || scatterOptions.pointRadius || 4) * 1.5)
                      );
                    }
                    const rect = e.currentTarget.getBoundingClientRect();
                    handlers.onPointHover(datasetIndex, pointIndex, x, y, rect.left + rect.width / 2, rect.top + rect.height / 2);
                  }}
                  onMouseLeave={e => {
                    if (scatterOptions.enableHoverEffects) {
                      e.currentTarget.setAttribute(
                        'r',
                        String(point.size || scatterOptions.pointRadius || 4)
                      );
                    }
                    handlers.onPointLeave();
                  }}
                />
                {scatterOptions.showLabels && (
                  <text
                    x={x}
                    y={y - 10}
                    textAnchor="middle"
                    className="c-chart__scatter-label"
                  >
                    {point.label}
                  </text>
                )}
              </g>
            );
          });
        });

        return (
          <>
            {points}
            {hoveredPoint && (
              <ChartTooltip
                dataPoint={renderedDatasets[hoveredPoint.datasetIndex]?.data?.[hoveredPoint.pointIndex]}
                datasetLabel={renderedDatasets[hoveredPoint.datasetIndex]?.label}
                datasetColor={renderedDatasets[hoveredPoint.datasetIndex]?.color || colors[hoveredPoint.datasetIndex]}
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
          type="scatter"
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

ScatterChart.displayName = 'ScatterChart';
export default ScatterChart;
export type { ScatterChartProps };