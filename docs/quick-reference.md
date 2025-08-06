# Atomix Quick Reference

A quick reference guide for developers using the Atomix design system. This guide provides essential information for rapid development and common use cases.

## 🚀 Getting Started

### Installation

```bash
npm install @shohojdhara/atomix
```

### Basic Setup

```jsx
import React from 'react';
import { Button, Card, Avatar } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';

function App() {
  return (
    <Card title="Welcome" text="Get started with Atomix">
      <Button label="Get Started" variant="primary" />
    </Card>
  );
}
```

## 🎨 Design Tokens

### Colors

```css
/* Primary colors */
--color-primary: #3b82f6;
--color-secondary: #6b7280;
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #06b6d4;

/* Neutral colors */
--color-light: #f8fafc;
--color-dark: #1f2937;
```

### Sizes

```css
/* Component sizes */
--size-sm: 0.875rem;
--size-md: 1rem;
--size-lg: 1.125rem;

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
```

## 🧩 Component Cheat Sheet

### Button

```jsx
// Basic variants
<Button label="Primary" variant="primary" />
<Button label="Secondary" variant="secondary" />
<Button label="Success" variant="success" />
<Button label="Error" variant="error" />

// Sizes
<Button label="Small" size="sm" />
<Button label="Medium" size="md" />
<Button label="Large" size="lg" />

// With icon
<Button label="Save" icon={<Icon name="FloppyDisk" />} />
<Button label="Delete" icon={<Icon name="Trash" />} iconOnly />

// States
<Button label="Disabled" disabled />
<Button label="Loading" icon={<Spinner size="sm" />} />
```

### Card

```jsx
// Basic card
<Card title="Title" text="Content" />

// With image
<Card 
  image="/image.jpg" 
  title="Title" 
  text="Content"
  actions={<Button label="Action" />}
/>

// Horizontal layout
<Card row image="/thumb.jpg" title="Title" text="Content" />

// Interactive
<Card title="Clickable" onClick={handleClick} />
```

### Form Components

```jsx
// Form with validation
<Form onSubmit={handleSubmit}>
  <FormGroup label="Email" required invalid={!!errors.email}>
    <Input 
      type="email" 
      value={email}
      onChange={setEmail}
      invalid={!!errors.email}
    />
  </FormGroup>
  
  <FormGroup label="Country">
    <Select 
      options={countryOptions}
      value={country}
      onChange={setCountry}
    />
  </FormGroup>
  
  <Checkbox label="Subscribe to newsletter" />
  
  <Button type="submit" label="Submit" variant="primary" />
</Form>
```

### Modal

```jsx
// Basic modal
<Modal 
  isOpen={isOpen} 
  onOpenChange={setIsOpen}
  title="Modal Title"
>
  <p>Modal content</p>
</Modal>

// Confirmation modal
<Modal 
  isOpen={showConfirm}
  title="Confirm Action"
  footer={
    <>
      <Button label="Cancel" onClick={onCancel} />
      <Button label="Confirm" variant="error" onClick={onConfirm} />
    </>
  }
>
  <p>Are you sure?</p>
</Modal>
```

### Navigation

```jsx
// Navbar
<Navbar 
  brand={<Logo />}
  collapsible
>
  <Nav>
    <NavItem href="/" active>Home</NavItem>
    <NavItem href="/about">About</NavItem>
  </Nav>
</Navbar>

// Breadcrumb
<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Current Page', active: true }
]} />
```

### Avatar

```jsx
// Basic avatar
<Avatar src="/user.jpg" alt="User" circle />

// With fallback
<Avatar src="/broken.jpg" initials="JD" circle />

// Avatar group
<AvatarGroup max={3}>
  <Avatar src="/user1.jpg" circle />
  <Avatar src="/user2.jpg" circle />
  <Avatar src="/user3.jpg" circle />
  <Avatar src="/user4.jpg" circle />
</AvatarGroup>
```

## 🎯 Common Patterns

### Loading States

```jsx
function LoadingButton() {
  const [loading, setLoading] = useState(false);
  
  return (
    <Button 
      label={loading ? "Loading..." : "Submit"}
      icon={loading ? <Spinner size="sm" /> : undefined}
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await submitData();
        setLoading(false);
      }}
    />
  );
}
```

### Form Validation

```jsx
function ValidatedForm() {
  const [errors, setErrors] = useState({});
  
  const validate = (field, value) => {
    const newErrors = { ...errors };
    
    if (!value) {
      newErrors[field] = 'This field is required';
    } else {
      delete newErrors[field];
    }
    
    setErrors(newErrors);
  };
  
  return (
    <FormGroup 
      label="Email" 
      required
      invalid={!!errors.email}
      helperText={errors.email}
    >
      <Input 
        type="email"
        onBlur={(e) => validate('email', e.target.value)}
        invalid={!!errors.email}
      />
    </FormGroup>
  );
}
```

### Responsive Layout

```jsx
function ResponsiveCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <Card 
          key={item.id}
          title={item.title}
          text={item.description}
          actions={<Button label="View" variant="primary" />}
        />
      ))}
    </div>
  );
}
```

### Dark Mode Toggle

```jsx
function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <ColorModeToggle 
      mode={darkMode ? 'dark' : 'light'}
      onModeChange={(mode) => setDarkMode(mode === 'dark')}
    />
  );
}
```

## 🎨 CSS Classes Reference

### Component Classes

```css
/* Buttons */
.c-button                    /* Base button */
.c-button--primary          /* Primary variant */
.c-button--sm               /* Small size */
.c-button--rounded          /* Rounded button */

/* Cards */
.c-card                     /* Base card */
.c-card--row               /* Horizontal layout */
.c-card--active            /* Active state */

/* Forms */
.c-form-group              /* Form group wrapper */
.c-input                   /* Input field */
.c-input--invalid          /* Invalid state */

/* Navigation */
.c-navbar                  /* Navbar container */
.c-nav                     /* Navigation list */
.c-nav-item                /* Navigation item */
.c-nav-item--active        /* Active nav item */

/* Avatars */
.c-avatar                  /* Base avatar */
.c-avatar--circle          /* Circular avatar */
.c-avatar--lg              /* Large avatar */
```

### Utility Classes

```css
/* State modifiers */
.is-active                 /* Active state */
.is-disabled               /* Disabled state */
.is-loading                /* Loading state */
.is-open                   /* Open state */

/* Spacing utilities */
.u-m-2                     /* Margin 0.5rem */
.u-p-4                     /* Padding 1rem */
.u-gap-6                   /* Gap 1.5rem */

/* Display utilities */
.u-d-flex                  /* Flexbox */
.u-d-grid                  /* Grid */
.u-d-none                  /* Hidden */
.u-visually-hidden         /* Visually hidden */
```

## 🔧 Vanilla JavaScript

### Basic Usage

```javascript
// Initialize components
const button = new Atomix.Button('.my-button', {
  variant: 'primary',
  onClick: () => console.log('Clicked!')
});

const modal = new Atomix.Modal('.my-modal', {
  title: 'Modal Title',
  onOpen: () => console.log('Modal opened')
});

// Auto-initialize from data attributes
Atomix.init();
```

### Data Attributes

```html
<!-- Button -->
<button 
  class="c-button" 
  data-atomix="button"
  data-variant="primary">
  Click me
</button>

<!-- Modal -->
<div 
  class="c-modal" 
  data-atomix="modal"
  data-title="Modal Title">
  <!-- Modal content -->
</div>
```

## ♿ Accessibility Quick Tips

### ARIA Attributes

```jsx
// Buttons
<Button 
  label="Delete" 
  aria-label="Delete item"
  iconOnly 
/>

// Forms
<Input 
  aria-describedby="email-help"
  aria-invalid={!!errors.email}
/>

// Modals
<Modal 
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
/>
```

### Keyboard Navigation

- **Tab** - Navigate between interactive elements
- **Enter/Space** - Activate buttons and controls
- **Escape** - Close modals and dropdowns
- **Arrow keys** - Navigate within menus and lists

### Screen Reader Support

```jsx
// Provide meaningful labels
<Button label="Add to cart" />

// Use semantic HTML
<nav aria-label="Main navigation">
  <Nav>...</Nav>
</nav>

// Announce dynamic changes
<div aria-live="polite">
  {status && <span>{status}</span>}
</div>
```

## 🚨 Common Gotchas

### Import Issues

```jsx
// ❌ Wrong - importing from wrong path
import { Button } from 'atomix';

// ✅ Correct - use full package name
import { Button } from '@shohojdhara/atomix';
```

### CSS Not Loading

```jsx
// ❌ Missing CSS import
import { Button } from '@shohojdhara/atomix';

// ✅ Include CSS
import { Button } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';
```

### Event Handlers

```jsx
// ❌ Wrong - inline function creates new reference
<Button onClick={() => handleClick()} />

// ✅ Better - stable reference
const handleButtonClick = useCallback(() => {
  handleClick();
}, []);

<Button onClick={handleButtonClick} />
```

### Form Validation

```jsx
// ❌ Wrong - validating on every keystroke
<Input onChange={(e) => validate(e.target.value)} />

// ✅ Better - validate on blur
<Input onBlur={(e) => validate(e.target.value)} />
```

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
.component {
  /* Mobile styles */
}

@media (min-width: 640px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

@media (min-width: 1280px) {
  /* Large desktop styles */
}
```

## 🔗 Useful Links

- [Component Reference](./component-reference.md) - Complete component overview
- [Implementation Guide](./implementation-guide.md) - Setup and configuration
- [Theme System Guide](../src/docs/theme-system-guide.mdx) - Customization and theming
- [Storybook](https://storybook.atomix.design) - Interactive component examples

## 💡 Pro Tips

1. **Use TypeScript** for better development experience
2. **Test with keyboard navigation** to ensure accessibility
3. **Implement loading states** for better UX
4. **Use semantic HTML** elements when possible
5. **Follow the design system** for consistency
6. **Test on mobile devices** for responsive behavior
7. **Use proper ARIA labels** for screen readers
8. **Optimize images** used in components like Avatar and Card
