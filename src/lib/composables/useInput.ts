import { InputProps, ThemeColor } from '../types/components';
import { INPUT } from '../constants/components';

/**
 * Input state and functionality
 * @param initialProps - Initial input properties
 * @returns Input state and methods
 */
export function useInput(initialProps?: Partial<InputProps> & {
  prefixIcon?: boolean;
  suffixIcon?: boolean;
  clearable?: boolean;
  showCounter?: boolean;
  showPasswordToggle?: boolean;
  fullWidth?: boolean;
}) {
  // Default input properties
  const defaultProps: Partial<InputProps> = {
    size: 'md',
    disabled: false,
    invalid: false,
    valid: false,
    ...initialProps,
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

    const sizeClass =
      size === 'md' ? '' : size === 'sm' ? INPUT.CLASSES.SMALL : INPUT.CLASSES.LARGE;

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

  /**
   * Generate wrapper class based on properties
   * @param props - Wrapper properties
   * @returns Class string
   */
  const generateWrapperClass = (props: { className?: string }): string => {
    const { className = '' } = props;
    const {
      prefixIcon = false,
      suffixIcon = false,
      clearable = false,
      showCounter = false,
      showPasswordToggle = false,
      fullWidth = false,
    } = initialProps || {};

    const classes = [INPUT.ELEMENTS.WRAPPER];

    if (prefixIcon) classes.push(INPUT.CLASSES.PREFIX_ICON);
    if (suffixIcon || clearable || showPasswordToggle) classes.push(INPUT.CLASSES.SUFFIX_ICON);
    if (clearable) classes.push(INPUT.CLASSES.CLEARABLE);
    if (showCounter) classes.push(INPUT.CLASSES.WITH_COUNTER);
    if (showPasswordToggle) classes.push(INPUT.CLASSES.PASSWORD_TOGGLE);
    if (fullWidth) classes.push(INPUT.CLASSES.FULL_WIDTH);

    if (className) classes.push(className);

    return classes.filter(Boolean).join(' ');
  };

  return {
    defaultProps,
    generateInputClass,
    generateWrapperClass,
  };
}
