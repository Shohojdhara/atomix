# Theme Switching Guide

Complete guide to implementing dark/light mode switching in your Atomix-powered application.

---

## Table of Contents

- [Quick Start](#quick-start)
- [ThemeToggle Component](#themetoggle-component)
- [useThemeSwitcher Hook](#usethemeswitcher-hook)
- [Utility Functions](#utility-functions)
- [Color Utilities](#color-utilities)
- [Advanced Patterns](#advanced-patterns)
- [Framework Integration](#framework-integration)

---

## Quick Start

The fastest way to add theme switching:

```tsx
import { ThemeToggle } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle /> {/* That's it! */}
    </header>
  );
}
```

This gives you:
- ✅ Automatic theme persistence
- ✅ System preference detection
- ✅ Smooth transitions
- ✅ Accessible button
- ✅ No configuration needed

---

## ThemeToggle Component

A pre-built, customizable toggle button with three variants.

### Basic Usage

```tsx
import { ThemeToggle } from '@shohojdhara/atomix/theme';

// Icon only (default)
<ThemeToggle />

// Button with text
<ThemeToggle variant="button" showLabel />

// Switch/toggle style
<ThemeToggle variant="switch" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'icon' \| 'button' \| 'switch'` | `'icon'` | Toggle appearance |
| `showLabel` | `boolean` | `false` | Show text label (button variant) |
| `lightLabel` | `string` | `'Light'` | Label for light mode |
| `darkLabel` | `string` | `'Dark'` | Label for dark mode |
| `iconSize` | `number` | `20` | Icon size in pixels |
| `className` | `string` | `''` | Custom CSS class |
| `ariaLabel` | `string` | `'Toggle theme'` | Accessibility label |
| `storageKey` | `string` | `'atomix-theme'` | localStorage key |
| `enableTransition` | `boolean` | `true` | Smooth transitions |
| `transitionDuration` | `number` | `300` | Transition duration (ms) |
| `render` | `function` | - | Custom render function |

### Examples

#### Icon Variant

```tsx
<ThemeToggle 
  variant="icon"
  iconSize={24}
  className="my-custom-class"
/>
```

#### Button Variant

```tsx
<ThemeToggle
  variant="button"
  showLabel={true}
  lightLabel="☀️ Light Mode"
  darkLabel="🌙 Dark Mode"
/>
```

#### Switch Variant

```tsx
<ThemeToggle variant="switch" />
```

#### Custom Render

```tsx
<ThemeToggle
  render={({ isDark, toggle }) => (
    <button onClick={toggle}>
      {isDark ? '🌙' : '☀️'}
    </button>
  )}
/>
```

---

## useThemeSwitcher Hook

React hook for full control over theme switching.

### Basic Usage

```tsx
import { useThemeSwitcher } from '@shohojdhara/atomix/theme';

function MyComponent() {
  const { mode, isDark, toggle, setMode } = useThemeSwitcher();
  
  return (
    <div>
      <p>Current: {mode}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setMode('light')}>Light</button>
      <button onClick={() => setMode('dark')}>Dark</button>
    </div>
  );
}
```

### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `mode` | `'light' \| 'dark'` | Current theme mode |
| `isDark` | `boolean` | Whether theme is dark |
| `isLight` | `boolean` | Whether theme is light |
| `toggle` | `() => void` | Toggle between themes |
| `setMode` | `(mode) => void` | Set specific theme |
| `resetToSystem` | `() => void` | Reset to system preference |
| `clearPreference` | `() => void` | Clear saved preference |

### Options

```tsx
const { mode, toggle } = useThemeSwitcher({
  initialMode: 'system',        // Initial theme ('light', 'dark', 'system')
  syncWithSystem: false,        // Auto-sync with OS changes
  storageKey: 'atomix-theme',   // localStorage key
  enableTransition: true,       // Smooth transitions
  transitionDuration: 300,      // Duration in ms
});
```

### Examples

#### Sync with System Preference

```tsx
const { mode } = useThemeSwitcher({
  syncWithSystem: true, // Updates when OS theme changes
});
```

#### Custom Storage Key

```tsx
const { mode } = useThemeSwitcher({
  storageKey: 'myapp-theme-preference',
});
```

#### No Transitions

```tsx
const { toggle } = useThemeSwitcher({
  enableTransition: false,
});
```

---

## Utility Functions

Direct functions for imperative theme control.

### switchTheme

Switch to a specific theme mode.

```tsx
import { switchTheme } from '@shohojdhara/atomix/theme';

// Switch to dark mode
switchTheme('dark');

// Switch to light mode
switchTheme('light');

// Use system preference
switchTheme('system');

// With options
switchTheme('dark', {
  storageKey: 'my-theme',
  enableTransition: true,
  transitionDuration: 500,
});
```

### toggleTheme

Toggle between light and dark.

```tsx
import { toggleTheme } from '@shohojdhara/atomix/theme';

const newMode = toggleTheme();
console.log('Switched to:', newMode); // 'light' or 'dark'
```

### getCurrentTheme

Get the current saved theme.

```tsx
import { getCurrentTheme } from '@shohojdhara/atomix/theme';

const theme = getCurrentTheme(); // 'light', 'dark', or 'system'
```

### getSystemTheme

Detect OS theme preference.

```tsx
import { getSystemTheme } from '@shohojdhara/atomix/theme';

const systemTheme = getSystemTheme(); // 'light' or 'dark'
```

### initializeTheme

Initialize theme at app startup (call once).

```tsx
import { initializeTheme } from '@shohojdhara/atomix/theme';

// In your app entry point
initializeTheme({
  storageKey: 'myapp-theme',
  enableTransition: true,
});
```

### listenToSystemTheme

Listen for OS theme changes.

```tsx
import { listenToSystemTheme } from '@shohojdhara/atomix/theme';

// In useEffect or on mount
const cleanup = listenToSystemTheme((mode) => {
  console.log('System changed to:', mode);
  switchTheme(mode);
});

// Clean up on unmount
cleanup();
```

### persistTheme

Manually save theme preference.

```tsx
import { persistTheme } from '@shohojdhara/atomix/theme';

persistTheme('dark', {
  storageKey: 'my-theme',
  storageType: 'localStorage', // or 'sessionStorage'
});
```

### clearThemePreference

Remove saved preference.

```tsx
import { clearThemePreference } from '@shohojdhara/atomix/theme';

clearThemePreference();
```

---

## Color Utilities

Helper functions for color manipulation and accessibility.

### hexToRgb

Convert hex to RGB.

```tsx
import { hexToRgb } from '@shohojdhara/atomix/theme';

const rgb = hexToRgb('#3b82f6');
// { r: 59, g: 130, b: 246 }
```

### rgbToHex

Convert RGB to hex.

```tsx
import { rgbToHex } from '@shohojdhara/atomix/theme';

const hex = rgbToHex(59, 130, 246);
// '#3b82f6'
```

### getLuminance

Calculate color luminance (0-1).

```tsx
import { getLuminance } from '@shohojdhara/atomix/theme';

const lum = getLuminance('#ffffff'); // 1 (white)
const lum2 = getLuminance('#000000'); // 0 (black)
```

### getContrastRatio

Calculate contrast ratio between two colors.

```tsx
import { getContrastRatio } from '@shohojdhara/atomix/theme';

const ratio = getContrastRatio('#ffffff', '#000000'); // 21 (max)
```

### isAccessible

Check if colors meet WCAG AA standards.

```tsx
import { isAccessible } from '@shohojdhara/atomix/theme';

const passes = isAccessible('#ffffff', '#3b82f6', 'small');
// true or false
```

### getContrastText

Get appropriate text color (black or white) for a background.

```tsx
import { getContrastText } from '@shohojdhara/atomix/theme';

const textColor = getContrastText('#3b82f6'); // '#ffffff'
const textColor2 = getContrastText('#ffffff'); // '#000000'
```

### lighten

Lighten a color by percentage.

```tsx
import { lighten } from '@shohojdhara/atomix/theme';

const lighter = lighten('#3b82f6', 20); // 20% lighter
```

### darken

Darken a color by percentage.

```tsx
import { darken } from '@shohojdhara/atomix/theme';

const darker = darken('#3b82f6', 20); // 20% darker
```

---

## Advanced Patterns

### Pattern 1: Theme Provider Wrapper

Create a wrapper that handles initialization:

```tsx
import { initializeTheme, listenToSystemTheme } from '@shohojdhara/atomix/theme';

function ThemeProvider({ children }) {
  React.useEffect(() => {
    initializeTheme();
    
    const cleanup = listenToSystemTheme((mode) => {
      const saved = getCurrentTheme();
      if (!saved || saved === 'system') {
        switchTheme(mode);
      }
    });
    
    return cleanup;
  }, []);
  
  return <>{children}</>;
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <YourComponents />
    </ThemeProvider>
  );
}
```

### Pattern 2: Conditional Styling

Apply different styles based on theme:

```tsx
import { useThemeSwitcher } from '@shohojdhara/atomix/theme';

function Card() {
  const { isDark } = useThemeSwitcher();
  
  return (
    <div style={{
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f9fafb' : '#111827',
      border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
    }}>
      Themed card
    </div>
  );
}
```

### Pattern 3: CSS Variables

Use CSS variables that automatically update:

```css
/* Your CSS file */
.card {
  background-color: var(--atomix-background-paper);
  color: var(--atomix-text-primary);
  border: 1px solid var(--atomix-border);
  transition: all 0.3s ease-in-out; /* Smooth theme transitions */
}
```

### Pattern 4: Theme-Aware Components

Create components that respond to theme:

```tsx
import { useThemeSwitcher } from '@shohojdhara/atomix/theme';

function ThemedButton({ children }) {
  const { isDark } = useThemeSwitcher();
  
  return (
    <button style={{
      backgroundColor: isDark ? '#3b82f6' : '#2563eb',
      color: '#ffffff',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
    }}>
      {children}
    </button>
  );
}
```

---

## Framework Integration

### Next.js

```tsx
// pages/_app.tsx
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { initializeTheme } from '@shohojdhara/atomix/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeTheme();
  }, []);

  return <Component {...pageProps} />;
}
```

Then use anywhere:

```tsx
import { ThemeToggle } from '@shohojdhara/atomix/theme';

export default function Header() {
  return (
    <header>
      <h1>Next.js App</h1>
      <ThemeToggle />
    </header>
  );
}
```

### Gatsby

```javascript
// gatsby-browser.js
import { initializeTheme } from '@shohojdhara/atomix/theme';

export const onInitialClientRender = () => {
  initializeTheme();
};
```

### Remix

```tsx
// app/root.tsx
import { useEffect } from 'react';
import { initializeTheme } from '@shohojdhara/atomix/theme';

export default function App() {
  useEffect(() => {
    initializeTheme();
  }, []);
  
  return (
    <html>
      <body>
        <Outlet />
      </body>
    </html>
  );
}
```

### Astro

```astro
---
// src/layouts/Layout.astro
import { ThemeToggle } from '@shohojdhara/atomix/theme';
---

<html>
  <head>
    <script>
      import { initializeTheme } from '@shohojdhara/atomix/theme';
      initializeTheme();
    </script>
  </head>
  <body>
    <ThemeToggle client:load />
    <slot />
  </body>
</html>
```

### Vue/Nuxt

```typescript
// plugins/theme.client.ts
import { initializeTheme } from '@shohojdhara/atomix/theme';

export default defineNuxtPlugin(() => {
  initializeTheme();
});
```

### Svelte/SvelteKit

```typescript
// src/hooks.server.ts
import { initializeTheme } from '@shohojdhara/atomix/theme';

export async function handle({ event, resolve }) {
  const response = await resolve(event);
  return response;
}

// In +layout.svelte
onMount(() => {
  initializeTheme();
});
```

---

## Troubleshooting

### Issue: Theme doesn't persist

**Solution:** Check localStorage is enabled and storage key matches.

```tsx
// Verify storage
console.log(localStorage.getItem('atomix-theme'));

// Use custom key consistently
useThemeSwitcher({ storageKey: 'my-theme' });
```

### Issue: No smooth transition

**Solution:** Enable transitions and ensure CSS has transition property.

```tsx
useThemeSwitcher({
  enableTransition: true,
  transitionDuration: 300,
});
```

```css
/* Ensure elements have transition */
* {
  transition: background-color 0.3s, color 0.3s;
}
```

### Issue: System preference not detected

**Solution:** Call `getSystemTheme()` after component mounts.

```tsx
useEffect(() => {
  const system = getSystemTheme();
  console.log('System theme:', system);
}, []);
```

### Issue: Theme flickers on load

**Solution:** Initialize theme as early as possible.

```tsx
// In index.html head
<script>
  (function() {
    const theme = localStorage.getItem('atomix-theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('atomix-theme-dark');
    }
  })();
</script>
```

---

## Best Practices

1. **Initialize Early**: Call `initializeTheme()` at app startup
2. **Consistent Storage Key**: Use the same `storageKey` everywhere
3. **Enable Transitions**: Provides better UX
4. **Test Accessibility**: Use `isAccessible()` to verify color combinations
5. **Respect User Choice**: Don't override manual selection with system changes
6. **Provide Toggle**: Always give users a way to switch themes
7. **Document Theme**: Let users know theme preference is saved

---

## Resources

- **Examples:** See [examples/theme-switching-examples.tsx](../examples/theme-switching-examples.tsx)
- **Config Guide:** [CONFIG_BEST_PRACTICES.md](../CONFIG_BEST_PRACTICES.md)
- **Quick Reference:** [CONFIG_QUICK_REFERENCE.md](../CONFIG_QUICK_REFERENCE.md)

---

*Last updated: April 7, 2026*  
*Version: 0.5.2*
