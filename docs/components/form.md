# Form Components

The Form components provide a comprehensive set of form controls with built-in validation, accessibility features, and consistent styling. The form system includes Form, FormGroup, Input, Select, Checkbox, Radio, and Textarea components.

## Overview

Forms are essential for user interaction and data collection. The Atomix form components work together to create accessible, user-friendly forms with proper validation and error handling.

## Components

### Form
Main form container with submission handling

### FormGroup
Wrapper for form controls with labels and validation

### Input
Text input fields with various types

### Select
Dropdown selection controls

### Checkbox
Boolean input controls

### Radio
Single selection from a group

### Textarea
Multi-line text input

## Form Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Form content |
| `onSubmit` | `(event: FormEvent) => void` | `undefined` | Submit handler |
| `onReset` | `(event: FormEvent) => void` | `undefined` | Reset handler |
| `id` | `string` | `undefined` | Form ID |
| `method` | `'get' \| 'post'` | `'post'` | Form method |
| `encType` | `string` | `undefined` | Encoding type |
| `noValidate` | `boolean` | `false` | Disable HTML5 validation |
| `autoComplete` | `string` | `undefined` | Autocomplete setting |
| `className` | `string` | `''` | Additional CSS classes |

### Usage

```jsx
import { Form, FormGroup, Input, Button } from '@shohojdhara/atomix';

function ContactForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup label="Name" required>
        <Input 
          type="text" 
          name="name" 
          placeholder="Enter your name"
          required 
        />
      </FormGroup>
      
      <FormGroup label="Email" required>
        <Input 
          type="email" 
          name="email" 
          placeholder="Enter your email"
          required 
        />
      </FormGroup>
      
      <Button type="submit" label="Submit" variant="primary" />
    </Form>
  );
}
```

## FormGroup Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Form control |
| `label` | `string` | `undefined` | Label text |
| `helperText` | `ReactNode` | `undefined` | Helper/error text |
| `htmlFor` | `string` | `undefined` | Associated control ID |
| `required` | `boolean` | `false` | Required field indicator |
| `invalid` | `boolean` | `false` | Invalid state |
| `valid` | `boolean` | `false` | Valid state |
| `size` | `Size` | `'md'` | Size variant |
| `className` | `string` | `''` | Additional CSS classes |

### Usage

```jsx
function FormGroupExample() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value) => {
    if (!value.includes('@')) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  return (
    <FormGroup 
      label="Email Address" 
      required
      invalid={!!emailError}
      helperText={emailError || 'We will never share your email'}
      htmlFor="email-input"
    >
      <Input 
        id="email-input"
        type="email" 
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        invalid={!!emailError}
      />
    </FormGroup>
  );
}
```

## Input Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | Input type |
| `value` | `string \| number` | `undefined` | Input value |
| `onChange` | `(event: ChangeEvent) => void` | `undefined` | Change handler |
| `onBlur` | `(event: FocusEvent) => void` | `undefined` | Blur handler |
| `onFocus` | `(event: FocusEvent) => void` | `undefined` | Focus handler |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `required` | `boolean` | `false` | Required field |
| `readOnly` | `boolean` | `false` | Read-only state |
| `disabled` | `boolean` | `false` | Disabled state |
| `invalid` | `boolean` | `false` | Invalid state |
| `valid` | `boolean` | `false` | Valid state |
| `size` | `Size` | `'md'` | Size variant |
| `variant` | `ThemeColor` | `undefined` | Color variant |

### Usage

```jsx
function InputExamples() {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: '',
    number: '',
    search: ''
  });

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <div className="u-gap-4">
      {/* Text input */}
      <FormGroup label="Full Name">
        <Input 
          type="text"
          value={formData.text}
          onChange={handleChange('text')}
          placeholder="Enter your full name"
        />
      </FormGroup>

      {/* Email input */}
      <FormGroup label="Email">
        <Input 
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="user@example.com"
        />
      </FormGroup>

      {/* Password input */}
      <FormGroup label="Password">
        <Input 
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          placeholder="Enter password"
        />
      </FormGroup>

      {/* Number input */}
      <FormGroup label="Age">
        <Input 
          type="number"
          value={formData.number}
          onChange={handleChange('number')}
          min="18"
          max="100"
        />
      </FormGroup>

      {/* Search input */}
      <FormGroup label="Search">
        <Input 
          type="search"
          value={formData.search}
          onChange={handleChange('search')}
          placeholder="Search..."
        />
      </FormGroup>
    </div>
  );
}
```

## Select Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | **required** | Select options |
| `value` | `string \| string[]` | `undefined` | Selected value(s) |
| `onChange` | `(event: ChangeEvent) => void` | `undefined` | Change handler |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `multiple` | `boolean` | `false` | Multiple selection |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `invalid` | `boolean` | `false` | Invalid state |
| `valid` | `boolean` | `false` | Valid state |
| `size` | `Size` | `'md'` | Size variant |

### Usage

```jsx
function SelectExample() {
  const [country, setCountry] = useState('');
  const [languages, setLanguages] = useState([]);

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' }
  ];

  return (
    <div className="u-gap-4">
      {/* Single select */}
      <FormGroup label="Country" required>
        <Select 
          options={countryOptions}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Select a country"
          required
        />
      </FormGroup>

      {/* Multiple select */}
      <FormGroup label="Languages">
        <Select 
          options={languageOptions}
          value={languages}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, option => option.value);
            setLanguages(values);
          }}
          multiple
          placeholder="Select languages"
        />
      </FormGroup>
    </div>
  );
}
```

## Checkbox Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | `undefined` | Checkbox label |
| `checked` | `boolean` | `undefined` | Checked state |
| `onChange` | `(event: ChangeEvent) => void` | `undefined` | Change handler |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `invalid` | `boolean` | `false` | Invalid state |
| `valid` | `boolean` | `false` | Valid state |

### Usage

```jsx
function CheckboxExample() {
  const [preferences, setPreferences] = useState({
    newsletter: false,
    notifications: true,
    marketing: false
  });

  const handleCheckboxChange = (field) => (event) => {
    setPreferences(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  return (
    <div className="u-gap-3">
      <FormGroup label="Preferences">
        <div className="u-gap-2">
          <Checkbox 
            label="Subscribe to newsletter"
            checked={preferences.newsletter}
            onChange={handleCheckboxChange('newsletter')}
          />
          
          <Checkbox 
            label="Enable notifications"
            checked={preferences.notifications}
            onChange={handleCheckboxChange('notifications')}
          />
          
          <Checkbox 
            label="Receive marketing emails"
            checked={preferences.marketing}
            onChange={handleCheckboxChange('marketing')}
          />
        </div>
      </FormGroup>

      {/* Terms and conditions */}
      <Checkbox 
        label={
          <span>
            I agree to the{' '}
            <a href="/terms" className="u-text-primary">Terms and Conditions</a>
          </span>
        }
        required
      />
    </div>
  );
}
```

## Radio Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | `undefined` | Radio label |
| `checked` | `boolean` | `undefined` | Checked state |
| `onChange` | `(event: ChangeEvent) => void` | `undefined` | Change handler |
| `name` | `string` | `undefined` | Radio group name |
| `value` | `string` | `undefined` | Radio value |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `invalid` | `boolean` | `false` | Invalid state |
| `valid` | `boolean` | `false` | Valid state |

### Usage

```jsx
function RadioExample() {
  const [plan, setPlan] = useState('');
  const [payment, setPayment] = useState('');

  return (
    <div className="u-gap-4">
      {/* Plan selection */}
      <FormGroup label="Choose a plan" required>
        <div className="u-gap-2">
          <Radio 
            label="Basic Plan - $9/month"
            name="plan"
            value="basic"
            checked={plan === 'basic'}
            onChange={(e) => setPlan(e.target.value)}
          />
          
          <Radio 
            label="Pro Plan - $19/month"
            name="plan"
            value="pro"
            checked={plan === 'pro'}
            onChange={(e) => setPlan(e.target.value)}
          />
          
          <Radio 
            label="Enterprise Plan - $49/month"
            name="plan"
            value="enterprise"
            checked={plan === 'enterprise'}
            onChange={(e) => setPlan(e.target.value)}
          />
        </div>
      </FormGroup>

      {/* Payment method */}
      <FormGroup label="Payment method">
        <div className="u-gap-2">
          <Radio 
            label="Credit Card"
            name="payment"
            value="card"
            checked={payment === 'card'}
            onChange={(e) => setPayment(e.target.value)}
          />
          
          <Radio 
            label="PayPal"
            name="payment"
            value="paypal"
            checked={payment === 'paypal'}
            onChange={(e) => setPayment(e.target.value)}
          />
        </div>
      </FormGroup>
    </div>
  );
}
```

## Textarea Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Textarea value |
| `onChange` | `(event: ChangeEvent) => void` | `undefined` | Change handler |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `rows` | `number` | `4` | Number of rows |
| `cols` | `number` | `undefined` | Number of columns |
| `required` | `boolean` | `false` | Required field |
| `readOnly` | `boolean` | `false` | Read-only state |
| `disabled` | `boolean` | `false` | Disabled state |
| `invalid` | `boolean` | `false` | Invalid state |
| `valid` | `boolean` | `false` | Valid state |
| `size` | `Size` | `'md'` | Size variant |

### Usage

```jsx
function TextareaExample() {
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  return (
    <div className="u-gap-4">
      {/* Basic textarea */}
      <FormGroup label="Message" required>
        <Textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message..."
          rows={4}
          required
        />
      </FormGroup>

      {/* Feedback textarea */}
      <FormGroup 
        label="Feedback" 
        helperText={`${feedback.length}/500 characters`}
      >
        <Textarea 
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your feedback..."
          rows={6}
          maxLength={500}
        />
      </FormGroup>
    </div>
  );
}
```

## Complete Form Example

```jsx
function CompleteForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    plan: '',
    newsletter: false,
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.plan) newErrors.plan = 'Please select a plan';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    console.log('Form submitted:', formData);
  };

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' 
      ? event.target.checked 
      : event.target.value;
      
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="u-max-w-md u-mx-auto u-gap-4">
      <div className="u-d-grid u-grid-cols-2 u-gap-4">
        <FormGroup 
          label="First Name" 
          required
          invalid={!!errors.firstName}
          helperText={errors.firstName}
        >
          <Input 
            value={formData.firstName}
            onChange={handleChange('firstName')}
            invalid={!!errors.firstName}
            required
          />
        </FormGroup>

        <FormGroup label="Last Name">
          <Input 
            value={formData.lastName}
            onChange={handleChange('lastName')}
          />
        </FormGroup>
      </div>

      <FormGroup 
        label="Email" 
        required
        invalid={!!errors.email}
        helperText={errors.email}
      >
        <Input 
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          invalid={!!errors.email}
          required
        />
      </FormGroup>

      <FormGroup label="Phone">
        <Input 
          type="tel"
          value={formData.phone}
          onChange={handleChange('phone')}
          placeholder="+1 (555) 123-4567"
        />
      </FormGroup>

      <FormGroup label="Country">
        <Select 
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' }
          ]}
          value={formData.country}
          onChange={handleChange('country')}
          placeholder="Select country"
        />
      </FormGroup>

      <FormGroup 
        label="Plan" 
        required
        invalid={!!errors.plan}
        helperText={errors.plan}
      >
        <div className="u-gap-2">
          <Radio 
            label="Basic - $9/month"
            name="plan"
            value="basic"
            checked={formData.plan === 'basic'}
            onChange={handleChange('plan')}
          />
          <Radio 
            label="Pro - $19/month"
            name="plan"
            value="pro"
            checked={formData.plan === 'pro'}
            onChange={handleChange('plan')}
          />
        </div>
      </FormGroup>

      <Checkbox 
        label="Subscribe to newsletter"
        checked={formData.newsletter}
        onChange={handleChange('newsletter')}
      />

      <FormGroup label="Message">
        <Textarea 
          value={formData.message}
          onChange={handleChange('message')}
          placeholder="Any additional comments..."
          rows={4}
        />
      </FormGroup>

      <div className="u-d-flex u-gap-3">
        <Button type="submit" label="Submit" variant="primary" />
        <Button type="reset" label="Reset" variant="secondary" />
      </div>
    </Form>
  );
}
```

## Validation Patterns

### Client-side Validation

```jsx
function useFormValidation(initialState, validationRules) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = (fieldName, value) => {
    const rule = validationRules[fieldName];
    if (!rule) return '';

    if (rule.required && !value) {
      return rule.requiredMessage || `${fieldName} is required`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.patternMessage || `${fieldName} is invalid`;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `${fieldName} must be at least ${rule.minLength} characters`;
    }

    return '';
  };

  const handleChange = (fieldName) => (event) => {
    const value = event.target.value;
    setValues(prev => ({ ...prev, [fieldName]: value }));
    
    const error = validate(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach(fieldName => {
      const error = validate(fieldName, values[fieldName]);
      if (error) newErrors[fieldName] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validateAll };
}
```

## Accessibility

### ARIA Attributes

- `aria-required` - Indicates required fields
- `aria-invalid` - Indicates validation state
- `aria-describedby` - Links to helper text
- `role="group"` - Groups related form controls

### Keyboard Navigation

- **Tab** - Navigate between form controls
- **Enter** - Submit forms
- **Space** - Toggle checkboxes and radio buttons
- **Arrow keys** - Navigate radio button groups

### Screen Reader Support

- Labels are properly associated with controls
- Error messages are announced
- Required fields are indicated
- Field types are communicated

## Best Practices

### Do's ✅

- Always provide labels for form controls
- Use appropriate input types
- Provide clear error messages
- Group related fields
- Use proper validation timing

### Don'ts ❌

- Don't use placeholder text as labels
- Don't validate on every keystroke
- Don't use color alone to indicate errors
- Don't make forms too long

## Related Components

- **Button** - Form submission and actions
- **Icon** - Visual enhancement
- **Tooltip** - Additional help text
- **Modal** - Form dialogs
- **Card** - Form containers
