/**
 * Atomix CLI Internal Compiler
 * Handles SCSS compilation and CSS post-processing
 */

import * as sass from 'sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile, mkdir, stat } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const themeCompiler = {
  /**
   * Compiles a theme from SCSS to CSS
   * @param {string} indexPath - Path to the index SCSS file
   * @param {string} outputPath - Path to the output directory
   * @param {object} options - Compilation options
   */
  async compile(indexPath, outputDir, options = {}) {
    const {
      sourcemap = false,
      minify = true,
      analyze = false,
      logger
    } = options;

    const startTime = Date.now();
    const themeName = options.themeName || 'theme';

    // 1. Compile SCSS
    if (logger) logger.debug(`Compiling SCSS: ${indexPath}`);
    
    const result = sass.compile(indexPath, {
      loadPaths: [
        process.cwd(),
        join(process.cwd(), 'node_modules'),
        join(__dirname, '../../../src'),
        join(__dirname, '../../../src/styles'),
        dirname(indexPath)
      ],
      sourceMap: sourcemap,
      style: 'expanded',
    });

    // 2. Process with PostCSS
    if (logger) logger.debug('Processing with PostCSS');
    const processed = await postcss([
      autoprefixer({
        overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
      }),
    ]).process(result.css, {
      from: indexPath,
      map: sourcemap,
    });

    // 3. Ensure output directory exists
    await mkdir(outputDir, { recursive: true });

    // 4. Write expanded CSS
    const expandedPath = join(outputDir, `${themeName}.css`);
    await writeFile(expandedPath, processed.css, 'utf8');

    const stats = await stat(expandedPath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    if (logger) logger.info(`✓ Built ${expandedPath} (${sizeKB} KB)`);

    // 5. Minify if requested
    let minifiedStats = null;
    if (minify) {
      if (logger) logger.debug('Minifying CSS');
      const minified = await postcss([
        autoprefixer(),
        cssnano({ preset: 'default' }),
      ]).process(result.css, {
        from: indexPath,
      });

      const minPath = join(outputDir, `${themeName}.min.css`);
      await writeFile(minPath, minified.css, 'utf8');

      minifiedStats = await stat(minPath);
      const minSizeKB = (minifiedStats.size / 1024).toFixed(2);
      if (logger) logger.info(`✓ Built ${minPath} (${minSizeKB} KB)`);
    }

    // 6. Analyze if requested
    if (analyze && logger) {
      logger.info('\n📊 Theme Analysis:');
      logger.info(`  Original size: ${sizeKB} KB`);
      if (minify && minifiedStats) {
        const minSizeKB = (minifiedStats.size / 1024).toFixed(2);
        const reduction = ((1 - minifiedStats.size / stats.size) * 100).toFixed(1);
        logger.info(`  Minified size: ${minSizeKB} KB (${reduction}% reduction)`);
      }
      logger.info(`  Build time: ${Date.now() - startTime}ms`);
    }

    return {
      expandedPath,
      minifiedPath: minify ? join(outputDir, `${themeName}.min.css`) : null,
      stats: {
        originalSize: stats.size,
        minifiedSize: minifiedStats ? minifiedStats.size : null,
        duration: Date.now() - startTime
      }
    };
  }
};
