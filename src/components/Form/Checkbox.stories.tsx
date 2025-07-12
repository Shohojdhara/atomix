import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Checkbox label text',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the checkbox is invalid',
    },
    valid: {
      control: 'boolean',
      description: 'Whether the checkbox is valid',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic checkbox
export const Basic: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

// Checked state
export const Checked: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: true,
  },
};

// Checkbox states
export const States: Story = {
  render: args => (
    <div className="u-d-flex u-flex-column u-gap-3">
      <Checkbox label="Default checkbox" />
      <Checkbox label="Checked checkbox" checked />
      <Checkbox label="Disabled checkbox" disabled />
      <Checkbox label="Disabled and checked checkbox" disabled checked />
      <Checkbox label="Valid checkbox" valid checked />
      <Checkbox label="Invalid checkbox" invalid />
      <Checkbox label="Indeterminate checkbox" indeterminate />
    </div>
  ),
};

// Without label
export const WithoutLabel: Story = {
  args: {
    ariaLabel: 'Checkbox without visible label',
  },
};
