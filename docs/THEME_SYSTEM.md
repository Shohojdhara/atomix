# Atomix Theme System Documentation

**Version:** 2.0  
**Last Updated:** 2024-12-19

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [Core Concepts](#core-concepts)
5. [API Reference](#api-reference)
6. [Configuration](#configuration)
7. [Error Handling](#error-handling)
8. [Best Practices](#best-practices)
9. [Advanced Topics](#advanced-topics)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The Atomix Theme System is a comprehensive theme management solution that supports both CSS-based and JavaScript-based themes. It provides a unified API for theme loading, switching, persistence, and composition.

### Key Features

- ✅ **Dual Theme Support**: CSS themes and JavaScript themes
- ✅ **Type-Safe**: Full TypeScript support with comprehensive types
- ✅ **Error Resilient**: Centralized error handling with error boundaries
- ✅ **Performance Optimized**: Built-in caching and lazy loading
- ✅ **React Integration**: Hooks and providers for React applications
- ✅ **RTL Support**: Built-in right-to-left language support
- ✅ **Accessibility**: Theme validation with contrast checking
- ✅ **Developer Tools**: CLI, inspector, and preview tools

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
│  (ThemeProvider, useTheme, ThemeErrorBoundary)          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Runtime Layer                           │
│              (ThemeManager)                              │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                   Core Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ ThemeEngine  │  │ ThemeRegistry│  │ ThemeCache   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │ThemeValidator│  │ ConfigLoader │                   │
│  └──────────────┘  └──────────────┘                   │
└─────────────────────────────────────────────────────────┘
```

---

## Architecture

### Core Components

#### 1. ThemeEngine
The core engine that manages theme loading, switching, and application. Supports both CSS and JS themes.

**Responsibilities:**
- Theme loading and caching
- CSS injection for JS themes
- Theme switching logic
- Event emission

#### 2. ThemeRegistry
Central registry for all available themes with dependency management.

**Features:**
- Theme discovery
- Dependency resolution
- Circular dependency detection
- Metadata management

#### 3. ThemeCache
Performance optimization layer with LRU eviction.

**Features:**
- CSS theme caching
- JS theme caching
- Configurable TTL
- Size limits

#### 4. ThemeValidator
Runtime validation including accessibility checks.

**Validates:**
- Color contrast ratios
- Typography settings
- Spacing functions
- Breakpoint configurations
- Accessibility compliance

### Runtime Components

#### ThemeManager
High-level API for theme management.

#### ThemeProvider
React context provider for theme state.

#### ThemeErrorBoundary
React error boundary for graceful error handling.

---

## Getting Started

### Installation

The theme system is included with Atomix. No additional installation required.

```bash
npm install @shohojdhara/atomix
```

### Basic Usage

#### React (Recommended)

```tsx
import { ThemeProvider, useTheme } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

function YourComponent() {
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

#### Vanilla JavaScript

```typescript
import { ThemeManager } from '@shohojdhara/atomix/theme';

const themeManager = new ThemeManager({
  themes: {
    'light-theme': { name: 'Light Theme' },
    'dark-theme': { name: 'Dark Theme' },
  },
  defaultTheme: 'light-theme',
});

// Switch theme
await themeManager.setTheme('dark-theme');

// Get current theme
const currentTheme = themeManager.getTheme();
```

---

## Core Concepts

### Theme Types

#### CSS Themes
Themes loaded from CSS files. Applied via CSS classes.

```typescript
// theme.config.ts
export default {
  themes: {
    'my-theme': {
      type: 'css',
      name: 'My Theme',
      class: 'my-theme-class',
      cssPath: '/themes/my-theme.css',
    },
  },
};
```

#### JavaScript Themes
Themes created programmatically using `createTheme`.

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

### Theme Configuration

Themes are configured in `theme.config.ts`:

```typescript
import type { ThemeConfig } from '@shohojdhara/atomix/theme';

const config: ThemeConfig = {
  themes: {
    'theme-id': {
      type: 'css', // or 'js'
      name: 'Theme Name',
      // ... other metadata
    },
  },
  runtime: {
    basePath: '/themes',
    defaultTheme: 'theme-id',
    enablePersistence: true,
  },
};

export default config;
```

---

## API Reference

### ThemeManager

Main class for theme management.

#### Constructor

```typescript
new ThemeManager(config: ThemeManagerConfig)
```

**Config Options:**
- `themes`: Record of theme metadata
- `defaultTheme`: Default theme name or Theme object
- `basePath`: Base path for CSS themes (default: `/themes`)
- `storageKey`: localStorage key (default: `atomix-theme`)
- `enablePersistence`: Enable theme persistence (default: `true`)
- `onThemeChange`: Callback when theme changes
- `onError`: Error callback

#### Methods

```typescript
// Set theme
await themeManager.setTheme(theme: string | Theme, options?: ThemeLoadOptions): Promise<void>

// Get current theme
const theme: string = themeManager.getTheme()

// Get active theme object (for JS themes)
const activeTheme: Theme | null = themeManager.getActiveTheme()

// Get available themes
const themes: ThemeMetadata[] = themeManager.getAvailableThemes()

// Check if theme is loaded
const isLoaded: boolean = themeManager.isThemeLoaded(themeName: string)

// Preload theme
await themeManager.preloadTheme(themeName: string): Promise<void>

// Event listeners
themeManager.on('themeChange', (event: ThemeChangeEvent) => {})
themeManager.on('themeLoad', (themeName: string) => {})
themeManager.on('themeError', (error: Error, themeName: string) => {})

// Cleanup
themeManager.destroy()
```

### ThemeProvider

React context provider for theme state.

```tsx
<ThemeProvider
  defaultTheme="my-theme"
  themes={themes}
  basePath="/themes"
  enablePersistence={true}
  onThemeChange={(theme) => console.log('Theme changed:', theme)}
>
  {children}
</ThemeProvider>
```

### useTheme Hook

React hook for accessing theme context.

```typescript
const {
  theme,              // Current theme name
  activeTheme,        // Active theme object (for JS themes)
  setTheme,           // Function to change theme
  availableThemes,    // List of available themes
  isLoading,          // Loading state
  error,              // Error state
  isThemeLoaded,      // Check if theme is loaded
  preloadTheme,       // Preload a theme
} = useTheme()
```

### ThemeErrorBoundary

React error boundary for theme errors.

```tsx
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

### createTheme

Create a JavaScript theme.

```typescript
import { createTheme } from '@shohojdhara/atomix/theme';

const theme = createTheme({
  name: 'My Theme',
  palette: {
    primary: {
      main: '#7AFFD7',
      light: '#9AFFE7',
      dark: '#5ADFC7',
      contrastText: '#000000',
    },
    secondary: {
      main: '#FF5733',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
  },
  spacing: 8, // Base spacing unit
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
```

---

## Configuration

### Theme Configuration File

Create `theme.config.ts` in your project root:

```typescript
import type { ThemeConfig } from '@shohojdhara/atomix/theme';

const config: ThemeConfig = {
  themes: {
    'light-theme': {
      type: 'css',
      name: 'Light Theme',
      class: 'light-theme',
      description: 'Default light theme',
      status: 'stable',
    },
    'dark-theme': {
      type: 'css',
      name: 'Dark Theme',
      class: 'dark-theme',
      description: 'Default dark theme',
      status: 'stable',
    },
  },
  runtime: {
    basePath: '/themes',
    defaultTheme: 'light-theme',
    storageKey: 'atomix-theme',
    enablePersistence: true,
    useMinified: process.env.NODE_ENV === 'production',
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
};

export default config;
```

### Environment-Specific Configuration

The config loader automatically applies environment-specific overrides:

- **Development**: Source maps enabled, unminified CSS
- **Production**: Minified CSS, optimized settings
- **Test**: Persistence disabled

---

## Error Handling

### ThemeError

Custom error class with error codes and context.

```typescript
import { ThemeError, ThemeErrorCode } from '@shohojdhara/atomix/theme';

throw new ThemeError(
  'Theme not found',
  ThemeErrorCode.THEME_NOT_FOUND,
  { themeId: 'my-theme' }
);
```

### Error Codes

- `THEME_NOT_FOUND`: Theme not in registry
- `THEME_LOAD_FAILED`: Theme failed to load
- `THEME_VALIDATION_FAILED`: Theme validation failed
- `CONFIG_LOAD_FAILED`: Configuration loading failed
- `CIRCULAR_DEPENDENCY`: Circular dependency detected
- `MISSING_DEPENDENCY`: Missing theme dependency
- `STORAGE_ERROR`: Storage operation failed
- `INVALID_THEME_NAME`: Invalid theme name
- `CSS_INJECTION_FAILED`: CSS injection failed
- `UNKNOWN_ERROR`: Unknown error

### Logging

```typescript
import { getLogger, LogLevel } from '@shohojdhara/atomix/theme';

const logger = getLogger();

logger.error('Error message', error, { context: 'data' });
logger.warn('Warning message', { context: 'data' });
logger.info('Info message', { context: 'data' });
logger.debug('Debug message', { context: 'data' });

// Custom logger
import { createLogger } from '@shohojdhara/atomix/theme';

const customLogger = createLogger({
  level: LogLevel.WARN,
  enableConsole: true,
  onError: (error, context) => {
    // Send to error tracking service
  },
});
```

### Error Boundary

Always wrap ThemeProvider with ThemeErrorBoundary:

```tsx
<ThemeErrorBoundary
  onError={(error, errorInfo) => {
    // Log to error tracking service
    errorTracking.capture(error);
  }}
>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</ThemeErrorBoundary>
```

---

## Best Practices

### 1. Use ThemeProvider

Always use ThemeProvider for React applications:

```tsx
// ✅ Good
<ThemeProvider>
  <App />
</ThemeProvider>

// ❌ Bad - Direct ThemeManager usage in React
const manager = new ThemeManager({...});
```

### 2. Error Boundaries

Wrap ThemeProvider with error boundary:

```tsx
// ✅ Good
<ThemeErrorBoundary>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</ThemeErrorBoundary>
```

### 3. Theme Preloading

Preload themes for better performance:

```typescript
// Preload on app initialization
useEffect(() => {
  themeManager.preloadTheme('dark-theme');
}, []);
```

### 4. Type Safety

Use TypeScript types:

```typescript
// ✅ Good
import type { Theme, ThemeMetadata } from '@shohojdhara/atomix/theme';

// ❌ Bad
const theme: any = themeManager.getActiveTheme();
```

### 5. Error Handling

Handle errors gracefully:

```typescript
try {
  await themeManager.setTheme('my-theme');
} catch (error) {
  if (error instanceof ThemeError) {
    console.error('Theme error:', error.code, error.context);
  }
  // Fallback to default theme
  await themeManager.setTheme('default-theme');
}
```

### 6. Performance

- Enable caching (default: enabled)
- Use lazy loading for themes
- Preload critical themes
- Use minified CSS in production

### 7. Accessibility

- Validate themes for contrast ratios
- Test with screen readers
- Ensure keyboard navigation works
- Check color blindness compatibility

---

## Advanced Topics

### Theme Composition

Combine and extend themes:

```typescript
import { mergeTheme, extendTheme } from '@shohojdhara/atomix/theme';

// Merge two themes
const merged = mergeTheme(baseTheme, overrideTheme);

// Extend theme
const extended = extendTheme(baseTheme, {
  palette: {
    primary: { main: '#FF0000' },
  },
});
```

### Custom Storage Adapter

Implement custom storage:

```typescript
import type { StorageAdapter } from '@shohojdhara/atomix/theme';

const customStorage: StorageAdapter = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
  removeItem: (key) => localStorage.removeItem(key),
  isAvailable: () => typeof localStorage !== 'undefined',
};
```

### RTL Support

Enable RTL for right-to-left languages:

```typescript
const themeManager = new ThemeManager({
  themes: {...},
  rtl: {
    enabled: true,
    direction: 'rtl',
    autoDetect: true,
    locale: 'ar',
  },
});

// Set direction
themeManager.setDirection('rtl');
```

### Theme Analytics

Track theme usage:

```typescript
import { ThemeAnalytics } from '@shohojdhara/atomix/theme';

const analytics = new ThemeAnalytics({
  enabled: true,
  trackPerformance: true,
  onEvent: (event) => {
    // Send to analytics service
  },
});
```

### Component Overrides

Override component styles per theme:

```typescript
import { ComponentOverrideManager } from '@shohojdhara/atomix/theme';

const overrideManager = new ComponentOverrideManager();

overrideManager.addOverride('Button', {
  styleOverrides: {
    root: {
      borderRadius: '8px',
    },
  },
});
```

---

## Troubleshooting

### Theme Not Loading

**Problem:** Theme fails to load

**Solutions:**
1. Check theme exists in registry:
   ```typescript
   const themes = themeManager.getAvailableThemes();
   console.log(themes);
   ```

2. Check for errors:
   ```typescript
   themeManager.on('themeError', (error, themeName) => {
     console.error('Theme error:', error, themeName);
   });
   ```

3. Verify CSS path:
   ```typescript
   // Check if CSS file exists at the expected path
   ```

### Type Errors

**Problem:** TypeScript errors with theme types

**Solutions:**
1. Import types correctly:
   ```typescript
   import type { Theme, ThemeMetadata } from '@shohojdhara/atomix/theme';
   ```

2. Use type guards:
   ```typescript
   import { isJSTheme } from '@shohojdhara/atomix/theme';
   if (isJSTheme(theme)) {
     // theme is now typed as Theme
   }
   ```

### Performance Issues

**Problem:** Slow theme switching

**Solutions:**
1. Enable caching:
   ```typescript
   const engine = themeManager.getEngine();
   engine.getCache().clear(); // Clear if needed
   ```

2. Preload themes:
   ```typescript
   await themeManager.preloadTheme('theme-name');
   ```

3. Use minified CSS in production

### Error Boundary Not Catching Errors

**Problem:** Errors still crash the app

**Solutions:**
1. Ensure ThemeErrorBoundary wraps ThemeProvider:
   ```tsx
   <ThemeErrorBoundary>
     <ThemeProvider>
       <App />
     </ThemeProvider>
   </ThemeErrorBoundary>
   ```

2. Check error is thrown from theme system:
   - ThemeErrorBoundary only catches theme-related errors
   - Use React ErrorBoundary for other errors

---

## Examples

### Complete React Example

```tsx
import React from 'react';
import {
  ThemeProvider,
  ThemeErrorBoundary,
  useTheme,
} from '@shohojdhara/atomix/theme';

function ThemeSelector() {
  const { theme, setTheme, availableThemes } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {availableThemes.map((t) => (
        <option key={t.id} value={t.id}>
          {t.name}
        </option>
      ))}
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
        defaultTheme="light-theme"
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

### Vanilla JavaScript Example

```typescript
import { ThemeManager } from '@shohojdhara/atomix/theme';

const themeManager = new ThemeManager({
  themes: {
    'light': { name: 'Light', type: 'css' },
    'dark': { name: 'Dark', type: 'css' },
  },
  defaultTheme: 'light',
  enablePersistence: true,
});

// Listen for theme changes
themeManager.on('themeChange', (event) => {
  console.log('Theme changed:', event.currentTheme);
});

// Switch theme
document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = themeManager.getTheme();
  const next = current === 'light' ? 'dark' : 'light';
  themeManager.setTheme(next);
});
```

---

## API Summary

### Exports

```typescript
// Runtime
export { ThemeManager, ThemeProvider, ThemeErrorBoundary, useTheme }

// Theme Creation
export { createTheme }

// Composition
export { mergeTheme, extendTheme, composeThemes }

// Utilities
export { generateCSSVariables, hexToRgb, getContrastRatio }

// Error Handling
export { ThemeError, ThemeErrorCode, ThemeLogger, getLogger }

// Types
export type { Theme, ThemeMetadata, ThemeManagerConfig }
```

---

## Resources

- [Theme System Usage Guide](./THEME_SYSTEM_USAGE.md)
- [API Reference](./api/react.md)
- [Configuration Guide](./guides/theming.md)
- [Examples](./examples/)

---

## Support

For issues, questions, or contributions:
- GitHub Issues: [Create an issue](https://github.com/Shohojdhara/atomix/issues)
- Documentation: [Full Docs](./README.md)

---

**Last Updated:** 2024-12-19  
**Version:** 2.0
