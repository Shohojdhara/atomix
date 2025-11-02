import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { Toggle } from './Toggle';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    initialOn: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
  },
} as Meta<typeof Toggle>;

const Template: StoryFn<typeof Toggle> = args => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
    <Toggle {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  initialOn: false,
  disabled: false,
};

export const InitiallyOn = Template.bind({});
InitiallyOn.args = {
  initialOn: true,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  initialOn: false,
  disabled: true,
};

export const DisabledOn = Template.bind({});
DisabledOn.args = {
  initialOn: true,
  disabled: true,
};

export const Glass = {
  args: {
    initialOn: false,
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

export const GlassOn = {
  args: {
    initialOn: true,
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

export const GlassCustom = {
  args: {
    initialOn: false,
    disabled: false,
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
