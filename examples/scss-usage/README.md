# Using Atomix SCSS in External Projects

This guide covers how to integrate Atomix SCSS into your own project — from a full import to selective, token-only, or utility-only usage.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Import Strategies](#import-strategies)
  - [1. Full CSS (no build tool)](#1-full-css-no-build-tool)
  - [2. Full SCSS (all layers)](#2-full-scss-all-layers)
  - [3. Selective Layer Import](#3-selective-layer-import)
  - [4. Tokens + Tools only (no component styles)](#4-tokens--tools-only-no-component-styles)
- [Overriding Design Tokens](#overriding-design-tokens)
- [Using Atomix Mixins & Functions](#using-atomix-mixins--functions)
- [BEM Class Reference](#bem-class-reference)
- [Examples](#examples)

---

## Prerequisites

Install the package:

```bash
npm install @shohojdhara/atomix
# or
yarn add @shohojdhara/atomix
```

Your project must use **Sass (Dart Sass ≥ 1.69)** with `@use`/`@forward` module syntax.

---

## Import Strategies

### 1. Full CSS (no build tool)

The simplest option — import the pre-built stylesheet. No Sass required.

```html
<link rel="stylesheet" href="node_modules/@shohojdhara/atomix/dist/atomix.css" />
<!-- or minified -->
<link rel="stylesheet" href="node_modules/@shohojdhara/atomix/dist/atomix.min.css" />
```

Or via the package export:

```js
import '@shohojdhara/atomix/styles';
```

---

### 2. Full SCSS (all layers)

Import the entire Atomix SCSS source. This gives you all settings, tools, components, and utilities.

```scss
// your-project/src/styles/main.scss

// ⚠️ Override tokens BEFORE importing Atomix
$primary: #0ea5e9;
$font-family-base: 'Inter', sans-serif;

@use '@shohojdhara/atomix/scss' as *;
```

> The `@shohojdhara/atomix/scss` export resolves to `src/styles/index.scss`.

---

### 3. Selective Layer Import

Import only the ITCSS layers you need. This is the recommended approach for most projects.

```scss
// your-project/src/styles/main.scss

// 1. Override tokens first (must come before @use)
$primary: #0ea5e9;
$gray-9: #0f172a;

// 2. Settings (tokens/variables) — no CSS output
@use '@shohojdhara/atomix/src/styles/01-settings/index' as *;

// 3. Tools (mixins/functions) — no CSS output
@use '@shohojdhara/atomix/src/styles/02-tools/index' as *;

// 4. Generic (reset, root vars, fonts) — outputs CSS
@use '@shohojdhara/atomix/src/styles/03-generic/index' as *;

// 5. Elements (base HTML styles) — outputs CSS
@use '@shohojdhara/atomix/src/styles/04-elements/index' as *;

// 6. Objects (layout patterns) — outputs CSS
@use '@shohojdhara/atomix/src/styles/05-objects/index' as *;

// 7. Only the components you use
@use '@shohojdhara/atomix/src/styles/06-components/components.button' as *;
@use '@shohojdhara/atomix/src/styles/06-components/components.card' as *;
@use '@shohojdhara/atomix/src/styles/06-components/components.input' as *;

// 8. Utilities (optional)
@use '@shohojdhara/atomix/src/styles/99-utilities/index' as *;

// 9. Your own component styles
@use './components/my-component' as *;
```

---

### 4. Tokens + Tools only (no component styles)

Use Atomix as a token/mixin library without outputting any component CSS. Ideal when you write your own component styles but want to share the same design tokens.

```scss
// your-project/src/styles/_atomix-base.scss

// No CSS output — only variables and mixins become available
@use '@shohojdhara/atomix/src/styles/01-settings/index' as *;
@use '@shohojdhara/atomix/src/styles/02-tools/index' as *;
```

Then in your component files:

```scss
// your-project/src/styles/components/_my-card.scss
@use '../atomix-base' as *;

.my-card {
  background: $primary-bg;
  border: 1px solid $primary-border;
  border-radius: $border-radius-lg;
  padding: map.get($spacing-sizes, 6); // 1.5rem / 24px

  @include media-breakpoint-up(md) {
    padding: map.get($spacing-sizes, 8); // 2rem / 32px
  }
}
```

---

## Overriding Design Tokens

All Atomix SCSS variables use `!default`, so you can override them by declaring your values **before** the `@use` statement.

```scss
// ❌ Wrong — override after @use has no effect
@use '@shohojdhara/atomix/scss' as *;
$primary: #0ea5e9; // too late

// ✅ Correct — override before @use
$primary: #0ea5e9;
$font-family-base: 'Inter', sans-serif;
$border-radius: 0.25rem;
$font-size-base: 1rem;
@use '@shohojdhara/atomix/scss' as *;
```

### Common token overrides

| Variable | Default | Description |
|---|---|---|
| `$prefix` | `atomix-` | CSS custom property prefix |
| `$primary` | `#8b5cf6` | Brand primary color |
| `$font-family-base` | `'Roboto', sans-serif` | Base font stack |
| `$font-size-base` | `1rem` | Base font size (16px) |
| `$border-radius` | `0.375rem` | Default border radius |
| `$spacer` | `1rem` | Base spacing unit |
| `$grid-breakpoints` | see below | Responsive breakpoints |

### Overriding breakpoints

```scss
$grid-breakpoints: (
  xs: 0,
  sm: 480px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
  xxl: 1536px,
);

@use '@shohojdhara/atomix/scss' as *;
```

---

## Using Atomix Mixins & Functions

After importing settings + tools, these are available in your SCSS:

### Responsive breakpoints

```scss
@use '../atomix-base' as *;

.hero {
  font-size: $h2-font-size; // 2rem

  @include media-breakpoint-up(lg) {
    font-size: $h1-font-size; // 2.5rem
  }

  @include media-breakpoint-down(sm) {
    font-size: $h3-font-size; // 1.5rem
  }
}
```

### Spacing scale

```scss
@use 'sass:map';
@use '../atomix-base' as *;

.section {
  padding: map.get($spacing-sizes, 12) map.get($spacing-sizes, 6);
  // → padding: 3rem 1.5rem
}
```

### Color tokens

```scss
@use '../atomix-base' as *;

.alert-error {
  color: $error-text;           // $red-6
  background: $error-bg;        // $red-2
  border-color: $error-border;  // $red-6
}
```

---

## BEM Class Reference

Atomix uses a `c-` prefix for component classes and `is-` for state modifiers.

```html
<!-- Button -->
<button class="c-btn c-btn--primary c-btn--lg">Label</button>
<button class="c-btn c-btn--secondary is-disabled">Disabled</button>

<!-- Card -->
<div class="c-card">
  <div class="c-card__header">Header</div>
  <div class="c-card__body">Body</div>
</div>

<!-- Input -->
<div class="c-input-group">
  <input class="c-input" type="text" />
</div>
<div class="c-input-group is-invalid">
  <input class="c-input" type="text" />
</div>
```

---

## Examples

See the example files in this directory:

| File | Description |
|---|---|
| [`01-full-import.scss`](./01-full-import.scss) | Full Atomix SCSS with token overrides |
| [`02-selective-import.scss`](./02-selective-import.scss) | Import only specific layers/components |
| [`03-tokens-only.scss`](./03-tokens-only.scss) | Use tokens & mixins, write your own styles |
| [`04-vite-config.ts`](./04-vite-config.ts) | Vite configuration for SCSS path resolution |
| [`05-webpack-config.js`](./05-webpack-config.js) | Webpack configuration for SCSS path resolution |
