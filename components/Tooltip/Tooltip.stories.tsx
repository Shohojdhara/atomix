import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Tooltip } from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    position: {
      control: { type: 'select' },
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
      defaultValue: 'top',
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'click'],
      defaultValue: 'hover',
    },
    delay: {
      control: { type: 'number' },
      defaultValue: 200,
    },
    offset: {
      control: { type: 'number' },
      defaultValue: 10,
    },
  },
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = args => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
    <Tooltip {...args}>
      <button className="c-btn c-btn--primary">Hover me</button>
    </Tooltip>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  content: <p className="u-mb-0">This is a tooltip on top</p>,
  position: 'top',
  trigger: 'hover',
};

export const ClickTrigger = Template.bind({});
ClickTrigger.args = {
  content: <p className="u-mb-0">Click anywhere to close this tooltip</p>,
  position: 'top',
  trigger: 'click',
};

export const BottomPosition = Template.bind({});
BottomPosition.args = {
  content: <p className="u-mb-0">This tooltip appears below the trigger</p>,
  position: 'bottom',
};

export const LeftPosition = Template.bind({});
LeftPosition.args = {
  content: <p className="u-mb-0">This tooltip appears to the left</p>,
  position: 'left',
};

export const RightPosition = Template.bind({});
RightPosition.args = {
  content: <p className="u-mb-0">This tooltip appears to the right</p>,
  position: 'right',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  content: <p className="u-mb-0">Tooltips work great with icons</p>,
  position: 'top',
  children: <i className="icon-lux-info" style={{ fontSize: '24px', cursor: 'pointer' }}></i>,
};

export const CustomDelay = Template.bind({});
CustomDelay.args = {
  content: <p className="u-mb-0">This tooltip has a longer delay</p>,
  position: 'top',
  delay: 500,
};

export const CustomOffset = Template.bind({});
CustomOffset.args = {
  content: <p className="u-mb-0">This tooltip has a larger offset from the trigger</p>,
  position: 'top',
  offset: 20,
};

export const RichContent = Template.bind({});
RichContent.args = {
  content: (
    <div>
      <h4 style={{ marginTop: 0, marginBottom: '8px' }}>Rich Tooltip Content</h4>
      <ul style={{ margin: 0, paddingLeft: '16px' }}>
        <li>Supports HTML content</li>
        <li>Can include multiple elements</li>
        <li>Helpful for complex information</li>
      </ul>
    </div>
  ),
  position: 'bottom',
  trigger: 'click',
  offset: 15,
};
