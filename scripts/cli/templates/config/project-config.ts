/**
 * Project Configuration Templates
 * Templates for generating project configuration files
 */

/**
 * Generates a package.json template for new projects
 */
export const packageJsonTemplate = (): string => `{
  "name": "@shohojdhara/atomix-project",
  "version": "1.0.0",
  "description": "Project built with Atomix Design System",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "test": "vitest",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "@shohojdhara/atomix": "^2.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "jest-axe": "^8.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
`;

/**
 * Generates a tsconfig.json template
 */
export const tsconfigTemplate = (): string => `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@styles/*": ["src/styles/*"],
      "@lib/*": ["src/lib/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`;

/**
 * Generates a vite.config.ts template
 */
export const viteConfigTemplate = (): string => `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
});
`;

/**
 * All project configuration templates
 */
export const projectConfigTemplates = {
  packageJson: packageJsonTemplate,
  tsconfig: tsconfigTemplate,
  viteConfig: viteConfigTemplate,
};

/**
 * Type for project configuration templates object
 */
export type ProjectConfigTemplates = typeof projectConfigTemplates;
