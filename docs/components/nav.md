# Nav

The Nav component provides a flexible navigation list container with support for horizontal and vertical layouts, various alignments, and integration with NavItem and NavDropdown components.

## Overview

The Nav component is a container for navigation items that provides consistent styling and layout. It works seamlessly with NavItem, NavDropdown, and can be used standalone or within a Navbar. It supports multiple alignment options and variants including floating navigation.

## Installation

The Nav component is included in the Atomix package. Import it in your React components:

```jsx
import { Nav, NavItem, NavDropdown } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, nav styles are available through CSS classes.

## Basic Usage

### React

```jsx
import { Nav, NavItem } from '@shohojdhara/atomix';

function MyNavigation() {
  return (
    <Nav>
      <NavItem href="/" active>Home</NavItem>
      <NavItem href="/products">Products</NavItem>
      <NavItem href="/about">About</NavItem>
    </Nav>
  );
}
```

### HTML/CSS

```html
<ul class="c-nav">
  <li class="c-nav-item">
    <a href="/" class="c-nav-item__link c-nav-item--active">Home</a>
  </li>
  <li class="c-nav-item">
    <a href="/products" class="c-nav-item__link">Products</a>
  </li>
</ul>
```

## API Reference

### Nav Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | Yes | Navigation items (NavItem, NavDropdown) |
| `alignment` | `'start' \| 'center' \| 'end'` | `'start'` | No | Alignment of nav items |
| `variant` | `'default' \| 'float-top-center' \| 'float-bottom-center'` | `'default'` | No | Nav variant style |
| `glass` | `boolean \| AtomixGlassProps` | `false` | No | Enable glass morphism effect |
| `className` | `string` | `''` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | - | No | Custom style object |
| `disabled` | `boolean` | `false` | No | Whether the nav is disabled |

### NavItem Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | Yes | Item content |
| `href` | `string` | - | No | Link URL |
| `active` | `boolean` | `false` | No | Active state |
| `dropdown` | `boolean` | `false` | No | Has dropdown menu |
| `megaMenu` | `boolean` | `false` | No | Has mega menu |
| `onClick` | `() => void` | - | No | Click handler |
| `LinkComponent` | `React.ElementType` | - | No | Custom link component (e.g., React Router Link) |
| `disabled` | `boolean` | `false` | No | Whether the item is disabled |
| `className` | `string` | `''` | No | Additional CSS classes |

### NavDropdown Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | - | Yes | Dropdown title |
| `children` | `ReactNode` | - | Yes | Dropdown menu content (Menu, MenuItem) |
| `alignment` | `'start' \| 'end'` | `'start'` | No | Dropdown alignment |
| `megaMenu` | `boolean` | `false` | No | Enable mega menu style |
| `disabled` | `boolean` | `false` | No | Whether the dropdown is disabled |
| `className` | `string` | `''` | No | Additional CSS classes |

## Examples

### Basic Navigation

```jsx
function BasicNav() {
  return (
    <Nav>
      <NavItem href="/" active>Home</NavItem>
      <NavItem href="/products">Products</NavItem>
      <NavItem href="/about">About</NavItem>
      <NavItem href="/contact">Contact</NavItem>
    </Nav>
  );
}
```

### Alignment Options

```jsx
function AlignmentExamples() {
  return (
    <div className="u-gap-6">
      {/* Start alignment (default) */}
      <div style={{ border: '1px dashed #ccc', padding: '1rem' }}>
        <Nav alignment="start">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/products">Products</NavItem>
        </Nav>
      </div>

      {/* Center alignment */}
      <div style={{ border: '1px dashed #ccc', padding: '1rem' }}>
        <Nav alignment="center">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/products">Products</NavItem>
        </Nav>
      </div>

      {/* End alignment */}
      <div style={{ border: '1px dashed #ccc', padding: '1rem' }}>
        <Nav alignment="end">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/products">Products</NavItem>
        </Nav>
      </div>
    </div>
  );
}
```

### With Dropdown

```jsx
import { Nav, NavItem, NavDropdown, Menu, MenuItem } from '@shohojdhara/atomix';

function NavWithDropdown() {
  return (
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
  );
}
```

### With Icons

```jsx
import { Nav, NavItem, Icon } from '@shohojdhara/atomix';

function NavWithIcons() {
  return (
    <Nav>
      <NavItem href="/">
        <Icon name="House" size="sm" />
        Home
      </NavItem>
      <NavItem href="/products">
        <Icon name="Package" size="sm" />
        Products
      </NavItem>
      <NavItem href="/about">
        <Icon name="Info" size="sm" />
        About
      </NavItem>
    </Nav>
  );
}
```

### Floating Navigation

```jsx
function FloatingNav() {
  return (
    <Nav variant="float-top-center">
      <NavItem href="#section1">Section 1</NavItem>
      <NavItem href="#section2">Section 2</NavItem>
      <NavItem href="#section3">Section 3</NavItem>
      <NavItem href="#section4">Section 4</NavItem>
    </Nav>
  );
}
```

### Active States

```jsx
function ActiveStates() {
  const [activeItem, setActiveItem] = useState('home');

  return (
    <Nav>
      <NavItem
        href="/"
        active={activeItem === 'home'}
        onClick={() => setActiveItem('home')}
      >
        Home
      </NavItem>
      <NavItem
        href="/products"
        active={activeItem === 'products'}
        onClick={() => setActiveItem('products')}
      >
        Products
      </NavItem>
      <NavItem
        href="/about"
        active={activeItem === 'about'}
        onClick={() => setActiveItem('about')}
      >
        About
      </NavItem>
    </Nav>
  );
}
```

### Disabled Items

```jsx
function DisabledItems() {
  return (
    <Nav>
      <NavItem href="/" active>Home</NavItem>
      <NavItem href="/products">Products</NavItem>
      <NavItem href="/coming-soon" disabled>Coming Soon</NavItem>
      <NavItem href="/about">About</NavItem>
    </Nav>
  );
}
```

### Glass Effect

```jsx
function GlassNav() {
  return (
    <div
      style={{
        background: 'url(https://example.com/background.jpg)',
        padding: '2rem',
        borderRadius: '12px',
        backgroundSize: 'cover',
      }}
    >
      <Nav glass={true}>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/products">Products</NavItem>
        <NavItem href="/about">About</NavItem>
      </Nav>
    </div>
  );
}
```

### With React Router

```jsx
import { Link, useLocation } from 'react-router-dom';

function NavWithRouter() {
  const location = useLocation();

  return (
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
  );
}
```

## Accessibility

The Nav component follows WCAG accessibility guidelines:

### Keyboard Support

- **Tab**: Moves focus between navigation items
- **Shift + Tab**: Moves focus backwards
- **Enter/Space**: Activates links/buttons
- **Arrow Keys**: Navigate within dropdown menus
- **Escape**: Closes dropdown menus

### ARIA Attributes

- `role="menubar"` - Identifies navigation container
- `aria-orientation` - Indicates horizontal/vertical orientation
- `aria-expanded` - Indicates dropdown state
- `aria-current="page"` - Marks current page (on active items)

### Best Practices

1. **Indicate active page**: Use `active` prop on current page
   ```jsx
   <NavItem href="/" active>Home</NavItem>
   ```

2. **Provide accessible labels**: Use descriptive link text
   ```jsx
   <NavItem href="/products">Products</NavItem>
   // Not: <NavItem href="/products">Click here</NavItem>
   ```

3. **Handle disabled states**: Disable items that aren't available
   ```jsx
   <NavItem href="/coming-soon" disabled>Coming Soon</NavItem>
   ```

4. **Use semantic structure**: Nav wraps NavItems in proper list structure

## Styling

### CSS Custom Properties

The Nav component uses CSS custom properties for theming:

```css
:root {
  --atomix-nav-gap: 0.5rem;
  --atomix-nav-item-padding-x: 1rem;
  --atomix-nav-item-padding-y: 0.5rem;
  --atomix-nav-item-color: var(--atomix-text-color);
  --atomix-nav-item-active-color: var(--atomix-primary);
  --atomix-nav-item-hover-bg: var(--atomix-gray-100);
}
```

### CSS Classes

The component uses BEM methodology:

```css
.c-nav { /* Base nav class */ }
.c-nav--center { /* Center alignment */ }
.c-nav--end { /* End alignment */ }
.c-nav--float-top-center { /* Floating variant */ }
.c-nav-item { /* Nav item */ }
.c-nav-item__link { /* Nav item link */ }
.c-nav-item--active { /* Active state */ }
.c-nav-item--disabled { /* Disabled state */ }
.c-nav-item--dropdown { /* Has dropdown */ }
```

## Integration with Navbar

```jsx
function NavInNavbar() {
  return (
    <Navbar brand="My App">
      <Nav alignment="start">
        <NavItem href="/" active>Home</NavItem>
        <NavItem href="/products">Products</NavItem>
      </Nav>
      <Nav alignment="end">
        <NavItem>
          <Button label="Sign In" variant="link" />
        </NavItem>
      </Nav>
    </Navbar>
  );
}
```

## Common Patterns

### Main Navigation

```jsx
function MainNavigation() {
  return (
    <Nav>
      <NavItem href="/" active>Home</NavItem>
      <NavDropdown title="Products">
        <Menu>
          <MenuItem href="/products/web">Web</MenuItem>
          <MenuItem href="/products/mobile">Mobile</MenuItem>
        </Menu>
      </NavDropdown>
      <NavItem href="/about">About</NavItem>
      <NavItem href="/contact">Contact</NavItem>
    </Nav>
  );
}
```

### Footer Navigation

```jsx
function FooterNavigation() {
  return (
    <Nav alignment="center">
      <NavItem href="/privacy">Privacy</NavItem>
      <NavItem href="/terms">Terms</NavItem>
      <NavItem href="/cookies">Cookies</NavItem>
      <NavItem href="/sitemap">Sitemap</NavItem>
    </Nav>
  );
}
```

## Browser Support

The Nav component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[Navbar](./navbar.md)** - Main navigation bar
- **[NavItem](#navitem-component)** - Individual navigation items
- **[NavDropdown](#navdropdown-component)** - Dropdown menu items
- **[Menu](../navigation.md#menu-component)** - Menu container
- **[MenuItem](../navigation.md#menuitem-props)** - Menu items
- **[SideMenu](./sidemenu.md)** - Sidebar navigation

## Migration Guide

### From Bootstrap Nav

```jsx
// Before (Bootstrap)
<ul className="navbar-nav">
  <li className="nav-item">
    <a className="nav-link active" href="/">Home</a>
  </li>
</ul>

// After (Atomix)
<Nav>
  <NavItem href="/" active>Home</NavItem>
</Nav>
```

