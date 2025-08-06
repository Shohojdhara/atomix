# API Reference

Complete technical reference for all Atomix APIs, including React components, vanilla JavaScript classes, CSS utilities, and SCSS variables.

## 📚 API Documentation Sections

### ⚛️ [React API](./react.md)
Complete reference for all React components, props, and TypeScript interfaces.

**Includes:**
- Component props and types
- Event handlers
- Ref forwarding
- TypeScript definitions
- Hook APIs

### 🟨 [JavaScript API](./javascript.md)
Vanilla JavaScript class APIs for framework-agnostic usage.

**Includes:**
- Class constructors
- Method signatures
- Event handling
- Configuration options
- Lifecycle methods

### 🎨 [CSS API](./css.md)
Complete CSS class reference, custom properties, and utility classes.

**Includes:**
- Component classes
- Utility classes
- CSS custom properties
- Responsive variants
- State modifiers

## 🚀 Quick Reference

### React Components

```jsx
import { 
  Button, 
  Card, 
  Modal, 
  Form, 
  Input,
  Badge,
  Avatar,
  Dropdown
} from '@shohojdhara/atomix';

// Basic usage
<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>

// With TypeScript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
```

### JavaScript Classes

```javascript
import { Atomix } from '@shohojdhara/atomix';

// Initialize a component
const button = new Atomix.Button('.my-button', {
  variant: 'primary',
  onClick: (event) => {
    console.log('Button clicked!');
  }
});

// Initialize all components
Atomix.init();

// Initialize specific components
Atomix.init(['Button', 'Modal', 'Dropdown']);
```

### CSS Classes

```html
<!-- Component classes -->
<button class="c-btn c-btn--primary c-btn--lg">
  Primary Button
</button>

<!-- Utility classes -->
<div class="u-p-4 u-mb-8 u-text-center u-bg-primary">
  Styled with utilities
</div>

<!-- Responsive utilities -->
<div class="u-d-flex u-flex-column u-flex-md-row u-gap-4">
  Responsive layout
</div>
```

### CSS Custom Properties

```css
:root {
  /* Colors */
  --atomix-primary: #7c3aed;
  --atomix-text-primary: #111827;
  --atomix-bg-primary: #ffffff;
  
  /* Spacing */
  --atomix-spacing-4: 1rem;
  --atomix-spacing-8: 2rem;
  
  /* Typography */
  --atomix-font-size-base: 1rem;
  --atomix-line-height-base: 1.5;
  
  /* Components */
  --atomix-btn-padding-x: 1rem;
  --atomix-btn-padding-y: 0.5rem;
  --atomix-btn-border-radius: 0.375rem;
}
```

## 🎯 Component Categories

### Basic Components
| Component | React | JavaScript | CSS Classes |
|-----------|-------|------------|-------------|
| Button | `<Button>` | `Atomix.Button` | `.c-btn` |
| Badge | `<Badge>` | `Atomix.Badge` | `.c-badge` |
| Icon | `<Icon>` | `Atomix.Icon` | `.c-icon` |
| Spinner | `<Spinner>` | `Atomix.Spinner` | `.c-spinner` |

### Layout Components
| Component | React | JavaScript | CSS Classes |
|-----------|-------|------------|-------------|
| Card | `<Card>` | `Atomix.Card` | `.c-card` |
| Container | `<Container>` | - | `.o-container` |
| Grid | `<Grid>` | - | `.o-grid` |

### Form Components
| Component | React | JavaScript | CSS Classes |
|-----------|-------|------------|-------------|
| Form | `<Form>` | `Atomix.Form` | `.c-form` |
| Input | `<Input>` | `Atomix.Input` | `.c-form-control` |
| Select | `<Select>` | `Atomix.Select` | `.c-form-select` |
| Checkbox | `<Checkbox>` | `Atomix.Checkbox` | `.c-form-check` |

### Interactive Components
| Component | React | JavaScript | CSS Classes |
|-----------|-------|------------|-------------|
| Modal | `<Modal>` | `Atomix.Modal` | `.c-modal` |
| Dropdown | `<Dropdown>` | `Atomix.Dropdown` | `.c-dropdown` |
| Accordion | `<Accordion>` | `Atomix.Accordion` | `.c-accordion` |
| Tabs | `<Tabs>` | `Atomix.Tabs` | `.c-tabs` |

## 🔧 Configuration

### Global Configuration

```javascript
// Configure Atomix globally
Atomix.configure({
  prefix: 'atomix',
  theme: 'light',
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1440
  },
  animations: {
    duration: 300,
    easing: 'ease-in-out'
  }
});
```

### Component Configuration

```javascript
// Configure individual components
const modal = new Atomix.Modal('.my-modal', {
  backdrop: true,
  keyboard: true,
  focus: true,
  animation: 'fade',
  onShow: () => console.log('Modal shown'),
  onHide: () => console.log('Modal hidden')
});
```

## 🎨 Theming API

### CSS Custom Properties

```css
/* Override theme variables */
:root {
  --atomix-primary: #your-brand-color;
  --atomix-font-family-base: 'Your Font', sans-serif;
  --atomix-border-radius: 0.5rem;
}

/* Component-specific theming */
.c-btn {
  --atomix-btn-bg: var(--atomix-primary);
  --atomix-btn-color: var(--atomix-white);
  --atomix-btn-border-color: var(--atomix-primary);
}
```

### SCSS Configuration

```scss
@use '@shohojdhara/atomix/styles' with (
  $primary-6: #2563eb,
  $font-family-base: ('Inter', sans-serif),
  $border-radius: 0.375rem,
  $btn-padding-x: 1.5rem
);
```

### JavaScript Theming

```javascript
// Set theme programmatically
Atomix.setTheme('dark');

// Toggle theme
Atomix.toggleTheme();

// Get current theme
const currentTheme = Atomix.getTheme();

// Listen for theme changes
Atomix.on('themeChange', (theme) => {
  console.log('Theme changed to:', theme);
});
```

## 📱 Responsive API

### Breakpoint System

```javascript
// JavaScript breakpoint utilities
Atomix.breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440
};

// Check current breakpoint
const currentBreakpoint = Atomix.getCurrentBreakpoint();

// Listen for breakpoint changes
Atomix.on('breakpointChange', (breakpoint) => {
  console.log('Breakpoint changed to:', breakpoint);
});
```

### Responsive Utilities

```css
/* Responsive utility pattern */
.u-{property}-{breakpoint}-{value}

/* Examples */
.u-d-md-flex        /* display: flex on md+ */
.u-text-lg-center   /* text-align: center on lg+ */
.u-p-sm-6           /* padding: 1.5rem on sm+ */
```

## 🧪 Testing API

### React Testing Utilities

```jsx
import { render, screen } from '@testing-library/react';
import { Button } from '@shohojdhara/atomix';

// Test utilities
export const renderWithTheme = (component, theme = 'light') => {
  return render(
    <div data-theme={theme}>
      {component}
    </div>
  );
};

// Usage
test('button renders with correct theme', () => {
  renderWithTheme(<Button>Test</Button>, 'dark');
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

### JavaScript Testing

```javascript
// Mock Atomix for testing
const mockAtomix = {
  Button: jest.fn(),
  Modal: jest.fn(),
  init: jest.fn()
};

global.Atomix = mockAtomix;
```

## 🔗 Type Definitions

### TypeScript Support

```typescript
// Component prop types
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Theme types
type Theme = 'light' | 'dark' | 'auto';

// Breakpoint types
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// Configuration types
interface AtomixConfig {
  prefix?: string;
  theme?: Theme;
  breakpoints?: Record<Breakpoint, number>;
  animations?: {
    duration?: number;
    easing?: string;
  };
}
```

## 📊 Performance API

### Bundle Analysis

```javascript
// Check bundle size
console.log('Atomix bundle size:', Atomix.getBundleSize());

// Get loaded components
console.log('Loaded components:', Atomix.getLoadedComponents());

// Lazy load components
await Atomix.loadComponent('DataTable');
```

### Performance Monitoring

```javascript
// Performance metrics
Atomix.performance.mark('component-init-start');
const component = new Atomix.Button('.btn');
Atomix.performance.mark('component-init-end');

// Measure performance
const duration = Atomix.performance.measure(
  'component-init',
  'component-init-start',
  'component-init-end'
);
```

## 🔗 Related Documentation

- [React API](./react.md) - Complete React component reference
- [JavaScript API](./javascript.md) - Vanilla JavaScript class reference
- [CSS API](./css.md) - CSS classes and custom properties
- [Components](../components/README.md) - Component usage guides
- [Styles](../styles/README.md) - CSS architecture and utilities

## 🚀 Next Steps

1. **Explore React API** - Check out [React component reference](./react.md)
2. **Learn JavaScript API** - Study [vanilla JavaScript classes](./javascript.md)
3. **Master CSS API** - Review [CSS classes and utilities](./css.md)
4. **Build Applications** - Apply knowledge with [examples](../examples/README.md)

---

Complete API reference for building with Atomix! 📖
