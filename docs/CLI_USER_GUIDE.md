# Atomix CLI - User Guide

> The official command-line interface for the Atomix Design System

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Commands](#commands)
  - [init](#init---interactive-setup)
  - [generate](#generate---create-components-and-tokens)
  - [build-theme](#build-theme---compile-themes)
  - [theme](#theme---theme-management)
  - [tokens](#tokens---design-token-management)
  - [migrate](#migrate---framework-migration)
  - [validate](#validate---validate-design-system)
  - [doctor](#doctor---system-diagnostics)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

---

## Installation

The Atomix CLI is included when you install the Atomix package:

```bash
npm install @shohojdhara/atomix
```

Access the CLI using `npx`:

```bash
npx atomix --help
```

Or install globally:

```bash
npm install -g @shohojdhara/atomix
atomix --help
```

### Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0

---

## Quick Start

### 1. Initialize a New Project

```bash
npx atomix init
```

This interactive wizard will help you:
- Choose your framework (React, Next.js, Vanilla)
- Select features (TypeScript, Storybook, Testing)
- Configure your theme preferences
- Set up project structure

### 2. Generate a Component

```bash
npx atomix generate component Button
```

Creates a new component with:
- TypeScript/JavaScript component file
- SCSS styles following BEM conventions
- Storybook stories
- Optional test file

### 3. Build Your Theme

```bash
npx atomix build-theme themes/my-theme --watch
```

Compiles your custom theme with:
- Hot reload in watch mode
- Source maps for debugging
- Minified production build

---

## Commands

### `init` - Interactive Setup

Initialize a new Atomix project with an interactive wizard.

```bash
atomix init [options]
```

**Options:**
- `--skip-install` - Skip automatic dependency installation

**Features:**
- Framework selection (React, Next.js, Vanilla JS, Custom)
- Theme configuration
- Feature selection
- Automatic file generation
- npm scripts setup

**Example:**
```bash
# Start the setup wizard
npx atomix init

# Skip npm install
npx atomix init --skip-install
```

---

### `generate` - Create Components and Tokens

Generate components, tokens, and other design system elements.

```bash
atomix generate <type> <name> [options]
atomix g <type> <name> [options]  # Short alias
```

#### Generate Component

```bash
atomix generate component <ComponentName> [options]
atomix g c <ComponentName> [options]  # Short alias
```

**Options:**
- `-t, --typescript` - Use TypeScript (default: true)
- `-s, --story` - Include Storybook story (default: true)
- `--test` - Include test file
- `--scss-module` - Use SCSS modules instead of global styles
- `--path <path>` - Custom output path (default: ./src/components)
- `-f, --force` - Overwrite existing files

**Component Name Rules:**
- Must be in PascalCase
- Start with uppercase letter
- Only letters and numbers
- Minimum 2 characters
- No reserved words (React, Component, etc.)

**Example:**
```bash
# Basic component
atomix generate component Card

# With test file and SCSS modules
atomix g c ProductCard --test --scss-module

# Custom path
atomix g c Header --path ./src/layouts

# Force overwrite
atomix generate component Button --force
```

**Generated Files:**
```
Button/
├── Button.tsx              # React component
├── Button.stories.tsx      # Storybook stories
├── Button.test.tsx         # Test file (if --test)
├── _button.scss           # Styles (or Button.module.scss)
└── index.ts               # Barrel export
```

#### Generate Tokens

```bash
atomix generate token <category> [options]
atomix g t <category> [options]  # Short alias
```

**Categories:**
- `colors` - Color palette tokens
- `spacing` - Spacing scale tokens
- `typography` - Font and text tokens
- `shadows` - Box shadow tokens
- `radius` - Border radius tokens
- `animations` - Animation and transition tokens

**Options:**
- `--path <path>` - Custom output path
- `-f, --force` - Overwrite existing files

**Example:**
```bash
# Generate color tokens
atomix generate token colors

# Generate spacing tokens with force
atomix g t spacing --force

# All token categories
for category in colors spacing typography shadows radius animations; do
  atomix g token $category
done
```

**Generated Token Files:**
- `_settings.colors.custom.scss` - Brand and semantic colors
- `_settings.spacing.custom.scss` - Spacing scale and layout
- `_settings.typography.custom.scss` - Fonts, sizes, weights
- `_settings.box-shadow.custom.scss` - Shadow definitions
- `_settings.border-radius.custom.scss` - Radius scale
- `_settings.animations.custom.scss` - Transitions and animations

---

### `build-theme` - Compile Themes

Build custom themes from SCSS to CSS.

```bash
atomix build-theme <path> [options]
```

**Arguments:**
- `<path>` - Path to theme directory or SCSS file

**Options:**
- `-o, --output <path>` - Output directory (default: ./dist)
- `-m, --minify` - Generate minified version (default: true)
- `-s, --sourcemap` - Generate source maps
- `-w, --watch` - Watch for changes and rebuild
- `--analyze` - Analyze bundle size

**Example:**
```bash
# Build a theme
atomix build-theme themes/dark-theme

# Watch mode with source maps
atomix build-theme themes/dark-theme --watch --sourcemap

# Custom output with analysis
atomix build-theme themes/custom -o dist/themes --analyze

# Build specific SCSS file
atomix build-theme themes/my-theme/index.scss
```

**Output:**
- `{theme-name}.css` - Compiled CSS
- `{theme-name}.min.css` - Minified version (if enabled)
- `{theme-name}.css.map` - Source map (if enabled)

---

### `dev` - Development Mode

Start development mode with hot reload (alias for build-theme --watch).

```bash
atomix dev <theme> [options]
```

**Options:**
- `-o, --output <path>` - Output directory (default: ./dist)
- `--open` - Open in browser after build

**Example:**
```bash
# Start dev mode
atomix dev themes/my-theme

# With browser opening
atomix dev themes/dark-theme --open
```

---

### `theme` - Theme Management

Manage themes with various subcommands.

#### List Themes

```bash
atomix theme list
atomix theme ls  # Alias
```

Shows all configured themes with details.

#### Validate Theme

```bash
atomix theme validate [options]
```

**Options:**
- `--config <path>` - Path to theme config file
- `--strict` - Enable strict validation

#### Inspect Theme

```bash
atomix theme inspect <name> [options]
```

**Options:**
- `--json` - Output as JSON

#### Compare Themes

```bash
atomix theme compare <theme1> <theme2>
```

Shows differences between two themes.

#### Export Theme

```bash
atomix theme export <name> [options]
```

**Options:**
- `-o, --output <path>` - Output file path

#### Create Theme

```bash
atomix theme create <name> [options]
```

**Options:**
- `-t, --type <type>` - Theme type: `css` or `js` (default: css)
- `--template <name>` - Use template: `dark`, `light`, `high-contrast`
- `--interactive` - Interactive creation mode
- `-o, --output <path>` - Output directory (default: ./themes)

**Theme Name Rules:**
- Must be kebab-case
- Start with lowercase letter
- Only lowercase letters, numbers, and hyphens
- No consecutive or trailing hyphens

**Example:**
```bash
# Create CSS theme
atomix theme create my-theme

# Create JavaScript theme
atomix theme create dark-mode --type js

# Use template
atomix theme create high-contrast --template high-contrast

# Interactive mode
atomix theme create custom --interactive
```

---

### `tokens` - Design Token Management

Manage and manipulate design tokens.

```bash
atomix tokens <action> [options]
```

#### List Tokens

```bash
atomix tokens list [options]
atomix tokens ls [options]  # Alias
```

**Options:**
- `-c, --category <category>` - Filter by category

**Example:**
```bash
# List all tokens
atomix tokens list

# List only color tokens
atomix tokens ls --category colors
```

#### Validate Tokens

```bash
atomix tokens validate [options]
atomix tokens check [options]  # Alias
```

**Options:**
- `-c, --category <category>` - Validate specific category
- `--dry-run` - Preview validation without changes

**Validation Checks:**
- Hardcoded values
- Naming conventions
- Missing !default flags
- Token file existence

#### Export Tokens

```bash
atomix tokens export [options]
```

**Options:**
- `-f, --format <format>` - Export format: `json`, `css`, `scss`, `js`, `ts`
- `-o, --output <path>` - Output file path

**Example:**
```bash
# Export as JSON
atomix tokens export --format json -o tokens.json

# Export as CSS custom properties
atomix tokens export --format css -o tokens.css

# Export as TypeScript
atomix tokens export -f ts -o src/tokens.ts
```

#### Import Tokens

```bash
atomix tokens import [options]
```

**Options:**
- `-o, --output <path>` - Import file path (required)
- `--dry-run` - Preview import without changes

**Example:**
```bash
# Import from JSON
atomix tokens import --output my-tokens.json

# Dry run to preview
atomix tokens import --output tokens.json --dry-run
```

---

### `migrate` - Framework Migration

Migrate from other CSS frameworks to Atomix.

```bash
atomix migrate <from> [options]
```

**Supported Frameworks:**
- `tailwind` - Migrate from Tailwind CSS
- `bootstrap` - Migrate from Bootstrap
- `scss-variables` - Migrate SCSS variables to design tokens

**Options:**
- `-s, --source <path>` - Source directory (default: ./src)
- `--dry-run` - Preview changes without modifying files
- `--create-backup` - Create backup before migration (default: true)

**Example:**
```bash
# Migrate from Tailwind
atomix migrate tailwind

# Migrate from Bootstrap with custom source
atomix migrate bootstrap --source ./app

# Dry run to preview changes
atomix migrate tailwind --dry-run

# Migrate without backup (not recommended)
atomix migrate scss-variables --no-create-backup
```

**Migration Report:**
- Files processed
- Classes/variables replaced
- Warnings for unmapped items
- Errors encountered

---

### `validate` - Validate Design System

Validate themes, design tokens, and accessibility.

```bash
atomix validate [target] [options]
```

**Options:**
- `--tokens` - Validate design tokens
- `--theme <path>` - Validate specific theme
- `--a11y, --accessibility` - Check accessibility compliance
- `--fix` - Attempt to fix issues automatically

**Example:**
```bash
# Validate everything
atomix validate

# Validate only tokens
atomix validate --tokens

# Validate specific theme
atomix validate --theme themes/dark-theme

# Check accessibility
atomix validate --a11y

# Auto-fix issues
atomix validate --tokens --fix
```

---

### `doctor` - System Diagnostics

Check your Atomix setup for common issues.

```bash
atomix doctor
```

**Checks:**
- Node.js version compatibility
- Atomix installation status
- Required dependencies
- Configuration files
- Theme CLI availability

**Example Output:**
```
🏥 Atomix Doctor Report

✅ Node.js Version
   v18.17.0 (supported)

✅ Atomix Installation
   Installed correctly

⚠️ Dependency: sass
   Missing (may be required for some features)

✅ Configuration File
   Configuration found (atomix.config.js)

✅ Theme CLI
   Available
```

---

## Configuration

### Configuration Files

Atomix CLI supports multiple configuration formats:

#### `.atomixrc.json`
```json
{
  "theme": {
    "name": "custom",
    "outputDir": "./dist/themes",
    "minify": true,
    "sourceMaps": false
  },
  "components": {
    "style": "scss-module",
    "typescript": true,
    "stories": true,
    "tests": false
  }
}
```

#### `atomix.config.js`
```javascript
module.exports = {
  theme: {
    name: process.env.ATOMIX_THEME || 'custom',
    outputDir: './dist/themes',
    minify: process.env.NODE_ENV === 'production',
    sourceMaps: process.env.NODE_ENV === 'development'
  },
  components: {
    path: './src/components',
    style: 'scss-module',
    typescript: true,
    stories: true,
    tests: true
  },
  tokens: {
    colors: {
      custom: true,
      validate: true
    }
  }
};
```

### Environment Variables

- `ATOMIX_DEBUG=true` - Enable debug mode
- `ATOMIX_THEME=<name>` - Default theme name
- `ATOMIX_SKIP_INSTALL=true` - Skip dependency installation

---

## Examples

### Complete Project Setup

```bash
# 1. Initialize project
npx atomix init

# 2. Create custom theme
npx atomix theme create my-brand

# 3. Generate design tokens
npx atomix g token colors
npx atomix g token spacing
npx atomix g token typography

# 4. Build theme
npx atomix build-theme themes/my-brand

# 5. Start development
npx atomix dev themes/my-brand
```

### Component Library Development

```bash
# Generate multiple components
components=("Button" "Card" "Modal" "Form" "Table")
for comp in "${components[@]}"; do
  npx atomix g c $comp --test
done

# Run Storybook
npm run storybook
```

### Migration Workflow

```bash
# 1. Create backup
git add . && git commit -m "Before Atomix migration"

# 2. Dry run migration
npx atomix migrate tailwind --dry-run

# 3. Run actual migration
npx atomix migrate tailwind

# 4. Validate results
npx atomix validate --tokens

# 5. Build and test
npm run build
```

---

## Troubleshooting

### Common Issues

#### "Command not found"
```bash
# Ensure Atomix is installed
npm install @shohojdhara/atomix

# Use npx
npx atomix --help

# Or install globally
npm install -g @shohojdhara/atomix
```

#### "Theme file not found"
- Check file path is correct
- Ensure file has `.scss` extension
- Verify you're in the correct directory

#### "Component already exists"
- Use `--force` flag to overwrite
- Delete existing component first
- Choose a different name

#### "Invalid component/theme name"
- Components: Use PascalCase (e.g., `MyComponent`)
- Themes: Use kebab-case (e.g., `my-theme`)
- Avoid reserved words

### Debug Mode

Enable detailed logging:

```bash
# Via flag
atomix build-theme my-theme --debug

# Via environment variable
ATOMIX_DEBUG=true atomix validate
```

### Getting Help

```bash
# General help
atomix --help

# Command-specific help
atomix generate --help
atomix theme --help

# Check system
atomix doctor

# Version info
atomix --version
```

---

## Best Practices

1. **Always validate before building**
   ```bash
   atomix validate && atomix build-theme themes/my-theme
   ```

2. **Use watch mode during development**
   ```bash
   atomix dev themes/my-theme
   ```

3. **Create backups before migrations**
   ```bash
   atomix migrate tailwind --create-backup
   ```

4. **Follow naming conventions**
   - Components: `PascalCase`
   - Themes: `kebab-case`
   - Tokens: Follow category patterns

5. **Use configuration files**
   - Store preferences in `.atomixrc.json`
   - Share configs across team

---

## Support

- **GitHub Issues:** [github.com/shohojdhara/atomix/issues](https://github.com/shohojdhara/atomix/issues)
- **Documentation:** [atomix.design](https://atomix.design)
- **Discord:** [Join our community](https://discord.gg/atomix)

---

**Version:** 0.3.4  
**Last Updated:** December 2024
