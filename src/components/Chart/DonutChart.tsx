import { forwardRef, memo, useMemo } from 'react';
import BaseChart from './BaseChart';
import ChartTooltip from './ChartTooltip';
import { PieChartProps } from './PieChart';
import { ChartDataPoint, ChartRenderContentParams } from './types';

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

      // Prepare data for donut chart (calculations will be done in renderContent with actual dimensions)
      const chartData = useMemo(() => {
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

        return { validDataPoints };
      }, [dataset]);

      const renderContent = ({
        scales,
        colors,
        datasets: renderedDatasets,
        handlers,
        hoveredPoint,
        toolbarState,
        config: renderConfig,
      }: ChartRenderContentParams) => {
        if (!chartData) return null;

        // Use actual container dimensions from scales
        const width = scales.width;
        const height = scales.height;
        const outerRadius = (Math.min(width, height) / 2) * 0.8;
        const innerRadius = outerRadius * (donutOptions.innerRadiusRatio ?? 0.6);
        const centerX = width / 2;
        const centerY = height / 2;

        // Generate colors if not provided
        // Using primary color variations for consistent theming
        const defaultColors = [
          'var(--atomix-primary-2)',
          'var(--atomix-primary-3)',
          'var(--atomix-primary-4)',
          'var(--atomix-primary-5)',
          'var(--atomix-primary-6)',
          'var(--atomix-primary-7)',
          'var(--atomix-primary-8)',
          'var(--atomix-primary-9)',
        ];

        const chartColors = dataset?.color
          ? [dataset.color]
          : dataset?.data?.map((_, i) => defaultColors[i % defaultColors.length]) || defaultColors;

        // Calculate total value
        const total = chartData.validDataPoints.reduce((sum, point) => sum + point.value, 0);

        // Calculate angles for each slice
        const padAngleRad = ((pieOptions.padAngle || 1) * Math.PI) / 180;
        let currentAngle = ((pieOptions.startAngle || 0) * Math.PI) / 180;
        
        const slices = chartData.validDataPoints.map((point, index) => {
          const percentage = point.value / total;
          const sliceAngle = percentage * (2 * Math.PI) - padAngleRad;
          const startAngle = currentAngle;
          const endAngle = currentAngle + sliceAngle;
          const midAngle = (startAngle + endAngle) / 2;

          // Calculate label position
          const labelRadius = outerRadius * 0.75;
          const labelX = centerX + Math.cos(midAngle) * labelRadius;
          const labelY = centerY + Math.sin(midAngle) * labelRadius;

          // Calculate slice path
          const x1 = centerX + innerRadius * Math.cos(startAngle);
          const y1 = centerY + innerRadius * Math.sin(startAngle);
          const x2 = centerX + outerRadius * Math.cos(startAngle);
          const y2 = centerY + outerRadius * Math.sin(startAngle);
          const x3 = centerX + outerRadius * Math.cos(endAngle);
          const y3 = centerY + outerRadius * Math.sin(endAngle);
          const x4 = centerX + innerRadius * Math.cos(endAngle);
          const y4 = centerY + innerRadius * Math.sin(endAngle);

          // Large arc flag (1 if arc is > 180 degrees, 0 otherwise)
          const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

          const path = [
            `M ${x1} ${y1}`,
            `L ${x2} ${y2}`,
            `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}`,
            `L ${x4} ${y4}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}`,
            'Z',
          ].join(' ');

          currentAngle = endAngle + padAngleRad;

          return {
            path,
            color: point.color || chartColors[index],
            labelPosition: { x: labelX, y: labelY },
            dataPoint: point,
            value: point.value,
            percentage: (point.value / total) * 100,
          };
        });

        const showTooltips = toolbarState?.showTooltips ?? renderConfig?.showTooltips ?? true;

        return (
          <>
            {slices.map((slice, index) => {
              const isHovered = hoveredPoint?.pointIndex === index;

              return (
                <g key={`slice-${index}`}>
                  <path
                    d={slice.path}
                    fill={slice.color}
                    className={`c-chart__donut-slice ${isHovered ? 'c-chart__donut-slice--hovered' : ''}`}
                    onClick={() => handlers.onDataPointClick?.(slice.dataPoint, 0, index)}
                    onMouseEnter={e => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      handlers.onPointHover(
                        0,
                        index,
                        slice.labelPosition.x,
                        slice.labelPosition.y,
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2
                      );
                    }}
                    onMouseLeave={handlers.onPointLeave}
                  />
                  {pieOptions.showLabels && (
                    <text
                      x={slice.labelPosition.x}
                      y={slice.labelPosition.y}
                      textAnchor="middle"
                      className="c-chart__donut-label"
                    >
                      {slice.dataPoint.label}
                    </text>
                  )}
                  {pieOptions.showPercentages && (
                    <text
                      x={slice.labelPosition.x}
                      y={slice.labelPosition.y + 20}
                      textAnchor="middle"
                      className="c-chart__donut-percentage"
                    >
                      {slice.percentage.toFixed(1)}%
                    </text>
                  )}
                </g>
              );
            })}

            {/* Center label and value */}
            {donutOptions.showTotal && (
              <g>
                <text
                  x={centerX}
                  y={centerY - 10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="c-chart__donut-center-label"
                >
                  {donutOptions.centerLabel}
                </text>
                <text
                  x={centerX}
                  y={centerY + 20}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="c-chart__donut-center-value"
                >
                  {donutOptions.centerValue !== undefined
                    ? donutOptions.centerValue
                    : total.toLocaleString()}
                </text>
              </g>
            )}
            {showTooltips &&
              hoveredPoint &&
              hoveredPoint.pointIndex < slices.length &&
              slices[hoveredPoint.pointIndex] && (
                <ChartTooltip
                  dataPoint={slices[hoveredPoint.pointIndex]!.dataPoint}
                  datasetLabel={dataset?.label}
                  datasetColor={slices[hoveredPoint.pointIndex]?.color}
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
          type="donut"
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

DonutChart.displayName = 'DonutChart';
export default DonutChart;
export type { DonutChartProps };
