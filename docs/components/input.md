# Input

The Input component provides a flexible and accessible text input field with support for various types, sizes, validation states, and styling options. It serves as the foundation for collecting user text input in forms and interactive interfaces.

## Overview

The Input component is designed to handle all types of text-based user input, from simple text fields to specialized inputs like email, password, and number fields. It includes built-in validation states, accessibility features, and consistent styling that integrates seamlessly with the Atomix design system.

## Installation

The Input component is included in the Atomix package. Import it in your React components:

```jsx
import { Input, FormGroup } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, input styles are available through CSS classes.

## Basic Usage

### React

```jsx
import { Input, FormGroup } from '@shohojdhara/atomix';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <form>
      {/* Basic input */}
      <FormGroup label="Full Name" required>
        <Input
          value={formData.name}
          onChange={handleInputChange('name')}
          placeholder="Enter your full name"
        />
      </FormGroup>

      {/* Email input with validation */}
      <FormGroup label="Email Address" helperText="We'll never share your email">
        <Input
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          placeholder="name@example.com"
        />
      </FormGroup>
    </form>
  );
}
```

### HTML/CSS

```html
<!-- Basic input -->
<div class="c-form-group">
  <label class="c-form-group__label" for="name">Full Name</label>
  <div class="c-form-group__field">
    <input
      type="text"
      id="name"
      class="c-input c-input--md"
      placeholder="Enter your full name"
    />
  </div>
</div>

<!-- Input with validation state -->
<div class="c-form-group c-form-group--invalid">
  <label class="c-form-group__label" for="email">Email</label>
  <div class="c-form-group__field">
    <input
      type="email"
      id="email"
      class="c-input c-input--md c-input--invalid"
      placeholder="name@example.com"
    />
  </div>
  <div class="c-form-group__helper">Please enter a valid email address</div>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `type` | `string` | `'text'` | No | HTML input type (text, email, password, number, etc.) |
| `value` | `string` | - | No | Controlled input value |
| `onChange` | `(event: ChangeEvent) => void` | - | No | Change event handler |
| `onBlur` | `(event: FocusEvent) => void` | - | No | Blur event handler |
| `onFocus` | `(event: FocusEvent) => void` | - | No | Focus event handler |
| `placeholder` | `string` | - | No | Placeholder text |
| `disabled` | `boolean` | `false` | No | Whether the input is disabled |
| `required` | `boolean` | `false` | No | Whether the input is required |
| `readOnly` | `boolean` | `false` | No | Whether the input is read-only |
| `size` | `Size` | `'md'` | No | Size of the input (`'sm'`, `'md'`, `'lg'`) |
| `variant` | `string` | - | No | Visual variant of the input |
| `invalid` | `boolean` | `false` | No | Whether the input has validation errors |
| `valid` | `boolean` | `false` | No | Whether the input has passed validation |
| `maxLength` | `number` | - | No | Maximum number of characters |
| `minLength` | `number` | - | No | Minimum number of characters |
| `pattern` | `string` | - | No | Regular expression pattern for validation |
| `min` | `string \| number` | - | No | Minimum value (for number/date inputs) |
| `max` | `string \| number` | - | No | Maximum value (for number/date inputs) |
| `step` | `string \| number` | - | No | Step value (for number inputs) |
| `autoComplete` | `string` | - | No | HTML autocomplete attribute |
| `autoFocus` | `boolean` | `false` | No | Whether to auto-focus the input |
| `id` | `string` | - | No | HTML id attribute |
| `name` | `string` | - | No | HTML name attribute |
| `className` | `string` | `''` | No | Additional CSS classes |
| `ariaLabel` | `string` | - | No | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | - | No | ARIA described-by attribute |
| `glass` | `boolean \| AtomixGlassProps` | `false` | No | Enable glass morphism effect |

### Size Options

- `'sm'` - Small input (32px height)
- `'md'` - Medium input (40px height) - Default
- `'lg'` - Large input (48px height)

### Input Types

The component supports all HTML input types:
- `'text'` - Standard text input
- `'email'` - Email input with validation
- `'password'` - Password input (hidden text)
- `'number'` - Numeric input
- `'tel'` - Telephone number input
- `'url'` - URL input
- `'search'` - Search input
- `'date'` - Date picker input
- `'time'` - Time picker input
- `'datetime-local'` - Date and time input

## Glass Effect

Input supports the glass morphism effect for modern, translucent UI designs.

### Basic Glass Effect

```jsx
<Input
  placeholder="Enter text..."
  glass={true}
/>
```

### Custom Glass Configuration

```jsx
<Input
  placeholder="Enter text..."
  glass={{
    displacementScale: 60,
    blurAmount: 1,
    saturation: 180,
    aberrationIntensity: 0.2,
    cornerRadius: 12,
    mode: 'shader'
  }}
/>
```

### Glass Input in Forms

```jsx
<form className="glass-form">
  <FormGroup label="Email">
    <Input
      type="email"
      glass={true}
      placeholder="your@email.com"
    />
  </FormGroup>
  <FormGroup label="Password">
    <Input
      type="password"
      glass={true}
      placeholder="••••••••"
    />
  </FormGroup>
  <Button variant="primary" glass={true}>
    Sign In
  </Button>
</form>
```

## Examples

### Input Sizes

```jsx
<div className="input-sizes">
  <FormGroup label="Small Input">
    <Input size="sm" placeholder="Small input" />
  </FormGroup>

  <FormGroup label="Medium Input">
    <Input size="md" placeholder="Medium input" />
  </FormGroup>

  <FormGroup label="Large Input">
    <Input size="lg" placeholder="Large input" />
  </FormGroup>
</div>
```

### Input Types

```jsx
<div className="input-types">
  {/* Text input */}
  <FormGroup label="Full Name">
    <Input
      type="text"
      placeholder="Enter your full name"
    />
  </FormGroup>

  {/* Email input */}
  <FormGroup label="Email Address">
    <Input
      type="email"
      placeholder="name@example.com"
    />
  </FormGroup>

  {/* Password input */}
  <FormGroup label="Password">
    <Input
      type="password"
      placeholder="Enter your password"
    />
  </FormGroup>

  {/* Number input */}
  <FormGroup label="Age">
    <Input
      type="number"
      min="18"
      max="120"
      placeholder="Enter your age"
    />
  </FormGroup>

  {/* Search input */}
  <FormGroup label="Search">
    <Input
      type="search"
      placeholder="Search products..."
    />
  </FormGroup>
</div>
```

### Validation States

```jsx
function ValidationExample() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(value);
    setIsValid(valid && value.length > 0);
    setIsInvalid(!valid && value.length > 0);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <div>
      {/* Valid state */}
      <FormGroup
        label="Email Address"
        helperText={isValid ? "Email looks good!" : "Enter a valid email address"}
        valid={isValid}
        invalid={isInvalid}
      >
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="name@example.com"
          valid={isValid}
          invalid={isInvalid}
        />
      </FormGroup>

      {/* Error state */}
      <FormGroup
        label="Username"
        helperText="Username is already taken"
        invalid={true}
      >
        <Input
          value="john_doe"
          invalid={true}
          placeholder="Choose a username"
        />
      </FormGroup>

      {/* Disabled state */}
      <FormGroup label="Account ID" helperText="This field is automatically generated">
        <Input
          value="ACC-123456"
          disabled={true}
          readOnly={true}
        />
      </FormGroup>
    </div>
  );
}
```

### Input with Icons

```jsx
import { Input, FormGroup, Icon } from '@shohojdhara/atomix';

function InputWithIcons() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {/* Input with left icon */}
      <FormGroup label="Search Products">
        <div className="input-with-icon">
          <Icon name="MagnifyingGlass" className="input-icon input-icon--left" />
          <Input
            type="search"
            placeholder="Search for products..."
            className="pl-10"
          />
        </div>
      </FormGroup>

      {/* Password input with toggle */}
      <FormGroup label="Password">
        <div className="input-with-icon">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pr-10"
          />
          <button
            type="button"
            className="input-icon input-icon--right"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? "EyeSlash" : "Eye"} />
          </button>
        </div>
      </FormGroup>
    </div>
  );
}
```

### Controlled vs Uncontrolled

```jsx
// Controlled input
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <FormGroup label="Controlled Input">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <p>Current value: {value}</p>
    </FormGroup>
  );
}

// Uncontrolled input with ref
function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    alert(`Value: ${inputRef.current.value}`);
  };

  return (
    <div>
      <FormGroup label="Uncontrolled Input">
        <Input
          ref={inputRef}
          defaultValue="Initial value"
          placeholder="Type something..."
        />
      </FormGroup>
      <Button onClick={handleSubmit} label="Get Value" />
    </div>
  );
}
```

### Input with Character Counter

```jsx
function InputWithCounter() {
  const [text, setText] = useState('');
  const maxLength = 100;
  const remaining = maxLength - text.length;

  return (
    <FormGroup
      label="Bio"
      helperText={
        <div className="flex justify-between">
          <span>Tell us about yourself</span>
          <span className={remaining < 10 ? 'text-error' : 'text-muted'}>
            {remaining} characters remaining
          </span>
        </div>
      }
    >
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        placeholder="Write a short bio..."
      />
    </FormGroup>
  );
}
```

### Input with Suggestions

```jsx
function InputWithSuggestions() {
  const [query, setQuery] = useState('');
  const [suggestions] = useState([
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Svelte'
  ]);

  const filteredSuggestions = suggestions.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <FormGroup label="Skills">
      <div className="input-with-suggestions">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Start typing a skill..."
          list="skills-suggestions"
        />
        {query && filteredSuggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="suggestion-item"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </FormGroup>
  );
}
```

## Accessibility

The Input component follows WCAG accessibility guidelines:

### Keyboard Support

- **Tab**: Moves focus to the input
- **Shift + Tab**: Moves focus away from the input
- **Arrow keys**: Navigate within text (standard text input behavior)
- **Home/End**: Move to beginning/end of text
- **Ctrl+A**: Select all text

### ARIA Support

- Proper labeling through associated labels
- `aria-invalid` attribute for validation states
- `aria-describedby` for helper text association
- `aria-required` for required fields

### Best Practices

1. **Always provide labels**:
   ```jsx
   <FormGroup label="Email Address" htmlFor="email">
     <Input id="email" type="email" />
   </FormGroup>
   ```

2. **Use appropriate input types**:
   ```jsx
   <Input type="email" /> // Enables email keyboard on mobile
   <Input type="tel" />   // Enables numeric keyboard
   <Input type="url" />   // Shows URL keyboard
   ```

3. **Provide clear error messages**:
   ```jsx
   <FormGroup
     label="Password"
     helperText="Password must be at least 8 characters"
     invalid={isInvalid}
   >
     <Input type="password" invalid={isInvalid} />
   </FormGroup>
   ```

4. **Use autocomplete attributes**:
   ```jsx
   <Input type="email" autoComplete="email" />
   <Input type="password" autoComplete="current-password" />
   <Input type="tel" autoComplete="tel" />
   ```

## Styling

### CSS Custom Properties

The Input component uses CSS custom properties for theming:

```css
:root {
  /* Input structure */
  --atomix-input-padding-x: 0.75rem;
  --atomix-input-padding-y: 0.5rem;
  --atomix-input-border-width: 1px;
  --atomix-input-border-radius: var(--atomix-border-radius);
  --atomix-input-font-family: inherit;
  --atomix-input-font-weight: 400;
  --atomix-input-line-height: 1.5;

  /* Input sizes */
  --atomix-input-sm-padding-x: 0.5rem;
  --atomix-input-sm-padding-y: 0.375rem;
  --atomix-input-sm-font-size: 0.875rem;
  --atomix-input-sm-height: 2rem;

  --atomix-input-md-padding-x: 0.75rem;
  --atomix-input-md-padding-y: 0.5rem;
  --atomix-input-md-font-size: 1rem;
  --atomix-input-md-height: 2.5rem;

  --atomix-input-lg-padding-x: 1rem;
  --atomix-input-lg-padding-y: 0.75rem;
  --atomix-input-lg-font-size: 1.125rem;
  --atomix-input-lg-height: 3rem;

  /* Input colors */
  --atomix-input-color: var(--atomix-body-color);
  --atomix-input-bg: var(--atomix-white);
  --atomix-input-border-color: var(--atomix-border-color);
  --atomix-input-placeholder-color: var(--atomix-text-muted);

  /* Input states */
  --atomix-input-focus-border-color: var(--atomix-primary);
  --atomix-input-focus-box-shadow: 0 0 0 2px var(--atomix-primary-light);
  --atomix-input-valid-border-color: var(--atomix-success);
  --atomix-input-invalid-border-color: var(--atomix-error);
  --atomix-input-disabled-bg: var(--atomix-gray-100);
  --atomix-input-disabled-color: var(--atomix-text-muted);
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base input class */
.c-input {
  display: block;
  width: 100%;
  padding: var(--atomix-input-padding-y) var(--atomix-input-padding-x);
  font-family: var(--atomix-input-font-family);
  font-size: var(--atomix-input-font-size);
  font-weight: var(--atomix-input-font-weight);
  line-height: var(--atomix-input-line-height);
  color: var(--atomix-input-color);
  background-color: var(--atomix-input-bg);
  border: var(--atomix-input-border-width) solid var(--atomix-input-border-color);
  border-radius: var(--atomix-input-border-radius);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.c-input::placeholder {
  color: var(--atomix-input-placeholder-color);
  opacity: 1;
}

/* Size modifiers */
.c-input--sm {
  padding: var(--atomix-input-sm-padding-y) var(--atomix-input-sm-padding-x);
  font-size: var(--atomix-input-sm-font-size);
  height: var(--atomix-input-sm-height);
}

.c-input--md {
  padding: var(--atomix-input-md-padding-y) var(--atomix-input-md-padding-x);
  font-size: var(--atomix-input-md-font-size);
  height: var(--atomix-input-md-height);
}

.c-input--lg {
  padding: var(--atomix-input-lg-padding-y) var(--atomix-input-lg-padding-x);
  font-size: var(--atomix-input-lg-font-size);
  height: var(--atomix-input-lg-height);
}

/* State modifiers */
.c-input:focus {
  outline: none;
  border-color: var(--atomix-input-focus-border-color);
  box-shadow: var(--atomix-input-focus-box-shadow);
}

.c-input--valid {
  border-color: var(--atomix-input-valid-border-color);
}

.c-input--invalid {
  border-color: var(--atomix-input-invalid-border-color);
}

.c-input:disabled {
  background-color: var(--atomix-input-disabled-bg);
  color: var(--atomix-input-disabled-color);
  cursor: not-allowed;
}

/* Input with icons */
.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--atomix-text-muted);
}

.input-icon--left {
  left: 0.75rem;
}

.input-icon--right {
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
}

.input-with-icon .c-input {
  position: relative;
}

.pl-10 {
  padding-left: 2.5rem;
}

.pr-10 {
  padding-right: 2.5rem;
}
```

### Customization Examples

```css
/* Custom input variant */
.c-input--search {
  border-radius: 2rem;
  padding-left: 2.5rem;
  background-color: var(--atomix-gray-50);
  border-color: transparent;
}

.c-input--search:focus {
  background-color: var(--atomix-white);
  border-color: var(--atomix-primary);
}

/* Material Design style */
.c-input--material {
  border: none;
  border-bottom: 2px solid var(--atomix-border-color);
  border-radius: 0;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}

.c-input--material:focus {
  border-bottom-color: var(--atomix-primary);
  box-shadow: none;
}

/* Floating label style */
.floating-label {
  position: relative;
}

.floating-label .c-input:placeholder-shown + label {
  transform: translateY(2.5rem) scale(1);
  color: var(--atomix-text-muted);
}

.floating-label .c-input:focus + label,
.floating-label .c-input:not(:placeholder-shown) + label {
  transform: translateY(0) scale(0.85);
  color: var(--atomix-primary);
}

.floating-label label {
  position: absolute;
  left: 0.75rem;
  top: 0;
  transition: transform 0.2s ease, color 0.2s ease;
  pointer-events: none;
  transform-origin: left top;
}
```

## Common Patterns

### Search Input

```jsx
function SearchInput({ onSearch, placeholder = "Search..." }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="input-with-icon">
        <Icon name="MagnifyingGlass" className="input-icon input-icon--left" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            type="button"
            className="input-icon input-icon--right"
            onClick={() => setQuery('')}
          >
            <Icon name="X" />
          </button>
        )}
      </div>
    </form>
  );
}
```

### Form Field with Validation

```jsx
function ValidatedField({
  label,
  name,
  type = "text",
  required = false,
  validation,
  ...props
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validate = (val) => {
    if (required && !val) {
      return `${label} is required`;
    }
    if (validation && val) {
      return validation(val);
    }
    return '';
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validate(value));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (touched) {
      setError(validate(e.target.value));
    }
  };

  return (
    <FormGroup
      label={label}
      helperText={error}
      invalid={touched && !!error}
      valid={touched && !error && value}
      required={required}
    >
      <Input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        invalid={touched && !!error}
        valid={touched && !error && value}
        {...props}
      />
    </FormGroup>
  );
}

// Usage
<ValidatedField
  label="Email"
  name="email"
  type="email"
  required
  validation={(value) =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email' : ''
  }
  placeholder="name@example.com"
/>
```

### Currency Input

```jsx
function CurrencyInput({ value, onChange, currency = "USD", ...props }) {
  const formatCurrency = (val) => {
    const number = parseFloat(val.replace(/[^0-9.]/g, ''));
    return isNaN(number) ? '' : number.toFixed(2);
  };

  const handleChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    onChange({ ...e, target: { ...e.target, value: formatted } });
  };

  return (
    <div className="currency-input">
      <span className="currency-symbol">$</span>
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        className="pl-8"
        {...props}
      />
    </div>
  );
}
```

### Phone Number Input

```jsx
function PhoneInput({ value, onChange, ...props }) {
  const formatPhone = (val) => {
    const digits = val.replace(/\D/g, '');
    const match = digits.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return digits;
  };

  const handleChange = (e) => {
    const formatted = formatPhone(e.target.value);
    onChange({ ...e, target: { ...e.target, value: formatted } });
  };

  return (
    <Input
      type="tel"
      value={value}
      onChange={handleChange}
      placeholder="(555) 123-4567"
      maxLength="14"
      {...props}
    />
  );
}
```

## Performance Considerations

1. **Debounced input**: For expensive operations like API calls
2. **Controlled vs uncontrolled**: Choose based on your needs
3. **Avoid inline functions**: Use useCallback for event handlers
4. **Memoization**: Use React.memo for complex input components

```jsx
// Debounced search input
function DebouncedSearchInput({ onSearch, delay = 300 }) {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      onSearch(searchQuery);
    }, delay),
    [onSearch, delay]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <Input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

## Integration Examples

### With Form Libraries

#### React Hook Form
```jsx
import { useForm, Controller } from 'react-hook-form';

function FormWithValidation() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        label="Email"
        helperText={errors.email?.message}
        invalid={!!errors.email}
        required
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email'
            }
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              invalid={!!errors.email}
              placeholder="name@example.com"
            />
          )}
        />
      </FormGroup>
    </form>
  );
}
```

#### Formik
```jsx
import { Formik, Field } from 'formik';

function FormikExample() {
  return (
    <Formik
      initialValues={{ email: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        }
        return errors;
      }}
    >
      {({ errors, touched }) => (
        <FormGroup
          label="Email"
          helperText={errors.email}
          invalid={errors.email && touched.email}
        >
          <Field name="email">
            {({ field }) => (
              <Input
                {...field}
                type="email"
                invalid={errors.email && touched.email}
                placeholder="name@example.com"
              />
            )}
          </Field>
        </FormGroup>
      )}
    </Formik>
  );
}
```

## Browser Support

The Input component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[FormGroup](./form-group.mdx)** - For wrapping inputs with labels and help text
- **[Textarea](./textarea.mdx)** - For multi-line text input
- **[Select](./select.mdx)** - For dropdown selections
- **[Button](./button.mdx)** - Often used with inputs in forms
- **[Icon](./icon.mdx)** - For input decorations

## Migration Guide

### From v1.x to v2.x

```jsx
// v1.x (deprecated)
<Input
  error="Invalid email"
  success={true}
  inputSize="large"
/>

// v2.x (current)
<FormGroup
  label="Email"
  helperText="Invalid email"
  invalid={true}
>
  <Input size="lg" invalid={true} />
</FormGroup>
```

### From HTML Input

```jsx
// Before (HTML)
<div class="form-group">
  <label for="email">Email</label>
  <input type="email" id="email" class="form-control" />
  <small class="form-text">Enter your email address</small>
</div>

// After (Atomix)
<FormGroup label="Email" helperText="Enter your email address">
  <Input type="email" />
</FormGroup>
```
