import PieChart, { PieChartOptions } from './PieChart';

/**
 * Donut Chart class for vanilla JS implementation
 */
export default class DonutChart extends PieChart {
  /**
   * Create a new DonutChart instance
   * @param element - Element or selector string
   * @param options - Chart options
   */
  constructor(element: string | HTMLElement, options: DonutChartOptions = {}) {
    // Set default options for donut chart
    const donutOptions: PieChartOptions = {
      type: 'donut',
      ...options,
      pieOptions: {
        showValues: false,
        showPercentages: true,
        showLabels: false,
        startAngle: 0,
        sortByValue: false,
        padAngle: 1,
        ...options.pieOptions,
      },
    };

    super(element, donutOptions);

    // Store donut-specific options
    this.donutOptions = {
      innerRadiusRatio: 0.6,
      showTotal: true,
      centerLabel: 'Total',
      centerValue: undefined,
      roundedCorners: true,
      ...options.donutOptions,
    };
  }

  /**
   * Donut chart specific options
   */
  private donutOptions: Required<DonutChartOptions>['donutOptions'];
}

/**
 * Donut chart options interface
 */
export interface DonutChartOptions extends PieChartOptions {
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
