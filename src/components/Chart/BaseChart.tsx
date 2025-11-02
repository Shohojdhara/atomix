import { forwardRef, memo, useCallback } from 'react';
import Chart from './Chart';
import ChartRenderer from './ChartRenderer';
import { ChartProps } from './types';

interface BaseChartProps extends Omit<ChartProps, 'type'> {
  /**
   * The type of chart to render
   */
  type: ChartProps['type'];

  /**
   * Function to render the chart content
   */
  renderContent: (params: {
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
  }) => React.ReactNode;

  /**
   * Whether the chart is interactive
   */
  interactive?: boolean;

  /**
   * Whether to enable real-time updates
   */
  enableRealTime?: boolean;

  /**
   * Whether to enable accessibility features
   */
  enableAccessibility?: boolean;

  /**
   * Whether to enable performance optimizations
   */
  enablePerformanceOptimization?: boolean;
}

const BaseChart = memo(
  forwardRef<HTMLDivElement, BaseChartProps>(
    (
      {
        type,
        datasets = [],
        config = {},
        renderContent,
        interactive = true,
        enableRealTime = false,
        enableAccessibility = true,
        enablePerformanceOptimization = true,
        onDataPointClick,
        ...props
      },
      ref
    ) => {
      const renderChartContent = useCallback(
        (params: {
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
        }) => renderContent(params),
        [renderContent]
      );

      return (
        <Chart ref={ref} type={type} datasets={datasets} config={config} {...props}>
          <ChartRenderer
            datasets={datasets}
            config={config}
            interactive={interactive}
            enableRealTime={enableRealTime}
            enableAccessibility={enableAccessibility}
            enablePerformanceOptimization={enablePerformanceOptimization}
            onDataPointClick={onDataPointClick}
            renderContent={renderChartContent}
          />
        </Chart>
      );
    }
  )
);

BaseChart.displayName = 'BaseChart';
export default BaseChart;
export type { BaseChartProps };
