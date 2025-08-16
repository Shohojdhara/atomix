import Chart from './index';

/**
 * Bar Chart class for vanilla JS implementation
 */
export default class BarChart extends Chart {
  /**
   * Create a new BarChart instance
   * @param element - Element or selector string
   * @param options - Chart options
   */
  constructor(element: string | HTMLElement, options: BarChartOptions = {}) {
    // Set default options for bar chart
    const barOptions = {
      type: options.horizontal ? 'horizontal-bar' : 'bar',
      ...options,
      barOptions: {
        showValues: true,
        stacked: false,
        cornerRadius: 4,
        groupPadding: 0.2,
        barPadding: 0.05,
        ...options.barOptions,
      },
    };
    
    super(element, barOptions);
  }
}

/**
 * Bar chart options interface
 */
export interface BarChartOptions extends Parameters<typeof Chart>[1] {
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
  };
  
  /**
   * Whether to render as horizontal bar chart
   */
  horizontal?: boolean;
}
