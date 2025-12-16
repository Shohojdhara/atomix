/**
 * Theme Configuration
 *
 * This file is auto-generated from theme.config.ts
 * DO NOT EDIT MANUALLY - Edit theme.config.ts instead
 * 
 * Generated on: 2025-12-15T20:08:40.407Z
 */

export const themesConfig = {
  // Theme metadata
  metadata: {},

  // Build configuration
  build: {
    output: {
        directory: "themes",
        formats: {
            expanded: ".css",
            compressed: ".min.css"
        }
    },
    sass: {
        style: "expanded",
        sourceMap: true,
        loadPaths: [
            "src"
        ]
    }
},

  // Export configuration for package.json
  exports: {
    './themes/*': './dist/themes/*.css',
    './themes/*.min': './dist/themes/*.min.css',
  },

  // Theme integration settings
  integration: {
    cssVariables: {
        colorMode: "--storybook-color-mode"
    },
    classNames: {
        theme: "data-theme",
        colorMode: "data-atomix-color-mode"
    }
},

  // Runtime theme loading configuration
  runtime: {
    basePath: "/themes",
    cdnPath: null,
    preload: [
        "shaj-default"
    ],
    lazy: true,
    defaultTheme: "shaj-default",
    storageKey: "atomix-theme",
    useMinified: process.env.NODE_ENV === 'production'
},

  // Theme dependencies (if a theme requires another theme to be loaded)
  dependencies: {},
};