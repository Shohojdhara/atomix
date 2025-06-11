import React, { useState } from 'react';
import { AvatarProps } from '../../lib/types/components';
import { AVATAR } from '../../lib/constants/components';
import { Icon } from '../Icon';

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials,
  icon,
  size = 'md',
  circle = false,
  className = '',
  disabled = false,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Generate CSS classes
  const avatarClasses = [
    AVATAR.CLASSES.BASE,
    size !== 'md' && `c-avatar--${size}`,
    circle && AVATAR.CLASSES.CIRCLE,
    disabled && 'is-disabled',
    className,
  ].filter(Boolean).join(' ');

  // Handle click event
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <div 
      className={avatarClasses}
      onClick={onClick ? handleClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
    >
      {src && !imageError ? (
        <img 
          src={src} 
          alt={alt} 
          className="c-avatar__image" 
          onError={handleImageError}
        />
      ) : initials ? (
        <span className="c-avatar__initials">{initials}</span>
      ) : icon ? (
        <span className="c-avatar__icon">{icon}</span>
      ) : (
        <span className="c-avatar__icon">
          <Icon name="User" size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'md'} />
        </span>
      )}
    </div>
  );
};


export type { AvatarProps };

// Set display name for debugging
Avatar.displayName = 'Avatar';

// Default export (primary)
export default Avatar;

// Named export for compatibility
export { Avatar };