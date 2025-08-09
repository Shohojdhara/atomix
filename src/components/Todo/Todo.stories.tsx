import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Todo } from './Todo';
import { generateUUID } from '../../lib/utils';

const meta: Meta<typeof Todo> = {
  title: 'Components/Todo',
  component: Todo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    title: { control: 'text' },

    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    placeholder: { control: 'text' },
    showCompleted: { control: 'boolean' },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Todo>;

export const Default: Story = {
  args: {
    items: [
      { id: '1', text: 'Learn React', completed: true },
      { id: '2', text: 'Build a todo app', completed: false },
      { id: '3', text: 'Deploy to production', completed: false },
    ],
    title: 'Todo List',
    placeholder: 'Add a new task',
    size: 'md',
    showCompleted: true,
    disabled: false,
  },
};

export const WithManyItems: Story = {
  args: {
    items: [
      { id: generateUUID(), text: 'Complete project documentation', completed: false },
      { id: generateUUID(), text: 'Review pull requests', completed: true },
      { id: generateUUID(), text: 'Update dependencies', completed: false },
      { id: generateUUID(), text: 'Write unit tests', completed: false },
      { id: generateUUID(), text: 'Fix accessibility issues', completed: true },
    ],
    title: 'Project Tasks',
    showCompleted: true,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const HideCompleted: Story = {
  args: {
    items: [
      { id: generateUUID(), text: 'Learn React', completed: true },
      { id: generateUUID(), text: 'Build a todo app', completed: false },
      { id: generateUUID(), text: 'Deploy to production', completed: false },
    ],
    showCompleted: false,
    title: 'Active Tasks',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const CustomTitle: Story = {
  args: {
    ...Default.args,
    title: 'My Custom Todo List',
  },
};

export const NoTitle: Story = {
  args: {
    ...Default.args,
    title: '',
  },
};
