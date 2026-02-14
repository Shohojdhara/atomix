/**
 * Common Configuration Templates
 * Templates for configuration files used across all project types
 */

/**
 * TypeScript Configuration Templates
 */
export const typescriptTemplates = {
  // React TypeScript config
  react: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@lib/*": ["./src/lib/*"],
      "@styles/*": ["./src/styles/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,

  // React Node TypeScript config
  reactNode: `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`,

  // Next.js TypeScript config
  nextjs: `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@lib/*": ["./src/lib/*"],
      "@styles/*": ["./src/styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}`,

  // Vanilla TypeScript config
  vanilla: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@lib/*": ["./src/lib/*"],
      "@styles/*": ["./src/styles/*"]
    }
  },
  "include": ["src"]
}`
};

/**
 * Git Configuration Templates
 */
export const gitTemplates = {
  gitignore: `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
*.lcov
.nyc_output

# Production
build/
dist/
.next/
out/

# Misc
.DS_Store
*.pem
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Atomix
.atomix/
themes/*/dist/

# OS
Thumbs.db
`,

  gitattributes: `# Auto detect text files and perform LF normalization
* text=auto

# Source code
*.js text eol=lf
*.jsx text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.json text eol=lf
*.css text eol=lf
*.scss text eol=lf
*.html text eol=lf
*.md text eol=lf

# Binary files
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.svg binary
*.woff binary
*.woff2 binary
*.ttf binary
*.eot binary
`
};

/**
 * Prettier Configuration Templates
 */
export const prettierTemplates = {
  prettierrc: `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}`,

  prettierignore: `# Dependencies
node_modules/

# Production
build/
dist/
.next/
out/

# Misc
coverage/
.cache/
*.min.js
*.min.css

# Package manager
package-lock.json
yarn.lock
pnpm-lock.yaml
`
};

/**
 * ESLint Configuration Templates
 */
export const eslintTemplates = {
  // React ESLint config
  react: `module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}`,

  // Next.js ESLint config
  nextjs: `{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}`
};

/**
 * Vite Environment Declaration
 */
export const viteEnvTemplate = `/// <reference types="vite/client" />
`;

/**
 * README Templates
 */
export const readmeTemplates = {
  react: (projectName) => `# ${projectName}

A React application built with Atomix Design System.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Atomix CLI Commands

### Build Theme

\`\`\`bash
npm run build:theme
\`\`\`

### Generate Component

\`\`\`bash
npm run generate:component
\`\`\`

### Validate Design Tokens

\`\`\`bash
npm run validate
\`\`\`

## Project Structure

\`\`\`
src/
├── components/     # React components
├── lib/           # Utilities, types, constants
├── styles/        # SCSS styles (ITCSS)
└── assets/        # Static assets
\`\`\`

## Learn More

- [Atomix Documentation](https://github.com/shohojdhara/atomix)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
`,

  nextjs: (projectName) => `# ${projectName}

A Next.js application built with Atomix Design System.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

\`\`\`bash
npm run build
\`\`\`

### Start Production Server

\`\`\`bash
npm start
\`\`\`

## Atomix CLI Commands

### Build Theme

\`\`\`bash
npm run build:theme
\`\`\`

### Generate Component

\`\`\`bash
npm run generate:component
\`\`\`

### Validate Design Tokens

\`\`\`bash
npm run validate
\`\`\`

## Project Structure

\`\`\`
src/
├── pages/         # Next.js pages
├── components/    # React components
├── lib/          # Utilities, types, constants
├── styles/       # SCSS styles (ITCSS)
└── public/       # Static files
\`\`\`

## Learn More

- [Atomix Documentation](https://github.com/shohojdhara/atomix)
- [Next.js Documentation](https://nextjs.org/docs)
`,

  vanilla: (projectName) => `# ${projectName}

A vanilla JavaScript/TypeScript application built with Atomix Design System.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Atomix CLI Commands

### Build Theme

\`\`\`bash
npm run build:theme
\`\`\`

### Validate Design Tokens

\`\`\`bash
npm run validate
\`\`\`

## Project Structure

\`\`\`
src/
├── lib/          # Utilities and types
├── styles/       # SCSS styles (ITCSS)
└── assets/       # Static assets
\`\`\`

## Learn More

- [Atomix Documentation](https://github.com/shohojdhara/atomix)
- [Vite Documentation](https://vitejs.dev)
`
};

/**
 * Environment Variables Template
 */
export const envTemplate = `# Environment Variables
# Copy this file to .env.local and fill in your values

# API Configuration
# VITE_API_URL=http://localhost:3000/api

# Feature Flags
# VITE_ENABLE_ANALYTICS=false
`;

/**
 * ITCSS Index Files
 */
export const itcssIndexTemplates = {
  settings: `// Settings Layer
// Global variables, config switches, and brand colors

// Import Atomix settings or define your own
// @use '@shohojdhara/atomix/scss/settings' as *;
`,

  tools: `// Tools Layer
// Globally used mixins and functions

// Import Atomix tools or define your own
// @use '@shohojdhara/atomix/scss/tools' as *;
`,

  generic: `// Generic Layer
// Ground-zero styles (normalize.css, resets, box-sizing)

// Import Atomix generic styles or define your own
// @use '@shohojdhara/atomix/scss/generic' as *;
`,

  elements: `// Elements Layer
// Unclassed HTML elements (type selectors)

// Import Atomix element styles or define your own
// @use '@shohojdhara/atomix/scss/elements' as *;
`,

  objects: `// Objects Layer
// Cosmetic-free design patterns (layouts, grids)

// Import Atomix object styles or define your own
// @use '@shohojdhara/atomix/scss/objects' as *;
`,

  components: `// Components Layer
// Designed components, chunks of UI

// Import Atomix components or define your own
// @use '@shohojdhara/atomix/scss/components' as *;
`,

  utilities: `// Utilities Layer
// Helper classes with ability to override anything

// Import Atomix utilities or define your own
// @use '@shohojdhara/atomix/scss/utilities' as *;
`,

  main: `// Main Stylesheet
// ITCSS Architecture

@forward '01-settings';
@forward '02-tools';
@forward '03-generic';
@forward '04-elements';
@forward '05-objects';
@forward '06-components';
@forward '99-utilities';
`
};

/**
 * Library Index Files
 */
export const libIndexTemplates = {
  types: `// Type definitions
export * from './components';
`,

  constants: `// Application constants
export const APP_NAME = 'Atomix App';
export const APP_VERSION = '1.0.0';
`,

  composables: `// React hooks and composables
`,

  utils: `// Utility functions

/**
 * Combine class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format date
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString();
}
`
};

/**
 * Vitest Configuration Template
 */
export const vitestTemplate = `import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});
`;

/**
 * Export all templates
 */
export const commonTemplates = {
  typescript: typescriptTemplates,
  git: gitTemplates,
  prettier: prettierTemplates,
  eslint: eslintTemplates,
  viteEnv: viteEnvTemplate,
  readme: readmeTemplates,
  env: envTemplate,
  itcss: itcssIndexTemplates,
  lib: libIndexTemplates,
  vitest: vitestTemplate,
};
