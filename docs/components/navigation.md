# Navigation Components

The Navigation components provide a comprehensive set of navigation elements including Navbar, Nav, Menu, SideMenu, and Breadcrumb. These components work together to create intuitive navigation experiences for web applications.

## Overview

Navigation is crucial for user experience and site usability. The Atomix navigation components provide flexible, accessible, and responsive navigation solutions that can be customized to fit any application's needs.

## Components

### Navbar
Main site navigation with brand, menu items, and responsive behavior

### Nav
Flexible navigation lists with various alignments and variants

### Menu
Simple menu containers for dropdown and context menus

### SideMenu
Sidebar navigation with collapsible sections

### Breadcrumb
Hierarchical navigation showing the user's location

## Navbar Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brand` | `ReactNode` | `undefined` | Brand/logo component |
| `children` | `ReactNode` | `undefined` | Navigation items |
| `variant` | `ThemeColor` | `undefined` | Color scheme |
| `position` | `'static' \| 'fixed' \| 'fixed-bottom'` | `'static'` | Navbar position |
| `containerWidth` | `string` | `undefined` | Container max width |
| `collapsible` | `boolean` | `false` | Mobile collapse behavior |
| `expanded` | `boolean` | `undefined` | Controlled expansion state |
| `onToggle` | `(expanded: boolean) => void` | `undefined` | Toggle callback |
| `backdrop` | `boolean` | `false` | Show backdrop when expanded |
| `closeOnOutsideClick` | `boolean` | `true` | Close on outside click |
| `closeOnEscape` | `boolean` | `true` | Close on escape key |

### Usage

```jsx
import { Navbar, Nav, NavItem, Button } from '@shohojdhara/atomix';

function MainNavbar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      brand={
        <div className="u-flex u-items-center u-gap-2">
          <img src="/logo.svg" alt="Logo" className="u-h-8" />
          <span className="u-font-bold u-text-xl">MyApp</span>
        </div>
      }
      variant="primary"
      position="fixed"
      collapsible
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Nav alignment="start">
        <NavItem href="/" active>Home</NavItem>
        <NavItem href="/products">Products</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/contact">Contact</NavItem>
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

### Responsive Navbar

```jsx
function ResponsiveNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Navbar
      brand={<Brand />}
      collapsible
      expanded={isExpanded}
      onToggle={setIsExpanded}
      backdrop
      closeOnOutsideClick
      closeOnEscape
    >
      <Nav>
        <NavItem href="/">Home</NavItem>
        <NavItem dropdown>
          Products
          <Menu>
            <MenuItem href="/products/web">Web Apps</MenuItem>
            <MenuItem href="/products/mobile">Mobile Apps</MenuItem>
            <MenuItem href="/products/desktop">Desktop Apps</MenuItem>
          </Menu>
        </NavItem>
        <NavItem href="/pricing">Pricing</NavItem>
        <NavItem href="/support">Support</NavItem>
      </Nav>
    </Navbar>
  );
}
```

## Nav Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Navigation items |
| `alignment` | `'start' \| 'center' \| 'end'` | `'start'` | Item alignment |
| `variant` | `'default' \| 'float-top-center' \| 'float-bottom-center'` | `'default'` | Nav variant |
| `className` | `string` | `''` | Additional CSS classes |

### Usage

```jsx
function NavigationExamples() {
  return (
    <div className="u-gap-8">
      {/* Basic navigation */}
      <Nav alignment="start">
        <NavItem href="/" active>Home</NavItem>
        <NavItem href="/products">Products</NavItem>
        <NavItem href="/about">About</NavItem>
      </Nav>

      {/* Centered navigation */}
      <Nav alignment="center">
        <NavItem href="/dashboard">Dashboard</NavItem>
        <NavItem href="/analytics">Analytics</NavItem>
        <NavItem href="/settings">Settings</NavItem>
      </Nav>

      {/* Floating navigation */}
      <Nav variant="float-top-center">
        <NavItem href="#section1">Section 1</NavItem>
        <NavItem href="#section2">Section 2</NavItem>
        <NavItem href="#section3">Section 3</NavItem>
      </Nav>
    </div>
  );
}
```

## NavItem Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Item content |
| `href` | `string` | `undefined` | Link URL |
| `active` | `boolean` | `false` | Active state |
| `dropdown` | `boolean` | `false` | Has dropdown menu |
| `megaMenu` | `boolean` | `false` | Has mega menu |
| `onClick` | `() => void` | `undefined` | Click handler |
| `LinkComponent` | `React.ElementType` | `undefined` | Custom link component |

### Usage with Dropdown

```jsx
import { NavItem, NavDropdown, MenuItem } from '@shohojdhara/atomix';

function DropdownNavigation() {
  return (
    <Nav>
      <NavItem href="/">Home</NavItem>
      
      <NavDropdown title="Products" alignment="start">
        <MenuItem href="/products/web" icon={<Icon name="Globe" />}>
          Web Applications
        </MenuItem>
        <MenuItem href="/products/mobile" icon={<Icon name="DeviceMobile" />}>
          Mobile Apps
        </MenuItem>
        <MenuItem href="/products/desktop" icon={<Icon name="Desktop" />}>
          Desktop Software
        </MenuItem>
        <DropdownDivider />
        <MenuItem href="/products/enterprise">
          Enterprise Solutions
        </MenuItem>
      </NavDropdown>
      
      <NavItem href="/pricing">Pricing</NavItem>
    </Nav>
  );
}
```

## Menu Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Menu content |
| `className` | `string` | `''` | Additional CSS classes |

### MenuItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Item content |
| `href` | `string` | `undefined` | Link URL |
| `icon` | `ReactNode` | `undefined` | Item icon |
| `active` | `boolean` | `false` | Active state |
| `disabled` | `boolean` | `false` | Disabled state |
| `onClick` | `() => void` | `undefined` | Click handler |

### Usage

```jsx
function ContextMenu({ isOpen, onClose, position }) {
  return (
    <Menu className={`context-menu ${isOpen ? 'is-open' : ''}`}>
      <MenuItem icon={<Icon name="Copy" />} onClick={handleCopy}>
        Copy
      </MenuItem>
      <MenuItem icon={<Icon name="Scissors" />} onClick={handleCut}>
        Cut
      </MenuItem>
      <MenuItem icon={<Icon name="ClipboardText" />} onClick={handlePaste}>
        Paste
      </MenuItem>
      <DropdownDivider />
      <MenuItem 
        icon={<Icon name="Trash" />} 
        onClick={handleDelete}
        className="u-text-error"
      >
        Delete
      </MenuItem>
    </Menu>
  );
}
```

## SideMenu Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | `undefined` | Menu title |
| `children` | `ReactNode` | **required** | Menu content |
| `isOpen` | `boolean` | `undefined` | Open state (controlled) |
| `onToggle` | `(isOpen: boolean) => void` | `undefined` | Toggle callback |
| `collapsible` | `boolean` | `false` | Mobile collapsible |
| `toggleIcon` | `ReactNode` | `undefined` | Custom toggle icon |

### Usage

```jsx
function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SideMenu
      title="Dashboard"
      isOpen={isOpen}
      onToggle={setIsOpen}
      collapsible
    >
      <SideMenuList>
        <SideMenuItem 
          href="/dashboard" 
          icon={<Icon name="House" />}
          active
        >
          Overview
        </SideMenuItem>
        
        <SideMenuItem 
          href="/analytics" 
          icon={<Icon name="ChartBar" />}
        >
          Analytics
        </SideMenuItem>
        
        <SideMenuItem 
          href="/users" 
          icon={<Icon name="Users" />}
        >
          Users
        </SideMenuItem>
        
        <SideMenuItem 
          href="/settings" 
          icon={<Icon name="Gear" />}
        >
          Settings
        </SideMenuItem>
      </SideMenuList>
      
      <SideMenuList>
        <SideMenuItem 
          href="/help" 
          icon={<Icon name="Question" />}
        >
          Help & Support
        </SideMenuItem>
        
        <SideMenuItem 
          onClick={handleLogout}
          icon={<Icon name="SignOut" />}
        >
          Sign Out
        </SideMenuItem>
      </SideMenuList>
    </SideMenu>
  );
}
```

## Breadcrumb Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | **required** | Breadcrumb items |
| `divider` | `string` | `'/'` | Divider character |
| `ariaLabel` | `string` | `'Breadcrumb'` | Accessible label |
| `className` | `string` | `''` | Additional CSS classes |

### BreadcrumbItem Interface

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
  icon?: string;
  onClick?: (event: MouseEvent) => void;
}
```

### Usage

```jsx
function BreadcrumbExamples() {
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: 'House' },
    { label: 'Products', href: '/products' },
    { label: 'Laptops', href: '/products/laptops' },
    { label: 'MacBook Pro', active: true }
  ];

  return (
    <div className="u-gap-4">
      {/* Basic breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Custom divider */}
      <Breadcrumb items={breadcrumbItems} divider=">" />
      
      {/* With click handlers */}
      <Breadcrumb 
        items={breadcrumbItems.map(item => ({
          ...item,
          onClick: item.href ? () => navigate(item.href) : undefined
        }))}
      />
    </div>
  );
}
```

## Mega Menu

### Usage

```jsx
function MegaMenuExample() {
  return (
    <Nav>
      <NavItem href="/">Home</NavItem>
      
      <NavDropdown title="Products" megaMenu>
        <MegaMenu>
          <MegaMenuColumn title="Web Development" icon={<Icon name="Globe" />}>
            <MegaMenuLink href="/products/react">React Components</MegaMenuLink>
            <MegaMenuLink href="/products/vue">Vue Components</MegaMenuLink>
            <MegaMenuLink href="/products/angular">Angular Components</MegaMenuLink>
          </MegaMenuColumn>
          
          <MegaMenuColumn title="Mobile Development" icon={<Icon name="DeviceMobile" />}>
            <MegaMenuLink href="/products/react-native">React Native</MegaMenuLink>
            <MegaMenuLink href="/products/flutter">Flutter</MegaMenuLink>
            <MegaMenuLink href="/products/ionic">Ionic</MegaMenuLink>
          </MegaMenuColumn>
          
          <MegaMenuColumn title="Backend" icon={<Icon name="Server" />}>
            <MegaMenuLink href="/products/node">Node.js</MegaMenuLink>
            <MegaMenuLink href="/products/python">Python</MegaMenuLink>
            <MegaMenuLink href="/products/php">PHP</MegaMenuLink>
          </MegaMenuColumn>
        </MegaMenu>
      </NavDropdown>
    </Nav>
  );
}
```

## Vanilla JavaScript Usage

```javascript
// Initialize navbar
const navbar = new Atomix.Navbar('.navbar', {
  collapsible: true,
  backdrop: true,
  onToggle: (expanded) => {
    console.log('Navbar toggled:', expanded);
  }
});

// Initialize side menu
const sideMenu = new Atomix.SideMenu('.side-menu', {
  collapsible: true,
  onToggle: (isOpen) => {
    console.log('Side menu toggled:', isOpen);
  }
});

// Initialize breadcrumb
const breadcrumb = new Atomix.Breadcrumb('.breadcrumb', {
  items: [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Current Page', active: true }
  ],
  divider: '>'
});

// Initialize from data attributes
Atomix.Navigation.initFromDataAttributes();
```

## Styling

### CSS Classes

```css
/* Navbar */
.c-navbar { /* Base navbar */ }
.c-navbar--primary { /* Primary variant */ }
.c-navbar--fixed { /* Fixed position */ }
.c-navbar--expanded { /* Expanded state */ }

/* Nav */
.c-nav { /* Base nav */ }
.c-nav--center { /* Centered alignment */ }
.c-nav--float-top-center { /* Floating variant */ }

/* Nav items */
.c-nav-item { /* Nav item */ }
.c-nav-item--active { /* Active state */ }
.c-nav-item--dropdown { /* Has dropdown */ }

/* Menu */
.c-menu { /* Base menu */ }
.c-menu-item { /* Menu item */ }
.c-menu-item--active { /* Active item */ }
.c-menu-item--disabled { /* Disabled item */ }

/* Side menu */
.c-side-menu { /* Base side menu */ }
.c-side-menu--open { /* Open state */ }
.c-side-menu__toggle { /* Toggle button */ }

/* Breadcrumb */
.c-breadcrumb { /* Base breadcrumb */ }
.c-breadcrumb__item { /* Breadcrumb item */ }
.c-breadcrumb__item--active { /* Active item */ }
.c-breadcrumb__divider { /* Divider */ }
```

## Accessibility

### ARIA Attributes

- `role="navigation"` - Identifies navigation landmarks
- `aria-label` - Provides accessible labels
- `aria-expanded` - Indicates dropdown states
- `aria-current="page"` - Marks current page
- `aria-hidden` - Hides decorative elements

### Keyboard Navigation

- **Tab** - Navigate between items
- **Enter/Space** - Activate items
- **Arrow keys** - Navigate within menus
- **Escape** - Close dropdowns

### Screen Reader Support

- Navigation landmarks are properly identified
- Current page is announced
- Dropdown states are communicated
- Menu structure is preserved

## Best Practices

### Do's ✅

- Use semantic HTML elements
- Provide clear, descriptive labels
- Indicate current page/section
- Keep navigation consistent across pages
- Test with keyboard navigation

### Don'ts ❌

- Don't use too many navigation levels
- Don't rely solely on color for states
- Don't make navigation items too small
- Don't forget mobile responsiveness

## Related Components

- **Button** - Navigation actions
- **Icon** - Visual enhancement
- **Dropdown** - Menu functionality
- **Modal** - Navigation dialogs
- **Badge** - Status indicators

## Performance Considerations

- Use lazy loading for large menus
- Implement proper event delegation
- Optimize for mobile touch targets
- Consider virtualization for very long menus

## Browser Support

Navigation components support all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
