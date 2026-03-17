# Atomix ITCSS Architecture

ITCSS helps manage CSS codebase by ordering selectors by specificity and reach.

## Layer Details

### 01-settings
Located in `src/styles/01-settings/`. Contains global variables that don't generate actual CSS.
Example: `$brand-primary`, `$base-font-size`.

### 02-tools
Located in `src/styles/02-tools/`. Contains mixins and functions used throughout the project.
Example: `@mixin respond-to($breakpoint)`, `rem-calc($px)`.

### 03-generic
Located in `src/styles/03-generic/`. Low-specificity resets and generic styles.

### 04-elements
Located in `src/styles/04-elements/`. Basic styling for bare HTML tags.
Example: `a { color: var(--atomix-link-color); }`.

### 05-objects
Located in `src/styles/05-objects/`. Layout-only classes.
Example: `.o-container`, `.o-grid`.

### 06-components
Located in `src/styles/06-components/`. Specific UI components.
Example: `.c-button`, `.c-card`.
- Must follow BEM: `.c-component`, `.c-component__element`, `.c-component--modifier`.

### 99-utilities
Located in `src/styles/99-utilities/`. Single-responsibility classes with `!important` if necessary.
Example: `.u-m-0`, `.u-text-center`.

## Build Process
Styles are imported in `src/styles/index.scss` in exactly this order. Rollup handles the compilation to `dist/atomix.css`.
