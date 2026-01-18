# Atomix Theme System - Complete Guide

**Version:** 2.1  
**Last Updated:** 2025-01-27

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [For External Developers](#for-external-developers)
3. [For Library Developers](#for-library-developers)
4. [Theme Types](#theme-types)
5. [API Reference](#api-reference)
6. [Configuration](#configuration)
7. [CSS Variables & Tokens](#css-variables--tokens)
8. [Advanced Topics](#advanced-topics)
9. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Installation

```bash
npm install @shohojdhara/atomix
```

### Basic Setup (React)

```tsx
import { ThemeProvider, useTheme, createTheme } from '@shohojdhara/atomix/theme';

// Create a theme
const myTheme = createTheme({
  name: 'My Theme',
  palette: {
    primary: { main: '#7AFFD7' },
    secondary: { main: '#FF5733' },
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme={myTheme}>
      <YourApp />
    </ThemeProvider>
  );
}

// Use theme in components
function MyComponent() {
  const { theme, setTheme, availableThemes } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark-theme')}>
        Switch Theme
      </button>
    </div>
  );
}
```

### Basic Setup (Vanilla JavaScript)

For vanilla JavaScript applications, you can use the theme utilities directly:

```typescript
import { loadThemeCSS, applyThemeAttributes, buildThemePath } from '@shohojdhara/atomix/theme';

// Load and apply a theme
const themePath = buildThemePath('dark', '/themes');
await loadThemeCSS(themePath, 'atomix-theme-dark');
applyThemeAttributes('data-theme', 'dark');
```

---

## For External Developers

> **This section is for developers using Atomix in their own projects.**

### ✅ What You Should Use

#### 1. JavaScript Themes (Recommended)

The easiest way to create themes - no build step required:

```tsx
import { createTheme, ThemeProvider } from '@shohojdhara/atomix/theme';

const myTheme = createTheme({
  name: 'My Brand Theme',
  palette: {
    primary: { main: '#7AFFD7' },
    secondary: { main: '#FF5733' },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme={myTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

**Why this is great:**
- ✅ No build step required
- ✅ Works at runtime
- ✅ TypeScript autocomplete
- ✅ Generates all CSS variables automatically

#### 2. Quick Theme Helper

Fastest way to get started:

```tsx
import { quickTheme, ThemeProvider } from '@shohojdhara/atomix/theme';

// Create a theme from just brand colors
const myTheme = quickTheme('My Brand', '#7AFFD7', '#FF5733');

function App() {
  return (
    <ThemeProvider defaultTheme={myTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

#### 3. CSS Theme Loading

Use your existing CSS files:

```tsx
import { ThemeProvider } from '@shohojdhara/atomix/theme';
import './my-custom-theme.css';

const themes = {
  'my-theme': {
    type: 'css',
    name: 'My Theme',
    class: 'my-theme-class',
  },
};

function App() {
  return (
    <ThemeProvider themes={themes} defaultTheme="my-theme">
      <YourApp />
    </ThemeProvider>
  );
}
```

#### 4. Customize Design Tokens (Tokens-First)

Provide DesignTokens directly to generate CSS or to initialize the provider.

```tsx
import { ThemeProvider, createTheme, injectTheme } from '@shohojdhara/atomix/theme';

// Option A: Initialize ThemeProvider with tokens
const tokens = {
  'primary': '#7c3aed',
  'secondary': '#FF5733',
  'font-family': 'Inter, sans-serif',
};

<ThemeProvider defaultTheme={tokens}>
  <YourApp />
</ThemeProvider>

// Option B: Generate CSS and inject globally
const css = createTheme(tokens, { selector: ':root', prefix: 'atomix' });
injectTheme(css, 'atomix-theme');
```

**Build-Time Token Generation (Optional):**

For build-time token generation, run:
```bash
npm run sync:config
```

This generates CSS custom properties in `src/styles/03-generic/_generated-root.css` that you can import in your project. The generated tokens include:
- Full color scales (1-10 steps) from a single color
- RGB variants for transparency support
- Semantic tokens (text-emphasis, bg-subtle, border-subtle, hover)
- Typography, spacing, and border-radius tokens

**Note:** There is no automatic config loading. When `createTheme()` is called without tokens, it generates CSS using defaults only. Provide tokens to customize the output.

### ❌ What You Should NOT Use

1. **SCSS Theme Structure** - Only needed if contributing themes to Atomix.
2. **Build Scripts** (`sync:tokens`, `generate:tokens`) - These are for library development only.

### Common Use Cases

#### Brand Colors

```tsx
const brandTheme = createTheme({
  palette: {
    primary: { main: '#YOUR_BRAND_COLOR' },
  },
});
```

#### Dark Mode

```tsx
const darkTheme = createTheme({
  palette: {
    background: { default: '#111827' },
    text: { primary: '#f9fafb' },
  },
});
```

#### Multiple Themes with Switching

```tsx
import { createTheme, ThemeProvider, useTheme } from '@shohojdhara/atomix/theme';

const lightTheme = createTheme({
  name: 'Light',
  palette: {
    primary: { main: '#3b82f6' },
    background: { default: '#ffffff' },
  },
});

const darkTheme = createTheme({
  name: 'Dark',
  palette: {
    primary: { main: '#60a5fa' },
    background: { default: '#111827' },
  },
});

function ThemeSwitcher() {
  const { setTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme(lightTheme)}>Light</button>
      <button onClick={() => setTheme(darkTheme)}>Dark</button>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme={lightTheme}>
      <ThemeSwitcher />
      <YourApp />
    </ThemeProvider>
  );
}
```

### Quick Start Checklist

- [ ] Install: `npm install @shohojdhara/atomix`
- [ ] Import: `import { createTheme, ThemeProvider } from '@shohojdhara/atomix/theme'`
- [ ] Create theme: `const theme = createTheme({ palette: {...} })`
- [ ] Wrap app: `<ThemeProvider defaultTheme={theme}>`
- [ ] Use CSS variables: `var(--atomix-primary)`

**That's it! No config files needed, no build steps, no complexity.**

---

## For Library Developers

> **This section is for developers contributing themes to the Atomix library.**

### Configuration File

Create `atomix.config.ts` in the project root:

```typescript
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  // CSS variable prefix
  prefix: 'atomix',
  
  theme: {
    // Extend default tokens
    extend: {
      colors: {
        primary: { main: '#7AFFD7' },
        secondary: { main: '#FF5733' },
      },
      spacing: {
        '18': '4.5rem',
      },
      typography: {
        fontFamilies: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    
    // Register themes
  themes: {
      'my-theme': {
        type: 'css',
        name: 'My Theme',
        description: 'A custom theme',
        version: '1.0.0',
        status: 'stable',
      },
    },
  },
  
  // Build configuration (internal)
  build: {
    output: {
      directory: 'themes',
      formats: {
        expanded: '.css',
        compressed: '.min.css',
      },
    },
  },
});
```

### Build Process

```bash
# Sync configuration
npm run sync:config

# Generate tokens
npm run sync:tokens

# Validate configuration
npm run validate:config

# Build themes
npm run build:themes
```

### SCSS Theme Structure

For library developers creating SCSS themes:

```
src/themes/my-theme/
├── index.scss
├── 01-settings/
│   └── _settings.colors.scss
├── 06-components/
│   └── _components.button.scss
└── 99-utilities/
```

**Create `index.scss`:**
```scss
@use '01-settings/index' as *;
@use '../../styles/02-tools/index' as tools;
@use '../../styles/03-generic/index' as generic;
@use '../../styles/04-elements/index' as elements;
@use '../../styles/05-objects/index' as objects;
@use '../../styles/06-components/index' as components;
@use '../../styles/99-utilities/index' as utilities;
```

**Override settings:**
```scss
// 01-settings/_settings.colors.scss
@use '../../../styles/01-settings/settings.colors' with (
  $primary-6: #0ea5e9,
  $gray-1: #f9fafb,
);
```

---

## Theme Types

### CSS Themes

Themes loaded from CSS files, applied via CSS classes:

```typescript
// In atomix.config.ts (library developers)
export default defineConfig({
  theme: {
  themes: {
    'my-theme': {
      type: 'css',
      name: 'My Theme',
      class: 'my-theme-class',
      cssPath: '/themes/my-theme.css',
    },
  },
  },
});
```

### JavaScript Themes

Themes created programmatically using `createTheme()`:

```typescript
import { createTheme } from '@shohojdhara/atomix/theme';

const theme = createTheme({
  name: 'Custom Theme',
  palette: {
    primary: { main: '#7AFFD7' },
    secondary: { main: '#FF5733' },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
  },
});
```

**Note:** JavaScript themes automatically generate all CSS variables including:
- Color scales (1-10 steps)
- RGB variants for transparency
- Text emphasis variants
- Background and border subtle variants
- Gradient tokens
- Hover state colors

---

## API Reference

### ThemeProvider

React context provider for theme state. Manages string-based CSS themes and token-based dynamic themes. Persists the current theme to `localStorage` when enabled and falls back to `'default'` if no theme is provided.

```tsx
<ThemeProvider
  defaultTheme="my-theme"
  themes={themes}
  basePath="/themes"
  cdnPath={null}
  useMinified={false}
  storageKey="atomix-theme"
  dataAttribute="data-theme"
  enablePersistence={true}
  onThemeChange={(theme) => console.log('Theme changed:', theme)}
  onError={(error, name) => console.error('Theme error', name, error)}
>
  {children}
</ThemeProvider>
```

- Supports CSS themes by name via `themes` and `basePath`/`cdnPath`.
- Supports token-based themes by passing DesignTokens to `defaultTheme` or `setTheme`.
- Persists the selected theme when `enablePersistence` is `true` using `storageKey`.
- Applies the theme name to the root element using `dataAttribute`.
- Uses minified CSS when `useMinified` is `true`.

### useTheme Hook

React hook for accessing theme context:

```typescript
const {
  theme,              // Current theme name
  activeTokens,       // Active DesignTokens (for token-based themes)
  setTheme,           // Function to change theme
  availableThemes,    // List of available themes
  isLoading,          // Loading state
  error,              // Error state
  isThemeLoaded,      // Check if theme is loaded
  preloadTheme,       // Preload a theme
} = useTheme()
```

### Theme Utilities

The theme system provides comprehensive utility functions for color manipulation, spacing calculations, typography helpers, and more.

#### Color Manipulation Utilities

```typescript
import {
  hexToRgb,
  rgbToHex,
  getLuminance,
  getContrastRatio,
  getContrastText,
  lighten,
  darken,
  alpha,
  emphasize
} from '@shohojdhara/atomix/theme/utils';

// Convert hex to RGB
const rgb = hexToRgb('#3b82f6'); // { r: 59, g: 130, b: 246 }

// Convert RGB to hex
const hex = rgbToHex(59, 130, 246); // '#3b82f6'

// Calculate luminance (for accessibility)
const lum = getLuminance('#3b82f6'); // Returns value between 0-1

// Calculate contrast ratio between two colors
const ratio = getContrastRatio('#3b82f6', '#ffffff'); // Returns WCAG contrast ratio

// Get appropriate contrast text color (black or white)
const textColor = getContrastText('#3b82f6', 3); // Returns '#ffffff' or '#000000'

// Lighten a color
const lighter = lighten('#3b82f6', 0.2); // Lighten by 20%

// Darken a color
const darker = darken('#3b82f6', 0.2); // Darken by 20%

// Add transparency to a color
const transparent = alpha('#3b82f6', 0.5); // Returns 'rgba(59, 130, 246, 0.5)'

// Emphasize a color (lighten if dark, darken if light)
const emphasized = emphasize('#3b82f6', 0.15); // Emphasize by 15%
```

**Color Manipulation Use Cases:**

1. **Accessibility Compliance:**
```typescript
function ensureAccessibleContrast(foreground: string, background: string): string {
  const ratio = getContrastRatio(foreground, background);
  if (ratio < 4.5) {
    // Adjust foreground color for better contrast
    return getContrastText(background);
  }
  return foreground;
}
```

2. **Dynamic Theme Colors:**
```typescript
function createColorScale(baseColor: string): {
  light: string;
  base: string;
  dark: string;
  transparent: string;
} {
  return {
    light: lighten(baseColor, 0.2),
    base: baseColor,
    dark: darken(baseColor, 0.2),
    transparent: alpha(baseColor, 0.5),
  };
}
```

#### Spacing Utilities

```typescript
import { createSpacing, spacing } from '@shohojdhara/atomix/theme/utils';

// Create a spacing function
const spacingFn = createSpacing(4); // 4px base unit
spacingFn(1); // '4px'
spacingFn(2); // '8px'
spacingFn(1, 2); // '4px 8px'
spacingFn(1, 2, 3, 4); // '4px 8px 12px 16px'

// Use custom spacing scale
const customSpacing = createSpacing([0, 4, 8, 16, 24, 32]);
customSpacing(1); // '4px'
customSpacing(2); // '8px'

// Use spacing with theme
const margin = spacing(theme, 2, 4); // '8px 16px'
```

#### Theme Value Accessors

```typescript
import { getThemeValue, isJSTheme } from '@shohojdhara/atomix/theme/utils';

// Safely access nested theme values
const primaryColor = getThemeValue(theme, 'palette.primary.main');
const fontSize = getThemeValue(theme, 'typography.fontSize', 16);

// Type guard for JS themes
if (isJSTheme(theme)) {
  // theme is now typed as Theme
  console.log(theme.palette.primary.main);
}
```

#### Responsive Utilities

```typescript
import {
  breakpointUp,
  breakpointDown,
  breakpointBetween
} from '@shohojdhara/atomix/theme/utils';

// Get media query for breakpoint
const mediaUp = breakpointUp(theme, 'md'); // '@media (min-width: 768px)'
const mediaDown = breakpointDown(theme, 'sm'); // '@media (max-width: 639px)'
const mediaBetween = breakpointBetween(theme, 'sm', 'lg');
// '@media (min-width: 640px) and (max-width: 1023px)'
```

#### Typography Utilities

```typescript
import {
  getTypography,
  remToPx,
  pxToRem
} from '@shohojdhara/atomix/theme/utils';

// Get typography variant styles
const h1Styles = getTypography(theme, 'h1');

// Convert between rem and px
const pixels = remToPx(theme, 1.5); // Returns pixels based on theme font size
const rems = pxToRem(theme, 24); // Returns '1.5rem'
```

#### Shadow Utilities

```typescript
import { getShadow } from '@shohojdhara/atomix/theme/utils';

const shadow = getShadow(theme, 'md'); // Returns medium shadow value
```

#### Transition Utilities

```typescript
import {
  createTransition,
  getTransitionDuration,
  getTransitionEasing
} from '@shohojdhara/atomix/theme/utils';

// Create transition string
const transition = createTransition(
  theme,
  ['color', 'background-color'],
  {
    duration: 'standard',
    easing: 'easeInOut',
    delay: 100
  }
);
// Returns: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1) 100ms, background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 100ms'

// Get transition duration
const duration = getTransitionDuration(theme, 'standard'); // Returns milliseconds

// Get transition easing
const easing = getTransitionEasing(theme, 'easeInOut');
```

#### Z-Index Utilities

```typescript
import { getZIndex } from '@shohojdhara/atomix/theme/utils';

const zIndex = getZIndex(theme, 'modal'); // Returns modal z-index value
```

### Theme Utilities (Vanilla JavaScript)

For vanilla JavaScript applications, use the theme utilities directly:

```typescript
import { 
  loadThemeCSS, 
  removeThemeCSS, 
  applyThemeAttributes,
  buildThemePath,
  isThemeLoaded,
  createLocalStorageAdapter
} from '@shohojdhara/atomix/theme';

// Storage adapter for persistence
const storage = createLocalStorageAdapter();

// Load and apply a theme
async function setTheme(themeName: string) {
  const themePath = buildThemePath(themeName, '/themes');
  const linkId = `atomix-theme-${themeName}`;
  
  // Remove previous theme
  const previousTheme = storage.getItem('atomix-theme');
  if (previousTheme) {
    removeThemeCSS(previousTheme);
  }
  
  // Load new theme
  await loadThemeCSS(themePath, linkId);
  applyThemeAttributes('data-theme', themeName);
  
  // Persist
  storage.setItem('atomix-theme', themeName);
}

// Check if theme is loaded
const isLoaded = isThemeLoaded('dark');
```

### createTheme

Create a JavaScript theme. **Automatically loads from `atomix.config.ts` if no input is provided.**

```typescript
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

// Automatic: Loads from atomix.config.ts
const css = createTheme();
injectTheme(css);

// Manual: Provide explicit theme
const theme = createTheme({
  name: 'My Theme',
  palette: {
    primary: {
      main: '#7AFFD7',
      light: '#9AFFE7',
      dark: '#5ADFC7',
    },
    secondary: {
      main: '#FF5733',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
  },
  components: {
    Button: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

// Or use DesignTokens (flat structure)
const cssFromTokens = createTheme({
  'primary': '#7AFFD7',
  'spacing-4': '1rem',
});
```

**Key Features:**
- ✅ Automatically loads from `atomix.config.ts` when no input provided
- ✅ Automatically reads `prefix` from config
- ✅ Supports both Theme objects and DesignTokens (flat structure)
- ✅ Works in Node.js/SSR environments (browser gracefully falls back)

### Theme Composition

```typescript
import { extendTheme, mergeTheme } from '@shohojdhara/atomix/theme';

// Extend an existing theme
const extendedTheme = extendTheme(baseTheme, {
  palette: {
    primary: { main: '#FF0000' },
  },
});

// Merge multiple theme options
const merged = mergeTheme(
  { palette: { primary: { main: '#000' } } },
  { typography: { fontSize: 18 } }
);

// Compose multiple themes by merging them
const composed = createTheme(
  mergeTheme(
    extractThemeOptions(theme1),
    extractThemeOptions(theme2),
    extractThemeOptions(theme3)
  )
);
```

### Theme Utilities

```typescript
import { 
  quickTheme,
  createDarkVariant,
  validateTheme,
  generateCSSVariables,
} from '@shohojdhara/atomix/theme';

// Quick theme from colors
const theme = quickTheme('My Theme', '#7AFFD7', '#FF5733');

// Create dark variant
const darkTheme = createDarkVariant(lightTheme);

// Validate theme
const result = validateTheme(theme);
if (!result.valid) {
  console.error('Errors:', result.errors);
}

// Generate CSS variables
const css = generateCSSVariables(theme, {
  selector: ':root',
  prefix: 'atomix',
});
```

### ThemeErrorBoundary

React error boundary for theme errors:

```tsx
import { ThemeErrorBoundary } from '@shohojdhara/atomix/theme';

<ThemeErrorBoundary
  fallback={(error, errorInfo) => <CustomErrorUI />}
  onError={(error, errorInfo) => {
    // Send to error tracking
  }}
>
  <ThemeProvider>
    <App />
    </ThemeProvider>
</ThemeErrorBoundary>
```

### RTL Support

```typescript
import { RTLManager } from '@shohojdhara/atomix/theme';

const rtlManager = new RTLManager({
  enabled: true,
  autoDetect: true,
  locale: 'ar-SA',
});

// Set direction
rtlManager.setDirection('rtl');

// Get RTL-aware values
const margin = rtlManager.getValue('margin-left', 'margin-right');
```

---

## Configuration

### atomix.config.ts

The central configuration file for customizing design tokens and registering themes:

```typescript
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  // CSS variable prefix (default: 'atomix')
  prefix: 'atomix',
  
  theme: {
    // Extend default tokens
    extend: {
      // Colors - generates full color scales (1-10) automatically
      colors: {
        primary: { main: '#3b82f6' }, // Generates:
        // --atomix-primary-1 through --atomix-primary-10
        // --atomix-primary (main color)
        // --atomix-primary-rgb (for transparency)
        // --atomix-primary-text-emphasis
        // --atomix-primary-bg-subtle
        // --atomix-primary-border-subtle
        // --atomix-primary-hover
        secondary: { main: '#10b981' },
        error: { main: '#ef4444' },
      },
      
      // Typography customization
      typography: {
        fontFamilies: {
          sans: ['Inter', 'sans-serif'],
        },
        fontSizes: {
          '2xl': '1.5rem',
        },
        fontWeights: {
          bold: 700,
        },
      },
      
      // Spacing customization
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
      },
      
      // Border radius customization
      borderRadius: {
        'xl': '0.75rem',
      },
    },
    
    // Register themes
    themes: {
      'my-theme': {
        type: 'css',
        name: 'My Theme',
      },
    },
  },
});
```

### Configuration Options

- **`prefix`**: CSS variable prefix (default: `'atomix'`)
- **`theme.extend`**: Extend default design tokens
- **`theme.tokens`**: Override entire token system (advanced)
- **`theme.themes`**: Register CSS or JS themes
- **`build`**: Build configuration (internal)
- **`runtime`**: Runtime configuration (internal)

### Auto-Generated Files

From `atomix.config.ts`, these files are automatically generated:

1. **`src/themes/themes.config.js`** - Build-time theme configuration
   - Theme metadata (name, description, version, status, etc.)
   - Build settings (output directory, formats, SASS options)
   - Runtime configuration (basePath, storage, persistence)
   - Integration settings (CSS variables, class names)
   - Theme dependencies

2. **`src/styles/03-generic/_generated-root.css`** - CSS custom properties from config
   - Generated from `theme.extend` colors, typography, spacing, etc.
   - Includes full color scales (1-10 steps) from a single color
   - Includes semantic tokens (text-emphasis, bg-subtle, border-subtle, hover)
   - Includes RGB variants for transparency support
   - Typography, spacing, and border-radius tokens

**Note:** `_settings.config.scss` is NOT auto-generated - it's standalone for SCSS builds.

### Token Generation Details

When you customize colors in `theme.extend.colors`, the sync script automatically generates:

**For each color (e.g., `primary: { main: '#3b82f6' }`):**
- Full color scale: `--atomix-primary-1` through `--atomix-primary-10`
- Main color: `--atomix-primary` (maps to primary-6)
- RGB variant: `--atomix-primary-rgb` (for `rgba()` usage)
- Semantic tokens:
  - `--atomix-primary-text-emphasis` (for text)
  - `--atomix-primary-bg-subtle` (for backgrounds)
  - `--atomix-primary-border-subtle` (for borders)
  - `--atomix-primary-hover` (for hover states)

**Example Output:**
```css
/* _generated-root.css */
:root {
  --atomix-primary-1: #eff6ff;
  --atomix-primary-2: #dbeafe;
  --atomix-primary-3: #bfdbfe;
  --atomix-primary-4: #93c5fd;
  --atomix-primary-5: #60a5fa;
  --atomix-primary-6: #3b82f6; /* main */
  --atomix-primary-7: #2563eb;
  --atomix-primary-8: #1d4ed8;
  --atomix-primary-9: #1e40af;
  --atomix-primary-10: #1e3a8a;
  --atomix-primary: #3b82f6;
  --atomix-primary-rgb: 59, 130, 246;
  --atomix-primary-text-emphasis: #1e40af;
  --atomix-primary-bg-subtle: rgba(59, 130, 246, 0.1);
  --atomix-primary-border-subtle: rgba(59, 130, 246, 0.2);
  --atomix-primary-hover: #2563eb;
}
```

### Sync Scripts

```bash
# Sync theme configuration (generates themes.config.js and _generated-root.css)
npm run sync:config

# Generate tokens (alternative token generation)
npm run sync:tokens

# Validate configuration sync
npm run validate:config

# Both sync and validate (runs automatically before build)
npm run prebuild
```

**What `sync:config` does:**
1. Reads `atomix.config.ts`
2. Generates `themes.config.js` with theme metadata and configuration
3. Generates `_generated-root.css` with CSS custom properties from `theme.extend`
4. Updates package.json exports (if themes are registered)

---

## CSS Variables & Tokens

### Using CSS Variables

The theme system generates CSS variables you can use in your styles:

```css
.my-component {
  background-color: var(--atomix-primary);
  color: var(--atomix-primary-contrast-text);
  padding: var(--atomix-spacing-4);
  border-radius: var(--atomix-border-radius);
  box-shadow: var(--atomix-box-shadow-md);
}
```

### Available CSS Variables

#### Color Tokens

- **Base Colors**: `--atomix-primary`, `--atomix-secondary`, `--atomix-error`, `--atomix-success`, `--atomix-warning`, `--atomix-info`, `--atomix-light`, `--atomix-dark`
- **RGB Variants**: `--atomix-primary-rgb`, `--atomix-secondary-rgb`, etc. (for transparency)
- **Color Scales**: `--atomix-primary-1` through `--atomix-primary-10`
- **Text Emphasis**: `--atomix-primary-text-emphasis`, `--atomix-secondary-text-emphasis`, etc.
- **Background Subtle**: `--atomix-primary-bg-subtle`, `--atomix-secondary-bg-subtle`, etc.
- **Border Subtle**: `--atomix-primary-border-subtle`, etc.
- **Hover States**: `--atomix-primary-hover`, `--atomix-secondary-hover`, etc.
- **Gradients**: `--atomix-primary-gradient`, `--atomix-secondary-gradient`, etc.

#### Typography Tokens

- **Font Families**: `--atomix-font-sans-serif`, `--atomix-font-monospace`, `--atomix-body-font-family`
- **Font Sizes**: `--atomix-font-size-xs`, `--atomix-font-size-sm`, `--atomix-font-size-md`, `--atomix-font-size-lg`, `--atomix-font-size-xl`, `--atomix-font-size-2xl`
- **Font Weights**: `--atomix-font-weight-light`, `--atomix-font-weight-normal`, `--atomix-font-weight-medium`, `--atomix-font-weight-semibold`, `--atomix-font-weight-bold`
- **Line Heights**: `--atomix-line-height-base`, `--atomix-line-height-sm`, `--atomix-line-height-lg`

#### Spacing Tokens

- **Spacing Scale**: `--atomix-spacing-0` through `--atomix-spacing-200`
- **Special Spacing**: `--atomix-spacing-px-6`, `--atomix-spacing-px-10`, etc.
- **Common Values**: `--atomix-spacing-1` (4px), `--atomix-spacing-2` (8px), `--atomix-spacing-4` (16px), etc.

#### Border Radius Tokens

- **Base**: `--atomix-border-radius`, `--atomix-border-radius-sm`, `--atomix-border-radius-md`, `--atomix-border-radius-lg`, `--atomix-border-radius-xl`
- **Extended**: `--atomix-border-radius-xxl`, `--atomix-border-radius-3xl`, `--atomix-border-radius-4xl`, `--atomix-border-radius-pill`

#### Shadow Tokens

- **Base**: `--atomix-box-shadow`, `--atomix-box-shadow-xs`, `--atomix-box-shadow-sm`, `--atomix-box-shadow-lg`, `--atomix-box-shadow-xl`, `--atomix-box-shadow-inset`

### Importing Theme CSS Files

Individual theme CSS files can be imported separately:

```typescript
// Import a specific theme CSS file
import '@shohojdhara/atomix/themes/light';
// or minified version
import '@shohojdhara/atomix/themes/light.min';
```

**Available Theme Imports:**
- `@shohojdhara/atomix/themes/{theme-name}` - Expanded CSS
- `@shohojdhara/atomix/themes/{theme-name}.min` - Minified CSS

**Note:** Theme CSS files are only available if themes are registered in `atomix.config.ts` and built with `npm run build:themes`.

### Using Generated Tokens

If you've customized tokens via `atomix.config.ts`, import the generated CSS:

```typescript
// Import generated tokens
import '@shohojdhara/atomix/styles/03-generic/_generated-root.css';
```

Or if using SCSS:

```scss
@import '@shohojdhara/atomix/scss/generic';
```

The generated tokens will be available as CSS custom properties in your application.

#### Shadow Tokens

- **Box Shadows**: `--atomix-box-shadow`, `--atomix-box-shadow-xs`, `--atomix-box-shadow-sm`, `--atomix-box-shadow-lg`, `--atomix-box-shadow-xl`, `--atomix-box-shadow-inset`

#### Border Tokens

- **Border Radius**: `--atomix-border-radius`, `--atomix-border-radius-sm`, `--atomix-border-radius-lg`, `--atomix-border-radius-xl`, `--atomix-border-radius-xxl`, `--atomix-border-radius-pill`
- **Border Colors**: `--atomix-border-color`, `--atomix-border-color-translucent`

#### Other Tokens

- **Transitions**: `--atomix-transition-fast`, `--atomix-transition-base`, `--atomix-transition-slow`
- **Z-Index**: `--atomix-z-dropdown`, `--atomix-z-modal`, `--atomix-z-tooltip`, etc.
- **Breakpoints**: `--atomix-breakpoint-xs`, `--atomix-breakpoint-sm`, etc.
- **Focus Ring**: `--atomix-focus-ring-width`, `--atomix-focus-ring-offset`, `--atomix-focus-ring-opacity`

For a complete list, see [Design Tokens Documentation](./design-tokens/README.md).

---

## Advanced Topics

### Theme Composition

Combine and extend themes:

```typescript
import { mergeTheme, extendTheme } from '@shohojdhara/atomix/theme';

// Merge two theme options
const merged = mergeTheme(baseThemeOptions, additionalThemeOptions);

// Extend theme
const extended = extendTheme(baseTheme, {
  palette: {
    primary: { main: '#FF0000' },
  },
});
```

### Component Overrides

Customize component styles per theme:

```typescript
const theme = createTheme({
  components: {
    Button: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '12px 24px',
        },
      },
      defaultProps: {
        variant: 'primary',
        size: 'lg',
      },
    },
  },
});
```

**Note:** ComponentOverrideManager as a separate class is planned for a future release. For now, use `createTheme()` with `components` property.

### RTL Support

Enable RTL for right-to-left languages:

```typescript
import { RTLManager } from '@shohojdhara/atomix/theme';

const rtlManager = new RTLManager({
    enabled: true,
    autoDetect: true,
  locale: 'ar-SA',
});

// Set direction
rtlManager.setDirection('rtl');
```

Or with ThemeProvider:

```tsx
<ThemeProvider
  rtl={{
    enabled: true,
    autoDetect: true,
  }}
>
  <App />
</ThemeProvider>
```

### CSS Variable Generation

Generate CSS variables programmatically:

```typescript
import { generateCSSVariables } from '@shohojdhara/atomix/theme';

const css = generateCSSVariables(myTheme, {
  selector: ':root',
  prefix: 'atomix',
});

// Inject into DOM
document.head.appendChild(
  Object.assign(document.createElement('style'), {
    textContent: css,
  })
);
```

### Theme Validation

Validate themes during development:

```typescript
import { validateTheme } from '@shohojdhara/atomix/theme';

const result = validateTheme(myTheme);

if (!result.valid) {
  console.error('Theme validation errors:', result.errors);
}
```

### Development Tools

```tsx
import { ThemePreview, ThemeInspector } from '@shohojdhara/atomix/theme';

// Preview theme
<ThemePreview
  theme={myTheme}
  showPalette={true}
  showTypography={true}
/>

// Inspect theme
<ThemeInspector
  theme={myTheme}
  showValidation={true}
  showCSSVariables={true}
/>
```

---

## Troubleshooting

### Theme Not Loading

**Problem:** Theme fails to load

**Solutions:**
1. Check theme exists in registry (using ThemeProvider):
   ```typescript
   const { availableThemes } = useTheme();
   console.log(availableThemes);
   ```

2. Check for errors (using ThemeProvider):
   ```typescript
   const { error } = useTheme();
   if (error) {
     console.error('Theme error:', error);
   }
   ```

3. Verify CSS path exists

### CSS Variables Not Working

**Problem:** CSS variables not found

**Solutions:**
1. Ensure theme is loaded (SCSS or JS)
2. Check prefix matches config
3. Verify token name follows conventions
4. Check browser DevTools for actual CSS variable names
5. If using config-generated tokens, ensure `_generated-root.css` is imported

### Token Generation Issues

**Problem:** Generated tokens don't match config

**Solutions:**
1. Run `npm run sync:config` to regenerate
2. Check `atomix.config.ts` syntax is correct
3. Verify color values are valid hex colors
4. Check `src/styles/03-generic/_generated-root.css` exists and has content
5. Ensure `_generated-root.css` is imported in your styles

**Problem:** Only 1 CSS variable generated instead of full scale

**Solutions:**
1. Ensure you're using `theme.extend.colors` (not `theme.tokens.colors`)
2. Check color format: `{ main: '#3b82f6' }` (not just `'#3b82f6'`)
3. Run `npm run sync:config` again
4. Check console output for errors during sync

### Theme CSS Import Issues

**Problem:** Cannot import theme CSS files

**Solutions:**
1. Ensure themes are built: `npm run build:themes`
2. Check `dist/themes/` directory exists
3. Verify package.json exports include theme paths
4. Use correct import path: `@shohojdhara/atomix/themes/light`
5. Check theme is registered in `atomix.config.ts`

### TypeScript Errors

**Problem:** TypeScript errors with theme types

**Solutions:**
1. Import types correctly:
   ```typescript
   import type { Theme, ThemeMetadata } from '@shohojdhara/atomix/theme';
   ```

2. Use type guards:
   ```typescript
   if (isJSTheme(theme)) {
     // theme is now typed as Theme
   }
   ```

### Configuration Not Syncing

**Problem:** Generated files don't match `atomix.config.ts`

**Solution:**
```bash
npm run sync:config
npm run sync:tokens
npm run validate:config
```

### Prefix Not Updating

**Problem:** Prefix changes in config but not in generated files

**Solution:**
1. Check `atomix.config.ts` has `prefix` field
2. Run `npm run sync:config && npm run sync:tokens`
3. Verify with `npm run validate:config`

### Browser Environment Limitations

⚠️ **Important:** The `atomix.config.ts` file cannot be dynamically loaded in browser environments. In browser/client-side applications:

1. **Fallback Behavior:** The theme system will use a default empty configuration
2. **Manual Registration Required:** Themes must be explicitly provided to the ThemeProvider

   ```typescript
// In browser environments, provide themes directly
import { ThemeProvider } from '@shohojdhara/atomix/theme';

const themes = {
  'my-theme': {
    type: 'css',
    name: 'My Theme',
    class: 'my-theme',
  },
};

function App() {
  return (
    <ThemeProvider 
      themes={themes}
      defaultTheme="my-theme"
      basePath="/themes"
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

---

## Best Practices

### 1. Always Use CSS Variables

✅ **Good:**
```scss
.component {
  color: var(--atomix-primary);
  padding: var(--atomix-spacing-4);
}
```

❌ **Bad:**
```scss
.component {
  color: #3b82f6; // Hardcoded value
  padding: 16px; // Hardcoded value
}
```

### 2. Use ThemeProvider for React Apps

✅ **Good:**
```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

### 3. Error Boundaries

Always wrap ThemeProvider with error boundary:

   ```tsx
   <ThemeErrorBoundary>
     <ThemeProvider>
       <App />
     </ThemeProvider>
   </ThemeErrorBoundary>
   ```

### 4. Type Safety

Use TypeScript types:

```typescript
import type { Theme, ThemeMetadata } from '@shohojdhara/atomix/theme';
```

### 5. Performance

- Enable caching (default: enabled)
- Use lazy loading for themes
- Preload critical themes
- Use minified CSS in production

### 6. Accessibility

- Validate themes for contrast ratios
- Test with screen readers
- Ensure keyboard navigation works
- Check color blindness compatibility

---

## Examples

### Complete React Example

```tsx
import React from 'react';
import {
  ThemeProvider,
  ThemeErrorBoundary,
  useTheme,
  createTheme,
} from '@shohojdhara/atomix/theme';

const lightTheme = createTheme({
  name: 'Light',
  palette: {
    primary: { main: '#3b82f6' },
    background: { default: '#ffffff' },
  },
});

const darkTheme = createTheme({
  name: 'Dark',
  palette: {
    primary: { main: '#60a5fa' },
    background: { default: '#111827' },
  },
});

function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value={lightTheme}>Light</option>
      <option value={darkTheme}>Dark</option>
    </select>
  );
}

function App() {
  return (
    <ThemeErrorBoundary
      onError={(error, errorInfo) => {
        console.error('Theme error:', error);
      }}
    >
      <ThemeProvider
        defaultTheme={lightTheme}
        enablePersistence={true}
      >
        <ThemeSelector />
        <YourApp />
      </ThemeProvider>
    </ThemeErrorBoundary>
  );
}
```

### Next.js Integration

```tsx
// app/layout.tsx
import { ThemeProvider } from '@shohojdhara/atomix/theme';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## Related Documentation

- [Design Tokens Reference](./design-tokens/README.md) - Complete token list
- [Styles Architecture](./styles/architecture.md) - ITCSS structure
- [Component Documentation](./components/README.md) - Component library
- [Getting Started Guide](./getting-started/README.md) - Installation and setup

---

## Support

For issues, questions, or contributions:
- GitHub Issues: [Create an issue](https://github.com/Shohojdhara/atomix/issues)
- Documentation: [Full Docs](./README.md)

---

**Last Updated:** 2025-01-27  
**Version:** 2.1  
**Maintained by:** Atomix Design System Team
