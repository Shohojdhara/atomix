import { useState } from 'react';
import { TodoProps, Size } from '../types/components';
import { TodoItem } from '../../components/Todo/scripts/types';
import { v4 as uuidv4 } from 'uuid';
import { TODO, SIZES } from '../constants/components';

/**
 * Todo composable hook - manages todo items state and operations
 * @param initialProps - Initial todo properties
 * @returns Todo state and methods
 */
export function useTodo(initialProps?: Partial<TodoProps>) {
  // Default todo properties
  const defaultProps: Partial<TodoProps> = {
    items: [],
    title: 'Todo List',
    size: 'md',
    placeholder: 'Add a new todo',
    showCompleted: true,
    ...initialProps,
  };

  // State
  const [items, setItems] = useState<TodoItem[]>(defaultProps.items || []);
  const [inputText, setInputText] = useState<string>('');

  /**
   * Generate todo classes based on properties
   * @param props - Todo properties
   * @returns Class string for the todo component
   */
  const generateTodoClasses = (props: Partial<TodoProps>): string => {
    const { size = defaultProps.size, className = '', disabled = false } = props;

    const sizeClass = size === 'md' ? '' : `c-todo--${size}`;
    const disabledClass = disabled ? 'c-todo--disabled' : '';

    return `${TODO.CLASSES.BASE} ${sizeClass} ${disabledClass} ${className}`.trim();
  };

  /**
   * Generate todo item classes based on completion status
   * @param item - Todo item
   * @returns Class string for the todo item
   */
  const generateItemClasses = (item: TodoItem): string => {
    const completedClass = item.completed ? TODO.CLASSES.COMPLETED : '';
    return `${TODO.CLASSES.ITEM} ${completedClass}`.trim();
  };

  /**
   * Add a new todo item
   * @param text - Text for the new todo
   * @returns The new todo item
   */
  const addTodo = (text: string): TodoItem | null => {
    if (!text.trim()) return null;

    const newItem: TodoItem = {
      id: uuidv4(),
      text: text.trim(),
      completed: false,
    };

    setItems(prevItems => [...prevItems, newItem]);
    setInputText('');
    return newItem;
  };

  /**
   * Toggle the completed state of a todo item
   * @param id - ID of the todo item to toggle
   * @returns Updated todo item or null if not found
   */
  const toggleTodo = (id: string): TodoItem | null => {
    let updatedItem: TodoItem | null = null;

    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          updatedItem = { ...item, completed: !item.completed };
          return updatedItem;
        }
        return item;
      });
    });

    return updatedItem;
  };

  /**
   * Delete a todo item
   * @param id - ID of the todo item to delete
   * @returns Boolean indicating successful deletion
   */
  const deleteTodo = (id: string): boolean => {
    const initialLength = items.length;

    setItems(prevItems => prevItems.filter(item => item.id !== id));

    return items.length !== initialLength;
  };

  /**
   * Handle form submission for adding a new todo
   * @param event - Form submit event
   * @param onAddTodo - Optional callback when a todo is added
   */
  const handleSubmit = (event: React.FormEvent, onAddTodo?: (text: string) => void) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    const newItem = addTodo(inputText);

    if (newItem && onAddTodo) {
      onAddTodo(newItem.text);
    }
  };

  /**
   * Get filtered items based on showCompleted prop
   * @param showCompleted - Whether to show completed items
   * @returns Filtered todo items
   */
  const getFilteredItems = (showCompleted: boolean = true): TodoItem[] => {
    if (showCompleted) return items;
    return items.filter(item => !item.completed);
  };

  return {
    items,
    inputText,
    setInputText,
    addTodo,
    toggleTodo,
    deleteTodo,
    handleSubmit,
    generateTodoClasses,
    generateItemClasses,
    getFilteredItems,
  };
}
