# Build Tool Integration Examples

This document provides practical examples of how to integrate Atomix with popular build tools. All examples include TypeScript support and comprehensive error handling.

## TypeScript Support

All build tools include full TypeScript definitions:

```ts
import { type AtomixVitePluginOptions, type AtomixLoaderOptions, type AtomixRollupPluginOptions } from '@shohojdhara/atomix/build-tools';
```

## Vite Integration

### Basic Setup

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import atomixPlugin from '@shohojdhara/atomix/build-tools/vite-plugin.js';

export default defineConfig({
  plugins: [
    react(),
    atomixPlugin({
      theme: 'dark',
      optimizeCss: true,
      verbose: false
    })
  ]
});
```

With TypeScript:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import atomixPlugin, { type AtomixVitePluginOptions } from '@shohojdhara/atomix/build-tools/vite-plugin.js';

const atomixOptions: AtomixVitePluginOptions = {
  theme: 'dark',
  components: ['Button', 'Card'],
  optimizeCss: true,
  includeAtoms: false,
  verbose: true
};

export default defineConfig({
  plugins: [react(), atomixPlugin(atomixOptions)]
});
```

### Advanced Setup

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import atomix from '@shohojdhara/atomix/build-tools';

export default defineConfig({
  plugins: [
    react(),
    atomix.vitePlugin({
      theme: 'custom-theme',
      components: ['Button', 'Card', 'Modal'],
      optimizeCss: true,
      includeAtoms: true
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // Add Atomix SCSS paths
        additionalData: `@import "@shohojdhara/atomix/scss/settings";`
      }
    }
  }
});
```

## Webpack Integration

### Basic Setup

```js
// webpack.config.js
const path = require('path');

module.exports = {
  // ... other config
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/@shohojdhara/atomix')
        ],
        use: {
          loader: path.resolve(__dirname, 'node_modules/@shohojdhara/atomix/build-tools/webpack-loader.js'),
          options: {
            includeAtoms: false,
            components: ['Button', 'Input'],
            excludeUnnecessaryStyles: true,
            verbose: false
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@shohojdhara/atomix': path.resolve(__dirname, 'node_modules/@shohojdhara/atomix')
    }
  }
};
```

With TypeScript:

```ts
// webpack.config.ts
import path from 'path';
import { type AtomixLoaderOptions } from '@shohojdhara/atomix/build-tools';

const atomixLoaderOptions: AtomixLoaderOptions = {
  includeAtoms: false,
  components: ['Button', 'Card', 'Input'],
  excludeUnnecessaryStyles: true,
  verbose: true
};

export default {
  // ... other config
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/@shohojdhara/atomix')
        ],
        use: {
          loader: path.resolve(__dirname, 'node_modules/@shohojdhara/atomix/build-tools/webpack-loader.js'),
          options: atomixLoaderOptions
        }
      }
    ]
  }
};
```

### With CSS Processing

```js
// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // ... other config
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/@shohojdhara/atomix')
        ],
        use: [
          'babel-loader',
          {
            loader: '@shohojdhara/atomix/build-tools/webpack-loader',
            options: {
              components: ['Button', 'Input', 'Card'],
              includeAtoms: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  }
};
```

## Rollup Integration

### Basic Setup

```js
// rollup.config.js
import atomixPlugin from '@shohojdhara/atomix/build-tools/rollup-plugin.js';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [
    atomixPlugin({
      theme: 'light',
      optimize: true,
      verbose: false
    })
  ]
};
```

With TypeScript:

```ts
// rollup.config.ts
import atomixPlugin, { type AtomixRollupPluginOptions } from '@shohojdhara/atomix/build-tools/rollup-plugin.js';

const atomixOptions: AtomixRollupPluginOptions = {
  theme: 'dark',
  components: ['Button', 'Modal', 'Card'],
  optimize: true,
  includeAtoms: false,
  verbose: true
};

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [atomixPlugin(atomixOptions)]
};
```

### Advanced Setup

```js
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import atomix from '@shohojdhara/atomix/build-tools';

export default {
  input: 'src/main.js',
  output: {
    dir: 'dist',
    format: 'es',
    assetFileNames: (assetInfo) => {
      if (assetInfo.name.endsWith('.css')) {
        return 'assets/[name][extname]';
      }
      return '[name][extname]';
    }
  },
  plugins: [
    resolve(),
    commonjs(),
    atomix.rollupPlugin({
      theme: 'dark',
      components: ['Button', 'Modal', 'Card'],
      optimize: true,
      includeAtoms: false,
      verbose: true
    })
  ]
};
```

## Error Handling Examples

All plugins include comprehensive error handling:

```js
import atomixPlugin from '@shohojdhara/atomix/build-tools/vite-plugin.js';

// This will throw a validation error with helpful details
try {
  const plugin = atomixPlugin({
    theme: 123, // Invalid type - should be string
    components: 'Button' // Invalid type - should be array
  });
} catch (error) {
  console.error(`${error.code}: ${error.message}`);
  if (error.details) {
    console.error('Details:', error.details);
  }
  if (error.suggestions) {
    console.error('Suggestions:', error.suggestions);
  }
}
```

## Auto-Detection Integration

For simpler setups, you can use the auto-detection feature:

```js
// vite.config.js (works similarly for webpack.config.js or rollup.config.js)
import { initAutoIntegration } from '@shohojdhara/atomix/build-tools';

const atomixIntegration = initAutoIntegration({
  theme: 'default',
  optimize: true
});

export default {
  plugins: [
    // ... other plugins
    atomixIntegration
  ]
};
```

## Environment-Specific Configurations

### Development vs Production

```js
// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import atomix from '@shohojdhara/atomix/build-tools';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      atomix.vitePlugin({
        theme: env.VITE_ATOMIX_THEME || 'default',
        optimizeCss: mode === 'production',  // Only optimize in production
        verbose: mode === 'development'      // Show logs in development
      })
    ]
  };
});
```

## Troubleshooting

### Common Issues

1. **Theme Not Applied**
   - Verify the theme name is valid by checking available themes:
   ```js
   import { getAvailableThemes } from '@shohojdhara/atomix/build-tools';
   console.log(getAvailableThemes());
   ```

2. **Components Not Optimizing**
   - Make sure the component names match exactly (case-sensitive)
   - Verify the components exist in the Atomix library

3. **Performance Issues**
   - Disable verbose logging in production
   - Limit the components list to only what you use
   - Use the optimization features appropriately