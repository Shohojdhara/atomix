import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { ColorModeToggle, type ColorMode } from './ColorModeToggle';
import { Moon, Sun } from '@phosphor-icons/react';

const meta = {
  title: 'Components/ColorModeToggle',
  component: ColorModeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ColorModeToggle

## Overview

The ColorModeToggle component provides a user-friendly switch for toggling between light and dark color modes. It automatically detects system preferences, persists user choices, and provides visual feedback. Essential for applications supporting theme customization and accessibility preferences.

## Features

- Automatic detection of system preference
- Local storage persistence
- Multiple size options
- Customizable icons
- Accessible design
- Controlled/uncontrolled modes

## Accessibility

- Keyboard support: Toggle can be activated using Space or Enter keys
- Screen reader: Announces current mode and change events
- ARIA support: Proper roles and properties for assistive technologies
- Focus management: Maintains visible focus indicator

## Usage Examples

### Basic Usage

\`\`\`tsx
<ColorModeToggle />
\`\`\`

### Controlled Mode

\`\`\`tsx
<ColorModeToggle value={mode} onChange={setMode} />
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| size | 'sm' \\| 'md' \\| 'lg' | 'md' | Size variant of the toggle |
| disabled | boolean | false | Whether the toggle is disabled |
| showTooltip | boolean | false | Whether to show tooltip on hover |
| disableStorage | boolean | false | Whether to disable localStorage persistence |
| disableSystemPreference | boolean | false | Whether to disable system preference detection |
| value | 'light' \\| 'dark' \\| 'system' | - | Controlled value of the toggle |
| onChange | (mode: ColorMode) => void | - | Callback when mode changes |
| lightIcon | ReactNode | Default sun icon | Custom icon for light mode |
| darkIcon | ReactNode | Default moon icon | Custom icon for dark mode |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the toggle',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltip on hover',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disableStorage: {
      control: 'boolean',
      description: 'Disable localStorage persistence',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disableSystemPreference: {
      control: 'boolean',
      description: 'Disable system preference detection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    value: {
      control: { type: 'radio', options: ['light', 'dark', 'system'] },
      description: 'Controlled value of the toggle',
      table: {
        type: { summary: '"light" | "dark" | "system"' },
        defaultValue: { summary: '-' },
      },
    },
    onChange: {
      action: 'mode changed',
      description: 'Callback when mode changes',
    },
    lightIcon: {
      control: 'object',
      description: 'Custom icon for light mode',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Default sun icon' },
      },
    },
    darkIcon: {
      control: 'object',
      description: 'Custom icon for dark mode',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Default moon icon' },
      },
    },
  },
} satisfies Meta<typeof ColorModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default Color Mode Toggle with automatic system preference detection.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ColorModeToggle size="sm" />
      <ColorModeToggle size="md" />
      <ColorModeToggle size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Color Mode Toggle in all available sizes.',
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state of the Color Mode Toggle.',
      },
    },
  },
};

export const ControlledMode: Story = {
  render: () => {
    const [mode, setMode] = useState<ColorMode>('light');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <ColorModeToggle value={mode} onChange={setMode} />
        <p>Current mode: {mode}</p>
        <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
          Toggle from outside
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled mode example with external state management.',
      },
    },
  },
};

export const CustomIcons: Story = {
  render: () => (
    <ColorModeToggle
      lightIcon={<Moon size={24} weight="fill" />}
      darkIcon={<Sun size={24} weight="fill" />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Color Mode Toggle with custom icons.',
      },
    },
  },
};

export const WithCallback: Story = {
  render: () => {
    const [lastChanged, setLastChanged] = useState<string>('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <ColorModeToggle
          onChange={mode =>
            setLastChanged(`Mode changed to ${mode} at ${new Date().toLocaleTimeString()}`)
          }
        />
        {lastChanged && <p>Last changed: {lastChanged}</p>}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Color Mode Toggle with change callback.',
      },
    },
  },
};
