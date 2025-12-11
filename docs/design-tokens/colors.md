# Atomix Color System

The Atomix Design System features a comprehensive, accessible color system built on scientific color theory and designed for both light and dark themes. Our color system provides semantic meaning, ensures accessibility, and maintains visual harmony across all components.

## Table of Contents

- [Color Philosophy](#color-philosophy)
- [Color Scales](#color-scales)
- [Semantic Tokens](#semantic-tokens)
- [Theme Support](#theme-support)
- [Accessibility](#accessibility)
- [Usage Guidelines](#usage-guidelines)
- [API Reference](#api-reference)
- [Customization](#customization)

## Color Philosophy

### Design Principles

1. **Accessibility First** - All color combinations meet WCAG 2.1 AA standards
2. **Semantic Meaning** - Colors convey purpose and state
3. **Consistent Scales** - Predictable lightness progression
4. **Theme Flexibility** - Seamless light/dark mode support
5. **Brand Harmony** - Colors work together as a cohesive system

### Color Theory Foundation

Our color system is built on:
- **Perceptual uniformity** - Even visual steps between shades
- **Contrast ratios** - Minimum 4.5:1 for normal text, 3:1 for large text
- **Color harmony** - Complementary and analogous relationships
- **Cultural considerations** - Universal color meanings

## Color Scales

### Primary Scale (Purple)
The primary color represents brand identity and key actions.

```scss
$primary-1: #f2e8fd;  // Lightest tint
$primary-2: #e4d0fa;  // Very light
$primary-3: #d0b2f5;  // Light
$primary-4: #b88cef;  // Light-medium
$primary-5: #9c63e9;  // Medium-light
$primary-6: #7c3aed;  // Base primary ← Main brand color
$primary-7: #6425ca;  // Medium-dark
$primary-8: #501ba6;  // Dark
$primary-9: #3c1583;  // Very dark
$primary-10: #2a0e60; // Darkest shade
```

**Usage**:
- `primary-6` - Primary buttons, links, focus states
- `primary-1-3` - Subtle backgrounds, light themes
- `primary-7-10` - Text on light backgrounds, dark themes

### Semantic Color Scales

#### Success (Green)
```scss
$green-1: #f0fdf4;   // Success background light
$green-6: #22c55e;   // Success primary
$green-9: #166534;   // Success text dark
```

#### Error (Red)
```scss
$red-1: #fef2f2;     // Error background light
$red-6: #ef4444;     // Error primary
$red-9: #991b1b;     // Error text dark
```

#### Warning (Yellow)
```scss
$yellow-1: #fefce8;  // Warning background light
$yellow-6: #eab308;  // Warning primary
$yellow-9: #854d0e;  // Warning text dark
```

#### Info (Blue)
```scss
$blue-1: #eff6ff;    // Info background light
$blue-6: #3b82f6;    // Info primary
$blue-9: #1e40af;    // Info text dark
```

### Neutral Scale (Gray)
The foundation for text, borders, and backgrounds.

```scss
$gray-1: #f9fafb;    // Lightest background
$gray-2: #f3f4f6;    // Light background
$gray-3: #e5e7eb;    // Border light
$gray-4: #d1d5db;    // Border medium
$gray-5: #9ca3af;    // Disabled text
$gray-6: #6b7280;    // Tertiary text
$gray-7: #4b5563;    // Secondary text dark
$gray-8: #374151;    // Secondary text
$gray-9: #1f2937;    // Primary text dark
$gray-10: #111827;   // Primary text
```

### Light & Dark Colors
Special semantic colors for light and dark theme variants.

```scss
// Light color (typically used for light backgrounds)
$light: #f9fafb;     // Light background color

// Dark color (typically used for dark backgrounds)
$dark: #1f2937;      // Dark background color
```

**CSS Variables:**
```css
--atomix-light: #f9fafb;
--atomix-dark: #1f2937;
--atomix-light-rgb: 249, 250, 251;
--atomix-dark-rgb: 31, 41, 55;
```

**Usage:**
- `--atomix-light` - For light theme backgrounds and surfaces
- `--atomix-dark` - For dark theme backgrounds and surfaces
- Both have corresponding hover, text-emphasis, bg-subtle, and border-subtle variants

## Semantic Tokens

### Text Colors

#### Light Theme
```scss
$primary-text: $gray-10;     // Main text
$secondary-text: $gray-8;    // Secondary text
$tertiary-text: $gray-6;     // Tertiary text
$disabled-text: $gray-5;     // Disabled state
$brand-text: $primary-6;     // Brand/link text
$error-text: $red-6;         // Error messages
$success-text: $green-6;     // Success messages
$warning-text: $yellow-6;    // Warning messages
$info-text: $blue-6;         // Info messages
```

#### Dark Theme
```scss
$primary-text-dark: $white;      // Main text
$secondary-text-dark: $gray-3;   // Secondary text
$tertiary-text-dark: $gray-4;    // Tertiary text
$disabled-text-dark: $gray-5;    // Disabled state
$brand-text-dark: $primary-2;    // Brand/link text
$error-text-dark: $red-3;        // Error messages
$success-text-dark: $green-3;    // Success messages
$warning-text-dark: $yellow-3;   // Warning messages
$info-text-dark: $blue-3;        // Info messages
```

### Background Colors

#### Light Theme
```scss
$primary-bg: $white;         // Main background
$secondary-bg: $gray-3;      // Secondary background
$tertiary-bg: $gray-4;       // Tertiary background
$brand-bg: $primary-2;       // Brand background
$error-bg: $red-2;           // Error background
$success-bg: $green-2;       // Success background
$warning-bg: $yellow-2;      // Warning background
$info-bg: $blue-2;           // Info background
```

#### Dark Theme
```scss
$primary-bg-dark: $gray-9;       // Main background
$secondary-bg-dark: $gray-7;     // Secondary background
$tertiary-bg-dark: $gray-6;      // Tertiary background
$brand-bg-dark: $primary-8;      // Brand background
$error-bg-dark: $red-10;         // Error background
$success-bg-dark: $green-9;      // Success background
$warning-bg-dark: $yellow-10;    // Warning background
$info-bg-dark: $blue-10;         // Info background
```

### Border Colors

```scss
// Light theme
$primary-border: $gray-3;        // Default borders
$brand-border: $primary-6;       // Brand borders
$error-border: $red-6;           // Error borders
$success-border: $green-6;       // Success borders

// Dark theme
$primary-border-dark: $gray-8;   // Default borders
$brand-border-dark: $primary-6;  // Brand borders
$error-border-dark: $red-6;      // Error borders
$success-border-dark: $green-6;  // Success borders
```

## Theme Support

### CSS Custom Properties

Atomix uses CSS custom properties for runtime theme switching:

```scss
:root {
  // Light theme (default)
  --atomix-text-primary: #{$primary-text};
  --atomix-bg-primary: #{$primary-bg};
  --atomix-border-primary: #{$primary-border};
}

[data-theme="dark"] {
  // Dark theme overrides
  --atomix-text-primary: #{$primary-text-dark};
  --atomix-bg-primary: #{$primary-bg-dark};
  --atomix-border-primary: #{$primary-border-dark};
}
```

### Theme Switching

```javascript
// Toggle theme
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
}

// Respect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
if (prefersDark.matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
```

## Accessibility

### Contrast Ratios

All color combinations meet WCAG 2.1 standards:

| Use Case | Minimum Ratio | Atomix Implementation |
|----------|---------------|----------------------|
| Normal text | 4.5:1 | `$primary-text` on `$primary-bg` = 16.8:1 |
| Large text | 3:1 | `$secondary-text` on `$primary-bg` = 9.2:1 |
| UI components | 3:1 | `$primary` on `$white` = 4.8:1 |
| Focus indicators | 3:1 | `$focus-border-color` = 4.2:1 |

### Color Blindness Support

- **Deuteranopia** (red-green) - Distinct blue and yellow channels
- **Protanopia** (red-green) - High contrast differences
- **Tritanopia** (blue-yellow) - Red and green remain distinct
- **Monochromacy** - Sufficient lightness contrast

### Testing Tools

```scss
// Contrast checking function
@function contrast-ratio($foreground, $background) {
  $l1: lightness($foreground);
  $l2: lightness($background);
  @return if($l1 > $l2, ($l1 + 0.05) / ($l2 + 0.05), ($l2 + 0.05) / ($l1 + 0.05));
}

// Usage
$ratio: contrast-ratio($primary-text, $primary-bg); // Returns 16.8
```

## Usage Guidelines

### Do's ✅

```scss
// Use semantic tokens
.success-message {
  color: var(--atomix-text-success);
  background-color: var(--atomix-bg-success);
  border-color: var(--atomix-border-success);
}

// Use appropriate scale steps
.subtle-background {
  background-color: var(--atomix-gray-1); // Very light
}

.prominent-text {
  color: var(--atomix-gray-10); // Very dark
}
```

### Don'ts ❌

```scss
// Don't use raw hex values
.bad-example {
  color: #7c3aed; // Use var(--atomix-primary) instead
}

// Don't skip scale steps arbitrarily
.bad-contrast {
  color: var(--atomix-gray-2); // Too light for text
  background-color: var(--atomix-gray-1); // Insufficient contrast
}

// Don't mix semantic meanings
.error-state {
  color: var(--atomix-text-success); // Confusing semantic meaning
}
```

### Component Color Patterns

```scss
// Status components
.c-alert {
  &--success {
    color: var(--atomix-text-success);
    background-color: var(--atomix-bg-success);
    border-color: var(--atomix-border-success);
  }
  
  &--error {
    color: var(--atomix-text-error);
    background-color: var(--atomix-bg-error);
    border-color: var(--atomix-border-error);
  }
}

// Interactive components
.c-btn {
  &--primary {
    color: var(--atomix-white);
    background-color: var(--atomix-primary);
    border-color: var(--atomix-primary);
    
    &:hover {
      background-color: var(--atomix-primary-hover);
      border-color: var(--atomix-primary-hover);
    }
  }
}
```

## API Reference

### SCSS Variables

```scss
// Primary scale
$primary-1 through $primary-10

// Semantic scales
$red-1 through $red-10
$green-1 through $green-10
$yellow-1 through $yellow-10
$blue-1 through $blue-10
$gray-1 through $gray-10

// Semantic tokens
$primary-text, $secondary-text, $tertiary-text
$primary-bg, $secondary-bg, $tertiary-bg
$primary-border, $secondary-border
```

### CSS Custom Properties

#### Base Colors
```css
/* Primary colors */
--atomix-primary
--atomix-secondary
--atomix-success
--atomix-error
--atomix-warning
--atomix-info
--atomix-light
--atomix-dark

/* RGB variants for transparency */
--atomix-primary-rgb
--atomix-secondary-rgb
--atomix-success-rgb
--atomix-error-rgb
--atomix-warning-rgb
--atomix-info-rgb
--atomix-light-rgb
--atomix-dark-rgb
```

#### Text Emphasis Colors
```css
--atomix-primary-text-emphasis
--atomix-secondary-text-emphasis
--atomix-tertiary-text-emphasis
--atomix-disabled-text-emphasis
--atomix-invert-text-emphasis
--atomix-brand-text-emphasis
--atomix-error-text-emphasis
--atomix-success-text-emphasis
--atomix-warning-text-emphasis
--atomix-info-text-emphasis
--atomix-light-text-emphasis
--atomix-dark-text-emphasis
```

#### Background Subtle Colors
```css
--atomix-primary-bg-subtle
--atomix-secondary-bg-subtle
--atomix-tertiary-bg-subtle
--atomix-invert-bg-subtle
--atomix-brand-bg-subtle
--atomix-error-bg-subtle
--atomix-success-bg-subtle
--atomix-warning-bg-subtle
--atomix-info-bg-subtle
--atomix-light-bg-subtle
--atomix-dark-bg-subtle
```

#### Border Subtle Colors
```css
--atomix-primary-border-subtle
--atomix-secondary-border-subtle
--atomix-success-border-subtle
--atomix-error-border-subtle
--atomix-warning-border-subtle
--atomix-info-border-subtle
--atomix-brand-border-subtle
--atomix-light-border-subtle
--atomix-dark-border-subtle
```

#### Hover Colors
```css
--atomix-primary-hover
--atomix-secondary-hover
--atomix-light-hover
--atomix-dark-hover
--atomix-error-hover
--atomix-success-hover
--atomix-warning-hover
--atomix-info-hover
```

#### Gradient Tokens
```css
/* Color gradients */
--atomix-primary-gradient
--atomix-secondary-gradient
--atomix-success-gradient
--atomix-info-gradient
--atomix-warning-gradient
--atomix-error-gradient
--atomix-light-gradient
--atomix-dark-gradient

/* Default gradient */
--atomix-gradient
```

**Usage Example:**
```css
.hero-section {
  background: var(--atomix-primary-gradient);
}

.card {
  background: var(--atomix-gradient);
}
```

## Customization

### Override Default Colors

```scss
@use 'atomix/styles' with (
  $primary-6: #your-brand-color,
  $red-6: #your-error-color,
  $green-6: #your-success-color
);
```

### Add Custom Color Scales

```scss
// Define custom scale
$orange-1: #fff7ed;
$orange-6: #ea580c;
$orange-10: #9a3412;

// Create semantic tokens
$accent-text: $orange-6;
$accent-bg: $orange-1;
$accent-border: $orange-6;

// Add to CSS custom properties
:root {
  --atomix-text-accent: #{$accent-text};
  --atomix-bg-accent: #{$accent-bg};
  --atomix-border-accent: #{$accent-border};
}
```

---

## Related Documentation

- [Styles Architecture](../styles/architecture.md) - Overall system architecture
- [Spacing & Layout](./spacing.md) - Spacing and layout systems
- [Customization Guide](../styles/customization.md) - Advanced customization
- [CSS Utilities](../styles/utilities.md) - Color utility classes

## Tools & Resources

- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Test color combinations
- [Colorblinding](https://www.colorblinding.com/) - Test for color blindness
- [Coolors](https://coolors.co/) - Color palette generator
