# Atomix CLI Documentation

> Complete documentation for the Atomix Design System CLI

## 📚 Documentation Index

### Getting Started

1. **[User Guide](./CLI_USER_GUIDE.md)**  
   Complete guide for using the Atomix CLI, including all commands, options, and examples.

2. **[Quick Start](./CLI_USER_GUIDE.md#quick-start)**  
   Get up and running with Atomix in minutes.

### Reference Documentation

3. **[API Reference](./CLI_API_REFERENCE.md)**  
   Programmatic API for CLI utilities, validation functions, and TypeScript support.

4. **[Security Guide](./CLI_SECURITY_GUIDE.md)**  
   Security features, best practices, and vulnerability prevention.

5. **[Migration Guide](./CLI_MIGRATION_GUIDE.md)**  
   Migrate from Tailwind, Bootstrap, or SCSS variables to Atomix.

### Development

6. **[CLI Reference](./CLI_REFERENCE.md)**  
   Original CLI reference documentation.

7. **[Enhanced CLI Reference](./CLI_ENHANCED_REFERENCE.md)**  
   Enhanced version with additional features.

---

## 🚀 Quick Links

### Installation
```bash
npm install @shohojdhara/atomix
```

### Basic Commands
```bash
# Initialize new project
npx atomix init

# Generate component
npx atomix generate component Button

# Build theme
npx atomix build-theme themes/my-theme

# Start development
npx atomix dev themes/my-theme --watch
```

### Getting Help
```bash
# Show help
npx atomix --help

# Command-specific help
npx atomix generate --help

# Check system
npx atomix doctor
```

---

## 📖 Documentation Overview

### For Users

- **[User Guide](./CLI_USER_GUIDE.md)** - Complete command reference with examples
- **[Migration Guide](./CLI_MIGRATION_GUIDE.md)** - Migrate from other frameworks
- **[Security Guide](./CLI_SECURITY_GUIDE.md)** - Security best practices

### For Developers

- **[API Reference](./CLI_API_REFERENCE.md)** - Use CLI utilities in your code
- **[Security Guide](./CLI_SECURITY_GUIDE.md)** - Implement secure patterns

### Command Categories

#### 🏗️ Project Setup
- `init` - Interactive project setup
- `doctor` - System diagnostics

#### 🎨 Generation
- `generate component` - Create components
- `generate token` - Create design tokens

#### 🎯 Theme Management
- `build-theme` - Compile themes
- `theme create` - Create new themes
- `theme validate` - Validate themes

#### 📦 Token Management
- `tokens list` - List all tokens
- `tokens export` - Export tokens
- `tokens validate` - Validate tokens

#### 🔄 Migration
- `migrate tailwind` - From Tailwind CSS
- `migrate bootstrap` - From Bootstrap
- `migrate scss-variables` - From SCSS variables

#### ✅ Validation
- `validate` - Validate everything
- `validate --tokens` - Token validation
- `validate --a11y` - Accessibility checks

---

## 🔒 Security Features

The Atomix CLI includes comprehensive security features:

- **Path Validation** - Prevents directory traversal attacks
- **Input Sanitization** - Removes dangerous shell characters
- **No eval()** - Safe parsing without code execution
- **Sensitive File Protection** - Blocks access to `.env`, `.git`, etc.

Learn more in the [Security Guide](./CLI_SECURITY_GUIDE.md).

---

## 🎯 Features

### Component Generation
- TypeScript/JavaScript support
- SCSS with BEM methodology
- Storybook stories
- Optional test files
- Automatic barrel exports

### Theme Building
- SCSS compilation
- Hot reload in watch mode
- Source maps for debugging
- Minification for production
- Bundle analysis

### Design Tokens
- Generate token templates
- Import/export tokens
- Multiple format support (JSON, CSS, SCSS, JS, TS)
- Token validation

### Framework Migration
- Automated class mapping
- Configuration migration
- Detailed reports
- Backup creation
- Validation after migration

---

## 📊 CLI Improvements (v0.3.4)

Recent improvements to the CLI include:

### ✅ Completed
- ✨ **Token Generation** - Full implementation of design token generation
- 🔒 **Security Enhancements** - Path validation, input sanitization, safe parsing
- 🐛 **Bug Fixes** - Fixed imports and dependencies
- 🧪 **Test Suite** - Comprehensive unit and integration tests
- 📚 **Documentation** - Complete user and API documentation

### 🔮 Future Enhancements
- Module splitting for better maintainability
- Performance optimizations
- Additional migration frameworks
- Enhanced error recovery

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](../CONTRIBUTING.md) and follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request

---

## 📞 Support

- **Documentation:** [atomix.design](https://atomix.design)
- **Issues:** [GitHub Issues](https://github.com/shohojdhara/atomix/issues)
- **Discord:** [Join our community](https://discord.gg/atomix)
- **Email:** support@atomix.design

---

**Version:** 0.3.4  
**Last Updated:** December 2024  
**License:** MIT
