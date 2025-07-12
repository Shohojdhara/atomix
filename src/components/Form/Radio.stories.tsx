import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Form/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Radio button label text',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the radio button is invalid',
    },
    valid: {
      control: 'boolean',
      description: 'Whether the radio button is valid',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic radio button
export const Basic: Story = {
  args: {
    label: 'Option 1',
    name: 'option',
    value: 'option1',
  },
};

// Checked state
export const Checked: Story = {
  args: {
    label: 'Option 1',
    name: 'option',
    value: 'option1',
    checked: true,
  },
};

// Radio button group
export const RadioGroup: Story = {
  render: args => (
    <div className="u-d-flex u-flex-column u-gap-2">
      <Radio label="Option 1" name="radioGroup" value="option1" checked />
      <Radio label="Option 2" name="radioGroup" value="option2" />
      <Radio label="Option 3" name="radioGroup" value="option3" />
    </div>
  ),
};

// Radio button states
export const States: Story = {
  render: args => (
    <div className="u-d-flex u-flex-column u-gap-2">
      <Radio label="Default radio" name="states" value="default" />
      <Radio label="Checked radio" name="states" value="checked" checked />
      <Radio label="Disabled radio" name="states" value="disabled" disabled />
      <Radio
        label="Disabled and checked radio"
        name="states"
        value="disabledChecked"
        disabled
        checked
      />
      <Radio label="Valid radio" name="states" value="valid" valid checked />
      <Radio label="Invalid radio" name="states" value="invalid" invalid />
    </div>
  ),
};

// Without label
export const WithoutLabel: Story = {
  args: {
    name: 'noLabel',
    value: 'noLabel',
    ariaLabel: 'Radio button without visible label',
  },
};
