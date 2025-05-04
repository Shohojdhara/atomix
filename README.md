# Atomix Design System

A modern, lightweight, and customizable design system for building beautiful user interfaces. Built with a focus on scalability, extensibility, and maintainability.

## Features

- 🎨 Modern and clean design
- 🚀 Lightweight and performant
- 🛠️ Highly customizable components
- 📚 Comprehensive documentation
- 🧪 Built-in Storybook for component development
- 📱 Responsive and accessible
- 🏗️ Built on SEM (Scalable, Extensible, Maintainable) principles
- 🎯 BIO (BEM, ITCSS, OOCSS) architecture for robust CSS
- 🌓 Built-in dark/light theme support
- 🔄 Consistent component behavior and styling

## Architecture

### SEM Principles

The design system is built on three core principles:

- **Scalable**: Components can be added anywhere in the page without requiring code changes
- **Extensible**: Core functionality remains unchanged while supporting different use cases
- **Maintainable**: Organized structure that follows logical patterns

### BIO Architecture

The design system implements BIO (BEM, ITCSS, OOCSS) for robust CSS architecture:

- **BEM**: Block Element Modifier methodology for clear class naming
  - Blocks: `.c-accordion`
  - Elements: `.c-accordion__trigger`
  - Modifiers: `.c-accordion--light`, `.c-accordion--dark`

- **ITCSS**: Inverted Triangle CSS for managing specificity
  - Handles CSS specificity through ordered layers
  - Enables pattern overrides without conflicts

- **OOCSS**: Object-Oriented CSS for reusable components
  - Multiple classes for flexible styling
  - Example: `class="c-accordion c-accordion--dark c-accordion--single"`

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/liimonx/atomix.git
cd atomix

# Install dependencies
npm install
```

## Development

### Components Library

Build the components library:

```bash
npm run build:components
```

Watch for changes during development:

```bash
npm run dev:components
```

The built files will be available in the `dist` folder.

### Documentation Site

Start the development server to preview the documentation site:

```bash
npm run dev
```

This will start a development server at http://localhost:3000 with hot reloading enabled.

Build the documentation site:

```bash
npm run build:docs
```

### Storybook

The design system includes Storybook for component development and testing:

```bash
npm run storybook
```

This will start Storybook at http://localhost:6006.

Build Storybook:

```bash
npm run build-storybook
```

## Available Components

The design system includes the following components:

- **Button**: A versatile button component with primary and secondary variants
- **Accordion**: A collapsible content component with:
  - Light and dark theme support
  - Single/multiple panel modes
  - Customizable triggers and panels
  - Accessible keyboard navigation
- More components coming soon...

## Development Scripts

- `npm run storybook`: Start Storybook development server
- `npm run build-storybook`: Build Storybook for production
- `npm run dev`: Start development server
- `npm run build`: Build the project for production
- `npm run dev:components`: Watch for component changes
- `npm run build:components`: Build components library
- `npm run build:docs`: Build documentation site

## License

This project is licensed under the MIT License - see the LICENSE file for details.
