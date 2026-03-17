import type { Meta, StoryObj } from '@storybook/react';
import { TypedButton } from './TypedButton';

const meta: Meta<typeof TypedButton> = {
  title: 'Components/TypedButton',
  component: TypedButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
    },
    disabled: {
      control: 'boolean',
    },
    glass: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'TypedButton Component',
    size: 'md',
    variant: 'primary',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const Glass: Story = {
  args: {
    ...Default.args,
    glass: true,
  },
};
