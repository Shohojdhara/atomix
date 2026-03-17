import { TypedButtonProps } from '../types/components';
import { TYPEDBUTTON } from '../constants/components';

/**
 * TypedButton state and functionality
 * @param initialProps - Initial typedbutton properties
 * @returns TypedButton state and methods
 */
export function useTypedButton(initialProps?: Partial<TypedButtonProps>) {
  // Default typedbutton properties
  const defaultProps: Partial<TypedButtonProps> = {
    variant: 'primary',
    size: 'md',
    disabled: false,
    ...initialProps,
  };

  /**
   * Generate typedbutton class based on properties
   * @param props - TypedButton properties
   * @returns Class string
   */
  const generateClassNames = (props: Partial<TypedButtonProps> = {}): string => {
    const {
      variant = defaultProps.variant,
      size = defaultProps.size,
      disabled = defaultProps.disabled,
      glass = defaultProps.glass,
      className = '',
    } = props;

    const sizeClass = size === 'md' ? '' : `c-typedbutton--${size}`;
    const disabledClass = disabled ? 'c-typedbutton--disabled' : '';
    const glassClass = glass ? 'c-typedbutton--glass' : '';

    return [
      TYPEDBUTTON.BASE_CLASS,
      `c-typedbutton--${variant}`,
      sizeClass,
      disabledClass,
      glassClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  };

  /**
   * Handle typedbutton click with disabled check
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
