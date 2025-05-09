import { useRef, useEffect } from 'react';
import { CheckboxProps } from '../types/components';

// Define checkbox class constants
const CHECKBOX_CLASSES = {
  BASE: 'c-checkbox',
  INVALID: 'is-error',
  VALID: 'is-valid',
  DISABLED: 'is-disabled',
  MIXED: 'c-checkbox--mixed'
};

/**
 * Checkbox state and functionality
 * @param initialProps - Initial checkbox properties
 * @returns Checkbox state and methods
 */
export function useCheckbox(initialProps?: Partial<CheckboxProps>) {
  // Default checkbox properties
  const defaultProps: Partial<CheckboxProps> = {
    disabled: false,
    invalid: false,
    valid: false,
    indeterminate: false,
    ...initialProps
  };
  
  // Ref for the checkbox input element
  const checkboxRef = useRef<HTMLInputElement>(null);
  
  // Handle indeterminate state
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = Boolean(defaultProps.indeterminate);
    }
  }, [defaultProps.indeterminate]);

  /**
   * Generate checkbox class based on properties
   * @param props - Checkbox properties
   * @returns Class string
   */
  const generateCheckboxClass = (props: Partial<CheckboxProps>): string => {
    const {
      disabled = defaultProps.disabled,
      invalid = defaultProps.invalid,
      valid = defaultProps.valid,
      indeterminate = defaultProps.indeterminate,
      className = '',
    } = props;

    let validationClass = '';
    if (invalid) {
      validationClass = CHECKBOX_CLASSES.INVALID;
    } else if (valid) {
      validationClass = CHECKBOX_CLASSES.VALID;
    }
    
    const disabledClass = disabled ? CHECKBOX_CLASSES.DISABLED : '';
    const indeterminateClass = indeterminate ? CHECKBOX_CLASSES.MIXED : '';
    
    return `${CHECKBOX_CLASSES.BASE} ${validationClass} ${disabledClass} ${indeterminateClass} ${className}`.trim();
  };

  return {
    defaultProps,
    generateCheckboxClass,
    checkboxRef,
  };
} 