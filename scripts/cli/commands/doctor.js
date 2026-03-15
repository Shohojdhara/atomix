/**
 * Atomix CLI Doctor Command
 * Diagnostic tool to verify the environment and project health
 */

import { logger } from '../utils/logger.js';
import { checkRuntimes, checkProjectStructure, checkConfig, checkPermissions, checkPlugins } from '../utils/diagnostics.js';
import chalk from 'chalk';

/**
 * Action for the `atomix doctor` command
 * @param {object} options - Command options
 */
export async function doctorAction(options = {}) {
  const spinner = logger.spinner('Running diagnostics...').start();
  
  try {
    const runtimes = await checkRuntimes();
    const structure = await checkProjectStructure();
    const config = await checkConfig();
    const permissions = await checkPermissions();
    const plugins = await checkPlugins();

    spinner.stop();

    logger.box('Atomix Diagnostic Report', {
      borderColor: 'cyan',
      padding: 1,
      margin: 1
    });

    const allResults = [...runtimes, ...structure, ...config, ...permissions, ...plugins];
    let issuesFound = false;

    for (const result of allResults) {
      const icon = result.status === 'pass' ? chalk.green('✓') : 
                   result.status === 'warn' ? chalk.yellow('!') : 
                   chalk.red('❌');
      
      const statusText = result.status.toUpperCase();
      const nameText = chalk.bold(result.name);
      const messageText = chalk.gray(result.message);

      console.log(`${icon} [${statusText}] ${nameText}: ${messageText}`);

      if (result.status !== 'pass' && result.suggestion) {
        issuesFound = true;
        console.log(chalk.blue(`   💡 Suggestion: ${result.suggestion}`));
      }
    }

    if (!issuesFound) {
      console.log(chalk.bold.green('\n🎉 Your environment is healthy! Everything is ready for Atomix.'));
    } else {
      console.log(chalk.bold.yellow('\n⚠️ Some issues or suggestions were found. Review the report above.'));
    }

  } catch (error) {
    spinner.fail('Diagnostic failed');
    throw error;
  }
}
