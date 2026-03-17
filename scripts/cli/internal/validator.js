/**
 * Atomix CLI Validator Logic
 * Core validation logic for A11y, Tokens, and Performance
 */

import { readFile, readdir } from 'fs/promises';
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
    // Skip if alt uses JSX expression syntax like alt={variable} or alt={string}
    const hasAltAttribute = /<img[^>]*\salt=\{[^}]+\}/i.test(content); // JSX expression
    const hasValidAltString = /<img[^>]+alt=["'][^"']+["'][^>]*>/i.test(content); // Valid string alt
    const hasEmptyAltString = /<img[^>]+alt=["']\s*["'][^>]*>/i.test(content); // Empty string alt
    const hasNoAltAttribute = /<img[^>]+(?!alt=)[^>]*>/i.test(content) && !hasAltAttribute;
    
    if ((hasNoAltAttribute || hasEmptyAltString) && !(hasAltAttribute || hasValidAltString)) {
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
  const themeDir = join(projectRoot, 'src/styles/01-settings');
  
  if (!existsSync(themeDir)) {
    issues.push({
      file: 'src/styles/01-settings',
      type: 'Tokens',
      message: 'Design token settings directory missing',
      severity: 'error'
    });
    return issues;
  }

  // Check for hardcoded colors in SCSS files
  const scssFiles = await glob('src/**/*.scss', { cwd: projectRoot });
  for (const file of scssFiles) {
    const content = await readFile(join(projectRoot, file), 'utf8');
    
    // Skip variable definitions (lines with $variable:)
    const lines = content.split('\n');
    const hardcodedColors = [];
    
    for (const line of lines) {
      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('/*')) continue;
      
      // Skip variable definitions (these SHOULD have hex values)
      if (/^\s*\$[\w-]+:\s*#[\da-fA-F]{3,6}/.test(line)) continue;
      
      // Skip CSS var() fallbacks (these are good practices)
      if (/var\([^)]+#[\da-fA-F]{3,6}/.test(line)) continue;
      
      // Skip url(), data URIs, and other non-color contexts
      if (/url\(/.test(line)) continue;
      
      // Check for actual hardcoded colors in property values
      const hexMatch = line.match(/(?<!\$[\w-]*:\s*)(?<!var\([^)]*)#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})\b(?!;)/g);
      if (hexMatch) {
        hardcodedColors.push(...hexMatch);
      }
    }
    
    if (hardcodedColors.length > 0) {
      issues.push({
        file,
        type: 'Tokens',
        message: `Hardcoded hex color(s) found: ${hardcodedColors.join(', ')}. Use variables or tokens.`,
        severity: 'warn'
      });
    }
  }

  return issues;
}

/**
 * Validate a single component: structure, A11y, and token usage
 * @param {string} componentName - PascalCase component name (e.g. Button)
 * @param {string} projectRoot - Project root directory
 * @returns {Promise<{ valid: boolean, issues: Array<{type, severity, file, message}>, component: string }>}
 */
export async function validateComponent(componentName, projectRoot = process.cwd()) {
  const issues = [];
  const componentsBase = join(projectRoot, 'src/components');
  let componentDir = null;

  if (!existsSync(componentsBase)) {
    return {
      valid: false,
      issues: [{
        type: 'Structure',
        severity: 'error',
        file: 'src/components',
        message: 'Components directory not found. Expected src/components/<ComponentName>/'
      }],
      component: componentName
    };
  }

  const entries = await readdir(componentsBase, { withFileTypes: true });
  const match = entries.find(
    (e) => e.isDirectory() && e.name.toLowerCase() === componentName.toLowerCase()
  );
  if (!match) {
    return {
      valid: false,
      issues: [{
        type: 'Structure',
        severity: 'error',
        file: `src/components/${componentName}`,
        message: `Component directory not found. Looked in src/components/ for "${componentName}".`
      }],
      component: componentName
    };
  }
  componentDir = join(componentsBase, match.name);
  const componentFiles = await glob(`${match.name}/**/*.{tsx,jsx,html}`, {
    cwd: componentsBase,
    absolute: false
  });
  const fullPaths = componentFiles.map((f) => join(projectRoot, 'src/components', f));

  // A11y on component files only
  for (let i = 0; i < fullPaths.length; i++) {
    const file = fullPaths[i];
    const content = await readFile(file, 'utf8');
    const relativeFile = join('src/components', componentFiles[i]);
    // Check for missing alt on images (improved JSX handling)
    const hasAltAttribute = /<img[^>]*\salt=\{[^}]+\}/i.test(content); // JSX expression
    const hasValidAltString = /<img[^>]+alt=["'][^"']+["'][^>]*>/i.test(content); // Valid string alt
    const hasEmptyAltString = /<img[^>]+alt=["']\s*["'][^>]*>/i.test(content); // Empty string alt
    const hasNoAltAttribute = /<img[^>]+(?!alt=)[^>]*>/i.test(content) && !hasAltAttribute;
    
    if ((hasNoAltAttribute || hasEmptyAltString) && !(hasAltAttribute || hasValidAltString)) {
      issues.push({
        file: relativeFile,
        type: 'A11y',
        message: 'Missing or empty alt attribute on <img> tag',
        severity: 'error'
      });
    }
    if (/<button[^>]*>\s*<\/button>/i.test(content) && !/aria-label=/i.test(content)) {
      issues.push({
        file: relativeFile,
        type: 'A11y',
        message: 'Button without text content or aria-label',
        severity: 'warn'
      });
    }
  }

  // Token usage: component settings and component SCSS
  const settingsPath = join(projectRoot, 'src/styles/01-settings');
  const compStylesPath = join(projectRoot, 'src/styles/06-components');
  const settingsFile = join(settingsPath, `_settings.${match.name.toLowerCase()}.scss`);
  const compFile = join(compStylesPath, `_components.${match.name.toLowerCase()}.scss`);
  for (const scssPath of [settingsFile, compFile]) {
    if (!existsSync(scssPath)) continue;
    const content = await readFile(scssPath, 'utf8');
    const hexMatch = content.match(/(?<![$/*])#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})\b/g);
    if (hexMatch) {
      issues.push({
        file: scssPath.replace(projectRoot, '').replace(/^\//, '') || scssPath,
        type: 'Tokens',
        message: `Hardcoded hex color(s): ${hexMatch.join(', ')}. Use --atomix-* or project tokens.`,
        severity: 'warn'
      });
    }
  }

  // Main component file exists
  const mainExts = ['.tsx', '.jsx'];
  let mainExists = false;
  for (const ext of mainExts) {
    if (existsSync(join(componentDir, `${match.name}${ext}`))) {
      mainExists = true;
      break;
    }
  }
  if (!mainExists) {
    issues.push({
      type: 'Structure',
      severity: 'error',
      file: join('src/components', match.name),
      message: `Main component file not found (e.g. ${match.name}.tsx)`
    });
  }

  return {
    valid: issues.filter((i) => i.severity === 'error').length === 0,
    issues,
    component: match.name
  };
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
