import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Toggle component provides an on/off switch control for binary choices. It offers a more visually distinct alternative to checkboxes for settings, preferences, or feature toggles. Toggles support disabled states and can include glass morphism effects.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is initially on (uncontrolled)',
      defaultValue: false,
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is on (controlled)',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when the toggle state changes',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is disabled',
      defaultValue: false,
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
      <Toggle {...args} />
    </div>
  ),
  args: {
    defaultChecked: false,
    disabled: false,
  },
};

/**
 * Controlled Toggle using checked and onChange.
 */
export const Controlled: Story = {
  render: () => {
    const [isChecked, setIsChecked] = React.useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <p>Checked: {isChecked ? 'Yes' : 'No'}</p>
        <Toggle checked={isChecked} onChange={setIsChecked} />
      </div>
    );
  },
};

export const InitiallyOn: Story = {
  render: args => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
      <Toggle {...args} />
    </div>
  ),
  args: {
    defaultChecked: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  render: args => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
      <Toggle {...args} />
    </div>
  ),
  args: {
    defaultChecked: false,
    disabled: true,
  },
};

export const DisabledOn: Story = {
  render: args => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
      <Toggle {...args} />
    </div>
  ),
  args: {
    defaultChecked: true,
    disabled: true,
  },
};

export const Glass: Story = {
  args: {
    defaultChecked: false,
    disabled: false,
    glass: true,
  },
  render: (args: any) => (
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Toggle {...args} />
    </div>
  ),
};

export const GlassOn: Story = {
  args: {
    defaultChecked: true,
    disabled: false,
    glass: true,
  },
  render: (args: any) => (
    <div
      style={{
        background:
          'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Toggle {...args} />
    </div>
  ),
};

export const GlassCustom: Story = {
  args: {
    defaultChecked: false,
    disabled: false,
    glass: {
      displacementScale: 80,
      blurAmount: 2,
      saturation: 200,
      aberrationIntensity: 0.8,
      cornerRadius: 12,
      children: <div>Custom glass</div>,
    },
  },
  render: (args: any) => (
    <div
      style={{
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        padding: '3rem',
        borderRadius: '12px',
        minHeight: '200px',
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
      <Toggle {...args} />
    </div>
  ),
};
