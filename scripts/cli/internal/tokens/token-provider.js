/**
 * Token Provider System
 * Manages design token imports from multiple sources (Figma, Style Dictionary, W3C DTCG)
 */

import { existsSync } from 'fs';
import { join } from 'path';
import { filesystem } from '../filesystem.js';
import { logger } from '../../utils/logger.js';
import { AtomixCLIError } from '../../utils/error.js';

/**
 * Token format types supported by Atomix
 */
export const TOKEN_FORMATS = {
  FIGMA: 'figma',
  STYLE_DICTIONARY: 'style-dictionary',
  W3C_DTCG: 'w3c-dtcg',
  JSON: 'json',
  CSS: 'css'
};

/**
 * Token categories for organization
 */
export const TOKEN_CATEGORIES = {
  COLOR: 'color',
  SPACING: 'spacing',
  TYPOGRAPHY: 'typography',
  SHADOW: 'shadow',
  RADIUS: 'radius',
  ANIMATION: 'animation',
  BREAKPOINT: 'breakpoint',
  Z_INDEX: 'zIndex'
};

/**
 * Token Provider class for managing design tokens
 */
export class TokenProvider {
  constructor(options = {}) {
    this.tokenPath = options.tokenPath || './design-tokens';
    this.format = options.format || TOKEN_FORMATS.JSON;
    this.tokens = {};
    this.sources = new Map();
  }

  /**
   * Load tokens from a file path
   * @param {string} filePath - Path to token file
   * @param {Object} options - Load options
   * @returns {Promise<Object>} Loaded tokens
   */
  async loadTokens(filePath, options = {}) {
    const absolutePath = join(process.cwd(), filePath);
    
    if (!existsSync(absolutePath)) {
      throw new AtomixCLIError(
        `Token file not found: ${absolutePath}`,
        'TOKEN_FILE_NOT_FOUND',
        [
          'Verify the token file path is correct',
          'Run `atomix init` to create default token structure',
          'Check file permissions'
        ]
      );
    }

    const ext = filePath.split('.').pop().toLowerCase();
    let loadedTokens = {};

    try {
      switch (ext) {
        case 'json':
          loadedTokens = await this.loadJSONTokens(absolutePath);
          break;
        case 'css':
        case 'scss':
          loadedTokens = await this.loadCSSTokens(absolutePath);
          break;
        default:
          throw new Error(`Unsupported token file format: ${ext}`);
      }

      // Validate loaded tokens
      this.validateTokenStructure(loadedTokens);
      
      // Merge with existing tokens
      this.tokens = this.mergeTokens(this.tokens, loadedTokens);
      
      // Track source
      this.sources.set(filePath, {
        path: absolutePath,
        format: this.detectFormat(ext),
        loadedAt: new Date()
      });

      logger.debug(`Loaded ${Object.keys(loadedTokens).length} tokens from ${filePath}`);
      
      return loadedTokens;
    } catch (error) {
      if (error instanceof AtomixCLIError) {
        throw error;
      }
      throw new AtomixCLIError(
        `Failed to load tokens from ${filePath}: ${error.message}`,
        'TOKEN_LOAD_FAILED',
        [
          'Check token file syntax is valid JSON/CSS',
          'Ensure file is not corrupted',
          'Try validating tokens with `atomix validate tokens`'
        ]
      );
    }
  }

  /**
   * Load JSON format tokens
   * @private
   */
  async loadJSONTokens(filePath) {
    const content = await filesystem.readFile(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Handle different JSON structures
    if (data.$schema || data.tokens) {
      // W3C DTCG format
      return this.parseW3CDTCG(data);
    } else if (data.props || data.properties) {
      // Style Dictionary format
      return this.parseStyleDictionary(data);
    } else {
      // Simple flat structure
      return this.parseSimpleJSON(data);
    }
  }

  /**
   * Load CSS/SCSS format tokens
   * @private
   */
  async loadCSSTokens(filePath) {
    const content = await filesystem.readFile(filePath, 'utf8');
    return this.parseCSSVariables(content);
  }

  /**
   * Parse W3C DTCG format tokens
   * @private
   */
  parseW3CDTCG(data) {
    const tokens = {};
    
    if (data.tokens) {
      for (const [category, categoryData] of Object.entries(data.tokens)) {
        tokens[category] = this.flattenTokenGroup(categoryData);
      }
    }
    
    return tokens;
  }

  /**
   * Parse Style Dictionary format tokens
   * @private
   */
  parseStyleDictionary(data) {
    const tokens = {};
    const props = data.props || data.properties;
    
    for (const [category, categoryData] of Object.entries(props)) {
      tokens[category] = this.flattenTokenGroup(categoryData);
    }
    
    return tokens;
  }

  /**
   * Parse simple JSON tokens
   * @private
   */
  parseSimpleJSON(data) {
    const tokens = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'object' && value !== null) {
        tokens[key] = this.flattenTokenGroup(value);
      } else {
        tokens['custom'] = tokens['custom'] || {};
        tokens['custom'][key] = value;
      }
    }
    
    return tokens;
  }

  /**
   * Parse CSS custom properties
   * @private
   */
  parseCSSVariables(cssContent) {
    const tokens = {};
    const cssVarRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
    let match;
    
    while ((match = cssVarRegex.exec(cssContent)) !== null) {
      const [, name, value] = match;
      const category = this.categorizeToken(name);
      
      tokens[category] = tokens[category] || {};
      tokens[category][name] = {
        value: value.trim(),
        type: this.inferTokenType(value.trim())
      };
    }
    
    return tokens;
  }

  /**
   * Flatten nested token groups
   * @private
   */
  flattenTokenGroup(group, prefix = '') {
    const flattened = {};
    
    for (const [key, value] of Object.entries(group)) {
      const tokenKey = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !value.value) {
        // Nested group
        Object.assign(flattened, this.flattenTokenGroup(value, tokenKey));
      } else {
        // Actual token
        flattened[tokenKey] = typeof value === 'object' ? value : { value };
      }
    }
    
    return flattened;
  }

  /**
   * Categorize token by name
   * @private
   */
  categorizeToken(name) {
    const nameLower = name.toLowerCase();
    
    if (nameLower.includes('color') || nameLower.includes('bg') || nameLower.includes('text')) {
      return TOKEN_CATEGORIES.COLOR;
    } else if (nameLower.includes('space') || nameLower.includes('margin') || nameLower.includes('padding')) {
      return TOKEN_CATEGORIES.SPACING;
    } else if (nameLower.includes('font') || nameLower.includes('type') || nameLower.includes('text')) {
      return TOKEN_CATEGORIES.TYPOGRAPHY;
    } else if (nameLower.includes('shadow') || nameLower.includes('elevation')) {
      return TOKEN_CATEGORIES.SHADOW;
    } else if (nameLower.includes('radius') || nameLower.includes('corner') || nameLower.includes('rounded')) {
      return TOKEN_CATEGORIES.RADIUS;
    } else if (nameLower.includes('duration') || nameLower.includes('transition') || nameLower.includes('animation')) {
      return TOKEN_CATEGORIES.ANIMATION;
    } else if (nameLower.includes('breakpoint') || nameLower.includes('screen')) {
      return TOKEN_CATEGORIES.BREAKPOINT;
    } else if (nameLower.includes('z-index') || nameLower.includes('layer')) {
      return TOKEN_CATEGORIES.Z_INDEX;
    }
    
    return 'other';
  }

  /**
   * Infer token type from value
   * @private
   */
  inferTokenType(value) {
    if (typeof value === 'number') return 'number';
    if (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl')) return 'color';
    if (value.includes('px') || value.includes('rem') || value.includes('em')) return 'dimension';
    if (value.includes('ms') || value.includes('s')) return 'duration';
    if (value.match(/^\d+$/)) return 'number';
    return 'string';
  }

  /**
   * Detect token format from extension
   * @private
   */
  detectFormat(ext) {
    const formatMap = {
      'json': TOKEN_FORMATS.JSON,
      'css': TOKEN_FORMATS.CSS,
      'scss': TOKEN_FORMATS.CSS,
    };
    return formatMap[ext] || TOKEN_FORMATS.JSON;
  }

  /**
   * Validate token structure
   * @private
   */
  validateTokenStructure(tokens) {
    const issues = [];
    
    for (const [category, categoryTokens] of Object.entries(tokens)) {
      if (typeof categoryTokens !== 'object') {
        issues.push(`Category "${category}" must be an object`);
        continue;
      }
      
      for (const [tokenName, tokenData] of Object.entries(categoryTokens)) {
        if (!tokenData.value && typeof tokenData !== 'string' && typeof tokenData !== 'number') {
          issues.push(`Token "${category}.${tokenName}" missing required "value" property`);
        }
      }
    }
    
    if (issues.length > 0) {
      throw new AtomixCLIError(
        `Token validation failed:\n${issues.join('\n')}`,
        'TOKEN_VALIDATION_FAILED',
        ['Fix the listed token structure issues']
      );
    }
  }

  /**
   * Merge multiple token sets
   * @private
   */
  mergeTokens(existing, newTokens) {
    const merged = { ...existing };
    
    for (const [category, categoryTokens] of Object.entries(newTokens)) {
      merged[category] = {
        ...(merged[category] || {}),
        ...categoryTokens
      };
    }
    
    return merged;
  }

  /**
   * Get token by name
   * @param {string} name - Token name (e.g., "color.primary.500")
   * @returns {Object|null} Token data or null if not found
   */
  getToken(name) {
    const parts = name.split('.');
    let current = this.tokens;
    
    for (const part of parts) {
      if (!current[part]) return null;
      current = current[part];
    }
    
    return typeof current === 'object' ? current : { value: current };
  }

  /**
   * Get all tokens in a category
   * @param {string} category - Token category
   * @returns {Object} Category tokens
   */
  getCategoryTokens(category) {
    return this.tokens[category] || {};
  }

  /**
   * Get all loaded tokens
   * @returns {Object} All tokens
   */
  getAllTokens() {
    return this.tokens;
  }

  /**
   * Export tokens to specified format
   * @param {string} format - Export format
   * @param {Object} options - Export options
   * @returns {string} Exported tokens
   */
  exportTokens(format, options = {}) {
    switch (format) {
      case TOKEN_FORMATS.JSON:
        return this.exportToJSON(options);
      case TOKEN_FORMATS.CSS:
        return this.exportToCSS(options);
      case TOKEN_FORMATS.W3C_DTCG:
        return this.exportToW3CDTCG(options);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Export to JSON format
   * @private
   */
  exportToJSON(options = {}) {
    const { pretty = true } = options;
    return pretty 
      ? JSON.stringify(this.tokens, null, 2)
      : JSON.stringify(this.tokens);
  }

  /**
   * Export to CSS custom properties
   * @private
   */
  exportToCSS(options = {}) {
    const { selector = ':root', prefix = '' } = options;
    const lines = [`${selector} {`];
    
    for (const [category, categoryTokens] of Object.entries(this.tokens)) {
      for (const [tokenName, tokenData] of Object.entries(categoryTokens)) {
        const value = typeof tokenData === 'object' ? tokenData.value : tokenData;
        const varName = prefix ? `${prefix}-${category}-${tokenName}` : `${category}-${tokenName}`;
        lines.push(`  --${varName}: ${value};`);
      }
    }
    
    lines.push('}');
    return lines.join('\n');
  }

  /**
   * Export to W3C DTCG format
   * @private
   */
  exportToW3CDTCG(options = {}) {
    return {
      $schema: 'https://design-tokens.org/schema.json',
      tokens: this.tokens
    };
  }
}

/**
 * Create a singleton token provider instance
 */
export const tokenProvider = new TokenProvider();

export default tokenProvider;
