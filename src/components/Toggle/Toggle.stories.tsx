import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Toggle

## Overview

Toggle provides an on/off switch control for binary choices. It offers a more visually distinct alternative to checkboxes for settings, preferences, or feature toggles. Toggles support disabled states and can include glass morphism effects.

## Features

- On/off state control
- Uncontrolled and controlled usage
- Disabled state
- Glass morphism effect
- Accessible design
- Responsive behavior

## Accessibility

- Keyboard support: Toggle with Space or Enter key
- Screen reader: State changes announced appropriately
- ARIA support: Proper roles and properties for toggle components
- Focus management: Visible focus indicators maintained

## Usage Examples

### Basic Usage

\`\`\`tsx
<Toggle 
  defaultChecked={false} 
  onChange={(checked) => console.log(checked)} 
/>
\`\`\`

### Controlled Usage

\`\`\`tsx
<Toggle 
  checked={isEnabled} 
  onChange={setEnabled} 
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| defaultChecked | boolean | false | Whether the toggle is initially on (uncontrolled) |
| checked | boolean | - | Whether the toggle is on (controlled) |
| onChange | (checked: boolean) => void | - | Callback when the toggle state changes |
| disabled | boolean | false | Whether the toggle is disabled |
| glass | boolean | false | Enable glass morphism effect |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is initially on (uncontrolled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is on (controlled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: '-' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback when the toggle state changes',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  render: args => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
      <Toggle {...args} />
    </div>
  ),
  args: {
    defaultChecked: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic toggle with default settings.',
      },
    },
  },
};

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
  parameters: {
    docs: {
      description: {
        story: 'Controlled toggle using checked and onChange.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Toggle that starts in the "on" position.',
      },
    },
  },
};

export const DisabledStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        padding: '30px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Toggle disabled={true} checked={false} />
        <span>Disabled Off</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Toggle disabled={true} checked={true} />
        <span>Disabled On</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle in both disabled states (off and on).',
      },
    },
  },
};

export const WithGlassEffect: Story = {
  render: args => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809)',
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
  args: {
    defaultChecked: false,
    disabled: false,
    glass: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle with glass morphism effect applied.',
      },
    },
  },
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
      borderRadius: 12,
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
