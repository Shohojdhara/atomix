# Theming Guide

Learn how to customize and theme the Atomix Design System to match your brand identity and create unique user experiences.

## 🎨 Theming Overview

Atomix provides multiple levels of theming customization:

1. **CSS Custom Properties** - Runtime theming and theme switching
2. **SCSS Variables** - Build-time customization and brand integration
3. **Component Theming** - Individual component customization
4. **Utility Overrides** - Custom utility classes and modifications

## 🔧 CSS Custom Properties Theming

### Basic Theme Customization

```css
:root {
  /* Brand colors */
  --atomix-primary: #2563eb;
  --atomix-secondary: #64748b;
  
  /* Typography */
  --atomix-font-family-base: 'Inter', sans-serif;
  --atomix-font-size-base: 1rem;
  
  /* Spacing */
  --atomix-spacing-base: 1rem;
  
  /* Border radius */
  --atomix-border-radius: 0.5rem;
  
  /* Shadows */
  --atomix-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --atomix-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Dark Theme Implementation

```css
/* Light theme (default) */
:root {
  --atomix-bg-primary: #ffffff;
  --atomix-bg-secondary: #f8fafc;
  --atomix-text-primary: #0f172a;
  --atomix-text-secondary: #475569;
  --atomix-border-primary: #e2e8f0;
}

/* Dark theme */
[data-theme="dark"] {
  --atomix-bg-primary: #0f172a;
  --atomix-bg-secondary: #1e293b;
  --atomix-text-primary: #f1f5f9;
  --atomix-text-secondary: #cbd5e1;
  --atomix-border-primary: #334155;
}

/* Auto theme based on system preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --atomix-bg-primary: #0f172a;
    --atomix-bg-secondary: #1e293b;
    --atomix-text-primary: #f1f5f9;
    --atomix-text-secondary: #cbd5e1;
    --atomix-border-primary: #334155;
  }
}
```

### Theme Switching JavaScript

```javascript
// Simple theme switching utility
class ThemeSwitcher {
  constructor() {
    this.themes = ['light', 'dark', 'auto'];
    this.currentTheme = this.getStoredTheme() || 'auto';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.bindEvents();
  }

  bindEvents() {
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (this.currentTheme === 'auto') {
          this.applyTheme('auto');
        }
      });
  }

  applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    
    this.currentTheme = theme;
    this.storeTheme(theme);
    this.dispatchThemeChange(theme);
  }

  toggleTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.applyTheme(this.themes[nextIndex]);
  }

  setTheme(theme) {
    if (this.themes.includes(theme)) {
      this.applyTheme(theme);
    }
  }

  getTheme() {
    return this.currentTheme;
  }

  getStoredTheme() {
    return localStorage.getItem('atomix-theme');
  }

  storeTheme(theme) {
    localStorage.setItem('atomix-theme', theme);
  }

  dispatchThemeChange(theme) {
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme }
    }));
  }
}

// Usage
const themeSwitcher = new ThemeSwitcher();

// Theme toggle button
document.getElementById('theme-toggle').addEventListener('click', () => {
  themeSwitcher.toggleTheme();
});

// Listen for theme changes
window.addEventListener('themechange', (event) => {
  console.log('Theme changed to:', event.detail.theme);
});
```

## 🏗️ SCSS Build-Time Theming

### Brand Color Customization

```scss
// Override primary color scale
@use '@shohojdhara/atomix/styles' with (
  $primary-1: #ede9fe,
  $primary-2: #ddd6fe,
  $primary-3: #c4b5fd,
  $primary-4: #a78bfa,
  $primary-5: #8b5cf6,
  $primary-6: #7c3aed,  // Main brand color
  $primary-7: #6d28d9,
  $primary-8: #5b21b6,
  $primary-9: #4c1d95,
  $primary-10: #3c1361
);
```

### Typography Customization

```scss
// Custom font system
@use '@shohojdhara/atomix/styles' with (
  $font-family-base: ('Poppins', -apple-system, BlinkMacSystemFont, sans-serif),
  $font-family-heading: ('Playfair Display', serif),
  $font-family-mono: ('JetBrains Mono', 'Fira Code', monospace),
  
  // Custom font sizes
  $font-size-xs: 0.625rem,
  $font-size-sm: 0.75rem,
  $font-size-base: 0.875rem,
  $font-size-lg: 1rem,
  $font-size-xl: 1.125rem,
  
  // Custom font weights
  $font-weight-light: 300,
  $font-weight-normal: 400,
  $font-weight-medium: 500,
  $font-weight-semibold: 600,
  $font-weight-bold: 700
);
```

### Spacing and Layout Customization

```scss
// Custom spacing scale
@use '@shohojdhara/atomix/styles' with (
  $spacer: 1.25rem,  // Base spacing unit
  
  // Custom container sizes
  $container-max-widths: (
    sm: 540px,
    md: 720px,
    lg: 960px,
    xl: 1140px,
    xxl: 1400px
  ),
  
  // Custom breakpoints
  $grid-breakpoints: (
    xs: 0,
    sm: 600px,
    md: 900px,
    lg: 1200px,
    xl: 1536px,
    xxl: 1920px
  )
);
```

## 🎯 Component-Level Theming

### Button Theming

```css
/* Custom button variant */
.c-btn--brand {
  --atomix-btn-color: var(--atomix-white);
  --atomix-btn-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --atomix-btn-border-color: transparent;
  --atomix-btn-hover-bg: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  --atomix-btn-active-bg: linear-gradient(135deg, #4e63c6 0%, #5e377e 100%);
}

/* Custom button size */
.c-btn--xl {
  --atomix-btn-padding-x: 2rem;
  --atomix-btn-padding-y: 1rem;
  --atomix-btn-font-size: 1.25rem;
  --atomix-btn-border-radius: 0.75rem;
}

/* Rounded button style */
.c-btn--rounded {
  --atomix-btn-border-radius: 50px;
}
```

### Card Theming

```css
/* Glass card effect */
.c-card--glass {
  --atomix-card-bg: rgba(255, 255, 255, 0.1);
  --atomix-card-border-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Elevated card */
.c-card--elevated {
  --atomix-card-bg: var(--atomix-bg-primary);
  --atomix-card-border-color: transparent;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
}

.c-card--elevated:hover {
  box-shadow: 
    0 10px 15px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.05);
}
```

### Modal Theming

```css
/* Custom modal backdrop */
.c-modal--blur {
  --atomix-modal-backdrop-bg: rgba(0, 0, 0, 0.3);
}

.c-modal--blur .c-modal__backdrop {
  backdrop-filter: blur(4px);
}

/* Slide-up modal animation */
.c-modal--slide-up .c-modal__dialog {
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
}

.c-modal--slide-up.show .c-modal__dialog {
  transform: translateY(0);
}
```

## 🌈 Advanced Theming Patterns

### Multi-Brand Theming

```css
/* Brand A theme */
[data-brand="brand-a"] {
  --atomix-primary: #ff6b6b;
  --atomix-secondary: #4ecdc4;
  --atomix-font-family-base: 'Roboto', sans-serif;
  --atomix-border-radius: 0.25rem;
}

/* Brand B theme */
[data-brand="brand-b"] {
  --atomix-primary: #a8e6cf;
  --atomix-secondary: #ffd93d;
  --atomix-font-family-base: 'Open Sans', sans-serif;
  --atomix-border-radius: 1rem;
}

/* Brand C theme */
[data-brand="brand-c"] {
  --atomix-primary: #6c5ce7;
  --atomix-secondary: #fd79a8;
  --atomix-font-family-base: 'Poppins', sans-serif;
  --atomix-border-radius: 0;
}
```

### Seasonal Theming

```css
/* Spring theme */
[data-season="spring"] {
  --atomix-primary: #55a3ff;
  --atomix-secondary: #7bed9f;
  --atomix-bg-primary: #f8f9fa;
  --atomix-accent: #ff6b9d;
}

/* Summer theme */
[data-season="summer"] {
  --atomix-primary: #ff9f43;
  --atomix-secondary: #feca57;
  --atomix-bg-primary: #fff5f5;
  --atomix-accent: #ff6b6b;
}

/* Autumn theme */
[data-season="autumn"] {
  --atomix-primary: #d63031;
  --atomix-secondary: #e17055;
  --atomix-bg-primary: #fef7f0;
  --atomix-accent: #fdcb6e;
}

/* Winter theme */
[data-season="winter"] {
  --atomix-primary: #0984e3;
  --atomix-secondary: #74b9ff;
  --atomix-bg-primary: #f1f2f6;
  --atomix-accent: #a29bfe;
}
```

### Context-Aware Theming

```css
/* Admin interface theme */
[data-context="admin"] {
  --atomix-primary: #2d3748;
  --atomix-bg-primary: #f7fafc;
  --atomix-bg-secondary: #edf2f7;
  --atomix-text-primary: #2d3748;
  --atomix-border-radius: 0.375rem;
}

/* Marketing site theme */
[data-context="marketing"] {
  --atomix-primary: #667eea;
  --atomix-bg-primary: #ffffff;
  --atomix-bg-secondary: #f8fafc;
  --atomix-text-primary: #1a202c;
  --atomix-border-radius: 0.75rem;
}

/* E-commerce theme */
[data-context="ecommerce"] {
  --atomix-primary: #38a169;
  --atomix-secondary: #ed8936;
  --atomix-bg-primary: #ffffff;
  --atomix-text-primary: #2d3748;
  --atomix-border-radius: 0.5rem;
}
```

## 🎨 Theme Generation Tools

### CSS Custom Property Generator

```javascript
function generateTheme(config) {
  const theme = {};
  
  // Generate color scale
  if (config.primary) {
    theme['--atomix-primary'] = config.primary;
    theme['--atomix-primary-hover'] = darken(config.primary, 0.1);
    theme['--atomix-primary-active'] = darken(config.primary, 0.2);
  }
  
  // Generate typography
  if (config.fontFamily) {
    theme['--atomix-font-family-base'] = config.fontFamily;
  }
  
  // Generate spacing
  if (config.spacing) {
    theme['--atomix-spacing-base'] = config.spacing;
  }
  
  return theme;
}

// Usage
const myTheme = generateTheme({
  primary: '#7c3aed',
  fontFamily: 'Inter, sans-serif',
  spacing: '1rem'
});

// Apply theme
Object.entries(myTheme).forEach(([property, value]) => {
  document.documentElement.style.setProperty(property, value);
});
```

### Theme Validation

```javascript
function validateTheme(theme) {
  const required = [
    '--atomix-primary',
    '--atomix-bg-primary',
    '--atomix-text-primary'
  ];
  
  const missing = required.filter(prop => !(prop in theme));
  
  if (missing.length > 0) {
    console.warn('Missing required theme properties:', missing);
  }
  
  // Validate color contrast
  const bgColor = theme['--atomix-bg-primary'];
  const textColor = theme['--atomix-text-primary'];
  
  if (bgColor && textColor) {
    const contrast = calculateContrast(bgColor, textColor);
    if (contrast < 4.5) {
      console.warn('Insufficient color contrast:', contrast);
    }
  }
  
  return missing.length === 0;
}
```

## 🧪 Testing Themes

### Visual Regression Testing

```javascript
// Test theme variations
describe('Theme variations', () => {
  const themes = ['light', 'dark', 'brand'];
  
  themes.forEach(theme => {
    test(`renders correctly with ${theme} theme`, async () => {
      document.documentElement.setAttribute('data-theme', theme);
      
      const component = render(<Button variant="primary">Test</Button>);
      
      // Take screenshot
      await expect(component).toMatchSnapshot(`button-${theme}-theme.png`);
    });
  });
});
```

### Accessibility Testing

```javascript
// Test color contrast in different themes
test('maintains accessibility in all themes', async () => {
  const themes = ['light', 'dark'];
  
  for (const theme of themes) {
    document.documentElement.setAttribute('data-theme', theme);
    
    const { container } = render(<App />);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  }
});
```

## 🔗 Related Documentation

- [Design Tokens](../design-tokens/README.md) - Foundation of theming
- [Styles Customization](../styles/customization.md) - Advanced CSS customization
- [Color System](../design-tokens/colors.md) - Color tokens and usage
- [CSS API](../api/css.md) - CSS custom properties reference

---

Create beautiful, consistent themes with Atomix! 🎨
