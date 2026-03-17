/**
 * Atomix CLI Cache Manager
 * Utilities for identifying and managing cache files and build artifacts
 */

import { readdir, stat, rm } from 'fs/promises';
import { join, extname } from 'path';
import { filesystem } from '../internal/filesystem.js';
import { logger } from '../utils/logger.js';
import chalk from 'chalk';

// File extensions that should NEVER be deleted (source files)
const PROTECTED_EXTENSIONS = new Set([
  '.js', '.jsx', '.ts', '.tsx',
  '.scss', '.css', '.sass',
  '.json', '.md', '.html',
  '.yml', '.yaml'
]);

// Default directories to clean
const DEFAULT_CLEAN_TARGETS = [
  'dist',
  '.atomix',
  'node_modules/.cache'
];

// Additional targets for --all flag
const ALL_CLEAN_TARGETS = [
  ...DEFAULT_CLEAN_TARGETS,
  'node_modules'
];

/**
 * Cache Manager - Safe file cleanup utilities
 */
export const cacheManager = {
  /**
   * Identify files and directories that can be safely cleaned
   * @param {object} options - Clean options
   * @returns {Promise<string[]>} List of paths to clean
   */
  async identifyTargets(options = {}) {
    const targets = [];
    const cleanScope = options.all ? ALL_CLEAN_TARGETS : DEFAULT_CLEAN_TARGETS;
    
    for (const target of cleanScope) {
      const fullPath = join(process.cwd(), target);
      const exists = await filesystem.exists(fullPath);
      
      if (exists) {
        targets.push({
          path: fullPath,
          relativePath: target,
          type: await this.getPathType(fullPath)
        });
      }
    }

    // Add log files if not in cache-only mode
    if (!options.cache) {
      const logFiles = await this.findLogFiles();
      targets.push(...logFiles);
    }

    return targets;
  },

  /**
   * Determine if a path is a file or directory
   * @param {string} path - Path to check
   * @returns {Promise<'file'|'directory'>}
   */
  async getPathType(path) {
    try {
      const stats = await stat(path);
      return stats.isDirectory() ? 'directory' : 'file';
    } catch {
      return 'unknown';
    }
  },

  /**
   * Find all log files in the project
   * @returns {Promise<Array>} List of log file paths
   */
  async findLogFiles() {
    const logFiles = [];
    const root = process.cwd();
    
    try {
      const entries = await readdir(root, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isFile() && extname(entry.name) === '.log') {
          logFiles.push({
            path: join(root, entry.name),
            relativePath: entry.name,
            type: 'file'
          });
        }
      }
    } catch (error) {
      logger.debug('Error scanning for log files:', error.message);
    }

    return logFiles;
  },

  /**
   * Check if a file extension is protected (source file)
   * @param {string} filePath - Path to check
   * @returns {boolean} True if protected
   */
  isProtected(filePath) {
    const ext = extname(filePath);
    return PROTECTED_EXTENSIONS.has(ext);
  },

  /**
   * Safely delete a file or directory
   * @param {string} path - Path to delete
   * @param {object} options - Delete options
   * @param {boolean} options.skipValidation - Skip path validation (for tests)
   */
  async deletePath(path, options = {}) {
    // Safety check: never delete protected files
    if (this.isProtected(path)) {
      throw new Error(`Cannot delete protected source file: ${path}`);
    }

    // Validate path is within project (unless skipping for tests)
    if (!options.skipValidation) {
      const validation = filesystem.validatePath(path);
      if (!validation.isValid) {
        throw new Error(`Invalid path: ${validation.error}`);
      }
    }

    if (process.env.ATOMIX_DRY_RUN === 'true') {
      logger.info(`[DRY RUN] Would delete: ${path}`);
      return true;
    }

    try {
      await rm(path, { 
        recursive: true, 
        force: true,
        maxRetries: 3,
        retryDelay: 100
      });
      return true;
    } catch (error) {
      throw new Error(`Failed to delete ${path}: ${error.message}`);
    }
  },

  /**
   * Calculate total size of files/directories
   * @param {Array} targets - List of target paths
   * @returns {Promise<number>} Total size in bytes
   */
  async calculateSize(targets) {
    let totalSize = 0;

    const calculateDirSize = async (dirPath) => {
      try {
        const entries = await readdir(dirPath, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = join(dirPath, entry.name);
          
          if (entry.isDirectory()) {
            totalSize += await calculateDirSize(fullPath);
          } else {
            const stats = await stat(fullPath);
            totalSize += stats.size;
          }
        }
      } catch (error) {
        logger.debug('Error calculating size:', error.message);
      }
      
      return totalSize;
    };

    for (const target of targets) {
      if (target.type === 'directory') {
        await calculateDirSize(target.path);
      } else {
        const stats = await stat(target.path);
        totalSize += stats.size;
      }
    }

    return totalSize;
  },

  /**
   * Format bytes to human-readable string
   * @param {number} bytes - Size in bytes
   * @returns {string} Formatted size
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    // Handle edge case where size is larger than TB
    const unit = sizes[i] || 'PB';
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + unit;
  },

  /**
   * Display dry-run preview of what would be cleaned
   * @param {Array} targets - Files/dirs to clean
   */
  displayDryRun(targets) {
    if (targets.length === 0) {
      logger.box('✨ Nothing to clean! Your project is already tidy.', {
        borderColor: 'green'
      });
      return;
    }

    const fileList = targets
      .map(t => `  • ${t.relativePath} (${t.type})`)
      .join('\n');
    
    logger.box(
      `⚠️  Dry Run Mode - The following would be deleted:\n\n${fileList}`,
      {
        borderColor: 'yellow'
      }
    );

    logger.info(`\nTotal: ${targets.length} item(s)\n`);
  }
};
