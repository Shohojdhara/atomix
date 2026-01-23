# Styles System

The Atomix Styles System provides a comprehensive, scalable CSS architecture built on modern web standards and best practices. It follows the ITCSS (Inverted Triangle CSS) methodology for maintainable, predictable styling.

## 🏗️ Architecture Overview

Atomix styles are organized in a hierarchical structure that moves from generic, far-reaching styles to specific, localized styles:

```
Styles Architecture (ITCSS)
├── 01-settings/     # Variables, colors, configuration
├── 02-tools/        # Mixins, functions, utilities  
├── 03-generic/      # Reset, normalize, box-sizing
├── 04-elements/     # Base HTML element styles
├── 05-objects/      # Layout patterns (OOCSS)
├── 06-components/   # UI components
└── 99-utilities/    # Utility classes
```

## 📚 Documentation Sections

### 🏛️ [Architecture Guide](./architecture.md)
Complete guide to the ITCSS methodology and how Atomix implements it.

**What you'll learn:**
- ITCSS layer structure and purpose
- Modern SCSS features (@use, @forward)
- CSS custom properties integration
- File organization and naming conventions
- Best practices and guidelines

### 🎨 [Customization Guide](./customization.md)
Comprehensive guide to customizing and extending the Atomix styles system.

**What you'll learn:**
- SCSS variable overrides
- CSS custom property theming
- Creating custom components
- Brand integration strategies
- Migration from other systems

### 🛠️ [Utility Classes](./utilities.md)
Complete reference for all utility classes available in Atomix.

**What you'll learn:**
- Spacing utilities (margin, padding, gap)
- Layout utilities (flexbox, grid, display)
- Typography utilities (text, font, line-height)
- Color utilities (text, background, border)
- Responsive variants

### 📖 [API Reference](./api-reference.md)
Complete technical reference for all SCSS variables, mixins, functions, and CSS classes.

**What you'll learn:**
- All SCSS variables and their defaults
- Available mixins and functions
- CSS custom properties
- Component and utility class reference
- Usage examples and patterns

## 🚀 Quick Start

### Basic Usage

```scss
// Import the complete Atomix styles
@use '@shohojdhara/atomix/styles' as *;
```

### Custom Configuration

```scss
// Override default variables
@use '@shohojdhara/atomix/styles' with (
  $primary-6: #your-brand-color,
  $font-family-base: 'Your Font',
  $border-radius: 0.5rem
);
```

### Selective Imports

```scss
// Import only what you need
@use '@shohojdhara/atomix/styles/01-settings' as *;
@use '@shohojdhara/atomix/styles/02-tools' as *;
@use '@shohojdhara/atomix/styles/06-components/components.button';
@use '@shohojdhara/atomix/styles/99-utilities/utilities.spacing';
```

## 🎯 Key Features

### 🔧 Modern SCSS
- **@use and @forward** - Better module system
- **CSS Custom Properties** - Runtime theming
- **Advanced Functions** - Color manipulation, calculations
- **Utility API** - Generate custom utilities

### 📱 Responsive Design
- **Mobile-first** - Progressive enhancement
- **6 Breakpoints** - xs, sm, md, lg, xl, xxl
- **Responsive Utilities** - All utilities have responsive variants
- **Container System** - Flexible layout containers

### 🎨 Theming System
- **CSS Custom Properties** - Runtime theme switching
- **Light/Dark Themes** - Built-in theme support
- **Custom Themes** - Easy to create and maintain
- **Component Theming** - Granular customization

### ♿ Accessibility
- **WCAG 2.1 Compliance** - AA standard color contrast
- **Focus Management** - Visible focus indicators
- **Screen Reader Support** - Semantic HTML and ARIA
- **High Contrast** - Support for high contrast modes

## 🏗️ ITCSS Layers Explained

### 1. Settings (Variables)
Global configuration and design tokens.
```scss
$primary-6: #7c3aed;
$spacing-4: 1rem;
$border-radius: 0.375rem;
```

### 2. Tools (Mixins & Functions)
Reusable code patterns and utilities.
```scss
@mixin media-breakpoint-up($breakpoint) { /* ... */ }
@function spacing($key) { /* ... */ }
```

### 3. Generic (Reset & Normalize)
Far-reaching, low-specificity styles.
```scss
*, *::before, *::after {
  box-sizing: border-box;
}
```

### 4. Elements (HTML Elements)
Base styling for HTML elements.
```scss
body {
  font-family: var(--atomix-font-family-base);
  color: var(--atomix-text-primary);
}
```

### 5. Objects (Layout Patterns)
Structural, reusable layout patterns.
```scss
.o-container { /* container styles */ }
.o-grid { /* grid styles */ }
```

### 6. Components (UI Components)
Specific UI component styles.
```scss
.c-btn { /* button styles */ }
.c-card { /* card styles */ }
```

### 7. Utilities (Helper Classes)
Single-purpose, high-specificity classes.
```scss
.u-text-center { text-align: center !important; }
.u-p-4 { padding: 1rem !important; }
```

## 🎨 CSS Custom Properties

Atomix extensively uses CSS custom properties for theming:

```css
:root {
  /* Colors */
  --atomix-primary: #7c3aed;
  --atomix-text-primary: #111827;
  --atomix-bg-primary: #ffffff;
  
  /* Spacing */
  --atomix-spacing-4: 1rem;
  --atomix-spacing-8: 2rem;
  
  /* Typography */
  --atomix-font-size-base: 1rem;
  --atomix-line-height-base: 1.5;
}

/* Dark theme */
[data-theme="dark"] {
  --atomix-text-primary: #f9fafb;
  --atomix-bg-primary: #1f2937;
}
```

## 🛠️ Utility Classes

### Spacing
```html
<div class="u-p-4 u-mb-8">
  <h2 class="u-mb-4">Heading</h2>
  <p class="u-mb-0">Paragraph</p>
</div>
```

### Layout
```html
<div class="u-flex u-justify-between u-items-center">
  <h3>Title</h3>
  <button class="c-btn c-btn--primary">Action</button>
</div>
```

### Responsive
```html
<div class="u-text-center u-text-md-start u-p-4 u-p-lg-8">
  <h2>Responsive content</h2>
</div>
```

## 📊 Performance

### Bundle Size
- **Complete CSS**: ~45KB minified, ~8KB gzipped
- **Selective Import**: ~15KB minified for essential components
- **Tree Shakeable**: Import only what you need

### Optimization Features
- **Atomic CSS**: Utility-first approach reduces duplication
- **CSS Custom Properties**: Minimal runtime overhead
- **Modern CSS**: Leverages latest browser features
- **Responsive Design**: Mobile-first optimization

## 🔧 Customization Examples

### Brand Colors
```scss
@use '@shohojdhara/atomix/styles' with (
  $primary-6: #2563eb,
  $success-6: #059669,
  $error-6: #dc2626
);
```

### Typography
```scss
@use '@shohojdhara/atomix/styles' with (
  $font-family-base: ('Roboto', sans-serif),
  $font-size-base: 1.125rem,
  $line-height-base: 1.6
);
```

### Spacing
```scss
@use '@shohojdhara/atomix/styles' with (
  $spacer: 1.25rem,  // Increases all spacing proportionally
  $border-radius: 0.75rem
);
```

## 🌐 Browser Support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 88+ | Full support |
| Firefox | 85+ | Full support |
| Safari | 14+ | Full support |
| Edge | 88+ | Full support |

### CSS Features Used
- CSS Custom Properties
- CSS Grid and Flexbox
- CSS Logical Properties
- Modern selectors and functions

## 🔗 Related Documentation

- [Design Tokens](../design-tokens/README.md) - Foundation of the styles system
- [Components](../components/README.md) - How styles are applied to components
- [Getting Started](../getting-started/README.md) - Installation and setup
- [Examples](../examples/README.md) - Real-world usage patterns

## 🚀 Next Steps

1. **Learn the Architecture** - Read the [Architecture Guide](./architecture.md)
2. **Explore Customization** - Check out [Customization Options](./customization.md)
3. **Master Utilities** - Study the [Utility Classes](./utilities.md)
4. **Reference the API** - Bookmark the [API Reference](./api-reference.md)

---

The Atomix Styles System provides the foundation for building consistent, maintainable, and scalable user interfaces. Master these concepts to build better web experiences! 🎨
