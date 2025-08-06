# CSS API Reference

Complete reference for CSS classes, custom properties, and styling utilities in the Atomix Design System.

## 🎨 CSS Custom Properties

### Color Properties

```css
/* Primary colors */
--atomix-primary: #7c3aed;
--atomix-primary-rgb: 124, 58, 237;
--atomix-primary-hover: #6d28d9;
--atomix-primary-active: #5b21b6;

/* Semantic colors */
--atomix-success: #22c55e;
--atomix-error: #ef4444;
--atomix-warning: #eab308;
--atomix-info: #3b82f6;

/* Text colors */
--atomix-text-primary: #111827;
--atomix-text-secondary: #6b7280;
--atomix-text-tertiary: #9ca3af;
--atomix-text-disabled: #d1d5db;

/* Background colors */
--atomix-bg-primary: #ffffff;
--atomix-bg-secondary: #f9fafb;
--atomix-bg-tertiary: #f3f4f6;

/* Border colors */
--atomix-border-primary: #e5e7eb;
--atomix-border-secondary: #d1d5db;
```

### Spacing Properties

```css
/* Spacing scale */
--atomix-spacing-0: 0rem;
--atomix-spacing-1: 0.25rem;    /* 4px */
--atomix-spacing-2: 0.5rem;     /* 8px */
--atomix-spacing-3: 0.75rem;    /* 12px */
--atomix-spacing-4: 1rem;       /* 16px */
--atomix-spacing-5: 1.25rem;    /* 20px */
--atomix-spacing-6: 1.5rem;     /* 24px */
--atomix-spacing-8: 2rem;       /* 32px */
--atomix-spacing-10: 2.5rem;    /* 40px */
--atomix-spacing-12: 3rem;      /* 48px */
--atomix-spacing-16: 4rem;      /* 64px */
--atomix-spacing-20: 5rem;      /* 80px */
--atomix-spacing-24: 6rem;      /* 96px */
--atomix-spacing-32: 8rem;      /* 128px */
```

### Typography Properties

```css
/* Font families */
--atomix-font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--atomix-font-family-heading: var(--atomix-font-family-base);
--atomix-font-family-mono: 'Fira Code', 'Monaco', 'Consolas', monospace;

/* Font sizes */
--atomix-font-size-xs: 0.75rem;     /* 12px */
--atomix-font-size-sm: 0.875rem;    /* 14px */
--atomix-font-size-base: 1rem;      /* 16px */
--atomix-font-size-lg: 1.125rem;    /* 18px */
--atomix-font-size-xl: 1.25rem;     /* 20px */
--atomix-font-size-2xl: 1.5rem;     /* 24px */
--atomix-font-size-3xl: 1.875rem;   /* 30px */
--atomix-font-size-4xl: 2.25rem;    /* 36px */

/* Font weights */
--atomix-font-weight-light: 300;
--atomix-font-weight-normal: 400;
--atomix-font-weight-medium: 500;
--atomix-font-weight-semibold: 600;
--atomix-font-weight-bold: 700;

/* Line heights */
--atomix-line-height-none: 1;
--atomix-line-height-tight: 1.25;
--atomix-line-height-normal: 1.5;
--atomix-line-height-relaxed: 1.625;
```

### Component Properties

```css
/* Button */
--atomix-btn-padding-x: 1rem;
--atomix-btn-padding-y: 0.5rem;
--atomix-btn-font-size: 1rem;
--atomix-btn-border-radius: 0.375rem;
--atomix-btn-border-width: 1px;

/* Card */
--atomix-card-padding: 1.5rem;
--atomix-card-border-radius: 0.5rem;
--atomix-card-border-width: 1px;
--atomix-card-bg: var(--atomix-bg-primary);
--atomix-card-border-color: var(--atomix-border-primary);

/* Modal */
--atomix-modal-backdrop-bg: rgba(0, 0, 0, 0.5);
--atomix-modal-content-bg: var(--atomix-bg-primary);
--atomix-modal-border-radius: 0.5rem;
--atomix-modal-padding: 1.5rem;
```

## 🧩 Component Classes

### Button Component

```css
/* Base button */
.c-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--atomix-btn-padding-y) var(--atomix-btn-padding-x);
  font-size: var(--atomix-btn-font-size);
  font-weight: var(--atomix-font-weight-medium);
  line-height: var(--atomix-line-height-none);
  border: var(--atomix-btn-border-width) solid transparent;
  border-radius: var(--atomix-btn-border-radius);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

/* Button variants */
.c-btn--primary {
  color: var(--atomix-white);
  background-color: var(--atomix-primary);
  border-color: var(--atomix-primary);
}

.c-btn--secondary {
  color: var(--atomix-text-primary);
  background-color: var(--atomix-bg-secondary);
  border-color: var(--atomix-border-primary);
}

.c-btn--success {
  color: var(--atomix-white);
  background-color: var(--atomix-success);
  border-color: var(--atomix-success);
}

/* Button sizes */
.c-btn--sm {
  --atomix-btn-padding-x: 0.75rem;
  --atomix-btn-padding-y: 0.375rem;
  --atomix-btn-font-size: 0.875rem;
}

.c-btn--lg {
  --atomix-btn-padding-x: 1.5rem;
  --atomix-btn-padding-y: 0.75rem;
  --atomix-btn-font-size: 1.125rem;
}

/* Button states */
.c-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.c-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
```

### Card Component

```css
/* Base card */
.c-card {
  display: flex;
  flex-direction: column;
  background-color: var(--atomix-card-bg);
  border: var(--atomix-card-border-width) solid var(--atomix-card-border-color);
  border-radius: var(--atomix-card-border-radius);
  overflow: hidden;
}

/* Card sections */
.c-card__header {
  padding: var(--atomix-card-padding);
  border-bottom: 1px solid var(--atomix-border-primary);
}

.c-card__body {
  flex: 1;
  padding: var(--atomix-card-padding);
}

.c-card__footer {
  padding: var(--atomix-card-padding);
  border-top: 1px solid var(--atomix-border-primary);
}

/* Card variants */
.c-card--elevated {
  box-shadow: var(--atomix-shadow-md);
  border: none;
}

.c-card--bordered {
  border-width: 2px;
}
```

### Modal Component

```css
/* Modal backdrop */
.c-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
}

.c-modal__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: var(--atomix-modal-backdrop-bg);
}

/* Modal dialog */
.c-modal__dialog {
  position: relative;
  width: auto;
  margin: 1.75rem;
  pointer-events: none;
}

.c-modal__content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--atomix-modal-content-bg);
  border-radius: var(--atomix-modal-border-radius);
  box-shadow: var(--atomix-shadow-lg);
  pointer-events: auto;
}

/* Modal sections */
.c-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--atomix-modal-padding);
  border-bottom: 1px solid var(--atomix-border-primary);
}

.c-modal__body {
  position: relative;
  flex: 1 1 auto;
  padding: var(--atomix-modal-padding);
}

.c-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--atomix-spacing-3);
  padding: var(--atomix-modal-padding);
  border-top: 1px solid var(--atomix-border-primary);
}

/* Modal sizes */
.c-modal--sm .c-modal__dialog {
  max-width: 300px;
}

.c-modal--lg .c-modal__dialog {
  max-width: 800px;
}

.c-modal--xl .c-modal__dialog {
  max-width: 1140px;
}
```

## 🛠️ Utility Classes

### Spacing Utilities

```css
/* Margin utilities */
.u-m-0 { margin: 0 !important; }
.u-m-1 { margin: 0.25rem !important; }
.u-m-2 { margin: 0.5rem !important; }
.u-m-3 { margin: 0.75rem !important; }
.u-m-4 { margin: 1rem !important; }
.u-m-5 { margin: 1.25rem !important; }
.u-m-6 { margin: 1.5rem !important; }
.u-m-8 { margin: 2rem !important; }

/* Directional margins */
.u-mt-4 { margin-top: 1rem !important; }
.u-mr-4 { margin-right: 1rem !important; }
.u-mb-4 { margin-bottom: 1rem !important; }
.u-ml-4 { margin-left: 1rem !important; }

/* Axis margins */
.u-mx-4 { margin-left: 1rem !important; margin-right: 1rem !important; }
.u-my-4 { margin-top: 1rem !important; margin-bottom: 1rem !important; }

/* Auto margins */
.u-mx-auto { margin-left: auto !important; margin-right: auto !important; }

/* Padding utilities */
.u-p-0 { padding: 0 !important; }
.u-p-1 { padding: 0.25rem !important; }
.u-p-2 { padding: 0.5rem !important; }
.u-p-3 { padding: 0.75rem !important; }
.u-p-4 { padding: 1rem !important; }
.u-p-5 { padding: 1.25rem !important; }
.u-p-6 { padding: 1.5rem !important; }
.u-p-8 { padding: 2rem !important; }

/* Directional padding */
.u-pt-4 { padding-top: 1rem !important; }
.u-pr-4 { padding-right: 1rem !important; }
.u-pb-4 { padding-bottom: 1rem !important; }
.u-pl-4 { padding-left: 1rem !important; }

/* Axis padding */
.u-px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
.u-py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
```

### Display Utilities

```css
.u-d-none { display: none !important; }
.u-d-inline { display: inline !important; }
.u-d-inline-block { display: inline-block !important; }
.u-d-block { display: block !important; }
.u-d-grid { display: grid !important; }
.u-d-table { display: table !important; }
.u-d-table-row { display: table-row !important; }
.u-d-table-cell { display: table-cell !important; }
.u-d-flex { display: flex !important; }
.u-d-inline-flex { display: inline-flex !important; }
```

### Flexbox Utilities

```css
/* Flex direction */
.u-flex-row { flex-direction: row !important; }
.u-flex-row-reverse { flex-direction: row-reverse !important; }
.u-flex-column { flex-direction: column !important; }
.u-flex-column-reverse { flex-direction: column-reverse !important; }

/* Flex wrap */
.u-flex-wrap { flex-wrap: wrap !important; }
.u-flex-nowrap { flex-wrap: nowrap !important; }
.u-flex-wrap-reverse { flex-wrap: wrap-reverse !important; }

/* Justify content */
.u-justify-content-start { justify-content: flex-start !important; }
.u-justify-content-end { justify-content: flex-end !important; }
.u-justify-content-center { justify-content: center !important; }
.u-justify-content-between { justify-content: space-between !important; }
.u-justify-content-around { justify-content: space-around !important; }
.u-justify-content-evenly { justify-content: space-evenly !important; }

/* Align items */
.u-align-items-start { align-items: flex-start !important; }
.u-align-items-end { align-items: flex-end !important; }
.u-align-items-center { align-items: center !important; }
.u-align-items-baseline { align-items: baseline !important; }
.u-align-items-stretch { align-items: stretch !important; }

/* Flex grow/shrink */
.u-flex-fill { flex: 1 1 auto !important; }
.u-flex-grow-0 { flex-grow: 0 !important; }
.u-flex-grow-1 { flex-grow: 1 !important; }
.u-flex-shrink-0 { flex-shrink: 0 !important; }
.u-flex-shrink-1 { flex-shrink: 1 !important; }
```

### Typography Utilities

```css
/* Font sizes */
.u-fs-xs { font-size: var(--atomix-font-size-xs) !important; }
.u-fs-sm { font-size: var(--atomix-font-size-sm) !important; }
.u-fs-base { font-size: var(--atomix-font-size-base) !important; }
.u-fs-lg { font-size: var(--atomix-font-size-lg) !important; }
.u-fs-xl { font-size: var(--atomix-font-size-xl) !important; }
.u-fs-2xl { font-size: var(--atomix-font-size-2xl) !important; }
.u-fs-3xl { font-size: var(--atomix-font-size-3xl) !important; }
.u-fs-4xl { font-size: var(--atomix-font-size-4xl) !important; }

/* Font weights */
.u-fw-light { font-weight: var(--atomix-font-weight-light) !important; }
.u-fw-normal { font-weight: var(--atomix-font-weight-normal) !important; }
.u-fw-medium { font-weight: var(--atomix-font-weight-medium) !important; }
.u-fw-semibold { font-weight: var(--atomix-font-weight-semibold) !important; }
.u-fw-bold { font-weight: var(--atomix-font-weight-bold) !important; }

/* Text alignment */
.u-text-start { text-align: left !important; }
.u-text-end { text-align: right !important; }
.u-text-center { text-align: center !important; }
.u-text-justify { text-align: justify !important; }

/* Text transform */
.u-text-lowercase { text-transform: lowercase !important; }
.u-text-uppercase { text-transform: uppercase !important; }
.u-text-capitalize { text-transform: capitalize !important; }

/* Line height */
.u-lh-1 { line-height: 1 !important; }
.u-lh-sm { line-height: var(--atomix-line-height-tight) !important; }
.u-lh-base { line-height: var(--atomix-line-height-normal) !important; }
.u-lh-lg { line-height: var(--atomix-line-height-relaxed) !important; }
```

### Color Utilities

```css
/* Text colors */
.u-text-primary { color: var(--atomix-text-primary) !important; }
.u-text-secondary { color: var(--atomix-text-secondary) !important; }
.u-text-success { color: var(--atomix-success) !important; }
.u-text-error { color: var(--atomix-error) !important; }
.u-text-warning { color: var(--atomix-warning) !important; }
.u-text-info { color: var(--atomix-info) !important; }

/* Background colors */
.u-bg-primary { background-color: var(--atomix-bg-primary) !important; }
.u-bg-secondary { background-color: var(--atomix-bg-secondary) !important; }
.u-bg-success { background-color: var(--atomix-success) !important; }
.u-bg-error { background-color: var(--atomix-error) !important; }
.u-bg-warning { background-color: var(--atomix-warning) !important; }
.u-bg-info { background-color: var(--atomix-info) !important; }
```

## 📱 Responsive Utilities

All utility classes have responsive variants:

```css
/* Responsive display utilities */
@media (min-width: 576px) {
  .u-d-sm-none { display: none !important; }
  .u-d-sm-flex { display: flex !important; }
  .u-d-sm-block { display: block !important; }
}

@media (min-width: 768px) {
  .u-d-md-none { display: none !important; }
  .u-d-md-flex { display: flex !important; }
  .u-d-md-block { display: block !important; }
}

@media (min-width: 992px) {
  .u-d-lg-none { display: none !important; }
  .u-d-lg-flex { display: flex !important; }
  .u-d-lg-block { display: block !important; }
}

/* Responsive spacing utilities */
@media (min-width: 768px) {
  .u-p-md-6 { padding: 1.5rem !important; }
  .u-m-md-8 { margin: 2rem !important; }
}

/* Responsive typography utilities */
@media (min-width: 768px) {
  .u-fs-md-lg { font-size: var(--atomix-font-size-lg) !important; }
  .u-text-md-start { text-align: left !important; }
}
```

## 🎨 Theme Support

### Dark Theme

```css
[data-theme="dark"] {
  --atomix-text-primary: #f9fafb;
  --atomix-text-secondary: #d1d5db;
  --atomix-bg-primary: #1f2937;
  --atomix-bg-secondary: #374151;
  --atomix-border-primary: #4b5563;
}
```

### Custom Themes

```css
[data-theme="brand"] {
  --atomix-primary: #your-brand-color;
  --atomix-bg-primary: #your-bg-color;
  --atomix-text-primary: #your-text-color;
}
```

## 🔗 Related Documentation

- [React API](./react.md) - React component reference
- [JavaScript API](./javascript.md) - Vanilla JavaScript classes
- [Styles System](../styles/README.md) - CSS architecture and customization
- [Design Tokens](../design-tokens/README.md) - Design system foundation

---

Complete CSS API for styling with Atomix! 🎨
