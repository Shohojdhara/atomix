/**
 * Atomix CLI Clean Command
 * Safely clean build artifacts and cache files
 */

import { logger } from '../utils/logger.js';
import { AtomixCLIError } from '../utils/error.js';
import { cacheManager } from '../utils/cache-manager.js';

/**
 * Action logic for cleaning build artifacts
 * @param {object} options - Command options
 * @param {boolean} options.all - Clean node_modules as well
 * @param {boolean} options.cache - Only clean cache directories
 * @param {boolean} options.dryRun - Preview without deleting
 * @param {boolean} options.verbose - Show detailed output
 */
export async function cleanAction(options) {
  const spinner = logger.spinner('Analyzing project...').start();
  
  try {
    // Step 1: Identify what can be cleaned
    spinner.text = 'Scanning for cleanable files...';
    const targets = await cacheManager.identifyTargets(options);
    
    // Filter out protected files
    const safeTargets = targets.filter(target => {
      if (cacheManager.isProtected(target.path)) {
        logger.debug(`Skipping protected file: ${target.path}`);
        return false;
      }
      return true;
    });

    // Step 2: Handle empty state
    if (safeTargets.length === 0) {
      spinner.succeed('Nothing to clean! Your project is already tidy.');
      return;
    }

    // Step 3: Calculate total size
    const totalSize = await cacheManager.calculateSize(safeTargets);
    const formattedSize = cacheManager.formatBytes(totalSize);

    // Step 4: Handle dry-run mode
    if (options.dryRun || process.env.ATOMIX_DRY_RUN === 'true') {
      spinner.stop();
      cacheManager.displayDryRun(safeTargets);
      logger.info(
        `\nℹ️  Total size: ${formattedSize}\n` +
        `⚠️  Run without --dry-run to actually delete these files.`
      );
      return;
    }

    // Step 5: Perform cleanup
    spinner.text = `Cleaning ${safeTargets.length} item(s)...`;
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (const target of safeTargets) {
      try {
        if (options.verbose) {
          logger.info(`Removing: ${target.relativePath}`);
        }
        
        await cacheManager.deletePath(target.path, options);
        successCount++;
      } catch (error) {
        errorCount++;
        errors.push({
          path: target.relativePath,
          error: error.message
        });
        logger.debug(`Failed to delete ${target.path}: ${error.message}`);
      }
    }

    // Step 6: Report results
    if (errorCount > 0) {
      spinner.warn(`Cleanup completed with ${errorCount} warning(s)`);
      
      if (options.verbose && errors.length > 0) {
        logger.warn('\nWarnings:');
        errors.forEach(err => {
          logger.warn(`  • ${err.path}: ${err.error}`);
        });
      }
    } else {
      spinner.succeed(`Cleanup completed! Removed ${successCount} item(s) (${formattedSize})`);
    }

  } catch (error) {
    spinner.fail('Cleanup failed');
    
    // Re-throw as AtomixCLIError with helpful suggestions
    throw new AtomixCLIError(
      error.message,
      'FILESYSTEM_ERROR',
      [
        'Check if you have write permissions for the target directories',
        'Ensure no files are locked by another process',
        'Try running with --verbose to see which file caused the issue'
      ]
    );
  }
}
