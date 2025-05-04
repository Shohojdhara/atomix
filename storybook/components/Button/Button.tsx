import React from 'react';
import { ButtonProps } from '../../lib/types/components';
import { useButton } from '../../lib/composables/useButton';
import { BUTTON } from '../../lib/constants/components';

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  iconOnly = false,
  rounded = false,
  className = '',
}) => {
  const { generateButtonClass, handleClick } = useButton({ 
    variant, size, disabled, rounded 
  });
  
  const buttonClass = generateButtonClass({ 
    variant, size, disabled, rounded, iconOnly, className 
  });
  
  return (
    <button
      className={buttonClass}
      onClick={handleClick(onClick)}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {icon && <span className={BUTTON.ICON_CLASS}>{icon}</span>}
      {(!iconOnly || !icon) && <span>{label}</span>}
    </button>
  );
};
