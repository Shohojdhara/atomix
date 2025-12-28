import type { Meta, StoryObj } from '@storybook/react';
import { generateUUID } from '../../lib/utils';
import { Todo } from './Todo';
import { SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/Todo',
  component: Todo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Todo component provides a complete todo list interface with the ability to add, complete, and manage tasks. It supports multiple sizes, can show or hide completed items, and provides a clean interface for task management. Ideal for task tracking, project management, or any scenario requiring a simple todo list.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of todo items',
    },
    title: {
      control: 'text',
      description: 'Title of the todo list',
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'Size of the todo component',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field',
    },
    showCompleted: {
      control: 'boolean',
      description: 'Whether to show completed items',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the todo list is disabled',
    },
  },
} satisfies Meta<typeof Todo>;

export default meta;
type Story = StoryObj<typeof meta>;

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
