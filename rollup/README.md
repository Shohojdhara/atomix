# Rollup Configuration Documentation

This directory contains the modular Rollup build configuration for the Atomix Design System.

## Structure

```
rollup/
├── config/           # Build configuration modules
│   ├── constants.js  # Shared constants and paths
│   ├── postcss.js    # PostCSS configurations
│   ├── terser.js     # Terser minification configs
│   ├── plugins.js    # Rollup plugin configurations
│   └── builds.js     # Build definitions
├── plugins/          # Custom Rollup plugins
│   └── cleanup.js    # Plugin to clean up temp files
└── index.js          # Main entry point
```

## Configuration Modules

### `config/constants.js`
- Defines input/output file paths
- External dependencies list
- Directory paths

### `config/postcss.js`
- PostCSS config for JS builds (no extraction)
- PostCSS config factory for styles builds (with extraction)

### `config/terser.js`
- Non-minified build config (removes console.log/debug)
- Minified build config (aggressive optimization)

### `config/plugins.js`
- Common Rollup plugins
- Plugin factory functions
- External dependencies helper

### `config/builds.js`
- Individual build configurations:
  - `esmBuild` - ES Modules build
  - `cjsBuild` - CommonJS build
  - `minifiedBuild` - Production minified build
  - `typesBuild` - TypeScript declarations
  - `stylesBuild` - Non-minified CSS
  - `stylesMinifiedBuild` - Minified CSS

## Custom Plugins

### `plugins/cleanup.js`
Removes temporary files after build completion. Used for CSS builds that create temporary JS files.

## Usage

The main `rollup.config.js` imports and exports all builds:

```javascript
import { allBuilds } from './rollup/index.js';
export default allBuilds;
```

You can also import specific builds:

```javascript
import { jsBuilds, stylesBuilds } from './rollup/index.js';
```

## Adding New Builds

1. Create the build configuration in `config/builds.js`
2. Export it from `config/builds.js`
3. Add it to the appropriate array (`jsBuilds`, `stylesBuilds`, or `allBuilds`)
4. Export from `rollup/index.js` if needed externally

