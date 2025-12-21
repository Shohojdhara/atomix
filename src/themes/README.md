
# Atomix Design System Themes

This guide documents how to build SCSS-based themes for the Atomix Design System

## Theme Architecture

- Overview
  - Themes follow a layered SCSS architecture mirroring Atomix core styles: `01-settings`, `02-tools`, `03-generic`, `04-elements`, `05-objects`, `06-components`, `99-utilities`.
  - Each theme selectively overrides base tokens, utilities, and component styling while reusing the majority of Atomix core styles.

- File Structure (from `shaj-default`)
  - `index.scss` — Entrypoint that wires up local overrides and Atomix base layers.
  - `01-settings/` — Theme tokens and configuration (colors, spacing, breakpoints, fonts, typography, component settings).
  - `02-tools/` — Optional theme-specific tools; can be empty when only using Atomix tools.
  - `03-generic/` — Root-level theme overrides (often minimal).
  - `04-elements/`, `05-objects/` — Rarely overridden; keep consistent unless theme requires element/object-level changes.
  - `06-components/` — Component overrides specific to the theme’s visual style.
  - `99-utilities/` — Utility overrides or additions.

- Architecture Diagram
  ```
  Theme Entrypoint (index.scss)
    ├─ 01-settings (forward)  → overrides base tokens
    ├─ 02-tools    (use/forward) → theme tools (optional)
    ├─ 03-generic  (forward)  → root/base overrides
    ├─ 04-elements (forward)  → element-level overrides (rare)
    ├─ 05-objects  (forward)  → layout/object overrides (rare)
    ├─ 06-components(forward) → component styling overrides
    └─ 99-utilities(forward) → utility overrides (optional)
  
  Atomix Base Styles (../../styles)
    ├─ 01-settings → default tokens
    ├─ 02-tools    → mixins & functions
    ├─ 03-generic  → resets and root
    ├─ 04-elements → HTML elements
    ├─ 05-objects  → layout patterns
    ├─ 06-components → components
    └─ 99-utilities → utility classes
  ```

- Entrypoint Example (from `shaj-default/index.scss`)
  ```scss
  // Import and forward local theme settings first (these override base settings)
  @use '01-settings/index' as *;

  // Import and forward base styles with local overrides
  @use '02-tools/index' as *;
  @use '../../styles/02-tools/index' as tools;

  @use '03-generic/index' as *;
  @use '../../styles/03-generic/index' as generic;

  @use '04-elements/index' as *;
  @use '../../styles/04-elements/index' as elements;

  @use '05-objects/index' as *;
  @use '../../styles/05-objects/index' as objects;

  @use '06-components/index' as *;
  @use '../../styles/06-components/index';

  @use '99-utilities/index' as *;
  @use '../../styles/99-utilities/index' as utilities;
  ```

- Core SCSS Files and Purpose
  - `01-settings/_settings.config.scss`: global theme config, including `$prefix` to namespace CSS variables.
    ```scss
    // These variables must act as constants, hence the uppercase
    $ENV: 'dev';
    $prefix: atomix- !default; // used as var(--#{$prefix}token)
    ```
  - `01-settings/_settings.colors.scss`: overrides Atomix color tokens by providing a 1–10 scale for each palette.
    ```scss
    @use '../../../styles/01-settings/settings.colors' with (
      $primary-6: #0ea5e9,
      $primary-7: #0284c7,
      $primary-8: #0369a1,
      $gray-1: #f9fafb,
      $gray-10: #111827,
      // ... full 1–10 scales per color
    );
    ```
  - `01-settings/_settings.typography.scss`: font families, weights, sizes, line-heights, letter spacing.
    ```scss
    @use '../../../styles/01-settings/settings.typography' with (
      $font-family-base: (system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif),
      $font-weight-normal: 400,
      $h1-font-size: 2.75rem,
      $line-height-base: 1.6,
      $headings-font-weight: 600,
      // ...
    );
    ```
  - `01-settings/_settings.spacing.scss`: spacing scale tied to `px` values.
    ```scss
    $spacer: 16px !default;
    $spacing-sizes: (
      0: 0px, 1: 4px, 2: 8px, 3: 12px,
      4: 16px, 5: 20px, 6: 24px, 8: 32px,
      10: 40px, 12: 48px, 16: 64px, 20: 80px,
      // ...
    ) !default;
    ```
  - `01-settings/_settings.breakpoints.scss`: breakpoint map and explicit variables.
    ```scss
    $breakpoints: (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1400px) !default;
    $breakpoint-sm: 576px !default; // also provided individually
    ```
  - `01-settings/_settings.fonts.scss`: font imports and loading strategy.
    ```scss
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    $font-display: swap !default;
    ```
  - `06-components/*`: component-specific overrides using theme CSS variables.
    ```scss
    // Button example
    @use '../01-settings/settings.config' as *;
    .c-btn.c-btn-primary {
      background: linear-gradient(135deg, var(--#{$prefix}primary-6), var(--#{$prefix}primary-7));
      border-color: var(--#{$prefix}primary-6);
    }
    ```

- Variable Naming Conventions and Organization
  - SCSS variables: lowercase with hyphenation (e.g., `$primary-6`, `$line-height-base`).
  - Constant-like config: uppercase for special cases (e.g., `$ENV`).
  - CSS variables: namespaced with `$prefix`, used as `var(--#{$prefix}token-name)` throughout components to enable runtime theming.
  - Color scales: 1–10 per palette for predictable gradations.

- Mixins and Function Implementations
  - Atomix provides color utilities and general tools you can reuse; theme overrides are optional.
  - Color utilities (from base tools):
    ```scss
    // _tools.color-functions.scss
    @function tint-color($color, $weight) { /* mix with white */ }
    @function shade-color($color, $weight) { /* mix with black */ }
    @function shift-color($color, $weight) { /* tint if >0, else shade */ }
    @function to-rgb($color) { /* returns "r, g, b" or passthrough */ }
    ```
  - Media, spacing, and utility tools are exposed via `@use '../../styles/02-tools/index' as tools;` and can be applied in components.

## Theme Creation Process

- Step-by-Step Guide
  1. Create a new theme folder: `./src/themes/<your-theme>/`.
  2. Add `index.scss` that forwards local settings first, then uses Atomix base layers:
     ```scss
     @use '01-settings/index' as *;
     @use '02-tools/index' as *;
     @use '../../styles/02-tools/index' as tools;
     @use '03-generic/index' as *;
     @use '../../styles/03-generic/index' as generic;
     @use '04-elements/index' as *;
     @use '../../styles/04-elements/index' as elements;
     @use '05-objects/index' as *;
     @use '../../styles/05-objects/index' as objects;
     @use '06-components/index' as *;
     @use '../../styles/06-components/index';
     @use '99-utilities/index' as *;
     @use '../../styles/99-utilities/index' as utilities;
     ```
  3. Implement `01-settings/_index.scss` and forward needed settings files. Start with colors and config, then add typography, spacing, breakpoints, and any component settings.
  4. Optionally add `02-tools` overrides (often empty if relying on Atomix tools).
  5. Add component overrides under `06-components` as needed to express your unique design.
  6. Keep `03-generic`, `04-elements`, `05-objects`, and `99-utilities` minimal unless your theme needs specific overrides at those layers.

- Required Base Variables and Defaults
  - `$prefix`: CSS variable namespace (default: `atomix-`).
  - Colors: provide complete 1–10 scales for `primary`, `red`, `green`, `yellow`, `blue`, and `gray`. Use `shaj-default` values as a starting point.
  - Typography: families, weights (300–900), base and heading sizes, line heights, letter spacing.
  - Spacing: maintain the Atomix scale (e.g., `$spacer: 16px` and `$spacing-sizes` map) for consistency.
  - Breakpoints: keep standard responsive sizes (xs–xxl) to ensure layout fidelity.

- Color Palette Definition Methodology
  - Define each color scale from 1 (lightest) to 10 (darkest) with accessible contrast.
  - Prefer balanced hues aligned with UI affordances: primary for action, gray for surfaces, red/green for state.
  - Use CSS variables in components: `var(--#{$prefix}primary-6)` for runtime theme flexibility.

- Typography System Implementation
  - Use performant system fonts by default (as in `shaj-default`).
  - Scale headings more pronounced than body text; ensure `line-height-base` ≥ 1.5 for readability.
  - Adjust letter spacing for large headings to improve optical balance.

- Spacing and Layout Rules
  - Adopt the Atomix spacing map to guarantee consistent padding/margins across components.
  - Leverage base grid and breakpoint tools from `../../styles/02-tools` for responsive behaviors.

- Component-Specific Styling Patterns
  - Buttons: use gradients or solid fills with hover transitions; reference `primary-*` variables.
    ```scss
    .c-btn.c-btn-primary { background: linear-gradient(135deg, var(--#{$prefix}primary-6), var(--#{$prefix}primary-7)); }
    ```
  - Inputs: emphasize focus states with subtle shadows and color borders; include valid/invalid states.
    ```scss
    .c-form-control:focus { border-color: var(--#{$prefix}primary-6); box-shadow: 0 0 0 3px rgba(14,165,233,0.1); }
    ```
  - Cards: use surface and border tokens with hover elevation.
    ```scss
    .c-card { border: 1px solid var(--#{$prefix}gray-2); &:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.12); } }
    ```

## Best Practices

- SCSS Organization Strategies
  - Mirror Atomix’s layered architecture; keep overrides local to the appropriate layer.
  - Forward settings via `01-settings/_index.scss` using `@forward` to keep entry imports clean.
  - Minimize changes in `03-generic`, `04-elements`, and `05-objects` unless necessary.

- Variable Inheritance Patterns
  - Override base tokens using `@use '...settings.*' with (...)` to keep diffs scoped.
  - Namespace CSS variables via `$prefix`, and access them in components using `var(--#{$prefix}...)`.
  - Prefer CSS variables in component styles to allow runtime theming.

- Theme Extension Techniques
  - Start from `shaj-default` and incrementally override only what you need.
  - Add component overrides under `06-components` to layer theme-specific visuals without diverging from core semantics.
  - Reuse Atomix tools (`../../styles/02-tools`) for consistency and performance.

- Performance Optimization for Theme SCSS
  - Avoid deep selector nesting; keep specificity low.
  - Use transition and shadow values sparingly to reduce paint cost.
  - Share tokens via CSS variables rather than recomputing values in many places.
  - Build settings can compress output; see `themes.config.js` for build formats and Sass options.

- Browser Compatibility Considerations
  - Respect the project `.browserslistrc` for autoprefixing and compatibility.
  - Provide sensible fallbacks when using advanced features; CSS vars are widely supported but test in IE11-like environments if necessary (polyfills typically out of scope).

## Testing and Validation

- Visual Regression Testing Procedures
  - Use Storybook stories for themed components; compare snapshots across theme changes.
  - Consider integrating Chromatic or a screenshot diff tool to catch regressions.

- Theme Consistency Checks
  - Verify all components read tokens from CSS variables (e.g., `var(--#{$prefix}*)`).
  - Ensure spacing, typography, and color usage comply with your theme’s `01-settings`.
  - Audit hover/focus states for accessibility and consistency.

- Cross-Browser Testing Requirements
  - Test Chrome, Safari, Firefox, and Edge at minimum.
  - Validate responsive behavior at breakpoints (`sm`, `md`, `lg`, `xl`, `xxl`).

- Performance Impact Measurement
  - Measure CSS bundle size per theme; prefer compressed outputs for production.
  - Use Lighthouse or performance tooling to evaluate paint, layout shifts, and interaction latency.

## Maintenance Guidelines

- Theme Versioning Strategy
  - Track theme versions in `themes.config.js` metadata and follow SemVer (MAJOR.MINOR.PATCH).
  - Bump versions when changing tokens or component visuals in backward-incompatible ways.

- Update and Deprecation Policies
  - Document breaking changes in `CHANGELOG.md` and migration notes.
  - Deprecate tokens or patterns gradually; provide an alias or fallback period.

- Documentation Standards for New Themes
  - Include an overview of your theme’s goals, palette, typography, and component deltas.
  - Add code snippets for critical overrides and an architecture diagram.

- Contribution Guidelines for Theme Development
  - Follow repository `CONTRIBUTING.md` and maintain consistent code style.
  - Keep PRs focused: token changes separate from component visual changes whenever possible.

## Practical Examples (from shaj-default)

- Config and Prefix
  ```scss
  // 01-settings/_settings.config.scss
  $ENV: 'dev';
  $prefix: atomix- !default;
  ```

- Colors Override with Base Integration
  ```scss
  // 01-settings/_settings.colors.scss
  @use '../../../styles/02-tools/tools.to-rgb' as *;
  @use '../../../styles/02-tools/tools.color-functions' as *;
  @use '../../../styles/01-settings/settings.colors' with (
    $primary-1: #f0f9ff,
    $primary-6: #0ea5e9,
    $primary-7: #0284c7,
    $gray-1: #f9fafb,
    $gray-10: #111827,
    // ... full scales per palette
  );
  ```

- Typography System
  ```scss
  // 01-settings/_settings.typography.scss
  @use '../../../styles/01-settings/settings.typography' with (
    $font-family-base: (system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif),
    $font-size-base: 1rem, // 16px
    $h1-font-size: 2.75rem,
    $line-height-base: 1.6,
    $headings-font-weight: 600,
  );
  ```

- Spacing Scale
  ```scss
  // 01-settings/_settings.spacing.scss
  $spacer: 16px !default;
  $spacing-sizes: (0: 0px, 1: 4px, 2: 8px, 3: 12px, 4: 16px, 6: 24px, 8: 32px, 10: 40px, 12: 48px, 16: 64px, 20: 80px);
  ```

- Component Overrides (Button)
  ```scss
  // 06-components/_components.button.scss
  @use '../01-settings/settings.config' as *;
  .c-btn.c-btn-primary {
    background: linear-gradient(135deg, var(--#{$prefix}primary-6), var(--#{$prefix}primary-7));
    border-color: var(--#{$prefix}primary-6);
  }
  ```

- Component Overrides (Input)
  ```scss
  // 06-components/_components.input.scss
  @use '../01-settings/settings.config' as *;
  .c-form-control:focus {
    border-color: var(--#{$prefix}primary-6);
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
  ```

## Theme Registration and Build

- Theme Metadata and Build Settings (`src/themes/themes.config.js`)
  ```js
  export const themesConfig = {
    metadata: {
      'shaj-default': { name: 'Shaj Default', version: '1.0.0', tags: ['default','light'], supportsDarkMode: true },
      // add your theme:
      'my-theme': { name: 'My Theme', version: '0.1.0', tags: ['light'], supportsDarkMode: true }
    },
    build: { output: { directory: 'themes', formats: { expanded: '.css', compressed: '.min.css' } }, sass: { style: 'expanded', sourceMap: true, loadPaths: ['src'] } },
    exports: { './themes/*': './dist/themes/*.css', './themes/*.min': './dist/themes/*.min.css' },
    integration: { cssVariables: { colorMode: '--storybook-color-mode' }, classNames: { theme: 'data-theme', colorMode: 'data-color-mode' } }
  };
  ```

- Suggested Steps to Add a New Theme
  - Create `src/themes/<my-theme>/` with the layered structure shown above.
  - Implement tokens in `01-settings` and component overrides in `06-components`.
  - Add metadata in `themes.config.js` under `metadata` for discoverability.
  - Include your theme CSS in your app by bundling `index.scss` or using the build output under `dist/themes`.

---

By following the patterns and examples in `shaj-default`, you can create highly consistent, maintainable, and performant themes that integrate seamlessly with Atomix core styles while expressing distinct visual identities.


This directory contains all the themes for the Atomix Design System. Each theme is a collection of SCSS files that override or extend the base design system styles.

## Theme Structure

Each theme follows the same structure as the main design system:

```
theme-name/
├── 01-settings/
├── 02-tools/
├── 03-generic/
├── 04-elements/
├── 05-objects/
├── 06-components/
├── 99-utilities/
└── index.scss
```

## Available Themes

- **shaj-default** - The default theme for Atomix Design System
- **boomdevs** - A theme by the BoomDevs team
- **esrar** - A theme by the Esrar team
- **mashroom** - A theme by the Mashroom team
- **yabai** - A theme by the Yabai team

## How Themes Work

Themes work by importing and overriding the base design system styles. Each theme's `index.scss` file:

1. Imports local theme settings that override base settings
2. Imports and forwards base styles with local overrides
3. Combines theme-specific styles with the base design system

## Building Themes

Themes are automatically built when you run the main build command:

```bash
npm run build
```

This generates individual CSS files for each theme in the `dist/themes` directory:
- Expanded CSS for development
- Minified CSS for production

You can also build only the themes with:

```bash
npm run build:themes
```

## Using Themes

To use a theme in your project, import the corresponding CSS file:

```scss
// In your SCSS file
@import '~@shohojdhara/atomix/dist/themes/shaj-default.css';
```

Or in your JavaScript/TypeScript files:

```js
// Import the theme CSS
import '@shohojdhara/atomix/dist/themes/shaj-default.css';
```

## Creating New Themes

To create a new theme:

1. Create a new directory in `src/themes` with your theme name
2. Follow the same structure as existing themes
3. Create an `index.scss` file that imports and overrides base styles
4. Add your theme to the `themes.variants` array in `build.config.js`
5. Run the build process to generate the theme CSS files

## Theme Customization

Themes can customize any aspect of the design system by overriding variables, mixins, or component styles in their respective directories. For example, to customize button styles in your theme:

1. Create a `_buttons.scss` file in `themes/your-theme/06-components/`
2. Override the button styles as needed
3. Import and forward the file in `themes/your-theme/06-components/_index.scss`