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
      cornerRadius={15}
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
| `displacementScale` | number | 20 | Controls the intensity of the displacement effect |
| `blurAmount` | number | 10 | Controls the intensity of the blur effect |
| `saturation` | number | 150 | Controls the color saturation (100 is normal) |
| `aberrationIntensity` | number | 1.5 | Controls the chromatic aberration effect intensity |
| `elasticity` | number | 0.5 | Controls how responsive the glass is to mouse movement |
| `cornerRadius` | number | 15 | Border radius of the glass container |
| `globalMousePos` | boolean | false | Whether to use global mouse position instead of local |
| `mouseOffset` | { x: number, y: number } | { x: 0, y: 0 } | Offset for mouse position calculation |
| `mouseContainer` | RefObject<HTMLElement> | null | Container to use for mouse position calculation |
| `padding` | number | 0 | Additional padding around the content |
| `style` | CSSProperties | {} | Additional CSS styles |
| `overLight` | boolean | false | Whether the glass is over a light background |
| `mode` | 'standard' \| 'polar' \| 'prominent' \| 'shader' | 'standard' | The glass effect mode |
| `onClick` | function | undefined | Click handler |
| `showBorderEffects` | boolean | true | Whether to show border effects |
| `showHoverEffects` | boolean | true | Whether to show hover effects |
| `active` | boolean | false | Whether the glass is in active state |

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
3. Use the `showBorderEffects` and `showHoverEffects` props to disable non-essential effects when needed
4. Avoid using very high values for `displacementScale` and `blurAmount`

## Accessibility

AtomixGlass is designed with accessibility in mind:

- Maintains sufficient contrast ratios for text content
- Supports keyboard navigation
- Works with screen readers
- Includes reduced motion options for users with vestibular disorders

## Best Practices

- Use AtomixGlass for important UI elements that need to stand out
- Avoid overusing glass effects which can create visual noise
- Ensure text on glass backgrounds has sufficient contrast
- Consider using the `overLight` prop when placing glass over light backgrounds
- Test glass effects across different devices and screen sizes
- Use appropriate `cornerRadius` values to match your design language

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