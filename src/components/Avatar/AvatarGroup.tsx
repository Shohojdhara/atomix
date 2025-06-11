import React, { Children, cloneElement, isValidElement } from 'react';
import { AvatarGroupProps, AvatarProps } from '../../lib/types/components';
import { AVATAR_GROUP, AVATAR } from '../../lib/constants/components';
import { Avatar } from './Avatar';

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  stacked = false,
  className = '',
  moreText,
}) => {
  // Generate CSS classes
  const avatarGroupClasses = [
    AVATAR_GROUP.CLASSES.BASE,
    stacked && AVATAR_GROUP.CLASSES.STACKED,
    className,
  ].filter(Boolean).join(' ');

  // Get valid Avatar children
  const avatarChildren = Children.toArray(children).filter(
    child => isValidElement(child) && child.type === Avatar
  );

  // Determine if we need to show the "more" indicator
  const showMoreIndicator = max !== undefined && avatarChildren.length > max;
  const visibleAvatars = showMoreIndicator 
    ? avatarChildren.slice(0, max) 
    : avatarChildren;
  const hiddenAvatarCount = avatarChildren.length - (max || 0);

  // Extract size and shape from first avatar to ensure consistent styling
  const firstAvatar = isValidElement<AvatarProps>(avatarChildren[0]) 
    ? avatarChildren[0].props 
    : null;
  const avatarSize = firstAvatar?.size || 'md';
  const isCircle = firstAvatar?.circle || false;

  // Generate more indicator classes
  const moreClasses = [
    AVATAR.CLASSES.BASE,
    AVATAR_GROUP.CLASSES.MORE,
    avatarSize !== 'md' && `c-avatar--${avatarSize}`,
    isCircle && 'c-avatar--circle',
  ].filter(Boolean).join(' ');

  return (
    <div className={avatarGroupClasses}>
      {visibleAvatars.map((child, index) => {
        if (isValidElement<AvatarProps>(child)) {
          // Clone the Avatar element to ensure proper styling
          return cloneElement(child, {
            key: index,
            ...child.props,
          });
        }
        return null;
      })}

      {showMoreIndicator && (
        <div className={moreClasses}>
          {moreText || `+${hiddenAvatarCount}`}
        </div>
      )}
    </div>
  );
};

export type { AvatarGroupProps, AvatarProps }

// Set display name for debugging
AvatarGroup.displayName = 'Accordion';

// Default export (primary)
export default AvatarGroup;

// Named export for compatibility
export { AvatarGroup };