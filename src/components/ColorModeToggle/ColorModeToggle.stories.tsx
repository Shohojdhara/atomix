import type { Meta, StoryObj } from '@storybook/react';
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
        component:
          'The ColorModeToggle component provides a user-friendly switch for toggling between light and dark color modes. It automatically detects system preferences, persists user choices, and provides visual feedback. Essential for applications supporting theme customization and accessibility preferences.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the toggle',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltip on hover',
    },
    disableStorage: {
      control: 'boolean',
      description: 'Disable localStorage persistence',
    },
    disableSystemPreference: {
      control: 'boolean',
      description: 'Disable system preference detection',
    },
  },
} satisfies Meta<typeof ColorModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Color Mode Toggle
export const Default: Story = {
  args: {},
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <ColorModeToggle size="sm" />
      <ColorModeToggle size="md" />
      <ColorModeToggle size="lg" />
    </div>
  ),
};

// Disabled State
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

// Controlled Mode
export const Controlled: Story = {
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
};

// Custom Icons
export const CustomIcons: Story = {
  render: () => (
    <ColorModeToggle
      lightIcon={<Moon size={24} weight="fill" />}
      darkIcon={<Sun size={24} weight="fill" />}
    />
  ),
};

// With Callback
export const WithCallback: Story = {
  render: () => {
    const [lastChanged, setLastChanged] = useState<string>('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <ColorModeToggle
          onChange={(mode) => setLastChanged(`Changed to ${mode} at ${new Date().toLocaleTimeString()}`)}
        />
        {lastChanged && <p style={{ fontSize: '0.875rem' }}>{lastChanged}</p>}
      </div>
    );
  },
};

// Custom Storage Key
export const CustomStorageKey: Story = {
  args: {
    storageKey: 'my-app-theme',
    dataAttribute: 'data-theme',
  },
};

// Without Storage
export const WithoutStorage: Story = {
  args: {
    disableStorage: true,
  },
};

// Example Usage in Header
export const InHeader: Story = {
  render: () => (
    <div
      className="u-p-5 u-shadow u-d-flex u-justify-content-between u-align-items-center"
      style={{ width: '400px', borderRadius: '8px' }}
    >
      <span style={{ fontWeight: 600 }}>Toggle Theme</span>
      <ColorModeToggle />
    </div>
  ),
};

// Multiple Toggles
export const MultipleToggles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <ColorModeToggle size="sm" />
        <span style={{ fontSize: '0.75rem' }}>Small</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <ColorModeToggle size="md" />
        <span style={{ fontSize: '0.75rem' }}>Medium</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <ColorModeToggle size="lg" />
        <span style={{ fontSize: '0.75rem' }}>Large</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <ColorModeToggle disabled />
        <span style={{ fontSize: '0.75rem' }}>Disabled</span>
      </div>
    </div>
  ),
};
