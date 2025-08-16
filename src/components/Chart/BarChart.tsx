import { forwardRef, memo, ReactElement, useMemo } from 'react';
import { CHART } from '../../lib/constants/components';
import { ChartProps } from '../../lib/types/components';
import Chart from './Chart';

interface BarChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Bar chart specific options
   */
  barOptions?: {
    /**
     * Whether to show bar values
     */
    showValues?: boolean;

    /**
     * Whether to stack bars
     */
    stacked?: boolean;

    /**
     * Bar corner radius
     */
    cornerRadius?: number;

    /**
     * Bar padding between groups
     */
    groupPadding?: number;

    /**
     * Bar padding between bars in a group
     */
    barPadding?: number;

    /**
     * Whether to enable bar animations
     */
    enableAnimations?: boolean;

    /**
     * Animation duration in milliseconds
     */
    animationDuration?: number;

    /**
     * Animation delay between bars in milliseconds
     */
    animationDelay?: number;

    /**
     * Whether to show bar gradients
     */
    useGradients?: boolean;

    /**
     * Whether to enable bar hover effects
     */
    enableHoverEffects?: boolean;

    /**
     * Bar value format function
     */
    valueFormatter?: (value: number) => string;

    /**
     * Whether to show data labels inside bars
     */
    showLabelsInside?: boolean;

    /**
     * Minimum bar height/width
     */
    minBarSize?: number;
  };

  /**
   * Whether to render as horizontal bar chart
   */
  horizontal?: boolean;
}

const BarChart = memo(
  forwardRef<HTMLDivElement, BarChartProps>(
    (
      {
        datasets = [],
        config = {},
        barOptions = {
          showValues: true,
          stacked: false,
          cornerRadius: 4,
          groupPadding: 0.2,
          barPadding: 0.05,
          enableAnimations: true,
          animationDuration: 750,
          animationDelay: 50,
          useGradients: false,
          enableHoverEffects: true,
          valueFormatter: (value: number) => value.toString(),
          showLabelsInside: false,
          minBarSize: 2,
        },
        horizontal = false,
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      // Calculate dimensions and scales
      const chartContent = useMemo(() => {
        if (!datasets.length || !datasets[0]?.data?.length) return null;

        // Calculate chart dimensions
        const width = 800;
        const height = 400;
        const padding = { top: 20, right: 30, bottom: 40, left: 50 };
        const innerWidth = width - padding.left - padding.right;
        const innerHeight = height - padding.top - padding.bottom;

        // Find min/max values for scaling
        const allValues = datasets.flatMap(
          dataset => dataset.data?.map(d => (typeof d.value === 'number' ? d.value : 0)) || []
        );

        // For stacked bars, sum values by category
        let maxValue = config.yAxis?.max;
        if (!maxValue) {
          if (barOptions.stacked) {
            const categoryTotals = datasets[0].data.map((_, categoryIndex) =>
              datasets.reduce((sum, dataset) => {
                const value = dataset.data?.[categoryIndex]?.value;
                return sum + (typeof value === 'number' ? value : 0);
              }, 0)
            );
            maxValue = Math.max(...categoryTotals, 1); // Ensure at least 1 to avoid division by zero
          } else {
            maxValue = Math.max(...allValues, 1); // Ensure at least 1 to avoid division by zero
          }
        }

        const minValue = config.yAxis?.min ?? 0;

        // Generate colors if not provided
        const defaultColors = ['#7AFFD7', '#1AFFD2', '#00E6C3', '#4DFF9F', '#1AFF85', '#00E66B'];

        // Calculate bar dimensions
        const numCategories = datasets[0].data.length;
        const numDatasets = datasets.length;

        // Ensure we have valid numbers to avoid NaN
        if (numCategories === 0 || numDatasets === 0) return null;

        // Calculate scales and dimensions
        let xScale: (categoryIndexOrValue: number, datasetIndex?: number) => number;
        let yScale: (categoryIndexOrValue: number, datasetIndex?: number) => number;
        let barWidth: number;
        let categoryWidth: number;

        if (horizontal) {
          // Horizontal bar chart
          const valueRange = maxValue - minValue;
          xScale = (value: number) => {
            if (typeof value !== 'number' || isNaN(value) || valueRange === 0) {
              return padding.left;
            }
            return padding.left + ((value - minValue) / valueRange) * innerWidth;
          };

          categoryWidth = innerHeight / numCategories;
          const availableCategoryWidth = categoryWidth * (1 - (barOptions.groupPadding || 0));

          if (barOptions.stacked) {
            barWidth = Math.max(availableCategoryWidth, 1); // Ensure minimum width
            yScale = (categoryIndex: number, datasetIndex?: number) => {
              if (typeof categoryIndex !== 'number' || isNaN(categoryIndex)) return padding.top;
              return padding.top + categoryIndex * categoryWidth + categoryWidth / 2 - barWidth / 2;
            };
          } else {
            barWidth = Math.max(availableCategoryWidth / numDatasets, 1); // Ensure minimum width
            yScale = (categoryIndex: number, datasetIndex?: number) => {
              if (
                typeof categoryIndex !== 'number' ||
                isNaN(categoryIndex) ||
                typeof datasetIndex !== 'number' ||
                isNaN(datasetIndex || 0)
              ) {
                return padding.top;
              }
              return (
                padding.top +
                categoryIndex * categoryWidth +
                (categoryWidth * (barOptions.groupPadding || 0)) / 2 +
                (datasetIndex || 0) * barWidth
              );
            };
          }
        } else {
          // Vertical bar chart
          const valueRange = maxValue - minValue;
          yScale = (value: number) => {
            if (typeof value !== 'number' || isNaN(value) || valueRange === 0) {
              return padding.top + innerHeight;
            }
            return padding.top + innerHeight - ((value - minValue) / valueRange) * innerHeight;
          };

          categoryWidth = innerWidth / numCategories;
          const availableCategoryWidth = categoryWidth * (1 - (barOptions.groupPadding || 0));

          if (barOptions.stacked) {
            barWidth = Math.max(availableCategoryWidth, 1); // Ensure minimum width
            xScale = (categoryIndex: number, datasetIndex?: number) => {
              if (typeof categoryIndex !== 'number' || isNaN(categoryIndex)) return padding.left;
              return (
                padding.left + categoryIndex * categoryWidth + categoryWidth / 2 - barWidth / 2
              );
            };
          } else {
            barWidth = Math.max(availableCategoryWidth / numDatasets, 1); // Ensure minimum width
            xScale = (categoryIndex: number, datasetIndex?: number) => {
              if (
                typeof categoryIndex !== 'number' ||
                isNaN(categoryIndex) ||
                typeof datasetIndex !== 'number' ||
                isNaN(datasetIndex || 0)
              ) {
                return padding.left;
              }
              return (
                padding.left +
                categoryIndex * categoryWidth +
                (categoryWidth * (barOptions.groupPadding || 0)) / 2 +
                (datasetIndex || 0) * barWidth
              );
            };
          }
        }

        // Generate bars for each dataset
        const bars: ReactElement[] = [];

        // Track stacked bar positions
        const stackedPositions = Array(numCategories).fill(0);

        datasets.forEach((dataset, datasetIndex) => {
          const color = dataset.color || defaultColors[datasetIndex % defaultColors.length];

          dataset.data.forEach((point, categoryIndex) => {
            const value = typeof point.value === 'number' ? point.value : 0;

            // Skip rendering if we have invalid data
            if (isNaN(value) || !isFinite(value)) return;

            if (horizontal) {
              // Horizontal bars
              const y = yScale(categoryIndex, datasetIndex);
              let x = xScale(0);
              let barLength = xScale(value) - xScale(0);

              // Validate calculated values
              if (
                isNaN(y) ||
                isNaN(x) ||
                isNaN(barLength) ||
                !isFinite(y) ||
                !isFinite(x) ||
                !isFinite(barLength)
              ) {
                return;
              }

              // Handle stacked bars
              if (barOptions.stacked && datasetIndex > 0) {
                x = xScale(stackedPositions[categoryIndex] || 0);
                stackedPositions[categoryIndex] = (stackedPositions[categoryIndex] || 0) + value;
              } else if (barOptions.stacked) {
                stackedPositions[categoryIndex] = value;
              }

              // Ensure minimum dimensions
              barLength = Math.max(Math.abs(barLength), 0);

              bars.push(
                <g key={`bar-${datasetIndex}-${categoryIndex}`}>
                  <rect
                    x={x}
                    y={y}
                    width={barLength}
                    height={barWidth}
                    fill={point.color || color}
                    rx={barOptions.cornerRadius || 0}
                    ry={barOptions.cornerRadius || 0}
                    className="bar"
                    onClick={() => onDataPointClick?.(point, datasetIndex, categoryIndex)}
                    data-tooltip={`${dataset.label} - ${point.label}: ${point.value}`}
                  />

                  {barOptions.showValues && barLength > 20 && (
                    <text
                      className="c-chart__axis-label"
                      x={x + barLength + 5}
                      y={y + barWidth / 2}
                      dominantBaseline="middle"
                      fontSize="12"
                      fill="#374151"
                    >
                      {barOptions.valueFormatter?.(value) || value}
                    </text>
                  )}
                </g>
              );
            } else {
              // Vertical bars
              const x = xScale(categoryIndex, datasetIndex);
              let y = yScale(value);
              let barHeight = yScale(0) - yScale(value);

              // Validate calculated values
              if (
                isNaN(x) ||
                isNaN(y) ||
                isNaN(barHeight) ||
                !isFinite(x) ||
                !isFinite(y) ||
                !isFinite(barHeight)
              ) {
                return;
              }

              // Handle stacked bars
              if (barOptions.stacked && datasetIndex > 0) {
                const stackedValue = (stackedPositions[categoryIndex] || 0) + value;
                y = yScale(stackedValue);
                barHeight = yScale(stackedPositions[categoryIndex] || 0) - yScale(stackedValue);
                stackedPositions[categoryIndex] = stackedValue;
              } else if (barOptions.stacked) {
                stackedPositions[categoryIndex] = value;
              }

              // Ensure minimum dimensions and correct orientation
              barHeight = Math.max(Math.abs(barHeight), 0);
              if (barHeight < 0) {
                y += barHeight;
                barHeight = -barHeight;
              }

              bars.push(
                <g key={`bar-${datasetIndex}-${categoryIndex}`}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={point.color || color}
                    rx={barOptions.cornerRadius || 0}
                    ry={barOptions.cornerRadius || 0}
                    className="bar"
                    onClick={() => onDataPointClick?.(point, datasetIndex, categoryIndex)}
                    data-tooltip={`${dataset.label} - ${point.label}: ${point.value}`}
                  />

                  {barOptions.showValues && barHeight > 20 && (
                    <text
                      className="c-chart__axis-label"
                      x={x + barWidth / 2}
                      y={y - 5}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#374151"
                    >
                      {barOptions.valueFormatter?.(value) || value}
                    </text>
                  )}
                </g>
              );
            }
          });
        });

        // Generate X and Y axes
        let xAxis, yAxis;

        if (horizontal) {
          // Horizontal bar chart axes
          xAxis = (
            <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--x`}>
              {Array.from({ length: 5 }).map((_, i) => {
                const value = minValue + ((maxValue - minValue) * i) / 4;
                const xPos = xScale(value);

                // Skip if position is invalid
                if (isNaN(xPos) || !isFinite(xPos)) return null;

                return (
                  <text
                    className="c-chart__axis-label"
                    key={`x-label-${i}`}
                    x={xPos}
                    y={height - 10}
                    textAnchor="middle"
                    fontSize="12"
                  >
                    {isFinite(value) ? value.toFixed(value % 1 === 0 ? 0 : 1) : '0'}
                  </text>
                );
              })}
            </g>
          );

          yAxis = (
            <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--y`}>
              {datasets[0].data.map((point, i) => {
                const yPos = padding.top + i * categoryWidth + categoryWidth / 2;

                // Skip if position is invalid
                if (isNaN(yPos) || !isFinite(yPos)) return null;

                return (
                  <text
                    className="c-chart__axis-label"
                    key={`y-label-${i}`}
                    x={padding.left - 10}
                    y={yPos}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize="12"
                  >
                    {point.label || ''}
                  </text>
                );
              })}
            </g>
          );
        } else {
          // Vertical bar chart axes
          xAxis = (
            <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--x`}>
              {datasets[0].data.map((point, i) => {
                const xPos = padding.left + i * categoryWidth + categoryWidth / 2;

                // Skip if position is invalid
                if (isNaN(xPos) || !isFinite(xPos)) return null;

                return (
                  <text
                    className="c-chart__axis-label"
                    key={`x-label-${i}`}
                    x={xPos}
                    y={height - 10}
                    textAnchor="middle"
                    fontSize="12"
                  >
                    {point.label || ''}
                  </text>
                );
              })}
            </g>
          );

          yAxis = (
            <g className={`${CHART.AXIS_CLASS} ${CHART.AXIS_CLASS}--y`}>
              {Array.from({ length: 5 }).map((_, i) => {
                const value = minValue + ((maxValue - minValue) * i) / 4;
                const yPos = yScale(value);

                // Skip if position is invalid
                if (isNaN(yPos) || !isFinite(yPos)) return null;

                return (
                  <text
                    className="c-chart__axis-label"
                    key={`y-label-${i}`}
                    x={padding.left - 10}
                    y={yPos}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize="12"
                  >
                    {isFinite(value) ? value.toFixed(value % 1 === 0 ? 0 : 1) : '0'}
                  </text>
                );
              })}
            </g>
          );
        }

        // Generate grid lines if enabled
        const grid = (
          <g className={CHART.GRID_CLASS}>
            {horizontal &&
              config.yAxis?.showGrid &&
              datasets[0].data.map((_, i) => {
                const y = padding.top + i * categoryWidth + categoryWidth / 2;

                // Skip if position is invalid
                if (isNaN(y) || !isFinite(y)) return null;

                return (
                  <line
                    key={`y-grid-${i}`}
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="4,4"
                  />
                );
              })}
            {horizontal &&
              config.xAxis?.showGrid &&
              Array.from({ length: 5 }).map((_, i) => {
                const value = minValue + ((maxValue - minValue) * i) / 4;
                const x = xScale(value);

                // Skip if position is invalid
                if (isNaN(x) || !isFinite(x)) return null;

                return (
                  <line
                    key={`x-grid-${i}`}
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={height - padding.bottom}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="4,4"
                  />
                );
              })}
            {!horizontal &&
              config.xAxis?.showGrid &&
              datasets[0].data.map((_, i) => {
                const x = padding.left + i * categoryWidth + categoryWidth / 2;

                // Skip if position is invalid
                if (isNaN(x) || !isFinite(x)) return null;

                return (
                  <line
                    key={`x-grid-${i}`}
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={height - padding.bottom}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="4,4"
                  />
                );
              })}
            {!horizontal &&
              config.yAxis?.showGrid &&
              Array.from({ length: 5 }).map((_, i) => {
                const value = minValue + ((maxValue - minValue) * i) / 4;
                const y = yScale(value);

                // Skip if position is invalid
                if (isNaN(y) || !isFinite(y)) return null;

                return (
                  <line
                    key={`y-grid-${i}`}
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="4,4"
                  />
                );
              })}
          </g>
        );

        return (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {grid}
            {xAxis}
            {yAxis}
            {bars}
          </svg>
        );
      }, [datasets, config, barOptions, horizontal, onDataPointClick]);

      // Render legend if enabled
      const legend = useMemo(() => {
        if (!config.showLegend || !datasets.length) return null;

        return (
          <div className={CHART.LEGEND_CLASS}>
            {datasets.map((dataset, i) => (
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
      }, [datasets, config.showLegend, props.onLegendItemClick]);

      return (
        <Chart
          ref={ref}
          type={horizontal ? 'horizontal-bar' : 'bar'}
          datasets={datasets}
          config={config}
          {...props}
        >
          <div className={CHART.CANVAS_CLASS}>{chartContent}</div>
          {legend}
        </Chart>
      );
    }
  )
);

BarChart.displayName = 'BarChart';
export default BarChart;
export type { BarChartProps };
