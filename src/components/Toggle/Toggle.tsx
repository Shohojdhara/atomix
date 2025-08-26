import React, { useState } from 'react';
import { TOGGLE } from '../../lib/constants/components';

export interface ToggleProps {
  /**
   * Whether the toggle is initially on
   */
  initialOn?: boolean;

  /**
   * Callback when the toggle is turned on
   */
  onToggleOn?: () => void;

  /**
   * Callback when the toggle is turned off
   */
  onToggleOff?: () => void;

  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;

  /**
   * Additional CSS class for the toggle
   */
  className?: string;
}

/**
 * Toggle component for switching between two states
 */
export const Toggle: React.FC<ToggleProps> = ({
  initialOn = false,
  onToggleOn,
  onToggleOff,
  disabled = false,
  className = '',
}) => {
  const [isOn, setIsOn] = useState(initialOn);

  // Handle toggle click
  const handleClick = () => {
    if (disabled) return;

    const newState = !isOn;
    setIsOn(newState);

    if (newState) {
      if (onToggleOn) onToggleOn();
    } else {
      if (onToggleOff) onToggleOff();
    }
  };

  // Handle key down events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`c-toggle ${isOn ? TOGGLE.CLASSES.IS_ON : ''} ${disabled ? 'is-disabled' : ''} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="switch"
      aria-checked={isOn}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <div className="c-toggle__switch"></div>
    </div>
  );
};

Toggle.displayName = 'Toggle';

export default Toggle;
