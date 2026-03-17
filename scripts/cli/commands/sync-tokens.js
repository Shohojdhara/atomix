/**
 * Sync Tokens Command
 * Synchronizes design tokens from external sources (Figma, Style Dictionary, etc.)
 */

import { existsSync } from 'fs';
import { join } from 'path';
import { logger } from '../utils/logger.js';
import { AtomixCLIError } from '../utils/error.js';
import { tokenProvider, TOKEN_FORMATS } from '../internal/tokens/token-provider.js';
import { tokenValidator } from '../internal/tokens/token-validator.js';
import { filesystem } from '../internal/filesystem.js';

/**
 * Token source configurations
 */
const TOKEN_SOURCES = {
  FIGMA: {
    name: 'Figma',
    format: TOKEN_FORMATS.FIGMA,
    defaultPath: './design-tokens/figma-tokens.json'
  },
  STYLE_DICTIONARY: {
    name: 'Style Dictionary',
    format: TOKEN_FORMATS.STYLE_DICTIONARY,
    defaultPath: './design-tokens/style-dictionary.json'
  },
  W3C_DTCG: {
    name: 'W3C DTCG',
    format: TOKEN_FORMATS.W3C_DTCG,
    defaultPath: './design-tokens/tokens.json'
  }
};

/**
 * Action logic for syncing tokens
 * @param {string} source - Token source (figma, style-dictionary, w3c)
 * @param {Object} options - CLI options
 */
export async function syncTokensAction(source, options) {
  const spinner = logger.spinner(`Syncing tokens from ${source}...`).start();
  
  try {
    // Determine source configuration
    const sourceConfig = TOKEN_SOURCES[source.toUpperCase()];
    if (!sourceConfig) {
      throw new AtomixCLIError(
        `Unknown token source: ${source}`,
        'UNKNOWN_SOURCE',
        [
          'Available sources: figma, style-dictionary, w3c',
          'Use `atomix sync-tokens --help` for usage information'
        ]
      );
    }

    // Determine file path
    const filePath = options.file || sourceConfig.defaultPath;
    const absolutePath = join(process.cwd(), filePath);

    if (!existsSync(absolutePath)) {
      throw new AtomixCLIError(
        `Token file not found: ${absolutePath}`,
        'TOKEN_FILE_NOT_FOUND',
        [
          'Verify the file path is correct',
          'Export tokens from your design tool first',
          'Use --file flag to specify custom path'
        ]
      );
    }

    // Load tokens using provider
    logger.debug(`Loading tokens from ${filePath}`);
    const loadedTokens = await tokenProvider.loadTokens(filePath, {
      format: sourceConfig.format
    });

    // Validate tokens
    logger.debug('Validating tokens');
    const validationResults = tokenValidator.validate(loadedTokens);

    if (!validationResults.valid) {
      spinner.warn('Token sync completed with validation issues');
      logger.info(tokenValidator.getReport(validationResults));
      
      if (!options.force && validationResults.summary.errors > 0) {
        throw new AtomixCLIError(
          'Token validation failed with errors',
          'VALIDATION_FAILED',
          [
            'Fix the validation errors listed above',
            'Use --force flag to sync anyway (not recommended)'
          ]
        );
      }
    } else {
      spinner.succeed(`Successfully synced ${countTokens(loadedTokens)} tokens from ${sourceConfig.name}`);
    }

    // Export tokens to desired formats
    if (options.output) {
      await exportTokens(options.output, loadedTokens);
    }

    // Show summary
    showSyncSummary(loadedTokens, validationResults, sourceConfig);

  } catch (error) {
    spinner.fail('Token sync failed');
    
    if (error instanceof AtomixCLIError) {
      throw error;
    }
    
    throw new AtomixCLIError(
      `Failed to sync tokens: ${error.message}`,
      'SYNC_FAILED',
      [
        'Check that the token file is valid JSON',
        'Ensure you have read permissions for the file',
        'Try validating the file manually'
      ]
    );
  }
}

/**
 * Export tokens to multiple formats
 * @private
 */
async function exportTokens(outputDir, tokens) {
  const exports = [];

  // Export to JSON
  const jsonPath = join(outputDir, 'tokens.json');
  const jsonContent = tokenProvider.exportTokens(TOKEN_FORMATS.JSON, { pretty: true });
  await filesystem.writeFile(jsonPath, jsonContent, 'utf8');
  exports.push(jsonPath);

  // Export to CSS
  const cssPath = join(outputDir, 'tokens.css');
  const cssContent = tokenProvider.exportTokens(TOKEN_FORMATS.CSS, { selector: ':root' });
  await filesystem.writeFile(cssPath, cssContent, 'utf8');
  exports.push(cssPath);

  logger.debug(`Exported tokens to: ${exports.join(', ')}`);
}

/**
 * Count total tokens across all categories
 * @private
 */
function countTokens(tokens) {
  let count = 0;
  for (const category of Object.values(tokens)) {
    count += Object.keys(category).length;
  }
  return count;
}

/**
 * Display sync summary
 * @private
 */
function showSyncSummary(tokens, validation, source) {
  const totalTokens = countTokens(tokens);
  const categories = Object.keys(tokens);

  const summary = `
✅ Token Sync Complete

Source: ${source.name}
Total Tokens: ${totalTokens}
Categories: ${categories.join(', ')}

Validation:
  Errors:   ${validation.summary.errors}
  Warnings: ${validation.summary.warnings}
  Info:     ${validation.summary.info}

Next Steps:
  • Review validation warnings with \`atomix validate tokens\`
  • Export tokens with \`atomix build-theme\`
  • Use tokens in components with \`atomix generate component\`
  `.trim();

  logger.box(summary);
}

/**
 * Interactive mode for token sync
 * @private
 */
export async function interactiveSync() {
  logger.info('🔄 Interactive Token Sync\n');
  
  // In a full implementation, this would use inquirer to prompt for:
  // 1. Source selection (Figma, Style Dictionary, etc.)
  // 2. File path
  // 3. Export options
  // 4. Validation preferences
  
  logger.info('Interactive mode coming soon!');
  logger.info('For now, use: atomix sync-tokens <source> --file <path>\n');
}
