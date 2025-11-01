import { addons } from '@storybook/preview-api';
import type { Preview } from '@storybook/react';
import { useEffect } from 'react';
// import '../src/styles/index.scss';
import '../src/themes/applemix/index.scss';

// Theme list
const themes = [
  { name: 'Atomix', class: 'atomix', color: '#000000' },
  { name: 'Shaj', class: 'shaj-default', color: '#3b82f6' },
  { name: 'BoomDevs', class: 'boomdevs', color: '#8b5cf6' },
  { name: 'None', class: 'none', color: '#ef4444' },
  { name: 'Applemix', class: 'applemix', color: '#f5f5f5' },
];

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
            width: '1366px',
            height: '768px',
          },
        },
        large: {
          name: 'Large Screen',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals?.theme || 'atomix';
      const colorMode = context.globals?.colorMode || 'light';

      useEffect(() => {
        // Remove all theme classes
        document.body.classList.forEach(className => {
          if (themes.map(t => t.class).includes(className)) {
            document.body.classList.remove(className);
          }
        });

        // Add the selected theme class
        document.body.classList.add(theme);

        // Update data-theme attribute
        document.body.setAttribute('data-theme', theme);

        // Handle color mode
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(colorMode);
        document.body.setAttribute('data-atomix-color-mode', colorMode);

        // Load theme CSS
        const themeLink = document.getElementById('storybook-theme');
        if (themeLink) {
          themeLink.remove();
        }

        const link = document.createElement('link');
        link.id = 'storybook-theme';
        link.rel = 'stylesheet';
        if (theme === 'atomix') {
          link.href = `/atomix.css`;
        } else if (theme === 'none') {
          link.href = ``;
        } else {
          link.href = `/themes/${theme}.css`;
        }
        document.head.appendChild(link);

        // Apply color mode to the theme
        const themeStyle = document.getElementById('storybook-theme-vars');
        if (themeStyle) {
          themeStyle.remove();
        }

        // Create dynamic style for theme variables
        const style = document.createElement('style');
        style.id = 'storybook-theme-vars';
        style.textContent = `
          :root {
            --storybook-color-mode: ${colorMode};
          }
        `;
        document.head.appendChild(style);

        // Also update the color mode attribute that the components use
        document.documentElement.setAttribute('data-atomix-color-mode', colorMode);
      }, [theme, colorMode]);

      return Story();
    },
  ],

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'atomix',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: themes.map(theme => ({
          value: theme.class,
          title: theme.name,
          left: `🎨`,
        })),
      },
    },
    colorMode: {
      name: 'Color Mode',
      description: 'Color mode for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Color',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', left: '⚪' },
          { value: 'dark', title: 'Dark', left: '⚫' },
        ],
      },
    },
  },
};

// Listen for theme updates
if (typeof window !== 'undefined') {
  const channel = addons.getChannel();
  channel.on('theme-update', (theme: string) => {
    document.body.setAttribute('data-theme', theme);
    document.body.classList.forEach(className => {
      if (themes.map(t => t.class).includes(className)) {
        document.body.classList.remove(className);
      }
    });
    document.body.classList.add(theme);
  });
}

export default preview;
