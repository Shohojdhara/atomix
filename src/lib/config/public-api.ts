/**
 * Public API for loading and managing Atomix configuration
 * 
 * This module provides the public-facing API for configuration loading
 * in external projects.
 */

import type { AtomixConfig } from './types';
import { loadAtomixConfig as internalLoadConfig, validateConfig as internalValidateConfig } from './loader';

/**
 * Load Atomix configuration from an external project
 * 
 * This function is designed for use in external projects that want to 
 * load the user's atomix.config.ts, atomix.config.js, or atomix.config.json file.
 * 
 * @param options - Loading options
 * @returns The loaded configuration
 * 
 * @example
 * ```typescript
 * import { loadConfig } from '@shohojdhara/atomix/config';
 * 
 * const config = loadConfig();
 * console.log(config.prefix); // 'atomix' or user's custom prefix
 * ```
 */
export function loadConfig(options?: { 
  configPath?: string; 
  required?: boolean 
}): AtomixConfig {
  return internalLoadConfig({
    configPath: options?.configPath,
    required: options?.required ?? false
  });
}

/**
 * Validate Atomix configuration structure
 * 
 * Performs basic validation to catch common configuration errors early.
 * Returns warnings for potential issues like invalid formats, typos, or security concerns.
 * 
 * @param config - Configuration object to validate
 * @returns Array of validation warnings (empty if valid)
 * 
 * @example
 * ```typescript
 * import { loadConfig, validateConfig } from '@shohojdhara/atomix/config';
 * 
 * const config = loadConfig();
 * const warnings = validateConfig(config);
 * 
 * if (warnings.length > 0) {
 *   console.warn('Configuration warnings:', warnings);
 * }
 * ```
 */
export function validateConfig(config: AtomixConfig): string[] {
  return internalValidateConfig(config);
}

/**
 * Defines an Atomix configuration with type safety
 * 
 * This is the same as the internal defineConfig but exported for public use.
 * 
 * @param config - The configuration object
 * @returns The configuration object
 * 
 * @example
 * ```typescript
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
 */
export { defineConfig } from './index';

// Export the config types for use in external projects
export type { 
  AtomixConfig,
  ThemeTokens,
  ThemeDefinition,
  CSSThemeDefinition,
  JSThemeDefinition,
  BuildConfig,
  RuntimeConfig,
  IntegrationConfig
} from './types';