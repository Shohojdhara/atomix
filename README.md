<div align="center">

<br />

<!-- Replace with your actual logo path if one exists -->
<h1>⚛ Atomix Design System</h1>

<p><strong>A premium, physics-aware React component library built for the modern web.</strong></p>

[![npm version](https://img.shields.io/npm/v/@shohojdhara/atomix.svg?style=flat-square&color=5b5bd6)](https://www.npmjs.com/package/@shohojdhara/atomix)
[![License](https://img.shields.io/npm/l/@shohojdhara/atomix.svg?style=flat-square)](LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@shohojdhara/atomix.svg?style=flat-square)](https://www.npmjs.com/package/@shohojdhara/atomix)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-%3E%3D18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Storybook](https://img.shields.io/badge/Storybook-8.x-ff4785?style=flat-square&logo=storybook)](https://storybook.js.org)
[![Node.js](https://img.shields.io/badge/Node-%3E%3D18-339933?style=flat-square&logo=node.js)](https://nodejs.org)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Highlights](#highlights)
- [Component Catalog](#component-catalog)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Theming System](#theming-system)
- [AtomixGlass — Liquid Glass UI](#atomixglass--liquid-glass-ui)
- [Utility Classes](#utility-classes)
- [Tree-Shakable Exports](#tree-shakable-exports)
- [CLI Tooling](#cli-tooling)
- [Available Themes](#available-themes)
- [Build System](#build-system)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Atomix** (`@shohojdhara/atomix`) is a modern, enterprise-grade design system and React component library. It ships a complete ITCSS-structured Sass layer, a physics-reactive glassmorphism engine (`AtomixGlass`), a comprehensive suite of 50+ typed React components, a configurable theming system backed by CSS custom properties, and a CLI toolchain for scaffolding and token management — all in one package.

> **Current version:** `v0.6.x` · **Status:** Active development

---

## Highlights

| Feature | Details |
|---|---|
| 🧊 **Liquid Glass UI** | Hardware-accelerated backdrop blur, SVG displacement maps, spring-physics elasticity, and velocity-driven border gradients via `AtomixGlass` |
| 🎨 **Token-Based Theming** | Deep CSS variable integration with `defineConfig()` — override colors, spacing, typography, radius, shadows, and z-index at build or runtime |
| ♿ **WCAG 2.1 AA** | Keyboard navigation, ARIA attributes, and screen-reader compliance baked into every component |
| 🏗️ **Polymorphic API** | Change the underlying HTML element of any component with the `as` prop; integrate with Next.js `<Link>`, React Router, and more via `LinkComponent` |
| ⚡ **Tree-Shakable** | Multiple sub-entry points (`/core`, `/forms`, `/layout`, `/charts`, `/heavy`) for minimal bundle footprint |
| 🛠 **CLI Toolchain** | `atomix generate`, `atomix tokens sync`, `atomix migrate`, `atomix doctor` and more — all driven by `atomix.config.ts` |
| 📊 **16 Chart Types** | First-class chart components (Line, Bar, Pie, Donut, Radar, Heatmap, Candlestick, Treemap…) |
| 🎭 **Storybook 8.x** | Full Storybook integration with a11y, interactions, measure, outline, and viewport addons |
| 🔄 **Changeset-Driven Releases** | Semantic versioning via `@changesets/cli` |

---

## Component Catalog

### Layout & Structure

| Component | Description |
|---|---|
| `Block` | Generic layout block primitive |
| `Hero` | Full-width hero section with flexible content slots |
| `River` | Alternating two-column content layout |
| `SectionIntro` | Section heading with optional sub-copy |
| `EdgePanel` | Slide-in side panel with built-in Glass UI support |

### Navigation

| Component | Description |
|---|---|
| `Navbar` | Responsive top navigation bar |
| `Nav` / `NavItem` | Inline or stacked navigation list |
| `NavDropdown` | Hover/click dropdown attached to a `NavItem` |
| `SideMenu` / `SideMenuItem` / `SideMenuList` | Collapsible sidebar menu |
| `Menu` / `MenuItem` / `MenuDivider` | Context or action menus |
| `MegaMenu` / `MegaMenuColumn` / `MegaMenuLink` | Full-width mega-menu with column layout |
| `Breadcrumb` | Accessible breadcrumb trail |
| `Pagination` | Page-based navigation control |
| `Footer` / `FooterSection` / `FooterLink` / `FooterSocialLink` | Multi-layout footer |

### Forms & Inputs

| Component | Description |
|---|---|
| `Button` / `ButtonGroup` | Primary action element with variants, sizes, and `glass` support |
| `Input` | Text input with label, hint, and validation states |
| `Textarea` | Multi-line text input |
| `Select` | Styled native `<select>` element |
| `Checkbox` | Accessible checkbox with indeterminate state |
| `Radio` | Radio button group |
| `Toggle` | Switch/toggle for boolean settings |
| `DatePicker` | Calendar-powered date selection |
| `Slider` | Range slider with min/max/step |
| `Upload` | Drag-and-drop or click-to-upload file input |
| `Form` / `FormGroup` | Form layout and field grouping wrappers |

### Data Display

| Component | Description |
|---|---|
| `Card` / `ElevationCard` | Content surface with header, body, and footer slots |
| `DataTable` | Sortable, paginated data table |
| `List` / `ListGroup` | Ordered / unordered lists and grouped variants |
| `Badge` | Small status or count indicator |
| `Avatar` / `AvatarGroup` | User avatar with fallback initials and group stacking |
| `Rating` | Star rating display and input |
| `Progress` | Linear or circular progress indicator |
| `Steps` | Multi-step workflow tracker |
| `Countdown` | Time-remaining countdown display |
| `ProductReview` | Star rating with review metadata |
| `Testimonial` | Quote card for social proof |

### Feedback & Overlays

| Component | Description |
|---|---|
| `Modal` | Accessible dialog with backdrop and focus trap |
| `Tooltip` | Floating label on hover/focus |
| `Popover` | Rich floating panel for contextual content |
| `Dropdown` | Trigger + floating menu composable |
| `Callout` | Inline contextual alerts (info, success, warning, danger) |
| `Spinner` | Loading indicator |
| `Messages` | Chat-style message thread component |

### Media & Rich Content

| Component | Description |
|---|---|
| `VideoPlayer` | Custom HTML5 video player with controls |
| `PhotoViewer` | Lightbox-style image viewer with zoom and navigation |
| `Tabs` | Tab panel with animated active indicator |
| `Accordion` | Collapsible content sections |

### Charts (16 types)

Shipped via the `@shohojdhara/atomix/charts` entry point:

```
AreaChart · BarChart · BubbleChart · CandlestickChart · DonutChart
FunnelChart · GaugeChart · HeatmapChart · LineChart · MultiAxisChart
PieChart · RadarChart · ScatterChart · TreemapChart · WaterfallChart
Chart (base) · ChartRenderer
```

### Primitives & Utilities

| Component | Description |
|---|---|
| `AtomixGlass` | Physics-reactive glassmorphism wrapper (see below) |
| `Icon` | Phosphor Icons integration wrapper |
| `ColorModeToggle` | Light/dark mode switcher |
| `AtomixLogo` | Brand logo component |
| `Todo` | Interactive to-do list micro-application |

---

## Installation

```bash
# npm
npm install @shohojdhara/atomix

# yarn
yarn add @shohojdhara/atomix

# pnpm
pnpm add @shohojdhara/atomix
```

**Peer dependencies** (install alongside if not already present):

```bash
npm install react react-dom @phosphor-icons/react@2.1.10
```

**Engine requirements:**

- Node.js `≥ 18.0.0`
- npm `≥ 8.0.0 <11.0.0` or `≥ 11.7.0`

---

## Quick Start

### 1. Import styles

```tsx
// In your app entry point (e.g. main.tsx / _app.tsx)
import '@shohojdhara/atomix/css';
// or the minified build
import '@shohojdhara/atomix/css/min';
```

> If you use Sass, import the source directly for full variable access:
> ```scss
> @use '@shohojdhara/atomix/scss';
> ```

### 2. Use components

```tsx
import { Button, Card, Badge } from '@shohojdhara/atomix';

export default function App() {
  return (
    <Card glass>
      <Badge variant="success">New</Badge>
      <p>Welcome to Atomix!</p>
      <Button variant="primary" glass onClick={() => alert('Hello!')}>
        Get Started
      </Button>
    </Card>
  );
}
```

### 3. Polymorphic rendering with `as`

```tsx
import { Button } from '@shohojdhara/atomix';
import Link from 'next/link';

// Renders as a Next.js <Link> while keeping full Button styling
<Button as="a" href="/dashboard" LinkComponent={Link} variant="secondary">
  Go to Dashboard
</Button>
```

### 4. Utility classes

```tsx
// Use u-* prefixed utilities for one-off overrides.
// Never write ad-hoc CSS — always prefer component props first.
<Button className="u-mt-4 u-w-100" variant="primary">
  Full-width button
</Button>
```

---

## Theming System

Atomix uses a CSS custom property-based theme engine. Create an `atomix.config.ts` at the root of your project:

```ts
// atomix.config.ts
import { defineConfig } from '@shohojdhara/atomix/config';

export default defineConfig({
  prefix: 'myapp', // Renames --atomix-* → --myapp-*

  theme: {
    extend: {
      colors: {
        primary: { main: '#7AFFD7' },
        secondary: { main: '#FF5733' },
      },
      // spacing, typography, borderRadius, shadows, zIndex, transitions…
    },
  },
});
```

### Runtime theme injection

```tsx
import { createTheme, injectTheme } from '@shohojdhara/atomix/theme';

// Reads atomix.config.ts automatically
const css = createTheme();
injectTheme(css);
```

### ThemeProvider + useTheme

```tsx
import { ThemeProvider, useTheme } from '@shohojdhara/atomix/theme';

function App() {
  return (
    <ThemeProvider
      themes={{
        light: { name: 'Light', class: 'default-light' },
        dark: { name: 'Dark', class: 'dark-complementary' },
        'high-contrast': { name: 'High Contrast', class: 'high-contrast' },
      }}
      defaultTheme="light"
    >
      <YourApp />
    </ThemeProvider>
  );
}

function ThemeSwitcher() {
  const { theme, setTheme, availableThemes } = useTheme();
  return (
    <select value={theme} onChange={e => setTheme(e.target.value)}>
      {availableThemes.map(t => (
        <option key={t.class} value={t.class}>{t.name}</option>
      ))}
    </select>
  );
}
```

---

## AtomixGlass — Liquid Glass UI

`AtomixGlass` is the flagship component of Atomix. It provides a physics-reactive, Apple-inspired glassmorphism surface with:

- **Backdrop blur** with adaptive saturation and brightness
- **SVG displacement filters** in four modes: `standard`, `polar`, `prominent`, and `shader`
- **Shader mode** — GLSL-based canvas displacement maps generated off-thread with LRU caching
- **Spring-physics elasticity** — cursor motion drives realistic stretch/deformation
- **Velocity-driven border gradients** — border intensity follows movement speed
- **Chromatic aberration** — subtle color fringing for a refractive lens effect
- **`overLight` mode** — inverted shadow layering for bright surface rendering
- **Time-based animation loop** — adaptive FPS targeting (12–60fps based on `distortionQuality`)
- **`prefers-reduced-motion`** awareness — fully respects accessibility preferences

```tsx
import { AtomixGlass } from '@shohojdhara/atomix';

<AtomixGlass
  glass                      // Enables the glass effect
  mode="shader"              // 'standard' | 'polar' | 'prominent' | 'shader'
  shaderVariant="liquidGlass"
  elasticity={0.6}           // 0 = rigid, 1 = highly elastic
  withLiquidBlur             // Mouse-reactive blur intensity
  withTimeAnimation          // Continuous animated displacement
  animationSpeed={1.2}
  distortionQuality="high"   // 'low' | 'medium' | 'high' | 'ultra'
  overLight                  // Bright-surface shadow inversion
>
  <p>Your content here</p>
</AtomixGlass>
```

Any component that accepts a `glass` boolean prop (`Button`, `Card`, `EdgePanel`, `Callout`, etc.) internally wraps its content with `AtomixGlass`.

---

## Utility Classes

All layout utilities use the `u-` prefix. **Never** invent utilities or use Bootstrap defaults.

```
Display:    u-flex · u-grid · u-block · u-none · u-inline-block
Position:   u-relative · u-absolute · u-fixed · u-sticky
Z-index:    u-z-0 · u-z-1 · u-z-modal · u-z-tooltip
Spacing:    u-m-{n} · u-mx-{n} · u-my-{n} · u-mt-{n} · u-mb-{n} · u-ms-{n} · u-me-{n}
            u-p-{n} · u-px-{n} · u-py-{n} · u-pt-{n} · u-pb-{n} (0–90, auto)
Gap:        u-gap-{n} · u-row-gap-{n} · u-column-gap-{n}
Flex:       u-flex-row · u-flex-column · u-flex-wrap · u-flex-nowrap
Justify:    u-justify-start · u-justify-center · u-justify-between
Align:      u-items-start · u-items-center · u-self-start · u-self-center
Width:      u-w-0 · u-w-25 · u-w-50 · u-w-100 · u-w-auto · u-max-w-100
Height:     u-h-50 · u-h-100 · u-h-auto
Text:       u-text-xs · u-text-sm · u-text-base · u-text-lg · u-fs-2xl
            u-font-bold · u-text-center · u-text-start · u-text-end
Colors:     u-text-primary · u-bg-primary · u-bg-dark · u-bg-primary-subtle
Borders:    u-border · u-border-0 · u-border-solid · u-rounded · u-rounded-circle
Shadows:    u-shadow-none · u-shadow-sm · u-shadow-lg
Opacity:    u-opacity-0 · u-opacity-50 · u-opacity-100
```

Responsive variants use the pattern `u-{category}-{breakpoint}-{value}`:

```tsx
<div className="u-flex u-flex-column u-flex-md-row u-gap-4 u-w-100 u-w-lg-50">
  …
</div>
```

Breakpoints: `sm` · `md` · `lg` · `xl` · `xxl` (mobile-first)

---

## Tree-Shakable Exports

Import only what you need to minimize bundle size:

```ts
// All components (largest)
import { Button, Card } from '@shohojdhara/atomix';

// Core UI primitives only
import { Button } from '@shohojdhara/atomix/core';

// Form components
import { Input, Select, Checkbox } from '@shohojdhara/atomix/forms';

// Layout components
import { Hero, River } from '@shohojdhara/atomix/layout';

// Charts (lazily loaded)
import { LineChart, BarChart } from '@shohojdhara/atomix/charts';

// Heavy components (VideoPlayer, PhotoViewer, etc.)
import { VideoPlayer } from '@shohojdhara/atomix/heavy';

// Theming utilities
import { createTheme, ThemeProvider } from '@shohojdhara/atomix/theme';

// Config helpers
import { defineConfig } from '@shohojdhara/atomix/config';

// Sass source (for Sass-based projects)
@use '@shohojdhara/atomix/scss';
@use '@shohojdhara/atomix/scss/settings';
@use '@shohojdhara/atomix/scss/components';
@use '@shohojdhara/atomix/scss/utilities';
```

---

## CLI Tooling

Atomix ships a CLI (`atomix`) for scaffolding, token management, and diagnostics. It is driven by your `atomix.config.ts`.

```bash
# Scaffold a new component with all boilerplate
atomix generate component MyComponent

# Initialize Atomix in a new project
atomix init

# Sync design tokens from config → SCSS variables
atomix tokens sync

# Inspect and validate token definitions
atomix tokens inspect

# Build a theme variant
atomix build-theme dark-complementary

# Bridge tokens between Sass and JavaScript theme objects
atomix theme-bridge

# Run the environment diagnostics / health check
atomix doctor

# Check for breaking changes and run migration patches
atomix migrate

# Clean generated artifacts
atomix clean

# Validate atomix.config.ts against the source of truth
atomix validate
```

The CLI can be extended via the `plugins` array in `atomix.config.ts`:

```ts
export default defineConfig({
  plugins: [
    { name: './scripts/cli/plugins/style-dictionary.js', options: { strictMode: true } }
  ],
});
```

---

## Available Themes

Atomix ships four built-in themes in the `themes/` directory:

| Theme | Class | Description |
|---|---|---|
| `default-light` | `default-light` | Clean, bright default |
| `dark-complementary` | `dark-complementary` | Rich dark mode with complementary accents |
| `high-contrast` | `high-contrast` | Maximally accessible, high contrast |
| `test-theme` | `test-theme` | Internal testing theme |

Add your own by creating a folder under `themes/` or using `atomix build-theme`.

---

## Build System

| Script | Description |
|---|---|
| `npm run dev` | Start Storybook dev server at `localhost:6006` |
| `npm run build` | Full production build (JS + types + styles + UMD) |
| `npm run build:js` | JavaScript bundles only (Rollup) |
| `npm run build:types` | TypeScript declaration files only |
| `npm run build:styles` | CSS output only |
| `npm run build:umd` | UMD bundle for CDN usage |
| `npm run build:analyze` | Bundle size visualization |
| `npm run build:storybook` | Static Storybook build |
| `npm run test` | Vitest unit tests |
| `npm run test:cli` | CLI-specific unit tests |
| `npm run lint` | ESLint source |
| `npm run typecheck` | TypeScript type-checking (no emit) |
| `npm run sync:tokens` | Regenerate design tokens from config |
| `npm run verify:build` | Post-build output verification |
| `npm run attw` | Check package exports with `are-the-types-wrong` |

The build pipeline uses:
- **Rollup 3** for JS bundling with Babel + TypeScript
- **PostCSS** (autoprefixer, preset-env, flexbugs-fixes, cssnano) for CSS processing
- **Sass** for the ITCSS source layer
- **rollup-plugin-dts** for `.d.ts` bundling
- **Parallel builds** via `concurrently` for faster CI

---

## Contributing

We welcome contributions of all kinds — new components, accessibility fixes, bug reports, documentation, and performance improvements.

### Local development setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/Shohojdhara/atomix.git
cd atomix

# 2. Install dependencies
npm install

# 3. Start the Storybook dev server
npm run dev

# 4. Run tests
npm test
```

### Before submitting a PR

```bash
npm run lint          # ESLint
npm run typecheck     # TypeScript
npm run build         # Full build passes
npm run verify:build  # Build output looks correct
```

### Commit convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new Callout component
fix: resolve glass blur calculation on Safari
docs: update README installation section
chore: bump storybook to 8.6.15
```

### Component architecture

Every component lives in `src/components/<ComponentName>/`:

```
src/components/MyComponent/
├── MyComponent.tsx          # React component (forwardRef + memo)
├── MyComponent.stories.tsx  # Storybook stories
└── index.ts                 # Re-exports
```

See the full guide in [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## License

Licensed under the **[Apache License 2.0](LICENSE)**.

Copyright © [Shohojdhara](https://github.com/Shohojdhara) · [GitHub](https://github.com/Shohojdhara/atomix) · [npm](https://www.npmjs.com/package/@shohojdhara/atomix) · [Issues](https://github.com/Shohojdhara/atomix/issues) · [Sponsor](https://github.com/sponsors/Shohojdhara)
