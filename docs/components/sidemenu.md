# SideMenu

The SideMenu component provides a collapsible sidebar navigation menu with support for icons, active states, and multi-level navigation. It's ideal for dashboard layouts and applications with hierarchical navigation structures.

## Overview

The SideMenu component is designed for sidebar navigation in applications. It supports collapsible behavior, icons, active states, and can be used in both controlled and uncontrolled modes. It automatically handles responsive behavior and provides smooth animations.

## Installation

The SideMenu component is included in the Atomix package. Import it in your React components:

```jsx
import { SideMenu, SideMenuList, SideMenuItem } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, side menu styles and functionality are available through CSS classes and JavaScript modules.

## Basic Usage

### React

```jsx
import { SideMenu, SideMenuList, SideMenuItem } from '@shohojdhara/atomix';

function MySideMenu() {
  return (
    <SideMenu title="Navigation">
      <SideMenuList>
        <SideMenuItem href="/" active>Home</SideMenuItem>
        <SideMenuItem href="/products">Products</SideMenuItem>
        <SideMenuItem href="/about">About</SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

### HTML/CSS

```html
<div class="c-side-menu" data-side-menu data-collapsible="true">
  <div class="c-side-menu__toggler">
    <span class="c-side-menu__title">Navigation</span>
    <span class="c-side-menu__toggler-icon">▶</span>
  </div>
  <div class="c-side-menu__wrapper">
    <div class="c-side-menu__inner">
      <ul class="c-side-menu__list">
        <li class="c-side-menu__item">
          <a href="/" class="c-side-menu__link is-active">Home</a>
        </li>
      </ul>
    </div>
  </div>
</div>
```

## API Reference

### SideMenu Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `ReactNode` | - | No | Menu title displayed at the top |
| `children` | `ReactNode` | - | Yes | Menu content (typically SideMenuList components) |
| `isOpen` | `boolean` | - | No | Whether the menu is open (controlled) |
| `onToggle` | `(isOpen: boolean) => void` | - | No | Callback when menu open state changes |
| `collapsible` | `boolean` | `true` | No | Whether the menu is collapsible on mobile |
| `toggleIcon` | `ReactNode` | - | No | Custom toggle icon |
| `id` | `string` | - | No | Menu ID (used for accessibility) |
| `glass` | `boolean \| AtomixGlassProps` | `false` | No | Enable glass morphism effect |
| `className` | `string` | `''` | No | Additional CSS classes |
| `style` | `React.CSSProperties` | - | No | Custom style object |
| `disabled` | `boolean` | `false` | No | Whether the menu is disabled |

### SideMenuItem Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | Yes | Item content |
| `href` | `string` | - | No | Link URL |
| `onClick` | `() => void` | - | No | Click handler (for button behavior) |
| `active` | `boolean` | `false` | No | Active state |
| `disabled` | `boolean` | `false` | No | Whether the item is disabled |
| `icon` | `ReactNode` | - | No | Icon element |
| `LinkComponent` | `React.ElementType` | - | No | Custom link component (e.g., React Router Link) |
| `target` | `string` | - | No | Link target attribute |
| `rel` | `string` | - | No | Link rel attribute |
| `className` | `string` | `''` | No | Additional CSS classes |

### SideMenuList Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | Yes | List items (typically SideMenuItem components) |
| `className` | `string` | `''` | No | Additional CSS classes |

## Examples

### Basic SideMenu

```jsx
function BasicSideMenu() {
  return (
    <SideMenu title="Navigation">
      <SideMenuList>
        <SideMenuItem href="/" active>Home</SideMenuItem>
        <SideMenuItem href="/products">Products</SideMenuItem>
        <SideMenuItem href="/about">About</SideMenuItem>
        <SideMenuItem href="/contact">Contact</SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

### With Icons

```jsx
import { SideMenu, SideMenuList, SideMenuItem, Icon } from '@shohojdhara/atomix';

function SideMenuWithIcons() {
  return (
    <SideMenu title="Dashboard">
      <SideMenuList>
        <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
          Home
        </SideMenuItem>
        <SideMenuItem href="/analytics" icon={<Icon name="ChartBar" size="sm" />}>
          Analytics
        </SideMenuItem>
        <SideMenuItem href="/users" icon={<Icon name="Users" size="sm" />}>
          Users
        </SideMenuItem>
        <SideMenuItem href="/settings" icon={<Icon name="Gear" size="sm" />}>
          Settings
        </SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

### Collapsible Menu

```jsx
function CollapsibleSideMenu() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SideMenu
      title="Navigation"
      isOpen={isOpen}
      onToggle={setIsOpen}
      collapsible
    >
      <SideMenuList>
        <SideMenuItem href="/" active>Home</SideMenuItem>
        <SideMenuItem href="/products">Products</SideMenuItem>
        <SideMenuItem href="/about">About</SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

### Multiple Menu Lists

```jsx
function MultipleMenuLists() {
  return (
    <SideMenu title="Dashboard">
      <SideMenuList>
        <SideMenuItem href="/dashboard" icon={<Icon name="House" />} active>
          Overview
        </SideMenuItem>
        <SideMenuItem href="/analytics" icon={<Icon name="ChartBar" />}>
          Analytics
        </SideMenuItem>
        <SideMenuItem href="/reports" icon={<Icon name="FileText" />}>
          Reports
        </SideMenuItem>
      </SideMenuList>
      
      <SideMenuList>
        <SideMenuItem href="/users" icon={<Icon name="Users" />}>
          Users
        </SideMenuItem>
        <SideMenuItem href="/roles" icon={<Icon name="Shield" />}>
          Roles
        </SideMenuItem>
      </SideMenuList>
      
      <SideMenuList>
        <SideMenuItem href="/settings" icon={<Icon name="Gear" />}>
          Settings
        </SideMenuItem>
        <SideMenuItem href="/help" icon={<Icon name="Question" />}>
          Help
        </SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

### Active States

```jsx
function ActiveStates() {
  const [activeItem, setActiveItem] = useState('home');

  return (
    <SideMenu title="Navigation">
      <SideMenuList>
        <SideMenuItem
          href="/"
          active={activeItem === 'home'}
          onClick={() => setActiveItem('home')}
        >
          Home
        </SideMenuItem>
        <SideMenuItem
          href="/products"
          active={activeItem === 'products'}
          onClick={() => setActiveItem('products')}
        >
          Products
        </SideMenuItem>
        <SideMenuItem
          href="/about"
          active={activeItem === 'about'}
          onClick={() => setActiveItem('about')}
        >
          About
        </SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

### Disabled Items

```jsx
function DisabledItems() {
  return (
    <SideMenu title="Navigation">
      <SideMenuList>
        <SideMenuItem href="/" active>Home</SideMenuItem>
        <SideMenuItem href="/products">Products</SideMenuItem>
        <SideMenuItem href="/coming-soon" disabled>
          Coming Soon
        </SideMenuItem>
        <SideMenuItem href="/about">About</SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

### With Button Actions

```jsx
function SideMenuWithActions() {
  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <SideMenu title="Dashboard">
      <SideMenuList>
        <SideMenuItem href="/dashboard" active>
          Dashboard
        </SideMenuItem>
        <SideMenuItem href="/settings">Settings</SideMenuItem>
      </SideMenuList>
      
      <SideMenuList>
        <SideMenuItem onClick={handleLogout} icon={<Icon name="SignOut" />}>
          Sign Out
        </SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

### Glass Effect

```jsx
function GlassSideMenu() {
  return (
    <SideMenu
      title="Navigation"
      glass={true}
    >
      <SideMenuList>
        <SideMenuItem href="/" active>Home</SideMenuItem>
        <SideMenuItem href="/products">Products</SideMenuItem>
        <SideMenuItem href="/about">About</SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

### With React Router

```jsx
import { Link, useLocation } from 'react-router-dom';

function SideMenuWithRouter() {
  const location = useLocation();

  return (
    <SideMenu title="Navigation">
      <SideMenuList>
        <SideMenuItem
          href="/"
          active={location.pathname === '/'}
          LinkComponent={Link}
        >
          Home
        </SideMenuItem>
        <SideMenuItem
          href="/products"
          active={location.pathname === '/products'}
          LinkComponent={Link}
        >
          Products
        </SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

## Accessibility

The SideMenu component follows WCAG accessibility guidelines:

### Keyboard Support

- **Tab**: Moves focus between menu items
- **Shift + Tab**: Moves focus backwards
- **Enter/Space**: Activates links/buttons
- **Escape**: Closes menu (when collapsible)
- **Arrow Keys**: Navigate within menu (where applicable)

### ARIA Attributes

- `aria-expanded` - Indicates menu open/closed state
- `aria-controls` - Links toggle button to menu content
- `aria-current="page"` - Marks current page (on active items)
- `aria-disabled` - Indicates disabled state

### Best Practices

1. **Provide clear titles**: Use descriptive menu titles
   ```jsx
   <SideMenu title="Main Navigation" />
   ```

2. **Indicate active page**: Use `active` prop on current page
   ```jsx
   <SideMenuItem href="/" active>Home</SideMenuItem>
   ```

3. **Use icons consistently**: Icons help users quickly identify menu items
   ```jsx
   <SideMenuItem href="/settings" icon={<Icon name="Gear" />}>
     Settings
   </SideMenuItem>
   ```

4. **Handle disabled states**: Disable items that aren't available
   ```jsx
   <SideMenuItem href="/coming-soon" disabled>
     Coming Soon
   </SideMenuItem>
   ```

## Styling

### CSS Custom Properties

The SideMenu component uses CSS custom properties for theming:

```css
:root {
  --atomix-side-menu-width: 16rem;
  --atomix-side-menu-collapsed-width: 3rem;
  --atomix-side-menu-bg: var(--atomix-white);
  --atomix-side-menu-border-color: var(--atomix-border-color);
  --atomix-side-menu-item-padding-x: 1rem;
  --atomix-side-menu-item-padding-y: 0.75rem;
  --atomix-side-menu-item-active-bg: var(--atomix-primary-light);
  --atomix-side-menu-item-active-color: var(--atomix-primary);
}
```

### CSS Classes

The component uses BEM methodology:

```css
.c-side-menu { /* Base side menu class */ }
.c-side-menu__toggler { /* Toggle button */ }
.c-side-menu__title { /* Menu title */ }
.c-side-menu__wrapper { /* Content wrapper */ }
.c-side-menu__inner { /* Inner content */ }
.c-side-menu__list { /* Menu list */ }
.c-side-menu__item { /* Menu item */ }
.c-side-menu__link { /* Menu link */ }
.c-side-menu__link--active { /* Active state */ }
.c-side-menu__link--disabled { /* Disabled state */ }
```

## Integration Patterns

### Dashboard Layout

```jsx
function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <SideMenu title="Dashboard">
        <SideMenuList>
          <SideMenuItem href="/dashboard" icon={<Icon name="House" />} active>
            Overview
          </SideMenuItem>
          <SideMenuItem href="/analytics" icon={<Icon name="ChartBar" />}>
            Analytics
          </SideMenuItem>
          <SideMenuItem href="/users" icon={<Icon name="Users" />}>
            Users
          </SideMenuItem>
        </SideMenuList>
      </SideMenu>
      <main className="dashboard-content">
        {/* Main content */}
      </main>
    </div>
  );
}
```

### With Navbar

```jsx
function LayoutWithNavbar() {
  return (
    <>
      <Navbar brand="My App">
        <Nav>
          <NavItem href="/">Home</NavItem>
        </Nav>
      </Navbar>
      <div className="layout-container">
        <SideMenu title="Navigation">
          <SideMenuList>
            <SideMenuItem href="/dashboard">Dashboard</SideMenuItem>
            <SideMenuItem href="/settings">Settings</SideMenuItem>
          </SideMenuList>
        </SideMenu>
        <main>
          {/* Content */}
        </main>
      </div>
    </>
  );
}
```

## Common Patterns

### E-commerce Admin

```jsx
function EcommerceAdminMenu() {
  return (
    <SideMenu title="Admin Panel">
      <SideMenuList>
        <SideMenuItem href="/admin/dashboard" icon={<Icon name="House" />} active>
          Dashboard
        </SideMenuItem>
        <SideMenuItem href="/admin/products" icon={<Icon name="Package" />}>
          Products
        </SideMenuItem>
        <SideMenuItem href="/admin/orders" icon={<Icon name="ShoppingCart" />}>
          Orders
        </SideMenuItem>
        <SideMenuItem href="/admin/customers" icon={<Icon name="Users" />}>
          Customers
        </SideMenuItem>
      </SideMenuList>
      <SideMenuList>
        <SideMenuItem href="/admin/settings" icon={<Icon name="Gear" />}>
          Settings
        </SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

### Content Management

```jsx
function ContentManagementMenu() {
  return (
    <SideMenu title="Content">
      <SideMenuList>
        <SideMenuItem href="/content/posts" icon={<Icon name="FileText" />}>
          Posts
        </SideMenuItem>
        <SideMenuItem href="/content/pages" icon={<Icon name="Files" />}>
          Pages
        </SideMenuItem>
        <SideMenuItem href="/content/media" icon={<Icon name="Image" />}>
          Media
        </SideMenuItem>
        <SideMenuItem href="/content/comments" icon={<Icon name="ChatCircle" />}>
          Comments
        </SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

## Browser Support

The SideMenu component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[Navbar](./navbar.md)** - Main navigation bar
- **[Nav](./nav.md)** - Horizontal navigation
- **[Breadcrumb](./breadcrumb.md)** - Breadcrumb navigation
- **[Icon](./icon.md)** - Icons for menu items
- **[Button](./button.md)** - Action buttons

## Migration Guide

### From Custom Sidebar

```jsx
// Before (custom sidebar)
<div className="sidebar">
  <h3>Navigation</h3>
  <ul>
    <li><a href="/" className="active">Home</a></li>
    <li><a href="/products">Products</a></li>
  </ul>
</div>

// After (Atomix)
<SideMenu title="Navigation">
  <SideMenuList>
    <SideMenuItem href="/" active>Home</SideMenuItem>
    <SideMenuItem href="/products">Products</SideMenuItem>
  </SideMenuList>
</SideMenu>
```

