# Atomix Class Name Migration Guide

This guide helps you migrate from generic CSS class names to the official Atomix Design System class names.

## Class Name Patterns

Atomix follows the ITCSS methodology with specific prefixes:

- **Components**: `c-` prefix (e.g., `c-btn`, `c-card`)
- **Objects/Layout**: `o-` prefix (e.g., `o-container`, `o-grid`)
- **Utilities**: `u-` prefix (e.g., `u-flex`, `u-gap-4`)
- **States**: `is-` prefix (e.g., `is-open`, `is-active`)

## Component Class Mappings

### Buttons
```
OLD                     NEW
btn                     c-btn
btn--primary           c-btn--primary
btn--secondary         c-btn--secondary
btn--outline           c-btn--outline-primary
btn--ghost             [Use c-btn--outline-secondary]
btn--link              c-btn--link
btn--sm                c-btn--sm
btn--md                [Default size, no modifier needed]
btn--lg                c-btn--lg
btn--rounded           c-btn--rounded
btn--icon-only         c-btn--icon
btn__icon              c-btn__icon
```

### Cards
```
OLD                     NEW
card                    c-card
card__header           c-card__header
card__body             c-card__body
card__title            c-card__title
card__text             c-card__text
card__actions          c-card__actions
card__icon             c-card__icon
card--row              c-card--row
card--flat             c-card--flat
```

### Navigation
```
OLD                     NEW
navbar                  c-navbar
navbar__brand          c-navbar__brand
navbar__toggle         c-navbar__toggler
navbar__collapse       c-navbar__collapse
navbar__container      c-navbar__container
nav                     c-nav
nav__item              c-nav__item
nav__link              c-nav__link
nav__dropdown          c-nav__dropdown-menu
```

### Forms
```
OLD                     NEW
form                    c-form
form-group             c-form-group
form-group__label      c-form-group__label
form-group__field      c-form-group__field
form-group__helper     c-form-group__helper
input                   c-input
input--sm              c-input--sm
input--lg              c-input--lg
input--textarea        c-input--textarea
select                  c-select
checkbox                c-checkbox
checkbox__input        c-checkbox__input
checkbox__label        c-checkbox__label
```

### Badges & Labels
```
OLD                     NEW
badge                   c-badge
badge--primary         c-badge--primary
badge--success         c-badge--success
badge--warning         c-badge--warning
badge--error           c-badge--error
badge--sm              c-badge--sm
badge--lg              c-badge--lg
```

### Modals & Overlays
```
OLD                     NEW
modal                   c-modal
modal__backdrop        c-modal__backdrop
modal__dialog          c-modal__dialog
modal__content         c-modal__content
modal__header          c-modal__header
modal__body            c-modal__body
modal__footer          c-modal__footer
modal__close           c-modal__close
```

### Dropdowns
```
OLD                     NEW
dropdown                c-dropdown
dropdown__toggle       c-dropdown__toggle
dropdown__menu         c-dropdown__menu
dropdown__item         c-dropdown__menu-item
dropdown__divider      c-dropdown__divider
```

### Tables
```
OLD                     NEW
table                   c-data-table
table__header          c-data-table__header
table__row             c-data-table__row
table__cell            c-data-table__cell
table__header-cell     c-data-table__header-cell
table--striped         c-data-table--striped
table--bordered        c-data-table--bordered
```

### Other Components
```
OLD                     NEW
accordion               c-accordion
avatar                  c-avatar
breadcrumb             c-breadcrumb
countdown              c-countdown
hero                   c-hero
list                   c-list
menu                   c-menu
pagination             c-pagination
progress               c-progress
rating                 c-rating
steps                  c-steps
tabs                   c-tabs
tooltip                c-tooltip
upload                 c-upload
```

## Layout & Objects

### Grid System
```
OLD                     NEW
container               o-container
container-fluid        o-container-fluid
container-sm           o-container-sm
container-md           o-container-md
container-lg           o-container-lg
container-xl           o-container-xl
container-xxl          o-container-xxl

grid                   o-grid
grid__col              o-grid__col
grid__col--1           o-grid__col--1
grid__col--md-6        o-grid__col--md-6
grid__offset--2        o-grid__offset--2
grid--no-gutters       o-grid--no-gutters
```

### Other Layout Objects
```
OLD                     NEW
masonry-grid           o-masonry-grid
masonry-grid__item     o-masonry-grid__item
```

## Utility Classes

### Display
```
OLD                     NEW
d-block                u-d-block
d-inline               u-d-inline
d-inline-block         u-d-inline-block
d-flex                 u-d-flex
d-inline-flex          u-d-inline-flex
d-grid                 u-d-grid
d-none                 u-d-none
```

### Flexbox
```
OLD                     NEW
flex                   u-d-flex
flex-row               u-flex-row
flex-column            u-flex-column
flex-wrap              u-flex-wrap
flex-nowrap            u-flex-nowrap
justify-content-start  u-justify-content-start
justify-content-center u-justify-content-center
justify-content-end    u-justify-content-end
align-items-start      u-align-items-start
align-items-center     u-align-items-center
align-items-end        u-align-items-end
```

### Spacing
```
OLD                     NEW
m-0                    u-m-0
m-1                    u-m-1
m-2                    u-m-2
mt-4                   u-mt-4
mb-8                   u-mb-8
p-4                    u-p-4
px-6                   u-px-6
py-8                   u-py-8
gap-2                  u-gap-2
gap-md                 u-gap-4
gap-lg                 u-gap-8
```

### Text & Typography
```
OLD                     NEW
text-left              u-text-start
text-center            u-text-center
text-right             u-text-end
text-sm                u-fs-sm
text-lg                u-fs-lg
text-xl                u-fs-1
font-bold              u-fw-bold
font-medium            u-fw-medium
text-primary           u-text-primary
text-secondary         u-text-secondary
text-muted             u-text-secondary
```

### Background & Colors
```
OLD                     NEW
bg-primary             u-bg-primary
bg-secondary           u-bg-secondary
bg-white               u-bg-white
bg-gray-100            u-bg-secondary-subtle
bg-gray-200            u-bg-tertiary-subtle
```

### Borders & Radius
```
OLD                     NEW
border                 u-border
border-0               u-border-0
border-top             u-border-t
border-primary         u-border-primary
rounded                u-rounded
rounded-sm             u-rounded-sm
rounded-lg             u-rounded-lg
rounded-full           u-rounded-circle
```

### Position & Layout
```
OLD                     NEW
position-relative      u-position-relative
position-absolute      u-position-absolute
position-fixed         u-position-fixed
top-0                  u-top-0
bottom-0               u-bottom-0
left-0                 u-start-0
right-0                u-end-0
```

### Width & Height
```
OLD                     NEW
w-100                  u-w-100
w-50                   u-w-50
h-100                  u-h-100
min-vh-100             u-min-vh-100
```

### Shadows & Effects
```
OLD                     NEW
shadow                 u-shadow
shadow-sm              u-shadow-sm
shadow-lg              u-shadow-lg
opacity-50             u-opacity-50
```

## State Classes

### Interactive States
```
OLD                     NEW
active                 is-active
open                   is-open
closed                 is-closed
disabled               is-disabled
focused                is-focused
loading                is-loading
expanded               is-expanded
collapsed              is-collapsed
```

## Migration Examples

### Before (Generic Classes)
```html
<div class="container">
  <div class="grid">
    <div class="grid__col grid__col--md-6">
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">Example Card</h3>
        </div>
        <div class="card__body">
          <p class="card__text">Card content here</p>
          <button class="btn btn--primary btn--sm">
            <span class="btn__icon">→</span>
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### After (Atomix Classes)
```html
<div class="o-container">
  <div class="o-grid">
    <div class="o-grid__col o-grid__col--md-6">
      <div class="c-card">
        <div class="c-card__header">
          <h3 class="c-card__title">Example Card</h3>
        </div>
        <div class="c-card__body">
          <p class="c-card__text">Card content here</p>
          <button class="c-btn c-btn--primary c-btn--sm">
            <span class="c-btn__icon">→</span>
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Responsive Utilities

Atomix uses the same responsive breakpoints but with `u-` prefix:

```
OLD                     NEW
d-none d-md-block      u-d-none u-d-md-block
flex-column flex-md-row u-flex-column u-flex-md-row
text-center text-md-left u-text-center u-text-md-start
```

## Color System Updates

Atomix uses semantic color names:

- `primary` - Purple brand color
- `secondary` - Gray neutral
- `success` - Green
- `info` - Blue  
- `warning` - Yellow
- `error` - Red
- `light` - Light gray
- `dark` - Dark gray

## Dark Mode Support

Atomix includes built-in dark mode. Use `data-atomix-theme="dark"` on the html element to enable dark theme.

## Breaking Changes to Note

1. **Grid columns**: Now uses `o-grid__col--md-6` instead of `col-md-6`
2. **Button sizes**: No `--xs` or `--xl` sizes, only `--sm` and `--lg`
3. **Text alignment**: `text-left` becomes `u-text-start`, `text-right` becomes `u-text-end`
4. **Outline buttons**: Now semantic like `c-btn--outline-primary` instead of generic `c-btn--outline`
5. **State classes**: All use `is-` prefix consistently

## Migration Strategy

1. **Start with layout**: Update containers, grids, and major layout components first
2. **Update components**: Migrate component classes systematically 
3. **Fix utilities**: Update utility classes last as they're used everywhere
4. **Test responsive**: Ensure responsive utilities work correctly
5. **Validate dark mode**: Test dark mode compatibility

This systematic approach will help ensure a smooth migration to the official Atomix class names.