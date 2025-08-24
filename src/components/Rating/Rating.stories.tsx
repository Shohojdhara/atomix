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
