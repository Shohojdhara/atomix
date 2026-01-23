# Textarea

The Textarea component provides a multi-line text input field for longer text content. It supports auto-resize, character counting, validation states, and glass morphism effects.

## Overview

The Textarea component is designed for collecting longer text input from users, such as comments, descriptions, messages, or any multi-line content. It provides consistent styling with other form inputs and includes features like character limits and validation states.

## Installation

The Textarea component is included in the Atomix package. Import it in your React components:

```jsx
import { Textarea } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, textarea styles are available through CSS classes.

## Basic Usage

### React

```jsx
import { Textarea, FormGroup } from '@shohojdhara/atomix';

function MyComponent() {
  const [message, setMessage] = useState('');

  return (
    <FormGroup label="Message">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message..."
        rows={4}
      />
    </FormGroup>
  );
}
```

### HTML/CSS

```html
<div class="c-form-group">
  <label class="c-form-group__label" for="message">Message</label>
  <div class="c-form-group__field">
    <textarea
      id="message"
      class="c-input c-input--md"
      rows="4"
      placeholder="Enter your message..."
    ></textarea>
  </div>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string` | - | No | Controlled textarea value |
| `onChange` | `(event: ChangeEvent<HTMLTextAreaElement>) => void` | - | No | Change event handler |
| `onBlur` | `(event: FocusEvent<HTMLTextAreaElement>) => void` | - | No | Blur event handler |
| `onFocus` | `(event: FocusEvent<HTMLTextAreaElement>) => void` | - | No | Focus event handler |
| `placeholder` | `string` | - | No | Placeholder text |
| `disabled` | `boolean` | `false` | No | Whether the textarea is disabled |
| `required` | `boolean` | `false` | No | Whether the textarea is required |
| `readOnly` | `boolean` | `false` | No | Whether the textarea is read-only |
| `id` | `string` | - | No | Textarea ID |
| `name` | `string` | - | No | Textarea name attribute |
| `rows` | `number` | `4` | No | Number of visible text lines |
| `cols` | `number` | - | No | Number of visible text columns |
| `maxLength` | `number` | - | No | Maximum number of characters |
| `minLength` | `number` | - | No | Minimum number of characters |
| `size` | `Size` | `'md'` | No | Size of the textarea (`'sm'`, `'md'`, `'lg'`) |
| `variant` | `string` | - | No | Visual variant of the textarea |
| `invalid` | `boolean` | `false` | No | Whether the textarea has validation errors |
| `valid` | `boolean` | `false` | No | Whether the textarea has passed validation |
| `autoFocus` | `boolean` | `false` | No | Whether to auto-focus the textarea |
| `ariaLabel` | `string` | - | No | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | - | No | ARIA described-by attribute |
| `glass` | `boolean \| AtomixGlassProps` | `false` | No | Enable glass morphism effect |
| `className` | `string` | `''` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | - | No | Custom style object |

### Size Options

- `'sm'` - Small textarea (32px height)
- `'md'` - Medium textarea (40px height) - Default
- `'lg'` - Large textarea (48px height)

## Examples

### Basic Textarea

```jsx
function BasicTextarea() {
  const [message, setMessage] = useState('');

  return (
    <FormGroup label="Message">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message..."
        rows={4}
      />
    </FormGroup>
  );
}
```

### With Character Count

```jsx
function TextareaWithCount() {
  const [text, setText] = useState('');
  const maxLength = 200;
  const remaining = maxLength - text.length;

  return (
    <FormGroup
      label="Description"
      helperText={
        <div className="u-flex u-justify-between">
          <span>Tell us about yourself</span>
          <span style={{ color: remaining < 20 ? 'red' : 'inherit' }}>
            {remaining} characters remaining
          </span>
        </div>
      }
    >
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        rows={4}
        placeholder="Write a short description..."
      />
    </FormGroup>
  );
}
```

### Textarea Sizes

```jsx
function TextareaSizes() {
  return (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '400px' }}>
      <FormGroup label="Small">
        <Textarea size="sm" rows={3} placeholder="Small textarea" />
      </FormGroup>
      <FormGroup label="Medium">
        <Textarea size="md" rows={4} placeholder="Medium textarea" />
      </FormGroup>
      <FormGroup label="Large">
        <Textarea size="lg" rows={5} placeholder="Large textarea" />
      </FormGroup>
    </div>
  );
}
```

### Validation States

```jsx
function ValidationStates() {
  const [message, setMessage] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setIsInvalid(value.length < 10);
    setIsValid(value.length >= 10 && value.length <= 500);
  };

  return (
    <div className="u-gap-4">
      <FormGroup
        label="Message"
        helperText={isInvalid ? "Message must be at least 10 characters" : ""}
        invalid={isInvalid}
      >
        <Textarea
          value={message}
          onChange={handleChange}
          invalid={isInvalid}
          rows={4}
          placeholder="Enter at least 10 characters..."
        />
      </FormGroup>

      <FormGroup
        label="Valid Message"
        helperText="Message looks good!"
        valid={isValid}
      >
        <Textarea
          value={message}
          onChange={handleChange}
          valid={isValid}
          rows={4}
          placeholder="Enter your message..."
        />
      </FormGroup>
    </div>
  );
}
```

### Disabled and Read-Only States

```jsx
function DisabledStates() {
  return (
    <div className="u-flex u-flex-column u-gap-3" style={{ width: '400px' }}>
      <FormGroup label="Disabled Textarea">
        <Textarea
          value="This textarea is disabled"
          disabled
          rows={4}
        />
      </FormGroup>
      <FormGroup label="Read-Only Textarea">
        <Textarea
          value="This textarea is read-only"
          readOnly
          rows={4}
        />
      </FormGroup>
    </div>
  );
}
```

### Glass Effect

```jsx
function GlassTextarea() {
  return (
    <div
      style={{
        background: 'url(https://example.com/background.jpg)',
        padding: '2rem',
        borderRadius: '12px',
        backgroundSize: 'cover',
      }}
    >
      <FormGroup label="Glass Textarea">
        <Textarea
          glass={true}
          rows={4}
          placeholder="Enter your message with glass effect..."
        />
      </FormGroup>
    </div>
  );
}
```

### Custom Glass Configuration

```jsx
function CustomGlassTextarea() {
  return (
    <FormGroup label="Custom Glass">
      <Textarea
        glass={{
          displacementScale: 60,
          blurAmount: 1,
          saturation: 180,
          aberrationIntensity: 1,
          cornerRadius: 8,
          mode: 'shader',
        }}
        rows={4}
        placeholder="Custom glass textarea..."
      />
    </FormGroup>
  );
}
```

## Accessibility

The Textarea component follows WCAG accessibility guidelines:

### Keyboard Support

- **Tab**: Moves focus to the textarea
- **Shift + Tab**: Moves focus away from the textarea
- **Arrow Keys**: Navigate within text (standard textarea behavior)
- **Home/End**: Move to beginning/end of text
- **Ctrl+A**: Select all text

### ARIA Attributes

- `aria-label` - Accessible label when no visible label is present
- `aria-describedby` - References helper text or error messages
- `aria-invalid` - Indicates validation state
- `aria-required` - Indicates required state

### Best Practices

1. **Always provide labels**: Use FormGroup with a label or provide aria-label
   ```jsx
   <FormGroup label="Message" htmlFor="message">
     <Textarea id="message" />
   </FormGroup>
   ```

2. **Use helper text for guidance**:
   ```jsx
   <FormGroup
     label="Description"
     helperText="Provide a detailed description"
   >
     <Textarea rows={4} />
   </FormGroup>
   ```

3. **Provide error messages**:
   ```jsx
   <FormGroup
     label="Message"
     helperText="Message must be at least 10 characters"
     invalid={message.length < 10}
   >
     <Textarea
       value={message}
       invalid={message.length < 10}
       rows={4}
     />
   </FormGroup>
   ```

4. **Set appropriate rows**:
   ```jsx
   <Textarea rows={4} /> // Short messages
   <Textarea rows={8} /> // Longer content
   ```

## Styling

### CSS Custom Properties

The Textarea component uses CSS custom properties for theming:

```css
:root {
  --atomix-textarea-padding-x: 0.75rem;
  --atomix-textarea-padding-y: 0.5rem;
  --atomix-textarea-border-width: 1px;
  --atomix-textarea-border-radius: var(--atomix-border-radius);
  --atomix-textarea-font-family: inherit;
  --atomix-textarea-font-size: 1rem;
  --atomix-textarea-line-height: 1.5;
}
```

### CSS Classes

The component uses BEM methodology:

```css
.c-input { /* Base input/textarea class */ }
.c-input--sm { /* Small size */ }
.c-input--md { /* Medium size */ }
.c-input--lg { /* Large size */ }
.c-input--invalid { /* Invalid state */ }
.c-input--valid { /* Valid state */ }
.c-input--disabled { /* Disabled state */ }
.c-input--glass { /* Glass effect */ }
```

## Integration with Forms

### With FormGroup

```jsx
<FormGroup
  label="Message"
  helperText="Enter your message (max 500 characters)"
  required
  invalid={message.length > 500}
>
  <Textarea
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    maxLength={500}
    rows={4}
    required
    invalid={message.length > 500}
  />
</FormGroup>
```

### With React Hook Form

```jsx
import { useForm, Controller } from 'react-hook-form';

function FormWithTextarea() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="message"
        control={control}
        rules={{
          required: 'Message is required',
          minLength: {
            value: 10,
            message: 'Message must be at least 10 characters',
          },
        }}
        render={({ field, fieldState }) => (
          <FormGroup
            label="Message"
            helperText={fieldState.error?.message}
            invalid={!!fieldState.error}
          >
            <Textarea
              {...field}
              rows={4}
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

### Comment Form

```jsx
function CommentForm() {
  const [comment, setComment] = useState('');

  return (
    <FormGroup label="Add a comment" required>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        rows={4}
        maxLength={1000}
        required
      />
    </FormGroup>
  );
}
```

### Contact Form Message

```jsx
function ContactMessage() {
  const [message, setMessage] = useState('');

  return (
    <FormGroup
      label="Message"
      helperText="Please provide details about your inquiry"
      required
    >
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message..."
        rows={6}
        required
      />
    </FormGroup>
  );
}
```

## Browser Support

The Textarea component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[FormGroup](./form-group.md)** - For wrapping textareas with labels and help text
- **[Input](./input.md)** - For single-line text input
- **[Select](./select.md)** - For dropdown selections
- **[Button](./button.md)** - Often used with textareas in forms

## Migration Guide

### From HTML Textarea

```jsx
// Before (HTML)
<textarea id="message" rows="4" placeholder="Enter message..."></textarea>

// After (Atomix)
<Textarea
  id="message"
  rows={4}
  placeholder="Enter message..."
/>
```

