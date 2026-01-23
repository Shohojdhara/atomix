# CSS Utility Classes

Atomix provides a comprehensive set of utility classes for rapid UI development. These classes follow a consistent naming convention and cover spacing, layout, typography, colors, and more.

## Overview

Utility classes enable quick styling without writing custom CSS. They follow the ITCSS methodology and are designed to be composable, predictable, and maintainable.

## Naming Convention

Atomix utilities follow a consistent pattern:
```
.u-{property}-{value}
.u-{property}-{breakpoint}-{value}
```

Examples:
- `.u-m-4` - Margin 1rem (4 * 0.25rem)
- `.u-p-8` - Padding 2rem (8 * 0.25rem)
- `.u-text-center` - Center text alignment
- `.u-flex` - Display flex
- `.u-justify-center` - Justify content center

## Spacing Utilities

### Margin Classes

```css
/* All sides - Numeric scale (0.25rem increments) */
.u-m-0      /* 0 */
.u-m-1      /* 0.25rem */
.u-m-2      /* 0.5rem */
.u-m-3      /* 0.75rem */
.u-m-4      /* 1rem */
.u-m-5      /* 1.25rem */
.u-m-6      /* 1.5rem */
.u-m-8      /* 2rem */
.u-m-10     /* 2.5rem */
.u-m-12     /* 3rem */
/* ... up to .u-m-90 (22.5rem) */

/* Specific sides */
.u-mt-4     /* margin-top */
.u-me-6     /* margin-end (right in LTR) */
.u-mb-2     /* margin-bottom */
.u-ms-8     /* margin-start (left in LTR) */

/* Horizontal/Vertical */
.u-mx-4     /* margin-left + margin-right */
.u-my-6     /* margin-top + margin-bottom */

/* Auto margins */
.u-m-auto
.u-mx-auto
.u-my-auto
```

### Padding Classes

```css
/* All sides - Numeric scale (0.25rem increments) */
.u-p-0      /* 0 */
.u-p-1      /* 0.25rem */
.u-p-2      /* 0.5rem */
.u-p-3      /* 0.75rem */
.u-p-4      /* 1rem */
.u-p-5      /* 1.25rem */
.u-p-6      /* 1.5rem */
.u-p-8      /* 2rem */
.u-p-10     /* 2.5rem */
.u-p-12     /* 3rem */
/* ... up to .u-p-90 (22.5rem) */

/* Specific sides */
.u-pt-4     /* padding-top */
.u-pe-6     /* padding-end (right in LTR) */
.u-pb-2     /* padding-bottom */
.u-ps-8     /* padding-start (left in LTR) */

/* Horizontal/Vertical */
.u-px-4     /* padding-left + padding-right */
.u-py-6     /* padding-top + padding-bottom */
```

### Usage Examples

```html
<!-- Card with consistent spacing -->
<div class="c-card u-p-6 u-mb-4">
  <h3 class="u-mb-2">Card Title</h3>
  <p class="u-mb-4">Card content with proper spacing.</p>
  <button class="c-button c-button--primary">Action</button>
</div>

<!-- Form with spacing -->
<form class="u-my-8">
  <div class="u-mb-4">
    <label class="u-mb-1">Email</label>
    <input class="c-input" type="email">
  </div>
  <button class="c-button u-mt-4">Submit</button>
</form>
```

## Layout Utilities

### Display Classes

```css
.u-block
.u-inline
.u-inline-block
.u-flex
.u-inline-flex
.u-grid
.u-none
.u-visually-hidden    /* visually hidden but accessible */
```

### Flexbox Utilities

```css
/* Flex container */
.u-flex
.u-inline-flex

/* Direction */
.u-flex-row
.u-flex-row-reverse
.u-flex-column
.u-flex-column-reverse

/* Wrap */
.u-flex-wrap
.u-flex-nowrap
.u-flex-wrap-reverse

/* Justify content */
.u-justify-start
.u-justify-end
.u-justify-center
.u-justify-between
.u-justify-around
.u-justify-evenly

/* Align items */
.u-items-start
.u-items-end
.u-items-center
.u-items-baseline
.u-items-stretch

/* Align content */
.u-align-content-start
.u-align-content-end
.u-align-content-center
.u-align-content-between
.u-align-content-around
.u-align-content-stretch

/* Flex item */
.u-flex-fill
.u-flex-grow-0
.u-flex-grow-1
.u-flex-shrink-0
.u-flex-shrink-1
```

### Grid Utilities

```css
.u-grid
.u-inline-grid

/* Grid template columns */
.u-grid-cols-1
.u-grid-cols-2
.u-grid-cols-3
.u-grid-cols-4
.u-grid-cols-5
.u-grid-cols-6
.u-grid-cols-12

/* Grid template rows */
.u-grid-rows-1
.u-grid-rows-2
.u-grid-rows-3
.u-grid-rows-4

/* Gap */
.u-gap-xs
.u-gap-sm
.u-gap-md
.u-gap-lg
.u-gap-xl

/* Column/Row gap */
.u-gap-x-md
.u-gap-y-lg

/* Grid item */
.u-col-span-1
.u-col-span-2
.u-col-span-3
.u-col-span-full

.u-row-span-1
.u-row-span-2
.u-row-span-full
```

### Position Utilities

```css
.u-pos-static
.u-pos-relative
.u-pos-absolute
.u-pos-fixed
.u-pos-sticky

/* Positioning */
.u-top-0
.u-right-0
.u-bottom-0
.u-left-0

.u-inset-0       /* top, right, bottom, left: 0 */
.u-inset-x-0     /* left, right: 0 */
.u-inset-y-0     /* top, bottom: 0 */
```

### Usage Examples

```html
<!-- Flex layout -->
<div class="u-flex u-justify-between u-items-center u-p-4">
  <h2>Page Title</h2>
  <button class="c-button c-button--primary">Action</button>
</div>

<!-- Grid layout -->
<div class="u-grid u-grid-cols-3 u-gap-4">
  <div class="c-card">Card 1</div>
  <div class="c-card">Card 2</div>
  <div class="c-card u-col-span-2">Wide Card</div>
</div>

<!-- Centered content -->
<div class="u-flex u-justify-center u-items-center u-min-vh-100">
  <div class="c-card u-p-8">
    <h2 class="u-text-center">Centered Card</h2>
  </div>
</div>
```

## Typography Utilities

### Text Alignment

```css
.u-text-start    /* text-align: left */
.u-text-center   /* text-align: center */
.u-text-end      /* text-align: right */
```

### Font Weight

```css
.u-font-light      /* 300 */
.u-font-normal     /* 400 */
.u-font-medium     /* 500 */
.u-font-semibold   /* 600 */
.u-font-bold       /* 700 */
.u-fw-heavy      /* 800 */
.u-font-black      /* 900 */
```

### Font Style

```css
.u-fst-normal    /* normal */
.u-fst-italic    /* italic */
```

### Font Size

```css
/* Heading sizes */
.u-text-1         /* 2.5rem */
.u-text-2         /* 2rem */
.u-text-3         /* 1.5rem */
.u-text-4         /* 1.25rem */
.u-text-5         /* 1.125rem */
.u-text-6         /* 1rem */

/* Named sizes */
.u-text-xs        /* 0.75rem */
.u-text-sm        /* 0.875rem */
.u-text-base      /* 1rem */
.u-text-md        /* 1.125rem */
.u-text-lg        /* 1.25rem */
```

### Line Height

```css
.u-lh-1        /* 1 */
.u-lh-sm       /* 1.43 */
.u-lh-base     /* 1.2 */
.u-lh-lg       /* 1.56 */
```

### Text Transform

```css
.u-text-uppercase
.u-text-lowercase
.u-text-capitalize
```

### Text Decoration

```css
.u-td-none
.u-td-underline
.u-td-line-through
```

### White Space

```css
.u-text-wrap      /* normal */
.u-text-nowrap    /* nowrap */
.u-text-break     /* break-word */
```

### Usage Examples

```html
<!-- Typography hierarchy -->
<article class="u-p-6">
  <h1 class="u-text-1 u-font-bold u-mb-4">Article Title</h1>
  <p class="u-text-lg u-text-secondary u-mb-6">Article subtitle</p>
  <p class="u-text-base u-lh-lg">Article content with good readability.</p>
</article>

<!-- Text utilities -->
<div class="u-text-center">
  <h2 class="u-text-2 u-font-semibold u-text-uppercase">Centered Title</h2>
  <p class="u-text-sm u-font-light u-text-secondary">Subtitle text</p>
</div>
```

## Color Utilities

### Text Colors

```css
/* Theme colors */
.u-text-primary    /* #7c3aed */
.u-text-secondary  /* #6b7280 */
.u-text-success    /* #22c55e */
.u-text-warning    /* #eab308 */
.u-text-error      /* #ef4444 */
.u-text-info       /* #3b82f6 */

/* Neutral colors */
.u-text-white      /* #fff */
.u-text-black      /* #000 */
.u-text-light      /* #f9fafb */
.u-text-dark       /* #4b5563 */

/* Semantic colors */
.u-text-body       /* #111827 */
```

### Background Colors

```css
/* Theme colors */
.u-bg-primary      /* #7c3aed */
.u-bg-secondary    /* #6b7280 */
.u-bg-success      /* #22c55e */
.u-bg-warning      /* #eab308 */
.u-bg-error        /* #ef4444 */
.u-bg-info         /* #3b82f6 */

/* Neutral colors */
.u-bg-white        /* #fff */
.u-bg-black        /* #000 */
.u-bg-light        /* #f9fafb */
.u-bg-dark         /* #4b5563 */

/* Semantic colors */
.u-bg-body         /* var(--atomix-body-bg) */

/* Subtle variants */
.u-bg-primary-subtle
.u-bg-secondary-subtle
.u-bg-success-subtle
/* etc. */

/* Transparent */
.u-bg-transparent
```

### Border Colors

```css
.u-border-primary    /* #7c3aed */
.u-border-secondary  /* #6b7280 */
.u-border-success    /* #22c55e */
.u-border-warning    /* #eab308 */
.u-border-error      /* #ef4444 */
.u-border-info       /* #3b82f6 */
.u-border-white      /* #fff */
.u-border-black      /* #000 */
.u-border-light      /* #f9fafb */
.u-border-dark       /* #4b5563 */

/* Subtle variants */
.u-border-primary-subtle
.u-border-secondary-subtle
/* etc. */
```

### Usage Examples

```html
<!-- Status indicators -->
<div class="u-bg-success-50 u-c-success u-p-md u-border u-bc-success-200">
  <p class="u-font-medium">Success message</p>
</div>

<!-- Card with colored header -->
<div class="c-card">
  <div class="u-bg-primary u-c-white u-p-md">
    <h3 class="u-font-semibold">Card Header</h3>
  </div>
  <div class="u-p-md">
    <p class="u-c-gray-600">Card content</p>
  </div>
</div>
```

## Border Utilities

### Border Width

```css
.u-border      /* default border */
.u-border-0    /* no border */
.u-border-1    /* 1px */
.u-border-2    /* 2px */
.u-border-3    /* 3px */
.u-border-4    /* 4px */
.u-border-5    /* 5px */

/* Specific sides */
.u-border-t    /* border-top */
.u-border-e    /* border-end (right in LTR) */
.u-border-b    /* border-bottom */
.u-border-s    /* border-start (left in LTR) */

/* Remove specific sides */
.u-border-t-0
.u-border-e-0
.u-border-b-0
.u-border-s-0
```

### Border Radius

```css
.u-rounded-0     /* 0 */
.u-rounded-sm    /* var(--atomix-border-radius-sm) */
.u-rounded       /* var(--atomix-border-radius) */
.u-rounded-md    /* var(--atomix-border-radius) */
.u-rounded-lg    /* var(--atomix-border-radius-lg) */
.u-rounded-xl    /* var(--atomix-border-radius-xl) */
.u-rounded-xxl   /* var(--atomix-border-radius-xxl) */
.u-rounded-circle /* 50% */
.u-rounded-pill  /* var(--atomix-border-radius-pill) */

/* Specific corners */
.u-rounded-top     /* top corners */
.u-rounded-end     /* end corners (right in LTR) */
.u-rounded-bottom  /* bottom corners */
.u-rounded-start   /* start corners (left in LTR) */

/* With sizes */
.u-rounded-top-sm
.u-rounded-top-lg
.u-rounded-end-xl
/* etc. */
```

## Shadow Utilities

```css
.u-shadow-none   /* no shadow */
.u-shadow-xs     /* var(--atomix-box-shadow-xs) */
.u-shadow-sm     /* var(--atomix-box-shadow-sm) */
.u-shadow        /* var(--atomix-box-shadow) */
.u-shadow-lg     /* var(--atomix-box-shadow-lg) */
.u-shadow-xl     /* var(--atomix-box-shadow-xl) */
.u-shadow-inset  /* var(--atomix-box-shadow-inset) */
```

## Sizing Utilities

### Width

```css
.u-w-auto      /* auto */
.u-w-5         /* 5% */
.u-w-10        /* 10% */
.u-w-25        /* 25% */
.u-w-50        /* 50% */
.u-w-75        /* 75% */
.u-w-100       /* 100% */

/* Viewport width */
.u-vw-100      /* 100vw */
.u-min-vw-100  /* min-width: 100vw */

/* Max width */
.u-mw-100      /* max-width: 100% */
```

### Height

```css
.u-h-auto      /* auto */
.u-h-5         /* 5% */
.u-h-10        /* 10% */
.u-h-25        /* 25% */
.u-h-50        /* 50% */
.u-h-75        /* 75% */
.u-h-100       /* 100% */

/* Viewport height */
.u-vh-100      /* 100vh */
.u-min-vh-100  /* min-height: 100vh */

/* Max height */
.u-mh-100      /* max-height: 100% */
```

### Min/Max Dimensions

```css
.u-min-w-0
.u-min-w-full
.u-min-w-min
.u-min-w-max

.u-max-w-none
.u-max-w-xs    /* 20rem */
.u-max-w-sm    /* 24rem */
.u-max-w-md    /* 28rem */
.u-max-w-lg    /* 32rem */
.u-max-w-xl    /* 36rem */
.u-max-w-2xl   /* 42rem */
.u-max-w-full

.u-min-h-0
.u-min-h-full
.u-min-h-screen

.u-max-h-full
.u-max-h-screen
```

## Responsive Utilities

All utilities can be applied at specific breakpoints:

```css
/* Breakpoint prefixes */
.u-sm-{utility}    /* 640px and up */
.u-md-{utility}    /* 768px and up */
.u-lg-{utility}    /* 1024px and up */
.u-xl-{utility}    /* 1280px and up */
```

### Examples

```html
<!-- Responsive grid -->
<div class="u-grid u-grid-cols-1 u-md-grid-cols-2 u-lg-grid-cols-3 u-gap-4">
  <div class="c-card">Card 1</div>
  <div class="c-card">Card 2</div>
  <div class="c-card">Card 3</div>
</div>

<!-- Responsive spacing -->
<div class="u-p-2 u-md-p-4 u-lg-p-6">
  <h2 class="u-text-lg u-md-fs-4 u-lg-fs-2">Responsive Title</h2>
</div>

<!-- Responsive visibility -->
<div class="u-none u-md-d-block">
  Hidden on mobile, visible on tablet and up
</div>
```

## State Utilities

### Hover States

```css
.u-hover-bg-gray-100
.u-hover-c-primary
.u-hover-shadow-lg
.u-hover-scale-105
```

### Focus States

```css
.u-focus-outline-none
.u-focus-ring
.u-focus-ring-primary
.u-focus-bg-white
```

### Active States

```css
.u-active-bg-gray-200
.u-active-c-primary
.u-active-scale-95
```

## Transition Utilities

```css
.u-transition-none
.u-transition-all
.u-transition-colors
.u-transition-opacity
.u-transition-shadow
.u-transition-transform

/* Duration */
.u-duration-75
.u-duration-100
.u-duration-150
.u-duration-200
.u-duration-300
.u-duration-500
.u-duration-700
.u-duration-1000

/* Timing function */
.u-ease-linear
.u-ease-in
.u-ease-out
.u-ease-in-out
```

## Transform Utilities

```css
/* Scale */
.u-scale-0
.u-scale-50
.u-scale-75
.u-scale-90
.u-scale-95
.u-scale-100
.u-scale-105
.u-scale-110
.u-scale-125
.u-scale-150

/* Rotate */
.u-rotate-0
.u-rotate-1
.u-rotate-2
.u-rotate-3
.u-rotate-6
.u-rotate-12
.u-rotate-45
.u-rotate-90
.u-rotate-180

/* Translate */
.u-translate-x-0
.u-translate-x-1
.u-translate-x-2
.u-translate-y-0
.u-translate-y-1
.u-translate-y-2
```

## Overflow Utilities

```css
.u-overflow-auto
.u-overflow-hidden
.u-overflow-visible
.u-overflow-scroll

.u-overflow-x-auto
.u-overflow-x-hidden
.u-overflow-x-visible
.u-overflow-x-scroll

.u-overflow-y-auto
.u-overflow-y-hidden
.u-overflow-y-visible
.u-overflow-y-scroll
```

## Z-Index Utilities

```css
/* Numeric z-index */
.u-z-n1        /* -1 */
.u-z-0         /* 0 */
.u-z-1         /* 1 */
.u-z-2         /* 2 */
.u-z-3         /* 3 */
.u-z-4         /* 4 */
.u-z-5         /* 5 */

/* Semantic z-index */
.u-z-dropdown  /* 1000 */
.u-z-sticky    /* 1020 */
.u-z-fixed     /* 1030 */
.u-z-modal     /* 1040 */
.u-z-popover   /* 1050 */
.u-z-tooltip   /* 1060 */
.u-z-drawer    /* 1070 */
```

## Gap Utilities

```css
/* Gap for flexbox and grid */
.u-gap-0       /* 0 */
.u-gap-1       /* 0.25rem */
.u-gap-2       /* 0.5rem */
.u-gap-3       /* 0.75rem */
.u-gap-4       /* 1rem */
.u-gap-6       /* 1.5rem */
.u-gap-8       /* 2rem */
/* ... up to .u-gap-90 (22.5rem) */

/* Row and column gap */
.u-row-gap-4
.u-column-gap-4
```

## Cursor Utilities

```css
.u-cursor-auto
.u-cursor-default
.u-cursor-pointer
.u-cursor-wait
.u-cursor-text
.u-cursor-move
.u-cursor-help
.u-cursor-not-allowed
```

## User Select Utilities

```css
.u-select-none
.u-select-text
.u-select-all
.u-select-auto
```

## Pointer Events Utilities

```css
.u-pointer-events-none
.u-pointer-events-auto
```

## Common Patterns

### Card Layout

```html
<div class="c-card u-p-lg u-mb-md u-shadow-md u-br-lg">
  <div class="u-flex u-jc-between u-ai-center u-mb-md">
    <h3 class="u-text-lg u-font-semibold">Card Title</h3>
    <span class="u-text-sm u-c-gray-500">Status</span>
  </div>
  <p class="u-c-gray-600 u-mb-lg">Card content goes here.</p>
  <div class="u-flex u-gap-sm">
    <button class="c-button c-button--primary">Primary</button>
    <button class="c-button c-button--secondary">Secondary</button>
  </div>
</div>
```

### Form Layout

```html
<form class="u-max-w-md u-mx-auto u-p-lg">
  <div class="u-mb-md">
    <label class="u-block u-font-medium u-mb-xs">Email</label>
    <input class="c-input u-w-full" type="email">
  </div>
  <div class="u-mb-lg">
    <label class="u-block u-font-medium u-mb-xs">Password</label>
    <input class="c-input u-w-full" type="password">
  </div>
  <button class="c-button c-button--primary u-w-full">Sign In</button>
</form>
```

### Navigation Layout

```html
<nav class="u-flex u-jc-between u-ai-center u-px-lg u-py-md u-bg-white u-shadow-sm">
  <div class="u-flex u-ai-center u-gap-md">
    <img class="u-h-8" src="/logo.svg" alt="Logo">
    <span class="u-font-semibold u-text-lg">Brand</span>
  </div>
  <div class="u-flex u-gap-sm">
    <button class="c-button c-button--link">Sign In</button>
    <button class="c-button c-button--primary">Sign Up</button>
  </div>
</nav>
```

## Best Practices

### Do's ✅

- Use utilities for common styling patterns
- Combine utilities to create complex layouts
- Use responsive prefixes for mobile-first design
- Prefer utilities over custom CSS for consistency

### Don'ts ❌

- Don't use utilities for component-specific styling
- Don't create overly long class lists
- Don't ignore semantic HTML structure
- Don't use utilities for complex animations

## Performance Considerations

- Utilities are optimized for minimal CSS output
- Unused utilities are automatically purged in production
- Utilities have high specificity to override component styles
- Use utilities judiciously to maintain readable markup

## Accessibility Utilities

### Screen Reader Only

```css
.u-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.u-not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Focus Utilities

```css
.u-focus-visible-ring
.u-focus-visible-ring-primary
.u-focus-visible-ring-offset-2
.u-focus-within-ring
```

### Usage Examples

```html
<!-- Screen reader only text -->
<button class="c-button c-button--primary">
  <span class="u-sr-only">Save document</span>
  <svg>...</svg>
</button>

<!-- Skip link -->
<a href="#main" class="u-sr-only u-focus-not-sr-only">Skip to main content</a>
```

## Animation Utilities

### Keyframe Animations

```css
.u-animate-spin
.u-animate-ping
.u-animate-pulse
.u-animate-bounce
.u-animate-fade-in
.u-animate-fade-out
.u-animate-slide-in-up
.u-animate-slide-in-down
.u-animate-slide-in-left
.u-animate-slide-in-right
```

### Animation Control

```css
.u-animate-none
.u-animate-paused
.u-animate-running
```

### Usage Examples

```html
<!-- Loading spinner -->
<div class="u-animate-spin u-width-6 u-height-6 u-border-2 u-border-primary u-border-t-transparent u-rounded-full"></div>

<!-- Pulse effect -->
<div class="u-animate-pulse u-bg-gray-200 u-height-4 u-rounded"></div>

<!-- Fade in content -->
<div class="u-animate-fade-in">
  <p>This content fades in</p>
</div>
```

## Print Utilities

```css
.u-print-hidden
.u-print-visible
.u-print-block
.u-print-inline
.u-print-inline-block
.u-print-flex
.u-print-grid
```

### Usage Examples

```html
<!-- Hide navigation when printing -->
<nav class="u-print-hidden">
  <!-- Navigation content -->
</nav>

<!-- Show print-only content -->
<div class="u-none u-print-d-block">
  <p>This content only appears when printing</p>
</div>
```

## Custom Property Utilities

### CSS Variables

```css
.u-color-primary { color: var(--color-primary); }
.u-color-secondary { color: var(--color-secondary); }
.u-bg-primary { background-color: var(--color-primary); }
.u-border-primary { border-color: var(--color-primary); }

.u-spacing-xs { --spacing: var(--spacing-xs); }
.u-spacing-sm { --spacing: var(--spacing-sm); }
.u-spacing-md { --spacing: var(--spacing-md); }
.u-spacing-lg { --spacing: var(--spacing-lg); }
```

## Utility Composition Examples

### Hero Section

```html
<section class="u-bg-primary u-text-white u-py-20">
  <div class="u-mw-100 u-mx-auto u-px-6">
    <div class="u-text-center">
      <h1 class="u-text-1 u-font-bold u-mb-4">
        Welcome to Atomix
      </h1>
      <p class="u-text-lg u-mb-8 u-mw-100 u-mx-auto">
        Build amazing interfaces with our comprehensive design system
      </p>
      <div class="u-flex u-justify-center u-gap-4">
        <button class="c-button c-button--white c-button--lg">Get Started</button>
        <button class="c-button c-button--outline-white c-button--lg">Learn More</button>
      </div>
    </div>
  </div>
</section>
```

### Feature Grid

```html
<section class="u-py-16">
  <div class="u-mw-100 u-mx-auto u-px-6">
    <h2 class="u-text-2 u-font-bold u-text-center u-mb-16">Features</h2>
    <div class="u-grid u-grid-cols-1 u-md-grid-cols-2 u-lg-grid-cols-3 u-gap-8">
      <div class="u-text-center u-p-6">
        <div class="u-w-100 u-h-100 u-bg-primary-subtle u-rounded-circle u-flex u-justify-center u-items-center u-mx-auto u-mb-4">
          <svg class="u-w-50 u-h-50 u-text-primary">...</svg>
        </div>
        <h3 class="u-text-lg u-font-semibold u-mb-2">Fast</h3>
        <p class="u-text-secondary">Lightning fast performance</p>
      </div>
      <!-- More feature cards... -->
    </div>
  </div>
</section>
```

### Dashboard Layout

```html
<div class="u-min-vh-100 u-bg-light">
  <!-- Sidebar -->
  <aside class="u-position-fixed u-top-0 u-start-0 u-w-100 u-h-100 u-bg-white u-shadow-lg u-z-fixed">
    <div class="u-p-6">
      <h2 class="u-font-bold u-text-lg u-mb-6">Dashboard</h2>
      <nav class="u-gap-2">
        <a href="#" class="u-block u-p-2 u-rounded u-hover-bg-light">Overview</a>
        <a href="#" class="u-block u-p-2 u-rounded u-hover-bg-light">Analytics</a>
        <a href="#" class="u-block u-p-2 u-rounded u-hover-bg-light">Settings</a>
      </nav>
    </div>
  </aside>

  <!-- Main content -->
  <main class="u-ms-100 u-p-6">
    <div class="u-grid u-grid-cols-1 u-md-grid-cols-2 u-lg-grid-cols-3 u-gap-6">
      <div class="c-card u-p-6">
        <h3 class="u-font-semibold u-mb-2">Metric 1</h3>
        <p class="u-text-2 u-font-bold u-text-primary">1,234</p>
      </div>
      <!-- More cards... -->
    </div>
  </main>
</div>
```

### Modal Overlay

```html
<div class="u-position-fixed u-top-0 u-start-0 u-end-0 u-bottom-0 u-bg-black u-opacity-50 u-flex u-justify-center u-items-center u-z-modal">
  <div class="u-bg-white u-rounded-lg u-shadow-xl u-mw-100 u-w-100 u-mx-6">
    <div class="u-p-6">
      <div class="u-flex u-justify-between u-items-center u-mb-4">
        <h3 class="u-text-lg u-font-semibold">Modal Title</h3>
        <button class="u-text-secondary u-hover-text-dark">
          <svg class="u-w-25 u-h-25">...</svg>
        </button>
      </div>
      <p class="u-text-secondary u-mb-6">Modal content goes here.</p>
      <div class="u-flex u-justify-end u-gap-2">
        <button class="c-button c-button--secondary">Cancel</button>
        <button class="c-button c-button--primary">Confirm</button>
      </div>
    </div>
  </div>
</div>
```

## Utility Class Reference

### Quick Reference Table

| Category | Prefix | Examples |
|----------|--------|----------|
| Margin | `u-m-`, `u-mt-`, `u-mx-` | `u-m-4`, `u-mt-6`, `u-mx-auto` |
| Padding | `u-p-`, `u-pt-`, `u-px-` | `u-p-2`, `u-px-4`, `u-py-6` |
| Display | `u-d-` | `u-flex`, `u-none`, `u-block` |
| Flexbox | `u-flex-`, `u-justify-content-`, `u-align-items-` | `u-flex-column`, `u-justify-center` |
| Gap | `u-gap-`, `u-row-gap-`, `u-column-gap-` | `u-gap-4`, `u-row-gap-2` |
| Text | `u-text-`, `u-fs-`, `u-fw-` | `u-text-center`, `u-text-lg`, `u-font-bold` |
| Colors | `u-text-`, `u-bg-`, `u-border-` | `u-text-primary`, `u-bg-white`, `u-border-success` |
| Borders | `u-border-`, `u-rounded-` | `u-border-2`, `u-rounded-lg` |
| Sizing | `u-w-`, `u-h-` | `u-w-100`, `u-h-50`, `u-mw-100` |
| Position | `u-position-` | `u-position-relative`, `u-position-absolute` |
| Z-Index | `u-z-` | `u-z-modal`, `u-z-tooltip`, `u-z-1` |

### Responsive Breakpoints

| Prefix | Min Width | Description |
|--------|-----------|-------------|
| (none) | 0px | All screen sizes |
| `u-sm-` | 640px | Small screens and up |
| `u-md-` | 768px | Medium screens and up |
| `u-lg-` | 1024px | Large screens and up |
| `u-xl-` | 1280px | Extra large screens and up |

## Integration with Components

### Extending Component Styles

```html
<!-- Button with utility modifications -->
<button class="c-button c-button--primary u-shadow-lg u-transform u-hover-scale-105 u-transition-transform">
  Enhanced Button
</button>

<!-- Card with custom spacing -->
<div class="c-card u-p-8 u-mb-6 u-border-2 u-border-primary">
  <h3 class="u-text-lg u-font-bold u-mb-4">Custom Card</h3>
  <p class="u-text-secondary">Card with enhanced styling</p>
</div>
```

### Component Variants with Utilities

```html
<!-- Success alert using utilities -->
<div class="c-alert u-bg-success-subtle u-border u-border-success-subtle u-text-success">
  <div class="u-flex u-items-center u-gap-2">
    <svg class="u-w-25 u-h-25">...</svg>
    <span class="u-font-medium">Success message</span>
  </div>
</div>

<!-- Warning notification -->
<div class="c-notification u-bg-warning-subtle u-border-s-4 u-border-warning u-p-4">
  <p class="u-text-warning u-font-medium">Warning notification</p>
</div>
```

## Browser Support

All utility classes support modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Notes

- Utilities are atomic and highly reusable
- CSS is optimized and purged of unused classes in production
- Utilities have higher specificity than component styles
- Use utilities for layout and spacing, components for semantic meaning
