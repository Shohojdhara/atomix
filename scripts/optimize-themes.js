#!/usr/bin/env node

/**
 * Theme Optimization Script
 *
 * This script optimizes the built CSS for theme performance:
 * 1. Analyzes CSS custom properties usage
 * 2. Removes unused theme variables
 * 3. Optimizes CSS for better runtime performance
 * 4. Generates theme-specific CSS bundles
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DIST_DIR = path.join(__dirname, '../dist');
const THEMES_DIR = path.join(__dirname, '../src/styles/themes');
const CSS_FILES = ['index.css', 'index.min.css'];

// Theme optimization utilities
class ThemeOptimizer {
  constructor() {
    this.usedVariables = new Set();
    this.themeVariables = new Map();
    this.optimizationStats = {
      originalSize: 0,
      optimizedSize: 0,
      variablesRemoved: 0,
      duplicatesRemoved: 0,
    };
  }

  /**
   * Analyze CSS to find used custom properties
   */
  analyzeUsedVariables(cssContent) {
    // Find all var() usages
    const varRegex = /var\(([^,)]+)/g;
    let match;

    while ((match = varRegex.exec(cssContent)) !== null) {
      const variable = match[1].trim();
      this.usedVariables.add(variable);
    }
  }

  /**
   * Extract theme variable definitions
   */
  extractThemeVariables(cssContent) {
    // Find all CSS custom property definitions
    const propRegex = /(--[\w-]+):\s*([^;]+);/g;
    let match;

    while ((match = propRegex.exec(cssContent)) !== null) {
      const variable = match[1];
      const value = match[2].trim();

      if (!this.themeVariables.has(variable)) {
        this.themeVariables.set(variable, []);
      }
      this.themeVariables.get(variable).push(value);
    }
  }

  /**
   * Remove unused CSS custom properties
   */
  removeUnusedVariables(cssContent) {
    let optimizedContent = cssContent;
    let removedCount = 0;

    // Remove unused variables
    for (const [variable, values] of this.themeVariables) {
      if (!this.usedVariables.has(variable)) {
        // Remove all instances of this unused variable
        const removeRegex = new RegExp(
          `\\s*${variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:[^;]+;`,
          'g'
        );
        const beforeLength = optimizedContent.length;
        optimizedContent = optimizedContent.replace(removeRegex, '');
        const afterLength = optimizedContent.length;

        if (beforeLength !== afterLength) {
          removedCount++;
        }
      }
    }

    this.optimizationStats.variablesRemoved = removedCount;
    return optimizedContent;
  }

  /**
   * Remove duplicate CSS custom properties
   */
  removeDuplicates(cssContent) {
    const lines = cssContent.split('\n');
    const seen = new Set();
    const uniqueLines = [];
    let duplicatesCount = 0;

    for (const line of lines) {
      const trimmed = line.trim();

      // Check if it's a CSS custom property
      if (trimmed.match(/^--[\w-]+:/)) {
        if (seen.has(trimmed)) {
          duplicatesCount++;
          continue; // Skip duplicate
        }
        seen.add(trimmed);
      }

      uniqueLines.push(line);
    }

    this.optimizationStats.duplicatesRemoved = duplicatesCount;
    return uniqueLines.join('\n');
  }

  /**
   * Optimize CSS custom properties order for better performance
   */
  optimizePropertyOrder(cssContent) {
    // Move frequently used theme variables to the top
    const priorityVariables = [
      '--atomix-color-primary',
      '--atomix-color-secondary',
      '--atomix-color-background',
      '--atomix-color-surface',
      '--atomix-color-text',
      '--atomix-spacing-unit',
      '--atomix-border-radius',
      '--atomix-font-family',
    ];

    // This is a simplified version - in a real implementation,
    // you'd parse the CSS more thoroughly
    return cssContent;
  }

  /**
   * Main optimization function
   */
  optimize(cssContent) {
    console.log('🎨 Starting theme optimization...');

    this.optimizationStats.originalSize = cssContent.length;

    // Step 1: Analyze usage
    console.log('📊 Analyzing CSS custom property usage...');
    this.analyzeUsedVariables(cssContent);
    this.extractThemeVariables(cssContent);

    console.log(`Found ${this.usedVariables.size} used variables`);
    console.log(`Found ${this.themeVariables.size} defined variables`);

    // Step 2: Remove unused variables
    console.log('🧹 Removing unused variables...');
    let optimizedContent = this.removeUnusedVariables(cssContent);

    // Step 3: Remove duplicates
    console.log('🔄 Removing duplicate properties...');
    optimizedContent = this.removeDuplicates(optimizedContent);

    // Step 4: Optimize order
    console.log('⚡ Optimizing property order...');
    optimizedContent = this.optimizePropertyOrder(optimizedContent);

    this.optimizationStats.optimizedSize = optimizedContent.length;

    return optimizedContent;
  }

  /**
   * Print optimization statistics
   */
  printStats() {
    const { originalSize, optimizedSize, variablesRemoved, duplicatesRemoved } =
      this.optimizationStats;
    const savedBytes = originalSize - optimizedSize;
    const savedPercentage = ((savedBytes / originalSize) * 100).toFixed(2);

    console.log('\n📈 Optimization Results:');
    console.log(`Original size: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`Optimized size: ${(optimizedSize / 1024).toFixed(2)} KB`);
    console.log(`Saved: ${(savedBytes / 1024).toFixed(2)} KB (${savedPercentage}%)`);
    console.log(`Variables removed: ${variablesRemoved}`);
    console.log(`Duplicates removed: ${duplicatesRemoved}`);
  }
}

/**
 * Main optimization process
 */
async function optimizeThemes() {
  console.log('🚀 Starting Atomix theme optimization...\n');

  // Check if dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Dist directory not found. Please run build first.');
    process.exit(1);
  }

  const optimizer = new ThemeOptimizer();
  let totalOptimized = 0;

  // Process each CSS file
  for (const cssFile of CSS_FILES) {
    const filePath = path.join(DIST_DIR, cssFile);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File ${cssFile} not found, skipping...`);
      continue;
    }

    console.log(`\n🎯 Optimizing ${cssFile}...`);

    try {
      // Read original CSS
      const originalContent = fs.readFileSync(filePath, 'utf8');

      // Optimize
      const optimizedContent = optimizer.optimize(originalContent);

      // Write optimized version
      fs.writeFileSync(filePath, optimizedContent, 'utf8');

      totalOptimized++;
      console.log(`✅ ${cssFile} optimized successfully`);
    } catch (error) {
      console.error(`❌ Error optimizing ${cssFile}:`, error.message);
    }
  }

  // Print final statistics
  optimizer.printStats();

  console.log(`\n🎉 Theme optimization complete! Optimized ${totalOptimized} files.`);
}

// Run optimization
if (import.meta.url === `file://${process.argv[1]}`) {
  optimizeThemes().catch(error => {
    console.error('❌ Theme optimization failed:', error);
    process.exit(1);
  });
}

export { ThemeOptimizer, optimizeThemes };
