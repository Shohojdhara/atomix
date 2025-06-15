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

## Quick Start

### Next.js Integration

```tsx
// app/layout.tsx (App Router)
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

```tsx
// app/page.tsx
import { Button, Hero, Card } from '@shohojdhara/atomix'

export default function HomePage() {
  return (
    <Hero
      title="Welcome to Next.js with Atomix"
      subtitle="Modern UI Components"
      alignment="center"
      actions={<Button variant="primary" label="Get Started" />}
    />
  )
}
```

For detailed Next.js integration guide, see [NEXTJS_INTEGRATION.md](./NEXTJS_INTEGRATION.md).

### React Applications

```tsx
// Import CSS
import '@shohojdhara/atomix/css'

// Import components
import { Button, Card, Modal } from '@shohojdhara/atomix'

function App() {
  return (
    <div>
      <Card>
        <div className="c-card__body">
          <h3 className="c-card__title">Welcome to Atomix</h3>
          <p className="c-card__text">Modern UI components for React</p>
          <Button variant="primary" label="Get Started" />
        </div>
      </Card>
    </div>
  )
}
```

## Usage Options

### Import Styles

```tsx
// Default CSS
import '@shohojdhara/atomix/css'

// Minified CSS
import '@shohojdhara/atomix/css/min'

// SCSS for customization
import '@shohojdhara/atomix/scss'
```

### Import Components

```tsx
// Named imports (recommended for tree shaking)
import { Button, Card, Modal } from '@shohojdhara/atomix'

// Default import
import Atomix from '@shohojdhara/atomix'
const { Button, Card } = Atomix
```

### TypeScript Support

```tsx
import { ButtonProps, CardProps, Size, ThemeColor } from '@shohojdhara/atomix'

// Component with typed props
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

## Available Components

### Core Components
- **Button** - Versatile button component with multiple variants
- **Card** - Flexible content container
- **Badge** - Status and labeling component
- **Avatar** - User profile images and placeholders

### Navigation
- **Navbar** - Application navigation bar
- **Breadcrumb** - Navigation breadcrumbs
- **Pagination** - Data pagination controls
- **Steps** - Step-by-step navigation

### Form Components
- **Input** - Text input fields
- **Select** - Dropdown selection
- **Checkbox** - Checkbox inputs
- **Radio** - Radio button inputs
- **Toggle** - Switch toggle controls

### Feedback
- **Modal** - Dialog and overlay modals
- **Tooltip** - Contextual tooltips
- **Popover** - Rich contextual popovers
- **Messages** - Alert and notification messages
- **Progress** - Progress indicators

### Data Display
- **DataTable** - Feature-rich data tables
- **List** - Structured lists
- **Accordion** - Collapsible content sections
- **Tabs** - Tabbed content organization

### Layout
- **Hero** - Hero sections with background support
- **Grid** - Responsive grid system
- **Container** - Content containers

And many more! See our [Storybook](https://liimonx.github.io/atomix/storybook) for the complete component library.

## Customization

### CSS Variables

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