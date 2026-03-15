/**
 * Atomix CLI Configuration Loader
 * Supports loading atomix.config.ts and atomix.config.js
 */

import { existsSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { logger } from '../utils/logger.js';
import { hookManager } from './hooks.js';

export class ConfigLoader {
  constructor() {
    this.config = null;
    this.configPath = null;
  }

  /**
   * Loads the configuration from the project root
   * @param {string} projectRoot - Root directory of the project
   * @returns {Promise<Object>} - Loaded configuration
   */
  async load(projectRoot = process.cwd()) {
    if (this.config) return this.config;

    const configFiles = ['atomix.config.ts', 'atomix.config.js'];
    let foundFile = null;

    for (const file of configFiles) {
      const fullPath = join(projectRoot, file);
      if (existsSync(fullPath)) {
        foundFile = fullPath;
        break;
      }
    }

    if (!foundFile) {
      logger.debug('No configuration file found. Using defaults.');
      this.config = { prefix: 'atomix' };
      return this.config;
    }

    this.configPath = foundFile;

    try {
      // If it's a TypeScript file, we need to register ts-node
      if (foundFile.endsWith('.ts')) {
        // Dynamic import to avoid issues in pure JS environments
        const { register } = await import('ts-node');
        register({
          transpileOnly: true,
          esm: true,
          compilerOptions: {
            module: 'ESNext',
            target: 'ESNext'
          }
        });
      }

      // Use dynamic import for ESM compatibility
      const configModule = await import(pathToFileURL(foundFile).href);
      this.config = configModule.default || configModule;

      logger.debug(`Loaded configuration from ${foundFile}`);

      // Initialize plugins if present
      if (this.config.plugins) {
        await this._initializePlugins();
      }

      return this.config;
    } catch (error) {
      logger.error(`Failed to load configuration from ${foundFile}: ${error.message}`);
      if (process.env.ATOMIX_DEBUG) {
        console.error(error);
      }
      this.config = { prefix: 'atomix' };
      return this.config;
    }
  }

  /**
   * Initializes plugins from the configuration
   * @private
   */
  async _initializePlugins() {
    for (const pluginEntry of this.config.plugins) {
      let pluginName = '';
      let pluginOptions = {};

      if (typeof pluginEntry === 'string') {
        pluginName = pluginEntry;
      } else {
        pluginName = pluginEntry.name;
        pluginOptions = pluginEntry.options || {};
      }

      try {
        let pluginModule;
        
        // Check if it's a local plugin (starts with ./ or ../)
        if (pluginName.startsWith('.')) {
          const pluginPath = join(process.cwd(), pluginName);
          pluginModule = await import(pathToFileURL(pluginPath).href);
        } else {
          // Assume it's an npm package
          pluginModule = await import(pluginName);
        }

        const plugin = pluginModule.default || pluginModule;
        
        if (typeof plugin === 'function') {
          // Initialize plugin with API and options
          await plugin(this._getPluginAPI(), pluginOptions);
          logger.debug(`Initialized plugin: ${pluginName}`);
        } else if (plugin && typeof plugin.init === 'function') {
          await plugin.init(this._getPluginAPI(), pluginOptions);
          logger.debug(`Initialized plugin: ${pluginName}`);
        } else {
          logger.warn(`Plugin ${pluginName} does not export a valid initializer.`);
        }
      } catch (error) {
        logger.error(`Failed to load plugin ${pluginName}: ${error.message}`);
      }
    }
  }

  /**
   * Returns the stable API provided to plugins
   * @private
   */
  _getPluginAPI() {
    return {
      logger,
      config: this.config,
      hooks: {
        register: (hook, cb) => hookManager.register(hook, cb)
      },
      // Plugins might need file system access
      fs: {
        // We'll expose a subset of filesystem utilities later if needed
      }
    };
  }

  /**
   * Returns the currently loaded configuration
   */
  getConfig() {
    return this.config || { prefix: 'atomix' };
  }
}

export const configLoader = new ConfigLoader();
