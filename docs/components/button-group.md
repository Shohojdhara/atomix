# ButtonGroup

The ButtonGroup component groups multiple buttons together, creating a visually connected set of buttons with proper border radius handling. Buttons in a group share borders and have rounded corners only on the outer edges, creating a cohesive button toolbar or action group.

## Overview

ButtonGroup is a layout component that wraps multiple Button components and automatically handles their visual connection. It removes border radius from inner buttons and ensures only the first and last buttons have rounded corners on their outer edges. This creates a seamless, connected appearance perfect for toolbars, filter groups, navigation controls, and related action sets.

## Installation

The ButtonGroup component is included in the Atomix package. Import it in your React components:

```jsx
import { ButtonGroup, Button } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the button group styles are available through CSS classes.

## Basic Usage

### React

```jsx
import { ButtonGroup, Button } from '@shohojdhara/atomix';

function BasicExample() {
  return (
    <ButtonGroup>
      <Button label="Left" />
      <Button label="Middle" />
      <Button label="Right" />
    </ButtonGroup>
  );
}
```

### HTML/CSS

```html
<!-- Basic button group -->
<div class="c-btn-group" role="group" aria-label="Action buttons">
  <button class="c-btn c-btn--primary">Left</button>
  <button class="c-btn c-btn--primary">Middle</button>
  <button class="c-btn c-btn--primary">Right</button>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | Yes | Button components to group together (should be Button components) |
| `className` | `string` | `''` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | - | No | Inline style for the component root element |
| `aria-label` | `string` | - | No | ARIA label for accessibility (describes the group's purpose) |
| `role` | `string` | `'group'` | No | ARIA role for the button group |

### Component Behavior

- **Automatic Filtering**: Only valid Button components are rendered. Non-Button children are filtered out.
- **Border Radius Handling**: Automatically removes border radius from inner buttons and adjusts outer buttons.
- **Shared Borders**: Buttons share borders with negative margin to create seamless connection.
- **Flex Layout**: Uses `inline-flex` display for horizontal grouping.

## Examples

### Basic Button Groups

#### Two Buttons

```jsx
<ButtonGroup>
  <Button label="Cancel" variant="secondary" />
  <Button label="Save" variant="primary" />
</ButtonGroup>
```

#### Three Buttons

```jsx
<ButtonGroup>
  <Button label="Previous" variant="secondary" />
  <Button label="Next" variant="primary" />
  <Button label="Finish" variant="success" />
</ButtonGroup>
```

### Variant Combinations

#### Uniform Variants

```jsx
// All primary buttons
<ButtonGroup>
  <Button label="One" variant="primary" />
  <Button label="Two" variant="primary" />
  <Button label="Three" variant="primary" />
</ButtonGroup>

// All secondary buttons
<ButtonGroup>
  <Button label="One" variant="secondary" />
  <Button label="Two" variant="secondary" />
  <Button label="Three" variant="secondary" />
</ButtonGroup>

// All outline buttons
<ButtonGroup>
  <Button label="One" variant="outline-primary" />
  <Button label="Two" variant="outline-primary" />
  <Button label="Three" variant="outline-primary" />
</ButtonGroup>
```

#### Mixed Variants

```jsx
<ButtonGroup>
  <Button label="Cancel" variant="secondary" />
  <Button label="Save Draft" variant="outline-primary" />
  <Button label="Publish" variant="primary" />
</ButtonGroup>
```

### Size Variants

All buttons in a group should use the same size for visual consistency:

```jsx
// Small buttons
<ButtonGroup>
  <Button label="Small" size="sm" />
  <Button label="Buttons" size="sm" />
  <Button label="Group" size="sm" />
</ButtonGroup>

// Medium buttons (default)
<ButtonGroup>
  <Button label="Medium" size="md" />
  <Button label="Buttons" size="md" />
  <Button label="Group" size="md" />
</ButtonGroup>

// Large buttons
<ButtonGroup>
  <Button label="Large" size="lg" />
  <Button label="Buttons" size="lg" />
  <Button label="Group" size="lg" />
</ButtonGroup>
```

### Buttons with Icons

```jsx
<ButtonGroup>
  <Button 
    label="Previous" 
    iconName="ArrowLeft" 
    iconPosition="start" 
  />
  <Button 
    label="Next" 
    iconName="ArrowRight" 
    iconPosition="end" 
  />
</ButtonGroup>
```

#### Icon-Only Buttons

```jsx
<ButtonGroup aria-label="Navigation controls">
  <Button 
    iconName="CaretLeft" 
    iconOnly 
    ariaLabel="Previous" 
  />
  <Button 
    iconName="CaretRight" 
    iconOnly 
    ariaLabel="Next" 
  />
</ButtonGroup>
```

### Button States

#### Disabled Buttons

```jsx
<ButtonGroup>
  <Button label="Enabled" />
  <Button label="Disabled" disabled />
  <Button label="Enabled" />
</ButtonGroup>
```

#### Loading States

```jsx
<ButtonGroup>
  <Button label="Normal" />
  <Button label="Loading" loading />
  <Button label="Normal" />
</ButtonGroup>
```

#### Active State

```jsx
<ButtonGroup>
  <Button label="Inactive" />
  <Button label="Active" active />
  <Button label="Inactive" />
</ButtonGroup>
```

#### Selected State

```jsx
function FilterButtons() {
  const [selected, setSelected] = useState('all');

  return (
    <ButtonGroup aria-label="Filter options">
      <Button 
        label="All" 
        selected={selected === 'all'}
        onClick={() => setSelected('all')}
      />
      <Button 
        label="Active" 
        selected={selected === 'active'}
        onClick={() => setSelected('active')}
      />
      <Button 
        label="Completed" 
        selected={selected === 'completed'}
        onClick={() => setSelected('completed')}
      />
    </ButtonGroup>
  );
}
```

### Common Use Cases

#### Action Buttons

```jsx
<ButtonGroup>
  <Button label="Delete" variant="error" />
  <Button label="Edit" variant="warning" />
  <Button label="View" variant="info" />
</ButtonGroup>
```

#### Navigation Controls

```jsx
<ButtonGroup aria-label="Pagination controls">
  <Button label="First" variant="outline-secondary" />
  <Button label="Previous" variant="outline-secondary" />
  <Button label="Next" variant="outline-secondary" />
  <Button label="Last" variant="outline-secondary" />
</ButtonGroup>
```

#### Filter/Toggle Buttons

```jsx
function FilterGroup() {
  const [filter, setFilter] = useState('all');

  return (
    <ButtonGroup aria-label="Content filter">
      <Button 
        label="All" 
        variant="outline-primary"
        selected={filter === 'all'}
        onClick={() => setFilter('all')}
      />
      <Button 
        label="Active" 
        variant="outline-primary"
        selected={filter === 'active'}
        onClick={() => setFilter('active')}
      />
      <Button 
        label="Completed" 
        variant="outline-primary"
        selected={filter === 'completed'}
        onClick={() => setFilter('completed')}
      />
    </ButtonGroup>
  );
}
```

### Multiple Groups

You can use multiple ButtonGroups on the same page:

```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
  <ButtonGroup>
    <Button label="Group 1 - Button 1" />
    <Button label="Group 1 - Button 2" />
    <Button label="Group 1 - Button 3" />
  </ButtonGroup>
  <ButtonGroup>
    <Button label="Group 2 - Button 1" variant="secondary" />
    <Button label="Group 2 - Button 2" variant="secondary" />
  </ButtonGroup>
</div>
```

### Rounded Buttons

When using rounded buttons in a group, the rounded effect is maintained on outer edges:

```jsx
<ButtonGroup>
  <Button label="Rounded" rounded />
  <Button label="Buttons" rounded />
  <Button label="Group" rounded />
</ButtonGroup>
```

### Full Width Groups

```jsx
<div style={{ width: '100%', maxWidth: '600px' }}>
  <ButtonGroup>
    <Button label="Full" fullWidth />
    <Button label="Width" fullWidth />
    <Button label="Group" fullWidth />
  </ButtonGroup>
</div>
```

### Custom Styling

```jsx
<ButtonGroup 
  className="custom-button-group"
  style={{ marginTop: '2rem' }}
>
  <Button label="Custom" />
  <Button label="Styled" />
  <Button label="Group" />
</ButtonGroup>
```

## Accessibility

The ButtonGroup component follows WCAG accessibility guidelines:

### ARIA Attributes

- **`role="group"`**: Applied by default to indicate a group of related buttons
- **`aria-label`**: Should be provided to describe the group's purpose

### Best Practices

1. **Always provide `aria-label`**: Describe what the button group represents
   ```jsx
   <ButtonGroup aria-label="Form actions">
     <Button label="Cancel" />
     <Button label="Submit" />
   </ButtonGroup>
   ```

2. **Consistent button states**: Ensure all buttons in a group have consistent states (all enabled, or clearly indicate which are disabled)

3. **Keyboard navigation**: Each button maintains its own keyboard focus, allowing users to navigate through the group with Tab/Shift+Tab

4. **Icon-only buttons**: When using icon-only buttons in a group, ensure each has a descriptive `aria-label`
   ```jsx
   <ButtonGroup aria-label="Media controls">
     <Button iconName="Play" iconOnly ariaLabel="Play" />
     <Button iconName="Pause" iconOnly ariaLabel="Pause" />
     <Button iconName="Stop" iconOnly ariaLabel="Stop" />
   </ButtonGroup>
   ```

### Screen Reader Support

- Button groups are announced as a group with the provided `aria-label`
- Individual buttons maintain their own accessible names
- Disabled buttons are properly announced
- Selected/active states are communicated

## Styling

### CSS Classes

The ButtonGroup component uses BEM methodology:

```css
/* Base button group class */
.c-btn-group {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

/* Button styling within group */
.c-btn-group .c-btn {
  flex: 1 1 auto;
  position: relative;
}

/* Border radius handling */
.c-btn-group .c-btn:not(:first-child):not(:last-child) {
  border-radius: 0px;
}

.c-btn-group .c-btn:first-child:not(:last-child) {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.c-btn-group .c-btn:last-child:not(:first-child) {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

/* Shared borders */
.c-btn-group .c-btn + .c-btn {
  margin-left: calc(var(--atomix-btn-border-width) * -1);
}
```

### CSS Custom Properties

The ButtonGroup component uses CSS custom properties for spacing:

```css
.c-btn-group {
  --atomix-btn-group-gap: 0.75rem; /* Default gap between buttons */
}
```

### Customization Examples

```css
/* Custom button group spacing */
.custom-button-group {
  gap: 1rem;
}

/* Vertical button group */
.vertical-button-group {
  flex-direction: column;
}

.vertical-button-group .c-btn + .c-btn {
  margin-left: 0;
  margin-top: calc(var(--atomix-btn-border-width) * -1);
}

/* Full width button group */
.full-width-button-group {
  width: 100%;
  display: flex;
}
```

## Best Practices

### Design Guidelines

1. **Consistent sizing**: Use the same size for all buttons in a group
   ```jsx
   // ✅ Good - consistent sizes
   <ButtonGroup>
     <Button label="One" size="md" />
     <Button label="Two" size="md" />
   </ButtonGroup>

   // ❌ Avoid - mixed sizes
   <ButtonGroup>
     <Button label="One" size="sm" />
     <Button label="Two" size="lg" />
   </ButtonGroup>
   ```

2. **Logical grouping**: Group related actions together
   ```jsx
   // ✅ Good - related actions
   <ButtonGroup>
     <Button label="Save" />
     <Button label="Cancel" />
   </ButtonGroup>

   // ❌ Avoid - unrelated actions
   <ButtonGroup>
     <Button label="Save" />
     <Button label="Print" />
     <Button label="Share" />
   </ButtonGroup>
   ```

3. **Limit group size**: Keep groups to 2-5 buttons for best usability
   ```jsx
   // ✅ Good - manageable size
   <ButtonGroup>
     <Button label="First" />
     <Button label="Previous" />
     <Button label="Next" />
     <Button label="Last" />
   </ButtonGroup>
   ```

4. **Visual hierarchy**: Use variant colors to indicate importance
   ```jsx
   <ButtonGroup>
     <Button label="Cancel" variant="secondary" />
     <Button label="Save Draft" variant="outline-primary" />
     <Button label="Publish" variant="primary" />
   </ButtonGroup>
   ```

### Usage Patterns

1. **Form actions**: Group submit/cancel buttons
2. **Navigation**: Group pagination or step navigation buttons
3. **Filters**: Group filter/toggle buttons
4. **Toolbars**: Group related toolbar actions
5. **Toggle groups**: Group mutually exclusive options

### When NOT to Use ButtonGroup

- **Unrelated actions**: Don't group unrelated buttons just for visual consistency
- **Single button**: Don't wrap a single button in a ButtonGroup
- **Different contexts**: Don't group buttons that belong to different UI sections
- **Very large groups**: Consider pagination or dropdowns for 6+ buttons

## Edge Cases

### Single Button

While ButtonGroup works with a single button, it's generally unnecessary:

```jsx
// Works but not recommended
<ButtonGroup>
  <Button label="Single Button" />
</ButtonGroup>

// Prefer standalone button
<Button label="Single Button" />
```

### Many Buttons

For groups with many buttons, consider alternatives:

```jsx
// Consider pagination or dropdown for many buttons
<ButtonGroup>
  <Button label="1" />
  <Button label="2" />
  <Button label="3" />
  <Button label="4" />
  <Button label="5" />
  <Button label="6" />
  {/* Consider: More... dropdown */}
</ButtonGroup>
```

### Non-Button Children

ButtonGroup automatically filters out non-Button children:

```jsx
<ButtonGroup>
  <Button label="Button 1" />
  <span>This will be filtered out</span>
  <Button label="Button 2" />
  <div>This will also be filtered out</div>
</ButtonGroup>
```

## Integration Examples

### With Forms

```jsx
function FormExample() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <input type="text" name="username" />
      
      <ButtonGroup>
        <Button 
          label="Cancel" 
          type="button"
          variant="secondary"
          onClick={() => history.back()}
        />
        <Button 
          label="Submit" 
          type="submit"
          variant="primary"
        />
      </ButtonGroup>
    </form>
  );
}
```

### With State Management

```jsx
function FilterExample() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <ButtonGroup aria-label="Content filter">
      <Button
        label="All"
        variant="outline-primary"
        selected={activeFilter === 'all'}
        onClick={() => setActiveFilter('all')}
      />
      <Button
        label="Active"
        variant="outline-primary"
        selected={activeFilter === 'active'}
        onClick={() => setActiveFilter('active')}
      />
      <Button
        label="Completed"
        variant="outline-primary"
        selected={activeFilter === 'completed'}
        onClick={() => setActiveFilter('completed')}
      />
    </ButtonGroup>
  );
}
```

### With Loading States

```jsx
function AsyncActionExample() {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ButtonGroup>
      <Button 
        label="Cancel" 
        variant="secondary"
        disabled={loading}
      />
      <Button 
        label="Save" 
        variant="primary"
        loading={loading}
        onClick={handleSave}
      />
    </ButtonGroup>
  );
}
```

## Browser Support

The ButtonGroup component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[Button](./button.md)** - Individual button component used within groups
- **[Badge](./badge.md)** - Can be used alongside button groups for status indicators
- **[Tooltip](./tooltip.md)** - Can provide additional context for buttons in groups

## Migration Guide

### From Custom Button Groups

```jsx
// Before (custom implementation)
<div className="my-button-group">
  <button className="btn">Left</button>
  <button className="btn">Right</button>
</div>

// After (Atomix ButtonGroup)
<ButtonGroup>
  <Button label="Left" />
  <Button label="Right" />
</ButtonGroup>
```

### From Bootstrap Button Groups

```jsx
// Before (Bootstrap)
<div className="btn-group" role="group">
  <button type="button" className="btn btn-primary">Left</button>
  <button type="button" className="btn btn-primary">Right</button>
</div>

// After (Atomix ButtonGroup)
<ButtonGroup aria-label="Action buttons">
  <Button label="Left" variant="primary" />
  <Button label="Right" variant="primary" />
</ButtonGroup>
```

