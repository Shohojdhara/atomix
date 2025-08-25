import { RadioProps } from '../types/components';
import { RADIO } from '../constants/components';

/**
 * Radio state and functionality
 * @param initialProps - Initial radio properties
 * @returns Radio state and methods
 */
export function useRadio(initialProps?: Partial<RadioProps>) {
  // Default radio properties
  const defaultProps: Partial<RadioProps> = {
    disabled: false,
    invalid: false,
    valid: false,
    ...initialProps,
  };

  /**
   * Generate radio class based on properties
   * @param props - Radio properties
   * @returns Class string
   */
  const generateRadioClass = (props: Partial<RadioProps>): string => {
    const {
      disabled = defaultProps.disabled,
      invalid = defaultProps.invalid,
      valid = defaultProps.valid,
      className = '',
    } = props;

    let validationClass = '';
    if (invalid) {
      validationClass = RADIO.CLASSES.INVALID;
    } else if (valid) {
      validationClass = RADIO.CLASSES.VALID;
    }

    const disabledClass = disabled ? RADIO.CLASSES.DISABLED : '';

    return `${RADIO.CLASSES.BASE} ${validationClass} ${disabledClass} ${className}`.trim();
  };

  return {
    defaultProps,
    generateRadioClass,
  };
}
