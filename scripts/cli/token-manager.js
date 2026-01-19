/**
 * Design Token Manager for Atomix Design System
 */

import { readFile, writeFile, readdir } from 'fs/promises';
import { join, basename } from 'path';
import { existsSync } from 'fs';
import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';

/**
 * Token categories in the design system
 */
const tokenCategories = {
  colors: {
    path: 'src/styles/01-settings/_settings.colors.scss',
    prefix: '--atomix-color',
    description: 'Color palette tokens'
  },
  typography: {
    path: 'src/styles/01-settings/_settings.typography.scss',
    prefix: '--atomix-font',
    description: 'Typography scale tokens'
  },
  spacing: {
    path: 'src/styles/01-settings/_settings.spacing.scss',
    prefix: '--atomix-space',
    description: 'Spacing scale tokens'
  },
  radius: {
    path: 'src/styles/01-settings/_settings.radius.scss',
    prefix: '--atomix-radius',
    description: 'Border radius tokens'
  },
  shadows: {
    path: 'src/styles/01-settings/_settings.shadows.scss',
    prefix: '--atomix-shadow',
    description: 'Box shadow tokens'
  },
  breakpoints: {
    path: 'src/styles/01-settings/_settings.breakpoints.scss',
    prefix: '--atomix-breakpoint',
    description: 'Responsive breakpoint tokens'
  }
};

/**
 * Extract tokens from SCSS file
 */
async function extractTokensFromFile(filePath) {
  if (!existsSync(filePath)) {
    return null;
  }

  const content = await readFile(filePath, 'utf8');
  const tokens = {};

  // Extract SCSS variables
  const scssVarPattern = /\$([a-z-]+):\s*([^;!]+)(?:\s*!default)?;/gi;
  let match;
  while ((match = scssVarPattern.exec(content)) !== null) {
    tokens[`$${match[1]}`] = {
      type: 'scss',
      name: match[1],
      value: match[2].trim(),
      line: content.substring(0, match.index).split('\n').length
    };
  }

  // Extract CSS custom properties
  const cssVarPattern = /--(atomix-[a-z-]+):\s*([^;]+);/gi;
  while ((match = cssVarPattern.exec(content)) !== null) {
    tokens[`--${match[1]}`] = {
      type: 'css',
      name: match[1],
      value: match[2].trim(),
      line: content.substring(0, match.index).split('\n').length
    };
  }

  return tokens;
}

/**
 * List all design tokens
 */
export async function listTokens(category = null) {
  const spinner = ora('Loading design tokens...').start();

  try {
    const results = {};

    // Get tokens from specified category or all categories
    const categories = category
      ? [category]
      : Object.keys(tokenCategories);

    for (const cat of categories) {
      if (!tokenCategories[cat]) {
        spinner.warn(chalk.yellow(`Unknown category: ${cat}`));
        continue;
      }

      const { path, description } = tokenCategories[cat];
      const fullPath = join(process.cwd(), path);
      const tokens = await extractTokensFromFile(fullPath);

      if (tokens) {
        results[cat] = {
          description,
          path: path,
          tokens: tokens,
          count: Object.keys(tokens).length
        };
      }
    }

    spinner.stop();

    // Display results
    if (Object.keys(results).length === 0) {
      console.log(chalk.yellow('\n⚠️  No design tokens found'));
      console.log(chalk.gray('Make sure you are in an Atomix project directory'));
      return;
    }

    console.log(chalk.bold.cyan('\n📐 Design Tokens\n'));

    for (const [category, data] of Object.entries(results)) {
      console.log(boxen(
        chalk.bold(category.toUpperCase()) + '\n' +
        chalk.gray(data.description) + '\n\n' +
        chalk.cyan(`Tokens: ${data.count}\n`) +
        chalk.gray(`File: ${data.path}`),
        {
          padding: 1,
          margin: { top: 0, bottom: 1, left: 0, right: 0 },
          borderStyle: 'round',
          borderColor: 'gray'
        }
      ));

      // Show first 5 tokens as examples
      const tokenEntries = Object.entries(data.tokens).slice(0, 5);
      tokenEntries.forEach(([name, info]) => {
        const value = info.value.length > 30
          ? info.value.substring(0, 30) + '...'
          : info.value;
        console.log(`  ${chalk.green(name)}: ${chalk.white(value)}`);
      });

      if (Object.keys(data.tokens).length > 5) {
        console.log(chalk.gray(`  ... and ${Object.keys(data.tokens).length - 5} more\n`));
      } else {
        console.log();
      }
    }

    return results;

  } catch (error) {
    spinner.fail(chalk.red('Failed to load tokens'));
    throw error;
  }
}

/**
 * Validate design tokens
 */
export async function validateTokens(options = {}) {
  const spinner = ora('Validating design tokens...').start();

  try {
    const issues = [];
    const warnings = [];
    let totalTokens = 0;

    for (const [category, config] of Object.entries(tokenCategories)) {
      const fullPath = join(process.cwd(), config.path);

      if (!existsSync(fullPath)) {
        issues.push({
          category,
          issue: 'Token file missing',
          file: config.path,
          fix: `Create file: ${config.path}`
        });
        continue;
      }

      const tokens = await extractTokensFromFile(fullPath);
      if (tokens) {
        totalTokens += Object.keys(tokens).length;

        // Check for hardcoded values
        const content = await readFile(fullPath, 'utf8');

        // Check for hardcoded colors
        if (category === 'colors') {
          const hardcodedColors = content.match(/#[0-9a-fA-F]{3,8}(?![0-9a-fA-F])/g);
          if (hardcodedColors) {
            const uniqueColors = [...new Set(hardcodedColors)];
            warnings.push({
              category,
              issue: `Found ${uniqueColors.length} hardcoded color values`,
              values: uniqueColors.slice(0, 3),
              fix: 'Use color tokens or CSS custom properties'
            });
          }
        }

        // Check for hardcoded pixel values
        if (category === 'spacing' || category === 'typography') {
          const hardcodedPixels = content.match(/\d+px/g);
          if (hardcodedPixels) {
            const uniquePixels = [...new Set(hardcodedPixels)];
            warnings.push({
              category,
              issue: `Found ${uniquePixels.length} hardcoded pixel values`,
              values: uniquePixels.slice(0, 3),
              fix: 'Use spacing tokens or rem units'
            });
          }
        }

        // Check for missing !default flags
        const scssVars = content.match(/\$[a-z-]+:\s*[^;]+;/gi);
        const defaultFlags = content.match(/!default/g);
        if (scssVars && (!defaultFlags || defaultFlags.length < scssVars.length)) {
          warnings.push({
            category,
            issue: 'Some SCSS variables missing !default flag',
            fix: 'Add !default to allow theme overrides'
          });
        }

        // Check naming conventions
        for (const [name, info] of Object.entries(tokens)) {
          if (info.type === 'css' && !name.startsWith(config.prefix)) {
            warnings.push({
              category,
              issue: `Token "${name}" doesn't follow naming convention`,
              fix: `Should start with "${config.prefix}"`
            });
          }
        }
      }
    }

    spinner.stop();

    // Display validation results
    console.log(chalk.bold.cyan('\n🔍 Token Validation Report\n'));

    if (issues.length === 0 && warnings.length === 0) {
      console.log(boxen(
        chalk.bold.green('✅ All tokens valid!\n\n') +
        chalk.gray(`Total tokens: ${totalTokens}\n`) +
        chalk.gray('All naming conventions followed\n') +
        chalk.gray('No hardcoded values found'),
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'green'
        }
      ));
    } else {
      if (issues.length > 0) {
        console.log(chalk.bold.red(`❌ Issues (${issues.length}):\n`));
        issues.forEach((issue, i) => {
          console.log(chalk.red(`  ${i + 1}. [${issue.category}] ${issue.issue}`));
          console.log(chalk.gray(`     File: ${issue.file}`));
          console.log(chalk.yellow(`     Fix: ${issue.fix}\n`));
        });
      }

      if (warnings.length > 0) {
        console.log(chalk.bold.yellow(`⚠️  Warnings (${warnings.length}):\n`));
        warnings.forEach((warning, i) => {
          console.log(chalk.yellow(`  ${i + 1}. [${warning.category}] ${warning.issue}`));
          if (warning.values) {
            console.log(chalk.gray(`     Examples: ${warning.values.join(', ')}`));
          }
          console.log(chalk.cyan(`     Fix: ${warning.fix}\n`));
        });
      }

      console.log(chalk.gray('─'.repeat(50)));
      console.log(chalk.cyan('\n💡 Run with --fix to attempt automatic fixes'));
    }

    return { issues, warnings, totalTokens };

  } catch (error) {
    spinner.fail(chalk.red('Validation failed'));
    throw error;
  }
}

/**
 * Export tokens to different formats
 */
export async function exportTokens(format = 'json', outputPath = null) {
  const spinner = ora(`Exporting tokens as ${format.toUpperCase()}...`).start();

  try {
    const allTokens = {};

    // Collect all tokens
    for (const [category, config] of Object.entries(tokenCategories)) {
      const fullPath = join(process.cwd(), config.path);
      const tokens = await extractTokensFromFile(fullPath);

      if (tokens) {
        allTokens[category] = {};
        for (const [name, info] of Object.entries(tokens)) {
          allTokens[category][name] = info.value;
        }
      }
    }

    let output;
    let filename;

    switch (format.toLowerCase()) {
      case 'json':
        output = JSON.stringify(allTokens, null, 2);
        filename = 'atomix-tokens.json';
        break;

      case 'css':
        output = ':root {\n';
        for (const [category, tokens] of Object.entries(allTokens)) {
          output += `  /* ${category} */\n`;
          for (const [name, value] of Object.entries(tokens)) {
            if (name.startsWith('--')) {
              output += `  ${name}: ${value};\n`;
            }
          }
        }
        output += '}';
        filename = 'atomix-tokens.css';
        break;

      case 'scss':
        output = '// Atomix Design Tokens\n\n';
        for (const [category, tokens] of Object.entries(allTokens)) {
          output += `// ${category}\n`;
          for (const [name, value] of Object.entries(tokens)) {
            if (name.startsWith('$')) {
              output += `${name}: ${value} !default;\n`;
            }
          }
          output += '\n';
        }
        filename = 'atomix-tokens.scss';
        break;

      case 'js':
      case 'javascript':
        output = '// Atomix Design Tokens\n';
        output += 'export const tokens = ';
        output += JSON.stringify(allTokens, null, 2);
        output += ';\n\nexport default tokens;';
        filename = 'atomix-tokens.js';
        break;

      case 'ts':
      case 'typescript':
        output = '// Atomix Design Tokens\n\n';
        output += 'export interface AtomixTokens {\n';
        for (const category of Object.keys(allTokens)) {
          output += `  ${category}: Record<string, string>;\n`;
        }
        output += '}\n\n';
        output += 'export const tokens: AtomixTokens = ';
        output += JSON.stringify(allTokens, null, 2);
        output += ';\n\nexport default tokens;';
        filename = 'atomix-tokens.ts';
        break;

      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    // Write to file
    const finalPath = outputPath || filename;
    await writeFile(finalPath, output, 'utf8');

    spinner.succeed(chalk.green(`✓ Exported tokens to ${finalPath}`));

    // Show summary
    const categoryCount = Object.keys(allTokens).length;
    const tokenCount = Object.values(allTokens).reduce(
      (sum, cat) => sum + Object.keys(cat).length,
      0
    );

    console.log(chalk.gray(`\n  Categories: ${categoryCount}`));
    console.log(chalk.gray(`  Total tokens: ${tokenCount}`));
    console.log(chalk.gray(`  Format: ${format.toUpperCase()}`));

    return { path: finalPath, tokens: allTokens };

  } catch (error) {
    spinner.fail(chalk.red('Export failed'));
    throw error;
  }
}

/**
 * Import tokens from file
 */
export async function importTokens(filePath, options = {}) {
  const spinner = ora('Importing design tokens...').start();

  try {
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const content = await readFile(filePath, 'utf8');
    const extension = filePath.split('.').pop().toLowerCase();

    let tokens;

    // Parse tokens based on file type
    switch (extension) {
      case 'json':
        tokens = JSON.parse(content);
        break;

      case 'js':
      case 'ts':
        // Parse tokens safely without eval
        try {
          // Try to parse as JSON first (common case)
          const jsonMatch = content.match(/export\s+(?:const|default)\s+\w*\s*=\s*({[\s\S]*})/);
          if (jsonMatch) {
            // Extract the object literal and clean it up
            let objectStr = jsonMatch[1];

            // Remove trailing semicolon if present
            objectStr = objectStr.replace(/;\s*$/, '');

            // Try direct JSON parsing first
            try {
              tokens = JSON.parse(objectStr);
            } catch {
              // If that fails, try to convert JS object to JSON
              // This handles single quotes and unquoted keys
              objectStr = objectStr
                // Replace single quotes with double quotes
                .replace(/'/g, '"')
                // Add quotes to unquoted keys
                .replace(/(\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
                // Handle trailing commas
                .replace(/,(\s*[}\]])/g, '$1');

              tokens = JSON.parse(objectStr);
            }
          } else {
            throw new Error('Could not find token export in JavaScript/TypeScript file');
          }
        } catch (error) {
          throw new Error(`Could not parse JavaScript/TypeScript tokens: ${error.message}`);
        }
        break;

      default:
        throw new Error(`Unsupported file type: ${extension}`);
    }

    spinner.text = 'Updating token files...';

    // Update token files
    for (const [category, categoryTokens] of Object.entries(tokens)) {
      if (!tokenCategories[category]) {
        console.warn(chalk.yellow(`\n⚠️  Unknown category: ${category} (skipped)`));
        continue;
      }

      const config = tokenCategories[category];
      const fullPath = join(process.cwd(), config.path);

      // Generate SCSS content
      let scssContent = `// ${config.description}\n`;
      scssContent += `// Imported from: ${basename(filePath)}\n`;
      scssContent += `// Date: ${new Date().toISOString()}\n\n`;

      for (const [name, value] of Object.entries(categoryTokens)) {
        if (name.startsWith('$')) {
          scssContent += `${name}: ${value} !default;\n`;
        } else if (name.startsWith('--')) {
          scssContent += `:root {\n  ${name}: ${value};\n}\n`;
        } else {
          // Convert to SCSS variable
          scssContent += `$${name}: ${value} !default;\n`;
        }
      }

      if (options.dryRun) {
        console.log(chalk.yellow(`\n  Would update: ${config.path}`));
        console.log(chalk.gray(scssContent.substring(0, 200) + '...'));
      } else {
        await writeFile(fullPath, scssContent, 'utf8');
        console.log(chalk.green(`  ✓ Updated ${config.path}`));
      }
    }

    spinner.succeed(chalk.green('✓ Tokens imported successfully'));

    // Show summary
    const categoryCount = Object.keys(tokens).length;
    const tokenCount = Object.values(tokens).reduce(
      (sum, cat) => sum + Object.keys(cat).length,
      0
    );

    console.log(chalk.gray(`\n  Categories imported: ${categoryCount}`));
    console.log(chalk.gray(`  Total tokens: ${tokenCount}`));

    if (!options.dryRun) {
      console.log(chalk.cyan('\n💡 Next steps:'));
      console.log(chalk.gray('  1. Review the updated token files'));
      console.log(chalk.gray('  2. Rebuild your themes: atomix build-theme <theme>'));
      console.log(chalk.gray('  3. Test your components with new tokens'));
    }

    return { tokens, categoryCount, tokenCount };

  } catch (error) {
    spinner.fail(chalk.red('Import failed'));
    throw error;
  }
}

/**
 * Automatically fix issues in token files
 */
export async function fixTokens(options = {}) {
  const spinner = ora('Attempting to fix design tokens...').start();
  let totalFixed = 0;

  try {
    for (const [category, config] of Object.entries(tokenCategories)) {
      const fullPath = join(process.cwd(), config.path);

      if (!existsSync(fullPath)) continue;

      let content = await readFile(fullPath, 'utf8');
      let originalContent = content;
      let fileFixedCount = 0;

      // 1. Fix missing !default flags
      const defaultFixed = content.replace(/(\$[a-z-]+:\s*[^;!]+)(;)/gi, (match, p1, p2) => {
        fileFixedCount++;
        return `${p1} !default${p2}`;
      });
      content = defaultFixed;

      // 2. Fix hardcoded colors (exact matches for basic tokens)
      if (category === 'colors') {
        const colorMappings = {
          '#7AFFD7': 'var(--atomix-color-primary)',
          '#FF5733': 'var(--atomix-color-secondary)',
          '#000000': 'var(--atomix-color-background)',
          '#FFFFFF': 'var(--atomix-color-text)'
        };

        for (const [hex, token] of Object.entries(colorMappings)) {
          const regex = new RegExp(hex, 'gi');
          if (regex.test(content)) {
            content = content.replace(regex, token);
            fileFixedCount++;
          }
        }
      }

      // 3. Fix hardcoded spacing (rem preferred)
      if (category === 'spacing') {
        content = content.replace(/(\d+)px/g, (match, pixels) => {
          const px = parseInt(pixels);
          if (px % 4 === 0) {
            fileFixedCount++;
            return `var(--atomix-space-${px / 4})`;
          }
          return match;
        });
      }

      if (content !== originalContent) {
        if (!options.dryRun) {
          await writeFile(fullPath, content, 'utf8');
        }
        totalFixed += fileFixedCount;
        console.log(chalk.green(`  ✓ Fixed ${fileFixedCount} issues in ${config.path}`));
      }
    }

    spinner.succeed(chalk.green(`✓ Successfully fixed ${totalFixed} issues!`));
    return { totalFixed };

  } catch (error) {
    spinner.fail(chalk.red('Fix operation failed'));
    throw error;
  }
}

export default {
  listTokens,
  validateTokens,
  exportTokens,
  importTokens,
  fixTokens
};
