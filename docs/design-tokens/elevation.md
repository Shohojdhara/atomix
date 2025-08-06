# Elevation System

The Atomix Elevation System provides a consistent approach to creating depth and hierarchy through shadows, creating visual layers that guide user attention and establish content relationships.

## 🏔️ Elevation Philosophy

### Design Principles

1. **Hierarchy** - Higher elevation indicates greater importance
2. **Consistency** - Predictable shadow progression across components
3. **Subtlety** - Shadows enhance without overwhelming
4. **Accessibility** - Works across light and dark themes
5. **Performance** - Optimized for smooth animations

### Elevation Metaphor

Atomix uses a **material design-inspired** elevation system where components exist on different layers:

```
Layer 0: Base surface (no shadow)
Layer 1: Slightly raised (cards, buttons)
Layer 2: Floating elements (dropdowns, tooltips)
Layer 3: Modal overlays
Layer 4: Notifications and alerts
Layer 5: Maximum elevation (rare use)
```

## 📏 Shadow Scale

### Core Shadow Levels

```scss
$shadow-levels: (
  none: none,
  xs: 0 1px 2px rgba(0, 0, 0, 0.05),
  sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06),
  md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06),
  lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05),
  xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04),
  2xl: 0 25px 50px rgba(0, 0, 0, 0.25),
  inner: inset 0 2px 4px rgba(0, 0, 0, 0.06)
) !default;
```

### Usage Guidelines

| Level | Elevation | Use Case | Examples |
|-------|-----------|----------|----------|
| `none` | 0 | Flat surfaces | Base backgrounds, dividers |
| `xs` | 1 | Subtle depth | Borders, subtle cards |
| `sm` | 2 | Slightly raised | Buttons, form inputs |
| `md` | 4 | Floating content | Cards, panels |
| `lg` | 8 | Prominent elements | Dropdowns, popovers |
| `xl` | 16 | Modal content | Dialogs, overlays |
| `2xl` | 24 | Maximum elevation | Notifications, alerts |
| `inner` | - | Inset elements | Pressed buttons, inputs |

## 🎨 CSS Custom Properties

### Shadow Properties

```css
:root {
  /* Shadow levels */
  --atomix-shadow-none: none;
  --atomix-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --atomix-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  --atomix-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  --atomix-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  --atomix-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
  --atomix-shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
  --atomix-shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
  
  /* Colored shadows */
  --atomix-shadow-primary: 0 4px 6px rgba(124, 58, 237, 0.1);
  --atomix-shadow-success: 0 4px 6px rgba(34, 197, 94, 0.1);
  --atomix-shadow-error: 0 4px 6px rgba(239, 68, 68, 0.1);
  --atomix-shadow-warning: 0 4px 6px rgba(234, 179, 8, 0.1);
}
```

### Dark Theme Shadows

```css
[data-theme="dark"] {
  --atomix-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.3);
  --atomix-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3);
  --atomix-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3);
  --atomix-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4), 0 4px 6px rgba(0, 0, 0, 0.3);
  --atomix-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.4), 0 10px 10px rgba(0, 0, 0, 0.3);
  --atomix-shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.5);
}
```

## 🛠️ Usage Examples

### Basic Shadow Application

```css
/* Apply shadows using custom properties */
.card {
  box-shadow: var(--atomix-shadow-md);
}

.dropdown {
  box-shadow: var(--atomix-shadow-lg);
}

.modal {
  box-shadow: var(--atomix-shadow-xl);
}

.button:active {
  box-shadow: var(--atomix-shadow-inner);
}
```

### Interactive Shadows

```css
/* Hover effects with shadow transitions */
.interactive-card {
  box-shadow: var(--atomix-shadow-sm);
  transition: box-shadow 0.3s ease;
}

.interactive-card:hover {
  box-shadow: var(--atomix-shadow-lg);
  transform: translateY(-2px);
}

.interactive-card:active {
  box-shadow: var(--atomix-shadow-xs);
  transform: translateY(0);
}
```

### Colored Shadows

```css
/* Brand-colored shadows for emphasis */
.primary-button {
  background-color: var(--atomix-primary);
  box-shadow: var(--atomix-shadow-primary);
}

.success-alert {
  background-color: var(--atomix-success-bg);
  box-shadow: var(--atomix-shadow-success);
}

.error-notification {
  background-color: var(--atomix-error-bg);
  box-shadow: var(--atomix-shadow-error);
}
```

## 🎯 Component Elevation Patterns

### Card Elevation

```css
/* Base card */
.c-card {
  box-shadow: var(--atomix-shadow-sm);
  transition: box-shadow 0.2s ease;
}

/* Elevated card variant */
.c-card--elevated {
  box-shadow: var(--atomix-shadow-md);
}

/* Interactive card */
.c-card--interactive:hover {
  box-shadow: var(--atomix-shadow-lg);
}

/* Floating card */
.c-card--floating {
  box-shadow: var(--atomix-shadow-xl);
}
```

### Button Elevation

```css
/* Button states */
.c-btn {
  box-shadow: var(--atomix-shadow-sm);
  transition: all 0.15s ease;
}

.c-btn:hover {
  box-shadow: var(--atomix-shadow-md);
  transform: translateY(-1px);
}

.c-btn:active {
  box-shadow: var(--atomix-shadow-inner);
  transform: translateY(0);
}

/* Flat button variant */
.c-btn--flat {
  box-shadow: none;
}

/* Raised button variant */
.c-btn--raised {
  box-shadow: var(--atomix-shadow-md);
}
```

### Modal Elevation

```css
/* Modal backdrop */
.c-modal__backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Modal content */
.c-modal__content {
  box-shadow: var(--atomix-shadow-2xl);
}

/* Modal sizes with different elevations */
.c-modal--sm .c-modal__content {
  box-shadow: var(--atomix-shadow-lg);
}

.c-modal--lg .c-modal__content {
  box-shadow: var(--atomix-shadow-2xl);
}
```

### Dropdown Elevation

```css
/* Dropdown menu */
.c-dropdown__menu {
  box-shadow: var(--atomix-shadow-lg);
  border: 1px solid var(--atomix-border-primary);
}

/* Nested dropdown */
.c-dropdown__submenu {
  box-shadow: var(--atomix-shadow-xl);
}
```

## 📱 Responsive Elevation

### Mobile Considerations

```css
/* Reduce shadows on mobile for performance */
@media (max-width: 768px) {
  .c-card {
    box-shadow: var(--atomix-shadow-xs);
  }
  
  .c-modal__content {
    box-shadow: var(--atomix-shadow-lg);
  }
}

/* Touch-friendly elevation */
@media (hover: none) {
  .interactive-element:hover {
    box-shadow: var(--atomix-shadow-sm); /* Reduced hover effect */
  }
}
```

### Reduced Motion

```css
/* Respect user preferences for reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
  
  .hover-shadow:hover {
    transform: none !important;
  }
}
```

## 🛠️ Utility Classes

### Shadow Utilities

```css
/* Shadow utility classes */
.u-shadow-none { box-shadow: var(--atomix-shadow-none) !important; }
.u-shadow-xs { box-shadow: var(--atomix-shadow-xs) !important; }
.u-shadow-sm { box-shadow: var(--atomix-shadow-sm) !important; }
.u-shadow-md { box-shadow: var(--atomix-shadow-md) !important; }
.u-shadow-lg { box-shadow: var(--atomix-shadow-lg) !important; }
.u-shadow-xl { box-shadow: var(--atomix-shadow-xl) !important; }
.u-shadow-2xl { box-shadow: var(--atomix-shadow-2xl) !important; }
.u-shadow-inner { box-shadow: var(--atomix-shadow-inner) !important; }

/* Colored shadow utilities */
.u-shadow-primary { box-shadow: var(--atomix-shadow-primary) !important; }
.u-shadow-success { box-shadow: var(--atomix-shadow-success) !important; }
.u-shadow-error { box-shadow: var(--atomix-shadow-error) !important; }
.u-shadow-warning { box-shadow: var(--atomix-shadow-warning) !important; }
```

### Responsive Shadow Utilities

```css
/* Responsive shadow utilities */
@media (min-width: 576px) {
  .u-shadow-sm-sm { box-shadow: var(--atomix-shadow-sm) !important; }
  .u-shadow-sm-md { box-shadow: var(--atomix-shadow-md) !important; }
  .u-shadow-sm-lg { box-shadow: var(--atomix-shadow-lg) !important; }
}

@media (min-width: 768px) {
  .u-shadow-md-sm { box-shadow: var(--atomix-shadow-sm) !important; }
  .u-shadow-md-md { box-shadow: var(--atomix-shadow-md) !important; }
  .u-shadow-md-lg { box-shadow: var(--atomix-shadow-lg) !important; }
}
```

## 🎨 Advanced Elevation Techniques

### Layered Shadows

```css
/* Complex layered shadows for depth */
.complex-elevation {
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24),
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.08);
}
```

### Animated Elevation

```css
/* Smooth elevation animations */
@keyframes elevate {
  from {
    box-shadow: var(--atomix-shadow-sm);
    transform: translateY(0);
  }
  to {
    box-shadow: var(--atomix-shadow-lg);
    transform: translateY(-4px);
  }
}

.animate-elevate {
  animation: elevate 0.3s ease-out forwards;
}
```

### Custom Shadow Functions

```scss
// SCSS function for custom shadows
@function custom-shadow($level, $color: rgba(0, 0, 0, 0.1)) {
  $shadows: (
    1: 0 1px 3px $color,
    2: 0 4px 6px $color,
    3: 0 10px 15px $color,
    4: 0 20px 25px $color,
    5: 0 25px 50px $color
  );
  
  @return map.get($shadows, $level);
}

// Usage
.custom-element {
  box-shadow: custom-shadow(3, rgba(124, 58, 237, 0.15));
}
```

## ♿ Accessibility Considerations

### High Contrast Mode

```css
/* Ensure shadows work in high contrast mode */
@media (prefers-contrast: high) {
  .elevated-element {
    border: 1px solid;
    box-shadow: none;
  }
}
```

### Focus Indicators

```css
/* Combine shadows with focus indicators */
.focusable-element:focus {
  outline: 2px solid var(--atomix-primary);
  outline-offset: 2px;
  box-shadow: 
    var(--atomix-shadow-md),
    0 0 0 4px rgba(124, 58, 237, 0.1);
}
```

## 📊 API Reference

### SCSS Variables

```scss
// Shadow levels
$shadow-none: none !default;
$shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05) !default;
$shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06) !default;
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06) !default;
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05) !default;
$shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04) !default;
$shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25) !default;
$shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06) !default;
```

### CSS Custom Properties

```css
/* All shadow custom properties */
--atomix-shadow-none through --atomix-shadow-2xl
--atomix-shadow-inner
--atomix-shadow-primary
--atomix-shadow-success
--atomix-shadow-error
--atomix-shadow-warning
```

### Utility Classes

```css
/* Shadow utilities */
.u-shadow-{none|xs|sm|md|lg|xl|2xl|inner}
.u-shadow-{primary|success|error|warning}

/* Responsive variants */
.u-shadow-{breakpoint}-{level}
```

## 🔗 Related Documentation

- [Color System](./colors.md) - Color tokens for shadow tinting
- [Spacing System](./spacing.md) - Spacing relationships
- [Styles Architecture](../styles/architecture.md) - CSS organization
- [Component Guidelines](../components/guidelines.md) - Using elevation in components

---

Create depth and hierarchy with the Atomix Elevation System! 🏔️
