import { ChartDataPoint } from '../../lib/types/components';
import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from '../../lib/types/components';
import Chart from './Chart';

interface ScatterDataPoint extends ChartDataPoint {
  /**
   * X-axis value for scatter plot
   */
  x: number;

  /**
   * Y-axis value for scatter plot
   */
  y: number;

  /**
   * Size of the point (optional)
   */
  size?: number;

  /**
   * Shape of the point
   */
  shape?: 'circle' | 'square' | 'triangle' | 'diamond' | 'cross';
}

interface ScatterChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Scatter chart specific options
   */
  scatterOptions?: {
    /**
     * Default point size
     */
    defaultPointSize?: number;

    /**
     * Minimum point size
     */
    minPointSize?: number;

    /**
     * Maximum point size
     */
    maxPointSize?: number;

    /**
     * Whether to show regression line
     */
    showRegressionLine?: boolean;

    /**
     * Regression line color
     */
    regressionLineColor?: string;

    /**
     * Whether to show trend line
     */
    showTrendLine?: boolean;

    /**
     * Whether to enable point clustering
     */
    enableClustering?: boolean;

    /**
     * Cluster colors
     */
    clusterColors?: string[];

    /**
     * Whether to show confidence interval
     */
    showConfidenceInterval?: boolean;

    /**
     * Confidence level (0-1)
     */
    confidenceLevel?: number;

    /**
     * Whether to enable point selection
     */
    enableSelection?: boolean;

    /**
     * Whether to show quadrant lines
     */
    showQuadrants?: boolean;

    /**
     * Quadrant center point
     */
    quadrantCenter?: { x: number; y: number };

    /**
     * Quadrant labels
     */
    quadrantLabels?: {
      topLeft?: string;
      topRight?: string;
      bottomLeft?: string;
      bottomRight?: string;
    };

    /**
     * Whether to enable zooming and panning
     */
    enableZoomPan?: boolean;

    /**
     * Custom point renderer
     */
    customPointRenderer?: (
      point: ScatterDataPoint,
      index: number,
      isSelected: boolean
    ) => React.ReactNode;
  };

  /**
   * Scatter chart datasets with x,y coordinates
   */
  scatterDatasets?: Array<{
    label: string;
    data: ScatterDataPoint[];
    color?: string;
    visible?: boolean;
  }>;
}

const ScatterChart = memo(
  forwardRef<HTMLDivElement, ScatterChartProps>(
    (
      {
        datasets = [],
        scatterDatasets = [],
        config = {},
        scatterOptions = {
          defaultPointSize: 4,
          minPointSize: 2,
          maxPointSize: 20,
          showRegressionLine: false,
          regressionLineColor: '#ff6b6b',
          showTrendLine: false,
          enableClustering: false,
          clusterColors: ['#7AFFD7', '#1AFFD2', '#00E6C3'],
          showConfidenceInterval: false,
          confidenceLevel: 0.95,
          enableSelection: false,
          showQuadrants: false,
          quadrantCenter: { x: 0, y: 0 },
          enableZoomPan: false,
        },
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      const [selectedPoints, setSelectedPoints] = useState<Set<string>>(new Set());
      const [hoveredPoint, setHoveredPoint] = useState<{
        datasetIndex: number;
        pointIndex: number;
        x: number;
        y: number;
        data: ScatterDataPoint;
      } | null>(null);

      // Use scatter datasets if provided, otherwise convert regular datasets
      const effectiveDatasets = useMemo(() => {
        if (scatterDatasets.length > 0) {
          return scatterDatasets;
        }

        // Convert regular datasets to scatter format
        return datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.map((point, index) => ({
            ...point,
            x: index,
            y: point.value,
            size: scatterOptions.defaultPointSize,
            shape: 'circle' as const,
          })),
        }));
      }, [datasets, scatterDatasets, scatterOptions.defaultPointSize]);

      // Calculate linear regression
      const calculateRegression = useCallback((data: ScatterDataPoint[]) => {
        if (data.length < 2) return null;

        const n = data.length;
        const sumX = data.reduce((sum, point) => sum + point.x, 0);
        const sumY = data.reduce((sum, point) => sum + point.y, 0);
        const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
        const sumXX = data.reduce((sum, point) => sum + point.x * point.x, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        return { slope, intercept };
      }, []);

      // Calculate K-means clustering
      const calculateClusters = useCallback((data: ScatterDataPoint[], k: number = 3) => {
        if (data.length < k) return data.map((_, i) => i % k);

        // Simple K-means implementation
        let centroids = Array.from({ length: k }, (_, i) => ({
          x: data[Math.floor((i * data.length) / k)]?.x || 0,
          y: data[Math.floor((i * data.length) / k)]?.y || 0,
        }));

        let clusters = new Array(data.length);
        let changed = true;
        let iterations = 0;

        while (changed && iterations < 100) {
          changed = false;
          iterations++;

          // Assign points to nearest centroid
          for (let i = 0; i < data.length; i++) {
            const point = data[i];
            if (!point) continue;
              
            let minDistance = Infinity;
            let nearestCluster = 0;

            for (let j = 0; j < k; j++) {
              const distance = Math.sqrt(
                Math.pow(point.x - (centroids[j]?.x || 0), 2) + Math.pow(point.y - (centroids[j]?.y || 0), 2)
              );
              if (distance < minDistance) {
                minDistance = distance;
                nearestCluster = j;
              }
            }

            if (clusters[i] !== nearestCluster) {
              clusters[i] = nearestCluster;
              changed = true;
            }
          }

          // Update centroids
          for (let j = 0; j < k; j++) {
            const clusterPoints = data.filter((_, idx) => clusters[idx] === j);
            if (clusterPoints.length > 0) {
              centroids[j] = {
                x: clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length,
                y: clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length,
              };
            }
          }
        }

        return clusters;
      }, []);

      // Handle point selection
      const handlePointSelect = useCallback(
        (datasetIndex: number, pointIndex: number) => {
          if (!scatterOptions.enableSelection) return;

          const pointKey = `${datasetIndex}-${pointIndex}`;
          const newSelectedPoints = new Set(selectedPoints);

          if (newSelectedPoints.has(pointKey)) {
            newSelectedPoints.delete(pointKey);
          } else {
            newSelectedPoints.add(pointKey);
          }

          setSelectedPoints(newSelectedPoints);
        },
        [selectedPoints, scatterOptions.enableSelection]
      );

      // Generate chart content
      const chartContent = useMemo(() => {
        if (!effectiveDatasets.length) return null;

        const width = 800;
        const height = 400;
        const padding = { top: 40, right: 50, bottom: 60, left: 70 };
        const innerWidth = width - padding.left - padding.right;
        const innerHeight = height - padding.top - padding.bottom;

        // Calculate scales
        const allPoints = effectiveDatasets.flatMap(dataset => dataset.data);
        const xValues = allPoints.map(p => p.x);
        const yValues = allPoints.map(p => p.y);

        const minX = config.xAxis?.min ?? Math.min(...xValues);
        const maxX = config.xAxis?.max ?? Math.max(...xValues);
        const minY = config.yAxis?.min ?? Math.min(...yValues);
        const maxY = config.yAxis?.max ?? Math.max(...yValues);

        const xScale = (value: number) =>
          padding.left + ((value - minX) / (maxX - minX)) * innerWidth;
        const yScale = (value: number) =>
          padding.top + innerHeight - ((value - minY) / (maxY - minY)) * innerHeight;

        // Generate colors
        const defaultColors = ['#7AFFD7', '#1AFFD2', '#00E6C3', '#4DFF9F', '#1AFF85', '#00E66B'];

        // Calculate clusters if enabled
        const clusterData = scatterOptions.enableClustering
          ? calculateClusters(allPoints, scatterOptions.clusterColors?.length || 3)
          : null;

        // Generate chart elements
        const chartElements = [];

        // Quadrant lines
        if (scatterOptions.showQuadrants && scatterOptions.quadrantCenter) {
          const centerX = xScale(scatterOptions.quadrantCenter.x);
          const centerY = yScale(scatterOptions.quadrantCenter.y);

          chartElements.push(
            <g key="quadrants">
              <line
                x1={centerX}
                y1={padding.top}
                x2={centerX}
                y2={height - padding.bottom}
                stroke="#e5e7eb"
                strokeWidth={1}
                strokeDasharray="4,4"
                opacity={0.6}
              />
              <line
                x1={padding.left}
                y1={centerY}
                x2={width - padding.right}
                y2={centerY}
                stroke="#e5e7eb"
                strokeWidth={1}
                strokeDasharray="4,4"
                opacity={0.6}
              />
            </g>
          );

          // Quadrant labels
          if (scatterOptions.quadrantLabels) {
            const labels = scatterOptions.quadrantLabels;
            const labelOffset = 10;

            chartElements.push(
              <g key="quadrant-labels" className="quadrant-labels">
                {labels.topLeft && (
                  <text
                    x={centerX - labelOffset}
                    y={centerY - labelOffset}
                    textAnchor="end"
                    dominantBaseline="bottom"
                    fontSize="12"
                    fill="#6b7280"
                    opacity={0.8}
                  >
                    {labels.topLeft}
                  </text>
                )}
                {labels.topRight && (
                  <text
                    x={centerX + labelOffset}
                    y={centerY - labelOffset}
                    textAnchor="start"
                    dominantBaseline="bottom"
                    fontSize="12"
                    fill="#6b7280"
                    opacity={0.8}
                  >
                    {labels.topRight}
                  </text>
                )}
                {labels.bottomLeft && (
                  <text
                    x={centerX - labelOffset}
                    y={centerY + labelOffset}
                    textAnchor="end"
                    dominantBaseline="top"
                    fontSize="12"
                    fill="#6b7280"
                    opacity={0.8}
                  >
                    {labels.bottomLeft}
                  </text>
                )}
                {labels.bottomRight && (
                  <text
                    x={centerX + labelOffset}
                    y={centerY + labelOffset}
                    textAnchor="start"
                    dominantBaseline="top"
                    fontSize="12"
                    fill="#6b7280"
                    opacity={0.8}
                  >
                    {labels.bottomRight}
                  </text>
                )}
              </g>
            );
          }
        }

        // Regression line
        if (scatterOptions.showRegressionLine) {
          const regression = calculateRegression(allPoints);
          if (regression) {
            const x1 = minX;
            const y1 = regression.slope * x1 + regression.intercept;
            const x2 = maxX;
            const y2 = regression.slope * x2 + regression.intercept;

            chartElements.push(
              <line
                key="regression-line"
                x1={xScale(x1)}
                y1={yScale(y1)}
                x2={xScale(x2)}
                y2={yScale(y2)}
                stroke={scatterOptions.regressionLineColor}
                strokeWidth={2}
                opacity={0.8}
              />
            );
          }
        }

        // Scatter points
        effectiveDatasets.forEach((dataset, datasetIndex) => {
          const color = dataset.color || defaultColors[datasetIndex % defaultColors.length];

          dataset.data.forEach((point, pointIndex) => {
            const x = xScale(point.x);
            const y = yScale(point.y);
            const pointKey = `${datasetIndex}-${pointIndex}`;
            const isSelected = selectedPoints.has(pointKey);
            const isHovered =
              hoveredPoint?.datasetIndex === datasetIndex &&
              hoveredPoint?.pointIndex === pointIndex;

            // Determine point color (cluster or dataset color)
            let pointColor = color;
            if (scatterOptions.enableClustering && clusterData) {
              const globalIndex =
                effectiveDatasets
                  .slice(0, datasetIndex)
                  .reduce((sum, ds) => sum + ds.data.length, 0) + pointIndex;
              const clusterIndex = clusterData[globalIndex];
              pointColor = scatterOptions.clusterColors?.[clusterIndex] || color;
            }

            // Determine point size
            const baseSize = point.size || scatterOptions.defaultPointSize || 4;
            const size = isSelected ? baseSize * 1.5 : isHovered ? baseSize * 1.2 : baseSize;

            // Render custom point or default
            if (scatterOptions.customPointRenderer) {
              chartElements.push(
                <g
                  key={pointKey}
                  transform={`translate(${x}, ${y})`}
                  onClick={() => {
                    handlePointSelect(datasetIndex, pointIndex);
                    onDataPointClick?.(point, datasetIndex, pointIndex);
                  }}
                  onMouseEnter={() =>
                    setHoveredPoint({ datasetIndex, pointIndex, x, y, data: point })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {scatterOptions.customPointRenderer(point, pointIndex, isSelected)}
                </g>
              );
            } else {
              // Render point based on shape
              const renderPoint = () => {
                const commonProps = {
                  fill: pointColor,
                  stroke: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                  strokeWidth: isSelected ? 2 : 1,
                  className: CHART.DATA_POINT_CLASS,
                  onClick: () => {
                    handlePointSelect(datasetIndex, pointIndex);
                    onDataPointClick?.(point, datasetIndex, pointIndex);
                  },
                  onMouseEnter: () =>
                    setHoveredPoint({ datasetIndex, pointIndex, x, y, data: point }),
                  onMouseLeave: () => setHoveredPoint(null),
                  style: { cursor: 'pointer' },
                };

                switch (point.shape) {
                  case 'square':
                    return (
                      <rect
                        x={x - size / 2}
                        y={y - size / 2}
                        width={size}
                        height={size}
                        {...commonProps}
                      />
                    );
                  case 'triangle':
                    return (
                      <polygon
                        points={`${x},${y - size} ${x - size},${y + size} ${x + size},${y + size}`}
                        {...commonProps}
                      />
                    );
                  case 'diamond':
                    return (
                      <polygon
                        points={`${x},${y - size} ${x + size},${y} ${x},${y + size} ${x - size},${y}`}
                        {...commonProps}
                      />
                    );
                  case 'cross':
                    return (
                      <g {...commonProps}>
                        <line
                          x1={x - size}
                          y1={y}
                          x2={x + size}
                          y2={y}
                          stroke={pointColor}
                          strokeWidth={2}
                        />
                        <line
                          x1={x}
                          y1={y - size}
                          x2={x}
                          y2={y + size}
                          stroke={pointColor}
                          strokeWidth={2}
                        />
                      </g>
                    );
                  default: // circle
                    return <circle cx={x} cy={y} r={size} {...commonProps} />;
                }
              };

              chartElements.push(<g key={pointKey}>{renderPoint()}</g>);
            }
          });
        });

        // Grid
        const grid = (
          <g className={CHART.GRID_CLASS}>
            {config.xAxis?.showGrid &&
              Array.from({ length: 6 }).map((_, i) => {
                const value = minX + ((maxX - minX) * i) / 5;
                return (
                  <line
                    key={`x-grid-${i}`}
                    x1={xScale(value)}
                    y1={padding.top}
                    x2={xScale(value)}
                    y2={height - padding.bottom}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="2,2"
                    opacity={0.3}
                  />
                );
              })}
            {config.yAxis?.showGrid &&
              Array.from({ length: 6 }).map((_, i) => {
                const value = minY + ((maxY - minY) * i) / 5;
                return (
                  <line
                    key={`y-grid-${i}`}
                    x1={padding.left}
                    y1={yScale(value)}
                    x2={width - padding.right}
                    y2={yScale(value)}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="2,2"
                    opacity={0.3}
                  />
                );
              })}
          </g>
        );

        // Axes
        const axes = (
          <>
            <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--x`}>
              <line
                x1={padding.left}
                y1={height - padding.bottom}
                x2={width - padding.right}
                y2={height - padding.bottom}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              {Array.from({ length: 6 }).map((_, i) => {
                const value = minX + ((maxX - minX) * i) / 5;
                return (
                  <g key={`x-axis-${i}`}>
                    <line
                      x1={xScale(value)}
                      y1={height - padding.bottom}
                      x2={xScale(value)}
                      y2={height - padding.bottom + 5}
                      stroke="#e5e7eb"
                      strokeWidth={1}
                    />
                    <text
                      x={xScale(value)}
                      y={height - padding.bottom + 20}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#374151"
                    >
                      {config.xAxis?.formatter ? config.xAxis.formatter(value) : value.toFixed(1)}
                    </text>
                  </g>
                );
              })}
              {config.xAxis?.label && (
                <text
                  x={width / 2}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="14"
                  fill="#374151"
                  fontWeight="bold"
                >
                  {config.xAxis.label}
                </text>
              )}
            </g>

            <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--y`}>
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left}
                y2={height - padding.bottom}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              {Array.from({ length: 6 }).map((_, i) => {
                const value = minY + ((maxY - minY) * i) / 5;
                return (
                  <g key={`y-axis-${i}`}>
                    <line
                      x1={padding.left - 5}
                      y1={yScale(value)}
                      x2={padding.left}
                      y2={yScale(value)}
                      stroke="#e5e7eb"
                      strokeWidth={1}
                    />
                    <text
                      x={padding.left - 10}
                      y={yScale(value)}
                      textAnchor="end"
                      dominantBaseline="middle"
                      fontSize="12"
                      fill="#374151"
                    >
                      {config.yAxis?.formatter ? config.yAxis.formatter(value) : value.toFixed(1)}
                    </text>
                  </g>
                );
              })}
              {config.yAxis?.label && (
                <text
                  x={20}
                  y={height / 2}
                  textAnchor="middle"
                  fontSize="14"
                  fill="#374151"
                  fontWeight="bold"
                  transform={`rotate(-90, 20, ${height / 2})`}
                >
                  {config.yAxis.label}
                </text>
              )}
            </g>
          </>
        );

        return (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {grid}
            {axes}
            {chartElements}
          </svg>
        );
      }, [
        effectiveDatasets,
        config,
        scatterOptions,
        selectedPoints,
        hoveredPoint,
        calculateRegression,
        calculateClusters,
        handlePointSelect,
        onDataPointClick,
      ]);

      // Tooltip
      const tooltip = useMemo(() => {
        if (!hoveredPoint) return null;

        return (
          <div
            className={CHART.TOOLTIP_CLASS}
            style={{
              position: 'absolute',
              left: hoveredPoint.x + 10,
              top: hoveredPoint.y - 10,
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{hoveredPoint.data.label}</div>
            <div>X: {hoveredPoint.data.x}</div>
            <div>Y: {hoveredPoint.data.y}</div>
            {hoveredPoint.data.metadata && (
              <div style={{ marginTop: '4px', fontSize: '11px', opacity: 0.8 }}>
                {Object.entries(hoveredPoint.data.metadata).map(([key, value]) => (
                  <div key={key}>
                    {key}: {String(value)}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }, [hoveredPoint]);

      // Legend
      const legend = useMemo(() => {
        if (!config.showLegend || !effectiveDatasets.length) return null;

        return (
          <div className={CHART.LEGEND_CLASS}>
            {effectiveDatasets.map((dataset, i) => (
              <div
                key={`legend-${i}`}
                className={CHART.LEGEND_ITEM_CLASS}
                data-visible={dataset.visible !== false}
                onClick={() => props.onLegendItemClick?.(i, dataset.visible === false)}
              >
                <div
                  className={CHART.LEGEND_COLOR_CLASS}
                  style={{ backgroundColor: dataset.color || `#7c3aed` }}
                />
                <span className={CHART.LEGEND_LABEL_CLASS}>{dataset.label}</span>
              </div>
            ))}
          </div>
        );
      }, [effectiveDatasets, config.showLegend, props.onLegendItemClick]);

      return (
        <Chart 
          ref={ref} 
          type="scatter" 
          datasets={datasets} 
          config={config} 
          {...props}
        >
          <div className={CHART.CANVAS_CLASS} style={{ position: 'relative' }}>
            {chartContent}
            {tooltip}
          </div>
          {legend}
        </Chart>
      );
    }
  )
);

ScatterChart.displayName = 'ScatterChart';
export default ScatterChart;
export type { ScatterChartProps, ScatterDataPoint };
