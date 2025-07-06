# Atomix CSS Integration Guide

This guide provides comprehensive documentation on how to integrate and use Atomix CSS in your projects, including various CSS usage options.

## Table of Contents

1. [Quick Start](#quick-start)
2. [CSS Import Options](#css-import-options)
3. [SCSS Customization](#scss-customization)
4. [CSS Modules Integration](#css-modules-integration)
5. [Framework-Specific Integration](#framework-specific-integration)
6. [Theming and Customization](#theming-and-customization)
7. [Performance Optimization](#performance-optimization)
8. [Troubleshooting](#troubleshooting)

## Quick Start

### Basic CSS Import

The simplest way to use Atomix styles is to import the compiled CSS:

```javascript
// Import the complete CSS bundle
import '@shohojdhara/atomix/css';

// Or import the minified version for production
import '@shohojdhara/atomix/css/min';
```

### CDN Usage

For quick prototyping or simple projects:

```html
<!-- Latest version -->
<link rel="stylesheet" href="https://unpkg.com/@shohojdhara/atomix@latest/dist/css/atomix.css">

<!-- Minified version -->
<link rel="stylesheet" href="https://unpkg.com/@shohojdhara/atomix@latest/dist/css/atomix.min.css">
```

## CSS Import Options

### 1. Full CSS Bundle

Import the complete Atomix CSS including all components and utilities:

```javascript
// ES6 import
import '@shohojdhara/atomix/css';

// CommonJS require
require('@shohojdhara/atomix/css');
```

**Pros:**
- Complete design system
- All components styled
- Consistent theming

**Cons:**
- Larger bundle size (~230KB)
- May include unused styles

### 2. SCSS Source Import

Import the SCSS source for maximum customization:

```scss
// Import everything
@use '@shohojdhara/atomix/scss' as atomix;

// Or import specific layers
@use '@shohojdhara/atomix/src/styles/01-settings' as settings;
@use '@shohojdhara/atomix/src/styles/02-tools' as tools;
@use '@shohojdhara/atomix/src/styles/06-components' as components;
```

### 3. Selective Component Imports

Import only the styles you need:

```scss
// Import base settings and tools
@use '@shohojdhara/atomix/src/styles/01-settings' as *;
@use '@shohojdhara/atomix/src/styles/02-tools' as *;

// Import specific components
@use '@shohojdhara/atomix/src/styles/06-components/components.button';
@use '@shohojdhara/atomix/src/styles/06-components/components.card';
@use '@shohojdhara/atomix/src/styles/06-components/components.modal';
```

## SCSS Customization

### Custom Theme Configuration

Create your own theme by overriding Atomix variables:

```scss
// custom-theme.scss

// Override color variables
$primary-6: #6366f1; // Custom primary color
$success-6: #10b981; // Custom success color
$error-6: #ef4444;   // Custom error color

// Override spacing
$spacing-base: 1rem;
$spacing-xs: $spacing-base * 0.25;
$spacing-sm: $spacing-base * 0.5;
$spacing-md: $spacing-base;
$spacing-lg: $spacing-base * 1.5;
$spacing-xl: $spacing-base * 2;

// Override typography
$font-family-base: 'Inter', system-ui, sans-serif;
$font-size-base: 1rem;
$line-height-base: 1.5;

// Import Atomix after your customizations
@use '@shohojdhara/atomix/scss' as atomix;
```

### Component-Specific Customization

Override specific component styles:

```scss
// Import Atomix base
@use '@shohojdhara/atomix/scss' as atomix;

// Custom button styles
.c-btn {
  border-radius: 0.75rem; // More rounded buttons
  font-weight: 600;       // Bolder text
  
  &--primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  }
}

// Custom card styles
.c-card {
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
```

## CSS Modules Integration

### Webpack Configuration

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

### Usage with CSS Modules

```javascript
// Import global Atomix styles
import '@shohojdhara/atomix/css';

// Import your custom CSS modules
import styles from './MyComponent.module.css';

function MyComponent() {
  return (
    <div className={`c-card ${styles.customCard}`}>
      <button className={`c-btn c-btn--primary ${styles.customButton}`}>
        Click me
      </button>
    </div>
  );
}
```

```css
/* MyComponent.module.css */
.customCard {
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.customButton {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### TypeScript Support for CSS Modules

Atomix provides TypeScript definitions for CSS Modules:

```typescript
// Import type definitions
import { AtomixCSSModules } from '@shohojdhara/atomix/css-modules';

// Use with your custom modules
import styles from './component.module.css';

// TypeScript will provide autocomplete for Atomix classes
const className = `c-btn c-btn--primary ${styles.customButton}`;
```

## Framework-Specific Integration

### Next.js Integration

```javascript
// pages/_app.js
import '@shohojdhara/atomix/css';
import '../styles/globals.css'; // Your custom styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    });
    return config;
  },
};
```

### Vite Integration

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@shohojdhara/atomix/src/styles/01-settings" as *;`,
      },
    },
  },
});
```

### Create React App Integration

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@shohojdhara/atomix/css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

For SCSS support in CRA, install `sass`:

```bash
npm install sass
```

Then import SCSS files:

```javascript
// src/App.js
import './App.scss'; // Your custom SCSS
```

```scss
// src/App.scss
@use '@shohojdhara/atomix/scss' as atomix;

// Your custom styles here
```

## Theming and Customization

### CSS Custom Properties

Atomix uses CSS custom properties for theming. You can override them:

```css
:root {
  --atomix-primary: #6366f1;
  --atomix-secondary: #f1f5f9;
  --atomix-success: #10b981;
  --atomix-error: #ef4444;
  --atomix-warning: #f59e0b;
  --atomix-info: #3b82f6;
  
  --atomix-spacing-xs: 0.25rem;
  --atomix-spacing-sm: 0.5rem;
  --atomix-spacing-md: 1rem;
  --atomix-spacing-lg: 1.5rem;
  --atomix-spacing-xl: 2rem;
  
  --atomix-border-radius: 0.375rem;
  --atomix-border-radius-lg: 0.75rem;
  
  --atomix-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --atomix-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --atomix-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Dark theme */
[data-atomix-theme="dark"] {
  --atomix-primary: #8b5cf6;
  --atomix-secondary: #374151;
  --atomix-background: #111827;
  --atomix-surface: #1f2937;
  --atomix-text: #f9fafb;
}
```

### Dynamic Theme Switching

```javascript
// useTheme.js
import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('atomix-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-atomix-theme', savedTheme);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('atomix-theme', newTheme);
    document.documentElement.setAttribute('data-atomix-theme', newTheme);
  };
  
  return { theme, toggleTheme };
}
```

```javascript
// ThemeToggle.js
import { useTheme } from './useTheme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      className="c-btn c-btn--secondary" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;
```

### SCSS Variable Customization

```scss
// _custom-variables.scss

// Colors
$primary-6: #6366f1 !default;
$success-6: #10b981 !default;
$error-6: #ef4444 !default;

// Typography
$font-family-base: 'Inter', system-ui, sans-serif !default;
$font-size-base: 1rem !default;
$line-height-base: 1.6 !default;

// Spacing
$spacing-base: 1rem !default;
$spacing-scale: (
  xs: $spacing-base * 0.25,
  sm: $spacing-base * 0.5,
  md: $spacing-base,
  lg: $spacing-base * 1.5,
  xl: $spacing-base * 2,
  2xl: $spacing-base * 2.5,
  3xl: $spacing-base * 3
) !default;

// Border radius
$border-radius-base: 0.375rem !default;
$border-radius-lg: 0.75rem !default;
$border-radius-xl: 1rem !default;

// Import Atomix after your variables
@use '@shohojdhara/atomix/scss' as atomix;
```

## Performance Optimization

### Tree Shaking CSS

Use PurgeCSS to remove unused styles:

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
      ],
      safelist: [
        /^c-/, // Keep all Atomix component classes
        /^u-/, // Keep all utility classes
        /^is-/, // Keep all state classes
        /^has-/, // Keep all modifier classes
      ],
    }),
  ],
};
```

### Critical CSS

Extract critical CSS for above-the-fold content:

```javascript
// critical-css.js
const critical = require('critical');

critical.generate({
  inline: true,
  base: 'dist/',
  src: 'index.html',
  dest: 'index-critical.html',
  width: 1300,
  height: 900,
  css: ['dist/css/atomix.css'],
});
```

### Code Splitting CSS

Split CSS by routes or components:

```javascript
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
```

### Selective SCSS Imports

Import only the components you need:

```scss
// Import base layers (required)
@use '@shohojdhara/atomix/src/styles/01-settings' as *;
@use '@shohojdhara/atomix/src/styles/02-tools' as *;
@use '@shohojdhara/atomix/src/styles/03-generic' as *;
@use '@shohojdhara/atomix/src/styles/04-elements' as *;

// Import only needed components
@use '@shohojdhara/atomix/src/styles/06-components/components.button';
@use '@shohojdhara/atomix/src/styles/06-components/components.card';
@use '@shohojdhara/atomix/src/styles/06-components/components.input';
@use '@shohojdhara/atomix/src/styles/06-components/components.modal';

// Import utilities (optional)
@use '@shohojdhara/atomix/src/styles/99-utilities' as *;
```

## Troubleshooting

### Common Issues

#### 1. Styles Not Loading

**Problem:** Atomix styles are not being applied.

**Solutions:**
- Ensure CSS is imported before your custom styles
- Check that the CSS file path is correct
- Verify webpack/bundler configuration

```javascript
// ✅ Correct order
import '@shohojdhara/atomix/css';
import './my-custom-styles.css';

// ❌ Wrong order
import './my-custom-styles.css';
import '@shohojdhara/atomix/css';
```

#### 2. SCSS Import Errors

**Problem:** Cannot resolve SCSS imports.

**Solutions:**
- Install `sass` or `node-sass`
- Configure your bundler to handle SCSS files
- Use correct import paths

```bash
npm install sass
```

#### 3. CSS Conflicts

**Problem:** Atomix styles conflict with existing styles.

**Solutions:**
- Use CSS specificity
- Scope your custom styles
- Use CSS modules for isolation

```css
/* Increase specificity */
.my-app .c-btn {
  /* Your overrides */
}

/* Or use CSS modules */
.customButton {
  composes: c-btn c-btn--primary from '@shohojdhara/atomix/css';
  /* Your additional styles */
}
```

#### 4. Bundle Size Issues

**Problem:** CSS bundle is too large.

**Solutions:**
- Import only needed components
- Use PurgeCSS
- Enable CSS minification

```scss
// Import only what you need
@use '@shohojdhara/atomix/src/styles/01-settings' as *;
@use '@shohojdhara/atomix/src/styles/02-tools' as *;
@use '@shohojdhara/atomix/src/styles/06-components/components.button';
@use '@shohojdhara/atomix/src/styles/06-components/components.card';
```

#### 5. TypeScript Errors

**Problem:** TypeScript cannot find CSS module types.

**Solutions:**
- Ensure proper type definitions are installed
- Configure module resolution
- Use Atomix CSS module types

```typescript
// Use Atomix CSS module types
import { AtomixCSSModules } from '@shohojdhara/atomix/css-modules';

// Or create your own declaration
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

### Browser Support

Atomix CSS supports:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For older browser support, consider:
- Using PostCSS with autoprefixer
- Including polyfills for CSS custom properties
- Using fallback values for modern CSS features

### Performance Tips

1. **Use the minified version in production**
2. **Enable gzip compression on your server**
3. **Consider using a CDN for faster delivery**
4. **Implement critical CSS for faster initial load**
5. **Use CSS containment for better performance**

```css
.c-card {
  contain: layout style paint;
}
```

### Development Workflow

#### Hot Reloading with SCSS

```javascript
// webpack.config.js for development
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Injects CSS into DOM for hot reloading
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
```

#### Production Optimization

```javascript
// webpack.config.js for production
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS to separate files
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};
```

## Best Practices

### 1. Import Strategy

- Start with the full CSS import for rapid prototyping
- Move to selective SCSS imports for production optimization
- Use CSS modules for component-specific styling
- Implement CSS custom properties for runtime theming

### 2. Customization Approach

- Override CSS custom properties for simple theming
- Use SCSS variables for build-time customization
- Create component-specific overrides when needed
- Maintain consistency with the design system

### 3. Performance Considerations

- Monitor bundle size regularly
- Implement tree-shaking for unused styles
- Use critical CSS for above-the-fold content
- Enable compression and caching

### 4. Team Collaboration

- Document your customization approach
- Use consistent naming conventions
- Share theme configurations across projects
- Maintain style guides and documentation

## Conclusion

Atomix provides flexible CSS integration options to suit different project needs and preferences. Whether you prefer traditional CSS imports, SCSS customization, or CSS modules, Atomix can adapt to your workflow while maintaining design consistency and performance.

Choose the approach that best fits your project requirements and team preferences. For most projects, starting with the basic CSS import and gradually adopting more advanced techniques as needed is recommended.