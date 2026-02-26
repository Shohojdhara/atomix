# Button Component

A versatile button component that supports various styles, sizes, states, and a modern glass morphism effect.

## Features

- Multiple variants (primary, secondary, success, info, warning, error, light, dark)
- Outline variants for all theme colors
- Three sizes (small, medium, large)
- Icon support with icon-only mode
- Rounded (pill) shape option
- Glass morphism effect
- Disabled state support
- Customizable as different HTML elements

## Basic Usage

```tsx
import { Button } from '@shohojdhara/atomix';

// Basic button
<Button label="Click me" variant="primary" />

// Button with icon
<Button label="Save" variant="success" icon={<SaveIcon />} />

// Icon-only button
<Button label="Delete" variant="error" icon={<TrashIcon />} iconOnly />
```

## Glass Morphism Effect

The Button component supports glass morphism effects through the `glass` prop, which creates a modern, translucent appearance perfect for overlaying on backgrounds.

### Basic Glass Effect

```tsx
const GlassExample = () => (
  <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem' }}>
    <Button 
      label="Glass Button" 
      variant="primary" 
      glass={true}
    />
  </div>
);
```

### Custom Glass Configuration

```tsx
const CustomGlassExample = () => (
  <div style={{ background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)', padding: '2rem' }}>
    <Button
      label="Customized Glass"
      variant="secondary"
      glass={{
        displacementScale: 60,
        blurAmount: 2,
        saturation: 180,
        aberrationIntensity: 2,
        borderRadius: 16,
        overLight: false,
        mode: 'polar'
      }}
    />
  </div>
);
```

### Glass with Different Variants

```tsx
const GlassVariantsExample = () => (
  <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', padding: '2rem' }}>
    <Button label="Primary Glass" variant="primary" glass />
    <Button label="Outline Glass" variant="outline-primary" glass />
    <Button label="Glass with Icon" variant="success" icon={<Icon />} glass />
    <Button label="Rounded Glass" variant="info" rounded glass />
  </div>
);
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Button text content |
| `children` | `ReactNode` | - | Alternative to label for complex content |
| `variant` | `Variant` | `'primary'` | Button visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Whether button is disabled |
| `icon` | `ReactNode` | - | Icon element to display |
| `iconOnly` | `boolean` | `false` | Show only icon, hide label |
| `rounded` | `boolean` | `false` | Make button fully rounded (pill shape) |
| `onClick` | `() => void` | - | Click event handler |
| `className` | `string` | - | Additional CSS classes |
| `as` | `ElementType` | `'button'` | HTML element or component to render as |
| `glass` | `boolean \| AtomixGlassProps` | `false` | Glass morphism effect |
| `aria-label` | `string` | - | Accessible label for the button |
| `aria-describedby` | `string` | - | ID of the element that describes the button |
| `aria-expanded` | `boolean` | - | Indicates if the button controls an expandable element |
| `aria-controls` | `string` | - | ID of the element controlled by the button |
| `tabIndex` | `number` | `0` | Tab index for keyboard navigation |

### Glass Props

When `glass` is an object, it accepts the same props as the `AtomixGlass` component:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `displacementScale` | `number` | `40` | Displacement scale for the glass effect |
| `blurAmount` | `number` | `0` | Blur amount for the backdrop |
| `saturation` | `number` | `160` | Saturation percentage for the backdrop |
| `aberrationIntensity` | `number` | `1` | Chromatic aberration intensity |
| `borderRadius` | `number` | `8` | Corner radius in pixels |
| `overLight` | `boolean` | `false` | Whether the glass is over a light background |
| `mode` | `'standard' \| 'polar' \| 'prominent' \| 'shader'` | `'standard'` | Glass effect mode |

## Variants

### Standard Variants
- `primary` - Main call-to-action buttons
- `secondary` - Secondary actions
- `success` - Positive actions (save, confirm)
- `info` - Informational actions
- `warning` - Caution actions
- `error` - Destructive actions (delete, cancel)
- `light` - Light theme variant
- `dark` - Dark theme variant

### Outline Variants
- `outline-primary`
- `outline-secondary`
- `outline-success`
- `outline-info`
- `outline-warning`
- `outline-error`
- `outline-light`
- `outline-dark`

### Special Variants
- `link` - Styled as an underlined link

## Sizes

- `sm` - Small button (compact spacing)
- `md` - Medium button (default size)
- `lg` - Large button (generous spacing)

## Advanced Usage

### As Different Elements

```tsx
// Render as link
<Button 
  as="a" 
  href="/dashboard" 
  label="Go to Dashboard" 
  variant="primary" 
/>

// Render as custom component (e.g., React Router Link)
<Button 
  as={Link} 
  to="/profile" 
  label="View Profile" 
  variant="secondary" 
/>
```

### Complex Content

```tsx
<Button variant="primary" glass>
  <span>Custom Content</span>
  <BadgeIcon />
</Button>
```

## Best Practices

### Glass Effect Usage
1. **Use with backgrounds**: Glass effect works best when placed over background images or colorful backgrounds
2. **Consider contrast**: Ensure text remains readable over the background
3. **Performance**: Use glass effect sparingly on pages with many interactive elements
4. **Accessibility**: Test with screen readers and keyboard navigation

### General Usage
1. Use `primary` variant for main actions
2. Use `outline` variants when you need a subtler appearance
3. Consider using `iconOnly` buttons for repetitive actions in toolbars
4. Use `rounded` variant for modern, friendly interfaces
5. Always provide meaningful `label` text for accessibility, even with `iconOnly` buttons

## Accessibility

- Buttons include proper ARIA attributes
- Disabled state is communicated to screen readers
- Icon-only buttons should have descriptive labels
- Keyboard navigation is fully supported
- Glass effects don't interfere with accessibility features

## Styling

The Button component uses CSS custom properties for theming:

```css
.c-btn {
  --atomix-btn-padding-x: /* horizontal padding */
  --atomix-btn-padding-y: /* vertical padding */
  --atomix-btn-font-size: /* font size */
  --atomix-btn-color: /* text color */
  --atomix-btn-bg: /* background color */
  --atomix-btn-border-color: /* border color */
  --atomix-btn-border-radius: /* corner radius */
}
```

Glass buttons automatically adjust these properties for optimal appearance with the glass effect.