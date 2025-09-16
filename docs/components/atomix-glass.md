# AtomixGlass Component

The AtomixGlass component provides a modern, frosted glass aesthetic with interactive hover effects, chromatic aberration, and displacement effects.

## Overview

AtomixGlass creates a visually appealing glass-like effect that can be used for cards, modals, hero sections, and other UI elements. It features customizable displacement, blur, saturation, and chromatic aberration effects.

## Usage

```jsx
import { AtomixGlass } from 'atomix';

function MyComponent() {
  return (
    <AtomixGlass
      displacementScale={25}
      blurAmount={12}
      saturation={180}
      aberrationIntensity={2}
      cornerRadius={20}
      showBorderEffects={true}
      showHoverEffects={true}
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
| `displacementScale` | number | 25 | Displacement scale for the glass effect |
| `blurAmount` | number | 12 | Blur amount for the backdrop |
| `saturation` | number | 180 | Saturation percentage for the backdrop |
| `aberrationIntensity` | number | 2 | Chromatic aberration intensity |
| `elasticity` | number | - | Elasticity factor for mouse interactions |
| `cornerRadius` | number | 20 | Corner radius in pixels |
| `globalMousePos` | { x: number; y: number } | - | External global mouse position |
| `mouseOffset` | { x: number; y: number } | - | External mouse offset |
| `mouseContainer` | React.RefObject<HTMLElement \| null> | - | Reference to mouse container element |
| `padding` | string | - | Padding for the glass container |
| `style` | React.CSSProperties | - | CSS style object |
| `overLight` | boolean | false | Whether the glass is over a light background |
| `mode` | 'standard' \| 'polar' \| 'prominent' \| 'shader' | 'standard' | Glass effect mode |
| `onClick` | () => void | - | Optional click handler |
| `showBorderEffects` | boolean | true | Show border effects (outer border, overlay) |
| `showHoverEffects` | boolean | true | Show hover effects (hover, active, interaction) |
| `className` | string | - | Additional CSS class names |
| `disabled` | boolean | false | Component disabled state |

## Glass Effect Modes

The AtomixGlass component offers four different effect modes:

1. **Standard**: The default glass effect with uniform displacement.
2. **Polar**: A radial displacement effect that creates a circular distortion pattern.
3. **Prominent**: Enhanced displacement with stronger edge effects.
4. **Shader**: Advanced WebGL-based shader displacement for more dynamic effects.

## Accessibility

When using AtomixGlass for interactive elements:

- Ensure sufficient contrast between text and background
- Provide appropriate ARIA attributes for interactive elements inside the glass
- Consider users with motion sensitivity by reducing animation effects

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
  blurAmount={10}
  saturation={160}
  aberrationIntensity={1.5}
  cornerRadius={20}
  showBorderEffects={true}
  showHoverEffects={true}
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
  blurAmount={8}
  saturation={150}
  aberrationIntensity={1}
  cornerRadius={15}
  showBorderEffects={true}
  showHoverEffects={false}
  style={{ maxWidth: '500px', margin: '0 auto' }}
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

### Hero Section

```jsx
<AtomixGlass
  displacementScale={25}
  blurAmount={12}
  saturation={180}
  aberrationIntensity={2}
  cornerRadius={30}
  showBorderEffects={true}
  showHoverEffects={true}
>
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h1>Welcome to Our Site</h1>
    <p>A brief description of your website or application.</p>
    <button className="c-button c-button--primary">Get Started</button>
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