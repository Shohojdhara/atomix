/**
 * Component Structure Validator
 * Enforces Atomix design system architecture patterns
 */

import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { logger } from '../utils/logger.js';
import { AtomixCLIError } from '../utils/error.js';

/**
 * Component validation rule severity levels
 */
export const COMPONENT_SEVERITY = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

/**
 * Required component structure rules
 */
export const COMPONENT_RULES = {
  /**
   * forwardRef usage - All components must use forwardRef
   */
  FORWARD_REF_REQUIRED: {
    name: 'forward-ref-required',
    description: 'Components must use forwardRef for accessibility and ref forwarding',
    severity: COMPONENT_SEVERITY.ERROR,
    validate: (content) => {
      const issues = [];
      
      if (!content.includes('forwardRef')) {
        issues.push({
          rule: 'forward-ref-required',
          message: 'Component missing forwardRef wrapper',
          suggestion: 'Wrap component with forwardRef<HTMLDivElement, ComponentProps>',
          severity: COMPONENT_SEVERITY.ERROR
        });
      }
      
      return issues;
    }
  },

  /**
   * displayName assignment - Required for debugging
   */
  DISPLAY_NAME_REQUIRED: {
    name: 'display-name-required',
    description: 'Components must have displayName property',
    severity: COMPONENT_SEVERITY.ERROR,
    validate: (content, componentName) => {
      const issues = [];
      const displayNamePattern = new RegExp(`${componentName}\\.displayName\\s*=\\s*['"]${componentName}['"]`);
      
      if (!displayNamePattern.test(content)) {
        issues.push({
          rule: 'display-name-required',
          message: `Missing or incorrect displayName assignment`,
          suggestion: `Add: ${componentName}.displayName = '${componentName}';`,
          severity: COMPONENT_SEVERITY.ERROR
        });
      }
      
      return issues;
    }
  },

  /**
   * JSDoc documentation - Required for all components
   */
  JSDOC_REQUIRED: {
    name: 'jsdoc-required',
    description: 'Components must have JSDoc documentation',
    severity: COMPONENT_SEVERITY.WARNING,
    validate: (content) => {
      const issues = [];
      
      // Check for JSDoc comment block
      if (!/\/\*\*[\s\S]*?\*\//.test(content)) {
        issues.push({
          rule: 'jsdoc-required',
          message: 'Component missing JSDoc documentation',
          suggestion: 'Add JSDoc comment with @param and @returns tags',
          severity: COMPONENT_SEVERITY.WARNING
        });
      }
      
      return issues;
    }
  },

  /**
   * TypeScript Props interface/type - Type safety required
   */
  TYPESCRIPT_TYPES_REQUIRED: {
    name: 'typescript-types-required',
    description: 'Components must define Props interface or type',
    severity: COMPONENT_SEVERITY.ERROR,
    validate: (content, componentName) => {
      const issues = [];
      const propsPattern = new RegExp(`(interface|type)\\s+${componentName}Props`);
      
      // Check if Props type is defined locally OR imported
      const hasLocalDef = propsPattern.test(content);
      const hasImport = new RegExp(`import.*{.*${componentName}Props.*}`).test(content);
      
      if (!hasLocalDef && !hasImport) {
        issues.push({
          rule: 'typescript-types-required',
          message: `Missing ${componentName}Props type/interface definition or import`,
          suggestion: `Define interface ${componentName}Props { ... } or import it`,
          severity: COMPONENT_SEVERITY.ERROR
        });
      }
      
      return issues;
    }
  },

  /**
   * Accessibility attributes - ARIA support required
   */
  ACCESSIBILITY_ATTRIBUTES: {
    name: 'accessibility-attributes',
    description: 'Components should include accessibility attributes',
    severity: COMPONENT_SEVERITY.WARNING,
    validate: (content) => {
      const issues = [];
      
      // Check for aria-* attributes
      const hasAriaAttributes = /aria-[a-z]+/.test(content);
      
      // Check for role attribute
      const hasRole = /role=["'][^"']+["']/.test(content);
      
      // Check for tabIndex
      const hasTabIndex = /tabIndex/.test(content);
      
      if (!hasAriaAttributes && !hasRole && !hasTabIndex) {
        issues.push({
          rule: 'accessibility-attributes',
          message: 'Component missing accessibility attributes',
          suggestion: 'Add aria-label, aria-describedby, role, or tabIndex as appropriate',
          severity: COMPONENT_SEVERITY.WARNING
        });
      }
      
      return issues;
    }
  },

  /**
   * No hardcoded colors - Design token enforcement
   */
  NO_HARDCODED_COLORS: {
    name: 'no-hardcoded-colors',
    description: 'Components must use design tokens instead of hardcoded colors',
    severity: COMPONENT_SEVERITY.ERROR,
    validate: (content) => {
      const issues = [];
      
      // Check for hex colors
      const hexColorRegex = /#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})\b/g;
      const hexMatches = content.match(hexColorRegex) || [];
      
      // Check for RGB/RGBA colors
      const rgbRegex = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)/gi;
      const rgbMatches = content.match(rgbRegex) || [];
      
      // Check for HSL/HSLA colors
      const hslRegex = /hsla?\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*(,\s*[\d.]+\s*)?\)/gi;
      const hslMatches = content.match(hslRegex) || [];
      
      const allMatches = [...hexMatches, ...rgbMatches, ...hslMatches];
      
      if (allMatches.length > 0) {
        issues.push({
          rule: 'no-hardcoded-colors',
          message: `Found ${allMatches.length} hardcoded color(s): ${allMatches.slice(0, 3).join(', ')}${allMatches.length > 3 ? '...' : ''}`,
          suggestion: 'Replace with design tokens (e.g., var(--color-primary) or theme.colors.primary)',
          severity: COMPONENT_SEVERITY.ERROR,
          matches: allMatches
        });
      }
      
      return issues;
    }
  },

  /**
   * Memo usage - Performance optimization
   */
  MEMO_USAGE: {
    name: 'memo-usage',
    description: 'Components should use React.memo for performance',
    severity: COMPONENT_SEVERITY.INFO,
    validate: (content) => {
      const issues = [];
      
      if (!content.includes('memo') && !content.includes('React.memo')) {
        issues.push({
          rule: 'memo-usage',
          message: 'Component not wrapped in React.memo',
          suggestion: 'Consider using React.memo() for performance optimization',
          severity: COMPONENT_SEVERITY.INFO
        });
      }
      
      return issues;
    }
  },

  /**
   * Composable hook pattern - Atomix architecture
   */
  COMPOSABLE_HOOK_PATTERN: {
    name: 'composable-hook-pattern',
    description: 'Components should use composable hook pattern',
    severity: COMPONENT_SEVERITY.INFO,
    validate: (content, componentName) => {
      const issues = [];
      
      const hookPattern = new RegExp(`use${componentName}`);
      
      if (!hookPattern.test(content)) {
        issues.push({
          rule: 'composable-hook-pattern',
          message: `Component not using composable hook (use${componentName})`,
          suggestion: `Create and use lib/composables/use${componentName} hook`,
          severity: COMPONENT_SEVERITY.INFO
        });
      }
      
      return issues;
    }
  },

  /**
   * Theme naming utility - Consistent class names
   */
  THEME_NAMING_USAGE: {
    name: 'theme-naming-usage',
    description: 'Components should use ThemeNaming utility for class names',
    severity: COMPONENT_SEVERITY.INFO,
    validate: (content) => {
      const issues = [];
      
      // Check for ThemeNaming import or usage
      const hasThemeNaming = /ThemeNaming\./.test(content) || /themeNaming\./.test(content);
      
      // Check for variantClass, sizeClass, stateClass patterns
      const hasVariantPattern = /(variant|size|state)Class/.test(content);
      
      if (!hasThemeNaming && !hasVariantPattern) {
        issues.push({
          rule: 'theme-naming-usage',
          message: 'Component not using ThemeNaming utility for variants/sizes/states',
          suggestion: 'Use ThemeNaming.variantClass(), sizeClass(), stateClass() for consistency',
          severity: COMPONENT_SEVERITY.INFO
        });
      }
      
      return issues;
    }
  }
};

/**
 * ComponentValidator class for enforcing design system architecture
 */
export class ComponentValidator {
  constructor(options = {}) {
    this.rules = new Map();
    this.enabledRules = options.enabledRules || Object.keys(COMPONENT_RULES);
    
    // Register built-in rules
    for (const [key, rule] of Object.entries(COMPONENT_RULES)) {
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
   * Validate component code against all enabled rules
   * @param {string} content - Component source code
   * @param {string} componentName - Component name (PascalCase)
   * @returns {Object} Validation results
   */
  validate(content, componentName) {
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
        const issues = rule.validate(content, componentName);
        
        if (issues.length > 0) {
          results.valid = false;
          results.issues.push(...issues);
          
          // Update summary
          for (const issue of issues) {
            if (issue.severity === COMPONENT_SEVERITY.ERROR) {
              results.summary.errors++;
            } else if (issue.severity === COMPONENT_SEVERITY.WARNING) {
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
          severity: COMPONENT_SEVERITY.WARNING
        });
      }
    }

    return results;
  }

  /**
   * Validate component from file path
   * @param {string} filePath - Path to component file
   * @param {string} componentName - Component name
   * @returns {Promise<Object>} Validation results
   */
  async validateFile(filePath, componentName) {
    if (!existsSync(filePath)) {
      throw new AtomixCLIError(
        `Component file not found: ${filePath}`,
        'FILE_NOT_FOUND',
        ['Verify the component file exists']
      );
    }

    const content = await readFile(filePath, 'utf8');
    return this.validate(content, componentName);
  }

  /**
   * Get detailed report of validation results
   * @param {Object} results - Validation results
   * @param {string} componentName - Component name
   * @returns {string} Formatted report
   */
  getReport(results, componentName) {
    const lines = [
      `\n🔍 Component Validation Report: ${componentName}`,
      '='.repeat(60),
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
      
      // Sort by severity (errors first)
      const sortedIssues = [...results.issues].sort((a, b) => {
        const severityOrder = {
          [COMPONENT_SEVERITY.ERROR]: 0,
          [COMPONENT_SEVERITY.WARNING]: 1,
          [COMPONENT_SEVERITY.INFO]: 2
        };
        return severityOrder[a.severity] - severityOrder[b.severity];
      });
      
      for (const issue of sortedIssues) {
        const icon = issue.severity === COMPONENT_SEVERITY.ERROR ? '❌' : 
                     issue.severity === COMPONENT_SEVERITY.WARNING ? '⚠️' : 'ℹ️';
        
        lines.push(`  ${icon} [${issue.rule}] ${issue.message}`);
        
        if (issue.suggestion) {
          lines.push(`     💡 ${issue.suggestion}`);
        }
      }
    }

    lines.push('='.repeat(60));
    
    return lines.join('\n');
  }
}

/**
 * Create a singleton validator instance
 */
export const componentValidator = new ComponentValidator();

export default componentValidator;
