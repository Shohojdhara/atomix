# AtomixGlass Component

The AtomixGlass component provides a modern, frosted glass aesthetic with interactive hover effects, chromatic aberration, and displacement effects.

## Overview

AtomixGlass creates a visually appealing glass-like effect that can be used for cards, modals, hero sections, and other UI elements. It features customizable displacement, blur, saturation, and chromatic aberration effects. The component automatically detects light backgrounds and adjusts its appearance accordingly.

## Usage

```jsx
import { AtomixGlass } from 'atomix';

function MyComponent() {
  return (
    <AtomixGlass
      displacementScale={20}
      blurAmount={1}
      saturation={140}
      aberrationIntensity={2.5}
      cornerRadius={16}
      enableBorderEffect={true}
      overLight="auto"
    >
      <div style={{ padding: '20px' }}>
        Your content here
      </div>
    </AtomixGlass>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | Required | Content to display inside the glass effect |
| `displacementScale` | number | 20 | Displacement scale for the glass effect |
| `blurAmount` | number | 1 | Blur amount for the backdrop |
| `saturation` | number | 140 | Saturation percentage for the backdrop |
| `aberrationIntensity` | number | 2.5 | Chromatic aberration intensity |
| `elasticity` | number | 0.05 | Elasticity factor for mouse interactions |
| `cornerRadius` | number | undefined | Corner radius in pixels (auto-extracted from children if not provided) |
| `globalMousePosition` | { x: number; y: number } | undefined | External global mouse position |
| `mouseOffset` | { x: number; y: number } | undefined | External mouse offset |
| `mouseContainer` | React.RefObject<HTMLElement \| null> | null | Reference to mouse container element |
| `padding` | string | '0 0' | Padding for the glass container |
| `style` | React.CSSProperties | {} | CSS style object |
| `overLight` | boolean \| 'auto' \| OverLightObjectConfig | false | Whether the glass is over a light background. Can be boolean, 'auto' for detection, or object config |
| `mode` | 'standard' \| 'polar' \| 'prominent' \| 'shader' | 'standard' | Glass effect mode |
| `onClick` | () => void | undefined | Optional click handler (makes component interactive) |
| `shaderVariant` | 'liquidGlass' \| 'premiumGlass' | 'liquidGlass' | Shader variant for shader mode |
| `enableBorderEffect` | boolean | true | Show border effects (outer border, overlay) |
| `enableLiquidBlur` | boolean | false | Enable liquid blur effects |
| `enableOverLightLayers` | boolean | true | Enable over-light background layers |
| `reducedMotion` | boolean | false | Force reduced motion (overrides system preference) |
| `highContrast` | boolean | false | Force high contrast mode (overrides system preference) |
| `disableEffects` | boolean | false | Disable all visual effects |
| `enablePerformanceMonitoring` | boolean | false | Enable performance monitoring (development only) |
| `debugCornerRadius` | boolean | false | Debug mode for corner radius extraction |
| `debugOverLight` | boolean | false | Debug mode for overLight detection |
| `className` | string | '' | Additional CSS class names |
| `aria-label` | string | undefined | ARIA label for accessibility |
| `aria-describedby` | string | undefined | ARIA describedby for accessibility |
| `role` | string | undefined | ARIA role (defaults to 'button' if onClick is provided) |
| `tabIndex` | number | undefined | Tab index (defaults to 0 if onClick is provided) |

## Glass Effect Modes

The AtomixGlass component offers four different effect modes:

1. **Standard**: The default glass effect with uniform displacement.
2. **Polar**: A radial displacement effect that creates a circular distortion pattern.
3. **Prominent**: Enhanced displacement with stronger edge effects.
4. **Shader**: Advanced WebGL-based shader displacement for more dynamic effects.

## Accessibility

The AtomixGlass component includes comprehensive accessibility features:

- **Keyboard Navigation**: When `onClick` is provided, the component supports keyboard interaction (Enter and Space keys)
- **Focus Management**: Automatic focus ring styling for keyboard users using the design system's focus-ring mixin
- **ARIA Support**: Full ARIA attribute support (`aria-label`, `aria-describedby`, `role`, `tabIndex`)
- **Reduced Motion**: Respects `prefers-reduced-motion` media query and provides `reducedMotion` prop
- **High Contrast**: Supports `prefers-contrast: high` media query and provides `highContrast` prop
- **Screen Reader Support**: Proper ARIA roles and labels for interactive elements

When using AtomixGlass for interactive elements:

- Ensure sufficient contrast between text and background
- Provide appropriate ARIA attributes (`aria-label` is recommended for clickable glass)
- Consider users with motion sensitivity by using `reducedMotion` or `disableEffects` props
- Test keyboard navigation to ensure focus states are visible

## Best Practices

- Use AtomixGlass sparingly for key UI elements to avoid visual overload
- Adjust `displacementScale` and `aberrationIntensity` based on the size of the component
- Set `overLight` appropriately based on your background to ensure proper shadow effects
- For text-heavy content, reduce blur and aberration effects to maintain readability
- Use the `shader` mode only when advanced visual effects are necessary, as it has higher performance requirements

## Examples

### Card Component

```jsx
<AtomixGlass
  displacementScale={20}
  blurAmount={1}
  saturation={140}
  aberrationIntensity={2.5}
  cornerRadius={20}
  enableBorderEffect={true}
  overLight="auto"
  onClick={() => console.log('Card clicked')}
  aria-label="Glass card"
>
  <div style={{ padding: '25px' }}>
    <h2>Card Title</h2>
    <p>Card content goes here...</p>
    <button className="c-button c-button--primary">Action</button>
  </div>
</AtomixGlass>
```

### Modal Dialog

```jsx
<AtomixGlass
  displacementScale={15}
  blurAmount={1}
  saturation={140}
  aberrationIntensity={2.5}
  cornerRadius={15}
  enableBorderEffect={true}
  style={{ maxWidth: '500px', margin: '0 auto' }}
  overLight={false}
>
  <div style={{ padding: '30px' }}>
    <h2>Modal Title</h2>
    <p>Modal content goes here...</p>
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
      <button className="c-button c-button--outline-light">Cancel</button>
      <button className="c-button c-button--primary">Confirm</button>
    </div>
  </div>
</AtomixGlass>
```

### Hero Section with OverLight Auto-Detection

```jsx
<AtomixGlass
  displacementScale={25}
  blurAmount={1}
  saturation={140}
  aberrationIntensity={2.5}
  cornerRadius={30}
  enableBorderEffect={true}
  overLight="auto"
  enableLiquidBlur={true}
>
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h1>Welcome to Our Site</h1>
    <p>A brief description of your website or application.</p>
    <button className="c-button c-button--primary">Get Started</button>
  </div>
</AtomixGlass>
```

### OverLight with Custom Configuration

```jsx
<AtomixGlass
  overLight={{
    threshold: 0.8,
    opacity: 0.6,
    contrast: 1.8,
    brightness: 1.0,
    saturationBoost: 1.5
  }}
  debugOverLight={true}
>
  <div style={{ padding: '20px' }}>
    Content with custom overLight settings
  </div>
</AtomixGlass>
```

## Performance Considerations

The AtomixGlass component uses SVG filters and CSS backdrop filters which can be performance-intensive. Consider the following tips:

- Limit the number of AtomixGlass components on a single page
- Use simpler modes (standard, polar) for better performance on lower-end devices
- Consider providing a reduced-motion alternative for users with older devices
- The `shader` mode requires WebGL support and may not work on all browsers

## Browser Compatibility

The AtomixGlass component works best in modern browsers that support CSS backdrop filters and SVG filters. Some effects may have reduced functionality in older browsers.

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Basic Glass Effect | ✅ | ✅ | ✅ | ✅ |
| Backdrop Filter | ✅ | ✅* | ✅ | ✅ |
| SVG Filters | ✅ | ✅ | ✅ | ✅ |
| Shader Mode | ✅ | ✅ | ✅ | ✅ |

*Firefox requires `layout.css.backdrop-filter.enabled` to be enabled in about:config