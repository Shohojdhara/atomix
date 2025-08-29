import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuDivider, MenuItem } from '../Menu/Menu';
import { Nav } from './Nav';
import { NavDropdown } from './NavDropdown';
import { NavItem } from './NavItem';

const meta = {
  title: 'Components/Navigation/Nav',
  component: Nav,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    alignment: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'Alignment of nav items',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'float-top-center', 'float-bottom-center'],
      description: 'Nav variant including float options',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the nav is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock icon component for stories
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

// Basic Nav
export const Default: Story = {
  args: {
    alignment: 'start',
  },
  render: args => (
    <Nav {...args}>
      <NavItem href="/" active>
        Home
      </NavItem>
      <NavItem href="/about">About</NavItem>
      <NavItem href="/services">Services</NavItem>
      <NavItem href="/contact">Contact</NavItem>
    </Nav>
  ),
};

// Nav with different alignments
export const StartAlignment: Story = {
  args: {
    alignment: 'start',
  },
  render: args => (
    <div style={{ width: '100%', border: '1px dashed #ccc', padding: '1rem' }}>
      <Nav {...args}>
        <NavItem href="/" active>
          Home
        </NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/services">Services</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </Nav>
    </div>
  ),
};

export const CenterAlignment: Story = {
  args: {
    alignment: 'center',
  },
  render: args => (
    <div style={{ width: '100%', border: '1px dashed #ccc', padding: '1rem' }}>
      <Nav {...args}>
        <NavItem href="/" active>
          Home
        </NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/services">Services</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </Nav>
    </div>
  ),
};

export const EndAlignment: Story = {
  args: {
    alignment: 'end',
  },
  render: args => (
    <div style={{ width: '100%', border: '1px dashed #ccc', padding: '1rem' }}>
      <Nav {...args}>
        <NavItem href="/" active>
          Home
        </NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/services">Services</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </Nav>
    </div>
  ),
};

// Nav with dropdown
export const WithDropdown: Story = {
  args: {
    alignment: 'start',
  },
  render: args => (
    <Nav {...args}>
      <NavItem href="/" active>
        Home
      </NavItem>
      <NavItem href="/about">About</NavItem>
      <NavDropdown title="Services">
        <Menu>
          <MenuItem href="/web-design" icon={<HomeIcon />}>
            Web Design
          </MenuItem>
          <MenuItem href="/mobile-apps" icon={<UserIcon />}>
            Mobile Apps
          </MenuItem>
          <MenuDivider />
          <MenuItem href="/consulting" icon={<SettingsIcon />}>
            Consulting
          </MenuItem>
        </Menu>
      </NavDropdown>
      <NavItem href="/contact">Contact</NavItem>
    </Nav>
  ),
};

// Nav with multiple dropdowns
export const WithMultipleDropdowns: Story = {
  args: {
    alignment: 'start',
  },
  render: args => (
    <Nav {...args}>
      <NavItem href="/" active>
        Home
      </NavItem>
      <NavDropdown title="Services">
        <Menu>
          <MenuItem href="/web-design">Web Design</MenuItem>
          <MenuItem href="/mobile-apps">Mobile Apps</MenuItem>
          <MenuItem href="/consulting">Consulting</MenuItem>
        </Menu>
      </NavDropdown>
      <NavDropdown title="Products">
        <Menu>
          <MenuItem href="/product-1">Product 1</MenuItem>
          <MenuItem href="/product-2">Product 2</MenuItem>
          <MenuItem href="/product-3">Product 3</MenuItem>
        </Menu>
      </NavDropdown>
      <NavItem href="/about">About</NavItem>
      <NavItem href="/contact">Contact</NavItem>
    </Nav>
  ),
};

// Disabled Nav
export const Disabled: Story = {
  args: {
    alignment: 'start',
    disabled: true,
  },
  render: args => (
    <Nav {...args}>
      <NavItem href="/" active>
        Home
      </NavItem>
      <NavItem href="/about">About</NavItem>
      <NavItem href="/services">Services</NavItem>
      <NavItem href="/contact">Contact</NavItem>
    </Nav>
  ),
};

// Nav with active states
export const WithActiveStates: Story = {
  args: {
    alignment: 'start',
  },
  render: args => (
    <Nav {...args}>
      <NavItem href="/" active>
        Home
      </NavItem>
      <NavItem href="/about">About</NavItem>
      <NavItem href="/services">Services</NavItem>
      <NavItem href="/contact">Contact</NavItem>
    </Nav>
  ),
};

// All alignments showcase
export const AllAlignments: Story = {
  args: {
    alignment: 'start',
  },
  render: () => (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Start Alignment</h3>
        <div style={{ border: '1px dashed #ccc', padding: '1rem' }}>
          <Nav alignment="start">
            <NavItem href="/" active>
              Home
            </NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/services">Services</NavItem>
            <NavItem href="/contact">Contact</NavItem>
          </Nav>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Center Alignment</h3>
        <div style={{ border: '1px dashed #ccc', padding: '1rem' }}>
          <Nav alignment="center">
            <NavItem href="/" active>
              Home
            </NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/services">Services</NavItem>
            <NavItem href="/contact">Contact</NavItem>
          </Nav>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>End Alignment</h3>
        <div style={{ border: '1px dashed #ccc', padding: '1rem' }}>
          <Nav alignment="end">
            <NavItem href="/" active>
              Home
            </NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/services">Services</NavItem>
            <NavItem href="/contact">Contact</NavItem>
          </Nav>
        </div>
      </div>
    </div>
  ),
};

// Float variants (new feature)
export const FloatTopCenter: Story = {
  args: {
    alignment: 'center',
    variant: 'float-top-center',
  },
  render: args => (
    <div
      style={{
        height: '500vh',
        width: '95vw',
        position: 'relative',
        backgroundSize: 'contain',
        backgroundImage:
          'url("https://images.unsplash.com/photo-1749301560225-3032826b9e7f?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        padding: '2rem',
      }}
    >
      <p>
        This is a demo of the floating nav. The nav should appear as a floating bubble at the top
        center.
      </p>
      <Nav {...args}>
        <NavItem href="/" active>
          Home
        </NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/services">Services</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </Nav>
    </div>
  ),
};

export const FloatBottomCenter: Story = {
  args: {
    alignment: 'center',
    variant: 'float-bottom-center',
  },
  render: args => (
    <div
      style={{
        height: '500vh',
        width: '95vw',
        position: 'relative',
        backgroundSize: 'contain',
        backgroundImage:
          'url("https://images.unsplash.com/photo-1749301560225-3032826b9e7f?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        padding: '2rem',
      }}
    >
      <p>
        This is a demo of the floating nav. The nav should appear as a floating bubble at the bottom
        center.
      </p>
      <Nav {...args}>
        <NavItem href="/" active>
          Home
        </NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/services">Services</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </Nav>
    </div>
  ),
};

// Float variants with icons
export const FloatWithIcons: Story = {
  args: {
    alignment: 'center',
    variant: 'float-bottom-center',
  },
  render: args => (
    <div
      style={{
        height: '500vh',
        width: '95vw',
        position: 'relative',
        backgroundSize: 'contain',
        backgroundImage:
          'url("https://images.unsplash.com/photo-1749301560225-3032826b9e7f?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        padding: '2rem',
      }}
    >
      <p>Floating nav with icons - perfect for mobile-first navigation.</p>
      <Nav {...args}>
        <NavItem href="/" active>
          <HomeIcon />
        </NavItem>
        <NavItem href="/profile">
          <UserIcon />
        </NavItem>
        <NavItem href="/settings">
          <SettingsIcon />
        </NavItem>
      </Nav>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  args: {
    alignment: 'start',
  },
  render: () => (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h3>Basic Navigation</h3>
        <Nav alignment="start">
          <NavItem href="/" active>
            Home
          </NavItem>
          <NavItem href="/about">About</NavItem>
          <NavItem href="/services">Services</NavItem>
          <NavItem href="/contact">Contact</NavItem>
        </Nav>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h3>Navigation with Dropdown</h3>
        <Nav alignment="start">
          <NavItem href="/" active>
            Home
          </NavItem>
          <NavDropdown title="Services">
            <Menu>
              <MenuItem href="/web-design">Web Design</MenuItem>
              <MenuItem href="/mobile-apps">Mobile Apps</MenuItem>
              <MenuItem href="/consulting">Consulting</MenuItem>
            </Menu>
          </NavDropdown>
          <NavItem href="/about">About</NavItem>
          <NavItem href="/contact">Contact</NavItem>
        </Nav>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h3>Centered Navigation</h3>
        <div style={{ border: '1px dashed #ccc', padding: '1rem' }}>
          <Nav alignment="center">
            <NavItem href="/" active>
              Home
            </NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/services">Services</NavItem>
            <NavItem href="/contact">Contact</NavItem>
          </Nav>
        </div>
      </div>

      <div
        style={{
          height: '200px',
          position: 'relative',
          background: '#f5f5f5',
          padding: '2rem',
          marginBottom: '3rem',
        }}
      >
        <h3>Float Bottom Center</h3>
        <p>Floating navigation bubble at bottom center</p>
        <Nav alignment="center" variant="float-bottom-center">
          <NavItem href="/" active>
            <HomeIcon />
          </NavItem>
          <NavItem href="/profile">
            <UserIcon />
          </NavItem>
          <NavItem href="/settings">
            <SettingsIcon />
          </NavItem>
        </Nav>
      </div>
    </div>
  ),
};
