# Atomix NPM Package

This document provides information about the Atomix NPM package structure and how to use the source files and configuration files included in the package.

## Package Structure

The Atomix package includes the following directories and files:

- `dist/` - Compiled and minified distribution files
  - `css/` - CSS stylesheets
  - `js/` - JavaScript bundles (UMD, CommonJS, ESM)
  - `types/` - TypeScript declaration files
- `src/` - Source code files
  - `components/` - React component source files
  - `lib/` - Utility functions and helpers
  - `styles/` - SCSS source files
- Configuration files
  - `tsconfig.json` - TypeScript configuration
  - `webpack.config.js` - Webpack configuration
  - `babel.config.js` - Babel configuration
  - `postcss.config.js` - PostCSS configuration
- Documentation files
  - `README.md` - Main documentation
  - `CHANGELOG.md` - Version history
  - `LICENSE` - License information

## Using the Distribution Files

For most use cases, you should use the pre-built distribution files in the `dist/` directory:

```js
// Using ES modules
import { Button } from '@shohojdhara/atomix';

// Using CommonJS modules
const { Button } = require('@shohojdhara/atomix');

// Import styles
import '@shohojdhara/atomix/css';

// Using React-specific components
import AtomixReact from '@shohojdhara/atomix/react';
```

### TypeScript Support

The package includes TypeScript declarations for all components and utilities:

```typescript
// Import with full TypeScript support
import { Button, Card, useColorMode } from '@shohojdhara/atomix';

// Component props are fully typed
const MyButton: React.FC = () => (
  <Button 
    variant="primary" 
    size="md"
    onClick={() => console.log('Clicked!')}
  >
    Click Me
  </Button>
);
```

## Using Source Files

If you need to customize the components or build process, you can use the source files directly:

### Components

```js
// Import a component directly from source
import Button from '@shohojdhara/atomix/src/components/Button';
```

### Styles

```scss
// Import all styles
@import '@shohojdhara/atomix/src/styles/index.scss';

// Or import specific component styles
@import '@shohojdhara/atomix/src/components/Button/Button.scss';
```

## Using Configuration Files

You can extend or reference the included configuration files in your own project:

### TypeScript Configuration

```json
// In your tsconfig.json
{
  "extends": "@shohojdhara/atomix/tsconfig.json",
  "compilerOptions": {
    // Your custom options
  }
}
```

### Webpack Configuration

```js
// In your webpack.config.js
const atomixWebpackConfig = require('@shohojdhara/atomix/webpack.config.js');
const { merge } = require('webpack-merge');

module.exports = merge(atomixWebpackConfig, {
  // Your custom webpack configuration
});
```

### Babel Configuration

```js
// In your babel.config.js
module.exports = {
  presets: [
    ['@shohojdhara/atomix/babel.config.js'],
    // Your custom presets
  ],
  // Your custom plugins
};
```

## Building from Source

If you want to build the package from source:

```bash
# Clone the repository
git clone https://github.com/liimonx/atomix.git
cd atomix

# Install dependencies
npm install

# Build all components
npm run build
```

## Developer Experience Improvements

### Dynamic Version Handling

The package now supports dynamic version handling through environment variables:

```bash
# Build with a specific version
VERSION=0.1.1 npm run build
```

This allows for easier version management during development and CI/CD pipelines.

### Version Management Scripts

The package includes convenient scripts for version management:

```bash
# Bump patch version (0.1.0 -> 0.1.1)
npm run version:patch

# Bump minor version (0.1.0 -> 0.2.0)
npm run version:minor

# Bump major version (0.1.0 -> 1.0.0)
npm run version:major
```

### Component-Level Imports

For better tree-shaking, you can now import individual components directly:

```js
// Import specific components
import Button from '@shohojdhara/atomix/Button';
import Card from '@shohojdhara/atomix/Card';
```

### Local Testing

To test the package locally in another project:

```bash
# In the Atomix project directory
npm run link:local

# In your test project directory
npm link @shohojdhara/atomix
```

See the [example-project.md](./example-project.md) file for a complete example project that demonstrates how to use the package.

### Release Candidate Workflow

For testing before final releases, you can publish release candidates:

```bash
# Publish as a release candidate
npm run publish:rc

# Later, publish as the latest version
npm run publish:latest
```

## Bundle Analysis

To analyze the bundle size and composition:

```bash
# Run bundle analyzer
npm run analyze:bundle

# Check package size limits
npm run analyze:size
```

## Contributing

Contributions are welcome! Please see the [README.md](./README.md) file for more information on how to contribute to the project.