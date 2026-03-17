/**
 * Atomix CLI Tokens Command
 * Design token management and export
 */

import inquirer from 'inquirer';
import { logger } from '../utils/logger.js';
import { listTokens, exportTokens } from '../token-manager.js';
import { tokenEngine } from '../internal/tokens/engine.js';
import { isNonInteractive } from '../utils/helpers.js';
import { AtomixCLIError, ErrorCategory } from '../utils/error.js';
import chalk from 'chalk';

const SUPPORTED_PROVIDER_TYPES = 'figma, style-dictionary, w3c';

/**
 * Get provider for pull/push: from options, or prompt in interactive mode, or throw
 * @param {object} options - Command options
 * @param {string} subcommand - 'pull' | 'push'
 * @returns {Promise<string>} - Provider name
 */
async function resolveProvider(options, subcommand) {
  if (options.provider) return options.provider;

  const names = tokenEngine.getProviderNames();
  const message = names.length === 0
    ? `No token providers configured. Add tokenEngine.providers in atomix.config. Supported types: ${SUPPORTED_PROVIDER_TYPES}.`
    : `Missing required option: --provider. Supported (from config): ${names.join(', ')}. Use --provider <name>.`;

  if (isNonInteractive() || !process.stdin.isTTY) {
    throw new AtomixCLIError(message, ErrorCategory.CONFIG, [
      'Set --provider <name> or configure tokenEngine.providers in atomix.config.'
    ]);
  }

  if (names.length === 0) {
    throw new AtomixCLIError(message, ErrorCategory.CONFIG, [
      'Add tokenEngine.providers in atomix.config. Supported types: figma, style-dictionary, w3c.'
    ]);
  }

  const { provider } = await inquirer.prompt([
    {
      type: 'list',
      name: 'provider',
      message: `Select provider for ${subcommand}:`,
      choices: names
    }
  ]);
  return provider;
}

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
    case 'pull': {
      const provider = await resolveProvider(options, 'pull');
      if (!provider) break;
      await pullTokensAction(provider, options);
      break;
    }
    case 'push': {
      const provider = await resolveProvider(options, 'push');
      if (!provider) break;
      await pushTokensAction(provider, options);
      break;
    }
    default:
      throw new AtomixCLIError(
        `Unknown subcommand: ${subcommand}. Available: list, export, pull, push`,
        ErrorCategory.VALIDATION,
        ['Use one of: atomix tokens list | export | pull | push']
      );
  }
}

/**
 * Pull tokens from a provider
 */
async function pullTokensAction(provider, options) {
  try {
    const tokens = await tokenEngine.pull(provider);
    logger.box(`Tokens pulled successfully from ${provider}!\nSource: ${tokens.source}\nTokens: ${Object.keys(tokens.tokens).join(', ')}`);
  } catch (error) {
    throw new AtomixCLIError(
      error.message || `Token pull failed`,
      ErrorCategory.CONFIG,
      ['Check tokenEngine.providers in atomix.config and network access.']
    );
  }
}

/**
 * Push tokens to a provider
 */
async function pushTokensAction(provider, options) {
  try {
    const localTokens = {};
    const success = await tokenEngine.push(provider, localTokens);
    if (success) {
      logger.succeed(`Tokens pushed successfully to ${provider}`);
    } else {
      throw new AtomixCLIError(
        'Token push failed',
        ErrorCategory.CONFIG,
        ['Check provider configuration and credentials.']
      );
    }
  } catch (error) {
    if (error instanceof AtomixCLIError) throw error;
    throw new AtomixCLIError(
      error.message || 'Token push failed',
      ErrorCategory.CONFIG,
      ['Check tokenEngine.providers in atomix.config.']
    );
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
