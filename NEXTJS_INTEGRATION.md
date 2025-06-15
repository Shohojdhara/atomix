# Next.js Integration Guide

This guide explains how to integrate Atomix Design System with Next.js applications, including support for Server-Side Rendering (SSR) and App Router.

## Installation

```bash
npm install @shohojdhara/atomix
# or
yarn add @shohojdhara/atomix
# or
pnpm add @shohojdhara/atomix
```

## Basic Setup

### 1. Import Styles

Add the Atomix CSS to your Next.js application:

#### App Router (app directory)
```tsx
// app/layout.tsx
import '@shohojdhara/atomix/css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

#### Pages Router (pages directory)
```tsx
// pages/_app.tsx
import '@shohojdhara/atomix/css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

### 2. Use Components

```tsx
// app/page.tsx or pages/index.tsx
import { Button, Hero, Card } from '@shohojdhara/atomix'

export default function HomePage() {
  return (
    <div>
      <Hero
        title="Welcome to Next.js with Atomix"
        subtitle="Modern UI Components"
        text="Build beautiful applications with Atomix Design System"
        alignment="center"
      />
      
      <div className="o-container u-py-5">
        <Card>
          <div className="c-card__body">
            <h3 className="c-card__title">Getting Started</h3>
            <p className="c-card__text">
              Start building with Atomix components in your Next.js application.
            </p>
            <Button variant="primary" label="Learn More" />
          </div>
        </Card>
      </div>
    </div>
  )
}
```

## Advanced Configuration

### Next.js Configuration

Create or update your `next.config.js` file:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Atomix package for better compatibility
  transpilePackages: ['@shohojdhara/atomix'],
  
  // Configure webpack for custom assets
  webpack: (config) => {
    // Handle SCSS files from Atomix
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass-embedded'),
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
```

### TypeScript Configuration

Ensure your `tsconfig.json` includes proper module resolution:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "preserve"
  }
}
```

## Server-Side Rendering (SSR) Support

Atomix components are fully compatible with Next.js SSR. All components render correctly on the server and hydrate properly on the client.

### Dynamic Imports (if needed)

For components with client-side only features, use dynamic imports:

```tsx
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(
  () => import('@shohojdhara/atomix').then(mod => mod.ComponentName),
  { ssr: false }
)
```

## Styling Options

### 1. Using Pre-built CSS

```tsx
import '@shohojdhara/atomix/css'
// or minified version
import '@shohojdhara/atomix/css/min'
```

### 2. Using SCSS (for customization)

```scss
// styles/globals.scss
@import '@shohojdhara/atomix/scss';

// Your custom overrides
:root {
  --atomix-primary-color: #your-brand-color;
}
```

### 3. CSS Modules Support

Atomix works seamlessly with Next.js CSS Modules:

```tsx
// components/MyComponent.module.scss
.container {
  @apply u-p-4 u-bg-primary-subtle;
}

.title {
  @apply c-hero__title;
}
```

## Theme Configuration

### Dark Mode Support

```tsx
// app/layout.tsx
'use client'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-atomix-theme', theme)
  }, [theme])

  return (
    <html lang="en" data-atomix-theme={theme}>
      <body>{children}</body>
    </html>
  )
}
```

### Custom Theme Variables

```css
/* styles/globals.css */
:root {
  /* Primary Colors */
  --atomix-primary-50: #eff6ff;
  --atomix-primary-500: #3b82f6;
  --atomix-primary-900: #1e3a8a;
  
  /* Custom spacing */
  --atomix-spacing-xs: 0.25rem;
  --atomix-spacing-sm: 0.5rem;
  --atomix-spacing-md: 1rem;
}
```

## Performance Optimization

### Tree Shaking

Atomix supports tree shaking out of the box. Import only the components you need:

```tsx
// ✅ Good - tree shaking works
import { Button, Card } from '@shohojdhara/atomix'

// ❌ Avoid - imports entire library
import * as Atomix from '@shohojdhara/atomix'
```

### Bundle Analysis

Use Next.js bundle analyzer to check your bundle size:

```bash
npm install --save-dev @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

## Common Issues and Solutions

### 1. CSS Not Loading

Make sure to import the CSS file in your root layout or _app file:

```tsx
import '@shohojdhara/atomix/css'
```

### 2. TypeScript Errors

Ensure you have the latest TypeScript definitions:

```bash
npm install --save-dev @types/react @types/react-dom
```

### 3. Hydration Mismatches

For components with dynamic content, use the `suppressHydrationWarning` prop:

```tsx
<div suppressHydrationWarning>
  {/* Dynamic content */}
</div>
```

### 4. Font Loading Issues

If using custom fonts, add them to your Next.js font optimization:

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

## Example Projects

### Minimal Setup

```tsx
// app/page.tsx
import { Button, Hero } from '@shohojdhara/atomix'

export default function Home() {
  return (
    <Hero
      title="Hello Next.js + Atomix"
      actions={<Button variant="primary" label="Get Started" />}
    />
  )
}
```

### Full Application Structure

```
my-nextjs-app/
├── app/
│   ├── layout.tsx          # Import Atomix CSS here
│   ├── page.tsx           # Use Atomix components
│   └── globals.css        # Custom theme variables
├── components/
│   └── ui/                # Your custom components using Atomix
├── next.config.js         # Next.js configuration
└── package.json
```

## Migration from Other UI Libraries

If you're migrating from other UI libraries, Atomix provides similar components with consistent APIs. Check our [Component Migration Guide](./MIGRATION.md) for specific mappings.

## Support

- [Documentation](https://liimonx.github.io/atomix)
- [Storybook](https://liimonx.github.io/atomix/storybook)
- [GitHub Issues](https://github.com/liimonx/atomix/issues)

## Contributing

See our [Contributing Guide](./CONTRIBUTING.md) for information on how to contribute to Atomix.