import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { ThemeColor } from '../../lib/types/components';
import { Icon } from '../Icon';
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from './index';
import { THEME_COLORS } from '../../lib/constants/components';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Dropdown

## Overview

Dropdown provides a toggleable menu that appears relative to a trigger element. It supports multiple placement options, click or hover triggers, and can include dividers, headers, and icons. Dropdowns are ideal for navigation menus, action menus, or any context where options need to be revealed on demand.

## Features

- Multiple placement options (top, bottom, left, right with start/end variations)
- Click or hover trigger modes
- Color variants
- Glass morphism effect
- Customizable dimensions
- Auto-close behaviors
- Rich content support (headers, dividers, icons)

## Accessibility

- Keyboard support: Navigate with arrow keys, activate with Enter/Space
- Screen reader: Menu items and structure announced properly
- ARIA support: Proper roles and properties for dropdown components
- Focus management: Maintains focus within the dropdown menu

## Usage Examples

### Basic Usage

\`\`\`tsx
<Dropdown 
  trigger="click"
  placement="bottom-start"
  children={<button>Dropdown</button>}
  menu={<div>Menu content</div>}
/>
\`\`\`

### With Glass Effect

\`\`\`tsx
<Dropdown 
  trigger="click"
  placement="bottom-start"
  glass={true}
  children={<button>Dropdown</button>}
  menu={<div>Menu content</div>}
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| placement | Placement | 'bottom-start' | The placement of the dropdown menu relative to the trigger element |
| trigger | 'click' \\| 'hover' | 'click' | How the dropdown is triggered - by click or hover |
| variant | ThemeColor | 'secondary' | The color variant of the dropdown |
| minWidth | string | - | Minimum width of the dropdown menu |
| maxHeight | string | - | Maximum height of the dropdown menu |
| closeOnClickOutside | boolean | true | Whether to close the dropdown when clicking outside |
| closeOnEscape | boolean | true | Whether to close the dropdown when pressing the Escape key |
| glass | boolean | false | Enable glass morphism effect |
| isOpen | boolean | - | Controlled open state of the dropdown |
| onOpenChange | (open: boolean) => void | - | Callback when open state changes |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: [
        'bottom-start',
        'bottom-end',
        'top-start',
        'top-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
      description: 'The placement of the dropdown menu relative to the trigger element',
      table: {
        type: { summary: 'Placement' },
        defaultValue: { summary: 'bottom-start' },
      },
    },
    trigger: {
      control: { type: 'radio' },
      options: ['click', 'hover'],
      description: 'How the dropdown is triggered - by click or hover',
      table: {
        type: { summary: '"click" | "hover"' },
        defaultValue: { summary: 'click' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: THEME_COLORS,
      description: 'The color variant of the dropdown',
      table: {
        type: { summary: 'ThemeColor' },
        defaultValue: { summary: 'secondary' },
      },
    },
    minWidth: {
      control: 'text',
      description: 'Minimum width of the dropdown menu',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the dropdown menu',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Whether to close the dropdown when clicking outside',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close the dropdown when pressing the Escape key',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
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
    isOpen: {
      control: 'boolean',
      description: 'Controlled open state of the dropdown',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: '-' },
      },
    },
    onOpenChange: {
      action: 'open state changed',
      description: 'Callback when open state changes',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive dropdown component that can be used in Storybook
 */
const InteractiveDropdown = (args: React.ComponentProps<typeof Dropdown>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="u-p-4"
      style={{ minHeight: '300px', display: 'flex', alignItems: 'flex-start' }}
    >
      <Dropdown {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
};

export const BasicUsage: Story = {
  args: {
    trigger: 'click',
    placement: 'bottom-start',
    children: (
      <button className="c-btn c-btn--primary">
        Dropdown <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" />
      </button>
    ),
    menu: (
      <>
        <DropdownHeader>Dropdown Header</DropdownHeader>
        <DropdownDivider />
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
        <DropdownDivider />
        <DropdownItem disabled>Disabled Option</DropdownItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic dropdown with default settings and menu items.',
      },
    },
  },
};

export const HoverTrigger: Story = {
  args: {
    trigger: 'hover',
    placement: 'bottom-start',
    children: (
      <button className="c-btn c-btn--secondary">
        Hover Dropdown <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" />
      </button>
    ),
    menu: (
      <>
        <DropdownItem>Hover Option 1</DropdownItem>
        <DropdownItem>Hover Option 2</DropdownItem>
        <DropdownItem>Hover Option 3</DropdownItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown that opens on hover instead of click.',
      },
    },
  },
};

/**
 * Dropdown menu items with icons
 */
export const WithIcons: Story = {
  args: {
    ...BasicUsage.args,
    menu: (
      <>
        <DropdownItem icon={<Icon name="House" size="sm" />}>Home</DropdownItem>
        <DropdownItem icon={<Icon name="User" size="sm" />}>Profile</DropdownItem>
        <DropdownItem icon={<Icon name="Gear" size="sm" />}>Settings</DropdownItem>
        <DropdownItem icon={<Icon name="SignOut" size="sm" />}>Logout</DropdownItem>
      </>
    ),
  },
  render: args => <InteractiveDropdown {...args} />,
};

/**
 * Dropdown menu items as links
 */
export const WithLinks: Story = {
  args: {
    ...BasicUsage.args,
    menu: (
      <>
        <DropdownItem href="#home">Home</DropdownItem>
        <DropdownItem href="#about">About</DropdownItem>
        <DropdownItem href="#services">Services</DropdownItem>
        <DropdownItem href="#contact">Contact</DropdownItem>
      </>
    ),
  },
  render: args => <InteractiveDropdown {...args} />,
};

/**
 * Dropdown with section headers and dividers
 */
export const WithHeader: Story = {
  args: {
    ...BasicUsage.args,
    menu: (
      <>
        <DropdownHeader>Account Options</DropdownHeader>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownDivider />
        <DropdownHeader>Help & Support</DropdownHeader>
        <DropdownItem>Documentation</DropdownItem>
        <DropdownItem>Contact Support</DropdownItem>
      </>
    ),
  },
  render: args => <InteractiveDropdown {...args} />,
};

/**
 * Dropdown with an active menu item
 */
export const ActiveItem: Story = {
  args: {
    ...BasicUsage.args,
    menu: (
      <>
        <DropdownItem active>Active Item</DropdownItem>
        <DropdownItem>Regular Item</DropdownItem>
        <DropdownItem>Regular Item</DropdownItem>
      </>
    ),
  },
  render: args => <InteractiveDropdown {...args} />,
};

/**
 * Dropdown with a disabled menu item
 */
export const DisabledItem: Story = {
  args: {
    ...BasicUsage.args,
    menu: (
      <>
        <DropdownItem>Regular Item</DropdownItem>
        <DropdownItem disabled>Disabled Item</DropdownItem>
        <DropdownItem>Regular Item</DropdownItem>
      </>
    ),
  },
  render: args => <InteractiveDropdown {...args} />,
};

/**
 * Shows all possible dropdown placement options
 */
export const AllPlacements: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The Dropdown component supports various placement options to position the menu relative to the trigger element.',
      },
    },
  },
  render: () => {
    // All possible placement options with properly typed icon names
    const placements = [
      { value: 'bottom-start', label: 'Bottom Start', icon: 'CaretDown' as const },
      { value: 'bottom-end', label: 'Bottom End', icon: 'CaretDown' as const },
      { value: 'top-start', label: 'Top Start', icon: 'CaretUp' as const },
      { value: 'top-end', label: 'Top End', icon: 'CaretUp' as const },
      { value: 'left-start', label: 'Left Start', icon: 'CaretLeft' as const },
      { value: 'left-end', label: 'Left End', icon: 'CaretLeft' as const },
      { value: 'right-start', label: 'Right Start', icon: 'CaretRight' as const },
      { value: 'right-end', label: 'Right End', icon: 'CaretRight' as const },
    ];

    // Create a grid layout with plenty of space for dropdowns to display correctly
    return (
      <div className="u-p-5" style={{ height: '650px' }}>
        <div
          className="u-grid"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '1.5rem',
            height: '100%',
          }}
        >
          {placements.map(placement => (
            <div
              key={placement.value}
              className="u-flex u-items-center u-justify-center"
            >
              <Dropdown
                trigger="click"
                placement={placement.value as any}
                defaultOpen={true}
                closeOnClickOutside={false}
                closeOnEscape={false}
                children={
                  <button className="c-btn c-btn--primary">
                    {placement.label}{' '}
                    <Icon name={placement.icon} className="c-dropdown__toggle-icon" size="sm" />
                  </button>
                }
                menu={
                  <>
                    <DropdownItem>Menu item 1</DropdownItem>
                    <DropdownItem>Menu item 2</DropdownItem>
                    <DropdownItem>Menu item 3</DropdownItem>
                  </>
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Dropdown with all color variants
 */
export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The Dropdown component supports various color variants to match your design system.',
      },
    },
  },
  render: () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleOpenChange = (variant: string, isOpen: boolean) => {
      if (isOpen) {
        setOpenDropdown(variant);
      } else if (openDropdown === variant) {
        setOpenDropdown(null);
      }
    };

    return (
      <div className="u-p-4" style={{ minHeight: '300px' }}>
        <div className="u-flex u-flex-wrap u-gap-3">
          {[
            'primary',
            'secondary',
            'tertiary',
            'success',
            'info',
            'warning',
            'error',
            'light',
            'dark',
          ].map(color => (
            <Dropdown
              key={color}
              variant={color as ThemeColor}
              trigger="click"
              isOpen={openDropdown === color}
              onOpenChange={isOpen => handleOpenChange(color, isOpen)}
              children={
                <button className={`c-btn c-btn--${color}`}>
                  {color} <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" />
                </button>
              }
              menu={
                <>
                  <DropdownItem>Menu item 1</DropdownItem>
                  <DropdownItem>Menu item 2</DropdownItem>
                </>
              }
            />
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Glass morphism dropdown example.
 */
export const GlassDropdown: Story = {
  args: {
    ...BasicUsage.args,
    glass: true,
  },
  render: args => <InteractiveDropdown {...args} />,
  decorators: [
    Story => (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Glass dropdown with custom settings.
 */
export const GlassDropdownCustom: Story = {
  args: {
    ...BasicUsage.args,
    glass: {
      displacementScale: 80,
      blurAmount: 2,
      saturation: 200,
      aberrationIntensity: 1,
      cornerRadius: 16,
      mode: 'polar',
    },
  },
  render: args => <InteractiveDropdown {...args} />,
  decorators: [
    Story => (
      <div
        style={{
          background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Glass dropdown with icons.
 */
export const GlassDropdownWithIcons: Story = {
  args: {
    ...WithIcons.args,
    glass: true,
  },
  render: args => <InteractiveDropdown {...args} />,
  decorators: [
    Story => (
      <div
        style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Glass dropdown with all variants.
 */
export const GlassAllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Glass morphism effect applied to dropdowns with all color variants.',
      },
    },
  },
  render: () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleOpenChange = (variant: string, isOpen: boolean) => {
      if (isOpen) {
        setOpenDropdown(variant);
      } else if (openDropdown === variant) {
        setOpenDropdown(null);
      }
    };

    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        <div className="u-flex u-flex-wrap u-gap-3">
          {[
            'primary',
            'secondary',
            'tertiary',
            'success',
            'info',
            'warning',
            'error',
            'light',
            'dark',
          ].map(color => (
            <Dropdown
              key={color}
              variant={color as ThemeColor}
              trigger="click"
              isOpen={openDropdown === color}
              onOpenChange={isOpen => handleOpenChange(color, isOpen)}
              glass={true}
              children={
                <button className={`c-btn c-btn--${color}`}>
                  {color} <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" />
                </button>
              }
              menu={
                <>
                  <DropdownItem>Menu item 1</DropdownItem>
                  <DropdownItem>Menu item 2</DropdownItem>
                  <DropdownItem>Menu item 3</DropdownItem>
                </>
              }
            />
          ))}
        </div>
      </div>
    );
  },
};