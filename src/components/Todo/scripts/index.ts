import { TODO } from '../../../lib/constants/components';
import type { TodoItem } from './types';
import { generateUUID } from '../../../lib/utils';

export type { TodoItem };
export { useTodo } from '../../../lib/composables/useTodo';

/**
 * TodoOptions interface for the vanilla JS implementation
 */
export interface TodoOptions {
  title?: string;
  items?: TodoItem[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  showCompleted?: boolean;
  disabled?: boolean;
  onAddTodo?: (text: string) => void;
  onToggleTodo?: (id: string) => void;
  onDeleteTodo?: (id: string) => void;
}

/**
 * TodoEvents for custom event types
 */
export enum TodoEvents {
  ADD = 'todo:add',
  TOGGLE = 'todo:toggle',
  DELETE = 'todo:delete',
}

/**
 * Todo Class - Vanilla JS implementation
 */
export class Todo {
  // Default options
  private static defaults: TodoOptions = {
    title: 'Todo List',
    items: [],
    placeholder: 'Add a new todo',
    size: 'md',
    showCompleted: true,
    disabled: false,
  };

  // DOM elements
  private element: HTMLElement;
  private listElement: HTMLElement | null = null;
  private formElement: HTMLFormElement | null = null;
  private inputElement: HTMLInputElement | null = null;

  // State
  private options: TodoOptions;
  private items: TodoItem[] = [];

  /**
   * Constructor
   * @param element - DOM element or selector
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: TodoOptions = {}) {
    // Get element reference
    this.element =
      typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element;

    if (!this.element) {
      throw new Error('Todo: Element not found');
    }

    // Merge default options with provided options
    this.options = { ...Todo.defaults, ...options };
    this.items = this.options.items || [];

    // Initialize the component
    this._initialize();
  }

  /**
   * Initialize the component
   * @private
   */
  private _initialize(): void {
    // Clear element
    this.element.innerHTML = '';

    // Add base class
    this.element.classList.add(TODO.CLASSES.BASE);

    // Add size class if not default
    if (this.options.size && this.options.size !== 'md') {
      this.element.classList.add(`c-todo--${this.options.size}`);
    }

    // Add disabled class if needed
    if (this.options.disabled) {
      this.element.classList.add('c-todo--disabled');
    }

    // Create structure
    this._createStructure();

    // Bind events
    this._bindEvents();

    // Render items
    this._renderItems();
  }

  /**
   * Create component structure
   * @private
   */
  private _createStructure(): void {
    // Title
    if (this.options.title) {
      const title = document.createElement('h2');
      title.className = 'c-todo__title';
      title.textContent = this.options.title;
      this.element.appendChild(title);
    }

    // Form
    this.formElement = document.createElement('form');
    this.formElement.className = 'c-todo__form';

    const formGroup = document.createElement('div');
    formGroup.className = 'c-todo__form-group';

    // Input
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'text';
    this.inputElement.className = 'c-todo__input c-input';
    this.inputElement.placeholder = this.options.placeholder || 'Add a new todo';
    this.inputElement.disabled = this.options.disabled || false;
    this.inputElement.setAttribute('aria-label', 'Add a new todo');

    // Add button
    const addButton = document.createElement('button');
    addButton.type = 'submit';
    addButton.className = 'c-todo__add-btn c-btn c-btn--primary';
    addButton.disabled = this.options.disabled || false;
    addButton.setAttribute('aria-label', 'Add todo');

    // Plus icon (SVG)
    const svgNS = 'http://www.w3.org/2000/svg';
    const iconSvg = document.createElementNS(svgNS, 'svg');
    iconSvg.setAttribute('width', '16');
    iconSvg.setAttribute('height', '16');
    iconSvg.setAttribute('viewBox', '0 0 256 256');
    iconSvg.setAttribute('fill', 'none');
    iconSvg.setAttribute('xmlns', svgNS);

    // Create the plus icon path
    const iconPath = document.createElementNS(svgNS, 'path');
    iconPath.setAttribute(
      'd',
      'M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z'
    );
    iconPath.setAttribute('fill', 'currentColor');

    iconSvg.appendChild(iconPath);
    addButton.appendChild(iconSvg);

    formGroup.appendChild(this.inputElement);
    formGroup.appendChild(addButton);
    this.formElement.appendChild(formGroup);
    this.element.appendChild(this.formElement);

    // List
    this.listElement = document.createElement('ul');
    this.listElement.className = 'c-todo__list';
    this.element.appendChild(this.listElement);
  }

  /**
   * Bind event listeners
   * @private
   */
  private _bindEvents(): void {
    if (this.formElement) {
      this.formElement.addEventListener('submit', this._handleSubmit.bind(this));
    }

    // Apply focus effect to input if available
    if (this.inputElement) {
      this.inputElement.addEventListener('focus', () => {
        const formGroup = this.inputElement
          ? this.inputElement.closest('.c-todo__form-group')
          : null;
        formGroup?.classList.add('is-focused');
      });

      this.inputElement.addEventListener('blur', () => {
        const formGroup = this.inputElement
          ? this.inputElement.closest('.c-todo__form-group')
          : null;
        formGroup?.classList.remove('is-focused');
      });
    }
  }

  /**
   * Handle form submission
   * @private
   */
  private _handleSubmit(event: Event): void {
    event.preventDefault();

    if (this.options.disabled || !this.inputElement) return;

    const text = this.inputElement.value.trim();
    if (!text) return;

    // Add new todo
    const newItem = this.addTodo(text);

    // Clear input
    this.inputElement.value = '';

    // Call callback if provided
    if (newItem && this.options.onAddTodo) {
      this.options.onAddTodo(newItem.text);
    }
  }

  /**
   * Handle item toggle
   * @private
   */
  private _handleToggle(id: string): void {
    if (this.options.disabled) return;

    const item = this.items.find(item => item.id === id);
    if (!item) return;

    item.completed = !item.completed;
    this._renderItems();

    // Call callback if provided
    if (this.options.onToggleTodo) {
      this.options.onToggleTodo(id);
    }

    // Dispatch custom event
    this.element.dispatchEvent(
      new CustomEvent(TodoEvents.TOGGLE, {
        bubbles: true,
        detail: { id, completed: item.completed },
      })
    );
  }

  /**
   * Handle item deletion
   * @private
   */
  private _handleDelete(id: string): void {
    if (this.options.disabled) return;

    const deleted = this.deleteTodo(id);

    if (deleted) {
      // Call callback if provided
      if (this.options.onDeleteTodo) {
        this.options.onDeleteTodo(id);
      }

      // Dispatch custom event
      this.element.dispatchEvent(
        new CustomEvent(TodoEvents.DELETE, {
          bubbles: true,
          detail: { id },
        })
      );
    }
  }

  /**
   * Render todo items
   * @private
   */
  private _renderItems(): void {
    if (!this.listElement) return;

    // Clear list
    this.listElement.innerHTML = '';

    // Filter items if needed
    const itemsToRender = this.options.showCompleted
      ? this.items
      : this.items.filter(item => !item.completed);

    // Render each item
    itemsToRender.forEach(item => {
      const listItem = document.createElement('li');
      listItem.className = 'c-todo__item';
      listItem.dataset.id = item.id;

      if (item.completed) {
        listItem.classList.add('c-todo__item--completed');
      }

      // Checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'c-todo__checkbox';
      checkbox.checked = item.completed;
      checkbox.disabled = this.options.disabled || false;
      checkbox.setAttribute(
        'aria-label',
        `Mark "${item.text}" as ${item.completed ? 'incomplete' : 'complete'}`
      );

      // Label
      const label = document.createElement('span');
      label.className = 'c-todo__text';
      label.textContent = item.text;

      // Delete button
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'c-todo__delete-btn';
      deleteButton.disabled = this.options.disabled || false;
      deleteButton.setAttribute('aria-label', `Delete "${item.text}"`);

      // Trash icon (SVG)
      const svgNS = 'http://www.w3.org/2000/svg';
      const iconSvg = document.createElementNS(svgNS, 'svg');
      iconSvg.setAttribute('width', '16');
      iconSvg.setAttribute('height', '16');
      iconSvg.setAttribute('viewBox', '0 0 256 256');
      iconSvg.setAttribute('fill', 'none');
      iconSvg.setAttribute('xmlns', svgNS);

      // Create the trash icon path
      const iconPath = document.createElementNS(svgNS, 'path');
      iconPath.setAttribute(
        'd',
        'M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z'
      );
      iconPath.setAttribute('fill', 'currentColor');

      iconSvg.appendChild(iconPath);
      deleteButton.appendChild(iconSvg);

      // Add elements to list item
      listItem.appendChild(checkbox);
      listItem.appendChild(label);
      listItem.appendChild(deleteButton);

      // Add list item to list
      if (this.listElement) {
        this.listElement.appendChild(listItem);
      }

      // Add event listeners
      checkbox.addEventListener('change', () => this._handleToggle(item.id));
      deleteButton.addEventListener('click', e => {
        e.preventDefault();
        this._handleDelete(item.id);
      });
    });
  }

  /**
   * Add a new todo item
   * @param text - Todo text
   * @returns The new todo item or null if failed
   */
  public addTodo(text: string): TodoItem | null {
    if (!text.trim() || this.options.disabled) return null;

    const newItem: TodoItem = {
      id: generateUUID(),
      text: text.trim(),
      completed: false,
    };

    this.items.push(newItem);
    this._renderItems();

    // Dispatch custom event
    this.element.dispatchEvent(
      new CustomEvent(TodoEvents.ADD, {
        bubbles: true,
        detail: { item: newItem },
      })
    );

    return newItem;
  }

  /**
   * Toggle a todo item's completed state
   * @param id - Todo item ID
   * @returns The toggled todo item or null if not found
   */
  public toggleTodo(id: string): TodoItem | null {
    const item = this.items.find(item => item.id === id);
    if (!item || this.options.disabled) return null;

    item.completed = !item.completed;
    this._renderItems();

    return item;
  }

  /**
   * Delete a todo item
   * @param id - Todo item ID
   * @returns Whether the item was deleted
   */
  public deleteTodo(id: string): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter(item => item.id !== id);

    if (this.items.length !== initialLength) {
      this._renderItems();
      return true;
    }

    return false;
  }

  /**
   * Update todo items
   * @param items - New todo items
   */
  public updateItems(items: TodoItem[]): void {
    this.items = items;
    this._renderItems();
  }

  /**
   * Update component options
   * @param options - New options
   */
  public update(options: Partial<TodoOptions>): void {
    this.options = { ...this.options, ...options };

    // Update disabled state
    if (options.disabled !== undefined) {
      if (options.disabled) {
        this.element.classList.add('c-todo--disabled');
      } else {
        this.element.classList.remove('c-todo--disabled');
      }

      if (this.inputElement) {
        this.inputElement.disabled = options.disabled;
      }

      const addButton = this.formElement?.querySelector('.c-todo__add-btn') as HTMLButtonElement;
      if (addButton) {
        addButton.disabled = options.disabled;
      }
    }

    // Update size
    if (options.size) {
      // Remove existing size classes
      ['sm', 'md', 'lg'].forEach(size => {
        this.element.classList.remove(`c-todo--${size}`);
      });

      // Add new size class if not default
      if (options.size !== 'md') {
        this.element.classList.add(`c-todo--${options.size}`);
      }
    }

    // Update title
    if (options.title !== undefined) {
      let titleElement = this.element.querySelector('.c-todo__title') as HTMLHeadingElement;

      if (options.title) {
        if (!titleElement) {
          titleElement = document.createElement('h2');
          titleElement.className = 'c-todo__title';
          this.element.insertBefore(titleElement, this.element.firstChild);
        }
        titleElement.textContent = options.title;
      } else if (titleElement) {
        titleElement.remove();
      }
    }

    // Update placeholder
    if (options.placeholder && this.inputElement) {
      this.inputElement.placeholder = options.placeholder;
    }

    // Update items or showCompleted flag
    if (options.items || options.showCompleted !== undefined) {
      if (options.items) {
        this.items = options.items;
      }
      this._renderItems();
    }
  }

  /**
   * Clean up event listeners
   */
  public destroy(): void {
    // Remove form event listener
    if (this.formElement) {
      this.formElement.removeEventListener('submit', this._handleSubmit);
    }

    // Remove input event listeners
    if (this.inputElement) {
      this.inputElement.removeEventListener('focus', () => {});
      this.inputElement.removeEventListener('blur', () => {});
    }

    // Clear element
    this.element.innerHTML = '';
    this.element.classList.remove(TODO.CLASSES.BASE);
  }

  /**
   * Initialize all Todo components in the document
   */
  public static initializeAll(): void {
    const todoElements = document.querySelectorAll<HTMLElement>('.c-todo');
    todoElements.forEach(element => {
      new Todo(element);
    });
  }
}

// Export todoInteractions
export * from './todoInteractions';

// Constants
export const DEFAULT_TODO_ITEMS: TodoItem[] = [
  {
    id: '1',
    text: 'Learn React',
    completed: true
  },
  {
    id: '2',
    text: 'Build a Todo App',
    completed: false
  },
  {
    id: '3',
    text: 'Deploy to production',
    completed: false
  }
];

// Helper functions

/**
 * Generate a unique ID for a todo item
 */
export function generateTodoId(): string {
  return generateUUID();
}

/**
 * Create a new todo item
 * @param text - Text content for the todo
 */
export function createTodoItem(text: string): TodoItem {
  return {
    id: generateUUID(),
    text,
    completed: false
  };
}
