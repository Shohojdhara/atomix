# CSS Utility Class Naming Guidelines

## Overview

This document establishes consistent naming conventions for CSS utility classes in the Atomix Design System.

## Naming Pattern Structure

### Base Pattern

```
.u-{category}-{value}
```

### Responsive Pattern

```
.u-{category}-{breakpoint}-{value}
```

### State Pattern

```
.u-{state}-{category}-{value}
```

## Category Naming Standards

### 1. Layout & Display

| Property             | Class Prefix                            | Examples                                                                |
| -------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| Display              | `u-`                                    | `.u-block`, `.u-flex`, `.u-grid`, `.u-none`                             |
| Position             | `u-`                                    | `.u-relative`, `.u-absolute`, `.u-fixed`, `.u-sticky`                   |
| Top/Bottom/Start/End | `u-top`, `u-bottom`, `u-start`, `u-end` | `.u-top-0`, `.u-start-50`, `.u-bottom-100`                              |
| Z-index              | `u-z`                                   | `.u-z-0`, `.u-z-1`, `.u-z-modal`, `.u-z-tooltip`                        |
| Translate            | `u-translate-middle`                    | `.u-translate-middle`, `.u-translate-middle-x`, `.u-translate-middle-y` |

### 2. Spacing

| Property       | Class Prefix   | Examples                             |
| -------------- | -------------- | ------------------------------------ |
| Margin         | `u-m`          | `.u-m-0`, `.u-m-4`, `.u-m-auto`      |
| Margin X       | `u-mx`         | `.u-mx-2`, `.u-mx-auto`              |
| Margin Y       | `u-my`         | `.u-my-3`, `.u-my-auto`              |
| Margin Top     | `u-mt`         | `.u-mt-1`, `.u-mt-auto`              |
| Margin End     | `u-me`         | `.u-me-2`, `.u-me-auto`              |
| Margin Bottom  | `u-mb`         | `.u-mb-1`, `.u-mb-auto`              |
| Margin Start   | `u-ms`         | `.u-ms-2`, `.u-ms-auto`              |
| Padding        | `u-p`          | `.u-p-0`, `.u-p-4`                   |
| Padding X      | `u-px`         | `.u-px-2`, `.u-px-4`                 |
| Padding Y      | `u-py`         | `.u-py-2`, `.u-py-4`                 |
| Padding Top    | `u-pt`         | `.u-pt-1`, `.u-pt-4`                 |
| Padding End    | `u-pe`         | `.u-pe-2`, `.u-pe-4`                 |
| Padding Bottom | `u-pb`         | `.u-pb-1`, `.u-pb-4`                 |
| Padding Start  | `u-ps`         | `.u-ps-2`, `.u-ps-4`                 |
| Gap            | `u-gap`        | `.u-gap-2`, `.u-gap-4`               |
| Row Gap        | `u-row-gap`    | `.u-row-gap-2`, `.u-row-gap-4`       |
| Column Gap     | `u-column-gap` | `.u-column-gap-2`, `.u-column-gap-4` |

### 3. Flexbox

| Property        | Class Prefix    | Examples                                                      |
| --------------- | --------------- | ------------------------------------------------------------- |
| Flex Fill       | `u-flex`        | `.u-flex-fill`                                                |
| Flex Direction  | `u-flex`        | `.u-flex-row`, `.u-flex-column`, `.u-flex-row-reverse`        |
| Flex Wrap       | `u-flex`        | `.u-flex-wrap`, `.u-flex-nowrap`, `.u-flex-wrap-reverse`      |
| Flex Grow       | `u-flex-grow`   | `.u-flex-grow-0`, `.u-flex-grow-1`                            |
| Flex Shrink     | `u-flex-shrink` | `.u-flex-shrink-0`, `.u-flex-shrink-1`                        |
| Justify Content | `u-justify`     | `.u-justify-start`, `.u-justify-center`, `.u-justify-between` |
| Align Items     | `u-items`       | `.u-items-start`, `.u-items-center`, `.u-items-stretch`       |
| Align Content   | `u-content`     | `.u-content-start`, `.u-content-center`                       |
| Align Self      | `u-self`        | `.u-self-auto`, `.u-self-start`, `.u-self-center`             |
| Order           | `u-order`       | `.u-order-1`, `.u-order-first`, `.u-order-last`               |

### 4. Typography

| Property        | Class Prefix | Examples                                                       |
| --------------- | ------------ | -------------------------------------------------------------- |
| Font Size       | `u-fs`       | `.u-fs-xs`, `.u-fs-sm`, `.u-fs-lg`, `.u-fs-2xl`                |
| Font Weight     | `u-font`     | `.u-font-light`, `.u-font-normal`, `.u-font-bold`              |
| Font Style      | (direct)     | `.u-italic`, `.u-not-italic`                                   |
| Line Height     | `u-leading`  | `.u-leading-none`, `.u-leading-tight`, `.u-leading-normal`     |
| Text Align      | `u-text`     | `.u-text-start`, `.u-text-center`, `.u-text-end`               |
| Text Transform  | `u-text`     | `.u-text-uppercase`, `.u-text-lowercase`, `.u-text-capitalize` |
| Text Decoration | `u-`         | `.u-underline`, `.u-line-through`, `.u-no-underline`           |
| White Space     | `u-text`     | `.u-text-wrap`, `.u-text-nowrap`                               |
| Word Break      | `u-text`     | `.u-text-break`                                                |

### 5. Colors

| Property          | Class Prefix      | Examples                                                          |
| ----------------- | ----------------- | ----------------------------------------------------------------- |
| Text Color        | `u-text`          | `.u-text-primary`, `.u-text-secondary`, `.u-text-success`         |
| Text Emphasis     | `u-text`          | `.u-text-primary-emphasis`, `.u-text-secondary-emphasis`          |
| Background Color  | `u-bg`            | `.u-bg-primary`, `.u-bg-light`, `.u-bg-dark`, `.u-bg-transparent` |
| Background Subtle | `u-bg`            | `.u-bg-primary-subtle`, `.u-bg-secondary-subtle`                  |
| Border Color      | `u-border`        | `.u-border-primary`, `.u-border-light`                            |
| Border Subtle     | `u-border`        | `.u-border-primary-subtle`, `.u-border-secondary-subtle`          |
| Gradient          | `u-bg-gradient`   | `.u-bg-gradient-primary`, `.u-bg-gradient-secondary`              |
| Text Gradient     | `u-text-gradient` | `.u-text-gradient-primary`, `.u-text-gradient-secondary`          |

### 6. Sizing

| Property        | Class Prefix | Examples                                      |
| --------------- | ------------ | --------------------------------------------- |
| Width           | `u-w`        | `.u-w-auto`, `.u-w-25`, `.u-w-50`, `.u-w-100` |
| Max Width       | `u-max-w`    | `.u-max-w-100`                                |
| Min Width       | `u-min-w`    | `.u-min-w-0`, `.u-min-w-100`                  |
| Height          | `u-h`        | `.u-h-auto`, `.u-h-25`, `.u-h-50`, `.u-h-100` |
| Max Height      | `u-max-h`    | `.u-max-h-100`                                |
| Min Height      | `u-min-h`    | `.u-min-h-0`, `.u-min-h-100`                  |
| Viewport Width  | `u-vw`       | `.u-vw-100`                                   |
| Min VW          | `u-min-vw`   | `.u-min-vw-100`                               |
| Viewport Height | `u-vh`       | `.u-vh-100`                                   |
| Min VH          | `u-min-vh`   | `.u-min-vh-100`                               |

### 7. Borders

| Property       | Class Prefix       | Examples                                                                                        |
| -------------- | ------------------ | ----------------------------------------------------------------------------------------------- |
| Border         | `u-border`         | `.u-border`, `.u-border-0`                                                                      |
| Border Top     | `u-border-t`       | `.u-border-t`, `.u-border-t-0`                                                                  |
| Border End     | `u-border-e`       | `.u-border-e`, `.u-border-e-0`                                                                  |
| Border Bottom  | `u-border-b`       | `.u-border-b`, `.u-border-b-0`                                                                  |
| Border Start   | `u-border-s`       | `.u-border-s`, `.u-border-s-0`                                                                  |
| Border Width   | `u-border`         | `.u-border-1`, `.u-border-2`, `.u-border-3`, `.u-border-4`, `.u-border-5`                       |
| Border Style   | `u-border`         | `.u-border-solid`, `.u-border-dashed`, `.u-border-dotted`, `.u-border-double`, `.u-border-none` |
| Border Radius  | `u-rounded`        | `.u-rounded`, `.u-rounded-sm`, `.u-rounded-lg`, `.u-rounded-circle`, `.u-rounded-pill`          |
| Border Opacity | `u-border-opacity` | `.u-border-opacity-10`, `.u-border-opacity-50`, `.u-border-opacity-100`                         |
| Rounded Top    | `u-rounded-top`    | `.u-rounded-top`, `.u-rounded-top-sm`, `.u-rounded-top-lg`                                      |
| Rounded End    | `u-rounded-end`    | `.u-rounded-end`, `.u-rounded-end-sm`                                                           |
| Rounded Bottom | `u-rounded-bottom` | `.u-rounded-bottom`, `.u-rounded-bottom-sm`                                                     |
| Rounded Start  | `u-rounded-start`  | `.u-rounded-start`, `.u-rounded-start-sm`                                                       |

### 8. Effects

| Property   | Class Prefix   | Examples                                                                                      |
| ---------- | -------------- | --------------------------------------------------------------------------------------------- |
| Opacity    | `u-opacity`    | `.u-opacity-0`, `.u-opacity-25`, `.u-opacity-50`, `.u-opacity-75`, `.u-opacity-100`           |
| Shadow     | `u-shadow`     | `.u-shadow`, `.u-shadow-xs`, `.u-shadow-sm`, `.u-shadow-lg`, `.u-shadow-xl`, `.u-shadow-none` |
| Overflow   | `u-overflow`   | `.u-overflow-auto`, `.u-overflow-hidden`, `.u-overflow-visible`, `.u-overflow-scroll`         |
| Overflow X | `u-overflow-x` | `.u-overflow-x-auto`, `.u-overflow-x-hidden`                                                  |
| Overflow Y | `u-overflow-y` | `.u-overflow-y-auto`, `.u-overflow-y-hidden`                                                  |
| Object Fit | `u-object-fit` | `.u-object-fit-contain`, `.u-object-fit-cover`, `.u-object-fit-fill`, `.u-object-fit-none`    |
| Visibility | (direct)       | `.u-visible`, `.u-invisible`                                                                  |

### 9. Links

| Property               | Class Prefix               | Examples                                                          |
| ---------------------- | -------------------------- | ----------------------------------------------------------------- |
| Link Color             | `u-link`                   | `.u-link-primary`, `.u-link-secondary`, `.u-link-success`         |
| Link Opacity           | `u-link-opacity`           | `.u-link-opacity-10`, `.u-link-opacity-50`, `.u-link-opacity-100` |
| Link Offset            | `u-link-offset`            | `.u-link-offset-1`, `.u-link-offset-2`, `.u-link-offset-3`        |
| Link Underline         | `u-link-underline`         | `.u-link-underline`, `.u-link-underline-primary`                  |
| Link Underline Opacity | `u-link-underline-opacity` | `.u-link-underline-opacity-0`, `.u-link-underline-opacity-100`    |

### 10. Manual Utilities (Non-API)

| Property         | Class                 | Description                                                         |
| ---------------- | --------------------- | ------------------------------------------------------------------- |
| Clearfix         | `.u-clearfix`         | Applies clearfix pattern via `::after` pseudo-element               |
| Visually Hidden  | `.u-visually-hidden`  | Hides element visually but keeps it accessible to screen readers    |
| Glass Clean Root | `.u-glass-clean-root` | Removes properties that break `backdrop-filter`                     |
| Glass Debug      | `.u-glass-debug`      | Shows red debug outline for glass components                        |
| Glass No Motion  | `.u-glass-no-motion`  | Disables transitions/animations (respects `prefers-reduced-motion`) |

## Value Scales

### Spacing Scale

- Uses `rem` units with `0.25rem` (4px) base
- Values: `0`–`90`, plus `px-6`, `px-10`, `px-14`, `px-22`, `px-30`, `200`
- Special: `auto`
- Negative margins: available when `$enable-negative-margins` is set to `true`

### Typography Scale

- Font sizes: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `1`–`6` (heading sizes)
- Font weights: defined by `$theme-font-weight` design tokens

### Color System

- Semantic: `primary`, `secondary`, `success`, `error`, `warning`, `info`, `light`, `dark`
- Extras: `white`, `black`, `body`, `transparent`
- Emphasis variants: `primary-emphasis`, `secondary-emphasis`, etc.
- Subtle variants: `primary-subtle`, `secondary-subtle`, etc.

### Z-Index Scale

- Numeric: `n1` (-1), `0`–`5`
- Semantic: `dropdown` (1000), `sticky` (1020), `fixed` (1030), `modal` (1040), `popover` (1050), `tooltip` (1060), `drawer` (1070)

## Responsive Prefixes

Breakpoints: `xs` (0), `sm` (576px), `md` (768px), `lg` (992px), `xl` (1200px), `xxl` (1440px)

The infix goes between the class prefix and the value modifier:

```css
/* All breakpoints (no infix for xs) */
.u-m-4

/* Small and up */
.u-m-sm-4

/* Medium and up */
.u-m-md-4

/* Large and up */
.u-m-lg-4

/* Extra large and up */
.u-m-xl-4

/* Extra extra large and up */
.u-m-xxl-4
```

## Print Utilities

When a utility definition has `print: true`, classes are also generated inside `@media print { ... }`. Currently enabled for:

- Display utilities

## Implementation Guidelines

1. **Consistency First**: Always follow the established patterns
2. **Brevity**: Use the shortest meaningful names
3. **Intuitiveness**: Names should be self-explanatory
4. **Composability**: Utilities should work well together
5. **Performance**: Avoid unnecessary specificity

## Migration Notes

### Renamed Classes

| Old Class                | New Class       | Reason                                     |
| ------------------------ | --------------- | ------------------------------------------ |
| `.u-position-relative`   | `.u-relative`   | Shorter, matches Display pattern           |
| `.u-position-absolute`   | `.u-absolute`   | Shorter, matches Display pattern           |
| `.u-position-fixed`      | `.u-fixed`      | Shorter, matches Display pattern           |
| `.u-position-sticky`     | `.u-sticky`     | Shorter, matches Display pattern           |
| `.u-position-static`     | `.u-static`     | Shorter, matches Display pattern           |
| `.u-fst-italic`          | `.u-italic`     | More intuitive                             |
| `.u-fst-normal`          | `.u-not-italic` | More intuitive                             |
| `.u-text-xs` (font-size) | `.u-fs-xs`      | Avoid collision with text-color/text-align |
| `.u-text-sm` (font-size) | `.u-fs-sm`      | Avoid collision                            |
| `.u-text-lg` (font-size) | `.u-fs-lg`      | Avoid collision                            |
| `.u-mw-100`              | `.u-max-w-100`  | Clarity, avoid margin confusion            |
| `.u-mh-100`              | `.u-max-h-100`  | Clarity, avoid margin confusion            |
| `.u-m-4-md`              | `.u-m-md-4`     | Responsive infix before value              |

### New Classes Added

| Class                    | Description            |
| ------------------------ | ---------------------- |
| `.u-border-solid`        | `border-style: solid`  |
| `.u-border-dashed`       | `border-style: dashed` |
| `.u-border-dotted`       | `border-style: dotted` |
| `.u-border-double`       | `border-style: double` |
| `.u-border-none` (style) | `border-style: none`   |
| `.u-min-w-0`             | `min-width: 0`         |
| `.u-min-w-100`           | `min-width: 100%`      |
| `.u-min-h-0`             | `min-height: 0`        |
| `.u-min-h-100`           | `min-height: 100%`     |
