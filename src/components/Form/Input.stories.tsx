import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'Input type',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'danger', 'warning', 'info'],
      description: 'Color variant of the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the input is invalid',
    },
    valid: {
      control: 'boolean',
      description: 'Whether the input is valid',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic text input
export const Basic: Story = {
  args: {
    placeholder: 'Enter text here',
    type: 'text',
  },
};

// Input sizes
export const Sizes: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input (default)" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

// Input types
export const Types: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="search" placeholder="Search input" />
      <Input type="tel" placeholder="Tel input" />
      <Input type="url" placeholder="URL input" />
    </div>
  ),
};

// Input variants
export const Variants: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Input variant="primary" placeholder="Primary input" />
      <Input variant="secondary" placeholder="Secondary input" />
      <Input variant="success" placeholder="Success input" />
      <Input variant="error" placeholder="Error input" />
      <Input variant="warning" placeholder="Warning input" />
      <Input variant="info" placeholder="Info input" />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Input placeholder="Default input" />
      <Input placeholder="Disabled input" disabled />
      <Input placeholder="Valid input" valid />
      <Input placeholder="Invalid input" invalid />
    </div>
  ),
}; 