# Typography System

The Atomix Typography System provides a comprehensive, accessible type scale built on mathematical relationships and optimized for readability across all devices and contexts.

## 🎯 Typography Philosophy

### Design Principles

1. **Readability First** - Optimized for legibility and comprehension
2. **Accessible** - WCAG 2.1 AA compliant contrast and sizing
3. **Scalable** - Mathematical relationships ensure harmony
4. **Responsive** - Adapts to different screen sizes and contexts
5. **Performance** - Efficient font loading and rendering

### Type Scale Foundation

Our type scale is based on a **1.25 (Major Third)** ratio, creating harmonious relationships between font sizes:

```
Base: 1rem (16px)
Scale: 1.25 (Major Third)
Range: 0.75rem - 4rem
```

## 📏 Font Size Scale

### Core Scale

```scss
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px - Base size
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 1.875rem;  // 30px
$font-size-4xl: 2.25rem;   // 36px
$font-size-5xl: 3rem;      // 48px
$font-size-6xl: 3.75rem;   // 60px
$font-size-7xl: 4.5rem;    // 72px
$font-size-8xl: 6rem;      // 96px
$font-size-9xl: 8rem;      // 128px
```

### Usage Guidelines

| Size | Use Case | Examples |
|------|----------|----------|
| `xs` | Fine print, captions | Copyright, image captions |
| `sm` | Secondary text, labels | Form labels, metadata |
| `base` | Body text, default | Paragraphs, descriptions |
| `lg` | Emphasized text | Lead paragraphs, callouts |
| `xl` | Small headings | Card titles, section labels |
| `2xl` | Medium headings | Page sections, article titles |
| `3xl` | Large headings | Page titles, hero text |
| `4xl` | Display text | Landing page headlines |
| `5xl+` | Hero text | Marketing headlines, banners |

## 🔤 Font Families

### Primary Font Stack

```scss
$font-family-base: (
  'Inter',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Fira Sans',
  'Droid Sans',
  'Helvetica Neue',
  sans-serif
) !default;
```

**Features:**
- **Inter** - Primary typeface, optimized for UI
- **System fonts** - Fallbacks for performance
- **Cross-platform** - Consistent across operating systems

### Heading Font Stack

```scss
$font-family-heading: $font-family-base !default;
```

**Usage:**
- Same as body text for consistency
- Can be customized for brand differentiation

### Monospace Font Stack

```scss
$font-family-mono: (
  'Fira Code',
  'Monaco',
  'Cascadia Code',
  'Roboto Mono',
  'Consolas',
  'Courier New',
  monospace
) !default;
```

**Features:**
- **Fira Code** - Primary monospace with ligatures
- **Code-optimized** - Designed for programming
- **Consistent spacing** - Fixed-width characters

## ⚖️ Font Weights

### Weight Scale

```scss
$font-weight-thin: 100 !default;
$font-weight-extralight: 200 !default;
$font-weight-light: 300 !default;
$font-weight-normal: 400 !default;      // Default
$font-weight-medium: 500 !default;
$font-weight-semibold: 600 !default;
$font-weight-bold: 700 !default;
$font-weight-extrabold: 800 !default;
$font-weight-black: 900 !default;
```

### Usage Guidelines

| Weight | Use Case | Examples |
|--------|----------|----------|
| `light` (300) | Large text, elegant feel | Hero text, light UI |
| `normal` (400) | Body text, default | Paragraphs, descriptions |
| `medium` (500) | Emphasized text | Important information |
| `semibold` (600) | Headings, labels | Form labels, card titles |
| `bold` (700) | Strong emphasis | Headings, call-to-action |
| `extrabold` (800) | Display text | Marketing headlines |

## 📐 Line Heights

### Line Height Scale

```scss
$line-height-none: 1 !default;
$line-height-tight: 1.25 !default;
$line-height-snug: 1.375 !default;
$line-height-normal: 1.5 !default;      // Default
$line-height-relaxed: 1.625 !default;
$line-height-loose: 2 !default;
```

### Usage Guidelines

| Line Height | Use Case | Examples |
|-------------|----------|----------|
| `none` (1.0) | Single line text | Buttons, badges |
| `tight` (1.25) | Headings, titles | Page titles, card headers |
| `snug` (1.375) | Short text blocks | Captions, labels |
| `normal` (1.5) | Body text | Paragraphs, descriptions |
| `relaxed` (1.625) | Long-form content | Articles, documentation |
| `loose` (2.0) | Spaced content | Poetry, special formatting |

## 🎨 CSS Custom Properties

### Font Size Properties

```css
:root {
  --atomix-font-size-xs: 0.75rem;
  --atomix-font-size-sm: 0.875rem;
  --atomix-font-size-base: 1rem;
  --atomix-font-size-lg: 1.125rem;
  --atomix-font-size-xl: 1.25rem;
  --atomix-font-size-2xl: 1.5rem;
  --atomix-font-size-3xl: 1.875rem;
  --atomix-font-size-4xl: 2.25rem;
  --atomix-font-size-5xl: 3rem;
  --atomix-font-size-6xl: 3.75rem;
}
```

### Font Family Properties

```css
:root {
  --atomix-font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --atomix-font-family-heading: var(--atomix-font-family-base);
  --atomix-font-family-mono: 'Fira Code', 'Monaco', 'Consolas', monospace;
}
```

### Font Weight Properties

```css
:root {
  --atomix-font-weight-light: 300;
  --atomix-font-weight-normal: 400;
  --atomix-font-weight-medium: 500;
  --atomix-font-weight-semibold: 600;
  --atomix-font-weight-bold: 700;
  --atomix-font-weight-extrabold: 800;
}
```

### Line Height Properties

```css
:root {
  --atomix-line-height-none: 1;
  --atomix-line-height-tight: 1.25;
  --atomix-line-height-snug: 1.375;
  --atomix-line-height-normal: 1.5;
  --atomix-line-height-relaxed: 1.625;
  --atomix-line-height-loose: 2;
}
```

## 📱 Responsive Typography

### Fluid Type Scale

```css
/* Responsive font sizes using clamp() */
:root {
  --atomix-font-size-base: clamp(0.875rem, 2.5vw, 1rem);
  --atomix-font-size-lg: clamp(1rem, 3vw, 1.125rem);
  --atomix-font-size-xl: clamp(1.125rem, 3.5vw, 1.25rem);
  --atomix-font-size-2xl: clamp(1.25rem, 4vw, 1.5rem);
  --atomix-font-size-3xl: clamp(1.5rem, 5vw, 1.875rem);
  --atomix-font-size-4xl: clamp(1.875rem, 6vw, 2.25rem);
}
```

### Breakpoint-Specific Sizes

```css
/* Base (mobile) */
.heading-responsive {
  font-size: var(--atomix-font-size-2xl);
  line-height: var(--atomix-line-height-tight);
}

/* Tablet and up */
@media (min-width: 768px) {
  .heading-responsive {
    font-size: var(--atomix-font-size-3xl);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .heading-responsive {
    font-size: var(--atomix-font-size-4xl);
  }
}
```

## 🛠️ Usage Examples

### Basic Typography

```css
/* Body text */
.body-text {
  font-family: var(--atomix-font-family-base);
  font-size: var(--atomix-font-size-base);
  font-weight: var(--atomix-font-weight-normal);
  line-height: var(--atomix-line-height-normal);
}

/* Headings */
.heading-1 {
  font-family: var(--atomix-font-family-heading);
  font-size: var(--atomix-font-size-4xl);
  font-weight: var(--atomix-font-weight-bold);
  line-height: var(--atomix-line-height-tight);
}

/* Code */
.code-text {
  font-family: var(--atomix-font-family-mono);
  font-size: var(--atomix-font-size-sm);
  font-weight: var(--atomix-font-weight-normal);
  line-height: var(--atomix-line-height-normal);
}
```

### Utility Classes

```html
<!-- Font sizes -->
<p class="u-fs-sm">Small text</p>
<p class="u-fs-base">Normal text</p>
<p class="u-fs-lg">Large text</p>
<h1 class="u-fs-4xl">Display heading</h1>

<!-- Font weights -->
<p class="u-fw-light">Light text</p>
<p class="u-fw-normal">Normal text</p>
<p class="u-fw-medium">Medium text</p>
<p class="u-fw-bold">Bold text</p>

<!-- Line heights -->
<p class="u-lh-tight">Tight line height</p>
<p class="u-lh-normal">Normal line height</p>
<p class="u-lh-relaxed">Relaxed line height</p>

<!-- Responsive typography -->
<h1 class="u-fs-2xl u-fs-md-3xl u-fs-lg-4xl">
  Responsive heading
</h1>
```

### Component Typography

```jsx
// React components with typography
<Typography variant="h1" className="u-mb-4">
  Main Heading
</Typography>

<Typography variant="body1" className="u-mb-6">
  This is body text with normal line height and spacing.
</Typography>

<Typography variant="caption" className="u-text-secondary">
  Caption text for additional information.
</Typography>
```

## ♿ Accessibility

### WCAG Compliance

- **Minimum font size**: 16px (1rem) for body text
- **Line height**: Minimum 1.5 for body text
- **Color contrast**: 4.5:1 for normal text, 3:1 for large text
- **Responsive scaling**: Text scales with user preferences

### Best Practices

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Support high contrast mode */
@media (prefers-contrast: high) {
  :root {
    --atomix-font-weight-normal: 600;
    --atomix-font-weight-bold: 800;
  }
}
```

## 🎨 Customization

### Brand Typography

```scss
// Override default fonts
@use '@shohojdhara/atomix/styles' with (
  $font-family-base: ('Your Brand Font', sans-serif),
  $font-family-heading: ('Your Display Font', serif),
  $font-size-base: 1.125rem,
  $line-height-base: 1.6
);
```

### Custom Type Scale

```css
/* Create custom scale */
:root {
  --atomix-font-size-xs: 0.625rem;   /* 10px */
  --atomix-font-size-sm: 0.75rem;    /* 12px */
  --atomix-font-size-base: 0.875rem; /* 14px */
  --atomix-font-size-lg: 1rem;       /* 16px */
  /* ... continue scale */
}
```

## 📊 API Reference

### SCSS Variables

```scss
// Font families
$font-family-base: /* base font stack */
$font-family-heading: /* heading font stack */
$font-family-mono: /* monospace font stack */

// Font sizes
$font-size-xs through $font-size-9xl

// Font weights
$font-weight-thin through $font-weight-black

// Line heights
$line-height-none through $line-height-loose
```

### CSS Custom Properties

```css
/* Font families */
--atomix-font-family-base
--atomix-font-family-heading
--atomix-font-family-mono

/* Font sizes */
--atomix-font-size-xs through --atomix-font-size-9xl

/* Font weights */
--atomix-font-weight-light through --atomix-font-weight-extrabold

/* Line heights */
--atomix-line-height-none through --atomix-line-height-loose
```

### Utility Classes

```css
/* Font sizes */
.u-fs-{xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl}

/* Font weights */
.u-fw-{light|normal|medium|semibold|bold|extrabold}

/* Line heights */
.u-lh-{none|tight|snug|normal|relaxed|loose}

/* Responsive variants */
.u-fs-{breakpoint}-{size}
.u-fw-{breakpoint}-{weight}
.u-lh-{breakpoint}-{height}
```

## 🔗 Related Documentation

- [Color System](./colors.md) - Text colors and contrast
- [Spacing System](./spacing.md) - Text spacing and layout
- [Styles Architecture](../styles/architecture.md) - CSS organization
- [Component Guidelines](../components/guidelines.md) - Typography in components

---

Create beautiful, accessible typography with the Atomix Typography System! ✍️
