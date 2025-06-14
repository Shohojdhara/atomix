import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { Nav } from './Nav';
import { NavItem } from './NavItem';
import { NavDropdown } from './NavDropdown';
import { Menu, MenuItem, MenuDivider } from './Menu';
import { MegaMenu, MegaMenuColumn, MegaMenuLink } from './MegaMenu';
import { Icon } from '../Icon';
import { AtomixLogo } from '../AtomixLogo';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['static', 'fixed', 'fixed-bottom'],
      description: 'Position of the navbar',
    },
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'tertiary',
        'invert',
        'brand',
        'success',
        'error',
        'warning',
        'info',
        'light',
        'dark',
      ],
      description: 'The color variant of the navbar',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the navbar should collapse on small screens',
    },
    containerWidth: {
      control: 'text',
      description: 'Custom width for the navbar container',
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof Navbar>;

// Brand logo component
const LogoBrand = () => <AtomixLogo height={40} />;

// Default Navbar
export const Default: Story = {
  args: {
    brand: <LogoBrand />,
    children: (
      <Nav alignment="end">
        <NavItem>Home</NavItem>
        <NavItem>About</NavItem>
        <NavItem>Services</NavItem>
        <NavItem>Contact</NavItem>
        <NavDropdown title="Dropdown">
          <Menu>
            <MenuItem href="#" icon="icon-lux-circle">
              Menu Item 1
            </MenuItem>
            <MenuItem href="#" icon="icon-lux-circle">
              Menu Item 2
            </MenuItem>
            <MenuItem href="#" icon="icon-lux-circle">
              Menu Item 3
            </MenuItem>
            <MenuDivider />
            <MenuItem href="#" icon="icon-lux-circle">
              Menu Item 4
            </MenuItem>
            <MenuItem href="#" icon="icon-lux-circle">
              Menu Item 5
            </MenuItem>
          </Menu>
        </NavDropdown>
      </Nav>
    ),
    position: 'static',
    variant: 'primary',
    collapsible: true,
  },
};

// Fixed Navbar
export const Fixed: Story = {
  args: {
    ...Default.args,
    position: 'fixed',
  },
};

// Fixed Bottom Navbar
export const FixedBottom: Story = {
  args: {
    ...Default.args,
    position: 'fixed-bottom',
  },
};

// Navbar with different variants
export const Variants: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3">
      <Navbar brand={<LogoBrand />} variant="primary">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="secondary">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="tertiary">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="invert">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="brand">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="success">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="error">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="warning">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="info">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="light">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />} variant="dark">
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
        </Nav>
      </Navbar>
    </div>
  ),
};

// Navbar with different nav alignments
export const NavAlignments: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3">
      <Navbar brand={<LogoBrand />}>
        <Nav alignment="start">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
          <NavItem>Link 3</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />}>
        <Nav alignment="center">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
          <NavItem>Link 3</NavItem>
        </Nav>
      </Navbar>

      <Navbar brand={<LogoBrand />}>
        <Nav alignment="end">
          <NavItem>Link 1</NavItem>
          <NavItem>Link 2</NavItem>
          <NavItem>Link 3</NavItem>
        </Nav>
      </Navbar>
    </div>
  ),
};

// Navbar with mega menu
export const WithMegaMenu: Story = {
  render: () => (
    <Navbar brand={<LogoBrand />}>
      <Nav alignment="end">
        <NavItem>Link 1</NavItem>
        <NavItem>Link 2</NavItem>
        <NavDropdown title="Mega Menu" megaMenu>
          <MegaMenu>
            <MegaMenuColumn title="Column 1" icon="icon-lux-circle">
              <MegaMenuLink href="#">Sub Menu 1</MegaMenuLink>
              <MegaMenuLink href="#">Sub Menu 2</MegaMenuLink>
              <MegaMenuLink href="#">Sub Menu 3</MegaMenuLink>
            </MegaMenuColumn>

            <MegaMenuColumn title="Column 2" icon="icon-lux-circle">
              <MegaMenuLink href="#">Sub Menu 1</MegaMenuLink>
              <MegaMenuLink href="#">Sub Menu 2</MegaMenuLink>
              <MegaMenuLink href="#">Sub Menu 3</MegaMenuLink>
            </MegaMenuColumn>

            <MegaMenuColumn title="Column 3" icon="icon-lux-circle">
              <MegaMenuLink href="#">Sub Menu 1</MegaMenuLink>
              <MegaMenuLink href="#">Sub Menu 2</MegaMenuLink>
              <MegaMenuLink href="#">Sub Menu 3</MegaMenuLink>
            </MegaMenuColumn>
          </MegaMenu>
        </NavDropdown>
      </Nav>
    </Navbar>
  ),
};

// Navbar with active and disabled items
export const WithStateModifiers: Story = {
  render: () => (
    <Navbar brand={<LogoBrand />}>
      <Nav alignment="end">
        <NavItem active>Active Link</NavItem>
        <NavItem disabled>Disabled Link</NavItem>
        <NavDropdown title="Dropdown">
          <Menu>
            <MenuItem href="#" active>
              Active Item
            </MenuItem>
            <MenuItem href="#" disabled>
              Disabled Item
            </MenuItem>
            <MenuItem href="#">Regular Item</MenuItem>
          </Menu>
        </NavDropdown>
      </Nav>
    </Navbar>
  ),
};

// Navbar with search field
export const WithSearchField: Story = {
  render: () => (
    <Navbar brand={<LogoBrand />}>
      <Nav alignment="start">
        <NavItem>Link 1</NavItem>
        <NavItem>Link 2</NavItem>
        <NavItem>Link 3</NavItem>
      </Nav>
      <div className="u-ms-auto u-d-flex u-align-items-center">
        <div className="c-search-form u-d-flex u-gap-2">
          <input type="text" className="c-input c-input--sm" placeholder="Search..." />
          <button className="c-btn c-btn--primary c-btn--sm">
            <Icon name="MagnifyingGlass" size="sm" />
          </button>
        </div>
      </div>
    </Navbar>
  ),
};

// Navbar with avatar dropdown
export const WithAvatarDropdown: Story = {
  render: () => (
    <Navbar brand={<LogoBrand />}>
      <Nav alignment="start">
        <NavItem>Link 1</NavItem>
        <NavItem>Link 2</NavItem>
        <NavItem>Link 3</NavItem>
      </Nav>
      <Nav alignment="end">
        <NavDropdown
          title={
            <>
              <img
                src="/assets/images/avatar.jpg"
                alt="User"
                className="c-avatar c-avatar--sm c-avatar--circle"
              />
              <span className="u-ms-2">User Name</span>
            </>
          }
        >
          <Menu>
            <MenuItem href="#" icon="icon-lux-user">
              Profile
            </MenuItem>
            <MenuItem href="#" icon="icon-lux-settings">
              Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem href="#" icon="icon-lux-sign-out">
              Logout
            </MenuItem>
          </Menu>
        </NavDropdown>
      </Nav>
    </Navbar>
  ),
};

// Responsive Navbar
export const ResponsiveNavbar: Story = {
  render: () => (
    <Navbar brand={<LogoBrand />} collapsible={true}>
      <Nav alignment="start">
        <NavItem>Home</NavItem>
        <NavItem>Products</NavItem>
        <NavDropdown title="Services">
          <Menu>
            <MenuItem href="#">Service 1</MenuItem>
            <MenuItem href="#">Service 2</MenuItem>
            <MenuItem href="#">Service 3</MenuItem>
          </Menu>
        </NavDropdown>
        <NavDropdown title="Resources" megaMenu>
          <MegaMenu>
            <MegaMenuColumn title="Documentation" icon="icon-lux-file">
              <MegaMenuLink href="#">Getting Started</MegaMenuLink>
              <MegaMenuLink href="#">Components</MegaMenuLink>
              <MegaMenuLink href="#">API Reference</MegaMenuLink>
            </MegaMenuColumn>
            <MegaMenuColumn title="Resources" icon="icon-lux-bookmark">
              <MegaMenuLink href="#">Blog</MegaMenuLink>
              <MegaMenuLink href="#">Tutorials</MegaMenuLink>
              <MegaMenuLink href="#">Examples</MegaMenuLink>
            </MegaMenuColumn>
            <MegaMenuColumn title="Support" icon="icon-lux-question-circle">
              <MegaMenuLink href="#">FAQs</MegaMenuLink>
              <MegaMenuLink href="#">Community</MegaMenuLink>
              <MegaMenuLink href="#">Contact Us</MegaMenuLink>
            </MegaMenuColumn>
          </MegaMenu>
        </NavDropdown>
        <NavItem>Contact</NavItem>
      </Nav>
      <Nav alignment="end">
        <NavItem>
          <Icon name="Bell" size="sm" className="u-me-2" />
          Notifications
        </NavItem>
        <NavDropdown
          title={
            <>
              <img
                src="/assets/images/avatar.jpg"
                alt="User"
                className="c-avatar c-avatar--sm c-avatar--circle"
              />
            </>
          }
        >
          <Menu>
            <MenuItem href="#" icon="icon-lux-user">
              Profile
            </MenuItem>
            <MenuItem href="#" icon="icon-lux-settings">
              Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem href="#" icon="icon-lux-sign-out">
              Logout
            </MenuItem>
          </Menu>
        </NavDropdown>
      </Nav>
    </Navbar>
  ),
};

// Mega Menu vs Dropdown Comparison
export const MegaMenuVsDropdown: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3">
      <div>
        <h4 className="u-mb-3">Regular Dropdown</h4>
        <Navbar brand={<LogoBrand />}>
          <Nav alignment="start">
            <NavItem>Home</NavItem>
            <NavDropdown title="Regular Dropdown" megaMenu={false}>
              <Menu>
                <MenuItem href="#">Menu Item 1</MenuItem>
                <MenuItem href="#">Menu Item 2</MenuItem>
                <MenuItem href="#">Menu Item 3</MenuItem>
              </Menu>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>

      <div>
        <h4 className="u-mb-3">Mega Menu</h4>
        <Navbar brand={<LogoBrand />}>
          <Nav alignment="start">
            <NavItem>Home</NavItem>
            <NavDropdown title="Mega Menu" megaMenu={true}>
              <MegaMenu>
                <MegaMenuColumn title="Column 1" icon="icon-lux-circle">
                  <MegaMenuLink href="#">Link 1</MegaMenuLink>
                  <MegaMenuLink href="#">Link 2</MegaMenuLink>
                </MegaMenuColumn>
                <MegaMenuColumn title="Column 2" icon="icon-lux-circle">
                  <MegaMenuLink href="#">Link 1</MegaMenuLink>
                  <MegaMenuLink href="#">Link 2</MegaMenuLink>
                </MegaMenuColumn>
              </MegaMenu>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    </div>
  ),
};
