# Atomix CLI - Enhanced Reference

Complete reference for the enhanced Atomix CLI with integrated theme management.

## Table of Contents

- [Installation](#installation)
- [Global Options](#global-options)
- [Commands](#commands)
  - [Theme Management](#theme-management)
  - [Component Generation](#component-generation)
  - [Theme Building](#theme-building)
  - [Token Management](#token-management)
  - [Migration Tools](#migration-tools)
  - [Validation](#validation)
  - [Diagnostics](#diagnostics)
- [Examples](#examples)
- [Configuration](#configuration)

---

## Installation

```bash
npm install -g @shohojdhara/atomix
# or
npx @shohojdhara/atomix <command>
```

---

## Global Options

```bash
-V, --version    Output the version number
-d, --debug      Enable debug mode (verbose logging)
-h, --help       Display help for command
```

### Debug Mode

Enable detailed logging for troubleshooting:

```bash
atomix <command> --debug
```

---

## Commands

### Theme Management

#### `atomix theme validate`

Validate theme configuration file.

```bash
atomix theme validate [options]
```

**Options:**
- `--config <path>` - Path to theme config file (default: `theme.config.ts`)
- `--strict` - Enable strict validation mode

**Examples:**
```bash
# Validate default config
atomix theme validate

# Validate specific config
atomix theme validate --config custom-theme.config.ts

# Strict validation
atomix theme validate --strict
```

---

#### `atomix theme list`

List all available themes in the configuration.

```bash
atomix theme list
atomix theme ls  # alias
```

**Output:**
```
Available Themes:

  dark-theme
    Name: Dark Theme
    Description: A dark mode theme
    Version: 1.0.0
    Status: stable

  light-theme
    Name: Light Theme
    Description: A light mode theme
    Version: 1.0.0
    Status: stable
```

---

#### `atomix theme inspect <name>`

Inspect a specific theme's configuration and properties.

```bash
atomix theme inspect <name> [options]
```

**Options:**
- `--json` - Output as JSON format

**Examples:**
```bash
# Inspect theme
atomix theme inspect dark-theme

# Get JSON output
atomix theme inspect dark-theme --json
```

---

#### `atomix theme compare <theme1> <theme2>`

Compare two themes side-by-side.

```bash
atomix theme compare <theme1> <theme2>
```

**Examples:**
```bash
atomix theme compare dark-theme light-theme
```

**Output:**
```
Comparing: dark-theme vs light-theme

Differences:

  palette.primary:
    dark-theme: {"main":"#7AFFD7","light":"#A0FFE6"}
    light-theme: {"main":"#00BFA5","light":"#64FFDA"}
```

---

#### `atomix theme export <name>`

Export a theme to JSON file.

```bash
atomix theme export <name> [options]
```

**Options:**
- `-o, --output <path>` - Output file path (default: `<theme-name>.json`)

**Examples:**
```bash
# Export to default location
atomix theme export dark-theme

# Export to specific file
atomix theme export dark-theme --output themes/dark.json
```

---

#### `atomix theme create <name>` ⭐ NEW

Create a new theme with scaffolding.

```bash
atomix theme create <name> [options]
```

**Options:**
- `-t, --type <type>` - Theme type: `css` or `js` (default: `css`)
- `--template <name>` - Use template: `dark`, `light`, `high-contrast`
- `--interactive` - Interactive creation mode
- `-o, --output <path>` - Output directory (default: `./themes`)

**Examples:**
```bash
# Create CSS theme
atomix theme create my-theme

# Create JavaScript theme
atomix theme create my-theme --type js

# Create with template
atomix theme create dark-mode --template dark

# Interactive mode
atomix theme create my-theme --interactive
```

**Generated Structure:**

For CSS themes:
```
themes/my-theme/
├── index.scss       # Theme styles
└── README.md        # Documentation
```

For JS themes:
```
themes/my-theme/
├── index.ts         # Theme definition
└── README.md        # Documentation
```

---

### Component Generation

#### `atomix generate component <name>`

Generate a new component with all necessary files.

```bash
atomix generate component <name> [options]
atomix g component <name> [options]  # alias
atomix g c <name> [options]          # short alias
```

**Options:**
- `-t, --typescript` - Use TypeScript (default: `true`)
- `-s, --story` - Include Storybook story (default: `true`)
- `--test` - Include test file (default: `false`)
- `--scss-module` - Use SCSS modules (default: `false`)
- `--path <path>` - Custom output path (default: `./src/components`)
- `-f, --force` - Overwrite existing files

**Examples:**
```bash
# Generate basic component
atomix generate component Button

# Generate with tests
atomix g c Button --test

# Generate with SCSS modules
atomix g c Card --scss-module

# Custom path
atomix g c Header --path ./src/layout
```

**Generated Files:**
```
src/components/Button/
├── Button.tsx           # Component implementation
├── Button.stories.tsx   # Storybook stories
├── Button.test.tsx      # Tests (if --test)
├── _button.scss         # Styles (or Button.module.scss)
└── index.ts             # Exports
```

---

### Theme Building

#### `atomix build-theme <path>`

Build a theme from SCSS to CSS.

```bash
atomix build-theme <path> [options]
```

**Options:**
- `-o, --output <path>` - Output directory (default: `./dist`)
- `-m, --minify` - Generate minified version (default: `true`)
- `-s, --sourcemap` - Generate source maps (default: `false`)
- `-w, --watch` - Watch for changes and rebuild (default: `false`)
- `--analyze` - Analyze bundle size (default: `false`)

**Examples:**
```bash
# Build theme
atomix build-theme themes/dark-theme

# Build with watch mode
atomix build-theme themes/dark-theme --watch

# Build with analysis
atomix build-theme themes/dark-theme --analyze

# Custom output
atomix build-theme themes/dark-theme --output dist/themes
```

---

#### `atomix dev <theme>`

Start development mode with hot reload.

```bash
atomix dev <theme> [options]
```

**Options:**
- `-o, --output <path>` - Output directory (default: `./dist`)
- `--open` - Open in browser after build

**Examples:**
```bash
# Start dev mode
atomix dev themes/dark-theme

# With browser open
atomix dev themes/dark-theme --open
```

---

### Token Management

#### `atomix tokens list`

List all design tokens.

```bash
atomix tokens list [options]
atomix tokens ls [options]  # alias
```

**Options:**
- `-c, --category <category>` - Filter by category (colors, typography, spacing, etc.)

**Examples:**
```bash
# List all tokens
atomix tokens list

# List color tokens
atomix tokens list --category colors

# List spacing tokens
atomix tokens ls -c spacing
```

---

#### `atomix tokens validate`

Validate design tokens for consistency and best practices.

```bash
atomix tokens validate [options]
atomix tokens check [options]  # alias
```

**Options:**
- `-c, --category <category>` - Validate specific category
- `--dry-run` - Preview validation without changes

**Examples:**
```bash
# Validate all tokens
atomix tokens validate

# Validate colors only
atomix tokens validate --category colors
```

---

#### `atomix tokens export`

Export tokens to different formats.

```bash
atomix tokens export [options]
```

**Options:**
- `-f, --format <format>` - Export format: `json`, `css`, `scss`, `js`, `ts` (required)
- `-o, --output <path>` - Output file path (optional)

**Examples:**
```bash
# Export to JSON
atomix tokens export --format json

# Export to CSS
atomix tokens export --format css --output tokens.css

# Export to TypeScript
atomix tokens export -f ts -o src/tokens.ts
```

---

#### `atomix tokens import`

Import tokens from file.

```bash
atomix tokens import [options]
```

**Options:**
- `-o, --output <path>` - Import file path (required)
- `--dry-run` - Preview import without changes

**Examples:**
```bash
# Import from JSON
atomix tokens import --output tokens.json

# Dry run
atomix tokens import --output tokens.json --dry-run
```

---

### Migration Tools

#### `atomix migrate <from>`

Migrate from other CSS frameworks to Atomix.

```bash
atomix migrate <from> [options]
```

**Supported Sources:**
- `tailwind` - Migrate from Tailwind CSS
- `bootstrap` - Migrate from Bootstrap
- `scss-variables` - Migrate SCSS variables to design tokens

**Options:**
- `-s, --source <path>` - Source directory to migrate (default: `./src`)
- `--dry-run` - Preview changes without modifying files
- `--create-backup` - Create backup before migration (default: `true`)

**Examples:**
```bash
# Migrate from Tailwind
atomix migrate tailwind

# Migrate from Bootstrap with custom source
atomix migrate bootstrap --source ./app

# Dry run migration
atomix migrate tailwind --dry-run

# Migrate SCSS variables
atomix migrate scss-variables --source ./styles
```

---

### Validation

#### `atomix validate [target]`

Validate themes, tokens, or accessibility.

```bash
atomix validate [target] [options]
```

**Options:**
- `--tokens` - Validate design tokens
- `--theme <path>` - Validate specific theme
- `--a11y, --accessibility` - Check accessibility compliance
- `--fix` - Attempt to fix issues automatically

**Examples:**
```bash
# Validate everything
atomix validate

# Validate tokens
atomix validate --tokens

# Validate specific theme
atomix validate --theme themes/dark-theme

# Validate accessibility
atomix validate --a11y

# Auto-fix issues
atomix validate --tokens --fix
```

---

### Initialization

#### `atomix init`

Interactive setup wizard for Atomix.

```bash
atomix init [options]
```

**Options:**
- `--skip-install` - Skip dependency installation

**Examples:**
```bash
# Run setup wizard
atomix init

# Skip installation
atomix init --skip-install
```

**Wizard Steps:**
1. Select project type (React, Next.js, Vanilla, Custom)
2. Choose theming approach (Pre-built, Custom, Default, Skip)
3. Select features (Theme system, Components, Utilities, etc.)
4. Configure options
5. Install dependencies
6. Generate files

---

### Diagnostics

#### `atomix doctor`

Diagnose common issues with Atomix setup.

```bash
atomix doctor
```

**Checks:**
- Node.js version compatibility
- Atomix installation
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

✅ Dependency: react
   Installed

✅ Configuration File
   Configuration found (theme.config.ts)

✅ Theme CLI
   Available

✅ Everything looks good!
```

---

## Examples

### Complete Workflow: Creating a Custom Theme

```bash
# 1. Create a new theme
atomix theme create my-brand --type css

# 2. Edit the theme (customize colors, typography, etc.)
# Edit themes/my-brand/index.scss

# 3. Build the theme
atomix build-theme themes/my-brand --output dist/themes

# 4. Validate the theme
atomix theme validate

# 5. Test in development mode
atomix dev themes/my-brand --open
```

### Component Development Workflow

```bash
# 1. Generate component
atomix generate component ProductCard --test --scss-module

# 2. Develop component
# Edit src/components/ProductCard/ProductCard.tsx

# 3. Run Storybook
npm run storybook

# 4. Test component
npm test ProductCard

# 5. Validate
atomix validate
```

### Migration Workflow

```bash
# 1. Backup your code
git commit -am "Before Atomix migration"

# 2. Preview migration
atomix migrate tailwind --dry-run

# 3. Run migration
atomix migrate tailwind

# 4. Review changes
git diff

# 5. Test application
npm run dev

# 6. Fix any issues
atomix doctor
```

### Token Management Workflow

```bash
# 1. List current tokens
atomix tokens list

# 2. Validate tokens
atomix tokens validate

# 3. Export tokens for documentation
atomix tokens export --format json --output docs/tokens.json

# 4. Export for CSS usage
atomix tokens export --format css --output dist/tokens.css
```

---

## Configuration

### Theme Configuration File

Create `theme.config.ts` in your project root:

```typescript
import type { ThemeConfig } from '@shohojdhara/atomix/theme';

const config: ThemeConfig = {
  themes: {
    'dark-theme': {
      type: 'css',
      name: 'Dark Theme',
      description: 'A dark mode theme',
      version: '1.0.0',
      status: 'stable',
      path: './themes/dark-theme',
    },
    'light-theme': {
      type: 'css',
      name: 'Light Theme',
      description: 'A light mode theme',
      version: '1.0.0',
      status: 'stable',
      path: './themes/light-theme',
    },
  },
  runtime: {
    basePath: '/themes',
    defaultTheme: 'dark-theme',
    enablePersistence: true,
  },
  build: {
    output: {
      directory: 'dist/themes',
      formats: {
        expanded: '.css',
        compressed: '.min.css',
      },
    },
    sass: {
      style: 'expanded',
      sourceMap: true,
      loadPaths: ['src', 'node_modules'],
    },
  },
};

export default config;
```

### CLI Configuration File

Create `.atomixrc` in your project root:

```json
{
  "componentsPath": "./src/components",
  "themesPath": "./themes",
  "outputPath": "./dist",
  "typescript": true,
  "scssModules": false,
  "includeTests": false,
  "includeStories": true
}
```

---

## Troubleshooting

### Common Issues

#### "Theme file not found"
```bash
# Check if file exists
ls themes/my-theme/index.scss

# Verify path in command
atomix build-theme themes/my-theme
```

#### "Component already exists"
```bash
# Use force flag to overwrite
atomix generate component Button --force

# Or delete existing component
rm -rf src/components/Button
```

#### "No themes found in configuration"
```bash
# Create theme config
atomix init

# Or manually create theme.config.ts
```

#### "Theme CLI not available"
```bash
# Check installation
atomix doctor

# Reinstall Atomix
npm install @shohojdhara/atomix
```

---

## Tips & Best Practices

### Performance

1. **Use watch mode during development**
   ```bash
   atomix build-theme themes/my-theme --watch
   ```

2. **Enable source maps for debugging**
   ```bash
   atomix build-theme themes/my-theme --sourcemap
   ```

3. **Analyze bundle size**
   ```bash
   atomix build-theme themes/my-theme --analyze
   ```

### Workflow

1. **Validate before building**
   ```bash
   atomix theme validate && atomix build-theme themes/my-theme
   ```

2. **Use aliases for faster commands**
   ```bash
   atomix g c Button  # Instead of: atomix generate component Button
   atomix theme ls    # Instead of: atomix theme list
   ```

3. **Chain commands with &&**
   ```bash
   atomix tokens validate && atomix tokens export --format css
   ```

### Organization

1. **Keep themes in dedicated directory**
   ```
   themes/
   ├── dark-theme/
   ├── light-theme/
   └── high-contrast/
   ```

2. **Use consistent naming**
   - Themes: `kebab-case` (e.g., `dark-theme`)
   - Components: `PascalCase` (e.g., `Button`)
   - Tokens: `kebab-case` with prefix (e.g., `--atomix-color-primary`)

3. **Document your themes**
   - Include README.md in each theme directory
   - Add usage examples
   - Document customization options

---

## Getting Help

```bash
# General help
atomix --help

# Command-specific help
atomix theme --help
atomix generate --help
atomix tokens --help

# Debug mode for troubleshooting
atomix <command> --debug

# Check system health
atomix doctor
```

---

## Version History

### v2.0.0 (Enhanced CLI)
- ✨ Added unified theme management commands
- ✨ Added `theme create` command
- ✨ Integrated theme devtools CLI
- ✨ Enhanced component generation
- ✨ Improved error messages and suggestions
- ✨ Added `doctor` command for diagnostics
- 🔧 Better watch mode with faster rebuilds
- 📚 Comprehensive documentation

### v1.0.0 (Initial Release)
- Basic theme building
- Component generation
- Token management
- Migration tools

---

## Related Documentation

- [Theme System Guide](./THEME_SYSTEM.md)
- [Component Development](./DEVELOPER_GUIDE.md)
- [Design Tokens](./design-tokens/README.md)
- [Migration Guide](./scss-migration-guide.md)
- [API Reference](./api/README.md)

---

**Need more help?** Check the [full documentation](./README.md) or open an issue on GitHub.

