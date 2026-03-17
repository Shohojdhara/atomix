---
name: build-pipeline-transpilation
description: Guidelines for maintaining and debugging the Atomix build system (Rollup, PostCSS, and TypeScript).
---

# Build Pipeline & Transpilation Skill

Guidelines for ensuring the Atomix package is correctly built, optimized, and distributed.

## Build Architecture

Atomix uses a modular Rollup configuration located in `rollup/`.
- **Main Config**: `rollup.config.js` entry point.
- **Modular Configs**: Located in `rollup/config/builds.js`.
- **Plug-ins**: Custom and standard Rollup plug-ins are managed in `rollup/plugins/`.

### Key Build Targets
The system generates a dual-build output in the `dist/` directory:
1.  **ESM (`.esm.js`)**: For modern bundlers like Vite and Webpack.
2.  **CommonJS (`.js`)**: For legacy Node.js environments.
3.  **Styles (`.css`)**: Compiled SCSS from `src/styles`.
4.  **Types (`.d.ts`)**: TypeScript declaration files.

## Performance Optimization

1.  **Code Splitting**: Atomix uses `allBuildsWithChunks` by default. This splits the bundle into smaller, reusable chunks to improve load times for applications using the library.
2.  **Tree Shaking**: Ensure all component files have side effects disabled (checked in `package.json`) unless they import CSS/SCSS.
3.  **Minification**: Production builds use `terser` for JS and `cssnano` for CSS.

## PostCSS Pipeline

Configured in `postcss.config.cjs`. It handles:
- **Importing**: Resolves `@import` rules.
- **Autoprefixing**: Adds vendor prefixes for cross-browser compatibility.
- **Stage 3 Features**: Supports modern CSS features while ensuring stability.
- **Nesting**: Enable standard CSS nesting.

## Debugging Build Issues

1.  **Analyze Bundle**: Run `npm run build:analyze` to generate a visual report of the bundle size using `rollup-plugin-visualizer`.
2.  **Sequential Build**: If parallel builds fail or are hard to debug, use `npm run build:sequential`.
3.  **Clean Builds**: Always run `npm run clean` before a fresh build to avoid stale assets in `dist/`.

## Transpilation Rules
- Do not transpile out CSS variables; they are essential for the theme system.
- Preserve JSDoc comments in the output to support developer autocomplete in IDEs.
- Ensure peer dependencies (`react`, `react-dom`, `@phosphor-icons/react`) are excluded from the final bundle to avoid duplication in consumer apps.
