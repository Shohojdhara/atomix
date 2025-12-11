# Design Tokens

Design tokens are the foundational elements of the Atomix Design System. They define the visual properties that create consistent, cohesive user interfaces across all platforms and products.

## 🎨 What are Design Tokens?

Design tokens are named entities that store visual design attributes. They're the single source of truth for design decisions, ensuring consistency across:

- **Colors** - Brand colors, semantic colors, and neutral palettes
- **Typography** - Font families, sizes, weights, and line heights
- **Spacing** - Margins, padding, and layout spacing
- **Elevation** - Shadows and depth
- **Border Radius** - Corner rounding values
- **Breakpoints** - Responsive design breakpoints

## 📚 Token Categories

### 🌈 [Colors](./colors.md)
Complete color system with semantic meaning and accessibility compliance.

```css
/* Primary colors */
--atomix-primary: #7c3aed;
--atomix-primary-hover: #6d28d9;

/* Semantic colors */
--atomix-success: #22c55e;
--atomix-error: #ef4444;
--atomix-warning: #eab308;
--atomix-info: #3b82f6;
```

**Features:**
- 10-step color scales for each hue (primary, secondary, error, success, warning, info, red, green, blue, yellow, gray)
- Light and dark color tokens (`--atomix-light`, `--atomix-dark`)
- Gradient tokens for all colors
- Text emphasis variants (primary, secondary, tertiary, disabled, invert, brand)
- Background and border subtle variants
- Hover state colors
- RGB variants for transparency support
- Light and dark theme support
- WCAG 2.1 AA compliance
- Semantic color tokens

### 📏 [Spacing](./spacing.md)
Mathematical spacing system based on a 4px grid for visual harmony.

```css
/* Spacing scale */
--atomix-spacing-1: 0.25rem;  /* 4px */
--atomix-spacing-4: 1rem;     /* 16px */
--atomix-spacing-8: 2rem;     /* 32px */
--atomix-spacing-16: 4rem;    /* 64px */
```

**Features:**
- Consistent 4px base unit
- Responsive spacing patterns
- Layout and component spacing
- Utility class generation

### ✍️ [Typography](./typography.md)
Type system with readable, accessible font stacks and scales.

```css
/* Font families */
--atomix-font-family-base: 'Inter', sans-serif;
--atomix-font-family-heading: 'Inter', sans-serif;
--atomix-font-family-mono: 'Fira Code', monospace;

/* Font sizes */
--atomix-font-size-sm: 0.875rem;
--atomix-font-size-base: 1rem;
--atomix-font-size-lg: 1.125rem;
--atomix-font-size-xl: 1.25rem;
```

**Features:**
- Modular type scale
- Responsive typography
- Accessible font stacks
- Line height optimization

### 🏔️ [Elevation](./elevation.md)
Shadow system for creating depth and hierarchy.

```css
/* Shadow levels */
--atomix-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--atomix-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--atomix-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--atomix-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
```

**Features:**
- Consistent shadow progression
- Multiple elevation levels
- Dark theme compatibility
- Focus and interaction states

## 🔧 Using Design Tokens

### CSS Custom Properties

All design tokens are available as CSS custom properties:

```css
.my-component {
  color: var(--atomix-text-primary);
  background-color: var(--atomix-bg-primary);
  padding: var(--atomix-spacing-4);
  border-radius: var(--atomix-border-radius);
  box-shadow: var(--atomix-shadow-md);
}
```

### SCSS Variables

For build-time customization, use SCSS variables:

```scss
@use '@shohojdhara/atomix/styles' with (
  $primary-6: #your-brand-color,
  $font-family-base: 'Your Font',
  $border-radius: 0.5rem
);
```

### JavaScript/TypeScript

Access tokens programmatically:

```javascript
import { tokens } from '@shohojdhara/atomix';

const primaryColor = tokens.colors.primary;
const spacingMd = tokens.spacing[4];
const fontSizeLg = tokens.typography.fontSize.lg;
```

## 🎯 Token Naming Convention

Atomix follows a consistent naming pattern for all tokens:

```
--atomix-{category}-{property}-{variant}
```

**Examples:**
- `--atomix-color-primary-6` - Primary color, step 6
- `--atomix-spacing-4` - Spacing token, 4 units
- `--atomix-font-size-lg` - Large font size
- `--atomix-shadow-md` - Medium shadow

## 🌓 Theme Support

### Light and Dark Themes

All tokens support automatic theme switching:

```css
:root {
  --atomix-bg-primary: #ffffff;
  --atomix-text-primary: #111827;
}

[data-theme="dark"] {
  --atomix-bg-primary: #1f2937;
  --atomix-text-primary: #f9fafb;
}
```

### Custom Themes

Create custom themes by overriding token values:

```css
[data-theme="brand"] {
  --atomix-primary: #your-brand-color;
  --atomix-bg-primary: #your-bg-color;
  --atomix-text-primary: #your-text-color;
}
```

## 📱 Responsive Tokens

Some tokens adapt to screen size:

```css
/* Base (mobile) */
--atomix-container-padding: 1rem;
--atomix-font-size-heading: 1.5rem;

/* Tablet and up */
@media (min-width: 768px) {
  --atomix-container-padding: 2rem;
  --atomix-font-size-heading: 2rem;
}

/* Desktop and up */
@media (min-width: 1024px) {
  --atomix-container-padding: 3rem;
  --atomix-font-size-heading: 2.5rem;
}
```

## 🛠️ Customization

### Override Individual Tokens

```css
:root {
  --atomix-primary: #your-brand-color;
  --atomix-border-radius: 0.75rem;
  --atomix-font-family-base: 'Your Font', sans-serif;
}
```

### Build-Time Customization

```scss
@use '@shohojdhara/atomix/styles' with (
  $primary-6: #2563eb,
  $font-family-base: ('Roboto', sans-serif),
  $border-radius: 0.375rem,
  $spacing-base: 1rem
);
```

### Component-Level Customization

```css
.custom-button {
  --atomix-btn-bg: var(--atomix-primary);
  --atomix-btn-color: var(--atomix-white);
  --atomix-btn-padding: var(--atomix-spacing-3) var(--atomix-spacing-6);
}
```

## 🎨 Design Tools Integration

### Figma

Import Atomix tokens into Figma using our design token plugin:

1. Install the Atomix Figma plugin
2. Sync tokens from the design system
3. Use tokens in your designs
4. Export updated tokens back to code

### Sketch

Use our Sketch library with pre-configured tokens:

1. Add the Atomix Sketch library
2. Access tokens through symbols
3. Maintain consistency across designs

## 📊 Token Reference

### Quick Reference

| Category | Count | Examples |
|----------|-------|----------|
| Colors | 100+ | `primary`, `success`, `error`, `light`, `dark` |
| Color Scales | 80+ | `primary-1` through `primary-10`, `gray-1` through `gray-10` |
| Text Emphasis | 12+ | `primary-text-emphasis`, `tertiary-text-emphasis`, `brand-text-emphasis` |
| Background Subtle | 10+ | `primary-bg-subtle`, `tertiary-bg-subtle`, `brand-bg-subtle` |
| Border Subtle | 9+ | `primary-border-subtle`, `brand-border-subtle` |
| Gradients | 9 | `primary-gradient`, `secondary-gradient`, `success-gradient` |
| Hover States | 8+ | `primary-hover`, `secondary-hover`, `light-hover`, `dark-hover` |
| Spacing | 30+ | `0`, `1`, `px-6`, `2`, `4`, `8`, `16`, `200` |
| Typography | 30+ | `sm`, `base`, `lg`, `xl`, `2xl`, `display-1` |
| Shadows | 6 | `xs`, `sm`, `md`, `lg`, `xl`, `inset` |
| Z-Index | 13 | `z-n1`, `z-0`, `z-1` through `z-5`, `z-modal`, `z-tooltip` |
| Breakpoints | 6 | `xs`, `sm`, `md`, `lg`, `xl`, `xxl` |

### Complete References

- **[Colors Reference](./colors.md#api-reference)** - All color tokens
- **[Spacing Reference](./spacing.md#api-reference)** - All spacing tokens
- **[Typography Reference](./typography.md#api-reference)** - All typography tokens
- **[Elevation Reference](./elevation.md#api-reference)** - All shadow tokens

## 🔗 Related Documentation

- [Styles Architecture](../styles/architecture.md) - How tokens fit into the CSS architecture
- [Customization Guide](../styles/customization.md) - Advanced customization techniques
- [Component Guidelines](../components/guidelines.md) - Using tokens in components
- [API Reference](../api/css.md) - Complete CSS API

## 🚀 Next Steps

1. **Explore Color System** - Start with [Colors](./colors.md)
2. **Learn Spacing** - Understand [Spacing & Layout](./spacing.md)
3. **Master Typography** - Read [Typography Guide](./typography.md)
4. **Apply Tokens** - Use in your [Components](../components/README.md)

---

Design tokens are the foundation of consistent, scalable design systems. Master them to build better interfaces! 🎨
