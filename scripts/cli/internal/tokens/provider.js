/**
 * Atomix CLI Token Provider Base Class
 */

export class TokenProvider {
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Fetches tokens from the source
   * @returns {Promise<Object>} - The fetched tokens
   */
  async pull() {
    throw new Error('Provider.pull() not implemented');
  }

  /**
   * Pushes local changes to the source (Experimental)
   * @param {Object} tokens - The tokens to push
   * @returns {Promise<boolean>} - Success status
   */
  async push(tokens) {
    throw new Error('Provider.push() not implemented');
  }

  /**
   * Validates the provider configuration
   * @returns {Object} - { isValid: boolean, error?: string }
   */
  validate() {
    return { isValid: true };
  }
}
