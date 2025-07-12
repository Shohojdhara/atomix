import React from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { Progress } from './Progress';
import { ProgressProps } from '../../lib/types/components';

export default {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'light', 'dark'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
  },
} as Meta<typeof Progress>;

const Template: StoryFn<ProgressProps> = (args: ProgressProps) => <Progress {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 50,
  variant: 'primary',
  size: 'md',
};

export const Secondary = Template.bind({});
Secondary.args = {
  value: 75,
  variant: 'secondary',
  size: 'md',
};

export const Success = Template.bind({});
Success.args = {
  value: 100,
  variant: 'success',
  size: 'md',
};

export const Warning = Template.bind({});
Warning.args = {
  value: 25,
  variant: 'warning',
  size: 'md',
};

export const Error = Template.bind({});
Error.args = {
  value: 10,
  variant: 'error',
  size: 'md',
};

export const Small = Template.bind({});
Small.args = {
  value: 60,
  variant: 'primary',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  value: 80,
  variant: 'primary',
  size: 'lg',
};
