import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../..';
import type { ThemeSection } from '../../types';

// Test component that uses the theme context
const TestComponent = ({ onThemeChange }: { onThemeChange?: (theme: string) => void }) => {
  const { theme, activeTokens, setTheme, isLoading } = useTheme();

  React.useEffect(() => {
    if (!isLoading) {
      onThemeChange?.(theme);
    }
  }, [theme, onThemeChange, isLoading]);

  return (
    <div>
      <div data-testid="theme-primary">{activeTokens?.primary}</div>
      <div data-testid="theme-font-size">{activeTokens?.['body-font-size']}</div>
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
      <button
        data-testid="update-primary"
        onClick={() => setTheme({ primary: '#8b5cf6' })}
      >
        Update Primary
      </button>
      <button
        data-testid="update-typography"
        onClick={() => setTheme({ 'body-font-size': '1.125rem' })}
      >
        Update Typography
      </button>
      <button data-testid="reset-theme" onClick={() => setTheme(defaultTheme)}>
        Reset Theme
      </button>
    </div>
  );
};

// Valid flat theme that passes validation
const defaultTheme = {
  primary: '#7c3aed',
  secondary: '#6b7280',
  success: '#22c55e',
  error: '#ef4444',
  warning: '#eab308',
  info: '#3b82f6',
  light: '#f9fafb',
  dark: '#1f2937',
  'primary-rgb': '124, 58, 237',
  'secondary-rgb': '107, 114, 128',
  'success-rgb': '34, 197, 94',
  'error-rgb': '239, 68, 68',
  'warning-rgb': '234, 179, 8',
  'info-rgb': '59, 130, 246',
  'light-rgb': '249, 250, 251',
  'dark-rgb': '31, 41, 55',
  'primary-text-emphasis': '#111827',
  'secondary-text-emphasis': '#374151',
  'tertiary-text-emphasis': '#6b7280',
  'disabled-text-emphasis': '#9ca3af',
  'invert-text-emphasis': '#f9fafb',
  'brand-text-emphasis': '#7c3aed',
  'error-text-emphasis': '#7f1d1d', // Darker for contrast
  'success-text-emphasis': '#14532d', // Darker for contrast
  'warning-text-emphasis': '#713f12',
  'info-text-emphasis': '#1e3a8a',
  'light-text-emphasis': '#f9fafb',
  'dark-text-emphasis': '#1f2937',
  'primary-bg-subtle': '#f2e8fd',
  'secondary-bg-subtle': '#f3f4f6',
  'tertiary-bg-subtle': '#e5e7eb',
  'invert-bg-subtle': '#1f2937',
  'brand-bg-subtle': '#e4d0fa',
  'error-bg-subtle': '#fef2f2',
  'success-bg-subtle': '#f0fdf4',
  'warning-bg-subtle': '#fefce8',
  'info-bg-subtle': '#eff6ff',
  'light-bg-subtle': '#f9fafb',
  'dark-bg-subtle': '#1f2937',
  'primary-border-subtle': '#d0b2f5',
  'secondary-border-subtle': '#e5e7eb',
  'success-border-subtle': '#86efac',
  'error-border-subtle': '#fca5a5',
  'warning-border-subtle': '#fde047',
  'info-border-subtle': '#93c5fd',
  'brand-border-subtle': '#b88cef',
  'light-border-subtle': '#f3f4f6',
  'dark-border-subtle': '#374151',
  'body-font-size': '1rem',
  'body-bg': '#ffffff',
  'body-color': '#111827',
  'heading-color': '#111827',
};

const customTheme = {
  ...defaultTheme,
  primary: '#8b5cf6',
  'error-text-emphasis': '#7f1d1d',
  'success-text-emphasis': '#14532d',
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should provide default theme when no custom theme is provided', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Default primary from tokens.ts is #7c3aed
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#7c3aed');
    expect(screen.getByTestId('theme-font-size')).toHaveTextContent('1rem');
    expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
  });

  it('should use custom theme when provided', () => {
    render(
      <ThemeProvider defaultTheme={customTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#8b5cf6');
    expect(screen.getByTestId('theme-font-size')).toHaveTextContent('1rem');
  });

  it('should update theme correctly', async () => {
    render(
      <ThemeProvider defaultTheme={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#7c3aed');

    await act(async () => {
      fireEvent.click(screen.getByTestId('update-primary'));
    });

    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#8b5cf6');
    expect(screen.getByTestId('theme-font-size')).toHaveTextContent('1rem');
  });

  it('should handle theme change callbacks', async () => {
    const onThemeChange = vi.fn();

    render(
      <ThemeProvider defaultTheme={defaultTheme} onThemeChange={onThemeChange}>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('update-primary'));
    });

    // onThemeChange is called with the theme name/ID
    expect(onThemeChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should handle theme persistence to localStorage', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    render(
      <ThemeProvider defaultTheme={defaultTheme} enablePersistence={true}>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('update-primary'));
    });

    // Should be called with atomix-theme and the new theme data
    expect(setItemSpy).toHaveBeenCalledWith('atomix-theme', JSON.stringify({ ...defaultTheme, primary: '#8b5cf6' }));
  });

  it('should load theme from localStorage on mount', () => {
    localStorage.setItem('atomix-theme', JSON.stringify(customTheme));

    render(
      <ThemeProvider defaultTheme={defaultTheme} enablePersistence={true}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#8b5cf6');
  });

  it('should handle partial theme updates', async () => {
    const TestPartialUpdate = () => {
      const { updateTheme } = useTheme();
      return (
        <button
          data-testid="partial-update"
          onClick={() => updateTheme('colors', { secondary: '#ec4899' })}
        >
          Partial Update
        </button>
      );
    };

    render(
      <ThemeProvider defaultTheme={defaultTheme}>
        <TestComponent />
        <TestPartialUpdate />
      </ThemeProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('partial-update'));
    });

    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#7c3aed');
  });
});

describe('useTheme Hook Error Handling', () => {
  it('should throw error when used outside ThemeProvider', () => {
    // Silence console.error for this test
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');
  });
});
