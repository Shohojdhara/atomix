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
      supportsDarkMode: true
    },
    'boomdevs': {
      name: 'BoomDevs',
      description: 'BoomDevs theme for the Atomix Design System',
      author: 'BoomDevs Team',
      version: '1.0.0',
      tags: ['dark', 'modern'],
      supportsDarkMode: true
    },
    'esrar': {
      name: 'Esrar',
      description: 'Esrar theme for the Atomix Design System',
      author: 'Esrar Team',
      version: '1.0.0',
      tags: ['light', 'minimal'],
      supportsDarkMode: true
    },
    'mashroom': {
      name: 'Mashroom',
      description: 'Mashroom theme for the Atomix Design System',
      author: 'Mashroom Team',
      version: '1.0.0',
      tags: ['dark', 'contrast'],
      supportsDarkMode: true
    },
    'yabai': {
      name: 'Yabai',
      description: 'Yabai theme for the Atomix Design System',
      author: 'Yabai Team',
      version: '1.0.0',
      tags: ['dark', 'vibrant'],
      supportsDarkMode: true
    }
  },

  // Build configuration
  build: {
    output: {
      directory: 'themes',
      formats: {
        expanded: '.css',
        compressed: '.min.css'
      }
    },
    sass: {
      style: 'expanded',
      sourceMap: true,
      loadPaths: ['src']
    }
  },

  // Export configuration for package.json
  exports: {
    './themes/*': './dist/themes/*.css',
    './themes/*.min': './dist/themes/*.min.css'
  },
  
  // Theme integration settings
  integration: {
    // CSS variables for theme integration
    cssVariables: {
      colorMode: '--storybook-color-mode'
    },
    
    // Class names used for theme and color mode
    classNames: {
      theme: 'data-theme',
      colorMode: 'data-color-mode'
    }
  }
};