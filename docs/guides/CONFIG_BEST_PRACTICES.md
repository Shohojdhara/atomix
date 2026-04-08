# Atomix Configuration Best Practices

This guide provides recommended patterns, conventions, and anti-patterns for configuring Atomix in your projects.

---

## 📋 Table of Contents

- [General Principles](#general-principles)
- [Configuration Structure](#configuration-structure)
- [Color Management](#color-management)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Performance](#performance)
- [Security](#security)
- [Team Collaboration](#team-collaboration)
- [Common Anti-Patterns](#common-anti-patterns)
- [Framework-Specific Tips](#framework-specific-tips)

---

## General Principles

### ✅ DO: Start Simple

Begin with minimal configuration and add complexity as needed.

```typescript
// ✅ Good - Start here
export default defineConfig({
  prefix: 'myapp',
});

// ❌ Bad - Don't over-engineer from the start
export default defineConfig({
  prefix: 'enterprise-app-v2',
  theme: { /* 500+ lines */ },
  ai: { /* ... */ },
  tokenEngine: { /* ... */ },
  // ... everything at once
});
```

### ✅ DO: Use Extend Mode

Always prefer `extend` over replacing the entire token system.

```typescript
// ✅ Good - Extends defaults
theme: {
  extend: {
    colors: {
      primary: { main: '#6366f1' }
    }
  }
}

// ❌ Bad - Replaces everything (unless you really need to)
theme: {
  tokens: { /* complete system */ }
}
```

**Why?** Extend mode gives you all the thoughtful defaults plus your customizations. Replace mode requires you to define EVERYTHING.

### ✅ DO: Validate Your Config

Use the built-in validation during development:

```typescript
import { loadConfig, validateConfig } from '@shohojdhara/atomix/config';

const config = loadConfig();
const warnings = validateConfig(config);

if (warnings.length > 0) {
  console.warn('⚠️ Config warnings:', warnings);
}
```

### ✅ DO: Document Customizations

Add comments explaining WHY you changed defaults:

```typescript
theme: {
  extend: {
    spacing: {
      // Using 8px grid system per design team spec
      '1': '0.5rem',   // 8px
      '2': '1rem',     // 16px
      '3': '1.5rem',   // 24px
    }
  }
}
```

---

## Configuration Structure

### File Organization

```
your-project/
├── atomix.config.ts          # Main config file
├── .env                      # API keys (never commit!)
├── .gitignore                # Add atomix.config.ts if it has secrets
└── src/
    ├── theme/
    │   ├── tokens.ts         # Additional token definitions (optional)
    │   └── overrides.css     # Manual CSS overrides (rarely needed)
    └── app.tsx
```

### Config File Naming

**Supported formats:**
- ✅ `atomix.config.ts` (recommended - TypeScript support)
- ✅ `atomix.config.js` (JavaScript)
- ✅ `atomix.config.json` (JSON - no comments or dynamic values)

**Not supported:**
- ❌ `config.atomix.ts`
- ❌ `atomix-config.ts`
- ❌ `.atomixrc`

### Environment Variables

Use environment variables for sensitive data:

```typescript
// ✅ Good - Secure
export default defineConfig({
  ai: {
    apiKey: process.env.ATOMIX_AI_API_KEY,
  },
  tokenEngine: {
    providers: {
      figma: {
        options: {
          apiKey: process.env.FIGMA_API_KEY,
        }
      }
    }
  }
});

// ❌ Bad - Exposed secrets
export default defineConfig({
  ai: {
    apiKey: 'sk-1234567890abcdef', // NEVER DO THIS
  }
});
```

**.env file:**
```bash
# .env
ATOMIX_AI_API_KEY=sk-your-key-here
FIGMA_API_KEY=figd-your-key-here
```

**.gitignore:**
```gitignore
# .gitignore
.env
.env.local
*.local
```

---

## Color Management

### Color Formats

#### Simple Format (Most Common)

```typescript
colors: {
  primary: { main: '#6366f1' }
}
```

Generates: `--brand-primary: #6366f1`

#### With Variants

```typescript
colors: {
  primary: {
    main: '#6366f1',
    light: '#a5b4fc',
    dark: '#4338ca',
    contrastText: '#ffffff',
  }
}
```

Generates:
- `--brand-primary: #6366f1`
- `--brand-primary-light: #a5b4fc`
- `--brand-primary-dark: '#4338ca'`
- `--brand-primary-contrast-text: '#ffffff'`

#### Full Scale (Advanced)

```typescript
colors: {
  primary: {
    1: '#eef2ff',   // Lightest
    2: '#e0e7ff',
    3: '#c7d2fe',
    4: '#a5b4fc',
    5: '#818cf8',
    6: '#6366f1',   // Main
    7: '#4f46e5',
    8: '#4338ca',
    9: '#3730a3',
    10: '#312e81',  // Darkest
  }
}
```

Generates: `--brand-primary-1` through `--brand-primary-10`

### ✅ DO: Use Semantic Names

```typescript
// ✅ Good - Clear intent
colors: {
  primary: { main: '#6366f1' },
  secondary: { main: '#ec4899' },
  success: { main: '#22c55e' },
  error: { main: '#ef4444' },
  warning: { main: '#f59e0b' },
  info: { main: '#3b82f6' },
}

// ❌ Bad - Unclear meaning
colors: {
  color1: { main: '#6366f1' },
  color2: { main: '#ec4899' },
}
```

### ✅ DO: Ensure Accessibility

Check contrast ratios for text colors:

```typescript
colors: {
  primary: {
    main: '#6366f1',
    contrastText: '#ffffff', // White on indigo passes WCAG AA
  }
}
```

**Tip:** Use tools like https://webaim.org/resources/contrastchecker/ to verify.

### ❌ DON'T: Hardcode Colors in Components

```typescript
// ❌ Bad - Defeats the purpose of theming
.button {
  background-color: #6366f1;
}

// ✅ Good - Uses theme tokens
.button {
  background-color: var(--brand-primary);
}
```

---

## Typography

### Font Families

```typescript
typography: {
  fontFamilies: {
    // System fonts first for performance
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    serif: ['Georgia', 'Cambria', 'serif'],
    mono: ['Fira Code', 'Consolas', 'monospace'],
  }
}
```

**Best Practice:** List web-safe fallbacks after custom fonts.

### Font Sizes

Use REM units for accessibility:

```typescript
// ✅ Good - Scalable
fontSizes: {
  'sm': '0.875rem',   // 14px
  'base': '1rem',     // 16px
  'lg': '1.125rem',   // 18px
}

// ❌ Bad - Not scalable
fontSizes: {
  'sm': '14px',
  'base': '16px',
}
```

### Line Heights

Match line heights to font sizes:

```typescript
lineHeights: {
  'tight': 1.2,    // Headings
  'normal': 1.5,   // Body text
  'relaxed': 1.75, // Long-form content
}
```

---

## Spacing & Layout

### Use Consistent Scale

Stick to a consistent spacing scale (4px or 8px grid):

```typescript
// ✅ Good - 8px grid
spacing: {
  '1': '0.5rem',   // 8px
  '2': '1rem',     // 16px
  '3': '1.5rem',   // 24px
  '4': '2rem',     // 32px
}

// ❌ Bad - Inconsistent
spacing: {
  '1': '0.5rem',   // 8px
  '2': '0.75rem',  // 12px (breaks grid)
  '3': '1.5rem',   // 24px
}
```

### Name Spacing Meaningfully

Consider semantic names for common spacings:

```typescript
spacing: {
  'xs': '0.25rem',   // 4px
  'sm': '0.5rem',    // 8px
  'md': '1rem',      // 16px
  'lg': '1.5rem',    // 24px
  'xl': '2rem',      // 32px
}
```

---

## Performance

### Minimize Token Count

More tokens = larger CSS output. Only define what you need.

```typescript
// ✅ Good - Essential tokens only
spacing: {
  '1': '0.25rem',
  '2': '0.5rem',
  '4': '1rem',
  '8': '2rem',
}

// ⚠️ Overkill - Do you really need all these?
spacing: {
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  // ... 50 more values
}
```

### Avoid Deep Nesting

Keep color structures flat when possible:

```typescript
// ✅ Good - Flat structure
colors: {
  primary: { main: '#6366f1' },
}

// ❌ Bad - Unnecessary nesting
colors: {
  brand: {
    palette: {
      primary: {
        variants: {
          main: '#6366f1'
        }
      }
    }
  }
}
```

### Lazy Load Themes

If using multiple themes, load them on demand:

```typescript
// Load theme only when needed
async function loadTheme(themeName: string) {
  const theme = await import(`./themes/${themeName}.ts`);
  injectTheme(theme.css);
}
```

---

## Security

### Never Commit Secrets

```bash
# Add to .gitignore
.env
.env.local
*.local
atomix.config.ts  # If it contains secrets
```

### Use Environment Variables

```typescript
// ✅ Secure
ai: {
  apiKey: process.env.ATOMIX_AI_API_KEY
}

// ❌ Insecure
ai: {
  apiKey: 'sk-1234567890'
}
```

### Validate User Input

If accepting dynamic tokens, validate them:

```typescript
import { validateConfig } from '@shohojdhara/atomix/config';

const userTokens = getUserInput();
const warnings = validateConfig({ theme: { extend: userTokens } });

if (warnings.length > 0) {
  throw new Error('Invalid tokens: ' + warnings.join(', '));
}
```

---

## Team Collaboration

### Share Configuration

Commit your config file (without secrets):

```bash
# .gitignore
.env
.env.local
# But NOT atomix.config.ts (unless it has secrets)
```

### Document Decisions

Add a `CONFIG_DECISIONS.md` file:

```markdown
# Configuration Decisions

## Why we use 8px grid
- Matches Figma design specs
- Industry standard
- Easier mental math

## Why we chose Inter font
- Excellent readability
- Wide language support
- Free for commercial use
```

### Use Validation in CI

Add config validation to your CI pipeline:

```yaml
# .github/workflows/ci.yml
- name: Validate Atomix Config
  run: |
    node -e "
      const { loadConfig, validateConfig } = require('@shohojdhara/atomix/config');
      const config = loadConfig({ required: true });
      const warnings = validateConfig(config);
      if (warnings.length > 0) {
        console.error('Config warnings:', warnings);
        process.exit(1);
      }
    "
```

---

## Common Anti-Patterns

### ❌ Over-Customization

```typescript
// ❌ Bad - Changing everything
theme: {
  tokens: {
    colors: { /* 100 colors */ },
    spacing: { /* 100 values */ },
    typography: { /* everything */ },
    // ... replacing all defaults
  }
}

// ✅ Good - Strategic customization
theme: {
  extend: {
    colors: {
      primary: { main: '#brand-color' },
      secondary: { main: '#accent-color' },
    }
  }
}
```

### ❌ Magic Numbers

```typescript
// ❌ Bad - What does this mean?
spacing: {
  'custom1': '1.375rem',
  'weird': '0.833rem',
}

// ✅ Good - Standard values
spacing: {
  '3.5': '0.875rem',  // 14px
  '5.5': '1.375rem',  // 22px
}
```

### ❌ Inconsistent Naming

```typescript
// ❌ Bad - Mixed naming conventions
colors: {
  primary_color: { main: '#6366f1' },  // snake_case
  secondaryColor: { main: '#ec4899' }, // camelCase
  'accent-color': { main: '#f59e0b' }, // kebab-case
}

// ✅ Good - Consistent
colors: {
  primary: { main: '#6366f1' },
  secondary: { main: '#ec4899' },
  accent: { main: '#f59e0b' },
}
```

### ❌ Browser Config Loading

```typescript
// ❌ Won't work in browser
const config = loadAtomixConfig();

// ✅ Works everywhere
const css = createTheme({ '--brand-primary': '#6366f1' });
```

---

## Framework-Specific Tips

### React / Next.js

```tsx
// pages/_app.tsx
import { useEffect } from 'react';
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const css = createTheme();
    injectTheme(css);
  }, []);
  
  return <Component {...pageProps} />;
}
```

### Vue / Nuxt

```typescript
// plugins/atomix.client.ts
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

export default defineNuxtPlugin(() => {
  const css = createTheme();
  injectTheme(css);
});
```

### Astro

```astro
---
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

const css = createTheme();
injectTheme(css);
---
```

### Svelte / SvelteKit

```typescript
// src/hooks.server.ts
import { createTheme } from '@shohojdhara/atomix/theme';

export async function handle({ event, resolve }) {
  const css = createTheme();
  // Inject into HTML
}
```

---

## Checklist Before Production

- [ ] Config file validated with `validateConfig()`
- [ ] No hardcoded API keys in config
- [ ] All custom tokens documented
- [ ] Color contrast ratios checked for accessibility
- [ ] Config tested in production build
- [ ] Browser compatibility verified
- [ ] Performance impact measured
- [ ] Team members trained on config structure
- [ ] Backup of working config created
- [ ] Rollback plan documented

---

## Resources

- **Example Configs:** [examples/config-examples/](../examples/config-examples/)
- **Quick Reference:** [CONFIG_QUICK_REFERENCE.md](../CONFIG_QUICK_REFERENCE.md)
- **Setup Checklist:** [CONFIG_AUDIT_CHECKLIST.md](../CONFIG_AUDIT_CHECKLIST.md)
- **Technical Details:** [CONFIG_SYSTEM_AUDIT.md](../CONFIG_SYSTEM_AUDIT.md)
- **Architecture:** [CONFIG_ARCHITECTURE.md](../CONFIG_ARCHITECTURE.md)

---

*Last updated: April 7, 2026*  
*Version: 0.5.2*
