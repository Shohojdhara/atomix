import { SpinnerProps } from '../types/components';

/**
 * Spinner state and functionality
 * @param initialProps - Initial spinner properties
 * @returns Spinner state and methods
 */
export function useSpinner(initialProps?: Partial<SpinnerProps>) {
  // Default spinner properties
  const defaultProps: Partial<SpinnerProps> = {
    variant: 'primary',
    size: 'md',
    fullscreen: false,
    ...initialProps,
  };

  /**
   * Generate spinner class based on properties
   * @param props - Spinner properties
   * @returns Class string
   */
  const generateSpinnerClass = (props: Partial<SpinnerProps>): string => {
    const {
      variant = defaultProps.variant,
      size = defaultProps.size,
      fullscreen = defaultProps.fullscreen,
      className = '',
    } = props;

    const baseClass = 'c-spinner';
    const variantClass = variant ? `${baseClass}--${variant}` : '';
    const sizeClass = size !== 'md' ? `${baseClass}--${size}` : '';
    const fullscreenClass = fullscreen ? `${baseClass}--fullscreen` : '';

    return `${baseClass} ${variantClass} ${sizeClass} ${fullscreenClass} ${className}`.trim();
  };

  return {
    defaultProps,
    generateSpinnerClass,
  };
}
