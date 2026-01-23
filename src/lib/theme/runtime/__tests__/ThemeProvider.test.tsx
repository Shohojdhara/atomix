import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../..';
import type { ThemeConfig, ThemeSection } from '../../types';

// Test component that uses the theme context
const TestComponent = ({ onThemeChange }: { onThemeChange?: (theme: string) => void }) => {
  const { theme, activeTokens, setTheme, isLoading } = useTheme();

  React.useEffect(() => {
    onThemeChange?.(theme);
  }, [theme, onThemeChange]);

  return (
    <div>
      <div data-testid="theme-primary">{activeTokens?.colors?.primary}</div>
      <div data-testid="theme-font-size">{activeTokens?.typography?.fontSize}</div>
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
      <button
        data-testid="update-primary"
        onClick={() => setTheme({ colors: { primary: '#8b5cf6' } })}
      >
        Update Primary
      </button>
      <button
        data-testid="update-typography"
        onClick={() => setTheme({ typography: { fontSize: '18px' } })}
      >
        Update Typography
      </button>
      <button
        data-testid="reset-theme"
        onClick={() => setTheme(defaultTheme)}
      >
        Reset Theme
      </button>
    </div>
  );
};

const defaultTheme = {
  'primary': '#7c3aed',
  'secondary': '#6b7280',
  'success': '#22c55e',
  'error': '#ef4444',
  'warning': '#eab308',
  'info': '#3b82f6',
  'light': '#f9fafb',
  'dark': '#1f2937',
  'primary-rgb': '124, 58, 237',
  'secondary-rgb': '107, 114, 128',
  'success-rgb': '34, 197, 94',
  'error-rgb': '239, 68, 68',
  'warning-rgb': '234, 179, 8',
  'info-rgb': '59, 130, 246',
  'light-rgb': '249, 250, 251',
  'dark-rgb': '31, 41, 55',
  'gray-1': '#f9fafb',
  'gray-2': '#f3f4f6',
  'gray-3': '#e5e7eb',
  'gray-4': '#d1d5db',
  'gray-5': '#9ca3af',
  'gray-6': '#6b7280',
  'gray-7': '#4b5563',
  'gray-8': '#374151',
  'gray-9': '#1f2937',
  'gray-10': '#111827',
  'primary-1': '#f2e8fd',
  'primary-2': '#e4d0fa',
  'primary-3': '#d0b2f5',
  'primary-4': '#b88cef',
  'primary-5': '#9c63e9',
  'primary-6': '#7c3aed',
  'primary-7': '#6425ca',
  'primary-8': '#501ba6',
  'primary-9': '#3c1583',
  'primary-10': '#2a0e60',
  'red-1': '#fef2f2',
  'red-2': '#fee2e2',
  'red-3': '#fecaca',
  'red-4': '#fca5a5',
  'red-5': '#f87171',
  'red-6': '#ef4444',
  'red-7': '#dc2626',
  'red-8': '#b91c1c',
  'red-9': '#991b1b',
  'red-10': '#7f1d1d',
  'green-1': '#f0fdf4',
  'green-2': '#dcfce7',
  'green-3': '#bbf7d0',
  'green-4': '#86efac',
  'green-5': '#4ade80',
  'green-6': '#22c55e',
  'green-7': '#16a34a',
  'green-8': '#15803d',
  'green-9': '#166534',
  'green-10': '#14532d',
  'blue-1': '#eff6ff',
  'blue-2': '#dbeafe',
  'blue-3': '#bfdbfe',
  'blue-4': '#93c5fd',
  'blue-5': '#60a5fa',
  'blue-6': '#3b82f6',
  'blue-7': '#2563eb',
  'blue-8': '#1d4ed8',
  'blue-9': '#1e40af',
  'blue-10': '#1e3a8a',
  'yellow-1': '#fefce8',
  'yellow-2': '#fef9c3',
  'yellow-3': '#fef08a',
  'yellow-4': '#fde047',
  'yellow-5': '#facc15',
  'yellow-6': '#eab308',
  'yellow-7': '#ca8a04',
  'yellow-8': '#a16207',
  'yellow-9': '#854d0e',
  'yellow-10': '#713f12',
  'primary-text-emphasis': '#111827',
  'secondary-text-emphasis': '#374151',
  'tertiary-text-emphasis': '#6b7280',
  'disabled-text-emphasis': '#9ca3af',
  'invert-text-emphasis': '#f9fafb',
  'brand-text-emphasis': '#7c3aed',
  'error-text-emphasis': '#dc2626',
  'success-text-emphasis': '#16a34a',
  'warning-text-emphasis': '#ca8a04',
  'info-text-emphasis': '#1d4ed8',
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
  'primary-hover': '#6425ca',
  'secondary-hover': '#d1d5db',
  'light-hover': '#f3f4f6',
  'dark-hover': '#4b5563',
  'error-hover': '#dc2626',
  'success-hover': '#16a34a',
  'warning-hover': '#ca8a04',
  'info-hover': '#2563eb',
  'primary-gradient': 'linear-gradient(135deg, #e4d0fa, #d0b2f5, #b88cef)',
  'secondary-gradient': 'linear-gradient(135deg, #f3f4f6, #e5e7eb, #d1d5db)',
  'light-gradient': 'linear-gradient(135deg, #f9fafb, #f3f4f6, #e5e7eb)',
  'dark-gradient': 'linear-gradient(135deg, #4b5563, #1f2937, #000000)',
  'success-gradient': 'linear-gradient(135deg, #f0fdf4, #dcfce7, #bbf7d0)',
  'info-gradient': 'linear-gradient(135deg, #eff6ff, #dbeafe, #bfdbfe)',
  'warning-gradient': 'linear-gradient(135deg, #fefce8, #fef9c3, #fef08a)',
  'error-gradient': 'linear-gradient(135deg, #fef2f2, #fee2e2, #fecaca)',
  'gradient': 'linear-gradient(135deg, #f9fafb, #f3f4f6, #e5e7eb)',
  'font-sans-serif': '"Roboto", sans-serif',
  'font-monospace': 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  'body-font-family': '"Roboto", sans-serif',
  'body-font-size': '1rem',
  'body-font-weight': '400',
  'body-line-height': '1.2',
  'body-color': '#111827',
  'body-bg': '#ffffff',
  'heading-color': '#111827',
  'font-size-xl': '1.5rem',
  'font-size-2xl': '2rem',
  'display-1': '4rem',
  'font-weight-light': '300',
  'font-weight-normal': '400',
  'font-weight-medium': '500',
  'font-weight-semibold': '600',
  'font-weight-bold': '700',
  'font-weight-heavy': '800',
  'font-weight-black': '900',
  'line-height-base': '1.2',
  'line-height-sm': '1.43',
  'line-height-lg': '1.56',
  'letter-spacing-h1': '-1px',
  'letter-spacing-h2': '-1px',
  'letter-spacing-h3': '-1px',
  'letter-spacing-h4': '-0.5px',
  'letter-spacing-h5': '-0.5px',
  'letter-spacing-h6': '-0.5px',
  'link-color': '#7c3aed',
  'link-color-rgb': '124, 58, 237',
  'link-decoration': 'none',
  'link-hover-color': 'rgb(85.3674418605, 18.2930232558, 200.2069767442)',
  'link-hover-color-rgb': '85.3674418605, 18.2930232558, 200.2069767442',
  'highlight-bg': '#fef08a',
  'code-color': '#f87171',
  'border-width': '1px',
  'border-style': 'solid',
  'border-color': '#e5e7eb',
  'border-color-translucent': 'rgba(229, 231, 235, 0.175)',
  'border-radius': '0.5rem',
  'border-radius-sm': '0.25rem',
  'border-radius-lg': '0.625rem',
  'border-radius-xl': '0.75rem',
  'border-radius-xxl': '1rem',
  'border-radius-2xl': 'var(--atomix-border-radius-xxl)',
  'border-radius-3xl': '1.5rem',
  'border-radius-4xl': '2rem',
  'border-radius-pill': '50rem',
  'box-shadow': '0 8px 16px rgba(0, 0, 0, 0.15)',
  'box-shadow-xs': '0px 1px 2px 0px rgba(45, 54, 67, 0.04), 0px 2px 4px 0px rgba(45, 54, 67, 0.08)',
  'box-shadow-sm': '0 2px 4px rgba(0, 0, 0, 0.075)',
  'box-shadow-lg': '0 16px 48px rgba(0, 0, 0, 0.175)',
  'box-shadow-xl': '0px 16px 64px -8px rgba(45, 54, 67, 0.14)',
  'box-shadow-inset': 'inset 0 1px 2px rgba(0, 0, 0, 0.075)',
  'focus-border-color': '#9c63e9',
  'focus-ring-width': '3px',
  'focus-ring-offset': '2px',
  'focus-ring-opacity': '0.25',
  'form-valid-color': '#22c55e',
  'form-valid-border-color': '#22c55e',
  'form-invalid-color': '#ef4444',
  'form-invalid-border-color': '#ef4444',
  'spacing-0': '0rem',
  'spacing-1': '0.25rem',
  'spacing-px-6': '0.375rem',
  'spacing-2': '0.5rem',
  'spacing-px-10': '0.625rem',
  'spacing-3': '0.75rem',
  'spacing-px-14': '0.875rem',
  'spacing-4': '1rem',
  'spacing-5': '1.25rem',
  'spacing-px-22': '1.375rem',
  'spacing-6': '1.5rem',
  'spacing-7': '1.75rem',
  'spacing-px-30': '1.875rem',
  'spacing-8': '2rem',
  'spacing-9': '2.25rem',
  'spacing-10': '2.5rem',
  'spacing-11': '2.75rem',
  'spacing-12': '3rem',
  'spacing-14': '3.5rem',
  'spacing-16': '4rem',
  'spacing-20': '5rem',
  'spacing-24': '6rem',
  'spacing-28': '7rem',
  'spacing-32': '8rem',
  'spacing-36': '9rem',
  'spacing-40': '10rem',
  'spacing-44': '11rem',
  'spacing-48': '12rem',
  'spacing-52': '13rem',
  'spacing-56': '14rem',
  'spacing-60': '15rem',
  'spacing-64': '16rem',
  'spacing-72': '18rem',
  'spacing-80': '20rem',
  'spacing-90': '22.5rem',
  'spacing-200': '50rem',
  'transition-duration-fast': '0.15s',
  'transition-duration-base': '0.3s',
  'transition-duration-slow': '0.5s',
  'transition-duration-slower': '0.7s',
  'easing-base': 'cubic-bezier(0.23, 1, 0.32, 1)',
  'easing-ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'easing-ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
  'easing-ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
  'easing-ease-linear': 'linear',
  'transition-fast': 'all 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
  'transition-base': 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
  'transition-slow': 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
  'z-n1': '-1',
  'z-0': '0',
  'z-1': '1',
  'z-2': '2',
  'z-3': '3',
  'z-4': '4',
  'z-5': '5',
  'z-dropdown': '1000',
  'z-sticky': '1020',
  'z-fixed': '1030',
  'z-modal': '1040',
  'z-popover': '1050',
  'z-tooltip': '1060',
  'z-drawer': '1070',
  'breakpoint-xs': '0',
  'breakpoint-sm': '576px',
  'breakpoint-md': '768px',
  'breakpoint-lg': '992px',
  'breakpoint-xl': '1200px',
  'breakpoint-xxl': '1440px',
};

const customTheme = {
  ...defaultTheme,
  'primary': '#8b5cf6',
  'error-text-emphasis': '#7f1d1d',
  'success-text-emphasis': '#14532d',
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should provide default theme when no custom theme is provided', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#667eea');
    expect(screen.getByTestId('theme-font-size')).toHaveTextContent('16px');
    expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
  });

  it('should use custom theme when provided', () => {
    render(
      <ThemeProvider defaultTheme={customTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#8b5cf6');
    expect(screen.getByTestId('theme-font-size')).toHaveTextContent('16px');
  });

  it('should update theme section correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    // Initially has default primary color
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#667eea');

    // Update primary color
    act(() => {
      fireEvent.click(screen.getByTestId('update-primary'));
    });

    // Should have updated primary color
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#8b5cf6');
    // Other sections should remain unchanged
    expect(screen.getByTestId('theme-font-size')).toHaveTextContent('16px');
  });

  it('should update different theme sections independently', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    // Update primary color
    act(() => {
      fireEvent.click(screen.getByTestId('update-primary'));
    });

    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#8b5cf6');

    // Update typography
    act(() => {
      fireEvent.click(screen.getByTestId('update-typography'));
    });

    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#8b5cf6'); // Should remain unchanged
    expect(screen.getByTestId('theme-font-size')).toHaveTextContent('18px');
  });

  it('should reset theme to original values', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    // Update both colors and typography
    act(() => {
      fireEvent.click(screen.getByTestId('update-primary'));
      fireEvent.click(screen.getByTestId('update-typography'));
    });

    // Verify changes
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#8b5cf6');
    expect(screen.getByTestId('theme-font-size')).toHaveTextContent('18px');

    // Reset theme
    act(() => {
      fireEvent.click(screen.getByTestId('reset-theme'));
    });

    // Should be back to original values
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#667eea');
    expect(screen.getByTestId('theme-font-size')).toHaveTextContent('16px');
  });

  it('should handle theme change callbacks', () => {
    const onThemeChange = vi.fn();
    
    render(
      <ThemeProvider theme={defaultTheme}>
        <TestComponent onThemeChange={onThemeChange} />
      </ThemeProvider>
    );

    // Update theme
    act(() => {
      fireEvent.click(screen.getByTestId('update-primary'));
    });

    expect(onThemeChange).toHaveBeenCalledWith(
      expect.objectContaining({
        colors: expect.objectContaining({
          primary: '#8b5cf6'
        })
      })
    );
  });

  it('should handle theme persistence to localStorage', () => {
    // Mock localStorage
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    render(
      <ThemeProvider theme={defaultTheme} persistTheme={true}>
        <TestComponent />
      </ThemeProvider>
    );

    // Update theme
    act(() => {
      fireEvent.click(screen.getByTestId('update-primary'));
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      'atomix-theme',
      expect.stringContaining('#8b5cf6')
    );

    setItemSpy.mockRestore();
  });

  it('should load theme from localStorage on mount', () => {
    // Pre-populate localStorage with a theme
    localStorage.setItem('atomix-theme', JSON.stringify(customTheme));

    render(
      <ThemeProvider theme={defaultTheme} persistTheme={true}>
        <TestComponent />
      </ThemeProvider>
    );

    // Should load the persisted theme, not the default
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#8b5cf6');
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw an error
    const errorSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ThemeProvider theme={defaultTheme} persistTheme={true}>
        <TestComponent />
      </ThemeProvider>
    );

    // Should still work despite localStorage error
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#667eea');

    // Update theme
    act(() => {
      fireEvent.click(screen.getByTestId('update-primary'));
    });

    // Theme should still update
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#8b5cf6');

    errorSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it('should provide loading state during theme initialization', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    // Should eventually show loaded state
    expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
  });

  it('should handle partial theme updates', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    // Update only part of the colors section
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
      <ThemeProvider theme={defaultTheme}>
        <TestComponent />
        <TestPartialUpdate />
      </ThemeProvider>
    );

    // Partial update
    act(() => {
      fireEvent.click(screen.getByTestId('partial-update'));
    });

    // Primary should remain unchanged, secondary should update
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#667eea');
  });
});

describe('useTheme Hook Error Handling', () => {
  it('should throw error when used outside ThemeProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');

    consoleSpy.mockRestore();
  });

  it('should handle invalid theme sections gracefully', () => {
    const TestInvalidUpdate = () => {
      const { updateTheme } = useTheme();
      
      return (
        <button 
          data-testid="invalid-update" 
          onClick={() => updateTheme('invalid-section' as ThemeSection, { test: 'value' })}
        >
          Invalid Update
        </button>
      );
    };

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ThemeProvider theme={defaultTheme}>
        <TestComponent />
        <TestInvalidUpdate />
      </ThemeProvider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('invalid-update'));
    });

    // Should not crash and theme should remain unchanged
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#667eea');

    consoleSpy.mockRestore();
  });
});