import Chart from './index';

/**
 * Line Chart class for vanilla JS implementation
 */
export default class LineChart extends Chart {
  /**
   * Create a new LineChart instance
   * @param element - Element or selector string
   * @param options - Chart options
   */
  constructor(element: string | HTMLElement, options: LineChartOptions = {}) {
    // Set default options for line chart
    const lineOptions = {
      type: 'line',
      ...options,
      lineOptions: {
        showArea: false,
        showDataPoints: true,
        smooth: false,
        tension: 0.4,
        ...options.lineOptions,
      },
    };
    
    super(element, lineOptions);
  }
}

/**
 * Line chart options interface
 */
export interface LineChartOptions extends Parameters<typeof Chart>[1] {
  /**
   * Line chart specific options
   */
  lineOptions?: {
    /**
     * Whether to show area fill under lines
     */
    showArea?: boolean;
    
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
  };
}
