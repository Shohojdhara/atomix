import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { ChartProps } from '../../lib/types/components';
import Chart from './Chart';

interface HeatmapDataPoint {
  x: string | number;
  y: string | number;
  value: number;
  label?: string;
  metadata?: Record<string, any>;
}

interface HeatmapChartProps extends Omit<ChartProps, 'type' | 'datasets'> {
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
     * Cell border radius
     */
    borderRadius?: number;
    /**
     * Cell spacing
     */
    spacing?: number;
    /**
     * Show cell borders
     */
    showBorders?: boolean;
  };

  /**
   * Whether to show values in cells
   */
  showValues?: boolean;

  /**
   * Value formatter
   */
  valueFormatter?: (value: number) => string;

  /**
   * Whether to show color legend
   */
  showColorLegend?: boolean;

  /**
   * Tooltip configuration
   */
  tooltipConfig?: {
    enabled: boolean;
    formatter?: (dataPoint: HeatmapDataPoint) => string;
  };

  /**
   * Layout variant - grid or calendar style
   */
  variant?: 'grid' | 'calendar';

  /**
   * Animation configuration
   */
  animationConfig?: {
    enabled?: boolean;
    duration?: number;
    delay?: number;
    easing?: string;
  };
}

const HeatmapChart = memo(
  forwardRef<HTMLDivElement, HeatmapChartProps>(
    (
      {
        data = [],
        colorScale = { scheme: 'github', steps: 5 },
        cellConfig = {
          width: 12,
          height: 12,
          borderRadius: 2,
          spacing: 2,
          showBorders: false,
        },
        showValues = false,
        valueFormatter = v => v.toFixed(0),
        showColorLegend = true,
        tooltipConfig = { enabled: true },
        variant = 'grid',
        animationConfig = {
          enabled: true,
          duration: 800,
          delay: 50,
          easing: 'ease-out',
        },
        config = {},
        ...props
      },
      ref
    ) => {
      const [hoveredCell, setHoveredCell] = useState<HeatmapDataPoint | null>(null);
      const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

      // Process data into matrix format
      const processedData = useMemo(() => {
        console.log('HeatmapChart data:', data);
        if (!data.length) {
          console.log('No data provided to HeatmapChart');
          return { matrix: [], xLabels: [], yLabels: [], minValue: 0, maxValue: 1 };
        }

        // Get unique x and y values
        const xValues = [...new Set(data.map(d => d.x))].sort();
        const yValues = [...new Set(data.map(d => d.y))].sort();

        // Calculate value range
        const values = data.map(d => d.value);
        const minValue = colorScale.min ?? Math.min(...values);
        const maxValue = colorScale.max ?? Math.max(...values);

        // Create matrix
        const matrix: (HeatmapDataPoint | null)[][] = yValues.map(() =>
          new Array(xValues.length).fill(null)
        );

        // Fill matrix with data
        data.forEach(point => {
          const xIndex = xValues.indexOf(point.x);
          const yIndex = yValues.indexOf(point.y);
          if (xIndex >= 0 && yIndex >= 0) {
            matrix[yIndex][xIndex] = point;
          }
        });

        return {
          matrix,
          xLabels: xValues,
          yLabels: yValues,
          minValue,
          maxValue,
        };
      }, [data, colorScale.min, colorScale.max]);

      // Enhanced color schemes with GitHub-style contribution colors
      const colorSchemes = {
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
        plasma: [
          '#0d0887',
          '#5302a3',
          '#8b0aa5',
          '#b83289',
          '#db5c68',
          '#f48849',
          '#febd2a',
          '#f0f921',
        ],
        inferno: [
          '#000004',
          '#1b0c41',
          '#4a0c6b',
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
          '#f7fbff',
          '#deebf7',
          '#c6dbef',
          '#9ecae1',
          '#6baed6',
          '#4292c6',
          '#2171b5',
          '#08519c',
          '#08306b',
        ],
        reds: [
          '#fff5f0',
          '#fee0d2',
          '#fcbba1',
          '#fc9272',
          '#fb6a4a',
          '#ef3b2c',
          '#cb181d',
          '#a50f15',
          '#67000d',
        ],
        greens: [
          '#f7fcf5',
          '#e5f5e0',
          '#c7e9c0',
          '#a1d99b',
          '#74c476',
          '#41ab5d',
          '#238b45',
          '#006d2c',
          '#00441b',
        ],
        github: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        custom: colorScale.colors || ['#ffffff', '#000000'],
      };

      // Generate color scale
      const getColor = useCallback(
        (value: number) => {
          const { minValue, maxValue } = processedData;
          const range = maxValue - minValue;
          if (range === 0) return colorSchemes[colorScale.scheme][0];

          const normalizedValue = (value - minValue) / range;
          const colors = colorSchemes[colorScale.scheme];
          const steps = colorScale.steps || colors.length;

          const colorIndex = Math.min(Math.floor(normalizedValue * steps), steps - 1);
          const scaledIndex = Math.floor((colorIndex / steps) * (colors.length - 1));

          return colors[scaledIndex];
        },
        [processedData, colorScale.scheme, colorScale.steps, colorSchemes]
      );

      // Handle cell hover
      const handleCellHover = useCallback(
        (dataPoint: HeatmapDataPoint | null, event?: React.MouseEvent) => {
          setHoveredCell(dataPoint);

          if (event && dataPoint) {
            const rect = event.currentTarget.getBoundingClientRect();
            setTooltipPosition({
              x: event.clientX,
              y: event.clientY,
            });
          }
        },
        []
      );

      // Render heatmap content
      const renderContent = useCallback(
        ({ scales }) => {
          const { matrix, xLabels, yLabels } = processedData;
          console.log(
            'Rendering heatmap with matrix:',
            matrix,
            'xLabels:',
            xLabels,
            'yLabels:',
            yLabels
          );
          if (!matrix.length) {
            console.log('Matrix is empty, not rendering');
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
            <g>
              {/* Gradient definitions */}
              <defs>
                {showColorLegend && (
                  <linearGradient id="heatmap-legend-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    {colorSchemes[colorScale.scheme].map((color, i) => (
                      <stop
                        key={i}
                        offset={`${(i / (colorSchemes[colorScale.scheme].length - 1)) * 100}%`}
                        stopColor={color}
                      />
                    ))}
                  </linearGradient>
                )}
              </defs>

              {/* X-axis labels */}
              {xLabels.map((label, i) => {
                const showLabel =
                  variant === 'calendar'
                    ? i % 4 === 0
                    : i % Math.max(1, Math.floor(xLabels.length / 12)) === 0;
                return showLabel ? (
                  <text
                    key={`x-label-${i}`}
                    x={startX + i * (cellWidth + spacing) + cellWidth / 2}
                    y={startY - 8}
                    textAnchor="middle"
                    className="c-chart__heatmap-axis-label"
                    fontSize="11"
                    fill="var(--atomix-gray-7)"
                  >
                    {String(label)}
                  </text>
                ) : null;
              })}

              {/* Y-axis labels */}
              {yLabels.map((label, i) => (
                <text
                  key={`y-label-${i}`}
                  x={startX - 8}
                  y={startY + i * (cellHeight + spacing) + cellHeight / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="c-chart__heatmap-axis-label"
                  fontSize="11"
                  fill="var(--atomix-gray-7)"
                >
                  {String(label)}
                </text>
              ))}

              {/* Heatmap cells */}
              {matrix.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const x = startX + colIndex * (cellWidth + spacing);
                  const y = startY + rowIndex * (cellHeight + spacing);
                  const animationDelay = animationConfig.enabled
                    ? (rowIndex * xLabels.length + colIndex) * (animationConfig.delay || 50)
                    : 0;

                  if (!cell) {
                    return (
                      <rect
                        key={`empty-${rowIndex}-${colIndex}`}
                        x={x}
                        y={y}
                        width={cellWidth}
                        height={cellHeight}
                        rx={borderRadius}
                        fill="var(--atomix-gray-2)"
                        stroke={cellConfig.showBorders ? 'var(--atomix-gray-3)' : 'none'}
                        strokeWidth={cellConfig.showBorders ? 0.5 : 0}
                        className="c-chart__heatmap-cell c-chart__heatmap-cell--empty"
                        style={{
                          animation: animationConfig.enabled
                            ? `chart-fade-in ${animationConfig.duration}ms ${animationConfig.easing} ${animationDelay}ms both`
                            : 'none',
                        }}
                      />
                    );
                  }

                  const color = getColor(cell.value);
                  const isHovered = hoveredCell === cell;

                  return (
                    <g key={`cell-${rowIndex}-${colIndex}`}>
                      <rect
                        x={x}
                        y={y}
                        width={cellWidth}
                        height={cellHeight}
                        fill={color}
                        rx={borderRadius}
                        stroke={cellConfig.showBorders ? 'var(--atomix-gray-3)' : 'none'}
                        strokeWidth={cellConfig.showBorders ? 0.5 : 0}
                        className={`c-chart__heatmap-cell ${isHovered ? 'c-chart__heatmap-cell--hovered' : ''}`}
                        onMouseEnter={e => handleCellHover(cell, e)}
                        onMouseLeave={() => handleCellHover(null)}
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          animation: animationConfig.enabled
                            ? `chart-scale-in ${animationConfig.duration}ms ${animationConfig.easing} ${animationDelay}ms both`
                            : 'none',
                          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                          filter: isHovered ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
                        }}
                      />

                      {/* Cell value */}
                      {showValues && cell.value > 0 && (
                        <text
                          x={x + cellWidth / 2}
                          y={y + cellHeight / 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="9"
                          fontWeight="500"
                          fill={
                            cell.value > (processedData.minValue + processedData.maxValue) / 2
                              ? 'white'
                              : 'var(--atomix-gray-8)'
                          }
                          className="c-chart__heatmap-value"
                          style={{ pointerEvents: 'none' }}
                        >
                          {valueFormatter(cell.value)}
                        </text>
                      )}
                    </g>
                  );
                })
              )}

              {/* Enhanced color legend */}
              {showColorLegend && (
                <g transform={`translate(${startX + totalWidth + 40}, ${startY})`}>
                  <text x="0" y="-15" fontSize="12" fontWeight="600" fill="var(--atomix-gray-8)">
                    Activity
                  </text>

                  {/* Legend scale boxes */}
                  <g transform="translate(0, 10)">
                    <text x="-5" y="15" fontSize="10" fill="var(--atomix-gray-6)" textAnchor="end">
                      Less
                    </text>

                    {colorSchemes[colorScale.scheme].map((color, i) => (
                      <rect
                        key={i}
                        x={i * 14}
                        y={0}
                        width={12}
                        height={12}
                        fill={color}
                        rx={2}
                        stroke="var(--atomix-gray-3)"
                        strokeWidth={0.5}
                      />
                    ))}

                    <text
                      x={colorSchemes[colorScale.scheme].length * 14 + 5}
                      y="15"
                      fontSize="10"
                      fill="var(--atomix-gray-6)"
                    >
                      More
                    </text>
                  </g>
                </g>
              )}
            </g>
          );
        },
        [
          processedData,
          cellConfig,
          showValues,
          valueFormatter,
          showColorLegend,
          getColor,
          hoveredCell,
          handleCellHover,
          colorScale.scheme,
          colorSchemes,
        ]
      );

      // Calculate optimal dimensions based on data
      const { matrix, xLabels, yLabels } = processedData;
      const cellWidth = cellConfig.width || 12;
      const cellHeight = cellConfig.height || 12;
      const spacing = cellConfig.spacing || 2;

      const chartWidth = Math.max(600, xLabels.length * (cellWidth + spacing) + 200);
      const chartHeight = Math.max(400, yLabels.length * (cellHeight + spacing) + 150);

      return (
        <Chart
          ref={ref}
          type="heatmap"
          datasets={[]}
          config={config}
          className={`c-chart--heatmap c-chart--${variant}`}
          {...props}
        >
          <svg
            width={chartWidth}
            height={chartHeight}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="c-chart__svg"
            style={{ width: '100%', height: '100%' }}
          >
            {renderContent({ scales: { width: chartWidth, height: chartHeight } })}
          </svg>
          {tooltipConfig.enabled && hoveredCell && (
            <div
              className="c-chart__tooltip"
              style={{
                position: 'fixed',
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y - 10,
                transform: 'translateY(-100%)',
                background: 'var(--atomix-gray-9)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {tooltipConfig.formatter
                ? tooltipConfig.formatter(hoveredCell)
                : `${hoveredCell.label || `${hoveredCell.x}, ${hoveredCell.y}`}: ${hoveredCell.value}`}
            </div>
          )}
        </Chart>
      );
    }
  )
);

HeatmapChart.displayName = 'HeatmapChart';

/**
 * Generate sample heatmap data for testing
 */
export const generateHeatmapData = ({
  weeks = 52,
  daysPerWeek = 7,
  maxValue = 10,
}: {
  weeks?: number;
  daysPerWeek?: number;
  maxValue?: number;
} = {}): HeatmapDataPoint[] => {
  const data: HeatmapDataPoint[] = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < daysPerWeek; day++) {
      const value = Math.floor(Math.random() * (maxValue + 1));
      data.push({
        x: week,
        y: days[day],
        value,
        label: `Week ${week + 1}, ${days[day]}`,
        metadata: {
          week: week + 1,
          day: days[day],
          intensity: value > maxValue * 0.7 ? 'high' : value > maxValue * 0.3 ? 'medium' : 'low',
        },
      });
    }
  }

  return data;
};

export default HeatmapChart;
export type { HeatmapChartProps, HeatmapDataPoint };
