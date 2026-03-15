import { TestCompProps } from '../types/components';
import { TESTCOMP } from '../constants/components';

/**
 * TestComp state and functionality
 * @param initialProps - Initial testcomp properties
 * @returns TestComp state and methods
 */
export function useTestComp(initialProps?: Partial<TestCompProps>) {
  // Default testcomp properties
  const defaultProps: Partial<TestCompProps> = {
    variant: 'primary',
    size: 'md',
    disabled: false,
    ...initialProps,
  };

  /**
   * Generate testcomp class based on properties
   * @param props - TestComp properties
   * @returns Class string
   */
  const generateClassNames = (props: Partial<TestCompProps> = {}): string => {
    const {
      variant = defaultProps.variant,
      size = defaultProps.size,
      disabled = defaultProps.disabled,
      glass = defaultProps.glass,
      className = '',
    } = props;

    const sizeClass = size === 'md' ? '' : `c-testcomp--${size}`;
    const disabledClass = disabled ? 'c-testcomp--disabled' : '';
    const glassClass = glass ? 'c-testcomp--glass' : '';

    return [
      TESTCOMP.BASE_CLASS,
      `c-testcomp--${variant}`,
      sizeClass,
      disabledClass,
      glassClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  };

  /**
   * Handle testcomp click with disabled check
   * @param handler - Click handler function
   * @returns Function that respects disabled state
   */
  const handleClick = (handler?: (event: React.MouseEvent<HTMLDivElement>) => void) => {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      if (!defaultProps.disabled && handler) {
        handler(event);
      }
    };
  };

  return {
    defaultProps,
    generateClassNames,
    handleClick,
  };
}
