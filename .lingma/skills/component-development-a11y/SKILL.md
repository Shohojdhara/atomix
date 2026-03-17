---
name: component-development-a11y
description: Standards for creating accessible, premium UI components in Atomix.
---

# Component Development & A11y Standard

Guidelines for building components that adhere to the Atomix design system's quality and accessibility bars.

## Component Structure

Every component should be organized in its own directory:
```
src/components/ComponentName/
├── ComponentName.tsx       # Core logic and JSX
├── ComponentName.scss      # Component styles (ITCSS layer 06)
├── ComponentName.stories.tsx # Storybook documentation
├── index.ts                # Package exports
└── __tests__/              # Unit and A11y tests
```

### Core Logic Guidelines
1.  **Polymorphism**: Use the `as` prop to allow users to change the underlying HTML element.
2.  **Ref Forwarding**: Always use `forwardRef` to allow users to access the DOM node.
3.  **Memoization**: Use `React.memo` for presentation-heavy components to optimize performance.
4.  **Prop Naming**:
    *   `variant`: Semantic style (primary, secondary, danger).
    *   `size`: scale (sm, md, lg).
    *   `glass`: Boolean or object for glassmorphism effects.
    *   `iconName`: Phosphor icon name string.

## Accessibility (A11y) Rules

1.  **Interactive Elements**:
    *   Ensure all buttons have an `aria-label` if they are icon-only.
    *   Use `aria-disabled` instead of `disabled` where appropriate to keep elements in the tab order while signaling they are inactive.
    *   Manage focus states explicitly using `onFocus` and `onBlur` wrappers.
2.  **ARIA Attributes**:
    *   Use `aria-expanded` and `aria-controls` for disclosure components (dropdowns, accordions).
    *   Use `aria-live` for dynamic content updates (messages, toast).
    *   Provide `aria-describedby` links to help text or error messages.
3.  **Keyboard Navigation**:
    *   All interactive elements must be reachable via `Tab`.
    *   Enter and Space should trigger primary actions.
    *   Escape should close overlays (modals, popovers).

## Styling Guidelines

1.  **BEM Naming**:
    *   Block: `.c-component-name`
    *   Element: `.c-component-name__element`
    *   Modifier: `.c-component-name--modifier`
2.  **Token Usage**:
    *   NEVER use hardcoded colors. Use `var(--atomix-*)`.
    *   Use the `ThemeNaming` utility class in TypeScript to generate BEM-compliant class names.
3.  **Z-Index**:
    *   Only use tokens from the `$z-index` scale (e.g., `u-z-modal`).

## Verification Checklist
- [ ] Component handles `ref` correctly.
- [ ] Component is polymorphic (`as` prop).
- [ ] All interactive states (hover, focus, active, disabled) are styled.
- [ ] A11y: Pass `axe` accessibility audit in tests.
- [ ] A11y: Screen reader reads meaningful labels for all interactive parts.
