# Atomix Design System

> A modern, extensible design system for building scalable web applications

[![npm version](https://img.shields.io/npm/v/@shohojdhara/atomix.svg)](https://www.npmjs.com/package/@shohojdhara/atomix)
[![License](https://img.shields.io/npm/l/@shohojdhara/atomix.svg)](LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@shohojdhara/atomix.svg)](https://www.npmjs.com/package/@shohojdhara/atomix)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Theming](#theming)
  - [React Integration](#react-integration)
- [Components](#components)
- [API](#api)
- [Migration Guide](#migration-guide)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🚀 **Fast & Lightweight** - Tree-shaking ready with minimal bundle impact
- 🎨 **Themeable** - Advanced theme system with CSS variable support
- ♿ **Accessible** - Built with WCAG accessibility standards in mind
- 📱 **Responsive** - Mobile-first responsive design
- 🔧 **Customizable** - Easy to customize and extend
- 🧩 **Modular** - Pick only the components you need
- 🔒 **TypeScript** - Full TypeScript support with definitions
- 🛠 **Framework Agnostic** - Works with React, Vue, vanilla JS, etc.

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

```tsx
import { Button } from '@shohojdhara/atomix/components';
import '@shohojdhara/atomix/styles/index.css';

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('Hello Atomix!')}>
      Click me
    </Button>
  );
}
```

### Theming

Atomix provides a flexible theme system that supports both CSS and JavaScript themes:

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

For React applications, we provide a complete set of hooks and context providers:

```tsx
import { useTheme } from '@shohojdhara/atomix/theme';

function MyComponent() {
  const { theme, setTheme, availableThemes } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <select 
        value={theme} 
        onChange={(e) => setTheme(e.target.value)}
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

The library includes over 50+ components including:

- **Layout**: Grid, Container, Section
- **Navigation**: Navbar, Breadcrumb, Pagination
- **Forms**: Input, Button, Select, Checkbox, Radio
- **Feedback**: Alert, Modal, Tooltip, Toast
- **Data Display**: Table, Card, Badge, Avatar
- **Surfaces**: Accordion, Tabs, Expansion Panel

For a complete list, see [components documentation](./src/components/).

## API

- [v2.0.0 Migration Guide](./MIGRATION_V2.md)
- [Components API](./docs/components/README.md)
- [Theme System](./docs/THEME_SYSTEM.md)
- [CLI Reference](./docs/CLI_API_REFERENCE.md)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

MIT © [Shohojdhara](https://github.com/shohojdhara)
