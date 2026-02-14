/**
 * Design Token Manager for Atomix Design System
 */

import { readFile, writeFile } from 'fs/promises';
import { resolve, basename } from 'path';
import { existsSync } from 'fs';
import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';

/**
 * Utility function to safely call spinner methods
 */
function safeSpinnerCall(spinner, method, ...args) {
  if (typeof spinner[method] === 'function') {
    return spinner[method](...args);
  }
}

/**
 * Utility function to safely call chalk methods
 */
function safeChalkCall(chalkObj, methodChain, text) {
  try {
    // Split method chain like 'bold.cyan' into ['bold', 'cyan']
    const methods = methodChain.split('.');
    let result = chalkObj;
    
    for (const method of methods) {
      if (typeof result[method] === 'function') {
        result = result[method];
      } else {
        // If any method in the chain doesn't exist, return the text as-is
        return text;
      }
    }
    
    return result(text);
  } catch (e) {
    // If anything goes wrong, return the text as-is
    return text;
  }
}

/**
 * Token categories in the design system
 */
let projectRoot = '';

export function setProjectRoot(path) {
  projectRoot = path;
}

const tokenCategories = {
  colors: {
    get path() { return resolve(projectRoot, 'src/styles/01-settings/_settings.colors.scss'); },
    prefix: '--atomix-color',
    description: 'Color palette tokens'
  },
  typography: {
    get path() { return resolve(projectRoot, 'src/styles/01-settings/_settings.typography.scss'); },
    prefix: '--atomix-font',
    description: 'Typography scale tokens'
  },
  spacing: {
    get path() { return resolve(projectRoot, 'src/styles/01-settings/_settings.spacing.scss'); },
    prefix: '--atomix-space',
    description: 'Spacing scale tokens'
  },
  radius: {
    get path() { return resolve(projectRoot, 'src/styles/01-settings/_settings.border-radius.scss'); },
    prefix: '--atomix-radius',
    description: 'Border radius tokens'
  },
  shadows: {
    get path() { return resolve(projectRoot, 'src/styles/01-settings/_settings.box-shadow.scss'); },
    prefix: '--atomix-shadow',
    description: 'Box shadow tokens'
  },
  breakpoints: {
    get path() { return resolve(projectRoot, 'src/styles/01-settings/_settings.breakpoints.scss'); },
    prefix: '--atomix-breakpoint',
    description: 'Responsive breakpoint tokens'
  }
};

/**
 * Parse tokens from content based on category
 */
function parseTokens(content, category) {
  const tokens = {};
  let count = 0;
  
  // Extract SCSS variables
  const scssVarPattern = /\$([a-z0-9-]+):\s*(.+?);/gi;
  let match;
  while ((match = scssVarPattern.exec(content)) !== null) {
    const name = `$${match[1]}`;
    let value = match[2].trim();
    
    // Check for !default flag in value
    if (value.endsWith('!default')) {
      value = value.replace(/\s*!default$/i, '').trim();
    }
    
    tokens[name] = value;
    count++;
  }
  
  // Extract CSS custom properties
  const cssVarPattern = /(--[a-z0-9-]+):\s*(.+?);/gi;
  while ((match = cssVarPattern.exec(content)) !== null) {
    const name = match[1];
    const value = match[2].trim();
    tokens[name] = value;
    count++;
  }

  return {
    tokens,
    count,
    description: tokenCategories[category]?.description || 'Unknown category',
    path: tokenCategories[category]?.path || 'Unknown path'
  };
}

/**
 * Validate a token file for common issues
 */
function validateTokenFile(content, category, filePath) {
  const issues = [];
  const warnings = [];
  let count = 0;

  // Special handling for breakpoints which uses a map structure
  if (category === 'breakpoints') {
    // Count map entries in breakpoints
    const mapPattern = /\$[a-z0-9_-]+:\s*\(([\s\S]*?)\)/gi;
    let match;
    while ((match = mapPattern.exec(content)) !== null) {
      // Count entries inside the map
      const mapContent = match[1];
      const entryMatches = mapContent.match(/[\w-]+:\s*[^,}]+/g);
      count += entryMatches ? entryMatches.length : 0;
    }
    
    return { issues, warnings, count };
  }

  // Count tokens for non-breakpoint categories
  const scssVarPattern = /\$([a-z0-9-]+):\s*(.+?);/gi;
  let match;
  while ((match = scssVarPattern.exec(content)) !== null) {
    count++;
    
    let value = match[2].trim();
    let hasDefault = false;
    
    // Check for !default flag in value
    if (value.toLowerCase().endsWith('!default')) {
      hasDefault = true;
      value = value.replace(/\s*!default$/i, '').trim();
    }

    // Check for missing !default flag
    if (!hasDefault) {  // !default is not present
      issues.push({
        category: 'missing-default',
        issue: `Missing !default flag for variable $${match[1]}`,
        file: filePath,
        fix: `Add !default to the variable: $${match[1]}: ${value} !default;`
      });
    }
    
    // Check for hardcoded values that should be tokens
    if (/#[0-9a-fA-F]{3,6}|rgb\(|rgba\(|hsl\(|hsla\(/.test(value)) {
      warnings.push({
        category: 'hardcoded-value',
        issue: `Hardcoded color value detected in $${match[1]}`,
        file: filePath,
        values: [value],
        fix: `Consider using a token instead of hardcoded value`
      });
    }
  }

  // Check for naming conventions
  const namingPattern = /\$([a-z0-9-]+)/gi;
  while ((match = namingPattern.exec(content)) !== null) {
    const varName = match[1];
    
    // Check if name contains uppercase letters
    if (/[A-Z]/.test(varName)) {
      issues.push({
        category: 'naming-convention',
        issue: `Variable name $${varName} contains uppercase letters`,
        file: filePath,
        fix: `Use lowercase and hyphens: $${varName.toLowerCase()}`
      });
    }
  }

  return { issues, warnings, count };
}

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
  const scssVarPattern = /\$([a-z0-9-]+):\s*([^;!]+)(?:\s*!default)?;/gi;
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
 * Load all design tokens from SCSS files
 */
export async function listTokens(categories = Object.keys(tokenCategories)) {
  const spinner = ora('Loading design tokens...');
  safeSpinnerCall(spinner, 'start');

  try {
    const tokens = {};
    let categoryCount = 0;
    let tokenCount = 0;

    for (const cat of categories) {
      if (!tokenCategories[cat]) {
        safeSpinnerCall(spinner, 'warn', safeChalkCall(chalk, 'yellow', `Unknown category: ${cat}`));
        continue;
      }

      const fullPath = tokenCategories[cat].path;
      
      if (!existsSync(fullPath)) {
        continue;
      }

      const content = await readFile(fullPath, 'utf8');
      const categoryTokens = parseTokens(content, cat);
      
      if (Object.keys(categoryTokens).length > 0) {
        tokens[cat] = categoryTokens;
        categoryCount++;
        tokenCount += Object.keys(categoryTokens).length;
      }
    }

    safeSpinnerCall(spinner, 'succeed', safeChalkCall(chalk, 'green', 'Tokens loaded successfully'));
    
    // Show summary
    if (categoryCount === 0) {
      console.log(safeChalkCall(chalk, 'yellow', '\n⚠️  No design tokens found'));
      console.log(safeChalkCall(chalk, 'gray', 'Make sure you are in an Atomix project directory'));
    } else {
      console.log(safeChalkCall(chalk, 'bold.cyan', '\n📐 Design Tokens\n'));

      for (const [category, data] of Object.entries(tokens)) {
        console.log(boxen(
          safeChalkCall(chalk, 'bold', category.toUpperCase()) + '\n' +
          safeChalkCall(chalk, 'gray', data.description) + '\n\n' +
          safeChalkCall(chalk, 'cyan', `Tokens: ${data.count}\n`) +
          safeChalkCall(chalk, 'gray', `File: ${data.path}`),
          { padding: 1, borderColor: 'blue', borderStyle: 'round' }
        ));

        // Log first 5 tokens as examples
        const tokenEntries = Object.entries(data.tokens).slice(0, 5);
        for (const [name, value] of tokenEntries) {
          console.log(`  ${safeChalkCall(chalk, 'green', name)}: ${safeChalkCall(chalk, 'white', value)}`);
        }
        
        if (Object.keys(data.tokens).length > 5) {
          console.log(safeChalkCall(chalk, 'gray', `  ... and ${Object.keys(data.tokens).length - 5} more\n`));
        }
      }
    }

    return { tokens, categoryCount, tokenCount };

  } catch (error) {
    safeSpinnerCall(spinner, 'fail', safeChalkCall(chalk, 'red', 'Failed to load tokens'));
    throw error;
  }
}

/**
 * Validate tokens according to design system standards
 */
export async function validateTokens(categories = Object.keys(tokenCategories), options = {}) {
  const spinner = ora('Validating design tokens...');
  safeSpinnerCall(spinner, 'start');

  try {
    let issues = [];
    let warnings = [];
    let totalTokens = 0;

    for (const cat of categories) {
      if (!tokenCategories[cat]) continue;

      const fullPath = tokenCategories[cat].path;
      
      if (!existsSync(fullPath)) continue;

      const content = await readFile(fullPath, 'utf8');
      const { issues: catIssues, warnings: catWarnings, count: catCount } = validateTokenFile(content, cat, fullPath);
      
      issues = [...issues, ...catIssues];
      warnings = [...warnings, ...catWarnings];
      totalTokens += catCount;
    }

    if (issues.length === 0 && warnings.length === 0) {
      safeSpinnerCall(spinner, 'succeed', safeChalkCall(chalk, 'green', 'All tokens are valid!'));
      
      console.log(safeChalkCall(chalk, 'bold.cyan', '\n🔍 Token Validation Report\n'));
      console.log(
        safeChalkCall(chalk, 'bold.green', '✅ All tokens valid!\n\n') +
        safeChalkCall(chalk, 'gray', `Total tokens: ${totalTokens}\n`) +
        safeChalkCall(chalk, 'gray', 'All naming conventions followed\n') +
        safeChalkCall(chalk, 'gray', 'No hardcoded values found')
      );
      
      console.log(safeChalkCall(chalk, 'gray', '─'.repeat(50)));
      
      return { isValid: true, issues: [], warnings: [] };
    } else {
      const status = issues.length > 0 ? 'fail' : 'warn';
      safeSpinnerCall(spinner, status, safeChalkCall(chalk, 'red', `Found ${issues.length} issues and ${warnings.length} warnings`));
      
      console.log(safeChalkCall(chalk, 'bold.cyan', '\n🔍 Token Validation Report\n'));
      
      if (issues.length > 0) {
        console.log(safeChalkCall(chalk, 'bold.red', `❌ Issues (${issues.length}):\n`));
        
        for (let i = 0; i < Math.min(issues.length, 5); i++) {
          const issue = issues[i];
          console.log(safeChalkCall(chalk, 'red', `  ${i + 1}. [${issue.category}] ${issue.issue}`));
          console.log(safeChalkCall(chalk, 'gray', `     File: ${issue.file}`));
          console.log(safeChalkCall(chalk, 'yellow', `     Fix: ${issue.fix}\n`));
        }
        
        if (issues.length > 5) {
          console.log(safeChalkCall(chalk, 'gray', `... and ${issues.length - 5} more\n`));
        }
      }
      
      if (warnings.length > 0) {
        console.log(safeChalkCall(chalk, 'bold.yellow', `⚠️  Warnings (${warnings.length}):\n`));
        
        for (let i = 0; i < Math.min(warnings.length, 5); i++) {
          const warning = warnings[i];
          console.log(safeChalkCall(chalk, 'yellow', `  ${i + 1}. [${warning.category}] ${warning.issue}`));
          console.log(safeChalkCall(chalk, 'gray', `     File: ${warning.file}`));
          if (warning.values && warning.values.length > 0) {
            console.log(safeChalkCall(chalk, 'gray', `     Examples: ${warning.values.join(', ')}`));
          }
          console.log(safeChalkCall(chalk, 'cyan', `     Fix: ${warning.fix}\n`));
        }
        
        if (warnings.length > 5) {
          console.log(safeChalkCall(chalk, 'gray', `... and ${warnings.length - 5} more\n`));
        }
      }
      
      console.log(safeChalkCall(chalk, 'gray', '─'.repeat(50)));
      
      if (options.fix) {
        console.log(safeChalkCall(chalk, 'yellow', '\n💡 Run with --fix to automatically fix some issues'));
      }
      
      return { isValid: false, issues, warnings };
    }
  } catch (error) {
    safeSpinnerCall(spinner, 'fail', safeChalkCall(chalk, 'red', 'Validation failed'));
    throw error;
  }
}

/**
 * Export tokens to different formats
 */
export async function exportTokens(format = 'json', outputPath = null) {
  const spinner = ora(`Exporting tokens as ${format.toUpperCase()}...`);
  safeSpinnerCall(spinner, 'start');

  try {
    const allTokens = {};

    // Collect all tokens
    for (const [category, config] of Object.entries(tokenCategories)) {
      const fullPath = config.path;
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

    safeSpinnerCall(spinner, 'succeed', safeChalkCall(chalk, 'green', `✓ Exported tokens to ${finalPath}`));

    // Show summary
    const categoryCount = Object.keys(allTokens).length;
    const tokenCount = Object.values(allTokens).reduce(
      (sum, cat) => sum + Object.keys(cat).length,
      0
    );

    console.log(safeChalkCall(chalk, 'gray', `\n  Categories: ${categoryCount}`));
    console.log(safeChalkCall(chalk, 'gray', `  Total tokens: ${tokenCount}`));
    console.log(safeChalkCall(chalk, 'gray', `  Format: ${format.toUpperCase()}`));

    return { path: finalPath, tokens: allTokens };

  } catch (error) {
    safeSpinnerCall(spinner, 'fail', safeChalkCall(chalk, 'red', 'Export failed'));
    throw error;
  }
}

/**
 * Import tokens from file
 */
export async function importTokens(filePath, options = {}) {
  const spinner = ora('Importing design tokens...');
  safeSpinnerCall(spinner, 'start');

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

    safeSpinnerCall(spinner, 'text', 'Updating token files...');

    // Update token files
    for (const [category, categoryTokens] of Object.entries(tokens)) {
      if (!tokenCategories[category]) {
        console.warn(safeChalkCall(chalk, 'yellow', `\n⚠️  Unknown category: ${category} (skipped)`));
        continue;
      }

      const config = tokenCategories[category];
      const fullPath = config.path;

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
        console.log(safeChalkCall(chalk, 'yellow', `\n  Would update: ${config.path}`));
        console.log(safeChalkCall(chalk, 'gray', scssContent.substring(0, 200) + '...'));
      } else {
        await writeFile(fullPath, scssContent, 'utf8');
        console.log(safeChalkCall(chalk, 'green', `  ✓ Updated ${config.path}`));
      }
    }

    safeSpinnerCall(spinner, 'succeed', safeChalkCall(chalk, 'green', '✓ Tokens imported successfully'));

    // Show summary
    const categoryCount = Object.keys(tokens).length;
    const tokenCount = Object.values(tokens).reduce(
      (sum, cat) => sum + Object.keys(cat).length,
      0
    );

    console.log(safeChalkCall(chalk, 'gray', `\n  Categories imported: ${categoryCount}`));
    console.log(safeChalkCall(chalk, 'gray', `  Total tokens: ${tokenCount}`));

    if (!options.dryRun) {
      console.log(safeChalkCall(chalk, 'cyan', '\n💡 Next steps:'));
      console.log(safeChalkCall(chalk, 'gray', '  1. Review the updated token files'));
      console.log(safeChalkCall(chalk, 'gray', '  2. Rebuild your themes: atomix build-theme <theme>'));
      console.log(safeChalkCall(chalk, 'gray', '  3. Test your components with new tokens'));
    }

    return { tokens, categoryCount, tokenCount };

  } catch (error) {
    safeSpinnerCall(spinner, 'fail', safeChalkCall(chalk, 'red', 'Import failed'));
    throw error;
  }
}

/**
 * Automatically fix issues in token files
 */
export async function fixTokens(options = {}) {
  const spinner = ora('Attempting to fix design tokens...');
  safeSpinnerCall(spinner, 'start');
  let totalFixed = 0;

  try {
    for (const [category, config] of Object.entries(tokenCategories)) {
      const fullPath = config.path;

      if (!existsSync(fullPath)) continue;

      let content = await readFile(fullPath, 'utf8');
      let originalContent = content;
      let fileFixedCount = 0;

      // 1. Fix missing !default flags
      const defaultFixed = content.replace(/(\$[a-z-]+:\s*[^;!\n]+)(;\s*)(?!\s*!default)/gi, (match, p1, p2) => {
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
        console.log(safeChalkCall(chalk, 'green', `  ✓ Fixed ${fileFixedCount} issues in ${config.path}`));
      }
    }

    safeSpinnerCall(spinner, 'succeed', safeChalkCall(chalk, 'green', `✓ Successfully fixed ${totalFixed} issues!`));
    return { totalFixed };

  } catch (error) {
    safeSpinnerCall(spinner, 'fail', safeChalkCall(chalk, 'red', 'Fix operation failed'));
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
