import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ColorModeToggle } from './ColorModeToggle';

const meta = {
  title: 'Components/ColorModeToggle',
  component: ColorModeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
} satisfies Meta<typeof ColorModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Color Mode Toggle
export const Default: Story = {
  args: {},
};

// With Custom Class
export const WithCustomClass: Story = {
  args: {
    className: 'custom-class',
  },
};

// Example Usage
export const ExampleUsage: Story = {
  render: () => (
    <div
      className="u-p-5 u-shadow u-d-flex u-justify-content-between u-align-items-center"
      style={{ width: '300px', borderRadius: '8px' }}
    >
      <span>Toggle Theme</span>
      <ColorModeToggle />
    </div>
  ),
};
