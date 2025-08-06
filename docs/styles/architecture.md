# Atomix Styles Architecture

The Atomix Design System employs a sophisticated, scalable CSS architecture based on the **ITCSS (Inverted Triangle CSS)** methodology. This approach ensures maintainable, predictable, and performant styles that scale from simple components to complex applications.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [ITCSS Methodology](#itcss-methodology)
- [Layer Structure](#layer-structure)
- [Modern SCSS Features](#modern-scss-features)
- [CSS Custom Properties](#css-custom-properties)
- [File Organization](#file-organization)
- [Best Practices](#best-practices)
- [Getting Started](#getting-started)

## Architecture Overview

Atomix styles are organized in a hierarchical structure that moves from generic, far-reaching styles to specific, localized styles. This creates a natural cascade that minimizes specificity conflicts and promotes reusability.

```
src/styles/
├── 01-settings/     # Variables, colors, configuration
├── 02-tools/        # Mixins, functions, utilities
├── 03-generic/      # Reset, normalize, box-sizing
├── 04-elements/     # Base HTML element styles
├── 05-objects/      # Layout patterns (OOCSS)
├── 06-components/   # UI components
└── 99-utilities/    # Utility classes
```

## ITCSS Methodology

ITCSS organizes CSS in order of **specificity** and **reach**:

### Specificity Triangle
```
    Settings     (Variables, no output)
      Tools      (Mixins, functions, no output)
       Generic   (Reset, normalize)
        Elements (Base HTML elements)
         Objects (Layout patterns)
       Components (UI components)
      Utilities   (Helper classes)
```

### Key Principles

1. **Specificity increases as you go down**
2. **Reach decreases as you go down**
3. **Explicitness increases as you go down**
4. **No output in the first two layers**

## Layer Structure

### 01-Settings
**Purpose**: Global variables, configuration, and design tokens
**Output**: None (variables only)
**Specificity**: N/A

```scss
// Example: Color tokens
$primary-6: #7c3aed;
$spacing-sizes: (0: 0, 1: 0.25rem, 2: 0.5rem...);
$grid-breakpoints: (xs: 0, sm: 576px, md: 768px...);
```

**Key Files**:
- `_settings.colors.scss` - Color system and semantic tokens
- `_settings.spacing.scss` - Spacing scale and sizing
- `_settings.breakpoints.scss` - Responsive breakpoints
- `_settings.typography.scss` - Font stacks and type scale

### 02-Tools
**Purpose**: Mixins, functions, and utilities for generating CSS
**Output**: None (tools only)
**Specificity**: N/A

```scss
// Example: Responsive mixin
@mixin media-breakpoint-up($name) {
  $min: map.get($grid-breakpoints, $name);
  @if $min {
    @media (min-width: $min) { @content; }
  }
}

// Example: Utility generator
@mixin generate-utility($utility, $infix: '') {
  // Generates utility classes from configuration
}
```

**Key Files**:
- `_tools.breakpoints.scss` - Responsive mixins
- `_tools.utility-api.scss` - Utility class generator
- `_tools.color-functions.scss` - Color manipulation functions
- `_tools.spacing.scss` - Spacing calculation tools

### 03-Generic
**Purpose**: Far-reaching, low-specificity styles
**Output**: CSS reset, normalize, box-sizing
**Specificity**: Very low (element selectors)

```scss
// Example: Box-sizing reset
*,
*::before,
*::after {
  box-sizing: border-box;
}

// Example: Root custom properties
:root {
  --atomix-primary: #{$primary-6};
  --atomix-spacing-4: #{map.get($spacing-sizes, 4)};
}
```

### 04-Elements
**Purpose**: Base styling for HTML elements
**Output**: Element selectors (h1, p, a, etc.)
**Specificity**: Low (single element selectors)

```scss
// Example: Base typography
body {
  font-family: var(--atomix-font-family-base);
  font-size: var(--atomix-font-size-base);
  line-height: var(--atomix-line-height-base);
  color: var(--atomix-body-color);
  background-color: var(--atomix-body-bg);
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: var(--atomix-headings-margin-bottom);
  font-weight: var(--atomix-headings-font-weight);
  line-height: var(--atomix-headings-line-height);
  color: var(--atomix-headings-color);
}
```

### 05-Objects
**Purpose**: Layout patterns and structural components
**Output**: Class-based layout patterns
**Specificity**: Low-medium (single class selectors)

```scss
// Example: Container object
.o-container {
  width: 100%;
  padding-right: var(--atomix-container-padding-x);
  padding-left: var(--atomix-container-padding-x);
  margin-right: auto;
  margin-left: auto;
}

// Example: Grid object
.o-grid {
  display: grid;
  gap: var(--atomix-grid-gutter);
}
```

### 06-Components
**Purpose**: Specific UI components
**Output**: Component classes with modifiers
**Specificity**: Medium (class selectors with modifiers)

```scss
// Example: Button component
.c-btn {
  --atomix-btn-padding-x: #{$btn-padding-x};
  --atomix-btn-padding-y: #{$btn-padding-y};
  --atomix-btn-font-size: #{$btn-font-size};
  
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--atomix-btn-padding-y) var(--atomix-btn-padding-x);
  font-size: var(--atomix-btn-font-size);
  // ... more styles
  
  &--primary {
    --atomix-btn-color: #{$white};
    --atomix-btn-bg: #{$primary};
    --atomix-btn-border-color: #{$primary};
  }
}
```

### 99-Utilities
**Purpose**: Single-purpose helper classes
**Output**: Utility classes with high specificity
**Specificity**: High (often with !important)

```scss
// Example: Spacing utilities
.u-m-4 { margin: 1rem !important; }
.u-p-8 { padding: 2rem !important; }
.u-text-center { text-align: center !important; }

// Example: Responsive utilities
@media (min-width: 768px) {
  .u-d-md-flex { display: flex !important; }
  .u-text-md-left { text-align: left !important; }
}
```

## Modern SCSS Features

Atomix leverages modern SCSS features for better organization and performance:

### @use and @forward
```scss
// Instead of @import, use @use for better namespacing
@use '../01-settings/settings.colors' as colors;
@use '../02-tools/tools.breakpoints' as *;

// Forward modules to create public APIs
@forward './settings.colors';
@forward './settings.spacing';
```

### CSS Custom Properties Integration
```scss
// SCSS variables for build-time configuration
$primary: #7c3aed !default;

// CSS custom properties for runtime theming
.c-btn {
  --atomix-btn-bg: #{$primary};
  background-color: var(--atomix-btn-bg);
}
```

## CSS Custom Properties

Atomix uses CSS custom properties extensively for:

1. **Runtime theming** - Change themes without rebuilding CSS
2. **Component customization** - Override component styles easily
3. **Dark mode support** - Toggle between light and dark themes
4. **Dynamic styling** - Respond to user preferences and system settings

```scss
// Component with custom properties
.c-card {
  --atomix-card-bg: #{$white};
  --atomix-card-border: #{$border-color};
  --atomix-card-padding: #{$card-padding};
  
  background-color: var(--atomix-card-bg);
  border: 1px solid var(--atomix-card-border);
  padding: var(--atomix-card-padding);
}

// Dark mode override
[data-theme="dark"] {
  --atomix-card-bg: #{$gray-8};
  --atomix-card-border: #{$gray-7};
}
```

## File Organization

### Naming Conventions
- **Settings**: `_settings.{feature}.scss`
- **Tools**: `_tools.{feature}.scss`
- **Generic**: `_generic.{feature}.scss`
- **Elements**: `_elements.{feature}.scss`
- **Objects**: `_objects.{feature}.scss`
- **Components**: `_components.{feature}.scss`
- **Utilities**: `_utilities.{feature}.scss`

### Index Files
Each layer has an `_index.scss` file that forwards all modules:

```scss
// 01-settings/_index.scss
@forward './settings.colors';
@forward './settings.spacing';
@forward './settings.breakpoints';
// ... more forwards
```

## Best Practices

### 1. Follow the Triangle
- Never write styles that break the specificity order
- Don't use IDs in CSS
- Avoid nesting beyond 3 levels

### 2. Use Semantic Naming
```scss
// Good: Semantic naming
$color-primary: #7c3aed;
$spacing-large: 2rem;

// Avoid: Non-semantic naming
$purple: #7c3aed;
$big-space: 2rem;
```

### 3. Leverage Custom Properties
```scss
// Good: Flexible with custom properties
.c-btn {
  --btn-padding: 0.5rem 1rem;
  padding: var(--btn-padding);
}

// Less flexible: Hard-coded values
.c-btn {
  padding: 0.5rem 1rem;
}
```

### 4. Keep Components Isolated
```scss
// Good: Self-contained component
.c-card {
  // All card styles here
  
  &__header { /* header styles */ }
  &__body { /* body styles */ }
  &__footer { /* footer styles */ }
}

// Avoid: Scattered component styles
.c-card { /* base styles */ }
.card-header { /* separate file */ }
```

## Getting Started

### 1. Import the Main Stylesheet
```scss
// Import everything
@use 'atomix/styles' as *;

// Or import specific layers
@use 'atomix/styles/01-settings' as *;
@use 'atomix/styles/02-tools' as *;
```

### 2. Customize Variables
```scss
// Override default variables
@use 'atomix/styles' with (
  $primary: #your-brand-color,
  $font-family-base: 'Your Font',
  $border-radius: 0.5rem
);
```

### 3. Extend the System
```scss
// Add custom components following the methodology
.c-your-component {
  // Use Atomix variables and tools
  color: var(--atomix-text-primary);
  padding: var(--atomix-spacing-4);
  
  @include media-breakpoint-up(md) {
    padding: var(--atomix-spacing-6);
  }
}
```

---

## Related Documentation

- [Color System Guide](../design-tokens/colors.md) - Comprehensive color documentation
- [Spacing & Layout Guide](../design-tokens/spacing.md) - Spacing and layout systems
- [Customization Guide](./customization.md) - How to customize and extend
- [API Reference](./api-reference.md) - Complete API documentation
- [CSS Utilities](./utilities.md) - Utility class reference

## Resources

- [ITCSS Methodology](https://itcss.io/) - Learn more about ITCSS
- [SCSS Documentation](https://sass-lang.com/documentation) - SCSS language reference
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) - MDN documentation
