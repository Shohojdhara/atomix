import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { SideMenu } from './SideMenu';
import { SideMenuList } from './SideMenuList';
import { SideMenuItem } from './SideMenuItem';
import { Icon } from '../../Icon';

const meta = {
  title: 'Components/Navigation/SideMenu',
  component: SideMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The SideMenu component provides a collapsible navigation menu with title and menu items. It automatically collapses on mobile devices and can be toggled via a header button. The component follows the Atomix design system guidelines and includes both React and vanilla JavaScript implementations.

## Features

- **Responsive Design**: Automatically collapses on mobile devices
- **Collapsible**: Can be toggled open/closed with smooth animations
- **Accessibility**: Full keyboard navigation and screen reader support
- **Active States**: Support for active menu items
- **Icon Support**: Menu items can include Phosphor icons
- **Vanilla JS Support**: Complete vanilla JavaScript implementation available

## Usage

### Basic SideMenu
\`\`\`tsx
<SideMenu title="Navigation">
  <SideMenuList>
    <SideMenuItem href="/" active>Home</SideMenuItem>
    <SideMenuItem href="/about">About</SideMenuItem>
    <SideMenuItem href="/contact">Contact</SideMenuItem>
  </SideMenuList>
</SideMenu>
\`\`\`

### With Icons
\`\`\`tsx
<SideMenu title="Navigation">
  <SideMenuList>
    <SideMenuItem href="/" icon={<Icon name="House" />} active>
      Home
    </SideMenuItem>
    <SideMenuItem href="/about" icon={<Icon name="Info" />}>
      About
    </SideMenuItem>
  </SideMenuList>
</SideMenu>
\`\`\`

### Vanilla JavaScript
\`\`\`html
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
        <li class="c-side-menu__item">
          <a href="/about" class="c-side-menu__link">About</a>
        </li>
      </ul>
    </div>
  </div>
</div>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Menu title displayed at the top',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the menu is open (for controlled component)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the menu is collapsible on mobile',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the menu is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback when menu open state changes',
      table: {
        type: { summary: '(isOpen: boolean) => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    onToggle: fn(),
  },
} satisfies Meta<typeof SideMenu>;

export default meta;
type Story = StoryObj<typeof SideMenu>;

// Default SideMenu
export const Default: Story = {
  args: {
    title: 'Navigation',
    children: (
      <SideMenuList>
        <SideMenuItem href="/" active>
          Home
        </SideMenuItem>
        <SideMenuItem href="/about">About</SideMenuItem>
        <SideMenuItem href="/services">Services</SideMenuItem>
        <SideMenuItem href="/contact">Contact</SideMenuItem>
      </SideMenuList>
    ),
    collapsible: true,
    onToggle: fn(),
  },
};

// With Icons
export const WithIcons: Story = {
  args: {
    title: 'Main Menu',
    children: (
      <SideMenuList>
        <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
          Home
        </SideMenuItem>
        <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
          About
        </SideMenuItem>
        <SideMenuItem href="/services" icon={<Icon name="Gear" size="sm" />}>
          Services
        </SideMenuItem>
        <SideMenuItem href="/portfolio" icon={<Icon name="Briefcase" size="sm" />}>
          Portfolio
        </SideMenuItem>
        <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
          Contact
        </SideMenuItem>
      </SideMenuList>
    ),
    collapsible: true,
    onToggle: fn(),
  },
};

// Multiple Lists
export const MultipleLists: Story = {
  args: {
    title: 'Dashboard',
    children: (
      <>
        <SideMenuList>
          <SideMenuItem href="/dashboard" icon={<Icon name="ChartBar" size="sm" />} active>
            Dashboard
          </SideMenuItem>
          <SideMenuItem href="/analytics" icon={<Icon name="TrendUp" size="sm" />}>
            Analytics
          </SideMenuItem>
          <SideMenuItem href="/reports" icon={<Icon name="FileText" size="sm" />}>
            Reports
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/users" icon={<Icon name="Users" size="sm" />}>
            Users
          </SideMenuItem>
          <SideMenuItem href="/settings" icon={<Icon name="Gear" size="sm" />}>
            Settings
          </SideMenuItem>
          <SideMenuItem href="/help" icon={<Icon name="Question" size="sm" />}>
            Help
          </SideMenuItem>
        </SideMenuList>
      </>
    ),
    collapsible: true,
    onToggle: fn(),
  },
};

// With Disabled Items
export const WithDisabledItems: Story = {
  args: {
    title: 'Navigation',
    children: (
      <SideMenuList>
        <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
          Home
        </SideMenuItem>
        <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
          About
        </SideMenuItem>
        <SideMenuItem href="/services" icon={<Icon name="Gear" size="sm" />} disabled>
          Services (Coming Soon)
        </SideMenuItem>
        <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
          Contact
        </SideMenuItem>
      </SideMenuList>
    ),
    collapsible: true,
    onToggle: fn(),
  },
};

// Non-Collapsible
export const NonCollapsible: Story = {
  args: {
    title: 'Quick Links',
    children: (
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
        <SideMenuItem href="/logout" icon={<Icon name="SignOut" size="sm" />}>
          Logout
        </SideMenuItem>
      </SideMenuList>
    ),
    collapsible: false,
    onToggle: fn(),
  },
};

// Controlled Component
export const Controlled: Story = {
  render: args => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggle = (newIsOpen: boolean) => {
      setIsOpen(newIsOpen);
      args.onToggle?.(newIsOpen);
    };

    return (
      <div>
        <button onClick={() => handleToggle(!isOpen)} style={{ marginBottom: '1rem' }}>
          Toggle Menu (Currently: {isOpen ? 'Open' : 'Closed'})
        </button>

        <SideMenu
          {...args}
          title="Controlled Menu"
          isOpen={isOpen}
          onToggle={handleToggle}
          collapsible
        >
          <SideMenuList>
            <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
              Home
            </SideMenuItem>
            <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
              About
            </SideMenuItem>
            <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
              Contact
            </SideMenuItem>
          </SideMenuList>
        </SideMenu>
      </div>
    );
  },
  args: {
    onToggle: fn(),
  },
};

// Button Items (No href)
export const ButtonItems: Story = {
  args: {
    title: 'Actions',
    children: (
      <SideMenuList>
        <SideMenuItem onClick={fn()} icon={<Icon name="ChartBar" size="sm" />} active>
          Dashboard
        </SideMenuItem>
        <SideMenuItem onClick={fn()} icon={<Icon name="Plus" size="sm" />}>
          Create New
        </SideMenuItem>
        <SideMenuItem onClick={fn()} icon={<Icon name="Export" size="sm" />}>
          Export Data
        </SideMenuItem>
        <SideMenuItem onClick={fn()} icon={<Icon name="Gear" size="sm" />}>
          Settings
        </SideMenuItem>
      </SideMenuList>
    ),
    collapsible: true,
    onToggle: fn(),
  },
};

// Custom Toggle Icon
export const CustomToggleIcon: Story = {
  args: {
    title: 'Custom Menu',
    toggleIcon: <Icon name="CaretDown" size="xs" />,
    children: (
      <SideMenuList>
        <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
          Home
        </SideMenuItem>
        <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
          About
        </SideMenuItem>
        <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
          Contact
        </SideMenuItem>
      </SideMenuList>
    ),
    collapsible: true,
    onToggle: fn(),
  },
};

// Disabled Menu
export const DisabledMenu: Story = {
  args: {
    title: 'Disabled Menu',
    disabled: true,
    children: (
      <SideMenuList>
        <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
          Home
        </SideMenuItem>
        <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
          About
        </SideMenuItem>
        <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
          Contact
        </SideMenuItem>
      </SideMenuList>
    ),
    collapsible: true,
    onToggle: fn(),
  },
};

// Complex Navigation
export const ComplexNavigation: Story = {
  args: {
    title: 'Admin Panel',
    children: (
      <>
        <SideMenuList>
          <SideMenuItem href="/dashboard" icon={<Icon name="ChartBar" size="sm" />} active>
            Dashboard
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/users" icon={<Icon name="Users" size="sm" />}>
            User Management
          </SideMenuItem>
          <SideMenuItem href="/roles" icon={<Icon name="Shield" size="sm" />}>
            Roles & Permissions
          </SideMenuItem>
          <SideMenuItem href="/audit" icon={<Icon name="FileText" size="sm" />}>
            Audit Logs
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/content" icon={<Icon name="Article" size="sm" />}>
            Content Management
          </SideMenuItem>
          <SideMenuItem href="/media" icon={<Icon name="Image" size="sm" />}>
            Media Library
          </SideMenuItem>
          <SideMenuItem href="/seo" icon={<Icon name="MagnifyingGlass" size="sm" />}>
            SEO Settings
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/analytics" icon={<Icon name="TrendUp" size="sm" />}>
            Analytics
          </SideMenuItem>
          <SideMenuItem href="/reports" icon={<Icon name="ChartBar" size="sm" />}>
            Reports
          </SideMenuItem>
          <SideMenuItem href="/exports" icon={<Icon name="Export" size="sm" />}>
            Data Exports
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/settings" icon={<Icon name="Gear" size="sm" />}>
            System Settings
          </SideMenuItem>
          <SideMenuItem href="/integrations" icon={<Icon name="Plugs" size="sm" />}>
            Integrations
          </SideMenuItem>
          <SideMenuItem href="/backup" icon={<Icon name="Database" size="sm" />}>
            Backup & Restore
          </SideMenuItem>
        </SideMenuList>
      </>
    ),
    collapsible: true,
    onToggle: fn(),
  },
};

// Responsive Demo
export const ResponsiveDemo: Story = {
  render: args => (
    <div style={{ maxWidth: '300px' }}>
      <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#666' }}>
        Resize your browser window to see the responsive behavior. On mobile (less than 768px), the
        menu becomes collapsible.
      </p>

      <SideMenu {...args} title="Responsive Menu" collapsible>
        <SideMenuList>
          <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
            Home
          </SideMenuItem>
          <SideMenuItem href="/products" icon={<Icon name="Package" size="sm" />}>
            Products
          </SideMenuItem>
          <SideMenuItem href="/services" icon={<Icon name="Gear" size="sm" />}>
            Services
          </SideMenuItem>
          <SideMenuItem href="/about" icon={<Icon name="Info" size="sm" />}>
            About Us
          </SideMenuItem>
          <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
            Contact
          </SideMenuItem>
        </SideMenuList>

        <SideMenuList>
          <SideMenuItem href="/account" icon={<Icon name="User" size="sm" />}>
            My Account
          </SideMenuItem>
          <SideMenuItem href="/orders" icon={<Icon name="FileText" size="sm" />}>
            Order History
          </SideMenuItem>
          <SideMenuItem href="/support" icon={<Icon name="Question" size="sm" />}>
            Support
          </SideMenuItem>
        </SideMenuList>
      </SideMenu>
    </div>
  ),
  args: {
    onToggle: fn(),
  },
};

// E-commerce Navigation Example
export const EcommerceNavigation: Story = {
  args: {
    title: 'Shop Categories',
    children: (
      <>
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
          <SideMenuItem href="/sports" icon={<Icon name="Basketball" size="sm" />}>
            Sports & Outdoors
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
          <SideMenuItem href="/cart" icon={<Icon name="ShoppingCart" size="sm" />}>
            Shopping Cart
          </SideMenuItem>
        </SideMenuList>
      </>
    ),
    collapsible: true,
    onToggle: fn(),
  },
};

// Interactive Demo with Actions
export const InteractiveDemo: Story = {
  render: args => {
    const [activeItem, setActiveItem] = React.useState('/dashboard');
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggle = (newIsOpen: boolean) => {
      setIsOpen(newIsOpen);
      args.onToggle?.(newIsOpen);
    };

    const handleItemClick = (href: string) => {
      setActiveItem(href);
      // Simulate navigation action
      args.onToggle?.(false); // Close menu on mobile after selection
    };

    return (
      <div>
        <div
          style={{
            marginBottom: '1rem',
            padding: '0.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <strong>Current Page:</strong> {activeItem} | <strong>Menu:</strong>{' '}
          {isOpen ? 'Open' : 'Closed'}
        </div>

        <SideMenu
          {...args}
          title="Interactive Menu"
          isOpen={isOpen}
          onToggle={handleToggle}
          collapsible
        >
          <SideMenuList>
            <SideMenuItem
              href="/dashboard"
              icon={<Icon name="ChartBar" size="sm" />}
              active={activeItem === '/dashboard'}
              onClick={() => handleItemClick('/dashboard')}
            >
              Dashboard
            </SideMenuItem>
            <SideMenuItem
              href="/analytics"
              icon={<Icon name="TrendUp" size="sm" />}
              active={activeItem === '/analytics'}
              onClick={() => handleItemClick('/analytics')}
            >
              Analytics
            </SideMenuItem>
            <SideMenuItem
              href="/users"
              icon={<Icon name="Users" size="sm" />}
              active={activeItem === '/users'}
              onClick={() => handleItemClick('/users')}
            >
              Users
            </SideMenuItem>
          </SideMenuList>

          <SideMenuList>
            <SideMenuItem
              href="/settings"
              icon={<Icon name="Gear" size="sm" />}
              active={activeItem === '/settings'}
              onClick={() => handleItemClick('/settings')}
            >
              Settings
            </SideMenuItem>
            <SideMenuItem onClick={fn()} icon={<Icon name="SignOut" size="sm" />}>
              Logout
            </SideMenuItem>
          </SideMenuList>
        </SideMenu>
      </div>
    );
  },
  args: {
    onToggle: fn(),
  },
};
