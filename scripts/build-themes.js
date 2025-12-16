#!/usr/bin/env node

/**
 * Build script for Atomix themes
 * 
 * This script compiles all theme SCSS files to CSS
 * and generates both expanded and minified versions.
 */

import { readdir, mkdir, access } from 'fs/promises';
import { join, basename } from 'path';
import * as sass from 'sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const THEMES_DIR = join(__dirname, '../src/themes');
const OUTPUT_DIR = join(__dirname, '../dist/themes');
const EXCLUDE_FILES = ['README.md', 'THEME_CHECKLIST.md', 'themes.config.js'];

/**
 * Ensure output directory exists
 */
async function ensureOutputDir() {
  try {
    await access(OUTPUT_DIR);
  } catch {
    await mkdir(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Created output directory: ${OUTPUT_DIR}`);
  }
}

/**
 * Get list of themes to build
 */
async function getThemes() {
  const entries = await readdir(THEMES_DIR, { withFileTypes: true });
  const themes = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
  
  console.log(`📦 Found ${themes.length} themes: ${themes.join(', ')}`);
  return themes;
}

/**
 * Check if theme has an index.scss file
 */
async function hasIndexScss(themeName) {
  try {
    await access(join(THEMES_DIR, themeName, 'index.scss'));
    return true;
  } catch {
    return false;
  }
}

/**
 * Build a single theme
 */
async function buildTheme(themeName) {
  const indexPath = join(THEMES_DIR, themeName, 'index.scss');
  
  // Check if index.scss exists
  if (!(await hasIndexScss(themeName))) {
    console.log(`⚠️  Skipping ${themeName}: No index.scss found`);
    return;
  }

  console.log(`🔨 Building theme: ${themeName}`);

  try {
    // Compile SCSS
    const result = sass.compile(indexPath, {
      loadPaths: [
        join(__dirname, '../src'),
        join(__dirname, '../src/styles'),
        join(__dirname, '../node_modules'),
      ],
      sourceMap: true,
      style: 'expanded',
    });

    // Process with PostCSS (autoprefixer)
    const processed = await postcss([
      autoprefixer({
        overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
      }),
    ]).process(result.css, {
      from: indexPath,
      to: join(OUTPUT_DIR, `${themeName}.css`),
      map: { inline: false },
    });

    // Write expanded CSS
    const { writeFile } = await import('fs/promises');
    await writeFile(
      join(OUTPUT_DIR, `${themeName}.css`),
      processed.css,
      'utf8'
    );
    
    // Write source map if available
    if (processed.map) {
      await writeFile(
        join(OUTPUT_DIR, `${themeName}.css.map`),
        processed.map.toString(),
        'utf8'
      );
    }

    console.log(`  ✅ Generated ${themeName}.css`);

    // Create minified version
    const minified = await postcss([
      autoprefixer({
        overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
      }),
      cssnano({
        preset: 'default',
      }),
    ]).process(result.css, {
      from: indexPath,
      to: join(OUTPUT_DIR, `${themeName}.min.css`),
    });

    await writeFile(
      join(OUTPUT_DIR, `${themeName}.min.css`),
      minified.css,
      'utf8'
    );

    console.log(`  ✅ Generated ${themeName}.min.css`);

    return {
      theme: themeName,
      success: true,
      files: [
        `${themeName}.css`,
        `${themeName}.min.css`,
      ],
    };
  } catch (error) {
    console.error(`  ❌ Failed to build ${themeName}:`, error.message);
    return {
      theme: themeName,
      success: false,
      error: error.message,
    };
  }
}

/**
 * Build all themes
 */
async function buildAllThemes() {
  console.log('🚀 Starting theme build process...\n');

  // Ensure output directory exists
  await ensureOutputDir();

  // Get list of themes
  const themes = await getThemes();

  // Build each theme
  const results = [];
  for (const theme of themes) {
    const result = await buildTheme(theme);
    results.push(result);
    console.log(''); // Add spacing between themes
  }

  // Summary
  console.log('📊 Build Summary:');
  const successful = results.filter(r => r?.success).length;
  const failed = results.filter(r => r && !r.success).length;
  const skipped = results.filter(r => !r).length;

  console.log(`  ✅ Successful: ${successful}`);
  if (failed > 0) {
    console.log(`  ❌ Failed: ${failed}`);
    results.filter(r => r && !r.success).forEach(r => {
      console.log(`    - ${r.theme}: ${r.error}`);
    });
  }
  if (skipped > 0) {
    console.log(`  ⚠️  Skipped: ${skipped}`);
  }

  console.log('\n✨ Theme build complete!');

  // Exit with error code if any builds failed
  if (failed > 0) {
    process.exit(1);
  }
}

// Run the build
buildAllThemes().catch(error => {
  console.error('💥 Build failed:', error);
  process.exit(1);
});
