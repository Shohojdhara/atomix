# Theme Manager

The Atomix Design System Theme Manager provides a powerful and flexible way to manage themes in your applications. It supports both React and vanilla JavaScript, with features like dynamic theme loading, persistence, and SSR compatibility.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
  - [React](#react-usage)
  - [Vanilla JavaScript](#vanilla-javascript-usage)
- [API Reference](#api-reference)
  - [ThemeManager](#thememanager-class)
  - [ThemeProvider](#themeprovider-component)
  - [useTheme Hook](#usetheme-hook)
- [Advanced Usage](#advanced-usage)
- [Migration Guide](#migration-guide)
- [Troubleshooting](#troubleshooting)

---

## Installation

The theme manager is included in the `@shohojdhara/atomix` package:

```bash
npm install @shohojdhara/atomix
```

---

## Quick Start

### React Usage

#### 1. Wrap your app with ThemeProvider

```tsx
import { ThemeProvider } from '@shohojdhara/atomix/theme';
import { themesConfig } from '@shohojdhara/atomix/themes/config';

function App() {
  return (
    <ThemeProvider
      themes={themesConfig.metadata}
      defaultTheme="shaj-default"
      enablePersistence={true}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

#### 2. Use the useTheme hook in your components

```tsx
import { useTheme } from '@shohojdhara/atomix/theme';

function ThemeSwitcher() {
  const { theme, setTheme, availableThemes, isLoading } = useTheme();

  return (
    <div>
      <h3>Current Theme: {theme}</h3>
      <select 
        value={theme} 
        onChange={(e) => setTheme(e.target.value)}
        disabled={isLoading}
      >
        {availableThemes.map((t) => (
          <option key={t.class} value={t.class}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

---

### Vanilla JavaScript Usage

```javascript
import { ThemeManager } from '@shohojdhara/atomix/theme';
import { themesConfig } from '@shohojdhara/atomix/themes/config';

// Initialize theme manager
const themeManager = new ThemeManager({
  themes: themesConfig.metadata,
  defaultTheme: 'shaj-default',
  basePath: '/themes',
  enablePersistence: true,
});

// Set theme
await themeManager.setTheme('flashtrade');

// Get current theme
const currentTheme = themeManager.getTheme();

// Listen for theme changes
themeManager.on('themeChange', (event) => {
  console.log('Theme changed:', event.currentTheme);
});

// Get available themes
const themes = themeManager.getAvailableThemes();
```

---

## API Reference

### ThemeManager Class

The core theme management class for vanilla JavaScript applications.

#### Constructor

```typescript
new ThemeManager(config: ThemeManagerConfig)
```

**Parameters:**

- `config.themes` (required): Object containing theme metadata
- `config.defaultTheme`: Default theme name (defaults to first theme)
- `config.basePath`: Base path for theme CSS files (default: `/themes`)
- `config.cdnPath`: Optional CDN path for theme files
- `config.preload`: Array of theme names to preload
- `config.lazy`: Enable lazy loading (default: `true`)
- `config.storageKey`: localStorage key (default: `atomix-theme`)
- `config.dataAttribute`: Data attribute name (default: `data-theme`)
- `config.enablePersistence`: Enable localStorage persistence (default: `true`)
- `config.useMinified`: Use minified CSS files (default: `false`)
- `config.onThemeChange`: Callback when theme changes
- `config.onError`: Callback when error occurs

#### Methods

##### `setTheme(themeName: string, options?: ThemeLoadOptions): Promise<void>`

Set the current theme.

```javascript
await themeManager.setTheme('flashtrade');

// With options
await themeManager.setTheme('flashtrade', {
  force: true,  // Force reload even if already loaded
  removePrevious: true,  // Remove previous theme CSS
  fallbackOnError: true,  // Fallback to default theme on error
});
```

**Options:**
- `force` (boolean): Force reload even if theme is already loaded
- `removePrevious` (boolean): Remove previous theme CSS from DOM
- `fallbackOnError` (boolean): Automatically fallback to default theme if loading fails

##### `getTheme(): string`

Get the current theme name.

```javascript
const currentTheme = themeManager.getTheme();
```

##### `getAvailableThemes(): ThemeMetadata[]`

Get all available themes.

```javascript
const themes = themeManager.getAvailableThemes();
themes.forEach(theme => {
  console.log(theme.name, theme.description);
});
```

##### `getThemeMetadata(themeName: string): ThemeMetadata | null`

Get metadata for a specific theme.

```javascript
const metadata = themeManager.getThemeMetadata('flashtrade');
console.log(metadata.description);
```

##### `isThemeLoaded(themeName: string): boolean`

Check if a theme is currently loaded.

```javascript
if (themeManager.isThemeLoaded('flashtrade')) {
  console.log('Theme is loaded');
}
```

##### `validateTheme(themeName: string): boolean`

Validate a theme name.

```javascript
if (themeManager.validateTheme('flashtrade')) {
  await themeManager.setTheme('flashtrade');
}
```

##### `preloadTheme(themeName: string): Promise<void>`

Preload a theme without applying it.

```javascript
// Preload for faster switching later
await themeManager.preloadTheme('flashtrade');
```

##### `enablePersistence(storageKey?: string): void`

Enable theme persistence.

```javascript
themeManager.enablePersistence('my-app-theme');
```

##### `disablePersistence(): void`

Disable theme persistence.

```javascript
themeManager.disablePersistence();
```

##### `clearThemes(): void`

Clear all loaded themes from the DOM.

```javascript
themeManager.clearThemes();
```

##### `on(event: string, callback: Function): void`

Add event listener.

```javascript
themeManager.on('themeChange', (event) => {
  console.log('Previous:', event.previousTheme);
  console.log('Current:', event.currentTheme);
});

themeManager.on('themeLoad', (themeName) => {
  console.log('Theme loaded:', themeName);
});

themeManager.on('themeError', (error, themeName) => {
  console.error('Failed to load theme:', themeName, error);
});
```

##### `off(event: string, callback: Function): void`

Remove event listener.

```javascript
const handler = (event) => console.log(event);
themeManager.on('themeChange', handler);
themeManager.off('themeChange', handler);
```

##### `destroy(): void`

Destroy the theme manager and clean up.

```javascript
themeManager.destroy();
```

---

### ThemeProvider Component

React context provider for theme management.

#### Props

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  themes?: Record<string, ThemeMetadata>;
  basePath?: string;
  cdnPath?: string | null;
  preload?: string[];
  lazy?: boolean;
  storageKey?: string;
  dataAttribute?: string;
  enablePersistence?: boolean;
  useMinified?: boolean;
  onThemeChange?: (theme: string) => void;
  onError?: (error: Error, themeName: string) => void;
}
```

#### Example

```tsx
import { ThemeProvider } from '@shohojdhara/atomix/theme';
import { themesConfig } from '@shohojdhara/atomix/themes/config';

function App() {
  return (
    <ThemeProvider
      themes={themesConfig.metadata}
      defaultTheme="shaj-default"
      basePath="/themes"
      enablePersistence={true}
      preload={['shaj-default', 'flashtrade']}
      onThemeChange={(theme) => console.log('Theme changed to:', theme)}
      onError={(error, theme) => console.error('Error loading theme:', theme, error)}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

---

### useTheme Hook

React hook for accessing theme context.

#### Return Value

```typescript
interface UseThemeReturn {
  theme: string;
  setTheme: (theme: string, options?: ThemeLoadOptions) => Promise<void>;
  availableThemes: ThemeMetadata[];
  isLoading: boolean;
  error: Error | null;
  isThemeLoaded: (themeName: string) => boolean;
  preloadTheme: (themeName: string) => Promise<void>;
}
```

#### Example

```tsx
import { useTheme } from '@shohojdhara/atomix/theme';

function ThemeSwitcher() {
  const { 
    theme, 
    setTheme, 
    availableThemes, 
    isLoading, 
    error 
  } = useTheme();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <select 
        value={theme} 
        onChange={(e) => setTheme(e.target.value, { fallbackOnError: true })}
        disabled={isLoading}
      >
        {availableThemes.map((t) => (
          <option key={t.class} value={t.class}>
            {t.name}
          </option>
        ))}
      </select>
      {isLoading && <span>Loading...</span>}
    </div>
  );
}
```

---

## Advanced Usage

### Preloading Themes

Preload themes for faster switching:

```javascript
// Vanilla JS
await themeManager.preloadTheme('flashtrade');
await themeManager.preloadTheme('applemix');

// React
const { preloadTheme } = useTheme();
await preloadTheme('flashtrade');
```

### Using with Next.js

```tsx
// app/layout.tsx
import { ThemeProvider } from '@shohojdhara/atomix/theme';
import { themesConfig } from '@shohojdhara/atomix/themes/config';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider
          themes={themesConfig.metadata}
          defaultTheme="shaj-default"
          basePath="/themes"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Custom Storage

Implement custom storage adapter:

```javascript
const customStorage = {
  getItem: (key) => {
    // Your custom get logic
    return sessionStorage.getItem(key);
  },
  setItem: (key, value) => {
    // Your custom set logic
    sessionStorage.setItem(key, value);
  },
  removeItem: (key) => {
    sessionStorage.removeItem(key);
  },
  isAvailable: () => {
    return typeof sessionStorage !== 'undefined';
  },
};
```

### CDN Usage

Load themes from a CDN:

```javascript
const themeManager = new ThemeManager({
  themes: themesConfig.metadata,
  cdnPath: 'https://cdn.example.com/atomix/themes',
  basePath: '/themes', // Fallback
});
```

### Integration with ColorModeToggle

```tsx
import { useTheme } from '@shohojdhara/atomix/theme';
import { ColorModeToggle } from '@shohojdhara/atomix';

function ThemeControls() {
  const { theme, setTheme, availableThemes } = useTheme();

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {availableThemes.map((t) => (
          <option key={t.class} value={t.class}>{t.name}</option>
        ))}
      </select>
      <ColorModeToggle />
    </div>
  );
}
```

---

## Migration Guide

### From Storybook Theme Switcher

If you were using the Storybook theme switcher, here's how to migrate:

**Before:**
```tsx
// Storybook only
const theme = context.globals?.theme;
```

**After:**
```tsx
import { useTheme } from '@shohojdhara/atomix/theme';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  // Use theme in your component
}
```

### From Manual CSS Loading

**Before:**
```javascript
const link = document.createElement('link');
link.href = `/themes/${themeName}.css`;
document.head.appendChild(link);
```

**After:**
```javascript
import { ThemeManager } from '@shohojdhara/atomix/theme';

const themeManager = new ThemeManager({
  themes: themesConfig.metadata,
});

await themeManager.setTheme(themeName);
```

---

## Troubleshooting

### Theme not loading

**Problem:** Theme CSS is not loading.

**Solution:**
1. Check that theme CSS files are in the correct directory (default: `/public/themes/`)
2. Verify the `basePath` configuration matches your directory structure
3. Check browser console for 404 errors
4. Ensure theme name matches the CSS filename

```javascript
// Correct configuration
const themeManager = new ThemeManager({
  themes: themesConfig.metadata,
  basePath: '/themes', // Should match your public directory
});
```

### useTheme hook error

**Problem:** `useTheme must be used within a ThemeProvider`

**Solution:** Wrap your component tree with `ThemeProvider`:

```tsx
// ❌ Wrong
function App() {
  const { theme } = useTheme(); // Error!
  return <div>{theme}</div>;
}

// ✅ Correct
function App() {
  return (
    <ThemeProvider themes={themesConfig.metadata}>
      <MyComponent />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { theme } = useTheme(); // Works!
  return <div>{theme}</div>;
}
```

### Theme not persisting

**Problem:** Theme resets on page reload.

**Solution:**
1. Ensure `enablePersistence` is `true`
2. Check that localStorage is available
3. Verify no browser extensions are blocking localStorage

```javascript
const themeManager = new ThemeManager({
  themes: themesConfig.metadata,
  enablePersistence: true, // Enable persistence
});
```

### SSR issues

**Problem:** Errors during server-side rendering.

**Solution:** The theme manager is SSR-safe and will not execute browser-specific code on the server. However, you may see a flash of unstyled content (FOUC).

To prevent FOUC, set the theme attribute in your HTML:

```html
<html data-theme="shaj-default">
  <!-- Your app -->
</html>
```

Or use a script in your HTML head:

```html
<script>
  const theme = localStorage.getItem('atomix-theme') || 'shaj-default';
  document.documentElement.setAttribute('data-theme', theme);
</script>
```

### TypeScript errors

**Problem:** TypeScript errors when importing theme utilities.

**Solution:** Ensure you're importing from the correct path:

```typescript
// ✅ Correct
import { ThemeManager, useTheme } from '@shohojdhara/atomix/theme';
import { themesConfig } from '@shohojdhara/atomix/themes/config';

// ❌ Wrong
import { ThemeManager } from '@shohojdhara/atomix';
```

---

---

## Browser Support

The Theme Manager relies on standard web technologies and supports all modern browsers.

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 11+ | Full support |
| Edge | 79+ | Full support |
| iOS Safari | 11+ | Full support |
| Android Chrome | 60+ | Full support |

**Requirements:**
- `localStorage` (for persistence)
- `Promise` API
- `DOM` API (`document.createElement`, `document.head`, etc.)

---

## FAQ

**Q: Can I use multiple themes at once?**

A: No, only one theme can be active at a time. However, you can preload multiple themes for faster switching.

**Q: How do I create a custom theme?**

A: See the [Theme Creation Guide](../themes/README.md) for detailed instructions on creating custom themes.

**Q: Does the theme manager work with vanilla CSS?**

A: Yes! The theme manager loads CSS files dynamically and works with any CSS framework or vanilla CSS.

**Q: Can I use the theme manager without React?**

A: Yes! Use the `ThemeManager` class directly in vanilla JavaScript applications.

**Q: How do I change the theme programmatically?**

A: Use `setTheme()` method:

```javascript
// Vanilla JS
await themeManager.setTheme('flashtrade');

// React
const { setTheme } = useTheme();
await setTheme('flashtrade');
```

**Q: Can I customize the data attribute name?**

A: Yes, use the `dataAttribute` option:

```javascript
const themeManager = new ThemeManager({
  themes: themesConfig.metadata,
  dataAttribute: 'data-my-theme',
});
```

---

## Support

For issues, questions, or contributions, please visit:
- [GitHub Issues](https://github.com/Shohojdhara/atomix/issues)
- [Documentation](https://github.com/Shohojdhara/atomix#readme)
