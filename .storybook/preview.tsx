import { addons } from '@storybook/preview-api';
import type { Preview } from '@storybook/react';
import { useEffect } from 'react';
// import '../src/styles/index.scss';
// Base styles for development; in production builds, dist CSS is served via staticDirs
import { themes, getThemeClasses } from './themes.config';

const preview: Preview = {
  parameters: {
    // Layout configuration - default to centered, but allow fullscreen overrides
    layout: 'centered',
    
    // Actions configuration for event handlers
    actions: { argTypesRegex: '^on[A-Z].*' },
    
    // Enhanced controls configuration
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
      sort: 'requiredFirst',
      hideNoControlsWarning: true,
    },
    
    // Enhanced docs configuration
    docs: {
      toc: false,
      source: {
        type: 'code',
        state: 'open',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
    
    // Background configuration
    backgrounds: {
      default: 'none',
      disable: false,
      values: [
        {
          name: 'none',
          value: 'transparent',
        },
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
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
    
    // Enhanced viewport configuration
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        mobileLandscape: {
          name: 'Mobile Landscape',
          styles: {
            width: '640px',
            height: '360px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        tabletLandscape: {
          name: 'Tablet Landscape',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1366px',
            height: '768px',
          },
        },
        desktopLarge: {
          name: 'Desktop Large',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
        large: {
          name: 'Large Screen',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
        ultrawide: {
          name: 'Ultrawide',
          styles: {
            width: '2560px',
            height: '1080px',
          },
        },
      },
    },
    
    // Performance and rendering options
    chromatic: {
      viewports: [360, 768, 1366, 1920],
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals?.theme || 'atomix';
      const colorMode = context.globals?.colorMode || 'light';

      useEffect(() => {
        // Remove all theme classes
        document.body.classList.forEach(className => {
          if (getThemeClasses().includes(className)) {
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
        let href = '';
        if (theme === 'atomix') {
          href = `/atomix.css`;
        } else if (theme !== 'none') {
          href = `/themes/${theme}.css`;
        }
        if (href) {
          link.href = href;
          document.head.appendChild(link);
        }

        // Apply color mode to the theme
        const themeStyle = document.getElementById('storybook-theme-vars');
        if (themeStyle) {
          themeStyle.remove();
        }

        // Create dynamic style for theme variables and fullscreen support
        const style = document.createElement('style');
        style.id = 'storybook-theme-vars';
        style.textContent = `
          :root {
            --storybook-color-mode: ${colorMode};
          }
          
          /* Enhanced fullscreen story support */
          .sb-show-main.sb-main-padded[data-layout="fullscreen"],
          .sb-show-main.sb-main-padded[data-layout="fullscreen"] .sb-main-padded {
            padding: 0 !important;
            margin: 0 !important;
          }
          
          /* Ensure fullscreen stories take full viewport */
          [data-layout="fullscreen"] .os-host,
          [data-layout="fullscreen"] .os-host-overflow,
          [data-layout="fullscreen"] .os-host-resize-disabled {
            height: 100vh !important;
            width: 100vw !important;
          }
          
          /* Improve canvas rendering for fullscreen */
          [data-layout="fullscreen"] .docs-story,
          [data-layout="fullscreen"] .sb-story {
            height: 100vh;
            width: 100vw;
            overflow: hidden;
          }
          
          /* Better background handling for glass components */
          .c-atomix-glass-background {
            position: relative;
            overflow: hidden;
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
      if (getThemeClasses().includes(className)) {
        document.body.classList.remove(className);
      }
    });
    document.body.classList.add(theme);
  });
}

export default preview;
