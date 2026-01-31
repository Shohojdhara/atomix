import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
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
        component: `
# Todo

## Overview

Todo component provides a complete todo list interface with the ability to add, complete, and manage tasks. It supports multiple sizes, can show or hide completed items, and provides a clean interface for task management. Ideal for task tracking, project management, or any scenario requiring a simple todo list.

## Features

- Add, complete, and manage tasks
- Multiple size options
- Show/hide completed items
- Clean and intuitive interface
- Responsive design
- Task persistence
- Accessible markup

## Accessibility

- Keyboard support: Navigate and interact with todos using keyboard
- Screen reader: Task status and content announced properly
- ARIA support: Proper roles and properties for todo components
- Focus management: Maintains focus on interactive elements

## Usage Examples

### Basic Usage

\`\`\`tsx
<Todo 
  items={[
    { id: '1', text: 'Task 1', completed: false },
    { id: '2', text: 'Task 2', completed: true },
  ]}
  title="My Tasks"
  placeholder="Add a new task"
/>
\`\`\`

### With Configuration

\`\`\`tsx
<Todo 
  items={tasks}
  title="Project Tasks"
  placeholder="Add a new task"
  size="lg"
  showCompleted={false}
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| items | TodoItem[] | [] | Array of todo items |
| title | string | - | Title of the todo list |
| size | 'sm' \\| 'md' \\| 'lg' | 'md' | Size of the todo component |
| placeholder | string | - | Placeholder text for the input field |
| showCompleted | boolean | true | Whether to show completed items |
| className | string | - | Additional CSS class names |
| disabled | boolean | false | Whether the todo list is disabled |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of todo items',
      table: {
        type: { summary: 'TodoItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    title: {
      control: 'text',
      description: 'Title of the todo list',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'Size of the todo component',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    showCompleted: {
      control: 'boolean',
      description: 'Whether to show completed items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the todo list is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
} satisfies Meta<typeof Todo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUsage: Story = {
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
  parameters: {
    docs: {
      description: {
        story: 'Basic todo list with sample tasks.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Todo list with multiple tasks.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    items: [
      { id: '1', text: 'Learn React', completed: true },
      { id: '2', text: 'Build a todo app', completed: false },
      { id: '3', text: 'Deploy to production', completed: false },
    ],
    title: 'Todo List',
    placeholder: 'Add a new task',
    size: 'sm',
    showCompleted: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Small-sized todo list.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    items: [
      { id: '1', text: 'Learn React', completed: true },
      { id: '2', text: 'Build a todo app', completed: false },
      { id: '3', text: 'Deploy to production', completed: false },
    ],
    title: 'Todo List',
    placeholder: 'Add a new task',
    size: 'lg',
    showCompleted: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Large-sized todo list.',
      },
    },
  },
};

export const HideCompleted: Story = {
  args: {
    items: [
      { id: generateUUID(), text: 'Learn React', completed: true },
      { id: generateUUID(), text: 'Build a todo app', completed: false },
      { id: generateUUID(), text: 'Deploy to production', completed: false },
    ],
    title: 'Todo List',
    placeholder: 'Add a new task',
    showCompleted: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Todo list that hides completed items.',
      },
    },
  },
};

export const Disabled: Story = {
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
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled todo list.',
      },
    },
  },
};

export const CustomTitle: Story = {
  args: {
    items: [
      { id: '1', text: 'Learn React', completed: true },
      { id: '2', text: 'Build a todo app', completed: false },
      { id: '3', text: 'Deploy to production', completed: false },
    ],
    title: 'My Custom Todo List',
    placeholder: 'Add a new task',
    size: 'md',
    showCompleted: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Todo list with a custom title.',
      },
    },
  },
};

export const NoTitle: Story = {
  args: {
    items: [
      { id: '1', text: 'Learn React', completed: true },
      { id: '2', text: 'Build a todo app', completed: false },
      { id: '3', text: 'Deploy to production', completed: false },
    ],
    title: '',
    placeholder: 'Add a new task',
    size: 'md',
    showCompleted: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Todo list without a title.',
      },
    },
  },
};
