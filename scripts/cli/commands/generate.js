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
import { configLoader } from '../internal/config-loader.js';
import { detectFramework } from '../utils/detector.js';
import { resolveDefaultComplexity } from '../internal/complexity-utils.js';
import { telemetry } from '../utils/telemetry.js';

/**
 * Merge CLI options with atomix.config generator section (CLI wins).
 * @param {Object} options - Commander options
 * @returns {Promise<Object>}
 */
async function buildGenerateConfig(name, options) {
  const cwd = process.cwd();
  const loaded = await configLoader.load(cwd);
  const gen = loaded.generator || {};

  const outputPath = options.path ?? gen.outputPath ?? './src/components';
  const framework = options.framework ?? gen.framework;
  const prefix = loaded.prefix ?? 'atomix';
  const storybookCssImport = gen.storybookCssImport;
  const hookOutputDir = gen.hookOutputDir;

  const complexity =
    options.complexity !== undefined && options.complexity !== null && options.complexity !== ''
      ? options.complexity
      : undefined;

  const features = determineFeatures(options, gen.features || {});

  return {
    name,
    complexity,
    features,
    outputPath,
    framework,
    prefix,
    storybookCssImport,
    hookOutputDir
  };
}

/**
 * Action logic for generating components
 * @param {string} type - Component type (component, token, etc.)
 * @param {string} name - Component name
 * @param {Object} options - CLI options
 */
export async function generateAction(type, name, options) {
  let config = await buildGenerateConfig(name, options);

  if (options.interactive) {
    const interactive = await promptInteractive();
    if (!interactive) return;
    config = {
      ...config,
      ...interactive,
      name: interactive.name,
      complexity: interactive.complexity,
      features: interactive.features
    };
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

    const detectedFw = await detectFramework(process.cwd(), { framework: config.framework });
    telemetry.recordExtra({
      generateType: type,
      framework: detectedFw,
      componentName: config.name
    });

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

    if (!options.skipValidate && options.validate !== false) {
      let report = await generator.validate(config.name, path);
      if (type === 'component') {
        const componentReport = await validateComponent(config.name, process.cwd());
        const componentIssues = componentReport.issues.map(
          (i) => (typeof i === 'string' ? i : `[${i.type}] ${i.file}: ${i.message}`)
        );
        report.issues = [...report.issues, ...componentIssues];
        report.valid = report.valid && componentReport.valid;
      }

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

    try {
      await hookManager.trigger('postBuild', [path]);
    } catch (error) {
      logger.warn(`Post-build hook failed: ${error.message}`);
    }

    logger.box(`🎉 Component ${config.name} ready!\nRun: atomix validate component ${config.name}`);
  } catch (error) {
    spinner.fail('Generation failed');

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
 * @param {Object} options - CLI options
 * @param {Object} genFeatures - config.generator.features
 */
function determineFeatures(options, genFeatures = {}) {
  let storybook = genFeatures.storybook !== false;
  let hook = genFeatures.hook !== false;
  let styles = genFeatures.styles !== false;
  let tests = genFeatures.tests === true;

  if (options.storybook === false) storybook = false;
  if (options.hook === false) hook = false;
  if (options.styles === false) styles = false;
  if (options.tests) tests = true;

  const features = [];
  if (storybook) features.push('storybook');
  if (hook) features.push('hook');
  if (styles) features.push('styles');
  if (tests) features.push('tests');

  return features;
}

/**
 * Interactive mode handler
 * @returns {Promise<Object>} Configuration object
 */
async function promptInteractive() {
  logger.info('🎨 Interactive Component Generator');

  const cwd = process.cwd();
  const loaded = await configLoader.load(cwd);
  const gen = loaded.generator || {};

  const framework = await detectFramework(cwd, {});
  const defaultComplexity = resolveDefaultComplexity(framework);
  const complexityChoices =
    framework === 'next'
      ? [
          { name: 'simple', value: 'simple' },
          { name: 'client', value: 'client' },
          { name: 'complex', value: 'complex' }
        ]
      : framework === 'vanilla'
        ? [{ name: 'default', value: 'medium' }]
        : Object.keys(COMPLEXITY_LEVELS).map((k) => ({
            name: k.toLowerCase(),
            value: k.toLowerCase()
          }));

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
      message: `Complexity level (detected: ${framework}):`,
      choices: complexityChoices,
      default: defaultComplexity
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'Select features:',
      choices: Object.keys(COMPONENT_FEATURES).map((k) => ({
        name: `${k.toLowerCase()}${COMPONENT_FEATURES[k].default ? ' (default)' : ''}`,
        value: COMPONENT_FEATURES[k].name,
        checked: COMPONENT_FEATURES[k].default
      }))
    }
  ]);

  return {
    ...answers,
    outputPath: gen.outputPath || './src/components',
    framework: undefined,
    complexity: answers.complexity,
    prefix: loaded.prefix || 'atomix',
    storybookCssImport: gen.storybookCssImport,
    hookOutputDir: gen.hookOutputDir
  };
}
