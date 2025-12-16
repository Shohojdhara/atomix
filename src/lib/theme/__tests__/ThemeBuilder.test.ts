import { describe, it, expect } from 'vitest';
import { ThemeBuilder, createThemeBuilder, createTheme } from '../builders/ThemeBuilder';

describe('ThemeBuilder', () => {
  describe('Basic Builder Operations', () => {
    it('should create a theme with name', () => {
      const theme = new ThemeBuilder()
        .setName('test-theme')
        .build();

      expect(theme.name).toBe('test-theme');
    });

    it('should set CSS variables', () => {
      const theme = new ThemeBuilder()
        .setCSSVars({
          '--color-primary': '#FF0000',
          '--spacing-base': '16px',
        })
        .build();

      expect(theme.cssVars).toEqual({
        '--color-primary': '#FF0000',
        '--spacing-base': '16px',
      });
    });

    it('should add individual CSS variable', () => {
      const theme = new ThemeBuilder()
        .addCSSVar('--color-primary', '#FF0000')
        .addCSSVar('--spacing-base', '16px')
        .build();

      expect(theme.cssVars).toEqual({
        '--color-primary': '#FF0000',
        '--spacing-base': '16px',
      });
    });
  });

  describe('Typography', () => {
    it('should set typography', () => {
      const typography = {
        fontFamily: 'Inter, sans-serif',
        fontSize: {
          sm: '0.875rem',
          md: '1rem',
          lg: '1.125rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          bold: 700,
        },
      };

      const theme = new ThemeBuilder()
        .setTypography(typography)
        .build();

      expect(theme.typography).toEqual(typography);
    });
  });

  describe('Palette', () => {
    it('should set color palette', () => {
      const palette = {
        primary: {
          500: '#7AFFD7',
          600: '#00E6C3',
        },
        secondary: {
          500: '#FF4785',
        },
      };

      const theme = new ThemeBuilder()
        .setPalette(palette)
        .build();

      expect(theme.palette).toEqual(palette);
    });
  });

  describe('Component Overrides', () => {
    it('should override component with CSS variables', () => {
      const theme = new ThemeBuilder()
        .overrideComponent('Button', {
          cssVars: {
            '--atomix-button-bg': '#FF0000',
            '--atomix-button-border-radius': '20px',
          },
        })
        .build();

      expect(theme.components?.Button?.cssVars).toEqual({
        '--atomix-button-bg': '#FF0000',
        '--atomix-button-border-radius': '20px',
      });
    });

    it('should set component CSS variables directly', () => {
      const theme = new ThemeBuilder()
        .setComponentCSSVars('Button', {
          '--atomix-button-bg': '#FF0000',
        })
        .build();

      expect(theme.components?.Button?.cssVars).toEqual({
        '--atomix-button-bg': '#FF0000',
      });
    });

    it('should set component part configuration', () => {
      const theme = new ThemeBuilder()
        .setComponentPart('Button', 'icon', {
          cssVars: { '--atomix-button-icon-size': '20px' },
          className: 'custom-icon',
        })
        .build();

      expect(theme.components?.Button?.parts?.icon).toEqual({
        cssVars: { '--atomix-button-icon-size': '20px' },
        className: 'custom-icon',
      });
    });

    it('should override multiple components', () => {
      const theme = new ThemeBuilder()
        .overrideComponent('Button', {
          cssVars: { '--atomix-button-bg': '#FF0000' },
        })
        .overrideComponent('Card', {
          cssVars: { '--atomix-card-bg': '#FFFFFF' },
        })
        .build();

      expect(theme.components?.Button?.cssVars).toEqual({
        '--atomix-button-bg': '#FF0000',
      });
      expect(theme.components?.Card?.cssVars).toEqual({
        '--atomix-card-bg': '#FFFFFF',
      });
    });
  });

  describe('Builder Methods', () => {
    it('should build partial theme', () => {
      const builder = new ThemeBuilder()
        .setName('test-theme')
        .setCSSVars({ '--color-primary': '#FF0000' });

      const partial = builder.buildPartial();

      expect(partial.name).toBe('test-theme');
      expect(partial.cssVars).toEqual({ '--color-primary': '#FF0000' });
    });

    it('should reset builder', () => {
      const builder = new ThemeBuilder()
        .setName('test-theme')
        .setCSSVars({ '--color-primary': '#FF0000' })
        .reset();

      const theme = builder.build();

      expect(theme.name).toBeUndefined();
      expect(theme.cssVars).toBeUndefined();
    });

    it('should get current theme state', () => {
      const builder = new ThemeBuilder()
        .setName('test-theme')
        .setCSSVars({ '--color-primary': '#FF0000' });

      const state = builder.getTheme();

      expect(state.name).toBe('test-theme');
      expect(state.cssVars).toEqual({ '--color-primary': '#FF0000' });
    });
  });

  describe('Factory Functions', () => {
    it('should create theme builder', () => {
      const builder = createThemeBuilder();
      expect(builder).toBeInstanceOf(ThemeBuilder);
    });

    it('should create theme with config', () => {
      const theme = createTheme({
        name: 'test-theme',
        cssVars: { '--color-primary': '#FF0000' },
        palette: {
          primary: { 500: '#7AFFD7' },
        },
      });

      expect(theme.name).toBe('test-theme');
      expect(theme.cssVars).toEqual({ '--color-primary': '#FF0000' });
      expect(theme.palette).toEqual({
        primary: { 500: '#7AFFD7' },
      });
    });
  });

  describe('Method Chaining', () => {
    it('should support fluent API', () => {
      const theme = new ThemeBuilder()
        .setName('test-theme')
        .setCSSVars({ '--color-primary': '#FF0000' })
        .setPalette({ primary: { 500: '#7AFFD7' } })
        .overrideComponent('Button', {
          cssVars: { '--atomix-button-bg': '#FF0000' },
        })
        .build();

      expect(theme.name).toBe('test-theme');
      expect(theme.cssVars).toBeDefined();
      expect(theme.palette).toBeDefined();
      expect(theme.components?.Button).toBeDefined();
    });
  });
});
