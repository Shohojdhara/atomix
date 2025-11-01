import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, ElevationCard } from './index';
import { Grid, GridCol } from '../../layouts';
import { Container } from '../../layouts/';

import Icon from '../Icon';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    header: { control: 'text' },
    title: { control: 'text' },
    text: { control: 'text' },
    image: { control: 'text' },
    imageAlt: { control: 'text' },
    footer: { control: 'text' },
    row: { control: 'boolean' },
    flat: { control: 'boolean' },
    active: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic Card
export const Basic: Story = {
  args: {
    title: 'Card Title',
    text: 'This is a basic card with title and text content.',
    className: 'custom-card',
  },
};

// Card with Image
export const WithImage: Story = {
  args: {
    title: 'Card with Image',
    text: 'This card includes an image above the content.',
    image: 'https://placehold.co/600x400',
    imageAlt: 'Placeholder image',
  },
};

// Card with Actions
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

// Row Card
export const Row: Story = {
  args: {
    title: 'Row Layout Card',
    text: 'This card uses a horizontal layout with the image on the left.',
    image: 'https://placehold.co/300x300',
    imageAlt: 'Placeholder',
    row: true,
  },
};

// Flat Card
export const Flat: Story = {
  args: {
    title: 'Flat Style Card',
    text: 'This card uses the flat style with the image extending to the edges.',
    image: 'https://placehold.co/600x400',
    imageAlt: 'Placeholder',
    flat: true,
  },
};

// Clickable Card
export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    text: 'Click me! This card has an onClick handler attached.',
    onClick: () => alert('Card clicked!'),
  },
};

// Elevation Card
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

// Card with Glass Effect
export const WithGlassEffect: Story = {
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

// All Glass Modes Comparison
export const AllGlassModesComparison: Story = {
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
