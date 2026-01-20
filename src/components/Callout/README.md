# Callout Component

The Callout component is used to display important messages, notifications, or alerts to users. It provides feedback, warnings, errors, or general information with optional glass morphism effects for enhanced visual appeal.

## Features

- **Multiple Variants**: Support for different color themes (primary, success, warning, error, etc.)
- **Glass Morphism**: Optional glass effect for modern, translucent appearance
- **Flexible Layout**: Support for one-line mode and toast notifications
- **Interactive Elements**: Dismissible with close button and action buttons
- **Accessibility**: Full WCAG 2.1 AA compliance with proper ARIA attributes
- **TypeScript**: Full type safety with comprehensive prop interfaces

## Basic Usage

```tsx
import { Callout } from '@atomix/react';

// Basic callout
<Callout
  title="Information"
  variant="primary"
  icon={<InfoIcon />}
>
  This is a basic callout message.
</Callout>

// Glass morphism variant
<Callout
  title="Glass Effect"
  variant="primary"
  icon={<InfoIcon />}
  glass={true}
>
  This callout uses glass morphism for a modern appearance.
</Callout>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | - | Callout title |
| `children` | `ReactNode` | - | Callout content |
| `icon` | `ReactNode` | - | Optional icon |
| `variant` | `ThemeColor` | `'primary'` | Color variant |
| `onClose` | `() => void` | - | Close handler function |
| `actions` | `ReactNode` | - | Optional action buttons |
| `compact` | `boolean` | `false` | Display in compact mode |
| `isToast` | `boolean` | `false` | Display as toast notification |
| `glass` | `AtomixGlassProps \| boolean` | `false` | Glass morphism effect |
| `className` | `string` | - | Additional CSS classes |

## Variants

### Color Variants

```tsx
// Success message
<Callout variant="success" title="Success" icon={<SuccessIcon />}>
  Operation completed successfully!
</Callout>

// Warning message
<Callout variant="warning" title="Warning" icon={<WarningIcon />}>
  Please review your information.
</Callout>

// Error message
<Callout variant="error" title="Error" icon={<ErrorIcon />}>
  Something went wrong.
</Callout>

// Info message
<Callout variant="info" title="Information" icon={<InfoIcon />}>
  Here's some useful information.
</Callout>
```

### Glass Morphism

Glass morphism adds a modern, translucent appearance with backdrop blur effects:

```tsx
// Enable glass with default settings
<Callout glass={true} title="Glass Effect" variant="primary">
  Beautiful glass morphism effect
</Callout>

// Custom glass settings
<Callout 
  glass={{
    displacementScale: 60,
    blurAmount: 2,
    saturation: 180,
    aberrationIntensity: 1.5,
    cornerRadius: 12
  }}
  title="Custom Glass"
  variant="success"
>
  Custom glass configuration
</Callout>
```

#### Default Glass Settings

When `glass={true}`, these default settings are used:

```typescript
{
  displacementScale: 40,
  blurAmount: 0,
  saturation: 160,
  aberrationIntensity: 1,
  cornerRadius: 8,
  overLight: false,
  mode: 'standard'
}
```

## Layout Options

### Compact Mode

```tsx
<Callout
  title="Quick notification"
  variant="info"
  icon={<InfoIcon />}
  compact={true}
/>
```

### Toast Notifications

```tsx
<Callout
  title="Toast Message"
  variant="success"
  icon={<SuccessIcon />}
  isToast={true}
  onClose={() => handleClose()}
>
  This appears as a toast notification
</Callout>
```

### With Actions

```tsx
<Callout
  title="Update Available"
  variant="info"
  icon={<InfoIcon />}
  actions={
    <>
      <Button label="Update" variant="primary" size="sm" />
      <Button label="Later" variant="outline-primary" size="sm" />
    </>
  }
>
  A new version is available.
</Callout>
```

### Dismissible

```tsx
<Callout
  title="Dismissible"
  variant="primary"
  icon={<InfoIcon />}
  onClose={() => console.log('Dismissed')}
>
  This callout can be closed
</Callout>
```

## Advanced Usage

### Custom Content

```tsx
<Callout title="Rich Content" variant="primary" icon={<InfoIcon />}>
  <div>
    <p>Callouts support rich content including:</p>
    <ul>
      <li>Lists</li>
      <li>Formatted text</li>
      <li>Custom components</li>
    </ul>
    <code>Code examples</code>
  </div>
</Callout>
```

### Toast Container System

For managing multiple toast notifications:

```tsx
import { useState } from 'react';

function ToastManager() {
  const [toasts, setToasts] = useState([]);
  
  const addToast = (message, variant) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, variant }]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };
  
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Callout
          key={toast.id}
          title={toast.variant}
          variant={toast.variant}
          isToast={true}
          glass={true}
          onClose={() => removeToast(toast.id)}
        >
          {toast.message}
        </Callout>
      ))}
    </div>
  );
}
```

## Styling

### CSS Variables

The component uses CSS custom properties for theming:

```scss
.c-callout {
  --atomix-callout-bg: /* Background color */
  --atomix-callout-border-color: /* Border color */
  --atomix-callout-title-color: /* Title text color */
  --atomix-callout-text-color: /* Content text color */
  --atomix-callout-icon-color: /* Icon color */
  --atomix-callout-border-radius: /* Corner radius */
}
```

### Glass Effect Styling

Glass morphism adds these visual effects:

- Backdrop blur filter
- Semi-transparent background
- Enhanced text shadows for readability
- Variant-specific saturation adjustments
- Special handling for light/dark themes

```scss
.c-callout--glass {
  backdrop-filter: blur(10px);
  background: rgba(background-color, 0.5);
  border-color: rgba(255, 255, 255, 0.2);
  
  .c-callout__title,
  .c-callout__text {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}
```

## Accessibility

### ARIA Attributes

The component automatically applies appropriate ARIA attributes:

- `role="alert"` for warnings and errors
- `role="status"` for info and success messages
- `aria-live="polite"` or `aria-live="assertive"` based on urgency
- `aria-label` for close button

### Keyboard Support

- **Tab**: Focus close button and action buttons
- **Enter/Space**: Activate focused buttons
- **Escape**: Close dismissible callouts (when focused)

### Screen Reader Support

- Announces content changes appropriately
- Provides context for different message types
- Supports high contrast mode detection

## Performance Considerations

### Glass Effect Optimization

Glass morphism effects are optimized for performance:

- Uses CSS `backdrop-filter` when supported
- Automatic fallback for older browsers
- Reduced motion respect via `prefers-reduced-motion`
- Efficient rendering with CSS transforms

### Toast Management

- Automatic cleanup of dismissed toasts
- Memory-efficient state management
- Optimized re-renders with proper keys

## Browser Support

- **Modern Browsers**: Full feature support including glass effects
- **Older Browsers**: Graceful fallback without glass effects
- **Mobile**: Touch-optimized interactions
- **Accessibility Tools**: Full screen reader and keyboard support

## Examples

### Complete Implementation

```tsx
import { Callout, Button } from '@atomix/react';
import { Info, Check, AlertTriangle, X } from 'phosphor-react';

function NotificationSystem() {
  return (
    <div className="notification-examples">
      {/* Basic variants */}
      <Callout variant="primary" title="Information" icon={<Info />}>
        This is important information for the user.
      </Callout>
      
      {/* Glass variants */}
      <Callout 
        variant="success" 
        title="Success" 
        icon={<Check />}
        glass={true}
      >
        Operation completed with glass effect!
      </Callout>
      
      {/* Interactive callout */}
      <Callout
        variant="warning"
        title="Confirm Action"
        icon={<AlertTriangle />}
        glass={true}
        actions={
          <>
            <Button label="Confirm" variant="warning" size="sm" />
            <Button label="Cancel" variant="outline-warning" size="sm" />
          </>
        }
      >
        Are you sure you want to proceed?
      </Callout>
      
      {/* Toast notification */}
      <Callout
        variant="error"
        title="Error"
        icon={<X />}
        isToast={true}
        glass={true}
        onClose={() => handleErrorClose()}
      >
        Failed to save changes. Please try again.
      </Callout>
    </div>
  );
}
```

## Migration Notes

### From v1.x to v2.x

- Glass prop added as optional feature
- **Prop Rename**: `oneLine` is now `compact`
- **Prop Rename**: `toast` is now `isToast`
- Enhanced accessibility attributes
- Improved TypeScript definitions

### Best Practices

1. **Use appropriate variants** for different message types
2. **Enable glass effect** for modern interfaces
3. **Include icons** for better visual hierarchy
4. **Provide close handlers** for dismissible messages
5. **Test accessibility** with keyboard and screen readers
6. **Consider toast positioning** in your layout
7. **Optimize glass usage** for performance on lower-end devices

## Related Components

- **Button**: Used for actions within callouts
- **Icon**: Used for callout icons
- **AtomixGlass**: Underlying glass effect implementation
- **Toast**: Alternative toast notification system
```

Now let me check for any compilation errors and make sure everything is working correctly: