# Atomix Styles API Reference

Complete reference for all SCSS variables, mixins, functions, CSS custom properties, and utility classes in the Atomix Design System.

## Table of Contents

- [SCSS Variables](#scss-variables)
- [SCSS Mixins](#scss-mixins)
- [SCSS Functions](#scss-functions)
- [CSS Custom Properties](#css-custom-properties)
- [Utility Classes](#utility-classes)
- [Component Classes](#component-classes)
- [Object Classes](#object-classes)

## SCSS Variables

### Color Variables

#### Primary Scale
```scss
$primary-1: #f2e8fd !default;   // Lightest tint
$primary-2: #e4d0fa !default;   // Very light
$primary-3: #d0b2f5 !default;   // Light
$primary-4: #b88cef !default;   // Light-medium
$primary-5: #9c63e9 !default;   // Medium-light
$primary-6: #7c3aed !default;   // Base primary
$primary-7: #6425ca !default;   // Medium-dark
$primary-8: #501ba6 !default;   // Dark
$primary-9: #3c1583 !default;   // Very dark
$primary-10: #2a0e60 !default;  // Darkest shade
```

#### Semantic Color Scales
```scss
// Red scale
$red-1 through $red-10

// Green scale
$green-1 through $green-10

// Yellow scale
$yellow-1 through $yellow-10

// Blue scale
$blue-1 through $blue-10

// Gray scale
$gray-1 through $gray-10
```

#### Semantic Color Tokens
```scss
// Text colors (light theme)
$primary-text: $gray-10 !default;
$secondary-text: $gray-8 !default;
$tertiary-text: $gray-6 !default;
$disabled-text: $gray-5 !default;
$brand-text: $primary-6 !default;
$error-text: $red-6 !default;
$success-text: $green-6 !default;
$warning-text: $yellow-6 !default;
$info-text: $blue-6 !default;

// Text colors (dark theme)
$primary-text-dark: $white !default;
$secondary-text-dark: $gray-3 !default;
$tertiary-text-dark: $gray-4 !default;
// ... (similar pattern for all text colors)

// Background colors (light theme)
$primary-bg: $white !default;
$secondary-bg: $gray-3 !default;
$tertiary-bg: $gray-4 !default;
$brand-bg: $primary-2 !default;
$error-bg: $red-2 !default;
$success-bg: $green-2 !default;
$warning-bg: $yellow-2 !default;
$info-bg: $blue-2 !default;

// Background colors (dark theme)
$primary-bg-dark: $gray-9 !default;
$secondary-bg-dark: $gray-7 !default;
// ... (similar pattern for all background colors)

// Border colors
$primary-border: $gray-3 !default;
$brand-border: $primary-6 !default;
$error-border: $red-6 !default;
$success-border: $green-6 !default;
$warning-border: $yellow-6 !default;
$info-border: $blue-6 !default;

// Border colors (dark theme)
$primary-border-dark: $gray-8 !default;
// ... (similar pattern for all border colors)
```

### Spacing Variables

```scss
$spacer: 1rem !default;

$spacing-sizes: (
  0: 0rem,        // 0px
  1: 0.25rem,     // 4px
  2: 0.5rem,      // 8px
  3: 0.75rem,     // 12px
  4: 1rem,        // 16px
  5: 1.25rem,     // 20px
  6: 1.5rem,      // 24px
  7: 1.75rem,     // 28px
  8: 2rem,        // 32px
  9: 2.25rem,     // 36px
  10: 2.5rem,     // 40px
  11: 2.75rem,    // 44px
  12: 3rem,       // 48px
  14: 3.5rem,     // 56px
  16: 4rem,       // 64px
  20: 5rem,       // 80px
  24: 6rem,       // 96px
  28: 7rem,       // 112px
  32: 8rem,       // 128px
  36: 9rem,       // 144px
  40: 10rem,      // 160px
  44: 11rem,      // 176px
  48: 12rem,      // 192px
  52: 13rem,      // 208px
  56: 14rem,      // 224px
  60: 15rem,      // 240px
  64: 16rem,      // 256px
  72: 18rem,      // 288px
  80: 20rem,      // 320px
  90: 22.5rem,    // 360px
) !default;

$negative-spacers: /* negative values of spacing-sizes */ !default;
```

### Typography Variables

```scss
$font-family-base: ('Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif) !default;
$font-family-heading: $font-family-base !default;
$font-family-mono: ('Fira Code', 'Monaco', 'Consolas', monospace) !default;

$font-size-base: 1rem !default;
$font-size-xs: 0.75rem !default;
$font-size-sm: 0.875rem !default;
$font-size-lg: 1.125rem !default;
$font-size-xl: 1.25rem !default;
$font-size-2xl: 1.5rem !default;
$font-size-3xl: 1.875rem !default;
$font-size-4xl: 2.25rem !default;
$font-size-5xl: 3rem !default;
$font-size-6xl: 3.75rem !default;

$font-weight-light: 300 !default;
$font-weight-normal: 400 !default;
$font-weight-medium: 500 !default;
$font-weight-semibold: 600 !default;
$font-weight-bold: 700 !default;
$font-weight-extrabold: 800 !default;

$line-height-none: 1 !default;
$line-height-tight: 1.25 !default;
$line-height-snug: 1.375 !default;
$line-height-normal: 1.5 !default;
$line-height-relaxed: 1.625 !default;
$line-height-loose: 2 !default;
```

### Layout Variables

```scss
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1440px,
) !default;

$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px,
) !default;

$container-padding-x: map.get($spacing-sizes, 4) !default;
$grid-columns: 12 !default;
$grid-gutter-width: map.get($spacing-sizes, 6) !default;
```

### Component Variables

```scss
// Button
$btn-padding-x: map.get($spacing-sizes, 4) !default;
$btn-padding-y: map.get($spacing-sizes, 3) !default;
$btn-font-family: $font-family-base !default;
$btn-font-size: $font-size-base !default;
$btn-font-weight: $font-weight-medium !default;
$btn-line-height: $line-height-normal !default;
$btn-border-width: 1px !default;
$btn-border-radius: 0.375rem !default;
$btn-focus-width: 0.125rem !default;
$btn-disabled-opacity: 0.65 !default;

// Card
$card-padding: map.get($spacing-sizes, 6) !default;
$card-bg: $primary-bg !default;
$card-border-width: 1px !default;
$card-border-color: $primary-border !default;
$card-border-radius: 0.5rem !default;

// Modal
$modal-backdrop-bg: rgba($black, 0.5) !default;
$modal-backdrop-opacity: 1 !default;
$modal-content-bg: $primary-bg !default;
$modal-content-border-color: $primary-border !default;
$modal-content-border-width: 1px !default;
$modal-content-border-radius: 0.5rem !default;
$modal-content-box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

// Form
$input-padding-x: map.get($spacing-sizes, 3) !default;
$input-padding-y: map.get($spacing-sizes, 2) !default;
$input-font-family: $font-family-base !default;
$input-font-size: $font-size-base !default;
$input-font-weight: $font-weight-normal !default;
$input-line-height: $line-height-normal !default;
$input-bg: $primary-bg !default;
$input-border-width: 1px !default;
$input-border-color: $primary-border !default;
$input-border-radius: 0.375rem !default;
$input-focus-border-color: $primary !default;
$input-focus-box-shadow: 0 0 0 0.125rem rgba($primary, 0.25) !default;
```

## SCSS Mixins

### Responsive Mixins

```scss
// Media query mixins
@mixin media-breakpoint-up($name, $breakpoints: $grid-breakpoints) { /* ... */ }
@mixin media-breakpoint-down($name, $breakpoints: $grid-breakpoints) { /* ... */ }
@mixin media-breakpoint-between($lower, $upper, $breakpoints: $grid-breakpoints) { /* ... */ }
@mixin media-breakpoint-only($name, $breakpoints: $grid-breakpoints) { /* ... */ }

// Usage examples
@include media-breakpoint-up(md) { /* styles for md and up */ }
@include media-breakpoint-down(lg) { /* styles for lg and down */ }
@include media-breakpoint-between(md, lg) { /* styles between md and lg */ }
@include media-breakpoint-only(md) { /* styles for md only */ }
```

### Utility Generation Mixins

```scss
// Generate utility classes
@mixin generate-utility($utility, $infix: '', $is-rfs: false) { /* ... */ }

// Usage
@include generate-utility((
  property: margin,
  class: u-m,
  values: $spacing-sizes,
  responsive: true
));
```

### Component Mixins

```scss
// Button variant mixin
@mixin button-variant($background, $border, $color: color-contrast($background)) { /* ... */ }

// Button outline variant
@mixin button-outline-variant($color, $color-hover: color-contrast($color)) { /* ... */ }

// Button size mixin
@mixin button-size($padding-y, $padding-x, $font-size, $border-radius) { /* ... */ }

// Usage
.c-btn--custom {
  @include button-variant($custom-bg, $custom-border, $custom-text);
}
```

### Layout Mixins

```scss
// Container mixin
@mixin make-container($gutter: $container-padding-x) { /* ... */ }

// Grid mixins
@mixin make-row($gutter: $grid-gutter-width) { /* ... */ }
@mixin make-col-ready($gutter: $grid-gutter-width) { /* ... */ }
@mixin make-col($size: false, $columns: $grid-columns) { /* ... */ }
@mixin make-col-auto() { /* ... */ }
@mixin make-col-offset($size, $columns: $grid-columns) { /* ... */ }
```

### Utility Mixins

```scss
// Visually hidden
@mixin visually-hidden() { /* ... */ }
@mixin visually-hidden-focusable() { /* ... */ }

// Clearfix
@mixin clearfix() { /* ... */ }

// Text truncation
@mixin text-truncate() { /* ... */ }

// Border radius
@mixin border-radius($radius: $border-radius, $fallback-border-radius: false) { /* ... */ }

// Box shadow
@mixin box-shadow($shadow...) { /* ... */ }

// Transition
@mixin transition($transition...) { /* ... */ }
```

## SCSS Functions

### Color Functions

```scss
// Color contrast
@function color-contrast($background, $color-contrast-dark: $color-contrast-dark, $color-contrast-light: $color-contrast-light) { /* ... */ }

// Tint and shade
@function tint-color($color, $weight) { /* ... */ }
@function shade-color($color, $weight) { /* ... */ }

// Convert to RGB
@function to-rgb($value) { /* ... */ }

// Usage
$contrast-color: color-contrast($primary);
$tinted-primary: tint-color($primary, 20%);
$shaded-primary: shade-color($primary, 20%);
```

### Spacing Functions

```scss
// Get spacing value
@function spacing($key) {
  @return map.get($spacing-sizes, $key);
}

// Convert to rem
@function rem($pixels, $context: 16) {
  @return #{$pixels / $context}rem;
}

// Usage
$padding: spacing(4); // Returns 1rem
$font-size: rem(18); // Returns 1.125rem
```

### Breakpoint Functions

```scss
// Get breakpoint value
@function breakpoint-min($name, $breakpoints: $grid-breakpoints) { /* ... */ }
@function breakpoint-max($name, $breakpoints: $grid-breakpoints) { /* ... */ }
@function breakpoint-infix($name, $breakpoints: $grid-breakpoints) { /* ... */ }

// Usage
$md-min: breakpoint-min(md); // Returns 768px
$lg-max: breakpoint-max(lg); // Returns 1199.98px
$md-infix: breakpoint-infix(md); // Returns '-md'
```

## CSS Custom Properties

### Color Properties

```scss
// Primary colors
--atomix-primary: /* primary color */
--atomix-primary-rgb: /* primary color as RGB values */

// Text colors
--atomix-text-primary: /* primary text color */
--atomix-text-secondary: /* secondary text color */
--atomix-text-tertiary: /* tertiary text color */
--atomix-text-disabled: /* disabled text color */
--atomix-text-brand: /* brand text color */
--atomix-text-error: /* error text color */
--atomix-text-success: /* success text color */
--atomix-text-warning: /* warning text color */
--atomix-text-info: /* info text color */

// Background colors
--atomix-bg-primary: /* primary background */
--atomix-bg-secondary: /* secondary background */
--atomix-bg-tertiary: /* tertiary background */
--atomix-bg-brand: /* brand background */
--atomix-bg-error: /* error background */
--atomix-bg-success: /* success background */
--atomix-bg-warning: /* warning background */
--atomix-bg-info: /* info background */

// Border colors
--atomix-border-primary: /* primary border */
--atomix-border-secondary: /* secondary border */
--atomix-border-brand: /* brand border */
--atomix-border-error: /* error border */
--atomix-border-success: /* success border */
--atomix-border-warning: /* warning border */
--atomix-border-info: /* info border */
```

### Spacing Properties

```scss
// Spacing scale
--atomix-spacing-0: 0rem;
--atomix-spacing-1: 0.25rem;
--atomix-spacing-2: 0.5rem;
--atomix-spacing-3: 0.75rem;
--atomix-spacing-4: 1rem;
--atomix-spacing-5: 1.25rem;
--atomix-spacing-6: 1.5rem;
--atomix-spacing-8: 2rem;
--atomix-spacing-10: 2.5rem;
--atomix-spacing-12: 3rem;
--atomix-spacing-16: 4rem;
--atomix-spacing-20: 5rem;
--atomix-spacing-24: 6rem;
--atomix-spacing-32: 8rem;
--atomix-spacing-40: 10rem;
--atomix-spacing-48: 12rem;
--atomix-spacing-64: 16rem;
--atomix-spacing-80: 20rem;
--atomix-spacing-90: 22.5rem;
```

### Typography Properties

```scss
// Font families
--atomix-font-family-base: /* base font family */
--atomix-font-family-heading: /* heading font family */
--atomix-font-family-mono: /* monospace font family */

// Font sizes
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

// Font weights
--atomix-font-weight-light: 300;
--atomix-font-weight-normal: 400;
--atomix-font-weight-medium: 500;
--atomix-font-weight-semibold: 600;
--atomix-font-weight-bold: 700;
--atomix-font-weight-extrabold: 800;

// Line heights
--atomix-line-height-none: 1;
--atomix-line-height-tight: 1.25;
--atomix-line-height-snug: 1.375;
--atomix-line-height-normal: 1.5;
--atomix-line-height-relaxed: 1.625;
--atomix-line-height-loose: 2;
```

### Component Properties

```scss
// Button
--atomix-btn-padding-x: /* button horizontal padding */
--atomix-btn-padding-y: /* button vertical padding */
--atomix-btn-font-size: /* button font size */
--atomix-btn-font-weight: /* button font weight */
--atomix-btn-line-height: /* button line height */
--atomix-btn-border-width: /* button border width */
--atomix-btn-border-radius: /* button border radius */
--atomix-btn-color: /* button text color */
--atomix-btn-bg: /* button background */
--atomix-btn-border-color: /* button border color */

// Card
--atomix-card-padding: /* card padding */
--atomix-card-bg: /* card background */
--atomix-card-border-width: /* card border width */
--atomix-card-border-color: /* card border color */
--atomix-card-border-radius: /* card border radius */

// Modal
--atomix-modal-backdrop-bg: /* modal backdrop background */
--atomix-modal-content-bg: /* modal content background */
--atomix-modal-content-border-color: /* modal content border */
--atomix-modal-content-border-radius: /* modal content border radius */
```

## Utility Classes

### Spacing Utilities

```scss
// Margin utilities
.u-m-{0-90}        // margin: {value}
.u-mt-{0-90}       // margin-top: {value}
.u-mr-{0-90}       // margin-right: {value}
.u-mb-{0-90}       // margin-bottom: {value}
.u-ml-{0-90}       // margin-left: {value}
.u-mx-{0-90}       // margin-left & margin-right: {value}
.u-my-{0-90}       // margin-top & margin-bottom: {value}
.u-mx-auto         // margin-left & margin-right: auto

// Padding utilities
.u-p-{0-90}        // padding: {value}
.u-pt-{0-90}       // padding-top: {value}
.u-pr-{0-90}       // padding-right: {value}
.u-pb-{0-90}       // padding-bottom: {value}
.u-pl-{0-90}       // padding-left: {value}
.u-px-{0-90}       // padding-left & padding-right: {value}
.u-py-{0-90}       // padding-top & padding-bottom: {value}

// Gap utilities
.u-gap-{0-90}      // gap: {value}
.u-row-gap-{0-90}  // row-gap: {value}
.u-column-gap-{0-90} // column-gap: {value}

// Responsive variants
.u-m-{breakpoint}-{0-90}   // Responsive margin
.u-p-{breakpoint}-{0-90}   // Responsive padding
// ... (all spacing utilities have responsive variants)
```

### Display Utilities

```scss
.u-d-none          // display: none
.u-d-inline        // display: inline
.u-d-inline-block  // display: inline-block
.u-d-block         // display: block
.u-d-grid          // display: grid
.u-d-table         // display: table
.u-d-table-row     // display: table-row
.u-d-table-cell    // display: table-cell
.u-d-flex          // display: flex
.u-d-inline-flex   // display: inline-flex

// Responsive variants
.u-d-{breakpoint}-{value} // Responsive display utilities
```

### Flexbox Utilities

```scss
// Flex direction
.u-flex-row        // flex-direction: row
.u-flex-row-reverse // flex-direction: row-reverse
.u-flex-column     // flex-direction: column
.u-flex-column-reverse // flex-direction: column-reverse

// Flex wrap
.u-flex-wrap       // flex-wrap: wrap
.u-flex-nowrap     // flex-wrap: nowrap
.u-flex-wrap-reverse // flex-wrap: wrap-reverse

// Justify content
.u-justify-content-start    // justify-content: flex-start
.u-justify-content-end      // justify-content: flex-end
.u-justify-content-center   // justify-content: center
.u-justify-content-between  // justify-content: space-between
.u-justify-content-around   // justify-content: space-around
.u-justify-content-evenly   // justify-content: space-evenly

// Align items
.u-align-items-start     // align-items: flex-start
.u-align-items-end       // align-items: flex-end
.u-align-items-center    // align-items: center
.u-align-items-baseline  // align-items: baseline
.u-align-items-stretch   // align-items: stretch

// Align self
.u-align-self-auto       // align-self: auto
.u-align-self-start      // align-self: flex-start
.u-align-self-end        // align-self: flex-end
.u-align-self-center     // align-self: center
.u-align-self-baseline   // align-self: baseline
.u-align-self-stretch    // align-self: stretch

// Flex grow/shrink
.u-flex-fill        // flex: 1 1 auto
.u-flex-grow-0      // flex-grow: 0
.u-flex-grow-1      // flex-grow: 1
.u-flex-shrink-0    // flex-shrink: 0
.u-flex-shrink-1    // flex-shrink: 1
```

### Text Utilities

```scss
// Text alignment
.u-text-start      // text-align: left (or start in RTL)
.u-text-end        // text-align: right (or end in RTL)
.u-text-center     // text-align: center
.u-text-justify    // text-align: justify

// Text transform
.u-text-lowercase  // text-transform: lowercase
.u-text-uppercase  // text-transform: uppercase
.u-text-capitalize // text-transform: capitalize

// Font weight
.u-fw-light        // font-weight: 300
.u-fw-normal       // font-weight: 400
.u-fw-medium       // font-weight: 500
.u-fw-semibold     // font-weight: 600
.u-fw-bold         // font-weight: 700
.u-fw-extrabold    // font-weight: 800

// Font size
.u-fs-xs           // font-size: 0.75rem
.u-fs-sm           // font-size: 0.875rem
.u-fs-base         // font-size: 1rem
.u-fs-lg           // font-size: 1.125rem
.u-fs-xl           // font-size: 1.25rem
.u-fs-2xl          // font-size: 1.5rem
.u-fs-3xl          // font-size: 1.875rem
.u-fs-4xl          // font-size: 2.25rem
.u-fs-5xl          // font-size: 3rem
.u-fs-6xl          // font-size: 3.75rem

// Line height
.u-lh-1            // line-height: 1
.u-lh-sm           // line-height: 1.25
.u-lh-base         // line-height: 1.5
.u-lh-lg           // line-height: 1.75

// Text decoration
.u-text-decoration-none        // text-decoration: none
.u-text-decoration-underline   // text-decoration: underline
.u-text-decoration-line-through // text-decoration: line-through
```

### Color Utilities

```scss
// Text colors
.u-text-primary    // color: var(--atomix-text-primary)
.u-text-secondary  // color: var(--atomix-text-secondary)
.u-text-tertiary   // color: var(--atomix-text-tertiary)
.u-text-brand      // color: var(--atomix-text-brand)
.u-text-error      // color: var(--atomix-text-error)
.u-text-success    // color: var(--atomix-text-success)
.u-text-warning    // color: var(--atomix-text-warning)
.u-text-info       // color: var(--atomix-text-info)

// Background colors
.u-bg-primary      // background-color: var(--atomix-bg-primary)
.u-bg-secondary    // background-color: var(--atomix-bg-secondary)
.u-bg-tertiary     // background-color: var(--atomix-bg-tertiary)
.u-bg-brand        // background-color: var(--atomix-bg-brand)
.u-bg-error        // background-color: var(--atomix-bg-error)
.u-bg-success      // background-color: var(--atomix-bg-success)
.u-bg-warning      // background-color: var(--atomix-bg-warning)
.u-bg-info         // background-color: var(--atomix-bg-info)

// Border colors
.u-border-primary  // border-color: var(--atomix-border-primary)
.u-border-brand    // border-color: var(--atomix-border-brand)
.u-border-error    // border-color: var(--atomix-border-error)
.u-border-success  // border-color: var(--atomix-border-success)
.u-border-warning  // border-color: var(--atomix-border-warning)
.u-border-info     // border-color: var(--atomix-border-info)
```

### Position Utilities

```scss
.u-position-static    // position: static
.u-position-relative  // position: relative
.u-position-absolute  // position: absolute
.u-position-fixed     // position: fixed
.u-position-sticky    // position: sticky

// Top, right, bottom, left
.u-top-0              // top: 0
.u-top-50             // top: 50%
.u-top-100            // top: 100%
.u-start-0            // left: 0 (or right: 0 in RTL)
.u-start-50           // left: 50% (or right: 50% in RTL)
.u-start-100          // left: 100% (or right: 100% in RTL)
.u-end-0              // right: 0 (or left: 0 in RTL)
.u-end-50             // right: 50% (or left: 50% in RTL)
.u-end-100            // right: 100% (or left: 100% in RTL)
.u-bottom-0           // bottom: 0
.u-bottom-50          // bottom: 50%
.u-bottom-100         // bottom: 100%

// Translate utilities
.u-translate-middle   // transform: translate(-50%, -50%)
.u-translate-middle-x // transform: translateX(-50%)
.u-translate-middle-y // transform: translateY(-50%)
```

### Border Utilities

```scss
// Border
.u-border             // border: 1px solid
.u-border-0           // border: 0
.u-border-top         // border-top: 1px solid
.u-border-end         // border-right: 1px solid (or border-left in RTL)
.u-border-bottom      // border-bottom: 1px solid
.u-border-start       // border-left: 1px solid (or border-right in RTL)

// Border radius
.u-rounded            // border-radius: 0.375rem
.u-rounded-0          // border-radius: 0
.u-rounded-1          // border-radius: 0.125rem
.u-rounded-2          // border-radius: 0.25rem
.u-rounded-3          // border-radius: 0.375rem
.u-rounded-lg         // border-radius: 0.5rem
.u-rounded-xl         // border-radius: 0.75rem
.u-rounded-2xl        // border-radius: 1rem
.u-rounded-3xl        // border-radius: 1.5rem
.u-rounded-full       // border-radius: 50%
.u-rounded-pill       // border-radius: 50rem

// Directional border radius
.u-rounded-top        // border-top-left-radius & border-top-right-radius
.u-rounded-end        // border-top-right-radius & border-bottom-right-radius
.u-rounded-bottom     // border-bottom-left-radius & border-bottom-right-radius
.u-rounded-start      // border-top-left-radius & border-bottom-left-radius
```

### Shadow Utilities

```scss
.u-shadow-none        // box-shadow: none
.u-shadow-sm          // box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)
.u-shadow             // box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15)
.u-shadow-lg          // box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175)
.u-shadow-xl          // box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2)
```

### Overflow Utilities

```scss
.u-overflow-auto      // overflow: auto
.u-overflow-hidden    // overflow: hidden
.u-overflow-visible   // overflow: visible
.u-overflow-scroll    // overflow: scroll
.u-overflow-x-auto    // overflow-x: auto
.u-overflow-x-hidden  // overflow-x: hidden
.u-overflow-x-scroll  // overflow-x: scroll
.u-overflow-y-auto    // overflow-y: auto
.u-overflow-y-hidden  // overflow-y: hidden
.u-overflow-y-scroll  // overflow-y: scroll
```

### Visibility Utilities

```scss
.u-visible            // visibility: visible
.u-invisible          // visibility: hidden
.u-visually-hidden    // Visually hidden but accessible to screen readers
.u-visually-hidden-focusable // Visually hidden until focused
```

### Z-index Utilities

```scss
.u-z-n1               // z-index: -1
.u-z-0                // z-index: 0
.u-z-1                // z-index: 1
.u-z-2                // z-index: 2
.u-z-3                // z-index: 3
.u-z-auto             // z-index: auto
```

## Component Classes

### Button Component

```scss
.c-btn                // Base button class
.c-btn--primary       // Primary button variant
.c-btn--secondary     // Secondary button variant
.c-btn--success       // Success button variant
.c-btn--error         // Error button variant
.c-btn--warning       // Warning button variant
.c-btn--info          // Info button variant
.c-btn--outline-primary // Outline primary variant
.c-btn--outline-secondary // Outline secondary variant
.c-btn--sm            // Small button size
.c-btn--lg            // Large button size
.c-btn--block         // Full-width button
.c-btn:disabled       // Disabled state
.c-btn:hover          // Hover state
.c-btn:focus          // Focus state
.c-btn:active         // Active state
```

### Card Component

```scss
.c-card               // Base card class
.c-card__header       // Card header
.c-card__body         // Card body
.c-card__footer       // Card footer
.c-card__title        // Card title
.c-card__subtitle     // Card subtitle
.c-card__text         // Card text content
.c-card__img          // Card image
.c-card__img-overlay  // Image overlay
.c-card--border       // Card with border
.c-card--shadow       // Card with shadow
```

### Modal Component

```scss
.c-modal              // Modal container
.c-modal__backdrop    // Modal backdrop
.c-modal__dialog      // Modal dialog
.c-modal__content     // Modal content
.c-modal__header      // Modal header
.c-modal__title       // Modal title
.c-modal__body        // Modal body
.c-modal__footer      // Modal footer
.c-modal__close       // Close button
.c-modal--fade        // Fade animation
.c-modal--sm          // Small modal
.c-modal--lg          // Large modal
.c-modal--xl          // Extra large modal
.c-modal--fullscreen  // Fullscreen modal
```

### Form Components

```scss
.c-form               // Form container
.c-form-group         // Form group
.c-form-label         // Form label
.c-form-control       // Form input
.c-form-control--sm   // Small form control
.c-form-control--lg   // Large form control
.c-form-text          // Help text
.c-form-check         // Checkbox/radio container
.c-form-check-input   // Checkbox/radio input
.c-form-check-label   // Checkbox/radio label
.c-form-select        // Select dropdown
.c-form-range         // Range input
.c-form-floating      // Floating label
.c-input-group        // Input group
.c-input-group-text   // Input group addon
.is-valid             // Valid state
.is-invalid           // Invalid state
```

## Object Classes

### Container Object

```scss
.o-container          // Responsive container
.o-container-fluid    // Full-width container
.o-container-sm       // Small container
.o-container-md       // Medium container
.o-container-lg       // Large container
.o-container-xl       // Extra large container
.o-container-xxl      // Extra extra large container
```

### Grid Object

```scss
.o-grid               // Grid container
.o-grid__item         // Grid item
.o-grid__item--span-1 // Span 1 column
.o-grid__item--span-2 // Span 2 columns
.o-grid__item--span-3 // Span 3 columns
.o-grid__item--span-4 // Span 4 columns
.o-grid__item--span-6 // Span 6 columns
.o-grid__item--span-8 // Span 8 columns
.o-grid__item--span-12 // Span 12 columns (full width)
```

### Masonry Grid Object

```scss
.o-masonry-grid       // Masonry grid container
.o-masonry-grid--2    // 2-column masonry
.o-masonry-grid--3    // 3-column masonry
.o-masonry-grid--4    // 4-column masonry
```

## Usage Examples

### Basic Component Usage

```html
<!-- Button examples -->
<button class="c-btn c-btn--primary">Primary Button</button>
<button class="c-btn c-btn--secondary c-btn--lg">Large Secondary</button>
<button class="c-btn c-btn--outline-primary c-btn--sm">Small Outline</button>

<!-- Card example -->
<div class="c-card">
  <div class="c-card__header">
    <h5 class="c-card__title">Card Title</h5>
    <p class="c-card__subtitle">Card subtitle</p>
  </div>
  <div class="c-card__body">
    <p class="c-card__text">Card content goes here.</p>
  </div>
  <div class="c-card__footer">
    <button class="c-btn c-btn--primary">Action</button>
  </div>
</div>

<!-- Form example -->
<form class="c-form">
  <div class="c-form-group">
    <label class="c-form-label" for="email">Email</label>
    <input type="email" class="c-form-control" id="email" placeholder="Enter email">
    <div class="c-form-text">We'll never share your email.</div>
  </div>
  <div class="c-form-check">
    <input class="c-form-check-input" type="checkbox" id="terms">
    <label class="c-form-check-label" for="terms">
      I agree to the terms
    </label>
  </div>
  <button type="submit" class="c-btn c-btn--primary">Submit</button>
</form>
```

### Layout Examples

```html
<!-- Container and grid -->
<div class="o-container">
  <div class="o-grid">
    <div class="o-grid__item o-grid__item--span-8">
      <h1>Main Content</h1>
      <p>This is the main content area.</p>
    </div>
    <div class="o-grid__item o-grid__item--span-4">
      <h2>Sidebar</h2>
      <p>This is the sidebar content.</p>
    </div>
  </div>
</div>

<!-- Masonry grid -->
<div class="o-masonry-grid o-masonry-grid--3">
  <div class="c-card">Card 1</div>
  <div class="c-card">Card 2 with more content</div>
  <div class="c-card">Card 3</div>
  <div class="c-card">Card 4 with even more content that makes it taller</div>
</div>
```

### Utility Class Examples

```html
<!-- Spacing utilities -->
<div class="u-p-6 u-mb-8">
  <h2 class="u-mb-4">Heading with margin bottom</h2>
  <p class="u-mb-0">Paragraph with no bottom margin</p>
</div>

<!-- Flexbox utilities -->
<div class="u-d-flex u-justify-content-between u-align-items-center u-p-4">
  <h3>Title</h3>
  <button class="c-btn c-btn--primary">Action</button>
</div>

<!-- Responsive utilities -->
<div class="u-text-center u-text-md-start u-p-4 u-p-md-6 u-p-lg-8">
  <h2>Responsive content</h2>
  <p>This content is centered on mobile, left-aligned on tablet+</p>
</div>

<!-- Color utilities -->
<div class="u-bg-brand u-text-white u-p-6 u-rounded-lg">
  <h3>Brand colored section</h3>
  <p>This section uses brand colors</p>
</div>
```

### Custom Property Usage

```css
/* Override component properties */
.custom-button {
  --atomix-btn-padding-x: 2rem;
  --atomix-btn-padding-y: 1rem;
  --atomix-btn-font-size: 1.125rem;
  --atomix-btn-border-radius: 0.75rem;
}

/* Theme-specific overrides */
[data-theme="dark"] .custom-card {
  --atomix-card-bg: var(--atomix-gray-8);
  --atomix-card-border-color: var(--atomix-gray-7);
}

/* Component variants using custom properties */
.premium-card {
  --atomix-card-bg: linear-gradient(135deg, var(--atomix-primary-1), var(--atomix-primary-2));
  --atomix-card-border-color: var(--atomix-primary-6);
  --atomix-card-text: var(--atomix-primary-9);
}
```

## Migration Guide

### From Bootstrap 5

```scss
// Bootstrap to Atomix class mapping
.btn → .c-btn
.btn-primary → .c-btn--primary
.btn-lg → .c-btn--lg
.card → .c-card
.card-header → .c-card__header
.card-body → .c-card__body
.container → .o-container
.row → .o-grid
.col-8 → .o-grid__item--span-8
.d-flex → .u-d-flex
.justify-content-center → .u-justify-content-center
.text-center → .u-text-center
.mb-4 → .u-mb-4
.p-3 → .u-p-3
```

### From Tailwind CSS

```scss
// Tailwind to Atomix class mapping
.bg-blue-500 → .u-bg-primary (or use CSS custom property)
.text-gray-900 → .u-text-primary
.p-4 → .u-p-4
.mb-6 → .u-mb-6
.flex → .u-d-flex
.justify-center → .u-justify-content-center
.items-center → .u-align-items-center
.rounded-lg → .u-rounded-lg
.shadow-md → .u-shadow
.hidden → .u-d-none
.block → .u-d-block
```

## Performance Considerations

### CSS Bundle Size

The complete Atomix CSS bundle is approximately:
- **Minified**: ~45KB
- **Gzipped**: ~8KB
- **Brotli**: ~6KB

### Selective Imports

To reduce bundle size, import only what you need:

```scss
// Minimal build (~15KB minified)
@use 'atomix/styles/01-settings' as *;
@use 'atomix/styles/02-tools' as *;
@use 'atomix/styles/03-generic';
@use 'atomix/styles/04-elements';

// Add only needed components
@use 'atomix/styles/06-components/components.button';
@use 'atomix/styles/06-components/components.card';

// Add only needed utilities
@use 'atomix/styles/99-utilities/utilities.spacing';
@use 'atomix/styles/99-utilities/utilities.display';
```

### Runtime Performance

- **CSS Custom Properties**: Minimal performance impact, enable runtime theming
- **Utility Classes**: Atomic CSS approach reduces specificity conflicts
- **Component Classes**: BEM methodology ensures predictable styling
- **Responsive Design**: Mobile-first approach optimizes for smaller screens

## Browser Support

### Supported Browsers

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 88+ | Full support |
| Firefox | 85+ | Full support |
| Safari | 14+ | Full support |
| Edge | 88+ | Full support |
| iOS Safari | 14+ | Full support |
| Android Chrome | 88+ | Full support |

### CSS Features Used

- **CSS Custom Properties**: IE11+ (with fallbacks)
- **CSS Grid**: IE11+ (with -ms- prefix)
- **Flexbox**: IE11+ (with -ms- prefix)
- **CSS Logical Properties**: Chrome 69+, Firefox 66+, Safari 12.1+

### Fallbacks

```scss
// Automatic fallbacks for older browsers
.c-btn {
  background-color: #7c3aed; // Fallback
  background-color: var(--atomix-btn-bg); // Modern

  display: -ms-flexbox; // IE11
  display: flex; // Modern
}
```

## Troubleshooting

### Common Issues

#### Specificity Conflicts
```scss
// Problem: Custom styles not applying
.my-button {
  background: red; // Won't override .c-btn--primary
}

// Solution: Use CSS custom properties
.my-button {
  --atomix-btn-bg: red;
}

// Or increase specificity appropriately
.my-component .c-btn {
  background: red;
}
```

#### Missing Imports
```scss
// Problem: Utilities not working
@use 'atomix/styles/06-components';

// Solution: Import utilities layer
@use 'atomix/styles/99-utilities';
```

#### Theme Not Applying
```javascript
// Problem: Theme not switching
document.body.setAttribute('data-theme', 'dark');

// Solution: Apply to document element
document.documentElement.setAttribute('data-theme', 'dark');
```

### Debug Mode

Enable debug mode to see component boundaries:

```scss
@use 'atomix/styles' with (
  $debug: true
);

// Or add debug class
.debug * {
  outline: 1px solid red !important;
}
```

---

## Related Documentation

- [Styles Architecture](./architecture.md) - System overview
- [Color System](../design-tokens/colors.md) - Color tokens and usage
- [Spacing & Layout](../design-tokens/spacing.md) - Layout system
- [Customization Guide](./customization.md) - Customization options
- [CSS Utilities](./utilities.md) - Utility class examples

## External Resources

- [SCSS Documentation](https://sass-lang.com/documentation) - SCSS language reference
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) - MDN documentation
- [ITCSS Methodology](https://itcss.io/) - Architecture methodology
- [BEM Methodology](http://getbem.com/) - CSS naming convention
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
