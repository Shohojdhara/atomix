import React, { useRef, memo } from 'react';
import { useBadge } from '../../lib/composables/useBadge';
import { BADGE, GLASS_DEFAULTS } from '../../lib/constants/components';
import { BadgeProps } from '../../lib/types/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

export const Badge: React.FC<BadgeProps> = memo(
  ({
    label,
    variant = 'primary',
    size = 'md',
    disabled = false,
    icon,
    onRemove,
    'aria-label': ariaLabel,
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
      <span
        className={badgeClass}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        ref={ref}
        style={style}
      >
        {icon && <span className={BADGE.ICON_CLASS}>{icon}</span>}
        <span>{label}</span>
        {onRemove && (
          <button
            type="button"
            className="c-badge__close"
            onClick={onRemove}
            aria-label="Remove badge"
            disabled={disabled}
          >
            ×
          </button>
        )}
      </span>
    );

    if (glass) {
      // Default glass settings for badges
      const defaultGlassProps = {
        ...GLASS_DEFAULTS.BADGE,
        // Override borderRadius dynamically if the ref is available
        borderRadius: ref.current?.getBoundingClientRect().width
          ? ref.current?.getBoundingClientRect().width / 2
          : GLASS_DEFAULTS.BADGE.borderRadius,
        className: 'c-badge--glass',
      };

      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

      return <AtomixGlass {...glassProps}>{badgeElement}</AtomixGlass>;
    }

    return badgeElement;
  }
);

Badge.displayName = 'Badge';

export type { BadgeProps };

export default Badge;
