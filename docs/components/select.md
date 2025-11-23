# Select

The Select component provides a dropdown selection interface for choosing one or multiple options from a list. It supports single and multiple selection modes, validation states, and glass morphism effects.

## Overview

The Select component is a flexible dropdown control that can be used for single or multiple option selection. It provides a custom-styled dropdown interface while maintaining native HTML select functionality for accessibility and form submission.

## Installation

The Select component is included in the Atomix package. Import it in your React components:

```jsx
import { Select } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, select styles and functionality are available through CSS classes.

## Basic Usage

### React

```jsx
import { Select, FormGroup } from '@shohojdhara/atomix';

function MyComponent() {
  const [country, setCountry] = useState('');

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ];

  return (
    <FormGroup label="Country" required>
      <Select
        options={countries}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Select a country"
      />
    </FormGroup>
  );
}
```

### HTML/CSS

```html
<div class="c-form-group">
  <label class="c-form-group__label" for="country">Country</label>
  <div class="c-form-group__field">
    <select id="country" class="c-select c-select--md">
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="uk">United Kingdom</option>
    </select>
  </div>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `options` | `SelectOption[]` | `[]` | Yes | Array of select options |
| `value` | `string \| string[]` | - | No | Selected value(s) |
| `onChange` | `(event: ChangeEvent<HTMLSelectElement>) => void` | - | No | Change event handler |
| `onBlur` | `(event: FocusEvent<HTMLSelectElement>) => void` | - | No | Blur event handler |
| `onFocus` | `(event: FocusEvent<HTMLSelectElement>) => void` | - | No | Focus event handler |
| `placeholder` | `string` | `'Select an option'` | No | Placeholder text |
| `disabled` | `boolean` | `false` | No | Whether the select is disabled |
| `required` | `boolean` | `false` | No | Whether the select is required |
| `id` | `string` | - | No | Select ID |
| `name` | `string` | - | No | Select name attribute |
| `size` | `Size` | `'md'` | No | Size of the select (`'sm'`, `'md'`, `'lg'`) |
| `invalid` | `boolean` | `false` | No | Whether the select has validation errors |
| `valid` | `boolean` | `false` | No | Whether the select has passed validation |
| `multiple` | `boolean` | `false` | No | Whether multiple options can be selected |
| `ariaLabel` | `string` | - | No | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | - | No | ARIA described-by attribute |
| `glass` | `boolean \| AtomixGlassProps` | `false` | No | Enable glass morphism effect |
| `className` | `string` | `''` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | - | No | Custom style object |

### SelectOption Type

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

### Size Options

- `'sm'` - Small select (32px height)
- `'md'` - Medium select (40px height) - Default
- `'lg'` - Large select (48px height)

## Examples

### Basic Select

```jsx
import { Select, FormGroup } from '@shohojdhara/atomix';

function BasicSelect() {
  const [value, setValue] = useState('');

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <FormGroup label="Choose an option">
      <Select
        options={options}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Select an option"
      />
    </FormGroup>
  );
}
```

### Multiple Selection

```jsx
function MultipleSelect() {
  const [values, setValues] = useState([]);

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
  ];

  return (
    <FormGroup label="Languages">
      <Select
        options={languages}
        value={values}
        onChange={(e) => {
          const selected = Array.from(
            e.target.selectedOptions,
            option => option.value
          );
          setValues(selected);
        }}
        multiple
        placeholder="Select languages"
      />
    </FormGroup>
  );
}
```

### With Disabled Options

```jsx
function SelectWithDisabled() {
  const options = [
    { value: 'active1', label: 'Active Option 1' },
    { value: 'active2', label: 'Active Option 2' },
    { value: 'disabled1', label: 'Disabled Option', disabled: true },
    { value: 'active3', label: 'Active Option 3' },
  ];

  return (
    <FormGroup label="Select with disabled options">
      <Select options={options} placeholder="Choose an option" />
    </FormGroup>
  );
}
```

### Validation States

```jsx
function ValidationStates() {
  const [value, setValue] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const options = [
    { value: 'valid', label: 'Valid Option' },
    { value: 'invalid', label: 'Invalid Option' },
  ];

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsInvalid(newValue === 'invalid');
    setIsValid(newValue === 'valid');
  };

  return (
    <div className="u-gap-4">
      <FormGroup
        label="Invalid State"
        helperText="This field has an error"
        invalid={isInvalid}
      >
        <Select
          options={options}
          value={value}
          onChange={handleChange}
          invalid={isInvalid}
          placeholder="Select an option"
        />
      </FormGroup>

      <FormGroup
        label="Valid State"
        helperText="This field is valid"
        valid={isValid}
      >
        <Select
          options={options}
          value={value}
          onChange={handleChange}
          valid={isValid}
          placeholder="Select an option"
        />
      </FormGroup>
    </div>
  );
}
```

### Select Sizes

```jsx
function SelectSizes() {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  return (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <FormGroup label="Small">
        <Select options={options} size="sm" placeholder="Small select" />
      </FormGroup>
      <FormGroup label="Medium">
        <Select options={options} size="md" placeholder="Medium select" />
      </FormGroup>
      <FormGroup label="Large">
        <Select options={options} size="lg" placeholder="Large select" />
      </FormGroup>
    </div>
  );
}
```

### Disabled State

```jsx
function DisabledSelect() {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  return (
    <FormGroup label="Disabled Select">
      <Select
        options={options}
        value="1"
        disabled
        placeholder="This select is disabled"
      />
    </FormGroup>
  );
}
```

### Glass Effect

```jsx
function GlassSelect() {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  return (
    <div
      style={{
        background: 'url(https://example.com/background.jpg)',
        padding: '2rem',
        borderRadius: '12px',
        backgroundSize: 'cover',
      }}
    >
      <FormGroup label="Glass Select">
        <Select
          options={options}
          glass={true}
          placeholder="Select with glass effect"
        />
      </FormGroup>
    </div>
  );
}
```

### Custom Glass Configuration

```jsx
function CustomGlassSelect() {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  return (
    <FormGroup label="Custom Glass">
      <Select
        options={options}
        glass={{
          displacementScale: 60,
          blurAmount: 1,
          saturation: 180,
          aberrationIntensity: 0.2,
          cornerRadius: 12,
          mode: 'shader',
        }}
        placeholder="Custom glass select"
      />
    </FormGroup>
  );
}
```

## Accessibility

The Select component follows WCAG accessibility guidelines:

### Keyboard Support

- **Tab**: Moves focus to the select
- **Shift + Tab**: Moves focus away from the select
- **Enter/Space**: Opens/closes the dropdown
- **Arrow Keys**: Navigate through options
- **Escape**: Closes the dropdown

### ARIA Attributes

- `aria-label` - Accessible label when no visible label is present
- `aria-describedby` - References helper text or error messages
- `aria-invalid` - Indicates validation state
- `aria-expanded` - Indicates dropdown open/closed state
- `aria-disabled` - Indicates disabled state

### Best Practices

1. **Always provide labels**: Use FormGroup with a label or provide aria-label
   ```jsx
   <FormGroup label="Country" htmlFor="country">
     <Select id="country" options={options} />
   </FormGroup>
   ```

2. **Use helper text for guidance**:
   ```jsx
   <FormGroup
     label="Country"
     helperText="Select your country of residence"
   >
     <Select options={options} />
   </FormGroup>
   ```

3. **Provide error messages**:
   ```jsx
   <FormGroup
     label="Country"
     helperText="Please select a country"
     invalid={!value}
   >
     <Select
       options={options}
       value={value}
       invalid={!value}
     />
   </FormGroup>
   ```

4. **Mark required fields**:
   ```jsx
   <FormGroup label="Country" required>
     <Select options={options} required />
   </FormGroup>
   ```

## Styling

### CSS Custom Properties

The Select component uses CSS custom properties for theming:

```css
:root {
  --atomix-select-padding-x: 0.75rem;
  --atomix-select-padding-y: 0.5rem;
  --atomix-select-border-width: 1px;
  --atomix-select-border-radius: var(--atomix-border-radius);
  --atomix-select-font-family: inherit;
  --atomix-select-font-size: 1rem;
}
```

### CSS Classes

The component uses BEM methodology:

```css
.c-select { /* Base select class */ }
.c-select--sm { /* Small size */ }
.c-select--md { /* Medium size */ }
.c-select--lg { /* Large size */ }
.c-select--invalid { /* Invalid state */ }
.c-select--valid { /* Valid state */ }
.c-select--disabled { /* Disabled state */ }
.c-select--glass { /* Glass effect */ }
```

## Integration with Forms

### With FormGroup

```jsx
<FormGroup
  label="Country"
  helperText="Select your country"
  required
  invalid={!value}
>
  <Select
    options={countries}
    value={value}
    onChange={handleChange}
    required
    invalid={!value}
  />
</FormGroup>
```

### With React Hook Form

```jsx
import { useForm, Controller } from 'react-hook-form';

function FormWithSelect() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="country"
        control={control}
        rules={{ required: 'Country is required' }}
        render={({ field, fieldState }) => (
          <FormGroup
            label="Country"
            helperText={fieldState.error?.message}
            invalid={!!fieldState.error}
          >
            <Select
              {...field}
              options={countries}
              invalid={!!fieldState.error}
            />
          </FormGroup>
        )}
      />
    </form>
  );
}
```

## Performance Considerations

1. **Large option lists**: For lists with 100+ options, consider implementing search/filter functionality
2. **Controlled vs uncontrolled**: Use controlled mode when you need to manage state externally
3. **Memoization**: Memoize options array if it's computed from props

```jsx
const options = useMemo(
  () => data.map(item => ({ value: item.id, label: item.name })),
  [data]
);
```

## Common Patterns

### Country/Region Selector

```jsx
function CountrySelector() {
  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    // ... more countries
  ];

  return (
    <FormGroup label="Country" required>
      <Select
        options={countries}
        placeholder="Select your country"
        required
      />
    </FormGroup>
  );
}
```

### Category Selection

```jsx
function CategorySelect() {
  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
  ];

  return (
    <FormGroup label="Category">
      <Select
        options={categories}
        placeholder="Select a category"
      />
    </FormGroup>
  );
}
```

## Browser Support

The Select component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[FormGroup](./form-group.md)** - For wrapping selects with labels and help text
- **[Input](./input.md)** - For text input fields
- **[Checkbox](./checkbox.md)** - For boolean inputs
- **[Radio](./radio.md)** - For single selection from a group
- **[Button](./button.md)** - Often used with selects in forms

## Migration Guide

### From Native HTML Select

```jsx
// Before (HTML)
<select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>

// After (Atomix)
<Select
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
/>
```

