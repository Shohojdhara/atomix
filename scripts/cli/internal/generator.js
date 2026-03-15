/**
 * Atomix CLI Internal Generator
 * Core logic for scaffolding components and assets
 */

import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { componentTemplates } from '../templates.js';
import { detectFramework } from '../utils/detector.js';
import { filesystem } from './filesystem.js';
import { aiEngine } from './ai-engine.js';
import { 
  sanitizeInput, 
  validateComponentNameSecure, 
  RateLimiter 
} from '../utils/security.js';

export const COMPLEXITY_LEVELS = {
  SIMPLE: { name: 'simple', template: 'simple' },
  MEDIUM: { name: 'medium', template: 'medium' },
  COMPLEX: { name: 'complex', template: 'complex' }
};

export const COMPONENT_FEATURES = {
  TYPESCRIPT: { name: 'typescript', default: true },
  STORYBOOK: { name: 'storybook', default: true },
  TESTS: { name: 'tests', default: false },
  HOOK: { name: 'hook', default: true },
  STYLES: { name: 'styles', default: true },
  ACCESSIBILITY: { name: 'accessibility', default: true }
};

// Global rate limiter for AI operations
const aiRateLimiter = new RateLimiter(5, 60000); // 5 requests per minute

export const generator = {
  /**
   * Generates component files based on options
   */
  async generateComponent(name, options = {}) {
    const {
      outputPath,
      complexity = 'medium',
      features = [],
      logger
    } = options;

    // Sanitize and validate component name
    const sanitizedName = sanitizeInput(name, 'componentName');
    const validation = validateComponentNameSecure(sanitizedName);
    if (!validation.isValid) {
      throw new Error(`Component name validation failed: ${validation.error}`);
    }

    const framework = await detectFramework();
    if (logger) logger.debug(`Detected framework: ${framework}`);

    const componentPath = join(outputPath, name);
    // await mkdir(componentPath, { recursive: true }); // filesystem.writeFile handles this

    // 1. Generate Component File
    const templateName = COMPLEXITY_LEVELS[complexity.toUpperCase()]?.template || 'medium';
    let content = '';
    let ext = '.tsx';

    if (framework === 'vanilla') {
      content = componentTemplates.vanilla.component(name);
      ext = '.html';
    } else if (framework === 'next') {
      content = componentTemplates.next[templateName] ? componentTemplates.next[templateName](name) : componentTemplates.next.simple(name);
    } else {
      // Default to React
      switch (templateName) {
        case 'simple': content = componentTemplates.react.simple(name); break;
        case 'medium': content = componentTemplates.react.medium(name); break;
        case 'complex': content = componentTemplates.react.complex(name); break;
        default: content = componentTemplates.react.component(name);
      }
    }

    await filesystem.writeFile(join(componentPath, `${name}${ext}`), content, 'utf8');
    if (logger) logger.debug(`Created ${name}${ext}`);

    // 2. Index File (only for React/Next)
    if (framework !== 'vanilla') {
      await filesystem.writeFile(join(componentPath, 'index.ts'), componentTemplates.react.index(name), 'utf8');
    }

    // 3. Optional Features
    if (features.includes('storybook')) {
      await filesystem.writeFile(join(componentPath, `${name}.stories.tsx`), componentTemplates.react.story(name), 'utf8');
    }

    if (features.includes('tests')) {
      await filesystem.writeFile(join(componentPath, `${name}.test.tsx`), componentTemplates.react.test(name), 'utf8');
    }

    if (features.includes('hook') && framework !== 'vanilla') {
      const hookDir = join(outputPath, '..', 'lib', 'composables');
      await filesystem.writeFile(join(hookDir, `use${name}.ts`), componentTemplates.composable.useHook(name), 'utf8');
    }

    // 4. Styles (ITCSS)
    if (features.includes('styles')) {
      const stylesDir = join(outputPath, '..', 'styles');
      
      const settingsPath = join(stylesDir, '01-settings');
      await filesystem.writeFile(join(settingsPath, `_settings.${name.toLowerCase()}.scss`), componentTemplates.scss.settings(name), 'utf8');

      const compStylesPath = join(stylesDir, '06-components');
      await filesystem.writeFile(join(compStylesPath, `_components.${name.toLowerCase()}.scss`), componentTemplates.scss.component(name), 'utf8');
    }

    return componentPath;
  },

  /**
   * Generates component files using AI based on a prompt
   */
  async generateAIComponent(name, prompt, options = {}) {
    const { outputPath, logger } = options;
    
    // Apply rate limiting for AI operations
    const userId = process.env.USER || 'anonymous';
    if (!aiRateLimiter.checkLimit(userId)) {
      throw new Error(`Rate limit exceeded. Please wait before generating more AI components. Remaining: ${aiRateLimiter.getRemaining(userId)}`);
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name, 'componentName');
    sanitizeInput(prompt, 'prompt'); // Sanitize but use original or sanitized if needed (currently aiEngine takes name/prompt)
    
    const validation = validateComponentNameSecure(sanitizedName);
    if (!validation.isValid) {
      throw new Error(`Component name validation failed: ${validation.error}`);
    }

    const componentPath = join(outputPath, sanitizedName);

    // Call AI Engine
    const generated = await aiEngine.generateComponent(name, prompt);

    // Write component file
    await filesystem.writeFile(join(componentPath, `${name}.tsx`), generated.component, 'utf8');
    if (logger) logger.debug(`Created ${name}.tsx (AI)`);

    // Index file
    await filesystem.writeFile(join(componentPath, 'index.ts'), componentTemplates.react.index(name), 'utf8');

    // Optional files from AI
    if (generated.styles) {
      await filesystem.writeFile(join(componentPath, `${name}.scss`), generated.styles, 'utf8');
    }

    if (generated.tests) {
      await filesystem.writeFile(join(componentPath, `${name}.test.tsx`), generated.tests, 'utf8');
    }

    if (generated.stories) {
      await filesystem.writeFile(join(componentPath, `${name}.stories.tsx`), generated.stories, 'utf8');
    }

    if (generated.readme) {
      await filesystem.writeFile(join(componentPath, 'README.md'), generated.readme, 'utf8');
    }

    return componentPath;
  },

  /**
   * Validates a generated component
   */
  async validate(name, componentPath) {
    const issues = [];
    const componentFile = join(componentPath, `${name}.tsx`);
    
    if (!existsSync(componentFile)) {
      issues.push(`Target file missing: ${name}.tsx`);
      return { valid: false, issues };
    }

    const content = await readFile(componentFile, 'utf8');
    
    // 1. Check for displayName
    if (!content.includes(`${name}.displayName = '${name}';`)) {
      issues.push('Missing or incorrect displayName assignment');
    }

    // 2. Check for JSDoc documentation
    if (!/\/\*\*[\s\S]*?\*\//.test(content)) {
      issues.push('Missing JSDoc documentation for component');
    }

    // 3. Check for TypeScript type definitions (allows import or local definition)
    if (!content.includes(`interface ${name}Props`) && 
        !content.includes(`type ${name}Props`) &&
        !new RegExp(`import.*{.*${name}Props.*}`).test(content)) {
      issues.push(`Missing ${name}Props type/interface definition or import`);
    }

    // 4. Check for forwardRef usage (Rule: React templates MUST use forwardRef)
    if (!content.includes('forwardRef<')) {
      issues.push('Component should use forwardRef for accessibility and consistency');
    }

    // 5. Check for Accessibility attributes
    if (!content.includes('aria-')) {
      issues.push('Missing accessibility attributes (aria-*)');
    }

    // 6. Check for hardcoded colors
    const hardcodedColorMatch = content.match(/#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})\b/g);
    if (hardcodedColorMatch) {
      issues.push(`Hardcoded hex colors found: ${hardcodedColorMatch.join(', ')}. Use design tokens instead.`);
    }

    const rgbMatch = content.match(/rgb\((\d{1,3},\s*){2}\d{1,3}\)|rgba\((\d{1,3},\s*){3}(0|1|0\.\d+)\)/g);
    if (rgbMatch) {
      issues.push(`Hardcoded RGB(A) colors found: ${rgbMatch.join(', ')}. Use design tokens instead.`);
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }
};
