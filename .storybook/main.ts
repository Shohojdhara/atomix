
import type { StorybookConfig } from '@storybook/react-vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const getDirname = () => {
  if (typeof __dirname !== 'undefined') return __dirname;
  return dirname(fileURLToPath(import.meta.url));
};

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  managerHead: (head) => `
    ${head}
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https:;">
  `,

  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-backgrounds',
    '@storybook/addon-viewport',
  ],
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [
    { from: '../dist', to: '/' },
  ],
  viteFinal: async (config, { configType }) => {
    // Align aliases with vitest.config.ts so imports like @ and @shohojdhara/atomix work
    config.resolve = config.resolve || {};
    const dirPath = getDirname();
    const srcPath = resolve(dirPath, '../src');
    const indexPath = resolve(dirPath, '../src/index.ts');
    
    // Validate paths to prevent traversal
    if (!srcPath.startsWith(resolve(dirPath, '../')) || !indexPath.startsWith(resolve(dirPath, '../'))) {
      throw new Error('Invalid path detected');
    }
    
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': srcPath,
      '@shohojdhara/atomix': indexPath,
    };

    // Configure build options to handle peer dependencies
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    config.build.rollupOptions.external = [
      ...(Array.isArray(config.build.rollupOptions.external) 
        ? config.build.rollupOptions.external 
        : []),
    ];

    // Optimize dependencies - include peer dependencies that should be bundled
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include || []),
      '@phosphor-icons/react',
    ];

    // Configure Sass to use modern API and silence deprecation warnings
    config.css = config.css || {};
    config.css.preprocessorOptions = {
      ...(config.css.preprocessorOptions || {}),
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
    };

    // Add CSP headers
    config.server = config.server || {};
    config.server.headers = {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data: https:; connect-src 'self' ws: wss:; frame-src 'self';"
    };

    // Disable react-docgen plugin to avoid parsing errors
    config.plugins = config.plugins?.filter(
      (plugin) => {
        // Preserve falsy plugins (null, undefined) - they may be placeholders
        if (!plugin) return true;
        // Preserve non-object plugins
        if (typeof plugin !== 'object') return true;
        // Preserve plugins without name property
        if (!('name' in plugin)) return true;
        // Filter out react-docgen plugins
        return !plugin.name?.includes('react-docgen');
      }
    );

    return config;
  },
};

export default config;
