/**
 * Public API for loading and managing Atomix configuration
 *
 * This module provides the public-facing API for configuration loading
 * in external projects.
 */

import type { AtomixConfig } from './types';
import { loadAtomixConfig as internalLoadConfig, validateConfig as internalValidateConfig } from './loader';

/**
 * Load Atomix configuration from an external project.
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
  required?: boolean;
}): AtomixConfig {
  return internalLoadConfig({
    configPath: options?.configPath,
    required: options?.required ?? false,
  });
}

/**
 * Validate Atomix configuration structure.
 *
 * @param config - Configuration object to validate
 * @returns Array of validation warnings (empty if valid)
 */
export function validateConfig(config: AtomixConfig): string[] {
  return internalValidateConfig(config);
}