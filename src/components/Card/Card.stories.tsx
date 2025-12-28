import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, ElevationCard } from './index';
import { Grid, GridCol } from '../../layouts';
import { Container } from '../../layouts/';
import Icon from '../Icon';
import { SIZES, THEME_COLORS } from '../../lib/constants/components';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Card component provides a flexible container for displaying content with optional headers, images, and footers. Cards are ideal for grouping related information, showcasing products, or presenting content in a structured format. They support multiple variants, sizes, and can be interactive.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'text', description: 'Header content for the card' },
    title: { control: 'text', description: 'Title of the card' },
    text: { control: 'text', description: 'Main text content of the card' },
    image: { control: 'text', description: 'Image URL for the card' },
    imageAlt: { control: 'text', description: 'Alt text for the card image' },
    footer: { control: 'text', description: 'Footer content for the card' },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'Size of the card',
      defaultValue: 'md',
    },
    variant: {
      control: { type: 'select' },
      options: THEME_COLORS,
      description: 'Color variant of the card',
      defaultValue: 'secondary',
    },
    appearance: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost', 'elevated'],
      defaultValue: 'filled',
    },
    elevation: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      defaultValue: 'none',
    },
    row: { control: 'boolean' },
    flat: { control: 'boolean' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    selected: { control: 'boolean' },
    interactive: { control: 'boolean' },
    className: { control: 'text', description: 'Additional CSS class names' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic card with title and text content.
 */
export const Basic: Story = {
  args: {
    title: 'Card Title',
    text: 'This is a basic card with title and text content.',
    className: 'custom-card',
  },
};

/**
 * Card with an image displayed above the content.
 */
export const WithImage: Story = {
  args: {
    title: 'Card with Image',
    text: 'This card includes an image above the content.',
    image: 'https://placehold.co/600x400',
    imageAlt: 'Placeholder image',
  },
};

/**
 * Card with action buttons in the footer.
 */
export const WithActions: Story = {
  args: {
    title: 'Card with Actions',
    text: 'This card includes buttons at the bottom.',
    actions: (
      <React.Fragment>
        <button className="c-btn c-btn--primary c-btn--sm">Learn More</button>
        <button className="c-btn c-btn--secondary c-btn--sm">Cancel</button>
      </React.Fragment>
    ),
  },
};

/**
 * Card with horizontal (row) layout - image on the left, content on the right.
 */
export const Row: Story = {
  args: {
    title: 'Row Layout Card',
    text: 'This card uses a horizontal layout with the image on the left.',
    image: 'https://placehold.co/300x300',
    imageAlt: 'Placeholder',
    row: true,
  },
};

/**
 * Flat style card with image extending to the edges.
 */
export const Flat: Story = {
  args: {
    title: 'Flat Style Card',
    text: 'This card uses the flat style with the image extending to the edges.',
    image: 'https://placehold.co/600x400',
    imageAlt: 'Placeholder',
    flat: true,
  },
};

/**
 * Clickable card with onClick handler.
 */
export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    text: 'Click me! This card has an onClick handler attached.',
    onClick: () => alert('Card clicked!'),
  },
};

/**
 * Card with elevation effect that responds to hover.
 */
export const WithElevation: Story = {
  render: args => (
    <div style={{ padding: '20px', width: '300px' }}>
      <ElevationCard {...args} />
    </div>
  ),
  args: {
    title: 'Elevation Effect Card',
    text: 'Hover over this card to see an elevation effect.',
    image: 'https://picsum.photos/id/0/712/500',
    imageAlt: 'Placeholder',
  },
};

/**
 * Card with glass morphism effect enabled.
 */
export const WithGlassEffect: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a card with glass morphism effect applied, creating a translucent, frosted appearance that works well over colorful backgrounds.',
      },
    },
  },
  render: args => (
    <div
      style={{
        backgroundImage: `url(https://picsum.photos/id/128/1920/1024)`,
        backgroundSize: 'cover',
        height: '80vh',
        width: '90vw',
        display: 'grid',
        borderRadius: '12px',
        placeItems: 'center',
      }}
    >
      <Card {...args} style={{ ['--atomix-card-width' as string]: '300px' }} />
    </div>
  ),
  args: {
    title: 'Card with Glass Effect',
    text: 'This card has a glass morphism effect applied.',
    image: 'https://picsum.photos/id/128/300/150',
    imageAlt: 'Placeholder',
    glass: true,
    actions: (
      <React.Fragment>
        <button className="c-btn c-btn--primary c-btn--sm">Learn More</button>
        <button className="c-btn c-btn--secondary c-btn--sm">Cancel</button>
      </React.Fragment>
    ),
  },
};

// Card with Custom Glass Effect
export const WithCustomGlassEffect: Story = {
  render: args => (
    <div
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1754851582381-04fe7bedd618?q=80&w=3860&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '95vh',
        width: '95vw',
        padding: '20px',
        borderRadius: '12px',
        overflow: 'auto',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Container>
        <Grid alignItems="center">
          <GridCol sm={6} lg={3} className="u-mb-4">
            <Card
              {...args}
              title="Card with Standard Glass"
              text="This card has mode: 'standard' glass  effect. blurAmount: 2,
          saturation: 160,
          displacementScale: 60,
          aberrationIntensity: 2"
              glass={{
                blurAmount: 2,
                saturation: 160,
                displacementScale: 60,
                aberrationIntensity: 2,
                mode: 'standard',
                overLight: false,
              }}
            />
          </GridCol>
          <GridCol sm={6} lg={3} className="u-mb-4">
            <Card
              {...args}
              title="Card with Polar Glass"
              text="This card has mode: 'polar' glass  effect. blurAmount: 2,
          saturation: 160,
          displacementScale: 60,
          aberrationIntensity: 2,"
              glass={{
                blurAmount: 0,
                saturation: 160,
                displacementScale: 60,
                aberrationIntensity: 2,
                mode: 'polar',
                overLight: false,
              }}
            />
          </GridCol>
          <GridCol sm={6} lg={3} className="u-mb-4">
            <Card
              {...args}
              title="Card with Prominent Glass"
              text="This card has mode: 'prominent' glass  effect. blurAmount: 2,
          saturation: 160,
          displacementScale: 60,
          aberrationIntensity: 2,"
              glass={{
                blurAmount: 0,
                saturation: 160,
                displacementScale: 60,
                aberrationIntensity: 2,
                mode: 'prominent',
              }}
            />
          </GridCol>
          <GridCol sm={6} lg={3} className="u-mb-4">
            <Card
              {...args}
              title="Card with Shader Glass"
              text="This card has mode: 'shader' glass  effect. blurAmount: 2,
          saturation: 160,
          displacementScale: 60,
          aberrationIntensity: 2,"
              glass={{
                blurAmount: 0,
                saturation: 160,
                displacementScale: 60,
                aberrationIntensity: 0,
                mode: 'shader',
              }}
            />
          </GridCol>
        </Grid>
      </Container>
    </div>
  ),
  args: {
    // icon: <Icon name="Laptop" />,
    image:
      'https://images.unsplash.com/photo-1754851582381-04fe7bedd618?q=80&w=3860&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    actions: (
      <React.Fragment>
        <button className="c-btn c-btn--primary c-btn--sm">Learn More</button>
        <button className="c-btn c-btn--secondary c-btn--sm">Cancel</button>
      </React.Fragment>
    ),
  },
};

// Glass Mode Variants - Standard
export const GlassModeStandard: Story = {
  render: args => (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '95vh',
        width: '95vw',
        padding: '3rem',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Standard Glass Mode</h3>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
          Classic glass morphism with blur and displacement
        </p>
      </div>
      <div className="u-w-50">
        <Card
          title="Standard Glass Card"
          text="This card uses the standard glass mode with classic blur and displacement effects."
          image="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800"
          imageAlt="Standard glass"
          glass={{
            mode: 'standard',
            displacementScale: 60,
            blurAmount: 2,
            saturation: 160,
            aberrationIntensity: 2,
            elasticity: 0,
          }}
          actions={
            <React.Fragment>
              <button className="c-btn c-btn--primary c-btn--sm">Learn More</button>
              <button className="c-btn c-btn--secondary c-btn--sm">Details</button>
            </React.Fragment>
          }
        />
      </div>
    </div>
  ),
};

// Glass Mode Variants - Polar
export const GlassModePolar: Story = {
  render: args => (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '95vh',
        width: '95vw',
        padding: '3rem',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Polar Glass Mode</h3>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Radial distortion effect from center</p>
      </div>
      <div className="u-w-50">
        <Card
          title="Polar Glass Card"
          text="This card uses the polar glass mode with radial distortion effects emanating from the center."
          image="https://images.unsplash.com/photo-1557683316-973673baf926?w=800"
          imageAlt="Polar glass"
          glass={{
            mode: 'polar',
            displacementScale: 80,
            blurAmount: 1.5,
            saturation: 180,
            aberrationIntensity: 3,
            elasticity: 0,
          }}
          actions={
            <React.Fragment>
              <button className="c-btn c-btn--primary c-btn--sm">Learn More</button>
              <button className="c-btn c-btn--secondary c-btn--sm">Details</button>
            </React.Fragment>
          }
        />
      </div>
    </div>
  ),
};

// Glass Mode Variants - Prominent
export const GlassModeProminent: Story = {
  render: args => (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '95vh',
        width: '95vw',
        padding: '3rem',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Prominent Glass Mode</h3>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Enhanced distortion with maximum depth</p>
      </div>
      <div className="u-w-50">
        <Card
          title="Prominent Glass Card"
          text="This card uses the prominent glass mode with enhanced distortion and maximum visual depth."
          image="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800"
          imageAlt="Prominent glass"
          glass={{
            mode: 'prominent',
            displacementScale: 100,
            blurAmount: 2.5,
            saturation: 200,
            aberrationIntensity: 4,
            elasticity: 0,
          }}
          actions={
            <React.Fragment>
              <button className="c-btn c-btn--primary c-btn--sm">Learn More</button>
              <button className="c-btn c-btn--secondary c-btn--sm">Details</button>
            </React.Fragment>
          }
        />
      </div>
    </div>
  ),
};

// Glass Mode Variants - Shader
export const GlassModeShader: Story = {
  render: args => (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '95vh',
        width: '95vw',
        padding: '3rem',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Shader Glass Mode</h3>
        <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>GPU-accelerated liquid glass effect</p>
      </div>
      <div className="u-w-50">
        <Card
          title="Shader Glass Card"
          text="This card uses the shader glass mode with GPU-accelerated liquid glass effects."
          image="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800"
          imageAlt="Shader glass"
          glass={{
            mode: 'shader',
            shaderVariant: 'liquidGlass',
            displacementScale: 70,
            blurAmount: 1.8,
            saturation: 170,
            elasticity: 0,
          }}
          actions={
            <React.Fragment>
              <button className="c-btn c-btn--primary c-btn--sm">Learn More</button>
              <button className="c-btn c-btn--secondary c-btn--sm">Details</button>
            </React.Fragment>
          }
        />
      </div>
    </div>
  ),
};

/**
 * Comparison of all glass morphism modes side by side.
 */
export const AllGlassModesComparison: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all available glass morphism modes (standard, polar, prominent, shader) to help you choose the right effect for your design.',
      },
    },
  },
  render: () => (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '95vh',
        overflow: 'auto',
      }}
    >
      <Container>
        <h2
          style={{
            textAlign: 'center',
            color: 'white',
            marginBottom: '3rem',
            fontSize: '2rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Glass Mode Cards Comparison
        </h2>

        <Grid alignItems="stretch">
          <GridCol sm={6} lg={3} className="u-mb-4">
            <Card
              title="Standard Glass"
              text="Classic blur and displacement effects for a refined glass appearance."
              image="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400"
              imageAlt="Standard"
              glass={{
                mode: 'standard',
                displacementScale: 60,
                blurAmount: 2,
                saturation: 160,
                aberrationIntensity: 2,
              }}
              actions={<button className="c-btn c-btn--primary c-btn--sm">View</button>}
            />
          </GridCol>

          <GridCol sm={6} lg={3} className="u-mb-4">
            <Card
              title="Polar Glass"
              text="Radial distortion effects emanating from the center point."
              image="https://images.unsplash.com/photo-1557683316-973673baf926?w=400"
              imageAlt="Polar"
              glass={{
                mode: 'polar',
                displacementScale: 80,
                blurAmount: 1.5,
                saturation: 180,
                aberrationIntensity: 3,
              }}
              actions={<button className="c-btn c-btn--secondary c-btn--sm">View</button>}
            />
          </GridCol>

          <GridCol sm={6} lg={3} className="u-mb-4">
            <Card
              title="Prominent Glass"
              text="Enhanced distortion with maximum depth and visual impact."
              image="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400"
              imageAlt="Prominent"
              glass={{
                mode: 'prominent',
                displacementScale: 100,
                blurAmount: 2.5,
                saturation: 200,
                aberrationIntensity: 4,
              }}
              actions={<button className="c-btn c-btn--success c-btn--sm">View</button>}
            />
          </GridCol>

          <GridCol sm={6} lg={3} className="u-mb-4">
            <Card
              title="Shader Glass"
              text="GPU-accelerated liquid glass with smooth animations."
              image="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400"
              imageAlt="Shader"
              glass={{
                mode: 'shader',
                shaderVariant: 'liquidGlass',
                displacementScale: 70,
                blurAmount: 1.8,
                saturation: 170,
              }}
              actions={<button className="c-btn c-btn--info c-btn--sm">View</button>}
            />
          </GridCol>
        </Grid>
      </Container>
    </div>
  ),
};

// Glass Card Gallery
export const GlassCardGallery: Story = {
  render: () => (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '95vh',
        minWidth: '95vw',
        overflow: 'auto',
      }}
    >
      <Container>
        <h2
          style={{
            textAlign: 'center',
            color: 'white',
            marginBottom: '3rem',
            fontSize: '2rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Glass Card Gallery
        </h2>

        <Grid alignItems="stretch">
          <GridCol sm={6} lg={4} className="u-mb-4">
            <Card
              title="Nature Photography"
              text="Explore breathtaking landscapes and natural wonders from around the world."
              image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
              imageAlt="Nature"
              glass={true}
              actions={
                <React.Fragment>
                  <button className="c-btn c-btn--primary c-btn--sm">Explore</button>
                  <button className="c-btn c-btn--outline-primary c-btn--sm">Save</button>
                </React.Fragment>
              }
            />
          </GridCol>

          <GridCol sm={6} lg={4} className="u-mb-4">
            <Card
              title="Urban Architecture"
              text="Discover modern architectural designs and city landscapes."
              image="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600"
              imageAlt="Architecture"
              glass={true}
              actions={
                <React.Fragment>
                  <button className="c-btn c-btn--secondary c-btn--sm">Explore</button>
                  <button className="c-btn c-btn--outline-secondary c-btn--sm">Save</button>
                </React.Fragment>
              }
            />
          </GridCol>

          <GridCol sm={6} lg={4} className="u-mb-4">
            <Card
              title="Abstract Art"
              text="Experience vibrant colors and unique artistic expressions."
              image="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600"
              imageAlt="Abstract"
              glass={true}
              actions={
                <React.Fragment>
                  <button className="c-btn c-btn--success c-btn--sm">Explore</button>
                  <button className="c-btn c-btn--outline-success c-btn--sm">Save</button>
                </React.Fragment>
              }
            />
          </GridCol>

          <GridCol sm={6} lg={4} className="u-mb-4">
            <Card
              title="Ocean Views"
              text="Dive into serene ocean scenes and coastal beauty."
              image="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600"
              imageAlt="Ocean"
              glass={{
                mode: 'polar',
                displacementScale: 70,
                blurAmount: 2,
              }}
              actions={
                <React.Fragment>
                  <button className="c-btn c-btn--info c-btn--sm">Explore</button>
                  <button className="c-btn c-btn--outline-info c-btn--sm">Save</button>
                </React.Fragment>
              }
            />
          </GridCol>

          <GridCol sm={6} lg={4} className="u-mb-4">
            <Card
              title="Mountain Peaks"
              text="Scale the heights with stunning mountain photography."
              image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
              imageAlt="Mountains"
              glass={{
                mode: 'prominent',
                displacementScale: 90,
              }}
              actions={
                <React.Fragment>
                  <button className="c-btn c-btn--warning c-btn--sm">Explore</button>
                  <button className="c-btn c-btn--outline-warning c-btn--sm">Save</button>
                </React.Fragment>
              }
            />
          </GridCol>

          <GridCol sm={6} lg={4} className="u-mb-4">
            <Card
              title="Night Sky"
              text="Gaze at the stars and celestial wonders above."
              image="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600"
              imageAlt="Night Sky"
              glass={{
                mode: 'shader',
                shaderVariant: 'liquidGlass',
              }}
              actions={
                <React.Fragment>
                  <button className="c-btn c-btn--dark c-btn--sm">Explore</button>
                  <button className="c-btn c-btn--outline-dark c-btn--sm">Save</button>
                </React.Fragment>
              }
            />
          </GridCol>
        </Grid>
      </Container>
    </div>
  ),
};

// Glass Card Layouts
export const GlassCardLayouts: Story = {
  render: () => (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '95vh',
        minWidth: '95vw',
        overflow: 'auto',
      }}
    >
      <Container>
        <h2
          style={{
            textAlign: 'center',
            color: 'white',
            marginBottom: '3rem',
            fontSize: '2rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Glass Card Layouts
        </h2>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Standard Layout */}
          <div className="u-w-50">
            <h3
              style={{
                color: 'white',
                marginBottom: '1rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Standard Layout
            </h3>
            <Card
              title="Standard Glass Card"
              text="This is a standard glass card with vertical layout."
              image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
              imageAlt="Standard"
              glass={true}
              actions={
                <React.Fragment>
                  <button className="c-btn c-btn--primary c-btn--sm">Action</button>
                  <button className="c-btn c-btn--outline-primary c-btn--sm">Cancel</button>
                </React.Fragment>
              }
            />
          </div>

          {/* Row Layout */}
          <div className="u-w-50">
            <h3
              style={{
                color: 'white',
                marginBottom: '1rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Row Layout
            </h3>
            <Card
              title="Row Glass Card"
              text="This is a row glass card with horizontal layout."
              image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
              imageAlt="Row"
              row={true}
              glass={{
                mode: 'polar',
                displacementScale: 60,
                elasticity: 0,
              }}
              actions={
                <React.Fragment>
                  <button className="c-btn c-btn--secondary c-btn--sm">Action</button>
                  <button className="c-btn c-btn--outline-secondary c-btn--sm">Cancel</button>
                </React.Fragment>
              }
            />
          </div>

          {/* Flat Layout */}
          <div className="u-w-50">
            <h3
              style={{
                color: 'white',
                marginBottom: '1rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Flat Layout
            </h3>
            <Card
              title="Flat Glass Card"
              text="This is a flat glass card with edge-to-edge image."
              image="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
              imageAlt="Flat"
              flat={true}
              glass={{
                mode: 'shader',
                shaderVariant: 'liquidGlass',
                elasticity: 0,
              }}
              actions={
                <React.Fragment>
                  <button className="c-btn c-btn--success c-btn--sm">Action</button>
                  <button className="c-btn c-btn--outline-success c-btn--sm">Cancel</button>
                </React.Fragment>
              }
            />
          </div>
        </div>
      </Container>
    </div>
  ),
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card
        size="sm"
        title="Small Card"
        text="This is a small card with compact spacing."
        actions={<button className="c-btn c-btn--primary c-btn--sm">Action</button>}
      />
      <Card
        size="md"
        title="Medium Card"
        text="This is a medium card with default spacing."
        actions={<button className="c-btn c-btn--primary c-btn--sm">Action</button>}
      />
      <Card
        size="lg"
        title="Large Card"
        text="This is a large card with spacious padding."
        actions={<button className="c-btn c-btn--primary c-btn--sm">Action</button>}
      />
    </div>
  ),
};

// Color Variants
export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
      <Card variant="primary" title="Primary Card" text="Primary variant card." />
      <Card variant="secondary" title="Secondary Card" text="Secondary variant card." />
      <Card variant="success" title="Success Card" text="Success variant card." />
      <Card variant="error" title="Error Card" text="Error variant card." />
      <Card variant="warning" title="Warning Card" text="Warning variant card." />
      <Card variant="info" title="Info Card" text="Info variant card." />
      <Card variant="light" title="Light Card" text="Light variant card." />
      <Card variant="dark" title="Dark Card" text="Dark variant card." />
    </div>
  ),
};

// Appearance Variants
export const AppearanceVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
      <Card appearance="filled" variant="primary" title="Filled Card" text="Filled appearance with solid background." />
      <Card appearance="outlined" variant="primary" title="Outlined Card" text="Outlined appearance with border only." />
      <Card appearance="ghost" variant="primary" title="Ghost Card" text="Ghost appearance with minimal styling." />
      <Card appearance="elevated" variant="primary" title="Elevated Card" text="Elevated appearance with shadow." />
    </div>
  ),
};

// Elevation Levels
export const ElevationLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card elevation="none" title="No Elevation" text="Card with no shadow." />
      <Card elevation="sm" title="Small Elevation" text="Card with small shadow." />
      <Card elevation="md" title="Medium Elevation" text="Card with medium shadow." />
      <Card elevation="lg" title="Large Elevation" text="Card with large shadow." />
      <Card elevation="xl" title="Extra Large Elevation" text="Card with extra large shadow." />
    </div>
  ),
};

// Disabled State
export const Disabled: Story = {
  args: {
    title: 'Disabled Card',
    text: 'This card is disabled and cannot be interacted with.',
    disabled: true,
    actions: (
      <React.Fragment>
        <button className="c-btn c-btn--primary c-btn--sm">Action</button>
      </React.Fragment>
    ),
  },
};

// Loading State
export const Loading: Story = {
  args: {
    title: 'Loading Card',
    text: 'This card is in a loading state.',
    loading: true,
    actions: (
      <React.Fragment>
        <button className="c-btn c-btn--primary c-btn--sm">Action</button>
      </React.Fragment>
    ),
  },
};

// Selected State
export const Selected: Story = {
  args: {
    title: 'Selected Card',
    text: 'This card is in a selected state.',
    selected: true,
    variant: 'primary',
  },
};

// Interactive Card
export const Interactive: Story = {
  args: {
    title: 'Interactive Card',
    text: 'This card is interactive and responds to hover and click.',
    interactive: true,
    onClick: () => alert('Interactive card clicked!'),
    variant: 'primary',
    elevation: 'md',
  },
};

// Link Card
export const LinkCard: Story = {
  args: {
    title: 'Link Card',
    text: 'This card acts as a link. Click to navigate.',
    href: 'https://example.com',
    target: '_blank',
    variant: 'primary',
    interactive: true,
  },
};

/**
 * Comprehensive example showcasing multiple card features and variants.
 */
export const Comprehensive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive example demonstrating various card features including sizes, variants, appearances, elevations, and states in a grid layout.',
      },
    },
  },
  render: () => (
    <Container>
      <Grid>
        <GridCol sm={6} lg={4}>
          <Card
            size="lg"
            variant="primary"
            appearance="elevated"
            elevation="lg"
            title="Premium Feature"
            text="This is a comprehensive card example with all new features enabled."
            image="https://placehold.co/400x200"
            imageAlt="Feature image"
            interactive
            onClick={() => alert('Card clicked!')}
            actions={
              <React.Fragment>
                <button className="c-btn c-btn--primary c-btn--sm">Get Started</button>
                <button className="c-btn c-btn--outline-primary c-btn--sm">Learn More</button>
              </React.Fragment>
            }
          />
        </GridCol>
        <GridCol sm={6} lg={4}>
          <Card
            size="md"
            variant="success"
            appearance="outlined"
            elevation="md"
            title="Success Card"
            text="This card uses the success variant with outlined appearance."
            selected
            actions={<button className="c-btn c-btn--success c-btn--sm">Action</button>}
          />
        </GridCol>
        <GridCol sm={6} lg={4}>
          <Card
            size="sm"
            variant="error"
            appearance="ghost"
            title="Error Card"
            text="This is a small error card with ghost appearance."
            disabled
            actions={<button className="c-btn c-btn--error c-btn--sm">Action</button>}
          />
        </GridCol>
      </Grid>
    </Container>
  ),
};
