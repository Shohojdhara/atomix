# Applemix Theme

> Apple Mac OS 2026 Liquid Glass inspired theme for the Atomix Design System

## Overview

The Applemix theme brings the futuristic liquid glass aesthetics of Apple Mac OS 2026 to the Atomix Design System. It features advanced glass morphism effects, chromatic aberration, depth-based lighting, and smooth animations that create an immersive, modern interface experience.

## Features

- 🌊 **Liquid Glass Morphism**: Advanced backdrop filters with blur, saturation, and brightness effects
- 🎨 **Apple-Inspired Color Palette**: Carefully crafted colors matching Apple's design language
- ✨ **Chromatic Aberration**: Subtle color separation effects for enhanced visual depth
- 🎭 **Multiple Glass Modes**: Standard, Polar, Prominent, and Shader effect variations
- 📱 **Responsive Design**: Optimized performance across all device sizes
- ♿ **Accessibility**: Full support for reduced motion and high contrast preferences
- 🔧 **AtomixGlass Integration**: Seamless compatibility with existing AtomixGlass components

## Installation

The Applemix theme is included in the Atomix Design System. To use it in your project:

```scss
// Import the Applemix theme
@use '@shohojdhara/atomix/themes/applemix' as applemix;
```

Or use the compiled CSS:

```html
<link rel="stylesheet" href="@shohojdhara/atomix/dist/themes/applemix.css">
```

## Usage

### Basic Implementation

Apply the theme using the data attribute:

```html
<div data-theme="applemix">
  <!-- Your content here -->
</div>
```

### AtomixGlass Components

The theme enhances AtomixGlass components with Apple-inspired styling:

```html
<!-- Standard glass effect -->
<div class="atomix-glass">
  <div class="atomix-glass__content">
    <h2>Glass Surface</h2>
    <p>Content with liquid glass background</p>
  </div>
</div>

<!-- Enhanced glass modes -->
<div class="atomix-glass atomix-glass--polar">
  <div class="atomix-glass__content">
    <h2>Polar Glass Effect</h2>
    <p>Enhanced with chromatic aberration</p>
  </div>
</div>
```

### Glass Cards

```html
<div class="atomix-glass-card">
  <div class="atomix-glass-card__header">
    <h3>Card Title</h3>
  </div>
  <div class="atomix-glass-card__body">
    <p>Card content with glass morphism effects</p>
  </div>
  <div class="atomix-glass-card__footer">
    <button class="btn">Action</button>
  </div>
</div>
```

### Glass Navigation

```html
<nav class="atomix-glass-nav">
  <a href="#" class="nav-item active">Home</a>
  <a href="#" class="nav-item">About</a>
  <a href="#" class="nav-item">Contact</a>
</nav>
```

## SCSS Mixins

The theme provides powerful mixins for custom glass effects:

### Basic Glass Surface

```scss
@use '@shohojdhara/atomix/themes/applemix/02-tools/tools.glass-mixins' as glass;

.my-glass-element {
  @include glass.glass-surface(
    $mode: 'standard',
    $depth: 'elevated',
    $lighting: 'ambient',
    $hover: true
  );
}
```

### Custom Glass Effects

```scss
.custom-glass {
  // Base glass effect
  @include glass.glass-base($blur: 16px, $opacity: 0.2);
  
  // Add chromatic aberration
  @include glass.chromatic-aberration(2px);
  
  // Add hover effects
  @include glass.glass-hover($lift: true, $glow: true);
  
  // Add focus effects
  @include glass.glass-focus();
}
```

### Glass Modes

```scss
.glass-variations {
  // Standard mode
  &.standard {
    @include glass.glass-mode('standard');
  }
  
  // Polar mode with aberration
  &.polar {
    @include glass.glass-mode('polar');
  }
  
  // Prominent mode with enhanced effects
  &.prominent {
    @include glass.glass-mode('prominent');
  }
  
  // Shader mode with maximum effects
  &.shader {
    @include glass.glass-mode('shader');
  }
}
```

## Color System

### Primary Colors

The Applemix theme uses Apple's System Blue as the primary color with glass-enhanced variations:

```scss
// CSS Custom Properties
:root {
  --applemix-primary-1: #f0f8ff;   // Ultra light blue glass
  --applemix-primary-6: #007aff;   // Apple System Blue
  --applemix-primary-10: #001a44;  // Deepest blue
}
```

### Glass-Specific Colors

```scss
:root {
  // Glass transparency levels
  --applemix-glass-opacity-light: 0.1;
  --applemix-glass-opacity-medium: 0.15;
  --applemix-glass-opacity-strong: 0.25;
  
  // Chromatic aberration colors
  --applemix-aberration-red: rgba(255, 0, 100, 0.3);
  --applemix-aberration-green: rgba(0, 255, 150, 0.3);
  --applemix-aberration-blue: rgba(0, 150, 255, 0.3);
}
```

## Typography

The theme uses Apple's San Francisco font family with optimized settings:

```scss
// Font families
$font-family-base: (-apple-system, BlinkMacSystemFont, 'SF Pro Display', ...);

// Apple-style scaling
$h1-font-size: 3.5rem;    // Large Title
$h2-font-size: 2.75rem;   // Title 1
$h3-font-size: 2.25rem;   // Title 2
```

## Performance Optimization

### Hardware Acceleration

The theme automatically enables hardware acceleration for glass effects:

```scss
.atomix-glass {
  will-change: backdrop-filter, background-color, transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}
```

### Responsive Behavior

Glass effects are automatically reduced on smaller screens:

```scss
@media (max-width: 768px) {
  .atomix-glass {
    backdrop-filter: blur(8px) saturate(1.5); // Reduced complexity
  }
}
```

### Reduced Motion Support

The theme respects user preferences for reduced motion:

```scss
@media (prefers-reduced-motion: reduce) {
  .atomix-glass {
    backdrop-filter: none;
    background-color: rgba(255, 255, 255, 0.9);
    transition: none;
  }
}
```

## Customization

### Theme Variables

Override theme variables to customize the appearance:

```scss
@use '@shohojdhara/atomix/themes/applemix' with (
  $glass-base-opacity: 0.2,
  $glass-base-blur: 16px,
  $aberration-intensity: 3px
);
```

### Custom Glass Modes

Create your own glass modes:

```scss
$custom-glass-modes: (
  'subtle': (
    'blur': 6px,
    'opacity': 0.08,
    'saturation': 1.5,
    'brightness': 1.05,
    'aberration': 0.5px
  ),
  'intense': (
    'blur': 32px,
    'opacity': 0.4,
    'saturation': 3.0,
    'brightness': 1.6,
    'aberration': 5px
  )
);
```

## Browser Support

The Applemix theme requires modern browsers with support for:

- `backdrop-filter` (CSS Backdrop Filter)
- CSS Custom Properties (CSS Variables)
- CSS Grid and Flexbox
- CSS Transforms and Transitions

### Fallbacks

For browsers without `backdrop-filter` support, the theme provides graceful fallbacks:

```scss
.atomix-glass {
  background-color: rgba(255, 255, 255, 0.9); // Fallback
  backdrop-filter: blur(12px); // Enhanced
}
```

## Best Practices

### Performance

1. **Limit Glass Layers**: Avoid nesting multiple glass elements deeply
2. **Use Hardware Acceleration**: The theme automatically optimizes for GPU rendering
3. **Responsive Design**: Glass effects are automatically reduced on mobile devices

### Accessibility

1. **Contrast**: Ensure sufficient contrast ratios on glass surfaces
2. **Motion**: The theme respects `prefers-reduced-motion` settings
3. **Focus**: Clear focus indicators are provided for keyboard navigation

### Design Guidelines

1. **Hierarchy**: Use different glass depths to establish visual hierarchy
2. **Content**: Ensure text remains readable on glass backgrounds
3. **Consistency**: Use consistent glass modes throughout your interface

## Examples

### Hero Section

```html
<section class="hero atomix-glass atomix-glass--prominent">
  <div class="atomix-glass__content">
    <h1>Welcome to the Future</h1>
    <p>Experience liquid glass interfaces</p>
    <button class="btn btn-primary">Get Started</button>
  </div>
</section>
```

### Dashboard Card

```html
<div class="atomix-glass-card">
  <div class="atomix-glass-card__header">
    <h3>Analytics</h3>
  </div>
  <div class="atomix-glass-card__body">
    <div class="stats">
      <div class="stat">
        <span class="value">1,234</span>
        <span class="label">Users</span>
      </div>
    </div>
  </div>
</div>
```

### Modal Dialog

```html
<dialog class="atomix-glass-modal">
  <div class="atomix-glass__content">
    <h2>Confirm Action</h2>
    <p>Are you sure you want to proceed?</p>
    <div class="actions">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
</dialog>
```

## Contributing

When contributing to the Applemix theme:

1. Follow the existing SCSS architecture
2. Test across different browsers and devices
3. Ensure accessibility compliance
4. Update documentation for new features
5. Maintain performance optimization

## License

The Applemix theme is part of the Atomix Design System and follows the same licensing terms.