/**
 * Theme Configuration Loader
 * 
 * Loads and validates the theme configuration from theme.config.ts
 */

import type {
  ConfigLoaderOptions,
  LoadedThemeConfig,
  ConfigValidationResult,
} from './types';
import { validateConfig } from './validator';
import { ThemeError, ThemeErrorCode, getLogger } from '../errors';
import {
  DEFAULT_CONFIG_PATH,
  DEFAULT_CONFIG_RELATIVE_PATH,
  DEFAULT_BASE_PATH,
  DEFAULT_STORAGE_KEY,
  DEFAULT_DATA_ATTRIBUTE,
  DEFAULT_INTEGRATION_CLASS_NAMES,
  DEFAULT_INTEGRATION_CSS_VARIABLES,
  DEFAULT_BUILD_OUTPUT_DIR,
  DEFAULT_SASS_CONFIG,
  ENV_DEFAULTS,
} from '../constants';

/**
 * Cache for loaded configuration
 */
let cachedConfig: LoadedThemeConfig | null = null;

/**
 * Logger instance
 */
const logger = getLogger();

/**
 * Load theme configuration from theme.config.ts
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
    configPath = DEFAULT_CONFIG_PATH,
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
    // In browser/Vite environment, we can't load theme.config.ts dynamically
    // This is expected and we'll use the fallback config
    if (typeof window !== 'undefined') {
      throw new Error('Theme config loading not supported in browser environment');
    }
    
    // In Node.js/bundler environment, try require (CommonJS) first
    // Check if we're in a browser environment first
    if (typeof window !== 'undefined' || typeof require === 'undefined') {
      throw new Error('Theme config loading not supported in browser environment');
    }
    
    // Type for theme config module
    interface ThemeConfigModule {
      default?: LoadedThemeConfig;
      [key: string]: unknown;
    }
    
    let themeConfigModule: ThemeConfigModule;
    
    // Try require (Node.js/CommonJS) - works in Node.js environments
    try {
      // Try relative path first (for build tools)
      try {
        themeConfigModule = require(DEFAULT_CONFIG_RELATIVE_PATH) as ThemeConfigModule;
      } catch {
        // If relative path fails, try to resolve from process.cwd()
        const path = require('path') as typeof import('path');
        const fs = require('fs') as typeof import('fs');
        const configFilePath = path.resolve(process.cwd(), configPath);
        
        // Check if file exists
        if (fs.existsSync(configFilePath)) {
          // Delete from cache to force reload
          const resolvedPath = require.resolve(configFilePath);
          if (require.cache && require.cache[resolvedPath]) {
            delete require.cache[resolvedPath];
          }
          themeConfigModule = require(configFilePath) as ThemeConfigModule;
        } else {
          throw new Error(`Config file not found: ${configFilePath}`);
        }
      }
    } catch (requireError) {
      // If require fails, throw to fall through to error handling
      const errorMessage = requireError instanceof Error 
        ? requireError.message 
        : String(requireError);
      throw new ThemeError(
        `Cannot load theme config: ${errorMessage}`,
        ThemeErrorCode.CONFIG_LOAD_FAILED,
        { configPath, error: errorMessage }
      );
    }
    
    const rawConfig = (themeConfigModule.default || themeConfigModule) as LoadedThemeConfig;

    // Apply environment-specific overrides
    const processedConfig = applyEnvOverrides(rawConfig, env);

    // Validate if requested
    let validationResult: ConfigValidationResult | null = null;
    if (validate) {
      validationResult = validateConfig(processedConfig);
    }

    config = {
      ...processedConfig,
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
