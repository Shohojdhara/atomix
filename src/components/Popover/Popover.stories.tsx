import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
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
    onOpenChange: { action: 'openChange' },
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
