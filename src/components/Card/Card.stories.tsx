import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Card, ElevationCard, FlipCard } from './index';

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
  render: (args) => (
    <Card {...args}>
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
        <button style={{ padding: '8px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '4px' }}>
          Learn More
        </button>
        <button style={{ padding: '8px 16px', background: '#555555', color: 'white', border: 'none', borderRadius: '4px' }}>
          Cancel
        </button>
      </div>
    </Card>
  ),
  args: {
    title: 'Card with Actions',
    text: 'This card includes buttons at the bottom.',
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
  render: (args) => (
    <div style={{ padding: '20px' }}>
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

// Flip Card
export const FlipCardStory: Story = {
  render: () => (
    <div style={{ width: '300px', height: '300px' }}>
      <FlipCard 
        front={
          <div style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3>Front Side</h3>
            <p>Click this card to see the back side.</p>
          </div>
        }
        back={
          <div style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f0f8ff' }}>
            <h3>Back Side</h3>
            <p>Click again to flip back to the front.</p>
          </div>
        }
      />
    </div>
  ),
};

// Hover Flip Card
export const HoverFlipCard: Story = {
  render: () => (
    <div style={{ width: '300px', height: '300px' }}>
      <FlipCard 
        front={
          <div style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3>Front Side</h3>
            <p>Hover over this card to see the back side.</p>
          </div>
        }
        back={
          <div style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f0f8ff' }}>
            <h3>Back Side</h3>
            <p>Move your cursor away to flip back.</p>
          </div>
        }
        trigger="hover"
      />
    </div>
  ),
}; 