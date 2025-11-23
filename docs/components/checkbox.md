# Checkbox

The Checkbox component provides a boolean input control with support for checked, unchecked, and indeterminate states. It's ideal for single selections, multiple selections, and toggle functionality.

## Overview

The Checkbox component is a flexible input control that allows users to select one or more options from a set. It supports standard checked/unchecked states, indeterminate state for parent checkboxes, and integrates seamlessly with form validation.

## Installation

The Checkbox component is included in the Atomix package. Import it in your React components:

```jsx
import { Checkbox } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, checkbox styles are available through CSS classes.

## Basic Usage

### React

```jsx
import { Checkbox, FormGroup } from '@shohojdhara/atomix';

function MyComponent() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="I agree to the terms and conditions"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}
```

### HTML/CSS

```html
<label class="c-checkbox">
  <input type="checkbox" class="c-checkbox__input" />
  <span class="c-checkbox__label">Checkbox label</span>
</label>
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `ReactNode` | - | No | Checkbox label text or element |
| `checked` | `boolean` | `false` | No | Whether the checkbox is checked |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | - | No | Change event handler |
| `disabled` | `boolean` | `false` | No | Whether the checkbox is disabled |
| `required` | `boolean` | `false` | No | Whether the checkbox is required |
| `id` | `string` | - | No | Checkbox ID |
| `name` | `string` | - | No | Checkbox name attribute |
| `value` | `string` | - | No | Checkbox value attribute |
| `indeterminate` | `boolean` | `false` | No | Whether the checkbox is in indeterminate state |
| `invalid` | `boolean` | `false` | No | Whether the checkbox has validation errors |
| `valid` | `boolean` | `false` | No | Whether the checkbox has passed validation |
| `ariaLabel` | `string` | - | No | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | - | No | ARIA described-by attribute |
| `glass` | `boolean \| AtomixGlassProps` | `false` | No | Enable glass morphism effect |
| `className` | `string` | `''` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | - | No | Custom style object |

## Examples

### Basic Checkbox

```jsx
function BasicCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Accept terms and conditions"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}
```

### Checkbox Group

```jsx
function CheckboxGroup() {
  const [selected, setSelected] = useState({
    email: false,
    sms: false,
    push: false,
  });

  const handleChange = (key) => (e) => {
    setSelected(prev => ({
      ...prev,
      [key]: e.target.checked,
    }));
  };

  return (
    <div className="u-gap-3">
      <h3>Notification Preferences</h3>
      <Checkbox
        label="Email notifications"
        checked={selected.email}
        onChange={handleChange('email')}
      />
      <Checkbox
        label="SMS notifications"
        checked={selected.sms}
        onChange={handleChange('sms')}
      />
      <Checkbox
        label="Push notifications"
        checked={selected.push}
        onChange={handleChange('push')}
      />
    </div>
  );
}
```

### Indeterminate State

```jsx
function IndeterminateCheckbox() {
  const [allChecked, setAllChecked] = useState(false);
  const [items, setItems] = useState({
    item1: false,
    item2: false,
    item3: false,
  });

  const allItemsChecked = Object.values(items).every(Boolean);
  const someItemsChecked = Object.values(items).some(Boolean);

  useEffect(() => {
    setAllChecked(allItemsChecked);
  }, [allItemsChecked]);

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setItems({
      item1: checked,
      item2: checked,
      item3: checked,
    });
  };

  return (
    <div className="u-gap-3">
      <Checkbox
        label="Select All"
        checked={allChecked}
        indeterminate={someItemsChecked && !allChecked}
        onChange={handleSelectAll}
      />
      <div className="u-pl-4 u-gap-2">
        <Checkbox
          label="Item 1"
          checked={items.item1}
          onChange={(e) => setItems(prev => ({ ...prev, item1: e.target.checked }))}
        />
        <Checkbox
          label="Item 2"
          checked={items.item2}
          onChange={(e) => setItems(prev => ({ ...prev, item2: e.target.checked }))}
        />
        <Checkbox
          label="Item 3"
          checked={items.item3}
          onChange={(e) => setItems(prev => ({ ...prev, item3: e.target.checked }))}
        />
      </div>
    </div>
  );
}
```

### With Description

```jsx
function CheckboxWithDescription() {
  return (
    <div>
      <Checkbox
        label={
          <div>
            <div>Enable two-factor authentication</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7, marginTop: '0.25rem' }}>
              Add an extra layer of security to your account
            </div>
          </div>
        }
      />
    </div>
  );
}
```

### Disabled State

```jsx
function DisabledCheckbox() {
  return (
    <div className="u-gap-3">
      <Checkbox
        label="Enabled checkbox"
        checked={true}
      />
      <Checkbox
        label="Disabled unchecked"
        disabled
      />
      <Checkbox
        label="Disabled checked"
        checked={true}
        disabled
      />
    </div>
  );
}
```

### Validation States

```jsx
function ValidationStates() {
  const [checked, setChecked] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (e) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    setIsInvalid(!newChecked);
  };

  return (
    <FormGroup
      helperText={isInvalid ? "You must accept the terms" : ""}
      invalid={isInvalid}
    >
      <Checkbox
        label="I accept the terms and conditions"
        checked={checked}
        onChange={handleChange}
        invalid={isInvalid}
        required
      />
    </FormGroup>
  );
}
```

### Glass Effect

```jsx
function GlassCheckbox() {
  return (
    <div
      style={{
        background: 'url(https://example.com/background.jpg)',
        padding: '2rem',
        borderRadius: '12px',
        backgroundSize: 'cover',
      }}
    >
      <Checkbox
        label="Glass effect checkbox"
        glass={true}
      />
    </div>
  );
}
```

## Accessibility

The Checkbox component follows WCAG accessibility guidelines:

### Keyboard Support

- **Tab**: Moves focus to the checkbox
- **Shift + Tab**: Moves focus away from the checkbox
- **Space**: Toggles the checkbox state
- **Enter**: Toggles the checkbox state (when focused)

### ARIA Attributes

- `aria-label` - Accessible label when no visible label is present
- `aria-describedby` - References helper text or error messages
- `aria-invalid` - Indicates validation state
- `aria-checked` - Indicates checked state (including indeterminate)

### Best Practices

1. **Always provide labels**: Use the `label` prop or provide `aria-label`
   ```jsx
   <Checkbox label="I agree" />
   // or
   <Checkbox ariaLabel="I agree to terms" />
   ```

2. **Use FormGroup for validation**:
   ```jsx
   <FormGroup
     helperText="You must accept the terms"
     invalid={!checked}
   >
     <Checkbox
       label="Accept terms"
       checked={checked}
       invalid={!checked}
     />
   </FormGroup>
   ```

3. **Group related checkboxes**:
   ```jsx
   <fieldset>
     <legend>Notification Preferences</legend>
     <Checkbox label="Email" />
     <Checkbox label="SMS" />
     <Checkbox label="Push" />
   </fieldset>
   ```

4. **Use indeterminate for parent checkboxes**:
   ```jsx
   <Checkbox
     label="Select All"
     indeterminate={someSelected && !allSelected}
     checked={allSelected}
   />
   ```

## Styling

### CSS Custom Properties

The Checkbox component uses CSS custom properties for theming:

```css
:root {
  --atomix-checkbox-size: 1.25rem;
  --atomix-checkbox-border-width: 2px;
  --atomix-checkbox-border-radius: 4px;
  --atomix-checkbox-check-color: var(--atomix-white);
  --atomix-checkbox-bg: var(--atomix-white);
  --atomix-checkbox-border-color: var(--atomix-border-color);
  --atomix-checkbox-checked-bg: var(--atomix-primary);
  --atomix-checkbox-checked-border-color: var(--atomix-primary);
}
```

### CSS Classes

The component uses BEM methodology:

```css
.c-checkbox { /* Base checkbox class */ }
.c-checkbox__input { /* Checkbox input element */ }
.c-checkbox__label { /* Checkbox label */ }
.c-checkbox--disabled { /* Disabled state */ }
.c-checkbox--invalid { /* Invalid state */ }
.c-checkbox--valid { /* Valid state */ }
.c-checkbox--glass { /* Glass effect */ }
```

## Integration with Forms

### With FormGroup

```jsx
<FormGroup
  helperText="You must accept to continue"
  invalid={!checked}
>
  <Checkbox
    label="I accept the terms"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    invalid={!checked}
    required
  />
</FormGroup>
```

### With React Hook Form

```jsx
import { useForm, Controller } from 'react-hook-form';

function FormWithCheckbox() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="acceptTerms"
        control={control}
        rules={{ required: 'You must accept the terms' }}
        render={({ field, fieldState }) => (
          <FormGroup
            helperText={fieldState.error?.message}
            invalid={!!fieldState.error}
          >
            <Checkbox
              {...field}
              checked={field.value}
              label="I accept the terms"
              invalid={!!fieldState.error}
            />
          </FormGroup>
        )}
      />
    </form>
  );
}
```

## Common Patterns

### Terms Acceptance

```jsx
function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false);

  return (
    <FormGroup
      helperText={!accepted ? "You must accept the terms to continue" : ""}
      invalid={!accepted}
    >
      <Checkbox
        label="I have read and agree to the Terms of Service"
        checked={accepted}
        onChange={(e) => setAccepted(e.target.checked)}
        required
        invalid={!accepted}
      />
    </FormGroup>
  );
}
```

### Feature Toggles

```jsx
function FeatureToggles() {
  const [features, setFeatures] = useState({
    darkMode: false,
    notifications: true,
    analytics: false,
  });

  const handleToggle = (key) => (e) => {
    setFeatures(prev => ({
      ...prev,
      [key]: e.target.checked,
    }));
  };

  return (
    <div className="u-gap-3">
      <h3>Settings</h3>
      <Checkbox
        label="Enable dark mode"
        checked={features.darkMode}
        onChange={handleToggle('darkMode')}
      />
      <Checkbox
        label="Enable notifications"
        checked={features.notifications}
        onChange={handleToggle('notifications')}
      />
      <Checkbox
        label="Enable analytics"
        checked={features.analytics}
        onChange={handleToggle('analytics')}
      />
    </div>
  );
}
```

## Browser Support

The Checkbox component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[FormGroup](./form-group.md)** - For wrapping checkboxes with labels and help text
- **[Radio](./radio.md)** - For single selection from a group
- **[Toggle](./toggle.md)** - For switch-like binary controls
- **[Input](./input.md)** - For text input fields
- **[Select](./select.md)** - For dropdown selections

## Migration Guide

### From HTML Checkbox

```jsx
// Before (HTML)
<input type="checkbox" id="terms" />
<label htmlFor="terms">Accept terms</label>

// After (Atomix)
<Checkbox
  id="terms"
  label="Accept terms"
/>
```

