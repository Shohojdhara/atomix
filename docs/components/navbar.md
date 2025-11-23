# Navbar

The Navbar component provides a responsive navigation header with brand, menu items, and collapsible mobile menu functionality. It's the primary navigation component for websites and applications.

## Overview

The Navbar component is designed to be the main navigation element at the top (or bottom) of your application. It supports responsive behavior, multiple positioning options, theme variants, and integrates seamlessly with other navigation components like Nav, NavItem, and NavDropdown.

## Installation

The Navbar component is included in the Atomix package. Import it in your React components:

```jsx
import { Navbar, Nav, NavItem } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, navbar styles and functionality are available through CSS classes and JavaScript modules.

## Basic Usage

### React

```jsx
import { Navbar, Nav, NavItem } from '@shohojdhara/atomix';

function MyNavbar() {
  return (
    <Navbar brand="My App">
      <Nav>
        <NavItem href="/" active>Home</NavItem>
        <NavItem href="/products">Products</NavItem>
        <NavItem href="/about">About</NavItem>
      </Nav>
    </Navbar>
  );
}
```

### HTML/CSS

```html
<nav class="c-navbar" data-navbar data-collapsible="true">
  <div class="c-navbar__container">
    <a href="/" class="c-navbar__brand">My App</a>
    <button class="c-navbar__toggler" aria-expanded="false">
      <span class="c-navbar__toggler-icon"></span>
    </button>
    <div class="c-navbar__collapse">
      <ul class="c-nav">
        <li class="c-nav-item"><a href="/">Home</a></li>
        <li class="c-nav-item"><a href="/products">Products</a></li>
      </ul>
    </div>
  </div>
</nav>
```

## API Reference

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `brand` | `ReactNode` | - | No | Brand/logo component or text |
| `children` | `ReactNode` | - | No | Navigation items (typically Nav components) |
| `variant` | `ThemeColor` | - | No | Color scheme variant |
| `position` | `'static' \| 'fixed' \| 'fixed-bottom'` | `'static'` | No | Navbar position |
| `containerWidth` | `string` | - | No | Container max width |
| `collapsible` | `boolean` | `true` | No | Whether to collapse navbar on mobile |
| `expanded` | `boolean` | - | No | Controlled expansion state |
| `onToggle` | `(expanded: boolean) => void` | - | No | Toggle callback |
| `backdrop` | `boolean` | `false` | No | Show backdrop when expanded on mobile |
| `closeOnOutsideClick` | `boolean` | `true` | No | Close navbar when clicking outside |
| `closeOnEscape` | `boolean` | `true` | No | Close navbar on escape key press |
| `ariaLabel` | `string` | `'Main navigation'` | No | Accessible label for navigation |
| `id` | `string` | - | No | Navbar ID (used for accessibility) |
| `glass` | `boolean \| AtomixGlassProps` | `false` | No | Enable glass morphism effect |
| `className` | `string` | `''` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | - | No | Custom style object |
| `disabled` | `boolean` | `false` | No | Whether the navbar is disabled |

### Position Options

- `'static'` - Normal document flow (default)
- `'fixed'` - Fixed to top of viewport
- `'fixed-bottom'` - Fixed to bottom of viewport

### Variant Options

The `variant` prop accepts theme color values:
- `'primary'`, `'secondary'`, `'success'`, `'error'`, `'warning'`, `'info'`
- `'light'`, `'dark'`
- `'brand'`, `'invert'`, `'tertiary'`

## Examples

### Basic Navbar

```jsx
function BasicNavbar() {
  return (
    <Navbar brand="My App">
      <Nav>
        <NavItem href="/" active>Home</NavItem>
        <NavItem href="/products">Products</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </Nav>
    </Navbar>
  );
}
```

### With Logo

```jsx
function NavbarWithLogo() {
  return (
    <Navbar
      brand={
        <div className="u-d-flex u-align-items-center u-gap-2">
          <img src="/logo.svg" alt="Logo" className="u-h-8" />
          <span className="u-fw-bold u-fs-xl">My App</span>
        </div>
      }
    >
      <Nav>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/products">Products</NavItem>
      </Nav>
    </Navbar>
  );
}
```

### Fixed Navbar

```jsx
function FixedNavbar() {
  return (
    <Navbar
      brand="My App"
      position="fixed"
      variant="primary"
    >
      <Nav>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/products">Products</NavItem>
      </Nav>
    </Navbar>
  );
}
```

### With Dropdown Menu

```jsx
import { Navbar, Nav, NavItem, NavDropdown, Menu, MenuItem } from '@shohojdhara/atomix';

function NavbarWithDropdown() {
  return (
    <Navbar brand="My App">
      <Nav>
        <NavItem href="/" active>Home</NavItem>
        <NavDropdown title="Products" alignment="start">
          <Menu>
            <MenuItem href="/products/web">Web Development</MenuItem>
            <MenuItem href="/products/mobile">Mobile Apps</MenuItem>
            <MenuItem href="/products/desktop">Desktop Software</MenuItem>
          </Menu>
        </NavDropdown>
        <NavItem href="/about">About</NavItem>
      </Nav>
    </Navbar>
  );
}
```

### Responsive Navbar

```jsx
function ResponsiveNavbar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      brand="My App"
      collapsible
      expanded={expanded}
      onToggle={setExpanded}
      backdrop
      closeOnOutsideClick
      closeOnEscape
    >
      <Nav>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/products">Products</NavItem>
        <NavItem href="/about">About</NavItem>
      </Nav>
      <Nav alignment="end">
        <NavItem>
          <Button label="Sign In" variant="link" />
        </NavItem>
        <NavItem>
          <Button label="Sign Up" variant="primary" size="sm" />
        </NavItem>
      </Nav>
    </Navbar>
  );
}
```

### With Search

```jsx
function NavbarWithSearch() {
  return (
    <Navbar brand="My App">
      <Nav>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/products">Products</NavItem>
      </Nav>
      <Nav alignment="end">
        <NavItem>
          <Input
            type="search"
            placeholder="Search..."
            size="sm"
            style={{ width: '200px' }}
          />
        </NavItem>
      </Nav>
    </Navbar>
  );
}
```

### Glass Effect Navbar

```jsx
function GlassNavbar() {
  return (
    <Navbar
      brand="My App"
      position="fixed"
      glass={true}
    >
      <Nav>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/products">Products</NavItem>
      </Nav>
    </Navbar>
  );
}
```

### Custom Glass Configuration

```jsx
function CustomGlassNavbar() {
  return (
    <Navbar
      brand="My App"
      position="fixed"
      glass={{
        displacementScale: 60,
        blurAmount: 1.5,
        saturation: 180,
        cornerRadius: 8,
        mode: 'shader',
      }}
    >
      <Nav>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/products">Products</NavItem>
      </Nav>
    </Navbar>
  );
}
```

### Multiple Nav Sections

```jsx
function MultipleNavSections() {
  return (
    <Navbar brand="My App">
      <Nav alignment="start">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/products">Products</NavItem>
        <NavItem href="/about">About</NavItem>
      </Nav>
      <Nav alignment="center">
        <NavItem href="/blog">Blog</NavItem>
      </Nav>
      <Nav alignment="end">
        <NavItem>
          <Button label="Sign In" variant="link" />
        </NavItem>
        <NavItem>
          <Button label="Sign Up" variant="primary" />
        </NavItem>
      </Nav>
    </Navbar>
  );
}
```

## Accessibility

The Navbar component follows WCAG accessibility guidelines:

### Keyboard Support

- **Tab**: Moves focus between navigation items
- **Shift + Tab**: Moves focus backwards
- **Enter/Space**: Activates links/buttons
- **Escape**: Closes mobile menu (when collapsible)
- **Arrow Keys**: Navigate within dropdown menus

### ARIA Attributes

- `role="navigation"` - Identifies navigation landmark
- `aria-label` - Provides accessible label for navigation
- `aria-expanded` - Indicates mobile menu state
- `aria-controls` - Links toggle button to collapse element

### Best Practices

1. **Always provide a brand/logo**: Helps users identify the site
   ```jsx
   <Navbar brand="My App" />
   ```

2. **Use semantic HTML**: Navbar uses `<nav>` element
   ```jsx
   <Navbar ariaLabel="Main navigation">
   ```

3. **Indicate current page**: Use `active` prop on NavItem
   ```jsx
   <NavItem href="/" active>Home</NavItem>
   ```

4. **Provide skip links**: For keyboard users
   ```jsx
   <a href="#main-content" className="skip-link">Skip to main content</a>
   <Navbar brand="My App" />
   ```

5. **Test mobile menu**: Ensure mobile menu is accessible
   ```jsx
   <Navbar
     collapsible
     backdrop
     closeOnEscape
   />
   ```

## Styling

### CSS Custom Properties

The Navbar component uses CSS custom properties for theming:

```css
:root {
  --atomix-navbar-height: 3.5rem;
  --atomix-navbar-padding-x: 1rem;
  --atomix-navbar-padding-y: 0.5rem;
  --atomix-navbar-bg: var(--atomix-white);
  --atomix-navbar-color: var(--atomix-text-color);
  --atomix-navbar-border-width: 1px;
  --atomix-navbar-border-color: var(--atomix-border-color);
}
```

### CSS Classes

The component uses BEM methodology:

```css
.c-navbar { /* Base navbar class */ }
.c-navbar__container { /* Container wrapper */ }
.c-navbar__brand { /* Brand/logo area */ }
.c-navbar__toggler { /* Mobile toggle button */ }
.c-navbar__collapse { /* Collapsible content */ }
.c-navbar--fixed { /* Fixed position */ }
.c-navbar--expanded { /* Expanded state */ }
.c-navbar--primary { /* Primary variant */ }
```

## Integration with Routing

### React Router

```jsx
import { Link, useLocation } from 'react-router-dom';

function NavbarWithRouter() {
  const location = useLocation();

  return (
    <Navbar brand="My App">
      <Nav>
        <NavItem
          href="/"
          active={location.pathname === '/'}
          LinkComponent={Link}
        >
          Home
        </NavItem>
        <NavItem
          href="/products"
          active={location.pathname === '/products'}
          LinkComponent={Link}
        >
          Products
        </NavItem>
      </Nav>
    </Navbar>
  );
}
```

### Next.js

```jsx
import Link from 'next/link';
import { useRouter } from 'next/router';

function NavbarWithNextRouter() {
  const router = useRouter();

  return (
    <Navbar brand="My App">
      <Nav>
        <NavItem
          href="/"
          active={router.pathname === '/'}
          LinkComponent={Link}
        >
          Home
        </NavItem>
        <NavItem
          href="/products"
          active={router.pathname === '/products'}
          LinkComponent={Link}
        >
          Products
        </NavItem>
      </Nav>
    </Navbar>
  );
}
```

## Common Patterns

### E-commerce Navbar

```jsx
function EcommerceNavbar() {
  return (
    <Navbar
      brand={
        <div className="u-d-flex u-align-items-center u-gap-2">
          <img src="/logo.svg" alt="Store" />
          <span>My Store</span>
        </div>
      }
      position="fixed"
    >
      <Nav>
        <NavItem href="/">Home</NavItem>
        <NavDropdown title="Shop">
          <Menu>
            <MenuItem href="/shop/men">Men</MenuItem>
            <MenuItem href="/shop/women">Women</MenuItem>
            <MenuItem href="/shop/kids">Kids</MenuItem>
          </Menu>
        </NavDropdown>
        <NavItem href="/about">About</NavItem>
      </Nav>
      <Nav alignment="end">
        <NavItem>
          <Icon name="ShoppingCart" />
        </NavItem>
        <NavItem>
          <Button label="Sign In" variant="link" />
        </NavItem>
      </Nav>
    </Navbar>
  );
}
```

### Dashboard Navbar

```jsx
function DashboardNavbar() {
  return (
    <Navbar
      brand="Dashboard"
      variant="dark"
      position="fixed"
    >
      <Nav>
        <NavItem href="/dashboard" active>Overview</NavItem>
        <NavItem href="/analytics">Analytics</NavItem>
        <NavItem href="/users">Users</NavItem>
      </Nav>
      <Nav alignment="end">
        <NavItem>
          <Button label="Settings" variant="link" />
        </NavItem>
        <NavItem>
          <Avatar src="/user.jpg" />
        </NavItem>
      </Nav>
    </Navbar>
  );
}
```

## Browser Support

The Navbar component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[Nav](./nav.md)** - Navigation list component
- **[NavItem](./nav.md#navitem-component)** - Individual navigation items
- **[NavDropdown](./nav.md#navdropdown-component)** - Dropdown menu items
- **[SideMenu](./sidemenu.md)** - Sidebar navigation
- **[Breadcrumb](./breadcrumb.md)** - Breadcrumb navigation
- **[Button](./button.md)** - Action buttons in navbar

## Migration Guide

### From Bootstrap Navbar

```jsx
// Before (Bootstrap)
<nav className="navbar navbar-expand-lg navbar-light">
  <div className="container">
    <a className="navbar-brand" href="/">Brand</a>
    <button className="navbar-toggler">...</button>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav">...</ul>
    </div>
  </div>
</nav>

// After (Atomix)
<Navbar brand="Brand" collapsible>
  <Nav>
    <NavItem href="/">Home</NavItem>
  </Nav>
</Navbar>
```

