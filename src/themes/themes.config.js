/**
 * Theme Configuration
 *
 * This file contains the configuration for all available themes in the Atomix Design System.
 * It defines metadata about each theme and their build settings.
 */

export const themesConfig = {
  // Theme metadata
  metadata: {
    'shaj-default': {
      name: 'Shaj Default',
      description: 'The default theme for the Atomix Design System',
      author: 'Shohoj Dhara',
      version: '1.0.0',
      tags: ['default', 'light'],
      supportsDarkMode: true,
      status: 'stable',
      a11y: { contrastTarget: 4.5, modes: ['light', 'dark'] },
    },
    boomdevs: {
      name: 'BoomDevs',
      description: 'BoomDevs theme for the Atomix Design System',
      author: 'BoomDevs Team',
      version: '1.0.0',
      tags: ['dark', 'modern'],
      supportsDarkMode: true,
      status: 'beta',
      a11y: { contrastTarget: 4.5, modes: ['light', 'dark'] },
    },
    esrar: {
      name: 'Esrar',
      description: 'Esrar theme for the Atomix Design System',
      author: 'Esrar Team',
      version: '1.0.0',
      tags: ['light', 'minimal'],
      supportsDarkMode: true,
      status: 'beta',
      a11y: { contrastTarget: 4.5, modes: ['light', 'dark'] },
    },
    mashroom: {
      name: 'Mashroom',
      description: 'Mashroom theme for the Atomix Design System',
      author: 'Mashroom Team',
      version: '1.0.0',
      tags: ['dark', 'contrast'],
      supportsDarkMode: true,
      status: 'beta',
      a11y: { contrastTarget: 4.5, modes: ['light', 'dark'] },
    },
    applemix: {
      name: 'Applemix',
      description: 'Apple Mac OS 2026 Liquid Glass inspired theme with morphism effects',
      author: 'Atomix Design System',
      version: '1.0.0',
      tags: ['glass', 'apple', 'modern', 'liquid', 'morphism'],
      supportsDarkMode: true,
      features: [
        'Liquid glass morphism effects',
        'Apple-inspired color palette',
        'Chromatic aberration effects',
        'Smooth animations and transitions',
        'AtomixGlass component integration',
        'Comprehensive component overrides',
        'Light and dark mode support',
      ],
      status: 'experimental',
      a11y: { contrastTarget: 4.5, modes: ['light', 'dark'] },
    },
  },

  // Build configuration
  build: {
    output: {
      directory: 'themes',
      formats: {
        expanded: '.css',
        compressed: '.min.css',
      },
    },
    sass: {
      style: 'expanded',
      sourceMap: true,
      loadPaths: ['src'],
    },
  },

  // Export configuration for package.json
  exports: {
    './themes/*': './dist/themes/*.css',
    './themes/*.min': './dist/themes/*.min.css',
  },

  // Theme integration settings
  integration: {
    // CSS variables for theme integration
    cssVariables: {
      colorMode: '--storybook-color-mode',
    },

    // Attribute names used for theme and color mode (kept in sync with .storybook/preview.tsx)
    classNames: {
      theme: 'data-theme',
      colorMode: 'data-atomix-color-mode',
    },
  },
};
