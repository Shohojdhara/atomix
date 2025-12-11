# Atomix Theme System Usage Guide

The Atomix theme system is now complete and provides comprehensive theming capabilities for both CSS-based and JavaScript-based themes.

## Quick Start

### 1. Basic Setup

```tsx
import { ThemeProvider, useTheme } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider defaultTheme="shaj-default">
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
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
      subtle: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
  },
});

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

- **Colors**: `--atomix-primary`, `--atomix-secondary`, `--atomix-error`, etc.
- **Typography**: `--atomix-font-family`, `--atomix-font-size-*`, etc.
- **Spacing**: `--atomix-spacing-*` (0-200)
- **Shadows**: `--atomix-box-shadow-*` (xs, sm, md, lg, xl)
- **Border Radius**: `--atomix-border-radius-*` (sm, md, lg, xl, etc.)
- **Transitions**: `--atomix-transition-duration-*`, `--atomix-easing-*`

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