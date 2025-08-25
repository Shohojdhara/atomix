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
    oneLine: false,
    toast: false,
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
      oneLine = defaultProps.oneLine,
      toast = defaultProps.toast,
      className = '',
    } = props;

    const oneLineClass = oneLine ? 'c-callout--oneline' : '';
    const toastClass = toast ? 'c-callout--toast' : '';
    const variantClass = variant ? `c-callout--${variant}` : '';

    return `c-callout ${variantClass} ${oneLineClass} ${toastClass} ${className}`.trim();
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
