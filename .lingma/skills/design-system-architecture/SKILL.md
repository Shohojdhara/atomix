---
name: design-system-architecture
description: Rules and guidelines for working with the Atomix Design System architecture.
---

# Atomix Design System Architecture Skill

This skill provides comprehensive rules and guidelines for AI agents to understand, maintain, and extend the Atomix Design System.

## Architecture Overview

Atomix follows a strict **ITCSS (Inverted Triangle CSS)** architecture, combined with a dynamic **Token-driven Theme System**.

### 1. Style Layers (src/styles)
Styles are organized into 8 layers to manage specificity and inheritance:

1.  **01-settings**: Global variables, site-wide settings, config switches (SCSS variables).
2.  **02-tools**: Global mixins and functions.
3.  **03-generic**: Ground-zero styles (Normalize.css, resettings, box-sizing).
4.  **04-elements**: Unclassed HTML elements (h1-h6, a, etc.).
5.  **05-objects**: Class-based, cosmetic-free design patterns (layouts, grids).
6.  **06-components**: Designed UI components (the "C" in BEM).
7.  **99-utilities**: High-specificity override classes (the "U" in BEM).

### 2. Theme System (src/lib/theme)
Atomix uses a dynamic theme system that generates CSS variables from a TypeScript configuration (`atomix.config.ts`).
- **Tokens**: Base design values (colors, spacing, typography).
- **Generators**: Logic to transform tokens into CSS variables.
- **Adapters**: Connects tokens to different output formats.
- **Runtime**: Handles theme injection and state at runtime.

### 3. CLI (scripts/cli)
The `atomix` CLI provides tools for development:
- `interactive-init`: Project bootstrapping.
- `component-generator`: Scaffolding new components following BEM and ITCSS.
- `token-manager`: Syncing tokens from config to SCSS/TS.

## Rules & Guidelines

### Implementation Rules
1.  **Follow BEM strictly**: Use `.c-component-name` for components and `.u-utility-name` for utilities.
2.  **No hardcoded values**: Always use design tokens via SCSS variables or CSS variables (`var(--atomix-*)`).
3.  **ITCSS Placement**: New styles MUST be placed in the correct layer.
4.  **Component Props First**: Before adding custom styles, check if a component prop can achieve the desired effect.

### Theme Extension
- When adding new tokens, update both `src/lib/theme/tokens` and `atomix.config.ts` if it should be user-configurable.
- Use `npm run sync:tokens` to propagate changes.

## Resources
- [Architecture Details](./resources/architecture.md)
- [Theme System Details](./resources/theme-system.md)
