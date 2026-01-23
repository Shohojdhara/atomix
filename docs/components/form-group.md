# FormGroup

The FormGroup component provides a consistent wrapper for form controls with labels, helper text, error messages, and validation states. It ensures proper accessibility and visual consistency across all form inputs.

## Overview

FormGroup is a layout component that wraps form controls (Input, Select, Textarea, etc.) with their associated labels, helper text, and error messages. It provides consistent spacing, validation state styling, and proper accessibility relationships between labels and inputs.

## Installation

The FormGroup component is included in the Atomix package. Import it in your React components:

```jsx
import { FormGroup } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, form group styles are available through CSS classes.

## Basic Usage

### React

```jsx
import { FormGroup, Input } from '@shohojdhara/atomix';

function MyComponent() {
  return (
    <FormGroup label="Email Address" htmlFor="email">
      <Input
        id="email"
        type="email"
        placeholder="your@email.com"
      />
    </FormGroup>
  );
}
```

### HTML/CSS

```html
<div class="c-form-group">
  <label class="c-form-group__label" for="email">Email Address</label>
  <div class="c-form-group__field">
    <input
      type="email"
      id="email"
      class="c-input"
      placeholder="your@email.com"
    />
  </div>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | Yes | Form control element (Input, Select, Textarea, etc.) |
| `label` | `string` | - | No | Label text for the form control |
| `htmlFor` | `string` | - | No | ID of the form control this label is for |
| `helperText` | `ReactNode` | - | No | Helper text displayed below the input |
| `required` | `boolean` | `false` | No | Whether the field is required (shows asterisk) |
| `invalid` | `boolean` | `false` | No | Whether the field has validation errors |
| `valid` | `boolean` | `false` | No | Whether the field has passed validation |
| `disabled` | `boolean` | `false` | No | Whether the field is disabled |
| `size` | `Size` | `'md'` | No | Size variant (`'sm'`, `'md'`, `'lg'`) |
| `className` | `string` | `''` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | - | No | Custom style object |

### Size Options

- `'sm'` - Small form group
- `'md'` - Medium form group - Default
- `'lg'` - Large form group

## Examples

### Basic FormGroup

```jsx
function BasicFormGroup() {
  return (
    <FormGroup label="Full Name" htmlFor="name">
      <Input
        id="name"
        type="text"
        placeholder="Enter your name"
      />
    </FormGroup>
  );
}
```

### With Helper Text

```jsx
function WithHelperText() {
  return (
    <FormGroup
      label="Email Address"
      htmlFor="email"
      helperText="We'll never share your email with anyone else"
    >
      <Input
        id="email"
        type="email"
        placeholder="your@email.com"
      />
    </FormGroup>
  );
}
```

### Required Field

```jsx
function RequiredField() {
  return (
    <FormGroup
      label="Password"
      htmlFor="password"
      required
      helperText="Must be at least 8 characters"
    >
      <Input
        id="password"
        type="password"
        placeholder="Enter password"
        required
      />
    </FormGroup>
  );
}
```

### With Error State

```jsx
function ErrorState() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return 'Email is required';
    }
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleBlur = () => {
    setError(validateEmail(email));
  };

  return (
    <FormGroup
      label="Email Address"
      htmlFor="email"
      helperText={error}
      invalid={!!error}
      required
    >
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleBlur}
        invalid={!!error}
        required
      />
    </FormGroup>
  );
}
```

### With Valid State

```jsx
function ValidState() {
  const [email, setEmail] = useState('');
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <FormGroup
      label="Email Address"
      htmlFor="email"
      helperText={isValid ? "Email looks good!" : "Enter a valid email"}
      valid={isValid && email.length > 0}
    >
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        valid={isValid && email.length > 0}
      />
    </FormGroup>
  );
}
```

### With Different Form Controls

```jsx
function DifferentControls() {
  return (
    <div className="u-flex u-flex-column u-gap-4" style={{ width: '400px' }}>
      <FormGroup label="Text Input" htmlFor="text">
        <Input id="text" type="text" placeholder="Enter text" />
      </FormGroup>

      <FormGroup label="Select" htmlFor="select">
        <Select
          id="select"
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
          ]}
          placeholder="Select an option"
        />
      </FormGroup>

      <FormGroup label="Textarea" htmlFor="textarea">
        <Textarea
          id="textarea"
          rows={4}
          placeholder="Enter your message..."
        />
      </FormGroup>

      <FormGroup label="Checkbox">
        <Checkbox
          id="checkbox"
          label="I agree to the terms"
        />
      </FormGroup>
    </div>
  );
}
```

### FormGroup Sizes

```jsx
function FormGroupSizes() {
  return (
    <div className="u-flex u-flex-column u-gap-4" style={{ width: '400px' }}>
      <FormGroup label="Small" size="sm" htmlFor="small">
        <Input id="small" size="sm" placeholder="Small input" />
      </FormGroup>

      <FormGroup label="Medium" size="md" htmlFor="medium">
        <Input id="medium" size="md" placeholder="Medium input" />
      </FormGroup>

      <FormGroup label="Large" size="lg" htmlFor="large">
        <Input id="large" size="lg" placeholder="Large input" />
      </FormGroup>
    </div>
  );
}
```

### Disabled State

```jsx
function DisabledState() {
  return (
    <FormGroup
      label="Disabled Field"
      htmlFor="disabled"
      helperText="This field is disabled"
      disabled
    >
      <Input
        id="disabled"
        value="Disabled value"
        disabled
      />
    </FormGroup>
  );
}
```

## Accessibility

The FormGroup component follows WCAG accessibility guidelines:

### Label Association

- **htmlFor prop**: Links the label to the form control using the `for` attribute
- **Automatic association**: When `htmlFor` matches the control's `id`, screen readers properly announce the label

### ARIA Attributes

- `aria-required` - Indicated by the required prop
- `aria-invalid` - Indicated by the invalid prop
- `aria-describedby` - Automatically links helper text to the control

### Best Practices

1. **Always use htmlFor with label**: Ensure the label is properly associated with the control
   ```jsx
   <FormGroup label="Email" htmlFor="email">
     <Input id="email" />
   </FormGroup>
   ```

2. **Provide helper text for guidance**:
   ```jsx
   <FormGroup
     label="Password"
     helperText="Must be at least 8 characters"
   >
     <Input type="password" />
   </FormGroup>
   ```

3. **Use error messages in helperText**:
   ```jsx
   <FormGroup
     label="Email"
     helperText={error || "Enter your email address"}
     invalid={!!error}
   >
     <Input type="email" invalid={!!error} />
   </FormGroup>
   ```

4. **Mark required fields**:
   ```jsx
   <FormGroup label="Email" required>
     <Input type="email" required />
   </FormGroup>
   ```

## Styling

### CSS Custom Properties

The FormGroup component uses CSS custom properties for theming:

```css
:root {
  --atomix-form-group-gap: 0.5rem;
  --atomix-form-group-label-font-size: 0.875rem;
  --atomix-form-group-label-font-weight: 500;
  --atomix-form-group-label-color: var(--atomix-text-color);
  --atomix-form-group-helper-font-size: 0.75rem;
  --atomix-form-group-helper-color: var(--atomix-text-muted);
  --atomix-form-group-required-color: var(--atomix-error);
}
```

### CSS Classes

The component uses BEM methodology:

```css
.c-form-group { /* Base form group class */ }
.c-form-group__label { /* Label element */ }
.c-form-group__field { /* Form control wrapper */ }
.c-form-group__helper { /* Helper text */ }
.c-form-group__required { /* Required asterisk */ }
.c-form-group--sm { /* Small size */ }
.c-form-group--md { /* Medium size */ }
.c-form-group--lg { /* Large size */ }
.c-form-group--invalid { /* Invalid state */ }
.c-form-group--valid { /* Valid state */ }
.c-form-group--disabled { /* Disabled state */ }
```

## Integration with Forms

### Complete Form Example

```jsx
function CompleteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup
        label="Full Name"
        htmlFor="name"
        helperText={errors.name}
        invalid={!!errors.name}
        required
      >
        <Input
          id="name"
          value={formData.name}
          onChange={handleChange('name')}
          invalid={!!errors.name}
        />
      </FormGroup>

      <FormGroup
        label="Email Address"
        htmlFor="email"
        helperText={errors.email}
        invalid={!!errors.email}
        required
      >
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          invalid={!!errors.email}
        />
      </FormGroup>

      <FormGroup
        label="Message"
        htmlFor="message"
        helperText={errors.message}
        invalid={!!errors.message}
        required
      >
        <Textarea
          id="message"
          value={formData.message}
          onChange={handleChange('message')}
          rows={4}
          invalid={!!errors.message}
        />
      </FormGroup>

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
```

### With React Hook Form

```jsx
import { useForm, Controller } from 'react-hook-form';

function FormWithValidation() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        }}
        render={({ field, fieldState }) => (
          <FormGroup
            label="Email"
            htmlFor="email"
            helperText={fieldState.error?.message}
            invalid={!!fieldState.error}
            required
          >
            <Input
              {...field}
              id="email"
              type="email"
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

### Contact Form

```jsx
function ContactForm() {
  return (
    <form>
      <FormGroup label="Name" htmlFor="name" required>
        <Input id="name" required />
      </FormGroup>

      <FormGroup label="Email" htmlFor="email" required>
        <Input id="email" type="email" required />
      </FormGroup>

      <FormGroup label="Message" htmlFor="message" required>
        <Textarea id="message" rows={5} required />
      </FormGroup>

      <Button type="submit" variant="primary">
        Send Message
      </Button>
    </form>
  );
}
```

### Settings Form

```jsx
function SettingsForm() {
  return (
    <form>
      <FormGroup
        label="Display Name"
        htmlFor="displayName"
        helperText="This is how your name will appear"
      >
        <Input id="displayName" />
      </FormGroup>

      <FormGroup label="Email Notifications">
        <Checkbox
          id="emailNotifications"
          label="Receive email notifications"
        />
      </FormGroup>

      <FormGroup label="Theme">
        <Select
          id="theme"
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
        />
      </FormGroup>
    </form>
  );
}
```

## Browser Support

The FormGroup component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[Input](./input.md)** - Text input fields
- **[Select](./select.md)** - Dropdown selections
- **[Textarea](./textarea.md)** - Multi-line text input
- **[Checkbox](./checkbox.md)** - Boolean inputs
- **[Radio](./radio.md)** - Single selection inputs
- **[Form](./form.md)** - Form container component

## Migration Guide

### From Custom Form Layout

```jsx
// Before (custom layout)
<div className="form-field">
  <label htmlFor="email">Email</label>
  <input id="email" type="email" />
  <span className="error">Error message</span>
</div>

// After (FormGroup)
<FormGroup
  label="Email"
  htmlFor="email"
  helperText="Error message"
  invalid={true}
>
  <Input id="email" type="email" invalid={true} />
</FormGroup>
```

