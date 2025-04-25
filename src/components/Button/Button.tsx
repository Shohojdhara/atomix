import React from 'react';

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
  variant?: 'primary' | 'secondary';
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Button disabled state
   */
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  return (
    <button
      className={`c-btn c-btn--${variant} c-btn--${size} ${disabled ? 'c-btn--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
