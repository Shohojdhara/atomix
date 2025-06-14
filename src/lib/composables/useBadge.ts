import { BadgeProps } from '../types/components';
import { BADGE } from '../constants/components';

/**
 * Badge state and functionality
 * @param initialProps - Initial badge properties
 * @returns Badge state and methods
 */
export function useBadge(initialProps?: Partial<BadgeProps>) {
  // Default badge properties
  const defaultProps: Partial<BadgeProps> = {
    variant: 'primary',
    size: 'md',
    disabled: false,
    ...initialProps,
  };

  /**
   * Generate badge class based on properties
   * @param props - Badge properties
   * @returns Class string
   */
  const generateBadgeClass = (props: Partial<BadgeProps>): string => {
    const {
      variant = defaultProps.variant,
      size = defaultProps.size,
      disabled = defaultProps.disabled,
      className = '',
    } = props;

    const sizeClass = size === 'md' ? '' : `${BADGE.SIZE_PREFIX}${size}`;
    const variantClass = variant ? `${BADGE.VARIANT_PREFIX}${variant}` : '';
    const disabledClass = disabled ? 'c-badge--disabled' : '';

    return `${BADGE.BASE_CLASS} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim();
  };

  return {
    defaultProps,
    generateBadgeClass,
  };
}
