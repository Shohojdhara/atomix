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

/**
 * Cache for loaded configuration
 */
let cachedConfig: LoadedThemeConfig | null = null;

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
    configPath = 'theme.config.ts',
    validate = true,
    env = process.env.NODE_ENV === 'production' ? 'production' : 'development',
  } = options;

  // Return cached config if available
  if (cachedConfig) {
    return cachedConfig;
  }

  // Try to load config dynamically
  let config: LoadedThemeConfig;
  
  try {
    // In Node.js/bundler environment, import the config
    // This will work with TypeScript, ES modules, and bundlers
    let themeConfigModule: any;
    
    // Try require first (Node.js/CommonJS)
    if (typeof require !== 'undefined') {
      try {
        themeConfigModule = require('../../../../theme.config');
      } catch (requireError) {
        // If require fails, try dynamic import (ES modules/browser)
        if (typeof window !== 'undefined') {
          // In browser, we might need to handle this differently
          // For now, throw to fall through to error handling
          throw requireError;
        }
        throw requireError;
      }
    } else {
      // No require available, might be in browser
      throw new Error('Cannot load theme config: require is not available');
    }
    
    const rawConfig = themeConfigModule.default || themeConfigModule;

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
    console.warn(
      `Failed to load theme config from ${configPath}:`,
      error instanceof Error ? error.message : String(error)
    );
    
    config = {
      themes: {},
      build: {
        output: {
          directory: 'themes',
          formats: {
            expanded: '.css',
            compressed: '.min.css',
          },
        },
        sass: {
          style: 'expanded',
          sourceMap: true,
          loadPaths: ['src'],
        },
      },
      runtime: {
        basePath: '/themes',
        cdnPath: null,
        preload: [],
        lazy: true,
        defaultTheme: 'shaj-default',
        storageKey: 'atomix-theme',
        dataAttribute: 'data-theme',
        enablePersistence: true,
        useMinified: env === 'production',
      },
      integration: {
        cssVariables: {
          colorMode: '--storybook-color-mode',
        },
        classNames: {
          theme: 'data-theme',
          colorMode: 'data-atomix-color-mode',
        },
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
  config: any,
  env: 'development' | 'production' | 'test'
): any {
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
