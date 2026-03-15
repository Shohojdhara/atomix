/**
 * Atomix CLI Internal Filesystem
 * Utilities for safe file and path operations
 */

import { resolve, normalize, isAbsolute, relative, dirname } from 'path';
import { access, writeFile, mkdir } from 'fs/promises';
import { logger } from '../utils/logger.js';
import chalk from 'chalk';

export const filesystem = {
  /**
   * Safe file write with dry-run support
   * @param {string} path - Path to write to
   * @param {string} content - Content to write
   * @param {object} options - Options
   */
  async writeFile(path, content, options = {}) {
    if (process.env.ATOMIX_DRY_RUN === 'true') {
      logger.info(`${chalk.cyan('[DRY RUN]')} Would write file: ${chalk.bold(path)}`);
      if (options.debug) {
        logger.debug('Content:', content);
      }
      return true;
    }

    try {
      const dir = dirname(path);
      await mkdir(dir, { recursive: true });
      await writeFile(path, content, options);
      return true;
    } catch (error) {
      throw new Error(`Failed to write file ${path}: ${error.message}`);
    }
  },

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
