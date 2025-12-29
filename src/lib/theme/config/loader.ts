/**
 * Theme Configuration Loader
 * 
 * Loads and validates the theme configuration from atomix.config.ts
 */

import type {
  ConfigLoaderOptions,
  LoadedThemeConfig,
  ConfigValidationResult,
} from './types';
import { validateConfig } from './validator';
import { ThemeError, ThemeErrorCode, getLogger } from '../errors/errors';
import {
  DEFAULT_ATOMIX_CONFIG_PATH,
  DEFAULT_BASE_PATH,
  DEFAULT_STORAGE_KEY,
  DEFAULT_DATA_ATTRIBUTE,
  DEFAULT_INTEGRATION_CLASS_NAMES,
  DEFAULT_INTEGRATION_CSS_VARIABLES,
  DEFAULT_BUILD_OUTPUT_DIR,
  DEFAULT_SASS_CONFIG,
  ENV_DEFAULTS,
} from '../constants/constants';

/**
 * Cache for loaded configuration
 */
let cachedConfig: LoadedThemeConfig | null = null;

/**
 * Logger instance
 */
const logger = getLogger();

/**
 * Load theme configuration from atomix.config.ts
 * 
 * @param options - Loader options
 * @returns Loaded and validated theme configuration
 * 
 * @example
 * ```typescript
 * import { loadThemeConfig } from '@shohojdhara/atomix/theme/config';
 * const config = loadThemeConfig();
 * ```
 */
export function loadThemeConfig(
  options: ConfigLoaderOptions = {}
): LoadedThemeConfig {
  const {
    configPath = DEFAULT_ATOMIX_CONFIG_PATH,
    validate = true,
    env = typeof process !== 'undefined' && process.env ? (process.env.NODE_ENV === 'production' ? 'production' : 'development') : 'development',
  } = options;

  // Return cached config if available
  if (cachedConfig) {
    return cachedConfig;
  }

  // Try to load config dynamically
  let config: LoadedThemeConfig;

  try {
    // In browser/Vite environment, we can't load config dynamically
    if (typeof window !== 'undefined') {
      throw new Error('Theme config loading not supported in browser environment');
    }

    // In ESM environments, require might be undefined.
    let nodeRequire: any;
    try {
      nodeRequire = require;
    } catch {
      // require is not defined
    }

    if (!nodeRequire) {
      throw new Error('Theme config loading not supported in this environment (require is undefined)');
    }

    // Type for config module
    interface ConfigModule {
      default?: any;
      [key: string]: unknown;
    }

    let configModule: ConfigModule;

    // Try require (Node.js/CommonJS)
    // Use process.cwd() to resolve config path - avoids bundling issues with relative paths
    try {
      const path = nodeRequire('path') as typeof import('path');
      const fs = nodeRequire('fs') as typeof import('fs');

      let configFilePath = path.resolve(process.cwd(), configPath);

      // If atomix.config.ts not found at the root, use the default path
      if (!fs.existsSync(configFilePath) && configPath === DEFAULT_ATOMIX_CONFIG_PATH) {
        configFilePath = path.resolve(process.cwd(), DEFAULT_ATOMIX_CONFIG_PATH);
      }

      if (fs.existsSync(configFilePath)) {
        const resolvedPath = nodeRequire.resolve(configFilePath);
        if (nodeRequire.cache && nodeRequire.cache[resolvedPath]) {
          delete nodeRequire.cache[resolvedPath];
        }
        configModule = nodeRequire(configFilePath) as ConfigModule;
      } else {
        throw new Error(`Config file not found: ${configFilePath}`);
      }
    } catch (requireError) {
      const errorMessage = requireError instanceof Error
        ? requireError.message
        : String(requireError);
      throw new ThemeError(
        `Cannot load config: ${errorMessage}`,
        ThemeErrorCode.CONFIG_LOAD_FAILED,
        { configPath, error: errorMessage }
      );
    }

    const rawConfig = configModule.default || configModule;

    // Process the AtomixConfig structure
    const processedConfig: LoadedThemeConfig = {
      themes: rawConfig.theme?.themes || {},
      build: rawConfig.build || {},
      runtime: rawConfig.runtime || {},
      integration: rawConfig.integration || {},
      dependencies: rawConfig.dependencies || {},
      validated: false, // Will be set after validation
      // Store tokens for generator
      __tokens: rawConfig.theme?.tokens,
      __extend: rawConfig.theme?.extend,
    };

    // Apply environment-specific overrides
    const finalConfig = applyEnvOverrides(processedConfig, env);

    // Validate if requested
    let validationResult: ConfigValidationResult | null = null;
    if (validate) {
      validationResult = validateConfig(finalConfig);
    }

    config = {
      ...finalConfig,
      validated: validate,
      errors: validationResult?.errors,
      warnings: validationResult?.warnings,
    };
  } catch (error) {
    // Fallback: return default config structure
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.warn(`Failed to load theme config from ${configPath}`, {
      configPath,
      error: errorMessage,
    });

    config = {
      themes: {},
      build: {
        output: {
          directory: DEFAULT_BUILD_OUTPUT_DIR,
          formats: {
            expanded: '.css',
            compressed: '.min.css',
          },
        },
        sass: {
          ...DEFAULT_SASS_CONFIG,
          loadPaths: [...DEFAULT_SASS_CONFIG.loadPaths],
        },
      },
      runtime: {
        basePath: DEFAULT_BASE_PATH,
        cdnPath: null,
        preload: [],
        lazy: true,
        defaultTheme: '', // No default - use built-in styles (empty string instead of undefined)
        storageKey: DEFAULT_STORAGE_KEY,
        dataAttribute: DEFAULT_DATA_ATTRIBUTE,
        enablePersistence: true,
        useMinified: env === 'production',
      },
      integration: {
        cssVariables: DEFAULT_INTEGRATION_CSS_VARIABLES,
        classNames: DEFAULT_INTEGRATION_CLASS_NAMES,
      },
      dependencies: {},
      validated: false,
      errors: [`Failed to load config: ${error instanceof Error ? error.message : String(error)}`],
      warnings: [],
      __tokens: {},
      __extend: {},
    };
  }

  // Cache the loaded config
  cachedConfig = config;

  return config;
}

/**
 * Apply environment-specific overrides to configuration
 * 
 * @param config - Base configuration
 * @param env - Environment name
 * @returns Configuration with environment overrides applied
 */
function applyEnvOverrides(
  config: LoadedThemeConfig,
  env: 'development' | 'production' | 'test'
): LoadedThemeConfig {
  const overridden = { ...config };

  // Production overrides
  if (env === 'production') {
    if (overridden.runtime) {
      overridden.runtime = {
        ...overridden.runtime,
        useMinified: true,
        lazy: true,
      };
    }
  }

  // Development overrides
  if (env === 'development') {
    if (overridden.runtime) {
      overridden.runtime = {
        ...overridden.runtime,
        useMinified: false,
        lazy: false,
      };
    }
    if (overridden.build) {
      overridden.build = {
        ...overridden.build,
        sass: {
          ...overridden.build.sass,
          sourceMap: true,
        },
      };
    }
  }

  // Test overrides
  if (env === 'test') {
    if (overridden.runtime) {
      overridden.runtime = {
        ...overridden.runtime,
        enablePersistence: false,
        preload: [],
      };
    }
  }

  return overridden;
}

/**
 * Clear the cached configuration
 * Useful for testing or hot reloading
 */
export function clearConfigCache(): void {
  cachedConfig = null;
}

/**
 * Get cached configuration without loading
 * 
 * @returns Cached configuration or null
 */
export function getCachedConfig(): LoadedThemeConfig | null {
  return cachedConfig;
}

/**
 * Reload configuration (clears cache and loads fresh)
 * 
 * @param options - Loader options
 * @returns Freshly loaded configuration
 */
export function reloadThemeConfig(
  options: ConfigLoaderOptions = {}
): LoadedThemeConfig {
  clearConfigCache();
  return loadThemeConfig(options);
}