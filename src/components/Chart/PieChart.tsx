import { forwardRef, memo, useMemo } from 'react';
import { CHART } from '../../lib/constants/components';
import { ChartDataPoint, ChartProps } from '../../lib/types/components';
import Chart from './Chart';
import { cn } from '../../lib/utils'; // Assuming we have a class name utility

interface PieChartProps extends Omit<ChartProps, 'type'> {
  /**
   * Pie chart specific options
   */
  pieOptions?: {
    /**
     * Whether to show values on slices
     */
    showValues?: boolean;

    /**
     * Whether to show percentages instead of values
     */
    showPercentages?: boolean;

    /**
     * Whether to show labels on slices
     */
    showLabels?: boolean;

    /**
     * Start angle in degrees (0-360)
     */
    startAngle?: number;

    /**
     * Whether to sort slices by value
     */
    sortByValue?: boolean;

    /**
     * Padding between slices in degrees
     */
    padAngle?: number;
  };
  
  /**
   * Optional className for the root element
   */
  className?: string;
}

const PieChart = memo(
  forwardRef<HTMLDivElement, PieChartProps>(
    (
      {
        datasets = [],
        config = {},
        pieOptions = {
          showValues: true,
          showPercentages: true,
          showLabels: false,
          startAngle: 0,
          sortByValue: false,
          padAngle: 1,
        },
        onDataPointClick,
        className,
        ...props
      },
      ref
    ) => {
      // Use the first dataset for pie chart
      const dataset = useMemo(() => 
        datasets.length > 0 ? datasets[0] : { label: '', data: [] },
        [datasets]
      );

      // Calculate dimensions and generate pie slices
      const chartContent = useMemo(() => {
        if (!dataset?.data?.length) return null;

        // Filter out invalid data points
        const validDataPoints = dataset?.data?.filter(
          point =>
            typeof point.value === 'number' &&
            !isNaN(point.value) &&
            isFinite(point.value) &&
            point.value > 0
        );

        if (!validDataPoints.length) return null;

        // Calculate chart dimensions using CHART constants
        const width = CHART.DEFAULT_WIDTH;
        const height = CHART.DEFAULT_HEIGHT;
        const radius = (Math.min(width, height) / 2) * CHART.PIE_RADIUS_RATIO;
        const centerX = width / 2;
        const centerY = height / 2;

        // Use CHART color palette if available in config
        const defaultColors = useMemo(() => 
          config.colorPalette?.pie || config.colorPalette?.default || CHART.DEFAULT_COLORS,
          [config.colorPalette]
        );

        // Sort data points if needed
        let dataPoints = [...validDataPoints];
        if (pieOptions.sortByValue) {
          dataPoints.sort((a, b) => b.value - a.value);
        }

        // Calculate total value
        const total = dataPoints.reduce((sum, point) => sum + point.value, 0);

        // Prevent division by zero
        if (total <= 0 || !isFinite(total)) return null;

        // Calculate angles for each slice
        const slices: Array<{
          dataPoint: ChartDataPoint;
          index: number;
          startAngle: number;
          endAngle: number;
          color: string;
          percentage: number;
        }> = [];

        let currentAngle = ((pieOptions.startAngle ?? 0) * Math.PI) / 180;

        dataPoints.forEach((point, i) => {
          const percentage = point.value / total;

          // Validate percentage calculation
          if (!isFinite(percentage) || percentage < 0) return;

          const angle = percentage * 2 * Math.PI - ((pieOptions.padAngle ?? 1) * Math.PI) / 180;

          // Validate angle calculation
          if (!isFinite(angle) || angle < 0) return;

          const endAngle = currentAngle + angle;

          // Validate angles before adding to slices
          if (!isFinite(currentAngle) || !isFinite(endAngle)) return;

          slices.push({
            dataPoint: point,
            index: i,
            startAngle: currentAngle,
            endAngle: endAngle,
            color: (point.color || defaultColors[i % defaultColors.length]) as string,
            percentage,
          });

          currentAngle = endAngle + ((pieOptions.padAngle ?? 1) * Math.PI) / 180;
        });

        // Generate SVG arc path for each slice
        const pieSlices = slices.map(slice => {
          const { startAngle, endAngle, color, dataPoint, index, percentage } = slice;

          // Calculate SVG arc path
          const startX = centerX + radius * Math.cos(startAngle);
          const startY = centerY + radius * Math.sin(startAngle);
          const endX = centerX + radius * Math.cos(endAngle);
          const endY = centerY + radius * Math.sin(endAngle);

          // Validate all coordinates
          const coordinates = [startX, startY, endX, endY];
          if (coordinates.some(coord => !isFinite(coord))) {
            console.warn('Invalid coordinates detected in PieChart slice:', {
              startAngle,
              endAngle,
              coordinates,
            });
            return null;
          }

          const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

          const pathData = [
            `M ${centerX},${centerY}`,
            `L ${startX},${startY}`,
            `A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY}`,
            'Z',
          ].join(' ');

          // Calculate position for labels/values
          const midAngle = startAngle + (endAngle - startAngle) / 2;

          // Validate midAngle
          if (!isFinite(midAngle)) {
            console.warn('Invalid midAngle detected in PieChart slice:', {
              startAngle,
              endAngle,
              midAngle,
            });
            return null;
          }

          const labelRadius = radius * 0.7;
          const labelX = centerX + labelRadius * Math.cos(midAngle);
          const labelY = centerY + labelRadius * Math.sin(midAngle);

          // Calculate outer label position
          const outerLabelRadius = radius * 1.1;
          const outerLabelX = centerX + outerLabelRadius * Math.cos(midAngle);
          const outerLabelY = centerY + outerLabelRadius * Math.sin(midAngle);

          // Validate label coordinates
          const labelCoordinates = [labelX, labelY, outerLabelX, outerLabelY];
          if (labelCoordinates.some(coord => !isFinite(coord))) {
            console.warn('Invalid label coordinates detected in PieChart slice:', {
              midAngle,
              labelCoordinates,
            });
            return null;
          }

          // Format percentage
          const percentageText = `${Math.round(percentage * 100)}%`;

          return (
            <g key={`slice-${index}`}>
              <path
                d={pathData}
                fill={color}
                stroke="var(--atomix-primary-bg)"
                strokeWidth={1}
                className="pie-slice"
                onClick={() => onDataPointClick?.(dataPoint, 0, index)}
                data-tooltip={`${dataPoint.label}: ${dataPoint.value} (${percentageText})`}
              />

              {pieOptions.showValues && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="var(--atomix-primary-text-emphasis)"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {pieOptions.showPercentages ? percentageText : dataPoint.value}
                </text>
              )}

              {pieOptions.showLabels && (
                <g>
                  <line
                    x1={labelX}
                    y1={labelY}
                    x2={outerLabelX}
                    y2={outerLabelY}
                    stroke={color}
                    strokeWidth={1}
                  />
                  <text
                    x={outerLabelX + (outerLabelX > centerX ? 5 : -5)}
                    y={outerLabelY}
                    textAnchor={outerLabelX > centerX ? 'start' : 'end'}
                    dominantBaseline="middle"
                    fill="var(--atomix-secondary-text-emphasis)"
                    fontSize="12"
                  >
                    {dataPoint.label}
                  </text>
                </g>
              )}
            </g>
          );
        });

        // Filter out any null slices from invalid calculations
        const validPieSlices = pieSlices.filter(slice => slice !== null);

        if (!validPieSlices.length) return null;

        return (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            className={CHART.CHART_SVG_CLASS}
          >
            <g>{validPieSlices}</g>
          </svg>
        );
      }, [dataset, pieOptions, onDataPointClick]);

      // Render legend if enabled
      const legend = useMemo(() => {
        if (!config.showLegend || !dataset?.data?.length) return null;

        // Filter out invalid data points (same as chart content)
        const validDataPoints = dataset?.data?.filter(
          point =>
            typeof point.value === 'number' &&
            !isNaN(point.value) &&
            isFinite(point.value) &&
            point.value > 0
        );

        if (!validDataPoints.length) return null;

        // Generate colors if not provided
        const defaultColors = [
          '#7AFFD7',
          '#1AFFD2',
          '#00E6C3',
          '#4DFF9F',
          '#1AFF85',
          '#00E66B',
          '#DD6061',
          '#FF1A1A',
          '#E60000',
          '#FFCC00',
          '#E6B800',
          '#B38F00',
        ];

        // Calculate total for percentages
        const total = validDataPoints.reduce((sum, point) => sum + point.value, 0);

        // Prevent division by zero
        if (total <= 0 || !isFinite(total)) return null;

        return (
          <div className={CHART.LEGEND_CLASS}>
            {validDataPoints.map((point, i) => {
              const percentage = Math.round((point.value / total) * 100);

              // Validate percentage calculation
              if (!isFinite(percentage)) return null;

              return (
                <div
                  key={`legend-${i}`}
                  className={CHART.LEGEND_ITEM_CLASS}
                  onClick={() => onDataPointClick?.(point, 0, i)}
                >
                  <div
                    className={CHART.LEGEND_COLOR_CLASS}
                    style={{
                      backgroundColor: point.color || defaultColors[i % defaultColors.length],
                    }}
                  />
                  <span className={CHART.LEGEND_LABEL_CLASS}>
                    {point.label} {pieOptions.showPercentages && `(${percentage}%)`}
                  </span>
                </div>
              );
            })}
          </div>
        );
      }, [dataset, config.showLegend, pieOptions.showPercentages, onDataPointClick]);

      return (
        <Chart 
          ref={ref} 
          type="pie" 
          datasets={datasets} 
          config={config} 
          className={cn(CHART.ROOT_CLASS, className)}
          {...props}
        >
          <div className={CHART.CANVAS_CLASS}>{chartContent}</div>
          {legend}
        </Chart>
      );
    }
  )
);

PieChart.displayName = 'PieChart';
export default PieChart;
export type { PieChartProps };
