# Callout Component

The Callout component is used to display important messages, notifications, alerts, or highlighted information blocks. It supports multiple variants, icons, actions, and can be configured as dismissible or toast notifications.

## Overview

Callouts are versatile components that help draw attention to important information. They can be used for success messages, warnings, errors, informational content, or any other type of highlighted communication. The Atomix Callout component provides a consistent interface with built-in accessibility features and flexible styling options.

## Props API

### CalloutProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | `undefined` | Callout title/heading |
| `children` | `ReactNode` | `undefined` | Callout content/message |
| `icon` | `ReactNode` | `undefined` | Icon to display |
| `variant` | `ThemeColor` | `'primary'` | Color variant |
| `onClose` | `() => void` | `undefined` | Close handler (makes callout dismissible) |
| `actions` | `ReactNode` | `undefined` | Action buttons or elements |
| `oneLine` | `boolean` | `false` | Display in compact one-line mode |
| `toast` | `boolean` | `false` | Display as toast notification |
| `className` | `string` | `''` | Additional CSS classes |
| `glass` | `boolean \| AtomixGlassProps` | `false` | Glass morphism effect for the callout |
| `style` | `React.CSSProperties` | `undefined` | Custom style for the callout |

### Variant Options

- **Theme Colors**: `primary`, `secondary`, `success`, `warning`, `error`, `info`, `light`, `dark`

## Usage Examples

### Basic React Usage

```jsx
import React from 'react';
import { Callout, Icon } from '@shohojdhara/atomix';

function BasicCallouts() {
  return (
    <div className="u-gap-4">
      {/* Basic callout */}
      <Callout
        title="Information"
        variant="primary"
        icon={<Icon name="Info" />}
      >
        This is a basic informational callout.
      </Callout>
      
      {/* Success callout */}
      <Callout
        title="Success"
        variant="success"
        icon={<Icon name="CheckCircle" />}
      >
        Your changes have been saved successfully.
      </Callout>
      
      {/* Warning callout */}
      <Callout
        title="Warning"
        variant="warning"
        icon={<Icon name="Warning" />}
      >
        Please review your settings before proceeding.
      </Callout>
      
      {/* Error callout */}
      <Callout
        title="Error"
        variant="error"
        icon={<Icon name="XCircle" />}
      >
        An error occurred while processing your request.
      </Callout>
    </div>
  );
}
```

### Callout Variants

```jsx
function CalloutVariants() {
  const variants = [
    { variant: 'primary', title: 'Primary', icon: 'Info' },
    { variant: 'secondary', title: 'Secondary', icon: 'Circle' },
    { variant: 'success', title: 'Success', icon: 'CheckCircle' },
    { variant: 'warning', title: 'Warning', icon: 'Warning' },
    { variant: 'error', title: 'Error', icon: 'XCircle' },
    { variant: 'info', title: 'Info', icon: 'Info' },
    { variant: 'light', title: 'Light', icon: 'Circle' },
    { variant: 'dark', title: 'Dark', icon: 'Circle' }
  ];

  return (
    <div className="u-gap-3">
      {variants.map(({ variant, title, icon }) => (
        <Callout
          key={variant}
          title={title}
          variant={variant}
          icon={<Icon name={icon} />}
        >
          This is a {variant} callout variant.
        </Callout>
      ))}
    </div>
  );
}
```

### Dismissible Callouts

```jsx
function DismissibleCallouts() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="u-gap-4">
      {visible && (
        <Callout
          title="Dismissible Notification"
          variant="info"
          icon={<Icon name="Bell" />}
          onClose={() => setVisible(false)}
        >
          This callout can be dismissed by clicking the close button.
        </Callout>
      )}
      
      {!visible && (
        <button 
          className="c-button c-button--primary"
          onClick={() => setVisible(true)}
        >
          Show Callout Again
        </button>
      )}
    </div>
  );
}
```

### Callouts with Actions

```jsx
import { Button } from '@shohojdhara/atomix';

function CalloutWithActions() {
  const handleUpdate = () => {
    console.log('Update clicked');
  };

  const handleLater = () => {
    console.log('Later clicked');
  };

  return (
    <Callout
      title="Update Available"
      variant="info"
      icon={<Icon name="Download" />}
      actions={
        <div className="u-d-flex u-gap-2">
          <Button 
            label="Update Now" 
            variant="primary" 
            size="sm"
            onClick={handleUpdate}
          />
          <Button 
            label="Later" 
            variant="outline-primary" 
            size="sm"
            onClick={handleLater}
          />
        </div>
      }
    >
      A new version is available. Would you like to update now?
    </Callout>
  );
}
```

### One-Line Callouts

```jsx
function OneLineCallouts() {
  return (
    <div className="u-gap-3">
      <Callout
        title="Quick notification"
        variant="success"
        icon={<Icon name="CheckCircle" />}
        oneLine
      />
      
      <Callout
        title="Status update"
        variant="info"
        icon={<Icon name="Info" />}
        oneLine
        onClose={() => console.log('Dismissed')}
      />
    </div>
  );
}
```

### Toast Notifications

```jsx
function ToastNotifications() {
  const [toasts, setToasts] = useState([]);

  const showToast = (variant, title, message) => {
    const id = Date.now();
    const toast = {
      id,
      variant,
      title,
      message,
      onClose: () => removeToast(id)
    };
    
    setToasts(prev => [...prev, toast]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div>
      <div className="u-d-flex u-gap-2 u-mb-4">
        <Button 
          label="Success Toast"
          variant="success"
          onClick={() => showToast('success', 'Success!', 'Operation completed successfully.')}
        />
        <Button 
          label="Error Toast"
          variant="error"
          onClick={() => showToast('error', 'Error!', 'Something went wrong.')}
        />
        <Button 
          label="Info Toast"
          variant="info"
          onClick={() => showToast('info', 'Info', 'Here is some information.')}
        />
      </div>

      {/* Toast container */}
      <div className="c-callout-container c-callout-container--top-right">
        {toasts.map(toast => (
          <Callout
            key={toast.id}
            title={toast.title}
            variant={toast.variant}
            toast
            onClose={toast.onClose}
            icon={<Icon name="Info" />}
          >
            {toast.message}
          </Callout>
        ))}
      </div>
    </div>
  );
}
```

### Rich Content Callouts

```jsx
function RichContentCallout() {
  return (
    <Callout
      title="System Requirements"
      variant="info"
      icon={<Icon name="Gear" />}
    >
      <div className="u-gap-3">
        <p>Please ensure your system meets the following requirements:</p>
        <ul className="u-pl-4">
          <li>Node.js 16.0 or higher</li>
          <li>npm 7.0 or higher</li>
          <li>Modern web browser</li>
        </ul>
        <div className="u-bg-gray-100 u-p-3 u-rounded">
          <code>npm install @shohojdhara/atomix</code>
        </div>
      </div>
    </Callout>
  );
}
```

### Vanilla JavaScript Usage

```javascript
// Basic callout
const callout = new Atomix.Callout('.my-callout', {
  title: 'Information',
  content: 'This is a callout message.',
  variant: 'primary',
  icon: 'Info'
});

// Dismissible callout
const dismissibleCallout = new Atomix.Callout('.dismissible-callout', {
  title: 'Notification',
  content: 'This can be dismissed.',
  variant: 'info',
  icon: 'Bell',
  onClose: () => {
    console.log('Callout dismissed');
  }
});

// Callout with actions
const actionCallout = new Atomix.Callout('.action-callout', {
  title: 'Confirm Action',
  content: 'Are you sure you want to proceed?',
  variant: 'warning',
  icon: 'Warning',
  actions: [
    { label: 'Confirm', variant: 'primary', onClick: handleConfirm },
    { label: 'Cancel', variant: 'secondary', onClick: handleCancel }
  ]
});

// Initialize from data attributes
Atomix.Callout.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic callout -->
<div
  class="c-callout c-callout--primary"
  data-atomix="callout"
  data-title="Information"
  data-content="This is a callout message."
  data-variant="primary"
  data-icon="Info">
</div>

<!-- Dismissible callout -->
<div
  class="c-callout c-callout--warning"
  data-atomix="callout"
  data-title="Warning"
  data-content="This is a dismissible warning."
  data-variant="warning"
  data-icon="Warning"
  data-dismissible="true">
</div>

<!-- One-line callout -->
<div
  class="c-callout c-callout--success c-callout--oneline"
  data-atomix="callout"
  data-title="Success notification"
  data-variant="success"
  data-icon="CheckCircle"
  data-one-line="true">
</div>
```

## Styling

### CSS Classes

The Callout component uses the following CSS class structure:

```css
/* Base callout */
.c-callout {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--callout-width);
  padding: var(--callout-padding-y) var(--callout-padding-x);
  background: var(--callout-bg);
  border-radius: var(--callout-border-radius);
  border: var(--callout-border-width) solid var(--callout-border-color);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

/* Content structure */
.c-callout__content {
  display: flex;
  align-items: flex-start;
  gap: var(--callout-message-spacer);
  flex: 1;
}

.c-callout__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--callout-icon-size);
  height: var(--callout-icon-size);
  color: var(--callout-icon-color);
  flex-shrink: 0;
}

.c-callout__message {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.c-callout__title {
  font-size: var(--callout-title-font-size);
  font-weight: var(--callout-title-font-weight);
  color: var(--callout-title-color);
  line-height: 1.4;
}

.c-callout__text {
  font-size: var(--callout-text-font-size);
  font-weight: var(--callout-text-font-weight);
  color: var(--callout-text-color);
  line-height: 1.5;
}

.c-callout__actions {
  display: flex;
  gap: var(--callout-actions-spacer);
  margin-top: var(--callout-actions-spacer-y);
}

.c-callout__close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.c-callout__close-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Layout modifiers */
.c-callout--oneline .c-callout__message {
  flex-direction: row;
  align-items: center;
  gap: var(--callout-message-spacer);
}

.c-callout--toast {
  position: relative;
  max-width: 400px;
  box-shadow: var(--callout-box-shadow);
}

/* Variant modifiers */
.c-callout--primary {
  --callout-bg: var(--brand-bg-subtle);
  --callout-border-color: var(--brand-border-subtle);
  --callout-icon-color: var(--brand-text-emphasis);
}

.c-callout--success {
  --callout-bg: var(--success-bg-subtle);
  --callout-border-color: var(--success-border-subtle);
  --callout-icon-color: var(--success-text-emphasis);
}

.c-callout--warning {
  --callout-bg: var(--warning-bg-subtle);
  --callout-border-color: var(--warning-border-subtle);
  --callout-icon-color: var(--warning-text-emphasis);
}

.c-callout--error {
  --callout-bg: var(--error-bg-subtle);
  --callout-border-color: var(--error-border-subtle);
  --callout-icon-color: var(--error-text-emphasis);
}

.c-callout--info {
  --callout-bg: var(--info-bg-subtle);
  --callout-border-color: var(--info-border-subtle);
  --callout-icon-color: var(--info-text-emphasis);
}
```

### Custom Styling

```css
/* Custom callout variant */
.c-callout--custom {
  --callout-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --callout-border-color: #667eea;
  --callout-title-color: white;
  --callout-text-color: rgba(255, 255, 255, 0.9);
  --callout-icon-color: white;
}

/* Compact callout */
.c-callout--compact {
  --callout-padding-y: 8px;
  --callout-padding-x: 12px;
  --callout-title-font-size: 14px;
  --callout-text-font-size: 13px;
}

/* Callout with shadow */
.c-callout--elevated {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: none;
}
```

## Glass Effect

Callout supports the glass morphism effect for modern, translucent notification designs.

### Basic Glass Effect

```jsx
function GlassCallout() {
  return (
    <Callout
      title="Information"
      variant="info"
      glass={true}
    >
      This callout has a glass morphism effect applied.
    </Callout>
  );
}
```

### Custom Glass Configuration

```jsx
function CustomGlassCallout() {
  return (
    <Callout
      title="Success"
      variant="success"
      glass={{
        blurAmount: 15,
        saturation: 180,
        cornerRadius: 12,
        displacementScale: 50,
      }}
    >
      Operation completed successfully with custom glass settings.
    </Callout>
  );
}
```

### Glass Callout in Dark Mode

```jsx
function DarkModeGlassCallout() {
  return (
    <div className="dark-mode" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <Callout
        title="Warning"
        variant="warning"
        glass={true}
      >
        This glass callout works well in dark mode.
      </Callout>
    </div>
  );
}
```

## Accessibility

The Callout component includes comprehensive accessibility features:

### ARIA Attributes

- `role="alert"` - Applied to important callouts (error, warning)
- `role="status"` - Applied to informational callouts
- `aria-live="polite"` - For dynamic content updates
- `aria-label` - Provides accessible labels for close buttons

### Keyboard Navigation

- **Tab** - Moves focus to interactive elements (close button, actions)
- **Enter/Space** - Activates focused buttons
- **Escape** - Closes dismissible callouts (when focused)

### Screen Reader Support

- Callout content is properly announced
- Role attributes help convey importance level
- Close buttons include accessible labels
- Action buttons maintain proper focus order

## Best Practices

### Do's ✅

- Use appropriate variants for different message types
- Provide clear, concise titles and content
- Include relevant icons to enhance understanding
- Use dismissible callouts for non-critical information
- Group related actions together

```jsx
// Good: Clear messaging with appropriate variant
<Callout
  title="Form Validation Error"
  variant="error"
  icon={<Icon name="XCircle" />}
>
  Please correct the highlighted fields before submitting.
</Callout>

// Good: Success message with action
<Callout
  title="Changes Saved"
  variant="success"
  icon={<Icon name="CheckCircle" />}
  onClose={() => setShowSuccess(false)}
  actions={
    <Button label="View Changes" variant="link" size="sm" />
  }
>
  Your profile has been updated successfully.
</Callout>
```

### Don'ts ❌

- Don't overuse callouts - they lose impact
- Don't use callouts for regular content
- Don't make critical error callouts dismissible
- Don't use vague or unclear messaging

```jsx
// Bad: Overuse of callouts
<div>
  <Callout title="Welcome" variant="info">Welcome to our site!</Callout>
  <Callout title="Notice" variant="warning">Please read our terms.</Callout>
  <Callout title="Update" variant="primary">We have new features!</Callout>
  <Callout title="Sale" variant="success">20% off everything!</Callout>
</div>

// Bad: Critical error that's dismissible
<Callout
  title="System Error"
  variant="error"
  onClose={() => setShowError(false)} // Don't allow dismissing critical errors
>
  Unable to save your data. Please try again.
</Callout>
```

## Common Patterns

### Form Validation Messages

```jsx
function FormValidationCallout({ errors, onDismiss }) {
  if (!errors.length) return null;

  return (
    <Callout
      title="Please correct the following errors:"
      variant="error"
      icon={<Icon name="XCircle" />}
      onClose={onDismiss}
    >
      <ul className="u-pl-4 u-mb-0">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </Callout>
  );
}
```

### System Status Messages

```jsx
function SystemStatusCallout({ status }) {
  const getVariant = (status) => {
    switch (status) {
      case 'online': return 'success';
      case 'maintenance': return 'warning';
      case 'offline': return 'error';
      default: return 'info';
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case 'online': return 'CheckCircle';
      case 'maintenance': return 'Wrench';
      case 'offline': return 'XCircle';
      default: return 'Info';
    }
  };

  return (
    <Callout
      title={`System Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`}
      variant={getVariant(status)}
      icon={<Icon name={getIcon(status)} />}
    >
      {status === 'maintenance' && 'Scheduled maintenance in progress.'}
      {status === 'offline' && 'System is currently unavailable.'}
      {status === 'online' && 'All systems operational.'}
    </Callout>
  );
}
```

### Auto-Dismissing Notifications

```jsx
function AutoDismissCallout({ message, duration = 5000, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <Callout
      title="Notification"
      variant="info"
      icon={<Icon name="Bell" />}
      onClose={onDismiss}
      toast
    >
      {message}
    </Callout>
  );
}
```

## Related Components

- **Icon** - Used for callout icons
- **Button** - Used in callout actions
- **Modal** - Alternative for important messages
- **Toast** - Similar notification pattern
- **Alert** - Alternative alert component

## Browser Support

The Callout component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Considerations

- Callouts are lightweight and have minimal performance impact
- Use React.memo for callouts that don't change frequently
- Consider virtualization for large numbers of toast notifications
- Optimize icon rendering for better performance

```jsx
// Optimized callout with memoization
const OptimizedCallout = React.memo(({ title, children, variant, icon }) => {
  return (
    <Callout title={title} variant={variant} icon={icon}>
      {children}
    </Callout>
  );
});
```
