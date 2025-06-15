# Atomix Design System

Atomix is a modern component library for Web, React and Next.js applications with full SSR support. It provides a comprehensive set of UI components built with accessibility, performance, and developer experience in mind.

## Features

- 🚀 **Next.js Compatible** - Full SSR support with App Router
- 🎨 **Modern Design** - Clean and contemporary design aesthetic
- 📱 **Responsive** - Mobile-first responsive components
- 🌓 **Theme Support** - Built-in dark/light theme support
- ♿ **Accessible** - WCAG compliant components
- 🛠️ **Customizable** - Extensive customization options
- 📦 **Tree Shakeable** - Import only what you need
- 🔧 **TypeScript** - Full TypeScript support

## Webpack 5 & Next.js Compatibility

Atomix is fully compatible with Webpack 5 and Next.js (including Turbopack). For projects using Webpack 5 or Next.js, you may need to add the following configuration to handle Node.js core modules:

```js
// For Next.js (in next.config.js)
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle TypeScript declaration files
    config.module.rules.push({
      test: /\.d\.ts$/,
      use: ['ignore-loader'],
      exclude: /node_modules/,
    });

    // Ignore TypeScript declaration file warnings
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /\.d\.ts$/ }
    ];

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false, // Provide empty mock for crypto
      };
    }
    return config;
  },
  transpilePackages: ['@shohojdhara/atomix'],
};

// For Webpack 5 (in webpack.config.js)
module.exports = {
  resolve: {
    fallback: {
      crypto: false, // Provide empty mock for crypto
    },
  },
  // Fix TypeScript declaration files issues
  ignoreWarnings: [
    {
      module: /\.d\.ts$/,
    },
  ],
};
```

## Installation

```bash
npm install @shohojdhara/atomix
# or
yarn add @shohojdhara/atomix
# or
pnpm add @shohojdhara/atomix
```

## Usage

```tsx
import { Button } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css'; // Import styles

function App() {
  return (
    <Button variant="primary">Click Me</Button>
  );
}
```

## CSS Variables

```css
:root {
  /* Primary Colors */
  --atomix-primary-50: #eff6ff;
  --atomix-primary-500: #3b82f6;
  --atomix-primary-900: #1e3a8a;
  
  /* Spacing */
  --atomix-spacing-xs: 0.25rem;
  --atomix-spacing-sm: 0.5rem;
  --atomix-spacing-md: 1rem;
}
```

### Theme Support

```tsx
// Set theme programmatically
document.documentElement.setAttribute('data-atomix-theme', 'dark')

// Or use CSS
html[data-atomix-theme="dark"] {
  /* Dark theme styles */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Documentation

- 📚 [Full Documentation](https://liimonx.github.io/atomix)
- 🎨 [Storybook](https://liimonx.github.io/atomix/storybook)
- 🚀 [Next.js Integration Guide](./NEXTJS_INTEGRATION.md)
- 📝 [Contributing Guide](./CONTRIBUTING.md)

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

MIT © [liimonx](https://github.com/liimonx)

## Support

- [GitHub Issues](https://github.com/liimonx/atomix/issues)
- [Discussions](https://github.com/liimonx/atomix/discussions)

## Quick Start

### Next.js Integration

```