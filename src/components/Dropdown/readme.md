# Dropdown Component

The Dropdown component provides a toggleable menu that displays a list of actions or navigation options. It offers a space-efficient way to organize related actions and navigation links.

## Features

- Multiple trigger methods (click, hover)
- Customizable positioning
- Support for items with icons
- Headers and dividers for organizing content
- Keyboard navigation support
- ARIA attributes for accessibility
- Automatic positioning based on available space
- Responsive design

## Usage

### React Component

```jsx
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from '@atomix/components';

function App() {
  return (
    <Dropdown
      trigger="click"
      placement="bottom-start"
      children={
        <button className="c-btn c-btn--primary">
          Dropdown <i className="c-dropdown__toggle-icon icon-atomix-caret-down"></i>
        </button>
      }
      menu={
        <>
          <DropdownHeader>Options</DropdownHeader>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownDivider />
          <DropdownItem href="#logout">Logout</DropdownItem>
        </>
      }
    />
  );
}
```

### Vanilla JS

```html
<div class="c-dropdown js-atomix-dropdown" data-dropdown-trigger="click" data-dropdown-placement="bottom-start">
  <button class="c-dropdown__toggle c-btn c-btn--primary">
    Dropdown <i class="c-dropdown__toggle-icon icon-atomix-caret-down"></i>
  </button>
  <div class="c-dropdown__menu-wrapper">
    <div class="c-dropdown__menu-inner">
      <ul class="c-dropdown__menu">
        <li class="c-dropdown__header">Options</li>
        <li class="c-dropdown__menu-item">
          <button class="c-dropdown__menu-link">Profile</button>
        </li>
        <li class="c-dropdown__menu-item">
          <button class="c-dropdown__menu-link">Settings</button>
        </li>
        <li class="c-dropdown__divider"></li>
        <li class="c-dropdown__menu-item">
          <a href="#logout" class="c-dropdown__menu-link">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<script>
  // Auto-initialization
  Atomix.initDropdowns();
  
  // Manual initialization
  const dropdown = new Atomix.Dropdown(document.querySelector('.c-dropdown'), {
    placement: 'bottom-start',
    trigger: 'click',
    offset: 4,
    closeOnClickOutside: true,
    closeOnEscape: true,
    minWidth: '10rem',
    maxHeight: '20rem'
  });
  
  // API usage
  dropdown.open();
  dropdown.close();
  dropdown.toggle();
  dropdown.destroy();
</script>
```

## Props (React)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | The trigger element that will toggle the dropdown |
| `menu` | ReactNode | - | The content of the dropdown menu |
| `trigger` | 'click' \| 'hover' | 'click' | How the dropdown is triggered |
| `placement` | DropdownPlacement | 'bottom-start' | The position of the dropdown relative to the trigger |
| `defaultOpen` | boolean | false | Whether the dropdown is initially open |
| `isOpen` | boolean | - | Controlled state of the dropdown |
| `onOpenChange` | (isOpen: boolean) => void | - | Callback when the dropdown open state changes |
| `offset` | number | 4 | Offset from the trigger element (in pixels) |
| `closeOnClickOutside` | boolean | true | Whether to close the dropdown when clicking outside |
| `closeOnEscape` | boolean | true | Whether to close the dropdown when pressing escape key |
| `maxHeight` | string | - | Max height for the dropdown menu |
| `minWidth` | string | '10rem' | Min width for the dropdown menu |
| `variant` | ThemeColor | - | Color variant for the dropdown trigger |
| `id` | string | - | Optional ID for the dropdown |
| `className` | string | - | Additional CSS class for the dropdown |
| `disabled` | boolean | false | Whether the dropdown is disabled |

## DropdownItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Item content |
| `href` | string | - | URL if item is a link |
| `active` | boolean | false | Whether item is active |
| `disabled` | boolean | false | Whether item is disabled |
| `icon` | ReactNode | - | Icon to display before item text |
| `onClick` | (event) => void | - | Click handler |
| `className` | string | - | Additional CSS class for the item |

## Accessibility

The Dropdown component is built with accessibility in mind:

- Uses ARIA attributes to indicate expanded/collapsed state
- Supports keyboard navigation for menu items (Arrow Up/Down, Home, End, Enter, Space, Escape)
- Maintains sufficient color contrast in all states
- Properly associates trigger elements with their dropdown menus

## Placement Options

The `placement` prop supports the following values:

- `'top-start'` - Above the trigger, aligned with left edge
- `'top-end'` - Above the trigger, aligned with right edge
- `'bottom-start'` - Below the trigger, aligned with left edge
- `'bottom-end'` - Below the trigger, aligned with right edge
- `'left-start'` - Left of the trigger, aligned with top edge
- `'left-end'` - Left of the trigger, aligned with bottom edge
- `'right-start'` - Right of the trigger, aligned with top edge
- `'right-end'` - Right of the trigger, aligned with bottom edge

The dropdown will automatically adjust its placement if there's not enough space in the specified direction.
