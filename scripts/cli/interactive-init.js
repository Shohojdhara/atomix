/**
 * Interactive Init Wizard for Atomix Design System
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { existsSync } from 'fs';
import boxen from 'boxen';
import ora from 'ora';

import { projectTemplates, configTemplates } from './templates.js';
import { commonTemplates } from './templates/common-templates.js';

/**
 * Run the interactive init wizard
 */
export async function runInitWizard() {
  console.log(boxen(
    chalk.bold.cyan('🎨 Atomix Design System Setup Wizard\n\n') +
    chalk.gray('Let\'s set up your design system project!'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan'
    }
  ));

  try {
    // Step 1: Project type
    const { projectType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'projectType',
        message: 'What type of project are you building?',
        choices: [
          { name: 'React Application', value: 'react' },
          { name: 'Next.js Application', value: 'nextjs' },
          { name: 'Vanilla JavaScript/HTML', value: 'vanilla' },
          { name: 'Custom Setup', value: 'custom' }
        ]
      }
    ]);

    // Step 2: Theme selection
    const { themeChoice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'themeChoice',
        message: 'How would you like to handle theming?',
        choices: [
          { name: 'Use a pre-built theme', value: 'prebuilt' },
          { name: 'Create a custom theme', value: 'custom' },
          { name: 'Start with default styles', value: 'default' },
          { name: 'I\'ll configure this later', value: 'skip' }
        ]
      }
    ]);

    let prebuiltThemeName = null;
    if (themeChoice === 'prebuilt') {
      const { theme } = await inquirer.prompt([
        {
          type: 'input',
          name: 'theme',
          message: 'Enter the name of the pre-built theme:',
          default: 'default'
        }
      ]);
      prebuiltThemeName = (theme && String(theme).trim()) || 'default';
    }

    // Step 3: Features
    const { features } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'features',
        message: 'Select additional features:',
        choices: [
          { name: 'TypeScript support', value: 'typescript', checked: true },
          { name: 'Storybook integration', value: 'storybook' },
          { name: 'Testing setup (Vitest)', value: 'testing' },
          { name: 'ESLint & Prettier', value: 'linting' },
          { name: 'Git hooks (Husky)', value: 'githooks' },
          { name: 'CI/CD workflows', value: 'cicd' }
        ]
      }
    ]);

    // Step 4: Configuration
    const { configType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'configType',
        message: 'Configuration file format:',
        choices: [
          { name: 'JSON (.atomixrc.json)', value: 'json' },
          { name: 'JavaScript (atomix.config.js)', value: 'js' },
          { name: 'No configuration file', value: 'none' }
        ]
      }
    ]);

    // Step 5: Installation
    const { shouldInstall } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldInstall',
        message: 'Install dependencies now?',
        default: true
      }
    ]);

    // Create project structure
    if (projectType !== 'custom') {
      const template = projectTemplates[projectType];

      // Step 6: Create/Update package.json
      const packageJsonPath = join(process.cwd(), 'package.json');
      let packageJson = {};

      if (existsSync(packageJsonPath)) {
        packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
      } else {
        // Create basic package.json
        packageJson = {
          name: basename(process.cwd()),
          version: '0.1.0',
          private: true,
          scripts: {},
          dependencies: {},
          devDependencies: {}
        };
      }

      // Merge dependencies
      const packageJsonVersion = packageJson.version || '0.1.0';

      template.dependencies.forEach(dep => {
        if (!packageJson.dependencies[dep]) {
          // Use a default compatible version if not specified
          const defaultVersions = {
            'react': '^18.0.0',
            'react-dom': '^18.0.0',
            'next': '^14.0.0',
            'sass': '^1.70.0'
          };
          packageJson.dependencies[dep] = defaultVersions[dep] || 'latest';
        }
      });

      template.devDependencies.forEach(dep => {
        if (!packageJson.devDependencies[dep]) {
          const defaultDevVersions = {
            'typescript': '^5.0.0',
            'vite': '^5.0.0',
            '@shohojdhara/atomix': `^${packageJsonVersion}` // Self-reference for templates
          };
          packageJson.devDependencies[dep] = defaultDevVersions[dep] || 'latest';
        }
      });

      // Merge scripts carefully
      const themePath = themeChoice === 'prebuilt' && prebuiltThemeName
        ? `themes/${prebuiltThemeName}`
        : 'themes/custom';
      const newScripts = {
        'dev': projectType === 'nextjs' ? 'next dev' : 'vite',
        'build': projectType === 'nextjs' ? 'next build' : 'vite build',
        'build:theme': `atomix build-theme ${themePath}`,
        'generate:component': 'atomix generate component',
        'validate': 'atomix validate --tokens --theme'
      };

      if (features.includes('storybook')) {
        newScripts['storybook'] = 'storybook dev -p 6006';
        newScripts['build:storybook'] = 'storybook build';
      }

      if (features.includes('testing')) {
        newScripts['test'] = 'vitest';
        newScripts['test:watch'] = 'vitest --watch';
      }

      // Add new scripts without overwriting user's existing scripts
      for (const [key, value] of Object.entries(newScripts)) {
        if (!packageJson.scripts[key]) {
          packageJson.scripts[key] = value;
        } else if (packageJson.scripts[key] !== value) {
          // Suggest renamed script if conflict exists
          const suggestedKey = `atomix:${key}`;
          if (!packageJson.scripts[suggestedKey]) {
            packageJson.scripts[suggestedKey] = value;
            console.log(chalk.yellow(`  ⚠️  Script conflict for "${key}". Added as "${suggestedKey}" instead.`));
          }
        }
      }

      await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
      console.log(chalk.green('  ✓ Updated package.json'));

      // Create directories
      await mkdir('src', { recursive: true });
      if (projectType === 'nextjs') {
        await mkdir('src/pages', { recursive: true });
      } else if (projectType === 'react') {
        await mkdir('src/components', { recursive: true });
      } else if (projectType === 'vanilla') {
        await mkdir('src/styles', { recursive: true });
      }

      // Write template files
      const spinner = ora('Creating project files...').start();
      let filesCreated = 0;
      const totalFiles = Object.keys(template.files).length;
      
      for (const [path, content] of Object.entries(template.files)) {
        const filePath = join(process.cwd(), path);
        const dir = dirname(filePath);

        if (!existsSync(dir)) {
          await mkdir(dir, { recursive: true });
        }

        await writeFile(filePath, content, 'utf8');
        filesCreated++;
        spinner.text = `Creating project files... (${filesCreated}/${totalFiles})`;
      }
      
      spinner.succeed(chalk.green(`✓ Created ${filesCreated} files`));
      
      // Generate README
      const readmeSpinner = ora('Generating README...').start();
      const projectName = basename(process.cwd());
      const readmeTemplate = projectType === 'react' 
        ? commonTemplates.readme.react(projectName)
        : projectType === 'nextjs'
        ? commonTemplates.readme.nextjs(projectName)
        : commonTemplates.readme.vanilla(projectName);
      
      await writeFile(
        join(process.cwd(), 'README.md'),
        readmeTemplate,
        'utf8'
      );
      readmeSpinner.succeed(chalk.green('✓ Generated README.md'));
    }

    // Create configuration file
    if (configType !== 'none') {
      const configTemplate = configType === 'json'
        ? configTemplates.basic
        : configTemplates.advanced;
      const themePathForConfig = themeChoice === 'prebuilt' && prebuiltThemeName
        ? `themes/${prebuiltThemeName}`
        : 'themes/custom';

      for (const [filename, content] of Object.entries(configTemplate)) {
        let configContent = typeof content === 'object'
          ? JSON.stringify(content, null, 2)
          : content;

        if (themeChoice === 'prebuilt' && prebuiltThemeName) {
          if (typeof content === 'object' && content.theme) {
            const merged = { ...content, theme: { ...content.theme, path: themePathForConfig } };
            configContent = JSON.stringify(merged, null, 2);
          } else if (typeof content === 'string') {
            configContent = content.replace(/path:\s*['"]themes\/custom['"]/g, `path: '${themePathForConfig}'`);
          }
        }

        await writeFile(
          join(process.cwd(), filename),
          configContent,
          'utf8'
        );
        console.log(chalk.green(`  ✓ Created ${filename}`));
      }
    }

    // Create custom theme if selected
    if (themeChoice === 'custom') {
      await mkdir('themes/custom', { recursive: true });

      const themeContent = `// Custom Theme
// Generated by Atomix CLI

@use '@shohojdhara/atomix/scss/settings' as * with (
  // Your custom token overrides
  $primary-500: #7AFFD7,
  $secondary-500: #FF5733,
  
  // Add more overrides as needed
);

// Import Atomix components
@use '@shohojdhara/atomix/scss/components';

// Your custom styles
.custom-component {
  // Custom component styles
}`;

      await writeFile(
        join(process.cwd(), 'themes/custom/index.scss'),
        themeContent,
        'utf8'
      );
      console.log(chalk.green('  ✓ Created custom theme'));
    }

    // Success message
    console.log(boxen(
      chalk.bold.green('✨ Setup Complete!\n\n') +
      chalk.cyan('Your Atomix project is ready.\n\n') +
      chalk.gray('Next steps:\n') +
      (shouldInstall ? '' : chalk.white('1. Install dependencies: npm install\n')) +
      chalk.white(`${shouldInstall ? '1' : '2'}. Start development: npm run dev\n`) +
      chalk.white(`${shouldInstall ? '2' : '3'}. Build your theme: npm run build:theme\n`) +
      chalk.white(`${shouldInstall ? '3' : '4'}. Generate components: npm run generate:component\n\n`) +
      chalk.gray('Documentation: https://github.com/shohojdhara/atomix'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green'
      }
    ));

    // Install dependencies if requested
    if (shouldInstall) {
      console.log(chalk.cyan('\n📥 Installing dependencies...\n'));
      const { execSync } = await import('child_process');

      try {
        execSync('npm install', { stdio: 'inherit' });
        console.log(chalk.green('\n✅ Dependencies installed successfully!'));
      } catch (error) {
        console.error(chalk.red('\n❌ Failed to install dependencies'));
        console.log(chalk.yellow('Please run: npm install'));
      }
    }

  } catch (error) {
    if (error.isTTYError) {
      console.error(chalk.red('This environment doesn\'t support interactive prompts'));
      console.log(chalk.yellow('Please use manual setup commands instead'));
    } else {
      console.error(chalk.red('Setup failed:'), error.message);
    }
    process.exit(1);
  }
}

export default runInitWizard;
