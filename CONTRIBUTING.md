
# Contributing to Atomix

We're excited that you're interested in contributing to Atomix! This document outlines the guidelines for contributing to the project. By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

There are many ways to contribute to Atomix, including:

- **Reporting bugs**: If you find a bug, please open an issue and provide a detailed description of the problem.
- **Suggesting enhancements**: If you have an idea for a new feature or an improvement to an existing one, please open an issue to discuss it.
- **Submitting pull requests**: If you'd like to contribute code, please open a pull request with your changes.

## Development Setup

To get started with development, you'll need to have Node.js and yarn installed on your machine. Then, follow these steps:

1. **Fork the repository**: Fork the repository to your own GitHub account.
2. **Clone the repository**: Clone your forked repository to your local machine.
3. **Install dependencies**: Run `npm install` or `yarn install` to install the project dependencies.
4. **Start the development server**: Run `npm run dev` or `yarn dev` to start the Storybook development server.

## Build System

Atomix uses Rollup for building the library. For detailed information about the build system, see [BUILD_SYSTEM.md](docs/BUILD_SYSTEM.md).

### Testing Builds Locally

Before submitting a pull request, ensure your changes build correctly:

```bash
# Clean previous builds
npm run clean

# Run the build
npm run build

# Or use parallel builds for faster execution
npm run build:parallel

# Verify build outputs
npm run verify:build

# Run build tests
npm run test:build
```

### Build Configuration

- Build configurations are in `rollup/config/`
- TypeScript configurations extend `tsconfig.base.json`
- PostCSS plugins are configured in `rollup/config/postcss.js`

For more details, see the [Build System Documentation](docs/BUILD_SYSTEM.md).

## Pull Request Guidelines

When submitting a pull request, please ensure that:

- **Your code follows the project's coding style**: We use ESLint and Prettier to enforce a consistent coding style. Please run `npm run lint` and `npm run format` before submitting your pull request.
- **Your changes are well-tested**: We use Jest and Testing Library for testing. Please add tests for any new features or bug fixes.
- **Your commit messages are clear and concise**: We use the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages.
- **Your pull request has a clear and descriptive title**: The title of your pull request should be a short summary of the changes you've made.
- **Your pull request has a detailed description**: The description of your pull request should explain the changes you've made and why you've made them.

## Code of Conduct

We have a [Code of Conduct](CODE_OF_CONDUCT.md) that we expect all contributors to follow. Please read it before contributing to the project.

## License

By contributing to Atomix, you agree that your contributions will be licensed under the [Apache-2.0 License](LICENSE).
