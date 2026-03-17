/**
 * Atomix CLI Doctor Command
 * Diagnostic tool to verify the environment and project health
 */

import { logger } from '../utils/logger.js';
import { checkRuntimes, checkProjectStructure, checkConfig, checkPermissions, checkPlugins, checkTokens } from '../utils/diagnostics.js';
import chalk from 'chalk';

/** Short descriptions for each doctor check (for --explain) */
const DOCTOR_CHECK_DESCRIPTIONS = {
  'Node.js': 'Ensures Node.js >= 18.0.0 for CLI and build compatibility.',
  'NPM': 'Ensures npm >= 8.0.0 for package management.',
  'Directory: src': 'Required project directory for application source.',
  'Directory: scripts/cli': 'Required only for Atomix monorepo development (internal).',
  'Directory: themes (Recommended)': 'Optional; recommended for custom themes.',
  'Directory: docs (Recommended)': 'Optional; recommended for documentation.',
  'Configuration': 'Looks for atomix.config.ts or atomix.config.js in project root.',
  'Permissions: .': 'Read/write access to project root.',
  'Permissions: src': 'Read/write access to src directory.',
  'Plugins': 'Reports plugins registered in atomix.config.',
  'Tokens': 'Design token discovery: src/styles/01-settings/_settings.*.scss (optional).'
};

/**
 * Action for the `atomix doctor` command
 * @param {object} options - Command options (--explain)
 */
export async function doctorAction(options = {}) {
  if (options.explain) {
    console.log(chalk.bold.cyan('Atomix doctor checks:\n'));
    for (const [name, desc] of Object.entries(DOCTOR_CHECK_DESCRIPTIONS)) {
      console.log(chalk.bold(name));
      console.log(chalk.gray(`  ${desc}\n`));
    }
    console.log(chalk.gray('Run `atomix doctor` (without --explain) to run the checks.'));
    return;
  }

  const spinner = logger.spinner('Running diagnostics...').start();

  try {
    const runtimes = await checkRuntimes();
    const structure = await checkProjectStructure();
    const config = await checkConfig();
    const permissions = await checkPermissions();
    const plugins = await checkPlugins();
    const tokens = await checkTokens();

    spinner.stop();

    logger.box('Atomix Diagnostic Report', {
      borderColor: 'cyan',
      padding: 1,
      margin: 1
    });

    const allResults = [...runtimes, ...structure, ...config, ...permissions, ...plugins, ...tokens];
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
