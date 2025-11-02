import React, { useState } from 'react';
import { TOGGLE } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { AtomixGlassProps } from '../../lib/types/components';

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

  /**
   * Inline style for the component
   */
  style?: React.CSSProperties;

  /**
   * Glass morphism effect for the toggle
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
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
  style,
  glass,
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

  const toggleContent = (
    <div
      className={`c-toggle ${isOn ? TOGGLE.CLASSES.IS_ON : ''} ${disabled ? 'is-disabled' : ''} ${className}`}
      style={style}
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

  if (glass) {
    // Default glass settings for toggles
    const defaultGlassProps = {
      displacementScale: 60,
      blurAmount: 1,
      saturation: 160,
      aberrationIntensity: 0.5,
      cornerRadius: 8,
      mode: 'shader' as const,
    };

    const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

    return <AtomixGlass {...glassProps}>{toggleContent}</AtomixGlass>;
  }

  return toggleContent;
};

Toggle.displayName = 'Toggle';

export default Toggle;
