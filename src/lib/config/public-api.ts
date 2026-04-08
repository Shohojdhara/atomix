/**
 * Public API for loading and managing Atomix configuration
 *
 * This module provides convenience functions for loading and validating
 * Atomix configuration in external projects.
 *
 * Import from '@shohojdhara/atomix/config' for types and core utilities.
 */

import { loadAtomixConfig as internalLoadConfig, validateConfig as internalValidateConfig } from './loader';

type LoadConfig = typeof internalLoadConfig;
type AtomixConfigArg = Parameters<LoadConfig>[0] extends infer O
  ? O extends { configPath?: string; required?: boolean }
    ? O
    : never
  : never;

/** Resolved config type from loader */
type ResolvedConfig = ReturnType<LoadConfig>;

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
}): ResolvedConfig {
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
export function validateConfig(config: ResolvedConfig): string[] {
  return internalValidateConfig(config);
}