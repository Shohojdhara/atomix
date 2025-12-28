import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Form/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Radio component allows users to select a single option from a group of mutually exclusive options. Radio buttons are typically used in groups where only one selection is allowed. They provide clear visual feedback and support keyboard navigation.',
      },
    },
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
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
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
  render: (args: any) => (
    <div className="u-d-flex u-flex-column u-gap-2">
      <Radio label="Option 1" name="radioGroup" value="option1" checked />
      <Radio label="Option 2" name="radioGroup" value="option2" />
      <Radio label="Option 3" name="radioGroup" value="option3" />
    </div>
  ),
};

// Radio button states
export const States: Story = {
  render: (args: any) => (
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

// Glass variant
export const Glass: Story = {
  args: {
    label: 'Glass Radio',
    name: 'glass',
    value: 'glass',
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
      <Radio {...args} />
    </div>
  ),
};

// Glass with custom settings
export const GlassCustom: Story = {
  args: {
    label: 'Custom Glass Radio',
    name: 'glassCustom',
    value: 'glassCustom',
    glass: {
      displacementScale: 80,
      blurAmount: 2,
      saturation: 200,
      aberrationIntensity: 0.8,
      cornerRadius: 12,
    } as any,
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
      <Radio {...args} />
    </div>
  ),
};

// Glass radio group
export const GlassGroup: Story = {
  render: () => (
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <h3
          style={{
            color: 'white',
            marginBottom: '2rem',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          Glass Radio Group
        </h3>
        <div className="u-d-flex u-flex-column u-gap-2">
          <Radio label="Glass Option 1" name="glassGroup" value="option1" checked glass />
          <Radio label="Glass Option 2" name="glassGroup" value="option2" glass />
          <Radio label="Glass Option 3" name="glassGroup" value="option3" glass />
        </div>
      </div>
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
        minHeight: '500px',
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
          Glass Radio States
        </h3>
        <div className="u-d-flex u-flex-column u-gap-2">
          <Radio label="Glass Default" name="glassStates" value="default" glass />
          <Radio label="Glass Checked" name="glassStates" value="checked" checked glass />
          <Radio label="Glass Disabled" name="glassStates" value="disabled" disabled glass />
          <Radio
            label="Glass Disabled and Checked"
            name="glassStates"
            value="disabledChecked"
            disabled
            checked
            glass
          />
          <Radio label="Glass Valid" name="glassStates" value="valid" valid checked glass />
          <Radio label="Glass Invalid" name="glassStates" value="invalid" invalid glass />
        </div>
      </div>
    </div>
  ),
};
