#!/usr/bin/env node

/**
 * Theme Validation Script
 *
 * This script validates the Shaj theme system for:
 * 1. WCAG 2.1 AA accessibility compliance
 * 2. Color contrast ratios
 * 3. Theme consistency across variants
 * 4. CSS custom properties integrity
 * 5. Performance benchmarks
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const THEMES_DIR = path.join(__dirname, '../src/styles/themes/base');
const DIST_DIR = path.join(__dirname, '../dist');
const VALIDATION_CONFIG = {
  minContrastRatio: 4.5, // WCAG AA standard
  minLargeTextRatio: 3.0, // WCAG AA for large text
  maxCssVariables: 500, // Performance threshold
  maxFileSize: 1024 * 1024, // 1MB limit
};

// Color utilities
class ColorUtils {
  /**
   * Convert hex color to RGB
   */
  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  /**
   * Convert RGB to relative luminance
   */
  static getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  /**
   * Calculate contrast ratio between two colors
   */
  static getContrastRatio(color1, color2) {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);

    if (!rgb1 || !rgb2) return 0;

    const lum1 = this.getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = this.getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
  }

  /**
   * Check if contrast ratio meets WCAG standards
   */
  static isAccessible(foreground, background, isLargeText = false) {
    const ratio = this.getContrastRatio(foreground, background);
    const minRatio = isLargeText
      ? VALIDATION_CONFIG.minLargeTextRatio
      : VALIDATION_CONFIG.minContrastRatio;
    return {
      ratio,
      passes: ratio >= minRatio,
      level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA Large' : 'Fail',
    };
  }
}

// Theme validator
class ThemeValidator {
  constructor() {
    this.results = {
      accessibility: {
        passed: 0,
        failed: 0,
        warnings: 0,
        issues: [],
      },
      consistency: {
        passed: 0,
        failed: 0,
        issues: [],
      },
      performance: {
        passed: 0,
        failed: 0,
        issues: [],
      },
      overall: 'pending',
    };

    this.themes = new Map();
    this.cssVariables = new Set();
  }

  /**
   * Load and parse theme files
   */
  loadThemes() {
    console.log('📂 Loading theme files...');

    const themeFiles = [
      '_shaj-default.scss',
      '_shaj-ocean.scss',
      '_shaj-sunset.scss',
      '_shaj-forest.scss',
      '_shaj-midnight.scss',
      '_shaj-pastel.scss',
    ];

    for (const file of themeFiles) {
      const filePath = path.join(THEMES_DIR, file);

      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const themeName = file.replace(/^_/, '').replace('.scss', '');
        this.themes.set(themeName, this.parseThemeContent(content));
        console.log(`✅ Loaded ${themeName}`);
      } else {
        console.log(`⚠️  Theme file ${file} not found`);
      }
    }

    console.log(`Loaded ${this.themes.size} themes\n`);
  }

  /**
   * Parse theme content to extract variables
   */
  parseThemeContent(content) {
    const variables = new Map();
    const varRegex = /(--[\w-]+):\s*([^;]+);/g;
    let match;

    while ((match = varRegex.exec(content)) !== null) {
      const variable = match[1];
      const value = match[2].trim();
      variables.set(variable, value);
      this.cssVariables.add(variable);
    }

    return variables;
  }

  /**
   * Validate accessibility compliance
   */
  validateAccessibility() {
    console.log('♿ Validating accessibility compliance...');

    for (const [themeName, variables] of this.themes) {
      console.log(`\n🎨 Checking ${themeName}...`);

      // Get key colors for testing
      const primaryColor = this.extractColor(variables.get('--atomix-color-primary-600'));
      const backgroundColor = this.extractColor(variables.get('--atomix-color-background'));
      const textColor = this.extractColor(variables.get('--atomix-color-text'));
      const surfaceColor = this.extractColor(variables.get('--atomix-color-surface'));

      // Test primary text on background
      if (textColor && backgroundColor) {
        const result = ColorUtils.isAccessible(textColor, backgroundColor);
        this.logAccessibilityResult('Text on Background', result, themeName);
      }

      // Test primary button contrast
      if (primaryColor && backgroundColor) {
        const result = ColorUtils.isAccessible('#ffffff', primaryColor);
        this.logAccessibilityResult('Primary Button Text', result, themeName);
      }

      // Test surface contrast
      if (textColor && surfaceColor) {
        const result = ColorUtils.isAccessible(textColor, surfaceColor);
        this.logAccessibilityResult('Text on Surface', result, themeName);
      }
    }
  }

  /**
   * Extract color value from CSS variable value
   */
  extractColor(value) {
    if (!value) return null;

    // Handle hex colors
    const hexMatch = value.match(/#[a-fA-F0-9]{6}/);
    if (hexMatch) return hexMatch[0];

    // Handle rgb/rgba colors - simplified extraction
    const rgbMatch = value.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch;
      return `#${parseInt(r).toString(16).padStart(2, '0')}${parseInt(g).toString(16).padStart(2, '0')}${parseInt(b).toString(16).padStart(2, '0')}`;
    }

    return null;
  }

  /**
   * Log accessibility test result
   */
  logAccessibilityResult(testName, result, themeName) {
    const status = result.passes ? '✅' : '❌';
    const message = `${status} ${testName}: ${result.ratio.toFixed(2)}:1 (${result.level})`;

    console.log(`  ${message}`);

    if (result.passes) {
      this.results.accessibility.passed++;
    } else {
      this.results.accessibility.failed++;
      this.results.accessibility.issues.push({
        theme: themeName,
        test: testName,
        ratio: result.ratio,
        level: result.level,
      });
    }
  }

  /**
   * Validate theme consistency
   */
  validateConsistency() {
    console.log('\n🔄 Validating theme consistency...');

    // Check that all themes have the same variables
    const allVariables = new Set();
    const themeVariables = new Map();

    for (const [themeName, variables] of this.themes) {
      const varSet = new Set(variables.keys());
      themeVariables.set(themeName, varSet);

      for (const variable of varSet) {
        allVariables.add(variable);
      }
    }

    // Check for missing variables in any theme
    for (const [themeName, variables] of themeVariables) {
      const missing = [];

      for (const variable of allVariables) {
        if (!variables.has(variable)) {
          missing.push(variable);
        }
      }

      if (missing.length > 0) {
        console.log(`❌ ${themeName} missing variables: ${missing.join(', ')}`);
        this.results.consistency.failed++;
        this.results.consistency.issues.push({
          theme: themeName,
          type: 'missing_variables',
          variables: missing,
        });
      } else {
        console.log(`✅ ${themeName} has all required variables`);
        this.results.consistency.passed++;
      }
    }
  }

  /**
   * Validate performance metrics
   */
  validatePerformance() {
    console.log('\n⚡ Validating performance metrics...');

    // Check CSS variables count
    const variableCount = this.cssVariables.size;
    console.log(`CSS Variables: ${variableCount}/${VALIDATION_CONFIG.maxCssVariables}`);

    if (variableCount <= VALIDATION_CONFIG.maxCssVariables) {
      console.log('✅ CSS variables count within limits');
      this.results.performance.passed++;
    } else {
      console.log('❌ Too many CSS variables - may impact performance');
      this.results.performance.failed++;
      this.results.performance.issues.push({
        type: 'css_variables_limit',
        count: variableCount,
        limit: VALIDATION_CONFIG.maxCssVariables,
      });
    }

    // Check built CSS file sizes
    if (fs.existsSync(DIST_DIR)) {
      const cssFiles = ['index.css', 'index.min.css'].filter(file =>
        fs.existsSync(path.join(DIST_DIR, file))
      );

      for (const file of cssFiles) {
        const filePath = path.join(DIST_DIR, file);
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log(`${file}: ${sizeKB} KB`);

        if (stats.size <= VALIDATION_CONFIG.maxFileSize) {
          console.log(`✅ ${file} size within limits`);
          this.results.performance.passed++;
        } else {
          console.log(`❌ ${file} too large (${sizeMB} MB)`);
          this.results.performance.failed++;
          this.results.performance.issues.push({
            type: 'file_size_limit',
            file,
            size: stats.size,
            limit: VALIDATION_CONFIG.maxFileSize,
          });
        }
      }
    }
  }

  /**
   * Generate validation report
   */
  generateReport() {
    console.log('\n📊 Validation Report');
    console.log('='.repeat(50));

    const { accessibility, consistency, performance } = this.results;

    // Accessibility summary
    console.log('\n♿ Accessibility:');
    console.log(`  Passed: ${accessibility.passed}`);
    console.log(`  Failed: ${accessibility.failed}`);
    if (accessibility.issues.length > 0) {
      console.log('  Issues:');
      accessibility.issues.forEach(issue => {
        console.log(`    - ${issue.theme}: ${issue.test} (${issue.ratio.toFixed(2)}:1)`);
      });
    }

    // Consistency summary
    console.log('\n🔄 Consistency:');
    console.log(`  Passed: ${consistency.passed}`);
    console.log(`  Failed: ${consistency.failed}`);
    if (consistency.issues.length > 0) {
      console.log('  Issues:');
      consistency.issues.forEach(issue => {
        console.log(`    - ${issue.theme}: ${issue.type}`);
      });
    }

    // Performance summary
    console.log('\n⚡ Performance:');
    console.log(`  Passed: ${performance.passed}`);
    console.log(`  Failed: ${performance.failed}`);
    if (performance.issues.length > 0) {
      console.log('  Issues:');
      performance.issues.forEach(issue => {
        console.log(`    - ${issue.type}: ${issue.file || 'N/A'}`);
      });
    }

    // Overall result
    const totalFailed = accessibility.failed + consistency.failed + performance.failed;
    this.results.overall = totalFailed === 0 ? 'passed' : 'failed';

    console.log('\n📈 Overall Result:');
    if (this.results.overall === 'passed') {
      console.log('✅ All validations passed!');
    } else {
      console.log(`❌ ${totalFailed} validation(s) failed`);
    }

    return this.results.overall === 'passed';
  }

  /**
   * Run all validations
   */
  async validate() {
    console.log('🚀 Starting Atomix theme validation...\n');

    try {
      this.loadThemes();
      this.validateAccessibility();
      this.validateConsistency();
      this.validatePerformance();

      const success = this.generateReport();

      console.log('\n🎉 Theme validation complete!');
      return success;
    } catch (error) {
      console.error('❌ Theme validation failed:', error);
      return false;
    }
  }
}

// Main validation process
async function validateThemes() {
  const validator = new ThemeValidator();
  const success = await validator.validate();

  if (!success) {
    process.exit(1);
  }
}

// Run validation
if (import.meta.url === `file://${process.argv[1]}`) {
  validateThemes().catch(error => {
    console.error('❌ Theme validation failed:', error);
    process.exit(1);
  });
}

export { ColorUtils, ThemeValidator, validateThemes };
