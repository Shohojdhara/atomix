# SideMenu Component

The SideMenu component provides a collapsible navigation menu with title and menu items. It automatically collapses on mobile devices and can be toggled via a header button. The component follows the Atomix design system guidelines and includes both React and vanilla JavaScript implementations.

## Features

- **Responsive Design**: Automatically collapses on mobile devices
- **Collapsible**: Can be toggled open/closed with smooth animations
- **Accessibility**: Full keyboard navigation and screen reader support
- **Active States**: Support for active menu items
- **Icon Support**: Menu items can include Phosphor icons via the Atomix Icon component
- **Vanilla JS Support**: Complete vanilla JavaScript implementation available

## React Usage

### Basic SideMenu

```tsx
import { SideMenu, SideMenuList, SideMenuItem } from '@atomix/components';

<SideMenu title="Navigation">
  <SideMenuList>
    <SideMenuItem href="/" active>Home</SideMenuItem>
    <SideMenuItem href="/about">About</SideMenuItem>
    <SideMenuItem href="/contact">Contact</SideMenuItem>
  </SideMenuList>
</SideMenu>
```

### With Icons

```tsx
import { SideMenu, SideMenuList, SideMenuItem, Icon } from '@atomix/components';

<SideMenu title="Main Menu">
  <SideMenuList>
    <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
      Home
    </SideMenuItem>
    <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
      About
    </SideMenuItem>
    <SideMenuItem href="/settings" icon={<Icon name="Gear" size="sm" />}>
      Settings
    </SideMenuItem>
  </SideMenuList>
</SideMenu>
```

### Multiple Menu Lists

```tsx
<SideMenu title="Dashboard">
  <SideMenuList>
    <SideMenuItem href="/dashboard" icon={<Icon name="ChartBar" size="sm" />} active>
      Dashboard
    </SideMenuItem>
    <SideMenuItem href="/analytics" icon={<Icon name="TrendUp" size="sm" />}>
      Analytics
    </SideMenuItem>
  </SideMenuList>
  
  <SideMenuList>
    <SideMenuItem href="/users" icon={<Icon name="Users" size="sm" />}>
      Users
    </SideMenuItem>
    <SideMenuItem href="/settings" icon={<Icon name="Gear" size="sm" />}>
      Settings
    </SideMenuItem>
  </SideMenuList>
</SideMenu>
```

### Button Items (No Navigation)

```tsx
<SideMenu title="Actions">
  <SideMenuList>
    <SideMenuItem onClick={() => handleCreate()} icon={<Icon name="Plus" size="sm" />}>
      Create New
    </SideMenuItem>
    <SideMenuItem onClick={() => handleExport()} icon={<Icon name="Export" size="sm" />}>
      Export Data
    </SideMenuItem>
    <SideMenuItem onClick={() => handleSettings()} icon={<Icon name="Gear" size="sm" />}>
      Settings
    </SideMenuItem>
  </SideMenuList>
</SideMenu>
```

### Controlled SideMenu

```tsx
import { useState } from 'react';
import { SideMenu, SideMenuList, SideMenuItem, Icon } from '@atomix/components';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SideMenu 
      title="Controlled Menu" 
      isOpen={isOpen} 
      onToggle={setIsOpen}
    >
      <SideMenuList>
        <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
          Home
        </SideMenuItem>
        <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
          About
        </SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

### Custom Toggle Icon

```tsx
<SideMenu 
  title="Custom Menu" 
  toggleIcon={<Icon name="CaretDown" size="xs" />}
>
  <SideMenuList>
    <SideMenuItem href="/dashboard" active>Dashboard</SideMenuItem>
    <SideMenuItem href="/profile">Profile</SideMenuItem>
    <SideMenuItem href="/settings">Settings</SideMenuItem>
  </SideMenuList>
</SideMenu>
```

### Non-Collapsible Menu

```tsx
<SideMenu title="Quick Links" collapsible={false}>
  <SideMenuList>
    <SideMenuItem href="/dashboard" icon={<Icon name="ChartBar" size="sm" />} active>
      Dashboard
    </SideMenuItem>
    <SideMenuItem href="/profile" icon={<Icon name="User" size="sm" />}>
      Profile
    </SideMenuItem>
    <SideMenuItem href="/settings" icon={<Icon name="Gear" size="sm" />}>
      Settings
    </SideMenuItem>
  </SideMenuList>
</SideMenu>
```

## Vanilla JavaScript Usage

### HTML Structure

```html
<div class="c-side-menu" data-side-menu data-collapsible="true" data-auto-open="true">
  <!-- Toggler (shown on mobile) -->
  <div class="c-side-menu__toggler">
    <span class="c-side-menu__title">Navigation</span>
    <span class="c-side-menu__toggler-icon">
      <svg class="c-icon" width="16" height="16" viewBox="0 0 256 256">
        <!-- Phosphor CaretRight icon SVG content -->
      </svg>
    </span>
  </div>
  
  <!-- Collapsible Content -->
  <div class="c-side-menu__wrapper">
    <div class="c-side-menu__inner">
      <!-- Menu Lists -->
      <ul class="c-side-menu__list">
        <li class="c-side-menu__item">
          <a href="/" class="c-side-menu__link is-active">
            <span class="c-side-menu__link-icon">
              <svg class="c-icon" width="20" height="20" viewBox="0 0 256 256">
                <!-- Phosphor House icon SVG content -->
              </svg>
            </span>
            <span class="c-side-menu__link-text">Home</span>
          </a>
        </li>
        <li class="c-side-menu__item">
          <a href="/about" class="c-side-menu__link">
            <span class="c-side-menu__link-icon">
              <svg class="c-icon" width="20" height="20" viewBox="0 0 256 256">
                <!-- Phosphor Info icon SVG content -->
              </svg>
            </span>
            <span class="c-side-menu__link-text">About</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
```

### JavaScript Initialization

#### Automatic Initialization (Recommended)

The side menu will automatically initialize when the DOM is ready if you include the bundle:

```html
<script src="path/to/atomix-sidemenu.js"></script>
```

#### Manual Initialization

```javascript
// Initialize all side menus with data attributes
const sideMenus = Atomix.SideMenu.init();

// Initialize a specific side menu
const sideMenu = new Atomix.SideMenu.SideMenu('.my-side-menu', {
  collapsible: true,
  autoOpen: true,
  keyboard: true
});

// Or using the create helper
const sideMenu = Atomix.SideMenu.create('.my-side-menu', {
  collapsible: true,
  autoOpen: true
});
```

#### Programmatic Control

```javascript
// Get side menu instance
const sideMenu = Atomix.SideMenu.get('.my-side-menu');

// Control the side menu
sideMenu.open();
sideMenu.close();
sideMenu.toggle();

// Check state
console.log(sideMenu.isOpened()); // true/false

// Set active menu item
sideMenu.setActiveItem('[href="/about"]');

// Update options
sideMenu.updateOptions({ autoOpen: false });

// Clean up
sideMenu.destroy();
```

#### Event Handling

```javascript
// Listen for side menu events
document.querySelector('.c-side-menu').addEventListener('sidemenu:opened', (event) => {
  console.log('Side menu opened', event.detail);
});

document.querySelector('.c-side-menu').addEventListener('sidemenu:closed', (event) => {
  console.log('Side menu closed', event.detail);
});
```

#### Utility Functions

```javascript
// Set active item by href across all side menus
Atomix.SideMenu.setActiveByHref('/dashboard');

// Set active item by text content
Atomix.SideMenu.setActiveByText('Dashboard');

// Auto-set active based on current URL
Atomix.SideMenu.autoSetActiveFromURL();

// Control all side menus
Atomix.SideMenu.openAll();
Atomix.SideMenu.closeAll();
Atomix.SideMenu.toggleAll();

// Get all instances
const allSideMenus = Atomix.SideMenu.getAllInstances();
```

## Configuration Options

### React Props

#### SideMenu Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | - | Menu title displayed at the top |
| `children` | `ReactNode` | - | Menu content (typically SideMenuList components) |
| `isOpen` | `boolean` | - | Whether the menu is open (for controlled component) |
| `onToggle` | `(isOpen: boolean) => void` | - | Callback when menu open state changes |
| `collapsible` | `boolean` | `true` | Whether the menu is collapsible on mobile |
| `toggleIcon` | `ReactNode` | `<Icon name="CaretRight" size="xs" />` | Custom toggle icon |
| `className` | `string` | - | Additional CSS classes |
| `disabled` | `boolean` | `false` | Whether the menu is disabled |
| `id` | `string` | - | ID for the menu (used for accessibility) |

#### SideMenuList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | List items (typically SideMenuItem components) |
| `className` | `string` | - | Additional CSS classes |

#### SideMenuItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Item content |
| `href` | `string` | - | Item href (renders as link) |
| `onClick` | `(event: React.MouseEvent) => void` | - | Item click handler (renders as button if no href) |
| `active` | `boolean` | `false` | Whether this item is active/current |
| `icon` | `ReactNode` | - | Optional icon for the item (use Icon component) |
| `target` | `string` | - | Link target attribute |
| `rel` | `string` | - | Link rel attribute |
| `className` | `string` | - | Additional CSS classes |
| `disabled` | `boolean` | `false` | Whether the item is disabled |

### Vanilla JS Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `collapsible` | `boolean` | `true` | Whether side menu is collapsible |
| `open` | `boolean` | `false` | Initial open state |
| `title` | `string` | `''` | Menu title |
| `toggleIcon` | `string` | `'▶'` | Toggle icon character (use SVG for icons) |
| `keyboard` | `boolean` | `true` | Enable keyboard support |
| `autoOpen` | `boolean` | `true` | Auto-open on desktop |

### Data Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `data-side-menu` | - | Marks element for auto-initialization |
| `data-collapsible` | `boolean` | Whether side menu is collapsible |
| `data-open` | `boolean` | Initial open state |
| `data-title` | `string` | Menu title |
| `data-keyboard` | `boolean` | Enable keyboard support |
| `data-auto-open` | `boolean` | Auto-open on desktop |

## Available Icons

The SideMenu component uses the Atomix Icon component, which provides access to all Phosphor Icons. Here are some commonly used icons for navigation:

### Navigation Icons
- `House` - Home/Dashboard
- `User` - Profile/Account
- `Gear` - Settings
- `Info` - About/Information
- `Envelope` - Contact/Messages
- `Question` - Help/Support

### Action Icons
- `Plus` - Add/Create
- `Export` - Export/Download
- `Upload` - Upload/Import
- `SignOut` - Logout
- `Bell` - Notifications

### Content Icons
- `Article` - Articles/Blog
- `Image` - Media/Gallery
- `FileText` - Documents/Reports
- `ChartBar` - Analytics/Charts
- `Users` - User Management

### E-commerce Icons
- `ShoppingCart` - Shopping Cart
- `Package` - Orders/Products
- `Heart` - Wishlist/Favorites
- `CreditCard` - Payment/Billing

For a complete list of available icons, see the [Phosphor Icons documentation](https://phosphoricons.com/).

## CSS Classes

### Base Classes

- `.c-side-menu` - Base side menu class
- `.c-side-menu__wrapper` - Collapsible content wrapper
- `.c-side-menu__inner` - Inner content container
- `.c-side-menu__title` - Menu title element
- `.c-side-menu__toggler` - Mobile toggle button
- `.c-side-menu__toggler-icon` - Toggle button icon
- `.c-side-menu__list` - Menu list container
- `.c-side-menu__item` - Menu item wrapper
- `.c-side-menu__link` - Menu item link/button
- `.c-side-menu__link-icon` - Menu item icon
- `.c-side-menu__link-text` - Menu item text

### State Classes

- `.is-open` - Open state
- `.is-active` - Active menu item
- `.is-disabled` - Disabled state

## Accessibility

The SideMenu component follows WCAG guidelines and includes:

- **Keyboard Navigation**: Full keyboard support with Tab, Enter, and Space keys
- **Screen Reader Support**: Proper ARIA attributes and labels
- **Focus Management**: Logical focus order and visible focus indicators
- **Semantic HTML**: Uses proper navigation landmarks and list structures

### ARIA Attributes

- `aria-expanded` - Toggle button state
- `aria-controls` - Associates toggle with collapsible content
- `aria-hidden` - Hides collapsed content from screen readers
- `aria-current="page"` - Indicates current page link
- `aria-disabled` - Indicates disabled state

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## Examples

### E-commerce Navigation

```tsx
<SideMenu title="Shop Categories">
  <SideMenuList>
    <SideMenuItem href="/electronics" icon={<Icon name="DeviceMobile" size="sm" />} active>
      Electronics
    </SideMenuItem>
    <SideMenuItem href="/clothing" icon={<Icon name="TShirt" size="sm" />}>
      Clothing
    </SideMenuItem>
    <SideMenuItem href="/home-garden" icon={<Icon name="House" size="sm" />}>
      Home & Garden
    </SideMenuItem>
  </SideMenuList>
  
  <SideMenuList>
    <SideMenuItem href="/account" icon={<Icon name="User" size="sm" />}>
      My Account
    </SideMenuItem>
    <SideMenuItem href="/orders" icon={<Icon name="Package" size="sm" />}>
      Order History
    </SideMenuItem>
    <SideMenuItem href="/wishlist" icon={<Icon name="Heart" size="sm" />}>
      Wishlist
    </SideMenuItem>
  </SideMenuList>
</SideMenu>
```

### Admin Dashboard

```tsx
<SideMenu title="Admin Panel">
  <SideMenuList>
    <SideMenuItem href="/dashboard" icon={<Icon name="ChartBar" size="sm" />} active>
      Dashboard
    </SideMenuItem>
  </SideMenuList>
  
  <SideMenuList>
    <SideMenuItem href="/users" icon={<Icon name="Users" size="sm" />}>
      User Management
    </SideMenuItem>
    <SideMenuItem href="/content" icon={<Icon name="Article" size="sm" />}>
      Content Management
    </SideMenuItem>
    <SideMenuItem href="/analytics" icon={<Icon name="TrendUp" size="sm" />}>
      Analytics
    </SideMenuItem>
  </SideMenuList>
  
  <SideMenuList>
    <SideMenuItem href="/settings" icon={<Icon name="Gear" size="sm" />}>
      Settings
    </SideMenuItem>
    <SideMenuItem onClick={handleLogout} icon={<Icon name="SignOut" size="sm" />}>
      Logout
    </SideMenuItem>
  </SideMenuList>
</SideMenu>
```