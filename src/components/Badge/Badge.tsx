import React from 'react';
import { BadgeProps } from '../../lib/types/components';
import { useBadge } from '../../lib/composables/useBadge';
import { BADGE } from '../../lib/constants/components';

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  className = '',
}) => {
  const { generateBadgeClass } = useBadge({ 
    variant, size, disabled 
  });
  
  const badgeClass = generateBadgeClass({ 
    variant, size, disabled, className 
  });
  
  return (
    <span
      className={badgeClass}
      aria-disabled={disabled}
    >
      {icon && <span className={BADGE.ICON_CLASS}>{icon}</span>}
      <span>{label}</span>
    </span>
  );
}; 

export type { BadgeProps };

// Set display name for debugging
Badge.displayName = 'Badge';

// Default export (primary)
export default Badge;

// Named export for compatibility
export { Badge };