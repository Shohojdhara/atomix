import type { Meta, StoryObj } from '@storybook/react';
import { AtomixLogo } from '../../AtomixLogo';
import { Icon } from '../../Icon';
import { MegaMenu, MegaMenuColumn, MegaMenuLink } from '../Menu/MegaMenu';
import { Menu, MenuDivider, MenuItem } from '../Menu/Menu';
import { Nav } from '../Nav/Nav';
import { NavDropdown } from '../Nav/NavDropdown';
import { NavItem } from '../Nav/NavItem';
import { Navbar } from './Navbar';

const meta = {
  title: 'Components/Navigation/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Navbar component provides a responsive navigation header with brand, navigation items, and collapsible mobile menu functionality. It follows the Atomix design system guidelines and includes both React and vanilla JavaScript implementations.

## Features

- **Responsive Design**: Automatically collapses on mobile devices
- **Multiple Positions**: Static, fixed top, or fixed bottom positioning
- **Theme Variants**: Support for all theme colors
- **Accessibility**: Full keyboard navigation and screen reader support
- **Dropdown & Mega Menus**: Support for both regular dropdowns and full-width mega menus
- **Vanilla JS Support**: Complete vanilla JavaScript implementation available

## Usage

### Basic Navbar
\`\`\`tsx
<Navbar brand="My App">
  <Nav>
    <NavItem href="/">Home</NavItem>
    <NavItem href="/about">About</NavItem>
  </Nav>
</Navbar>
\`\`\`

### With Dropdown
\`\`\`tsx
<Navbar brand="My App">
  <Nav>
    <NavDropdown title="Services">
      <Menu>
        <MenuItem href="/web">Web Design</MenuItem>
        <MenuItem href="/mobile">Mobile Apps</MenuItem>
      </Menu>
    </NavDropdown>
  </Nav>
</Navbar>
\`\`\`

### Compound Components (Recommended for flexibility)
\`\`\`tsx
<Navbar>
  <Navbar.Container>
    <Navbar.Brand>My App</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav>
        <NavItem href="/">Home</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar.Container>
</Navbar>
\`\`\`

### Vanilla JavaScript
\`\`\`html
<nav class="c-navbar" data-navbar data-collapsible="true">
  <div class="c-navbar__container">
    <a href="/" class="c-navbar__brand">My App</a>
    <button class="c-navbar__toggler" aria-expanded="false">
      <span class="c-navbar__toggler-icon"></span>
    </button>
    <div class="c-navbar__collapse">
      <!-- Navigation content -->
    </div>
  </div>
</nav>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['static', 'fixed', 'fixed-bottom'],
      description: 'Position of the navbar',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'static' },
      },
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
      table: {
        type: { summary: 'ThemeColor' },
        defaultValue: { summary: 'undefined' },
      },
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the navbar should collapse on small screens',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    containerWidth: {
      control: 'text',
      description: 'Custom width for the navbar container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    backdrop: {
      control: 'boolean',
      description: 'Whether to show backdrop when expanded on mobile',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Whether to close navbar when clicking outside',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close navbar on escape key press',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
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
    <div className="u-flex u-flex-column u-gap-3">
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
    <div className="u-flex u-flex-column u-gap-3">
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
      <div className="u-ms-auto u-flex u-items-center">
        <div className="c-search-form u-flex u-gap-2">
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
              <div
                className="c-avatar c-avatar--sm c-avatar--circle"
                style={{
                  backgroundColor: '#7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                JD
              </div>
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
              <div
                className="c-avatar c-avatar--sm c-avatar--circle"
                style={{
                  backgroundColor: '#7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                JD
              </div>
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
    <div className="u-flex u-flex-column u-gap-3">
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
      justifyContent: 'center',
      padding: padding,
      borderRadius: '12px',
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
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      {children}
    </div>
  </div>
);

/**
 * Glass Effect - Default Fixed Navbar
 *
 * Demonstrates the Navbar component with default glass morphism settings
 * in a fixed position. The glass effect provides a modern, frosted appearance.
 */
export const Glass: Story = {
  render: () => (
    <BackgroundWrapper
      backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop"
      overlay
    >
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <Navbar brand={<LogoBrand />} position="fixed" glass>
          <Nav alignment="end">
            <NavItem href="/" active>
              Home
            </NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/services">Services</NavItem>
            <NavItem href="/contact">Contact</NavItem>
          </Nav>
        </Navbar>
      </div>
      <div style={{ textAlign: 'center', maxWidth: '800px', paddingTop: '100px' }}>
        <h2
          style={{
            color: 'white',
            fontSize: '32px',
            fontWeight: 600,
            marginBottom: '16px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Glass Navbar
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          A modern navigation bar with glassmorphism effect. Fixed positioning keeps it accessible
          while the transparent glass aesthetic blends beautifully with any background.
        </p>
      </div>
    </BackgroundWrapper>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Basic glass morphism effect with fixed positioning. The navbar maintains excellent readability while creating a beautiful frosted glass aesthetic that stays at the top of the viewport.',
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
      backgroundImage="https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2940&auto=format&fit=crop"
      overlay
    >
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <Navbar
          brand={<LogoBrand />}
          position="fixed"
          glass={{
            displacementScale: 100,
            blurAmount: 2.5,
            cornerRadius: 0,
            mode: 'shader',
          }}
        >
          <Nav alignment="end">
            <NavItem href="/" active>
              Home
            </NavItem>
            <NavItem href="/destinations">Destinations</NavItem>
            <NavDropdown title="Explore">
              <Menu>
                <MenuItem href="/beaches" icon={<Icon name="Sun" />}>
                  Beaches
                </MenuItem>
                <MenuItem href="/diving" icon={<Icon name="Waves" />}>
                  Diving
                </MenuItem>
                <MenuDivider />
                <MenuItem href="/resorts" icon={<Icon name="House" />}>
                  Resorts
                </MenuItem>
              </Menu>
            </NavDropdown>
            <NavItem href="/contact">Contact</NavItem>
          </Nav>
        </Navbar>
      </div>
      <div style={{ textAlign: 'center', maxWidth: '800px', paddingTop: '100px' }}>
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
          Enhanced glass effect with custom displacement and blur. Perfect for creating unique
          visual experiences with more pronounced depth and refraction.
        </p>
      </div>
    </BackgroundWrapper>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Customized glass effect with increased displacement and blur for a more pronounced visual impact. The sharp corners (cornerRadius: 0) create a modern, edge-to-edge aesthetic.',
      },
    },
  },
};

/**
 * Glass with Dropdown & Mega Menu
 *
 * Shows how the glass effect integrates seamlessly with dropdown menus
 * and mega menus, maintaining visual consistency.
 */

export const GlassWithMegaMenu: Story = {
  render: () => (
    <BackgroundWrapper
      backgroundImage="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2940&auto=format&fit=crop"
      overlay
    >
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <Navbar brand={<LogoBrand />} position="fixed" glass>
          <Nav alignment="end">
            <NavItem href="/" active>
              Home
            </NavItem>
            <NavDropdown title="Products" megaMenu>
              <MegaMenu>
                <MegaMenuColumn title="Web Design" icon="icon-lux-circle">
                  <MegaMenuLink href="/web/templates">Templates</MegaMenuLink>
                  <MegaMenuLink href="/web/themes">Themes</MegaMenuLink>
                  <MegaMenuLink href="/web/plugins">Plugins</MegaMenuLink>
                </MegaMenuColumn>
                <MegaMenuColumn title="Development" icon="icon-lux-circle">
                  <MegaMenuLink href="/dev/frameworks">Frameworks</MegaMenuLink>
                  <MegaMenuLink href="/dev/libraries">Libraries</MegaMenuLink>
                  <MegaMenuLink href="/dev/tools">Tools</MegaMenuLink>
                </MegaMenuColumn>
                <MegaMenuColumn title="Marketing" icon="icon-lux-circle">
                  <MegaMenuLink href="/marketing/seo">SEO Tools</MegaMenuLink>
                  <MegaMenuLink href="/marketing/social">Social Media</MegaMenuLink>
                  <MegaMenuLink href="/marketing/analytics">Analytics</MegaMenuLink>
                </MegaMenuColumn>
              </MegaMenu>
            </NavDropdown>
            <NavItem href="/pricing">Pricing</NavItem>
            <NavItem href="/about">About</NavItem>
          </Nav>
        </Navbar>
      </div>
      <div style={{ textAlign: 'center', maxWidth: '800px', paddingTop: '100px' }}>
        <h2
          style={{
            color: 'white',
            fontSize: '32px',
            fontWeight: 600,
            marginBottom: '16px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Glass with Mega Menu
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          The glass effect seamlessly extends to mega menu dropdowns, creating a cohesive visual
          experience perfect for e-commerce and content-rich websites.
        </p>
      </div>
    </BackgroundWrapper>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Glass navbar with integrated mega menu. The glass effect maintains consistency throughout complex navigation structures, providing a polished and professional appearance.',
      },
    },
  },
};

/**
 * Glass Theme Variations
 *
 * A comprehensive showcase of glass navbar across different themed
 * backgrounds, demonstrating versatility and variant support.
 */
export const GlassThemeShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Nature Theme */}
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2940&auto=format&fit=crop"
        height="70vh"
      >
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <Navbar brand={<LogoBrand />} position="fixed" glass>
            <Nav alignment="end">
              <NavItem href="/" active>
                Home
              </NavItem>
              <NavItem href="/explore">Explore</NavItem>
              <NavItem href="/adventures">Adventures</NavItem>
              <NavItem href="/contact">Contact</NavItem>
            </Nav>
          </Navbar>
        </div>
        <div style={{ paddingTop: '100px', textAlign: 'center' }}>
          <h3
            style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: 600,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Nature & Adventure Theme
          </h3>
        </div>
      </BackgroundWrapper>

      {/* Urban Theme - Dark Variant */}
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2940&auto=format&fit=crop"
        height="70vh"
      >
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <Navbar brand={<LogoBrand />} position="fixed" variant="dark" glass>
            <Nav alignment="end">
              <NavItem href="/" active>
                Home
              </NavItem>
              <NavItem href="/portfolio">Portfolio</NavItem>
              <NavItem href="/services">Services</NavItem>
              <NavItem href="/blog">Blog</NavItem>
            </Nav>
          </Navbar>
        </div>
        <div style={{ paddingTop: '100px', textAlign: 'center' }}>
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
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <Navbar
            brand={<LogoBrand />}
            position="fixed"
            glass={{
              displacementScale: 60,
              blurAmount: 2,
              cornerRadius: 0,
              mode: 'shader',
            }}
          >
            <Nav alignment="end">
              <NavItem href="/" active>
                Home
              </NavItem>
              <NavItem href="/destinations">Destinations</NavItem>
              <NavItem href="/experiences">Experiences</NavItem>
              <NavItem href="/booking">Book Now</NavItem>
            </Nav>
          </Navbar>
        </div>
        <div style={{ paddingTop: '100px', textAlign: 'center' }}>
          <h3
            style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: 600,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Travel & Hospitality Theme
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
          'A comprehensive showcase demonstrating how glass navbar adapts to different themes, color palettes, and content types. Each example represents a distinct use case with appropriate styling.',
      },
    },
  },
};

/**
 * Compound Component Pattern
 *
 * Demonstrates the use of the Compound Component Pattern for the Navbar.
 * This pattern provides greater flexibility in structure and layout.
 */
export const CompoundComponents: Story = {
  render: () => (
    <Navbar>
      <Navbar.Container>
        <Navbar.Brand>
          <LogoBrand />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav alignment="end">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/services">Services</NavItem>
            <NavItem href="/contact">Contact</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar.Container>
    </Navbar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use `Navbar.Brand`, `Navbar.Toggle`, and `Navbar.Collapse` within `Navbar.Container` for full control over the layout.',
      },
    },
  },
};
