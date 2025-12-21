/**
 * Atomix Configuration
 * 
 * This file is for external developers to customize the Atomix Design System,
 * 
 * External developers can create this file in their project root to customize
 * design tokens, colors, spacing, typography, and more.
 * 
 * @example
 * ```typescript
 * // atomix.config.ts (in your project)
 * import { defineConfig } from '@shohojdhara/atomix/config';
 * 
 * export default defineConfig({
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
 * @see https://atomix.design/docs/configuration for full documentation
 */

// For library development, use local import
// For external developers, use: import { defineConfig } from '@shohojdhara/atomix/config';
import { defineConfig } from './src/lib/config';

export default defineConfig({
    // CSS variable prefix (default: 'atomix')
    // Change this to customize all CSS variable names
    // Example: prefix: 'myapp' → --myapp-primary instead of --atomix-primary
    prefix: 'atomix',

    // Theme customization (Tailwind-like)
    theme: {
        // Extend default design tokens
        // These values will override or extend the base Atomix tokens
        extend: {
            // Customize colors
            colors: {
                primary: {
                    main: '#3b82f6', // Your brand primary color
                    // Optional: provide full color scale (1-10)
                    // 1: '#f0f9ff',  // lightest
                    // 6: '#3b82f6',  // main (default)
                    // 10: '#1e3a8a', // darkest
                },
                // Add more colors as needed
                // secondary: { main: '#10b981' },
                // error: { main: '#ef4444' },
            },

            // Customize spacing scale
            // spacing: {
            //   '18': '4.5rem',
            //   '72': '18rem',
            // },

            // Customize typography
            // typography: {
            //   fontFamilies: {
            //     sans: ['Inter', 'sans-serif'],
            //   },
            //   fontSizes: {
            //     '2xl': '1.5rem',
            //   },
            // },

            // Customize border radius
            // borderRadius: {
            //   'xl': '0.75rem',
            // },
        },

        // Completely override default tokens (use with caution)
        // tokens: {
        //   colors: { /* your full color system */ },
        // },
    },
});
