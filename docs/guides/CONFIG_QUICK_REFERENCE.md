# Atomix Configuration Quick Reference

**For External Project Developers**

---

## Quick Start (30 Seconds)

```bash
npm install @shohojdhara/atomix
```

```typescript
// atomix.config.ts
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  prefix: 'myapp',
  theme: {
    extend: {
      colors: {
        primary: { main: '#7AFFD7' },
      },
    },
  },
});
```

```typescript
// app.tsx
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

const css = createTheme(); // Auto-loads from config
injectTheme(css);
```

---

## Common Configurations

### Change Brand Color Only

```typescript
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: { main: '#YOUR_COLOR' },
      },
    },
  },
});
```

### Customize Everything

```typescript
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  prefix: 'enterprise',
  theme: {
    extend: {
      colors: {
        primary: { 
          main: '#3b82f6',
          light: '#93c5fd',
          dark: '#1d4ed8',
        },
        secondary: { main: '#6366f1' },
        success: { main: '#22c55e' },
        error: { main: '#ef4444' },
      },
      typography: {
        fontFamilies: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        fontSizes: {
          'base': '1rem',
          'lg': '1.125rem',
          'xl': '1.25rem',
        },
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '16': '4rem',
      },
      borderRadius: {
        'md': '0.5rem',
        'lg': '0.75rem',
      },
    },
  },
});
```

### Use Custom Prefix

```typescript
export default defineConfig({
  prefix: 'mybrand', // Changes --atomix-* to --mybrand-*
  theme: { /* ... */ }
});
```

---

## Color Customization Patterns

### Pattern 1: Simple Main Color

```typescript
colors: {
  primary: { main: '#3b82f6' }
}
```

Generates: `--atomix-primary: #3b82f6`

### Pattern 2: With Variants

```typescript
colors: {
  primary: { 
    main: '#3b82f6',
    light: '#93c5fd',
    dark: '#1d4ed8',
    contrastText: '#ffffff'
  }
}
```

Generates:
- `--atomix-primary: #3b82f6`
- `--atomix-primary-light: #93c5fd`
- `--atomix-primary-dark: #1d4ed8`
- `--atomix-primary-contrast-text: #ffffff`

### Pattern 3: Full Scale (1-10)

```typescript
colors: {
  primary: {
    1: '#eff6ff',   // lightest
    2: '#dbeafe',
    3: '#bfdbfe',
    4: '#93c5fd',
    5: '#60a5fa',
    6: '#3b82f6',   // main
    7: '#2563eb',
    8: '#1d4ed8',
    9: '#1e40af',
    10: '#1e3a8a',  // darkest
  }
}
```

Generates: `--atomix-primary-1` through `--atomix-primary-10`

---

## Typography Quick Reference

### Font Families

```typescript
typography: {
  fontFamilies: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['Fira Code', 'monospace'],
  }
}
```

### Font Sizes

```typescript
typography: {
  fontSizes: {
    'xs': '0.75rem',    // 12px
    'sm': '0.875rem',   // 14px
    'base': '1rem',     // 16px
    'lg': '1.125rem',   // 18px
    'xl': '1.25rem',    // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
  }
}
```

### Font Weights

```typescript
typography: {
  fontWeights: {
    'light': 300,
    'normal': 400,
    'medium': 500,
    'semibold': 600,
    'bold': 700,
  }
}
```

---

## Spacing Scale

```typescript
spacing: {
  '1': '0.25rem',   // 4px
  '2': '0.5rem',    // 8px
  '3': '0.75rem',   // 12px
  '4': '1rem',      // 16px
  '5': '1.25rem',   // 20px
  '6': '1.5rem',    // 24px
  '8': '2rem',      // 32px
  '10': '2.5rem',   // 40px
  '12': '3rem',     // 48px
  '16': '4rem',     // 64px
  '20': '5rem',     // 80px
}
```

---

## Border Radius

```typescript
borderRadius: {
  'sm': '0.25rem',   // 4px
  'md': '0.5rem',    // 8px
  'lg': '0.75rem',   // 12px
  'xl': '1rem',      // 16px
  '2xl': '1.5rem',   // 24px
  'full': '9999px',  // Fully rounded
}
```

---

## Shadows

```typescript
shadows: {
  'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
}
```

---

## Z-Index Scale

```typescript
zIndex: {
  'base': 0,
  'dropdown': 1000,
  'sticky': 1020,
  'fixed': 1030,
  'modal-backdrop': 1040,
  'modal': 1050,
  'popover': 1060,
  'tooltip': 1070,
}
```

---

## Transitions

```typescript
transitions: {
  durations: {
    'fast': '150ms',
    'base': '200ms',
    'slow': '300ms',
  },
  easings: {
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
}
```

---

## Usage in Different Frameworks

### React / Next.js

```tsx
// pages/_app.tsx (Next.js)
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
// src/layouts/Layout.astro
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

const css = createTheme();
injectTheme(css);
---
<html>
  <head>
    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Vanilla JavaScript

```javascript
import { loadConfig } from '@shohojdhara/atomix/config';
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

// Load config manually
const config = loadConfig();
const css = createTheme(config.theme?.tokens || {});
injectTheme(css);
```

---

## Advanced Features

### AI-Assisted Scaffolding

```typescript
export default defineConfig({
  ai: {
    provider: 'openai',
    model: 'gpt-4',
    apiKey: process.env.ATOMIX_AI_API_KEY,
    temperature: 0.7,
    maxTokens: 4000,
  },
});
```

Usage:
```bash
atomix generate component "A button with glass effect"
```

### Figma Integration

```typescript
export default defineConfig({
  tokenEngine: {
    providers: {
      figma: {
        type: 'figma',
        options: {
          fileId: 'YOUR_FIGMA_FILE_ID',
          apiKey: process.env.FIGMA_API_KEY
        }
      }
    },
    sync: {
      pull: true,  // Import from Figma
      push: false, // Don't push to Figma
    }
  },
});
```

Usage:
```bash
atomix sync-tokens --pull
```

### Telemetry

```typescript
export default defineConfig({
  telemetry: {
    enabled: true,
    anonymize: true,
    path: '.atomix/telemetry.json'
  },
});
```

---

## CLI Commands

### Generate Component

```bash
atomix generate component Button
atomix generate component Button --no-storybook --no-tests
```

### Sync Tokens

```bash
atomix sync-tokens --pull
atomix sync-tokens --push
```

### Validate Config

```bash
atomix validate
```

### Build Theme

```bash
atomix build-theme
```

---

## Troubleshooting Quick Fixes

### Config Not Loading

```typescript
// Check if config exists
import { loadConfig } from '@shohojdhara/atomix/config';

try {
  const config = loadConfig({ required: true });
  console.log('✓ Config loaded');
} catch (error) {
  console.error('✗ Config not found:', error.message);
}
```

### CSS Not Applying

```typescript
// Verify CSS generation
import { createTheme } from '@shohojdhara/atomix/theme';

const css = createTheme();
console.log('CSS length:', css.length);
console.log('Contains variables?', css.includes('--'));
```

### TypeScript Errors

```bash
# Install types
npm install --save-dev @types/node

# Check TypeScript config
npx tsc --noEmit
```

### Wrong Prefix

```typescript
// Ensure prefix is at top level
export default defineConfig({
  prefix: 'myapp', // ← Here, not in theme
  theme: { /* ... */ }
});
```

---

## File Structure

```
your-project/
├── atomix.config.ts       ← Your configuration
├── package.json
├── src/
│   ├── components/
│   ├── styles/
│   └── app.tsx
└── node_modules/
    └── @shohojdhara/
        └── atomix/
```

---

## Environment Variables

Create `.env` file:

```bash
# .env
ATOMIX_AI_API_KEY=sk-your-openai-key
FIGMA_API_KEY=figd-your-figma-key
FIGMA_FILE_ID=your-file-id
```

Access in config:

```typescript
export default defineConfig({
  ai: {
    apiKey: process.env.ATOMIX_AI_API_KEY,
  },
  tokenEngine: {
    providers: {
      figma: {
        options: {
          apiKey: process.env.FIGMA_API_KEY,
          fileId: process.env.FIGMA_FILE_ID,
        }
      }
    }
  }
});
```

---

## Useful Links

- **Full Documentation:** https://atomix.design/docs/configuration
- **GitHub:** github.com/Shohojdhara/atomix
- **Examples:** See `/examples` in repository
- **Issues:** GitHub Issues tab
- **Changelog:** CHANGELOG.md

---

## Need Help?

1. Check [CONFIG_AUDIT_CHECKLIST.md](./CONFIG_AUDIT_CHECKLIST.md)
2. Review [CONFIG_SYSTEM_AUDIT.md](./CONFIG_SYSTEM_AUDIT.md)
3. Search GitHub Issues
4. Create new issue with:
   - Your `atomix.config.ts`
   - Error message
   - Environment details

---

*Quick Reference v1.0 | Atomix 0.5.2*
