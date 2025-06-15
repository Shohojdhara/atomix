# Atomix CSS Integration Examples

This directory contains examples demonstrating different approaches to integrating Atomix CSS in your projects.

## Examples Overview

### 1. Basic CSS Import (`basic-css-import.tsx`)
The simplest approach using traditional CSS imports with Atomix utility classes.

**Features:**
- Direct CSS import
- Utility classes for spacing, layout
- Component classes for styling
- Minimal setup required

**Usage:**
```tsx
import '@shohojdhara/atomix/css';
import { Button, Card } from '@shohojdhara/atomix';

// Use Atomix components with utility classes
<Button className="c-btn--sm u-mb-2">Click me</Button>
```

### 2. CSS Modules (`css-modules-example.tsx`)
Scoped CSS approach combining Atomix base styles with custom modules.

**Features:**
- Scoped CSS classes
- No style conflicts
- Combines with Atomix classes
- Build-time optimization
- TypeScript definitions

**Usage:**
```tsx
import '@shohojdhara/atomix/css';
import styles from './component.module.css';

<Card className={`c-card ${styles.customCard}`}>
  Custom styled card
</Card>
```

## Setup Instructions

### Prerequisites
```bash
npm install @shohojdhara/atomix
```

### For CSS Modules
Configure your bundler to support CSS modules:

**Webpack:**
```javascript
{
  test: /\.module\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: { modules: true }
    }
  ]
}
```

**Vite:**
```javascript
// Automatically supported for .module.css files
```

**Next.js:**
```javascript
// Built-in support for CSS modules
```

## Running the Examples

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Navigate to the examples in your browser

### Individual Example Usage
Each example can be copied and used in your own project:

1. Copy the example file to your project
2. Install required dependencies
3. Update import paths as needed
4. Customize styles and components

## Comparison Guide

| Approach | Bundle Size | Runtime | Learning Curve | Flexibility | Performance |
|----------|-------------|---------|----------------|-------------|-------------|
| Basic CSS | Small | None | Low | Medium | Excellent |
| CSS Modules | Small | None | Low | Medium | Excellent |

## Best Practices

### When to Use Each Approach

**Basic CSS Import:**
- Simple projects
- Static styling needs
- Minimal JavaScript overhead
- Traditional CSS workflow

**CSS Modules:**
- Large applications
- Style isolation requirements
- Build-time optimization
- Hybrid approach needs

### Performance Tips

1. **Use CSS imports for static styles**
2. **Enable CSS minification in production**
3. **Use PurgeCSS to remove unused styles**
4. **Consider critical CSS for faster loading**

### Accessibility Considerations

All examples include:
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader compatibility

## Customization Examples

### Custom CSS Variables
```css
:root {
  --atomix-primary: #your-brand-color;
  --atomix-border-radius: 12px;
  --atomix-spacing-base: 1.2rem;
}
```

### Custom SCSS Variables
```scss
// Override before importing Atomix
$primary-6: #your-brand-color;
$border-radius-base: 12px;

@use '@shohojdhara/atomix/scss' as atomix;
```

## Troubleshooting

### Common Issues

1. **Styles not loading:** Check import order and paths
2. **CSS conflicts:** Use CSS modules for isolation
3. **Bundle size:** Implement tree shaking and code splitting
4. **TypeScript errors:** Ensure proper type definitions are installed

### Support

For additional help:
- Check the main [CSS Integration Guide](../../CSS_INTEGRATION_GUIDE.md)
- Review the [documentation](../../README.md)
- Open an issue on GitHub

## Contributing

To add new examples:
1. Create a new example file
2. Follow the existing naming convention
3. Include comprehensive comments
4. Update this README
5. Submit a pull request