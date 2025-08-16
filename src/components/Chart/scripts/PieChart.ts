import Chart from './index';

/**
 * Pie Chart class for vanilla JS implementation
 */
export default class PieChart extends Chart {
  /**
   * Create a new PieChart instance
   * @param element - Element or selector string
   * @param options - Chart options
   */
  constructor(element: string | HTMLElement, options: PieChartOptions = {}) {
    // Set default options for pie chart
    const pieOptions = {
      type: 'pie',
      ...options,
      pieOptions: {
        showValues: true,
        showPercentages: true,
        showLabels: false,
        startAngle: 0,
        sortByValue: false,
        padAngle: 1,
        ...options.pieOptions,
      },
    };
    
    super(element, pieOptions);
  }
}

/**
 * Pie chart options interface
 */
export interface PieChartOptions extends Parameters<typeof Chart>[1] {
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
}
