import { forwardRef, memo } from 'react';
import LineChart, { LineChartProps } from './LineChart';

interface AreaChartProps extends Omit<LineChartProps, 'lineOptions'> {
  /**
   * Area chart specific options (extends line chart options)
   */
  areaOptions?: LineChartProps['lineOptions'];
}

const AreaChart = memo(
  forwardRef<HTMLDivElement, AreaChartProps>(({ areaOptions = {}, ...props }, ref) => {
    // Area chart is essentially a line chart with area fill enabled
    const enhancedAreaOptions = {
      showArea: true,
      fillOpacity: 0.3,
      useGradient: true,
      ...areaOptions,
    };

    return <LineChart ref={ref} lineOptions={enhancedAreaOptions} {...props} />;
  })
);

AreaChart.displayName = 'AreaChart';
export default AreaChart;
export type { AreaChartProps };
