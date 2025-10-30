import React, { useRef } from 'react';
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
  style,
}) => {
  const { generateBadgeClass } = useBadge({
    variant,
    size,
    disabled,
  });

  const ref = useRef<HTMLSpanElement>(null);

  const badgeClass = generateBadgeClass({
    variant,
    size,
    disabled,
    className: `${className} ${glass ? 'c-badge--glass' : ''}`.trim(),
  });

  const badgeElement = (
    <span className={badgeClass} aria-disabled={disabled} ref={ref} style={style}>
      {icon && <span className={BADGE.ICON_CLASS}>{icon}</span>}
      <span>{label}</span>
    </span>
  );

  if (glass) {
    // Default glass settings for badges
    const defaultGlassProps = {
      displacementScale: 10,
      saturation: 200,
      blurAmount: 1,
      cornerRadius: ref.current?.getBoundingClientRect().width ? ref.current?.getBoundingClientRect().width / 2 : 16,
      mode: 'standard' as const,
      className: 'c-badge--glass',
       elasticity: 0
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
