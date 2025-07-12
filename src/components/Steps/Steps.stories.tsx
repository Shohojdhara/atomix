import React from 'react';
import { StoryFn, Meta } from '@storybook/react-webpack5';
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
    onStepChange: { action: 'step changed' },
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
