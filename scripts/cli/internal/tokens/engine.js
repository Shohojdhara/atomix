/**
 * Atomix CLI Universal Token Engine
 * Manages token providers and bi-directional sync
 */

import { logger } from '../../utils/logger.js';
import { configLoader } from '../config-loader.js';
import { hookManager } from '../hooks.js';

export class TokenEngine {
  constructor() {
    this.providers = new Map();
  }

  /**
   * Initializes the engine with providers from the config
   */
  async initialize() {
    const config = configLoader.getConfig();
    const tokenEngineConfig = config.tokenEngine || {};
    const providers = tokenEngineConfig.providers || {};

    for (const [name, providerConfig] of Object.entries(providers)) {
      try {
        const provider = await this._instantiateProvider(providerConfig);
        if (provider) {
          this.providers.set(name, provider);
          logger.debug(`Initialized token provider: ${name} (${providerConfig.type})`);
        }
      } catch (error) {
        logger.error(`Failed to initialize token provider ${name}: ${error.message}`);
      }
    }
  }

  /**
   * Instantiates a provider based on its type
   * @private
   */
  async _instantiateProvider(providerConfig) {
    const { type, options } = providerConfig;

    switch (type) {
      case 'figma': {
        const { FigmaProvider } = await import('./providers/figma.js');
        return new FigmaProvider(options);
      }
      case 'style-dictionary': {
        const { StyleDictionaryProvider } = await import('./providers/style-dictionary.js');
        return new StyleDictionaryProvider(options);
      }
      case 'w3c': {
        const { W3CProvider } = await import('./providers/w3c.js');
        return new W3CProvider(options);
      }
      default:
        logger.warn(`Unknown token provider type: ${type}`);
        return null;
    }
  }

  /**
   * Pulls tokens from a specific provider
   * @param {string} providerName - Name of the provider to pull from
   */
  async pull(providerName) {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`Token provider not found: ${providerName}`);
    }

    logger.info(`Pulling tokens from ${providerName}...`);
    
    // Lifecycle hook
    const initialData = await hookManager.trigger('prePullTokens', { providerName });

    const tokens = await provider.pull();
    
    // Lifecycle hook
    const finalTokens = await hookManager.trigger('postPullTokens', tokens);

    logger.debug(`Successfully pulled tokens from ${providerName}`);
    return finalTokens;
  }

  /**
   * Pushes tokens back to a provider (Experimental)
   * @param {string} providerName - Name of the provider to push to
   * @param {Object} tokens - The tokens to push
   */
  async push(providerName, tokens) {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`Token provider not found: ${providerName}`);
    }

    logger.info(`Pushing tokens to ${providerName}...`);

    // Lifecycle hook
    const preparedTokens = await hookManager.trigger('prePushTokens', tokens);

    const success = await provider.push(preparedTokens);

    if (success) {
      logger.info(`Successfully pushed tokens to ${providerName}`);
    } else {
      logger.error(`Failed to push tokens to ${providerName}`);
    }

    return success;
  }
}

export const tokenEngine = new TokenEngine();
