import React from 'react';
import { useBadge } from '../../lib/composables/useBadge';
import { BADGE } from '../../lib/constants/components';
import { BadgeProps } from '../../lib/types/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  className = '',
  glass,
}) => {
  const { generateBadgeClass } = useBadge({
    variant,
    size,
    disabled,
  });

  const badgeClass = generateBadgeClass({
    variant,
    size,
    disabled,
    className: `${className} ${glass ? 'c-badge--glass' : ''}`.trim(),
  });

  const badgeElement = (
    <span className={badgeClass} aria-disabled={disabled}>
      {icon && <span className={BADGE.ICON_CLASS}>{icon}</span>}
      <span>{label}</span>
    </span>
  );

  if (glass) {
    // Default glass settings for badges
    const defaultGlassProps = {
      displacementScale: 50,
      blurAmount: 1,
      saturation: 160,
      aberrationIntensity: 0.5,
      cornerRadius: 999,
      mode: 'standard' as const,
      className: 'c-badge-glass',
    };

    const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

    return (
      <AtomixGlass {...glassProps}>
        {badgeElement}
      </AtomixGlass>
    );
  }

  return badgeElement;
};

Badge.displayName = 'Badge';

export type { BadgeProps };

export default Badge;
