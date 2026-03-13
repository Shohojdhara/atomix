/**
 * Atomix CLI Internal Filesystem
 * Utilities for safe file and path operations
 */

import { resolve, normalize, isAbsolute, relative } from 'path';
import { access } from 'fs/promises';

export const filesystem = {
  /**
   * Validates and resolves a path within the project directory
   * @param {string} inputPath - The path to validate
   * @param {string} basePath - Base directory (defaults to process.cwd())
   * @returns {Object} { isValid: boolean, safePath: string, error?: string }
   */
  validatePath(inputPath, basePath = process.cwd()) {
    try {
      const normalizedBase = normalize(resolve(basePath));
      const normalizedInput = normalize(isAbsolute(inputPath)
        ? inputPath
        : resolve(basePath, inputPath));

      const relativePath = relative(normalizedBase, normalizedInput);

      if (relativePath.startsWith('..')) {
        return {
          isValid: false,
          safePath: null,
          error: 'Path is outside the project directory'
        };
      }

      return {
        isValid: true,
        safePath: normalizedInput,
        error: null
      };
    } catch (error) {
      return {
        isValid: false,
        safePath: null,
        error: `Invalid path: ${error.message}`
      };
    }
  },

  /**
   * Checks if a file exists
   */
  async exists(path) {
    try {
      await access(path);
      return true;
    } catch {
      return false;
    }
  }
};
