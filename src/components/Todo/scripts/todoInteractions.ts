import { Todo, TodoEvents } from './index';
import { TodoItem } from './types';
import { TODO } from '../../../lib/constants/components';

/**
 * Apply hover effect to todo items
 * @param todoItem - Todo item element
 */
export function applyHoverEffect(todoItem: HTMLElement): void {
  const hoverClass = 'is-hovered';

  todoItem.addEventListener('mouseenter', () => {
    todoItem.classList.add(hoverClass);
  });

  todoItem.addEventListener('mouseleave', () => {
    todoItem.classList.remove(hoverClass);
  });
}

/**
 * Apply focus effect to todo input
 * @param input - Todo input element
 */
export function applyFocusEffect(input: HTMLInputElement): void {
  const focusClass = 'is-focused';
  const formGroup = input.closest('.c-todo__form-group');

  input.addEventListener('focus', () => {
    formGroup?.classList.add(focusClass);
  });

  input.addEventListener('blur', () => {
    formGroup?.classList.remove(focusClass);
  });
}

/**
 * Initialize a single todo item with event listeners
 * @param item - Todo item element
 * @param id - Todo item ID
 * @param onToggle - Toggle callback
 * @param onDelete - Delete callback
 */
export function initializeTodoItem(
  item: HTMLElement,
  id: string,
  onToggle?: (id: string) => void,
  onDelete?: (id: string) => void
): void {
  const checkbox = item.querySelector('.c-todo__checkbox') as HTMLInputElement;
  const deleteButton = item.querySelector('.c-todo__delete-btn') as HTMLButtonElement;

  if (checkbox) {
    checkbox.addEventListener('change', () => {
      if (onToggle) onToggle(id);
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener('click', e => {
      e.preventDefault();
      if (onDelete) onDelete(id);
    });
  }

  // Apply hover effect
  applyHoverEffect(item);
}

/**
 * Initialize all todos on the page
 * @returns Array of todo instances
 */
export function initializeAllTodos(selector = '[data-component="todo"]'): Todo[] {
  const todoInstances: Todo[] = [];
  const todoElements = document.querySelectorAll<HTMLElement>(selector);

  todoElements.forEach(element => {
    try {
      const instance = new Todo(element);
      todoInstances.push(instance);
    } catch (error) {
      console.error('Error initializing todo:', error);
    }
  });

  return todoInstances;
}

/**
 * Filter todo items by completion status
 * @param items - Todo items array
 * @param showCompleted - Whether to include completed items
 * @returns Filtered todo items
 */
export function filterTodoItems(items: TodoItem[], showCompleted: boolean): TodoItem[] {
  if (showCompleted) {
    return [...items];
  }
  return items.filter(item => !item.completed);
}

/**
 * Sort todo items by completion status and creation time
 * @param items - Todo items array
 * @returns Sorted todo items
 */
export function sortTodoItems(items: TodoItem[]): TodoItem[] {
  return [...items].sort((a, b) => {
    // Sort by completion status first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then by creation time (assuming newer items have higher IDs)
    return a.id.localeCompare(b.id);
  });
}
