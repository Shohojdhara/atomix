/**
 * Atomix CLI Internal Filesystem
 * Utilities for safe file and path operations
 */

import { resolve, normalize, isAbsolute, relative, dirname } from 'path';
import { access, writeFile, mkdir, readFile } from 'fs/promises';
import { logger } from '../utils/logger.js';
import chalk from 'chalk';
import { 
  validateSecurePath, 
  createBackup, 
  retryWithBackoff 
} from '../utils/security.js';

export const filesystem = {
  /**
   * Safe file write with dry-run support, backup, and retry mechanism
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

    // Validate path security
    const pathValidation = validateSecurePath(path);
    if (!pathValidation.isValid) {
      throw new Error(`Security validation failed for path ${path}: ${pathValidation.error}`);
    }

    const safePath = pathValidation.safePath;

    const writeOperation = async () => {
      try {
        const dir = dirname(safePath);
        await mkdir(dir, { recursive: true });
        
        // Create backup if file exists and backup is enabled
        if (options.backup !== false && await this.exists(safePath)) {
          try {
            await createBackup(safePath);
          } catch (backupError) {
            logger.warn(`Backup failed for ${safePath}: ${backupError.message}`);
          }
        }
        
        await writeFile(safePath, content, options);
        return true;
      } catch (error) {
        throw new Error(`Failed to write file ${safePath}: ${error.message}`);
      }
    };

    // Use retry mechanism for file operations
    return retryWithBackoff(writeOperation, options.maxRetries || 2, options.retryDelay || 100);
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
