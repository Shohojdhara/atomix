# Spacing & Layout System

The Atomix Design System provides a comprehensive spacing and layout system built on consistent mathematical relationships, responsive design principles, and flexible grid systems. This ensures visual harmony and predictable spacing across all components and layouts.

## Table of Contents

- [Spacing Philosophy](#spacing-philosophy)
- [Spacing Scale](#spacing-scale)
- [Layout Objects](#layout-objects)
- [Grid System](#grid-system)
- [Responsive Design](#responsive-design)
- [Spacing Utilities](#spacing-utilities)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)

## Spacing Philosophy

### Design Principles

1. **Mathematical Consistency** - Based on a 4px (0.25rem) base unit
2. **Visual Rhythm** - Predictable spacing creates visual harmony
3. **Responsive Scaling** - Spacing adapts to different screen sizes
4. **Semantic Meaning** - Spacing conveys hierarchy and relationships
5. **Accessibility** - Adequate spacing for touch targets and readability

### Base Unit System

All spacing in Atomix is based on a **4px (0.25rem) base unit**:

```scss
$spacer: 1rem; // 16px base
$base-unit: 0.25rem; // 4px increments
```

This creates a harmonious scale where all spacing values are multiples of 4px, ensuring pixel-perfect alignment and visual consistency.

## Spacing Scale

### Core Scale

The spacing scale provides values from 0 to 22.5rem (0px to 360px):

```scss
$spacing-sizes: (
  0: 0rem,        // 0px   - No spacing
  1: 0.25rem,     // 4px   - Minimal spacing
  2: 0.5rem,      // 8px   - Very small
  3: 0.75rem,     // 12px  - Small
  4: 1rem,        // 16px  - Base unit
  5: 1.25rem,     // 20px  - Medium-small
  6: 1.5rem,      // 24px  - Medium
  7: 1.75rem,     // 28px  - Medium-large
  8: 2rem,        // 32px  - Large
  9: 2.25rem,     // 36px  - Very large
  10: 2.5rem,     // 40px  - Extra large
  12: 3rem,       // 48px  - XXL
  16: 4rem,       // 64px  - XXXL
  20: 5rem,       // 80px  - Section spacing
  24: 6rem,       // 96px  - Large sections
  32: 8rem,       // 128px - Page sections
  40: 10rem,      // 160px - Hero sections
  48: 12rem,      // 192px - Large hero
  64: 16rem,      // 256px - Extra large hero
  80: 20rem,      // 320px - Maximum spacing
  90: 22.5rem,    // 360px - Exceptional cases
);
```

### Usage Guidelines

| Scale | Size | Use Case | Examples |
|-------|------|----------|----------|
| 0-2 | 0-8px | Fine details | Icon spacing, borders |
| 3-4 | 12-16px | Component internals | Button padding, form spacing |
| 5-8 | 20-32px | Component spacing | Card padding, list items |
| 9-12 | 36-48px | Layout spacing | Component margins, grid gaps |
| 16-24 | 64-96px | Section spacing | Content blocks, page sections |
| 32+ | 128px+ | Page layout | Hero sections, major divisions |

### Semantic Spacing Tokens

```scss
// Component spacing
$component-padding-sm: map.get($spacing-sizes, 3);   // 12px
$component-padding-md: map.get($spacing-sizes, 4);   // 16px
$component-padding-lg: map.get($spacing-sizes, 6);   // 24px

// Layout spacing
$layout-gap-sm: map.get($spacing-sizes, 8);   // 32px
$layout-gap-md: map.get($spacing-sizes, 12);  // 48px
$layout-gap-lg: map.get($spacing-sizes, 16);  // 64px

// Section spacing
$section-spacing-sm: map.get($spacing-sizes, 20);  // 80px
$section-spacing-md: map.get($spacing-sizes, 24);  // 96px
$section-spacing-lg: map.get($spacing-sizes, 32);  // 128px
```

## Layout Objects

Layout objects provide structural patterns following OOCSS principles. They're reusable, content-agnostic layout patterns.

### Container Object

The container provides consistent page-level content width and centering:

```scss
.o-container {
  --atomix-container-max-width: 1200px;
  --atomix-container-padding-x: #{map.get($spacing-sizes, 4)};
  
  width: 100%;
  max-width: var(--atomix-container-max-width);
  padding-right: var(--atomix-container-padding-x);
  padding-left: var(--atomix-container-padding-x);
  margin-right: auto;
  margin-left: auto;
}

// Responsive container padding
@include media-breakpoint-up(sm) {
  .o-container {
    --atomix-container-padding-x: #{map.get($spacing-sizes, 6)};
  }
}

@include media-breakpoint-up(lg) {
  .o-container {
    --atomix-container-padding-x: #{map.get($spacing-sizes, 8)};
  }
}
```

**Usage**:
```html
<div class="o-container">
  <h1>Page Content</h1>
  <p>This content is centered and has consistent padding.</p>
</div>
```

### Grid Object

Flexible grid system for complex layouts:

```scss
.o-grid {
  --atomix-grid-columns: 12;
  --atomix-grid-gap: #{map.get($spacing-sizes, 6)};
  
  display: grid;
  grid-template-columns: repeat(var(--atomix-grid-columns), 1fr);
  gap: var(--atomix-grid-gap);
}

// Grid item spanning
.o-grid__item {
  &--span-1 { grid-column: span 1; }
  &--span-2 { grid-column: span 2; }
  &--span-3 { grid-column: span 3; }
  &--span-4 { grid-column: span 4; }
  &--span-6 { grid-column: span 6; }
  &--span-8 { grid-column: span 8; }
  &--span-12 { grid-column: span 12; }
}
```

**Usage**:
```html
<div class="o-grid">
  <div class="o-grid__item o-grid__item--span-8">Main content</div>
  <div class="o-grid__item o-grid__item--span-4">Sidebar</div>
</div>
```

### Masonry Grid Object

For Pinterest-style layouts:

```scss
.o-masonry-grid {
  --atomix-masonry-columns: 3;
  --atomix-masonry-gap: #{map.get($spacing-sizes, 6)};
  
  columns: var(--atomix-masonry-columns);
  column-gap: var(--atomix-masonry-gap);
  
  > * {
    break-inside: avoid;
    margin-bottom: var(--atomix-masonry-gap);
  }
}

// Responsive masonry
@include media-breakpoint-down(md) {
  .o-masonry-grid {
    --atomix-masonry-columns: 2;
  }
}

@include media-breakpoint-down(sm) {
  .o-masonry-grid {
    --atomix-masonry-columns: 1;
  }
}
```

## Grid System

### Responsive Breakpoints

```scss
$grid-breakpoints: (
  xs: 0,        // Extra small devices
  sm: 576px,    // Small devices (landscape phones)
  md: 768px,    // Medium devices (tablets)
  lg: 992px,    // Large devices (desktops)
  xl: 1200px,   // Extra large devices
  xxl: 1440px,  // Extra extra large devices
);
```

### Breakpoint Mixins

```scss
// Min-width media queries
@include media-breakpoint-up(md) {
  .example { font-size: 1.25rem; }
}

// Max-width media queries
@include media-breakpoint-down(lg) {
  .example { font-size: 1rem; }
}

// Between breakpoints
@include media-breakpoint-between(md, lg) {
  .example { font-size: 1.125rem; }
}
```

### Container Sizes

```scss
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px,
);
```

## Responsive Design

### Mobile-First Approach

All spacing and layout starts with mobile and progressively enhances:

```scss
// Base (mobile) styles
.component {
  padding: var(--atomix-spacing-4);
  margin-bottom: var(--atomix-spacing-8);
}

// Tablet and up
@include media-breakpoint-up(md) {
  .component {
    padding: var(--atomix-spacing-6);
    margin-bottom: var(--atomix-spacing-12);
  }
}

// Desktop and up
@include media-breakpoint-up(lg) {
  .component {
    padding: var(--atomix-spacing-8);
    margin-bottom: var(--atomix-spacing-16);
  }
}
```

### Responsive Spacing Patterns

```scss
// Responsive section spacing
.section {
  padding-top: var(--atomix-spacing-16);
  padding-bottom: var(--atomix-spacing-16);
  
  @include media-breakpoint-up(md) {
    padding-top: var(--atomix-spacing-20);
    padding-bottom: var(--atomix-spacing-20);
  }
  
  @include media-breakpoint-up(lg) {
    padding-top: var(--atomix-spacing-24);
    padding-bottom: var(--atomix-spacing-24);
  }
}
```

## Spacing Utilities

### Margin Utilities

```scss
// All sides
.u-m-0 { margin: 0 !important; }
.u-m-4 { margin: 1rem !important; }
.u-m-8 { margin: 2rem !important; }

// Directional
.u-mt-4 { margin-top: 1rem !important; }
.u-mr-4 { margin-right: 1rem !important; }
.u-mb-4 { margin-bottom: 1rem !important; }
.u-ml-4 { margin-left: 1rem !important; }

// Axis
.u-mx-4 { margin-left: 1rem !important; margin-right: 1rem !important; }
.u-my-4 { margin-top: 1rem !important; margin-bottom: 1rem !important; }

// Auto margins
.u-mx-auto { margin-left: auto !important; margin-right: auto !important; }
```

### Padding Utilities

```scss
// All sides
.u-p-0 { padding: 0 !important; }
.u-p-4 { padding: 1rem !important; }
.u-p-8 { padding: 2rem !important; }

// Directional
.u-pt-4 { padding-top: 1rem !important; }
.u-pr-4 { padding-right: 1rem !important; }
.u-pb-4 { padding-bottom: 1rem !important; }
.u-pl-4 { padding-left: 1rem !important; }

// Axis
.u-px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
.u-py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
```

### Gap Utilities

```scss
.u-gap-4 { gap: 1rem !important; }
.u-gap-8 { gap: 2rem !important; }
.u-row-gap-4 { row-gap: 1rem !important; }
.u-column-gap-4 { column-gap: 1rem !important; }
```

### Responsive Utilities

All spacing utilities have responsive variants:

```scss
// Responsive margin
.u-m-md-8 { 
  @include media-breakpoint-up(md) {
    margin: 2rem !important;
  }
}

// Responsive padding
.u-p-lg-12 {
  @include media-breakpoint-up(lg) {
    padding: 3rem !important;
  }
}
```

## Best Practices

### Do's ✅

```scss
// Use spacing scale values
.component {
  padding: var(--atomix-spacing-4);
  margin-bottom: var(--atomix-spacing-8);
}

// Use semantic spacing tokens
.card {
  padding: var(--atomix-component-padding-md);
  margin-bottom: var(--atomix-layout-gap-md);
}

// Follow responsive patterns
.hero {
  padding: var(--atomix-spacing-16);
  
  @include media-breakpoint-up(lg) {
    padding: var(--atomix-spacing-24);
  }
}
```

### Don'ts ❌

```scss
// Don't use arbitrary values
.bad-example {
  padding: 13px; // Not on the scale
  margin: 0.8125rem; // Arbitrary value
}

// Don't break the scale
.another-bad-example {
  padding: calc(var(--atomix-spacing-4) + 3px); // Breaks consistency
}

// Don't ignore responsive design
.fixed-spacing {
  padding: 2rem; // Same on all devices
}
```

### Component Spacing Patterns

```scss
// Card component with consistent spacing
.c-card {
  padding: var(--atomix-spacing-6);
  margin-bottom: var(--atomix-spacing-8);
  
  &__header {
    margin-bottom: var(--atomix-spacing-4);
  }
  
  &__body {
    margin-bottom: var(--atomix-spacing-4);
    
    > *:last-child {
      margin-bottom: 0;
    }
  }
  
  &__footer {
    margin-top: var(--atomix-spacing-4);
    padding-top: var(--atomix-spacing-4);
    border-top: 1px solid var(--atomix-border-primary);
  }
}
```

## API Reference

### SCSS Variables

```scss
// Base spacing
$spacer: 1rem;
$spacing-sizes: (/* scale map */);

// Semantic tokens
$component-padding-sm: 0.75rem;
$component-padding-md: 1rem;
$component-padding-lg: 1.5rem;
$layout-gap-sm: 2rem;
$layout-gap-md: 3rem;
$layout-gap-lg: 4rem;

// Container settings
$container-max-widths: (/* breakpoint map */);
$container-padding-x: 1rem;

// Grid settings
$grid-columns: 12;
$grid-gutter-width: 1.5rem;
```

### CSS Custom Properties

```scss
// Spacing scale
--atomix-spacing-0 through --atomix-spacing-90

// Semantic spacing
--atomix-component-padding-sm
--atomix-component-padding-md
--atomix-component-padding-lg
--atomix-layout-gap-sm
--atomix-layout-gap-md
--atomix-layout-gap-lg

// Container
--atomix-container-max-width
--atomix-container-padding-x

// Grid
--atomix-grid-columns
--atomix-grid-gap
```

### Utility Classes

```scss
// Margin: .u-m{t|r|b|l|x|y}-{0-90}
// Padding: .u-p{t|r|b|l|x|y}-{0-90}
// Gap: .u-gap-{0-90}, .u-row-gap-{0-90}, .u-column-gap-{0-90}

// Responsive variants: .u-{property}-{breakpoint}-{value}
// Example: .u-p-md-8, .u-mt-lg-12
```

---

## Related Documentation

- [Styles Architecture](../styles/architecture.md) - Overall system architecture
- [Color System](./colors.md) - Color tokens and usage
- [CSS Utilities](../styles/utilities.md) - Complete utility reference
- [Customization Guide](../styles/customization.md) - Advanced customization

## Tools & Resources

- [Modular Scale](https://www.modularscale.com/) - Mathematical spacing relationships
- [Spacing in Design Systems](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62) - Best practices article
