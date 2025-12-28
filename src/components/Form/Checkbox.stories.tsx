import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Checkbox component allows users to select one or more options from a set. It supports checked, unchecked, and indeterminate states, and can be used in forms or as standalone controls. Checkboxes provide clear visual feedback and support keyboard navigation.',
      },
    },
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
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
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
  render: (args: any) => (
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

// Glass variant
export const Glass: Story = {
  args: {
    label: 'Glass Checkbox',
    glass: true,
  },
  render: (args: any) => (
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
      <Checkbox {...args} />
    </div>
  ),
};

// Glass with custom settings
export const GlassCustom: Story = {
  args: {
    label: 'Custom Glass Checkbox',
    glass: {
      displacementScale: 80,
      blurAmount: 2,
      saturation: 200,
      aberrationIntensity: 0.8,
      cornerRadius: 12,
    },
  },
  render: (args: any) => (
    <div
      style={{
        background:
          'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Checkbox {...args} />
    </div>
  ),
};

// Glass states
export const GlassStates: Story = {
  render: () => (
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
      <div>
        <h3
          style={{
            color: 'white',
            marginBottom: '2rem',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          Glass Checkbox States
        </h3>
        <div className="u-d-flex u-flex-column u-gap-3">
          <Checkbox label="Glass Checkbox" glass />
          <Checkbox label="Glass Checked" checked glass />
          <Checkbox label="Glass Disabled" disabled glass />
          <Checkbox label="Glass Disabled and Checked" disabled checked glass />
          <Checkbox label="Glass Valid" valid checked glass />
          <Checkbox label="Glass Invalid" invalid glass />
          <Checkbox label="Glass Indeterminate" indeterminate glass />
        </div>
      </div>
    </div>
  ),
};
