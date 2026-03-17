/**
 * Atomix CLI Templates
 * 
 * A modular and organized collection of templates for generating
 * components, styles, stories, tests, and configuration files.
 * 
 * @module templates
 */

// Component templates
export { reactComponentTemplates } from './components/react-component';
export type { ReactComponentTemplates } from './components/react-component';

// Style templates
export { scssComponentTemplates } from './styles/scss-component';
export type { ScssComponentTemplates } from './styles/scss-component';

// Story templates
export { storybookStoryTemplates } from './stories/storybook-story';
export type { StorybookStoryTemplates } from './stories/storybook-story';

// Test templates
export { vitestTestTemplates } from './tests/vitest-test';
export type { VitestTestTemplates } from './tests/vitest-test';

// Type templates
export { componentTypeTemplates } from './types/component-types';
export type { ComponentTypeTemplates } from './types/component-types';

// Config templates
export { projectConfigTemplates } from './config/project-config';
export type { ProjectConfigTemplates } from './config/project-config';

// Utility templates
export { testingUtilsTemplates } from './utils/testing-utils';
export type { TestingUtilsTemplates } from './utils/testing-utils';

// Hook templates
export { composableHookTemplates, generateComposableHook, generateSimpleHook, generateComplexHook } from './hooks/use-component';
export type { ComposableHookTemplates, HookGenerationOptions } from './hooks/use-component';

// Token templates
export { tokenGenerators, generateColorTokens, generateSpacingTokens, generateTypographyTokens, generateShadowTokens, generateRadiusTokens, generateAnimationTokens, generateBreakpointTokens, generateZIndexTokens, generateJSONTokens, generateCSSTokens } from './tokens/token-generators';
export type { TokenGenerators, TokenCategory, TokenFormat, ColorTokenConfig, SpacingTokenConfig, TypographyTokenConfig, ShadowTokenConfig, RadiusTokenConfig, AnimationTokenConfig, BreakpointTokenConfig, ZIndexTokenConfig } from './tokens/token-generators';

/**
 * Template categories
 */
export const templates = {
  components: {
    react: reactComponentTemplates,
  },
  styles: {
    scss: scssComponentTemplates,
  },
  stories: {
    storybook: storybookStoryTemplates,
  },
  tests: {
    vitest: vitestTestTemplates,
    utils: testingUtilsTemplates,
  },
  types: {
    components: componentTypeTemplates,
  },
  config: {
    project: projectConfigTemplates,
  },
  hooks: {
    composable: composableHookTemplates,
  },
  tokens: {
    generators: tokenGenerators,
  },
};

/**
 * Get a template by category and name
 * @param category - Template category (components, styles, stories, tests, types, config)
 * @param type - Template type within category
 * @param name - Template name
 * @returns Template function or null if not found
 */
export function getTemplate<K extends keyof typeof templates>(
  category: K,
  type: keyof typeof templates[K],
  name: string
): ((...args: any[]) => any) | null {
  const categoryTemplatesObject = templates[category];
  const typeTemplatesObject = categoryTemplatesObject?.[type as keyof typeof categoryTemplatesObject];
  
  if (!typeTemplatesObject || typeof typeTemplatesObject !== 'object') {
    return null;
  }
  
  const template = (typeTemplatesObject as Record<string, any>)[name];
  return typeof template === 'function' ? template : null;
}

/**
 * Get all templates for a category
 * @param category - Template category
 * @returns All templates for the category or empty object
 */
export function getTemplatesByCategory<K extends keyof typeof templates>(
  category: K
): typeof templates[K] {
  return templates[category];
}

/**
 * Get all available template categories
 * @returns Array of category names
 */
export function getTemplateCategories(): string[] {
  return Object.keys(templates);
}

/**
 * Backward compatibility exports
 * These maintain compatibility with existing code
 */
import { reactComponentTemplates as reactTmpl } from './components/react-component';
import { storybookStoryTemplates as storyTmpl } from './stories/storybook-story';
import { vitestTestTemplates as testTmpl } from './tests/vitest-test';
import { scssComponentTemplates as scssTmpl } from './styles/scss-component';
import { componentTypeTemplates as typeTmpl } from './types/component-types';
import { composableHookTemplates as hookTmpl } from './hooks/use-component';
import { tokenGenerators as tokenGen } from './tokens/token-generators';

export const componentTemplates = {
  react: {
    component: reactTmpl.component,
    simple: reactTmpl.simple,
    medium: reactTmpl.medium,
    complex: reactTmpl.complex,
    index: reactTmpl.index,
    story: storyTmpl.story,
    test: testTmpl.test,
    scss: scssTmpl.full,
    settings: scssTmpl.settings,
    componentStyles: scssTmpl.component,
    types: typeTmpl.types,
    constants: typeTmpl.constants,
    composable: {
      useHook: hookTmpl.useHook,
      simpleHook: hookTmpl.simpleHook,
      complexHook: hookTmpl.complexHook,
    },
  },
  token: {
    color: tokenGen.color,
    spacing: tokenGen.spacing,
    typography: tokenGen.typography,
    shadow: tokenGen.shadow,
    radius: tokenGen.radius,
    animation: tokenGen.animation,
    breakpoint: tokenGen.breakpoint,
    zIndex: tokenGen.zIndex,
    json: tokenGen.json,
    css: tokenGen.css,
  },
};

export default {
  templates,
  componentTemplates,
  getTemplate,
  getTemplatesByCategory,
  getTemplateCategories,
};
