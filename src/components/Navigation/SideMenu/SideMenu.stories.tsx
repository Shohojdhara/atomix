import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { Icon } from '../../Icon';
import { SideMenu } from './SideMenu';
import { SideMenuItem } from './SideMenuItem';
import { SideMenuList } from './SideMenuList';

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
- **Nested Menu Items**: Support for collapsible nested sections with independent toggle functionality
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

### With Nested Menu Items
\`\`\`tsx
<SideMenu title="Navigation" menuItems={[
  {
    title: 'Dashboard',
    items: [
      { title: 'Overview', href: '/dashboard', icon: <Icon name="ChartBar" />, active: true },
      { title: 'Analytics', href: '/dashboard/analytics', icon: <Icon name="TrendUp" /> },
    ],
  },
  {
    title: 'Users',
    items: [
      { title: 'All Users', href: '/users', icon: <Icon name="Users" /> },
      { title: 'Roles', href: '/users/roles', icon: <Icon name="Shield" /> },
    ],
  },
]} />
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
  },
  args: {
    onToggle: fn(),
  },
} satisfies Meta<typeof SideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

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
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--atomix-secondary-text-emphasis, #666)' }}>
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

// Desktop Collapsible SideMenu (Vertical Collapse)
export const DesktopCollapsible: Story = {
  render: args => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
      <div style={{ maxWidth: '300px', padding: '2rem', margin: '0 auto' }}>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--atomix-secondary-text-emphasis, #666)' }}>
          Desktop vertical collapse - click the toggle button to expand/collapse the menu vertically.
          Each section can also be toggled independently.
        </p>
        <SideMenu
          {...args}
          title="Navigation"
          collapsibleDesktop
          defaultCollapsedDesktop={false}
          isOpen={isOpen}
          onToggle={setIsOpen}
          menuItems={[
            {
              title: 'Navigation',
              items: [
                { title: 'Home', href: '/', icon: <Icon name="House" size="sm" />, active: true },
                { title: 'Dashboard', href: '/dashboard', icon: <Icon name="ChartBar" size="sm" /> },
                { title: 'Analytics', href: '/analytics', icon: <Icon name="TrendUp" size="sm" /> },
                { title: 'Users', href: '/users', icon: <Icon name="Users" size="sm" /> },
                { title: 'Settings', href: '/settings', icon: <Icon name="Gear" size="sm" /> },
              ],
            },
            {
              title: 'Products',
              items: [
                { title: 'All Products', href: '/products', icon: <Icon name="Package" size="sm" /> },
                { title: 'Categories', href: '/products/categories', icon: <Icon name="Tag" size="sm" /> },
                { title: 'Inventory', href: '/products/inventory', icon: <Icon name="Warehouse" size="sm" /> },
              ],
            },
            {
              title: 'Services',
              items: [
                { title: 'Service List', href: '/services', icon: <Icon name="Gear" size="sm" /> },
                { title: 'Service Requests', href: '/services/requests', icon: <Icon name="Clipboard" size="sm" /> },
              ],
            },
            {
              title: 'About Us',
              items: [
                { title: 'About Us', href: '/about-us', icon: <Icon name="Info" size="sm" /> },
                { title: 'Contact', href: '/contact', icon: <Icon name="Envelope" size="sm" /> },
              ],
            },
          ]}
        />
        <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'var(--atomix-secondary-bg-subtle, rgba(0,0,0,0.05))', borderRadius: '6px', fontSize: '0.875rem' }}>
          <strong>Current state:</strong> {isOpen ? 'Expanded' : 'Collapsed'}
        </div>
      </div>
    );
  },
  args: {
    onToggle: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Desktop collapsible sidebar with vertical collapse. The menu collapses vertically (height-based) on desktop, similar to mobile behavior. Each nested section can be toggled independently. Use EdgePanel for horizontal slide-in panels.',
      },
    },
  },
};

// Nested Menu Items with Toggle
export const NestedMenuItems: Story = {
  args: {
    menuItems: [
      {
        title: 'Dashboard',
        items: [
          { title: 'Overview', href: '/dashboard', icon: <Icon name="ChartBar" size="sm" />, active: true },
          { title: 'Analytics', href: '/dashboard/analytics', icon: <Icon name="TrendUp" size="sm" /> },
          { title: 'Reports', href: '/dashboard/reports', icon: <Icon name="FileText" size="sm" /> },
        ],
      },
      {
        title: 'User Management',
        items: [
          { title: 'Users', href: '/users', icon: <Icon name="Users" size="sm" /> },
          { title: 'Roles', href: '/users/roles', icon: <Icon name="Shield" size="sm" /> },
          { title: 'Permissions', href: '/users/permissions', icon: <Icon name="Lock" size="sm" /> },
        ],
      },
      {
        title: 'Content',
        items: [
          { title: 'Pages', href: '/content/pages', icon: <Icon name="Article" size="sm" /> },
          { title: 'Media', href: '/content/media', icon: <Icon name="Image" size="sm" /> },
          { title: 'Blog', href: '/content/blog', icon: <Icon name="Pencil" size="sm" /> },
        ],
      },
      {
        title: 'Settings',
        items: [
          { title: 'General', href: '/settings/general', icon: <Icon name="Gear" size="sm" /> },
          { title: 'Notifications', href: '/settings/notifications', icon: <Icon name="Bell" size="sm" /> },
          { title: 'Security', href: '/settings/security', icon: <Icon name="Lock" size="sm" />, disabled: true },
        ],
      },
    ],
    collapsible: true,
    onToggle: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'SideMenu with nested menu items. Each section can be collapsed/expanded independently by clicking on the section title. The toggle icon rotates when sections are open.',
      },
    },
  },
};

// Nested Menu Items with Children
export const NestedMenuItemsWithChildren: Story = {
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
      </SideMenuList>
    ),
    menuItems: [
      {
        title: 'Products',
        items: [
          { title: 'All Products', href: '/products', icon: <Icon name="Package" size="sm" /> },
          { title: 'Categories', href: '/products/categories', icon: <Icon name="Tag" size="sm" /> },
          { title: 'Inventory', href: '/products/inventory', icon: <Icon name="Warehouse" size="sm" /> },
        ],
      },
      {
        title: 'Services',
        items: [
          { title: 'Service List', href: '/services', icon: <Icon name="Gear" size="sm" /> },
          { title: 'Service Requests', href: '/services/requests', icon: <Icon name="Clipboard" size="sm" /> },
        ],
      },
    ],
    collapsible: true,
    onToggle: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'SideMenu combining both children (static items) and menuItems (collapsible sections). The children appear first, followed by the collapsible menu item sections.',
      },
    },
  },
};

// Nested Menu Items with Custom Toggle Icons
export const NestedMenuItemsCustomIcons: Story = {
  args: {
    title: 'Settings',
    menuItems: [
      {
        title: 'Account Settings',
        toggleIcon: <Icon name="CaretDown" size="xs" />,
        items: [
          { title: 'Profile', href: '/settings/profile', icon: <Icon name="User" size="sm" /> },
          { title: 'Security', href: '/settings/security', icon: <Icon name="Lock" size="sm" /> },
          { title: 'Privacy', href: '/settings/privacy', icon: <Icon name="Eye" size="sm" /> },
        ],
      },
      {
        title: 'Preferences',
        toggleIcon: <Icon name="CaretDown" size="xs" />,
        items: [
          { title: 'Notifications', href: '/settings/notifications', icon: <Icon name="Bell" size="sm" /> },
          { title: 'Appearance', href: '/settings/appearance', icon: <Icon name="PaintBrush" size="sm" /> },
          { title: 'Language', href: '/settings/language', icon: <Icon name="Globe" size="sm" /> },
        ],
      },
      {
        title: 'Billing',
        toggleIcon: <Icon name="CaretDown" size="xs" />,
        items: [
          { title: 'Subscription', href: '/settings/billing', icon: <Icon name="CreditCard" size="sm" /> },
          { title: 'Invoices', href: '/settings/invoices', icon: <Icon name="Receipt" size="sm" /> },
        ],
      },
    ],
    collapsible: true,
    onToggle: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Nested menu items with custom toggle icons. Each section can have its own toggle icon, which rotates when the section is expanded.',
      },
    },
  },
};

// Desktop Collapsible - Starting Collapsed
export const DesktopCollapsibleStartCollapsed: Story = {
  render: args => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div style={{ maxWidth: '300px', padding: '2rem', margin: '0 auto' }}>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--atomix-secondary-text-emphasis, #666)' }}>
          Sidebar starts collapsed on desktop.
        </p>
        <SideMenu
          {...args}
          title="Navigation"
          collapsibleDesktop
          defaultCollapsedDesktop={true}
          isOpen={isOpen}
          onToggle={setIsOpen}
        >
          <SideMenuList>
            <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
              Home
            </SideMenuItem>
            <SideMenuItem href="/dashboard" icon={<Icon name="ChartBar" size="sm" />}>
              Dashboard
            </SideMenuItem>
            <SideMenuItem href="/analytics" icon={<Icon name="TrendUp" size="sm" />}>
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
      </div>
    );
  },
  args: {
    onToggle: fn(),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Desktop collapsible sidebar that starts in a collapsed state.',
      },
    },
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
      <div style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div
          style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            backgroundColor: 'var(--atomix-secondary-bg-subtle, rgba(0,0,0,0.05))',
            borderRadius: '6px',
            fontSize: '0.875rem',
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

// Glass Morphism Effect Stories - Professional Showcase

/**
 * Background wrapper component for consistent glass effect demonstrations
 */
interface BackgroundWrapperProps {
  children: React.ReactNode;
  backgroundImage: string;
  height?: string;
  padding?: string;
  overlay?: boolean;
}

const BackgroundWrapper = ({
  children,
  backgroundImage,
  height = '90vh',
  padding = '60px 40px',
  overlay = false,
}: BackgroundWrapperProps) => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      minHeight: height,
      background: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: padding,
      borderRadius: '12px',
      gap: '3rem',
    }}
  >
    {overlay && (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: '12px',
        }}
      />
    )}
    {children}
  </div>
);

/**
 * Glass Effect - Default
 *
 * Demonstrates the SideMenu component with default glass morphism settings.
 * The glass effect provides a modern, frosted appearance perfect for sidebar navigation.
 */
export const Glass: Story = {
  render: () => (
    <BackgroundWrapper
      backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop"
      overlay
    >
      <div style={{ position: 'relative', width: '300px' }}>
        <SideMenu title="Navigation" glass>
          <SideMenuList>
            <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
              Home
            </SideMenuItem>
            <SideMenuItem href="/explore" icon={<Icon name="Compass" size="sm" />}>
              Explore
            </SideMenuItem>
            <SideMenuItem href="/services" icon={<Icon name="Briefcase" size="sm" />}>
              Services
            </SideMenuItem>
            <SideMenuItem href="/contact" icon={<Icon name="Envelope" size="sm" />}>
              Contact
            </SideMenuItem>
          </SideMenuList>
          <SideMenuList>
            <SideMenuItem href="/settings" icon={<Icon name="Gear" size="sm" />}>
              Settings
            </SideMenuItem>
          </SideMenuList>
        </SideMenu>
      </div>
      <div style={{ position: 'relative', flex: 1, maxWidth: '600px' }}>
        <h2
          style={{
            color: 'white',
            fontSize: '32px',
            fontWeight: 600,
            marginBottom: '16px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Glass SideMenu
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          A modern sidebar navigation with glassmorphism effect. Perfect for dashboards, admin
          panels, and application interfaces that require elegant navigation.
        </p>
      </div>
    </BackgroundWrapper>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Basic glass morphism effect with default settings. The sidebar maintains excellent readability while creating a beautiful frosted glass aesthetic.',
      },
    },
  },
};

/**
 * Glass with Custom Properties
 *
 * Demonstrates advanced customization of the glass effect with various
 * displacement, blur, and corner radius settings.
 */
export const GlassCustom: Story = {
  render: () => (
    <BackgroundWrapper
      backgroundImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2940&auto=format&fit=crop"
      overlay
    >
      <div style={{ position: 'relative', width: '320px',}}>
        <SideMenu
          title="Nature Explorer"
          glass={{
            displacementScale: 70,
            blurAmount: 2,
            cornerRadius: 12,
            mode: 'shader',
          }}
        >
          <SideMenuList>
            <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
              Home
            </SideMenuItem>
            <SideMenuItem href="/trails" icon={<Icon name="MapPin" size="sm" />}>
              Trails
            </SideMenuItem>
            <SideMenuItem href="/wildlife" icon={<Icon name="Sparkle" size="sm" />}>
              Wildlife
            </SideMenuItem>
            <SideMenuItem href="/camping" icon={<Icon name="Tent" size="sm" />}>
              Camping
            </SideMenuItem>
          </SideMenuList>
          <SideMenuList>
            <SideMenuItem href="/guides" icon={<Icon name="Book" size="sm" />}>
              Guides
            </SideMenuItem>
            <SideMenuItem href="/gear" icon={<Icon name="Backpack" size="sm" />}>
              Gear List
            </SideMenuItem>
          </SideMenuList>
        </SideMenu>
      </div>
      <div style={{ position: 'relative', zIndex: 1, flex: 1, maxWidth: '600px' }}>
        <h2
          style={{
            color: 'white',
            fontSize: '32px',
            fontWeight: 600,
            marginBottom: '16px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Custom Glass Properties
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Enhanced glass effect with custom displacement, blur, and corner radius. Perfect for
          creating unique visual experiences tailored to your brand.
        </p>
      </div>
    </BackgroundWrapper>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Customized glass effect with increased displacement and blur for a more pronounced visual impact. Demonstrates the flexibility of the glass morphism system.',
      },
    },
  },
};

/**
 * Glass Theme Variations
 *
 * A comprehensive showcase of glass sidebar across different themed
 * backgrounds, demonstrating versatility and adaptability.
 */
export const GlassThemeShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Ocean Theme */}
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2940&auto=format&fit=crop"
        height="70vh"
      >
        <div style={{ position: 'relative', width: '300px',}}>
          <SideMenu title="Ocean Explorer" glass>
            <SideMenuList>
              <SideMenuItem href="/" icon={<Icon name="House" size="sm" />} active>
                Home
              </SideMenuItem>
              <SideMenuItem href="/beaches" icon={<Icon name="Sun" size="sm" />}>
                Beaches
              </SideMenuItem>
              <SideMenuItem href="/diving" icon={<Icon name="Waves" size="sm" />}>
                Diving
              </SideMenuItem>
            </SideMenuList>
          </SideMenu>
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <h3
            style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: 600,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Ocean & Travel Theme
          </h3>
        </div>
      </BackgroundWrapper>

      {/* Urban Theme */}
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2940&auto=format&fit=crop"
        height="70vh"
      >
        <div style={{ position: 'relative', width: '300px',}}>
          <SideMenu glass>
            <SideMenuList>
              <SideMenuItem href="/dashboard" icon={<Icon name="ChartBar" size="sm" />} active>
                Dashboard
              </SideMenuItem>
              <SideMenuItem href="/analytics" icon={<Icon name="TrendUp" size="sm" />}>
                Analytics
              </SideMenuItem>
              <SideMenuItem href="/users" icon={<Icon name="Users" size="sm" />}>
                Users
              </SideMenuItem>
            </SideMenuList>
          </SideMenu>
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <h3
            style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: 600,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Modern & Professional Theme
          </h3>
        </div>
      </BackgroundWrapper>

      {/* Sunset Theme */}
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=2940&auto=format&fit=crop"
        height="70vh"
      >
        <div style={{ position: 'relative', width: '320px',}}>
          <SideMenu
            title="Travel Hub"
            glass={{
              displacementScale: 60,
              blurAmount: 1.8,
              cornerRadius: 16,
              mode: 'shader',
            }}
          >
            <SideMenuList>
              <SideMenuItem href="/home" icon={<Icon name="House" size="sm" />} active>
                Home
              </SideMenuItem>
              <SideMenuItem href="/destinations" icon={<Icon name="MapPin" size="sm" />}>
                Destinations
              </SideMenuItem>
              <SideMenuItem href="/bookings" icon={<Icon name="Calendar" size="sm" />}>
                Bookings
              </SideMenuItem>
            </SideMenuList>
          </SideMenu>
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <h3
            style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: 600,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Warm & Inviting Theme
          </h3>
        </div>
      </BackgroundWrapper>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A comprehensive showcase demonstrating how glass sidebar adapts to different themes and color palettes. Each example represents a different use case and aesthetic.',
      },
    },
  },
};
