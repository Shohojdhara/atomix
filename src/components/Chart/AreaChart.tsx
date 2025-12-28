import { forwardRef, memo } from 'react';
import BaseChart from './BaseChart';
import ChartTooltip from './ChartTooltip';
import { LineChartProps } from './LineChart';
import { ChartRenderContentParams, ChartDataset, ChartDataPoint } from './types';

interface AreaChartProps extends Omit<LineChartProps, 'lineOptions'> {
  /**
   * Area chart specific options (extends line chart options)
   */
  areaOptions?: LineChartProps['lineOptions'];
}

const AreaChart = memo(
  forwardRef<HTMLDivElement, AreaChartProps>(
    ({ datasets = [], config = {}, areaOptions = {}, onDataPointClick, ...props }, ref) => {
      // Area chart is essentially a line chart with area fill enabled
      const enhancedAreaOptions = {
        showArea: true,
        fillOpacity: 0.3,
        useGradient: true,
        ...areaOptions,
      };

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

        return (
          <>
            {renderedDatasets.map((dataset: ChartDataset, datasetIndex: number) => {
              const color = dataset.color || colors[datasetIndex];
              const data = dataset.data || [];

              if (data.length === 0) return null;

              // Generate area path
              const areaPoints = data.map((point: ChartDataPoint, index: number) => ({
                x: scales.xScale(index, data.length),
                y: scales.yScale(point.value),
              }));

              const areaPath = `M ${areaPoints.map((p) => `${p.x},${p.y}`).join(' L ')} L ${areaPoints[areaPoints.length - 1]?.x},${scales.height} L ${areaPoints[0]?.x},${scales.height} Z`;

              return (
                <g key={`dataset-${datasetIndex}`}>
                  <path
                    d={areaPath}
                    fill={color}
                    fillOpacity={enhancedAreaOptions.fillOpacity || 0.3}
                    className="c-chart__area-fill"
                  />
                  {data.map((point: ChartDataPoint, index: number) => {
                    const x = scales.xScale(index, data.length);
                    const y = scales.yScale(point.value);
                    const isHovered =
                      hoveredPoint?.datasetIndex === datasetIndex &&
                      hoveredPoint?.pointIndex === index;

                    return (
                      <circle
                        key={`point-${index}`}
                        cx={x}
                        cy={y}
                        r={isHovered ? 6 : 4}
                        fill={color}
                        stroke="white"
                        strokeWidth={isHovered ? 2 : 1}
                        className={`c-chart__area-point ${isHovered ? 'c-chart__area-point--hovered' : ''}`}
                        onClick={() => handlers.onDataPointClick?.(point, datasetIndex, index)}
                        onMouseEnter={e => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          handlers.onPointHover(
                            datasetIndex,
                            index,
                            x,
                            y,
                            rect.left + rect.width / 2,
                            rect.top + rect.height / 2
                          );
                        }}
                        onMouseLeave={handlers.onPointLeave}
                        style={{ cursor: 'pointer' }}
                      />
                    );
                  })}
                </g>
              );
            })}
            {showTooltips && hoveredPoint && (
              <ChartTooltip
                dataPoint={
                  renderedDatasets[hoveredPoint.datasetIndex]?.data?.[hoveredPoint.pointIndex] ?? {
                    label: '',
                    value: 0,
                    color: '',
                  }
                }
                datasetLabel={renderedDatasets[hoveredPoint.datasetIndex]?.label}
                datasetColor={
                  renderedDatasets[hoveredPoint.datasetIndex]?.color ||
                  colors[hoveredPoint.datasetIndex]
                }
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
          type="area"
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

AreaChart.displayName = 'AreaChart';
export default AreaChart;
export type { AreaChartProps };
