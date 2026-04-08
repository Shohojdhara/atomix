/**
 * Atomix Configuration System
 *
 * Tailwind-like configuration for customizing the Atomix Design System.
 *
 * External developers can create `atomix.config.ts` in their project root
 * to customize design tokens, similar to Tailwind's tailwind.config.js
 */

export { 
  defineConfig,
  type AtomixConfig,
  type ThemeTokens,
  type ThemeDefinition,
  type CSSThemeDefinition,
  type JSThemeDefinition,
  type ColorScale,
  type PaletteColorOptions,
  type InteractiveEffectsConfig,
  type OptimizationConfig,
  type VisualPolishConfig,
  type BuildConfig,
  type RuntimeConfig,
  type IntegrationConfig,
  type PluginConfig,
  type TokenProviderConfig,
  type TokenEngineConfig,
  type GeneratorConfig,
  type DesignTokenCategory,
  type DesignTokenValue
} from './types';

// Export the config loader functions
export { 
  loadAtomixConfig, 
  resolveConfigPath 
} from './loader';

// Export the validator
export { 
  validateConfiguration, 
  printConfigReport,
  type ValidationResult 
} from './validator';

// Export convenience functions from the public API
export { loadConfig, validateConfig } from './public-api';
