import { forwardRef, memo, useState } from 'react';
import { LineChartOptions, useLineChart } from '../../lib/composables/useLineChart';
import BaseChart from './BaseChart';
import ChartTooltip from './ChartTooltip';
import { ChartProps, ChartRenderContentParams, ChartDataset, ChartDataPoint } from './types';

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
      // Merge default options with provided options
      const mergedLineOptions: LineChartOptions = {
        showDataPoints: true,
        lineWidth: 2,
        pointRadius: 4,
        smooth: false,
        tension: 0.4,
        showArea: false,
        fillOpacity: 0.3,
        showPointLabels: false,
        ...lineOptions,
      };

      const {
        processedDatasets,
        generateSmoothPath,
        calculateMovingAverage,
        handlePointHover,
        handlePointLeave,
        hoveredPoint,
      } = useLineChart(datasets, mergedLineOptions);

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

        // Use toolbar state if available, fallback to config for backward compatibility
        const showTooltips = toolbarState?.showTooltips ?? renderConfig?.showTooltips ?? true;
        const shouldAnimate = toolbarState?.animationsEnabled ?? renderConfig?.animate ?? mergedLineOptions.smooth;

        return (
          <>
            {renderedDatasets.map((dataset: ChartDataset, datasetIndex: number) => {
              const color = dataset.color || colors[datasetIndex];
              const dataLength = dataset.data?.length || 0;

              if (dataLength === 0) return null;

              // Generate points with proper coordinates
              const points =
                dataset.data?.map((point: ChartDataPoint, i: number) => ({
                  x: scales.xScale(i, dataLength),
                  y: scales.yScale(point.value),
                })) || [];

              // Generate line path - ensure proper SVG path format
              const path = mergedLineOptions.smooth
                ? generateSmoothPath(points)
                : `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`;

              return (
                <g key={`dataset-${datasetIndex}`}>
                  {mergedLineOptions.showArea && (
                    <path
                      d={`${path} L ${points[points.length - 1]?.x || 0},${scales.yScale(0)} L ${points[0]?.x || 0},${scales.yScale(0)} Z`}
                      fill={color}
                      fillOpacity={mergedLineOptions.fillOpacity || 0.3}
                      className="c-chart__area-path"
                    />
                  )}
                  <path
                    d={path}
                    stroke={color}
                    strokeWidth={mergedLineOptions.lineWidth || 2}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="c-chart__line-path"
                  />
                  {mergedLineOptions.showDataPoints &&
                    dataset.data?.map((point: any, i: number) => {
                      const x = scales.xScale(i, dataLength);
                      const y = scales.yScale(point.value);
                      const isHovered =
                        hoveredPoint?.datasetIndex === datasetIndex &&
                        hoveredPoint?.pointIndex === i;

                      return (
                        <g key={`point-${i}`}>
                          <circle
                            cx={x}
                            cy={y}
                            r={
                              isHovered
                                ? mergedLineOptions.pointRadius! * 1.5
                                : mergedLineOptions.pointRadius
                            }
                            fill={color}
                            stroke="white"
                            strokeWidth={isHovered ? 2 : 1}
                            className={`c-chart__data-point ${isHovered ? 'c-chart__data-point--hovered' : ''}`}
                            onMouseEnter={e => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              handlers.onPointHover(
                                datasetIndex,
                                i,
                                x,
                                y,
                                rect.left + rect.width / 2,
                                rect.top + rect.height / 2
                              );
                            }}
                            onMouseLeave={handlers.onPointLeave}
                            onClick={() => handlers.onDataPointClick?.(point, datasetIndex, i)}
                            style={{ cursor: 'pointer' }}
                          />
                          {mergedLineOptions.showPointLabels && (
                            <text
                              x={x}
                              y={y - 15}
                              textAnchor="middle"
                              fontSize="12"
                              fill={color}
                              className="c-chart__point-label"
                            >
                              {point.value}
                            </text>
                          )}
                        </g>
                      );
                    })}
                </g>
              );
            })}
            {showTooltips &&
              hoveredPoint &&
              renderedDatasets[hoveredPoint.datasetIndex]?.data?.[hoveredPoint.pointIndex] && (
                <ChartTooltip
                  dataPoint={
                    renderedDatasets[hoveredPoint.datasetIndex]!.data![hoveredPoint.pointIndex]!
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
          type="line"
          datasets={processedDatasets}
          config={config}
          renderContent={renderContent}
          onDataPointClick={onDataPointClick}
          interactive={true}
          enableAccessibility={true}
          {...props}
        />
      );
    }
  )
);

LineChart.displayName = 'LineChart';
export default LineChart;
export type { LineChartProps };
