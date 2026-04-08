# Migration Guides

Step-by-step guides for migrating from other design systems to Atomix.

---

## Table of Contents

- [From Tailwind CSS](#from-tailwind-css)
- [From Material-UI](#from-material-ui)
- [From Chakra UI](#from-chakra-ui)
- [From Bootstrap](#from-bootstrap)
- [From Custom Design System](#from-custom-design-system)
- [From Atomix v0.4.x](#from-atomix-v04x)

---

## From Tailwind CSS

Tailwind and Atomix share similar philosophies. Here's how to migrate.

### Step 1: Install Atomix

```bash
npm install @shohojdhara/atomix
```

### Step 2: Create Config File

Create `atomix.config.ts` in your project root:

```typescript
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  prefix: 'tw', // Use 'tw' to match Tailwind naming
});
```

### Step 3: Map Your Customizations

#### Colors

**Tailwind:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#ec4899',
      }
    }
  }
}
```

**Atomix:**
```typescript
// atomix.config.ts
export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: { main: '#6366f1' },
        secondary: { main: '#ec4899' },
      }
    }
  }
});
```

#### Spacing

**Tailwind:**
```javascript
spacing: {
  '18': '4.5rem',
  '88': '22rem',
}
```

**Atomix:**
```typescript
spacing: {
  '18': '4.5rem',
  '88': '22rem',
}
```

#### Typography

**Tailwind:**
```javascript
fontFamily: {
  sans: ['Inter', 'sans-serif'],
},
fontSize: {
  'xs': ['0.75rem', { lineHeight: '1rem' }],
}
```

**Atomix:**
```typescript
typography: {
  fontFamilies: {
    sans: ['Inter', 'sans-serif'],
  },
  fontSizes: {
    'xs': '0.75rem',
  },
  lineHeights: {
    'xs': '1rem',
  }
}
```

### Step 4: Update Component Code

**Before (Tailwind classes):**
```jsx
<button className="bg-primary text-white px-4 py-2 rounded-lg">
  Click me
</button>
```

**After (CSS variables):**
```jsx
<button style={{
  backgroundColor: 'var(--tw-primary)',
  color: 'white',
  padding: 'var(--tw-spacing-2) var(--tw-spacing-4)',
  borderRadius: 'var(--tw-border-radius-lg)'
}}>
  Click me
</button>
```

Or use utility classes if you keep Tailwind alongside Atomix.

### Step 5: Remove Tailwind Dependencies

```bash
npm uninstall tailwindcss postcss autoprefixer
```

Remove from PostCSS config:
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    // Remove: tailwindcss: {},
  }
}
```

### Key Differences

| Feature | Tailwind | Atomix |
|---------|----------|--------|
| Config file | `tailwind.config.js` | `atomix.config.ts` |
| CSS output | Utility classes | CSS custom properties |
| Usage | Class names | CSS variables |
| Purging | Automatic | N/A (smaller footprint) |
| JIT mode | Yes | Always on |

---

## From Material-UI

### Step 1: Install Atomix

```bash
npm install @shohojdhara/atomix
```

### Step 2: Map MUI Theme to Atomix

**MUI Theme:**
```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '2.5rem' },
  },
  spacing: 8,
});
```

**Atomix Config:**
```typescript
export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
        },
        secondary: {
          main: '#9c27b0',
        },
      },
      typography: {
        fontFamilies: {
          sans: ['Roboto', 'Arial', 'sans-serif'],
        },
        fontSizes: {
          'h1': '2.5rem',
        },
      },
      spacing: {
        '1': '0.5rem',   // 8px
        '2': '1rem',     // 16px
        '3': '1.5rem',   // 24px
      }
    }
  }
});
```

### Step 3: Replace MUI Components

**Before (MUI):**
```tsx
import { Button, ThemeProvider } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary">
        Click
      </Button>
    </ThemeProvider>
  );
}
```

**After (Atomix + Your Components):**
```tsx
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';
import { Button } from './components/Button';

const css = createTheme();
injectTheme(css);

function App() {
  return (
    <Button variant="primary">
      Click
    </Button>
  );
}
```

### Step 4: Remove MUI

```bash
npm uninstall @mui/material @emotion/react @emotion/styled
```

---

## From Chakra UI

### Step 1: Install Atomix

```bash
npm install @shohojdhara/atomix
```

### Step 2: Map Chakra Theme

**Chakra:**
```typescript
const theme = extendTheme({
  colors: {
    brand: {
      50: '#eef2ff',
      500: '#6366f1',
      900: '#312e81',
    }
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  space: {
    xs: '0.5rem',
    sm: '1rem',
  }
});
```

**Atomix:**
```typescript
export default defineConfig({
  theme: {
    extend: {
      colors: {
        brand: {
          1: '#eef2ff',
          6: '#6366f1',  // Maps to Chakra's 500
          10: '#312e81', // Maps to Chakra's 900
        }
      },
      typography: {
        fontFamilies: {
          sans: ['Inter', 'sans-serif'],
        }
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem',
      }
    }
  }
});
```

### Step 3: Replace Chakra Components

**Before (Chakra):**
```tsx
import { Box, Button, ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box p={4}>
        <Button colorScheme="brand">Click</Button>
      </Box>
    </ChakraProvider>
  );
}
```

**After (Atomix):**
```tsx
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

const css = createTheme();
injectTheme(css);

function App() {
  return (
    <div style={{ padding: 'var(--brand-spacing-xs)' }}>
      <button style={{ 
        backgroundColor: 'var(--brand-brand-6)',
        color: 'white'
      }}>
        Click
      </button>
    </div>
  );
}
```

---

## From Bootstrap

### Step 1: Install Atomix

```bash
npm install @shohojdhara/atomix
```

### Step 2: Map Bootstrap Variables

**Bootstrap SCSS:**
```scss
$primary: #0d6efd;
$secondary: #6c757d;
$font-family-base: system-ui, -apple-system, sans-serif;
$spacer: 1rem;
```

**Atomix:**
```typescript
export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: { main: '#0d6efd' },
        secondary: { main: '#6c757d' },
      },
      typography: {
        fontFamilies: {
          sans: ['system-ui', '-apple-system', 'sans-serif'],
        }
      },
      spacing: {
        '1': '1rem', // Matches Bootstrap's $spacer
      }
    }
  }
});
```

### Step 3: Replace Bootstrap Classes

**Before (Bootstrap):**
```html
<div class="container">
  <button class="btn btn-primary">Click</button>
</div>
```

**After (Atomix):**
```html
<div style="max-width: 1200px; margin: 0 auto;">
  <button style="
    background-color: var(--brand-primary);
    color: white;
    padding: var(--brand-spacing-1);
    border: none;
    border-radius: var(--brand-border-radius-md);
  ">
    Click
  </button>
</div>
```

### Step 4: Remove Bootstrap

```bash
npm uninstall bootstrap
```

Remove from HTML:
```html
<!-- Remove this -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css" rel="stylesheet">
```

---

## From Custom Design System

If you have an existing custom design system:

### Step 1: Audit Your Current Tokens

List all your current design tokens:
- Colors
- Spacing values
- Typography settings
- Breakpoints
- Shadows
- Border radiuses

### Step 2: Create Mapping Document

```markdown
# Token Mapping

## Colors
Old: --color-primary → New: --brand-primary
Old: --color-secondary → New: --brand-secondary

## Spacing
Old: --space-sm (8px) → New: --brand-spacing-2
Old: --space-md (16px) → New: --brand-spacing-4
```

### Step 3: Configure Atomix

```typescript
export default defineConfig({
  prefix: 'brand', // Match your old naming
  theme: {
    extend: {
      colors: {
        primary: { main: '#your-color' },
        secondary: { main: '#your-color' },
      },
      spacing: {
        '2': '0.5rem',  // 8px
        '4': '1rem',    // 16px
      }
    }
  }
});
```

### Step 4: Gradual Migration

Don't migrate everything at once. Use both systems temporarily:

```css
/* During migration */
.button {
  /* Old system */
  background-color: var(--color-primary);
  
  /* New system */
  padding: var(--brand-spacing-4);
  border-radius: var(--brand-border-radius-md);
}
```

### Step 5: Remove Old System

Once all components are migrated, remove the old design system.

---

## From Atomix v0.4.x

### Breaking Changes

#### 1. Config File Location

**v0.4.x:**
```typescript
// src/theme.config.ts
export default {
  prefix: 'app',
};
```

**v0.5.x:**
```typescript
// atomix.config.ts (project root)
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  prefix: 'app',
});
```

#### 2. Theme Structure

**v0.4.x:**
```typescript
{
  colors: {
    primary: '#6366f1'
  }
}
```

**v0.5.x:**
```typescript
{
  theme: {
    extend: {
      colors: {
        primary: { main: '#6366f1' }
      }
    }
  }
}
```

#### 3. API Changes

**v0.4.x:**
```typescript
import { generateTheme } from '@shohojdhara/atomix';
const css = generateTheme(config);
```

**v0.5.x:**
```typescript
import { createTheme } from '@shohojdhara/atomix/theme';
const css = createTheme(); // Auto-loads from atomix.config.ts
```

### Migration Steps

1. **Move config file:**
   ```bash
   mv src/theme.config.ts ./atomix.config.ts
   ```

2. **Update imports:**
   ```typescript
   // Add this import
   import { defineConfig } from '@shohojdhara/atomix/config';
   
   // Wrap your config
   export default defineConfig({
     // ... your existing config
   });
   ```

3. **Update theme structure:**
   ```typescript
   // Before
   export default {
     colors: { primary: '#6366f1' }
   };
   
   // After
   export default defineConfig({
     theme: {
       extend: {
         colors: {
           primary: { main: '#6366f1' }
         }
       }
     }
   });
   ```

4. **Update usage:**
   ```typescript
   // Before
   import { generateTheme } from '@shohojdhara/atomix';
   const css = generateTheme(config);
   
   // After
   import { createTheme } from '@shohojdhara/atomix/theme';
   const css = createTheme();
   ```

5. **Test thoroughly:**
   ```bash
   npm run build
   npm run dev
   ```

---

## Common Migration Issues

### Issue 1: Colors Don't Match

**Problem:** Colors look different after migration.

**Solution:** Check color format. Atomix uses hex by default.

```typescript
// Make sure you're using hex colors
colors: {
  primary: { main: '#6366f1' } // ✅ Good
  // primary: { main: 'rgb(99, 102, 241)' } // ❌ Avoid
}
```

### Issue 2: Spacing Feels Off

**Problem:** Layout looks cramped or too spacious.

**Solution:** Verify spacing scale matches your old system.

```typescript
// Check what 1 unit equals in your old system
spacing: {
  '1': '0.25rem',  // If old system used 4px base
  // '1': '0.5rem', // If old system used 8px base
}
```

### Issue 3: Fonts Not Loading

**Problem:** Custom fonts not appearing.

**Solution:** Ensure fonts are loaded before theme injection.

```typescript
// Load fonts first
import '@fontsource/inter';

// Then inject theme
const css = createTheme();
injectTheme(css);
```

### Issue 4: Dark Mode Broken

**Problem:** Dark mode doesn't work.

**Solution:** Define dark theme separately.

```typescript
export default defineConfig({
  theme: {
    themes: {
      light: { /* ... */ },
      dark: { /* ... */ }
    }
  }
});
```

---

## Migration Checklist

- [ ] Installed Atomix package
- [ ] Created atomix.config.ts
- [ ] Mapped all colors
- [ ] Mapped all spacing values
- [ ] Mapped typography settings
- [ ] Updated component code
- [ ] Tested in development
- [ ] Tested in production build
- [ ] Verified responsive behavior
- [ ] Checked accessibility
- [ ] Removed old dependencies
- [ ] Updated documentation
- [ ] Trained team members

---

## Need Help?

- **Examples:** See [examples/config-examples/](../examples/config-examples/)
- **Best Practices:** Read [CONFIG_BEST_PRACTICES.md](./CONFIG_BEST_PRACTICES.md)
- **Issues:** Create a GitHub issue with your migration problem
- **Community:** Join our Discord server

---

*Last updated: April 7, 2026*  
*Version: 0.5.2*
