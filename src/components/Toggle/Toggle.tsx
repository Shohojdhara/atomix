import React, { useState, useCallback, useEffect } from 'react';
import { TOGGLE } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { AtomixGlassProps, BaseComponentProps } from '../../lib/types/components';

export interface ToggleProps extends BaseComponentProps {
  /**
   * Whether the toggle is checked (controlled)
   */
  checked?: boolean;

  /**
   * Whether the toggle is initially checked (uncontrolled)
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Callback when the toggle state changes
   */
  onChange?: (checked: boolean) => void;

  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;

  /**
   * Accessibility label
   */
  'aria-label'?: string;

  /**
   * Accessibility description
   */
  'aria-describedby'?: string;

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
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className = '',
  style,
  glass,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}) => {
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;

  // Sync internal state with defaultChecked if it changes (standard uncontrolled behavior)
  // Actually, standard behavior is only using defaultChecked on mount, but sometimes syncing is needed.
  // For now, let's keep it simple.

  // Handle toggle click
  const handleClick = useCallback(() => {
    if (disabled) return;

    const nextChecked = !isChecked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onChange?.(nextChecked);
  }, [disabled, isChecked, isControlled, onChange]);

  // Handle key down events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const toggleClass = [
    'c-toggle',
    isChecked && TOGGLE.CLASSES.IS_ON,
    disabled && 'is-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const toggleContent = (
    <div
      className={toggleClass}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="switch"
      aria-checked={isChecked}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
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
