# Radio

The Radio component provides a single-selection input control from a group of options. Radio buttons are ideal when users need to choose exactly one option from multiple choices.

## Overview

The Radio component allows users to select a single option from a group of mutually exclusive choices. Unlike checkboxes, radio buttons ensure only one option can be selected at a time within a group, making them perfect for single-choice scenarios.

## Installation

The Radio component is included in the Atomix package. Import it in your React components:

```jsx
import { Radio } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, radio styles are available through CSS classes.

## Basic Usage

### React

```jsx
import { Radio, FormGroup } from '@shohojdhara/atomix';

function MyComponent() {
  const [selected, setSelected] = useState('option1');

  return (
    <div>
      <Radio
        name="choice"
        label="Option 1"
        value="option1"
        checked={selected === 'option1'}
        onChange={(e) => setSelected(e.target.value)}
      />
      <Radio
        name="choice"
        label="Option 2"
        value="option2"
        checked={selected === 'option2'}
        onChange={(e) => setSelected(e.target.value)}
      />
    </div>
  );
}
```

### HTML/CSS

```html
<label class="c-radio">
  <input type="radio" class="c-radio__input" name="choice" value="option1" />
  <span class="c-radio__label">Option 1</span>
</label>
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `ReactNode` | - | No | Radio label text or element |
| `checked` | `boolean` | `false` | No | Whether the radio is checked |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | - | No | Change event handler |
| `name` | `string` | - | Yes | Radio group name (must be same for all radios in a group) |
| `value` | `string` | - | No | Radio value attribute |
| `disabled` | `boolean` | `false` | No | Whether the radio is disabled |
| `required` | `boolean` | `false` | No | Whether the radio is required |
| `id` | `string` | - | No | Radio ID |
| `invalid` | `boolean` | `false` | No | Whether the radio has validation errors |
| `valid` | `boolean` | `false` | No | Whether the radio has passed validation |
| `ariaLabel` | `string` | - | No | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | - | No | ARIA described-by attribute |
| `glass` | `boolean \| AtomixGlassProps` | `false` | No | Enable glass morphism effect |
| `className` | `string` | `''` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | - | No | Custom style object |

## Examples

### Basic Radio Group

```jsx
function RadioGroup() {
  const [selected, setSelected] = useState('option1');

  return (
    <div className="u-gap-3">
      <h3>Choose an option</h3>
      <Radio
        name="choice"
        label="Option 1"
        value="option1"
        checked={selected === 'option1'}
        onChange={(e) => setSelected(e.target.value)}
      />
      <Radio
        name="choice"
        label="Option 2"
        value="option2"
        checked={selected === 'option2'}
        onChange={(e) => setSelected(e.target.value)}
      />
      <Radio
        name="choice"
        label="Option 3"
        value="option3"
        checked={selected === 'option3'}
        onChange={(e) => setSelected(e.target.value)}
      />
    </div>
  );
}
```

### Horizontal Layout

```jsx
function HorizontalRadioGroup() {
  const [selected, setSelected] = useState('small');

  return (
    <div className="u-flex u-gap-4">
      <Radio
        name="size"
        label="Small"
        value="small"
        checked={selected === 'small'}
        onChange={(e) => setSelected(e.target.value)}
      />
      <Radio
        name="size"
        label="Medium"
        value="medium"
        checked={selected === 'medium'}
        onChange={(e) => setSelected(e.target.value)}
      />
      <Radio
        name="size"
        label="Large"
        value="large"
        checked={selected === 'large'}
        onChange={(e) => setSelected(e.target.value)}
      />
    </div>
  );
}
```

### With Descriptions

```jsx
function RadioWithDescriptions() {
  const [plan, setPlan] = useState('basic');

  return (
    <div className="u-gap-4">
      <Radio
        name="plan"
        label={
          <div>
            <div style={{ fontWeight: '600' }}>Basic Plan</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
              $9/month - Perfect for individuals
            </div>
          </div>
        }
        value="basic"
        checked={plan === 'basic'}
        onChange={(e) => setPlan(e.target.value)}
      />
      <Radio
        name="plan"
        label={
          <div>
            <div style={{ fontWeight: '600' }}>Pro Plan</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
              $29/month - Best for teams
            </div>
          </div>
        }
        value="pro"
        checked={plan === 'pro'}
        onChange={(e) => setPlan(e.target.value)}
      />
    </div>
  );
}
```

### Disabled Options

```jsx
function DisabledRadioGroup() {
  const [selected, setSelected] = useState('option1');

  return (
    <div className="u-gap-3">
      <Radio
        name="choice"
        label="Available option"
        value="option1"
        checked={selected === 'option1'}
        onChange={(e) => setSelected(e.target.value)}
      />
      <Radio
        name="choice"
        label="Disabled option"
        value="option2"
        checked={selected === 'option2'}
        onChange={(e) => setSelected(e.target.value)}
        disabled
      />
      <Radio
        name="choice"
        label="Another available option"
        value="option3"
        checked={selected === 'option3'}
        onChange={(e) => setSelected(e.target.value)}
      />
    </div>
  );
}
```

### Validation States

```jsx
function ValidationStates() {
  const [selected, setSelected] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    setIsInvalid(false);
  };

  const handleBlur = () => {
    if (!selected) {
      setIsInvalid(true);
    }
  };

  return (
    <FormGroup
      label="Choose an option"
      helperText={isInvalid ? "Please select an option" : ""}
      invalid={isInvalid}
      required
    >
      <div className="u-gap-2">
        <Radio
          name="required-choice"
          label="Option 1"
          value="option1"
          checked={selected === 'option1'}
          onChange={handleChange}
          onBlur={handleBlur}
          invalid={isInvalid}
          required
        />
        <Radio
          name="required-choice"
          label="Option 2"
          value="option2"
          checked={selected === 'option2'}
          onChange={handleChange}
          onBlur={handleBlur}
          invalid={isInvalid}
          required
        />
      </div>
    </FormGroup>
  );
}
```

### Glass Effect

```jsx
function GlassRadioGroup() {
  const [selected, setSelected] = useState('option1');

  return (
    <div
      style={{
        background: 'url(https://example.com/background.jpg)',
        padding: '2rem',
        borderRadius: '12px',
        backgroundSize: 'cover',
      }}
    >
      <div className="u-gap-3">
        <Radio
          name="glass-choice"
          label="Option 1"
          value="option1"
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
          glass={true}
        />
        <Radio
          name="glass-choice"
          label="Option 2"
          value="option2"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
          glass={true}
        />
      </div>
    </div>
  );
}
```

## Accessibility

The Radio component follows WCAG accessibility guidelines:

### Keyboard Support

- **Tab**: Moves focus to the radio button
- **Shift + Tab**: Moves focus away from the radio button
- **Arrow Keys**: Navigate between radio buttons in the same group
- **Space**: Selects the focused radio button

### ARIA Attributes

- `aria-label` - Accessible label when no visible label is present
- `aria-describedby` - References helper text or error messages
- `aria-invalid` - Indicates validation state
- `aria-required` - Indicates required state

### Best Practices

1. **Always use the same name for radio groups**: All radios in a group must share the same `name` prop
   ```jsx
   <Radio name="size" value="small" />
   <Radio name="size" value="medium" />
   <Radio name="size" value="large" />
   ```

2. **Provide labels**: Use the `label` prop or provide `aria-label`
   ```jsx
   <Radio name="choice" label="Option 1" value="1" />
   ```

3. **Use FormGroup for validation**:
   ```jsx
   <FormGroup
     label="Choose an option"
     helperText="Please select one"
     invalid={!selected}
   >
     <Radio name="choice" value="1" invalid={!selected} />
   </FormGroup>
   ```

4. **Group related radios visually**:
   ```jsx
   <fieldset>
     <legend>Size</legend>
     <Radio name="size" label="Small" value="small" />
     <Radio name="size" label="Medium" value="medium" />
     <Radio name="size" label="Large" value="large" />
   </fieldset>
   ```

## Styling

### CSS Custom Properties

The Radio component uses CSS custom properties for theming:

```css
:root {
  --atomix-radio-size: 1.25rem;
  --atomix-radio-border-width: 2px;
  --atomix-radio-dot-size: 0.5rem;
  --atomix-radio-bg: var(--atomix-white);
  --atomix-radio-border-color: var(--atomix-border-color);
  --atomix-radio-checked-bg: var(--atomix-primary);
  --atomix-radio-checked-border-color: var(--atomix-primary);
}
```

### CSS Classes

The component uses BEM methodology:

```css
.c-radio { /* Base radio class */ }
.c-radio__input { /* Radio input element */ }
.c-radio__label { /* Radio label */ }
.c-radio--disabled { /* Disabled state */ }
.c-radio--invalid { /* Invalid state */ }
.c-radio--valid { /* Valid state */ }
.c-radio--glass { /* Glass effect */ }
```

## Integration with Forms

### With FormGroup

```jsx
<FormGroup
  label="Choose your plan"
  helperText="Select a subscription plan"
  required
>
  <div className="u-gap-2">
    <Radio
      name="plan"
      label="Basic"
      value="basic"
      checked={selected === 'basic'}
      onChange={(e) => setSelected(e.target.value)}
    />
    <Radio
      name="plan"
      label="Pro"
      value="pro"
      checked={selected === 'pro'}
      onChange={(e) => setSelected(e.target.value)}
    />
  </div>
</FormGroup>
```

### With React Hook Form

```jsx
import { useForm, Controller } from 'react-hook-form';

function FormWithRadio() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="plan"
        control={control}
        rules={{ required: 'Please select a plan' }}
        render={({ field, fieldState }) => (
          <FormGroup
            label="Choose your plan"
            helperText={fieldState.error?.message}
            invalid={!!fieldState.error}
          >
            <div className="u-gap-2">
              <Radio
                {...field}
                name="plan"
                label="Basic"
                value="basic"
                checked={field.value === 'basic'}
                invalid={!!fieldState.error}
              />
              <Radio
                {...field}
                name="plan"
                label="Pro"
                value="pro"
                checked={field.value === 'pro'}
                invalid={!!fieldState.error}
              />
            </div>
          </FormGroup>
        )}
      />
    </form>
  );
}
```

## Common Patterns

### Size Selection

```jsx
function SizeSelector() {
  const [size, setSize] = useState('medium');

  return (
    <FormGroup label="Size" required>
      <div className="u-flex u-gap-4">
        <Radio
          name="size"
          label="Small"
          value="small"
          checked={size === 'small'}
          onChange={(e) => setSize(e.target.value)}
        />
        <Radio
          name="size"
          label="Medium"
          value="medium"
          checked={size === 'medium'}
          onChange={(e) => setSize(e.target.value)}
        />
        <Radio
          name="size"
          label="Large"
          value="large"
          checked={size === 'large'}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>
    </FormGroup>
  );
}
```

### Payment Method Selection

```jsx
function PaymentMethod() {
  const [method, setMethod] = useState('credit');

  return (
    <FormGroup label="Payment Method" required>
      <div className="u-gap-3">
        <Radio
          name="payment"
          label={
            <div>
              <div style={{ fontWeight: '600' }}>Credit Card</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                Visa, Mastercard, American Express
              </div>
            </div>
          }
          value="credit"
          checked={method === 'credit'}
          onChange={(e) => setMethod(e.target.value)}
        />
        <Radio
          name="payment"
          label={
            <div>
              <div style={{ fontWeight: '600' }}>PayPal</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                Pay with your PayPal account
              </div>
            </div>
          }
          value="paypal"
          checked={method === 'paypal'}
          onChange={(e) => setMethod(e.target.value)}
        />
      </div>
    </FormGroup>
  );
}
```

## Browser Support

The Radio component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[FormGroup](./form-group.md)** - For wrapping radio groups with labels and help text
- **[Checkbox](./checkbox.md)** - For multiple selections
- **[Select](./select.md)** - For dropdown selections
- **[Toggle](./toggle.md)** - For switch-like binary controls
- **[Input](./input.md)** - For text input fields

## Migration Guide

### From HTML Radio

```jsx
// Before (HTML)
<input type="radio" name="choice" id="option1" value="1" />
<label htmlFor="option1">Option 1</label>

// After (Atomix)
<Radio
  name="choice"
  id="option1"
  label="Option 1"
  value="1"
/>
```

