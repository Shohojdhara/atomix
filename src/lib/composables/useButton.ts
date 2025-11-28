import { ButtonProps } from '../types/components';
import { BUTTON } from '../constants/components';

/**
 * Button state and functionality
 * @param initialProps - Initial button properties
 * @returns Button state and methods
 */
export function useButton(initialProps?: Partial<ButtonProps>) {
  // Default button properties
  const defaultProps: Partial<ButtonProps> = {
    variant: 'primary',
    size: 'md',
    disabled: false,
    rounded: false,
    loading: false,
    fullWidth: false,
    block: false,
    active: false,
    selected: false,
    ...initialProps,
  };

  /**
   * Generate button class based on properties
   * @param props - Button properties
   * @returns Class string
   */
  const generateButtonClass = (props: Partial<ButtonProps>): string => {
    const {
      variant = defaultProps.variant,
      size = defaultProps.size,
      disabled = defaultProps.disabled,
      rounded = defaultProps.rounded,
      iconOnly = false,
      glass = defaultProps.glass,
      loading = defaultProps.loading,
      fullWidth = defaultProps.fullWidth,
      block = defaultProps.block,
      active = defaultProps.active,
      selected = defaultProps.selected,
      className = '',
    } = props;

    const sizeClass = size === 'md' ? '' : `c-btn--${size}`;
    const iconOnlyClass = iconOnly ? 'c-btn--icon' : '';
    const roundedClass = rounded ? 'c-btn--rounded' : '';
    const disabledClass = disabled ? 'c-btn--disabled' : '';
    const glassClass = glass ? 'c-btn--glass' : '';
    const loadingClass = loading ? BUTTON.CLASSES.LOADING : '';
    const fullWidthClass = fullWidth ? BUTTON.CLASSES.FULL_WIDTH : '';
    const blockClass = block ? BUTTON.CLASSES.BLOCK : '';
    const activeClass = active ? BUTTON.CLASSES.ACTIVE : '';
    const selectedClass = selected ? BUTTON.CLASSES.SELECTED : '';

    return [
      BUTTON.BASE_CLASS,
      `c-btn--${variant}`,
      sizeClass,
      iconOnlyClass,
      roundedClass,
      disabledClass,
      glassClass,
      loadingClass,
      fullWidthClass,
      blockClass,
      activeClass,
      selectedClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  };

  /**
   * Handle button click with disabled check
   * @param handler - Click handler function
   * @returns Function that respects disabled state
   */
  const handleClick = (handler?: (event: React.MouseEvent<HTMLButtonElement>) => void) => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!defaultProps.disabled && !defaultProps.loading && handler) {
        handler(event);
      }
    };
  };

  return {
    defaultProps,
    generateButtonClass,
    handleClick,
  };
}
