import React, { forwardRef, ElementType } from 'react';
import { ButtonProps } from '../../lib/types/components';
import { useButton } from '../../lib/composables/useButton';
import { BUTTON } from '../../lib/constants/components';

type ButtonAsProp = {
  as?: ElementType;
  to?: string;
  href?: string;
  [key: string]: any;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps & ButtonAsProp>(({
  label,
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  iconOnly = false,
  rounded = false,
  className = '',
  as: Component = 'button',
  ...props
}, ref) => {
  const { generateButtonClass, handleClick } = useButton({ 
    variant, size, disabled, rounded 
  });
  
  const buttonClass = generateButtonClass({ 
    variant, size, disabled, rounded, iconOnly, className 
  });
  
  // Handle the case when the button is rendered as a link or another component
  const buttonProps = {
    ref,
    className: buttonClass,
    onClick: handleClick(onClick),
    disabled,
    'aria-disabled': disabled,
    ...props,
  };

  return (
    <Component {...buttonProps}>
      {icon && <span className="button__icon">{icon}</span>}
      {!iconOnly && <span className="button__label">{label || children}</span>}
    </Component>
  );
});

// Add displayName for better debugging
Button.displayName = 'Button';
