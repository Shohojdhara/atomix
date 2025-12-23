# Theme System - Getting Started

**Quick start guide for external developers using Atomix themes**

---

## Quick Start (5 Minutes)

The Atomix theme system lets you customize colors, typography, spacing, and more using a simple JavaScript API. No configuration files needed!

### Basic Example

```tsx
import { createTheme, ThemeProvider } from '@shohojdhara/atomix/theme';

// Create your custom theme
const myTheme = createTheme({
  name: 'My Brand Theme',
  palette: {
    primary: { main: '#7AFFD7' },
    secondary: { main: '#FF5733' },
  },
});

// Use it in your app
function App() {
  return (
    <ThemeProvider defaultTheme={myTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

That's it! Your entire app now uses your custom theme.

---

## Installation

```bash
npm install @shohojdhara/atomix
```

---

## Basic Usage

### 1. Create a Theme

```tsx
import { createTheme } from '@shohojdhara/atomix/theme';

const theme = createTheme({
  name: 'My Theme',
  palette: {
    primary: { main: '#7AFFD7' },
    secondary: { main: '#FF5733' },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
  },
  spacing: 8, // Base unit: 8px
});
```

### 2. Quick Theme Helper

For even faster setup, use the `quickTheme` helper:

```tsx
import { quickTheme } from '@shohojdhara/atomix/theme';

// Create a theme from just brand colors
const theme = quickTheme('My Brand', '#7AFFD7', '#FF5733');
```

---

## React Integration

### Using ThemeProvider

Wrap your app with `ThemeProvider` to make the theme available everywhere:

```tsx
import { ThemeProvider } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider defaultTheme={myTheme}>
      <Header />
      <MainContent />
      <Footer />
    </ThemeProvider>
  );
}
```

### Using the Theme Hook

Access theme values in any component:

```tsx
import { useTheme } from '@shohojdhara/atomix/theme';

function MyComponent() {
  const { activeTheme, setTheme } = useTheme();

  return (
    <div style={{
      color: activeTheme?.palette.primary.main,
      padding: activeTheme?.spacing(2), // 16px
    }}>
      Themed content
    </div>
  );
}
```

### Theme Switching

```tsx
import { useTheme } from '@shohojdhara/atomix/theme';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(darkTheme)}>
      Switch to Dark Mode
    </button>
  );
}
```

---

## Using CSS Variables

All themes automatically generate CSS variables that you can use in your styles:

### In CSS/SCSS

```css
.my-component {
  color: var(--atomix-primary);
  background: var(--atomix-background-paper);
  padding: var(--atomix-spacing-4);
  border-radius: var(--atomix-border-radius-md);
}
```

### In Inline Styles

```tsx
<div style={{
  color: 'var(--atomix-primary)',
  padding: 'var(--atomix-spacing-4)',
}}>
  Themed content
</div>
```

### Available CSS Variables

- **Colors:** `--atomix-primary`, `--atomix-secondary`, `--atomix-background-default`, `--atomix-text-primary`
- **Spacing:** `--atomix-spacing-1` through `--atomix-spacing-8`
- **Typography:** `--atomix-font-family`, `--atomix-font-size-md`
- **Border Radius:** `--atomix-border-radius-sm`, `--atomix-border-radius-md`, `--atomix-border-radius-lg`

---

## Customizing Design Tokens via Config

You can customize design tokens at build time using `atomix.config.ts`:

### 1. Create Configuration File

Create `atomix.config.ts` in your project root:

```typescript
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  prefix: 'atomix', // Optional: customize CSS variable prefix
  
  theme: {
    extend: {
      // Customize colors - generates full color scales automatically
      colors: {
        primary: { main: '#7AFFD7' }, // Generates primary-1 through primary-10
        secondary: { main: '#FF5733' },
      },
      
      // Customize typography
      typography: {
        fontFamilies: {
          sans: ['Inter', 'sans-serif'],
        },
        fontSizes: {
          '2xl': '1.5rem',
        },
      },
      
      // Customize spacing
      spacing: {
        '18': '4.5rem',
      },
    },
  },
});
```

### 2. Generate Tokens

Run the sync script to generate CSS custom properties:

```bash
npm run sync:config
```

This generates `src/styles/03-generic/_generated-root.css` with all your custom tokens, including:
- Full color scales (1-10 steps) from a single color
- RGB variants for transparency support
- Semantic tokens (text-emphasis, bg-subtle, border-subtle, hover)
- Typography, spacing, and border-radius tokens

### 3. Import Generated Tokens

Import the generated CSS in your project:

```tsx
// In your main entry file
import '@shohojdhara/atomix/styles/03-generic/_generated-root.css';
```

Or if you're using the Atomix SCSS source:

```scss
// In your main SCSS file
@import '@shohojdhara/atomix/scss/generic';
```

**Note:** Token customization via config is a build-time feature. For runtime theme customization, use `createTheme()` instead.

---

## Common Use Cases

### 1. Brand Colors

Apply your brand colors to all Atomix components:

```tsx
const brandTheme = createTheme({
  name: 'Brand Theme',
  palette: {
    primary: { main: '#YOUR_BRAND_COLOR' },
    secondary: { main: '#YOUR_SECONDARY_COLOR' },
  },
});
```

### 2. Dark Mode

Create a dark theme variant:

```tsx
import { createTheme, createDarkVariant } from '@shohojdhara/atomix/theme';

const lightTheme = createTheme({
  name: 'Light',
  palette: {
    primary: { main: '#3b82f6' },
    background: { default: '#ffffff' },
    text: { primary: '#111827' },
  },
});

// Automatically create dark variant
const darkTheme = createDarkVariant(lightTheme);

// Or create manually
const darkTheme = createTheme({
  name: 'Dark',
  palette: {
    primary: { main: '#60a5fa' },
    background: { default: '#111827' },
    text: { primary: '#f9fafb' },
  },
});
```

### 3. Custom Typography

Use your brand font:

```tsx
const theme = createTheme({
  typography: {
    fontFamily: '"Your Font", sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
  },
});
```

### 4. Multiple Themes

Let users choose between themes:

```tsx
const themes = {
  light: lightTheme,
  dark: darkTheme,
  brand: brandTheme,
};

function App() {
  return (
    <ThemeProvider themes={themes} defaultTheme="light">
      <ThemeSwitcher />
      <YourApp />
    </ThemeProvider>
  );
}
```

---

## Next Steps

### Learn More

- **[Theme System Guide](../THEME_SYSTEM.md)** - Complete theme system documentation
- **[Theme System Reference](../THEME_SYSTEM.md)** - Complete API documentation
- **[Theme System Guide](../THEME_SYSTEM.md)** - Complete guide including API reference

### Examples

- **[Next.js Integration](../../examples/nextjs-theme-usage.tsx)** - Complete Next.js example
- **[Theme System Test](../../examples/theme-system-test.tsx)** - Basic usage examples
- **[Enhanced Features](../../examples/theme-system-enhanced.tsx)** - Advanced features

### Advanced Features

- **RTL Support** - Right-to-left language support
- **Theme Validation** - Validate theme structure
- **Theme Export/Import** - Save and load themes
- **CSS Variable Generation** - Generate custom CSS variables

---

## Troubleshooting

### Theme Not Applying

Make sure `ThemeProvider` wraps your entire app:

```tsx
// ✅ Correct
<ThemeProvider defaultTheme={theme}>
  <App />
</ThemeProvider>

// ❌ Wrong - ThemeProvider inside App
<App>
  <ThemeProvider defaultTheme={theme}>
    <Content />
  </ThemeProvider>
</App>
```

### CSS Variables Not Working

Ensure the theme is a JavaScript theme object, not just metadata:

```tsx
// ✅ Correct - JavaScript theme
const theme = createTheme({ palette: {...} });
<ThemeProvider defaultTheme={theme}>

// ❌ Wrong - Just metadata
<ThemeProvider defaultTheme="theme-name">
```

### TypeScript Errors

Import types correctly:

```tsx
import type { Theme } from '@shohojdhara/atomix/theme';

const theme: Theme = createTheme({...});
```

---

## Summary

1. **Install:** `npm install @shohojdhara/atomix`
2. **Create theme:** `const theme = createTheme({ palette: {...} })`
3. **Wrap app:** `<ThemeProvider defaultTheme={theme}>`
4. **Use CSS variables:** `var(--atomix-primary)`

No configuration files needed, no build steps, just simple JavaScript!

---

**Need help?** Check the [Theme System Guide](../THEME_SYSTEM.md) or [examples](../../examples/).

