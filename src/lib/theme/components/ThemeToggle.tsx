/**
 * ThemeToggle Component
 * 
 * A pre-built toggle button for switching between light and dark themes.
 * Includes smooth animations and system preference detection.
 * 
 * @example
 * ```tsx
 * import { ThemeToggle } from '@shohojdhara/atomix/theme';
 * 
 * function Header() {
 *   return (
 *     <header>
 *       <h1>My App</h1>
 *       <ThemeToggle />
 *     </header>
 *   );
 * }
 * ```
 */

import React from 'react';
import { useThemeSwitcher } from '../hooks/useThemeSwitcher';
import type { UseThemeSwitcherOptions } from '../hooks/useThemeSwitcher';

export interface ThemeToggleProps extends Omit<UseThemeSwitcherOptions, 'initialMode'> {
  /** Custom class name */
  className?: string;
  /** Show text label (default: false) */
  showLabel?: boolean;
  /** Label for light mode (default: 'Light') */
  lightLabel?: string;
  /** Label for dark mode (default: 'Dark') */
  darkLabel?: string;
  /** Icon size in pixels (default: 20) */
  iconSize?: number;
  /** Button variant (default: 'icon') */
  variant?: 'icon' | 'button' | 'switch';
  /** Custom render function */
  render?: (props: {
    isDark: boolean;
    toggle: () => void;
    mode: import('../utils/themeUtils').ThemeMode;
  }) => React.ReactNode;
  /** Aria label (default: 'Toggle theme') */
  ariaLabel?: string;
}

/**
 * ThemeToggle component with multiple variants
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
  lightLabel = 'Light',
  darkLabel = 'Dark',
  iconSize = 20,
  variant = 'icon',
  render,
  ariaLabel = 'Toggle theme',
  ...hookOptions
}) => {
  const { mode, isDark, toggle } = useThemeSwitcher(hookOptions);

  // Custom render
  if (render) {
    return <>{render({ isDark, toggle, mode })}</>;
  }

  // Icon-only variant (default)
  if (variant === 'icon') {
    return (
      <button
        onClick={toggle}
        className={`theme-toggle theme-toggle-icon ${className}`}
        aria-label={ariaLabel}
        title={isDark ? darkLabel : lightLabel}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {isDark ? (
          // Sun icon for dark mode (click to go light)
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          // Moon icon for light mode (click to go dark)
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    );
  }

  // Button variant with text
  if (variant === 'button') {
    return (
      <button
        onClick={toggle}
        className={`theme-toggle theme-toggle-button ${className}`}
        aria-label={ariaLabel}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid currentColor',
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {isDark ? (
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
        {showLabel && <span>{isDark ? darkLabel : lightLabel}</span>}
      </button>
    );
  }

  // Switch/toggle variant
  if (variant === 'switch') {
    return (
      <div
        className={`theme-toggle theme-toggle-switch ${className}`}
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(e) => e.key === 'Enter' && toggle()}
        aria-label={ariaLabel}
        style={{
          position: 'relative',
          width: '56px',
          height: '28px',
          borderRadius: '14px',
          background: isDark ? '#4b5563' : '#d1d5db',
          cursor: 'pointer',
          transition: 'background 0.3s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          padding: '2px',
        }}
      >
        {/* Track */}
        <div
          style={{
            position: 'absolute',
            left: isDark ? 'auto' : '2px',
            right: isDark ? '2px' : 'auto',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isDark ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4b5563"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </div>
      </div>
    );
  }

  return null;
};

ThemeToggle.displayName = 'ThemeToggle';
