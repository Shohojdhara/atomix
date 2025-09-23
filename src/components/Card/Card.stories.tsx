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
      <Card {...args} styles={{ ['--atomix-card-width' as string]: '300px' }} />
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
                blurAmount: 0,
                saturation: 160,
                displacementScale: 60,
                aberrationIntensity: 2,
                mode: 'standard',
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
