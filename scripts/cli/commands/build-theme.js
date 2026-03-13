/**
 * Atomix CLI Build Theme Command
 */

import { resolve, basename, dirname } from 'path';
import chokidar from 'chokidar';
import { logger } from '../utils/logger.js';
import { AtomixCLIError } from '../utils/error.js';
import { filesystem } from '../internal/filesystem.js';
import { themeCompiler } from '../internal/compiler.js';
import { sanitizeInput } from '../utils/helpers.js';

/**
 * Action logic for building a theme
 * @param {string} themePath - Input path to theme SCSS
 * @param {object} options - Command options
 */
export async function buildThemeAction(themePath, options) {
  const spinner = logger.spinner('Initializing theme build...').start();

  try {
    const sanitizedThemePath = sanitizeInput(themePath);
    const themeValidation = filesystem.validatePath(sanitizedThemePath);

    if (!themeValidation.isValid) {
      throw new AtomixCLIError(
        themeValidation.error,
        'INVALID_PATH',
        [
          'Ensure theme path is within the project directory',
          'Avoid sensitive or absolute system paths'
        ]
      );
    }

    const sanitizedOutput = sanitizeInput(options.output || './dist');
    const outputValidation = filesystem.validatePath(sanitizedOutput);

    if (!outputValidation.isValid) {
      throw new AtomixCLIError(
        outputValidation.error,
        'INVALID_PATH',
        ['Use a project-relative directory for output']
      );
    }

    // Resolve index.scss
    const indexPath = sanitizedThemePath.endsWith('.scss')
      ? resolve(themeValidation.safePath)
      : resolve(themeValidation.safePath, 'index.scss');

    if (!(await filesystem.exists(indexPath))) {
      throw new AtomixCLIError(
        `Theme file not found: ${indexPath}`,
        'THEME_NOT_FOUND',
        ['Check if the file path is correct', 'Ensure the file has a .scss extension']
      );
    }

    const themeName = basename(dirname(indexPath));

    const performBuild = async () => {
      try {
        await themeCompiler.compile(indexPath, outputValidation.safePath, {
          minify: options.minify,
          sourcemap: options.sourcemap,
          analyze: options.analyze,
          themeName,
          logger: {
            info: (msg) => { spinner.text = msg; },
            debug: (msg) => logger.debug(msg)
          }
        });
        
        spinner.succeed(`Theme '${themeName}' built successfully`);
        if (options.watch) {
          logger.info('\n👁️  Watch mode enabled. Rebuilding on changes...');
        }
      } catch (error) {
        spinner.fail(`Build failed: ${error.message}`);
        if (!options.watch) throw error;
      }
    };

    // Initial build
    await performBuild();

    // Watch mode
    if (options.watch) {
      const watcher = chokidar.watch([dirname(indexPath)], {
        ignored: /node_modules/,
        persistent: true,
        ignoreInitial: true
      });

      watcher.on('all', async (event, path) => {
        logger.debug(`File ${event}: ${path}`);
        spinner.start('Rebuilding theme...');
        await performBuild();
      });

      process.on('SIGINT', () => {
        watcher.close();
        process.exit(0);
      });
    }

  } catch (error) {
    spinner.fail('Operation failed');
    throw error;
  }
}
