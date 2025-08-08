# Popover

The Popover component displays floating content that appears relative to a trigger element. It's commonly used for tooltips, contextual menus, additional information panels, and interactive overlays that need to be positioned dynamically.

## Overview

The Popover component creates a floating overlay that appears when triggered by user interaction (hover or click). It automatically positions itself relative to the trigger element and includes smart positioning logic to ensure it stays within the viewport. The component is built with accessibility in mind and supports keyboard navigation.

## Installation

The Popover component is included in the Atomix package. Import it in your React components:

```jsx
import { Popover } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the popover styles and functionality are available through the CSS classes and JavaScript modules.

## Basic Usage

### React

```jsx
import { Popover } from '@shohojdhara/atomix';

function MyComponent() {
  return (
    <Popover
      content={<div>This is popover content!</div>}
      trigger="click"
      position="top"
    >
      <button>Click me</button>
    </Popover>
  );
}
```

### HTML/CSS

```html
<!-- Popover with default styling -->
<div class="c-popover-container" data-popover>
  <button class="c-popover-trigger" data-popover-trigger>
    Hover me
  </button>
  <div class="c-popover c-popover--top" data-popover-content>
    <div class="c-popover__arrow"></div>
    <div class="c-popover__content">
      Popover content goes here
    </div>
  </div>
</div>
```

## API Reference

### Popover Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | - | **Required.** Content to display in the popover |
| `children` | `ReactNode` | - | **Required.** The trigger element |
| `position` | `PopoverPosition` | `'top'` | Position of the popover relative to trigger |
| `trigger` | `'hover' \| 'click'` | `'click'` | How the popover is triggered |
| `className` | `string` | `''` | Additional CSS classes |
| `delay` | `number` | `0` | Delay before showing (milliseconds) |
| `offset` | `number` | `12` | Distance from trigger element (pixels) |
| `defaultOpen` | `boolean` | `false` | Whether popover is initially open |
| `isOpen` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(isOpen: boolean) => void` | - | Open state change callback |
| `closeOnClickOutside` | `boolean` | `true` | Close when clicking outside |
| `closeOnEscape` | `boolean` | `true` | Close when pressing Escape |
| `id` | `string` | - | Optional ID for the popover |

### Position Options

- `'top'` - Above the trigger element
- `'bottom'` - Below the trigger element  
- `'left'` - To the left of the trigger element
- `'right'` - To the right of the trigger element
- `'auto'` - Automatically choose best position

## Examples

### Basic Popover

```jsx
function BasicPopover() {
  return (
    <div className="example-container">
      <Popover
        content={
          <div className="popover-content">
            <h4>Popover Title</h4>
            <p>This is some helpful information in a popover.</p>
          </div>
        }
        position="top"
      >
        <button className="trigger-button">
          Show Popover
        </button>
      </Popover>
    </div>
  );
}
```

### Hover Triggered Popover

```jsx
function HoverPopover() {
  return (
    <div className="hover-examples">
      <Popover
        content="Quick info on hover"
        trigger="hover"
        position="top"
        delay={300}
      >
        <span className="info-text">
          Hover over me for more info
        </span>
      </Popover>
    </div>
  );
}
```

### Different Positions

```jsx
function PositionExamples() {
  const content = <div className="demo-content">Popover content</div>;

  return (
    <div className="position-demo">
      <div className="position-grid">
        <Popover content={content} position="top">
          <button>Top</button>
        </Popover>

        <Popover content={content} position="right">
          <button>Right</button>
        </Popover>

        <Popover content={content} position="bottom">
          <button>Bottom</button>
        </Popover>

        <Popover content={content} position="left">
          <button>Left</button>
        </Popover>

        <Popover content={content} position="auto">
          <button>Auto Position</button>
        </Popover>
      </div>
    </div>
  );
}
```

### Rich Content Popover

```jsx
function RichContentPopover() {
  const userProfile = (
    <div className="user-profile-popover">
      <div className="profile-header">
        <img 
          src="https://example.com/avatar.jpg" 
          alt="User avatar" 
          className="avatar"
        />
        <div className="profile-info">
          <h4>John Doe</h4>
          <p className="role">Senior Developer</p>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-value">42</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat">
          <span className="stat-value">156</span>
          <span className="stat-label">Commits</span>
        </div>
      </div>
      <div className="profile-actions">
        <button className="btn btn--sm">View Profile</button>
        <button className="btn btn--sm btn--outline">Message</button>
      </div>
    </div>
  );

  return (
    <Popover
      content={userProfile}
      trigger="click"
      position="bottom"
      className="user-profile-popover-container"
    >
      <div className="user-mention">
        @johndoe
      </div>
    </Popover>
  );
}
```

### Form Field Help

```jsx
function FormFieldHelp() {
  return (
    <div className="form-field">
      <label htmlFor="password">
        Password
        <Popover
          content={
            <div className="password-help">
              <h5>Password Requirements</h5>
              <ul>
                <li>At least 8 characters long</li>
                <li>Include uppercase and lowercase letters</li>
                <li>Include at least one number</li>
                <li>Include at least one special character</li>
              </ul>
            </div>
          }
          trigger="hover"
          position="right"
        >
          <Icon name="HelpCircle" className="help-icon" />
        </Popover>
      </label>
      <input
        id="password"
        type="password"
        className="form-input"
      />
    </div>
  );
}
```

### Controlled Popover

```jsx
function ControlledPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const menuContent = (
    <div className="menu-content">
      <button 
        className="menu-item"
        onClick={() => {
          setSelectedOption('edit');
          setIsOpen(false);
        }}
      >
        <Icon name="Edit" />
        Edit
      </button>
      <button 
        className="menu-item"
        onClick={() => {
          setSelectedOption('delete');
          setIsOpen(false);
        }}
      >
        <Icon name="Trash" />
        Delete
      </button>
      <button 
        className="menu-item"
        onClick={() => {
          setSelectedOption('share');
          setIsOpen(false);
        }}
      >
        <Icon name="Share" />
        Share
      </button>
    </div>
  );

  return (
    <div>
      <Popover
        content={menuContent}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        position="bottom"
        closeOnClickOutside={true}
      >
        <button className="menu-trigger">
          <Icon name="MoreVertical" />
        </button>
      </Popover>

      {selectedOption && (
        <p>You selected: {selectedOption}</p>
      )}
    </div>
  );
}
```

### Interactive Popover

```jsx
function InteractivePopover() {
  const [color, setColor] = useState('#3b82f6');

  const colorPicker = (
    <div className="color-picker" onClick={(e) => e.stopPropagation()}>
      <h5>Choose Color</h5>
      <div className="color-options">
        {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'].map(c => (
          <button
            key={c}
            className={`color-option ${color === c ? 'active' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="color-input"
      />
    </div>
  );

  return (
    <div className="color-picker-demo">
      <Popover
        content={colorPicker}
        trigger="click"
        position="bottom"
        closeOnClickOutside={false}
      >
        <div 
          className="color-preview"
          style={{ backgroundColor: color }}
        >
          Click to change color
        </div>
      </Popover>
    </div>
  );
}
```

### Multiple Popovers

```jsx
function MultiplePopovers() {
  return (
    <div className="toolbar">
      <Popover
        content="Bold text"
        trigger="hover"
        position="top"
        delay={500}
      >
        <button className="toolbar-btn">
          <Icon name="Bold" />
        </button>
      </Popover>

      <Popover
        content="Italic text"
        trigger="hover" 
        position="top"
        delay={500}
      >
        <button className="toolbar-btn">
          <Icon name="Italic" />
        </button>
      </Popover>

      <Popover
        content={
          <div className="color-palette">
            <div className="color-row">
              <div className="color-swatch" style={{backgroundColor: '#000'}}></div>
              <div className="color-swatch" style={{backgroundColor: '#333'}}></div>
              <div className="color-swatch" style={{backgroundColor: '#666'}}></div>
            </div>
          </div>
        }
        trigger="click"
        position="bottom"
      >
        <button className="toolbar-btn">
          <Icon name="Palette" />
        </button>
      </Popover>
    </div>
  );
}
```

### Popover with Form

```jsx
function PopoverForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsOpen(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const quickContactForm = (
    <form className="quick-contact-form" onSubmit={handleSubmit}>
      <h4>Quick Contact</h4>
      <div className="form-group">
        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Your message"
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          rows={3}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn--primary btn--sm">
          Send
        </button>
        <button 
          type="button" 
          className="btn btn--secondary btn--sm"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <Popover
      content={quickContactForm}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      position="bottom"
      closeOnClickOutside={false}
    >
      <button className="contact-trigger">
        Quick Contact
      </button>
    </Popover>
  );
}
```

## Accessibility

The Popover component follows WCAG accessibility guidelines:

### Keyboard Support

- **Escape**: Closes the popover (when `closeOnEscape` is true)
- **Tab**: Moves focus through interactive elements within the popover
- **Shift + Tab**: Moves focus backward through interactive elements
- Focus is trapped within the popover when it contains interactive content

### ARIA Attributes

- `role="tooltip"` for simple informational popovers
- `role="dialog"` for interactive popovers
- `aria-describedby` linking the trigger to the popover
- `aria-expanded` on the trigger element
- `aria-live="polite"` for dynamic content announcements

### Focus Management

```jsx
function AccessiblePopover() {
  const popoverContent = (
    <div className="accessible-popover">
      <h4 id="popover-title">User Actions</h4>
      <div role="group" aria-labelledby="popover-title">
        <button>Edit Profile</button>
        <button>Change Password</button>
        <button>Log Out</button>
      </div>
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      trigger="click"
      position="bottom"
      aria-label="User menu"
    >
      <button aria-haspopup="true">
        <Icon name="User" />
        <span className="sr-only">Open user menu</span>
      </button>
    </Popover>
  );
}
```

### Best Practices

1. **Provide clear trigger indicators** for interactive elements
2. **Use semantic HTML** within popover content
3. **Include appropriate ARIA labels** and roles
4. **Ensure sufficient color contrast** for all text
5. **Test with keyboard navigation** and screen readers
6. **Avoid essential information** in hover-only popovers

## Styling

### CSS Custom Properties

The Popover component uses CSS custom properties for theming:

```css
:root {
  /* Popover container */
  --atomix-popover-bg: var(--atomix-white);
  --atomix-popover-border: 1px solid var(--atomix-border-color);
  --atomix-popover-border-radius: var(--atomix-border-radius);
  --atomix-popover-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --atomix-popover-padding: 1rem;
  --atomix-popover-max-width: 320px;
  --atomix-popover-z-index: 1000;

  /* Arrow */
  --atomix-popover-arrow-size: 8px;
  --atomix-popover-arrow-color: var(--atomix-white);
  --atomix-popover-arrow-border-color: var(--atomix-border-color);

  /* Animation */
  --atomix-popover-transition: opacity 0.2s ease, transform 0.2s ease;
  --atomix-popover-scale-enter: scale(0.95);
  --atomix-popover-scale-exit: scale(0.95);
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base popover class */
.c-popover {
  position: absolute;
  z-index: var(--atomix-popover-z-index);
  background: var(--atomix-popover-bg);
  border: var(--atomix-popover-border);
  border-radius: var(--atomix-popover-border-radius);
  box-shadow: var(--atomix-popover-shadow);
  padding: var(--atomix-popover-padding);
  max-width: var(--atomix-popover-max-width);
  opacity: 0;
  transform: var(--atomix-popover-scale-enter);
  transition: var(--atomix-popover-transition);
  pointer-events: none;
}

/* Open state */
.c-popover.is-open {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

/* Position modifiers */
.c-popover--top {
  margin-bottom: var(--atomix-popover-arrow-size);
}

.c-popover--bottom {
  margin-top: var(--atomix-popover-arrow-size);
}

.c-popover--left {
  margin-right: var(--atomix-popover-arrow-size);
}

.c-popover--right {
  margin-left: var(--atomix-popover-arrow-size);
}

/* Arrow */
.c-popover__arrow {
  position: absolute;
  width: var(--atomix-popover-arrow-size);
  height: var(--atomix-popover-arrow-size);
  background: var(--atomix-popover-arrow-color);
  border: var(--atomix-popover-arrow-border-color);
  transform: rotate(45deg);
}

/* Arrow positions */
.c-popover--top .c-popover__arrow {
  bottom: calc(var(--atomix-popover-arrow-size) * -0.5);
  left: 50%;
  margin-left: calc(var(--atomix-popover-arrow-size) * -0.5);
  border-top: none;
  border-left: none;
}

.c-popover--bottom .c-popover__arrow {
  top: calc(var(--atomix-popover-arrow-size) * -0.5);
  left: 50%;
  margin-left: calc(var(--atomix-popover-arrow-size) * -0.5);
  border-bottom: none;
  border-right: none;
}

.c-popover--left .c-popover__arrow {
  right: calc(var(--atomix-popover-arrow-size) * -0.5);
  top: 50%;
  margin-top: calc(var(--atomix-popover-arrow-size) * -0.5);
  border-left: none;
  border-bottom: none;
}

.c-popover--right .c-popover__arrow {
  left: calc(var(--atomix-popover-arrow-size) * -0.5);
  top: 50%;
  margin-top: calc(var(--atomix-popover-arrow-size) * -0.5);
  border-right: none;
  border-top: none;
}

/* Content */
.c-popover__content {
  position: relative;
  z-index: 1;
}

/* Trigger */
.c-popover-trigger {
  cursor: pointer;
}

.c-popover-trigger:hover {
  /* Trigger hover styles */
}

.c-popover-trigger[aria-expanded="true"] {
  /* Active trigger styles */
}
```

### Customization Examples

```css
/* Dark theme popover */
.c-popover--dark {
  --atomix-popover-bg: var(--atomix-gray-800);
  --atomix-popover-border: 1px solid var(--atomix-gray-700);
  --atomix-popover-arrow-color: var(--atomix-gray-800);
  --atomix-popover-arrow-border-color: var(--atomix-gray-700);
  color: var(--atomix-white);
}

/* Large popover variant */
.c-popover--large {
  --atomix-popover-max-width: 480px;
  --atomix-popover-padding: 1.5rem;
}

/* Compact popover */
.c-popover--compact {
  --atomix-popover-padding: 0.5rem;
  --atomix-popover-max-width: 200px;
}

/* Custom animation */
.c-popover--slide-up {
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.c-popover--slide-up.is-open {
  transform: translateY(0);
}

/* No arrow variant */
.c-popover--no-arrow .c-popover__arrow {
  display: none;
}

.c-popover--no-arrow {
  margin: 0;
}

/* Colorful popovers */
.c-popover--primary {
  --atomix-popover-bg: var(--atomix-primary);
  --atomix-popover-border: 1px solid var(--atomix-primary-dark);
  color: var(--atomix-white);
}

.c-popover--success {
  --atomix-popover-bg: var(--atomix-success);
  --atomix-popover-border: 1px solid var(--atomix-success-dark);
  color: var(--atomix-white);
}
```

## Common Patterns

### Tooltip-style Popovers

```jsx
function TooltipPopovers() {
  return (
    <div className="tooltip-examples">
      <Popover
        content="This button saves your work"
        trigger="hover"
        position="top"
        delay={500}
      >
        <button className="save-btn">
          <Icon name="Save" />
        </button>
      </Popover>

      <Popover
        content="Click to copy to clipboard"
        trigger="hover"
        position="bottom"
      >
        <code className="copyable">
          npm install @atomix/ui
        </code>
      </Popover>
    </div>
  );
}
```

### Contextual Menus

```jsx
function ContextualMenu() {
  const menuItems = [
    { icon: 'Edit', label: 'Edit', action: 'edit' },
    { icon: 'Copy', label: 'Duplicate', action: 'duplicate' },
    { icon: 'Archive', label: 'Archive', action: 'archive' },
    { icon: 'Trash', label: 'Delete', action: 'delete', danger: true }
  ];

  const handleAction = (action) => {
    console.log(`Performing action: ${action}`);
  };

  const menuContent = (
    <div className="context-menu">
      {menuItems.map(item => (
        <button
          key={item.action}
          className={`menu-item ${item.danger ? 'menu-item--danger' : ''}`}
          onClick={() => handleAction(item.action)}
        >
          <Icon name={item.icon} />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <Popover
      content={menuContent}
      trigger="click"
      position="bottom"
      className="context-menu-popover"
    >
      <button className="context-trigger">
        <Icon name="MoreHorizontal" />
      </button>
    </Popover>
  );
}
```

### Information Cards

```jsx
function InformationCards() {
  const userInfo = (
    <div className="user-info-card">
      <div className="user-header">
        <Avatar src="user-avatar.jpg" size="lg" />
        <div className="user-details">
          <h4>Sarah Johnson</h4>
          <p className="user-title">Product Manager</p>
          <p className="user-location">San Francisco, CA</p>
        </div>
      </div>
      <div className="user-stats">
        <div className="stat">
          <span className="stat-number">127</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat">
          <span className="stat-number">89%</span>
          <span className="stat-label">Success Rate</span>
        </div>
      </div>
      <div className="user-actions">
        <Button size="sm" variant="primary">Connect</Button>
        <Button size="sm" variant="outline-secondary">Message</Button>
      </div>
    </div>
  );

  return (
    <div className="team-list">
      <Popover
        content={userInfo}
        trigger="hover"
        position="right"
        delay={300}
      >
        <div className="team-member">
          <Avatar src="user-avatar.jpg" size="sm" />
          <span>Sarah Johnson</span>
        </div>
      </Popover>
    </div>
  );
}
```

### Form Field Helpers

```jsx
function FormHelpers() {
  const passwordHelp = (
    <div className="password-requirements">
      <h5>Password Requirements</h5>
      <ul>
        <li className="requirement">
          <Icon name="Check" className="req-icon req-icon--success" />
          At least 8 characters
        </li>
        <li className="requirement">
          <Icon name="X" className="req-icon req-icon--error" />
          One uppercase letter
        </li>
        <li className="requirement">
          <Icon name="Check" className="req-icon req-icon--success" />
          One number
        </li>
        <li className="requirement">
          <Icon name="X" className="req-icon req-icon--error" />
          One special character
        </li>
      </ul>
    </div>
  );

  return (
    <div className="form-field">
      <label>
        Password
        <Popover
          content={passwordHelp}
          trigger="click"
          position="right"
        >
          <button type="button" className="help-trigger">
            <Icon name="HelpCircle" />
          </button>
        </Popover>
      </label>
      <input type="password" />
    </div>
  );
}
```

## Performance Considerations

1. **Portal rendering**: Use React portals for better z-index management
2. **Event delegation**: Minimize global event listeners
3. **Content lazy loading**: Load popover content only when needed
4. **Position calculation**: Debounce resize and scroll events

```jsx
// Optimized popover with lazy content
const LazyPopover = ({ children, getContent, ...props }) => {
  const [hasOpened, setHasOpened] = useState(false);
  const [content, setContent] = useState(null);

  const handleOpenChange = useCallback((isOpen) => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      setContent(getContent());
    }
    props.onOpenChange?.(isOpen);
  }, [hasOpened, getContent, props.onOpenChange]);

  return (
    <Popover
      {...props}
      content={content}
      onOpenChange={handleOpenChange}
    >
      {children}
    </Popover>
  );
};
```

## Integration Examples

### With React Router

```jsx
import { Link, useNavigate } from 'react-router-dom';

function NavigationPopover() {
  const navigate = useNavigate();

  const navContent = (
    <nav className="nav-popover">
      <Link to="/dashboard" className="nav-link">
        <Icon name="Home" />
        Dashboard
      </Link>
      <Link to="/projects" className="nav-link">
        <Icon name="Folder" />
        Projects
      </Link>
      <Link to="/settings" className="nav-link">
        <Icon name="Settings" />
        Settings
      </Link>
    </nav>
  );

  return (
    <Popover
      content={navContent}
      trigger="click"
      position="bottom"
    >
      <button className="nav-trigger">
        <Icon name="Menu" />
        Menu
      </button>
    </Popover>
  );
}
```

### With Form Libraries

```jsx
// React Hook Form integration
import { useForm, Controller } from 'react-hook-form';

function FormWithPopoverHelp() {
  const { control, handleSubmit } = useForm();

  const emailHelp = (
    <div className="email-help">
      <p>We'll use this email to:</p>
      <ul>
        <li>Send you important updates</li>
        <li>Reset your password if needed</li>
        <li>Deliver notifications you've subscribed to</li>
      </ul>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <div className="form-field">
        <label>
          Email Address
          <Popover
            content={emailHelp}
            trigger="hover"
            position="right"
          >
            <Icon name="Info" className="field-help-icon" />
          </Popover>
        </label>
        <Controller
          name="email"
          control={control}
          rules={{ required: true, pattern: /^\S+@\S+$/i }}
          render={({ field }) => (
            <input {...field} type="email" />
          )}
        />
      </div>
    </form>
  );
}
```

## Browser Support

The Popover component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

For older browser support, ensure you have appropriate polyfills for:
- Position calculation APIs
- Focus management
- Event handling

## Related Components

- **[Tooltip](./tooltip.md)** - Simpler alternative for basic information
- **[Dropdown](./dropdown.md)** - For menu-style interactions
- **[Modal](./modal.md)** - For larger overlay content
- **[Button](./button.md)** - Common trigger element
- **[Icon](./icon.md)** - Used in popover content and triggers

## Migration Guide

### From Tooltip to Popover

```jsx
// Before (basic tooltip)
<Tooltip content="Simple help text">
  <button>Help</button>
</Tooltip>

// After (rich popover)
<Popover
  content={
    <div className="rich-help">
      <h5>Help Information</h5>
      <p>Detailed help text with formatting</p>
    </div>
  }
  trigger="hover"
>
  <button>Help</button>
</Popover>
```

### From Custom Implementation

```jsx
// Before (custom popover)
<div className="custom-popover-container">