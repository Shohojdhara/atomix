/**
 * Templates Index
 * Aggregates all template modules for the Atomix CLI
 */

// Import template modules
import { reactTemplates } from './react-templates.js';
import { storybookTemplates } from './storybook-templates.js';
import { testingTemplates } from './testing-templates.js';
import { scssTemplates } from './scss-templates.js';
import { typesTemplates } from './types-templates.js';
import { composableTemplates } from './composable-templates.js';
import * as tokenTemplates from './token-templates.js';
import { projectTemplates } from './project-templates.js';
import { configTemplates } from './config-templates.js';

/**
 * Main templates object that maintains backward compatibility
 * This structure matches the original templates.js format
 */
export const componentTemplates = {
  react: {
    ...reactTemplates,
    ...storybookTemplates,
    ...testingTemplates,
    ...scssTemplates,
    ...typesTemplates,
  },
  composable: composableTemplates,
};

// Re-export token generation functions
export {
  generateColorTokens,
  generateSpacingTokens,
  generateTypographyTokens,
  generateShadowTokens,
  generateRadiusTokens,
  generateAnimationTokens,
} from './token-templates.js';

// Re-export project and config templates
export { projectTemplates, configTemplates };

/**
 * Get template by name and type
 * @param {string} type - Template type (react, composable, etc.)
 * @param {string} name - Template name (simple, medium, complex, etc.)
 * @returns {Function|null} Template function or null if not found
 */
export function getTemplate(type, name) {
  if (type === 'react') {
    return componentTemplates.react[name] || null;
  } else if (type === 'composable') {
    return componentTemplates.composable[name] || null;
  }
  return null;
}

/**
 * Get all available templates for a type
 * @param {string} type - Template type
 * @returns {Object} Object with all available templates
 */
export function getTemplatesByType(type) {
  return componentTemplates[type] || {};
}

/**
 * List all available template types
 * @returns {string[]} Array of template type names
 */
export function getTemplateTypes() {
  return Object.keys(componentTemplates);
}

/**
 * Legacy export for backward compatibility
 * Maintains the same structure as the original templates.js
 */
export default {
  componentTemplates,
  generateColorTokens: tokenTemplates.generateColorTokens,
  generateSpacingTokens: tokenTemplates.generateSpacingTokens,
  generateTypographyTokens: tokenTemplates.generateTypographyTokens,
  generateShadowTokens: tokenTemplates.generateShadowTokens,
  generateRadiusTokens: tokenTemplates.generateRadiusTokens,
  generateAnimationTokens: tokenTemplates.generateAnimationTokens,
  projectTemplates,
  configTemplates,
  // Helper functions
  getTemplate,
  getTemplatesByType,
  getTemplateTypes,
};