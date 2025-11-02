# Atomix Theme Checklist

Use this checklist when creating or updating a theme to align with Atomix guidelines (Rollup, Storybook 8, Vitest, ITCSS-like SCSS).

## 1) Structure and Entrypoint
- [ ] Theme folder under `src/themes/<theme-name>/`
- [ ] `index.scss` uses ITCSS order and forwards local overrides:
  ```text
  // Local settings override base
  @use '01-settings/index' as *;
  // Tools
  @use '02-tools/index' as *;
  @use '../../styles/02-tools/index' as tools;
  // Generic
  @use '03-generic/index' as *;
  @use '../../styles/03-generic/index' as generic;
  // Elements
  @use '04-elements/index' as *;
  @use '../../styles/04-elements/index' as elements;
  // Objects
  @use '05-objects/index' as *;
  @use '../../styles/05-objects/index' as objects;
  // Components
  @use '06-components/index' as *;
  @use '../../styles/06-components/index';
  // Utilities
  @use '99-utilities/index' as *;
  @use '../../styles/99-utilities/index' as utilities;
  ```
- [ ] Exceptions (e.g., namespaced `@use`) are documented in a README inside the theme.

## 2) Tokens and Settings Coverage
- [ ] Colors: 1–10 scale for primary, neutral (gray), and any accent palettes
- [ ] settings.config (prefix, env), spacing, breakpoints, typography
- [ ] Component settings: button, input, card, nav, tabs, tooltip/popover, modal, forms
- [ ] Prefer `@forward` in `01-settings/_index.scss` to keep `index.scss` clean.

## 3) Theming Conventions
- [ ] Data attributes/classes:
  - `data-theme="<theme-name>"` on `body` or `html`
  - `data-atomix-color-mode="light|dark"` on `html`
- [ ] BEM-like class naming for components (e.g., `c-button`, `c-accordion`)
- [ ] Avoid global overrides; prefer component-scoped tokens/utilities.

## 4) Accessibility (A11y)
- [ ] Contrast: ≥ 4.5:1 normal text, ≥ 3.0:1 large text
- [ ] Focus visible and keyboard nav clearly styled in both color modes
- [ ] Form controls: placeholder, helper text meet contrast
- [ ] Record a11y state in `src/themes/themes.config.js` (`a11y` and `status` fields)

## 5) Performance
- [ ] Heavy effects (blur/backdrop-filter) are opt-in and scoped
- [ ] Limit CSS custom properties; group by prefix, keep under ~500 per theme
- [ ] Avoid duplicate declarations; rely on base utilities where possible

## 6) Build and Distribution
- [ ] `index.scss` compiles via `yarn build:styles` to `dist/themes/<theme>.css` and `.min.css`
- [ ] Test import from package: `@shohojdhara/atomix/themes/<theme>.css`
- [ ] Update `themes.config.js` metadata (name, version, tags, a11y, status)

## 7) Storybook
- [ ] Theme selectable via toolbar in `.storybook/preview.tsx`
- [ ] If using custom switcher, read theme list from shared source to avoid drift
- [ ] Provide a few Storybook stories showcasing theme-specific overrides (Buttons, Cards, Nav, Forms)

## 8) Testing
- [ ] Add or update minimal visual smoke tests in Storybook (manual)
- [ ] For unit tests (optional): follow Vitest API (`vi.*`), not Jest
- [ ] Run: `yarn dev` and validate main components under both color modes

## 9) Documentation
- [ ] Add theme README with design intent, palette examples, and any exceptions from the standard import pattern
- [ ] Link to the Themes Guide: `src/themes/README.md`

