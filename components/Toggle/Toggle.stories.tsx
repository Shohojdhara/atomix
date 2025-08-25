import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { Toggle } from './Toggle';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    initialOn: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
} as Meta<typeof Toggle>;

const Template: StoryFn<typeof Toggle> = args => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
    <Toggle {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  initialOn: false,
  disabled: false,
};

export const InitiallyOn = Template.bind({});
InitiallyOn.args = {
  initialOn: true,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  initialOn: false,
  disabled: true,
};

export const DisabledOn = Template.bind({});
DisabledOn.args = {
  initialOn: true,
  disabled: true,
};
