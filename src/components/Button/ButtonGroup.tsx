import React, { Children, cloneElement, isValidElement } from 'react';
import { ButtonGroupProps, ButtonProps } from '../../lib/types/components';
import { BUTTON_GROUP } from '../../lib/constants/components';
import { Button } from './Button';

/**
 * ButtonGroup - A component for grouping buttons together
 * 
 * Groups buttons together with proper border radius handling and spacing.
 * The buttons will be visually connected with shared borders.
 * 
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button label="Left" />
 *   <Button label="Middle" />
 *   <Button label="Right" />
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className = '',
  style,
  'aria-label': ariaLabel,
  role = 'group',
}) => {
  // Generate CSS classes
  const buttonGroupClasses = [
    BUTTON_GROUP.CLASSES.BASE,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Get valid Button children
  const buttonChildren = Children.toArray(children).filter(
    child => isValidElement(child) && child.type === Button
  );

  return (
    <div
      className={buttonGroupClasses}
      style={style}
      role={role}
      aria-label={ariaLabel}
    >
      {buttonChildren.map((child, index) => {
        if (isValidElement<ButtonProps>(child)) {
          // Clone the Button element to ensure proper styling
          return cloneElement(child, {
            key: index,
            ...child.props,
          });
        }
        return null;
      })}
    </div>
  );
};

export type { ButtonGroupProps };

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;

