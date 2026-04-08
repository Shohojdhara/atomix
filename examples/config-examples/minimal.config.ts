/**
 * Minimal Atomix Configuration Example
 * 
 * This is the simplest possible configuration - just sets a custom prefix.
 * All other settings use Atomix defaults.
 * 
 * Use this when you only need to customize CSS variable names.
 */

import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  // Custom prefix changes all CSS variables from --atomix-* to --myapp-*
  prefix: 'myapp',
});

/**
 * What this generates:
 * - --myapp-primary instead of --atomix-primary
 * - --myapp-spacing-4 instead of --atomix-spacing-4
 * - etc.
 * 
 * Usage in your app:
 * ```typescript
 * import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';
 * 
 * const css = createTheme(); // Auto-loads from this config
 * injectTheme(css);
 * ```
 */
