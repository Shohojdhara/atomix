import React, { ReactNode } from 'react';

export interface ButtonProps {
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark' | 
             'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-info' | 
             'outline-warning' | 'outline-danger' | 'outline-light' | 'outline-dark' | 'link';
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Button disabled state
   */
  disabled?: boolean;
  /**
   * Optional icon
   */
  icon?: ReactNode;
  /**
   * Icon only button
   */
  iconOnly?: boolean;
  /**
   * Make button fully rounded (pill shape)
   */
  rounded?: boolean;
  /**
   * Additional CSS class names
   */
  className?: string;
}

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
  const sizeClass = size === 'md' ? '' : `c-btn--${size}`;
  const iconOnlyClass = iconOnly ? 'c-btn--icon' : '';
  const roundedClass = rounded ? 'c-btn--rounded' : '';
  const baseClass = `c-btn c-btn--${variant} ${sizeClass} ${iconOnlyClass} ${roundedClass} ${className}`;
  
  return (
    <button
      className={baseClass}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {icon && <span className="c-btn__icon">{icon}</span>}
      {(!iconOnly || !icon) && <span>{label}</span>}
    </button>
  );
};
