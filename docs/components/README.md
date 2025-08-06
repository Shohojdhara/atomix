# Components

The Atomix Component Library provides a comprehensive set of accessible, customizable UI components for building modern web applications. Each component is available in both React and vanilla JavaScript implementations.

## 🧩 Component Philosophy

### Design Principles

1. **Accessibility First** - WCAG 2.1 AA compliance built-in
2. **Composable** - Components work together seamlessly
3. **Customizable** - Easy to theme and extend
4. **Consistent** - Unified design language across all components
5. **Performant** - Optimized for speed and bundle size

### Dual Implementation

Every component provides both React and vanilla JavaScript implementations:

```jsx
// React usage
import { Button } from '@shohojdhara/atomix';
<Button variant="primary" onClick={handleClick}>Click me</Button>
```

```javascript
// Vanilla JS usage
const button = new Atomix.Button('.my-button', {
  variant: 'primary',
  onClick: handleClick
});
```

## 📚 Documentation Sections

### 📋 [Component Overview](./overview.md)
Complete catalog of all available components organized by category.

### 📐 [Component Guidelines](./guidelines.md)
Development standards, best practices, and design principles for components.

### 🔍 Individual Component Documentation
Detailed documentation for each component with examples, API reference, and usage patterns.

## 🎯 Component Categories

### 🔘 Basic Components
Essential building blocks for any interface.

| Component | Description | Status |
|-----------|-------------|--------|
| [Button](./button.md) | Interactive buttons with variants and states | ✅ Stable |
| [Badge](./badge.md) | Small status indicators and labels | ✅ Stable |
| [Icon](./icon.md) | Icon wrapper component | ✅ Stable |
| [Spinner](./spinner.md) | Loading indicators | ✅ Stable |

### 📦 Layout Components
Structural elements for organizing content.

| Component | Description | Status |
|-----------|-------------|--------|
| [Card](./card.md) | Flexible content containers | ✅ Stable |
| Hero | Large promotional sections | 🚧 Beta |
| River | Content with image sections | 🚧 Beta |
| SectionIntro | Section introduction component | 🚧 Beta |

### 📝 Form Components
Complete form system with validation support.

| Component | Description | Status |
|-----------|-------------|--------|
| [Form](./form.md) | Form container with submission handling | ✅ Stable |
| Input | Text input fields with various types | ✅ Stable |
| Select | Dropdown selection controls | ✅ Stable |
| Checkbox | Boolean input controls | ✅ Stable |
| Radio | Single selection from groups | ✅ Stable |
| Textarea | Multi-line text input | ✅ Stable |

### 🧭 Navigation Components
Comprehensive navigation solutions.

| Component | Description | Status |
|-----------|-------------|--------|
| [Navigation](./navigation.md) | Main site navigation (Navbar, Nav, Menu) | ✅ Stable |
| [Breadcrumb](./breadcrumb.md) | Hierarchical navigation | ✅ Stable |
| SideMenu | Sidebar navigation | 🚧 Beta |

### 🎛️ Interactive Components
Elements that respond to user interaction.

| Component | Description | Status |
|-----------|-------------|--------|
| [Accordion](./accordion.md) | Collapsible content sections | ✅ Stable |
| [Dropdown](./dropdown.md) | Dropdown menus | ✅ Stable |
| [Modal](./modal.md) | Dialog overlays | ✅ Stable |
| [Popover](./popover.md) | Contextual overlays | 🚧 Beta |
| [Tooltip](./tooltip.md) | Hover information | ✅ Stable |
| [Tab](./tab.md) | Tabbed interfaces | ✅ Stable |
| [Toggle](./toggle.md) | Switch controls | ✅ Stable |

### 📊 Data Display Components
Components for presenting information.

| Component | Description | Status |
|-----------|-------------|--------|
| [Avatar](./avatar.md) | User profile images and groups | ✅ Stable |
| [List](./list.md) | Ordered and unordered lists | ✅ Stable |
| [DataTable](./datatable.md) | Data tables with sorting and filtering | 🚧 Beta |
| [Pagination](./pagination.md) | Page navigation | ✅ Stable |
| [Progress](./progress.md) | Progress indicators | ✅ Stable |
| Rating | Star ratings | 🚧 Beta |

### 🎨 Specialized Components
Purpose-built components for specific use cases.

| Component | Description | Status |
|-----------|-------------|--------|
| PhotoViewer | Image gallery viewer | 🚧 Beta |
| Messages | Chat/messaging interface | 🚧 Beta |
| Todo | Task management | 🚧 Beta |
| Countdown | Timer and countdown display | 🚧 Beta |
| DatePicker | Date selection | 🚧 Beta |
| Upload | File upload interface | 🚧 Beta |
| Steps | Step-by-step processes | 🚧 Beta |
| Testimonial | Customer testimonials | 🚧 Beta |
| ProductReview | Product review display | 🚧 Beta |

### 🛠️ Utility Components
Helper components for enhanced functionality.

| Component | Description | Status |
|-----------|-------------|--------|
| ColorModeToggle | Dark/light mode switcher | ✅ Stable |
| EdgePanel | Side panels and drawers | 🚧 Beta |
| [Callout](./callout.md) | Highlighted information blocks | ✅ Stable |

## 🚀 Quick Start

### Installation

```bash
npm install @shohojdhara/atomix
```

### Basic Usage

```jsx
import React from 'react';
import { Button, Card, Badge } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';

function App() {
  return (
    <Card>
      <Card.Header>
        <h2>Welcome to Atomix</h2>
        <Badge variant="primary">New</Badge>
      </Card.Header>
      <Card.Body>
        <p>Start building amazing interfaces!</p>
        <Button variant="primary">Get Started</Button>
      </Card.Body>
    </Card>
  );
}
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/@shohojdhara/atomix/css">
</head>
<body>
  <div class="c-card">
    <div class="c-card__header">
      <h2>Welcome to Atomix</h2>
      <span class="c-badge c-badge--primary">New</span>
    </div>
    <div class="c-card__body">
      <p>Start building amazing interfaces!</p>
      <button class="c-btn c-btn--primary">Get Started</button>
    </div>
  </div>

  <script src="https://unpkg.com/@shohojdhara/atomix/js"></script>
  <script>
    // Initialize components
    Atomix.init();
  </script>
</body>
</html>
```

## 🎨 Theming and Customization

### CSS Custom Properties

All components use CSS custom properties for easy theming:

```css
:root {
  --atomix-primary: #your-brand-color;
  --atomix-border-radius: 0.5rem;
  --atomix-font-family-base: 'Your Font', sans-serif;
}
```

### Component-Level Customization

```css
.c-btn--custom {
  --atomix-btn-bg: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  --atomix-btn-color: white;
  --atomix-btn-border-radius: 2rem;
}
```

### SCSS Customization

```scss
@use '@shohojdhara/atomix/styles' with (
  $primary-6: #your-brand-color,
  $btn-padding-x: 1.5rem,
  $card-border-radius: 1rem
);
```

## ♿ Accessibility Features

All components include comprehensive accessibility features:

### Built-in ARIA Support
- Proper ARIA attributes
- Role definitions
- State management
- Relationship indicators

### Keyboard Navigation
- Tab order management
- Arrow key navigation
- Enter/Space activation
- Escape key handling

### Screen Reader Support
- Descriptive labels
- Status announcements
- Content structure
- Focus management

### Visual Accessibility
- High contrast support
- Focus indicators
- Color contrast compliance
- Reduced motion support

## 📱 Responsive Design

Components are built mobile-first with responsive breakpoints:

```css
/* Mobile first */
.c-card {
  padding: var(--atomix-spacing-4);
}

/* Tablet and up */
@media (min-width: 768px) {
  .c-card {
    padding: var(--atomix-spacing-6);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .c-card {
    padding: var(--atomix-spacing-8);
  }
}
```

## 🧪 Testing Components

### React Testing

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@shohojdhara/atomix';

test('button handles click events', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Accessibility Testing

```jsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('component is accessible', async () => {
  const { container } = render(<Button>Accessible Button</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 📊 Performance

### Bundle Size Optimization
- Tree-shakeable imports
- Modular CSS architecture
- Optimized JavaScript
- No unnecessary dependencies

### Runtime Performance
- Efficient event handling
- Minimal DOM manipulation
- CSS-based animations
- Lazy loading support

## 🔗 Related Documentation

- [Design Tokens](../design-tokens/README.md) - Foundation of component styling
- [Styles System](../styles/README.md) - CSS architecture and utilities
- [Getting Started](../getting-started/README.md) - Installation and setup
- [Examples](../examples/README.md) - Real-world usage patterns
- [API Reference](../api/README.md) - Complete API documentation

## 🚀 Next Steps

1. **Explore Components** - Browse the [Component Overview](./overview.md)
2. **Learn Guidelines** - Read the [Component Guidelines](./guidelines.md)
3. **Try Examples** - Check out [Usage Examples](../examples/README.md)
4. **Customize Themes** - Learn about [Theming](../styles/customization.md)

---

Build amazing user interfaces with Atomix components! 🧩
