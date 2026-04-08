/**
 * Standard Atomix Configuration Example
 * 
 * This is a typical configuration for most projects.
 * Customizes brand colors, typography, and spacing while keeping defaults for everything else.
 * 
 * Use this as your starting point for most applications.
 */

import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  // Custom prefix for CSS variables
  prefix: 'brand',

  // Theme customization using extend mode (recommended)
  theme: {
    extend: {
      // Brand color palette
      colors: {
        // Primary brand color with variants
        primary: {
          main: '#6366f1',      // Indigo-500
          light: '#a5b4fc',     // Indigo-300
          dark: '#4338ca',      // Indigo-700
          contrastText: '#ffffff',
        },
        
        // Secondary accent color
        secondary: {
          main: '#ec4899',      // Pink-500
          light: '#f9a8d4',     // Pink-300
          dark: '#be185d',      // Pink-700
          contrastText: '#ffffff',
        },
        
        // Semantic colors
        success: { main: '#22c55e' },   // Green-500
        error: { main: '#ef4444' },     // Red-500
        warning: { main: '#f59e0b' },   // Amber-500
        info: { main: '#3b82f6' },      // Blue-500
      },

      // Typography customization
      typography: {
        // Font families
        fontFamilies: {
          sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
          serif: ['Georgia', 'Cambria', 'serif'],
          mono: ['Fira Code', 'Consolas', 'monospace'],
        },
        
        // Font sizes (rem units)
        fontSizes: {
          'xs': '0.75rem',      // 12px
          'sm': '0.875rem',     // 14px
          'base': '1rem',       // 16px (default)
          'lg': '1.125rem',     // 18px
          'xl': '1.25rem',      // 20px
          '2xl': '1.5rem',      // 24px
          '3xl': '1.875rem',    // 30px
          '4xl': '2.25rem',     // 36px
        },
        
        // Font weights
        fontWeights: {
          'light': 300,
          'normal': 400,
          'medium': 500,
          'semibold': 600,
          'bold': 700,
        },
        
        // Line heights
        lineHeights: {
          'tight': 1.2,
          'snug': 1.375,
          'normal': 1.5,
          'relaxed': 1.625,
          'loose': 2,
        },
      },

      // Spacing scale (custom values override defaults)
      spacing: {
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
      },

      // Border radius values
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',   // 4px
        'md': '0.5rem',    // 8px
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px
        '2xl': '1.5rem',   // 24px
        'full': '9999px',  // Fully rounded
      },

      // Box shadows
      shadows: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },

      // Z-index scale for layering
      zIndex: {
        'base': 0,
        'dropdown': 1000,
        'sticky': 1020,
        'fixed': 1030,
        'modal-backdrop': 1040,
        'modal': 1050,
        'popover': 1060,
        'tooltip': 1070,
      },

      // Transition settings
      transitions: {
        durations: {
          'fast': '150ms',
          'base': '200ms',
          'slow': '300ms',
        },
        easings: {
          'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
          'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
          'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
  },
});

/**
 * Usage in your application:
 * 
 * ```typescript
 * // In your app entry point (e.g., _app.tsx for Next.js)
 * import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';
 * 
 * // Automatically loads from atomix.config.ts
 * const css = createTheme();
 * injectTheme(css);
 * ```
 * 
 * Using the custom tokens in CSS:
 * ```css
 * .button {
 *   background-color: var(--brand-primary);
 *   color: var(--brand-primary-contrast-text);
 *   border-radius: var(--brand-border-radius-md);
 *   box-shadow: var(--brand-shadow-md);
 *   transition: all var(--brand-transition-duration-base) var(--brand-transition-easing-ease-out);
 * }
 * ```
 * 
 * Key features of this config:
 * ✅ Extends defaults instead of replacing them
 * ✅ Provides semantic color names
 * ✅ Customizes typography for brand consistency
 * ✅ Defines spacing scale for layout consistency
 * ✅ Sets up proper z-index hierarchy
 * ✅ Configures smooth transitions
 */
