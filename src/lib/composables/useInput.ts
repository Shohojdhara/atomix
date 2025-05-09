import { InputProps, ThemeColor } from '../types/components';
import { INPUT } from '../constants/components';

/**
 * Input state and functionality
 * @param initialProps - Initial input properties
 * @returns Input state and methods
 */
export function useInput(initialProps?: Partial<InputProps>) {
  // Default input properties
  const defaultProps: Partial<InputProps> = {
    size: 'md',
    disabled: false,
    invalid: false,
    valid: false,
    ...initialProps
  };

  /**
   * Generate input class based on properties
   * @param props - Input properties
   * @returns Class string
   */
  const generateInputClass = (props: Partial<InputProps> & { type?: string }): string => {
    const {
      size = defaultProps.size,
      variant = defaultProps.variant,
      disabled = defaultProps.disabled,
      invalid = defaultProps.invalid,
      valid = defaultProps.valid,
      className = '',
      type,
    } = props;

    const sizeClass = size === 'md' ? '' : (
      size === 'sm' ? INPUT.CLASSES.SMALL : INPUT.CLASSES.LARGE
    );
    
    const variantClass = variant ? `c-input--${variant}` : '';
    
    const textareaClass = type === 'textarea' ? 'c-input--textarea' : '';
    
    let validationClass = '';
    if (invalid) {
      validationClass = INPUT.CLASSES.INVALID;
    } else if (valid) {
      validationClass = INPUT.CLASSES.VALID;
    }
    
    const disabledClass = disabled ? INPUT.CLASSES.DISABLED : '';
    
    return `${INPUT.CLASSES.BASE} ${sizeClass} ${variantClass} ${textareaClass} ${validationClass} ${disabledClass} ${className}`.trim();
  };

  return {
    defaultProps,
    generateInputClass,
  };
} 