# AtomixLogo

The AtomixLogo component displays the Atomix brand logo as an SVG icon. It's a simple, customizable logo component that maintains brand consistency across your application while providing flexibility for different display contexts.

## Overview

The AtomixLogo component renders the official Atomix logo as a scalable SVG element. It supports customization of size, color, and all standard SVG properties while maintaining the visual integrity of the brand.

## Installation

The AtomixLogo component is included in the Atomix package. Import it in your React components:

```jsx
import { AtomixLogo } from '@shohojdhara/atomix';
```

## Basic Usage

### React

```jsx
import { AtomixLogo } from '@shohojdhara/atomix';

function MyComponent() {
  return (
    <AtomixLogo 
      width={32} 
      height={32} 
      color="currentColor" 
    />
  );
}
```

### HTML/CSS

For vanilla JavaScript or HTML implementations, you can use the SVG markup directly:

```html
<!-- Basic Atomix logo -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
  <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
</svg>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | `24` | Width of the logo |
| `height` | `number \| string` | `24` | Height of the logo |
| `color` | `string` | `'currentColor'` | Fill color of the logo |
| `...props` | `React.SVGProps<SVGSVGElement>` | - | All other SVG element props |

### AtomixLogoProps Interface

```typescript
interface AtomixLogoProps extends React.SVGProps<SVGSVGElement> {
  height?: number | string;
  width?: number | string;
  color?: string;
}
```

## Examples

### Different Sizes

```jsx
function LogoSizes() {
  return (
    <div className="logo-showcase">
      <AtomixLogo width={16} height={16} />
      <AtomixLogo width={24} height={24} />
      <AtomixLogo width={32} height={32} />
      <AtomixLogo width={48} height={48} />
      <AtomixLogo width={64} height={64} />
    </div>
  );
}
```

### Custom Colors

```jsx
function ColoredLogos() {
  return (
    <div className="logo-colors">
      <AtomixLogo color="#1a365d" />
      <AtomixLogo color="#2b77e4" />
      <AtomixLogo color="#38a169" />
      <AtomixLogo color="#d69e2e" />
      <AtomixLogo color="#e53e3e" />
    </div>
  );
}
```

### Responsive Logo

```jsx
function ResponsiveLogo() {
  return (
    <AtomixLogo 
      width="100%" 
      height="auto" 
      style={{ maxWidth: '200px' }}
      color="currentColor"
    />
  );
}
```

### Navigation Header

```jsx
function NavigationHeader() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <AtomixLogo width={32} height={32} />
        <span className="brand-name">Atomix</span>
      </div>
    </nav>
  );
}
```

### Footer Logo

```jsx
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <AtomixLogo 
          width={40} 
          height={40} 
          color="#6b7280" 
        />
        <p>&copy; 2024 Atomix Design System</p>
      </div>
    </footer>
  );
}
```

## Accessibility

### ARIA Support

The AtomixLogo component automatically includes proper accessibility attributes:

```jsx
function AccessibleLogo() {
  return (
    <AtomixLogo 
      width={32} 
      height={32}
      role="img"
      aria-label="Atomix logo"
    />
  );
}
```

### Best Practices

- Always provide an `aria-label` when the logo serves as a meaningful element
- Use appropriate sizing for different contexts (navigation vs footer vs content)
- Ensure sufficient color contrast when using custom colors
- Consider using `role="img"` for screen readers when the logo is decorative

## Styling

### CSS Custom Properties

The logo inherits color from its parent element when using `currentColor`:

```css
:root {
  --logo-color-primary: #2b77e4;
  --logo-color-secondary: #6b7280;
}

.brand-primary .atomix-logo {
  color: var(--logo-color-primary);
}

.brand-muted .atomix-logo {
  color: var(--logo-color-secondary);
}
```

### Custom Styling

```css
/* Logo wrapper styles */
.logo-container {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Hover effects */
.logo-link:hover .atomix-logo {
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

/* Dark mode adaptation */
@media (prefers-color-scheme: dark) {
  .atomix-logo {
    color: #f7fafc;
  }
}

/* Responsive sizing */
@media (max-width: 768px) {
  .navbar .atomix-logo {
    width: 24px;
    height: 24px;
  }
}

@media (min-width: 1024px) {
  .navbar .atomix-logo {
    width: 36px;
    height: 36px;
  }
}
```

## Common Patterns

### Brand Header

```jsx
function BrandHeader() {
  return (
    <header className="brand-header">
      <div className="container">
        <div className="brand-identity">
          <AtomixLogo width={48} height={48} />
          <div className="brand-text">
            <h1>Atomix</h1>
            <p>Design System</p>
          </div>
        </div>
      </div>
    </header>
  );
}
```

### Loading Screen

```jsx
function LoadingScreen() {
  return (
    <div className="loading-screen">
      <AtomixLogo 
        width={64} 
        height={64} 
        className="loading-logo animate-pulse"
      />
      <p>Loading...</p>
    </div>
  );
}
```

### App Icon

```jsx
function AppIcon() {
  return (
    <div className="app-icon">
      <AtomixLogo 
        width={96} 
        height={96}
        style={{
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      />
    </div>
  );
}
```

## Performance Considerations

- **SVG Optimization**: The logo is already optimized as an inline SVG
- **Bundle Size**: Minimal impact on bundle size due to simple SVG structure
- **Rendering**: No external dependencies or image loading required
- **Scalability**: Vector-based, scales perfectly at any size

## Integration Examples

### With React Router

```jsx
import { Link } from 'react-router-dom';

function NavigationLogo() {
  return (
    <Link to="/" className="logo-link">
      <AtomixLogo width={32} height={32} />
    </Link>
  );
}
```

### With Styled Components

```jsx
import styled from 'styled-components';

const StyledLogo = styled(AtomixLogo)`
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

function AnimatedLogo() {
  return <StyledLogo width={40} height={40} />;
}
```

### With Theme Provider

```jsx
import { useTheme } from '../theme/ThemeProvider';

function ThemedLogo() {
  const { colors } = useTheme();
  
  return (
    <AtomixLogo 
      width={32} 
      height={32}
      color={colors.primary}
    />
  );
}
```

## Browser Support

- **Modern Browsers**: Full support for SVG rendering
- **Internet Explorer**: IE 9+ with SVG support
- **Mobile Browsers**: Full support on iOS Safari and Chrome Mobile
- **Print**: Renders correctly in print media

## Related Components

- [Icon](./icon.md) - For other icon needs
- [Avatar](./avatar.md) - For user profile images
- [Button](./button.md) - Often used alongside logos in headers

## Migration Guide

### From Custom Logo

If you're replacing a custom logo implementation:

```jsx
// Before
<img src="/logo.svg" alt="Logo" width="32" height="32" />

// After
<AtomixLogo width={32} height={32} aria-label="Atomix logo" />
```

### From Icon Font

```jsx
// Before
<i className="icon-logo" style={{ fontSize: '32px' }}></i>

// After
<AtomixLogo width={32} height={32} />
```

The AtomixLogo component provides a consistent, scalable, and accessible way to display the Atomix brand across your application while maintaining design system consistency.