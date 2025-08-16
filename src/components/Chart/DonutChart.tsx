import { forwardRef, memo, useMemo } from 'react';
import { CHART } from '../../lib/constants/components';
import { ChartDataPoint } from '../../lib/types/components';
import Chart from './Chart';
import { PieChartProps } from './PieChart';

interface DonutChartProps extends Omit<PieChartProps, 'type'> {
  /**
   * Donut chart specific options
   */
  donutOptions?: {
    /**
     * Inner radius as a percentage of outer radius (0-1)
     */
    innerRadiusRatio?: number;

    /**
     * Whether to show total in the center
     */
    showTotal?: boolean;

    /**
     * Custom center label
     */
    centerLabel?: string;

    /**
     * Custom center value
     */
    centerValue?: string | number;

    /**
     * Whether to use rounded corners for donut segments
     */
    roundedCorners?: boolean;
  };
}

const DonutChart = memo(
  forwardRef<HTMLDivElement, DonutChartProps>(
    (
      {
        datasets = [],
        config = {},
        pieOptions = {
          showValues: false,
          showPercentages: true,
          showLabels: false,
          startAngle: 0,
          sortByValue: false,
          padAngle: 1,
        },
        donutOptions = {
          innerRadiusRatio: 0.6,
          showTotal: true,
          centerLabel: 'Total',
          centerValue: undefined,
          roundedCorners: true,
        },
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      // Use the first dataset for donut chart
      const dataset = datasets.length > 0 ? datasets[0] : { label: '', data: [] };

      // Calculate dimensions and generate donut slices
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

        // Calculate chart dimensions
        const width = 800;
        const height = 400;
        const outerRadius = (Math.min(width, height) / 2) * 0.8;
        const innerRadius = outerRadius * (donutOptions.innerRadiusRatio ?? 0.6);
        const centerX = width / 2;
        const centerY = height / 2;

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
        const donutSlices = slices.map(slice => {
          const { startAngle, endAngle, color, dataPoint, index, percentage } = slice;

          // Calculate outer arc points
          const outerStartX = centerX + outerRadius * Math.cos(startAngle);
          const outerStartY = centerY + outerRadius * Math.sin(startAngle);
          const outerEndX = centerX + outerRadius * Math.cos(endAngle);
          const outerEndY = centerY + outerRadius * Math.sin(endAngle);

          // Calculate inner arc points
          const innerStartX = centerX + innerRadius * Math.cos(endAngle);
          const innerStartY = centerY + innerRadius * Math.sin(endAngle);
          const innerEndX = centerX + innerRadius * Math.cos(startAngle);
          const innerEndY = centerY + innerRadius * Math.sin(startAngle);

          const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

          // Create donut segment path
          const pathData = [
            `M ${outerStartX},${outerStartY}`,
            `A ${outerRadius},${outerRadius} 0 ${largeArcFlag},1 ${outerEndX},${outerEndY}`,
            `L ${innerStartX},${innerStartY}`,
            `A ${innerRadius},${innerRadius} 0 ${largeArcFlag},0 ${innerEndX},${innerEndY}`,
            'Z',
          ].join(' ');

          // Calculate position for labels/values
          const midAngle = startAngle + (endAngle - startAngle) / 2;
          const labelRadius = (outerRadius + innerRadius) / 2;
          const labelX = centerX + labelRadius * Math.cos(midAngle);
          const labelY = centerY + labelRadius * Math.sin(midAngle);

          // Format percentage
          const percentageText = `${Math.round(percentage * 100)}%`;

          return (
            <g key={`slice-${index}`}>
              <path
                d={pathData}
                fill={color}
                stroke="var(--atomix-primary-bg)"
                strokeWidth={1}
                className="donut-slice"
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
            </g>
          );
        });

        // Center content
        const centerContent = donutOptions.showTotal && (
          <g className="donut-center">
            <circle cx={centerX} cy={centerY} r={innerRadius} fill="var(--atomix-primary-bg)" />
            {donutOptions.centerLabel && (
              <text
                x={centerX}
                y={centerY - 15}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--atomix-secondary-text-emphasis)"
                fontSize="14"
              >
                {donutOptions.centerLabel}
              </text>
            )}
            <text
              x={centerX}
              y={centerY + (donutOptions.centerLabel ? 15 : 0)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--atomix-primary-text-emphasis)"
              fontSize="24"
              fontWeight="bold"
            >
              {donutOptions.centerValue !== undefined ? donutOptions.centerValue : total}
            </text>
          </g>
        );

        return (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <g>
              {donutSlices}
              {centerContent}
            </g>
          </svg>
        );
      }, [dataset, pieOptions, donutOptions, onDataPointClick]);

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
        <Chart ref={ref} type="donut" datasets={datasets} config={config} {...props}>
          <div className={CHART.CANVAS_CLASS}>{chartContent}</div>
          {legend}
        </Chart>
      );
    }
  )
);

DonutChart.displayName = 'DonutChart';
export default DonutChart;
export type { DonutChartProps };
