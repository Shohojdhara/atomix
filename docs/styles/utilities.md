# CSS Utilities

Atomix utilities are generated at SCSS compile time from token maps using the utility API in `src/styles/02-tools/_tools.utility-api.scss`.

**Naming reference:** [utility-naming-guidelines.md](../utility-naming-guidelines.md)

## Import paths

| Bundle | Path | Contents |
| ------ | ---- | -------- |
| Full (default) | `@shohojdhara/atomix/scss/utilities` | Core + grid + interaction + motion |
| Core | `@shohojdhara/atomix/scss/utilities/core` | Spacing, flex, display, typography, colors, sizing, position, effects, a11y helpers |
| Grid | `@shohojdhara/atomix/scss/utilities/grid` | `u-grid-cols-*`, `u-col-span-*`, `u-place-*`, … |
| Interaction | `@shohojdhara/atomix/scss/utilities/interaction` | `u-cursor-*`, `u-pointer-events-*`, `u-select-*` |
| Motion | `@shohojdhara/atomix/scss/utilities/motion` | Transitions, transforms, hover/focus/active variants |

```scss
// Core only (smaller CSS output)
@use '@shohojdhara/atomix/scss/utilities/core';

// À la carte
@use '@shohojdhara/atomix/scss/utilities/core';
@use '@shohojdhara/atomix/scss/utilities/grid';
@use '@shohojdhara/atomix/scss/utilities/interaction';
@use '@shohojdhara/atomix/scss/utilities/motion';
```

## Responsive pattern

Breakpoint infix sits **between prefix and value**:

```
.u-{category}-{breakpoint}-{value}
```

Examples: `.u-m-md-4`, `.u-grid-cols-lg-3`, `.u-gap-sm-2`

| Breakpoint | Min width |
| ---------- | --------- |
| `sm` | 576px |
| `md` | 768px |
| `lg` | 992px |
| `xl` | 1200px |
| `xxl` | 1440px |

```html
<div class="u-grid u-grid-cols-1 u-grid-cols-md-2 u-grid-cols-lg-3 u-gap-4">
  ...
</div>
```

## Core utilities

### Spacing

Margin: `u-m-*`, `u-mx-*`, `u-my-*`, `u-mt-*`, `u-me-*`, `u-mb-*`, `u-ms-*` (includes `auto`)

Padding: `u-p-*`, `u-px-*`, `u-py-*`, `u-pt-*`, `u-pe-*`, `u-pb-*`, `u-ps-*`

Gap: `u-gap-*`, `u-row-gap-*`, `u-column-gap-*` (numeric + `xs`/`sm`/`md`/`lg`/`xl` aliases)

Negative margins are available when `$enable-negative-margins: true` (keys prefixed with `n`, e.g. `u-m-n4`).

### Display & flex

`u-block`, `u-inline`, `u-inline-block`, `u-flex`, `u-inline-flex`, `u-grid`, `u-inline-grid`, `u-none`, …

Flex: `u-flex-row`, `u-flex-column`, `u-flex-wrap`, `u-justify-*`, `u-items-*`, `u-content-*`, `u-self-*`, `u-order-*`, `u-flex-grow-*`, `u-flex-shrink-*`

### Typography

`u-text-{xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|h1…h6|1…6}`

`u-font-{light|normal|medium|semibold|bold|heavy|black}`

`u-leading-{none|tight|snug|normal|relaxed|loose|1}`

`u-text-{start|center|end}`, `u-text-{uppercase|lowercase|capitalize}`

`u-underline`, `u-line-through`, `u-no-underline`

`u-italic`, `u-not-italic`

### Colors

`u-text-{theme}`, `u-text-{theme}-emphasis`, `u-bg-{theme}`, `u-bg-{theme}-subtle`, `u-border-{theme}`, gradients

### Sizing

`u-w-*`, `u-h-*` — spacing scale for rem sizes; `25`/`50`/`75`/`100`/`full`/`auto` for percentages

`u-max-w-*`, `u-min-w-*`, `u-max-h-*`, `u-min-h-*`, `u-vw-*`, `u-vh-*`, `u-min-vw-*`, `u-min-vh-*`

### Position

`u-static`, `u-relative`, `u-absolute`, `u-fixed`, `u-sticky`

`u-top-*`, `u-bottom-*`, `u-start-*`, `u-end-*`, `u-inset-*`, `u-inset-x-*`, `u-inset-y-*`

`u-translate-middle`, `u-translate-middle-x`, `u-translate-middle-y`

### Effects

`u-opacity-*`, `u-shadow-*`, `u-overflow-*`, `u-overflow-x-*`, `u-overflow-y-*`, `u-object-fit-*`, `u-visible`, `u-invisible`, `u-z-*`

### Accessibility helpers

`u-visually-hidden`, `u-clearfix`, `u-touch-target`, glass helper classes in `utilities.glass-fixes`

## Grid utilities (opt-in)

Requires `@use '@shohojdhara/atomix/scss/utilities/grid'` or full bundle.

| Utility | Examples |
| ------- | -------- |
| Columns | `u-grid-cols-1` … `u-grid-cols-12` |
| Rows | `u-grid-rows-1` … `u-grid-rows-6` |
| Column span | `u-col-span-1` … `u-col-span-12`, `u-col-span-full` |
| Row span | `u-row-span-1` … `u-row-span-6`, `u-row-span-full` |
| Placement | `u-place-items-*`, `u-place-content-*` |

```html
<div class="u-grid u-grid-cols-3 u-gap-4">
  <div class="u-col-span-2">Wide</div>
  <div>Narrow</div>
</div>
```

## Interaction utilities (opt-in)

| Utility | Examples |
| ------- | -------- |
| Cursor | `u-cursor-pointer`, `u-cursor-help`, `u-cursor-not-allowed`, … |
| Pointer events | `u-pointer-events-none`, `u-pointer-events-auto` |
| User select | `u-select-none`, `u-select-text`, `u-select-all`, `u-select-auto` |
| Touch action | `u-touch-action-manipulation`, … |

## Motion utilities (opt-in)

### Transitions

`u-transition-{none|all|colors|opacity|shadow|transform}`

`u-duration-{75|100|150|200|300|500|700|1000}`

`u-ease-{linear|in|out|in-out}`

### Transforms

`u-scale-{0|50|75|90|95|100|105|110|125|150}`

`u-rotate-{0|45|90|180}`

### State variants (pseudo-class)

Classes apply styles on interaction states:

| Class pattern | State |
| ------------- | ----- |
| `u-hover-bg-{color}` | `:hover` background |
| `u-hover-text-{color}` | `:hover` text color |
| `u-hover-shadow-{sm|md|lg|xl}` | `:hover` box-shadow |
| `u-hover-scale-{95|100|105|110}` | `:hover` transform |
| `u-active-scale-{95|100}` | `:active` transform |
| `u-focus-outline-none` | `:focus-visible` outline |

```html
<button class="u-shadow-lg u-transition-transform u-hover-scale-105 u-duration-200">
  Hover me
</button>
```

## Customization

Override token maps before importing utilities:

```scss
@use '@shohojdhara/atomix/scss/settings' with (
  $enable-negative-margins: true
);
@use '@shohojdhara/atomix/scss/utilities';
```

Category maps live in `src/styles/99-utilities/`. Add a new `$utilities-*` map and merge it in `_utilities.scss` (or a dedicated bundle file).
