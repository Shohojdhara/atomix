# JavaScript API Reference

Complete reference for vanilla JavaScript classes and methods in the Atomix Design System. Use these for framework-agnostic implementations.

## 🚀 Getting Started

### Installation

```html
<!-- CDN -->
<link rel="stylesheet" href="https://unpkg.com/@shohojdhara/atomix/css">
<script src="https://unpkg.com/@shohojdhara/atomix/js"></script>

<!-- NPM -->
<script src="node_modules/@shohojdhara/atomix/dist/atomix.min.js"></script>
```

### Initialization

```javascript
// Initialize all components
Atomix.init();

// Initialize specific components
Atomix.init(['Button', 'Modal', 'Dropdown']);

// Initialize with custom selector
Atomix.init({
  components: ['Button'],
  selector: '.my-custom-selector'
});
```

## 🧩 Component Classes

### Button

```javascript
class AtomixButton {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      variant: 'primary',
      size: 'md',
      disabled: false,
      loading: false,
      onClick: null,
      ...options
    };
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateClasses();
  }

  bindEvents() {
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    if (this.options.disabled || this.options.loading) {
      event.preventDefault();
      return;
    }
    
    if (this.options.onClick) {
      this.options.onClick(event);
    }
  }

  setVariant(variant) {
    this.options.variant = variant;
    this.updateClasses();
  }

  setLoading(loading) {
    this.options.loading = loading;
    this.updateClasses();
    this.element.disabled = loading;
  }

  setDisabled(disabled) {
    this.options.disabled = disabled;
    this.element.disabled = disabled;
  }

  destroy() {
    this.element.removeEventListener('click', this.handleClick);
  }
}

// Usage
const button = new Atomix.Button('.my-button', {
  variant: 'primary',
  onClick: (event) => {
    console.log('Button clicked!');
  }
});
```

### Modal

```javascript
class AtomixModal {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      onShow: null,
      onShown: null,
      onHide: null,
      onHidden: null,
      ...options
    };
    this.isShown = false;
    this.init();
  }

  init() {
    this.backdrop = this.createBackdrop();
    this.bindEvents();
    
    if (this.options.show) {
      this.show();
    }
  }

  createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'c-modal__backdrop';
    return backdrop;
  }

  bindEvents() {
    // Close button
    const closeBtn = this.element.querySelector('[data-dismiss="modal"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }

    // Backdrop click
    if (this.options.backdrop) {
      this.backdrop.addEventListener('click', () => this.hide());
    }

    // Keyboard events
    if (this.options.keyboard) {
      document.addEventListener('keydown', this.handleKeydown.bind(this));
    }
  }

  handleKeydown(event) {
    if (event.key === 'Escape' && this.isShown) {
      this.hide();
    }
  }

  show() {
    if (this.isShown) return;

    this.triggerEvent('show');
    
    document.body.appendChild(this.backdrop);
    this.element.style.display = 'block';
    this.element.classList.add('show');
    
    if (this.options.focus) {
      this.element.focus();
    }

    this.isShown = true;
    this.triggerEvent('shown');
  }

  hide() {
    if (!this.isShown) return;

    this.triggerEvent('hide');
    
    this.element.classList.remove('show');
    
    setTimeout(() => {
      this.element.style.display = 'none';
      if (this.backdrop.parentNode) {
        this.backdrop.parentNode.removeChild(this.backdrop);
      }
      this.isShown = false;
      this.triggerEvent('hidden');
    }, 300);
  }

  toggle() {
    this.isShown ? this.hide() : this.show();
  }

  triggerEvent(eventName) {
    const callback = this.options[`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`];
    if (callback) {
      callback();
    }

    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent(`atomix.modal.${eventName}`));
  }

  destroy() {
    this.hide();
    // Remove event listeners
  }
}

// Usage
const modal = new Atomix.Modal('#myModal', {
  backdrop: true,
  keyboard: true,
  onShow: () => console.log('Modal is showing'),
  onHidden: () => console.log('Modal is hidden')
});

// Show/hide programmatically
modal.show();
modal.hide();
```

### Dropdown

```javascript
class AtomixDropdown {
  constructor(element, options = {}) {
    this.element = element;
    this.toggle = element.querySelector('[data-toggle="dropdown"]');
    this.menu = element.querySelector('.c-dropdown__menu');
    this.options = {
      autoClose: true,
      boundary: 'viewport',
      offset: [0, 2],
      ...options
    };
    this.isShown = false;
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.toggle.addEventListener('click', this.handleToggleClick.bind(this));
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleToggleClick(event) {
    event.preventDefault();
    this.toggle();
  }

  handleDocumentClick(event) {
    if (this.options.autoClose && this.isShown && !this.element.contains(event.target)) {
      this.hide();
    }
  }

  handleKeydown(event) {
    if (!this.isShown) return;

    if (event.key === 'Escape') {
      this.hide();
      this.toggle.focus();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigateItems(event.key === 'ArrowDown' ? 1 : -1);
    }
  }

  navigateItems(direction) {
    const items = Array.from(this.menu.querySelectorAll('.c-dropdown__item:not(.disabled)'));
    const currentIndex = items.indexOf(document.activeElement);
    const nextIndex = currentIndex + direction;
    
    if (nextIndex >= 0 && nextIndex < items.length) {
      items[nextIndex].focus();
    }
  }

  show() {
    if (this.isShown) return;

    this.element.classList.add('show');
    this.menu.classList.add('show');
    this.toggle.setAttribute('aria-expanded', 'true');
    this.isShown = true;

    // Position the menu
    this.updatePosition();
  }

  hide() {
    if (!this.isShown) return;

    this.element.classList.remove('show');
    this.menu.classList.remove('show');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.isShown = false;
  }

  toggle() {
    this.isShown ? this.hide() : this.show();
  }

  updatePosition() {
    // Calculate and set position based on options.boundary
    const rect = this.toggle.getBoundingClientRect();
    const menuRect = this.menu.getBoundingClientRect();
    
    // Simple positioning logic
    this.menu.style.top = `${rect.bottom + this.options.offset[1]}px`;
    this.menu.style.left = `${rect.left + this.options.offset[0]}px`;
  }

  destroy() {
    this.hide();
    // Remove event listeners
  }
}

// Usage
const dropdown = new Atomix.Dropdown('.dropdown', {
  autoClose: true,
  offset: [0, 4]
});
```

## 🔧 Global Configuration

### Atomix Configuration

```javascript
// Configure Atomix globally
Atomix.configure({
  prefix: 'atomix',
  theme: 'light',
  breakpoints: {
    xs: 0,
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

// Get current configuration
const config = Atomix.getConfig();
```

### Theme Management

```javascript
// Set theme
Atomix.setTheme('dark');

// Get current theme
const currentTheme = Atomix.getTheme();

// Toggle theme
Atomix.toggleTheme();

// Listen for theme changes
Atomix.on('themeChange', (theme) => {
  console.log('Theme changed to:', theme);
});
```

### Breakpoint Utilities

```javascript
// Get current breakpoint
const currentBreakpoint = Atomix.getCurrentBreakpoint();

// Check if breakpoint matches
const isDesktop = Atomix.matchBreakpoint('lg');

// Listen for breakpoint changes
Atomix.on('breakpointChange', (breakpoint) => {
  console.log('Breakpoint changed to:', breakpoint);
});
```

## 🎯 Event System

### Custom Events

```javascript
// Listen for component events
document.addEventListener('atomix.modal.show', (event) => {
  console.log('Modal is showing:', event.target);
});

// Trigger custom events
Atomix.trigger('customEvent', { data: 'value' });

// Listen for custom events
Atomix.on('customEvent', (data) => {
  console.log('Custom event triggered:', data);
});
```

### Component Lifecycle

```javascript
// Component initialization event
Atomix.on('componentInit', (component) => {
  console.log('Component initialized:', component);
});

// Component destruction event
Atomix.on('componentDestroy', (component) => {
  console.log('Component destroyed:', component);
});
```

## 🧪 Testing

### Mock Atomix for Testing

```javascript
// Mock Atomix for unit tests
const mockAtomix = {
  Button: jest.fn(),
  Modal: jest.fn(),
  Dropdown: jest.fn(),
  init: jest.fn(),
  configure: jest.fn(),
  setTheme: jest.fn(),
  getTheme: jest.fn().mockReturnValue('light'),
  on: jest.fn(),
  trigger: jest.fn()
};

global.Atomix = mockAtomix;
```

### Component Testing

```javascript
// Test component initialization
describe('AtomixButton', () => {
  let button;
  let element;

  beforeEach(() => {
    element = document.createElement('button');
    element.className = 'c-btn';
    document.body.appendChild(element);
    
    button = new Atomix.Button(element, {
      variant: 'primary',
      onClick: jest.fn()
    });
  });

  afterEach(() => {
    button.destroy();
    document.body.removeChild(element);
  });

  test('should initialize with correct variant', () => {
    expect(element.classList.contains('c-btn--primary')).toBe(true);
  });

  test('should handle click events', () => {
    element.click();
    expect(button.options.onClick).toHaveBeenCalled();
  });
});
```

## 📊 Performance

### Lazy Loading

```javascript
// Lazy load components
Atomix.loadComponent('DataTable').then(() => {
  const table = new Atomix.DataTable('.data-table');
});

// Check if component is loaded
if (Atomix.isComponentLoaded('Modal')) {
  const modal = new Atomix.Modal('.modal');
}
```

### Memory Management

```javascript
// Destroy components to prevent memory leaks
const components = [];

// Create components
components.push(new Atomix.Button('.btn-1'));
components.push(new Atomix.Modal('.modal-1'));

// Cleanup
components.forEach(component => component.destroy());
```

## 🔗 Related Documentation

- [React API](./react.md) - React component reference
- [CSS API](./css.md) - CSS classes and custom properties
- [Components Guide](../components/README.md) - Component usage guides
- [Examples](../examples/README.md) - Real-world usage examples

---

Complete vanilla JavaScript API for framework-agnostic development! 🟨
