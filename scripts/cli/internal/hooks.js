/**
 * Atomix CLI Hook Manager
 * Central event bus for handling CLI lifecycle hooks
 */

import { logger } from '../utils/logger.js';

export class HookManager {
  constructor() {
    this.hooks = {
      preGenerate: [],
      postBuild: [],
      onValidate: []
    };
  }

  /**
   * Registers a callback for a specific hook
   * @param {string} hookName - Name of the hook
   * @param {Function} callback - Async function to execute
   */
  register(hookName, callback) {
    if (!this.hooks[hookName]) {
      logger.warn(`Attempted to register unknown hook: ${hookName}`);
      return;
    }
    this.hooks[hookName].push(callback);
    logger.debug(`Registered hook: ${hookName}`);
  }

  /**
   * Triggers all callbacks for a specific hook
   * @param {string} hookName - Name of the hook
   * @param {any} data - Data to pass to callbacks
   * @returns {Promise<any>} - Modified data after all hooks have run
   */
  async trigger(hookName, data) {
    if (!this.hooks[hookName]) {
      return data;
    }

    let result = data;
    for (const callback of this.hooks[hookName]) {
      try {
        const nextResult = await callback(result);
        // Hooks can optionally return modified data
        if (nextResult !== undefined) {
          result = nextResult;
        }
      } catch (error) {
        logger.error(`Error in hook ${hookName}: ${error.message}`);
        if (process.env.ATOMIX_DEBUG) {
          console.error(error);
        }
      }
    }
    return result;
  }
}

export const hookManager = new HookManager();
