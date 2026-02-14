/**
 * Project Templates
 * Templates for different project types and configurations
 */

import { commonTemplates } from './common-templates.js';

/**
 * React project templates
 */
export const reactProjectTemplates = {
  dependencies: ['react', 'react-dom'],
  devDependencies: ['@vitejs/plugin-react', 'vite', 'typescript', '@types/react', '@types/react-dom', 'sass'],
  files: {
    // TypeScript Configuration
    'tsconfig.json': commonTemplates.typescript.react,
    'tsconfig.node.json': commonTemplates.typescript.reactNode,
    
    // Git Configuration
    '.gitignore': commonTemplates.git.gitignore,
    '.gitattributes': commonTemplates.git.gitattributes,
    
    // Code Quality
    '.prettierrc': commonTemplates.prettier.prettierrc,
    '.prettierignore': commonTemplates.prettier.prettierignore,
    '.eslintrc.cjs': commonTemplates.eslint.react,
    
    // Environment
    '.env.example': commonTemplates.env,
    
    // Vite Environment Types
    'src/vite-env.d.ts': commonTemplates.viteEnv,
    
    // Main Application Files
    'src/App.tsx': `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Atomix Design System</h1>
        <p>
          Your React application is ready with Atomix components!
        </p>
      </header>
    </div>
  );
}

export default App;`,
    
    'src/main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`,
    
    'src/App.css': `.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
}`,
    
    'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Atomix React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
    
    'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@lib': resolve(__dirname, './src/lib'),
      '@styles': resolve(__dirname, './src/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: \`@use "@shohojdhara/atomix/scss/settings" as *;\`
      }
    }
  }
});`,

    // ITCSS Structure
    'src/styles/index.scss': commonTemplates.itcss.main,
    'src/styles/01-settings/_index.scss': commonTemplates.itcss.settings,
    'src/styles/02-tools/_index.scss': commonTemplates.itcss.tools,
    'src/styles/03-generic/_index.scss': commonTemplates.itcss.generic,
    'src/styles/04-elements/_index.scss': commonTemplates.itcss.elements,
    'src/styles/05-objects/_index.scss': commonTemplates.itcss.objects,
    'src/styles/06-components/_index.scss': commonTemplates.itcss.components,
    'src/styles/99-utilities/_index.scss': commonTemplates.itcss.utilities,
    
    // Library Structure
    'src/lib/types/index.ts': commonTemplates.lib.types,
    'src/lib/types/components.ts': `// Component type definitions\n`,
    'src/lib/constants/index.ts': commonTemplates.lib.constants,
    'src/lib/composables/index.ts': commonTemplates.lib.composables,
    'src/lib/utils/index.ts': commonTemplates.lib.utils,
    
    // Placeholder files
    'src/components/.gitkeep': '',
    'src/assets/.gitkeep': '',
  }
};

/**
 * Next.js project templates
 */
export const nextjsProjectTemplates = {
  dependencies: ['next', 'react', 'react-dom'],
  devDependencies: ['typescript', '@types/node', '@types/react', '@types/react-dom', 'sass', 'eslint', 'eslint-config-next'],
  files: {
    // TypeScript Configuration
    'tsconfig.json': commonTemplates.typescript.nextjs,
    
    // Git Configuration
    '.gitignore': commonTemplates.git.gitignore,
    '.gitattributes': commonTemplates.git.gitattributes,
    
    // Code Quality
    '.prettierrc': commonTemplates.prettier.prettierrc,
    '.prettierignore': commonTemplates.prettier.prettierignore,
    '.eslintrc.json': commonTemplates.eslint.nextjs,
    
    // Environment
    '.env.example': commonTemplates.env,
    
    // Next.js Pages
    'src/pages/_app.tsx': `import '../styles/globals.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}`,
    
    'src/pages/index.tsx': `import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Atomix Next.js App</title>
        <meta name="description" content="Generated by Atomix CLI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Welcome to Atomix Design System</h1>
        <p>Your Next.js application is ready with Atomix components!</p>
      </main>
    </>
  );
}`,
    
    'src/styles/globals.scss': `@use './index.scss';

html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

main {
  padding: 2rem;
  text-align: center;
}`,
    
    'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./node_modules'],
  },
};

module.exports = nextConfig;`,

    // ITCSS Structure
    'src/styles/index.scss': commonTemplates.itcss.main,
    'src/styles/01-settings/_index.scss': commonTemplates.itcss.settings,
    'src/styles/02-tools/_index.scss': commonTemplates.itcss.tools,
    'src/styles/03-generic/_index.scss': commonTemplates.itcss.generic,
    'src/styles/04-elements/_index.scss': commonTemplates.itcss.elements,
    'src/styles/05-objects/_index.scss': commonTemplates.itcss.objects,
    'src/styles/06-components/_index.scss': commonTemplates.itcss.components,
    'src/styles/99-utilities/_index.scss': commonTemplates.itcss.utilities,
    
    // Library Structure
    'src/lib/types/index.ts': commonTemplates.lib.types,
    'src/lib/types/components.ts': `// Component type definitions\n`,
    'src/lib/constants/index.ts': commonTemplates.lib.constants,
    'src/lib/utils/index.ts': commonTemplates.lib.utils,
    
    // Placeholder files
    'src/components/.gitkeep': '',
    'src/public/.gitkeep': '',
  }
};

/**
 * Vanilla JavaScript project templates
 */
export const vanillaProjectTemplates = {
  dependencies: [],
  devDependencies: ['vite', 'typescript', 'sass'],
  files: {
    // TypeScript Configuration
    'tsconfig.json': commonTemplates.typescript.vanilla,
    
    // Git Configuration
    '.gitignore': commonTemplates.git.gitignore,
    '.gitattributes': commonTemplates.git.gitattributes,
    
    // Code Quality
    '.prettierrc': commonTemplates.prettier.prettierrc,
    '.prettierignore': commonTemplates.prettier.prettierignore,
    
    // Environment
    '.env.example': commonTemplates.env,
    
    // Vite Environment Types
    'src/vite-env.d.ts': commonTemplates.viteEnv,
    
    // Main Application Files
    'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Atomix Vanilla App</title>
  </head>
  <body>
    <div id="app">
      <header>
        <h1>Welcome to Atomix Design System</h1>
        <p>Your vanilla JavaScript application is ready with Atomix components!</p>
      </header>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`,
    
    'src/main.ts': `import './styles/main.scss';

console.log('Atomix Vanilla JavaScript App Initialized');`,
    
    'src/styles/main.scss': `@use './index.scss';

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-align: center;
}

header {
  background-color: #f8f9fa;
  padding: 2rem;
  border-bottom: 1px solid #dee2e6;
}`,
    
    'vite.config.ts': `import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@lib': resolve(__dirname, './src/lib'),
      '@styles': resolve(__dirname, './src/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: \`@use "@shohojdhara/atomix/scss/settings" as *;\`
      }
    }
  }
});`,

    // ITCSS Structure
    'src/styles/index.scss': commonTemplates.itcss.main,
    'src/styles/01-settings/_index.scss': commonTemplates.itcss.settings,
    'src/styles/02-tools/_index.scss': commonTemplates.itcss.tools,
    'src/styles/03-generic/_index.scss': commonTemplates.itcss.generic,
    'src/styles/04-elements/_index.scss': commonTemplates.itcss.elements,
    'src/styles/05-objects/_index.scss': commonTemplates.itcss.objects,
    'src/styles/06-components/_index.scss': commonTemplates.itcss.components,
    'src/styles/99-utilities/_index.scss': commonTemplates.itcss.utilities,
    
    // Library Structure
    'src/lib/types/index.ts': commonTemplates.lib.types,
    'src/lib/utils/index.ts': commonTemplates.lib.utils,
    
    // Placeholder files
    'src/assets/.gitkeep': '',
  }
};

/**
 * Project templates export object
 */
export const projectTemplates = {
  react: reactProjectTemplates,
  nextjs: nextjsProjectTemplates,
  vanilla: vanillaProjectTemplates,
};