# Atomix Design System

> A premium, modern, and extensible design system for building next-generation web applications.

[![npm version](https://img.shields.io/npm/v/@shohojdhara/atomix.svg)](https://www.npmjs.com/package/@shohojdhara/atomix)
[![License](https://img.shields.io/npm/l/@shohojdhara/atomix.svg)](LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@shohojdhara/atomix.svg)](https://www.npmjs.com/package/@shohojdhara/atomix)

## Table of Contents

- [Built for Modern Frontend](#built-for-modern-frontend)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Theming](#theming)
  - [React Integration](#react-integration)
- [Components](#components)
- [Utility Classes](#utility-classes)
- [API](#api)
- [Migration Guide](#migration-guide)
- [Contributing](#contributing)
- [License](#license)

## Built for Modern Frontend

Atomix isn't just another UI library—it's built to address the **viral and bleeding-edge trends** where top tech companies and frontend communities are currently focusing:

- **AI-Ready Interfaces:** Pre-optimized layouts and interaction patterns designed specifically for LLM chat interfaces, generative AI dashboards, and agentic workflows.
- **Premium Aesthetics & Glassmorphism:** Move past generic flat design with baked-in support for stunning, hardware-accelerated **Glass UI** (`glass={true}`) and highly refined micro-animations that deliver an instant "wow" factor out-of-the-box.
- **Enterprise SaaS & B2B Scalability:** Carefully crafted for data-dense environments. Atomix excels natively in complex CRMs, high-frequency B2B marketplaces, and sprawling admin dashboards without compromising on performance.
- **Polymorphic Architecture:** Extreme flexibility out of the box. Using the `as` prop, you can seamlessly adapt any component to native HTML or third-party Link components (e.g., Next.js `<Link>`, React Router) while maintaining perfect SEO and semantic structure.

## Features

- 🧊 **Premium Glassmorphism** - Built-in background blurs, sub-borders, and advanced layer compositions right off the shelf.
- 🪄 **Micro-Interactions** - Silky smooth, highly refined CSS animations that feel native and responsive.
- 🎨 **Advanced Theming Engine** - Deep CSS variable integration supporting instant light/dark toggles and dynamic color generation.
- ♿ **A11y-First Development** - Built closely alongside strict WCAG guidelines guaranteeing keyboard navigation and rich ARIA compliance.
- 🏗️ **Polymorphic Components** - Total control over rendered DOM nodes via the polymorphic `as` prop.
- ⚡ **Fast & Lightweight** - Aggressively tree-shakable with an extremely minimal bundle footprint.
- 🛠 **Framework Agnostic Core** - Write once, use everywhere (React, Vue, Vanilla JS, and modern SSR architectures like Next.js and Remix).

## Installation

```bash
npm install @shohojdhara/atomix
# or
yarn add @shohojdhara/atomix
# or
pnpm add @shohojdhara/atomix
```

## Usage

### Basic Usage

Our components come with semantic props to handle layout states easily, reducing the need for arbitrary CSS classes:

```tsx
import { Button } from '@shohojdhara/atomix/components';
import '@shohojdhara/atomix/styles/index.css';

function App() {
  return (
    <Button 
      variant="primary" 
      glass={true} 
      className="u-m-4" 
      onClick={() => console.log('Welcome to Atomix!')}
    >
      Click me
    </Button>
  );
}
```

### Theming

Atomix provides a scalable theme system built on top of CSS variables, allowing robust and dynamic runtime customization:

```tsx
import { ThemeProvider, createTheme } from '@shohojdhara/atomix/theme';

// Create a custom theme
const customTheme = createTheme({
  palette: {
    primary: { main: '#7AFFD7' },
    secondary: { main: '#FF5733' },
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function App() {
  return (
    <ThemeProvider 
      themes={{ 
        'custom-theme': { name: 'Custom Theme', class: 'custom-theme' } 
      }}
      defaultTheme="custom-theme"
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

### React Integration

We provide complete foundational context hooks ensuring your entire React app naturally cascades themes and configs:

```tsx
import { useTheme } from '@shohojdhara/atomix/theme';

function ThemeSwitcher() {
  const { theme, setTheme, availableThemes } = useTheme();
  
  return (
    <div className="u-flex u-items-center u-gap-4">
      <p className="u-text-primary">Current theme: {theme}</p>
      <select 
        value={theme} 
        onChange={(e) => setTheme(e.target.value)}
        className="u-bg-dark u-text-primary u-border u-rounded-sm u-p-2"
      >
        {availableThemes.map(t => (
          <option key={t.class} value={t.class}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

## Components

The library includes over 50+ polymorphic components ensuring absolute layout flexibility out-of-the-box:

- **Layout**: Grid, Container, Section, EdgePanel (with baked-in glass UI)
- **Navigation**: Navbar, Breadcrumb, Pagination
- **Forms**: Input, Button, Select, Checkbox, Radio
- **Feedback**: Alert, Modal, Tooltip, Toast, Loader
- **Data Display**: Table, Card, Badge, Avatar, Masonry Grid
- **Surfaces**: Accordion, Tabs, Expansion Panel

For a complete list, see our [Components Documentation](./src/components/).

## Utility Classes 

Following our strict utility specification, layout modifications and spacing should be done via `u-*` prefixed classes (e.g., `u-m-4`, `u-flex-column`). DO NOT manually write component-specific `.c-*` CSS overrides. Use the component's API primarily, and supplement with our utility directory safely.

## API

- [v2.0.0 Migration Guide](./MIGRATION_V2.md)
- [Components API](./docs/components/README.md)
- [Theme System](./docs/THEME_SYSTEM.md)
- [CLI Reference](./docs/CLI_API_REFERENCE.md)

## Contributing

We welcome structural ideas, architectures, accessibility (A11y) improvements, and premium visual implementations. Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

MIT © [Shohojdhara](https://github.com/shohojdhara)
