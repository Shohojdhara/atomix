# Build System Documentation

## Overview

The Atomix build system uses Rollup to create optimized bundles for both JavaScript/TypeScript and CSS. The system is designed to support code splitting, tree-shaking, and multiple output formats while maintaining fast build times.

## Build Architecture

### Hybrid Build Strategy

Atomix uses a hybrid build strategy that combines:

1. **Single-file builds** for the main entry point (ESM, CJS, minified)
2. **Entry point builds** for code organization (theme, charts, forms, layout, heavy, core)
3. **No automatic chunking** to avoid duplicate chunks

This approach:
- Maintains stable import paths via entry points
- Avoids duplicate chunks that were created by automatic code splitting
- Reduces bundle size while keeping build output clean
- Follows performance audit recommendations

### Build Outputs

The build system generates the following outputs:

#### Main Entry Points
- `dist/index.js` - CommonJS format
- `dist/index.esm.js` - ES Modules format
- `dist/index.min.js` - Minified ES Modules
- `dist/index.d.ts` - TypeScript declarations

#### CSS Outputs
- `dist/atomix.css` - Full CSS with source maps
- `dist/atomix.min.css` - Minified CSS with source maps

#### Entry Point Builds
- `dist/theme.js` + `dist/theme.d.ts` - Theme system
- `dist/charts.js` + `dist/charts.d.ts` - Chart components
- `dist/forms.js` + `dist/forms.d.ts` - Form components
- `dist/layout.js` + `dist/layout.d.ts` - Layout components
- `dist/heavy.js` + `dist/heavy.d.ts` - Heavy/large components
- `dist/core.js` + `dist/core.d.ts` - Core components

## Build Commands

### Standard Build
```bash
npm run build
```
Runs the full build process sequentially.

### Parallel Build
```bash
npm run build:parallel
```
Runs JavaScript, TypeScript, and CSS builds in parallel for faster execution (83% faster).

### Individual Builds
```bash
npm run build:js      # JavaScript builds only
npm run build:types   # TypeScript declarations only
npm run build:styles  # CSS builds only
```

### Build Analysis
```bash
npm run build:analyze
```
Generates a bundle analysis report at `dist/stats.html`.

### Build Verification
```bash
npm run verify:build  # Verify all outputs exist and are valid
npm run test:build    # Run automated build tests
```

## Build Configuration

### Rollup Configuration

The build system uses modular Rollup configurations:

- `rollup.config.js` - Main configuration (uses `allBuildsWithChunks`)
- `rollup/config/builds.js` - Build definitions
- `rollup/config/plugins.js` - Plugin configurations
- `rollup/config/postcss.js` - PostCSS configuration
- `rollup/config/terser.js` - Minification configuration

### TypeScript Configuration

TypeScript configurations are consolidated:

- `tsconfig.base.json` - Shared base configuration
- `tsconfig.json` - IDE/development configuration (extends base)
- `tsconfig.build.json` - Build configuration (extends base)
- `tsconfig.dts.json` - Declaration file generation (extends base)

### PostCSS Configuration

PostCSS is configured with the following plugins:

- `postcss-import` - Import CSS files
- `postcss-flexbugs-fixes` - Fix flexbox bugs
- `postcss-preset-env` - Modern CSS features
- `autoprefixer` - Browser compatibility
- `cssnano` - CSS minification (production only)

## Adding New Entry Points

To add a new entry point:

1. Create a new file in `src/entries/` (e.g., `src/entries/new-feature.ts`)
2. Export components directly from their source directories (avoid importing from `../index`)
3. Add the entry point to `rollup/config/builds.js`:
   ```javascript
   export const entryBuilds = [
     ...createEntryBuild('theme', INPUT_FILES.theme),
     ...createEntryBuild('new-feature', INPUT_FILES.newFeature), // Add this
     // ...
   ];
   ```
4. Add exports to `package.json`:
   ```json
   "./new-feature": {
     "types": "./dist/new-feature.d.ts",
     "import": "./dist/new-feature.js",
     "default": "./dist/new-feature.js"
   }
   ```

## Troubleshooting

### Build Fails with TypeScript Errors

1. Run `npm run typecheck` to see all errors
2. Fix errors in the source files
3. Ensure all imports use direct paths (not from `../index`)

### Missing CSS in Build Output

1. Check `package.json` `sideEffects` configuration
2. Ensure CSS files are included in `sideEffects` array
3. Verify PostCSS configuration is correct

### Duplicate Chunks in Output

1. Ensure `esmBuildChunked` is not included in default builds
2. Use entry point builds instead of automatic chunking
3. Check `rollup/config/builds.js` configuration

### Build is Slow

1. Use `npm run build:parallel` for faster builds
2. Check if unnecessary builds are included
3. Consider using build caching

### Source Maps Not Generated

1. Verify `sourceMap: true` in PostCSS configuration
2. Check Rollup sourcemap settings
3. Ensure source map files are not excluded from build

## Performance Optimization

### Build Time

- **Current**: 2-5 minutes (sequential)
- **With parallel builds**: 30-60 seconds (83% faster)

### Bundle Size

- **Before optimization**: ~1.1MB (with duplicates)
- **After optimization**: ~200KB for core bundle (82% reduction)
- **Gzipped**: ~50KB

### Optimization Strategies

1. Use parallel builds for faster execution
2. Remove duplicate chunks by using entry points instead of automatic chunking
3. Enable tree-shaking with correct `sideEffects` configuration
4. Use code splitting for large features (theme, charts, etc.)

## Best Practices

1. **Always use direct imports** in entry points (not from `../index`)
2. **Test builds locally** before pushing changes
3. **Run build verification** after making build configuration changes
4. **Keep bundle sizes reasonable** - monitor with `build:analyze`
5. **Document new entry points** in this file
6. **Use TypeScript base config** - extend `tsconfig.base.json` for new configs

## Related Documentation

- [SCSS Migration Guide](./scss-migration-guide.md)
- [Component Development Guide](./DEVELOPER_GUIDE.md)
- [Theme System Documentation](./THEME_SYSTEM.md)
- [Build Configuration Audit](../audit/BUILD_CONFIG_AUDIT.md)

