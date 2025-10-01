import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';

const meta = {
  title: 'Components/Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
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
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
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

// Glass variant
export const Glass: Story = {
  args: {
    options: countries,
    placeholder: 'Glass Select',
    glass: true,
  },
  render: (args) => (
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '300px' }}>
        <Select {...args} />
      </div>
    </div>
  ),
};

// Glass with custom settings
export const GlassCustom: Story = {
  args: {
    options: countries,
    placeholder: 'Custom Glass Select',
    glass: {
      displacementScale: 80,
      blurAmount: 2,
      saturation: 200,
      aberrationIntensity: 0.8,
      cornerRadius: 12,
    },
  },
  render: (args) => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '300px' }}>
        <h3 style={{ color: 'white', marginBottom: '1rem', textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          Custom Glass Select
        </h3>
        <Select {...args} />
      </div>
    </div>
  ),
};

// Glass states
export const GlassStates: Story = {
  args: {
    options: countries,
  },
  render: (args) => (
    <div
      style={{
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <div style={{ width: '100%', maxWidth: '300px' }}>
        <h3 style={{ color: 'white', marginBottom: '2rem', textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          Glass Select States
        </h3>
        <div className="u-d-flex u-flex-column u-gap-3">
          <Select options={args.options} placeholder="Glass Select" glass />
          <Select options={args.options} placeholder="Glass Disabled" disabled glass />
          <Select options={args.options} placeholder="Glass Valid" valid value="us" glass />
          <Select options={args.options} placeholder="Glass Invalid" invalid glass />
        </div>
      </div>
    </div>
  ),
};
