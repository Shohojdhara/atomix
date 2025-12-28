import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';
import { THEME_COLORS, SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Rating component allows users to display and interact with star-based ratings. It supports whole and half-star ratings, customizable maximum values, and can be used in both interactive and read-only modes. Ratings are ideal for product reviews, user feedback, or any scenario requiring visual rating input.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'The current rating value',
    },
    maxValue: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'The maximum rating value',
    },
    allowHalf: {
      control: 'boolean',
      description: 'Whether to allow half-star ratings',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the rating is read-only',
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'The size of the rating stars',
    },
    color: {
      control: { type: 'select' },
      options: THEME_COLORS,
      description: 'The color variant of the rating',
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Rating
export const Default: Story = {
  args: {
    value: 3,
    maxValue: 5,
    allowHalf: false,
    readOnly: false,
    size: 'md',
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    maxValue: 5,
    allowHalf: false,
    readOnly: true,
    size: 'md',
  },
};

export const HalfStars: Story = {
  args: {
    value: 3.5,
    maxValue: 5,
    allowHalf: true,
    readOnly: true,
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    value: 4,
    maxValue: 5,
    allowHalf: false,
    readOnly: true,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    value: 4,
    maxValue: 5,
    allowHalf: false,
    readOnly: true,
    size: 'lg',
  },
};

export const CustomColor: Story = {
  args: {
    value: 4,
    maxValue: 5,
    allowHalf: false,
    readOnly: true,
    size: 'md',
    color: 'warning',
  },
};

export const Interactive: Story = {
  render: () => {
    const [rating, setRating] = useState(3);
    return (
      <div>
        <p>Selected rating: {rating}</p>
        <Rating value={rating} onChange={setRating} allowHalf={true} />
      </div>
    );
  },
};

export const CustomMaxValue: Story = {
  args: {
    value: 7,
    maxValue: 10,
    allowHalf: false,
    readOnly: true,
    size: 'md',
  },
};

export const Glass: Story = {
  args: {
    value: 4,
    maxValue: 5,
    allowHalf: false,
    readOnly: true,
    size: 'md',
    glass: true,
  },
  render: (args: any) => (
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Rating {...args} />
    </div>
  ),
};

export const GlassInteractive: Story = {
  args: {
    value: 3,
    maxValue: 5,
    allowHalf: true,
    readOnly: false,
    size: 'md',
    glass: true,
  },
  render: (args: any) => (
    <div
      style={{
        background:
          'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h3
          style={{ color: 'white', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          Interactive Glass Rating
        </h3>
        <Rating {...args} />
      </div>
    </div>
  ),
};

export const GlassCustom: Story = {
  args: {
    value: 4.5,
    maxValue: 5,
    allowHalf: true,
    readOnly: true,
    size: 'lg',
    color: 'warning',
    glass: {
      displacementScale: 80,
      blurAmount: 2,
      saturation: 200,
      aberrationIntensity: 0.8,
      cornerRadius: 12,
    },
  },
  render: (args: any) => (
    <div
      style={{
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <div style={{ textAlign: 'center' }}>
        <h3
          style={{ color: 'white', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          Custom Glass Rating
        </h3>
        <Rating {...args} />
      </div>
    </div>
  ),
};
