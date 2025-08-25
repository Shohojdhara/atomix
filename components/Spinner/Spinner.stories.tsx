import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'light', 'dark'],
      description: 'The color variant of the spinner',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
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
      <Spinner variant="primary" />
      <Spinner variant="secondary" />
      <Spinner variant="success" />
      <Spinner variant="info" />
      <Spinner variant="warning" />
      <Spinner variant="error" />
      <Spinner variant="light" />
      <Spinner variant="dark" />
    </div>
  ),
};
