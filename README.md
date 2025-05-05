# Atomix Design System

A modern, lightweight, and customizable design system for building beautiful user interfaces. Built with a focus on scalability, extensibility, and maintainability.

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
- **Hero**: A flexible hero component with:
  - Left/right/center alignment options
  - Foreground and background image support
  - Overlay options for background images
  - Custom content width control
  - Full viewport height option

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
