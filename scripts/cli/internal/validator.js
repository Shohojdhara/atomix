/**
 * Atomix CLI Validator Logic
 * Core validation logic for A11y, Tokens, and Performance
 */

import { readFile } from 'fs/promises';
import { glob } from 'glob';
import { join } from 'path';
import { existsSync, statSync } from 'fs';

/**
 * Validate Accessibility (A11y)
 * Simple static analysis for common pitfalls
 */
export async function validateA11y(projectRoot = process.cwd()) {
  const issues = [];
  const files = await glob('src/**/*.{tsx,jsx,html}', { cwd: projectRoot });

  for (const file of files) {
    const content = await readFile(join(projectRoot, file), 'utf8');
    
    // Check for missing alt on images
    if (/<img[^>]+(?!alt=)[^>]*>/i.test(content) || /<img[^>]+alt=["']\s*["'][^>]*>/i.test(content)) {
      issues.push({
        file,
        type: 'A11y',
        message: 'Missing or empty alt attribute on <img> tag',
        severity: 'error'
      });
    }

    // Check for button without labels (aria-label or text)
    if (/<button[^>]*>\s*<\/button>/i.test(content) && !/aria-label=/i.test(content)) {
      issues.push({
        file,
        type: 'A11y',
        message: 'Button without text content or aria-label',
        severity: 'warn'
      });
    }
  }

  return issues;
}

/**
 * Validate Token Usage
 */
export async function validateTokens(projectRoot = process.cwd()) {
  const issues = [];
  // For now, just check if the theme directory exists and contains files
  const themeDir = join(projectRoot, 'src/styles/01-settings');
  if (!existsSync(themeDir)) {
    issues.push({
      file: 'src/styles/01-settings',
      type: 'Tokens',
      message: 'Design token settings directory missing',
      severity: 'error'
    });
  }

  return issues;
}

/**
 * Validate Performance
 * Calculate bundle size of CSS/JS if dist exists
 */
export async function validatePerformance(projectRoot = process.cwd()) {
  const issues = [];
  const distDir = join(projectRoot, 'dist');

  if (!existsSync(distDir)) {
    return [{
      file: 'dist',
      type: 'Performance',
      message: 'No build artifact found in dist/. Run build first for performance analysis.',
      severity: 'warn'
    }];
  }

  const files = await glob('dist/**/*.{js,css}', { cwd: projectRoot });
  for (const file of files) {
    const stats = statSync(join(projectRoot, file));
    const sizeKB = stats.size / 1024;

    if (sizeKB > 500) { // Arbitrary 500KB threshold
      issues.push({
        file,
        type: 'Performance',
        message: `Bundle size is large: ${sizeKB.toFixed(2)} KB`,
        severity: 'warn'
      });
    }
  }

  return issues;
}
