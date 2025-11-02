import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { Rating } from './Rating';
import type { RatingProps } from '../../lib/types/components';

export default {
  title: 'Components/Rating',
  component: Rating,
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    maxValue: { control: { type: 'number', min: 1, max: 10 } },
    allowHalf: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
    },
    color: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'light', 'dark'],
      },
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Rating component for displaying and collecting star ratings',
      },
    },
  },
} as Meta;

const Template: StoryFn<RatingProps> = (args: RatingProps) => <Rating {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 3,
  maxValue: 5,
  allowHalf: false,
  readOnly: false,
  size: 'md',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  value: 4,
  maxValue: 5,
  allowHalf: false,
  readOnly: true,
  size: 'md',
};

export const HalfStars = Template.bind({});
HalfStars.args = {
  value: 3.5,
  maxValue: 5,
  allowHalf: true,
  readOnly: true,
  size: 'md',
};

export const Small = Template.bind({});
Small.args = {
  value: 4,
  maxValue: 5,
  allowHalf: false,
  readOnly: true,
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  value: 4,
  maxValue: 5,
  allowHalf: false,
  readOnly: true,
  size: 'lg',
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  value: 4,
  maxValue: 5,
  allowHalf: false,
  readOnly: true,
  size: 'md',
  color: 'warning',
};

export const Interactive: StoryFn<RatingProps> = () => {
  const [rating, setRating] = useState(3);

  return (
    <div>
      <p>Selected rating: {rating}</p>
      <Rating value={rating} onChange={setRating} allowHalf={true} />
    </div>
  );
};

export const CustomMaxValue = Template.bind({});
CustomMaxValue.args = {
  value: 7,
  maxValue: 10,
  allowHalf: false,
  readOnly: true,
  size: 'md',
};

export const Glass = {
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

export const GlassInteractive = {
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

export const GlassCustom = {
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
