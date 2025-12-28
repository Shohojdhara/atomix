/**
 * Atomix Configuration
 * 
 * This file is for external developers to customize the Atomix Design System.
 * 
 * External developers can create this file in their project root to customize
 * design tokens, colors, spacing, typography, and more. The theme system will
 * automatically load this configuration when using `createTheme()`.
 * 
 * @example
 * ```typescript
 * // atomix.config.ts (in your project)
 * import { defineConfig } from '@shohojdhara/atomix/config';
 * 
 * export default defineConfig({
 *   prefix: 'myapp',
 *   theme: {
 *     extend: {
 *       colors: {
 *         primary: { main: '#7AFFD7' },
 *       },
 *     },
 *   },
 * });
 * ```
 * 
 * @example
 * ```typescript
 * // In your application code
 * import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';
 * 
 * // Automatically loads from atomix.config.ts
 * const css = createTheme();
 * injectTheme(css);
 * ```
 * 
 * @see https://atomix.design/docs/configuration for full documentation
 */

// For library development, use local import
// For external developers, use: import { defineConfig } from '@shohojdhara/atomix/config';
import { defineConfig } from './src/lib/config';

export default defineConfig({
    /**
     * CSS Variable Prefix
     * 
     * Change this to customize all CSS variable names.
     * Example: prefix: 'myapp' → --myapp-primary instead of --atomix-primary
     * 
     * This prefix is automatically used by createTheme() when loading from config.
     */
    prefix: 'atomix',

    /**
     * Theme Customization
     * 
     * Tailwind-like configuration for customizing design tokens.
     * Use `extend` to override or extend base tokens (recommended).
     * Use `tokens` to completely replace the token system (advanced).
     */
    theme: {
        /**
         * Extend Default Design Tokens
         * 
         * These values will override or extend the base Atomix tokens.
         * This is the recommended approach for customization.
         */
        extend: {
            /**
             * Color Customization
             * 
             * You can customize colors in multiple ways:
             * 
             * 1. Simple main color:
             *    primary: { main: '#7AFFD7' }
             * 
             * 2. With light/dark variants:
             *    primary: { main: '#7AFFD7', light: '#B3FFE8', dark: '#4DFFC4' }
             * 
             * 3. Full color scale (1-10):
             *    primary: { 1: '#f0f9ff', 2: '#dbeafe', ..., 10: '#1e3a8a' }
             * 
             * 4. Main color (maps to step 6):
             *    primary: { main: '#3b82f6', 6: '#3b82f6' }
             */
            colors: {
                primary: {
                    main: '#3b82f6', // Your brand primary color
                    // Optional: provide full color scale (1-10)
                    // 1: '#f0f9ff',  // lightest
                    // 2: '#dbeafe',
                    // 3: '#bfdbfe',
                    // 4: '#93c5fd',
                    // 5: '#60a5fa',
                    // 6: '#3b82f6',  // main (default)
                    // 7: '#2563eb',
                    // 8: '#1d4ed8',
                    // 9: '#1e40af',
                    // 10: '#1e3a8a', // darkest
                },
                // Customize other semantic colors
                // secondary: { main: '#10b981' },
                // success: { main: '#22c55e' },
                // error: { main: '#ef4444' },
                // warning: { main: '#eab308' },
                // info: { main: '#3b82f6' },
            },

            /**
             * Spacing Scale
             * 
             * Customize spacing values used throughout the design system.
             * These map to tokens like 'spacing-4', 'spacing-8', etc.
             */
            // spacing: {
            //   '1': '0.25rem',   // 4px
            //   '2': '0.5rem',    // 8px
            //   '3': '0.75rem',   // 12px
            //   '4': '1rem',      // 16px
            //   '5': '1.25rem',   // 20px
            //   '6': '1.5rem',    // 24px
            //   '8': '2rem',      // 32px
            //   '10': '2.5rem',   // 40px
            //   '12': '3rem',     // 48px
            //   '16': '4rem',     // 64px
            //   '20': '5rem',     // 80px
            // },

            /**
             * Typography Customization
             * 
             * Customize fonts, sizes, weights, and line heights.
             */
            // typography: {
            //   // Font families
            //   fontFamilies: {
            //     sans: ['Inter', 'system-ui', 'sans-serif'],
            //     serif: ['Georgia', 'serif'],
            //     mono: ['Fira Code', 'monospace'],
            //   },
            //   // Font sizes
            //   fontSizes: {
            //     'xs': '0.75rem',   // 12px
            //     'sm': '0.875rem',  // 14px
            //     'base': '1rem',    // 16px
            //     'lg': '1.125rem',  // 18px
            //     'xl': '1.25rem',   // 20px
            //     '2xl': '1.5rem',    // 24px
            //     '3xl': '1.875rem', // 30px
            //     '4xl': '2.25rem',  // 36px
            //   },
            //   // Font weights
            //   fontWeights: {
            //     'light': 300,
            //     'normal': 400,
            //     'medium': 500,
            //     'semibold': 600,
            //     'bold': 700,
            //   },
            //   // Line heights
            //   lineHeights: {
            //     'tight': 1.2,
            //     'normal': 1.5,
            //     'relaxed': 1.75,
            //   },
            // },

            /**
             * Border Radius
             * 
             * Customize border radius values.
             */
            // borderRadius: {
            //   'sm': '0.25rem',   // 4px
            //   'md': '0.5rem',     // 8px (default)
            //   'lg': '0.75rem',   // 12px
            //   'xl': '1rem',       // 16px
            //   'full': '9999px',   // Fully rounded
            // },

            /**
             * Shadows
             * 
             * Customize box shadow values.
             */
            // shadows: {
            //   'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            //   'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            //   'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            //   'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            // },

            /**
             * Z-Index Scale
             * 
             * Customize z-index values for layering.
             */
            // zIndex: {
            //   'base': 0,
            //   'dropdown': 1000,
            //   'sticky': 1020,
            //   'fixed': 1030,
            //   'modal-backdrop': 1040,
            //   'modal': 1050,
            //   'popover': 1060,
            //   'tooltip': 1070,
            // },

            /**
             * Transitions
             * 
             * Customize transition durations and easings.
             */
            // transitions: {
            //   durations: {
            //     'fast': '150ms',
            //     'base': '200ms',
            //     'slow': '300ms',
            //   },
            //   easings: {
            //     'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
            //     'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
            //     'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
            // },
            // },
        },

        /**
         * Complete Token Override (Advanced)
         * 
         * Use with caution - this replaces the entire token system.
         * Most users should use `extend` instead.
         */
        // tokens: {
        //   colors: { /* your full color system */ },
        //   spacing: { /* your full spacing scale */ },
        //   // ... other token categories
        // },
    },
});
