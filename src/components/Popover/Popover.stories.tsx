import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverTrigger } from './Popover';
import { Toggle } from '../Toggle/Toggle';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The Popover component displays floating content relative to a trigger element. It provides a flexible way to show additional information, actions, or controls without navigating away from the current context. Popovers support multiple positions, click or hover triggers, and can include rich interactive content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'auto'],
      defaultValue: 'top',
    },
    trigger: {
      control: { type: 'select' },
      options: ['click', 'hover'],
      defaultValue: 'click',
    },
    delay: {
      control: { type: 'number' },
      defaultValue: 0,
    },
    offset: {
      control: { type: 'number' },
      defaultValue: 12,
    },
    defaultOpen: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    closeOnClickOutside: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    closeOnEscape: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    className: {
      control: { type: 'text' },
    },
    glass: {
      control: { type: 'boolean' },
      description: 'Enable glass morphism effect',
    },
  },
} satisfies Meta<typeof Popover>;

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
    <div
      style={{ padding: '80px', display: 'flex', justifyContent: 'center', background: '#f5f5f5' }}
    >
      <Popover {...args} content={content}>
        <PopoverTrigger trigger={args.trigger}>
          <Button variant="primary" label="Open Popover" />
        </PopoverTrigger>
      </Popover>
    </div>
  );
};

export const Default: Story = {
  render: args => <InteractivePopover {...args} />,
  args: {
    position: 'top',
    trigger: 'click',
    offset: 12,
    delay: 0,
    defaultOpen: false,
    closeOnClickOutside: true,
    closeOnEscape: true,
  } as any,
};

export const Hover: Story = {
  render: args => <InteractivePopover {...args} />,
  args: {
    position: 'top',
    trigger: 'hover',
    offset: 12,
    delay: 200,
    defaultOpen: false,
    closeOnClickOutside: true,
    closeOnEscape: true,
  } as any,
};

export const BottomPosition: Story = {
  render: args => <InteractivePopover {...args} />,
  args: {
    position: 'bottom',
    trigger: 'click',
    offset: 12,
    delay: 0,
    defaultOpen: false,
    closeOnClickOutside: true,
    closeOnEscape: true,
  } as any,
};

export const LeftPosition: Story = {
  render: args => <InteractivePopover {...args} />,
  args: {
    position: 'left',
    trigger: 'click',
    offset: 12,
    delay: 0,
    defaultOpen: false,
    closeOnClickOutside: true,
    closeOnEscape: true,
  } as any,
};

export const RightPosition: Story = {
  render: args => <InteractivePopover {...args} />,
  args: {
    position: 'right',
    trigger: 'click',
    offset: 12,
    delay: 0,
    defaultOpen: false,
    closeOnClickOutside: true,
    closeOnEscape: true,
  } as any,
};

export const AutoPosition: Story = {
  render: args => <InteractivePopover {...args} />,
  args: {
    position: 'auto',
    trigger: 'click',
    offset: 12,
    delay: 0,
    defaultOpen: true, // Open by default to showcase auto-positioning
    closeOnClickOutside: true,
    closeOnEscape: true,
  } as any,
};

/**
 * Glass morphism popover example.
 */
export const GlassPopover: Story = {
  render: args => <InteractivePopover {...args} />,
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
  render: args => <InteractivePopover {...args} />,
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
      cornerRadius: 16,
      mode: 'polar',
    } as any,
  } as any,
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
  render: args => <InteractivePopover {...args} />,
  args: {
    position: 'top',
    trigger: 'hover',
    offset: 12,
    delay: 200,
    defaultOpen: false,
    closeOnClickOutside: true,
    closeOnEscape: true,
    glass: true,
  } as any,
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
  render: args => <InteractivePopover {...args} />,
  args: {
    position: 'top',
    trigger: 'click',
    offset: 12,
    delay: 0,
    defaultOpen: true,
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
