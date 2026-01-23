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
    glassMode: {
      description: 'Glass morphism effect toggle',
      defaultValue: false,
      toolbar: {
        title: 'Glass Mode',
        icon: 'mirror',
        items: [
          { value: false, title: 'Standard' },
          { value: true, title: 'Glass Effect' },
        ],
        dynamicTitle: true,
      },
    },
    animationSpeed: {
      description: 'Animation speed for component transitions',
      defaultValue: 'normal',
      toolbar: {
        title: 'Animation',
        icon: 'autoplay',
        items: [
          { value: 'none', title: 'No Animation' },
          { value: 'slow', title: 'Slow' },
          { value: 'normal', title: 'Normal' },
          { value: 'fast', title: 'Fast' },
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
      const glassMode = context.globals?.glassMode || false;
      const animationSpeed = context.globals?.animationSpeed || 'normal';

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

        // Apply glass mode
        document.body.classList.toggle('glass-mode-enabled', glassMode);
        
        // Apply animation speed
        const root = document.documentElement;
        root.style.setProperty('--animation-speed-multiplier', 
          animationSpeed === 'none' ? '0' : 
          animationSpeed === 'slow' ? '2' : 
          animationSpeed === 'fast' ? '0.5' : '1'
        );

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
            --storybook-glass-mode: ${glassMode};
            --storybook-animation-speed: ${animationSpeed};
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
          
          /* Glass mode enhancements */
          .glass-mode-enabled .story-preview-container {
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
          }
          
          .glass-mode-enabled.dark .story-preview-container {
            background: rgba(0, 0, 0, 0.3) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
          }
          
          /* Animation speed control */
          *, *::before, *::after {
            animation-duration: calc(var(--animation-duration, 0.3s) * var(--animation-speed-multiplier, 1)) !important;
            transition-duration: calc(var(--transition-duration, 0.2s) * var(--animation-speed-multiplier, 1)) !important;
          }
          
          /* Enhanced transitions for interactive demos */
          .story-interactive-demo * {
            transition: all 0.3s ease !important;
          }
          
          .story-variants-grid > div {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          
          /* Better background handling for glass components */
          .c-atomix-glass-background {
            position: relative;
            overflow: hidden;
          }
          
          /* Smooth state transitions */
          .story-preview-container {
            transition: all 0.3s ease;
          }
          
          /* Enhanced focus indicators */
          .storybook-focus-indicator:focus {
            outline: 2px solid #007bff;
            outline-offset: 3px;
            border-radius: 6px;
            box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
            transition: all 0.2s ease;
          }
          
          /* Loading state animations */
          .storybook-loading::after {
            animation: loading calc(1.5s * var(--animation-speed-multiplier, 1)) infinite;
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
      }, [colorMode, previewSize, glassMode, animationSpeed]);

      return Story();
    },
  ],

};


export default preview;
