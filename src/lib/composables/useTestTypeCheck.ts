import { TestTypeCheckProps } from '../types/components';
import { TESTTYPECHECK } from '../constants/components';

/**
 * TestTypeCheck state and functionality
 * @param initialProps - Initial testtypecheck properties
 * @returns TestTypeCheck state and methods
 */
export function useTestTypeCheck(initialProps?: Partial<TestTypeCheckProps>) {
  // Default testtypecheck properties
  const defaultProps: Partial<TestTypeCheckProps> = {
    variant: 'primary',
    size: 'md',
    disabled: false,
    ...initialProps,
  };

  /**
   * Generate testtypecheck class based on properties
   * @param props - TestTypeCheck properties
   * @returns Class string
   */
  const generateClassNames = (props: Partial<TestTypeCheckProps> = {}): string => {
    const {
      variant = defaultProps.variant,
      size = defaultProps.size,
      disabled = defaultProps.disabled,
      glass = defaultProps.glass,
      className = '',
    } = props;

    const sizeClass = size === 'md' ? '' : `c-testtypecheck--${size}`;
    const disabledClass = disabled ? 'c-testtypecheck--disabled' : '';
    const glassClass = glass ? 'c-testtypecheck--glass' : '';

    return [
      TESTTYPECHECK.BASE_CLASS,
      `c-testtypecheck--${variant}`,
      sizeClass,
      disabledClass,
      glassClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  };

  /**
   * Handle testtypecheck click with disabled check
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
