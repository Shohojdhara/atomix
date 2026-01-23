# CSS Utility Class Naming Guidelines

## Overview

This document establishes consistent naming conventions for CSS utility classes in the Atomix Design System.

## Naming Pattern Structure

### Base Pattern
```
.u-{category}-{modifier?}-{value}
```

### Responsive Pattern
```
.u-{breakpoint}-{category}-{modifier?}-{value}
```

### State Pattern (planned)
```
.u-{state}-{category}-{modifier?}-{value}
```

## Category Naming Standards

### 1. Layout & Display
| Property | Class Prefix | Examples |
|----------|-------------|----------|
| Display | `u-` | `.u-block`, `.u-flex`, `.u-grid`, `.u-none` |
| Position | `u-` | `.u-relative`, `.u-absolute`, `.u-fixed` |
| Top/Bottom/Start/End | `u-` | `.u-top-0`, `.u-start-50`, `.u-bottom-auto` |
| Z-index | `u-z` | `.u-z-auto`, `.u-z-1`, `.u-z-modal` |

### 2. Spacing
| Property | Class Prefix | Examples |
|----------|-------------|----------|
| Margin | `u-m` | `.u-m-0`, `.u-m-4`, `.u-m-auto` |
| Margin X | `u-mx` | `.u-mx-2`, `.u-mx-auto` |
| Margin Y | `u-my` | `.u-my-3`, `.u-my-auto` |
| Margin Top | `u-mt` | `.u-mt-1`, `.u-mt-auto` |
| Margin End | `u-me` | `.u-me-2`, `.u-me-auto` |
| Margin Bottom | `u-mb` | `.u-mb-1`, `.u-mb-auto` |
| Margin Start | `u-ms` | `.u-ms-2`, `.u-ms-auto` |
| Padding | `u-p` | `.u-p-0`, `.u-p-4` |
| Gap | `u-gap` | `.u-gap-2`, `.u-gap-4` |

### 3. Flexbox
| Property | Class Prefix | Examples |
|----------|-------------|----------|
| Flex Direction | `u-flex` | `.u-flex-row`, `.u-flex-col` |
| Flex Wrap | `u-flex` | `.u-flex-wrap`, `.u-flex-nowrap` |
| Justify Content | `u-justify` | `.u-justify-start`, `.u-justify-center`, `.u-justify-between` |
| Align Items | `u-items` | `.u-items-start`, `.u-items-center`, `.u-items-stretch` |
| Align Content | `u-content` | `.u-content-start`, `.u-content-center` |
| Align Self | `u-self` | `.u-self-auto`, `.u-self-start`, `.u-self-center` |
| Flex Grow | `u-flex` | `.u-flex-grow-0`, `.u-flex-grow-1` |
| Flex Shrink | `u-flex` | `.u-flex-shrink-0`, `.u-flex-shrink-1` |
| Order | `u-order` | `.u-order-1`, `.u-order-last` |

### 4. Typography
| Property | Class Prefix | Examples |
|----------|-------------|----------|
| Font Size | `u-text` | `.u-text-xs`, `.u-text-sm`, `.u-text-lg` |
| Font Weight | `u-font` | `.u-font-light`, `.u-font-normal`, `.u-font-bold` |
| Font Style | `u-italic` | `.u-italic`, `.u-not-italic` |
| Line Height | `u-leading` | `.u-leading-none`, `.u-leading-tight`, `.u-leading-normal` |
| Text Align | `u-text` | `.u-text-left`, `.u-text-center`, `.u-text-right` |
| Text Transform | `u-text` | `.u-text-uppercase`, `.u-text-lowercase`, `.u-text-capitalize` |
| Text Decoration | `u-underline`, `.u-line-through` | `.u-underline`, `.u-line-through`, `.u-no-underline` |

### 5. Colors
| Property | Class Prefix | Examples |
|----------|-------------|----------|
| Text Color | `u-text` | `.u-text-primary`, `.u-text-secondary`, `.u-text-success` |
| Background Color | `u-bg` | `.u-bg-primary`, `.u-bg-light`, `.u-bg-dark` |
| Border Color | `u-border` | `.u-border-primary`, `.u-border-light` |

### 6. Sizing
| Property | Class Prefix | Examples |
|----------|-------------|----------|
| Width | `u-w` | `.u-w-auto`, `.u-w-full`, `.u-w-1/2`, `.u-w-64` |
| Height | `u-h` | `.u-h-auto`, `.u-h-full`, `.u-h-screen`, `.u-h-64` |
| Min Width | `u-min-w` | `.u-min-w-0`, `.u-min-w-full`, `.u-min-w-64` |
| Min Height | `u-min-h` | `.u-min-h-0`, `.u-min-h-full`, `.u-min-h-screen` |
| Max Width | `u-max-w` | `.u-max-w-none`, `.u-max-w-xs`, `.u-max-w-prose` |
| Max Height | `u-max-h` | `.u-max-h-none`, `.u-max-h-full`, `.u-max-h-screen` |

### 7. Borders
| Property | Class Prefix | Examples |
|----------|-------------|----------|
| Border Width | `u-border` | `.u-border`, `.u-border-2`, `.u-border-4` |
| Border Style | `.u-solid`, `.u-dashed`, `.u-dotted` | |
| Border Radius | `u-rounded` | `.u-rounded-none`, `.u-rounded-sm`, `.u-rounded-lg`, `.u-rounded-full` |

### 8. Effects
| Property | Class Prefix | Examples |
|----------|-------------|----------|
| Opacity | `u-opacity` | `.u-opacity-0`, `.u-opacity-50`, `.u-opacity-100` |
| Shadow | `u-shadow` | `.u-shadow-none`, `.u-shadow-sm`, `.u-shadow-lg` |
| Overflow | `u-overflow` | `.u-overflow-auto`, `.u-overflow-hidden`, `.u-overflow-scroll` |

## Value Scales

### Spacing Scale
- Uses `rem` units with `0.25rem` (4px) base
- Values: `0-9` (0rem to 2.25rem)
- Special: `auto`, `px` (1px)

### Typography Scale
- Font sizes: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`
- Font weights: `thin`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black`

### Color System
- Semantic: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`
- Grayscale: `white`, `gray-50` to `gray-900`, `black`

## Responsive Prefixes

```css
/* All breakpoints */
.u-m-4

/* Small and up */
.u-sm-m-4

/* Medium and up */
.u-md-m-4

/* Large and up */
.u-lg-m-4

/* Extra large and up */
.u-xl-m-4

/* Extra extra large and up */
.u-xxl-m-4
```

## Implementation Guidelines

1. **Consistency First**: Always follow the established patterns
2. **Brevity**: Use the shortest meaningful names
3. **Intuitiveness**: Names should be self-explanatory
4. **Composability**: Utilities should work well together
5. **Performance**: Avoid unnecessary specificity

## Migration Plan

### Phase 1: Core Naming Standardization
- ✅ Display utilities: `u-d-*` → `u-*`
- ✅ Flex utilities: `u-justify-content-*` → `u-justify-*`
- ✅ Flex utilities: `u-align-items-*` → `u-items-*`
- ✅ Flex utilities: `u-align-self-*` → `u-self-*`

### Phase 2: Spacing Scale Simplification
- Simplify scale from 0-90 to 0-9
- Maintain backwards compatibility with deprecation warnings

### Phase 3: State Variants Implementation
- Add `hover:`, `focus:`, `active:` state variants
- Implement `dark:` mode utilities

### Phase 4: Documentation & Tooling
- Update all documentation to reflect new naming
- Create migration scripts for existing codebases
- Add linting rules for utility usage

## Examples

### Before (Inconsistent)
```css
.u-flex
.u-justify-center
.u-items-center
.u-m-4
.u-text-center
.u-text-lg
```

### After (Consistent)
```css
.u-flex
.u-justify-center
.u-items-center
.u-m-4
.u-text-center
.u-text-lg
```

This creates a more intuitive, consistent, and maintainable utility class system.