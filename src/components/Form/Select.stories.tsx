import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';

const meta = {
  title: 'Components/Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the select is invalid',
    },
    valid: {
      control: 'boolean',
      description: 'Whether the select is valid',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple options can be selected',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
];

// Basic select
export const Basic: Story = {
  args: {
    options: countries,
    placeholder: 'Select a country',
  },
};

// With selected value
export const WithValue: Story = {
  args: {
    options: countries,
    value: 'ca',
    placeholder: 'Select a country',
  },
};

// Interactive select
export const Interactive: Story = {
  args: {
    options: countries,
  },
  render: () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
    };

    return (
      <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
        <Select
          options={countries}
          placeholder="Select a country"
          value={selectedValue}
          onChange={handleChange}
        />
        {selectedValue && (
          <div className="u-mt-3">
            Selected value: <strong>{selectedValue}</strong>
          </div>
        )}
      </div>
    );
  },
};

// Select sizes
export const Sizes: Story = {
  args: {
    options: countries,
  },
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Select size="sm" options={countries} placeholder="Small select" />
      <Select size="md" options={countries} placeholder="Medium select (default)" />
      <Select size="lg" options={countries} placeholder="Large select" />
    </div>
  ),
};

// Select states
export const States: Story = {
  args: {
    options: countries,
  },
  render: () => (
    <div className="u-d-flex u-flex-column u-gap-3" style={{ width: '300px' }}>
      <Select options={countries} placeholder="Default select" />
      <Select options={countries} placeholder="Disabled select" disabled />
      <Select options={countries} placeholder="Valid select" valid value="us" />
      <Select options={countries} placeholder="Invalid select" invalid />
    </div>
  ),
};

// Multiple select
export const Multiple: Story = {
  args: {
    options: countries,
    placeholder: 'Select multiple countries',
    multiple: true,
  },
};

// With disabled options
export const DisabledOptions: Story = {
  args: {
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico', disabled: true },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'fr', label: 'France', disabled: true },
    ],
    placeholder: 'Select a country',
  },
};
