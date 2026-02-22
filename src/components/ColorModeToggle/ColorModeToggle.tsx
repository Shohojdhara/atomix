import React, { useEffect, useState, useCallback } from 'react';

export type ColorMode = 'light' | 'dark';

export interface ColorModeToggleProps {
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Controlled mode value */
  value?: ColorMode;
  /** Default mode (uncontrolled) */
  defaultValue?: ColorMode;
  /** Callback when mode changes */
  onChange?: (mode: ColorMode) => void;
  /** Custom light mode icon */
  lightIcon?: React.ReactNode;
  /** Custom dark mode icon */
  darkIcon?: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disable the toggle */
  disabled?: boolean;
  /** localStorage key for persistence */
  storageKey?: string;
  /** data attribute name for body element */
  dataAttribute?: string;
  /** Disable localStorage persistence */
  disableStorage?: boolean;
  /** Disable system preference detection */
  disableSystemPreference?: boolean;
  /** Custom aria-label */
  'aria-label'?: string;
  /** Show tooltip */
  showTooltip?: boolean;
}

const DEFAULT_STORAGE_KEY = 'atomix-color-mode';
const DEFAULT_DATA_ATTRIBUTE = 'data-atomix-color-mode';

const SIZE_MAP = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const ColorModeToggle: React.FC<ColorModeToggleProps> = ({
  className = '',
  style,
  value: controlledValue,
  defaultValue = 'light',
  onChange,
  lightIcon,
  darkIcon,
  size = 'md',
  disabled = false,
  storageKey = DEFAULT_STORAGE_KEY,
  dataAttribute = DEFAULT_DATA_ATTRIBUTE,
  disableStorage = false,
  disableSystemPreference = false,
  'aria-label': ariaLabel,
  showTooltip = true,
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalMode, setInternalMode] = useState<ColorMode>(defaultValue);
  const colorMode = isControlled ? controlledValue : internalMode;

  // Initialize color mode from localStorage or system preference
  useEffect(() => {
    if (isControlled) return;

    // SSR check
    if (typeof window === 'undefined') return;

    // Check if color mode is already set in localStorage
    if (!disableStorage) {
      try {
        const storedColorMode = localStorage.getItem(storageKey);
        if (storedColorMode === 'light' || storedColorMode === 'dark') {
          setInternalMode(storedColorMode);
          return;
        }
      } catch (error) {
        console.warn('ColorModeToggle: Failed to read from localStorage', error);
      }
    }

    // Use system preference if no stored preference
    if (!disableSystemPreference && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setInternalMode('dark');
      }
    }
  }, [isControlled, disableStorage, disableSystemPreference, storageKey]);

  // Update the document theme attribute when colorMode changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const validColorMode = colorMode === 'dark' ? 'dark' : 'light';
    document.body.setAttribute(dataAttribute, validColorMode);

    if (!disableStorage) {
      try {
        localStorage.setItem(storageKey, validColorMode);
      } catch (error) {
        console.warn('ColorModeToggle: Failed to write to localStorage', error);
      }
    }
  }, [colorMode, dataAttribute, disableStorage, storageKey]);

  // Listen for system color scheme changes
  useEffect(() => {
    if (isControlled || disableSystemPreference || typeof window === 'undefined') return;

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      // Only update if user hasn't explicitly set a preference
      if (disableStorage) {
        setInternalMode(event.matches ? 'dark' : 'light');
      } else {
        try {
          const hasStoredPreference = localStorage.getItem(storageKey);
          if (!hasStoredPreference) {
            setInternalMode(event.matches ? 'dark' : 'light');
          }
        } catch (error) {
          console.warn('ColorModeToggle: Failed to check localStorage', error);
        }
      }
    };

    darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [isControlled, disableSystemPreference, disableStorage, storageKey]);

  const toggleColorMode = useCallback(() => {
    if (disabled) return;

    const newMode: ColorMode = colorMode === 'light' ? 'dark' : 'light';

    if (!isControlled) {
      setInternalMode(newMode);
    }

    onChange?.(newMode);
  }, [disabled, colorMode, isControlled, onChange]);

  const iconSize = SIZE_MAP[size];
  const nextMode = colorMode === 'light' ? 'dark' : 'light';
  const label = ariaLabel || `Switch to ${nextMode} mode`;
  const title = showTooltip ? `Switch to ${nextMode} mode` : undefined;

  const defaultLightIcon = (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
    </svg>
  );

  const defaultDarkIcon = (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z" />
    </svg>
  );

  return (
    <button
      type="button"
      className={`c-color-mode-toggle c-color-mode-toggle--${size} ${disabled ? 'c-color-mode-toggle--disabled' : ''} ${className}`}
      onClick={toggleColorMode}
      disabled={disabled}
      aria-label={label}
      aria-pressed={colorMode === 'dark'}
      title={title}
      style={style}
    >
      {colorMode === 'light' ? lightIcon || defaultLightIcon : darkIcon || defaultDarkIcon}
    </button>
  );
};

ColorModeToggle.displayName = 'ColorModeToggle';

export default ColorModeToggle;
