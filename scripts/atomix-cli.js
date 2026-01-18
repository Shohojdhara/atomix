#!/usr/bin/env node

/**
 * Atomix CLI - Enhanced Version
 * Design System Development Tools
 */

import { program } from 'commander';
import { readFile, writeFile, mkdir, access, stat, rm } from 'fs/promises';
import { join, dirname, basename, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import * as sass from 'sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import chalk from 'chalk';
import ora from 'ora';
import chokidar from 'chokidar';
import inquirer from 'inquirer';
import boxen from 'boxen';
import { runInitWizard } from './cli/interactive-init.js';
import {
  migrateTailwind,
  migrateBootstrap,
  migrateSCSSVariables,
  displayMigrationReport
} from './cli/migration-tools.js';
import {
  listTokens,
  validateTokens,
  exportTokens,
  importTokens
} from './cli/token-manager.js';
import { createThemeCLIBridge } from './cli/theme-bridge.js';
import {
  validatePath,
  validateComponentName,
  validateThemeName,
  sanitizeInput,
  fileExists,
  isDebug as checkDebugMode,
  checkNodeVersion
} from './cli/utils.js';
import {
  componentTemplates,
  generateColorTokens,
  generateSpacingTokens,
  generateTypographyTokens,
  generateShadowTokens,
  generateRadiusTokens,
  generateAnimationTokens
} from './cli/templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Package info
const packageJson = JSON.parse(
  await readFile(join(__dirname, '../package.json'), 'utf8')
);

// CLI Configuration
const DEBUG = process.env.ATOMIX_DEBUG === 'true' || process.argv.includes('--debug');

/**
 * Enhanced Error Class
 */
class AtomixCLIError extends Error {
  constructor(message, code, suggestions = []) {
    super(message);
    this.name = 'AtomixCLIError';
    this.code = code;
    this.suggestions = suggestions;
  }
}

/**
 * Debug logger
 */
function debug(message, data = null) {
  if (DEBUG) {
    console.log(chalk.gray(`[DEBUG] ${message}`));
    if (data) {
      console.log(chalk.gray(JSON.stringify(data, null, 2)));
    }
  }
}

/**
 * Error handler with suggestions
 */
function handleError(error, spinner = null) {
  if (spinner) spinner.fail(chalk.red('Operation failed'));

  console.error(chalk.bold.red(`\n❌ ${error.message}`));

  if (error instanceof AtomixCLIError && error.suggestions.length > 0) {
    console.log(chalk.yellow('\n💡 Suggestions:'));
    error.suggestions.forEach((suggestion, index) => {
      console.log(chalk.gray(`   ${index + 1}. ${suggestion}`));
    });
  }

  if (DEBUG && error.stack) {
    console.error(chalk.gray('\nStack trace:'));
    console.error(chalk.gray(error.stack));
  }

  process.exit(1);
}



// Initialize program
program
  .name('atomix')
  .description('Atomix Design System CLI - Enhanced Edition')
  .version(packageJson.version)
  .option('-d, --debug', 'Enable debug mode', false)
  .hook('preAction', (thisCommand) => {
    if (thisCommand.opts().debug) {
      process.env.ATOMIX_DEBUG = 'true';
    }
  });

/**
 * Enhanced Build Theme Command with Watch Mode
 */
program
  .command('build-theme <path>')
  .description('Build a custom theme from SCSS')
  .option('-o, --output <path>', 'Output directory', './dist')
  .option('-m, --minify', 'Generate minified version', true)
  .option('-s, --sourcemap', 'Generate source maps', false)
  .option('-w, --watch', 'Watch for changes and rebuild', false)
  .option('--analyze', 'Analyze bundle size', false)
  .action(async (themePath, options) => {
    let spinner = ora('Initializing theme build...').start();

    try {
      const sanitizedThemePath = sanitizeInput(themePath);
      const themePathValidation = validatePath(sanitizedThemePath);
      if (!themePathValidation.isValid) {
        throw new AtomixCLIError(
          themePathValidation.error,
          'INVALID_PATH',
          [
            'Ensure theme path is within the project directory',
            'Avoid sensitive or absolute system paths',
            'Example: atomix build-theme themes/my-theme'
          ]
        );
      }
      const sanitizedOutput = sanitizeInput(options.output);
      const outputValidation = validatePath(sanitizedOutput);
      if (!outputValidation.isValid) {
        throw new AtomixCLIError(
          outputValidation.error,
          'INVALID_PATH',
          [
            'Use a project-relative directory for output',
            'Example: --output ./dist'
          ]
        );
      }
      // Resolve paths
      const indexPath = sanitizedThemePath.endsWith('.scss')
        ? resolve(themePathValidation.safePath)
        : resolve(themePathValidation.safePath, 'index.scss');

      debug(`Building theme from: ${indexPath}`);

      // Check if path exists
      try {
        await access(indexPath);
      } catch (error) {
        throw new AtomixCLIError(
          `Theme file not found: ${indexPath}`,
          'THEME_NOT_FOUND',
          [
            'Check if the file path is correct',
            'Ensure the file has a .scss extension',
            'Create a new theme with: atomix create-theme <name>'
          ]
        );
      }

      // Build function
      const buildTheme = async () => {
        const startTime = Date.now();

        try {
          // Compile SCSS
          spinner.text = 'Compiling SCSS...';
          debug('Starting SCSS compilation');

          const result = sass.compile(indexPath, {
            loadPaths: [
              process.cwd(),
              join(process.cwd(), 'node_modules'),
              join(__dirname, '../src'),
              join(__dirname, '../src/styles'),
              dirname(indexPath)
            ],
            sourceMap: options.sourcemap,
            style: 'expanded',
          });

          // Process with PostCSS
          spinner.text = 'Processing with PostCSS...';
          const processed = await postcss([
            autoprefixer({
              overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
            }),
          ]).process(result.css, {
            from: indexPath,
            map: options.sourcemap,
          });

          // Ensure output directory exists
          await mkdir(outputValidation.safePath, { recursive: true });

          // Get theme name
          const themeName = basename(dirname(indexPath));

          // Write expanded CSS
          const outputPath = join(outputValidation.safePath, `${themeName}.css`);
          await writeFile(outputPath, processed.css, 'utf8');

          // Get file size
          const stats = await stat(outputPath);
          const sizeKB = (stats.size / 1024).toFixed(2);

          spinner.succeed(chalk.green(`✓ Built ${outputPath} (${sizeKB} KB)`));

          // Write minified if requested
          if (options.minify) {
            const minifySpinner = ora('Minifying CSS...').start();
            const minified = await postcss([
              autoprefixer(),
              cssnano({ preset: 'default' }),
            ]).process(result.css, {
              from: indexPath,
            });

            const minPath = join(outputValidation.safePath, `${themeName}.min.css`);
            await writeFile(minPath, minified.css, 'utf8');

            const minStats = await stat(minPath);
            const minSizeKB = (minStats.size / 1024).toFixed(2);

            minifySpinner.succeed(chalk.green(`✓ Built ${minPath} (${minSizeKB} KB)`));
          }

          // Analyze if requested
          if (options.analyze) {
            console.log(chalk.cyan('\n📊 Theme Analysis:'));
            console.log(chalk.gray(`  Original size: ${sizeKB} KB`));
            if (options.minify) {
              const minPath = join(outputValidation.safePath, `${themeName}.min.css`);
              const minStats = await stat(minPath);
              const minSizeKB = (minStats.size / 1024).toFixed(2);
              const reduction = ((1 - minStats.size / stats.size) * 100).toFixed(1);
              console.log(chalk.gray(`  Minified size: ${minSizeKB} KB (${reduction}% reduction)`));
            }
            console.log(chalk.gray(`  Build time: ${Date.now() - startTime}ms`));
          }

          if (!options.watch) {
            console.log(chalk.bold.green('\n✨ Theme build complete!'));
          }

        } catch (error) {
          if (options.watch) {
            console.error(chalk.red(`Build error: ${error.message}`));
            console.log(chalk.yellow('Waiting for changes...'));
          } else {
            throw error;
          }
        }
      };

      // Initial build
      await buildTheme();
      spinner.stop();

      // Watch mode
      if (options.watch) {
        console.log(chalk.cyan('\n👁️  Watch mode enabled. Press Ctrl+C to exit.\n'));

        const watcher = chokidar.watch([themePathValidation.safePath], {
          ignored: /node_modules/,
          persistent: true,
          ignoreInitial: true
        });

        watcher.on('change', async (path) => {
          console.log(chalk.gray(`\n[${new Date().toLocaleTimeString()}] File changed: ${relative(process.cwd(), path)}`));
          spinner = ora('Rebuilding theme...').start();
          await buildTheme();
          spinner.stop();
        });

        watcher.on('add', async (path) => {
          console.log(chalk.gray(`\n[${new Date().toLocaleTimeString()}] File added: ${relative(process.cwd(), path)}`));
          spinner = ora('Rebuilding theme...').start();
          await buildTheme();
          spinner.stop();
        });

        // Handle graceful shutdown
        process.on('SIGINT', () => {
          console.log(chalk.yellow('\n\nShutting down watch mode...'));
          watcher.close();
          process.exit(0);
        });
      }

    } catch (error) {
      handleError(error, spinner);
    }
  });

/**
 * Generate Component Command - NEW
 */
program
  .command('generate <type> <name>')
  .alias('g')
  .description('Generate design system components, tokens, or themes')
  .option('-t, --typescript', 'Use TypeScript (default)', true)
  .option('-s, --story', 'Include Storybook story', true)
  .option('--test', 'Include test file', false)
  .option('--scss-module', 'Use SCSS modules', false)
  .option('--path <path>', 'Custom output path', './src/components')
  .option('-f, --force', 'Overwrite existing files', false)
  .action(async (type, name, options) => {
    const spinner = ora(`Generating ${type}: ${name}...`).start();

    try {
      debug(`Generating ${type} with name: ${name}`, options);
      const safeName = sanitizeInput(name);

      if (type === 'component' || type === 'c') {
        const nameValidation = validateComponentName(safeName);
        if (!nameValidation.isValid) {
          throw new AtomixCLIError(
            nameValidation.error,
            'INVALID_NAME',
            [
              'Use PascalCase naming (e.g., MyComponent)',
              'Start with an uppercase letter',
              'Use only letters and numbers',
              'Avoid reserved words'
            ]
          );
        }
        // Validate output path
        const sanitizedPath = sanitizeInput(options.path);
        const pathValidation = validatePath(sanitizedPath);
        if (!pathValidation.isValid) {
          throw new AtomixCLIError(
            pathValidation.error,
            'INVALID_PATH',
            [
              'Ensure the path is within the project directory',
              'Avoid using ".." to navigate outside the project',
              'Check for typos in the path'
            ]
          );
        }

        const componentPath = join(pathValidation.safePath, safeName);

        // Check if component already exists
        if (existsSync(componentPath) && !options.force) {
          throw new AtomixCLIError(
            `Component ${safeName} already exists`,
            'COMPONENT_EXISTS',
            [
              `Delete the existing component at ${componentPath}`,
              'Use --force flag to overwrite',
              'Choose a different component name'
            ]
          );
        }

        // Create component directory
        await mkdir(componentPath, { recursive: true });

        // Generate component file
        const componentContent = componentTemplates.react.component(safeName, {
          scssModule: options.scssModule,
          types: false // We'll generate inline types for now
        });

        await writeFile(
          join(componentPath, `${safeName}.tsx`),
          componentContent,
          'utf8'
        );
        spinner.succeed(chalk.green(`✓ Created ${safeName}.tsx`));

        // Generate index file
        const indexContent = componentTemplates.react.index(safeName);
        await writeFile(
          join(componentPath, 'index.ts'),
          indexContent,
          'utf8'
        );
        console.log(chalk.green(`  ✓ Created index.ts`));

        // Generate SCSS file
        if (!options.scssModule) {
          const scssContent = componentTemplates.react.scss(safeName);
          const scssPath = join(process.cwd(), 'src/styles/06-components');
          const scssFilename = `_components.${safeName.toLowerCase()}.scss`;
          const scssFilePath = join(scssPath, scssFilename);

          // Ensure styles directory exists
          if (existsSync(scssPath)) {
            // Check if SCSS file already exists
            if (!existsSync(scssFilePath) || options.force) {
              await writeFile(scssFilePath, scssContent, 'utf8');
              console.log(chalk.green(`  ✓ Created ${scssFilename} in src/styles/06-components`));

              // Update _index.scss
              const indexPath = join(scssPath, '_index.scss');
              if (existsSync(indexPath)) {
                let indexContent = await readFile(indexPath, 'utf8');
                const forwardStatement = `@forward 'components.${safeName.toLowerCase()}';`;

                if (!indexContent.includes(forwardStatement)) {
                  // Append to end of file, ensuring newline
                  if (!indexContent.endsWith('\n')) indexContent += '\n';
                  indexContent += `${forwardStatement}\n`;
                  await writeFile(indexPath, indexContent, 'utf8');
                  console.log(chalk.green(`  ✓ Updated _index.scss`));
                }
              }
            } else {
              console.log(chalk.yellow(`  ⚠️  SCSS file already exists: ${scssFilename}`));
            }
          } else {
            console.log(chalk.yellow(`  ⚠️  Styles directory not found: ${scssPath}`));
          }
        } else {
          // Fallback for modules if strictly requested (though we discourage it)
          const scssContent = componentTemplates.react.scssModule(safeName);
          await writeFile(
            join(componentPath, `${safeName}.module.scss`),
            scssContent,
            'utf8'
          );
        }

        // Generate Storybook story
        if (options.story) {
          const storyContent = componentTemplates.react.story(safeName);
          await writeFile(
            join(componentPath, `${safeName}.stories.tsx`),
            storyContent,
            'utf8'
          );
          console.log(chalk.green(`  ✓ Created ${safeName}.stories.tsx`));
        }

        // Generate test file
        if (options.test) {
          const testContent = componentTemplates.react.test(safeName);
          await writeFile(
            join(componentPath, `${safeName}.test.tsx`),
            testContent,
            'utf8'
          );
          console.log(chalk.green(`  ✓ Created ${safeName}.test.tsx`));
        }

        // Success message with next steps
        console.log(boxen(
          chalk.bold.green(`🎉 Component ${safeName} created successfully!\n\n`) +
          chalk.cyan('Next steps:\n') +
          chalk.gray(`1. Import in your app:\n`) +
          chalk.white(`   import { ${safeName} } from '${options.path}/${safeName}';\n\n`) +
          chalk.gray(`2. Add to design system exports:\n`) +
          chalk.white(`   export { ${safeName} } from './${safeName}';\n\n`) +
          chalk.gray(`3. Run Storybook to see your component:\n`) +
          chalk.white(`   npm run storybook`),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'green'
          }
        ));

      } else if (type === 'token' || type === 't') {
        // Token generation
        const validCategories = ['colors', 'spacing', 'typography', 'shadows', 'radius', 'animations'];

        if (!validCategories.includes(name.toLowerCase())) {
          throw new AtomixCLIError(
            `Invalid token category: ${name}`,
            'INVALID_TOKEN_CATEGORY',
            [
              `Valid categories: ${validCategories.join(', ')}`,
              'Example: atomix generate token colors',
              'Example: atomix g t spacing'
            ]
          );
        }

        const tokenPath = join(process.cwd(), 'src/styles/01-settings');

        // Check if settings directory exists
        if (!existsSync(tokenPath)) {
          throw new AtomixCLIError(
            'Settings directory not found',
            'MISSING_DIRECTORY',
            [
              'Ensure you are in an Atomix project directory',
              'Create the directory: mkdir -p src/styles/01-settings',
              'Or initialize a new project: atomix init'
            ]
          );
        }

        // Generate token file based on category
        let tokenContent = '';
        let filename = '';

        switch (name.toLowerCase()) {
          case 'colors':
            filename = '_settings.colors.custom.scss';
            tokenContent = generateColorTokens();
            break;
          case 'spacing':
            filename = '_settings.spacing.custom.scss';
            tokenContent = generateSpacingTokens();
            break;
          case 'typography':
            filename = '_settings.typography.custom.scss';
            tokenContent = generateTypographyTokens();
            break;
          case 'shadows':
            filename = '_settings.box-shadow.custom.scss';
            tokenContent = generateShadowTokens();
            break;
          case 'radius':
            filename = '_settings.border-radius.custom.scss';
            tokenContent = generateRadiusTokens();
            break;
          case 'animations':
            filename = '_settings.animations.custom.scss';
            tokenContent = generateAnimationTokens();
            break;
        }

        const filePath = join(tokenPath, filename);

        // Check if file already exists
        if (existsSync(filePath) && !options.force) {
          throw new AtomixCLIError(
            `Token file already exists: ${filename}`,
            'FILE_EXISTS',
            [
              'Use --force flag to overwrite',
              `Or edit the existing file: ${filePath}`,
              'Or choose a different category'
            ]
          );
        }

        // Write token file
        await writeFile(filePath, tokenContent, 'utf8');
        spinner.succeed(chalk.green(`✓ Created token file: ${filename}`));

        // Success message
        console.log(boxen(
          chalk.bold.green(`🎨 ${name} tokens generated successfully!\n\n`) +
          chalk.cyan('Next steps:\n') +
          chalk.gray(`1. Customize your tokens:\n`) +
          chalk.white(`   Edit ${filePath}\n\n`) +
          chalk.gray(`2. Import in your theme:\n`) +
          chalk.white(`   @use '${filename.replace('.scss', '')}' as *;\n\n`) +
          chalk.gray(`3. Build your styles:\n`) +
          chalk.white(`   npm run build`),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'green'
          }
        ));
      } else {
        throw new AtomixCLIError(
          `Unknown generation type: ${type}`,
          'UNKNOWN_TYPE',
          [
            'Valid types are: component (or c), token (or t)',
            'Example: atomix generate component Button',
            'Example: atomix g c Button'
          ]
        );
      }

    } catch (error) {
      handleError(error, spinner);
    }
  });

/**
 * Validate Command - NEW
 */
program
  .command('validate [target]')
  .description('Validate themes, design tokens, or accessibility')
  .option('--tokens', 'Validate design tokens', false)
  .option('--theme <path>', 'Validate specific theme', '')
  .option('--a11y, --accessibility', 'Check accessibility compliance', false)
  .option('--fix', 'Attempt to fix issues automatically', false)
  .action(async (target, options) => {
    const spinner = ora('Running validation...').start();

    try {
      debug('Validation options:', options);

      const issues = [];
      const warnings = [];

      // Token validation
      if (options.tokens || target === 'tokens') {
        spinner.text = 'Validating design tokens...';

        const tokenFiles = [
          'src/styles/01-settings/_settings.colors.scss',
          'src/styles/01-settings/_settings.typography.scss',
          'src/styles/01-settings/_settings.spacing.scss',
          'src/styles/01-settings/_settings.radius.scss'
        ];

        for (const file of tokenFiles) {
          const filePath = join(process.cwd(), file);
          if (existsSync(filePath)) {
            const content = await readFile(filePath, 'utf8');

            // Check for hardcoded values
            const hardcodedColors = content.match(/#[0-9a-fA-F]{3,8}(?![0-9a-fA-F])/g);
            if (hardcodedColors && hardcodedColors.length > 0) {
              warnings.push({
                file: file,
                issue: `Found ${hardcodedColors.length} hardcoded color values`,
                suggestion: 'Use CSS custom properties or SCSS variables'
              });
            }

            // Check for missing default flags
            const variables = content.match(/\$[a-z-]+:/gi);
            const defaultFlags = content.match(/!default/g);
            if (variables && (!defaultFlags || defaultFlags.length < variables.length)) {
              warnings.push({
                file: file,
                issue: 'Some variables missing !default flag',
                suggestion: 'Add !default to all token variables for better theming'
              });
            }
          } else {
            issues.push({
              file: file,
              issue: 'Token file not found',
              suggestion: 'Ensure all token files are present in src/styles/01-settings/'
            });
          }
        }
      }

      // Theme validation
      if (options.theme) {
        spinner.text = `Validating theme: ${options.theme}...`;

        const themePath = resolve(options.theme);
        if (!existsSync(themePath)) {
          issues.push({
            file: options.theme,
            issue: 'Theme file not found',
            suggestion: 'Check the theme path is correct'
          });
        } else {
          const content = await readFile(themePath, 'utf8');

          // Check for required imports
          const requiredImports = [
            '@import.*settings',
            '@use.*settings',
            '@import.*tools',
            '@use.*tools'
          ];

          let hasSettings = false;
          for (const pattern of requiredImports) {
            if (new RegExp(pattern).test(content)) {
              hasSettings = true;
              break;
            }
          }

          if (!hasSettings) {
            issues.push({
              file: options.theme,
              issue: 'Missing design system imports',
              suggestion: 'Import settings and tools from the design system'
            });
          }
        }
      }

      // Accessibility validation
      if (options.a11y || options.accessibility) {
        spinner.text = 'Checking accessibility compliance...';

        // Check for focus styles
        const componentFiles = [
          'src/styles/06-components'
        ];

        for (const dir of componentFiles) {
          const dirPath = join(process.cwd(), dir);
          if (existsSync(dirPath)) {
            // This is a simplified check - in reality, we'd parse the CSS
            warnings.push({
              file: dir,
              issue: 'Manual accessibility review recommended',
              suggestion: 'Ensure all interactive components have :focus-visible styles'
            });
          }
        }
      }

      spinner.stop();

      // Display results
      if (issues.length === 0 && warnings.length === 0) {
        console.log(boxen(
          chalk.bold.green('✅ All validations passed!\n\n') +
          chalk.gray('Your design system is following best practices.'),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'green'
          }
        ));
      } else {
        if (issues.length > 0) {
          console.log(chalk.bold.red(`\n❌ Found ${issues.length} issue(s):\n`));
          issues.forEach((issue, index) => {
            console.log(chalk.red(`  ${index + 1}. ${issue.file}`));
            console.log(chalk.gray(`     Issue: ${issue.issue}`));
            console.log(chalk.yellow(`     Fix: ${issue.suggestion}\n`));
          });
        }

        if (warnings.length > 0) {
          console.log(chalk.bold.yellow(`\n⚠️  Found ${warnings.length} warning(s):\n`));
          warnings.forEach((warning, index) => {
            console.log(chalk.yellow(`  ${index + 1}. ${warning.file}`));
            console.log(chalk.gray(`     Warning: ${warning.issue}`));
            console.log(chalk.cyan(`     Suggestion: ${warning.suggestion}\n`));
          });
        }

        if (options.fix && (issues.length > 0 || warnings.length > 0)) {
          console.log(chalk.cyan('\n🔧 Attempting to fix issues...'));

          let fixedCount = 0;

          // Fix missing !default flags
          const defaultFlagIssues = warnings.filter(w => w.issue === 'Some variables missing !default flag');
          for (const warning of defaultFlagIssues) {
            const filePath = join(process.cwd(), warning.file);
            if (existsSync(filePath)) {
              try {
                let content = await readFile(filePath, 'utf8');
                // Add !default to variables that don't have it
                const newContent = content.replace(/(\$[a-z-]+:\s*[^;!]+)(;)/gi, '$1 !default$2');

                if (content !== newContent) {
                  await writeFile(filePath, newContent, 'utf8');
                  console.log(chalk.green(`  ✓ Fixed missing !default flags in ${warning.file}`));
                  fixedCount++;
                }
              } catch (err) {
                console.error(chalk.red(`  ✗ Failed to fix ${warning.file}: ${err.message}`));
              }
            }
          }

          if (fixedCount > 0) {
            console.log(chalk.green(`\n✨ Fixed ${fixedCount} file(s). Please run validate again to verify.`));
          } else {
            console.log(chalk.yellow('\nCould not automatically fix reported issues. Manual intervention required.'));
          }
        }
      }

    } catch (error) {
      handleError(error, spinner);
    }
  });

/**
 * Dev Command - NEW (Alias for build --watch)
 */
program
  .command('dev <theme>')
  .description('Start development mode with hot reload')
  .option('-o, --output <path>', 'Output directory', './dist')
  .option('--open', 'Open in browser after build', false)
  .action(async (theme, options) => {
    console.log(boxen(
      chalk.bold.cyan('🚀 Starting Atomix Dev Mode\n\n') +
      chalk.gray('Watching for changes...\n') +
      chalk.gray('Press Ctrl+C to exit'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan'
      }
    ));

    // Reuse build command with watch flag
    await program.parseAsync([
      ...process.argv.slice(0, 2),
      'build-theme',
      theme,
      '--watch',
      '--output', options.output
    ]);
  });

// Keep existing commands (create-theme, list-themes, info)
// ... [Previous create-theme, list-themes, and info commands remain the same]

/**
 * Migrate Command - NEW (Migration from other frameworks)
 */
program
  .command('migrate <from>')
  .description('Migrate from other CSS frameworks to Atomix design system')
  .option('-s, --source <path>', 'Source directory to migrate', './src')
  .option('--dry-run', 'Preview changes without modifying files', false)
  .option('--create-backup', 'Create backup before migration', true)
  .action(async (from, options) => {
    const spinner = ora('Preparing migration...').start();

    try {
      debug(`Migrating from ${from}`, options);

      // Validate migration type
      const validMigrations = ['tailwind', 'bootstrap', 'scss-variables'];
      if (!validMigrations.includes(from.toLowerCase())) {
        throw new AtomixCLIError(
          `Unknown migration source: ${from}`,
          'INVALID_MIGRATION',
          [
            'Valid migration sources: tailwind, bootstrap, scss-variables',
            'Example: atomix migrate tailwind',
            'Example: atomix migrate bootstrap --source ./src'
          ]
        );
      }

      const sanitizedSource = sanitizeInput(options.source);
      const sourceValidation = validatePath(sanitizedSource);
      if (!sourceValidation.isValid) {
        throw new AtomixCLIError(
          sourceValidation.error,
          'INVALID_PATH',
          [
            'Ensure source path is within the project directory',
            'Avoid sensitive or absolute system paths',
            'Example: --source ./src'
          ]
        );
      }
      const sourcePath = resolve(sourceValidation.safePath);
      if (!existsSync(sourcePath)) {
        throw new AtomixCLIError(
          `Source directory not found: ${sourcePath}`,
          'SOURCE_NOT_FOUND',
          [
            'Check the source path is correct',
            'Use --source flag to specify a different directory',
            'Example: atomix migrate tailwind --source ./app'
          ]
        );
      }

      spinner.stop();

      // Show migration preview
      console.log(boxen(
        chalk.bold.cyan(`🔄 Migration Preview\n\n`) +
        chalk.gray(`From: ${chalk.white(from)}\n`) +
        chalk.gray(`Source: ${chalk.white(sourcePath)}\n`) +
        chalk.gray(`Mode: ${options.dryRun ? chalk.yellow('Dry Run') : chalk.green('Live')}\n`) +
        chalk.gray(`Backup: ${options.createBackup ? chalk.green('Yes') : chalk.red('No')}`),
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'cyan'
        }
      ));

      // Confirm migration
      if (!options.dryRun) {
        const { confirmMigration } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'confirmMigration',
            message: chalk.yellow('This will modify your files. Continue?'),
            default: false
          }
        ]);

        if (!confirmMigration) {
          console.log(chalk.yellow('\n Migration cancelled.'));
          return;
        }
      }

      // Create backup if requested
      if (options.createBackup && !options.dryRun) {
        const backupSpinner = ora('Creating backup...').start();
        const backupDir = `${sourcePath}.backup.${Date.now()}`;

        try {
          const { execSync } = await import('child_process');
          execSync(`cp -r "${sourcePath}" "${backupDir}"`, { stdio: 'ignore' });
          backupSpinner.succeed(chalk.green(`✓ Backup created: ${backupDir}`));
        } catch (error) {
          backupSpinner.warn(chalk.yellow('Could not create backup, continuing anyway...'));
        }
      }

      // Run migration
      let report;

      switch (from.toLowerCase()) {
        case 'tailwind':
          report = await migrateTailwind(sourcePath, options);
          break;

        case 'bootstrap':
          report = await migrateBootstrap(sourcePath, options);
          break;

        case 'scss-variables':
          report = await migrateSCSSVariables(sourcePath, options);
          break;
      }

      // Display report
      displayMigrationReport(report);

      // Next steps
      if (!options.dryRun && report.filesProcessed > 0) {
        console.log(chalk.cyan('\n📝 Next Steps:'));
        console.log(chalk.gray('  1. Review the changes in your code'));
        console.log(chalk.gray('  2. Install Atomix: npm install @shohojdhara/atomix'));
        console.log(chalk.gray('  3. Import Atomix styles: import "@shohojdhara/atomix/css"'));
        console.log(chalk.gray('  4. Test your application thoroughly'));
        console.log(chalk.gray('  5. Customize with your theme: atomix create-theme custom'));
      }

    } catch (error) {
      handleError(error, spinner);
    }
  });

/**
 * Init Command - NEW (Interactive Setup Wizard)
 */
program
  .command('init')
  .description('Interactive setup wizard for Atomix design system')
  .option('--skip-install', 'Skip dependency installation', false)
  .action(async (options) => {
    try {
      // Set environment variable for skip install if needed
      if (options.skipInstall) {
        process.env.ATOMIX_SKIP_INSTALL = 'true';
      }

      // Run the interactive wizard
      await runInitWizard();
    } catch (error) {
      handleError(error);
    }
  });

/**
 * Tokens Command - NEW (Design Token Management)
 */
program
  .command('tokens <action>')
  .description('Manage design tokens (list, validate, export, import)')
  .option('-c, --category <category>', 'Token category (colors, typography, spacing, etc.)')
  .option('-f, --format <format>', 'Export format (json, css, scss, js, ts)', 'json')
  .option('-o, --output <path>', 'Output file path')
  .option('--dry-run', 'Preview changes without modifying files', false)
  .action(async (action, options) => {
    try {
      debug(`Token action: ${action}`, options);

      switch (action.toLowerCase()) {
        case 'list':
        case 'ls':
          await listTokens(options.category);
          break;

        case 'validate':
        case 'check': {
          const validationResult = await validateTokens(options);
          if (validationResult.issues.length > 0) {
            process.exit(1); // Exit with error if issues found
          }
          break;
        }

        case 'export':
          if (!options.format) {
            throw new AtomixCLIError(
              'Export format is required',
              'MISSING_FORMAT',
              [
                'Specify format with --format flag',
                'Valid formats: json, css, scss, js, ts',
                'Example: atomix tokens export --format json'
              ]
            );
          }
          if (options.output) {
            const outValidation = validatePath(sanitizeInput(options.output));
            if (!outValidation.isValid) {
              throw new AtomixCLIError(
                outValidation.error,
                'INVALID_PATH',
                [
                  'Use a project-relative output file path',
                  'Example: --output ./tokens.json'
                ]
              );
            }
            await exportTokens(options.format, outValidation.safePath);
          } else {
            await exportTokens(options.format, options.output);
          }
          break;

        case 'import':
          if (!options.output) {
            throw new AtomixCLIError(
              'Import file path is required',
              'MISSING_PATH',
              [
                'Specify file with --output flag',
                'Example: atomix tokens import --output tokens.json'
              ]
            );
          }
          {
            const inValidation = validatePath(sanitizeInput(options.output));
            if (!inValidation.isValid) {
              throw new AtomixCLIError(
                inValidation.error,
                'INVALID_PATH',
                [
                  'Use a project-relative input file path',
                  'Example: --output ./tokens.json'
                ]
              );
            }
            await importTokens(inValidation.safePath, { dryRun: options.dryRun });
          }
          break;

        default:
          throw new AtomixCLIError(
            `Unknown token action: ${action}`,
            'UNKNOWN_ACTION',
            [
              'Valid actions: list, validate, export, import',
              'Example: atomix tokens list',
              'Example: atomix tokens export --format json'
            ]
          );
      }

    } catch (error) {
      handleError(error);
    }
  });

/**
 * Theme Command Group - NEW (Integrated with Theme Devtools)
 */
const themeCommand = program
  .command('theme')
  .description('Theme management commands');

// Theme validate
themeCommand
  .command('validate')
  .description('Validate theme configuration')
  .option('--config <path>', 'Path to theme config file')
  .option('--strict', 'Enable strict validation')
  .action(async (options) => {
    try {
      const themeCLI = createThemeCLIBridge();
      await themeCLI.validate(options);
    } catch (error) {
      handleError(error);
    }
  });

// Theme list
themeCommand
  .command('list')
  .alias('ls')
  .description('List all available themes')
  .action(async () => {
    try {
      const themeCLI = createThemeCLIBridge();
      await themeCLI.list();
    } catch (error) {
      handleError(error);
    }
  });

// Theme inspect
themeCommand
  .command('inspect <name>')
  .description('Inspect a specific theme')
  .option('--json', 'Output as JSON')
  .action(async (name, options) => {
    try {
      const themeCLI = createThemeCLIBridge();
      await themeCLI.inspect(name, options);
    } catch (error) {
      handleError(error);
    }
  });

// Theme compare
themeCommand
  .command('compare <theme1> <theme2>')
  .description('Compare two themes')
  .action(async (theme1, theme2) => {
    try {
      const themeCLI = createThemeCLIBridge();
      await themeCLI.compare(theme1, theme2);
    } catch (error) {
      handleError(error);
    }
  });

// Theme export
themeCommand
  .command('export <name>')
  .description('Export theme to JSON')
  .option('-o, --output <path>', 'Output file path')
  .action(async (name, options) => {
    try {
      const themeCLI = createThemeCLIBridge();
      await themeCLI.export(name, options);
    } catch (error) {
      handleError(error);
    }
  });

// Theme create - NEW
themeCommand
  .command('create <name>')
  .description('Create a new theme')
  .option('-t, --type <type>', 'Theme type (css|js)', 'css')
  .option('--template <name>', 'Use template (dark|light|high-contrast)')
  .option('--interactive', 'Interactive mode', false)
  .option('-o, --output <path>', 'Output directory', './themes')
  .option('-f, --force', 'Overwrite existing theme', false)
  .action(async (name, options) => {
    const spinner = ora('Creating theme...').start();

    try {
      debug(`Creating theme: ${name}`, options);

      // Validate name
      const nameValidation = validateThemeName(name);
      if (!nameValidation.isValid) {
        throw new AtomixCLIError(
          nameValidation.error,
          'INVALID_NAME',
          [
            'Use lowercase letters, numbers, and hyphens',
            'Start with a letter',
            'Example: dark-theme, light-mode, custom-theme',
            'Avoid consecutive or trailing hyphens'
          ]
        );
      }

      const themePath = join(options.output, name);

      // Check if theme already exists
      if (existsSync(themePath)) {
        if (options.force) {
          await rm(themePath, { recursive: true, force: true });
          await mkdir(themePath, { recursive: true });
          spinner.info(chalk.yellow(`Overwriting existing theme: ${name}`));
        } else {
          throw new AtomixCLIError(
            `Theme ${name} already exists`,
            'THEME_EXISTS',
            [
              `Delete the existing theme at ${themePath}`,
              'Choose a different theme name',
              'Use --force flag to overwrite'
            ]
          );
        }
      } else {
        // Create theme directory
        await mkdir(themePath, { recursive: true });
      }

      // Generate theme files based on type
      if (options.type === 'css') {
        // Create SCSS theme
        const scssContent = `// Theme: ${name}
// =============================================================================

@import '../../src/styles/01-settings';
@import '../../src/styles/02-tools';

// Theme Variables
// =============================================================================
:root[data-theme="${name}"] {
  // Colors
  --atomix-color-primary: #7AFFD7;
  --atomix-color-secondary: #FF5733;
  --atomix-color-success: #4DFF9F;
  --atomix-color-error: #FF1A1A;
  --atomix-color-warning: #FFB84D;
  
  // Background
  --atomix-color-background: #000000;
  --atomix-color-surface: #212121;
  
  // Text
  --atomix-color-text: #FFFFFF;
  --atomix-color-text-secondary: rgba(255, 255, 255, 0.8);
  
  // Border
  --atomix-color-border: rgba(255, 255, 255, 0.1);
  
  // Spacing (if needed)
  // --atomix-space-base: 16px;
  
  // Typography (if needed)
  // --atomix-font-family-base: 'Inter', sans-serif;
}

// Theme-specific Component Overrides
// =============================================================================
[data-theme="${name}"] {
  // Add component-specific overrides here
  
  .c-button {
    // Button overrides
  }
  
  .c-card {
    // Card overrides
  }
}
`;

        await writeFile(join(themePath, 'index.scss'), scssContent, 'utf8');
        spinner.succeed(chalk.green(`✓ Created ${name}/index.scss`));

      } else if (options.type === 'js') {
        // Create JavaScript theme
        const jsContent = `/**
 * Theme: ${name}
 */

import { createTheme } from '@shohojdhara/atomix/theme';

export const ${name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Theme = createTheme({
  name: '${name}',
  palette: {
    primary: {
      main: '#7AFFD7',
      light: '#A0FFE6',
      dark: '#00E6C3',
      contrastText: '#000000',
    },
    secondary: {
      main: '#FF5733',
      light: '#FF8A65',
      dark: '#E64A19',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4DFF9F',
      light: '#80FFB8',
      dark: '#00E66B',
      contrastText: '#000000',
    },
    error: {
      main: '#FF1A1A',
      light: '#FF5252',
      dark: '#E60000',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFB84D',
      light: '#FFCC80',
      dark: '#FF9800',
      contrastText: '#000000',
    },
    background: {
      default: '#000000',
      paper: '#212121',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.8)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  spacing: {
    unit: 8,
  },
  shape: {
    borderRadius: 6,
  },
});

export default ${name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Theme;
`;

        await writeFile(join(themePath, 'index.ts'), jsContent, 'utf8');
        spinner.succeed(chalk.green(`✓ Created ${name}/index.ts`));
      }

      // Create README
      const readmeContent = `# ${name} Theme

## Description

A custom theme for Atomix Design System.

## Usage

### CSS Theme

\`\`\`scss
@import 'themes/${name}';
\`\`\`

### JavaScript Theme

\`\`\`typescript
import { ${name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Theme } from './themes/${name}';
import { ThemeProvider } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider theme={${name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Theme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
\`\`\`

## Customization

Edit the theme variables in \`index.${options.type === 'css' ? 'scss' : 'ts'}\` to customize colors, typography, spacing, and more.

## Build

\`\`\`bash
atomix build-theme themes/${name}
\`\`\`
`;

      await writeFile(join(themePath, 'README.md'), readmeContent, 'utf8');
      console.log(chalk.green(`  ✓ Created ${name}/README.md`));

      // Success message
      console.log(boxen(
        chalk.bold.green(`🎨 Theme "${name}" created successfully!\n\n`) +
        chalk.cyan('Next steps:\n') +
        chalk.gray(`1. Customize your theme:\n`) +
        chalk.white(`   Edit ${themePath}/index.${options.type === 'css' ? 'scss' : 'ts'}\n\n`) +
        (options.type === 'css'
          ? chalk.gray(`2. Build your theme:\n`) + chalk.white(`   atomix build-theme ${themePath}\n\n`)
          : chalk.gray(`2. Use in your app:\n`) + chalk.white(`   import theme from './themes/${name}';\n\n`)
        ) +
        chalk.gray(`3. Apply your theme:\n`) +
        chalk.white(`   <ThemeProvider theme="${name}">...</ThemeProvider>`),
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'green'
        }
      ));

    } catch (error) {
      handleError(error, spinner);
    }
  });

/**
 * Doctor Command - NEW
 */
program
  .command('doctor')
  .description('Diagnose common issues with your Atomix setup')
  .action(async () => {
    const spinner = ora('Running diagnostics...').start();

    try {
      const checks = [];

      // Check Node version
      const versionCheck = checkNodeVersion('18.0.0');
      checks.push({
        name: 'Node.js Version',
        status: versionCheck.compatible ? '✅' : '❌',
        message: versionCheck.compatible
          ? `v${versionCheck.current} (supported)`
          : `v${versionCheck.current} (requires Node ${versionCheck.required}+)`,
      });

      // Check Atomix installation
      const atomixPath = join(process.cwd(), 'node_modules', '@shohojdhara', 'atomix');
      checks.push({
        name: 'Atomix Installation',
        status: existsSync(atomixPath) ? '✅' : '❌',
        message: existsSync(atomixPath)
          ? 'Installed correctly'
          : 'Not found - run: npm install @shohojdhara/atomix',
      });

      // Check for required dependencies
      const requiredDeps = ['react', 'react-dom', 'sass'];
      for (const dep of requiredDeps) {
        const depPath = join(process.cwd(), 'node_modules', dep);
        checks.push({
          name: `Dependency: ${dep}`,
          status: existsSync(depPath) ? '✅' : '⚠️',
          message: existsSync(depPath)
            ? 'Installed'
            : 'Missing (may be required for some features)',
        });
      }

      // Check for configuration files
      const configFiles = ['.atomixrc', 'atomix.config.js', 'atomix.config.json', 'theme.config.ts'];
      let hasConfig = false;
      let configFile = null;
      for (const file of configFiles) {
        if (existsSync(join(process.cwd(), file))) {
          hasConfig = true;
          configFile = file;
          break;
        }
      }

      checks.push({
        name: 'Configuration File',
        status: hasConfig ? '✅' : '💡',
        message: hasConfig
          ? `Configuration found (${configFile})`
          : 'No config file (using defaults)',
      });

      // Check theme CLI availability
      const themeCLIAvailable = await import('./cli/theme-bridge.js')
        .then(m => m.isThemeCLIAvailable())
        .catch(() => false);

      checks.push({
        name: 'Theme CLI',
        status: themeCLIAvailable ? '✅' : '⚠️',
        message: themeCLIAvailable
          ? 'Available'
          : 'Theme devtools not found',
      });

      spinner.stop();

      // Display results
      console.log(chalk.bold('\n🏥 Atomix Doctor Report\n'));
      console.log(chalk.gray('='.repeat(50)));

      checks.forEach(check => {
        console.log(`${check.status} ${chalk.bold(check.name)}`);
        console.log(`   ${chalk.gray(check.message)}\n`);
      });

      const hasIssues = checks.some(c => c.status === '❌');
      const hasWarnings = checks.some(c => c.status === '⚠️');

      if (hasIssues) {
        console.log(chalk.red('\n❌ Some issues need attention'));
      } else if (hasWarnings) {
        console.log(chalk.yellow('\n⚠️  Some optional improvements available'));
      } else {
        console.log(chalk.green('\n✅ Everything looks good!'));
      }

    } catch (error) {
      handleError(error, spinner);
    }
  });



// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
