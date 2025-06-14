import { FormGroupProps } from '../types/components';
import { FORM_GROUP } from '../constants/components';

/**
 * Form Group state and functionality
 * @param initialProps - Initial form group properties
 * @returns Form Group state and methods
 */
export function useFormGroup(initialProps?: Partial<FormGroupProps>) {
  // Default form group properties
  const defaultProps: Partial<FormGroupProps> = {
    size: 'md',
    disabled: false,
    invalid: false,
    valid: false,
    ...initialProps,
  };

  /**
   * Generate form group class based on properties
   * @param props - Form group properties
   * @returns Class string
   */
  const generateFormGroupClass = (props: Partial<FormGroupProps>): string => {
    const {
      size = defaultProps.size,
      disabled = defaultProps.disabled,
      invalid = defaultProps.invalid,
      valid = defaultProps.valid,
      className = '',
    } = props;

    const sizeClass =
      size === 'md' ? '' : size === 'sm' ? FORM_GROUP.CLASSES.SMALL : FORM_GROUP.CLASSES.LARGE;

    const validationClass = invalid
      ? FORM_GROUP.CLASSES.INVALID
      : valid
        ? FORM_GROUP.CLASSES.VALID
        : '';

    const disabledClass = disabled ? FORM_GROUP.CLASSES.DISABLED : '';

    return `${FORM_GROUP.CLASSES.BASE} ${sizeClass} ${validationClass} ${disabledClass} ${className}`.trim();
  };

  return {
    defaultProps,
    generateFormGroupClass,
  };
}
