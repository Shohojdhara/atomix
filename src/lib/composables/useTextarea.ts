import { TextareaProps } from '../types/components';
import { TEXTAREA } from '../constants/components';

/**
 * Textarea state and functionality
 * @param initialProps - Initial textarea properties
 * @returns Textarea state and methods
 */
export function useTextarea(initialProps?: Partial<TextareaProps>) {
  // Default textarea properties
  const defaultProps: Partial<TextareaProps> = {
    size: 'md',
    disabled: false,
    invalid: false,
    valid: false,
    ...initialProps
  };

  /**
   * Generate textarea class based on properties
   * @param props - Textarea properties
   * @returns Class string
   */
  const generateTextareaClass = (props: Partial<TextareaProps>): string => {
    const {
      size = defaultProps.size,
      variant = defaultProps.variant,
      disabled = defaultProps.disabled,
      invalid = defaultProps.invalid,
      valid = defaultProps.valid,
      className = '',
    } = props;

    const sizeClass = size === 'md' ? '' : (
      size === 'sm' ? TEXTAREA.CLASSES.SMALL : TEXTAREA.CLASSES.LARGE
    );
    
    const variantClass = variant ? `c-input--${variant}` : '';
    
    let validationClass = '';
    if (invalid) {
      validationClass = TEXTAREA.CLASSES.INVALID;
    } else if (valid) {
      validationClass = TEXTAREA.CLASSES.VALID;
    }
    
    const disabledClass = disabled ? TEXTAREA.CLASSES.DISABLED : '';
    
    return `${TEXTAREA.CLASSES.BASE} ${sizeClass} ${variantClass} ${validationClass} ${disabledClass} ${className}`.trim();
  };

  return {
    defaultProps,
    generateTextareaClass,
  };
} 