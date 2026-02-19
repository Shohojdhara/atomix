import { describe, it, expect } from 'vitest';
import {
  importTheme,
  exportTheme,
  quickTheme,
  createDarkVariant,
  validateTheme,
  themeToCSS,
  getThemeMetadata,
  supportsDarkMode
} from '../theme-tools';
import { Theme } from '../theme/types';

describe('theme-tools', () => {
  const mockTheme: Theme = {
    name: 'Test Theme',
    palette: {
      primary: { main: '#7AFFD7' },
      secondary: { main: '#FF5733' },
      error: { main: '#FF0000' },
      warning: { main: '#FFA500' },
      info: { main: '#0000FF' },
      success: { main: '#00FF00' },
      background: {
        default: '#ffffff',
        paper: '#f5f5f5',
        subtle: '#fafafa',
      },
      text: {
        primary: '#000000',
        secondary: '#666666',
        disabled: '#999999',
      },
    },
    typography: {
      fontFamily: 'Arial',
      fontSize: 16,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightSemiBold: 600,
      fontWeightBold: 700,
      h1: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '0' },
      h2: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '0' },
      h3: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '0' },
      h4: { fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '0' },
      h5: { fontSize: '1rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '0' },
      h6: { fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '0' },
      body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
      body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
    },
    spacing: (v: number) => `${v * 8}px`,
    breakpoints: {
      values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
      unit: 'px',
      up: (k: any) => `@media (min-width: ${k}px)`,
      down: (k: any) => `@media (max-width: ${k}px)`,
      between: (s: any, e: any) => `@media (min-width: ${s}px) and (max-width: ${e}px)`,
    },
    shadows: { xs: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'none' },
    transitions: {
      duration: { shortest: 150, shorter: 200, short: 250, standard: 300, complex: 375, enteringScreen: 225, leavingScreen: 195 },
      easing: { easeInOut: 'ease', easeOut: 'ease', easeIn: 'ease', sharp: 'ease' }
    },
    zIndex: { mobileStepper: 1000, speedDial: 1050, appBar: 1100, drawer: 1200, modal: 1300, snackbar: 1400, tooltip: 1500 },
    borderRadius: { base: 4, sm: 2, md: 4, lg: 8, xl: 12, xxl: 16, '3xl': 24, '4xl': 32, pill: 9999 },
    custom: {},
    __isJSTheme: true
  };

  describe('quickTheme', () => {
    it('should create a theme with primary color', () => {
      const theme = quickTheme('My Theme', '#ff0000');
      expect(theme.name).toBe('My Theme');
      expect(theme.palette.primary.main).toBe('#ff0000');
    });

    it('should create a theme with primary and secondary color', () => {
      const theme = quickTheme('My Theme', '#ff0000', '#00ff00');
      expect(theme.palette.secondary.main).toBe('#00ff00');
    });
  });

  describe('createDarkVariant', () => {
    it('should create a dark variant of a theme', () => {
      const darkTheme = createDarkVariant(mockTheme);
      expect(darkTheme.name).toBe('Test Theme Dark');
      expect(darkTheme.palette.mode).toBe('dark');
      expect(darkTheme.palette.background.default).toBe('#121212');
      expect(darkTheme.palette.text.primary).toBe('#ffffff');
    });
  });

  describe('validateTheme', () => {
    it('should return valid for a correct theme', () => {
      const result = validateTheme(mockTheme);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return errors for a theme missing name', () => {
      const invalidTheme = { ...mockTheme, name: '' };
      const result = validateTheme(invalidTheme as any);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Theme must have a name');
    });

    it('should return errors for a theme missing palette', () => {
      const invalidTheme = { ...mockTheme, palette: undefined };
      const result = validateTheme(invalidTheme as any);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Theme must have a palette');
    });

    it('should return errors for a theme missing primary color', () => {
      const invalidTheme = { ...mockTheme, palette: { ...mockTheme.palette, primary: undefined } };
      const result = validateTheme(invalidTheme as any);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Theme palette must have a primary color');
    });

    it('should return multiple errors when multiple required fields are missing', () => {
      const invalidTheme = {};
      const result = validateTheme(invalidTheme as any);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Theme must have a name');
      expect(result.errors).toContain('Theme must have a palette');
      expect(result.errors).toHaveLength(2);
    });
  });

  describe('themeToCSS', () => {
    it('should generate CSS variables', () => {
      const css = themeToCSS(mockTheme);
      expect(css).toContain(':root');
      expect(css).toContain('--atomix-');
    });

    it('should use custom selector', () => {
      const css = themeToCSS(mockTheme, '.custom-theme');
      expect(css).toContain('.custom-theme');
    });
  });

  describe('getThemeMetadata', () => {
    it('should extract metadata correctly', () => {
      const metadata = getThemeMetadata(mockTheme);
      expect(metadata.name).toBe('Test Theme');
      expect(metadata.color).toBe('#7AFFD7');
      expect(metadata.supportsDarkMode).toBe(false);
    });

    it('should identify dark mode support from palette mode', () => {
      const darkTheme = { ...mockTheme, palette: { ...mockTheme.palette, mode: 'dark' } };
      const metadata = getThemeMetadata(darkTheme as any);
      expect(metadata.supportsDarkMode).toBe(true);
    });
  });

  describe('supportsDarkMode', () => {
    it('should return true if palette mode is dark', () => {
      const theme = { ...mockTheme, palette: { ...mockTheme.palette, mode: 'dark' } };
      expect(supportsDarkMode(theme as any)).toBe(true);
    });

    it('should return true if supportsDarkMode property is true', () => {
      const theme = { ...mockTheme, supportsDarkMode: true };
      expect(supportsDarkMode(theme as any)).toBe(true);
    });

    it('should return true if a11y modes includes dark', () => {
      const theme = { ...mockTheme, a11y: { modes: ['dark'] } };
      expect(supportsDarkMode(theme as any)).toBe(true);
    });

    it('should return false otherwise', () => {
      expect(supportsDarkMode(mockTheme)).toBe(false);
    });
  });

  describe('exportTheme', () => {
    it('should export theme to JSON string', () => {
      const json = exportTheme(mockTheme);
      const parsed = JSON.parse(json);
      expect(parsed.name).toBe('Test Theme');
    });
  });

  describe('importTheme', () => {
    it('should import a valid theme JSON', () => {
      const theme = { name: 'Imported Theme' };
      const json = JSON.stringify(theme);
      const result = importTheme(json);
      expect(result.name).toBe('Imported Theme');
    });

    it('should throw an error for invalid JSON', () => {
      const invalidJson = '{ invalid: json }';
      expect(() => importTheme(invalidJson)).toThrow('Invalid theme JSON');
    });
  });
});
