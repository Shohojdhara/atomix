/**
 * createTheme Tests
 *
 * Tests for createTheme function including automatic config loading
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTheme } from '../createTheme';
import type { DesignTokens } from '../../tokens/tokens';
import type { Theme } from '../../types';

describe('createTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Automatic Config Loading', () => {
    it('should work without input (uses defaults or config)', () => {
      // createTheme() should work even if config is not available
      // It will fall back to default tokens
      const css = createTheme();

      expect(typeof css).toBe('string');
      expect(css.length).toBeGreaterThan(0);
      expect(css).toContain(':root');
    });

    it('should generate valid CSS with default tokens', () => {
      const css = createTheme();

      // Should contain CSS variable declarations
      expect(css).toMatch(/--atomix-[a-z-]+:\s*[^;]+;/);
    });
  });

  describe('DesignTokens Input', () => {
    it('should accept DesignTokens and generate CSS', () => {
      const tokens: Partial<DesignTokens> = {
        primary: '#7AFFD7',
        secondary: '#FF5733',
        'spacing-4': '1rem',
      };

      const css = createTheme(tokens);

      expect(css).toContain('--atomix-primary');
      expect(css).toContain('#7AFFD7');
      expect(css).toContain('--atomix-secondary');
      expect(css).toContain('#FF5733');
      expect(css).toContain('--atomix-spacing-4');
      expect(css).toContain('1rem');
    });

    it('should merge with default tokens', () => {
      const tokens: Partial<DesignTokens> = {
        primary: '#CUSTOM',
      };

      const css = createTheme(tokens);

      // Should contain custom primary
      expect(css).toContain('--atomix-primary');
      expect(css).toContain('#CUSTOM');

      // Should also contain default tokens
      expect(css).toContain('--atomix-secondary');
    });
  });

  describe('Options', () => {
    it('should respect prefix option', () => {
      const tokens: Partial<DesignTokens> = {
        primary: '#7AFFD7',
      };

      const css = createTheme(tokens, { prefix: 'myapp' });

      expect(css).toContain('--myapp-primary');
      expect(css).not.toContain('--atomix-primary');
    });

    it('should respect selector option', () => {
      const tokens: Partial<DesignTokens> = {
        primary: '#7AFFD7',
      };

      const css = createTheme(tokens, { selector: '[data-theme="dark"]' });

      expect(css).toContain('[data-theme="dark"]');
      expect(css).not.toContain(':root');
    });

    it('should use default prefix when not provided', () => {
      const tokens: Partial<DesignTokens> = {
        primary: '#7AFFD7',
      };

      const css = createTheme(tokens);

      expect(css).toContain('--atomix-primary');
    });
  });

  describe('CSS Output Format', () => {
    it('should generate valid CSS syntax', () => {
      const tokens: Partial<DesignTokens> = {
        primary: '#7AFFD7',
      };

      const css = createTheme(tokens);

      // Should be valid CSS
      expect(css).toMatch(/^[^{]*\{[^}]*\}/s);
      expect(css).toContain(':');
      expect(css).toContain(';');
    });

    it('should format CSS with proper indentation', () => {
      const tokens: Partial<DesignTokens> = {
        primary: '#7AFFD7',
        secondary: '#FF5733',
      };

      const css = createTheme(tokens);

      // Should have proper formatting
      expect(css).toContain('\n');
    });
  });
});
