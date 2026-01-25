/**
 * Atomix CLI - Templates and Data
 * Modular templates for design system generation
 * 
 * This file now uses the modular template structure from the templates/ directory.
 * All templates have been split into separate files for better maintainability.
 */

// Import the modular templates
import templates from './cli/templates/index.js';

/**
 * Export all templates to maintain backward compatibility
 * The structure matches the original templates.js format
 */
export const {
  componentTemplates,
  generateColorTokens,
  generateSpacingTokens,
  generateTypographyTokens,
  generateShadowTokens,
  generateRadiusTokens,
  generateAnimationTokens,
  projectTemplates,
  configTemplates,
  getTemplate,
  getTemplatesByType,
  getTemplateTypes,
} = templates;

/**
 * Legacy export - same as original templates.js
 * This ensures that existing imports continue to work
 */
export default templates;