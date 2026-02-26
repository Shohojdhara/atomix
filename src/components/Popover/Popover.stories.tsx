import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Popover, PopoverTrigger } from './Popover';
import { Toggle } from '../Toggle/Toggle';
import { Button } from '../Button/Button';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Popover

## Overview

Popover displays floating content relative to a trigger element. It provides a flexible way to show additional information, actions, or controls without navigating away from the current context. Popovers support multiple positions, click or hover triggers, and can include rich interactive content.

## Features

- Multiple position options (top, bottom, left, right, auto)
- Click or hover triggers
- Configurable delays and offsets
- Click outside and escape key closing
- Glass morphism effect
- Rich content support
- Accessible design
- Responsive behavior

## Accessibility

- Keyboard support: Navigate and activate with keyboard
- Screen reader: Popover content and purpose announced appropriately
- ARIA support: Proper roles and properties for popover components
- Focus management: Traps focus within the popover when open

## Usage Examples

### Basic Usage

\`\`\`tsx
<Popover 
  position="top"
  trigger="click"
>
  <PopoverTrigger>
    <button>Trigger</button>
  </PopoverTrigger>
  <div>Popover content</div>
</Popover>
\`\`\`

### With Configuration

\`\`\`tsx
<Popover 
  position="right"
  trigger="hover"
  delay={200}
  offset={10}
>
  <PopoverTrigger>
    <button>Trigger</button>
  </PopoverTrigger>
  <div>Popover content</div>
</Popover>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| position | 'top' \\| 'bottom' \\| 'left' \\| 'right' \\| 'auto' | 'top' | Position of the popover relative to the trigger |
| trigger | 'click' \\| 'hover' | 'click' | How the popover is triggered |
| delay | number | 0 | Delay in milliseconds before showing the popover |
| offset | number | 12 | Offset distance from the trigger element |
| defaultOpen | boolean | false | Whether the popover is initially open |
| closeOnClickOutside | boolean | true | Whether to close the popover when clicking outside |
| closeOnEscape | boolean | true | Whether to close the popover when pressing Escape key |
| glass | boolean | false | Enable glass morphism effect |
| className | string | - | Additional CSS classes for the component |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'auto'],
      description: 'Position of the popover relative to the trigger',
      table: {
        type: { summary: '"top" | "bottom" | "left" | "right" | "auto"' },
        defaultValue: { summary: 'top' },
      },
    },
    trigger: {
      control: { type: 'select' },
      options: ['click', 'hover'],
      description: 'How the popover is triggered',
      table: {
        type: { summary: '"click" | "hover"' },
        defaultValue: { summary: 'click' },
      },
    },
    delay: {
      control: { type: 'number' },
      description: 'Delay in milliseconds before showing the popover',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    offset: {
      control: { type: 'number' },
      description: 'Offset distance from the trigger element',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '12' },
      },
    },
    defaultOpen: {
      control: { type: 'boolean' },
      description: 'Whether the popover is initially open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    closeOnClickOutside: {
      control: { type: 'boolean' },
      description: 'Whether to close the popover when clicking outside',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: { type: 'boolean' },
      description: 'Whether to close the popover when pressing Escape key',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes for the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    glass: {
      control: { type: 'boolean' },
      description: 'Enable glass morphism effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for interactive stories
const InteractivePopover = (args: React.ComponentProps<typeof Popover>) => {
  const selectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ];

  const [selectedOption, setSelectedOption] = React.useState('1');
  const [showInternalOnly, setShowInternalOnly] = React.useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleToggleChange = () => {
    setShowInternalOnly(!showInternalOnly);
  };

  const content = (
    <>
      <div className="u-flex u-items-center u-gap-7">
        <span className="u-text-nowrap">Sort by</span>
        <div className="c-select">
          <select value={selectedOption} onChange={handleSelectChange}>
            {selectOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="c-toggle" onClick={handleToggleChange}>
        <div className="c-toggle__label">Show internal comments only</div>
        <div className="c-toggle__switch"></div>
      </div>
    </>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <Popover {...args} content={content}>
        <PopoverTrigger>
          <Button variant="primary">Open Popover</Button>
        </PopoverTrigger>
      </Popover>
    </div>
  );
};

export const BasicUsage: Story = {
  render: args => <InteractivePopover {...args} content={undefined} />,
  args: {
    position: 'top',
    trigger: 'click',
    closeOnClickOutside: true,
    closeOnEscape: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic popover with top position and click trigger.',
      },
    },
  },
};

export const AllPositions: Story = {
  render: () => {
    const content = <div style={{ padding: '20px' }}>Popover Content</div>;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          padding: '50px',
          alignItems: 'center',
          height: '300px',
        }}
      >
        <Popover position="left" content={content}>
          <PopoverTrigger>
            <Button variant="primary">Left</Button>
          </PopoverTrigger>
        </Popover>

        <Popover position="top" content={content}>
          <PopoverTrigger>
            <Button variant="primary">Top</Button>
          </PopoverTrigger>
        </Popover>

        <Popover position="bottom" content={content}>
          <PopoverTrigger>
            <Button variant="primary">Bottom</Button>
          </PopoverTrigger>
        </Popover>

        <Popover position="right" content={content}>
          <PopoverTrigger>
            <Button variant="primary">Right</Button>
          </PopoverTrigger>
        </Popover>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All available popover positions demonstrated.',
      },
    },
  },
};

export const WithGlassEffect: Story = {
  render: args => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '100px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '300px',
      }}
    >
      <Popover
        {...args}
        content={<div style={{ padding: '20px' }}>Glass Effect Popover Content</div>}
      >
        <PopoverTrigger>
          <Button variant="primary">Open Glass Popover</Button>
        </PopoverTrigger>
      </Popover>
    </div>
  ),
  args: {
    position: 'top',
    trigger: 'click',
    glass: true,
    closeOnClickOutside: true,
    closeOnEscape: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popover with glass morphism effect applied.',
      },
    },
  },
};

/**
 * Glass morphism popover example.
 */
export const GlassPopover: Story = {
  render: args => <InteractivePopover {...args} content={undefined} />,
  args: {
    position: 'top',
    trigger: 'click',
    offset: 12,
    delay: 0,
    defaultOpen: false,
    closeOnClickOutside: true,
    closeOnEscape: true,
    glass: true,
  } as any,
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
 * Glass popover with custom settings.
 */
export const GlassPopoverCustom: Story = {
  render: args => {
    const selectOptions = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' },
    ];

    const [selectedOption, setSelectedOption] = React.useState('1');
    const [showInternalOnly, setShowInternalOnly] = React.useState(false);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(e.target.value);
    };

    const handleToggleChange = () => {
      setShowInternalOnly(!showInternalOnly);
    };

    const content = (
      <>
        <div className="u-flex u-items-center u-gap-7">
          <span className="u-text-nowrap">Sort by</span>
          <div className="c-select">
            <select value={selectedOption} onChange={handleSelectChange}>
              {selectOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="c-toggle" onClick={handleToggleChange}>
          <div className="c-toggle__label">Show internal comments only</div>
          <div className="c-toggle__switch"></div>
        </div>
      </>
    );

    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
        <Popover {...args} content={content}>
          <PopoverTrigger>
            <Button variant="primary">Open Popover</Button>
          </PopoverTrigger>
        </Popover>
      </div>
    );
  },
  args: {
    position: 'top',
    trigger: 'click',
    offset: 12,
    delay: 0,
    defaultOpen: false,
    closeOnClickOutside: true,
    closeOnEscape: true,
    glass: {
      displacementScale: 80,
      blurAmount: 2,
      saturation: 200,
      aberrationIntensity: 1,
      borderRadius: 16,
      mode: 'polar',
    } as any,
  },
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
 * Glass popover with hover trigger.
 */
export const GlassPopoverHover: Story = {
  render: args => {
    const selectOptions = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' },
    ];

    const [selectedOption, setSelectedOption] = React.useState('1');
    const [showInternalOnly, setShowInternalOnly] = React.useState(false);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(e.target.value);
    };

    const handleToggleChange = () => {
      setShowInternalOnly(!showInternalOnly);
    };

    const content = (
      <>
        <div className="u-flex u-items-center u-gap-7">
          <span className="u-text-nowrap">Sort by</span>
          <div className="c-select">
            <select value={selectedOption} onChange={handleSelectChange}>
              {selectOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="c-toggle" onClick={handleToggleChange}>
          <div className="c-toggle__label">Show internal comments only</div>
          <div className="c-toggle__switch"></div>
        </div>
      </>
    );

    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
        <Popover {...args} content={content}>
          <PopoverTrigger>
            <Button variant="primary">Open Popover</Button>
          </PopoverTrigger>
        </Popover>
      </div>
    );
  },
  args: {
    position: 'top',
    trigger: 'hover',
    offset: 12,
    delay: 200,
    defaultOpen: false,
    closeOnClickOutside: true,
    closeOnEscape: true,
    glass: true,
  },
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
 * Glass popover with different positions.
 */
export const GlassPopoverPositions: Story = {
  render: args => {
    const content = <div style={{ padding: '20px' }}>Popover Content</div>;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          padding: '50px',
          alignItems: 'center',
          height: '300px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Popover {...args} position="left" content={content}>
          <PopoverTrigger>
            <Button variant="primary">Left</Button>
          </PopoverTrigger>
        </Popover>

        <Popover {...args} position="top" content={content}>
          <PopoverTrigger>
            <Button variant="primary">Top</Button>
          </PopoverTrigger>
        </Popover>

        <Popover {...args} position="bottom" content={content}>
          <PopoverTrigger>
            <Button variant="primary">Bottom</Button>
          </PopoverTrigger>
        </Popover>

        <Popover {...args} position="right" content={content}>
          <PopoverTrigger>
            <Button variant="primary">Right</Button>
          </PopoverTrigger>
        </Popover>
      </div>
    );
  },
  args: {
    trigger: 'click',
    offset: 12,
    delay: 0,
    defaultOpen: true,
    closeOnClickOutside: true,
    closeOnEscape: true,
    glass: true,
  },
};
