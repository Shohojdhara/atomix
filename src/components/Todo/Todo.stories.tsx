import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Todo } from './Todo';
import { TodoItem } from '../../lib/types/components';
import { v4 as uuidv4 } from 'uuid';

const meta = {
  title: 'Components/Todo',
  component: Todo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title for the todo list',
    },
    items: {
      control: 'object',
      description: 'Array of todo items',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the todo component',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the new todo input',
    },
    showCompleted: {
      control: 'boolean',
      description: 'Whether to show completed todos',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
    },
  },
} satisfies Meta<typeof Todo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample todo items
const sampleItems: TodoItem[] = [
  { id: uuidv4(), text: 'Complete project documentation', completed: false },
  { id: uuidv4(), text: 'Review pull requests', completed: true },
  { id: uuidv4(), text: 'Update dependencies', completed: false },
  { id: uuidv4(), text: 'Write unit tests', completed: false },
  { id: uuidv4(), text: 'Fix accessibility issues', completed: true },
];

// Basic example
export const Basic: Story = {
  args: {
    title: 'Todo List',
    items: sampleItems,
    size: 'md',
    placeholder: 'Add a new todo',
    showCompleted: true,
  },
};

// Interactive example
export const Interactive: Story = {
  args: {
    title: 'My Tasks',
    items: [],
    size: 'md',
    placeholder: 'Add a new todo',
    showCompleted: true,
  },
  render: (args) => {
    const [items, setItems] = useState<TodoItem[]>([
      { id: uuidv4(), text: 'Learn React', completed: true },
      { id: uuidv4(), text: 'Build a todo app', completed: false },
      { id: uuidv4(), text: 'Deploy to production', completed: false },
    ]);

    const handleAddTodo = (text: string) => {
      const newItem: TodoItem = {
        id: uuidv4(),
        text,
        completed: false,
      };
      setItems([...items, newItem]);
    };

    const handleToggleTodo = (id: string) => {
      setItems(
        items.map(item =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    };

    const handleDeleteTodo = (id: string) => {
      setItems(items.filter(item => item.id !== id));
    };

    return (
      <div style={{ width: '500px' }}>
        <Todo
          {...args}
          title="My Tasks"
          items={items}
          onAddTodo={handleAddTodo}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
    );
  },
};

// Size variants
export const Sizes: Story = {
  args: {
    items: sampleItems.slice(0, 3),
    showCompleted: true,
  },
  render: (args) => (
    <div className="u-d-flex u-flex-column u-gap-4">
      <Todo
        {...args}
        title="Small Todo List"
        items={args.items}
        size="sm"
      />
      <Todo
        {...args}
        title="Medium Todo List"
        items={args.items}
        size="md"
      />
      <Todo
        {...args}
        title="Large Todo List"
        items={args.items}
        size="lg"
      />
    </div>
  ),
};

// Empty state
export const Empty: Story = {
  args: {
    title: 'Empty Todo List',
    items: [],
  },
};

// Hide completed todos
export const HideCompleted: Story = {
  args: {
    title: 'Active Tasks Only',
    items: sampleItems,
    showCompleted: false,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    title: 'Disabled Todo List',
    items: sampleItems,
    disabled: true,
  },
}; 