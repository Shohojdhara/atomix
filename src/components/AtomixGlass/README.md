# AtomixGlass Component

## Overview

AtomixGlass is a versatile UI component that creates stunning glass morphism effects for modern interfaces. It provides a translucent, blurred glass-like appearance with customizable properties for displacement, blur, saturation, and chromatic aberration effects.

## Features

- **Multiple Glass Effect Modes**: Standard, Polar, Prominent, and Shader modes
- **Interactive Effects**: Customizable hover and active states
- **Accessibility Support**: WCAG 2.1 AA compliant with proper contrast and focus states
- **Responsive Design**: Adapts to different screen sizes
- **Theme Support**: Works with all Atomix themes
- **Performance Optimized**: Uses hardware acceleration where available

## Installation

AtomixGlass is included in the Atomix component library. No additional installation is required if you're already using Atomix.

## Basic Usage

```tsx
import AtomixGlass from 'path/to/AtomixGlass';

function MyComponent() {
  return (
    <AtomixGlass
      displacementScale={20}
      blurAmount={10}
      borderRadius={15}
    >
      <div>Your content here</div>
    </AtomixGlass>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Content to be rendered inside the glass container |
| `displacementScale` | number | 70 | Controls the intensity of the displacement effect |
| `blurAmount` | number | 0 | Controls the intensity of the blur effect |
| `saturation` | number | 140 | Controls the color saturation (100 is normal) |
| `aberrationIntensity` | number | 2 | Controls the chromatic aberration effect intensity |
| `elasticity` | number | 0.15 | Controls how responsive the glass is to mouse movement |
| `borderRadius` | number | 15 | Border radius of the glass container |
| `globalMousePos` | boolean | false | Whether to use global mouse position instead of local |
| `mouseOffset` | { x: number, y: number } | { x: 0, y: 0 } | Offset for mouse position calculation |
| `mouseContainer` | RefObject<HTMLElement> | null | Container to use for mouse position calculation |
| `padding` | string | '0' | Additional padding around the content |
| `height` | string \| number | undefined | Height of the glass component |
| `width` | string \| number | undefined | Width of the glass component |
| `style` | CSSProperties | {} | Additional CSS styles |
| `overLight` | boolean \| 'auto' \| OverLightObjectConfig | 'auto' | OverLight configuration. See [OverLight Configuration](#overlight-configuration) section for details |
| `withOverLightLayers` | boolean | true | Whether to render additional overlay layers for overLight mode |
| `debugOverLight` | boolean | false | Enable debug logging for overLight detection and configuration |
| `mode` | 'standard' \| 'polar' \| 'prominent' \| 'shader' | 'standard' | The glass effect mode |
| `onClick` | function | undefined | Click handler |
| `withBorder` | boolean | true | Whether to show border effects |
| `withLiquidBlur` | boolean | false | Whether to enable liquid blur effects |
| `withoutEffects` | boolean | false | Whether to disable all visual effects |
| `reducedMotion` | boolean | false | Force reduced motion preference |
| `highContrast` | boolean | false | Force high contrast mode |
| `withTimeAnimation` | boolean | true | Enable time-based animation (Phase 1) |
| `animationSpeed` | number | 1.0 | Animation speed multiplier (Phase 1) |
| `withMultiLayerDistortion` | boolean | false | Enable multi-layer distortion using FBM (Phase 1) |
| `distortionOctaves` | number | 5 | Number of octaves for FBM (Phase 1) |
| `distortionLacunarity` | number | 2.0 | Lacunarity for FBM (Phase 1) |
| `distortionGain` | number | 0.5 | Gain for FBM (Phase 1) |
| `distortionQuality` | 'low' \| 'medium' \| 'high' \| 'ultra' | 'high' | Quality preset for FBM (Phase 1) |
| `debugPerformance` | boolean | false | Enable performance monitoring dashboard (development only) |
| `debugBorderRadius` | boolean | false | Debug mode for corner radius extraction |

## Glass Effect Modes

### Standard Mode
The default glass effect with uniform displacement and blur.

### Polar Mode
A radial glass effect that creates a circular distortion pattern.

### Prominent Mode
Enhanced glass effect with stronger displacement and saturation for more prominent UI elements.

### Shader Mode
Advanced glass effect using custom WebGL shaders for liquid-like animations.

## Performance Considerations

The AtomixGlass component uses several advanced CSS features and SVG filters that can be performance-intensive. For best performance:

1. Use sparingly on pages with many instances
2. Consider disabling effects on lower-end devices
3. Use the `withoutEffects` prop to disable non-essential effects when needed
4. Avoid using very high values for `displacementScale` and `blurAmount`
5. Use `reducedMotion` for users with vestibular disorders
6. Consider using lower `distortionQuality` presets on mobile devices

## Accessibility

AtomixGlass is designed with accessibility in mind:

- Maintains sufficient contrast ratios for text content
- Supports keyboard navigation
- Works with screen readers
- Includes reduced motion options for users with vestibular disorders

## OverLight Configuration

The `overLight` prop supports three configuration modes for handling glass effects on light backgrounds:

### Boolean Mode (Explicit Control)

Use `true` or `false` for direct control when you know the background state:

```tsx
// Light background
<AtomixGlass overLight={true}>
  <div>Content on light background</div>
</AtomixGlass>

// Dark background
<AtomixGlass overLight={false}>
  <div>Content on dark background</div>
</AtomixGlass>
```

**Use Cases:**
- When you know the background is light/dark
- When you want explicit control
- Performance-critical scenarios (avoids detection overhead)

### Auto-Detection Mode

Use `"auto"` to automatically detect background brightness:

```tsx
<AtomixGlass overLight="auto">
  <div>Content with auto-detected background</div>
</AtomixGlass>
```

**How it works:**
- Traverses parent elements (up to 20 levels deep)
- Samples up to 10 background elements
- Calculates average luminance using: `(0.299 * r + 0.587 * g + 0.114 * b) / 255`
- Compares against threshold (default: 0.7)
- Automatically enables overLight mode for light backgrounds

**Limitations:**
- 150ms delay for detection
- May not detect complex gradients accurately
- Image backgrounds assume medium luminance (0.5)

### Object Configuration Mode

Use an object to customize auto-detection with specific settings:

```tsx
<AtomixGlass 
  overLight={{
    threshold: 0.8,        // Detection threshold (0.1 - 1.0)
    opacity: 0.6,          // Base opacity (0.1 - 1.0)
    contrast: 1.8,         // Contrast enhancement (0.5 - 2.5)
    brightness: 1.0,       // Brightness adjustment (0.5 - 2.0)
    saturationBoost: 1.5  // Saturation multiplier (0.5 - 3.0)
  }}
>
  <div>Content with custom overLight config</div>
</AtomixGlass>
```

**Available Properties:**

| Property | Type | Range | Default | Description |
|----------|------|-------|---------|-------------|
| `threshold` | number | 0.1 - 1.0 | 0.7 | Luminance threshold for auto-detection |
| `opacity` | number | 0.1 - 1.0 | 0.5* | Base opacity (multiplied by hover/active intensity) |
| `contrast` | number | 0.5 - 2.5 | 1.4* | Contrast enhancement multiplier |
| `brightness` | number | 0.5 - 2.0 | 0.85* | Brightness adjustment multiplier |
| `saturationBoost` | number | 0.5 - 3.0 | 1.3* | Saturation multiplier |

\* Defaults are dynamic and depend on mouse influence, hover, and active states

**Example - Minimal Config:**
```tsx
// Only customize threshold
<AtomixGlass overLight={{ threshold: 0.8 }}>
  <div>Content</div>
</AtomixGlass>
```

**Example - Full Config:**
```tsx
// Customize all properties
<AtomixGlass 
  overLight={{
    threshold: 0.75,
    opacity: 0.6,
    contrast: 1.8,
    brightness: 1.1,
    saturationBoost: 1.5
  }}
>
  <div>Content</div>
</AtomixGlass>
```

### Debug Mode

Enable `debugOverLight` to log detailed information about detection and configuration:

```tsx
<AtomixGlass overLight="auto" debugOverLight={true}>
  <div>Content with debug logging</div>
</AtomixGlass>
```

This logs to console:
- Auto-detection results (luminance values, threshold comparison)
- Final overLight configuration values
- Detection timing and performance

## Best Practices

- Use AtomixGlass for important UI elements that need to stand out
- Avoid overusing glass effects which can create visual noise
- Ensure text on glass backgrounds has sufficient contrast
- Use `overLight="auto"` for dynamic backgrounds or when unsure
- Use `overLight={true}` or `overLight={false}` for known backgrounds (better performance)
- Use object config to fine-tune detection sensitivity and visual effects
- Enable `debugOverLight` when troubleshooting auto-detection issues
- Test glass effects across different devices and screen sizes
- Use appropriate `borderRadius` values to match your design language
- Consider disabling `withOverLightLayers` for performance optimization

## Customization

You can customize the appearance of AtomixGlass through CSS by targeting the following classes:

- `.c-atomix-glass` - The main container element
- `.c-glass-container` - The glass effect container
- `.c-glass-container__glass` - The glass element itself
- `.c-glass-container__warp` - The displaced background layer
- `.c-glass-container__content` - The content container
- `.c-atomix-glass__border` - The border effect element
- `.c-atomix-glass__hover-effect` - The hover effect element
- `.c-atomix-glass__active-effect` - The active effect element

## Examples

Check out the Storybook examples for comprehensive demonstrations of AtomixGlass capabilities:

- Basic usage examples
- Different modes comparison
- Interactive examples
- Responsive design examples
- Theme variations

## Browser Support

AtomixGlass works in all modern browsers that support CSS filters and backdrop filters:

- Chrome 76+
- Firefox 70+
- Safari 13+
- Edge 79+

For browsers that don't support backdrop-filter, a fallback style is provided with reduced visual effects.