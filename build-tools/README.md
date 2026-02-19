# Atomix Build Tool Integrations

This directory contains plugins and loaders for integrating the Atomix design system with popular build tools. All plugins provide comprehensive type safety, error handling, and optimization features.

## Features

- ✅ **Full TypeScript Support**: Comprehensive type definitions included
- ✅ **Robust Error Handling**: Custom error classes with detailed diagnostics
- ✅ **Component Optimization**: Tree-shaking and selective component imports
- ✅ **Theme Integration**: Dynamic theme switching and CSS variable support
- ✅ **Validation**: Runtime validation of all configuration options
- ✅ **Verbose Logging**: Detailed logging for debugging and monitoring

## Available Integrations

### Vite Plugin

The Vite plugin provides seamless integration of Atomix components and styles into Vite projects.

#### Installation

The build tools are included with the main Atomix package:

```bash
npm install @shohojdhara/atomix --save-dev
```

#### Type Safety

TypeScript definitions are automatically included. For enhanced IDE support:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import atomixPlugin, { type AtomixVitePluginOptions } from '@shohojdhara/atomix/build-tools';

const options: AtomixVitePluginOptions = {
  theme: 'dark',
  components: ['Button', 'Card'],
  optimizeCss: true,
  includeAtoms: false,
  verbose: true,
};

export default defineConfig({
  plugins: [atomixPlugin(options)],
});
```

#### Usage

```js
// vite.config.js
import { defineConfig } from 'vite';
import { vitePlugin as atomixPlugin } from '@shohojdhara/atomix/build-tools';

export default defineConfig({
  plugins: [
    atomixPlugin({
      theme: 'dark', // Specify theme ('default', 'dark', 'light')
      components: ['Button', 'Card'], // Specific components to optimize
      optimizeCss: true, // Enable CSS optimization
      includeAtoms: false, // Include atomic styles
    }),
  ],
});
```

#### Features

- Automatic theme injection during development
- CSS optimization for production builds
- Component-specific imports optimization
- Hot module replacement support

### Webpack Loader

The Webpack loader enables processing of Atomix components and styles in Webpack projects.

#### Installation

The build tools are included with the main Atomix package:

```bash
npm install @shohojdhara/atomix --save-dev
```

#### Type Safety

```ts
// webpack.config.ts
import { type AtomixLoaderOptions } from '@shohojdhara/atomix/build-tools';

const atomixLoaderOptions: AtomixLoaderOptions = {
  includeAtoms: false,
  components: ['Button', 'Input'],
  excludeUnnecessaryStyles: true,
  verbose: true,
};
```

#### Usage

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'node_modules/@shohojdhara/atomix')],
        use: {
          loader: require.resolve('@shohojdhara/atomix/build-tools/webpack-loader'),
          options: {
            includeAtoms: false, // Include atomic styles
            components: ['Button', 'Input'], // Specific components to include
            excludeUnnecessaryStyles: true, // Remove unused styles
          },
        },
      },
    ],
  },
};
```

#### Features

- Component import optimization
- Tree-shaking enhancement
- Conditional atom inclusion
- Style optimization

### Rollup Plugin

The Rollup plugin provides integration for projects using Rollup as their build tool.

#### Installation

The build tools are included with the main Atomix package:

```bash
npm install @shohojdhara/atomix --save-dev
```

#### Type Safety

```ts
// rollup.config.ts
import { type AtomixRollupPluginOptions } from '@shohojdhara/atomix/build-tools';

const atomixOptions: AtomixRollupPluginOptions = {
  theme: 'default',
  components: [],
  optimize: true,
  includeAtoms: false,
  verbose: false,
};
```

#### Usage

```js
// rollup.config.js
import { rollupPlugin as atomixPlugin } from '@shohojdhara/atomix/build-tools';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    atomixPlugin({
      theme: 'default', // Specify theme
      components: [], // Specific components to include
      optimize: true, // Enable optimizations
      includeAtoms: false, // Include atomic styles
      verbose: false, // Enable verbose logging
    }),
  ],
};
```

#### Features

- Component import resolution
- Bundle optimization
- Theme-specific CSS processing
- Virtual module generation

## Common Options

All plugins support these common options:

- `theme`: Specifies which theme to use (default: 'default')
- `components`: Array of specific components to include (default: [])
- `optimize`: Enables optimization features (default: depends on plugin)
- `includeAtoms`: Includes atomic styles (default: false)
- `verbose`: Enable detailed logging for debugging (default: false)

## Error Handling

All plugins include comprehensive error handling with custom error types:

```js
try {
  const plugin = atomixPlugin({
    theme: 'nonexistent-theme', // This will throw a validation error
    components: ['Button'],
  });
} catch (error) {
  if (error.code === 'THEME_NOT_FOUND') {
    console.error('Theme not found:', error.message);
    console.log('Available themes:', error.details.availableThemes);
  }
}
```

Common error codes:

- `INVALID_THEME_TYPE`: Theme option is not a string
- `EMPTY_THEME`: Theme option is empty
- `THEME_NOT_FOUND`: Specified theme doesn't exist
- `INVALID_COMPONENTS_TYPE`: Components option is not an array
- `INVALID_COMPONENT_NAMES`: Component names are not strings
- `COMPONENTS_NOT_FOUND`: Some requested components don't exist

## Best Practices

1. **Optimize for Production**: Use the optimization features to reduce bundle size
2. **Select Components Wisely**: Only include the components you actually use
3. **Theme Management**: Specify your theme at build time to optimize CSS delivery
4. **Tree Shaking**: Ensure your bundler supports tree shaking to remove unused code
5. **Validation**: Always validate your configuration in development
6. **Logging**: Enable verbose logging during troubleshooting
7. **Type Safety**: Use TypeScript definitions for better IDE support and early error detection

## Troubleshooting

- If you encounter issues with theme resolution, ensure the specified theme exists in your Atomix installation
- For problems with component imports, verify that component names match exactly
- Enable verbose logging to get more information about the processing steps
