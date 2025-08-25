# Navbar Component

The Navbar component provides a responsive navigation header with brand, navigation items, and collapsible mobile menu functionality. It follows the Atomix design system guidelines and includes both React and vanilla JavaScript implementations.

## Features

- **Responsive Design**: Automatically collapses on mobile devices
- **Multiple Positions**: Static, fixed top, or fixed bottom positioning
- **Theme Variants**: Support for all theme colors
- **Accessibility**: Full keyboard navigation and screen reader support
- **Dropdown & Mega Menus**: Support for both regular dropdowns and full-width mega menus
- **Vanilla JS Support**: Complete vanilla JavaScript implementation available

## React Usage

### Basic Navbar

```tsx
import { Navbar, Nav, NavItem } from '@atomix/components';

<Navbar brand="My App">
  <Nav>
    <NavItem href="/">Home</NavItem>
    <NavItem href="/about">About</NavItem>
    <NavItem href="/contact">Contact</NavItem>
  </Nav>
</Navbar>
```

### With Dropdown Menu

```tsx
import { Navbar, Nav, NavItem, NavDropdown, Menu, MenuItem } from '@atomix/components';

<Navbar brand="My App">
  <Nav>
    <NavItem href="/">Home</NavItem>
    <NavDropdown title="Services">
      <Menu>
        <MenuItem href="/web">Web Design</MenuItem>
        <MenuItem href="/mobile">Mobile Apps</MenuItem>
        <MenuItem href="/seo">SEO Services</MenuItem>
      </Menu>
    </NavDropdown>
    <NavItem href="/contact">Contact</NavItem>
  </Nav>
</Navbar>
```

### With Mega Menu

```tsx
import { 
  Navbar, Nav, NavItem, NavDropdown, 
  MegaMenu, MegaMenuColumn, MegaMenuLink 
} from '@atomix/components';

<Navbar brand="My App">
  <Nav>
    <NavItem href="/">Home</NavItem>
    <NavDropdown title="Products" megaMenu>
      <MegaMenu>
        <MegaMenuColumn title="Web Solutions" icon="icon-web">
          <MegaMenuLink href="/websites">Websites</MegaMenuLink>
          <MegaMenuLink href="/web-apps">Web Applications</MegaMenuLink>
          <MegaMenuLink href="/ecommerce">E-commerce</MegaMenuLink>
        </MegaMenuColumn>
        <MegaMenuColumn title="Mobile Solutions" icon="icon-mobile">
          <MegaMenuLink href="/ios">iOS Apps</MegaMenuLink>
          <MegaMenuLink href="/android">Android Apps</MegaMenuLink>
          <MegaMenuLink href="/hybrid">Hybrid Apps</MegaMenuLink>
        </MegaMenuColumn>
      </MegaMenu>
    </NavDropdown>
  </Nav>
</Navbar>
```

### Controlled Navbar

```tsx
import { useState } from 'react';
import { Navbar, Nav, NavItem } from '@atomix/components';

function MyNavbar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar 
      brand="My App" 
      expanded={expanded} 
      onToggle={setExpanded}
    >
      <Nav>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/about">About</NavItem>
      </Nav>
    </Navbar>
  );
}
```

## Vanilla JavaScript Usage

### HTML Structure

```html
<nav class="c-navbar" data-navbar data-collapsible="true" data-auto-close="true">
  <div class="c-navbar__container">
    <!-- Brand -->
    <a href="/" class="c-navbar__brand">My App</a>
    
    <!-- Mobile Toggle Button -->
    <button class="c-navbar__toggler" aria-expanded="false" aria-controls="navbar-collapse">
      <span class="c-navbar__toggler-icon"></span>
    </button>
    
    <!-- Collapsible Content -->
    <div id="navbar-collapse" class="c-navbar__collapse">
      <ul class="c-nav">
        <li class="c-nav__item">
          <a href="/" class="c-nav__link">Home</a>
        </li>
        <li class="c-nav__item c-nav__item--dropdown">
          <a href="#" class="c-nav__link c-nav__dropdown-toggle">
            Services
            <i class="c-nav__icon icon-caret-down"></i>
          </a>
          <div class="c-nav__dropdown-menu">
            <div class="c-menu">
              <a href="/web" class="c-menu__item">Web Design</a>
              <a href="/mobile" class="c-menu__item">Mobile Apps</a>
            </div>
          </div>
        </li>
        <li class="c-nav__item">
          <a href="/contact" class="c-nav__link">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

### JavaScript Initialization

#### Automatic Initialization (Recommended)

The navbar will automatically initialize when the DOM is ready if you include the bundle:

```html
<script src="path/to/atomix-navbar.js"></script>
```

#### Manual Initialization

```javascript
// Initialize all navbars with data attributes
const navbars = Atomix.Navbar.init();

// Initialize a specific navbar
const navbar = new Atomix.Navbar.Navbar('.my-navbar', {
  collapsible: true,
  autoClose: true,
  keyboard: true
});

// Or using the create helper
const navbar = Atomix.Navbar.create('.my-navbar', {
  collapsible: true,
  autoClose: true
});
```

#### Programmatic Control

```javascript
// Get navbar instance
const navbar = Atomix.Navbar.get('.my-navbar');

// Control the navbar
navbar.expand();
navbar.collapse();
navbar.toggle();

// Check state
console.log(navbar.isOpen()); // true/false

// Update options
navbar.updateOptions({ autoClose: false });

// Clean up
navbar.destroy();
```

#### Event Handling

```javascript
// Listen for navbar events
document.querySelector('.c-navbar').addEventListener('navbar:expanded', (event) => {
  console.log('Navbar expanded', event.detail);
});

document.querySelector('.c-navbar').addEventListener('navbar:collapsed', (event) => {
  console.log('Navbar collapsed', event.detail);
});
```

## Configuration Options

### React Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brand` | `ReactNode` | - | Brand/logo component or text |
| `children` | `ReactNode` | - | Navigation items |
| `variant` | `ThemeColor` | - | Color variant |
| `position` | `'static' \| 'fixed' \| 'fixed-bottom'` | `'static'` | Navbar position |
| `containerWidth` | `string` | - | Custom container width |
| `collapsible` | `boolean` | `true` | Whether to collapse on mobile |
| `expanded` | `boolean` | - | Controlled expanded state |
| `onToggle` | `(expanded: boolean) => void` | - | Toggle callback |
| `backdrop` | `boolean` | `false` | Show backdrop on mobile |
| `closeOnOutsideClick` | `boolean` | `true` | Close on outside click |
| `closeOnEscape` | `boolean` | `true` | Close on escape key |
| `ariaLabel` | `string` | `'Main navigation'` | Accessible label |
| `className` | `string` | - | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable the navbar |

### Vanilla JS Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `collapsible` | `boolean` | `true` | Whether navbar is collapsible |
| `expanded` | `boolean` | `false` | Initial expanded state |
| `position` | `string` | `'static'` | Navbar position |
| `backdrop` | `boolean` | `false` | Show backdrop overlay |
| `keyboard` | `boolean` | `true` | Enable keyboard support |
| `autoClose` | `boolean` | `true` | Auto-close on outside click |

### Data Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `data-navbar` | - | Marks element for auto-initialization |
| `data-collapsible` | `boolean` | Whether navbar is collapsible |
| `data-expanded` | `boolean` | Initial expanded state |
| `data-position` | `string` | Navbar position |
| `data-backdrop` | `boolean` | Show backdrop overlay |
| `data-auto-close` | `boolean` | Auto-close on outside click |
| `data-keyboard` | `boolean` | Enable keyboard support |

## CSS Classes

### Base Classes

- `.c-navbar` - Base navbar class
- `.c-navbar__container` - Container wrapper
- `.c-navbar__brand` - Brand/logo element
- `.c-navbar__toggler` - Mobile toggle button
- `.c-navbar__toggler-icon` - Toggle button icon
- `.c-navbar__collapse` - Collapsible content wrapper
- `.c-navbar__backdrop` - Mobile backdrop overlay

### Modifier Classes

- `.c-navbar--fixed` - Fixed to top
- `.c-navbar--fixed-bottom` - Fixed to bottom
- `.c-navbar--collapsible` - Collapsible navbar
- `.c-navbar--{variant}` - Theme variants (primary, secondary, etc.)

### State Classes

- `.is-expanded` - Expanded state
- `.is-open` - Open state (for backdrop)

## Accessibility

The Navbar component follows WCAG guidelines and includes:

- **Keyboard Navigation**: Full keyboard support with Tab, Enter, Escape, and Arrow keys
- **Screen Reader Support**: Proper ARIA attributes and labels
- **Focus Management**: Logical focus order and visible focus indicators
- **Semantic HTML**: Uses proper navigation landmarks and list structures

### ARIA Attributes

- `aria-label` - Navigation landmark label
- `aria-expanded` - Toggle button state
- `aria-controls` - Associates toggle with collapsible content
- `aria-current="page"` - Indicates current page link
- `aria-haspopup` - Indicates dropdown presence

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Migration Guide

### From v1.x to v2.x

The navbar component has been completely rewritten to follow Atomix guidelines:

1. **New Vanilla JS API**: The JavaScript API has changed significantly
2. **Updated CSS Classes**: Some class names have been updated for consistency
3. **Enhanced Accessibility**: Improved ARIA support and keyboard navigation
4. **New Props**: Additional React props for better control

See the [migration guide](./MIGRATION.md) for detailed upgrade instructions.