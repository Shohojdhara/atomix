import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Steps } from './Steps';

const meta = {
  title: 'Components/Steps',
  component: Steps,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Steps

## Overview

Steps component displays a sequence of steps in a process or workflow. It provides visual progress indication and can be displayed horizontally or vertically. Steps are ideal for multi-step forms, onboarding flows, or any process that requires clear progress visualization.

## Features

- Horizontal and vertical orientations
- Active step indication
- Customizable step content
- Glass morphism effect
- Accessible design
- Responsive behavior

## Accessibility

- Screen reader: Step status and progress announced appropriately
- ARIA support: Proper roles and properties for step components
- Keyboard support: Accessible via keyboard navigation
- Focus management: Maintains focus on interactive elements

## Usage Examples

### Basic Usage

\`\`\`tsx
<Steps 
  items={[
    { number: 1, text: 'Step 1' },
    { number: 2, text: 'Step 2' },
    { number: 3, text: 'Step 3' },
  ]}
  activeIndex={1}
/>
\`\`\`

### Vertical Orientation

\`\`\`tsx
<Steps 
  items={[
    { number: 1, text: 'Step 1' },
    { number: 2, text: 'Step 2' },
    { number: 3, text: 'Step 3' },
  ]}
  activeIndex={1}
  vertical={true}
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| activeIndex | number | 1 | The index of the currently active step |
| vertical | boolean | false | Whether to display steps vertically |
| glass | boolean | false | Enable glass morphism effect |
| items | StepItem[] | [] | Array of step items with number and text |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeIndex: {
      control: { type: 'number', min: 0 },
      description: 'The index of the currently active step',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },
    vertical: {
      control: { type: 'boolean' },
      description: 'Whether to display steps vertically',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    items: {
      control: { type: 'object' },
      description: 'Array of step items with number and text',
      table: {
        type: { summary: 'StepItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic horizontal steps
export const BasicHorizontal: Story = {
  args: {
    items: [
      { number: 1, text: 'Step 1' },
      { number: 2, text: 'Step 2' },
      { number: 3, text: 'Step 3' },
      { number: 4, text: 'Step 4' },
      { number: 5, text: 'Step 5' },
    ],
    activeIndex: 1,
    vertical: false,
  },
  render: args => (
    <div style={{ padding: '30px' }}>
      <Steps {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default horizontal steps with basic configuration.',
      },
    },
  },
};

// Vertical steps
export const BasicVertical: Story = {
  args: {
    items: [
      { number: 1, text: 'Step 1' },
      { number: 2, text: 'Step 2' },
      { number: 3, text: 'Step 3' },
      { number: 4, text: 'Step 4' },
      { number: 5, text: 'Step 5' },
    ],
    activeIndex: 1,
    vertical: true,
  },
  render: args => (
    <div style={{ padding: '30px' }}>
      <Steps {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Steps displayed in vertical orientation.',
      },
    },
  },
};

// Steps with custom content
export const WithCustomContent: Story = {
  render: args => (
    <div style={{ padding: '30px' }}>
      <Steps {...args} />
    </div>
  ),
  args: {
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
    ],
    activeIndex: 1,
    vertical: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Steps with custom content in each step.',
      },
    },
  },
};

// Steps with custom icons instead of numbers
export const WithIcons: Story = {
  render: args => (
    <div style={{ padding: '30px' }}>
      <Steps {...args} />
    </div>
  ),
  args: {
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
  },
};

// Interactive steps with buttons for navigation
const InteractiveStepsTemplate: React.FC<{ onStepChange?: (index: number) => void }> = ({
  onStepChange,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (stepIndex: number) => {
    setActiveStep(stepIndex);
    if (onStepChange) {
      onStepChange(stepIndex);
    }
  };

  const items = [
    { number: 1, text: 'Step 1' },
    { number: 2, text: 'Step 2' },
    { number: 3, text: 'Step 3' },
    { number: 4, text: 'Step 4' },
    { number: 5, text: 'Step 5' },
  ];

  return (
    <div>
      <Steps items={items} activeIndex={activeStep} onStepChange={handleStepChange} />
      <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          className="c-btn c-btn--primary"
          onClick={() => handleStepChange(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          Previous
        </button>
        <button
          className="c-btn c-btn--primary"
          onClick={() => handleStepChange(Math.min(items.length - 1, activeStep + 1))}
          disabled={activeStep === items.length - 1}
        >
          Next
        </button>
        <span style={{ marginLeft: '15px', alignSelf: 'center' }}>
          Current step: {activeStep + 1} of {items.length}
        </span>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => (
    <div style={{ padding: '30px' }}>
      <InteractiveStepsTemplate />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive steps with navigation controls to demonstrate state management.',
      },
    },
  },
};

// Glass effect horizontal
export const GlassHorizontal: Story = {
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
  render: args => (
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
  parameters: {
    docs: {
      description: {
        story: 'Horizontal steps with glass morphism effect applied.',
      },
    },
  },
};

// Glass effect vertical
export const GlassVertical: Story = {
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
  render: args => (
    <div
      style={{
        background:
          'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
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
  parameters: {
    docs: {
      description: {
        story: 'Vertical steps with glass morphism effect applied.',
      },
    },
  },
};

// Glass effect with custom configuration
export const GlassCustom: Story = {
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
  render: args => (
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
      <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Steps {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal steps with custom glass morphism effect parameters.',
      },
    },
  },
};
