import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { THEME_COLORS, SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Progress component displays the completion status of a task or process. It provides visual feedback on progress through a horizontal bar that fills based on a percentage value. Progress bars support multiple variants, sizes, and can be used to show loading states, form completion, or any incremental process.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'The progress value as a percentage (0-100)',
      defaultValue: 50,
    },
    variant: {
      control: { type: 'select' },
      options: THEME_COLORS,
      description: 'The color variant of the progress bar',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'The size of the progress bar',
      defaultValue: 'md',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Progress
export const Default: Story = {
  args: {
    value: 50,
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    value: 75,
    variant: 'secondary',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    value: 25,
    variant: 'warning',
    size: 'md',
  },
};

export const Error: Story = {
  args: {
    value: 10,
    variant: 'error',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    value: 60,
    variant: 'primary',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    value: 80,
    variant: 'primary',
    size: 'lg',
  },
};
