import React, { useRef, useEffect, useState } from 'react';
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
  const toggleRef = useRef<HTMLDivElement>(null);
  const toggleInstance = useRef<any>(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined' || !toggleRef.current) return undefined;

    // Initialize toggle instance
    import('./scripts').then(({ default: ToggleClass }) => {
      if (toggleRef.current) {
        toggleInstance.current = new ToggleClass(toggleRef.current);
      }
    });

    // Add event listeners for custom events
    const handleToggleOn = () => {
      setIsOn(true);
      if (onToggleOn) onToggleOn();
    };

    const handleToggleOff = () => {
      setIsOn(false);
      if (onToggleOff) onToggleOff();
    };

    const element = toggleRef.current;
    element?.addEventListener('toggle:on', handleToggleOn);
    element?.addEventListener('toggle:off', handleToggleOff);

    // Set initial state if needed
    if (initialOn && toggleInstance.current) {
      toggleInstance.current.turnOn();
    }

    // Cleanup on unmount
    return () => {
      element?.removeEventListener('toggle:on', handleToggleOn);
      element?.removeEventListener('toggle:off', handleToggleOff);

      if (toggleInstance.current) {
        toggleInstance.current.destroy();
      }
    };
  }, [initialOn, onToggleOn, onToggleOff]);

  // Update the toggle when the isOn prop changes
  useEffect(() => {
    if (!toggleInstance.current) return;

    if (isOn) {
      toggleInstance.current.turnOn();
    } else {
      toggleInstance.current.turnOff();
    }
  }, [isOn]);

  return (
    <div
      className={`c-toggle ${isOn ? TOGGLE.CLASSES.IS_ON : ''} ${disabled ? 'is-disabled' : ''} ${className}`}
      ref={toggleRef}
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
