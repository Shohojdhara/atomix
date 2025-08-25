import { forwardRef, memo, ReactElement, useCallback, useState } from 'react';
import { ChartProps } from '../../lib/types/components';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';
import ChartTooltip from './ChartTooltip';

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

      const [hoveredPoint, setHoveredPoint] = useState<{
        datasetIndex: number;
        pointIndex: number;
        clientX: number;
        clientY: number;
      } | null>(null);

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

          const centerX = scales.width / 2;
          const centerY = scales.height / 2;
          const radius = Math.min(centerX, centerY) * 0.8;

          const firstDataset = renderedDatasets[0];
          const dataPoints = firstDataset.data || [];
          const angleStep = (2 * Math.PI) / dataPoints.length;

          // Calculate scale
          const maxValue =
            scaleMax ||
            Math.max(
              ...renderedDatasets.flatMap((d: any) => d.data?.map((p: any) => p.value) || [])
            );
          const minValue = scaleMin;
          const valueRange = maxValue - minValue;

          // Generate grid levels
          const gridElements = [];
          if (showGrid) {
            for (let level = 1; level <= gridLevels; level++) {
              const levelRadius = (radius * level) / gridLevels;
              const points = dataPoints.map((_: any, i: number) => {
                const angle = i * angleStep - Math.PI / 2;
                return {
                  x: centerX + Math.cos(angle) * levelRadius,
                  y: centerY + Math.sin(angle) * levelRadius,
                };
              });

              const pathData = `M ${points.map((p: any) => `${p.x},${p.y}`).join(' L ')} Z`;

              gridElements.push(
                <path
                  key={`grid-${level}`}
                  d={pathData}
                  fill="none"
                  className="c-chart__radar-grid"
                />
              );
            }

            // Add axis lines
            dataPoints.forEach((_: any, i: number) => {
              const angle = i * angleStep - Math.PI / 2;
              const endX = centerX + Math.cos(angle) * radius;
              const endY = centerY + Math.sin(angle) * radius;

              gridElements.push(
                <line
                  key={`axis-${i}`}
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  className="c-chart__radar-axis"
                />
              );
            });
          }

          // Generate axis labels
          const labelElements: ReactElement[] = [];
          if (showAxisLabels) {
            dataPoints.forEach((point: any, i: number) => {
              const angle = i * angleStep - Math.PI / 2;
              const labelRadius = radius + 20;
              const labelX = centerX + Math.cos(angle) * labelRadius;
              const labelY = centerY + Math.sin(angle) * labelRadius;

              labelElements.push(
                <text
                  key={`label-${i}`}
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="c-chart__radar-label"
                >
                  {point.label}
                </text>
              );
            });
          }

          // Generate data paths
          const dataElements = renderedDatasets.map((dataset: any, datasetIndex: number) => {
            const color = dataset.color || colors[datasetIndex];
            const points =
              dataset.data?.map((point: any, i: number) => {
                const angle = i * angleStep - Math.PI / 2;
                const normalizedValue = (point.value - minValue) / valueRange;
                const pointRadius = radius * normalizedValue;
                return {
                  x: centerX + Math.cos(angle) * pointRadius,
                  y: centerY + Math.sin(angle) * pointRadius,
                  originalPoint: point,
                  angle,
                  radius: pointRadius,
                };
              }) || [];

            const pathData = smooth
              ? generateSmoothRadarPath(points)
              : `M ${points.map((p: any) => `${p.x},${p.y}`).join(' L ')} Z`;

            const elements = [];

            // Fill area
            if (fillArea) {
              elements.push(
                <path
                  key={`fill-${datasetIndex}`}
                  d={pathData}
                  fill={color}
                  className="c-chart__radar-fill"
                  style={{ opacity: fillOpacity }}
                />
              );
            }

            // Line
            elements.push(
              <path
                key={`line-${datasetIndex}`}
                d={pathData}
                fill="none"
                stroke={color}
                className="c-chart__radar-line"
                style={{ strokeWidth: lineWidth }}
              />
            );

            // Data points
            if (showDataPoints) {
              points.forEach((point: any, i: number) => {
                elements.push(
                  <circle
                    key={`point-${datasetIndex}-${i}`}
                    cx={point.x}
                    cy={point.y}
                    r={pointRadius}
                    fill={color}
                    className="c-chart__radar-point"
                    onClick={() =>
                      handlers.onDataPointClick?.(point.originalPoint, datasetIndex, i)
                    }
                    onMouseEnter={e => {
                      const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                      const clientX = rect ? rect.left + point.x : e.clientX;
                      const clientY = rect ? rect.top + point.y : e.clientY;
                      setHoveredPoint({ datasetIndex, pointIndex: i, clientX, clientY });
                    }}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                );
              });
            }

            return <g key={`dataset-${datasetIndex}`}>{elements}</g>;
          });

          return (
            <g>
              {gridElements}
              {dataElements}
              {labelElements}
            </g>
          );
        },
        [
          gridLevels,
          showGrid,
          showAxisLabels,
          fillArea,
          fillOpacity,
          showDataPoints,
          pointRadius,
          lineWidth,
          smooth,
          scaleMin,
          scaleMax,
        ]
      );

      const generateSmoothRadarPath = useCallback((points: any[]) => {
        if (points.length < 3) return `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`;

        let path = `M ${points[0].x},${points[0].y}`;

        for (let i = 0; i < points.length; i++) {
          const current = points[i];
          const next = points[(i + 1) % points.length];
          const prev = points[i === 0 ? points.length - 1 : i - 1];

          const cp1x = current.x + (next.x - prev.x) * 0.1;
          const cp1y = current.y + (next.y - prev.y) * 0.1;
          const cp2x = next.x - (points[(i + 2) % points.length].x - current.x) * 0.1;
          const cp2y = next.y - (points[(i + 2) % points.length].y - current.y) * 0.1;

          path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
        }

        return path + ' Z';
      }, []);

      return (
        <Chart ref={ref} type="radar" datasets={datasets} config={config} {...props}>
          <ChartRenderer
            datasets={datasets}
            config={config}
            onDataPointClick={onDataPointClick}
            renderContent={renderContent}
          />
          {hoveredPoint && (
            <ChartTooltip
              dataPoint={datasets[hoveredPoint.datasetIndex]?.data?.[hoveredPoint.pointIndex]!}
              datasetLabel={datasets[hoveredPoint.datasetIndex]?.label}
              datasetColor={datasets[hoveredPoint.datasetIndex]?.color}
              position={{ x: hoveredPoint.clientX, y: hoveredPoint.clientY }}
              visible={true}
            />
          )}
        </Chart>
      );
    }
  )
);

RadarChart.displayName = 'RadarChart';
export default RadarChart;
