import { ButtonProps } from '../types/components';

/**
 * Button state and functionality
 * @param initialProps - Initial button properties
 * @returns Button state and methods
 */
export function useButton(initialProps?: Partial<ButtonProps>) {
  // Default button properties
  const defaultProps: Partial<ButtonProps> = {
    variant: 'primary',
    size: 'md',
    disabled: false,
    rounded: false,
    ...initialProps,
  };

  /**
   * Generate button class based on properties
   * @param props - Button properties
   * @returns Class string
   */
  const generateButtonClass = (props: Partial<ButtonProps>): string => {
    const {
      variant = defaultProps.variant,
      size = defaultProps.size,
      disabled = defaultProps.disabled,
      rounded = defaultProps.rounded,
      iconOnly = false,
      className = '',
    } = props;

    const sizeClass = size === 'md' ? '' : `c-btn--${size}`;
    const iconOnlyClass = iconOnly ? 'c-btn--icon' : '';
    const roundedClass = rounded ? 'c-btn--rounded' : '';
    const disabledClass = disabled ? 'c-btn--disabled' : '';

    return `c-btn c-btn--${variant} ${sizeClass} ${iconOnlyClass} ${roundedClass} ${disabledClass} ${className}`.trim();
  };

  /**
   * Handle button click with disabled check
   * @param handler - Click handler function
   * @returns Function that respects disabled state
   */
  const handleClick = (handler?: () => void) => {
    return () => {
      if (!defaultProps.disabled && handler) {
        handler();
      }
    };
  };

  return {
    defaultProps,
    generateButtonClass,
    handleClick,
  };
}
