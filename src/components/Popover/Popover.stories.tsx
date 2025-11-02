import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { Popover, PopoverTrigger } from './Popover';
import { Toggle } from '../Toggle/Toggle';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Popover',
  component: Popover,
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
} as Meta<typeof Popover>;

// Default template
const Template: StoryFn<typeof Popover> = args => {
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
      <div className="u-d-flex u-align-items-center u-gap-7">
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

export const Default = Template.bind({});
Default.args = {
  position: 'top',
  trigger: 'click',
  offset: 12,
  delay: 0,
  defaultOpen: false,
  closeOnClickOutside: true,
  closeOnEscape: true,
};

export const Hover = Template.bind({});
Hover.args = {
  ...Default.args,
  trigger: 'hover',
  delay: 200,
};

export const BottomPosition = Template.bind({});
BottomPosition.args = {
  ...Default.args,
  position: 'bottom',
};

export const LeftPosition = Template.bind({});
LeftPosition.args = {
  ...Default.args,
  position: 'left',
};

export const RightPosition = Template.bind({});
RightPosition.args = {
  ...Default.args,
  position: 'right',
};

export const AutoPosition = Template.bind({});
AutoPosition.args = {
  ...Default.args,
  position: 'auto',
  defaultOpen: true, // Open by default to showcase auto-positioning
};

/**
 * Glass morphism popover example.
 */
export const GlassPopover = Template.bind({});
GlassPopover.args = {
  ...Default.args,
  glass: true,
};
GlassPopover.decorators = [
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
];

/**
 * Glass popover with custom settings.
 */
export const GlassPopoverCustom = Template.bind({});
GlassPopoverCustom.args = {
  ...Default.args,
  glass: {
    displacementScale: 80,
    blurAmount: 2,
    saturation: 200,
    aberrationIntensity: 1,
    cornerRadius: 16,
    mode: 'polar',
  },
};
GlassPopoverCustom.decorators = [
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
];

/**
 * Glass popover with hover trigger.
 */
export const GlassPopoverHover = Template.bind({});
GlassPopoverHover.args = {
  ...Default.args,
  trigger: 'hover',
  delay: 200,
  glass: true,
};
GlassPopoverHover.decorators = [
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
];

/**
 * Glass popover with different positions.
 */
export const GlassPopoverPositions = Template.bind({});
GlassPopoverPositions.args = {
  ...Default.args,
  glass: true,
  defaultOpen: true,
};
GlassPopoverPositions.decorators = [
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
];
