import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import BaseChart from './BaseChart';
import ChartTooltip from './ChartTooltip';
import { ChartProps, ChartRenderContentParams } from './types';

interface HeatmapDataPoint {
  x: string | number;
  y: string | number;
  value: number;
  label?: string;
  metadata?: Record<string, any>;
}

interface HeatmapChartProps extends Omit<ChartProps, 'type' | 'datasets' | 'variant' | 'data'> {
  /**
   * Heatmap data points
   */
  data: HeatmapDataPoint[];

  /**
   * Color scale configuration
   */
  colorScale?: {
    /**
     * Color scheme - enhanced with GitHub-style contribution colors
     */
    scheme:
      | 'viridis'
      | 'plasma'
      | 'inferno'
      | 'magma'
      | 'blues'
      | 'reds'
      | 'greens'
      | 'github'
      | 'custom';
    /**
     * Custom colors for custom scheme
     */
    colors?: string[];
    /**
     * Number of color steps
     */
    steps?: number;
    /**
     * Min value for color mapping
     */
    min?: number;
    /**
     * Max value for color mapping
     */
    max?: number;
  };

  /**
   * Cell configuration
   */
  cellConfig?: {
    /**
     * Cell width
     */
    width?: number;
    /**
     * Cell height
     */
    height?: number;
    /**
     * Spacing between cells
     */
    spacing?: number;
    /**
     * Border radius for cells
     */
    borderRadius?: number;
    /**
     * Whether to show cell labels
     */
    showLabels?: boolean;
  };

  /**
   * Whether to show color legend
   */
  showColorLegend?: boolean;

  /**
   * Whether to show grid lines
   */
  showGrid?: boolean;
}

// Predefined color schemes
const colorSchemes: Record<string, string[]> = {
  viridis: [
    '#440154',
    '#482777',
    '#3f4a8a',
    '#31678e',
    '#26838f',
    '#1f9d8a',
    '#6cce5a',
    '#b6de2b',
    '#fee825',
  ],
  plasma: ['#0d0887', '#5302a3', '#8b0aa5', '#b83289', '#db5c68', '#f48849', '#febd2a', '#f0f921'],
  inferno: [
    '#000004',
    '#1b0c41',
    '#4b0c6b',
    '#781c6d',
    '#a52c60',
    '#cf4446',
    '#ed6925',
    '#fb9b06',
    '#fcffa4',
  ],
  magma: [
    '#000004',
    '#1c1044',
    '#4f127b',
    '#812581',
    '#b5367a',
    '#e55964',
    '#fb8761',
    '#fec287',
    '#fcfdbf',
  ],
  blues: [
    'var(--atomix-blue-1)',
    'var(--atomix-blue-2)',
    'var(--atomix-blue-3)',
    'var(--atomix-blue-4)',
    'var(--atomix-blue-5)',
    'var(--atomix-blue-6)',
    'var(--atomix-blue-7)',
    'var(--atomix-blue-8)',
    'var(--atomix-blue-9)',
  ],
  reds: [
    'var(--atomix-red-1)',
    'var(--atomix-red-2)',
    'var(--atomix-red-3)',
    'var(--atomix-red-4)',
    'var(--atomix-red-5)',
    'var(--atomix-red-6)',
    'var(--atomix-red-7)',
    'var(--atomix-red-8)',
    'var(--atomix-red-9)',
  ],
  greens: [
    'var(--atomix-green-1)',
    'var(--atomix-green-2)',
    'var(--atomix-green-3)',
    'var(--atomix-green-4)',
    'var(--atomix-green-5)',
    'var(--atomix-green-6)',
    'var(--atomix-green-7)',
    'var(--atomix-green-8)',
    'var(--atomix-green-9)',
  ],
  github: [
    'var(--atomix-gray-2)',
    'var(--atomix-green-3)',
    'var(--atomix-green-4)',
    'var(--atomix-green-5)',
    'var(--atomix-green-6)',
  ],
};

const HeatmapChart = memo(
  forwardRef<HTMLDivElement, HeatmapChartProps>(
    (
      {
        data = [],
        config = {},
        colorScale = {
          scheme: 'viridis',
          steps: 9,
        },
        cellConfig = {
          width: 40,
          height: 40,
          spacing: 2,
          borderRadius: 4,
          showLabels: false,
        },
        showColorLegend = true,
        showGrid = true,
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      const [hoveredCell, setHoveredCell] = useState<HeatmapDataPoint | null>(null);

      // Process data into matrix format
      const processedData = useMemo(() => {
        if (!data.length) {
          return { matrix: [], xLabels: [], yLabels: [] };
        }

        // Extract unique x and y labels
        const xLabels = Array.from(new Set(data.map(d => d.x))).sort();
        const yLabels = Array.from(new Set(data.map(d => d.y))).sort();

        // Create matrix
        const matrix: (HeatmapDataPoint | null)[][] = [];
        yLabels.forEach(y => {
          const row: (HeatmapDataPoint | null)[] = [];
          xLabels.forEach(x => {
            const point = data.find(d => d.x === x && d.y === y);
            row.push(point || null);
          });
          matrix.push(row);
        });

        return { matrix, xLabels, yLabels };
      }, [data]);

      // Get color for a value
      const getColorForValue = useCallback(
        (value: number) => {
          if (!processedData.matrix.length) return 'var(--atomix-secondary-bg-subtle)';

          // Determine min/max values
          let minValue = colorScale.min;
          let maxValue = colorScale.max;

          if (minValue === undefined || maxValue === undefined) {
            const allValues = data.filter(d => d.value !== undefined).map(d => d.value);
            if (minValue === undefined) minValue = Math.min(...allValues);
            if (maxValue === undefined) maxValue = Math.max(...allValues);
          }

          // Get color scheme
          let colors: string[];
          if (colorScale.scheme === 'custom' && colorScale.colors) {
            colors = colorScale.colors;
          } else {
            const schemeKey = colorScale.scheme as keyof typeof colorSchemes;
            colors = (colorSchemes[schemeKey] || colorSchemes.viridis) as string[];
          }

          // Calculate steps
          const steps = colorScale.steps || colors.length;
          const valueRange = maxValue - minValue;
          if (valueRange === 0) return colors[0];

          // Normalize value and get color
          const normalizedValue = (value - minValue) / valueRange;
          const colorIndex = Math.min(Math.floor(normalizedValue * steps), steps - 1);
          const scaledIndex = Math.floor((colorIndex / steps) * (colors.length - 1));

          return colors[scaledIndex];
        },
        [processedData, colorScale, data]
      );

      const renderContent = ({
        scales,
        colors,
        datasets: renderedDatasets,
        handlers,
        hoveredPoint,
        toolbarState,
        config: renderConfig,
      }: ChartRenderContentParams) => {
        const { matrix, xLabels, yLabels } = processedData;

        // Use toolbar state if available, fallback to config for backward compatibility
        const showTooltips = toolbarState?.showTooltips ?? renderConfig?.showTooltips ?? true;
        if (!matrix.length) {
          return null;
        }

        const cellWidth = cellConfig.width || 40;
        const cellHeight = cellConfig.height || 40;
        const spacing = cellConfig.spacing || 2;
        const borderRadius = cellConfig.borderRadius || 4;

        const totalWidth = xLabels.length * (cellWidth + spacing) - spacing;
        const totalHeight = yLabels.length * (cellHeight + spacing) - spacing;

        const startX = 100; // Leave space for y-axis labels
        const startY = 50; // Leave space for x-axis labels

        return (
          <>
            <g>
              {/* Gradient definitions */}
              <defs>
                {showColorLegend && (() => {
                  const schemeColors = colorSchemes[colorScale.scheme] || colorSchemes.viridis;
                  if (!schemeColors || schemeColors.length === 0) return null;
                  return (
                    <linearGradient id="heatmap-legend-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      {schemeColors.map((color, i) => (
                        <stop
                          key={i}
                          offset={`${(i / (schemeColors.length - 1)) * 100}%`}
                          stopColor={color}
                        />
                      ))}
                    </linearGradient>
                  );
                })()}
              </defs>

              {/* Grid cells */}
              {matrix.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                  if (!cell) return null;

                  const x = startX + colIndex * (cellWidth + spacing);
                  const y = startY + rowIndex * (cellHeight + spacing);
                  const color = getColorForValue(cell.value);
                  const isHovered = hoveredCell === cell;

                  return (
                    <g key={`cell-${rowIndex}-${colIndex}`}>
                      <rect
                        x={x}
                        y={y}
                        width={cellWidth}
                        height={cellHeight}
                        rx={borderRadius}
                        ry={borderRadius}
                        fill={color}
                        className={`c-chart__heatmap-cell ${isHovered ? 'c-chart__heatmap-cell--hovered' : ''}`}
                        style={{
                          transition: 'all 0.2s ease',
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                          transformOrigin: 'center',
                        }}
                        onClick={() => {
                          if (cell) {
                            handlers.onDataPointClick?.({
                              ...cell,
                              label: cell.label || `${cell.x}, ${cell.y}`,
                              value: cell.value,
                            } as any, rowIndex, colIndex);
                          }
                        }}
                        onMouseEnter={e => {
                          setHoveredCell(cell);
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                      />
                      {cellConfig.showLabels && cell.label && (
                        <text
                          x={x + cellWidth / 2}
                          y={y + cellHeight / 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="c-chart__heatmap-label"
                        >
                          {cell.label}
                        </text>
                      )}
                    </g>
                  );
                });
              })}

              {/* X-axis labels */}
              {xLabels.map((label, index) => {
                const x = startX + index * (cellWidth + spacing) + cellWidth / 2;
                const y = startY + matrix.length * (cellHeight + spacing) + 20;

                return (
                  <text
                    key={`x-label-${index}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    className="c-chart__heatmap-axis-label"
                  >
                    {String(label)}
                  </text>
                );
              })}

              {/* Y-axis labels */}
              {yLabels.map((label, index) => {
                const x = startX - 20;
                const y = startY + index * (cellHeight + spacing) + cellHeight / 2;

                return (
                  <text
                    key={`y-label-${index}`}
                    x={x}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="middle"
                    className="c-chart__heatmap-axis-label"
                  >
                    {String(label)}
                  </text>
                );
              })}

              {/* Color legend */}
              {showColorLegend && (
                <g transform="translate(600, 100)">
                  <rect
                    x="0"
                    y="0"
                    width="20"
                    height="200"
                    fill="url(#heatmap-legend-gradient)"
                    stroke="var(--atomix-border-color)"
                    className="c-chart__grid"
                  />
                  <text x="-10" y="-10" className="c-chart__heatmap-legend-title">
                    Values
                  </text>
                  <text x="25" y="5" textAnchor="start" className="c-chart__heatmap-legend-label">
                    High
                  </text>
                  <text x="25" y="200" textAnchor="start" className="c-chart__heatmap-legend-label">
                    Low
                  </text>
                </g>
              )}
            </g>
            {showTooltips && hoveredPoint && renderedDatasets[hoveredPoint.datasetIndex]?.data?.[hoveredPoint.pointIndex] && (
              <ChartTooltip
                dataPoint={
                  renderedDatasets[hoveredPoint.datasetIndex]!.data![hoveredPoint.pointIndex]!
                }
                datasetLabel={renderedDatasets[hoveredPoint.datasetIndex]?.label}
                datasetColor={
                  renderedDatasets[hoveredPoint.datasetIndex]?.color ||
                  colors[hoveredPoint.datasetIndex % colors.length]
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

      // Convert data to datasets format for BaseChart
      const datasets = [
        {
          label: 'Heatmap Data',
          data: data.map(d => ({
            ...d,
            label: d.label || `${d.x}, ${d.y}`,
            value: d.value,
          })),
        },
      ];

      return (
        <BaseChart
          ref={ref}
          type="heatmap"
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

HeatmapChart.displayName = 'HeatmapChart';
export default HeatmapChart;
export type { HeatmapChartProps, HeatmapDataPoint };
