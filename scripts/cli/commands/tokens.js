/**
 * Atomix CLI Tokens Command
 * Design token management and export
 */

import { logger } from '../utils/logger.js';
import { listTokens, exportTokens } from '../token-manager.js';
import { tokenEngine } from '../internal/tokens/engine.js';
import chalk from 'chalk';

/**
 * Action for the `atomix tokens` command
 * @param {string} subcommand - list | export | pull | push
 * @param {object} options - Command options
 */
export async function tokensAction(subcommand, options = {}) {
  // Initialize token engine
  await tokenEngine.initialize();

  switch (subcommand) {
    case 'list':
      await listTokensAction(options);
      break;
    case 'export':
      await exportTokensAction(options);
      break;
    case 'pull':
      await pullTokensAction(options);
      break;
    case 'push':
      await pushTokensAction(options);
      break;
    default:
      logger.error(`Unknown subcommand: ${subcommand}. Available: list, export, pull, push`);
  }
}

/**
 * Pull tokens from a provider
 */
async function pullTokensAction(options) {
  const provider = options.provider;
  if (!provider) {
    logger.error('Please specify a provider using --provider');
    return;
  }

  try {
    const tokens = await tokenEngine.pull(provider);
    logger.box(`Tokens pulled successfully from ${provider}!\nSource: ${tokens.source}\nTokens: ${Object.keys(tokens.tokens).join(', ')}`);
  } catch (error) {
    logger.error(`Token pull failed: ${error.message}`);
  }
}

/**
 * Push tokens to a provider
 */
async function pushTokensAction(options) {
  const provider = options.provider;
  if (!provider) {
    logger.error('Please specify a provider using --provider');
    return;
  }

  try {
    // In a real scenario, we'd load local tokens here
    const localTokens = {}; 
    const success = await tokenEngine.push(provider, localTokens);
    if (success) {
      logger.succeed(`Tokens pushed successfully to ${provider}`);
    }
  } catch (error) {
    logger.error(`Token push failed: ${error.message}`);
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
