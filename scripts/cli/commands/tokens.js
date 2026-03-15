/**
 * Atomix CLI Tokens Command
 * Design token management and export
 */

import { logger } from '../utils/logger.js';
import { listTokens, exportTokens } from '../token-manager.js';
import chalk from 'chalk';

/**
 * Action for the `atomix tokens` command
 * @param {string} subcommand - list | export
 * @param {object} options - Command options
 */
export async function tokensAction(subcommand, options = {}) {
  switch (subcommand) {
    case 'list':
      await listTokensAction(options);
      break;
    case 'export':
      await exportTokensAction(options);
      break;
    default:
      logger.error(`Unknown subcommand: ${subcommand}. Available: list, export`);
  }
}

/**
 * List all tokens
 */
async function listTokensAction(options) {
  try {
    // listTokens already logs everything
    await listTokens();
  } catch (error) {
    logger.error(`Failed to list tokens: ${error.message}`);
  }
}

/**
 * Export tokens
 */
async function exportTokensAction(options) {
  const format = options.format || 'css';
  const outputPath = options.output || './tokens';
  
  try {
    // exportTokens already logs everything
    await exportTokens(format, outputPath);
  } catch (error) {
    logger.error(`Token export failed: ${error.message}`);
  }
}
