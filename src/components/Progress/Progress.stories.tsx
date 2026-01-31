import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Progress } from './Progress';
import { THEME_COLORS, SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Progress

## Overview

Progress displays the completion status of a task or process. It provides visual feedback on progress through a horizontal bar that fills based on a percentage value. Progress bars support multiple variants, sizes, and can be used to show loading states, form completion, or any incremental process.

## Features

- Multiple color variants (primary, secondary, success, warning, error, etc.)
- Multiple size options (sm, md, lg)
- Percentage-based value tracking
- Accessible design
- Responsive behavior
- Smooth transitions

## Accessibility

- Screen reader: Progress value announced appropriately
- ARIA support: Proper roles and properties for progress bar
- Keyboard support: Accessible via keyboard navigation
- Focus management: Focus indicators maintained for interactive elements

## Usage Examples

### Basic Usage

\`\`\`tsx
<Progress value={50} />
\`\`\`

### With Variant and Size

\`\`\`tsx
<Progress 
  value={75} 
  variant="success" 
  size="lg" 
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| value | number | 0 | The progress value as a percentage (0-100) |
| variant | ThemeColor | 'primary' | The color variant of the progress bar |
| size | 'sm' \\| 'md' \\| 'lg' | 'md' | The size of the progress bar |
| animated | boolean | false | Whether to animate the progress bar |
| striped | boolean | false | Whether to apply striped styling |
| label | string | - | Optional label to display with the progress |
| max | number | 100 | The maximum value for the progress bar |
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ width: '50%' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'The progress value as a percentage (0-100)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    variant: {
      control: { type: 'select' },
      options: THEME_COLORS,
      description: 'The color variant of the progress bar',
      table: {
        type: { summary: 'ThemeColor' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'The size of the progress bar',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate the progress bar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    striped: {
      control: 'boolean',
      description: 'Whether to apply striped styling',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    label: {
      control: 'text',
      description: 'Optional label to display with the progress',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    max: {
      control: 'number',
      description: 'The maximum value for the progress bar',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 100 },
      },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    value: 50,
    variant: 'primary',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic progress bar with default settings.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <div><strong>Primary:</strong> <Progress value={75} variant="primary" /></div>
      <div><strong>Secondary:</strong> <Progress value={60} variant="secondary" /></div>
      <div><strong>Success:</strong> <Progress value={100} variant="success" /></div>
      <div><strong>Warning:</strong> <Progress value={45} variant="warning" /></div>
      <div><strong>Error:</strong> <Progress value={30} variant="error" /></div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars with all available color variants.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <div><strong>Small:</strong> <Progress value={60} size="sm" /></div>
      <div><strong>Medium:</strong> <Progress value={70} size="md" /></div>
      <div><strong>Large:</strong> <Progress value={80} size="lg" /></div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars with all available sizes.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    variant: 'primary',
    size: 'md',
    label: 'Processing files: 75%',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with a label showing current value.',
      },
    },
  },
};

// Default Progress
export const Default: Story = {
  args: {
    value: 50,
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    value: 75,
    variant: 'secondary',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    value: 25,
    variant: 'warning',
    size: 'md',
  },
};

export const Error: Story = {
  args: {
    value: 10,
    variant: 'error',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    value: 60,
    variant: 'primary',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    value: 80,
    variant: 'primary',
    size: 'lg',
  },
};
