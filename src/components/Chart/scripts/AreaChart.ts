import LineChart, { LineChartOptions } from './LineChart';

/**
 * Area Chart class for vanilla JS implementation
 */
export default class AreaChart extends LineChart {
  /**
   * Create a new AreaChart instance
   * @param element - Element or selector string
   * @param options - Chart options
   */
  constructor(element: string | HTMLElement, options: AreaChartOptions = {}) {
    // Convert area options to line options
    const lineOptions: LineChartOptions = {
      type: 'area',
      ...options,
      lineOptions: {
        showArea: true,
        showDataPoints: options.areaOptions?.showDataPoints ?? true,
        smooth: options.areaOptions?.smooth ?? false,
        tension: options.areaOptions?.tension ?? 0.4,
      },
    };

    super(element, lineOptions);
  }
}

/**
 * Area chart options interface
 */
export interface AreaChartOptions extends Omit<LineChartOptions, 'lineOptions'> {
  /**
   * Area chart specific options
   */
  areaOptions?: {
    /**
     * Whether to show data points
     */
    showDataPoints?: boolean;

    /**
     * Whether to smooth the line
     */
    smooth?: boolean;

    /**
     * Line tension for curve smoothing (0-1)
     */
    tension?: number;

    /**
     * Opacity of the area fill (0-1)
     */
    fillOpacity?: number;
  };
}
