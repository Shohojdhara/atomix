# Button

The Button component is a fundamental interactive element that allows users to trigger actions or navigate through your application. It supports multiple variants, sizes, icons, and states to fit various use cases.

## Overview

The Button component provides a consistent and accessible way to create clickable elements. It can be rendered as a native `button` element or as other elements like links using the `as` prop for maximum flexibility.

## Installation

The Button component is included in the Atomix package. Import it in your React components:

```jsx
import { Button } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the button styles and functionality are available through the CSS classes and JavaScript modules.

## Basic Usage

### React

```jsx
import { Button } from '@shohojdhara/atomix';

function MyComponent() {
  return (
    <div>
      {/* Using label prop */}
      <Button label="Primary Button" />
      <Button label="Secondary Button" variant="secondary" />
      <Button label="Disabled Button" disabled />
      
      {/* Using children */}
      <Button variant="primary">
        Button with Children
      </Button>
    </div>
  );
}
```

## Content Options

The Button component supports two ways to provide content:

### Using Label Prop

```jsx
<Button label="Click Me" variant="primary" />
```

### Using Children

```jsx
<Button variant="primary">
  Click Me
</Button>
```

### With Icon (Children)

```jsx
import { Button, Icon } from '@shohojdhara/atomix';

<Button variant="primary">
  <Icon name="plus" />
  Add Item
</Button>
```

**Note:** Use either `label` or `children`, not both. If both are provided, `children` will take precedence.

### HTML/CSS

```html
<!-- Primary button -->
<button class="c-button c-button--primary">Primary Button</button>

<!-- Secondary button -->
<button class="c-button c-button--secondary">Secondary Button</button>

<!-- Disabled button -->
<button class="c-button c-button--primary" disabled>Disabled Button</button>
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | - | No* | The text content of the button (use label OR children) |
| `children` | `ReactNode` | - | No* | Button content (use label OR children) |
| `variant` | `Variant` | `'primary'` | No | Visual style variant of the button |
| `size` | `Size` | `'md'` | No | Size of the button (`'sm'`, `'md'`, `'lg'`) |
| `disabled` | `boolean` | `false` | No | Whether the button is disabled |
| `icon` | `ReactNode` | - | No | Optional icon element to display |
| `iconOnly` | `boolean` | `false` | No | Whether to show only the icon (hides label visually) |
| `rounded` | `boolean` | `false` | No | Whether to apply fully rounded (pill) styling |
| `onClick` | `() => void` | - | No | Click event handler |
| `as` | `ElementType` | `'button'` | No | The element type to render as |
| `className` | `string` | `''` | No | Additional CSS classes |
| `glass` | `boolean \| AtomixGlassProps` | `false` | No | Glass morphism effect for the button |
| `style` | `React.CSSProperties` | - | No | Custom style for the button |

\*Note: Either `label` or `children` must be provided, but not both. If both are provided, `children` will take precedence.

### Variant Options

The `variant` prop accepts the following values:

#### Solid Variants
- `'primary'` - Primary brand color
- `'secondary'` - Secondary color
- `'success'` - Green success color
- `'info'` - Blue informational color
- `'warning'` - Yellow/orange warning color
- `'error'` - Red error/danger color
- `'light'` - Light gray
- `'dark'` - Dark gray/black

#### Outline Variants
- `'outline-primary'` - Outlined primary
- `'outline-secondary'` - Outlined secondary
- `'outline-success'` - Outlined success
- `'outline-info'` - Outlined info
- `'outline-warning'` - Outlined warning
- `'outline-error'` - Outlined error
- `'outline-light'` - Outlined light
- `'outline-dark'` - Outlined dark

#### Special Variants
- `'link'` - Styled as a text link

### Size Options

- `'sm'` - Small button (32px height)
- `'md'` - Medium button (40px height) - Default
- `'lg'` - Large button (48px height)

## Examples

### Button Variants

```jsx
// Solid variants
<Button label="Primary" variant="primary" />
<Button label="Secondary" variant="secondary" />
<Button label="Success" variant="success" />
<Button label="Error" variant="error" />

// Outline variants
<Button label="Outline Primary" variant="outline-primary" />
<Button label="Outline Secondary" variant="outline-secondary" />

// Link variant
<Button label="Link Button" variant="link" />
```

### Button Sizes

```jsx
<Button label="Small" variant="primary" size="sm" />
<Button label="Medium" variant="primary" size="md" />
<Button label="Large" variant="primary" size="lg" />
```

### Buttons with Icons

```jsx
import { Icon } from '@shohojdhara/atomix';

// Button with icon and text
<Button
  label="Save Document"
  variant="primary"
  icon={<Icon name="Save" />}
/>

// Icon-only button
<Button
  label="Delete"
  variant="error"
  icon={<Icon name="Trash" />}
  iconOnly
/>
```

### Rounded Buttons

```jsx
<Button label="Rounded Button" variant="primary" rounded />
<Button
  label="Rounded with Icon"
  variant="secondary"
  icon={<Icon name="Heart" />}
  rounded
/>
```

### Button as Link

```jsx
// Render as an anchor tag
<Button
  label="Visit Website"
  variant="link"
  as="a"
  href="https://example.com"
  target="_blank"
/>

// Render with React Router Link (requires React Router)
<Button
  label="Go to Dashboard"
  variant="primary"
  as={Link}
  to="/dashboard"
/>
```

### Interactive Examples

```jsx
function InteractiveExample() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <Button
        label={`Clicked ${count} times`}
        onClick={() => setCount(count + 1)}
        variant="primary"
      />
    </div>
  );
}
```

## Accessibility

The Button component follows WCAG accessibility guidelines:

### Keyboard Support

- **Space/Enter**: Activates the button
- **Tab**: Moves focus to the button
- **Shift + Tab**: Moves focus away from the button

### ARIA Attributes

- `aria-disabled="true"` is applied when `disabled={true}`
- `role="button"` is automatically applied when using non-button elements
- Icon-only buttons should include `aria-label` for screen readers

### Best Practices

1. **Always provide descriptive text**: Use clear, actionable language
2. **Use appropriate variants**: Match the button style to its importance and context
3. **Include focus indicators**: The component provides default focus styles
4. **Icon-only buttons**: Always include accessible text via `aria-label` or tooltip

```jsx
// Good: Icon-only button with accessible label
<Button
  label="Delete item"
  icon={<Icon name="Trash" />}
  iconOnly
  variant="error"
  aria-label="Delete this item permanently"
/>
```

## Styling

### CSS Custom Properties

The Button component uses CSS custom properties for theming:

```css
:root {
  /* Button base properties */
  --atomix-btn-font-family: inherit;
  --atomix-btn-font-weight: 500;
  --atomix-btn-line-height: 1.5;
  --atomix-btn-border-width: 1px;
  --atomix-btn-border-radius: var(--atomix-border-radius);

  /* Button sizes */
  --atomix-btn-sm-padding-x: 0.75rem;
  --atomix-btn-sm-padding-y: 0.375rem;
  --atomix-btn-sm-font-size: 0.875rem;

  --atomix-btn-md-padding-x: 1rem;
  --atomix-btn-md-padding-y: 0.5rem;
  --atomix-btn-md-font-size: 1rem;

  --atomix-btn-lg-padding-x: 1.25rem;
  --atomix-btn-lg-padding-y: 0.75rem;
  --atomix-btn-lg-font-size: 1.125rem;

  /* Button colors - Primary variant */
  --atomix-btn-primary-color: var(--atomix-white);
  --atomix-btn-primary-bg: var(--atomix-primary);
  --atomix-btn-primary-border-color: var(--atomix-primary);
  --atomix-btn-primary-hover-bg: var(--atomix-primary-dark);
  --atomix-btn-primary-hover-border-color: var(--atomix-primary-dark);
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base button class */
.c-button {
  /* Base button styles */
}

/* Size modifiers */
.c-button--sm { /* Small size styles */ }
.c-button--md { /* Medium size styles */ }
.c-button--lg { /* Large size styles */ }

/* Variant modifiers */
.c-button--primary { /* Primary variant styles */ }
.c-button--secondary { /* Secondary variant styles */ }
.c-button--outline-primary { /* Outline primary styles */ }

/* State modifiers */
.c-button:disabled { /* Disabled state styles */ }
.c-button:hover { /* Hover state styles */ }
.c-button:focus { /* Focus state styles */ }

/* Special modifiers */
.c-button--rounded { /* Rounded/pill styling */ }
.c-button--icon-only { /* Icon-only button styles */ }
```

### Customization Examples

```css
/* Custom button variant */
.c-button--custom {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border: none;
  color: white;
}

.c-button--custom:hover {
  background: linear-gradient(45deg, #ff5252, #ff9f43);
  transform: translateY(-1px);
}

/* Custom rounded style */
.c-button--pill {
  border-radius: 2rem;
}

/* Custom icon spacing */
.c-button .button__icon {
  margin-right: 0.5rem;
}

.c-button--icon-only .button__icon {
  margin-right: 0;
}
```

## Integration with Forms

The Button component integrates seamlessly with form libraries:

### With HTML Forms

```jsx
<form onSubmit={handleSubmit}>
  <input type="text" name="username" />
  <Button
    label="Submit"
    type="submit"
    variant="primary"
  />
  <Button
    label="Reset"
    type="reset"
    variant="secondary"
  />
</form>
```

### With React Hook Form

```jsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const { handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      <Button
        label="Submit Form"
        type="submit"
        variant="primary"
      />
    </form>
  );
}
```

## Performance Considerations

1. **Icon optimization**: Use SVG icons for best performance and scalability
2. **Event handlers**: Use `useCallback` for onClick handlers in parent components to prevent unnecessary re-renders
3. **Bundle size**: Import only the icons you need when using icon libraries

```jsx
// Optimized example
const MyComponent = memo(() => {
  const handleClick = useCallback(() => {
    // Handle click logic
  }, []);

  return (
    <Button
      label="Optimized Button"
      onClick={handleClick}
      variant="primary"
    />
  );
});
```

## Common Patterns

### Loading States

```jsx
function LoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await api.saveData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      label={loading ? "Saving..." : "Save"}
      onClick={handleClick}
      disabled={loading}
      icon={loading ? <Spinner size="sm" /> : <Icon name="Save" />}
      variant="primary"
    />
  );
}
```

### Button Groups

```jsx
<div className="button-group">
  <Button label="Option 1" variant="outline-primary" />
  <Button label="Option 2" variant="outline-primary" />
  <Button label="Option 3" variant="outline-primary" />
</div>
```

### Confirmation Patterns

```jsx
function DeleteButton({ onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div>
        <span>Are you sure?</span>
        <Button
          label="Yes, Delete"
          onClick={onDelete}
          variant="error"
          size="sm"
        />
        <Button
          label="Cancel"
          onClick={() => setShowConfirm(false)}
          variant="outline-secondary"
          size="sm"
        />
      </div>
    );
  }

  return (
    <Button
      label="Delete"
      onClick={() => setShowConfirm(true)}
      variant="outline-error"
    />
  );
}
```

## Browser Support

The Button component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

For older browser support, ensure you have appropriate polyfills for:
- CSS Custom Properties
- Flexbox
- ES6+ features (if using the JavaScript functionality)

## Related Components

- **[Icon](./icon.mdx)** - For adding icons to buttons
- **[Spinner](./spinner.mdx)** - For loading states
- **[Tooltip](./tooltip.mdx)** - For additional button context
- **[Modal](./modal.mdx)** - Often triggered by buttons
- **[Dropdown](./dropdown.mdx)** - Can use buttons as triggers

## Migration Guide

### From v1.x to v2.x

```jsx
// v1.x (deprecated)
<Button type="primary" onClick={handleClick}>
  Button Text
</Button>

// v2.x (current)
<Button label="Button Text" variant="primary" onClick={handleClick} />
```

### From Custom Buttons

```jsx
// Before (custom button)
<button className="my-custom-btn primary" onClick={handleClick}>
  <Icon name="save" />
  Save Document
</button>

// After (Atomix Button)
<Button
  label="Save Document"
  variant="primary"
  icon={<Icon name="Save" />}
  onClick={handleClick}
/>
```
