# Dropdown Component

The Dropdown component provides a flexible menu system that can be triggered by various interactions. It supports different placements, trigger methods, and can contain any type of content including menu items, forms, or custom components.

## Overview

Dropdowns are essential for creating space-efficient interfaces by hiding secondary actions or options until needed. The Atomix Dropdown component provides a robust foundation for context menus, action menus, select alternatives, and more complex interactive overlays.

## Props API

### DropdownProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Dropdown trigger element |
| `menu` | `ReactNode` | **required** | Dropdown menu content |
| `trigger` | `'click' \| 'hover'` | `'click'` | How the dropdown is triggered |
| `placement` | `DropdownPlacement` | `'bottom-start'` | Menu placement relative to trigger |
| `defaultOpen` | `boolean` | `false` | Initially open state |
| `isOpen` | `boolean` | `undefined` | Controlled open state |
| `onOpenChange` | `(isOpen: boolean) => void` | `undefined` | Open state change callback |
| `offset` | `number` | `8` | Distance from trigger (pixels) |
| `closeOnClickOutside` | `boolean` | `true` | Close when clicking outside |
| `closeOnEscape` | `boolean` | `true` | Close when pressing escape |
| `maxHeight` | `string` | `undefined` | Max height for menu |
| `minWidth` | `string \| number` | `undefined` | Min width for menu |
| `variant` | `ThemeColor` | `undefined` | Color variant for trigger |
| `disabled` | `boolean` | `false` | Disable dropdown |
| `className` | `string` | `''` | Additional CSS classes |

### Placement Options

- `bottom-start` - Below trigger, aligned to start
- `bottom-end` - Below trigger, aligned to end  
- `top-start` - Above trigger, aligned to start
- `top-end` - Above trigger, aligned to end
- `left-start` - Left of trigger, aligned to start
- `left-end` - Left of trigger, aligned to end
- `right-start` - Right of trigger, aligned to start
- `right-end` - Right of trigger, aligned to end

## Usage Examples

### Basic Dropdown

```jsx
import React from 'react';
import { Dropdown, Button, MenuItem, DropdownDivider } from '@shohojdhara/atomix';

function BasicDropdown() {
  return (
    <Dropdown
      trigger="click"
      placement="bottom-start"
      menu={
        <div>
          <MenuItem icon={<Icon name="User" />}>
            Profile
          </MenuItem>
          <MenuItem icon={<Icon name="Gear" />}>
            Settings
          </MenuItem>
          <DropdownDivider />
          <MenuItem icon={<Icon name="SignOut" />}>
            Sign Out
          </MenuItem>
        </div>
      }
    >
      <Button label="Account" variant="secondary" />
    </Dropdown>
  );
}
```

### Action Menu

```jsx
function ActionMenu({ item, onEdit, onDelete, onDuplicate }) {
  return (
    <Dropdown
      trigger="click"
      placement="bottom-end"
      menu={
        <div>
          <MenuItem 
            icon={<Icon name="PencilSimple" />}
            onClick={() => onEdit(item)}
          >
            Edit
          </MenuItem>
          <MenuItem 
            icon={<Icon name="Copy" />}
            onClick={() => onDuplicate(item)}
          >
            Duplicate
          </MenuItem>
          <DropdownDivider />
          <MenuItem 
            icon={<Icon name="Trash" />}
            onClick={() => onDelete(item)}
            className="u-text-error"
          >
            Delete
          </MenuItem>
        </div>
      }
    >
      <Button 
        icon={<Icon name="DotsThreeVertical" />}
        iconOnly
        variant="link"
        aria-label="More actions"
      />
    </Dropdown>
  );
}
```

### Hover Dropdown

```jsx
function HoverDropdown() {
  return (
    <Dropdown
      trigger="hover"
      placement="bottom-start"
      menu={
        <div className="u-p-4 u-max-w-xs">
          <h4 className="u-fw-semibold u-mb-2">Quick Info</h4>
          <p className="u-fs-sm u-text-secondary">
            This content appears when you hover over the trigger.
          </p>
        </div>
      }
    >
      <Button label="Hover me" variant="link" />
    </Dropdown>
  );
}
```

### Controlled Dropdown

```jsx
function ControlledDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const handleSelect = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      menu={
        <div>
          {options.map(option => (
            <MenuItem
              key={option.value}
              active={selectedOption === option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </div>
      }
    >
      <Button 
        label={selectedOption || 'Select option'}
        icon={<Icon name="CaretDown" />}
      />
    </Dropdown>
  );
}
```

### Dropdown with Form

```jsx
function FormDropdown() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Dropdown
      trigger="click"
      placement="bottom-start"
      closeOnClickOutside={false}
      menu={
        <div className="u-p-4 u-min-w-80">
          <h4 className="u-fw-semibold u-mb-3">Quick Contact</h4>
          <form onSubmit={handleSubmit} className="u-gap-3">
            <FormGroup label="Name">
              <Input 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({
                  ...prev, 
                  name: e.target.value
                }))}
                placeholder="Your name"
              />
            </FormGroup>
            <FormGroup label="Email">
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev, 
                  email: e.target.value
                }))}
                placeholder="your@email.com"
              />
            </FormGroup>
            <div className="u-d-flex u-gap-2">
              <Button type="submit" label="Submit" variant="primary" size="sm" />
              <Button type="button" label="Cancel" variant="secondary" size="sm" />
            </div>
          </form>
        </div>
      }
    >
      <Button label="Contact Form" variant="outline-primary" />
    </Dropdown>
  );
}
```

### Multi-level Dropdown

```jsx
function MultiLevelDropdown() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  return (
    <Dropdown
      trigger="click"
      menu={
        <div>
          <MenuItem icon={<Icon name="House" />}>
            Dashboard
          </MenuItem>
          
          <MenuItem 
            icon={<Icon name="ChartBar" />}
            onMouseEnter={() => setActiveSubmenu('analytics')}
            className="u-position-relative"
          >
            Analytics
            <Icon name="CaretRight" className="u-ms-auto" />
            {activeSubmenu === 'analytics' && (
              <div className="u-position-absolute u-start-full u-top-0 u-ms-1 u-bg-white u-border u-rounded u-shadow-lg">
                <MenuItem>Traffic</MenuItem>
                <MenuItem>Conversions</MenuItem>
                <MenuItem>Revenue</MenuItem>
              </div>
            )}
          </MenuItem>
          
          <MenuItem icon={<Icon name="Users" />}>
            Users
          </MenuItem>
        </div>
      }
    >
      <Button label="Menu" variant="primary" />
    </Dropdown>
  );
}
```

## MenuItem Component

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Item content |
| `href` | `string` | `undefined` | Link URL |
| `active` | `boolean` | `false` | Active state |
| `disabled` | `boolean` | `false` | Disabled state |
| `icon` | `ReactNode` | `undefined` | Item icon |
| `onClick` | `(event: MouseEvent) => void` | `undefined` | Click handler |
| `LinkComponent` | `React.ElementType` | `undefined` | Custom link component |
| `className` | `string` | `''` | Additional CSS classes |

### Usage

```jsx
// Basic menu item
<MenuItem>Simple Item</MenuItem>

// With icon
<MenuItem icon={<Icon name="User" />}>
  Profile
</MenuItem>

// As link
<MenuItem href="/profile" icon={<Icon name="User" />}>
  View Profile
</MenuItem>

// With click handler
<MenuItem 
  icon={<Icon name="Trash" />}
  onClick={handleDelete}
  className="u-text-error"
>
  Delete
</MenuItem>

// Disabled item
<MenuItem disabled>
  Coming Soon
</MenuItem>

// Active item
<MenuItem active icon={<Icon name="House" />}>
  Current Page
</MenuItem>
```

## DropdownDivider Component

```jsx
// Simple divider
<DropdownDivider />

// With custom styling
<DropdownDivider className="u-my-2" />
```

## DropdownHeader Component

```jsx
// Section header
<DropdownHeader>Account Settings</DropdownHeader>

// With custom styling
<DropdownHeader className="u-text-primary u-fw-bold">
  Quick Actions
</DropdownHeader>
```

## Vanilla JavaScript Usage

```javascript
// Basic dropdown
const dropdown = new Atomix.Dropdown('.my-dropdown', {
  trigger: 'click',
  placement: 'bottom-start',
  onOpenChange: (isOpen) => {
    console.log('Dropdown state:', isOpen);
  }
});

// Open/close programmatically
dropdown.open();
dropdown.close();
dropdown.toggle();

// Initialize from data attributes
Atomix.Dropdown.initFromDataAttributes();
```

### HTML with Data Attributes

```html
<!-- Dropdown trigger -->
<div class="c-dropdown" data-atomix="dropdown" data-trigger="click">
  <button class="c-button c-dropdown__trigger">
    Account
  </button>
  
  <div class="c-dropdown__menu">
    <div class="c-menu">
      <a href="/profile" class="c-menu-item">
        <i class="ph ph-user"></i>
        Profile
      </a>
      <button class="c-menu-item">
        <i class="ph ph-gear"></i>
        Settings
      </button>
      <div class="c-dropdown__divider"></div>
      <button class="c-menu-item text-error">
        <i class="ph ph-sign-out"></i>
        Sign Out
      </button>
    </div>
  </div>
</div>
```

## Styling

### CSS Classes

```css
/* Base dropdown */
.c-dropdown {
  /* Dropdown container */
}

/* Trigger */
.c-dropdown__trigger {
  /* Trigger element */
}

/* Menu */
.c-dropdown__menu {
  /* Menu container */
}

/* State modifiers */
.c-dropdown--open { /* Open state */ }
.c-dropdown--disabled { /* Disabled state */ }

/* Placement modifiers */
.c-dropdown--bottom-start { /* Bottom start placement */ }
.c-dropdown--top-end { /* Top end placement */ }

/* Menu items */
.c-menu-item {
  /* Base menu item */
}

.c-menu-item--active { /* Active item */ }
.c-menu-item--disabled { /* Disabled item */ }

/* Divider */
.c-dropdown__divider {
  /* Menu divider */
}

/* Header */
.c-dropdown__header {
  /* Menu header */
}
```

### Custom Styling

```css
/* Custom dropdown variant */
.c-dropdown--custom .c-dropdown__menu {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Animated entrance */
.c-dropdown__menu {
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.2s ease;
}

.c-dropdown--open .c-dropdown__menu {
  opacity: 1;
  transform: translateY(0);
}

/* Custom menu item hover */
.c-menu-item:hover {
  background-color: var(--color-primary-50);
  color: var(--color-primary);
}
```

## Accessibility

### ARIA Attributes

- `role="menu"` - Identifies dropdown menu
- `aria-expanded` - Indicates open/closed state
- `aria-haspopup="menu"` - Indicates trigger has popup
- `aria-labelledby` - Links menu to trigger
- `role="menuitem"` - Identifies menu items

### Keyboard Navigation

- **Enter/Space** - Open dropdown and activate items
- **Escape** - Close dropdown
- **Arrow keys** - Navigate between menu items
- **Tab** - Move focus out of dropdown

### Screen Reader Support

- Dropdown state is announced
- Menu items are properly identified
- Keyboard navigation is fully supported
- Focus management is handled automatically

## Best Practices

### Do's ✅

- Use clear, descriptive labels for menu items
- Group related items with dividers
- Provide keyboard navigation
- Use appropriate icons for visual clarity
- Handle loading states in menu content

```jsx
// Good: Clear structure and accessibility
<Dropdown
  menu={
    <div>
      <DropdownHeader>Account</DropdownHeader>
      <MenuItem icon={<Icon name="User" />} href="/profile">
        View Profile
      </MenuItem>
      <MenuItem icon={<Icon name="Gear" />} href="/settings">
        Settings
      </MenuItem>
      <DropdownDivider />
      <MenuItem icon={<Icon name="SignOut" />} onClick={handleLogout}>
        Sign Out
      </MenuItem>
    </div>
  }
>
  <Button label="Account Menu" aria-label="Open account menu" />
</Dropdown>
```

### Don'ts ❌

- Don't put too many items in a single menu
- Don't use dropdowns for primary navigation
- Don't forget to handle mobile interactions
- Don't make menu items too small for touch

```jsx
// Bad: Too many items, unclear structure
<Dropdown
  menu={
    <div>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
      {/* ... 20 more items ... */}
    </div>
  }
>
  <Button label="Menu" />
</Dropdown>
```

## Common Patterns

### User Account Menu

```jsx
function UserAccountMenu({ user }) {
  return (
    <Dropdown
      trigger="click"
      placement="bottom-end"
      menu={
        <div>
          <div className="u-px-4 u-py-3 u-border-b">
            <div className="u-d-flex u-align-items-center u-gap-3">
              <Avatar src={user.avatar} size="sm" circle />
              <div>
                <div className="u-fw-medium">{user.name}</div>
                <div className="u-fs-sm u-text-secondary">{user.email}</div>
              </div>
            </div>
          </div>
          
          <MenuItem icon={<Icon name="User" />} href="/profile">
            Profile
          </MenuItem>
          <MenuItem icon={<Icon name="Gear" />} href="/settings">
            Settings
          </MenuItem>
          <MenuItem icon={<Icon name="CreditCard" />} href="/billing">
            Billing
          </MenuItem>
          
          <DropdownDivider />
          
          <MenuItem icon={<Icon name="Question" />} href="/help">
            Help & Support
          </MenuItem>
          <MenuItem icon={<Icon name="SignOut" />} onClick={handleLogout}>
            Sign Out
          </MenuItem>
        </div>
      }
    >
      <Avatar src={user.avatar} circle className="u-cursor-pointer" />
    </Dropdown>
  );
}
```

### Filter Dropdown

```jsx
function FilterDropdown({ filters, onFilterChange }) {
  return (
    <Dropdown
      trigger="click"
      menu={
        <div className="u-p-4 u-min-w-64">
          <h4 className="u-fw-semibold u-mb-3">Filters</h4>
          
          <FormGroup label="Status">
            <Select 
              options={[
                { value: 'all', label: 'All' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ]}
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
            />
          </FormGroup>
          
          <FormGroup label="Date Range">
            <DatePicker 
              value={filters.dateRange}
              onChange={(date) => onFilterChange('dateRange', date)}
            />
          </FormGroup>
          
          <div className="u-d-flex u-gap-2 u-mt-4">
            <Button label="Apply" variant="primary" size="sm" />
            <Button label="Reset" variant="secondary" size="sm" />
          </div>
        </div>
      }
    >
      <Button 
        label="Filters" 
        icon={<Icon name="FunnelSimple" />}
        variant="outline-primary"
      />
    </Dropdown>
  );
}
```

## Related Components

- **Button** - Dropdown triggers
- **Menu** - Menu containers and items
- **Popover** - Alternative overlay component
- **Modal** - For more complex interactions
- **Tooltip** - For simple hover information

## Performance Considerations

- Use lazy loading for complex menu content
- Implement virtualization for very long menus
- Debounce hover triggers to prevent flickering
- Consider using React.memo for menu items

```jsx
// Lazy loading menu content
const LazyMenuContent = React.lazy(() => import('./MenuContent'));

function LazyDropdown() {
  return (
    <Dropdown
      menu={
        <Suspense fallback={<Spinner size="sm" />}>
          <LazyMenuContent />
        </Suspense>
      }
    >
      <Button label="Advanced Menu" />
    </Dropdown>
  );
}
```

## Browser Support

The Dropdown component supports all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Positioning and focus management work across all supported browsers.
