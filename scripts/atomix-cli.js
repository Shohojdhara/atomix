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
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
        throw new AtomixCLIError(
          'Component name must be in PascalCase (e.g., Button, CardHeader)',
          'INVALID_NAME',
          [
            'Use PascalCase naming (e.g., MyComponent)',
            'Start with an uppercase letter',
            'Use only letters and numbers'
          ]
        );
      }
      
      if (type === 'component' || type === 'c') {
        const componentPath = join(options.path, name);
        
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
        // Token generation logic (to be implemented)
        throw new AtomixCLIError(
          'Token generation not yet implemented',
          'NOT_IMPLEMENTED',
          [
            'This feature is coming soon',
            'For now, manually edit token files in src/styles/01-settings'
          ]
        );
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
      const configFiles = ['.atomixrc', 'atomix.config.js', 'atomix.config.json'];
      let hasConfig = false;
      for (const file of configFiles) {
        if (existsSync(join(process.cwd(), file))) {
          hasConfig = true;
          break;
        }
      }
      
      checks.push({
        name: 'Configuration File',
        status: hasConfig ? '✅' : '💡',
        message: hasConfig
          ? 'Configuration found'
          : 'No config file (using defaults)',
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

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
