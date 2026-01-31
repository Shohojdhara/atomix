import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Spinner } from './Spinner';
import { THEME_COLORS, SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Spinner

## Overview

Spinner provides visual feedback during loading states. It displays an animated loading indicator that can be customized with different variants and sizes. Use spinners to indicate that content is being loaded or processed.

## Features

- Multiple color variants
- Multiple size options
- Fullscreen mode
- Smooth animations
- Accessible design
- Responsive behavior

## Accessibility

- Screen reader: Loading state announced appropriately
- ARIA support: Proper roles and properties for spinner components
- Keyboard support: Accessible via keyboard navigation
- Focus management: Focus indicators maintained for interactive elements

## Usage Examples

### Basic Usage

\`\`\`tsx
<Spinner />
\`\`\`

### With Variant and Size

\`\`\`tsx
<Spinner 
  variant="primary" 
  size="lg" 
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| variant | ThemeColor | 'primary' | The color variant of the spinner |
| size | 'sm' \\| 'md' \\| 'lg' | 'md' | The size of the spinner |
| fullscreen | boolean | false | Whether the spinner should be centered and fixed in the viewport |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: THEME_COLORS,
      description: 'The color variant of the spinner',
      table: {
        type: { summary: 'ThemeColor' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'The size of the spinner',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    fullscreen: {
      control: 'boolean',
      description: 'Whether the spinner should be centered and fixed in the viewport',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    fullscreen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic spinner with default settings.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-3 u-items-center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner in all available sizes.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="u-flex u-flex-wrap u-gap-3 u-items-center">
      {THEME_COLORS.map(color => (
        <Spinner key={color} variant={color} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner in all available color variants.',
      },
    },
  },
};

export const Fullscreen: Story = {
  render: () => (
    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spinner fullscreen={true} variant="primary" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Fullscreen spinner centered in the viewport.',
      },
    },
  },
};
