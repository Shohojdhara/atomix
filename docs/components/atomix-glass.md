# AtomixGlass Component

The AtomixGlass component provides a modern, frosted glass aesthetic with interactive hover effects, chromatic aberration, and displacement effects.

## Overview

AtomixGlass creates a visually appealing glass-like effect that can be used for cards, modals, hero sections, and other UI elements. It features customizable displacement, blur, saturation, and chromatic aberration effects. The component automatically detects light backgrounds and adjusts its appearance accordingly.

**New in Phase 3**: Automatic responsive optimization and performance monitoring for production-ready glass effects across all devices.

## Usage

```jsx
import { AtomixGlass } from 'atomix';

function MyComponent() {
  return (
    <AtomixGlass
      displacementScale={70}
      blurAmount={0}
      saturation={140}
      aberrationIntensity={2}
      borderRadius={16}
      withBorder={true}
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
| `displacementScale` | number | 70 | Displacement scale for the glass effect |
| `blurAmount` | number | 0 | Blur amount for the backdrop |
| `saturation` | number | 140 | Saturation percentage for the backdrop |
| `aberrationIntensity` | number | 2 | Chromatic aberration intensity |
| `elasticity` | number | 0.15 | Elasticity factor for mouse interactions |
| `borderRadius` | number | undefined | Corner radius in pixels (auto-extracted from children if not provided) |
| `globalMousePosition` | { x: number; y: number } | undefined | External global mouse position |
| `mouseOffset` | { x: number; y: number } | undefined | External mouse offset |
| `mouseContainer` | React.RefObject<HTMLElement \| null> | null | Reference to mouse container element |
| `padding` | string | '0' | Padding for the glass container |
| `height` | string \| number | undefined | Height of the glass component |
| `width` | string \| number | undefined | Width of the glass component |
| `style` | React.CSSProperties | {} | CSS style object |
| `overLight` | boolean \| 'auto' \| OverLightObjectConfig | false | Whether the glass is over a light background. Can be boolean, 'auto' for detection, or object config |
| `mode` | 'standard' \| 'polar' \| 'prominent' \| 'shader' | 'standard' | Glass effect mode |
| `onClick` | () => void | undefined | Optional click handler (makes component interactive) |
| `shaderVariant` | 'liquidGlass' \| 'premiumGlass' \| 'appleFluid' \| 'liquidMetal' \| 'plasma' \| 'waves' \| 'noise' | 'liquidGlass' | Shader variant for shader mode |
| `withBorder` | boolean | true | Show border effects |
| `withLiquidBlur` | boolean | false | Enable liquid blur effects |
| `withOverLightLayers` | boolean | true | Enable over-light background layers |
| `withoutEffects` | boolean | false | Disable all visual effects |
| `reducedMotion` | boolean | false | Force reduced motion (overrides system preference) |
| `highContrast` | boolean | false | Force high contrast mode (overrides system preference) |
| `withTimeAnimation` | boolean | true | Enable time-based animation (Phase 1) |
| `animationSpeed` | number | 1.0 | Animation speed multiplier (Phase 1) |
| `withMultiLayerDistortion` | boolean | false | Enable multi-layer distortion using FBM (Phase 1) |
| `distortionOctaves` | number | 5 | Number of octaves for FBM distortion (Phase 1) |
| `distortionLacunarity` | number | 2.0 | Lacunarity for FBM distortion (Phase 1) |
| `distortionGain` | number | 0.5 | Gain for FBM distortion (Phase 1) |
| `distortionQuality` | 'low' \| 'medium' \| 'high' \| 'ultra' | 'high' | Quality preset for FBM distortion (Phase 1) |
| `debugPerformance` | boolean | false | Enable performance monitoring dashboard (development only) |
| `debugBorderRadius` | boolean | false | Debug mode for corner radius extraction |
| `debugOverLight` | boolean | false | Debug mode for overLight detection |
| `devicePreset` | 'performance' \| 'balanced' \| 'quality' | 'balanced' | Device optimization preset (Phase 3) |
| `disableResponsiveBreakpoints` | boolean | false | Disable automatic responsive optimization (Phase 3) |
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

## Device Optimization Presets (Phase 3)

AtomixGlass includes three device optimization presets that automatically adjust quality parameters:

### Performance Preset
Optimized for low-end devices and mobile:
- Distortion Octaves: 2
- Displacement Scale: 0.6x
- Blur Amount: 0.7x
- Animation Speed: 0.8x
- Chromatic Intensity: 0.5x

### Balanced Preset (Default)
Balanced quality and performance:
- Distortion Octaves: 4
- Displacement Scale: 0.85x
- Blur Amount: 0.9x
- Animation Speed: 0.95x
- Chromatic Intensity: 0.75x

### Quality Preset
Maximum quality for high-end devices:
- Distortion Octaves: 5
- Displacement Scale: 1.0x
- Blur Amount: 1.0x
- Animation Speed: 1.0x
- Chromatic Intensity: 1.0x

## Responsive Breakpoints (Phase 3)

AtomixGlass automatically adjusts parameters based on screen size:

- **Mobile** (≤640px): Reduced complexity for 60 FPS target
- **Tablet** (641-1024px): Balanced quality and performance
- **Desktop** (≥1025px): Full fidelity effects

The responsive system also detects device performance tier using Device Memory API and Hardware Concurrency API:
- **Low-end**: ≤2GB RAM or ≤2 CPU cores
- **Medium**: 2-4GB RAM or 2-4 CPU cores
- **High-end**: ≥4GB RAM and ≥4 CPU cores

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
- **Phase 3**: Let the responsive system handle optimization automatically - only use `devicePreset` for specific use cases
- **Phase 3**: Enable `debugPerformance` during development to monitor FPS and frame time

## Examples

### Card Component

```jsx
<AtomixGlass
  displacementScale={70}
  blurAmount={0}
  saturation={140}
  aberrationIntensity={2}
  borderRadius={20}
  withBorder={true}
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
  displacementScale={70}
  blurAmount={0}
  saturation={140}
  aberrationIntensity={2}
  borderRadius={15}
  withBorder={true}
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
  displacementScale={70}
  blurAmount={0}
  saturation={140}
  aberrationIntensity={2}
  borderRadius={30}
  withBorder={true}
  overLight="auto"
  withLiquidBlur={true}
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

### Performance-Optimized for Mobile (Phase 3)

```jsx
<AtomixGlass
  devicePreset="performance"
  displacementScale={50}
  aberrationIntensity={1.5}
>
  <div style={{ padding: '20px' }}>
    Mobile-optimized glass effect
  </div>
</AtomixGlass>
```

### High-Quality for Desktop (Phase 3)

```jsx
<AtomixGlass
  devicePreset="quality"
  displacementScale={100}
  aberrationIntensity={3}
  withTimeAnimation={true}
  withMultiLayerDistortion={true}
>
  <div style={{ padding: '30px' }}>
    Premium desktop glass effect
  </div>
</AtomixGlass>
```

### With Performance Monitoring (Phase 3)

```jsx
<AtomixGlass
  debugPerformance={true}
  displacementScale={70}
  aberrationIntensity={2}
>
  <div style={{ padding: '20px' }}>
    Glass with real-time performance metrics
  </div>
</AtomixGlass>
```

## Performance Considerations

The AtomixGlass component uses SVG filters and CSS backdrop filters which can be performance-intensive. Consider the following tips:

- Limit the number of AtomixGlass components on a single page
- Use simpler modes (standard, polar) for better performance on lower-end devices
- Consider providing a reduced-motion alternative for users with older devices
- The `shader` mode requires WebGL support and may not work on all browsers

### Phase 3: Automatic Performance Optimization

AtomixGlass now includes built-in performance optimization:

**Responsive Breakpoints**:
- Automatically scales effect parameters based on screen size
- Detects device performance tier (low/medium/high)
- Applies appropriate quality multipliers
- Debounced resize handling (200ms) to prevent excessive recalculations

**Performance Monitoring**:
- Real-time FPS tracking (target: 60 FPS)
- Frame time measurement (target: <16ms)
- GPU memory estimation (when available)
- Automatic quality scaling based on performance
- Debug dashboard for development

**Device Presets**:
- `performance`: Optimized for low-end devices (2 octaves, 0.6x scale)
- `balanced`: Default preset for most devices (4 octaves, 0.85x scale)
- `quality`: Maximum quality for high-end devices (5 octaves, 1.0x scale)

**Usage Example**:
```jsx
import { usePerformanceMonitor } from '@shohojdhara/atomix/lib/composables/usePerformanceMonitor';

function MyComponent() {
  const { metrics, recommendedQuality, isUnderperforming } = usePerformanceMonitor({
    targetFps: 60,
    minFps: 45,
    debug: true,
  });

  return (
    <AtomixGlass
      devicePreset={recommendedQuality === 'low' ? 'performance' : 'balanced'}
      debugPerformance={true}
    >
      <div>Content</div>
    </AtomixGlass>
  );
}
```

## Browser Compatibility

The AtomixGlass component works best in modern browsers that support CSS backdrop filters and SVG filters. Some effects may have reduced functionality in older browsers.

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Basic Glass Effect | ✅ | ✅ | ✅ | ✅ |
| Backdrop Filter | ✅ | ✅* | ✅ | ✅ |
| SVG Filters | ✅ | ✅ | ✅ | ✅ |
| Shader Mode | ✅ | ✅ | ✅ | ✅ |

*Firefox requires `layout.css.backdrop-filter.enabled` to be enabled in about:config