# Gap Utility Classes

Gap utilities control spacing between flex and grid children without margin on each item.

## Class naming

| Pattern | Example |
| ------- | ------- |
| Base | `.u-gap-4` |
| Responsive | `.u-gap-md-4` (breakpoint **suffix** before value) |

Breakpoints (from `settings.breakpoints.scss`):

| Name | Min width |
| ---- | --------- |
| `sm` | 576px |
| `md` | 768px |
| `lg` | 992px |
| `xl` | 1200px |
| `xxl` | 1440px |

## Available classes

### Gap

- `.u-gap-{size}` — numeric scale (`0`–`90`, pixel aliases like `px-6`, etc.)
- `.u-gap-{xs|sm|md|lg|xl}` — semantic aliases (`xs` = scale step `1`, `md` = `4`, …)

### Directional gap

- `.u-row-gap-{size}`
- `.u-column-gap-{size}`

All gap utilities support responsive variants: `.u-gap-md-4`, `.u-row-gap-lg-6`, etc.

## Examples

```html
<div class="u-grid u-gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="u-flex u-gap-md">
  <button>One</button>
  <button>Two</button>
</div>

<div class="u-grid u-gap-2 u-gap-md-4 u-gap-lg-6">
  Responsive gap
</div>
```

## Import

Gap utilities are included in the **core** bundle:

```scss
@use '@shohojdhara/atomix/scss/utilities/core';
```

Or the full utilities bundle:

```scss
@use '@shohojdhara/atomix/scss/utilities';
```
