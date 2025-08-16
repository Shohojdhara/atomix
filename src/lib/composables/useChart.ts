import { CHART } from '../constants/components';
import { ChartProps } from '../types/components';

/**
 * Chart state and functionality
 * @param initialProps - Initial chart properties
 * @returns Chart state and methods
 */
export function useChart(initialProps?: Partial<ChartProps>) {
  // Default chart properties
  const defaultProps: Partial<ChartProps> = {
    type: 'line',
    size: 'md',
    variant: 'primary',
    loading: false,
    ...initialProps,
  };

  /**
   * Generate chart class based on properties
   * @param props - Chart properties
   * @returns Class string
   */
  const generateChartClass = (props: Partial<ChartProps>): string => {
    const {
      type = defaultProps.type,
      size = defaultProps.size,
      variant = defaultProps.variant,
      loading = defaultProps.loading,
      error,
      className = '',
    } = props;

    const typeClass = type ? `${CHART.TYPE_PREFIX}${type}` : '';
    const sizeClass = size === 'md' ? '' : `${CHART.SIZE_PREFIX}${size}`;
    const variantClass = variant ? `${CHART.VARIANT_PREFIX}${variant}` : '';
    const loadingClass = loading ? CHART.LOADING_STATE_CLASS : '';
    const errorClass = error ? CHART.ERROR_STATE_CLASS : '';

    return `${CHART.BASE_CLASS} ${typeClass} ${variantClass} ${sizeClass} ${loadingClass} ${errorClass} ${className}`.trim();
  };

  /**
   * Generate chart attributes for accessibility
   * @param props - Chart properties
   * @returns Attributes object
   */
  const generateChartAttributes = (props: Partial<ChartProps>) => {
    const { loading, error, type } = props;

    const attributes: Record<string, string> = {
      role: 'img',
      'aria-live': 'polite',
    };

    if (loading) {
      attributes['aria-busy'] = 'true';
    }

    if (error) {
      attributes['aria-invalid'] = 'true';
    }

    if (type) {
      attributes['data-chart-type'] = type;
    }

    return attributes;
  };

  return {
    defaultProps,
    generateChartClass,
    chartAttributes: generateChartAttributes(initialProps || {}),
  };
}
