# Atomix Themes Audit (2025-11-02)

Audience: Maintainers and advanced contributors. This audit reviews current themes, build/integration, conformance to the styles architecture, and provides prioritized improvement recommendations following the Atomix development guidelines.

Scope:
- Themes in repo: shaj-default, boomdevs, esrar, mashroom, applemix
- Build pipeline: rollup.styles.config.js (produces dist/atomix.css, dist/atomix.min.css, and dist/themes/*.css)
- Storybook integration: .storybook/preview.tsx, .storybook/theme-switcher.ts
- Theme config metadata: src/themes/themes.config.js

## 1) Inventory and Conformance Snapshot

- shaj-default
  - Entrypoint: src/themes/shaj-default/index.scss (ITCSS-aligned imports using `@use '01-settings/index' as *;` etc.)
  - Settings coverage: broad; forwards many settings files and component configs. Serves as canonical reference.
  - Status: Stable baseline.

- boomdevs
  - Entrypoint: src/themes/boomdevs/index.scss (aligned to shaj-default pattern)
  - Settings coverage: present via 01-settings/_index.scss; visual direction: dark/modern.
  - Status: Beta.

- esrar
  - Entrypoint: src/themes/esrar/index.scss
  - Noted differences: some layer forwards commented out (03-generic, 04-elements, 05-objects, 99-utilities). This is acceptable if intentionally relying on base layers, but document intent to avoid confusion.
  - Status: Beta.

- mashroom
  - Entrypoint: src/themes/mashroom/index.scss (aligned to shaj-default pattern)
  - Status: Beta.

- applemix
  - Entrypoint: src/themes/applemix/index.scss uses sectioned `@use '01-settings' as settings;` instead of forwarding with `as *` like others. Functionally OK, but inconsistent with the reference pattern and may cause confusion for contributors.
  - Rich feature intent (glass/morphism). Ensure component overrides live under 06-components.
  - Status: Experimental.

Notes:
- ITCSS layering exists across themes; shaj-default is the best reference.
- Settings token coverage is uneven across themes. shaj-default exposes widest set. Others should at least forward colors, config, typography, spacing, breakpoints, and key component settings.

## 2) Build and Exports

- rollup.styles.config.js dynamically builds:
  - dist/atomix.css and dist/atomix.min.css
  - dist/themes/<theme>.css and <theme>.min.css for each theme folder with index.scss
- package.json exports:
  - "./themes/*": "./dist/themes/*" (OK)
- Note: build.config.js lists a theme variant "yabai" that does not exist in src/themes; recommend updating or removing to avoid confusion.
- No further action required here; pipeline is sound.

## 3) Storybook Integration

- .storybook/preview.tsx
  - Applies body/class for selected theme and data attributes:
    - Sets `data-theme` on body and `data-atomix-color-mode` on html element
    - Loads `/themes/{theme}.css` dynamically (served via staticDirs => dist)
  - GlobalTypes provide a toolbar for theme and color mode.

- .storybook/theme-switcher.ts (addon tool)
  - Maintains its own list and updates globals.theme. Works but duplicates list from preview.tsx.

- src/themes/themes.config.js
  - Metadata present per theme. Integration now clarifies attribute naming: `data-theme` and `data-atomix-color-mode`.

Recommendation:
- Single source of truth for theme list in Storybook. Either:
  - Use only preview.tsx globalTypes toolbar; or
  - Wire the theme-switcher addon to read from a shared list/module to avoid drift.

## 4) Accessibility (A11y)

- Target contrast ratio should be ≥ 4.5 for normal text, ≥ 3.0 for large text.
- themes.config.js now includes an `a11y` field per theme for goals; no automated validation yet.
- Action: For dark-forward themes (boomdevs, mashroom), audit key component contrasts (Button, Input, Nav, Tabs, List, Tooltip, Popover) in both color modes.

Quick checks to perform in Storybook:
- Buttons: primary/secondary on both light/dark backgrounds.
- Inputs: placeholder, helper text contrast.
- Focus ring visibility: across interactive components.
- Content surfaces: card/background contrast in dark mode.

## 5) Token and Component Coverage

- Required token groups to expose per theme (minimally):
  - Colors 1–10 scale for primary, gray, accent palettes
  - Typography: font families, base size/line-height, heading scale
  - Spacing: base spacer and scale map
  - Breakpoints: map and scalar vars
  - Component settings for common primitives: button, input, card, nav, tabs, tooltip/popover, modal

- Observations:
  - shaj-default: complete.
  - boomdevs/mashroom: likely sufficient but needs verification against component list.
  - esrar: ensure 03/04/05/99 layers are intentionally omitted; check that 06-components provides overrides where intended.
  - applemix: verify 06-components includes glass effects and does not rely on global hacks; prefer utilities and component-scoped tokens.

## 6) Naming and Theming Conventions

- Standard attributes/classes in Storybook and apps:
  - `data-theme="<themeName>"` on body or html
  - `data-atomix-color-mode="light|dark"` on html element
- Prefer `@use '01-settings/index' as *;` style in theme index.scss for consistency across themes (except when a theme intentionally namespaces modules).
- Keep BEM-like class naming consistent: `c-` prefixes for components where applicable.

## 7) Performance Considerations

- CSS variable count: maintain under ~500 per theme (build.config guidance). Group by prefix to keep order predictable.
- Avoid heavy filters by default in themes; gate heavy glass effects behind component props or utility classes.

## 8) Prioritized Improvements

Quick wins (recommended next):
1. Standardize theme entrypoints to the shaj-default `@use ... as *;` pattern, or document exceptions clearly in each theme README. (Consistency)
2. Consolidate Storybook theme lists to one source to avoid drift. (DX)
3. Ensure each theme forwards core token groups (colors, typography, spacing, breakpoints) and key component settings. (Coverage)
4. Add a11y contrast checks to manual QA and note issues per theme in themes.config.js (status notes). (A11y)
5. Esrar: either uncomment ITCSS layer forwards or add a comment explaining reliance on base layers. (Clarity)

Backlog (next iterations):
- Add a basic a11y contrast CI check for a small set of tokens (optional script in scripts/ later).
- Provide a minimal themes showcase MDX story to preview tokens and common components per theme.
- Document a glass/morphism guideline for applemix to avoid overuse and ensure performance.

## 9) Action Items and Owners

- [ ] Owners: Theming maintainers
  - [ ] Review and adopt THEME_CHECKLIST.md for new theme work.
  - [ ] Standardize applemix index.scss import style (or document exception).
  - [ ] Decide on single source of truth for Storybook theme list; refactor accordingly.
  - [ ] Perform contrast evaluation on top 10 components per theme; record notes.

## 10) References

- src/themes/README.md — Architecture and creation guide
- src/themes/themes.config.js — Theme metadata and integration
- rollup.styles.config.js — Styles and themes build outputs
- .storybook/preview.tsx — Runtime theme switching
