/**
 * Atomix CLI Template Engine
 * Centralizes all template-related logic, separating it from file I/O operations
 */

import { componentTemplates } from '../templates.js';
import { AtomixCLIError } from '../utils/error.js';

export const COMPLEXITY_LEVELS = {
  SIMPLE: { name: 'simple', template: 'simple' },
  MEDIUM: { name: 'medium', template: 'medium' },
  COMPLEX: { name: 'complex', template: 'complex' }
};

export const TEMPLATE_TYPES = {
  COMPONENT: 'component',
  INDEX: 'index',
  STORY: 'story',
  TEST: 'test',
  SCSS: 'scss',
  SETTINGS: 'settings',
  HOOK: 'hook',
  TYPES: 'types',
  CONSTANTS: 'constants'
};

/**
 * Template registry - maps framework + complexity to template functions
 */
const templateRegistry = {
  react: {
    component: ['simple', 'medium', 'complex'],
    index: ['index'],
    story: ['story'],
    test: ['test'],
    scss: ['scss'],  // SCSS templates don't use complexity
    settings: ['settings'],  // Settings templates don't use complexity
    hook: ['useHook'],
    types: ['types', 'constants']
  },
  next: {
    component: ['simple', 'client', 'complex'],
    index: ['index'],
    story: ['story'],
    test: ['test'],
    scss: ['scss'],
    settings: ['settings'],
    hook: ['useHook'],
    types: ['types', 'constants']
  },
  vanilla: {
    component: ['component'],
    scss: ['scss'],
    settings: ['settings']
  }
};

export const templateEngine = {
  /**
   * Select appropriate template based on framework and complexity
   * @param {string} framework - Framework type (react, next, vanilla)
   * @param {string} complexity - Complexity level (simple, medium, complex)
   * @param {string} templateType - Template type (component, index, story, etc.)
   * @returns {Function} Template function
   * @throws {AtomixCLIError} If template not found
   */
  selectTemplate(framework, complexity, templateType) {
    const normalizedFramework = framework.toLowerCase();
    const normalizedComplexity = complexity.toLowerCase();
    const normalizedType = templateType.toLowerCase();

    // Validate framework exists
    if (!templateRegistry[normalizedFramework]) {
      throw new AtomixCLIError(
        `Unsupported framework: ${framework}`,
        'FRAMEWORK_NOT_SUPPORTED',
        [
          `Use one of the supported frameworks: ${Object.keys(templateRegistry).join(', ')}`,
          'Check framework detection logic in detector.js',
          'Verify package.json has correct dependencies'
        ]
      );
    }

    // Get available templates for this framework
    const availableTypes = templateRegistry[normalizedFramework];
    
    // Validate template type exists for framework
    if (!availableTypes[normalizedType]) {
      throw new AtomixCLIError(
        `Template type '${templateType}' not available for ${framework}`,
        'TEMPLATE_TYPE_NOT_AVAILABLE',
        [
          `Available template types for ${framework}: ${Object.keys(availableTypes).join(', ')}`,
          'Choose a different template type or framework'
        ]
      );
    }

    // For component templates, validate complexity level
    if (normalizedType === 'component') {
      const validComplexities = availableTypes[normalizedType];
      
      // Handle vanilla framework which only has 'component' template
      if (normalizedFramework === 'vanilla') {
        return componentTemplates.vanilla.component;
      }

      // For Next.js, check if complexity is valid
      if (normalizedFramework === 'next') {
        if (!validComplexities.includes(normalizedComplexity)) {
          throw new AtomixCLIError(
            `Complexity level '${complexity}' not available for ${framework} component templates`,
            'INVALID_COMPLEXITY',
            [
              `Use one of: ${validComplexities.join(', ')}`,
              'Default complexity is "simple" for Next.js',
              'Specify complexity with --complexity flag'
            ]
          );
        }

        const templateFn = componentTemplates.next[normalizedComplexity];
        
        if (!templateFn) {
          throw new AtomixCLIError(
            `Template function not found for ${framework} ${complexity} component`,
            'TEMPLATE_NOT_FOUND',
            [
              'Check template files in scripts/cli/templates/',
              'Verify template export names match expected patterns',
              'Run `atomix doctor` to check template availability'
            ]
          );
        }

        return templateFn;
      }

      // React framework
      if (!validComplexities.includes(normalizedComplexity)) {
        throw new AtomixCLIError(
          `Complexity level '${complexity}' not available for ${framework} component templates`,
          'INVALID_COMPLEXITY',
          [
            `Use one of: ${validComplexities.join(', ')}`,
            'Default complexity is "medium"',
            'Specify complexity with --complexity flag'
          ]
        );
      }

      // Return React component template based on complexity
      const templateFn = componentTemplates.react[normalizedComplexity] || componentTemplates.react.component;
      
      if (!templateFn) {
        throw new AtomixCLIError(
          `Template function not found for ${framework} ${complexity} component`,
          'TEMPLATE_NOT_FOUND',
          [
            'Check template files in scripts/cli/templates/',
            'Verify template export names match expected patterns',
            'Run `atomix doctor` to check template availability'
          ]
        );
      }

      return templateFn;
    }

    // For non-component templates (scss, hook, story, etc.), don't validate complexity
    // Just return the template directly
    return this.getTemplateByType(normalizedFramework, normalizedType);
  },

  /**
   * Get template function by type
   * @private
   */
  getTemplateByType(framework, type) {
    const templateMap = {
      index: () => componentTemplates.react.index,
      story: () => componentTemplates.storybook.story,
      test: () => componentTemplates.testing.test,
      scss: () => componentTemplates.scss.component,
      settings: () => componentTemplates.scss.settings,
      hook: () => componentTemplates.composable.useHook,
      types: () => componentTemplates.types.types,
      constants: () => componentTemplates.types.constants
    };

    const getTemplate = templateMap[type];
    
    if (!getTemplate) {
      throw new AtomixCLIError(
        `Unknown template type: ${type}`,
        'TEMPLATE_NOT_FOUND',
        [
          `Available template types: ${Object.keys(templateMap).join(', ')}`,
          'Check template registration in template-engine.js'
        ]
      );
    }

    return getTemplate();
  },

  /**
   * Render template with provided data
   * @param {Function} templateFn - Template function
   * @param {string} componentName - Component name
   * @param {Object} options - Additional options
   * @returns {string} Rendered template string
   * @throws {AtomixCLIError} If template rendering fails
   */
  render(templateFn, componentName, options = {}) {
    if (typeof templateFn !== 'function') {
      throw new AtomixCLIError(
        'Template must be a function',
        'INVALID_TEMPLATE',
        [
          'Ensure template is imported correctly',
          'Check template function signature',
          'Verify template exports in template files'
        ]
      );
    }

    try {
      return templateFn(componentName, options);
    } catch (error) {
      throw new AtomixCLIError(
        `Template rendering failed: ${error.message}`,
        'TEMPLATE_RENDER_ERROR',
        [
          'Check component name format (must be PascalCase)',
          'Verify template function accepts provided parameters',
          'Review template syntax for errors'
        ]
      );
    }
  },

  /**
   * Get available templates for a framework
   * @param {string} framework - Framework type
   * @returns {Object} Object with available template types and complexities
   */
  getAvailableTemplates(framework) {
    const normalizedFramework = framework.toLowerCase();
    
    if (!templateRegistry[normalizedFramework]) {
      return {};
    }

    return templateRegistry[normalizedFramework];
  },

  /**
   * Validate template exists and is callable
   * @param {string} templateName - Template name
   * @param {string} framework - Framework type
   * @param {string} complexity - Complexity level (for component templates)
   * @returns {Object} { isValid: boolean, error?: string }
   */
  validateTemplate(templateName, framework, complexity = 'medium') {
    try {
      const templateFn = this.selectTemplate(framework, complexity, templateName);
      
      if (typeof templateFn !== 'function') {
        return {
          isValid: false,
          error: `Template '${templateName}' is not a function`
        };
      }

      return { isValid: true };
    } catch (error) {
      return {
        isValid: false,
        error: error.message
      };
    }
  },

  /**
   * Get all available framework names
   * @returns {string[]} Array of framework names
   */
  getSupportedFrameworks() {
    return Object.keys(templateRegistry);
  },

  /**
   * Get all available complexity levels
   * @returns {string[]} Array of complexity levels
   */
  getComplexityLevels() {
    return Object.keys(COMPLEXITY_LEVELS).map(k => k.toLowerCase());
  }
};
