import { SelectProps } from '../types/components';
import { SELECT } from '../constants/components';

/**
 * Select state and functionality
 * @param initialProps - Initial select properties
 * @returns Select state and methods
 */
export function useSelect(initialProps?: Partial<SelectProps>) {
  // Default select properties
  const defaultProps: Partial<SelectProps> = {
    size: 'md',
    disabled: false,
    invalid: false,
    valid: false,
    ...initialProps,
  };

  /**
   * Generate select class based on properties
   * @param props - Select properties
   * @returns Class string
   */
  const generateSelectClass = (props: Partial<SelectProps>): string => {
    const {
      size = defaultProps.size,
      disabled = defaultProps.disabled,
      invalid = defaultProps.invalid,
      valid = defaultProps.valid,
      className = '',
    } = props;

    const sizeClass =
      size === 'md' ? '' : size === 'sm' ? SELECT.CLASSES.SMALL : SELECT.CLASSES.LARGE;

    let validationClass = '';
    if (invalid) {
      validationClass = SELECT.CLASSES.INVALID;
    } else if (valid) {
      validationClass = SELECT.CLASSES.VALID;
    }

    const disabledClass = disabled ? SELECT.CLASSES.DISABLED : '';

    return `${SELECT.CLASSES.BASE} ${sizeClass} ${validationClass} ${disabledClass} ${className}`.trim();
  };

  return {
    defaultProps,
    generateSelectClass,
  };
}
