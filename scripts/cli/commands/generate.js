/**
 * Atomix CLI Generate Command
 * Orchestrates component generation with validation, hooks, and error handling
 */

import inquirer from 'inquirer';
import { logger } from '../utils/logger.js';
import { AtomixCLIError } from '../utils/error.js';
import { generator, COMPLEXITY_LEVELS, COMPONENT_FEATURES } from '../internal/generator.js';
import { filesystem } from '../internal/filesystem.js';
import { validateComponentName } from '../utils/validation.js';
import { hookManager } from '../internal/hooks.js';
import { validateComponent } from '../internal/validator.js';

/**
 * Action logic for generating components
 * @param {string} type - Component type (component, token, etc.)
 * @param {string} name - Component name
 * @param {Object} options - CLI options
 */
export async function generateAction(type, name, options) {
  let config = {
    name,
    complexity: options.complexity || 'medium',
    features: determineFeatures(options),
    outputPath: options.path || './src/components'
  };

  if (options.interactive) {
    config = await promptInteractive();
    if (!config) return;
  }

  // Pre-generation hook
  try {
    config = await hookManager.trigger('preGenerate', config);
  } catch (error) {
    throw new AtomixCLIError(
      `Pre-generation hook failed: ${error.message}`,
      'HOOK_EXECUTION_FAILED',
      [
        'Check preGenerate hook implementation',
        'Verify hook returns valid configuration object',
        'Review hook logs with ATOMIX_DEBUG=true'
      ]
    );
  }

  const spinner = logger.spinner(`Generating ${type}: ${config.name}...`).start();

  try {
    // Validation
    const nameValidation = await validateComponentName(config.name);
    if (!nameValidation.isValid) {
      throw new AtomixCLIError(
        nameValidation.error,
        'INVALID_NAME',
        [
          'Use PascalCase (e.g., MyComponent, Button)',
          'Start with a letter (not numbers)',
          'Avoid special characters except letters and numbers'
        ]
      );
    }

    const pathValidation = filesystem.validatePath(config.outputPath);
    if (!pathValidation.isValid) {
      throw new AtomixCLIError(
        pathValidation.error,
        'INVALID_PATH',
        [
          'Ensure path is within project root',
          'Check you have write permissions for target directory',
          'Use absolute path or path relative to current directory'
        ]
      );
    }

    // Execution
    let path;
    if (options.prompt) {
      path = await generator.generateAIComponent(config.name, options.prompt, {
        ...config,
        logger: { debug: (msg) => logger.debug(msg) }
      });
    } else {
      path = await generator.generateComponent(config.name, {
        ...config,
        logger: { debug: (msg) => logger.debug(msg) }
      });
    }

    spinner.succeed(`Generated component ${config.name} at ${path}`);

    if (options.validate) {
      let report = await generator.validate(config.name, path);
      // Component-scoped A11y and token validation (Phase 2: design system creator)
      if (type === 'component') {
        const componentReport = await validateComponent(config.name, process.cwd());
        const componentIssues = componentReport.issues.map(
          (i) => (typeof i === 'string' ? i : `[${i.type}] ${i.file}: ${i.message}`)
        );
        report.issues = [...report.issues, ...componentIssues];
        report.valid = report.valid && componentReport.valid;
      }

      // Validation hook
      try {
        report = await hookManager.trigger('onValidate', report);
      } catch (error) {
        logger.warn(`Validation hook failed: ${error.message}`);
      }

      if (!report.valid) {
        logger.warn('Validation found issues:');
        report.issues.forEach((i) => logger.info(`  - ${i}`));
      }
    }

    // Post-build hook (using generated path as asset)
    try {
      await hookManager.trigger('postBuild', [path]);
    } catch (error) {
      logger.warn(`Post-build hook failed: ${error.message}`);
    }

    logger.box(`🎉 Component ${config.name} ready!\nRun: atomix validate component ${config.name}`);

  } catch (error) {
    spinner.fail('Generation failed');
    
    // Enhance error context for known error types
    if (error.code === 'TEMPLATE_NOT_FOUND') {
      error.suggestions.push('Run `atomix doctor` to check template availability');
    } else if (error.code === 'FRAMEWORK_DETECTION_FAILED') {
      error.suggestions.push('Initialize project with `npm init` or `yarn init`');
    } else if (error.code === 'FILE_WRITE_FAILED') {
      error.suggestions.push('Check disk space and file permissions');
    }
    
    throw error;
  }
}

/**
 * Determine which features to enable based on CLI options
 * @param {Object} options - CLI options
 * @returns {string[]} Array of feature names
 */
function determineFeatures(options) {
  const features = [];
  
  // Default features (always enabled unless explicitly disabled)
  if (options.storybook !== false) {
    features.push('storybook');
  }
  
  if (options.hook !== false) {
    features.push('hook');
  }
  
  if (options.styles !== false) {
    features.push('styles');
  }
  
  // Optional features (enabled by flag)
  if (options.tests === true) {
    features.push('tests');
  }
  
  return features;
}

/**
 * Interactive mode handler
 * Prompts user for component configuration
 * @returns {Promise<Object>} Configuration object
 */
async function promptInteractive() {
  logger.info('🎨 Interactive Component Generator');
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Component name (PascalCase):',
      validate: async (val) => {
        const result = await validateComponentName(val);
        return result.isValid || `Invalid: ${result.error}. Use PascalCase (e.g., MyComponent)`;
      }
    },
    {
      type: 'list',
      name: 'complexity',
      message: 'Complexity level:',
      choices: Object.keys(COMPLEXITY_LEVELS).map(k => ({
        name: k.toLowerCase(),
        value: k.toLowerCase()
      })),
      default: 'medium'
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'Select features:',
      choices: Object.keys(COMPONENT_FEATURES).map(k => ({
        name: `${k.toLowerCase()}${COMPONENT_FEATURES[k].default ? ' (default)' : ''}`,
        value: COMPONENT_FEATURES[k].name,
        checked: COMPONENT_FEATURES[k].default
      }))
    }
  ]);

  return {
    ...answers,
    outputPath: './src/components'
  };
}
