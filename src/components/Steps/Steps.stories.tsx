import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { Steps } from './Steps';
import type { StepsProps } from './Steps';

export default {
  title: 'Components/Steps',
  component: Steps,
  argTypes: {
    activeIndex: {
      control: { type: 'number' },
      defaultValue: 1,
    },
    vertical: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
  },
} as Meta<typeof Steps>;

const Template: StoryFn<typeof Steps> = args => (
  <div style={{ padding: '30px' }}>
    <Steps {...args} />
  </div>
);

// Default horizontal steps
export const Default = Template.bind({});
Default.args = {
  items: [
    { number: 1, text: 'Step 1' },
    { number: 2, text: 'Step 2' },
    { number: 3, text: 'Step 3' },
    { number: 4, text: 'Step 4' },
    { number: 5, text: 'Step 5' },
  ],
  activeIndex: 1,
  vertical: false,
};

// Vertical steps
export const Vertical = Template.bind({});
Vertical.args = {
  items: [
    { number: 1, text: 'Step 1' },
    { number: 2, text: 'Step 2' },
    { number: 3, text: 'Step 3' },
    { number: 4, text: 'Step 4' },
    { number: 5, text: 'Step 5' },
  ],
  activeIndex: 1,
  vertical: true,
};

// Steps with custom content
export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  items: [
    {
      number: 1,
      text: 'Registration',
      content: <p style={{ marginTop: '10px', fontSize: '0.85em' }}>Create your account</p>,
    },
    {
      number: 2,
      text: 'Personal Info',
      content: <p style={{ marginTop: '10px', fontSize: '0.85em' }}>Tell us about yourself</p>,
    },
    {
      number: 3,
      text: 'Preferences',
      content: <p style={{ marginTop: '10px', fontSize: '0.85em' }}>Select your preferences</p>,
    },
    {
      number: 4,
      text: 'Payment',
      content: <p style={{ marginTop: '10px', fontSize: '0.85em' }}>Add payment information</p>,
    },
    {
      number: 5,
      text: 'Confirmation',
      content: <p style={{ marginTop: '10px', fontSize: '0.85em' }}>Complete your signup</p>,
    },
  ],
  activeIndex: 1,
  vertical: false,
};

// Steps with custom icons instead of numbers
export const WithIcons = Template.bind({});
WithIcons.args = {
  items: [
    {
      number: <i className="icon-lux-user" style={{ fontSize: '16px' }}></i>,
      text: 'Account',
    },
    {
      number: <i className="icon-lux-settings" style={{ fontSize: '16px' }}></i>,
      text: 'Settings',
    },
    {
      number: <i className="icon-lux-calendar" style={{ fontSize: '16px' }}></i>,
      text: 'Schedule',
    },
    {
      number: <i className="icon-lux-card" style={{ fontSize: '16px' }}></i>,
      text: 'Payment',
    },
    {
      number: <i className="icon-lux-check" style={{ fontSize: '16px' }}></i>,
      text: 'Complete',
    },
  ],
  activeIndex: 1,
  vertical: false,
};

// Interactive steps with buttons for navigation
const InteractiveSteps: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const items = [
    { number: 1, text: 'Step 1' },
    { number: 2, text: 'Step 2' },
    { number: 3, text: 'Step 3' },
    { number: 4, text: 'Step 4' },
    { number: 5, text: 'Step 5' },
  ];

  return (
    <div>
      <Steps items={items} activeIndex={activeStep} onStepChange={setActiveStep} />
      <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
        <button
          className="c-btn c-btn--primary"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          Previous
        </button>
        <button
          className="c-btn c-btn--primary"
          onClick={() => setActiveStep(Math.min(items.length - 1, activeStep + 1))}
          disabled={activeStep === items.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const Interactive: StoryFn<typeof Steps> = () => (
  <div style={{ padding: '30px' }}>
    <InteractiveSteps />
  </div>
);

export const Glass = {
  args: {
    items: [
      { number: 1, text: 'Glass Step 1' },
      { number: 2, text: 'Glass Step 2' },
      { number: 3, text: 'Glass Step 3' },
      { number: 4, text: 'Glass Step 4' },
      { number: 5, text: 'Glass Step 5' },
    ],
    activeIndex: 1,
    vertical: false,
    glass: true,
  },
  render: (args) => (
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
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Steps {...args} />
      </div>
    </div>
  ),
};

export const GlassVertical = {
  args: {
    items: [
      { number: 1, text: 'Glass Step 1' },
      { number: 2, text: 'Glass Step 2' },
      { number: 3, text: 'Glass Step 3' },
      { number: 4, text: 'Glass Step 4' },
      { number: 5, text: 'Glass Step 5' },
    ],
    activeIndex: 1,
    vertical: true,
    glass: true,
  },
  render: (args) => (
    <div
      style={{
        background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        borderRadius: '12px',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Steps {...args} />
      </div>
    </div>
  ),
};

export const GlassCustom = {
  args: {
    items: [
      { number: 1, text: 'Custom Glass Step 1' },
      { number: 2, text: 'Custom Glass Step 2' },
      { number: 3, text: 'Custom Glass Step 3' },
      { number: 4, text: 'Custom Glass Step 4' },
      { number: 5, text: 'Custom Glass Step 5' },
    ],
    activeIndex: 1,
    vertical: false,
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
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Steps {...args} />
      </div>
    </div>
  ),
};
