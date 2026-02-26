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
    docs: {
      description: {
        component:
          'The Nav component provides a horizontal navigation bar for organizing links and menu items. It supports various alignment options, can include dropdowns, and provides a clean interface for site navigation. Nav components are essential for primary site navigation and work seamlessly with NavItem and NavDropdown components.',
      },
    },
  },
  tags: ['autodocs'],
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
 * Glass Effect - Default
 *
 * Demonstrates the Nav component with default glass morphism settings.
 * The glass effect provides a modern, frosted appearance that works
 * beautifully against detailed backgrounds.
 */
export const Glass: Story = {
  render: () => (
    <BackgroundWrapper
      backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop"
      overlay
    >
      <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '3rem' }}>
        <h2
          style={{
            color: 'white',
            fontSize: '32px',
            fontWeight: 600,
            marginBottom: '16px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Glass Navigation
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          A modern navigation component with glassmorphism effect. Perfect for creating visually
          stunning interfaces that blend seamlessly with any background.
        </p>
      </div>
      <Nav alignment="center" glass>
        <NavItem href="/" active>
          Home
        </NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/services">Services</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </Nav>
    </BackgroundWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Basic glass morphism effect with default settings. The navigation maintains excellent readability while creating a beautiful frosted glass aesthetic.',
      },
    },
  },
};

/**
 * Glass Float Variants - Top & Bottom
 *
 * Showcases floating navigation with glass effect at different positions.
 * Ideal for fixed navigation bars and mobile-first designs.
 */
export const GlassFloatVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2940&auto=format&fit=crop"
        height="80vh"
      >
        <div style={{ textAlign: 'center', maxWidth: '700px', marginTop: '60px' }}>
          <h3
            style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: 600,
              marginBottom: '12px',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Float Top Center
          </h3>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '16px',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Perfect for hero sections and landing pages
          </p>
        </div>
        <Nav alignment="center" variant="float-top-center" glass>
          <NavItem href="/" active>
            Home
          </NavItem>
          <NavItem href="/explore">Explore</NavItem>
          <NavItem href="/features">Features</NavItem>
          <NavItem href="/pricing">Pricing</NavItem>
        </Nav>
      </BackgroundWrapper>

      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2940&auto=format&fit=crop"
        height="80vh"
      >
        <div style={{ textAlign: 'center', maxWidth: '700px' }}>
          <h3
            style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: 600,
              marginBottom: '12px',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Float Bottom Center
          </h3>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '16px',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            Ideal for mobile navigation and tab bars
          </p>
        </div>
        <Nav alignment="center" variant="float-bottom-center" glass>
          <NavItem href="/" active>
            <HomeIcon />
          </NavItem>
          <NavItem href="/search">
            <UserIcon />
          </NavItem>
          <NavItem href="/settings">
            <SettingsIcon />
          </NavItem>
        </Nav>
      </BackgroundWrapper>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Floating navigation variants that stay fixed at the top or bottom of the viewport. The glass effect creates a sense of depth while maintaining focus on content.',
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
      <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '3rem' }}>
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
          creating unique visual experiences.
        </p>
      </div>
      <Nav
        alignment="center"
        variant="float-top-center"
        glass={{
          displacementScale: 80,
          blurAmount: 2.5,
          borderRadius: 20,
          mode: 'shader',
        }}
      >
        <NavItem href="/" active>
          Home
        </NavItem>
        <NavItem href="/destinations">Destinations</NavItem>
        <NavItem href="/gallery">Gallery</NavItem>
        <NavDropdown title="More">
          <Menu>
            <MenuItem href="/blog">Blog</MenuItem>
            <MenuItem href="/about">About</MenuItem>
            <MenuItem href="/contact">Contact</MenuItem>
          </Menu>
        </NavDropdown>
      </Nav>
    </BackgroundWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Customized glass effect with increased displacement and blur for a more pronounced visual impact. Demonstrates the flexibility of the glass morphism system.',
      },
    },
  },
};

/**
 * Glass with Dropdown Integration
 *
 * Shows how the glass effect integrates seamlessly with dropdown menus,
 * maintaining visual consistency across all interactive elements.
 */
export const GlassWithDropdown: Story = {
  render: () => (
    <BackgroundWrapper
      backgroundImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2940&auto=format&fit=crop"
      overlay
    >
      <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '3rem' }}>
        <h2
          style={{
            color: 'white',
            fontSize: '32px',
            fontWeight: 600,
            marginBottom: '16px',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Glass Navigation with Dropdowns
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          The glass effect extends to dropdown menus, creating a cohesive visual hierarchy
          throughout your navigation.
        </p>
      </div>
      <Nav alignment="center" glass>
        <NavItem href="/" active>
          Home
        </NavItem>
        <NavItem href="/explore">Explore</NavItem>
        <NavDropdown title="Activities">
          <Menu>
            <MenuItem href="/hiking" icon={<HomeIcon />}>
              Hiking
            </MenuItem>
            <MenuItem href="/camping" icon={<UserIcon />}>
              Camping
            </MenuItem>
            <MenuItem href="/wildlife" icon={<SettingsIcon />}>
              Wildlife
            </MenuItem>
          </Menu>
        </NavDropdown>
        <NavItem href="/guides">Guides</NavItem>
        <NavItem href="/contact">Contact</NavItem>
      </Nav>
    </BackgroundWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Glass navigation with integrated dropdown menus. The glass effect is maintained throughout the interaction, providing a consistent and polished user experience.',
      },
    },
  },
};

/**
 * Glass Theme Variations
 *
 * A comprehensive showcase of glass navigation across different themed
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
        <h3
          style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 600,
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Ocean & Travel Theme
        </h3>
        <Nav alignment="center" glass>
          <NavItem href="/" active>
            Home
          </NavItem>
          <NavItem href="/destinations">Destinations</NavItem>
          <NavItem href="/experiences">Experiences</NavItem>
          <NavItem href="/booking">Book Now</NavItem>
        </Nav>
      </BackgroundWrapper>

      {/* Sunset Theme */}
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=2940&auto=format&fit=crop"
        height="70vh"
      >
        <h3
          style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 600,
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Warm & Inviting Theme
        </h3>
        <Nav
          alignment="center"
          glass={{
            displacementScale: 60,
            blurAmount: 2,
            borderRadius: 16,
            mode: 'shader',
          }}
        >
          <NavItem href="/" active>
            Home
          </NavItem>
          <NavItem href="/menu">Menu</NavItem>
          <NavItem href="/reservations">Reservations</NavItem>
          <NavItem href="/about">About Us</NavItem>
        </Nav>
      </BackgroundWrapper>

      {/* Urban Theme */}
      <BackgroundWrapper
        backgroundImage="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2940&auto=format&fit=crop"
        height="70vh"
      >
        <h3
          style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 600,
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          Modern & Professional Theme
        </h3>
        <Nav alignment="center" variant="float-bottom-center" glass>
          <NavItem href="/" active>
            <HomeIcon />
          </NavItem>
          <NavItem href="/portfolio">
            <UserIcon />
          </NavItem>
          <NavItem href="/services">
            <SettingsIcon />
          </NavItem>
        </Nav>
      </BackgroundWrapper>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A comprehensive showcase demonstrating how glass navigation adapts to different themes and color palettes. Each example represents a different use case and aesthetic.',
      },
    },
  },
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
