import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
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
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': resolve(__dirname, '../src'),
      '@shohojdhara/atomix': resolve(__dirname, '../src/index.ts'),
    };

    // Disable react-docgen plugin to avoid parsing errors
    config.plugins = config.plugins?.filter(
      (plugin) => !plugin?.name?.includes('react-docgen')
    );

    return config;
  },
};

export default config;
