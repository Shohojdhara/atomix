import type { Preview } from '@storybook/react';
import { useEffect } from 'react';
import '../src/styles/index.scss';
import './storybook-previews.css';

const preview: Preview = {
  globalTypes: {
    colorMode: {
      description: 'Color mode selector',
      defaultValue: 'light',
      toolbar: {
        title: 'Color Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    previewSize: {
      description: 'Preview canvas size for responsive testing',
      defaultValue: 'auto',
      toolbar: {
        title: 'Preview Size',
        icon: 'resize',
        items: [
          { value: 'auto', title: 'Auto Fit' },
          { value: 'small', title: 'Small (320px)' },
          { value: 'medium', title: 'Medium (768px)' },
          { value: 'large', title: 'Large (1024px)' },
          { value: 'xlarge', title: 'X-Large (1440px)' },
          { value: 'custom', title: 'Custom Size' },
        ],
        dynamicTitle: true,
      },
    },
  },
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
      const colorMode = context.globals?.colorMode || 'light';
      const previewSize = context.globals?.previewSize || 'auto';

      useEffect(() => {
        // Set default theme
        document.body.setAttribute('data-theme', 'atomix');

        // Handle color mode
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(colorMode);
        document.body.setAttribute('data-atomix-color-mode', colorMode);

        // Apply preview size settings
        const storyElement = document.querySelector('.sb-show-main');
        if (storyElement) {
          storyElement.classList.remove('preview-size-small', 'preview-size-medium', 'preview-size-large', 'preview-size-xlarge');
          
          if (previewSize !== 'auto') {
            storyElement.classList.add(`preview-size-${previewSize}`);
          }
        }

        // Apply color mode to the theme
        const themeStyle = document.getElementById('storybook-theme-vars');
        if (themeStyle) {
          themeStyle.remove();
        }

        // Create dynamic style for enhanced features
        const style = document.createElement('style');
        style.id = 'storybook-theme-vars';
        style.textContent = `
          :root {
            --storybook-color-mode: ${colorMode};
            --storybook-preview-size: ${previewSize};
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
          
          /* Preview size constraints */
          .preview-size-small .sb-story {
            max-width: 320px !important;
            margin: 0 auto !important;
          }
          
          .preview-size-medium .sb-story {
            max-width: 768px !important;
            margin: 0 auto !important;
          }
          
          .preview-size-large .sb-story {
            max-width: 1024px !important;
            margin: 0 auto !important;
          }
          
          .preview-size-xlarge .sb-story {
            max-width: 1440px !important;
            margin: 0 auto !important;
          }
          
          /* Responsive preview enhancements */
          @media (max-width: 768px) {
            .preview-size-small .sb-story,
            .preview-size-medium .sb-story,
            .preview-size-large .sb-story,
            .preview-size-xlarge .sb-story {
              max-width: 100% !important;
              padding: 0 1rem !important;
            }
          }
        `;
        document.head.appendChild(style);

        // Also update the color mode attribute that the components use
        document.documentElement.setAttribute('data-atomix-color-mode', colorMode);
        
        // Add responsive preview resize handling
        const handleResize = () => {
          if (previewSize === 'auto') {
            // Auto-adjust based on viewport
            const viewport = document.querySelector('.sb-preview');
            if (viewport && viewport instanceof HTMLElement) {
              const width = viewport.clientWidth;
              viewport.style.maxWidth = width + 'px';
            }
          }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [colorMode, previewSize]);

      return Story();
    },
  ],

};


export default preview;
