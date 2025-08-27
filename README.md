# Atomix Design System

> A modern, accessible design system and component library for building beautiful user interfaces.

[![npm version](https://img.shields.io/npm/v/@shohojdhara/atomix)](https://www.npmjs.com/package/@shohojdhara/atomix)
[![License](https://img.shields.io/npm/l/@shohojdhara/atomix)](https://github.com/Shohojdhara/atomix/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@shohojdhara/atomix)](https://www.npmjs.com/package/@shohojdhara/atomix)

## Overview

Atomix is a modern, accessible design system and component library for building beautiful user interfaces. It provides a comprehensive set of 40+ production-ready components with consistent design language, accessibility compliance, and performance optimization.

### Key Features

- **40+ Production-Ready Components**: Buttons, cards, forms, navigation, and more
- **Design System Compliance**: Consistent design language with design tokens
- **Accessibility First**: WCAG 2.1 AA compliant components
- **TypeScript Support**: Full TypeScript definitions for all components
- **Responsive Design**: Mobile-first responsive components
- **Dark Mode Support**: Built-in dark mode support for all components
- **Tree-Shaking Support**: Optimized for modern bundlers
- **Multiple Themes**: Multiple built-in themes with easy customization
- **React & Vanilla JavaScript**: Support for both React and vanilla JavaScript

## Installation

```bash
npm install @shohojdhara/atomix
```

## Usage

### React

```jsx
import { Button } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';

function App() {
  return <Button variant="primary">Hello World</Button>;
}
```

## Styles

Atomix provides comprehensive styling through CSS or SCSS:

### CSS

```js
// Import the main CSS file
import '@shohojdhara/atomix/css';

// Or import the minified version
import '@shohojdhara/atomix/css/min';
```

### SCSS

```scss
// Import the main SCSS file
@use '~@shohojdhara/atomix/scss' as atomix;

// Or import individual modules
@use '~@shohojdhara/atomix/scss/settings' as settings;
@use '~@shohojdhara/atomix/scss/tools' as tools;
@use '~@shohojdhara/atomix/scss/components' as components;
```

## Themes

Atomix comes with multiple built-in themes:

```js
// Import a specific theme
import '@shohojdhara/atomix/themes/boomdevs';

// Or use the theme switcher
import { ThemeSwitcher } from '@shohojdhara/atomix';

function App() {
  return (
    <ThemeSwitcher>
      <Button variant="primary">Themed Button</Button>
    </ThemeSwitcher>
  );
}
```

Available themes:
- Default (shaj-default)
- BoomDevs
- Esrar
- Mashroom
- Yabai

## Build Process

The Atomix Design System uses a comprehensive build process to generate optimized assets:

### Main Build

```bash
npm run build
```

This command will:
1. Build the main JavaScript library (ESM and CJS formats)
2. Generate TypeScript definitions
3. Build the main CSS styles (`dist/atomix.css` and `dist/atomix.min.css`)
4. Build all themes in `dist/themes/`

### Individual Builds

```bash
# Build only the main styles
npm run build:styles

# Build only the themes
npm run build:themes

# Build only the main library
npm run rollup -c
```

### Development

```bash
# Start Storybook for component development
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage
npm run test:coverage
```

## Components

Atomix provides 40+ production-ready components organized into categories:

- **Actions**: [Button](src/components/Button), [Dropdown](src/components/Dropdown), [Pagination](src/components/Pagination)
- **Data Display**: [Badge](src/components/Badge), [Card](src/components/Card), [Table](src/components/Table)
- **Feedback**: [Alert](src/components/Alert), [Loader](src/components/Loader), [Progress](src/components/Progress)
- **Forms**: [Checkbox](src/components/Checkbox), [Input](src/components/Input), [Select](src/components/Select)
- **Navigation**: [Breadcrumb](src/components/Breadcrumb), [Navbar](src/components/Navbar), [Tabs](src/components/Tabs)
- **Surfaces**: [Accordion](src/components/Accordion), [Callout](src/components/Callout), [Modal](src/components/Modal)
- **Utilities**: [ColorModeToggle](src/components/ColorModeToggle), [Portal](src/components/Portal), [ThemeProvider](src/components/ThemeProvider)

## Design Tokens

Atomix uses design tokens for consistent design language:

- **Colors**: Consistent color palette with light and dark mode variants
- **Spacing**: Consistent spacing scale based on 4px grid
- **Typography**: Consistent typography scale with responsive adjustments
- **Borders**: Consistent border radius and width system
- **Shadows**: Consistent shadow system for depth and elevation

## Accessibility

All Atomix components are built with accessibility in mind:

- **WCAG 2.1 AA Compliant**: All components meet WCAG 2.1 AA standards
- **Keyboard Navigation**: Full keyboard navigation support
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML
- **Focus Management**: Consistent focus indicators and management
- **Color Contrast**: Proper color contrast ratios for readability

## Browser Support

Atomix supports all modern browsers:

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) for details on our code of conduct and development process.

## License

Apache 2.0 © [Shohojdhara](https://github.com/Shohojdhara)