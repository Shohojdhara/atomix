# Atomix Developer Guide

**For Library Users and Contributors**  
**Version:** 0.3.2  
**Last Updated:** 2024-12-19

---

## 🚀 Quick Start for Library Users

### Installation

```bash
npm install @shohojdhara/atomix
# or
yarn add @shohojdhara/atomix
# or
pnpm add @shohojdhara/atomix
```

### Basic Usage

```tsx
// Import components and styles
import { Button, Card } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';

// Or use the theme system
import { ThemeProvider, useTheme } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider>
      <Button variant="primary">Click me</Button>
      <Card>Content</Card>
    </ThemeProvider>
  );
}
```

---

## 🎨 Using Themes

### Option 1: Custom CSS Themes

You can create and load your own CSS themes using the Atomix Theme System.

```tsx
// Import your custom theme CSS
import './themes/my-custom-theme.css';
```

### Option 2: Dynamic Theme Loading

```tsx
import { ThemeProvider, useTheme } from '@shohojdhara/atomix/theme';

// Define available themes
const themes = {
  'light': {
    type: 'css',
    name: 'Light Theme',
    class: 'light-theme',
  },
  'dark': {
    type: 'css',
    name: 'Dark Theme', 
    class: 'dark-theme',
  },
};

function App() {
  return (
    <ThemeProvider 
      themes={themes}
      defaultTheme="light"
      basePath="/themes" // Path to your theme CSS files
    >
      <YourApp />
    </ThemeProvider>
  );
}

function ThemeSelector() {
  const { theme, setTheme, availableThemes } = useTheme();
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {availableThemes.map(t => (
        <option key={t.class} value={t.class}>{t.name}</option>
      ))}
    </select>
  );
}
```

### Option 3: Programmatic Themes

```tsx
import { createTheme, ThemeProvider } from '@shohojdhara/atomix/theme';

const customTheme = createTheme({
  name: 'My Custom Theme',
  palette: {
    primary: { main: '#7AFFD7' },
    secondary: { main: '#FF5733' },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

---

## 🛠️ Creating Custom Themes

### Method 1: Extend Existing Theme (Recommended for Library Users)

```typescript
import { extendTheme } from '@shohojdhara/atomix/theme';
import baseTheme from './my-base-theme';

const myTheme = extendTheme(baseTheme, {
  palette: {
    primary: { main: '#FF5733' },
  },
  components: {
    Button: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});

export default myTheme;
```

### Method 2: SCSS Theme (For Advanced Users)

1. **Create theme structure:**

```
my-theme/
├── 01-settings/
│   ├── _settings.colors.scss
│   ├── _settings.typography.scss
│   └── _index.scss
├── 06-components/
│   ├── _components.button.scss
│   └── _index.scss
└── index.scss
```

2. **Configure colors:**

```scss
// 01-settings/_settings.colors.scss
@use '@shohojdhara/atomix/scss/settings' as * with (
  $primary-500: #FF5733,
  $secondary-500: #33FF57
);
```

3. **Build your theme:**

```bash
# If you've installed Atomix locally
npx atomix-build-theme my-theme

# Or use the build script directly
node node_modules/@shohojdhara/atomix/scripts/build-themes.js
```

---

## 📦 Using Components

### TypeScript Support

All components are fully typed:

```tsx
import { Button, ButtonProps } from '@shohojdhara/atomix';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

### Component Customization

```tsx
import { Button } from '@shohojdhara/atomix';
import styles from './MyStyles.module.css';

// Method 1: className
<Button className={styles.myButton}>Custom Style</Button>

// Method 2: style prop
<Button style={{ backgroundColor: '#FF5733' }}>Inline Style</Button>

// Method 3: Extend with styled-components or emotion
import styled from 'styled-components';
const StyledButton = styled(Button)`
  border-radius: 12px;
  text-transform: uppercase;
`;
```

---

## 🔧 Advanced Features

### RTL Support

```tsx
import { ThemeProvider } from '@shohojdhara/atomix/theme';

<ThemeProvider
  rtl={{
    enabled: true,
    autoDetect: true,
    locale: 'ar-SA',
  }}
>
  <App />
</ThemeProvider>
```

### Component Overrides

```tsx
import { ComponentOverrideManager } from '@shohojdhara/atomix/theme';

const overrideManager = new ComponentOverrideManager();

overrideManager.addOverride('Button', {
  styleOverrides: {
    borderRadius: '8px',
    padding: '12px 24px',
  },
  defaultProps: {
    variant: 'primary',
    size: 'lg',
  },
});

const customTheme = overrideManager.getThemeWithOverrides();
```

### White Labeling

```tsx
import { WhiteLabelManager } from '@shohojdhara/atomix/theme';

const whiteLabel = new WhiteLabelManager();

whiteLabel.configure({
  brand: {
    name: 'Your Brand',
    logo: '/your-logo.svg',
    primaryColor: '#007bff',
    favicon: '/your-favicon.ico',
  },
});

whiteLabel.applyBrand();
```

### Theme Analytics

```tsx
import { createThemeAnalytics } from '@shohojdhara/atomix/theme';

const analytics = createThemeAnalytics({
  enabled: true,
  onEvent: (event) => {
    // Send to your analytics service
    console.log('Theme event:', event);
  },
});
```

---

## 🏗️ Build Tools for Library Users

### Using Atomix Build Tools

When you install Atomix, you get access to build tools:

```json
// Your package.json
{
  "scripts": {
    "build:theme": "node node_modules/@shohojdhara/atomix/scripts/build-themes.js",
    "sync:config": "node node_modules/@shohojdhara/atomix/scripts/sync-theme-config.js"
  }
}
```

### Webpack Configuration

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                  'node_modules/@shohojdhara/atomix/src/styles',
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### Vite Configuration

```javascript
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@shohojdhara/atomix/scss/settings" as *;`,
      },
    },
  },
};
```

### Next.js Configuration

```javascript
// next.config.js
module.exports = {
  sassOptions: {
    includePaths: [
      'node_modules/@shohojdhara/atomix/src/styles',
    ],
  },
};
```

---

## 📖 API Exports

### Main Exports

```typescript
// Components
import { 
  Button, Card, Input, Modal, 
  Navbar, Tabs, Badge, // ... etc
} from '@shohojdhara/atomix';

// Theme System
import { 
  ThemeProvider, 
  useTheme,
  createTheme,
  extendTheme,
  mergeTheme,
} from '@shohojdhara/atomix/theme';

// Utilities
import {
  generateCSSVariables,
  hexToRgb,
  getContrastRatio,
} from '@shohojdhara/atomix/theme';

// Types
import type {
  Theme,
  ThemeMetadata,
  ThemeManagerConfig,
  ButtonProps,
  CardProps,
  // ... etc
} from '@shohojdhara/atomix';
```

### Style Exports

```scss
// SCSS modules
@use '@shohojdhara/atomix/scss/settings';
@use '@shohojdhara/atomix/scss/tools';
@use '@shohojdhara/atomix/scss/components';

// CSS imports
import '@shohojdhara/atomix/css'; // Main styles
import '@shohojdhara/atomix/css/min'; // Minified
```

---

## 🧪 Testing Your Implementation

### Unit Testing with Vitest/Jest

```typescript
import { render } from '@testing-library/react';
import { ThemeProvider, Button } from '@shohojdhara/atomix';

test('renders button with theme', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Button>Test Button</Button>
    </ThemeProvider>
  );
  
  expect(getByText('Test Button')).toBeInTheDocument();
});
```

### Storybook Integration

```typescript
// .storybook/preview.tsx
import { ThemeProvider } from '@shohojdhara/atomix/theme';
import '@shohojdhara/atomix/css';

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];
```

---

## 🔄 Migration Guide

### From Custom Components

```tsx
// Before: Your custom button
<button className="btn btn-primary">Click</button>

// After: Atomix Button
import { Button } from '@shohojdhara/atomix';
<Button variant="primary">Click</Button>
```

### From Other Libraries

```tsx
// From Material-UI
import Button from '@mui/material/Button';
<Button variant="contained" color="primary">

// To Atomix
import { Button } from '@shohojdhara/atomix';
<Button variant="primary">

// From Ant Design
import { Button } from 'antd';
<Button type="primary">

// To Atomix
import { Button } from '@shohojdhara/atomix';
<Button variant="primary">
```

---

## 💡 Best Practices

### Do's ✅

1. **Import only what you need:**
   ```typescript
   import { Button, Card } from '@shohojdhara/atomix';
   ```

2. **Use TypeScript for better DX:**
   ```typescript
   import type { ButtonProps } from '@shohojdhara/atomix';
   ```

3. **Leverage CSS variables for theming:**
   ```css
   .my-component {
     color: var(--atomix-primary);
   }
   ```

4. **Use theme provider at root level:**
   ```tsx
   <ThemeProvider>
     <App />
   </ThemeProvider>
   ```

### Don'ts ❌

1. **Don't import internal files:**
   ```typescript
   // ❌ Wrong
   import Button from '@shohojdhara/atomix/src/components/Button/Button';
   
   // ✅ Correct
   import { Button } from '@shohojdhara/atomix';
   ```

2. **Don't modify dist files:**
   - Always extend or override through proper APIs

3. **Don't bundle unnecessary themes:**
   - Import only the themes you use

---

## 🐛 Troubleshooting

### Common Issues

#### CSS not loading
```typescript
// Make sure to import CSS
import '@shohojdhara/atomix/css';
```

#### Theme not applying
```typescript
// Ensure ThemeProvider wraps your app
<ThemeProvider>
  <App /> // Theme context available here
</ThemeProvider>
```

#### TypeScript errors
```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

#### Build errors with SCSS
```bash
# Install peer dependencies
npm install sass postcss autoprefixer
```

---

## 📚 Resources

### Documentation
- [Component Documentation](../docs/components/)
- [Theme System Guide](./THEME_SYSTEM.md)
- [API Reference](./THEME_API_REFERENCE.md)
- [Examples](../examples/)

### Support
- [GitHub Issues](https://github.com/Shohojdhara/atomix/issues)
- [Discord Community](#) (Coming soon)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/atomix)

### Contributing
- [Contribution Guide](../CONTRIBUTING.md)
- [Code of Conduct](../CODE_OF_CONDUCT.md)
- [Development Setup](#development-setup)

---

## 🚧 Development Setup (For Contributors)

### Clone and Install

```bash
git clone https://github.com/Shohojdhara/atomix.git
cd atomix
npm install
```

### Development Commands

```bash
npm run dev          # Start Storybook
npm run build        # Build library
npm run test         # Run tests
npm run lint         # Lint code
```

### Creating a Pull Request

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

---

## 📝 License

MIT © Atomix Design System

---

**Happy coding! 🚀**
