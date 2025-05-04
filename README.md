# Atomix Design System

A modern, lightweight, and customizable design system for building beautiful user interfaces.

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

Build the components library (vanilla JS):

```bash
npm run build:components
```

Watch for changes during development:

```bash
npm run dev:components
```

The built files will be available in the `dist/lib` folder.

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

The built files will be available in the `dist/docs` folder.

### Storybook

The design system also includes Storybook for component development and testing:

```bash
npm run storybook
```

This will start Storybook at http://localhost:6006.

Build Storybook:

```bash
npm run build-storybook
```

## Deployment

### Deploying to GitHub Pages

#### Automatic Deployment

The project supports a combined deployment approach that includes both:
- The documentation site at `/docs`
- Storybook at `/storybook`

To build and deploy everything to GitHub Pages:

```bash
npm run deploy
```

This command:
1. Builds the documentation site
2. Builds Storybook
3. Prepares a unified deployment directory
4. Deploys to GitHub Pages

#### Manual Deployment

If you encounter permission issues with GitHub, follow these steps:

1. Prepare the deployment files:
   ```bash
   npm run predeploy
   ```

2. Switch to the gh-pages branch:
   ```bash
   git checkout gh-pages
   ```

3. Copy files from the deploy directory:
   ```bash
   # Remove existing files (be careful!)
   rm -rf docs storybook index.html
   
   # Copy new files
   cp -r deploy/* .
   ```

4. Commit and push:
   ```bash
   git add .
   git commit -m "Update GitHub Pages"
   git push origin gh-pages
   ```

5. Switch back to the main branch:
   ```bash
   git checkout main
   ```

After deployment, the site will be available at:
- Documentation: https://liimonx.github.io/atomix/docs/
- Storybook: https://liimonx.github.io/atomix/storybook/

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Development

- `npm run storybook`: Start Storybook development server
- `npm run build-storybook`: Build Storybook for production
- `npm run dev`: Start development server
- `npm run build`: Build the project for production

## Components

The design system includes the following components:

- Button: A versatile button component with primary and secondary variants

More components will be added as the design system grows.
