# Contributing to Atomix

Thank you for your interest in contributing to Atomix! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

We expect all contributors to follow our [Code of Conduct](./CODE_OF_CONDUCT.md). Please read it before participating.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (version 7 or higher)

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally
   ```bash
   git clone https://github.com/YOUR-USERNAME/atomix.git
   cd atomix
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Set up the development environment
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Organization

- `main` - The main development branch
- `release/*` - Release branches
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

### Working on Features

1. Create a new branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Run tests and linting
   ```bash
   npm run test
   npm run lint
   ```
4. Commit your changes with a descriptive commit message
   ```bash
   git commit -m "feat: add new feature"
   ```
   We follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

5. Push your branch to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

## Pull Request Process

1. Update the README.md or documentation with details of changes if appropriate
2. Update the CHANGELOG.md with details of changes
3. The PR should work with the latest version of the codebase
4. Include screenshots or animated GIFs in your PR if it includes visual changes
5. Link any related issues in the PR description

## Coding Standards

### JavaScript/TypeScript

- We use ESLint for linting
- We follow the Airbnb JavaScript Style Guide with some modifications
- Use TypeScript for all new code
- Document public APIs with JSDoc comments

### CSS/SCSS

- We follow the BEM methodology for CSS naming
- Use SCSS for all styling
- Follow the ITCSS architecture for organizing styles

### Component Guidelines

Please refer to the [Atomix Component Guidelines](./atomix-component-guidelines.md) for detailed information on creating and modifying components.

## Testing

- Write tests for all new features and bug fixes
- Run the test suite before submitting a PR
  ```bash
  npm run test
  ```

## Documentation

- Update documentation for any changes to the API
- Use markdown for documentation
- Include examples for new features

## Release Process

### Version Management

We use semantic versioning for releases. To bump the version:

```bash
# Patch release (bug fixes)
npm run version:patch

# Minor release (new features)
npm run version:minor

# Major release (breaking changes)
npm run version:major
```

### Publishing

For release candidates:

```bash
npm run publish:rc
```

For stable releases:

```bash
npm run publish:latest
```

## Questions?

If you have any questions, please feel free to open an issue or contact the maintainers.

Thank you for contributing to Atomix!