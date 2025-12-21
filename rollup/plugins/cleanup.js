import { existsSync, unlinkSync } from 'fs';

/**
 * Rollup plugin to clean up temporary files after build
 * @param {string|string[]} files - File path(s) to clean up
 * @returns {object} Rollup plugin
 */
export function cleanup(files) {
  const filesToClean = Array.isArray(files) ? files : [files];

  return {
    name: 'cleanup',
    writeBundle() {
      filesToClean.forEach((file) => {
        if (existsSync(file)) {
          try {
            unlinkSync(file);
          } catch (error) {
            // Silently fail if file doesn't exist or can't be deleted
            if (error.code !== 'ENOENT') {
              console.warn(`Warning: Could not delete ${file}:`, error.message);
            }
          }
        }
      });
    },
  };
}

