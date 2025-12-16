# Theme Build Process Documentation

**Last Updated:** 2024-12-19

## Overview

The Atomix theme system includes a comprehensive build process for compiling SCSS themes into CSS files for distribution.

## Build Scripts

### 1. Theme Build Script (`scripts/build-themes.js`)

**Purpose:** Compiles all theme SCSS files to CSS and generates both expanded and minified versions.

**Command:** 
```bash
npm run build:themes
```

**Process:**
1. Scans the `src/themes/` directory for theme folders
2. For each theme with an `index.scss` file:
   - Compiles SCSS to CSS using Sass
   - Processes with PostCSS (autoprefixer)
   - Generates expanded CSS file (`dist/themes/[theme].css`)
   - Generates minified CSS file (`dist/themes/[theme].min.css`)
   - Creates source maps for debugging

**Output Directory:** `dist/themes/`

**Features:**
- Automatic directory creation
- Error handling and reporting
- Build summary with success/failure counts
- Support for all ITCSS architecture patterns
- Deprecation warning display (for SCSS issues)

### 2. Main Build Process

**Command:**
```bash
npm run build
```

**Process:**
1. Builds the main JavaScript library (Rollup)
2. Builds the main CSS styles (`dist/atomix.css` and `dist/atomix.min.css`)
3. Builds all themes (calls `npm run build:themes`)
4. Syncs configuration (if prebuild is configured)

## Theme Structure Requirements

For a theme to be built successfully, it must:

1. **Have a folder** in `src/themes/[theme-name]/`
2. **Include an `index.scss` file** as the entry point
3. **Follow ITCSS architecture** (recommended):
   ```
   theme-name/
   ├── 01-settings/
   ├── 02-tools/
   ├── 03-generic/
   ├── 04-elements/
   ├── 05-objects/
   ├── 06-components/
   ├── 99-utilities/
   └── index.scss
   ```

## Configuration Files

### Theme Configuration Duplication

Currently, there are two configuration files that need to be kept in sync:

1. **`theme.config.ts`** (Root directory)
   - Used by: Runtime theme system (ThemeManager, ThemeProvider)
   - Purpose: Runtime configuration and theme definitions
   - Format: TypeScript

2. **`src/themes/themes.config.js`**
   - Used by: Build scripts and metadata
   - Purpose: Build-time configuration
   - Format: JavaScript (CommonJS)

> **Note:** These files currently require manual synchronization. A future update will consolidate them into a single source of truth.

### Configuration Sync Script

**Script:** `scripts/sync-theme-config.js`

**Purpose:** Attempts to generate `themes.config.js` from `theme.config.ts`

**Status:** ⚠️ Experimental - requires improvement for full automation

**Usage:**
```bash
node scripts/sync-theme-config.js
```

## Available Themes

As of the last build, the following themes are available:

| Theme | Status | Build Status | Files Generated |
|-------|--------|--------------|-----------------|
| shaj-default | Stable | ✅ Success | shaj-default.css, shaj-default.min.css |
| flashtrade | Stable | ✅ Success | flashtrade.css, flashtrade.min.css |
| boomdevs | Beta | ✅ Success | boomdevs.css, boomdevs.min.css |
| esrar | Beta | ✅ Success* | esrar.css, esrar.min.css |
| mashroom | Beta | ✅ Success* | mashroom.css, mashroom.min.css |
| applemix | Experimental | ✅ Success | applemix.css, applemix.min.css |

*With SCSS deprecation warnings that should be addressed

## Common Build Issues

### 1. SCSS Deprecation Warnings

**Issue:** Mixed declarations warning
```
DEPRECATION WARNING [mixed-decls]: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming version.
```

**Solution:** Move declarations before nested rules or wrap in `& {}`

**Example Fix:**
```scss
// Before (causes warning)
.component {
  @media (min-width: 768px) {
    // nested rule
  }
  color: red; // declaration after nested rule
}

// After (fixed)
.component {
  color: red; // declaration before nested rule
  
  @media (min-width: 768px) {
    // nested rule
  }
}
```

### 2. Color Function Deprecations

**Issue:** `lighten()` and `darken()` are deprecated

**Solution:** Use `color.scale()` or `color.adjust()` instead

**Example Fix:**
```scss
// Before
background: lighten($color, 15%);

// After
@use 'sass:color';
background: color.adjust($color, $lightness: 15%);
```

### 3. Missing index.scss

**Issue:** Theme folder exists but no `index.scss` file

**Solution:** Create an `index.scss` file that imports the theme's styles in ITCSS order

## Build Performance

The build process is optimized for:
- **Parallel processing** where possible
- **Incremental builds** (only changed files)
- **Source map generation** for debugging
- **Minification** for production

Typical build times:
- Single theme: ~1-2 seconds
- All themes: ~5-10 seconds
- Full build (library + styles + themes): ~15-30 seconds

## Development Workflow

### Creating a New Theme

1. Create theme folder: `src/themes/[theme-name]/`
2. Add ITCSS structure folders
3. Create `index.scss` with proper imports
4. Add theme to `theme.config.ts`
5. Manually sync to `themes.config.js` (until automation is complete)
6. Build theme: `npm run build:themes`
7. Test in Storybook: `npm run dev`

### Modifying Existing Themes

1. Edit SCSS files in theme folder
2. Build to test: `npm run build:themes`
3. Check for warnings/errors in build output
4. Test in Storybook or example app

## CI/CD Integration

### GitHub Actions / CI Pipeline

Add these steps to your CI workflow:

```yaml
- name: Install dependencies
  run: npm ci

- name: Build themes
  run: npm run build:themes

- name: Check build artifacts
  run: ls -la dist/themes/
```

### Pre-commit Hook

Add to `.husky/pre-commit`:
```bash
npm run build:themes --silent
```

## Troubleshooting

### Build Fails Completely

1. Check Node.js version (16+ required)
2. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. Check for syntax errors in SCSS files
4. Verify all import paths are correct

### Theme Not Building

1. Verify `index.scss` exists
2. Check for SCSS syntax errors
3. Ensure all imported files exist
4. Check console for specific error messages

### CSS Not Updating

1. Clear build cache: `rm -rf dist/themes`
2. Rebuild: `npm run build:themes`
3. Check that correct theme file is being imported
4. Verify browser cache is cleared

## Future Improvements

### Planned Enhancements

1. **Configuration Consolidation** (P0)
   - Single source of truth for theme configuration
   - Automatic sync between TypeScript and JavaScript configs
   - Runtime configuration generation from build config

2. **Build Optimization** (P1)
   - Watch mode for development
   - Incremental builds
   - Parallel theme compilation
   - Better caching strategy

3. **Theme Validation** (P2)
   - Structure validation before build
   - CSS output validation
   - Accessibility checks
   - Performance metrics

4. **Developer Experience** (P2)
   - Better error messages
   - Visual diff for theme changes  
   - Theme preview generation
   - Hot module replacement support

## Related Documentation

- [Theme System Documentation](./THEME_SYSTEM.md)
- [Theme System Usage Guide](./THEME_SYSTEM_USAGE.md)
- [Theme System Audit Report](../plans/THEME_SYSTEM_AUDIT_REPORT.md)
- [Theme Checklist](../src/themes/THEME_CHECKLIST.md)
