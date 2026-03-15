/**
 * Atomix CLI Generate Command
 */

import inquirer from 'inquirer';
import { logger } from '../utils/logger.js';
import { AtomixCLIError } from '../utils/error.js';
import { generator, COMPLEXITY_LEVELS, COMPONENT_FEATURES } from '../internal/generator.js';
import { filesystem } from '../internal/filesystem.js';
import { validateComponentName } from '../utils/validation.js';
import { hookManager } from '../internal/hooks.js';

/**
 * Action logic for generating components
 */
export async function generateAction(type, name, options) {
  let config = {
    name,
    complexity: options.complexity || 'medium',
    features: options.tests ? ['tests', 'storybook', 'styles', 'hook'] : ['storybook', 'styles', 'hook'],
    outputPath: options.path || './src/components'
  };

  if (options.interactive) {
    config = await promptInteractive();
    if (!config) return;
  }

  // Pre-generation hook
  config = await hookManager.trigger('preGenerate', config);

  const spinner = logger.spinner(`Generating ${type}: ${config.name}...`).start();

  try {
    // Validation
    const nameValidation = validateComponentName(config.name);
    if (!nameValidation.isValid) {
      throw new AtomixCLIError(nameValidation.error, 'INVALID_NAME', ['Use PascalCase (e.g., MyComponent)']);
    }

    const pathValidation = filesystem.validatePath(config.outputPath);
    if (!pathValidation.isValid) {
      throw new AtomixCLIError(pathValidation.error, 'INVALID_PATH');
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
      
      // Validation hook
      report = await hookManager.trigger('onValidate', report);

      if (!report.valid) {
        logger.warn('Validation found issues:');
        report.issues.forEach(i => logger.info(`  - ${i}`));
      }
    }

    // Post-build hook (using generated path as asset)
    await hookManager.trigger('postBuild', [path]);

    logger.box(`🎉 Component ${config.name} ready!\nRun: atomix validate component ${config.name}`);

  } catch (error) {
    spinner.fail('Generation failed');
    throw error;
  }
}

async function promptInteractive() {
  logger.info('🎨 Interactive Component Generator');
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Component name (PascalCase):',
      validate: (val) => validateComponentName(val).isValid || validateComponentName(val).error
    },
    {
      type: 'list',
      name: 'complexity',
      message: 'Complexity level:',
      choices: Object.keys(COMPLEXITY_LEVELS).map(k => k.toLowerCase())
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'Select features:',
      choices: Object.keys(COMPONENT_FEATURES).map(k => ({
        name: k.toLowerCase(),
        checked: COMPONENT_FEATURES[k].default
      }))
    }
  ]);

  return {
    ...answers,
    outputPath: './src/components'
  };
}
