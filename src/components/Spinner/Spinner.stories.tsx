import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { THEME_COLORS, SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Spinner component provides visual feedback during loading states. It displays an animated loading indicator that can be customized with different variants and sizes. Use spinners to indicate that content is being loaded or processed.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: THEME_COLORS,
      description: 'The color variant of the spinner',
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'The size of the spinner',
    },
    fullscreen: {
      control: 'boolean',
      description: 'Whether the spinner should be centered and fixed in the viewport',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof Spinner>;

// Default Spinner
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    fullscreen: false,
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="u-d-flex u-flex-wrap u-gap-3 u-align-items-center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

// Color Variants
export const ColorVariants: Story = {
  render: () => (
    <div className="u-d-flex u-flex-wrap u-gap-3 u-align-items-center">
      {THEME_COLORS.map(color => (
        <Spinner key={color} variant={color} />
      ))}
    </div>
  ),
};
