/**
 * Atomix CLI Internal Generator
 * Core logic for scaffolding components and assets
 */

import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { componentTemplates } from '../templates.js';

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

    const componentPath = join(outputPath, name);
    await mkdir(componentPath, { recursive: true });

    // 1. Generate Component File
    const templateName = COMPLEXITY_LEVELS[complexity.toUpperCase()]?.template || 'medium';
    let content = '';
    
    switch (templateName) {
      case 'simple': content = componentTemplates.react.simple(name); break;
      case 'medium': content = componentTemplates.react.medium(name); break;
      case 'complex': content = componentTemplates.react.complex(name); break;
      default: content = componentTemplates.react.component(name);
    }

    await writeFile(join(componentPath, `${name}.tsx`), content, 'utf8');
    if (logger) logger.debug(`Created ${name}.tsx`);

    // 2. Index File
    await writeFile(join(componentPath, 'index.ts'), componentTemplates.react.index(name), 'utf8');

    // 3. Optional Features
    if (features.includes('storybook')) {
      await writeFile(join(componentPath, `${name}.stories.tsx`), componentTemplates.react.story(name), 'utf8');
    }

    if (features.includes('tests')) {
      await writeFile(join(componentPath, `${name}.test.tsx`), componentTemplates.react.test(name), 'utf8');
    }

    if (features.includes('hook')) {
      const hookDir = join(outputPath, '..', 'lib', 'composables');
      await mkdir(hookDir, { recursive: true });
      await writeFile(join(hookDir, `use${name}.ts`), componentTemplates.composable.useHook(name), 'utf8');
    }

    // 4. Styles (ITCSS)
    if (features.includes('styles')) {
      const stylesDir = join(outputPath, '..', 'styles');
      
      const settingsPath = join(stylesDir, '01-settings');
      await mkdir(settingsPath, { recursive: true });
      await writeFile(join(settingsPath, `_settings.${name.toLowerCase()}.scss`), componentTemplates.scss.settings(name), 'utf8');

      const compStylesPath = join(stylesDir, '06-components');
      await mkdir(compStylesPath, { recursive: true });
      await writeFile(join(compStylesPath, `_components.${name.toLowerCase()}.scss`), componentTemplates.scss.component(name), 'utf8');
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
