import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuDivider, MenuItem } from './Menu';

const meta = {
  title: 'Components/Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Menu component provides a vertical list of menu items, typically used in dropdowns, sidebars, or context menus. It supports dividers, icons, and can be nested. Menus are ideal for organizing navigation options, actions, or any hierarchical list of choices.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Whether the menu is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock icon components for stories
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const SignOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16,17 21,12 16,7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// Basic Menu
export const Default: Story = {
  render: () => (
    <Menu>
      <MenuItem href="/dashboard">Dashboard</MenuItem>
      <MenuItem href="/profile">Profile</MenuItem>
      <MenuItem href="/settings">Settings</MenuItem>
      <MenuItem href="/logout">Logout</MenuItem>
    </Menu>
  ),
};

// Menu with icons
export const WithIcons: Story = {
  render: () => (
    <Menu>
      <MenuItem href="/dashboard" icon={<HomeIcon />}>
        Dashboard
      </MenuItem>
      <MenuItem href="/profile" icon={<UserIcon />}>
        Profile
      </MenuItem>
      <MenuItem href="/settings" icon={<SettingsIcon />}>
        Settings
      </MenuItem>
      <MenuItem href="/logout" icon={<SignOutIcon />}>
        Logout
      </MenuItem>
    </Menu>
  ),
};

// Menu with dividers
export const WithDividers: Story = {
  render: () => (
    <Menu>
      <MenuItem href="/dashboard" icon={<HomeIcon />}>
        Dashboard
      </MenuItem>
      <MenuItem href="/profile" icon={<UserIcon />}>
        Profile
      </MenuItem>
      <MenuDivider />
      <MenuItem href="/settings" icon={<SettingsIcon />}>
        Settings
      </MenuItem>
      <MenuDivider />
      <MenuItem href="/logout" icon={<SignOutIcon />}>
        Logout
      </MenuItem>
    </Menu>
  ),
};

// Menu with active item
export const WithActiveItem: Story = {
  render: () => (
    <Menu>
      <MenuItem href="/dashboard" icon={<HomeIcon />} active>
        Dashboard
      </MenuItem>
      <MenuItem href="/profile" icon={<UserIcon />}>
        Profile
      </MenuItem>
      <MenuItem href="/settings" icon={<SettingsIcon />}>
        Settings
      </MenuItem>
      <MenuItem href="/logout" icon={<SignOutIcon />}>
        Logout
      </MenuItem>
    </Menu>
  ),
};

// Menu with disabled items
export const WithDisabledItems: Story = {
  render: () => (
    <Menu>
      <MenuItem href="/dashboard" icon={<HomeIcon />}>
        Dashboard
      </MenuItem>
      <MenuItem href="/profile" icon={<UserIcon />} disabled>
        Profile (Disabled)
      </MenuItem>
      <MenuItem href="/settings" icon={<SettingsIcon />}>
        Settings
      </MenuItem>
      <MenuItem href="/logout" icon={<SignOutIcon />}>
        Logout
      </MenuItem>
    </Menu>
  ),
};

// Disabled Menu
export const DisabledMenu: Story = {
  args: {
    disabled: true,
  },
  render: args => (
    <Menu {...args}>
      <MenuItem href="/dashboard" icon={<HomeIcon />}>
        Dashboard
      </MenuItem>
      <MenuItem href="/profile" icon={<UserIcon />}>
        Profile
      </MenuItem>
      <MenuItem href="/settings" icon={<SettingsIcon />}>
        Settings
      </MenuItem>
      <MenuItem href="/logout" icon={<SignOutIcon />}>
        Logout
      </MenuItem>
    </Menu>
  ),
};

// Menu with mixed content
export const MixedContent: Story = {
  render: () => (
    <Menu>
      <MenuItem href="/dashboard" icon={<HomeIcon />} active>
        Dashboard
      </MenuItem>
      <MenuItem href="/profile" icon={<UserIcon />}>
        My Profile
      </MenuItem>
      <MenuDivider />
      <MenuItem href="/documents" icon={<FileIcon />}>
        Documents
      </MenuItem>
      <MenuItem href="/bookmarks" icon={<BookmarkIcon />}>
        Bookmarks
      </MenuItem>
      <MenuDivider />
      <MenuItem href="/settings" icon={<SettingsIcon />}>
        Account Settings
      </MenuItem>
      <MenuItem href="/logout" icon={<SignOutIcon />}>
        Sign Out
      </MenuItem>
    </Menu>
  ),
};

// Menu with click handlers
export const WithClickHandlers: Story = {
  render: () => (
    <Menu>
      <MenuItem icon={<HomeIcon />} onClick={() => alert('Dashboard clicked!')}>
        Dashboard
      </MenuItem>
      <MenuItem icon={<UserIcon />} onClick={() => alert('Profile clicked!')}>
        Profile
      </MenuItem>
      <MenuItem icon={<SettingsIcon />} onClick={() => alert('Settings clicked!')}>
        Settings
      </MenuItem>
      <MenuDivider />
      <MenuItem icon={<SignOutIcon />} onClick={() => alert('Logout clicked!')}>
        Logout
      </MenuItem>
    </Menu>
  ),
};

// Simple menu without icons
export const SimpleMenu: Story = {
  render: () => (
    <Menu>
      <MenuItem href="/home">Home</MenuItem>
      <MenuItem href="/about">About Us</MenuItem>
      <MenuItem href="/services">Services</MenuItem>
      <MenuItem href="/portfolio">Portfolio</MenuItem>
      <MenuItem href="/contact">Contact</MenuItem>
    </Menu>
  ),
};

// User account menu example
export const UserAccountMenu: Story = {
  render: () => (
    <Menu>
      <MenuItem href="/profile" icon={<UserIcon />} active>
        My Profile
      </MenuItem>
      <MenuItem href="/account" icon={<SettingsIcon />}>
        Account Settings
      </MenuItem>
      <MenuDivider />
      <MenuItem href="/documents" icon={<FileIcon />}>
        My Documents
      </MenuItem>
      <MenuItem href="/bookmarks" icon={<BookmarkIcon />}>
        Saved Items
      </MenuItem>
      <MenuDivider />
      <MenuItem href="/logout" icon={<SignOutIcon />}>
        Sign Out
      </MenuItem>
    </Menu>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div>
        <h3>Basic Menu</h3>
        <Menu>
          <MenuItem href="/home">Home</MenuItem>
          <MenuItem href="/about">About</MenuItem>
          <MenuItem href="/contact">Contact</MenuItem>
        </Menu>
      </div>

      <div>
        <h3>Menu with Icons</h3>
        <Menu>
          <MenuItem href="/dashboard" icon={<HomeIcon />} active>
            Dashboard
          </MenuItem>
          <MenuItem href="/profile" icon={<UserIcon />}>
            Profile
          </MenuItem>
          <MenuItem href="/settings" icon={<SettingsIcon />}>
            Settings
          </MenuItem>
        </Menu>
      </div>

      <div>
        <h3>Menu with Dividers</h3>
        <Menu>
          <MenuItem href="/dashboard" icon={<HomeIcon />}>
            Dashboard
          </MenuItem>
          <MenuDivider />
          <MenuItem href="/profile" icon={<UserIcon />}>
            Profile
          </MenuItem>
          <MenuItem href="/settings" icon={<SettingsIcon />}>
            Settings
          </MenuItem>
          <MenuDivider />
          <MenuItem href="/logout" icon={<SignOutIcon />}>
            Logout
          </MenuItem>
        </Menu>
      </div>

      <div>
        <h3>Menu with Disabled Items</h3>
        <Menu>
          <MenuItem href="/dashboard" icon={<HomeIcon />}>
            Dashboard
          </MenuItem>
          <MenuItem href="/profile" icon={<UserIcon />} disabled>
            Profile (Disabled)
          </MenuItem>
          <MenuItem href="/settings" icon={<SettingsIcon />}>
            Settings
          </MenuItem>
        </Menu>
      </div>
    </div>
  ),
};
