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

### Quick Start

The fastest way to start development is using Storybook:

```bash
npm run storybook
```

This will start Storybook at http://localhost:6006, where you can browse and develop components interactively.

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

Start the documentation site development server:

```bash
npm run dev:docs
```

Or with automatic browser opening:

```bash
npm run serve
```

This will start a development server at http://localhost:3000 with hot reloading enabled.

Build the documentation site:

```bash
npm run build:docs
```

### Deployment

Deploy the documentation and Storybook to GitHub Pages:

```bash
npm run deploy
```

This will run the predeploy script to build both the documentation site and Storybook before deploying to GitHub Pages.

## Available Scripts

- `npm run storybook`: Start Storybook development server
- `npm run build-storybook`: Build Storybook for production
- `npm run dev`: Alias for `npm run storybook`
- `npm run build`: Alias for `npm run build:components`
- `npm run build:components`: Build components library
- `npm run dev:components`: Watch for component changes
- `npm run build:docs`: Build documentation site
- `npm run dev:docs`: Start documentation development server
- `npm run serve`: Start documentation server with browser opening
- `npm run predeploy`: Prepare files for deployment
- `npm run deploy`: Deploy to GitHub Pages

## License

This project is licensed under the MIT License - see the LICENSE file for details.
