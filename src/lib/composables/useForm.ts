import { FormProps } from '../types/components';
import { FORM } from '../constants/components';

/**
 * Form state and functionality
 * @param initialProps - Initial form properties
 * @returns Form state and methods
 */
export function useForm(initialProps?: Partial<FormProps>) {
  // Default form properties
  const defaultProps: Partial<FormProps> = {
    disabled: false,
    ...initialProps,
  };

  /**
   * Generate form class based on properties
   * @param props - Form properties
   * @returns Class string
   */
  const generateFormClass = (props: Partial<FormProps>): string => {
    const { disabled = defaultProps.disabled, className = '' } = props;

    const disabledClass = disabled ? FORM.CLASSES.DISABLED : '';

    return [FORM.CLASSES.BASE, disabledClass, className]
      .filter(Boolean)
      .join(' ')
      .trim();
  };

  /**
   * Handle form submission with disabled check
   * @param handler - Submit handler function
   * @returns Function that respects disabled state
   */
  const handleSubmit = (handler?: (event: React.FormEvent<HTMLFormElement>) => void) => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!defaultProps.disabled && handler) {
        handler(event);
      }
    };
  };

  /**
   * Handle form reset with disabled check
   * @param handler - Reset handler function
   * @returns Function that respects disabled state
   */
  const handleReset = (handler?: (event: React.FormEvent<HTMLFormElement>) => void) => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      if (!defaultProps.disabled && handler) {
        handler(event);
      }
    };
  };

  return {
    defaultProps,
    generateFormClass,
    handleSubmit,
    handleReset,
  };
}
