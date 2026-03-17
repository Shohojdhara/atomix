/**
 * Atomix CLI Init Command
 */

import inquirer from 'inquirer';
import { logger } from '../utils/logger.js';
import { wizard } from '../internal/wizard.js';
import { isNonInteractive } from '../utils/helpers.js';
import { AtomixCLIError, ErrorCategory } from '../utils/error.js';

const DEFAULT_PROJECT_TYPE = 'react';
const DEFAULT_FEATURES = ['typescript', 'storybook', 'testing'];

/**
 * Action logic for the init command
 * @param {object} options - Command options (--yes, --type)
 */
export async function initAction(options = {}) {
  const useDefaults = options.yes || options.type || isNonInteractive();
  let projectType = (options.type || '').toLowerCase();
  const validTypes = ['react', 'nextjs', 'vanilla'];
  if (options.type && !validTypes.includes(projectType)) {
    throw new AtomixCLIError(
      `Invalid --type: ${options.type}. Use one of: ${validTypes.join(', ')}`,
      ErrorCategory.VALIDATION,
      ['Example: atomix init --type react']
    );
  }
  if (!projectType) projectType = DEFAULT_PROJECT_TYPE;

  logger.info('🎨 Atomix Design System Setup Wizard');

  try {
    let answers;
    if (useDefaults) {
      answers = {
        projectType,
        features: DEFAULT_FEATURES
      };
      if (options.type) logger.info(`Using project type: ${projectType}`);
    } else {
      answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'projectType',
          message: 'What type of project are you building?',
          choices: ['react', 'nextjs', 'vanilla'],
          default: projectType
        },
        {
          type: 'checkbox',
          name: 'features',
          message: 'Select features:',
          choices: ['typescript', 'storybook', 'testing']
        }
      ]);
    }

    const spinner = logger.spinner('Setting up project...').start();

    await wizard.initProject(answers.projectType, {
      ...answers,
      logger: { debug: (msg) => logger.debug(msg) }
    });

    spinner.succeed('Project initialized successfully');

    logger.box('✨ Setup Complete!\nRun: npm run dev');
  } catch (error) {
    logger.error(`Setup failed: ${error.message}`);
    throw error;
  }
}
