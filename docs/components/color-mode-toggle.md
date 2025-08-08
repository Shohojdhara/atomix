# ColorModeToggle Component

The ColorModeToggle component provides a simple toggle button for switching between light and dark themes. It automatically detects system preferences, persists user choices, and includes accessible keyboard navigation and screen reader support.

## Overview

The ColorModeToggle component is essential for modern applications that support both light and dark themes. It seamlessly integrates with the Atomix design system's theming capabilities, automatically applying theme changes across the entire application through CSS custom properties.

## Props API

### ColorModeToggleProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes to apply to the toggle button |

## Usage Examples

### Basic React Usage

```jsx
import React from 'react';
import { ColorModeToggle } from '@shohojdhara/atomix';

function Header() {
  return (
    <header className="app-header">
      <h1>My Application</h1>
      <ColorModeToggle />
    </header>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        {/* Your app content */}
      </main>
    </div>
  );
}
```

### Custom Styling

```jsx
import React from 'react';
import { ColorModeToggle } from '@shohojdhara/atomix';

function CustomToggle() {
  return (
    <ColorModeToggle className="my-custom-toggle" />
  );
}
```

### Navigation Integration

```jsx
import React from 'react';
import { Navigation, ColorModeToggle } from '@shohojdhara/atomix';

function AppNavigation() {
  return (
    <Navigation>
      <Navigation.Brand>
        <img src="/logo.png" alt="Logo" />
      </Navigation.Brand>
      
      <Navigation.Menu>
        <Navigation.Link href="/home">Home</Navigation.Link>
        <Navigation.Link href="/about">About</Navigation.Link>
        <Navigation.Link href="/contact">Contact</Navigation.Link>
      </Navigation.Menu>
      
      <Navigation.Actions>
        <ColorModeToggle />
      </Navigation.Actions>
    </Navigation>
  );
}
```

### Vanilla JavaScript Usage

```javascript
// The ColorModeToggle is primarily a React component
// For vanilla JS implementations, you can create a simple toggle:

class ColorModeToggle {
  constructor(element) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.currentMode = this.getCurrentMode();
    this.init();
  }
  
  getCurrentMode() {
    const stored = localStorage.getItem('atomix-color-mode');
    if (stored) return stored;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  init() {
    this.element.addEventListener('click', () => this.toggle());
    this.updateTheme();
    this.updateButton();
  }
  
  toggle() {
    this.currentMode = this.currentMode === 'light' ? 'dark' : 'light';
    this.updateTheme();
    this.updateButton();
  }
  
  updateTheme() {
    document.documentElement.setAttribute('data-atomix-theme', this.currentMode);
    localStorage.setItem('atomix-color-mode', this.currentMode);
  }
  
  updateButton() {
    const nextMode = this.currentMode === 'light' ? 'dark' : 'light';
    this.element.setAttribute('aria-label', `Switch to ${nextMode} mode`);
    this.element.title = `Switch to ${nextMode} mode`;
  }
}

// Initialize toggle
const toggle = new ColorModeToggle('#theme-toggle');
```

### HTML with Data Attributes

```html
<!-- Basic theme toggle button -->
<button 
  id="theme-toggle"
  class="c-color-mode-toggle"
  aria-label="Toggle theme"
  title="Toggle theme">
  <span class="c-color-mode-toggle__icon">
    <!-- Icon will be updated by JavaScript -->
  </span>
</button>

<!-- In navigation -->
<nav class="c-navigation">
  <div class="c-navigation__brand">
    <img src="/logo.png" alt="Logo">
  </div>
  
  <div class="c-navigation__actions">
    <button class="c-color-mode-toggle">
      <!-- Theme toggle content -->
    </button>
  </div>
</nav>
```

## Styling

### CSS Classes

The ColorModeToggle component uses the following CSS class structure:

```css
/* Base toggle button */
.c-color-mode-toggle {
  /* Base button styles */
}

/* Icon styles */
.c-color-mode-toggle svg {
  /* SVG icon styles */
}

/* Focus states */
.c-color-mode-toggle:focus {
  /* Focus styling */
}

/* Hover states */
.c-color-mode-toggle:hover {
  /* Hover styling */
}
```

### Custom Styling

```css
/* Custom theme toggle styling */
.my-custom-toggle {
  background: transparent;
  border: 2px solid var(--atomix-color-border);
  border-radius: 50%;
  padding: 0.5rem;
  transition: all 0.2s ease;
}

.my-custom-toggle:hover {
  background: var(--atomix-color-surface-hover);
  transform: scale(1.05);
}

/* Custom icon styling */
.c-color-mode-toggle svg {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--atomix-color-text);
  transition: color 0.2s ease;
}

/* Animation for theme transitions */
.c-color-mode-toggle {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Theme Integration

The component automatically applies themes using CSS custom properties:

```css
/* Light theme (default) */
:root {
  --atomix-color-background: #ffffff;
  --atomix-color-text: #1a1a1a;
  --atomix-color-surface: #f5f5f5;
}

/* Dark theme */
[data-atomix-theme="dark"] {
  --atomix-color-background: #1a1a1a;
  --atomix-color-text: #ffffff;
  --atomix-color-surface: #2a2a2a;
}
```

## Accessibility

The ColorModeToggle component includes comprehensive accessibility features:

### ARIA Attributes

- `aria-label` - Describes the current action (e.g., "Switch to dark mode")
- `title` - Provides tooltip text for the button
- Button semantics are preserved with proper `<button>` element

### Keyboard Navigation

- **Enter/Space** - Toggles between light and dark modes
- **Tab** - Moves focus to/from the toggle button
- Focus indicators are visible and follow design system standards

### Screen Reader Support

- Dynamic aria-label updates to reflect the next action
- Screen readers announce the button purpose and current state
- High contrast mode compatibility
- Respects `prefers-reduced-motion` for animations

## Behavior

### System Preference Detection

The component automatically detects the user's system color scheme preference:

```javascript
// Detects system dark mode preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

### Persistence

User preferences are stored in `localStorage` and persist across browser sessions:

```javascript
// Saving preference
localStorage.setItem('atomix-color-mode', 'dark');

// Loading preference
const savedMode = localStorage.getItem('atomix-color-mode');
```

### Theme Application

Themes are applied by setting a data attribute on the document root:

```javascript
// Apply dark theme
document.documentElement.setAttribute('data-atomix-theme', 'dark');

// Apply light theme
document.documentElement.setAttribute('data-atomix-theme', 'light');
```

## Best Practices

### Do's ✅

- Place the toggle in a consistent, easily discoverable location
- Use the component in the main navigation or header area
- Ensure the toggle is accessible via keyboard navigation
- Test the toggle with screen readers
- Respect user preferences and system settings

```jsx
// Good: Consistent placement in header
function AppHeader() {
  return (
    <header className="app-header">
      <nav className="navigation">
        <div className="navigation__brand">Logo</div>
        <div className="navigation__actions">
          <ColorModeToggle />
        </div>
      </nav>
    </header>
  );
}

// Good: Accessible implementation
<ColorModeToggle 
  className="header-theme-toggle"
  aria-describedby="theme-help"
/>
<div id="theme-help" className="sr-only">
  Toggle between light and dark themes
</div>
```

### Don'ts ❌

- Don't place multiple theme toggles in the same interface
- Don't override system preferences without user interaction
- Don't hide the toggle in hard-to-find locations
- Don't forget to test with high contrast modes

```jsx
// Bad: Multiple toggles
<ColorModeToggle />
<ColorModeToggle /> {/* Confusing duplicate */}

// Bad: Hidden or hard to find
<div className="hidden-menu">
  <ColorModeToggle /> {/* Users won't find this */}
</div>
```

## Common Patterns

### Header Integration

```jsx
function AppHeader() {
  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <div className="header-brand">
            <img src="/logo.png" alt="App Logo" />
          </div>
          
          <nav className="header-nav">
            <a href="/home">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
          
          <div className="header-actions">
            <ColorModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
```

### Settings Panel

```jsx
function ThemeSettings() {
  return (
    <div className="settings-panel">
      <h3>Appearance</h3>
      <div className="setting-item">
        <label>Theme</label>
        <ColorModeToggle />
      </div>
    </div>
  );
}
```

### Mobile Navigation

```jsx
function MobileNav({ isOpen }) {
  return (
    <div className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}>
      <div className="mobile-nav__header">
        <h2>Menu</h2>
        <ColorModeToggle />
      </div>
      
      <nav className="mobile-nav__menu">
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  );
}
```

## Related Components

- **Navigation** - Often contains the ColorModeToggle in the actions area
- **Button** - Shares similar interaction patterns and accessibility features
- **Icon** - Uses internal SVG icons for light/dark mode representation

## Performance Considerations

### Efficient Updates

The component minimizes re-renders and DOM updates:

```javascript
// Only updates when necessary
useEffect(() => {
  document.documentElement.setAttribute('data-atomix-theme', colorMode);
  localStorage.setItem('atomix-color-mode', colorMode);
}, [colorMode]);
```

### Memory Management

Event listeners are properly cleaned up:

```javascript
// Proper cleanup
useEffect(() => {
  const handleSystemThemeChange = (event) => {
    // Handle theme change
  };
  
  mediaQuery.addEventListener('change', handleSystemThemeChange);
  
  return () => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange);
  };
}, []);
```

## Browser Support

The ColorModeToggle component supports all modern browsers:

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### Feature Detection

The component gracefully degrades when certain features aren't available:

```javascript
// Fallback for older browsers
if (darkModeMediaQuery.addEventListener) {
  darkModeMediaQuery.addEventListener('change', handler);
} else {
  darkModeMediaQuery.addListener(handler);
}
```

## Implementation Details

### Theme Storage

Themes are stored with a specific key to avoid conflicts:

```javascript
const STORAGE_KEY = 'atomix-color-mode';
```

### Icon Management

The component includes built-in SVG icons for both light and dark modes:

- **Light mode icon**: Sun icon
- **Dark mode icon**: Moon icon

### System Integration

The component respects system-level preferences:

- Detects `prefers-color-scheme` media query
- Listens for system theme changes
- Applies user overrides when explicitly set

## Troubleshooting

### Common Issues

1. **Theme not persisting**: Check that localStorage is available
2. **Icons not showing**: Ensure SVG icons are properly imported
3. **System preference not detected**: Verify browser supports `matchMedia`

### Debug Tips

```javascript
// Check current theme
console.log(document.documentElement.getAttribute('data-atomix-theme'));

// Check stored preference
console.log(localStorage.getItem('atomix-color-mode'));

// Check system preference
console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
```

## Migration Guide

### Adding to Existing Apps

When adding ColorModeToggle to an existing application:

1. Ensure your CSS uses Atomix design tokens
2. Add the theme data attribute support
3. Test all components in both light and dark modes
4. Update any hardcoded colors to use CSS custom properties

```css
/* Before: hardcoded colors */
.my-component {
  background: #ffffff;
  color: #000000;
}

/* After: theme-aware colors */
.my-component {
  background: var(--atomix-color-background);
  color: var(--atomix-color-text);
}
```
