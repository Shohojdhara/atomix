import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Callout } from './Callout';
import { Icon } from '../Icon/Icon';

const meta = {
  title: 'Components/Callout',
  component: Callout,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Callout

## Overview

The Callout component is used to display important messages, alerts, or notifications to the user. It can be used for success, warning, error, or informational messages.

## Features

- Multiple variants (primary, secondary, success, error, warning, info, light, dark)
- Compact mode
- Toast mode
- Glass morphism support
- Custom icons
- Action buttons
- Compound Component Pattern (new)

## Usage

### Basic Usage

\`\`\`tsx
<Callout title="Callout Title">
  This is the content of the callout.
</Callout>
\`\`\`

### Compound Component Usage

\`\`\`tsx
<Callout>
  <Callout.Content>
    <Callout.Icon>
      <Icon name="Info" />
    </Callout.Icon>
    <Callout.Message>
      <Callout.Title>Custom Layout</Callout.Title>
      <Callout.Text>
        This callout uses the compound component pattern for full control over layout.
      </Callout.Text>
    </Callout.Message>
  </Callout.Content>
  <Callout.Actions>
    <button>Action</button>
  </Callout.Actions>
</Callout>
\`\`\`

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| variant | 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'light' \| 'dark' | 'primary' | The visual style of the callout |
| title | ReactNode | - | The title of the callout |
| children | ReactNode | - | The content of the callout |
| icon | ReactNode | - | Custom icon to display |
| onClose | () => void | - | Callback function when the close button is clicked |
| actions | ReactNode | - | Action buttons to display |
| compact | boolean | false | Whether to use compact styling |
| isToast | boolean | false | Whether to style as a toast notification |
| glass | boolean \| object | false | Whether to apply glass morphism effect |
| className | string | - | Additional CSS class names |
| style | CSSProperties | - | Inline styles |
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'light',
        'dark',
      ],
      description: 'The visual style of the callout',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    title: {
      control: 'text',
      description: 'The title of the callout',
    },
    children: {
      control: 'text',
      description: 'The content of the callout',
    },
    compact: {
      control: 'boolean',
      description: 'Whether to use compact styling',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isToast: {
      control: 'boolean',
      description: 'Whether to style as a toast notification',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    glass: {
      control: 'boolean',
      description: 'Whether to apply glass morphism effect',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Primary Callout',
    children: 'This is a primary callout message.',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    title: 'Success Message',
    children: 'Operation completed successfully.',
    variant: 'success',
    icon: <Icon name="CheckCircle" size="md" />,
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning',
    children: 'Please be careful with this action.',
    variant: 'warning',
    icon: <Icon name="Warning" size="md" />,
  },
};

export const Error: Story = {
  args: {
    title: 'Error Occurred',
    children: 'An error occurred while processing your request.',
    variant: 'error',
    icon: <Icon name="WarningCircle" size="md" />,
  },
};

export const Info: Story = {
  args: {
    title: 'Information',
    children: 'Here is some useful information.',
    variant: 'info',
    icon: <Icon name="Info" size="md" />,
  },
};

export const WithActions: Story = {
  args: {
    title: 'Callout with Actions',
    children: 'This callout includes action buttons.',
    variant: 'primary',
    actions: (
      <>
        <button className="c-btn c-btn--sm c-btn--outline-light u-mr-2">Cancel</button>
        <button className="c-btn c-btn--sm c-btn--light">Confirm</button>
      </>
    ),
  },
};

export const Compact: Story = {
  args: {
    title: 'Compact Callout',
    children: 'This is a compact callout.',
    compact: true,
    variant: 'info',
  },
};

export const Dismissible: Story = {
  render: args => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button className="c-btn c-btn--primary" onClick={() => setVisible(true)}>
          Show Callout
        </button>
      );
    }

    return (
      <Callout
        {...args}
        onClose={() => setVisible(false)}
      />
    );
  },
  args: {
    title: 'Dismissible Callout',
    children: 'Click the X icon to dismiss this callout.',
    variant: 'success',
  },
};

export const CompoundUsage: Story = {
  render: args => (
    <Callout {...args}>
      <Callout.Content>
        <Callout.Icon>
          <Icon name="Star" size="md" />
        </Callout.Icon>
        <Callout.Message>
          <Callout.Title>Custom Layout</Callout.Title>
          <Callout.Text>
            This callout uses the compound component pattern (Callout.Content, Callout.Icon, Callout.Message, etc.) for full control.
          </Callout.Text>
        </Callout.Message>
      </Callout.Content>
      <Callout.Actions>
        <button className="c-btn c-btn--sm c-btn--outline-primary">Custom Action</button>
      </Callout.Actions>
      <Callout.CloseButton onClick={() => alert('Closed!')} />
    </Callout>
  ),
  args: {
    variant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the Compound Component usage pattern.',
      },
    },
  },
};

export const GlassEffect: Story = {
  args: {
    title: 'Glass Callout',
    children: 'This callout has a glass morphism effect.',
    glass: true,
    variant: 'primary',
  },
  render: args => (
    <div
      style={{
        padding: '2rem',
        backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800)',
        backgroundSize: 'cover',
        borderRadius: '8px',
      }}
    >
      <Callout {...args} />
    </div>
  ),
};
