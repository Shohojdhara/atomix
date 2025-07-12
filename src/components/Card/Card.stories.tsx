import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Card, ElevationCard } from './index';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
    onClick: { action: 'clicked' },
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
