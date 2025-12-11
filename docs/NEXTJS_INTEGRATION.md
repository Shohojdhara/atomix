# Next.js Integration Guide for @shohojdhara/atomix

This guide will help you integrate the Atomix design system with your Next.js application.

## Installation

```bash
npm install @shohojdhara/atomix
# or
yarn add @shohojdhara/atomix
# or
pnpm add @shohojdhara/atomix
```

## Next.js Configuration

Copy the configuration from `next.config.example.js` to your project's `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@shohojdhara/atomix',
  ],
  
  webpack: (config, { isServer }) => {
    // Handle CSS files from npm packages
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    return config;
  },
};

module.exports = nextConfig;
```

## CSS Imports

### Option 1: Import the pre-built CSS (Recommended)

In your `pages/_app.js` or `app/layout.js`:

```javascript
// Import the main CSS file
import '@shohojdhara/atomix/css';

// Or import the minified version for production
// import '@shohojdhara/atomix/css/min';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Option 2: Import SCSS files (For customization)

If you want to customize the styles, you can import the SCSS files:

```javascript
// Import the main SCSS file
import '@shohojdhara/atomix/scss';

// Or import specific layers
import '@shohojdhara/atomix/scss/settings';
import '@shohojdhara/atomix/scss/components';
```

### Option 3: Use ThemeProvider

```jsx
import { ThemeProvider } from '@shohojdhara/atomix/theme';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider defaultTheme="boomdevs">
      {children}
    </ThemeProvider>
  );
}
```

## Component Usage

### Basic Usage

```jsx
import { Button, Badge, Card } from '@shohojdhara/atomix';

export default function HomePage() {
  return (
    <div>
      <Card>
        <h1>Welcome to Atomix with Next.js</h1>
        <Badge variant="primary">New</Badge>
        <Button onClick={() => alert('Hello!')}>
          Click me
        </Button>
      </Card>
    </div>
  );
}
```

### Server-Side Rendering (SSR) Compatible

All Atomix components are SSR-compatible. However, some components with dynamic behavior should be rendered client-side:

```jsx
'use client'; // Add this for client-side components

import { Modal, Dropdown, DatePicker } from '@shohojdhara/atomix';

export default function ClientComponent() {
  return (
    <div>
      <Modal>...</Modal>
      <Dropdown>...</Dropdown>
      <DatePicker>...</DatePicker>
    </div>
  );
}
```

### App Router (Next.js 13+)

For the new App Router, create a client component wrapper:

```jsx
// components/AtomixProvider.jsx
'use client';

import { Button } from '@shohojdhara/atomix';

export { Button };
```

Then import from your wrapper:

```jsx
// app/page.js
import { Button } from '../components/AtomixProvider';

export default function Page() {
  return (
    <main>
      <Button>Hello from App Router</Button>
    </main>
  );
}
```

## TypeScript Support

The package includes full TypeScript support. Import types as needed:

```typescript
import { ButtonProps, BadgeProps } from '@shohojdhara/atomix';

interface MyComponentProps {
  buttonProps: ButtonProps;
  badgeProps: BadgeProps;
}
```

## Styling and Theming

### Custom Theme

You can create custom themes by overriding CSS variables:

```css
/* styles/globals.css */
@import '@shohojdhara/atomix/css';

:root {
  --atomix-primary-color: #your-color;
  --atomix-secondary-color: #your-secondary-color;
}
```

### Dark Mode

Atomix supports dark mode out of the box. Use Next.js's `next-themes` for theme switching:

```bash
npm install next-themes
```

```jsx
// components/ThemeProvider.jsx
'use client';

import { ThemeProvider } from 'next-themes';

export function AtomixThemeProvider({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}
```

## Performance Optimization

### Tree Shaking

Import only the components you need for better bundle size:

```javascript
// ✅ Good - Tree shaking works
import { Button } from '@shohojdhara/atomix';

// ❌ Avoid - Imports everything
import * as Atomix from '@shohojdhara/atomix';
```

### Dynamic Imports

For large components, use dynamic imports:

```jsx
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('@shohojdhara/atomix').then(mod => ({ default: mod.Chart })), {
  ssr: false,
  loading: () => <p>Loading chart...</p>
});
```

## Troubleshooting

### Common Issues

1. **CSS not loading**: Make sure you've imported the CSS file in `_app.js` or `layout.js`
2. **Hydration mismatch**: Use `'use client'` directive for interactive components
3. **Module resolution errors**: Add `@shohojdhara/atomix` to `transpilePackages` in `next.config.js`

### Error: "Cannot resolve module"

If you encounter module resolution errors, add this to your `next.config.js`:

```javascript
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  transpilePackages: ['@shohojdhara/atomix'],
};
```

### CSS Variables Not Working

Make sure you're importing the CSS before your custom styles:

```javascript
// pages/_app.js
import '@shohojdhara/atomix/css'; // Import this first
import '../styles/globals.css';   // Then your custom styles
```

## Examples

Check out our example repositories:

- [Next.js 13 App Router Example](https://github.com/your-org/atomix-nextjs-app-router)
- [Next.js 12 Pages Router Example](https://github.com/your-org/atomix-nextjs-pages-router)

## Support

If you encounter any issues, please:

1. Check this integration guide
2. Search existing [GitHub issues](https://github.com/Shohojdhara/atomix/issues)
3. Create a new issue with reproduction steps

## Version Compatibility

| Next.js Version | Atomix Version | Status |
|----------------|----------------|---------|
| 13.x           | 0.2.x+         | ✅ Supported |
| 12.x           | 0.2.x+         | ✅ Supported |
| 11.x           | 0.2.x+         | ⚠️ Limited Support |

For older Next.js versions, you may need additional configuration.
