import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    text: { control: 'text' },
    image: { control: 'text' },
    imageAlt: { control: 'text' },
    row: { control: 'boolean' },
    flat: { control: 'boolean' },
    active: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Card
export const Default: Story = {
  args: {
    title: 'Card Title',
    text: 'This is some sample text that would go in a card. It provides additional details and context about the subject of the card.',
  },
};

// Card with Image
export const WithImage: Story = {
  args: {
    title: 'Card with Image',
    text: 'Cards can include images at the top to provide visual context.',
    image: 'https://placehold.co/600x400',
    imageAlt: 'Placeholder image',
  },
};

// Card with Icon
export const WithIcon: Story = {
  args: {
    title: 'Card with Icon',
    text: 'This card includes an icon that can be used to represent the content category.',
    icon: '🚀',
  },
};

// Card with Actions
export const WithActions: Story = {
  args: {
    title: 'Card with Actions',
    text: 'This card includes action buttons at the bottom.',
    actions: (
      <>
        <Button label="Primary" variant="primary" size="sm" />
        <Button label="Secondary" variant="secondary" size="sm" />
      </>
    ),
  },
};

// Row Card (horizontal layout)
export const Row: Story = {
  args: {
    title: 'Horizontal Card',
    text: 'This card uses the row layout, which arranges content horizontally instead of vertically.',
    image: 'https://placehold.co/300x300',
    imageAlt: 'Placeholder image',
    row: true,
  },
};

// Flat Card (no padding on image)
export const Flat: Story = {
  args: {
    title: 'Flat Card',
    text: 'This card uses the flat style, which removes padding and allows the image to extend to the edges.',
    image: 'https://placehold.co/600x400',
    imageAlt: 'Placeholder image',
    flat: true,
  },
};

// Card with Header and Footer
export const WithHeaderAndFooter: Story = {
  args: {
    header: <div className="u-p-2 u-bg-subtle">Card Header</div>,
    title: 'Card with Header & Footer',
    text: 'This card includes a header and footer section.',
    footer: <div className="u-p-2 u-bg-subtle">Card Footer</div>,
  },
};

// Clickable Card
export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    text: 'This card is clickable. Click me!',
    onClick: () => alert('Card clicked!'),
  },
}; 