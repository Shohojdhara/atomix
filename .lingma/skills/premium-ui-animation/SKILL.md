---
name: premium-ui-animation
description: Guidelines for maintaining the premium "Wow" factor through glassmorphism and refined animations.
---

# Premium UI & Animation Rules

Guidelines for maintaining the high-end, futuristic aesthetic of the Atomix Design System.

## Glassmorphism (AtomixGlass)

The `AtomixGlass` component is the cornerstone of the system's "premium" feel.

### Rules for Glass Usage
1.  **Prefer Prop Integration**: When a component supports it, use the `glass={true}` prop instead of wrapping manually.
2.  **Contrast Awareness**: Use the `overLight` prop to handle light background visibility. `overLight="auto"` is recommended for dynamic contexts.
3.  **Performance**: Avoid nesting multiple `AtomixGlass` components within each other as it compounds SVG filter complexity.
4.  **Radius Extraction**: By default, `AtomixGlass` attempts to extract the border-radius from its child. Ensure children have explicit `borderRadius` if the glass cut-out looks incorrect.

### Refined Parameters
- **Displacement**: Use `displacementScale` (default 20) for the "liquid" distortion effect. higher values (40+) should be reserved for large Hero sections.
- **Saturation**: Keep saturation between 150-250% to maintain vibrant "glassy" colors without looking garish.

## Motion & Transitions

Animations in Atomix should feel fluid, fast, and weightless.

### Animation Constants (src/styles/01-settings/_settings.animations.scss)
Always use the provided SCSS variables for consistency:
- `$transition-fast`: 0.15s (Hover effects, small UI changes).
- `$transition-base`: 0.3s (Menus, dropdowns, cards).
- `$transition-slow`: 0.5s (Modals, page transitions).
- `$easing`: `cubic-bezier(0.23, 1, 0.32, 1)` (The "Atomix Ease" – fast start, slow finish).

### Principles of Motion
1.  **Ease-Out by Default**: Interactive transitions should start fast to feel responsive.
2.  **Reduced Motion Support**: Always respect `prefers-reduced-motion`. The `AtomixGlass` component handles this automatically via the `reducedMotion` prop.
3.  **Hardware Acceleration**: Use `transform` and `opacity` for animations. Avoid animating `top`, `left`, `width`, or `height`.
4.  **Subtle Micro-interactions**: Buttons should have a slight lift or scale effect on active states to provide tactile feedback.

## Premium Styling Palette
- **Gradients**: Use smooth, subtle linear gradients instead of flat colors for backgrounds.
- **Borders**: Premium components should use semi-transparent borders (e.g., `rgba(255, 255, 255, 0.1)`) to define edges without adding visual weight.
- **Shadows**: Use the `$shadows` scale which includes layered, diffused shadows for a natural depth effect.
