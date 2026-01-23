/**
 * Theme Provider Integration Tests
 *
 * Integration tests that render components with themes and verify styling application.
 */

import React from 'react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { useTheme } from '../useTheme';
import { createTokens, defaultTokens } from '../../tokens/tokens';
import type { ThemeMetadata, DesignTokens } from '../../types';

// Mock DOM utilities
vi.mock('../../utils/domUtils', () => ({
  isServer: vi.fn(() => false),
  createLocalStorageAdapter: vi.fn(() => ({
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    isAvailable: vi.fn(() => true),
  })),
  applyThemeAttributes: vi.fn(),
  buildThemePath: vi.fn((theme, basePath) => `${basePath}${theme}.css`),
  loadThemeCSS: vi.fn(() => Promise.resolve()),
}));

// Mock CSS injection utilities
vi.mock('../../utils/injectCSS', () => ({
  injectCSS: vi.fn(),
  removeCSS: vi.fn(),
}));

// Mock theme creation
vi.mock('../../core', () => ({
  createTheme: vi.fn((tokens: DesignTokens) => {
    const css = Object.entries(tokens)
      .map(([key, value]) => `--atomix-${key}: ${value};`)
      .join('\n');
    return `:root {\n${css}\n}`;
  }),
}));

// Mock validation
vi.mock('../../utils/themeValidation', () => ({
  validateAndMergeTokens: vi.fn((tokens?: Partial<DesignTokens>) => ({
    tokens: tokens ? createTokens(tokens) : defaultTokens,
    validation: { valid: true, errors: [], warnings: [] },
  })),
}));

// Mock logger
vi.mock('../../errors', () => ({
  getLogger: vi.fn(() => ({
    warn: vi.fn(),
    error: vi.fn(),
  })),
}));

// Sample component that uses CSS variables
const StyledComponent: React.FC = () => {
  const style = {
    color: 'var(--atomix-primary-text-emphasis)',
    backgroundColor: 'var(--atomix-primary-bg-subtle)',
    border: '1px solid var(--atomix-primary-border-subtle)',
    padding: 'var(--atomix-spacing-4)',
    borderRadius: 'var(--atomix-border-radius)',
  };

  return (
    <div data-testid="styled-component" style={style}>
      Styled Component
    </div>
  );
};

// Component that uses theme context
const ThemeAwareComponent: React.FC = () => {
  const { theme, activeTokens } = useTheme();

  return (
    <div>
      <div data-testid="theme-name">{theme}</div>
      <div data-testid="has-tokens">{activeTokens ? 'has-tokens' : 'no-tokens'}</div>
      <StyledComponent />
    </div>
  );
};

// Mock theme metadata
const mockThemes: Record<string, ThemeMetadata> = {
  'default-light': {
    name: 'Default Light',
    class: 'theme-default-light',
    description: 'Default light theme',
    supportsDarkMode: false,
    status: 'stable',
  },
  'dark-complementary': {
    name: 'Dark Complementary',
    class: 'theme-dark-complementary',
    description: 'Dark theme with complementary colors',
    supportsDarkMode: true,
    status: 'stable',
  },
  'high-contrast': {
    name: 'High Contrast',
    class: 'theme-high-contrast',
    description: 'High contrast theme for accessibility',
    supportsDarkMode: true,
    status: 'stable',
    a11y: {
      contrastTarget: 7,
      modes: ['dark', 'light'],
    },
  },
};

describe('ThemeProvider Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear any injected styles
    document.head.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.head.innerHTML = '';
  });

  describe('CSS Variable Application to Components', () => {
    it('should apply theme attributes to document element for string themes', async () => {
      await render(
        <ThemeProvider themes={mockThemes} defaultTheme="dark-complementary">
          <ThemeAwareComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-name')).toHaveTextContent('dark-complementary');
      expect(screen.getByTestId('has-tokens')).toHaveTextContent('no-tokens');

      const { applyThemeAttributes } = await import('../../utils/domUtils');
      expect(applyThemeAttributes).toHaveBeenCalledWith('dark-complementary', 'data-theme');
    });

    it('should apply DesignTokens and inject CSS on mount', async () => {
      const customTokens: DesignTokens = {
        ...defaultTokens,
        'primary-text-emphasis': '#ff0000',
      };

      await render(
        <ThemeProvider defaultTheme={customTokens}>
          <ThemeAwareComponent />
        </ThemeProvider>
      );

      // Check that theme is set
      expect(screen.getByTestId('theme-name')).toHaveTextContent('tokens-theme');
      expect(screen.getByTestId('has-tokens')).toHaveTextContent('has-tokens');

      // Check that CSS was injected
      const { injectCSS } = await import('../../utils/injectCSS');
      expect(injectCSS).toHaveBeenCalledWith(
        expect.stringContaining('--atomix-primary-text-emphasis: #ff0000'),
        'theme-tokens-theme'
      );
    });
  });

  describe('Component Styling Verification', () => {
    it('should render components with theme context', () => {
      render(
        <ThemeProvider>
          <ThemeAwareComponent />
        </ThemeProvider>
      );

      const component = screen.getByTestId('styled-component');
      expect(component).toBeInTheDocument();
      expect(component).toHaveTextContent('Styled Component');
      expect(screen.getByTestId('theme-name')).toHaveTextContent('default');
    });

    it('should apply different DesignTokens themes to components', async () => {
      const customTokens = createTokens({
        'primary-text-emphasis': '#ff0000',
        'primary-bg-subtle': '#f0f0f0',
      });

      render(
        <ThemeProvider defaultTheme={customTokens}>
          <ThemeAwareComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-name')).toHaveTextContent('tokens-theme');
      expect(screen.getByTestId('has-tokens')).toHaveTextContent('has-tokens');

      // CSS injection should have occurred
      const { injectCSS } = await import('../../utils/injectCSS');
      expect(injectCSS).toHaveBeenCalledWith(
        expect.stringContaining('--atomix-primary-text-emphasis: #ff0000'),
        'theme-tokens-theme'
      );
    });
  });

  describe('Theme Persistence Integration', () => {
    it('should restore theme from localStorage on mount', async () => {
      const { createLocalStorageAdapter } = await import('../../utils/domUtils');
      const mockStorage = {
        getItem: vi.fn(() => 'dark-complementary'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        isAvailable: vi.fn(() => true),
      };
      createLocalStorageAdapter.mockReturnValue(mockStorage);

      render(
        <ThemeProvider themes={mockThemes} enablePersistence={true}>
          <ThemeAwareComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-name')).toHaveTextContent('dark-complementary');
    });

    it('should persist theme changes to localStorage', async () => {
      const { createLocalStorageAdapter } = await import('../../utils/domUtils');
      const mockStorage = {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        isAvailable: vi.fn(() => true),
      };
      createLocalStorageAdapter.mockReturnValue(mockStorage);

      render(
        <ThemeProvider themes={mockThemes} enablePersistence={true}>
          <ThemeAwareComponent />
        </ThemeProvider>
      );

      expect(mockStorage.setItem).toHaveBeenCalledWith('atomix-theme', 'default');
    });
  });

  describe('Error Handling Integration', () => {
    it('should continue rendering components even when theme loading fails', async () => {
      const { loadThemeCSS } = await import('../../utils/domUtils');
      loadThemeCSS.mockRejectedValueOnce(new Error('CSS load failed'));

      render(
        <ThemeProvider themes={mockThemes}>
          <ThemeAwareComponent />
        </ThemeProvider>
      );

      // Component should still render
      expect(screen.getByTestId('styled-component')).toBeInTheDocument();
      expect(screen.getByTestId('theme-name')).toHaveTextContent('default');
    });
  });

  describe('Accessibility Integration', () => {
    it('should apply high contrast theme correctly', async () => {
      // High contrast tokens would have better contrast ratios
      const highContrastTokens = createTokens({
        'primary-text-emphasis': '#000000',
        'primary-bg-subtle': '#ffffff',
        'secondary-text-emphasis': '#000000',
        'secondary-bg-subtle': '#ffffff',
      });

      render(
        <ThemeProvider defaultTheme={highContrastTokens}>
          <ThemeAwareComponent />
        </ThemeProvider>
      );

      const { injectCSS } = await import('../../utils/injectCSS');
      expect(injectCSS).toHaveBeenCalledWith(
        expect.stringContaining('--atomix-primary-text-emphasis: #000000'),
        'theme-tokens-theme'
      );
    });

    it('should support data attributes for theme switching', async () => {
      render(
        <ThemeProvider
          themes={mockThemes}
          dataAttribute="data-bs-theme"
          defaultTheme="high-contrast"
        >
          <ThemeAwareComponent />
        </ThemeProvider>
      );

      const { applyThemeAttributes } = await import('../../utils/domUtils');
      expect(applyThemeAttributes).toHaveBeenCalledWith('high-contrast', 'data-bs-theme');
    });
  });
});