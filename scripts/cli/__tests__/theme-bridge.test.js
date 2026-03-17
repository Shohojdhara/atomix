/**
 * Tests for Theme Bridge Generator
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  generateTailwindTheme,
  generateCssInJsTheme,
  generateCssVariables,
  generateTypeScriptTypes,
  validateThemeSync
} from '../internal/theme-bridge.js';
import { tokenProvider } from '../internal/tokens/token-provider.js';

// Mock filesystem
vi.mock('../internal/filesystem.js', () => ({
  filesystem: {
    writeFile: vi.fn().mockResolvedValue(true),
    readFile: vi.fn().mockResolvedValue('mock content'),
    createDirectory: vi.fn().mockResolvedValue(true)
  }
}));

describe('Theme Bridge Generator', () => {
  // Sample tokens for testing
  const sampleTokens = {
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      brand: {
        base: '#6366F1',
        light: '#818CF8',
        dark: '#4F46E5'
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    typography: {
      fontFamily: {
        sans: 'Inter, system-ui, sans-serif',
        mono: 'Fira Code, monospace'
      },
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem'
      }
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)'
    },
    radius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px'
    },
    zIndex: {
      hidden: -1,
      base: 0,
      dropdown: 1000,
      modal: 1500,
      popover: 2000
    }
  };

  describe('generateTailwindTheme', () => {
    it('should generate valid Tailwind theme config', () => {
      const config = generateTailwindTheme(sampleTokens);
      
      expect(config).toContain('module.exports');
      expect(config).toContain('theme:');
      expect(config).toContain('colors:');
      expect(config).toContain('spacing:');
    });

    it('should include all color tokens', () => {
      const config = generateTailwindTheme(sampleTokens);
      
      expect(config).toContain('primary:');
      expect(config).toContain('secondary:');
      expect(config).toContain('brand:');
    });

    it('should handle nested color objects', () => {
      const config = generateTailwindTheme(sampleTokens);
      
      expect(config).toContain('#6366F1'); // brand.base
    });

    it('should include spacing tokens', () => {
      const config = generateTailwindTheme(sampleTokens);
      
      expect(config).toContain('xs:');
      expect(config).toContain('sm:');
      expect(config).toContain('md:');
      expect(config).toContain('lg:');
    });

    it('should include typography tokens', () => {
      const config = generateTailwindTheme(sampleTokens);
      
      expect(config).toContain('fontSize:');
      expect(config).toContain('fontFamily:');
    });

    it('should include breakpoint tokens as screens', () => {
      const config = generateTailwindTheme(sampleTokens);
      
      expect(config).toContain('screens:');
      expect(config).toContain('sm:');
      expect(config).toContain('md:');
    });

    it('should include shadow tokens', () => {
      const config = generateTailwindTheme(sampleTokens);
      
      expect(config).toContain('boxShadow:');
      expect(config).toContain('sm:');
    });

    it('should include border radius tokens', () => {
      const config = generateTailwindTheme(sampleTokens);
      
      expect(config).toContain('borderRadius:');
      expect(config).toContain('full:');
    });

    it('should generate valid JavaScript syntax', () => {
      const config = generateTailwindTheme(sampleTokens);
      
      // Basic syntax validation
      expect(config).toContain('{');
      expect(config).toContain('}');
      expect(config.split('{').length).toBeGreaterThan(1);
    });
  });

  describe('generateCssInJsTheme', () => {
    it('should generate emotion theme by default', () => {
      const theme = generateCssInJsTheme(sampleTokens, 'emotion');
      
      expect(theme).toContain('export const theme');
      expect(theme).toContain('colors:');
      expect(theme).toContain('space:');
    });

    it('should generate styled-components theme', () => {
      const theme = generateCssInJsTheme(sampleTokens, 'styled-components');
      
      expect(theme).toContain('export const theme');
      expect(theme).toContain('fonts:');
    });

    it('should generate vanilla-extract theme with imports', () => {
      const theme = generateCssInJsTheme(sampleTokens, 'vanilla-extract');
      
      expect(theme).toContain("import { createGlobalTheme }");
      expect(theme).toContain('createGlobalTheme');
      expect(theme).toContain('export type Theme');
    });

    it('should include all token categories', () => {
      const theme = generateCssInJsTheme(sampleTokens, 'emotion');
      
      expect(theme).toContain('colors:');
      expect(theme).toContain('space:');
      expect(theme).toContain('fonts:');
      expect(theme).toContain('fontSizes:');
      expect(theme).toContain('breakpoints:');
      expect(theme).toContain('shadows:');
      expect(theme).toContain('radii:');
    });

    it('should handle nested color values', () => {
      const theme = generateCssInJsTheme(sampleTokens, 'emotion');
      
      expect(theme).toContain('base:');
      expect(theme).toContain('light:');
      expect(theme).toContain('dark:');
    });

    it('should include z-index tokens', () => {
      const theme = generateCssInJsTheme(sampleTokens, 'emotion');
      
      expect(theme).toContain('zIndices:');
      expect(theme).toContain('modal:');
    });
  });

  describe('generateCssVariables', () => {
    it('should generate CSS custom properties in :root', () => {
      const css = generateCssVariables(sampleTokens);
      
      expect(css).toContain(':root {');
      expect(css).toContain('--atomix-');
    });

    it('should use custom selector when provided', () => {
      const css = generateCssVariables(sampleTokens, { selector: '[data-theme]' });
      
      expect(css).toContain('[data-theme] {');
    });

    it('should use custom prefix when provided', () => {
      const css = generateCssVariables(sampleTokens, { prefix: 'custom' });
      
      expect(css).toContain('--custom-');
    });

    it('should generate color variables', () => {
      const css = generateCssVariables(sampleTokens);
      
      expect(css).toContain('--atomix-primary:');
      expect(css).toContain('--atomix-secondary:');
    });

    it('should handle nested color objects', () => {
      const css = generateCssVariables(sampleTokens);
      
      expect(css).toContain('--atomix-brand:'); // Uses base value for main variable
      expect(css).toContain('--atomix-brand-light:');
      expect(css).toContain('--atomix-brand-dark:');
    });

    it('should generate spacing variables', () => {
      const css = generateCssVariables(sampleTokens);
      
      expect(css).toContain('--atomix-space-xs:');
      expect(css).toContain('--atomix-space-sm:');
    });

    it('should generate font variables', () => {
      const css = generateCssVariables(sampleTokens);
      
      expect(css).toContain('--atomix-font-sans:');
      expect(css).toContain('--atomix-text-base:');
    });

    it('should generate breakpoint variables', () => {
      const css = generateCssVariables(sampleTokens);
      
      expect(css).toContain('--atomix-breakpoint-sm:');
      expect(css).toContain('--atomix-breakpoint-md:');
    });

    it('should generate shadow variables', () => {
      const css = generateCssVariables(sampleTokens);
      
      expect(css).toContain('--atomix-shadow-sm:');
      expect(css).toContain('--atomix-shadow-md:');
    });

    it('should generate radius variables', () => {
      const css = generateCssVariables(sampleTokens);
      
      expect(css).toContain('--atomix-radius-sm:');
      expect(css).toContain('--atomix-radius-full:');
    });

    it('should generate z-index variables', () => {
      const css = generateCssVariables(sampleTokens);
      
      expect(css).toContain('--atomix-z-modal:');
      expect(css).toContain('--atomix-z-popover:');
    });

    it('should close the selector block', () => {
      const css = generateCssVariables(sampleTokens);
      
      expect(css).toMatch(/\}$/);
    });
  });

  describe('generateTypeScriptTypes', () => {
    it('should generate TypeScript interface', () => {
      const types = generateTypeScriptTypes(sampleTokens);
      
      expect(types).toContain('export interface AtomixTheme');
    });

    it('should include JSDoc header', () => {
      const types = generateTypeScriptTypes(sampleTokens);
      
      expect(types).toContain('/**');
      expect(types).toContain('Auto-generated from design tokens');
    });

    it('should generate color type definitions', () => {
      const types = generateTypeScriptTypes(sampleTokens);
      
      expect(types).toContain('colors:');
      expect(types).toContain('primary: string;');
    });

    it('should generate spacing type definitions', () => {
      const types = generateTypeScriptTypes(sampleTokens);
      
      expect(types).toContain('space:');
      expect(types).toContain('sm: string;');
    });

    it('should generate utility type aliases', () => {
      const types = generateTypeScriptTypes(sampleTokens);
      
      expect(types).toContain('export type ThemeColor');
      expect(types).toContain('export type ThemeSpacing');
      expect(types).toContain('export type ThemeFontSize');
    });

    it('should use correct types for different token categories', () => {
      const types = generateTypeScriptTypes(sampleTokens);
      
      // String types
      expect(types).toContain(': string;');
      
      // Number types for zIndex
      expect(types).toContain(': number;');
    });
  });

  describe('validateThemeSync', () => {
    it('should return valid when all tokens are present', async () => {
      // Mock tokenProvider.loadTokens
      const loadTokensSpy = vi.spyOn(tokenProvider, 'loadTokens').mockResolvedValue({
        colors: { primary: '#3B82F6', secondary: '#10B981' },
        spacing: { sm: '0.5rem', md: '1rem' }
      });
      
      const mockThemeContent = `
        export const theme = {
          colors: { primary: '#3B82F6', secondary: '#10B981' },
          space: { sm: '0.5rem', md: '1rem' }
        };
      `;
      
      // Mock filesystem.readFile
      const { filesystem } = await import('../internal/filesystem.js');
      const readFileSpy = vi.spyOn(filesystem, 'readFile').mockResolvedValue(mockThemeContent);
      
      const result = await validateThemeSync(
        './tokens.json',
        './theme.ts',
        'css-in-js'
      );
      
      expect(result.valid).toBe(true);
      expect(result.issues).toEqual([]);
      expect(result.tokensChecked).toBeGreaterThan(0);
      
      loadTokensSpy.mockRestore();
      readFileSpy.mockRestore();
    });

    it('should detect missing tokens', async () => {
      const loadTokensSpy = vi.spyOn(tokenProvider, 'loadTokens').mockResolvedValue({
        colors: { primary: '#3B82F6', secondary: '#10B981' },
        spacing: { sm: '0.5rem', md: '1rem' }
      });
      
      const mockThemeContent = `
        export const theme = {
          colors: { primary: '#3B82F6' }
        };
      `;
      
      const { filesystem } = await import('../internal/filesystem.js');
      const readFileSpy = vi.spyOn(filesystem, 'readFile').mockResolvedValue(mockThemeContent);
      
      const result = await validateThemeSync(
        './tokens.json',
        './theme.ts',
        'css-in-js'
      );
      
      // Should have issues for missing tokens
      expect(result.issues).toBeDefined();
      expect(result.issues.length).toBeGreaterThan(0);
      
      loadTokensSpy.mockRestore();
      readFileSpy.mockRestore();
    });

    it('should validate Tailwind CommonJS exports', async () => {
      const loadTokensSpy = vi.spyOn(tokenProvider, 'loadTokens').mockResolvedValue({
        colors: { primary: '#3B82F6' }
      });
      
      const invalidTailwind = `
        export default { theme: {} };
      `;
      
      const { filesystem } = await import('../internal/filesystem.js');
      const readFileSpy = vi.spyOn(filesystem, 'readFile').mockResolvedValue(invalidTailwind);
      
      const result = await validateThemeSync(
        './tokens.json',
        './tailwind.config.js',
        'tailwind'
      );
      
      expect(result.valid).toBe(false);
      expect(result.issues.some(i => i.severity === 'error')).toBe(true);
      
      loadTokensSpy.mockRestore();
      readFileSpy.mockRestore();
    });

    it('should validate CSS variables :root selector', async () => {
      const loadTokensSpy = vi.spyOn(tokenProvider, 'loadTokens').mockResolvedValue({
        colors: { primary: '#3B82F6' }
      });
      
      const invalidCss = `
        .theme { --atomix-primary: #3B82F6; }
      `;
      
      const { filesystem } = await import('../internal/filesystem.js');
      const readFileSpy = vi.spyOn(filesystem, 'readFile').mockResolvedValue(invalidCss);
      
      const result = await validateThemeSync(
        './tokens.json',
        './variables.css',
        'css-variables'
      );
      
      expect(result.valid).toBe(false);
      expect(result.issues.some(i => i.severity === 'error')).toBe(true);
      
      loadTokensSpy.mockRestore();
      readFileSpy.mockRestore();
    });

    it('should handle validation errors gracefully', async () => {
      const loadTokensSpy = vi.spyOn(tokenProvider, 'loadTokens').mockRejectedValue(
        new Error('File not found')
      );
      
      const result = await validateThemeSync(
        './nonexistent.json',
        './nonexistent.ts',
        'css-in-js'
      );
      
      expect(result.valid).toBe(false);
      expect(result.issues).toBeDefined();
      expect(result.issues.length).toBeGreaterThan(0);
      
      loadTokensSpy.mockRestore();
    });
  });

  describe('Integration Scenarios', () => {
    it('should handle empty tokens object', () => {
      const emptyTokens = {};
      
      const tailwind = generateTailwindTheme(emptyTokens);
      const cssInJs = generateCssInJsTheme(emptyTokens, 'emotion');
      const cssVars = generateCssVariables(emptyTokens);
      
      expect(tailwind).toBeDefined();
      expect(cssInJs).toBeDefined();
      expect(cssVars).toBeDefined();
    });

    it('should handle partial tokens (missing categories)', () => {
      const partialTokens = {
        colors: { primary: '#FF0000' }
        // Missing other categories
      };
      
      const tailwind = generateTailwindTheme(partialTokens);
      
      expect(tailwind).toContain('colors:');
      expect(tailwind).not.toContain('spacing:');
    });

    it('should preserve token naming conventions', () => {
      const semanticTokens = {
        colors: {
          'button-primary': '#3B82F6',
          'text-muted': '#6B7280',
          'bg-surface': '#FFFFFF'
        }
      };
      
      const css = generateCssVariables(semanticTokens);
      
      expect(css).toContain('--atomix-button-primary');
      expect(css).toContain('--atomix-text-muted');
    });
  });
});
