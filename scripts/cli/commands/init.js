/**
 * Atomix CLI Init Command
 */

import inquirer from 'inquirer';
import { logger } from '../utils/logger.js';
import { wizard } from '../internal/wizard.js';

/**
 * Action logic for the init command
 */
export async function initAction() {
  logger.info('🎨 Atomix Design System Setup Wizard');

  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'projectType',
        message: 'What type of project are you building?',
        choices: ['react', 'nextjs', 'vanilla']
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Select features:',
        choices: ['typescript', 'storybook', 'testing']
      }
    ]);

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
