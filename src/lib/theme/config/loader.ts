/**
 * Theme Configuration Loader
 * 
 * Loads and validates the theme configuration from atomix.config.ts (and other formats)
 */

import type {
  ConfigLoaderOptions,
  LoadedThemeConfig,
  ConfigValidationResult,
} from './types';
import { validateConfig } from './validator';
import { ThemeError, ThemeErrorCode, getLogger } from '../errors';
import {
  DEFAULT_ATOMIX_CONFIG_PATH,
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
 * Load theme configuration from atomix.config.ts (and other formats)
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
      // Use eval('require') or similar to hide from bundlers
      nodeRequire = typeof require !== 'undefined' ? require : undefined;
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

    // First, try to resolve the config file path using our unified approach
    let resolvedConfigPath: string | null = null;
    
    // If a specific config path is provided, try to use it
    if (configPath && configPath !== DEFAULT_ATOMIX_CONFIG_PATH) {
      const path = nodeRequire(['p', 'a', 't', 'h'].join('')) as typeof import('path');
      const fs = nodeRequire(['f', 's'].join('')) as typeof import('fs');
      const fullPath = path.resolve(process.cwd(), configPath);
      
      if (fs.existsSync(fullPath)) {
        resolvedConfigPath = fullPath;
      }
    } else {
      // Otherwise, look for any of the supported config formats
      const possiblePaths = [
        'atomix.config.ts',
        'atomix.config.js',
        'atomix.config.json'
      ];
      
      const path = nodeRequire(['p', 'a', 't', 'h'].join('')) as typeof import('path');
      const fs = nodeRequire(['f', 's'].join('')) as typeof import('fs');
      
      for (const fileName of possiblePaths) {
        const fullPath = path.resolve(process.cwd(), fileName);
        if (fs.existsSync(fullPath)) {
          resolvedConfigPath = fullPath;
          break;
        }
      }
    }

    if (!resolvedConfigPath) {
      throw new ThemeError(
        `Config file not found: ${configPath}`,
        ThemeErrorCode.CONFIG_LOAD_FAILED,
        { configPath }
      );
    }

    // Handle JSON files differently
    if (resolvedConfigPath.endsWith('.json')) {
      const fs = nodeRequire(['f', 's'].join('')) as typeof import('fs');
      configModule = JSON.parse(fs.readFileSync(resolvedConfigPath, 'utf8'));
    } else {
      // Use require (Node.js/CommonJS) for JS/TS files
      try {
        const resolvedPath = nodeRequire.resolve(resolvedConfigPath);
        if (nodeRequire.cache && nodeRequire.cache[resolvedPath]) {
          delete nodeRequire.cache[resolvedPath];
        }
        configModule = nodeRequire(resolvedConfigPath) as ConfigModule;
      } catch (requireError) {
        const errorMessage = requireError instanceof Error
          ? requireError.message
          : String(requireError);
        throw new ThemeError(
          `Cannot load config: ${errorMessage}`,
          ThemeErrorCode.CONFIG_LOAD_FAILED,
          { configPath: resolvedConfigPath, error: errorMessage }
        );
      }
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

    // Store the raw config in the result for later use
    Object.assign(processedConfig, rawConfig);

    config = processedConfig;

    // Validate the config if requested
    if (validate) {
      const validationResult = validateConfig(config);
      if (!validationResult.valid) {
        logger.warn(`Configuration validation warnings:\n${validationResult.warnings.join('\n')}`);
        if (validationResult.errors.length > 0) {
          logger.error(`Configuration validation errors:\n${validationResult.errors.join('\n')}`);
          throw new ThemeError(
            'Configuration validation failed',
            ThemeErrorCode.CONFIG_VALIDATION_FAILED,
            { errors: validationResult.errors }
          );
        }
      }
      config.validated = true;
    } else {
      config.validated = false;
    }

    // Cache the loaded config
    cachedConfig = config;

    logger.info(`Successfully loaded theme configuration from ${resolvedConfigPath}`);
    return config;
  } catch (error) {
    if (error instanceof ThemeError) {
      throw error;
    }
    
    throw new ThemeError(
      `Failed to load theme configuration: ${(error as Error).message}`,
      ThemeErrorCode.CONFIG_LOAD_FAILED,
      { configPath, error: (error as Error).stack }
    );
  }
}

/**
 * Clear the configuration cache
 * 
 * This is useful when the config file has been modified and needs to be reloaded
 */
export function clearConfigCache(): void {
  cachedConfig = null;
  logger.debug('Configuration cache cleared');
}