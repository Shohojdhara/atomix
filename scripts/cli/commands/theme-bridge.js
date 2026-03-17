/**
 * Atomix CLI Theme Bridge Command
 * Syncs design tokens with theme providers (Tailwind, CSS-in-JS, CSS Variables)
 */

import { join } from 'path';
import chalk from 'chalk';
import { Command } from 'commander';
import { 
  createThemePackage,
  syncToTailwind,
  syncToCssInJs,
  syncToCssVariables,
  validateThemeSync,
  THEME_PROVIDERS
} from '../internal/theme-bridge.js';
import { filesystem } from '../internal/filesystem.js';
import { AtomixCLIError } from '../utils/error.js';
import { detectFramework } from '../utils/detector.js';

export const SYNC_PROVIDERS = {
  TAILWIND: 'tailwind',
  EMOTION: 'emotion',
  STYLED_COMPONENTS: 'styled-components',
  VANILLA_EXTRACT: 'vanilla-extract',
  CSS_VARIABLES: 'css-variables'
};

/**
 * Execute theme bridge synchronization (exported for CLI integration)
 * @param {string} source - Source tokens file path
 * @param {Object} options - Command options
 */
export async function themeBridgeAction(source = './design-tokens/tokens.json', options = {}) {
  await executeThemeBridge(source, options);
}

/**
 * Creates the theme-bridge command
 * @param {Command} program - Commander program instance
 */
export function createThemeBridgeCommand(program) {
  const cmd = program
    .command('theme-bridge')
    .description('Sync design tokens with theme providers')
    .argument('[source]', 'Path to design tokens file', './design-tokens/tokens.json')
    .option('-o, --output <dir>', 'Output directory for theme files', './src/theme')
    .option('-f, --format <format>', 'Theme format (tailwind, emotion, styled-components, vanilla-extract, css-variables, all)', 'all')
    .option('--prefix <prefix>', 'CSS variable prefix', 'atomix')
    .option('--selector <selector>', 'CSS selector for variables', ':root')
    .option('--no-typescript', 'Skip TypeScript type generation')
    .option('--validate', 'Validate generated theme files')
    .option('--dry-run', 'Show what would be generated without writing files')
    .action(async (source, options) => {
      try {
        await executeThemeBridge(source, options);
      } catch (error) {
        if (error instanceof AtomixCLIError) {
          console.error(chalk.red('\nTheme bridge failed:'));
          console.error(chalk.yellow(error.message));
          if (error.suggestions?.length) {
            console.error(chalk.dim('\nSuggestions:'));
            error.suggestions.forEach(s => console.error(`  - ${s}`));
          }
          process.exit(1);
        }
        throw error;
      }
    });

  return cmd;
}

/**
 * Execute theme bridge synchronization
 * @param {string} source - Source tokens file path
 * @param {Object} options - Command options
 */
async function executeThemeBridge(source, options) {
  const { output, format, prefix, selector, typescript, validate, dryRun } = options;
  
  // Set dry run mode
  if (dryRun) {
    process.env.ATOMIX_DRY_RUN = 'true';
  }

  console.log(chalk.cyan('\n🎨 Atomix Theme Bridge\n'));
  
  // Resolve paths
  const tokenPath = join(process.cwd(), source);
  const outputDir = join(process.cwd(), output);
  
  // Check if source file exists
  const exists = await filesystem.exists(tokenPath);
  if (!exists) {
    throw new AtomixCLIError(
      `Design tokens file not found: ${tokenPath}`,
      'TOKEN_FILE_NOT_FOUND',
      [
        'Run `atomix init` to create design tokens',
        'Check the source path is correct',
        'Ensure tokens file has been created'
      ]
    );
  }

  console.log(chalk.bold('Source:'), tokenPath);
  console.log(chalk.bold('Output:'), outputDir);
  console.log(chalk.bold('Format:'), format);
  console.log();

  // Generate theme package or single format
  let result;
  
  if (format === 'all' || !format) {
    result = await createThemePackage(tokenPath, outputDir, {
      prefix,
      selector,
      typescript: typescript !== false
    });
  } else if (format === 'tailwind') {
    const outputPath = join(outputDir, 'tailwind.theme.js');
    result = await syncToTailwind(tokenPath, outputPath);
  } else if (['emotion', 'styled-components'].includes(format)) {
    const outputPath = join(outputDir, 'theme.ts');
    result = await syncToCssInJs(tokenPath, outputPath, format);
  } else if (format === 'vanilla-extract') {
    const outputPath = join(outputDir, 'theme.ts');
    result = await syncToCssInJs(tokenPath, outputPath, 'vanilla-extract');
  } else if (format === 'css-variables') {
    const outputPath = join(outputDir, 'variables.css');
    result = await syncToCssVariables(tokenPath, outputPath, { prefix, selector });
  } else {
    throw new AtomixCLIError(
      `Unknown format: ${format}`,
      'UNKNOWN_FORMAT',
      ['Use: tailwind, emotion, styled-components, vanilla-extract, css-variables, or all']
    );
  }

  // Display results
  if (dryRun) {
    console.log(chalk.yellow('\n[DRY RUN] Files that would be created:'));
    result.created.forEach(file => console.log(`  ${file}`));
  } else {
    console.log(chalk.green('\n✓ Theme synchronization complete!\n'));
    console.log(chalk.bold('Created files:'));
    result.created.forEach(file => console.log(`  ${chalk.cyan(file)}`));
    
    if (result.formats) {
      console.log(chalk.bold('\nFormats generated:'));
      result.formats.forEach(f => console.log(`  ${chalk.cyan(f)}`));
    }
    
    console.log(chalk.bold('\nTokens synced:'), result.tokensSynced);
  }

  // Validate if requested
  if (validate && !dryRun) {
    console.log(chalk.cyan('\n🔍 Validating theme files...\n'));
    
    for (const file of result.created) {
      const provider = detectProviderFromFile(file);
      const validation = await validateThemeSync(tokenPath, file, provider);
      
      if (validation.valid) {
        console.log(chalk.green(`  ✓ ${file}`));
      } else {
        console.log(chalk.yellow(`  ⚠ ${file}`));
        validation.issues.forEach(issue => {
          const icon = issue.severity === 'error' ? '✗' : '⚠';
          console.log(chalk.dim(`    ${icon} ${issue.message}`));
        });
      }
    }
    
    console.log();
  }

  // Show usage instructions
  showUsageInstructions(format, outputDir);
}

/**
 * Detect theme provider from file path/extension
 * @param {string} filePath - Path to theme file
 * @returns {string} Provider type
 */
function detectProviderFromFile(filePath) {
  if (filePath.includes('tailwind')) return 'tailwind';
  if (filePath.endsWith('.css')) return 'css-variables';
  if (filePath.includes('vanilla-extract')) return 'vanilla-extract';
  if (filePath.includes('emotion')) return 'emotion';
  if (filePath.includes('styled-components')) return 'styled-components';
  return 'css-in-js';
}

/**
 * Show usage instructions for different theme providers
 * @param {string} format - Generated format
 * @param {string} outputDir - Output directory
 */
function showUsageInstructions(format, outputDir) {
  console.log(chalk.bold('\n📚 Usage Instructions:\n'));

  if (format === 'all' || format === 'tailwind') {
    console.log(chalk.cyan('Tailwind CSS:'));
    console.log(chalk.dim('  // tailwind.config.js'));
    console.log(chalk.dim('  module.exports = {'));
    console.log(chalk.dim('    presets: [require(\'./src/theme/tailwind.theme\')],'));
    console.log(chalk.dim('  };'));
    console.log();
  }

  if (format === 'all' || format === 'emotion') {
    console.log(chalk.cyan('Emotion:'));
    console.log(chalk.dim('  import { ThemeProvider } from \'@emotion/react\';'));
    console.log(chalk.dim('  import { theme } from \'./src/theme/theme\';'));
    console.log(chalk.dim('  '));
    console.log(chalk.dim('  function App() {'));
    console.log(chalk.dim('    return <ThemeProvider theme={theme}>...</ThemeProvider>;'));
    console.log(chalk.dim('  }'));
    console.log();
  }

  if (format === 'all' || format === 'css-variables') {
    console.log(chalk.cyan('CSS Variables:'));
    console.log(chalk.dim('  // Import in your main CSS file'));
    console.log(chalk.dim('  @import \'./src/theme/variables.css\';'));
    console.log(chalk.dim('  '));
    console.log(chalk.dim('  // Use in components'));
    console.log(chalk.dim('  color: var(--atomix-primary);'));
    console.log(chalk.dim('  padding: var(--atomix-space-md);'));
    console.log();
  }

  if (format === 'all' || format === 'vanilla-extract') {
    console.log(chalk.cyan('Vanilla Extract:'));
    console.log(chalk.dim('  import { style } from \'@vanilla-extract/css\';'));
    console.log(chalk.dim('  import { theme } from \'./src/theme/theme.css\';'));
    console.log(chalk.dim('  '));
    console.log(chalk.dim('  const myStyle = style({'));
    console.log(chalk.dim('    color: theme.colors.primary,'));
    console.log(chalk.dim('    padding: theme.space.md'));
    console.log(chalk.dim('  });'));
    console.log();
  }
}
