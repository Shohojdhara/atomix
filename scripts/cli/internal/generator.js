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
    const componentPath = join(outputPath, name);

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
    if (!content.includes('displayName')) issues.push('Missing displayName');
    if (!content.includes('aria-')) issues.push('Missing accessibility attributes');

    return {
      valid: issues.length === 0,
      issues
    };
  }
};
