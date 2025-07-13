import type { Preview } from '@storybook/react';
import { useEffect } from 'react';
import '../src/styles/index.scss';

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
      defaultViewport: 'none',
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
    shajTheme: {
      name: 'Shaj Theme',
      description: 'Global Shaj theme for components',
      defaultValue: 'shaj-default',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'shaj-default', title: 'Default', left: '🔵' },
          { value: 'shaj-ocean', title: 'Ocean', left: '🌊' },
          { value: 'shaj-sunset', title: 'Sunset', left: '🌅' },
          { value: 'shaj-forest', title: 'Forest', left: '🌲' },
          { value: 'shaj-midnight', title: 'Midnight', left: '🌙' },
          { value: 'shaj-pastel', title: 'Pastel', left: '🌸' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const colorMode = context.globals.colorMode || 'light';
      const shajTheme = context.globals.shajTheme || 'shaj-default';

      useEffect(() => {
        // Apply Atomix color mode
        document.documentElement.setAttribute('data-atomix-theme', colorMode);

        // Apply Shaj theme
        document.documentElement.setAttribute('data-theme', shajTheme);

        return () => {
          document.documentElement.removeAttribute('data-atomix-theme');
          document.documentElement.removeAttribute('data-theme');
        };
      }, [colorMode, shajTheme]);

      return <Story />;
    },
  ],

  tags: ['!autodocs'],
};

export default preview;
