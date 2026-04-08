# Atomix Configuration Examples

This directory contains example `atomix.config.ts` files for different use cases.

## 📁 Available Examples

### 1. [minimal.config.ts](./minimal.config.ts) ⭐ **Start Here**
The simplest possible configuration - just sets a custom prefix.

**Use when:** You only need to customize CSS variable names.

**Features:**
- Custom prefix (`myapp`)
- All other settings use defaults

```typescript
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  prefix: 'myapp',
});
```

---

### 2. [standard.config.ts](./standard.config.ts) 🎯 **Recommended**
A typical configuration for most projects. Customizes brand colors, typography, and spacing.

**Use when:** Building a standard web application with custom branding.

**Features:**
- ✅ Brand color palette (primary, secondary, semantic colors)
- ✅ Custom typography (fonts, sizes, weights)
- ✅ Spacing scale
- ✅ Border radius values
- ✅ Box shadows
- ✅ Z-index hierarchy
- ✅ Transition settings

```typescript
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  prefix: 'brand',
  theme: {
    extend: {
      colors: {
        primary: { main: '#6366f1' },
        secondary: { main: '#ec4899' },
      },
      typography: { /* ... */ },
      spacing: { /* ... */ },
    },
  },
});
```

---

### 3. [advanced.config.ts](./advanced.config.ts) 🚀 **Enterprise**
Comprehensive configuration with all features including AI, Figma sync, and telemetry.

**Use when:** Building enterprise applications or need full control over all features.

**Features:**
- ✅ Everything in standard config
- ✅ Full color scales (1-10)
- ✅ Complete typography system (letter-spacing, etc.)
- ✅ Detailed spacing scale (0-96)
- ✅ Responsive breakpoints
- ✅ AI-assisted scaffolding setup
- ✅ Figma token synchronization
- ✅ Telemetry configuration
- ✅ CLI generator defaults
- ✅ Plugin system (future)

```typescript
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  prefix: 'enterprise',
  theme: { /* extensive customization */ },
  ai: { /* AI configuration */ },
  tokenEngine: { /* Figma sync */ },
  telemetry: { /* usage tracking */ },
  generator: { /* CLI defaults */ },
});
```

---

### 4. [browser-only.config.ts](./browser-only.config.ts) ⚠️ **Special Case**
Shows workarounds for browser-only environments where config loading isn't available.

**Use when:** 
- Pure client-side apps (no SSR)
- Online editors (CodePen, JSFiddle)
- Static HTML pages
- Browser extensions

**Important:** This is NOT a config file - it's an example of how to use Atomix without one!

```typescript
// Instead of atomix.config.ts, provide tokens directly:
import { createTheme } from '@shohojdhara/atomix/theme';

const css = createTheme({
  '--brand-primary': '#6366f1',
  '--brand-spacing-4': '1rem',
});
```

---

## 🚀 Quick Start

### Step 1: Choose an Example
Pick the example that best matches your needs:
- **Simple project?** → Use `minimal.config.ts`
- **Standard app?** → Use `standard.config.ts` (recommended)
- **Enterprise?** → Use `advanced.config.ts`
- **Browser-only?** → See `browser-only.config.ts`

### Step 2: Copy to Your Project
```bash
# Copy the example to your project root
cp examples/config-examples/standard.config.ts ./atomix.config.ts
```

### Step 3: Customize
Edit the copied file with your brand values:
```typescript
// Change these to match your brand
colors: {
  primary: { main: '#YOUR_COLOR' },
}
```

### Step 4: Use in Your App
```typescript
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

const css = createTheme(); // Auto-loads from atomix.config.ts
injectTheme(css);
```

---

## 📖 Understanding the Examples

### Config File Structure

All examples follow this structure:

```typescript
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  // 1. Basic Settings
  prefix: 'your-prefix',
  
  // 2. Theme Customization
  theme: {
    extend: { /* your overrides */ }
  },
  
  // 3. Advanced Features (optional)
  ai: { /* ... */ },
  tokenEngine: { /* ... */ },
  telemetry: { /* ... */ },
  generator: { /* ... */ },
});
```

### Key Concepts

#### Extend vs Replace
```typescript
// ✅ EXTEND (Recommended) - Adds to defaults
theme: {
  extend: {
    colors: { primary: { main: '#color' } }
  }
}

// ❌ REPLACE (Advanced) - Replaces entire system
theme: {
  tokens: { /* complete system */ }
}
```

#### Color Formats
```typescript
// Simple
primary: { main: '#6366f1' }

// With variants
primary: { 
  main: '#6366f1',
  light: '#a5b4fc',
  dark: '#4338ca',
}

// Full scale (1-10)
primary: {
  1: '#eef2ff',   // lightest
  6: '#6366f1',   // main
  10: '#312e81',  // darkest
}
```

---

## 🌐 Framework-Specific Usage

### React / Next.js
```tsx
// pages/_app.tsx
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

export default function App({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    const css = createTheme();
    injectTheme(css);
  }
  return <Component {...pageProps} />;
}
```

### Vue / Nuxt
```typescript
// plugins/atomix.ts
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

export default defineNuxtPlugin(() => {
  if (process.server) {
    const css = createTheme();
    injectTheme(css);
  }
});
```

### Astro
```astro
---
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

const css = createTheme();
injectTheme(css);
---
<html>
  <body><slot /></body>
</html>
```

### Vanilla JavaScript
```javascript
import { loadConfig } from '@shohojdhara/atomix/config';
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

const config = loadConfig();
const css = createTheme(config.theme?.tokens || {});
injectTheme(css);
```

---

## ⚠️ Important Notes

### Browser Limitations

**Problem:** Config file loading requires Node.js file system access.

**Solution:** In browser-only environments, provide tokens explicitly:

```typescript
// ❌ Won't work in browser
const css = createTheme(); // Error!

// ✅ Works everywhere
const css = createTheme({ '--brand-primary': '#6366f1' });
```

See [`browser-only.config.ts`](./browser-only.config.ts) for detailed workarounds.

### Environment Variables

For advanced features, set these environment variables:

```bash
# .env file
ATOMIX_AI_API_KEY=sk-your-openai-key
FIGMA_API_KEY=figd-your-figma-key
FIGMA_FILE_ID=your-file-id
```

Access in config:
```typescript
ai: {
  apiKey: process.env.ATOMIX_AI_API_KEY
}
```

### TypeScript Support

All examples use TypeScript for type safety. Make sure you have:

```bash
npm install --save-dev @types/node
```

---

## 🔗 Additional Resources

- **Full Documentation:** https://atomix.design/docs/configuration
- **Quick Reference:** [../../CONFIG_QUICK_REFERENCE.md](../../CONFIG_QUICK_REFERENCE.md)
- **Setup Checklist:** [../../CONFIG_AUDIT_CHECKLIST.md](../../CONFIG_AUDIT_CHECKLIST.md)
- **Technical Audit:** [../../CONFIG_SYSTEM_AUDIT.md](../../CONFIG_SYSTEM_AUDIT.md)
- **Architecture Diagrams:** [../../CONFIG_ARCHITECTURE.md](../../CONFIG_ARCHITECTURE.md)

---

## 💡 Tips

1. **Start Simple:** Begin with `minimal.config.ts` and add features as needed
2. **Use Extend Mode:** Always prefer `extend` over replacing the entire token system
3. **Test Changes:** Restart your dev server after modifying the config
4. **Type Safety:** Use `defineConfig()` for autocomplete and validation
5. **Document Customizations:** Add comments explaining why you changed defaults
6. **Keep Secrets Safe:** Never commit API keys - use environment variables

---

## 🆘 Need Help?

1. Check the troubleshooting section in [CONFIG_AUDIT_CHECKLIST.md](../../CONFIG_AUDIT_CHECKLIST.md)
2. Review common issues in [CONFIG_SYSTEM_AUDIT.md](../../CONFIG_SYSTEM_AUDIT.md)
3. Create an issue on GitHub with your config file and error message

---

*Examples last updated: April 7, 2026*  
*Atomix Version: 0.5.2*
