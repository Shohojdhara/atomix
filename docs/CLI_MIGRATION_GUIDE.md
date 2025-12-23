# Atomix CLI - Migration Guide

> Migrate from other CSS frameworks to Atomix Design System

## Table of Contents

- [Overview](#overview)
- [Supported Migrations](#supported-migrations)
- [Tailwind to Atomix](#tailwind-to-atomix)
- [Bootstrap to Atomix](#bootstrap-to-atomix)
- [SCSS Variables to Design Tokens](#scss-variables-to-design-tokens)
- [Manual Migration](#manual-migration)
- [Post-Migration](#post-migration)

---

## Overview

The Atomix CLI provides automated migration tools to help you transition from other CSS frameworks to the Atomix Design System. These tools analyze your codebase, map existing classes and patterns to Atomix equivalents, and provide detailed reports about the migration process.

### Before You Begin

1. **Backup Your Code**
   ```bash
   git add .
   git commit -m "Before Atomix migration"
   ```

2. **Install Atomix**
   ```bash
   npm install @shohojdhara/atomix
   ```

3. **Run Migration Analysis**
   ```bash
   npx atomix migrate <framework> --dry-run
   ```

---

## Supported Migrations

### Available Frameworks

| Framework | Command | Description |
|-----------|---------|-------------|
| Tailwind CSS | `tailwind` | Migrate from Tailwind utility classes |
| Bootstrap | `bootstrap` | Migrate from Bootstrap components |
| SCSS Variables | `scss-variables` | Convert SCSS variables to design tokens |

### Migration Process

1. **Analysis** - Scans your codebase for framework patterns
2. **Mapping** - Maps existing classes to Atomix equivalents
3. **Transformation** - Updates files with new syntax
4. **Report** - Provides detailed migration summary
5. **Validation** - Checks for successful migration

---

## Tailwind to Atomix

### Command

```bash
atomix migrate tailwind [options]
```

### Options

- `-s, --source <path>` - Source directory (default: ./src)
- `--dry-run` - Preview changes without modifying files
- `--create-backup` - Create backup before migration (default: true)

### Class Mappings

#### Layout

| Tailwind | Atomix |
|----------|--------|
| `flex` | `c-flex` |
| `grid` | `c-grid` |
| `container` | `c-container` |
| `hidden` | `u-hidden` |
| `block` | `u-block` |
| `inline-block` | `u-inline-block` |

#### Spacing

| Tailwind | Atomix |
|----------|--------|
| `p-4` | `u-p-4` |
| `m-2` | `u-m-2` |
| `px-6` | `u-px-6` |
| `my-8` | `u-my-8` |
| `space-x-4` | `u-space-x-4` |

#### Colors

| Tailwind | Atomix |
|----------|--------|
| `text-gray-900` | `u-text-primary` |
| `bg-blue-500` | `u-bg-primary` |
| `border-red-600` | `u-border-error` |
| `text-green-600` | `u-text-success` |

#### Typography

| Tailwind | Atomix |
|----------|--------|
| `text-sm` | `u-text-sm` |
| `font-bold` | `u-font-bold` |
| `leading-tight` | `u-line-tight` |
| `tracking-wide` | `u-letter-wide` |

### Example Migration

**Before (Tailwind):**
```html
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-bold text-gray-900">Title</h2>
  <button class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
    Click Me
  </button>
</div>
```

**After (Atomix):**
```html
<div class="c-flex u-items-center u-justify-between u-p-4 u-bg-surface u-radius-lg u-shadow-md">
  <h2 class="u-text-xl u-font-bold u-text-primary">Title</h2>
  <button class="c-button c-button--primary">
    Click Me
  </button>
</div>
```

### Component Conversion

Tailwind utility-based components are converted to Atomix semantic components:

```javascript
// Before
const Button = ({ children, variant }) => (
  <button className={`
    px-4 py-2 rounded font-medium transition-colors
    ${variant === 'primary' 
      ? 'bg-blue-500 text-white hover:bg-blue-600' 
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
  `}>
    {children}
  </button>
);

// After
const Button = ({ children, variant = 'secondary' }) => (
  <button className={`c-button c-button--${variant}`}>
    {children}
  </button>
);
```

### Configuration Migration

**Tailwind Config:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#7c3aed',
      },
      spacing: {
        '72': '18rem',
      }
    }
  }
}
```

**Atomix Tokens:**
```scss
// src/styles/01-settings/_settings.custom.scss
$custom-brand: #7c3aed !default;
$spacing-72: 18rem !default;

// Override defaults
$primary: $custom-brand !default;
```

---

## Bootstrap to Atomix

### Command

```bash
atomix migrate bootstrap [options]
```

### Component Mappings

#### Buttons

| Bootstrap | Atomix |
|-----------|--------|
| `btn btn-primary` | `c-button c-button--primary` |
| `btn btn-secondary` | `c-button c-button--secondary` |
| `btn btn-lg` | `c-button c-button--lg` |
| `btn btn-sm` | `c-button c-button--sm` |

#### Forms

| Bootstrap | Atomix |
|-----------|--------|
| `form-control` | `c-input` |
| `form-select` | `c-select` |
| `form-check` | `c-checkbox` |
| `form-label` | `c-label` |

#### Layout

| Bootstrap | Atomix |
|-----------|--------|
| `container` | `c-container` |
| `row` | `c-grid` |
| `col-md-6` | `c-grid__item c-grid__item--6` |
| `card` | `c-card` |

#### Components

| Bootstrap | Atomix |
|-----------|--------|
| `alert alert-danger` | `c-alert c-alert--error` |
| `badge badge-success` | `c-badge c-badge--success` |
| `modal` | `c-modal` |
| `dropdown` | `c-dropdown` |

### Example Migration

**Before (Bootstrap):**
```html
<div class="container">
  <div class="row">
    <div class="col-md-8">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Card Title</h5>
          <p class="card-text">Card content</p>
          <button class="btn btn-primary">Action</button>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="alert alert-info">
        Information alert
      </div>
    </div>
  </div>
</div>
```

**After (Atomix):**
```html
<div class="c-container">
  <div class="c-grid">
    <div class="c-grid__item c-grid__item--8">
      <div class="c-card">
        <div class="c-card__body">
          <h5 class="c-card__title">Card Title</h5>
          <p class="c-card__text">Card content</p>
          <button class="c-button c-button--primary">Action</button>
        </div>
      </div>
    </div>
    <div class="c-grid__item c-grid__item--4">
      <div class="c-alert c-alert--info">
        Information alert
      </div>
    </div>
  </div>
</div>
```

### JavaScript Component Migration

**Bootstrap JavaScript:**
```javascript
// Bootstrap modal
$('#myModal').modal('show');

// Bootstrap tooltip
$('[data-toggle="tooltip"]').tooltip();

// Bootstrap dropdown
$('.dropdown-toggle').dropdown();
```

**Atomix JavaScript:**
```javascript
// Atomix modal
const modal = new Atomix.Modal('#myModal');
modal.open();

// Atomix tooltip
Atomix.Tooltip.init('[data-tooltip]');

// Atomix dropdown
Atomix.Dropdown.init('.c-dropdown');
```

---

## SCSS Variables to Design Tokens

### Command

```bash
atomix migrate scss-variables [options]
```

### Variable Mappings

The migration tool converts SCSS variables to Atomix design tokens:

```scss
// Before: _variables.scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$font-size-base: 16px;
$border-radius: 4px;
$spacing-unit: 8px;

// After: _settings.custom.scss
// Colors
$custom-primary: #007bff !default;
$custom-secondary: #6c757d !default;

// Typography
$custom-font-size-base: 1rem !default; // Converted to rem

// Border Radius
$custom-radius-base: 0.25rem !default; // Converted to rem

// Spacing
$custom-spacing-unit: 0.5rem !default; // Converted to rem

// Export to override Atomix defaults
$primary: $custom-primary !default;
$secondary: $custom-secondary !default;
$font-size-base: $custom-font-size-base !default;
$border-radius: $custom-radius-base !default;
```

### Complex Variables

**Color Maps:**
```scss
// Before
$colors: (
  'primary': #007bff,
  'danger': #dc3545,
  'success': #28a745
);

// After
$custom-colors: (
  'primary': #007bff,
  'error': #dc3545,    // danger → error
  'success': #28a745
) !default;

// Merge with Atomix colors
$theme-colors: map-merge($theme-colors, $custom-colors);
```

**Spacing System:**
```scss
// Before
$spacing-small: 4px;
$spacing-medium: 8px;
$spacing-large: 16px;

// After
$custom-spacing: (
  'sm': 0.25rem,  // 4px
  'md': 0.5rem,   // 8px
  'lg': 1rem      // 16px
) !default;
```

---

## Manual Migration

### When to Use Manual Migration

- Custom CSS that doesn't map directly
- Complex component logic
- Third-party integrations
- Custom utility classes

### Step-by-Step Process

1. **Identify Patterns**
   ```bash
   # Find all class usages
   grep -r "class=" src/ > class-usage.txt
   
   # Find SCSS imports
   find src -name "*.scss" -exec grep -l "@import" {} \;
   ```

2. **Create Mapping File**
   ```javascript
   // migration-map.js
   export const classMap = {
     // Your custom mappings
     'custom-button': 'c-button c-button--custom',
     'hero-section': 'c-hero',
     'nav-menu': 'c-navigation'
   };
   ```

3. **Run Custom Migration**
   ```javascript
   // custom-migrate.js
   import { classMap } from './migration-map.js';
   
   function migrateClasses(content) {
     let result = content;
     
     for (const [oldClass, newClass] of Object.entries(classMap)) {
       const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
       result = result.replace(regex, newClass);
     }
     
     return result;
   }
   ```

### Component Architecture Migration

**From Utility-Based:**
```jsx
// Old approach
<div className="utility-class-1 utility-class-2 utility-class-3">
  <span className="utility-class-4 utility-class-5">
    Content
  </span>
</div>
```

**To Component-Based:**
```jsx
// Atomix approach
<Card variant="elevated">
  <Card.Title>Content</Card.Title>
</Card>
```

---

## Post-Migration

### 1. Validation

Run validation after migration:

```bash
# Validate tokens
atomix validate --tokens

# Check for unmapped classes
atomix migrate check

# Build and test
npm run build
npm test
```

### 2. Clean Up

Remove old framework dependencies:

```bash
# Remove Tailwind
npm uninstall tailwindcss @tailwindcss/forms @tailwindcss/typography

# Remove Bootstrap
npm uninstall bootstrap jquery popper.js

# Clean config files
rm tailwind.config.js
rm postcss.config.js  # If only used for Tailwind
```

### 3. Optimization

Optimize your Atomix setup:

```bash
# Generate only used components
atomix optimize --tree-shake

# Minify themes
atomix build-theme themes/main --minify

# Analyze bundle
atomix analyze
```

### 4. Update Documentation

Update your project documentation:

```markdown
## Styling Guide

This project uses Atomix Design System.

### Component Classes
- Use `c-` prefix for components
- Use `u-` prefix for utilities
- Follow BEM methodology

### Design Tokens
- Colors: See `_settings.colors.scss`
- Spacing: See `_settings.spacing.scss`
- Typography: See `_settings.typography.scss`
```

### 5. Team Training

Share migration knowledge:

1. **Create Style Guide**
   ```bash
   atomix generate styleguide
   ```

2. **Document Patterns**
   - Common component usage
   - Utility class conventions
   - Theme customization

3. **Set Up Linting**
   ```json
   // .stylelintrc
   {
     "rules": {
       "selector-class-pattern": "^[cuo]-[a-z]+(?:__[a-z]+)?(?:--[a-z]+)?$"
     }
   }
   ```

---

## Migration Report

After migration, you'll receive a detailed report:

```
╔════════════════════════════════════════╗
║      Atomix Migration Report           ║
╚════════════════════════════════════════╝

Framework: Tailwind CSS → Atomix
Source: ./src
Files Processed: 47
Duration: 2.3s

✅ Successfully Migrated:
   - 234 utility classes
   - 12 component patterns
   - 8 configuration values

⚠️  Warnings:
   - 5 classes need manual review
   - 2 custom utilities unmapped

❌ Errors:
   - 0 files failed

📁 Backup created at: ./backup-2024-12-23

Next Steps:
1. Review warnings in migration-warnings.log
2. Test your application
3. Run: atomix validate
```

---

## Troubleshooting

### Common Issues

**1. Unmapped Classes**
```bash
Warning: Unmapped class "custom-grid-layout"

Solution:
1. Add to custom migration map
2. Create Atomix equivalent
3. Use manual migration
```

**2. Build Errors**
```bash
Error: Cannot find module '_settings.scss'

Solution:
1. Ensure Atomix is properly installed
2. Check import paths
3. Run: atomix doctor
```

**3. Style Differences**
```bash
Visual regression detected

Solution:
1. Compare specific components
2. Adjust token values
3. Use migration --strict flag
```

### Getting Help

- Review migration logs: `cat migration.log`
- Check warnings: `cat migration-warnings.log`
- Run diagnostics: `atomix doctor`
- Community support: [discord.gg/atomix](https://discord.gg/atomix)

---

**Version:** 0.3.4  
**Last Updated:** December 2024

