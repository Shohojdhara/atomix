# Atomix CLI Reference Guide

**Version:** Enhanced Edition  
**Date:** December 2024

---

## 📦 Installation

The Atomix CLI is automatically available when you install the Atomix design system:

```bash
npm install @shohojdhara/atomix
```

Access the CLI using `npx`:

```bash
npx atomix --help
```

---

## 🚀 Quick Start

```bash
# Initialize a new project with interactive wizard
npx atomix init

# Create and build a custom theme
npx atomix create-theme my-theme
npx atomix build-theme my-theme --watch

# Generate a new component
npx atomix generate component Button --typescript --story

# Migrate from other frameworks
npx atomix migrate tailwind --source ./src
```

---

## 📋 Command Reference

### `atomix init`
**Interactive setup wizard for new projects**

```bash
npx atomix init [options]
```

**Options:**
- `--skip-install` - Skip automatic dependency installation

**Features:**
- Project type selection (React, Next.js, Vanilla)
- Theme configuration
- Feature selection (TypeScript, Storybook, Testing)
- Automatic file generation
- Package.json script setup

**Example:**
```bash
npx atomix init
# Follow the interactive prompts
```

---

### `atomix build-theme`
**Build custom themes from SCSS**

```bash
npx atomix build-theme <path> [options]
```

**Arguments:**
- `<path>` - Path to theme directory or SCSS file

**Options:**
- `-o, --output <path>` - Output directory (default: `./dist`)
- `-m, --minify` - Generate minified version (default: true)
- `-s, --sourcemap` - Generate source maps (default: false)
- `-w, --watch` - Watch for changes and rebuild
- `--analyze` - Analyze bundle size

**Examples:**
```bash
# Build a theme
npx atomix build-theme themes/custom

# Build with watch mode
npx atomix build-theme themes/custom --watch

# Build with analysis
npx atomix build-theme themes/custom --analyze
```

---

### `atomix dev`
**Development mode with hot reload**

```bash
npx atomix dev <theme> [options]
```

**Arguments:**
- `<theme>` - Theme to develop

**Options:**
- `-o, --output <path>` - Output directory (default: `./dist`)
- `--open` - Open in browser after build

**Example:**
```bash
npx atomix dev themes/custom
```

---

### `atomix generate` (alias: `g`)
**Generate design system components**

```bash
npx atomix generate <type> <name> [options]
```

**Arguments:**
- `<type>` - Type to generate (`component`, `token`)
- `<name>` - Name in PascalCase

**Options:**
- `-t, --typescript` - Use TypeScript (default: true)
- `-s, --story` - Include Storybook story (default: true)
- `--test` - Include test file
- `--scss-module` - Use SCSS modules
- `--path <path>` - Custom output path (default: `./src/components`)
- `-f, --force` - Overwrite existing files

**Examples:**
```bash
# Generate a component with all files
npx atomix generate component Button --typescript --story --test

# Short version
npx atomix g c Card --scss-module

# Custom path
npx atomix g component Header --path ./src/layouts
```

**Generated Files:**
```
Button/
├── Button.tsx              # React component
├── Button.module.scss      # Styles (if --scss-module)
├── Button.stories.tsx      # Storybook story (if --story)
├── Button.test.tsx        # Test file (if --test)
└── index.ts               # Exports
```

---

### `atomix validate`
**Validate themes and design tokens**

```bash
npx atomix validate [target] [options]
```

**Arguments:**
- `[target]` - What to validate (`tokens`, `theme`, or path)

**Options:**
- `--tokens` - Validate design tokens
- `--theme <path>` - Validate specific theme
- `--a11y, --accessibility` - Check accessibility compliance
- `--fix` - Attempt to fix issues automatically

**Examples:**
```bash
# Validate all tokens
npx atomix validate --tokens

# Validate specific theme
npx atomix validate --theme themes/custom

# Check accessibility
npx atomix validate --accessibility
```

**Validation Checks:**
- ✅ Token naming conventions
- ✅ No hardcoded values
- ✅ Required imports present
- ✅ SCSS variable defaults
- ✅ Accessibility requirements

---

### `atomix migrate`
**Migrate from other CSS frameworks**

```bash
npx atomix migrate <from> [options]
```

**Arguments:**
- `<from>` - Framework to migrate from (`tailwind`, `bootstrap`, `scss-variables`)

**Options:**
- `-s, --source <path>` - Source directory (default: `./src`)
- `--dry-run` - Preview changes without modifying files
- `--create-backup` - Create backup before migration (default: true)

**Examples:**
```bash
# Migrate from Tailwind
npx atomix migrate tailwind --source ./app

# Migrate from Bootstrap (dry run)
npx atomix migrate bootstrap --dry-run

# Migrate SCSS variables
npx atomix migrate scss-variables
```

**Supported Migrations:**

#### Tailwind → Atomix
```jsx
// Before
<div className="flex items-center p-4 bg-primary rounded-lg">

// After
<div className="u-flex u-items-center u-p-4 c-bg-primary u-rounded-lg">
```

#### Bootstrap → Atomix
```jsx
// Before
<button className="btn btn-primary btn-lg">

// After
<button className="c-btn c-btn-primary c-btn-lg">
```

#### SCSS Variables → Design Tokens
```scss
// Before
$primary: #7AFFD7;
padding: $spacing-md;

// After
var(--atomix-color-primary)
padding: var(--atomix-space-4);
```

---

### `atomix tokens`
**Manage design tokens**

```bash
npx atomix tokens <action> [options]
```

**Actions:**
- `list` (alias: `ls`) - List all design tokens
- `validate` (alias: `check`) - Validate token files
- `export` - Export tokens to various formats
- `import` - Import tokens from file

**Options:**
- `-c, --category <category>` - Token category (colors, typography, spacing)
- `-f, --format <format>` - Export format (json, css, scss, js, ts)
- `-o, --output <path>` - Output file path
- `--dry-run` - Preview changes

**Examples:**
```bash
# List all tokens
npx atomix tokens list

# List specific category
npx atomix tokens list --category colors

# Validate tokens
npx atomix tokens validate

# Export tokens
npx atomix tokens export --format json --output tokens.json
npx atomix tokens export --format css --output tokens.css

# Import tokens
npx atomix tokens import --output my-tokens.json
```

**Token Categories:**
- `colors` - Color palette tokens
- `typography` - Font sizes, weights, families
- `spacing` - Margin and padding scale
- `radius` - Border radius values
- `shadows` - Box shadow definitions
- `breakpoints` - Responsive breakpoints

---

### `atomix create-theme`
**Create a new theme from template**

```bash
npx atomix create-theme <name> [options]
```

**Arguments:**
- `<name>` - Theme name

**Options:**
- `-t, --template <template>` - Template to use (default: `basic`)

**Example:**
```bash
npx atomix create-theme my-brand-theme
```

**Generated Structure:**
```
my-brand-theme/
├── 01-settings/
│   └── _index.scss        # Token overrides
├── 06-components/
│   └── _index.scss        # Component overrides
├── index.scss             # Main theme file
└── README.md             # Documentation
```

---

### `atomix list-themes`
**List available pre-built themes**

```bash
npx atomix list-themes
```

**Available Themes:**
- `shaj-default` - Default theme with light/dark modes
- `flashtrade` - Crypto trading platform theme
- `boomdevs` - Modern dark theme
- `esrar` - Minimal light theme
- `mashroom` - Psychedelic colorful theme
- `applemix` - Apple-inspired glass morphism

---

### `atomix doctor`
**Diagnose common issues**

```bash
npx atomix doctor
```

**Checks:**
- ✅ Node.js version compatibility
- ✅ Atomix installation
- ✅ Required dependencies
- ✅ Configuration files
- ✅ File permissions

**Example Output:**
```
🏥 Atomix Doctor Report

✅ Node.js Version
   v18.12.0 (supported)

✅ Atomix Installation
   Installed correctly

⚠️ Dependency: sass
   Missing (may be required for some features)

💡 Configuration File
   No config file (using defaults)
```

---

### `atomix info`
**Display installation information**

```bash
npx atomix info
```

**Shows:**
- Version information
- License details
- Package exports
- Documentation links

---

## ⚙️ Configuration

### Configuration File

Create `.atomixrc.json` or `atomix.config.js` in your project root:

#### JSON Configuration (`.atomixrc.json`)
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

#### JavaScript Configuration (`atomix.config.js`)
```javascript
module.exports = {
  theme: {
    name: process.env.ATOMIX_THEME || 'custom',
    outputDir: './dist/themes',
    minify: process.env.NODE_ENV === 'production',
    sourceMaps: process.env.NODE_ENV === 'development',
    watch: process.env.NODE_ENV === 'development'
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
    },
    typography: {
      scale: '1.25',
      baseSize: '16px'
    }
  },
  
  build: {
    clean: true,
    analyze: false,
    report: true
  }
};
```

---

## 🔍 Debug Mode

Enable debug mode for verbose output:

```bash
# Via flag
npx atomix build-theme my-theme --debug

# Via environment variable
ATOMIX_DEBUG=true npx atomix build-theme my-theme
```

Debug mode shows:
- Detailed file operations
- Configuration loading
- Build steps
- Error stack traces

---

## 📝 Common Workflows

### Starting a New Project
```bash
# 1. Initialize project
npx atomix init

# 2. Create custom theme
npx atomix create-theme my-brand

# 3. Build and watch
npx atomix dev my-brand
```

### Migrating Existing Project
```bash
# 1. Backup your code
cp -r src src.backup

# 2. Run migration
npx atomix migrate tailwind --source ./src

# 3. Validate tokens
npx atomix tokens validate

# 4. Build theme
npx atomix build-theme themes/custom
```

### Component Development
```bash
# 1. Generate component
npx atomix g component Card --typescript --story

# 2. Run Storybook
npm run storybook

# 3. Validate design tokens
npx atomix tokens validate
```

### CI/CD Integration
```yaml
# .github/workflows/atomix.yml
name: Atomix CI

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      
      - name: Install dependencies
        run: npm install
      
      - name: Validate tokens
        run: npx atomix tokens validate
      
      - name: Build themes
        run: npx atomix build-theme themes/custom
      
      - name: Run tests
        run: npm test
```

---

## 🚨 Troubleshooting

### Common Issues

#### "Command not found"
```bash
# Ensure Atomix is installed
npm install @shohojdhara/atomix

# Use npx to run
npx atomix --help
```

#### "Theme build fails"
```bash
# Check file paths
npx atomix doctor

# Enable debug mode
npx atomix build-theme my-theme --debug

# Validate tokens
npx atomix tokens validate
```

#### "Migration warnings"
```bash
# Run dry-run first
npx atomix migrate tailwind --dry-run

# Create backup
npx atomix migrate tailwind --create-backup

# Review unmapped classes in report
```

---

## 📚 Best Practices

1. **Always validate tokens** before building themes
2. **Use watch mode** during development
3. **Create backups** before migrations
4. **Follow naming conventions** for components (PascalCase)
5. **Use configuration files** for consistent builds
6. **Enable debug mode** when troubleshooting
7. **Run doctor command** for environment checks

---

## 🔗 Related Documentation

- [Design System Guide](./DESIGN_SYSTEM_GUIDE.md)
- [Theme System](./THEME_SYSTEM.md)
- [Component Development](./COMPONENT_DEVELOPMENT.md)
- [Migration Guide](./MIGRATION_GUIDE.md)

---

## 📞 Support

- **GitHub Issues:** [github.com/shohojdhara/atomix/issues](https://github.com/shohojdhara/atomix/issues)
- **Documentation:** [atomix.design](https://atomix.design)
- **Discord:** [Join our community](https://discord.gg/atomix)

---

**Version:** 0.3.2-enhanced  
**Last Updated:** December 2024



