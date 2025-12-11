# Atomix Theme System Usage Guide

The Atomix theme system is now complete and provides comprehensive theming capabilities for both CSS-based and JavaScript-based themes.

## Quick Start

### 1. Basic Setup

```tsx
import { ThemeProvider, useTheme } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Using Themes in Components

```tsx
function MyComponent() {
  const { theme, setTheme, availableThemes } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {availableThemes.map(t => (
          <option key={t.class || t.name} value={t.class || t.name}>{t.name}</option>
        ))}
      </select>
    </div>
  );
}
```

## Theme Types

### CSS Themes

CSS themes are defined in the theme configuration and loaded dynamically:

```typescript
// theme.config.ts
{
  'my-theme': {
    type: 'css',
    name: 'My Theme',
    description: 'A custom CSS theme',
    author: 'Your Name',
    version: '1.0.0',
    status: 'stable',
    color: '#7AFFD7',
  }
}
```

### JavaScript Themes

JavaScript themes are created programmatically using the `createTheme` function:

```typescript
import { createTheme } from '@shohojdhara/atomix/theme';

const customTheme = createTheme({
  name: 'Custom Theme',
  palette: {
    primary: { main: '#7AFFD7' },
    secondary: { main: '#FF5733' },
    // Optional: Add light and dark colors
    light: { main: '#F9FAFB' },
    dark: { main: '#1F2937' },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
      subtle: '#F5F5F5',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
  },
});
```

**Note:** When you create a JavaScript theme, all CSS variables are automatically generated including:
- Color scales (1-10 steps) for primary, secondary, error, warning, info, success
- RGB variants for transparency support
- Text emphasis variants (primary, secondary, tertiary, disabled, invert, brand)
- Background and border subtle variants
- Gradient tokens for all colors
- Hover state colors

// Use in component
function MyComponent() {
  const { setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(customTheme)}>
      Apply Custom Theme
    </button>
  );
}
```

## CSS Variables

The theme system automatically generates CSS variables that you can use in your styles:

```css
.my-component {
  background-color: var(--atomix-primary);
  color: var(--atomix-primary-contrast-text);
  padding: var(--atomix-spacing-2);
  border-radius: var(--atomix-border-radius);
  box-shadow: var(--atomix-box-shadow-md);
}
```

### Available CSS Variables

#### Color Tokens
- **Base Colors**: `--atomix-primary`, `--atomix-secondary`, `--atomix-error`, `--atomix-success`, `--atomix-warning`, `--atomix-info`, `--atomix-light`, `--atomix-dark`
- **RGB Variants**: `--atomix-primary-rgb`, `--atomix-secondary-rgb`, etc. (for transparency support)
- **Text Emphasis**: `--atomix-primary-text-emphasis`, `--atomix-secondary-text-emphasis`, `--atomix-tertiary-text-emphasis`, `--atomix-disabled-text-emphasis`, `--atomix-invert-text-emphasis`, `--atomix-brand-text-emphasis`
- **Background Subtle**: `--atomix-primary-bg-subtle`, `--atomix-secondary-bg-subtle`, `--atomix-tertiary-bg-subtle`, `--atomix-invert-bg-subtle`, `--atomix-brand-bg-subtle`, etc.
- **Border Subtle**: `--atomix-primary-border-subtle`, `--atomix-brand-border-subtle`, etc.
- **Hover States**: `--atomix-primary-hover`, `--atomix-secondary-hover`, etc.
- **Gradients**: `--atomix-primary-gradient`, `--atomix-secondary-gradient`, `--atomix-success-gradient`, `--atomix-info-gradient`, `--atomix-warning-gradient`, `--atomix-error-gradient`, `--atomix-light-gradient`, `--atomix-dark-gradient`, `--atomix-gradient`

#### Typography Tokens
- **Font Families**: `--atomix-font-sans-serif`, `--atomix-font-monospace`, `--atomix-body-font-family`
- **Font Sizes**: `--atomix-font-size-xs`, `--atomix-font-size-sm`, `--atomix-font-size-md`, `--atomix-font-size-lg`, `--atomix-font-size-xl`, `--atomix-font-size-2xl`, `--atomix-display-1`
- **Font Weights**: `--atomix-font-weight-light`, `--atomix-font-weight-normal`, `--atomix-font-weight-medium`, `--atomix-font-weight-semibold`, `--atomix-font-weight-bold`, `--atomix-font-weight-heavy`, `--atomix-font-weight-black`
- **Line Heights**: `--atomix-line-height-base`, `--atomix-line-height-sm`, `--atomix-line-height-lg`
- **Letter Spacing**: `--atomix-letter-spacing-h1` through `--atomix-letter-spacing-h6`

#### Spacing Tokens
- **Spacing Scale**: `--atomix-spacing-0` through `--atomix-spacing-200`
- **Special Spacing**: `--atomix-spacing-px-6`, `--atomix-spacing-px-10`, `--atomix-spacing-px-14`, `--atomix-spacing-px-22`, `--atomix-spacing-px-30`

#### Shadow Tokens
- **Box Shadows**: `--atomix-box-shadow`, `--atomix-box-shadow-xs`, `--atomix-box-shadow-sm`, `--atomix-box-shadow-lg`, `--atomix-box-shadow-xl`, `--atomix-box-shadow-inset`

#### Border Tokens
- **Border Radius**: `--atomix-border-radius`, `--atomix-border-radius-sm`, `--atomix-border-radius-lg`, `--atomix-border-radius-xl`, `--atomix-border-radius-xxl`, `--atomix-border-radius-2xl`, `--atomix-border-radius-3xl`, `--atomix-border-radius-4xl`, `--atomix-border-radius-pill`
- **Border Colors**: `--atomix-border-color`, `--atomix-border-color-translucent`
- **Link Decoration**: `--atomix-link-decoration` (default: `none`)

#### Transition Tokens
- **Durations**: `--atomix-transition-duration-fast`, `--atomix-transition-duration-base`, `--atomix-transition-duration-slow`, `--atomix-transition-duration-slower`
- **Easing**: `--atomix-easing-base`, `--atomix-easing-ease-in-out`, `--atomix-easing-ease-out`, `--atomix-easing-ease-in`, `--atomix-easing-ease-linear`
- **Full Transitions**: `--atomix-transition-fast`, `--atomix-transition-base`, `--atomix-transition-slow`

#### Z-Index Tokens
- **Scale**: `--atomix-z-n1`, `--atomix-z-0`, `--atomix-z-1`, `--atomix-z-2`, `--atomix-z-3`, `--atomix-z-4`, `--atomix-z-5`
- **Semantic**: `--atomix-z-dropdown`, `--atomix-z-sticky`, `--atomix-z-fixed`, `--atomix-z-modal`, `--atomix-z-popover`, `--atomix-z-tooltip`, `--atomix-z-drawer`

#### Breakpoint Tokens
- **Breakpoints**: `--atomix-breakpoint-xs`, `--atomix-breakpoint-sm`, `--atomix-breakpoint-md`, `--atomix-breakpoint-lg`, `--atomix-breakpoint-xl`, `--atomix-breakpoint-xxl`

#### Focus Ring Tokens
- **Focus Ring**: `--atomix-focus-ring-width`, `--atomix-focus-ring-offset`, `--atomix-focus-ring-opacity`

## Theme Configuration

Create a `theme.config.ts` file in your project root:

```typescript
import type { ThemeConfig } from '@shohojdhara/atomix/theme/config';
import { createTheme } from '@shohojdhara/atomix/theme';

const config: ThemeConfig = {
  themes: {
    'my-css-theme': {
      type: 'css',
      name: 'My CSS Theme',
      description: 'A theme loaded from CSS',
      status: 'stable',
    },
    'my-js-theme': {
      type: 'js',
      name: 'My JS Theme',
      description: 'A programmatically created theme',
      status: 'experimental',
      createTheme: () => createTheme({
        name: 'My JS Theme',
        palette: {
          primary: { main: '#7AFFD7' },
        },
      }),
    },
  },
  build: {
    output: {
      directory: 'themes',
      formats: {
        expanded: '.css',
        compressed: '.min.css',
      },
    },
    sass: {
      style: 'expanded',
      sourceMap: true,
      loadPaths: ['src'],
    },
  },
  runtime: {
    basePath: '/themes',
    defaultTheme: 'my-css-theme',
    enablePersistence: true,
  },
  integration: {
    cssVariables: {
      colorMode: '--color-mode',
    },
    classNames: {
      theme: 'data-theme',
      colorMode: 'data-color-mode',
    },
  },
};

export default config;
```

## Advanced Usage

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
const mergedOptions = mergeTheme(
  { palette: { primary: { main: '#000' } } },
  { typography: { fontSize: 18 } }
);
```

### Theme Validation

```typescript
import { ThemeValidator } from '@shohojdhara/atomix/theme/core';

const validator = new ThemeValidator();
const result = validator.validate(myTheme);

if (!result.valid) {
  console.error('Theme validation errors:', result.errors);
}
```

### CSS Variable Generation

```typescript
import { generateCSSVariables } from '@shohojdhara/atomix/theme';

const css = generateCSSVariables(myTheme, {
  selector: ':root',
  prefix: 'my-app',
});

// Inject into DOM
document.head.appendChild(
  Object.assign(document.createElement('style'), {
    textContent: css,
  })
);
```

## Development Tools

### Theme Preview Component

```tsx
import { ThemePreview } from '@shohojdhara/atomix/theme/devtools';

function ThemeDevPage() {
  return (
    <ThemePreview
      theme={myTheme}
      showPalette={true}
      showTypography={true}
    />
  );
}
```

### Theme Inspector

```tsx
import { ThemeInspector } from '@shohojdhara/atomix/theme/devtools';

function ThemeDebugPage() {
  return (
    <ThemeInspector
      theme={myTheme}
      showValidation={true}
      showCSSVariables={true}
    />
  );
}
```

## Best Practices

1. **Use CSS Variables**: Always use CSS variables in your styles for theme compatibility
2. **Theme Validation**: Validate themes during development to catch issues early
3. **Accessibility**: Ensure proper contrast ratios and accessibility compliance
4. **Performance**: Use lazy loading for themes and enable caching
5. **Consistency**: Follow the design token naming conventions

## Migration from Previous Versions

If you were using a previous version of the theme system:

1. Update imports to use the new theme module structure
2. Replace direct CSS imports with the ThemeProvider
3. Update CSS variable names to use the new `--atomix-` prefix
4. Use the new `createTheme` function for JavaScript themes

## Troubleshooting

### Common Issues

1. **Theme not loading**: Check the `basePath` configuration and ensure CSS files exist
2. **CSS variables not working**: Ensure the theme is properly loaded and CSS variables are generated
3. **TypeScript errors**: Make sure you're importing types from the correct modules
4. **Performance issues**: Enable caching and use lazy loading for better performance

### Debug Mode

Enable debug logging by setting the environment variable:

```bash
DEBUG=atomix:theme npm start
```

This will log theme loading, switching, and validation information to the console.