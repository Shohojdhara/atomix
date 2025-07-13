# Shaj Theme System Documentation

## Overview

The **Shaj Theme System** is a comprehensive theming solution for the Atomix Design System that provides:

- 🎨 **6 Pre-built Themes**: Professional, nature, wellness, and creative themes
- 🔧 **Theme Variant Generator**: Create custom themes from existing ones
- 🔄 **Runtime Theme Switching**: Change themes without page reload
- 🎯 **Component Integration**: Automatic theme application to all components
- ♿ **Accessibility**: WCAG 2.1 AA compliant with proper contrast ratios
- 🔗 **Backward Compatibility**: Seamless integration with existing Atomix variables

## Architecture

### Core Files Structure

```
src/styles/themes/
├── _index.scss                    # Main theme system entry point
├── _theme-variables.scss           # Theme structure and defaults
├── _theme-generator.scss           # Theme generation mixins
├── _theme-variant-generator.scss   # Variant creation utilities
├── _css-variables-bridge.scss      # Atomix integration bridge
├── base/                          # Pre-built theme configurations
│   ├── _shaj-default.scss
│   ├── _shaj-midnight.scss
│   ├── _shaj-ocean.scss
│   ├── _shaj-forest.scss
│   ├── _shaj-pastel.scss
│   └── _shaj-sunset.scss
├── components/                    # Component-specific theme overrides
│   ├── _button-themes.scss
│   ├── _card-themes.scss
│   ├── _form-themes.scss
│   └── _enhanced-component-themes.scss
├── utilities/                     # Theme-aware utility classes
│   ├── _color-utilities.scss
│   └── _spacing-utilities.scss
└── examples/
    └── _variant-examples.scss     # Usage examples
```

### Theme Data Structure

Each theme follows a consistent structure:

```scss
$theme-config: (
  // Color scales (50-900 for primary, secondary, neutral)
  primary: (50: #f0f9ff, 100: #e0f2fe, ..., 900: #0c4a6e),
  secondary: (50: #f8fafc, 100: #f1f5f9, ..., 900: #0f172a),
  neutral: (50: #fafafa, 100: #f4f4f5, ..., 900: #18181b),
  
  // Semantic colors
  success: #10b981,
  warning: #f59e0b,
  error: #ef4444,
  info: #3b82f6,
  
  // Surface colors
  background: #ffffff,
  surface: #ffffff,
  surface-variant: #f8fafc,
  
  // Typography system
  typography: (
    font-family: ('Inter', 'system-ui', ...),
    font-weights: (light: 300, normal: 400, ...),
    font-sizes: (xs: 0.75rem, sm: 0.875rem, ...),
    line-heights: (tight: 1.25, normal: 1.5, ...),
  ),
  
  // Spacing scale (0-96)
  spacing: (0: 0, 1: 0.25rem, 2: 0.5rem, ...),
  
  // Border radius
  border-radius: (none: 0, sm: 0.125rem, ...),
  
  // Box shadows
  shadows: (none: 'none', sm: '0 1px 2px...', ...),
  
  // Animation
  animation: (
    duration: (fast: 150ms, base: 250ms, slow: 350ms),
    timing: (linear: linear, ease: ease, ...),
  ),
  
  // Component-specific configurations
  components: (
    button: (padding-x: 1rem, border-radius: 0.375rem, ...),
    card: (padding: 1.5rem, box-shadow: '0 1px 3px...', ...),
    input: (padding-x: 0.75rem, border-width: 1px, ...),
    // ... more components
  )
);
```

## Available Themes

### Professional Themes

#### 1. Shaj Default (`shaj-default`)
- **Purpose**: Clean, modern theme for professional applications
- **Primary Color**: Vibrant Blue (#0ea5e9)
- **Best For**: Corporate websites, dashboards, business applications
- **Characteristics**: Clean lines, professional typography, balanced spacing

#### 2. Shaj Midnight (`shaj-midnight`)
- **Purpose**: Sophisticated dark theme for night-time applications
- **Primary Color**: Deep Purple (#a855f7)
- **Best For**: Dark mode interfaces, developer tools, night-time usage
- **Characteristics**: High contrast, elegant shadows, reduced eye strain

### Nature & Wellness Themes

#### 3. Shaj Ocean (`shaj-ocean`)
- **Purpose**: Calm, serene theme for wellness applications
- **Primary Color**: Ocean Blue (#0891b2)
- **Best For**: Healthcare, meditation apps, wellness platforms
- **Characteristics**: Soft curves, generous spacing, calming colors

#### 4. Shaj Forest (`shaj-forest`)
- **Purpose**: Natural, organic theme for environmental applications
- **Primary Color**: Forest Green (#16a34a)
- **Best For**: Environmental organizations, outdoor brands, sustainability apps
- **Characteristics**: Earth tones, natural feel, organic shapes

#### 5. Shaj Pastel (`shaj-pastel`)
- **Purpose**: Soft, gentle theme for children and wellness applications
- **Primary Color**: Soft Pink (#ec4899)
- **Best For**: Children's apps, wellness platforms, gentle interfaces
- **Characteristics**: Soft colors, rounded corners, playful animations

### Creative Themes

#### 6. Shaj Sunset (`shaj-sunset`)
- **Purpose**: Warm, energetic theme for creative applications
- **Primary Color**: Vibrant Orange (#f97316)
- **Best For**: Creative portfolios, art platforms, energetic brands
- **Characteristics**: Warm colors, dynamic gradients, bold typography

## Usage

### Basic Implementation

#### 1. Import the Theme System

```scss
// In your main SCSS file
@use 'src/styles/themes' as themes;
```

#### 2. Apply Theme to HTML

```html
<!-- Apply theme to entire page -->
<body data-theme="shaj-ocean">
  <!-- All components will use ocean theme -->
</body>

<!-- Apply theme to specific section -->
<div data-theme="shaj-sunset">
  <!-- Components in this section use sunset theme -->
</div>
```

#### 3. Use Theme Variables in CSS

```scss
.my-component {
  // Colors
  background-color: var(--shaj-primary-500);
  color: var(--shaj-neutral-50);
  border-color: var(--shaj-neutral-200);
  
  // Spacing
  padding: var(--shaj-spacing-4);
  margin: var(--shaj-spacing-2);
  gap: var(--shaj-spacing-3);
  
  // Typography
  font-family: var(--shaj-font-family);
  font-size: var(--shaj-font-size-base);
  font-weight: var(--shaj-font-weight-medium);
  line-height: var(--shaj-line-height-normal);
  
  // Layout
  border-radius: var(--shaj-border-radius-md);
  box-shadow: var(--shaj-shadow-md);
  
  // Animation
  transition: all var(--shaj-duration-base) var(--shaj-timing-ease);
}
```

### Runtime Theme Switching

#### JavaScript Implementation

```javascript
// Basic theme switching
function setTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);
  
  // Optional: Store preference
  localStorage.setItem('preferred-theme', themeName);
}

// Theme switcher component
const ThemeSwitcher = () => {
  const themes = [
    'shaj-default',
    'shaj-midnight', 
    'shaj-ocean',
    'shaj-forest',
    'shaj-pastel',
    'shaj-sunset'
  ];
  
  return (
    <select onChange={(e) => setTheme(e.target.value)}>
      {themes.map(theme => (
        <option key={theme} value={theme}>
          {theme.replace('shaj-', '').replace('-', ' ')}
        </option>
      ))}
    </select>
  );
};

// Auto-detect system preference
function detectSystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'shaj-midnight' : 'shaj-default';
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('preferred-theme');
  const systemTheme = detectSystemTheme();
  const initialTheme = savedTheme || systemTheme;
  
  setTheme(initialTheme);
});
```

## Advanced Customization

### Creating Theme Variants

The theme variant generator allows you to create custom themes based on existing ones:

#### 1. Basic Color Modifications

```scss
@use 'src/styles/themes/theme-variant-generator' as variant;
@use 'src/styles/themes/base/shaj-default' as default-theme;

// Create a warmer variant of the default theme
$warm-variant: variant.create-theme-variant(
  default-theme.$theme-config,
  (
    colors: (
      primary: (hue-shift: 20deg),      // Shift towards orange
      secondary: (hue-shift: 15deg),    // Warm up secondary
      success: (replace: #22c55e),      // Custom green
    ),
  )
);
```

#### 2. Spacing and Layout Modifications

```scss
// Create a compact variant
$compact-variant: variant.create-theme-variant(
  default-theme.$theme-config,
  (
    spacing: 0.8,  // Scale down all spacing by 20%
    border-radius: (
      base: 0.125rem,  // Smaller border radius
      md: 0.25rem,
      lg: 0.375rem,
    ),
    components: (
      button: (
        padding-x: 0.75rem,
        padding-y: 0.375rem,
      ),
      card: (
        padding: 1rem,
      ),
    ),
  )
);
```

#### 3. Component-Specific Customizations

```scss
// Create a variant with custom component styling
$custom-variant: variant.create-theme-variant(
  default-theme.$theme-config,
  (
    components: (
      button: (
        border-radius: 1rem,        // Fully rounded buttons
        font-weight: 600,           // Bolder text
        border-width: 2px,          // Thicker borders
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      ),
      card: (
        border-radius: 1.5rem,      // Very rounded cards
        padding: 2rem,              // More padding
        box-shadow: '0 8px 25px -5px rgba(0, 0, 0, 0.1)',
      ),
      input: (
        border-radius: 0.75rem,     // Rounded inputs
        padding-x: 1rem,
        padding-y: 0.75rem,
      ),
    ),
  )
);
```

#### 4. Automatic Variant Generation

```scss
// Generate common variants automatically
$dark-variant: variant.create-dark-variant(default-theme.$theme-config);
$high-contrast: variant.create-high-contrast-variant(default-theme.$theme-config);
$comfortable: variant.create-comfortable-variant(default-theme.$theme-config);

// Create a theme family with multiple variants
$theme-family: variant.create-theme-family(
  default-theme.$theme-config,
  (
    'brand-warm': (
      colors: (primary: (hue-shift: 30deg)),
      surfaces: (background: #fffaf5),
    ),
    'brand-cool': (
      colors: (primary: (hue-shift: -30deg)),
      surfaces: (background: #f8fafc),
    ),
    'brand-compact': (
      spacing: 0.8,
      border-radius: 0.7,
    ),
  )
);
```

### Registering Custom Themes

#### 1. SCSS Registration

```scss
// Register your custom theme
@include generator.apply-theme-data-attribute('my-custom-theme', $custom-variant);

// Or register multiple themes
@each $name, $config in $theme-family {
  @include generator.apply-theme-data-attribute('brand-#{$name}', $config);
}
```

#### 2. JavaScript Theme Management

```javascript
// Extended theme manager
class ThemeManager {
  constructor() {
    this.themes = new Map([
      ['shaj-default', 'Shaj Default'],
      ['shaj-midnight', 'Shaj Midnight'],
      ['shaj-ocean', 'Shaj Ocean'],
      ['shaj-forest', 'Shaj Forest'],
      ['shaj-pastel', 'Shaj Pastel'],
      ['shaj-sunset', 'Shaj Sunset'],
      // Custom themes
      ['my-custom-theme', 'My Custom Theme'],
      ['brand-warm', 'Brand Warm'],
      ['brand-cool', 'Brand Cool'],
    ]);
    
    this.currentTheme = this.getStoredTheme() || 'shaj-default';
    this.init();
  }
  
  init() {
    this.applyTheme(this.currentTheme);
    this.setupSystemThemeListener();
  }
  
  applyTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    this.currentTheme = themeName;
    this.storeTheme(themeName);
    this.notifyThemeChange(themeName);
  }
  
  getAvailableThemes() {
    return Array.from(this.themes.entries());
  }
  
  storeTheme(themeName) {
    localStorage.setItem('preferred-theme', themeName);
  }
  
  getStoredTheme() {
    return localStorage.getItem('preferred-theme');
  }
  
  setupSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        const systemTheme = e.matches ? 'shaj-midnight' : 'shaj-default';
        this.applyTheme(systemTheme);
      }
    });
  }
  
  notifyThemeChange(themeName) {
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: themeName }
    }));
  }
}

// Usage
const themeManager = new ThemeManager();

// Listen for theme changes
window.addEventListener('themechange', (e) => {
  console.log('Theme changed to:', e.detail.theme);
});

// Change theme
themeManager.applyTheme('shaj-ocean');
```

## Component Integration

### Automatic Theme Application

All Atomix components automatically inherit theme styling through the enhanced component theme system:

```scss
// Enhanced button themes are automatically applied
[data-theme='shaj-ocean'] {
  .c-btn {
    --atomix-btn-color: var(--shaj-neutral-50);
    --atomix-btn-bg: var(--shaj-primary-500);
    --atomix-btn-border-color: var(--shaj-primary-500);
    // ... all button variables are themed
  }
}
```

### Manual Component Theming

For custom components, use theme-aware styling:

```scss
.my-custom-component {
  // Use theme variables directly
  background: var(--shaj-surface);
  color: var(--shaj-neutral-900);
  border: 1px solid var(--shaj-neutral-200);
  
  // Theme-specific overrides
  [data-theme='shaj-midnight'] & {
    box-shadow: 0 4px 14px 0 rgba(124, 58, 237, 0.25);
  }
  
  [data-theme='shaj-ocean'] & {
    border-radius: var(--shaj-border-radius-lg);
  }
  
  [data-theme='shaj-pastel'] & {
    border-radius: var(--shaj-border-radius-xl);
    border-width: 2px;
  }
}
```

## Performance Considerations

### CSS Custom Properties

The theme system uses CSS custom properties for optimal performance:

- **Runtime Switching**: No CSS recompilation needed
- **Cascade Efficiency**: Variables cascade naturally
- **Memory Usage**: Minimal memory overhead
- **Browser Support**: Modern browsers with graceful fallback

### Optimization Tips

1. **Selective Theme Loading**: Only load themes you need
2. **Critical CSS**: Include default theme in critical CSS
3. **Lazy Loading**: Load additional themes on demand
4. **Caching**: Cache theme preferences in localStorage

```javascript
// Lazy load themes
async function loadTheme(themeName) {
  if (!document.querySelector(`[data-theme-loaded="${themeName}"]`)) {
    const themeCSS = await import(`./themes/${themeName}.css`);
    const style = document.createElement('style');
    style.setAttribute('data-theme-loaded', themeName);
    style.textContent = themeCSS.default;
    document.head.appendChild(style);
  }
}
```

## Accessibility

### WCAG Compliance

All themes are designed to meet WCAG 2.1 AA standards:

- **Contrast Ratios**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Color Independence**: Information not conveyed by color alone
- **Focus Indicators**: Clear focus states for all interactive elements
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

### High Contrast Support

```scss
// Automatic high contrast variant generation
@media (prefers-contrast: high) {
  :root {
    --shaj-primary-500: #{color.scale($primary-500, $lightness: -20%)};
    --shaj-component-button-border-width: 2px;
    --shaj-component-input-border-width: 2px;
  }
}
```

### Reduced Motion Support

```scss
@media (prefers-reduced-motion: reduce) {
  :root {
    --shaj-duration-fast: 0ms;
    --shaj-duration-base: 0ms;
    --shaj-duration-slow: 0ms;
    --shaj-timing-bounce: linear;
  }
}
```

## Browser Support

### Modern Browsers
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 16+

### Fallback Strategy

```scss
// Fallback for older browsers
.c-btn {
  background-color: #0ea5e9; // Fallback
  background-color: var(--shaj-primary-500); // Enhanced
}
```

## Migration Guide

### From Existing Atomix Variables

The CSS variables bridge provides seamless migration:

```scss
// Old way
.component {
  color: $atomix-color-primary;
  padding: $atomix-spacing-md;
}

// New way (automatic through bridge)
.component {
  color: var(--atomix-color-primary); // Maps to var(--shaj-primary-500)
  padding: var(--atomix-spacing-md);  // Maps to var(--shaj-spacing-4)
}

// Direct Shaj usage (recommended)
.component {
  color: var(--shaj-primary-500);
  padding: var(--shaj-spacing-4);
}
```

### Gradual Adoption

1. **Phase 1**: Include theme system alongside existing styles
2. **Phase 2**: Apply themes to new components
3. **Phase 3**: Migrate existing components to use theme variables
4. **Phase 4**: Remove old variable system

## Best Practices

### Theme Selection

1. **Purpose-Driven**: Choose themes based on application purpose
2. **User Testing**: Test themes with target audience
3. **Accessibility**: Always test with screen readers and high contrast
4. **Performance**: Monitor theme switching performance

### Custom Theme Development

1. **Consistent Naming**: Follow the established naming conventions
2. **Complete Scales**: Provide full color scales (50-900)
3. **Semantic Colors**: Include all semantic color variants
4. **Component Testing**: Test with all component variants
5. **Documentation**: Document theme purpose and characteristics

### Development Workflow

1. **Design Tokens**: Start with design tokens in design tools
2. **Theme Configuration**: Convert to theme configuration format
3. **Component Testing**: Test with representative components
4. **Accessibility Audit**: Verify contrast ratios and accessibility
5. **Performance Testing**: Test theme switching performance
6. **Documentation**: Document usage and characteristics

## Troubleshooting

### Common Issues

#### Theme Not Applying
```javascript
// Check if data-theme attribute is set
console.log(document.body.getAttribute('data-theme'));

// Verify CSS variables are available
console.log(getComputedStyle(document.body).getPropertyValue('--shaj-primary-500'));
```

#### CSS Variables Not Working
```scss
// Ensure proper CSS custom property syntax
.component {
  color: var(--shaj-primary-500); // Correct
  // color: --shaj-primary-500;   // Incorrect
}
```

#### Specificity Issues
```scss
// Use CSS custom properties for higher specificity
.component {
  background-color: var(--shaj-primary-500) !important; // Last resort
}

// Better: Use theme-specific selectors
[data-theme='shaj-ocean'] .component {
  background-color: var(--shaj-primary-500);
}
```

### Debug Mode

```scss
// Enable debug mode to see theme boundaries
[data-debug-theme] * {
  outline: 1px solid var(--shaj-primary-500);
}
```

```javascript
// Toggle debug mode
function toggleThemeDebug() {
  document.body.toggleAttribute('data-debug-theme');
}
```

## Contributing

### Adding New Themes

1. Create theme configuration in `src/styles/themes/base/`
2. Add to theme registry in `src/styles/themes/_index.scss`
3. Create component-specific overrides if needed
4. Add to Storybook showcase
5. Update documentation

### Theme Naming Convention

- **Prefix**: All themes start with `shaj-`
- **Descriptive**: Use descriptive names (ocean, forest, midnight)
- **Kebab Case**: Use kebab-case for multi-word names
- **Semantic**: Reflect theme purpose or mood

### Testing

```bash
# Run theme-specific tests
npm run test:themes

# Visual regression testing
npm run test:visual

# Accessibility testing
npm run test:a11y
```

## Conclusion

The Shaj Theme System provides a powerful, flexible, and accessible theming solution for the Atomix Design System. With comprehensive theme options, advanced customization capabilities, and seamless integration, it enables developers to create beautiful, consistent, and accessible user interfaces across all applications.

For additional support or questions, please refer to the Storybook documentation or create an issue in the project repository. 