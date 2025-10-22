import { forwardRef, memo, useState } from 'react';
import BaseChart from './BaseChart';
import ChartTooltip from './ChartTooltip';
import { ChartProps } from '../../lib/types/components';

export interface RadarChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Radar chart specific options
   */
  radarOptions?: {
    /**
     * Number of grid levels
     */
    gridLevels?: number;
    /**
     * Whether to show grid lines
     */
    showGrid?: boolean;
    /**
     * Whether to show axis labels
     */
    showAxisLabels?: boolean;
    /**
     * Whether to fill the area
     */
    fillArea?: boolean;
    /**
     * Fill opacity (0-1)
     */
    fillOpacity?: number;
    /**
     * Whether to show data points
     */
    showDataPoints?: boolean;
    /**
     * Point radius
     */
    pointRadius?: number;
    /**
     * Line width
     */
    lineWidth?: number;
    /**
     * Whether to use smooth curves
     */
    smooth?: boolean;
    /**
     * Scale type
     */
    scaleType?: 'linear' | 'logarithmic';
    /**
     * Minimum scale value
     */
    scaleMin?: number;
    /**
     * Maximum scale value
     */
    scaleMax?: number;
  };
}

const RadarChart = memo(
  forwardRef<HTMLDivElement, RadarChartProps>(
    ({ datasets = [], config = {}, radarOptions = {}, onDataPointClick, ...props }, ref) => {
      const {
        gridLevels = 5,
        showGrid = true,
        showAxisLabels = true,
        fillArea = true,
        fillOpacity = 0.3,
        showDataPoints = true,
        pointRadius = 4,
        lineWidth = 2,
        smooth = false,
        scaleType = 'linear',
        scaleMin = 0,
        scaleMax,
      } = radarOptions;

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

        const centerX = scales.width / 2;
        const centerY = scales.height / 2;
        const radius = Math.min(centerX, centerY) * 0.8;

        const firstDataset = renderedDatasets[0];
        const dataPoints = firstDataset.data || [];
        const angleStep = (2 * Math.PI) / dataPoints.length;

        // Calculate value bounds
        let minValue = scaleMin;
        let maxValue = scaleMax;

        if (minValue === undefined || maxValue === undefined) {
          const allValues = renderedDatasets.flatMap(dataset =>
            dataset.data?.map((d: any) => d.value) || []
          );
          if (minValue === undefined) minValue = Math.min(scaleMin, ...allValues);
          if (maxValue === undefined) maxValue = Math.max(scaleMax || 0, ...allValues);
        }

        const valueRange = maxValue - minValue;

        // Generate grid lines
        const gridLines = [];
        if (showGrid) {
          // Concentric circles
          for (let i = 1; i <= gridLevels; i++) {
            const r = (radius * i) / gridLevels;
            gridLines.push(
              <circle
                key={`grid-circle-${i}`}
                cx={centerX}
                cy={centerY}
                r={r}
                className="c-chart__radar-grid-line"
                fill="none"
                stroke="var(--atomix-border-color)"
                strokeWidth="1"
              />
            );
          }

          // Radial lines
          for (let i = 0; i < dataPoints.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            gridLines.push(
              <line
                key={`grid-radial-${i}`}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                className="c-chart__radar-grid-line"
                stroke="var(--atomix-border-color)"
                strokeWidth="1"
              />
            );
          }
        }

        // Generate axis labels
        const axisLabels = [];
        if (showAxisLabels) {
          for (let i = 0; i < dataPoints.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + (radius + 20) * Math.cos(angle);
            const y = centerY + (radius + 20) * Math.sin(angle);

            axisLabels.push(
              <text
                key={`label-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="c-chart__radar-axis-label"
              >
                {dataPoints[i]?.label}
              </text>
            );
          }
        }

        // Generate data paths
        const dataPaths = renderedDatasets.map((dataset: any, datasetIndex: number) => {
          const color = dataset.color || colors[datasetIndex % colors.length];
          const points = [];

          // Calculate points
          for (let i = 0; i < dataset.data?.length; i++) {
            const value = dataset.data[i]?.value || 0;
            const normalizedValue = valueRange > 0 ? (value - minValue) / valueRange : 0;
            const r = radius * normalizedValue;
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);

            points.push({ x, y, value, point: dataset.data[i] });
          }

          if (points.length === 0) return null;

          // Generate path
          let path = '';
          if (smooth && points.length > 2) {
            // For smooth curves, we would implement a more complex algorithm
            // For now, we'll just connect the points with straight lines
            path = `M ${points[0].x},${points[0].y}`;
            for (let i = 1; i < points.length; i++) {
              path += ` L ${points[i].x},${points[i].y}`;
            }
            path += ` L ${points[0].x},${points[0].y} Z`;
          } else {
            path = `M ${points[0].x},${points[0].y}`;
            for (let i = 1; i < points.length; i++) {
              path += ` L ${points[i].x},${points[i].y}`;
            }
            path += ` L ${points[0].x},${points[0].y} Z`;
          }

          return (
            <g key={`dataset-${datasetIndex}`}>
              {fillArea && (
                <path
                  d={path}
                  fill={color}
                  fillOpacity={fillOpacity}
                  className="c-chart__radar-area"
                />
              )}
              <path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={lineWidth}
                className="c-chart__radar-line"
              />
              {showDataPoints &&
                points.map((point, pointIndex) => {
                  const isHovered =
                    hoveredPoint?.datasetIndex === datasetIndex &&
                    hoveredPoint?.pointIndex === pointIndex;

                  return (
                    <g key={`point-${datasetIndex}-${pointIndex}`}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={isHovered ? pointRadius * 1.5 : pointRadius}
                        fill={color}
                        className="c-chart__radar-point"
                        onClick={() => handlers.onDataPointClick?.(point.point, datasetIndex, pointIndex)}
                        onMouseEnter={e => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          handlers.onPointHover(datasetIndex, pointIndex, point.x, point.y, rect.left + rect.width / 2, rect.top + rect.height / 2);
                        }}
                        onMouseLeave={handlers.onPointLeave}
                      />
                    </g>
                  );
                })}
            </g>
          );
        });

        return (
          <>
            <g>
              {gridLines}
              {dataPaths}
              {axisLabels}
            </g>
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
          type="radar"
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

RadarChart.displayName = 'RadarChart';
export default RadarChart;
