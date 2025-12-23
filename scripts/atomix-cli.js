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
  isDebug as checkDebugMode
} from './cli/utils.js';

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

/**
 * Component templates for design system
 */
const componentTemplates = {
  react: {
    component: (name, options = {}) => `import React, { forwardRef, memo } from 'react';
${options.scssModule ? `import styles from './${name}.module.scss';` : ''}
${options.types ? `import type { ${name}Props } from '../../lib/types/components';` : ''}

${options.types ? '' : `export interface ${name}Props {
  /**
   * Content to be rendered
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Color variant
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error';
  
  /**
   * Disabled state
   */
  disabled?: boolean;
}`}

/**
 * ${name} component
 * 
 * @component
 * @example
 * <${name} variant="primary" size="md">
 *   Content
 * </${name}>
 */
export const ${name} = memo(
  forwardRef<HTMLDivElement, ${name}Props>(
    ({ children, className = '', size = 'md', variant = 'primary', disabled = false, ...props }, ref) => {
      ${options.scssModule ? `const componentClasses = [
        styles.${name.toLowerCase()},
        styles[\`${name.toLowerCase()}--\${size}\`],
        styles[\`${name.toLowerCase()}--\${variant}\`],
        disabled && styles['${name.toLowerCase()}--disabled'],
        className
      ].filter(Boolean).join(' ');` : `const componentClasses = \`c-${name.toLowerCase()} c-${name.toLowerCase()}--\${size} c-${name.toLowerCase()}--\${variant} \${disabled ? 'c-${name.toLowerCase()}--disabled' : ''} \${className}\`.trim();`}
      
      return (
        <div
          ref={ref}
          className={componentClasses}
          aria-disabled={disabled}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);

${name}.displayName = '${name}';

export default ${name};`,
    
    index: (name) => `export { default as ${name} } from './${name}';
export type { ${name}Props } from './${name}';`,
    
    story: (name) => `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '${name} Component',
    size: 'md',
    variant: 'primary',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    variant: 'error',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};`,
    
    test: (name) => `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders children correctly', () => {
    render(<${name}>Test Content</${name}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  it('applies size variant classes', () => {
    const { container } = render(<${name} size="lg">Content</${name}>);
    const element = container.firstChild;
    expect(element).toHaveClass('c-${name.toLowerCase()}--lg');
  });
  
  it('applies variant classes', () => {
    const { container } = render(<${name} variant="success">Content</${name}>);
    const element = container.firstChild;
    expect(element).toHaveClass('c-${name.toLowerCase()}--success');
  });
  
  it('handles disabled state', () => {
    const { container } = render(<${name} disabled>Content</${name}>);
    const element = container.firstChild;
    expect(element).toHaveAttribute('aria-disabled', 'true');
    expect(element).toHaveClass('c-${name.toLowerCase()}--disabled');
  });
  
  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<${name} ref={ref}>Content</${name}>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});`,
    
    scss: (name) => `// Component: ${name}
// =============================================================================
// Design system component following ITCSS architecture

@import '../../styles/01-settings';
@import '../../styles/02-tools';

// Block: Base component
// =============================================================================
.c-${name.toLowerCase()} {
  // Layout
  display: flex;
  align-items: center;
  justify-content: center;
  
  // Spacing
  padding: var(--atomix-space-3) var(--atomix-space-4);
  gap: var(--atomix-space-2);
  
  // Typography
  font-family: var(--atomix-font-family-base);
  font-size: var(--atomix-font-size-base);
  font-weight: var(--atomix-font-weight-normal);
  line-height: var(--atomix-line-height-base);
  
  // Appearance
  background-color: var(--atomix-color-background);
  color: var(--atomix-color-text);
  border: 1px solid var(--atomix-color-border);
  border-radius: var(--atomix-radius-md);
  
  // Interaction
  cursor: default;
  user-select: none;
  transition: all 0.2s ease-in-out;
  
  // Focus
  &:focus-visible {
    @include focus-ring;
  }
}

// Size Modifiers
// =============================================================================
.c-${name.toLowerCase()}--sm {
  padding: var(--atomix-space-2) var(--atomix-space-3);
  font-size: var(--atomix-font-size-sm);
  gap: var(--atomix-space-1);
}

.c-${name.toLowerCase()}--md {
  // Default size - explicitly defined for clarity
  padding: var(--atomix-space-3) var(--atomix-space-4);
  font-size: var(--atomix-font-size-base);
  gap: var(--atomix-space-2);
}

.c-${name.toLowerCase()}--lg {
  padding: var(--atomix-space-4) var(--atomix-space-5);
  font-size: var(--atomix-font-size-lg);
  gap: var(--atomix-space-3);
}

// Color/Variant Modifiers
// =============================================================================
.c-${name.toLowerCase()}--primary {
  background-color: var(--atomix-color-primary);
  color: var(--atomix-color-primary-text);
  border-color: var(--atomix-color-primary-dark);
  
  &:hover:not(:disabled) {
    background-color: var(--atomix-color-primary-dark);
  }
}

.c-${name.toLowerCase()}--secondary {
  background-color: var(--atomix-color-secondary);
  color: var(--atomix-color-secondary-text);
  border-color: var(--atomix-color-secondary-dark);
  
  &:hover:not(:disabled) {
    background-color: var(--atomix-color-secondary-dark);
  }
}

.c-${name.toLowerCase()}--success {
  background-color: var(--atomix-color-success);
  color: var(--atomix-color-success-text);
  border-color: var(--atomix-color-success-dark);
  
  &:hover:not(:disabled) {
    background-color: var(--atomix-color-success-dark);
  }
}

.c-${name.toLowerCase()}--error {
  background-color: var(--atomix-color-error);
  color: var(--atomix-color-error-text);
  border-color: var(--atomix-color-error-dark);
  
  &:hover:not(:disabled) {
    background-color: var(--atomix-color-error-dark);
  }
}

// State Modifiers
// =============================================================================
.c-${name.toLowerCase()}--disabled {
  @include disabled;
  cursor: not-allowed;
  
  &:hover {
    transform: none;
  }
}

// Elements (if component has child elements)
// =============================================================================
.c-${name.toLowerCase()}__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.c-${name.toLowerCase()}__content {
  flex: 1;
}

// Responsive Design
// =============================================================================
@include respond-to('tablet') {
  .c-${name.toLowerCase()} {
    // Tablet adjustments
  }
}

@include respond-to('mobile') {
  .c-${name.toLowerCase()} {
    // Mobile adjustments
    padding: var(--atomix-space-2) var(--atomix-space-3);
  }
}

// Accessibility
// =============================================================================
@media (prefers-reduced-motion: reduce) {
  .c-${name.toLowerCase()} {
    transition: none;
  }
}

@media (prefers-contrast: high) {
  .c-${name.toLowerCase()} {
    border-width: 2px;
  }
}

// Dark Mode Support
// =============================================================================
[data-theme="dark"] {
  .c-${name.toLowerCase()} {
    background-color: var(--atomix-color-background-dark);
    color: var(--atomix-color-text-dark);
    border-color: var(--atomix-color-border-dark);
  }
}`,

    scssModule: (name) => `// Component: ${name}
// =============================================================================
// Design system component using CSS Modules

@import '../../styles/01-settings';
@import '../../styles/02-tools';

// Block: Base component
// =============================================================================
.${name.toLowerCase()} {
  // Layout
  display: flex;
  align-items: center;
  justify-content: center;
  
  // Spacing
  padding: var(--atomix-space-3) var(--atomix-space-4);
  gap: var(--atomix-space-2);
  
  // Typography
  font-family: var(--atomix-font-family-base);
  font-size: var(--atomix-font-size-base);
  font-weight: var(--atomix-font-weight-normal);
  line-height: var(--atomix-line-height-base);
  
  // Appearance
  background-color: var(--atomix-color-background);
  color: var(--atomix-color-text);
  border: 1px solid var(--atomix-color-border);
  border-radius: var(--atomix-radius-md);
  
  // Interaction
  cursor: default;
  user-select: none;
  transition: all 0.2s ease-in-out;
  
  // Focus
  &:focus-visible {
    outline: 2px solid var(--atomix-color-focus);
    outline-offset: 2px;
  }
}

// Size Modifiers
// =============================================================================
.${name.toLowerCase()}--sm {
  composes: ${name.toLowerCase()};
  padding: var(--atomix-space-2) var(--atomix-space-3);
  font-size: var(--atomix-font-size-sm);
  gap: var(--atomix-space-1);
}

.${name.toLowerCase()}--md {
  composes: ${name.toLowerCase()};
}

.${name.toLowerCase()}--lg {
  composes: ${name.toLowerCase()};
  padding: var(--atomix-space-4) var(--atomix-space-5);
  font-size: var(--atomix-font-size-lg);
  gap: var(--atomix-space-3);
}

// Color/Variant Modifiers
// =============================================================================
.${name.toLowerCase()}--primary {
  background-color: var(--atomix-color-primary);
  color: var(--atomix-color-primary-text);
  border-color: var(--atomix-color-primary-dark);
  
  &:hover:not([aria-disabled="true"]) {
    background-color: var(--atomix-color-primary-dark);
  }
}

.${name.toLowerCase()}--secondary {
  background-color: var(--atomix-color-secondary);
  color: var(--atomix-color-secondary-text);
  border-color: var(--atomix-color-secondary-dark);
  
  &:hover:not([aria-disabled="true"]) {
    background-color: var(--atomix-color-secondary-dark);
  }
}

.${name.toLowerCase()}--success {
  background-color: var(--atomix-color-success);
  color: var(--atomix-color-success-text);
  border-color: var(--atomix-color-success-dark);
  
  &:hover:not([aria-disabled="true"]) {
    background-color: var(--atomix-color-success-dark);
  }
}

.${name.toLowerCase()}--error {
  background-color: var(--atomix-color-error);
  color: var(--atomix-color-error-text);
  border-color: var(--atomix-color-error-dark);
  
  &:hover:not([aria-disabled="true"]) {
    background-color: var(--atomix-color-error-dark);
  }
}

// State Modifiers
// =============================================================================
.${name.toLowerCase()}--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}`
  }
};

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
      // Resolve paths
      const indexPath = themePath.endsWith('.scss') 
        ? resolve(themePath) 
        : resolve(themePath, 'index.scss');
      
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
          await mkdir(options.output, { recursive: true });
          
          // Get theme name
          const themeName = basename(dirname(indexPath));
          
          // Write expanded CSS
          const outputPath = join(options.output, `${themeName}.css`);
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
            
            const minPath = join(options.output, `${themeName}.min.css`);
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
              const minPath = join(options.output, `${themeName}.min.css`);
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
        
        const watcher = chokidar.watch([themePath], {
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
      
      // Validate name
      const nameValidation = validateComponentName(name);
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
      
      if (type === 'component' || type === 'c') {
        // Validate output path
        const pathValidation = validatePath(options.path);
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
        
        const componentPath = join(pathValidation.safePath, name);
        
        // Check if component already exists
        if (existsSync(componentPath) && !options.force) {
          throw new AtomixCLIError(
            `Component ${name} already exists`,
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
        const componentContent = componentTemplates.react.component(name, {
          scssModule: options.scssModule,
          types: false // We'll generate inline types for now
        });
        
        await writeFile(
          join(componentPath, `${name}.tsx`),
          componentContent,
          'utf8'
        );
        spinner.succeed(chalk.green(`✓ Created ${name}.tsx`));
        
        // Generate index file
        const indexContent = componentTemplates.react.index(name);
        await writeFile(
          join(componentPath, 'index.ts'),
          indexContent,
          'utf8'
        );
        console.log(chalk.green(`  ✓ Created index.ts`));
        
        // Generate SCSS file
        const scssContent = options.scssModule 
          ? componentTemplates.react.scssModule(name)
          : componentTemplates.react.scss(name);
        
        const scssFilename = options.scssModule ? `${name}.module.scss` : `_${name.toLowerCase()}.scss`;
        await writeFile(
          join(componentPath, scssFilename),
          scssContent,
          'utf8'
        );
        console.log(chalk.green(`  ✓ Created ${scssFilename}`));
        
        // Generate Storybook story
        if (options.story) {
          const storyContent = componentTemplates.react.story(name);
          await writeFile(
            join(componentPath, `${name}.stories.tsx`),
            storyContent,
            'utf8'
          );
          console.log(chalk.green(`  ✓ Created ${name}.stories.tsx`));
        }
        
        // Generate test file
        if (options.test) {
          const testContent = componentTemplates.react.test(name);
          await writeFile(
            join(componentPath, `${name}.test.tsx`),
            testContent,
            'utf8'
          );
          console.log(chalk.green(`  ✓ Created ${name}.test.tsx`));
        }
        
        // Success message with next steps
        console.log(boxen(
          chalk.bold.green(`🎉 Component ${name} created successfully!\n\n`) +
          chalk.cyan('Next steps:\n') +
          chalk.gray(`1. Import in your app:\n`) +
          chalk.white(`   import { ${name} } from '${options.path}/${name}';\n\n`) +
          chalk.gray(`2. Add to design system exports:\n`) +
          chalk.white(`   export { ${name} } from './${name}';\n\n`) +
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
        
        if (options.fix && issues.length > 0) {
          console.log(chalk.cyan('\n🔧 Auto-fix is not yet implemented. Please fix issues manually.'));
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
      
      // Check source directory
      const sourcePath = resolve(options.source);
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
        case 'check':
          const validationResult = await validateTokens(options);
          if (validationResult.issues.length > 0) {
            process.exit(1); // Exit with error if issues found
          }
          break;
          
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
          await exportTokens(options.format, options.output);
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
          await importTokens(options.output, { dryRun: options.dryRun });
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
        throw new AtomixCLIError(
          `Theme ${name} already exists`,
          'THEME_EXISTS',
          [
            `Delete the existing theme at ${themePath}`,
            'Choose a different theme name',
            'Use --force flag to overwrite (not yet implemented)'
          ]
        );
      }
      
      // Create theme directory
      await mkdir(themePath, { recursive: true });
      
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
      const nodeVersion = process.version;
      const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
      checks.push({
        name: 'Node.js Version',
        status: majorVersion >= 16 ? '✅' : '❌',
        message: majorVersion >= 16 
          ? `${nodeVersion} (supported)`
          : `${nodeVersion} (requires Node 16+)`,
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
      console.log(chalk.gray('=' .repeat(50)));
      
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

// Token generation functions
function generateColorTokens() {
  return `// Custom Color Tokens
// Generated by Atomix CLI
// =============================================================================

// Brand Colors
// Customize these to match your brand identity
$custom-primary-1: #fff9e6 !default;
$custom-primary-2: #fff4cc !default;
$custom-primary-3: #ffe699 !default;
$custom-primary-4: #ffd966 !default;
$custom-primary-5: #ffcc33 !default;
$custom-primary-6: #ffb800 !default; // Main brand color
$custom-primary-7: #e6a600 !default;
$custom-primary-8: #cc9400 !default;
$custom-primary-9: #b38200 !default;
$custom-primary-10: #997000 !default;

// Semantic Colors
$custom-success: #22c55e !default;
$custom-warning: #eab308 !default;
$custom-error: #ef4444 !default;
$custom-info: #3b82f6 !default;

// Neutral Colors
$custom-gray-1: #f9fafb !default;
$custom-gray-2: #f3f4f6 !default;
$custom-gray-3: #e5e7eb !default;
$custom-gray-4: #d1d5db !default;
$custom-gray-5: #9ca3af !default;
$custom-gray-6: #6b7280 !default;
$custom-gray-7: #4b5563 !default;
$custom-gray-8: #374151 !default;
$custom-gray-9: #1f2937 !default;
$custom-gray-10: #111827 !default;

// Background Colors
$custom-body-bg: #ffffff !default;
$custom-body-bg-dark: #1f2937 !default;

// Text Colors
$custom-body-color: $custom-gray-10 !default;
$custom-body-color-dark: #ffffff !default;

// Link Colors
$custom-link-color: $custom-primary-6 !default;
$custom-link-hover-color: $custom-primary-7 !default;

// Border Colors
$custom-border-color: $custom-gray-3 !default;
$custom-border-color-dark: $custom-gray-7 !default;

// Focus Colors
$custom-focus-color: $custom-primary-5 !default;
$custom-focus-color-dark: $custom-primary-4 !default;

// Export custom colors to override defaults
$primary: $custom-primary-6 !default;
$success: $custom-success !default;
$warning: $custom-warning !default;
$error: $custom-error !default;
$info: $custom-info !default;

// Dark mode overrides
$body-bg-dark: $custom-body-bg-dark !default;
$body-color-dark: $custom-body-color-dark !default;
$border-color-dark: $custom-border-color-dark !default;
`;
}

function generateSpacingTokens() {
  return `// Custom Spacing Tokens
// Generated by Atomix CLI
// =============================================================================

// Base spacing unit (change this to scale all spacing)
$custom-spacing-base: 0.25rem !default; // 4px

// Spacing scale
$custom-spacing-0: 0 !default;
$custom-spacing-1: $custom-spacing-base !default; // 4px
$custom-spacing-2: calc($custom-spacing-base * 2) !default; // 8px
$custom-spacing-3: calc($custom-spacing-base * 3) !default; // 12px
$custom-spacing-4: calc($custom-spacing-base * 4) !default; // 16px
$custom-spacing-5: calc($custom-spacing-base * 5) !default; // 20px
$custom-spacing-6: calc($custom-spacing-base * 6) !default; // 24px
$custom-spacing-7: calc($custom-spacing-base * 7) !default; // 28px
$custom-spacing-8: calc($custom-spacing-base * 8) !default; // 32px
$custom-spacing-9: calc($custom-spacing-base * 9) !default; // 36px
$custom-spacing-10: calc($custom-spacing-base * 10) !default; // 40px
$custom-spacing-11: calc($custom-spacing-base * 11) !default; // 44px
$custom-spacing-12: calc($custom-spacing-base * 12) !default; // 48px
$custom-spacing-14: calc($custom-spacing-base * 14) !default; // 56px
$custom-spacing-16: calc($custom-spacing-base * 16) !default; // 64px
$custom-spacing-20: calc($custom-spacing-base * 20) !default; // 80px
$custom-spacing-24: calc($custom-spacing-base * 24) !default; // 96px
$custom-spacing-28: calc($custom-spacing-base * 28) !default; // 112px
$custom-spacing-32: calc($custom-spacing-base * 32) !default; // 128px
$custom-spacing-36: calc($custom-spacing-base * 36) !default; // 144px
$custom-spacing-40: calc($custom-spacing-base * 40) !default; // 160px
$custom-spacing-44: calc($custom-spacing-base * 44) !default; // 176px
$custom-spacing-48: calc($custom-spacing-base * 48) !default; // 192px
$custom-spacing-52: calc($custom-spacing-base * 52) !default; // 208px
$custom-spacing-56: calc($custom-spacing-base * 56) !default; // 224px
$custom-spacing-60: calc($custom-spacing-base * 60) !default; // 240px
$custom-spacing-64: calc($custom-spacing-base * 64) !default; // 256px

// Component-specific spacing
$custom-button-padding-x: $custom-spacing-4 !default;
$custom-button-padding-y: $custom-spacing-2 !default;
$custom-card-padding: $custom-spacing-6 !default;
$custom-modal-padding: $custom-spacing-8 !default;

// Layout spacing
$custom-container-padding: $custom-spacing-4 !default;
$custom-grid-gap: $custom-spacing-6 !default;
$custom-section-spacing: $custom-spacing-16 !default;

// Export to override defaults
$spacing-sizes: (
  0: $custom-spacing-0,
  1: $custom-spacing-1,
  2: $custom-spacing-2,
  3: $custom-spacing-3,
  4: $custom-spacing-4,
  5: $custom-spacing-5,
  6: $custom-spacing-6,
  7: $custom-spacing-7,
  8: $custom-spacing-8,
  9: $custom-spacing-9,
  10: $custom-spacing-10,
  12: $custom-spacing-12,
  16: $custom-spacing-16,
  20: $custom-spacing-20,
  24: $custom-spacing-24,
  32: $custom-spacing-32,
  40: $custom-spacing-40,
  48: $custom-spacing-48,
  56: $custom-spacing-56,
  64: $custom-spacing-64,
) !default;
`;
}

function generateTypographyTokens() {
  return `// Custom Typography Tokens
// Generated by Atomix CLI
// =============================================================================

// Font Families
$custom-font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !default;
$custom-font-family-serif: Georgia, "Times New Roman", Times, serif !default;
$custom-font-family-mono: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !default;

// Font Size Scale
$custom-font-size-xs: 0.75rem !default; // 12px
$custom-font-size-sm: 0.875rem !default; // 14px
$custom-font-size-base: 1rem !default; // 16px
$custom-font-size-lg: 1.125rem !default; // 18px
$custom-font-size-xl: 1.25rem !default; // 20px
$custom-font-size-2xl: 1.5rem !default; // 24px
$custom-font-size-3xl: 1.875rem !default; // 30px
$custom-font-size-4xl: 2.25rem !default; // 36px
$custom-font-size-5xl: 3rem !default; // 48px
$custom-font-size-6xl: 3.75rem !default; // 60px
$custom-font-size-7xl: 4.5rem !default; // 72px
$custom-font-size-8xl: 6rem !default; // 96px

// Line Heights
$custom-line-height-tight: 1.2 !default;
$custom-line-height-base: 1.5 !default;
$custom-line-height-relaxed: 1.75 !default;
$custom-line-height-loose: 2 !default;

// Font Weights
$custom-font-weight-light: 300 !default;
$custom-font-weight-normal: 400 !default;
$custom-font-weight-medium: 500 !default;
$custom-font-weight-semibold: 600 !default;
$custom-font-weight-bold: 700 !default;
$custom-font-weight-heavy: 800 !default;
$custom-font-weight-black: 900 !default;

// Letter Spacing
$custom-letter-spacing-tight: -0.05em !default;
$custom-letter-spacing-normal: 0 !default;
$custom-letter-spacing-wide: 0.025em !default;
$custom-letter-spacing-wider: 0.05em !default;
$custom-letter-spacing-widest: 0.1em !default;

// Heading Sizes
$custom-h1-font-size: $custom-font-size-5xl !default;
$custom-h2-font-size: $custom-font-size-4xl !default;
$custom-h3-font-size: $custom-font-size-3xl !default;
$custom-h4-font-size: $custom-font-size-2xl !default;
$custom-h5-font-size: $custom-font-size-xl !default;
$custom-h6-font-size: $custom-font-size-lg !default;

// Export to override defaults
$font-family-base: $custom-font-family-sans !default;
$font-family-monospace: $custom-font-family-mono !default;
$font-size-base: $custom-font-size-base !default;
$font-size-sm: $custom-font-size-sm !default;
$font-size-lg: $custom-font-size-lg !default;
$line-height-base: $custom-line-height-base !default;
$font-weight-base: $custom-font-weight-normal !default;

// Heading overrides
$h1-font-size: $custom-h1-font-size !default;
$h2-font-size: $custom-h2-font-size !default;
$h3-font-size: $custom-h3-font-size !default;
$h4-font-size: $custom-h4-font-size !default;
$h5-font-size: $custom-h5-font-size !default;
$h6-font-size: $custom-h6-font-size !default;
`;
}

function generateShadowTokens() {
  return `// Custom Box Shadow Tokens
// Generated by Atomix CLI
// =============================================================================

// Shadow Colors
$custom-shadow-color: rgba(0, 0, 0, 0.1) !default;
$custom-shadow-color-dark: rgba(0, 0, 0, 0.2) !default;

// Shadow Sizes
$custom-shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !default;
$custom-shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !default;
$custom-shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !default;
$custom-shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !default;
$custom-shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !default;
$custom-shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !default;
$custom-shadow-2xl: 0 35px 60px -15px rgba(0, 0, 0, 0.3) !default;
$custom-shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06) !default;
$custom-shadow-none: none !default;

// Component-specific shadows
$custom-button-shadow: $custom-shadow-sm !default;
$custom-button-shadow-hover: $custom-shadow-md !default;
$custom-card-shadow: $custom-shadow-base !default;
$custom-dropdown-shadow: $custom-shadow-lg !default;
$custom-modal-shadow: $custom-shadow-xl !default;
$custom-popover-shadow: $custom-shadow-lg !default;
$custom-tooltip-shadow: $custom-shadow-md !default;

// Dark mode shadows
$custom-shadow-xs-dark: 0 1px 2px 0 rgba(0, 0, 0, 0.3) !default;
$custom-shadow-sm-dark: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3) !default;
$custom-shadow-base-dark: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3) !default;
$custom-shadow-lg-dark: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4) !default;
$custom-shadow-xl-dark: 0 25px 50px -12px rgba(0, 0, 0, 0.6) !default;

// Export to override defaults
$box-shadow: $custom-shadow-base !default;
$box-shadow-xs: $custom-shadow-xs !default;
$box-shadow-sm: $custom-shadow-sm !default;
$box-shadow-lg: $custom-shadow-lg !default;
$box-shadow-xl: $custom-shadow-xl !default;
$box-shadow-inset: $custom-shadow-inner !default;

// Dark mode exports
$box-shadow-dark: $custom-shadow-base-dark !default;
$box-shadow-xs-dark: $custom-shadow-xs-dark !default;
$box-shadow-sm-dark: $custom-shadow-sm-dark !default;
$box-shadow-lg-dark: $custom-shadow-lg-dark !default;
$box-shadow-xl-dark: $custom-shadow-xl-dark !default;
`;
}

function generateRadiusTokens() {
  return `// Custom Border Radius Tokens
// Generated by Atomix CLI
// =============================================================================

// Base radius unit
$custom-radius-base: 0.25rem !default; // 4px

// Radius Scale
$custom-radius-none: 0 !default;
$custom-radius-sm: calc($custom-radius-base * 0.5) !default; // 2px
$custom-radius-base: $custom-radius-base !default; // 4px
$custom-radius-md: calc($custom-radius-base * 1.5) !default; // 6px
$custom-radius-lg: calc($custom-radius-base * 2) !default; // 8px
$custom-radius-xl: calc($custom-radius-base * 3) !default; // 12px
$custom-radius-2xl: calc($custom-radius-base * 4) !default; // 16px
$custom-radius-3xl: calc($custom-radius-base * 6) !default; // 24px
$custom-radius-4xl: calc($custom-radius-base * 8) !default; // 32px
$custom-radius-full: 9999px !default; // Fully rounded

// Component-specific radius
$custom-button-radius: $custom-radius-md !default;
$custom-button-radius-sm: $custom-radius-sm !default;
$custom-button-radius-lg: $custom-radius-lg !default;
$custom-card-radius: $custom-radius-lg !default;
$custom-input-radius: $custom-radius-md !default;
$custom-badge-radius: $custom-radius-full !default;
$custom-chip-radius: $custom-radius-full !default;
$custom-tooltip-radius: $custom-radius-md !default;
$custom-modal-radius: $custom-radius-xl !default;
$custom-dropdown-radius: $custom-radius-lg !default;

// Export to override defaults
$border-radius: $custom-radius-md !default;
$border-radius-sm: $custom-radius-sm !default;
$border-radius-lg: $custom-radius-lg !default;
$border-radius-xl: $custom-radius-xl !default;
$border-radius-xxl: $custom-radius-2xl !default;
$border-radius-3xl: $custom-radius-3xl !default;
$border-radius-4xl: $custom-radius-4xl !default;
$border-radius-pill: $custom-radius-full !default;

// Component radius exports
$btn-border-radius: $custom-button-radius !default;
$btn-border-radius-sm: $custom-button-radius-sm !default;
$btn-border-radius-lg: $custom-button-radius-lg !default;
$card-border-radius: $custom-card-radius !default;
$input-border-radius: $custom-input-radius !default;
$badge-border-radius: $custom-badge-radius !default;
`;
}

function generateAnimationTokens() {
  return `// Custom Animation Tokens
// Generated by Atomix CLI
// =============================================================================

// Transition Durations
$custom-duration-instant: 0s !default;
$custom-duration-fast: 0.15s !default;
$custom-duration-base: 0.3s !default;
$custom-duration-slow: 0.5s !default;
$custom-duration-slower: 0.7s !default;
$custom-duration-slowest: 1s !default;

// Easing Functions
$custom-ease-linear: linear !default;
$custom-ease-in: cubic-bezier(0.4, 0, 1, 1) !default;
$custom-ease-out: cubic-bezier(0, 0, 0.2, 1) !default;
$custom-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1) !default;
$custom-ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55) !default;
$custom-ease-smooth: cubic-bezier(0.23, 1, 0.32, 1) !default;

// Transition Properties
$custom-transition-all: all $custom-duration-base $custom-ease-smooth !default;
$custom-transition-colors: background-color $custom-duration-base $custom-ease-smooth, 
                          border-color $custom-duration-base $custom-ease-smooth, 
                          color $custom-duration-base $custom-ease-smooth, 
                          fill $custom-duration-base $custom-ease-smooth, 
                          stroke $custom-duration-base $custom-ease-smooth !default;
$custom-transition-opacity: opacity $custom-duration-base $custom-ease-smooth !default;
$custom-transition-shadow: box-shadow $custom-duration-base $custom-ease-smooth !default;
$custom-transition-transform: transform $custom-duration-base $custom-ease-smooth !default;

// Component-specific transitions
$custom-button-transition: $custom-transition-colors, $custom-transition-shadow, $custom-transition-transform !default;
$custom-link-transition: $custom-transition-colors, text-decoration-color $custom-duration-base $custom-ease-smooth !default;
$custom-input-transition: $custom-transition-colors, $custom-transition-shadow !default;
$custom-card-transition: $custom-transition-shadow, $custom-transition-transform !default;
$custom-modal-transition: $custom-transition-opacity, $custom-transition-transform !default;
$custom-dropdown-transition: $custom-transition-opacity, $custom-transition-transform !default;

// Animation Keyframes (examples)
@keyframes custom-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes custom-slide-in-up {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes custom-scale-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes custom-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Export to override defaults
$transition-fast: $custom-transition-all !default;
$transition-base: $custom-transition-all !default;
$transition-slow: all $custom-duration-slow $custom-ease-smooth !default;

// Duration exports
$transition-duration-fast: $custom-duration-fast !default;
$transition-duration-base: $custom-duration-base !default;
$transition-duration-slow: $custom-duration-slow !default;

// Easing exports
$easing-base: $custom-ease-smooth !default;
$easing-ease-in-out: $custom-ease-in-out !default;
$easing-ease-out: $custom-ease-out !default;
$easing-ease-in: $custom-ease-in !default;
`;
}

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
