import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Countdown } from './Countdown';

const meta = {
  title: 'Components/Countdown',
  component: Countdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Countdown

## Overview

The Countdown component displays a countdown timer to a specified target date. It shows days, hours, minutes, and seconds in a clean, customizable format. The component supports focusing on specific units, custom separators, and different visual styles.

## Features

- Configurable time units to display
- Customizable separator strings
- Focused visual style
- Automatic time calculation
- Accessible design

## Accessibility

- Screen reader: Time values are announced appropriately
- ARIA support: Proper roles and properties for time elements
- Focus management: Interactive elements maintain focus indicators
- Keyboard support: Accessible via keyboard navigation

## Usage Examples

### Basic Usage

\`\`\`tsx
<Countdown target={targetDate} />
\`\`\`

### With Specific Units

\`\`\`tsx
<Countdown 
  target={targetDate} 
  show={['hours', 'minutes', 'seconds']} 
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| target | Date \\| number \\| string | - | Target date/time for the countdown |
| show | Array<'days' \\| 'hours' \\| 'minutes' \\| 'seconds'> | ['days', 'hours', 'minutes', 'seconds'] | Which time units to display |
| separator | string | ':' | String to separate time units |
| focused | boolean | false | Whether to apply focused visual style |
| onComplete | () => void | - | Callback when countdown completes |
| formatUnit | (unit: string, value: number) => string | - | Custom formatter for time units |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    target: {
      control: 'date',
      description: 'Target date/time for the countdown',
      table: {
        type: { summary: 'Date | number | string' },
        defaultValue: { summary: '-' },
      },
    },
    show: {
      control: { type: 'check', options: ['days', 'hours', 'minutes', 'seconds'] },
      description: 'Fields to show',
      table: {
        type: { summary: "Array<'days' | 'hours' | 'minutes' | 'seconds'>" },
        defaultValue: { summary: "['days', 'hours', 'minutes', 'seconds']" },
      },
    },
    separator: {
      control: 'text',
      description: 'Separator string',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: ':' },
      },
    },
    focused: {
      control: 'boolean',
      description: 'Focused style',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onComplete: {
      action: 'completed',
      description: 'Callback when countdown completes',
    },
  },
} satisfies Meta<typeof Countdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 45 + 1000 * 30); // 1d 45m 30s

export const BasicUsage: Story = {
  args: {
    target: futureDate,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Countdown component with default settings.',
      },
    },
  },
};

export const FocusedStyle: Story = {
  args: {
    target: futureDate,
    focused: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Countdown with focused visual style.',
      },
    },
  },
};

export const CustomSeparator: Story = {
  args: {
    target: futureDate,
    separator: ' | ',
    show: ['hours', 'minutes', 'seconds'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Countdown with custom separator and specific units.',
      },
    },
  },
};
