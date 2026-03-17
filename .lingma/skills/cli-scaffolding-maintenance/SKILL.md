---
name: cli-scaffolding-maintenance
description: Guidelines for maintaining and extending the Atomix CLI and component templates.
---

# CLI & Scaffolding Maintenance Skilled

Guidelines for ensuring the `atomix` CLI continues to generate high-quality, project-standard code.

## CLI Architecture

The CLI is located in `scripts/cli/` and consists of several modular logic files:
- `component-generator.js`: The main logic for scaffolding components.
- `interactive-init.js`: Logic for the `atomix init` command.
- `token-manager.js`: Logic for syncing design tokens.
- `templates/`: JS files containing string templates for various file types.

## Template Management

Templates are located in `scripts/cli/templates/`. When adding new features to components, update the templates accordingly:
- `react-templates.js`: Main component, simple, medium, and complex variants.
- `scss-templates.js`: ITCSS-compliant SCSS files (settings and component layers).
- `storybook-templates.js`: Storybook stories.
- `testing-templates.js`: Unit and A11y tests.

### Rules for Template Updates
1.  **Strict BEM**: SCSS templates MUST use the `.c-` prefix for components and `.u-` for utilities.
2.  **A11y by Default**: Templates SHOULD include basic ARIA attributes and roles (e.g., `aria-label`, `aria-disabled`).
3.  **Ref Forwarding**: React templates MUST use `forwardRef`.
4.  **Glass Support**: All component templates should optionally support the `glass` prop.

## Extending the Generator

To add a new feature to the component generator (e.g., adding a "Charts" variant):
1.  **Define Feature**: Add the feature to `COMPONENT_FEATURES` in `component-generator.js`.
2.  **Add Template**: Create a new template function in the appropriate template file (e.g., `react-templates.js`).
3.  **Update Logic**: Update `generateComponentFiles` in `component-generator.js` to handle the new feature.
4.  **Add Validation**: Update `validateGeneratedComponent` to ensure the new feature is correctly implemented in generated files.

## CLI Core Utils
The CLI uses `inquirer` for prompts, `chalk` for coloring, and `ora` for spinners. Always maintain this visual style for consistency.

### Validation Rules
The CLI includes a built-in validator (`validateGeneratedComponent`). It checks for:
- TypeScript type definitions.
- `displayName` property.
- JSDoc comments.
- Absence of hardcoded colors (recommending tokens instead).
- Presence of A11y attributes.
