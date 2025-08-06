# Atomix Customization Guide

This guide covers how to customize, extend, and theme the Atomix Design System to match your brand and requirements. Learn how to override defaults, create custom components, and build your own design tokens while maintaining the system's integrity.

## Table of Contents

- [Customization Philosophy](#customization-philosophy)
- [Configuration Methods](#configuration-methods)
- [Theming System](#theming-system)
- [Custom Components](#custom-components)
- [Extending Utilities](#extending-utilities)
- [Brand Integration](#brand-integration)
- [Advanced Customization](#advanced-customization)
- [Migration Strategies](#migration-strategies)

## Customization Philosophy

### Design Principles

1. **Maintain System Integrity** - Customizations should enhance, not break the system
2. **Follow ITCSS** - Respect the inverted triangle architecture
3. **Use Design Tokens** - Leverage the token system for consistency
4. **Progressive Enhancement** - Start with defaults, then customize
5. **Accessibility First** - Ensure customizations meet accessibility standards

### Customization Levels

| Level | Scope | Complexity | Use Case |
|-------|-------|------------|----------|
| **Configuration** | Variables only | Low | Brand colors, spacing tweaks |
| **Theming** | CSS custom properties | Medium | Runtime theme switching |
| **Extension** | New components/utilities | Medium-High | Additional functionality |
| **Architecture** | System structure | High | Major modifications |

## Configuration Methods

### 1. SCSS Variable Override

The simplest way to customize Atomix is by overriding SCSS variables:

```scss
// Override before importing Atomix
$primary-6: #your-brand-color;
$font-family-base: 'Your Font', sans-serif;
$border-radius: 0.5rem;

// Import Atomix with your customizations
@use 'atomix/styles' as *;
```

### 2. @use with Configuration

Use SCSS's `@use` with configuration for better control:

```scss
@use 'atomix/styles' with (
  // Colors
  $primary-6: #2563eb,
  $red-6: #dc2626,
  $green-6: #16a34a,
  
  // Typography
  $font-family-base: ('Inter', sans-serif),
  $font-size-base: 1rem,
  $line-height-base: 1.6,
  
  // Spacing
  $spacer: 1rem,
  $border-radius: 0.375rem,
  
  // Layout
  $container-max-width: 1280px,
  $grid-columns: 12,
  
  // Components
  $btn-padding-x: 1rem,
  $btn-padding-y: 0.5rem,
  $card-padding: 1.5rem
);
```

### 3. Partial Imports

Import only what you need and customize selectively:

```scss
// Import settings and tools
@use 'atomix/styles/01-settings' as * with (
  $primary-6: #your-color
);
@use 'atomix/styles/02-tools' as *;

// Import specific layers
@use 'atomix/styles/03-generic';
@use 'atomix/styles/04-elements';
@use 'atomix/styles/06-components';

// Skip utilities if you don't need them
// @use 'atomix/styles/99-utilities';
```

## Theming System

### CSS Custom Properties

Atomix uses CSS custom properties for runtime theming:

```scss
:root {
  // Light theme (default)
  --atomix-primary: #{$primary-6};
  --atomix-text-primary: #{$gray-10};
  --atomix-bg-primary: #{$white};
  --atomix-border-primary: #{$gray-3};
}

[data-theme="dark"] {
  // Dark theme
  --atomix-primary: #{$primary-6};
  --atomix-text-primary: #{$white};
  --atomix-bg-primary: #{$gray-9};
  --atomix-border-primary: #{$gray-7};
}

[data-theme="custom"] {
  // Your custom theme
  --atomix-primary: #your-custom-color;
  --atomix-text-primary: #your-text-color;
  --atomix-bg-primary: #your-bg-color;
  --atomix-border-primary: #your-border-color;
}
```

### Theme Switching

```javascript
// Theme switching utility
class ThemeManager {
  constructor() {
    this.themes = ['light', 'dark', 'custom'];
    this.currentTheme = this.getStoredTheme() || 'light';
    this.applyTheme(this.currentTheme);
  }
  
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('atomix-theme', theme);
    this.currentTheme = theme;
  }
  
  toggleTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.applyTheme(this.themes[nextIndex]);
  }
  
  getStoredTheme() {
    return localStorage.getItem('atomix-theme');
  }
}

// Usage
const themeManager = new ThemeManager();
document.getElementById('theme-toggle').addEventListener('click', () => {
  themeManager.toggleTheme();
});
```

### Component-Level Theming

```scss
// Component with themeable custom properties
.c-card {
  --card-bg: var(--atomix-bg-primary);
  --card-border: var(--atomix-border-primary);
  --card-text: var(--atomix-text-primary);
  --card-padding: var(--atomix-spacing-6);
  --card-radius: var(--atomix-border-radius);
  
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  color: var(--card-text);
  padding: var(--card-padding);
  border-radius: var(--card-radius);
  
  // Theme-specific overrides
  [data-theme="dark"] & {
    --card-bg: #{$gray-8};
    --card-border: #{$gray-7};
  }
  
  // Custom theme variant
  &--premium {
    --card-bg: linear-gradient(135deg, #{$primary-1}, #{$primary-2});
    --card-border: #{$primary-6};
    --card-text: #{$primary-9};
  }
}
```

## Custom Components

### Following ITCSS Methodology

When creating custom components, follow the ITCSS structure:

```scss
// 1. Create component settings
// _settings.my-component.scss
$my-component-padding: var(--atomix-spacing-4) !default;
$my-component-bg: var(--atomix-bg-secondary) !default;
$my-component-border: var(--atomix-border-primary) !default;

// 2. Create component tools (if needed)
// _tools.my-component.scss
@mixin my-component-variant($bg, $text, $border) {
  --my-component-bg: #{$bg};
  --my-component-text: #{$text};
  --my-component-border: #{$border};
}

// 3. Create the component
// _components.my-component.scss
.c-my-component {
  --my-component-padding: #{$my-component-padding};
  --my-component-bg: #{$my-component-bg};
  --my-component-border: #{$my-component-border};
  
  padding: var(--my-component-padding);
  background-color: var(--my-component-bg);
  border: 1px solid var(--my-component-border);
  border-radius: var(--atomix-border-radius);
  
  // Modifiers
  &--large {
    --my-component-padding: #{map.get($spacing-sizes, 8)};
  }
  
  &--primary {
    @include my-component-variant($primary, $white, $primary);
  }
  
  &--success {
    @include my-component-variant($success-bg, $success-text, $success-border);
  }
}
```

### Component Best Practices

```scss
// ✅ Good: Use CSS custom properties for flexibility
.c-custom-btn {
  --btn-custom-bg: var(--atomix-primary);
  --btn-custom-text: var(--atomix-white);
  --btn-custom-padding: var(--atomix-spacing-4) var(--atomix-spacing-6);
  
  background-color: var(--btn-custom-bg);
  color: var(--btn-custom-text);
  padding: var(--btn-custom-padding);
}

// ✅ Good: Follow BEM naming
.c-product-card {
  &__image { /* styles */ }
  &__title { /* styles */ }
  &__price { /* styles */ }
  &__actions { /* styles */ }
  
  &--featured { /* modifier */ }
  &--sale { /* modifier */ }
}

// ❌ Avoid: Hard-coded values
.c-bad-component {
  padding: 16px 24px; // Use spacing tokens instead
  color: #333333;     // Use color tokens instead
  font-size: 14px;    // Use typography scale instead
}
```

## Extending Utilities

### Adding Custom Utilities

```scss
// Create custom utility map
$custom-utilities: (
  'aspect-ratio': (
    responsive: true,
    property: aspect-ratio,
    class: u-aspect,
    values: (
      square: 1 / 1,
      video: 16 / 9,
      photo: 4 / 3,
      portrait: 3 / 4,
    ),
  ),
  'backdrop-blur': (
    property: backdrop-filter,
    class: u-backdrop-blur,
    values: (
      none: none,
      sm: blur(4px),
      md: blur(8px),
      lg: blur(16px),
      xl: blur(24px),
    ),
  ),
);

// Generate utilities using the API
@each $utility-name, $utility in $custom-utilities {
  @include generate-utility($utility);
}
```

### Extending Existing Utilities

```scss
// Extend spacing utilities with custom values
$extended-spacing: map.merge($spacing-sizes, (
  xs: 0.125rem,    // 2px
  2xs: 0.0625rem,  // 1px
  100: 25rem,      // 400px
  120: 30rem,      // 480px
));

// Extend color utilities with brand colors
$brand-colors: (
  'brand-primary': var(--atomix-brand-primary),
  'brand-secondary': var(--atomix-brand-secondary),
  'brand-accent': var(--atomix-brand-accent),
);

$extended-text-colors: map.merge($text-colors, $brand-colors);
```

## Brand Integration

### Brand Color System

```scss
// Define your brand colors
$brand-primary: #your-primary-color;
$brand-secondary: #your-secondary-color;
$brand-accent: #your-accent-color;

// Create brand color scales
$brand-primary-scale: (
  1: tint($brand-primary, 90%),
  2: tint($brand-primary, 80%),
  3: tint($brand-primary, 60%),
  4: tint($brand-primary, 40%),
  5: tint($brand-primary, 20%),
  6: $brand-primary,
  7: shade($brand-primary, 20%),
  8: shade($brand-primary, 40%),
  9: shade($brand-primary, 60%),
  10: shade($brand-primary, 80%),
);

// Override Atomix primary scale
@use 'atomix/styles' with (
  $primary-1: map.get($brand-primary-scale, 1),
  $primary-2: map.get($brand-primary-scale, 2),
  $primary-3: map.get($brand-primary-scale, 3),
  $primary-4: map.get($brand-primary-scale, 4),
  $primary-5: map.get($brand-primary-scale, 5),
  $primary-6: map.get($brand-primary-scale, 6),
  $primary-7: map.get($brand-primary-scale, 7),
  $primary-8: map.get($brand-primary-scale, 8),
  $primary-9: map.get($brand-primary-scale, 9),
  $primary-10: map.get($brand-primary-scale, 10),
);
```

### Typography Integration

```scss
// Brand typography
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;500;600;700&display=swap');

@use 'atomix/styles' with (
  $font-family-base: ('Your Font', -apple-system, BlinkMacSystemFont, sans-serif),
  $font-family-heading: ('Your Display Font', serif),
  $font-family-mono: ('Your Mono Font', 'Fira Code', monospace),
  
  // Custom font weights
  $font-weight-normal: 400,
  $font-weight-medium: 500,
  $font-weight-semibold: 600,
  $font-weight-bold: 700,
  
  // Custom type scale
  $font-size-xs: 0.75rem,
  $font-size-sm: 0.875rem,
  $font-size-base: 1rem,
  $font-size-lg: 1.125rem,
  $font-size-xl: 1.25rem,
  $font-size-2xl: 1.5rem,
  $font-size-3xl: 1.875rem,
  $font-size-4xl: 2.25rem,
);
```

## Advanced Customization

### Custom Build Process

```scss
// custom-atomix.scss - Your custom build
// 1. Override settings
$primary-6: #your-brand-color;
$font-family-base: 'Your Font';

// 2. Import Atomix layers selectively
@use 'atomix/styles/01-settings' as * with ($primary-6: #your-color);
@use 'atomix/styles/02-tools' as *;
@use 'atomix/styles/03-generic';
@use 'atomix/styles/04-elements';
@use 'atomix/styles/05-objects';

// 3. Add your custom components
@use 'your-components/header';
@use 'your-components/footer';
@use 'your-components/product-card';

// 4. Import Atomix components you need
@use 'atomix/styles/06-components/components.button';
@use 'atomix/styles/06-components/components.card';
@use 'atomix/styles/06-components/components.modal';

// 5. Add custom utilities
@use 'your-utilities/brand-utilities';

// 6. Import Atomix utilities
@use 'atomix/styles/99-utilities';
```

### Plugin System

```scss
// Create reusable plugins
@mixin atomix-plugin-ecommerce {
  // Product card component
  .c-product-card {
    // Component styles
  }
  
  // Price component
  .c-price {
    // Component styles
  }
  
  // Rating component
  .c-rating {
    // Component styles
  }
  
  // Ecommerce utilities
  .u-price-strike { text-decoration: line-through; }
  .u-sale-badge { /* styles */ }
}

// Use plugins
@include atomix-plugin-ecommerce;
```

### CSS-in-JS Integration

```javascript
// For CSS-in-JS libraries like styled-components
import { css } from 'styled-components';

// Import Atomix tokens as JavaScript
const atomixTokens = {
  colors: {
    primary: 'var(--atomix-primary)',
    textPrimary: 'var(--atomix-text-primary)',
    bgPrimary: 'var(--atomix-bg-primary)',
  },
  spacing: {
    4: 'var(--atomix-spacing-4)',
    8: 'var(--atomix-spacing-8)',
    12: 'var(--atomix-spacing-12)',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
  },
};

// Use in styled components
const StyledButton = styled.button`
  background-color: ${atomixTokens.colors.primary};
  color: ${atomixTokens.colors.textPrimary};
  padding: ${atomixTokens.spacing[4]} ${atomixTokens.spacing[8]};
  
  @media (min-width: ${atomixTokens.breakpoints.md}) {
    padding: ${atomixTokens.spacing[6]} ${atomixTokens.spacing[12]};
  }
`;
```

## Migration Strategies

### From Bootstrap

```scss
// Map Bootstrap variables to Atomix
@use 'atomix/styles' with (
  // Colors
  $primary-6: $blue,
  $red-6: $red,
  $green-6: $green,
  $yellow-6: $yellow,
  
  // Typography
  $font-family-base: $font-family-sans-serif,
  $font-size-base: $font-size-base,
  $line-height-base: $line-height-base,
  
  // Spacing
  $spacer: $spacer,
  
  // Layout
  $container-max-width: map.get($container-max-widths, xl),
  $grid-columns: $grid-columns,
);

// Create Bootstrap-compatible utility aliases
.text-primary { color: var(--atomix-primary) !important; }
.bg-primary { background-color: var(--atomix-primary) !important; }
.p-3 { padding: var(--atomix-spacing-3) !important; }
.mb-4 { margin-bottom: var(--atomix-spacing-4) !important; }
```

### From Tailwind CSS

```scss
// Create Tailwind-like utilities
.text-blue-600 { color: var(--atomix-blue-6) !important; }
.bg-gray-100 { background-color: var(--atomix-gray-1) !important; }
.p-4 { padding: var(--atomix-spacing-4) !important; }
.rounded-lg { border-radius: var(--atomix-border-radius-lg) !important; }

// Or use Atomix utilities with Tailwind-like naming
@each $name, $value in $spacing-sizes {
  .p-#{$name} { padding: #{$value} !important; }
  .m-#{$name} { margin: #{$value} !important; }
}
```

---

## Related Documentation

- [Styles Architecture](./architecture.md) - System overview
- [Color System](../design-tokens/colors.md) - Color tokens and usage
- [Spacing & Layout](../design-tokens/spacing.md) - Layout system
- [API Reference](./api-reference.md) - Complete API

## Tools & Resources

- [SCSS Documentation](https://sass-lang.com/documentation) - SCSS reference
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) - MDN guide
- [Design Tokens](https://designtokens.org/) - Design token specification
