/**
 * Atomix CLI W3C Token Provider
 */

import { TokenProvider } from '../provider.js';
import { logger } from '../../../utils/logger.js';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export class W3CProvider extends TokenProvider {
  constructor(options = {}) {
    super(options);
    this.tokenPath = options.tokenPath || './tokens.json';
  }

  /**
   * Fetches tokens from a W3C Design Tokens file
   */
  async pull() {
    const fullPath = join(process.cwd(), this.tokenPath);
    if (!existsSync(fullPath)) {
      throw new Error(`W3C tokens file not found: ${this.tokenPath}`);
    }

    logger.debug(`Loading W3C tokens file: ${this.tokenPath}`);
    
    try {
      const content = readFileSync(fullPath, 'utf8');
      const tokens = JSON.parse(content);
      
      return {
        source: 'w3c',
        tokenPath: this.tokenPath,
        tokens
      };
    } catch (error) {
      throw new Error(`Failed to parse W3C tokens file: ${error.message}`);
    }
  }

  /**
   * Pushes tokens back (Experimental)
   */
  async push(tokens) {
    logger.warn('W3C provider does not support pushing tokens.');
    return false;
  }
}
