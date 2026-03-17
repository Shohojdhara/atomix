/**
 * Token Validator System
 * Validates design tokens for consistency, accessibility, and best practices
 */

import { logger } from '../../utils/logger.js';
import { AtomixCLIError } from '../../utils/error.js';

/**
 * Validation rule severity levels
 */
export const SEVERITY = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

/**
 * Built-in validation rules for design tokens
 */
export const VALIDATION_RULES = {
  /**
   * Color contrast validation
   * Ensures text colors have sufficient contrast with backgrounds
   */
  COLOR_CONTRAST: {
    name: 'color-contrast',
    description: 'Ensures color contrast meets WCAG AA standards',
    severity: SEVERITY.ERROR,
    validate: (tokens) => {
      const issues = [];
      const colorTokens = tokens.color || {};
      
      // Check common text/background combinations
      const textColors = ['text', 'foreground', 'primary', 'secondary'];
      const backgroundColors = ['background', 'bg', 'surface', 'card'];
      
      for (const textKey of textColors) {
        for (const bgKey of backgroundColors) {
          const textColor = findTokenByPartialKey(colorTokens, textKey);
          const bgColor = findTokenByPartialKey(colorTokens, bgKey);
          
          if (textColor && bgColor) {
            const contrast = calculateContrast(textColor.value, bgColor.value);
            if (contrast < 4.5) {
              issues.push({
                rule: 'color-contrast',
                message: `Insufficient contrast ratio (${contrast.toFixed(2)}:1) between ${textKey} and ${bgKey}`,
                suggestion: 'Adjust colors to meet WCAG AA standard (4.5:1 minimum)',
                severity: SEVERITY.ERROR
              });
            }
          }
        }
      }
      
      return issues;
    }
  },

  /**
   * Semantic naming validation
   * Ensures tokens use semantic names instead of literal values
   */
  SEMANTIC_NAMING: {
    name: 'semantic-naming',
    description: 'Ensures tokens use semantic names',
    severity: SEVERITY.WARNING,
    validate: (tokens) => {
      const issues = [];
      
      // Check for non-semantic color names
      const literalColorNames = ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'pink'];
      const semanticPrefixes = ['brand', 'primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info'];
      const colorTokens = tokens.color || {};
      
      for (const [tokenName, tokenData] of Object.entries(colorTokens)) {
        const nameLower = tokenName.toLowerCase();
        
        // Skip if token has semantic prefix
        const hasSemanticPrefix = semanticPrefixes.some(prefix => nameLower.startsWith(prefix));
        if (hasSemanticPrefix) continue;
        
        for (const literalName of literalColorNames) {
          // Check if literal color name appears but not as part of a semantic name
          if (nameLower.includes(literalName) && !nameLower.includes('brand')) {
            issues.push({
              rule: 'semantic-naming',
              message: `Token "color.${tokenName}" uses literal color name`,
              suggestion: `Consider using semantic names like "primary", "accent", "success" instead of "${literalName}"`,
              severity: SEVERITY.WARNING
            });
            break; // Only report once per token
          }
        }
      }
      
      return issues;
    }
  },

  /**
   * Spacing scale consistency
   * Ensures spacing tokens follow a consistent scale
   */
  SPACING_SCALE: {
    name: 'spacing-scale',
    description: 'Ensures spacing tokens follow a consistent scale',
    severity: SEVERITY.INFO,
    validate: (tokens) => {
      const issues = [];
      const spacingTokens = tokens.spacing || {};
      
      const values = Object.values(spacingTokens).map(t => 
        typeof t === 'object' ? t.value : t
      ).filter(v => typeof v === 'string');
      
      // Parse spacing values
      const numericValues = values.map(v => {
        const match = v.match(/^([\d.]+)(px|rem|em)$/);
        return match ? parseFloat(match[1]) : null;
      }).filter(v => v !== null);
      
      if (numericValues.length > 0) {
        // Check for consistent increments (e.g., multiples of 4 or 8)
        const hasConsistentScale = numericValues.every(v => v % 4 === 0 || v % 0.25 === 0);
        
        if (!hasConsistentScale) {
          issues.push({
            rule: 'spacing-scale',
            message: 'Spacing values do not follow a consistent scale',
            suggestion: 'Use a consistent scale (e.g., 4px or 8px base unit)',
            severity: SEVERITY.INFO
          });
        }
      }
      
      return issues;
    }
  },

  /**
   * No hardcoded colors in components
   * Ensures components reference tokens instead of hardcoded values
   */
  NO_HARDCODED_COLORS: {
    name: 'no-hardcoded-colors',
    description: 'Prevents hardcoded colors in component code',
    severity: SEVERITY.ERROR,
    validate: (tokens, context = {}) => {
      const issues = [];
      const { codeContent = '' } = context;
      
      // Check for hex colors
      const hexColorRegex = /#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})\b/g;
      const hexMatches = codeContent.match(hexColorRegex) || [];
      
      // Check for RGB/RGBA colors
      const rgbRegex = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)/gi;
      const rgbMatches = codeContent.match(rgbRegex) || [];
      
      // Check for HSL/HSLA colors
      const hslRegex = /hsla?\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*(,\s*[\d.]+\s*)?\)/gi;
      const hslMatches = codeContent.match(hslRegex) || [];
      
      const allMatches = [...hexMatches, ...rgbMatches, ...hslMatches];
      
      if (allMatches.length > 0) {
        issues.push({
          rule: 'no-hardcoded-colors',
          message: `Found ${allMatches.length} hardcoded color value(s): ${allMatches.slice(0, 5).join(', ')}`,
          suggestion: 'Replace hardcoded colors with design tokens (e.g., var(--color-primary))',
          severity: SEVERITY.ERROR,
          matches: allMatches
        });
      }
      
      return issues;
    }
  },

  /**
   * Token completeness validation
   * Ensures required token categories exist
   */
  TOKEN_COMPLETENESS: {
    name: 'token-completeness',
    description: 'Ensures all required token categories are present',
    severity: SEVERITY.WARNING,
    validate: (tokens) => {
      const issues = [];
      const requiredCategories = ['color', 'spacing', 'typography'];
      const optionalCategories = ['shadow', 'radius', 'animation', 'breakpoint'];
      
      for (const category of requiredCategories) {
        if (!tokens[category] || Object.keys(tokens[category]).length === 0) {
          issues.push({
            rule: 'token-completeness',
            message: `Missing required token category: "${category}"`,
            suggestion: `Add ${category} tokens to ensure design consistency`,
            severity: SEVERITY.WARNING
          });
        }
      }
      
      // Check for optional but recommended categories
      for (const category of optionalCategories) {
        if (!tokens[category]) {
          issues.push({
            rule: 'token-completeness',
            message: `Missing optional token category: "${category}"`,
            suggestion: `Consider adding ${category} tokens for enhanced theming`,
            severity: SEVERITY.INFO
          });
        }
      }
      
      return issues;
    }
  },

  /**
   * Duplicate token detection
   * Identifies tokens with identical values that might be redundant
   */
  DUPLICATE_DETECTION: {
    name: 'duplicate-detection',
    description: 'Detects potentially redundant duplicate tokens',
    severity: SEVERITY.INFO,
    validate: (tokens) => {
      const issues = [];
      const valueMap = new Map();
      
      // Flatten all tokens
      for (const [category, categoryTokens] of Object.entries(tokens)) {
        for (const [tokenName, tokenData] of Object.entries(categoryTokens)) {
          const value = typeof tokenData === 'object' ? tokenData.value : tokenData;
          const key = `${value}`;
          
          if (!valueMap.has(key)) {
            valueMap.set(key, []);
          }
          valueMap.get(key).push(`${category}.${tokenName}`);
        }
      }
      
      // Find duplicates
      for (const [value, tokenNames] of valueMap.entries()) {
        if (tokenNames.length > 1) {
          issues.push({
            rule: 'duplicate-detection',
            message: `Multiple tokens share the same value "${value}": ${tokenNames.join(', ')}`,
            suggestion: 'Consider consolidating duplicate tokens or documenting their distinct purposes',
            severity: SEVERITY.INFO
          });
        }
      }
      
      return issues;
    }
  },

  /**
   * Typography scale validation
   * Ensures typography follows a harmonious scale
   */
  TYPOGRAPHY_SCALE: {
    name: 'typography-scale',
    description: 'Ensures typography follows a harmonious scale',
    severity: SEVERITY.INFO,
    validate: (tokens) => {
      const issues = [];
      const typeTokens = tokens.typography || {};
      
      const fontSizes = Object.entries(typeTokens)
        .filter(([key]) => key.includes('size') || key.includes('heading'))
        .map(([, data]) => {
          const value = typeof data === 'object' ? data.value : data;
          const match = String(value).match(/^([\d.]+)(px|rem|em)$/);
          return match ? parseFloat(match[1]) : null;
        })
        .filter(v => v !== null);
      
      if (fontSizes.length >= 2) {
        // Check for reasonable scale ratios (between 1.2 and 1.5 is ideal)
        fontSizes.sort((a, b) => a - b);
        const ratios = [];
        
        for (let i = 1; i < fontSizes.length; i++) {
          ratios.push(fontSizes[i] / fontSizes[i - 1]);
        }
        
        const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
        
        if (avgRatio < 1.1 || avgRatio > 1.6) {
          issues.push({
            rule: 'typography-scale',
            message: `Typography scale ratio (${avgRatio.toFixed(2)}) may create visual inconsistency`,
            suggestion: 'Consider using a modular scale (1.2-1.5 ratio) for harmonious typography',
            severity: SEVERITY.INFO
          });
        }
      }
      
      return issues;
    }
  }
};

/**
 * Helper function to find token by partial key match
 * @private
 */
function findTokenByPartialKey(tokens, partialKey) {
  for (const [key, value] of Object.entries(tokens)) {
    if (key.toLowerCase().includes(partialKey.toLowerCase())) {
      return typeof value === 'object' ? value : { value };
    }
  }
  return null;
}

/**
 * Calculate contrast ratio between two colors
 * Uses WCAG 2.0 formula
 * @private
 */
function calculateContrast(color1, color2) {
  // Simple implementation - in production, use a proper color library
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get relative luminance of a color
 * @private
 */
function getLuminance(color) {
  // Simplified - assumes hex color input
  let hex = color.replace('#', '');
  
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

/**
 * TokenValidator class
 */
export class TokenValidator {
  constructor(options = {}) {
    this.rules = new Map();
    this.enabledRules = options.enabledRules || Object.keys(VALIDATION_RULES);
    
    // Register built-in rules
    for (const [key, rule] of Object.entries(VALIDATION_RULES)) {
      this.registerRule(key, rule);
    }
  }

  /**
   * Register a custom validation rule
   * @param {string} name - Rule name
   * @param {Object} rule - Rule definition
   */
  registerRule(name, rule) {
    if (!rule.name || !rule.validate || !rule.severity) {
      throw new Error(`Invalid rule "${name}": must have name, validate, and severity`);
    }
    this.rules.set(name, rule);
  }

  /**
   * Enable or disable a rule
   * @param {string} ruleName - Rule to toggle
   * @param {boolean} enabled - Whether to enable
   */
  toggleRule(ruleName, enabled) {
    if (enabled) {
      if (!this.enabledRules.includes(ruleName)) {
        this.enabledRules.push(ruleName);
      }
    } else {
      this.enabledRules = this.enabledRules.filter(r => r !== ruleName);
    }
  }

  /**
   * Validate tokens against all enabled rules
   * @param {Object} tokens - Tokens to validate
   * @param {Object} context - Additional context for validation
   * @returns {Object} Validation results
   */
  validate(tokens, context = {}) {
    const results = {
      valid: true,
      issues: [],
      summary: {
        errors: 0,
        warnings: 0,
        info: 0
      }
    };

    for (const ruleName of this.enabledRules) {
      const rule = this.rules.get(ruleName);
      
      if (!rule) {
        logger.debug(`Rule "${ruleName}" not found, skipping`);
        continue;
      }

      try {
        const issues = rule.validate(tokens, context);
        
        if (issues.length > 0) {
          results.valid = false;
          results.issues.push(...issues);
          
          // Update summary
          for (const issue of issues) {
            if (issue.severity === SEVERITY.ERROR) {
              results.summary.errors++;
            } else if (issue.severity === SEVERITY.WARNING) {
              results.summary.warnings++;
            } else {
              results.summary.info++;
            }
          }
        }
      } catch (error) {
        logger.warn(`Rule "${ruleName}" failed: ${error.message}`);
        results.issues.push({
          rule: ruleName,
          message: `Validation rule error: ${error.message}`,
          severity: SEVERITY.WARNING
        });
      }
    }

    return results;
  }

  /**
   * Validate component code against token rules
   * @param {string} codeContent - Component code
   * @param {Object} tokens - Design tokens
   * @returns {Object} Validation results
   */
  validateComponent(codeContent, tokens = {}) {
    return this.validate(tokens, { codeContent });
  }

  /**
   * Get detailed report of validation results
   * @param {Object} results - Validation results
   * @returns {string} Formatted report
   */
  getReport(results) {
    const lines = [
      '\n🔍 Token Validation Report',
      '='.repeat(50),
      `Status: ${results.valid ? '✅ PASSED' : '❌ FAILED'}`,
      '',
      'Summary:',
      `  Errors:   ${results.summary.errors}`,
      `  Warnings: ${results.summary.warnings}`,
      `  Info:     ${results.summary.info}`,
      ''
    ];

    if (results.issues.length > 0) {
      lines.push('Issues:');
      
      for (const issue of results.issues) {
        const icon = issue.severity === SEVERITY.ERROR ? '❌' : 
                     issue.severity === SEVERITY.WARNING ? '⚠️' : 'ℹ️';
        
        lines.push(`  ${icon} [${issue.rule}] ${issue.message}`);
        
        if (issue.suggestion) {
          lines.push(`     💡 ${issue.suggestion}`);
        }
      }
    }

    lines.push('='.repeat(50));
    
    return lines.join('\n');
  }
}

/**
 * Create a singleton validator instance
 */
export const tokenValidator = new TokenValidator();

export default tokenValidator;
