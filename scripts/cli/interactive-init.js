/**
 * Interactive Init Wizard for Atomix Design System
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import boxen from 'boxen';

/**
 * Project Templates
 */
const projectTemplates = {
  react: {
    dependencies: [
      '@shohojdhara/atomix',
      'react',
      'react-dom'
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      'typescript',
      'vite',
      '@vitejs/plugin-react'
    ],
    files: {
      'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: \`@import '@shohojdhara/atomix/scss/settings';\`
      }
    }
  }
});`,
      'src/App.tsx': `import React from 'react';
import { Button, Card } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';

function App() {
  return (
    <div className="app">
      <Card>
        <h1>Welcome to Atomix Design System</h1>
        <Button variant="primary">Get Started</Button>
      </Card>
    </div>
  );
}

export default App;`,
      'src/main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
      'src/index.css': `/* Custom styles */
body {
  margin: 0;
  font-family: var(--atomix-font-family-base);
}`
    }
  },

  nextjs: {
    dependencies: [
      '@shohojdhara/atomix',
      'next',
      'react',
      'react-dom'
    ],
    devDependencies: [
      '@types/react',
      '@types/react-dom',
      'typescript',
      'eslint',
      'eslint-config-next'
    ],
    files: {
      'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
    prependData: \`@import '@shohojdhara/atomix/scss/settings';\`
  }
};

module.exports = nextConfig;`,
      'src/pages/_app.tsx': `import type { AppProps } from 'next/app';
import '@shohojdhara/atomix/css';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}`,
      'src/pages/index.tsx': `import { Button, Card } from '@shohojdhara/atomix';

export default function Home() {
  return (
    <main>
      <Card>
        <h1>Welcome to Atomix + Next.js</h1>
        <Button variant="primary">Get Started</Button>
      </Card>
    </main>
  );
}`,
      'src/styles/globals.css': `/* Global styles */
body {
  margin: 0;
  padding: 0;
}`
    }
  },

  vanilla: {
    dependencies: [
      '@shohojdhara/atomix'
    ],
    devDependencies: [
      'vite',
      'sass'
    ],
    files: {
      'vite.config.js': `import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: \`@import '@shohojdhara/atomix/scss/settings';\`
      }
    }
  }
});`,
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atomix Design System</title>
  <link rel="stylesheet" href="/node_modules/@shohojdhara/atomix/dist/atomix.css">
  <link rel="stylesheet" href="/src/styles/main.scss">
</head>
<body>
  <div class="c-card">
    <h1>Welcome to Atomix Design System</h1>
    <button class="c-btn c-btn-primary">Get Started</button>
  </div>
  
  <script type="module" src="/src/main.js"></script>
</body>
</html>`,
      'src/main.js': `// Initialize Atomix components
import { initializeComponents } from '@shohojdhara/atomix/vanilla';

document.addEventListener('DOMContentLoaded', () => {
  initializeComponents();
  
  // Your custom code here
  console.log('Atomix Design System initialized');
});`,
      'src/styles/main.scss': `// Import Atomix
@import '@shohojdhara/atomix/scss';

// Your custom styles
.app {
  padding: 2rem;
}`
    }
  }
};

/**
 * Configuration templates
 */
const configTemplates = {
  basic: {
    '.atomixrc.json': {
      theme: {
        name: 'custom',
        outputDir: './dist/themes',
        minify: true,
        sourceMaps: false
      },
      components: {
        style: 'scss',
        typescript: true,
        stories: true
      }
    }
  },

  advanced: {
    'atomix.config.js': `module.exports = {
  // Theme configuration
  theme: {
    name: process.env.ATOMIX_THEME || 'custom',
    outputDir: './dist/themes',
    minify: process.env.NODE_ENV === 'production',
    sourceMaps: process.env.NODE_ENV === 'development',
    watch: process.env.NODE_ENV === 'development'
  },
  
  // Component generation
  components: {
    path: './src/components',
    style: 'scss-module', // scss | scss-module | css-in-js
    typescript: true,
    stories: true,
    tests: true
  },
  
  // Design tokens
  tokens: {
    colors: {
      custom: true,
      validate: true
    },
    typography: {
      scale: '1.25', // Major third
      baseSize: '16px'
    }
  },
  
  // Build options
  build: {
    clean: true,
    analyze: false,
    report: true
  }
};`
  }
};

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

    let selectedTheme = null;
    if (themeChoice === 'prebuilt') {
      const { theme } = await inquirer.prompt([
        {
          type: 'input',
          name: 'theme',
          message: 'Enter the name of the pre-built theme:',
        }
      ]);
      selectedTheme = theme;
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

    // Generate files
    console.log(chalk.cyan('\n📦 Generating project files...\n'));

    // Create project structure
    if (projectType !== 'custom') {
      const template = projectTemplates[projectType];

      // Create directories
      await mkdir('src', { recursive: true });
      if (projectType === 'nextjs') {
        await mkdir('src/pages', { recursive: true });
        await mkdir('src/styles', { recursive: true });
      } else if (projectType === 'react') {
        await mkdir('src/components', { recursive: true });
      } else if (projectType === 'vanilla') {
        await mkdir('src/styles', { recursive: true });
      }

      // Write template files
      for (const [path, content] of Object.entries(template.files)) {
        const filePath = join(process.cwd(), path);
        const dir = join(process.cwd(), path.substring(0, path.lastIndexOf('/')));

        if (!existsSync(dir)) {
          await mkdir(dir, { recursive: true });
        }

        await writeFile(filePath, content, 'utf8');
        console.log(chalk.green(`  ✓ Created ${path}`));
      }
    }

    // Create configuration file
    if (configType !== 'none') {
      const configTemplate = configType === 'json'
        ? configTemplates.basic
        : configTemplates.advanced;

      for (const [filename, content] of Object.entries(configTemplate)) {
        const configContent = typeof content === 'object'
          ? JSON.stringify(content, null, 2)
          : content;

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

    // Generate package.json scripts
    const scripts = {
      'dev': projectType === 'nextjs' ? 'next dev' : 'vite',
      'build': projectType === 'nextjs' ? 'next build' : 'vite build',
      'build:theme': 'atomix build-theme themes/custom',
      'generate:component': 'atomix generate component',
      'validate': 'atomix validate --tokens --theme'
    };

    if (features.includes('storybook')) {
      scripts['storybook'] = 'storybook dev -p 6006';
      scripts['build:storybook'] = 'storybook build';
    }

    if (features.includes('testing')) {
      scripts['test'] = 'vitest';
      scripts['test:watch'] = 'vitest --watch';
      scripts['test:coverage'] = 'vitest --coverage';
    }

    if (features.includes('linting')) {
      scripts['lint'] = 'eslint . --ext .ts,.tsx,.js,.jsx';
      scripts['lint:fix'] = 'eslint . --ext .ts,.tsx,.js,.jsx --fix';
      scripts['format'] = 'prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,scss}"';
    }

    // Update package.json if it exists
    const packageJsonPath = join(process.cwd(), 'package.json');
    if (existsSync(packageJsonPath)) {
      const { addScripts } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'addScripts',
          message: 'Add Atomix scripts to package.json?',
          default: true
        }
      ]);

      if (addScripts) {
        const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
        packageJson.scripts = { ...packageJson.scripts, ...scripts };
        await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
        console.log(chalk.green('  ✓ Updated package.json scripts'));
      }
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
