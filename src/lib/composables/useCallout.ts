import { CalloutProps } from '../types/components';

/**
 * Callout state and functionality
 * @param initialProps - Initial callout properties
 * @returns Callout state and methods
 */
export function useCallout(initialProps?: Partial<CalloutProps>) {
  // Default callout properties
  const defaultProps: Partial<CalloutProps> = {
    variant: 'primary',
    compact: false,
    isToast: false,
    glass: false,
    ...initialProps,
  };

  /**
   * Generate callout class based on properties
   * @param props - Callout properties
   * @returns Class string
   */
  const generateCalloutClass = (props: Partial<CalloutProps>): string => {
    const {
      variant = defaultProps.variant,
      compact = defaultProps.compact,
      isToast = defaultProps.isToast,
      glass = defaultProps.glass,
      className = '',
    } = props;

    const compactClass = compact ? 'c-callout--compact' : '';
    const toastClass = isToast ? 'c-callout--toast' : '';
    const variantClass = variant ? `c-callout--${variant}` : '';
    const glassClass = glass ? 'c-callout--glass' : '';

    return `c-callout ${variantClass} ${compactClass} ${toastClass} ${glassClass} ${className}`.trim();
  };

  /**
   * Handle callout close with callback
   * @param handler - Close handler function
   * @returns Function that calls the handler
   */
  const handleClose = (handler?: () => void) => {
    return () => {
      if (handler) {
        handler();
      }
    };
  };

  return {
    defaultProps,
    generateCalloutClass,
    handleClose,
  };
}
