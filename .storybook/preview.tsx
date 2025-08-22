import type { Preview } from '@storybook/react';
import { useEffect } from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
    docs: {
      toc: false,
    },
    backgrounds: {
      default: 'none',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#171f2a',
        },
        {
          name: 'gray',
          value: '#f8f9fa',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
        wide: {
          name: 'Wide',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Design Tokens',
          ['Colors', 'Typography', 'Spacing', 'Box Shadow'],
          'Components',
          'Layouts',
          'Examples',
        ],
      },
    },
  },

  globalTypes: {
    colorMode: {
      name: 'Color Mode',
      description: 'Global color mode for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', left: '☀️' },
          { value: 'dark', title: 'Dark', left: '🌙' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    stylesheets: {
      themes: [
        {
          id: 'primary-theme',
          title: 'Primary theme',
          url: '../src/styles/index.scss',
        },
        {
          id: 'yobai-theme',
          title: 'Yobai theme',
          url: '../src/themes/yabai/index.scss',
        },
        {
          id: 'shaj-theme',
          title: 'Shaj theme',
          url: '../src/themes/shaj-default/index.scss',
        },
        {
          id: 'magic-theme',
          title: 'Mashroom theme',
          url: '../src/themes/mashroom/index.scss',
        },
      ],
    },
  },

  decorators: [
    (Story, context) => {
      const colorMode = context.globals.colorMode || 'light';

      useEffect(() => {
        // Apply Atomix color mode
        document.documentElement.setAttribute('data-atomix-theme', colorMode);

        return () => {
          document.documentElement.removeAttribute('data-atomix-theme');
        };
      }, [colorMode]);

      return <Story />;
    },
  ],

  tags: ['!autodocs'],
};

export default preview;
