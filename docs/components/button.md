# Button Component

The Button component is a fundamental interactive element used for user actions throughout your application. It supports multiple variants, sizes, and states with both React and vanilla JavaScript implementations.

## Overview

Buttons are used to trigger actions, submit forms, navigate between pages, and perform other interactive tasks. The Atomix Button component provides a consistent interface with built-in accessibility features and customizable styling.

## Props API

### ButtonProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Button text content |
| `onClick` | `() => void` | `undefined` | Click event handler |
| `variant` | `Variant` | `'primary'` | Visual style variant |
| `size` | `Size` | `'md'` | Button size |
| `icon` | `ReactNode` | `undefined` | Icon element to display |
| `iconOnly` | `boolean` | `false` | Show only icon, hide label |
| `rounded` | `boolean` | `false` | Make button fully rounded (pill shape) |
| `disabled` | `boolean` | `false` | Disable button interaction |
| `className` | `string` | `''` | Additional CSS classes |
| `as` | `ElementType` | `'button'` | Render as different element (e.g., 'a', Link) |
| `to` | `string` | `undefined` | Navigation target (when used with router) |
| `href` | `string` | `undefined` | Link URL (when rendered as anchor) |

### Variant Options

- **Theme Colors**: `primary`, `secondary`, `tertiary`, `success`, `warning`, `error`, `info`, `light`, `dark`
- **Outline Variants**: `outline-primary`, `outline-secondary`, etc.
- **Special**: `link` (text-only button)

### Size Options

- `sm` - Small button (compact spacing)
- `md` - Medium button (default)
- `lg` - Large button (generous spacing)

## Usage Examples

### Basic React Usage

```jsx
import React from 'react';
import { Button } from '@shohojdhara/atomix';

function MyComponent() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      {/* Basic button */}
      <Button label="Click me" onClick={handleClick} />
      
      {/* Primary button with icon */}
      <Button 
        label="Save" 
        variant="primary" 
        icon={<Icon name="FloppyDisk" />}
        onClick={handleClick} 
      />
      
      {/* Icon-only button */}
      <Button 
        label="Delete" 
        variant="error" 
        icon={<Icon name="Trash" />}
        iconOnly
        onClick={handleClick} 
      />
      
      {/* Rounded button */}
      <Button 
        label="Subscribe" 
        variant="success" 
        rounded
        onClick={handleClick} 
      />
      
      {/* Disabled button */}
      <Button 
        label="Loading..." 
        disabled
        onClick={handleClick} 
      />
    </div>
  );
}
```

### Advanced React Usage

```jsx
import React from 'react';
import { Button } from '@shohojdhara/atomix';
import { Link } from 'react-router-dom';

function AdvancedExample() {
  return (
    <div>
      {/* Button as link */}
      <Button 
        as="a" 
        href="https://example.com"
        label="External Link"
        variant="link"
      />
      
      {/* Button with router Link */}
      <Button 
        as={Link}
        to="/dashboard"
        label="Go to Dashboard"
        variant="primary"
      />
      
      {/* Button with custom styling */}
      <Button 
        label="Custom Button"
        className="my-custom-button"
        variant="secondary"
        size="lg"
      />
    </div>
  );
}
```

### Vanilla JavaScript Usage

```javascript
// Basic button initialization
const button = new Atomix.Button('.my-button', {
  label: 'Click me',
  variant: 'primary',
  onClick: () => {
    console.log('Button clicked!');
  }
});

// Button with icon
const iconButton = new Atomix.Button('.icon-button', {
  label: 'Save',
  variant: 'success',
  icon: 'FloppyDisk',
  onClick: handleSave
});

// Icon-only button
const iconOnlyButton = new Atomix.Button('.icon-only-button', {
  label: 'Delete',
  variant: 'error',
  icon: 'Trash',
  iconOnly: true,
  onClick: handleDelete
});

// Initialize from data attributes
Atomix.Button.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Basic button -->
<button 
  class="c-button" 
  data-atomix="button"
  data-variant="primary"
  data-label="Click me">
  Click me
</button>

<!-- Button with icon -->
<button 
  class="c-button c-button--success" 
  data-atomix="button"
  data-variant="success"
  data-icon="FloppyDisk"
  data-label="Save">
  <span class="c-button__icon">
    <i class="ph ph-floppy-disk"></i>
  </span>
  <span class="c-button__label">Save</span>
</button>

<!-- Icon-only button -->
<button 
  class="c-button c-button--error c-button--icon-only" 
  data-atomix="button"
  data-variant="error"
  data-icon="Trash"
  data-icon-only="true"
  aria-label="Delete">
  <span class="c-button__icon">
    <i class="ph ph-trash"></i>
  </span>
</button>
```

## Styling

### CSS Classes

The Button component uses the following CSS class structure:

```css
/* Base button */
.c-button {
  /* Base button styles */
}

/* Size modifiers */
.c-button--sm { /* Small button */ }
.c-button--md { /* Medium button (default) */ }
.c-button--lg { /* Large button */ }

/* Variant modifiers */
.c-button--primary { /* Primary variant */ }
.c-button--secondary { /* Secondary variant */ }
.c-button--outline-primary { /* Outline primary */ }
/* ... other variants */

/* State modifiers */
.c-button--rounded { /* Rounded/pill button */ }
.c-button--icon-only { /* Icon-only button */ }
.is-disabled { /* Disabled state */ }

/* Elements */
.c-button__icon { /* Icon container */ }
.c-button__label { /* Label text */ }
```

### Custom Styling

```css
/* Custom button variant */
.c-button--custom {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border: none;
  color: white;
}

.c-button--custom:hover {
  background: linear-gradient(45deg, #ff5252, #26a69a);
}

/* Custom size */
.c-button--xl {
  padding: 1rem 2rem;
  font-size: 1.25rem;
}
```

## Accessibility

The Button component includes comprehensive accessibility features:

### ARIA Attributes

- `role="button"` - Applied when using non-button elements
- `aria-disabled="true"` - Applied when disabled
- `aria-label` - Used for icon-only buttons
- `tabindex="0"` - Ensures keyboard focusability

### Keyboard Navigation

- **Enter/Space** - Activates the button
- **Tab** - Moves focus to/from the button
- **Disabled buttons** - Removed from tab order

### Screen Reader Support

- Button text is announced by screen readers
- Icon-only buttons include accessible labels
- Disabled state is communicated
- Loading states can be announced with `aria-live`

## Best Practices

### Do's ✅

- Use descriptive button labels that clearly indicate the action
- Provide `aria-label` for icon-only buttons
- Use appropriate variants for different action types
- Group related buttons with consistent sizing
- Use loading states for async operations

```jsx
// Good: Clear, descriptive labels
<Button label="Save Changes" variant="primary" />
<Button label="Cancel" variant="secondary" />

// Good: Icon-only with accessible label
<Button 
  label="Close dialog" 
  icon={<Icon name="X" />}
  iconOnly
  aria-label="Close dialog"
/>
```

### Don'ts ❌

- Don't use vague labels like "Click here" or "Submit"
- Don't rely solely on color to convey meaning
- Don't make buttons too small for touch targets
- Don't use too many different variants in one interface

```jsx
// Bad: Vague label
<Button label="Click here" />

// Bad: No accessible label for icon-only
<Button icon={<Icon name="X" />} iconOnly />

// Bad: Too many variants
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="tertiary" />
<Button variant="success" />
<Button variant="warning" />
```

## Common Patterns

### Button Groups

```jsx
function ButtonGroup() {
  return (
    <div className="button-group">
      <Button label="Save" variant="primary" />
      <Button label="Save & Continue" variant="secondary" />
      <Button label="Cancel" variant="link" />
    </div>
  );
}
```

### Loading States

```jsx
function LoadingButton() {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitForm();
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Button 
      label={loading ? "Saving..." : "Save"}
      disabled={loading}
      icon={loading ? <Spinner size="sm" /> : undefined}
      onClick={handleSubmit}
    />
  );
}
```

### Confirmation Actions

```jsx
function DeleteButton({ onDelete }) {
  const [confirming, setConfirming] = useState(false);
  
  if (confirming) {
    return (
      <div className="confirmation-buttons">
        <Button 
          label="Confirm Delete" 
          variant="error" 
          onClick={onDelete}
        />
        <Button 
          label="Cancel" 
          variant="link" 
          onClick={() => setConfirming(false)}
        />
      </div>
    );
  }
  
  return (
    <Button 
      label="Delete" 
      variant="outline-error"
      onClick={() => setConfirming(true)}
    />
  );
}
```

## Related Components

- **Icon** - Used within buttons for visual enhancement
- **Spinner** - Used for loading states
- **Tooltip** - Can provide additional context for icon-only buttons
- **FormGroup** - Buttons are commonly used in forms

## Browser Support

The Button component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Migration Guide

### From v1.x to v2.x

```jsx
// v1.x
<Button text="Click me" color="primary" />

// v2.x
<Button label="Click me" variant="primary" />
```

The main changes:
- `text` prop renamed to `label`
- `color` prop renamed to `variant`
- Added support for `as` prop for polymorphic rendering
