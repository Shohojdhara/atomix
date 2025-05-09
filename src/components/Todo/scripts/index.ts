import { v4 as uuidv4 } from 'uuid';
import { TodoItem } from '../../../lib/types/components';
import { TODO } from '../../../lib/constants/components';

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
  DELETE = 'todo:delete'
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
    disabled: false
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
    this.element = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element;

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
    iconPath.setAttribute('d', 'M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z');
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
    
    // Item interaction events will be delegated and bound when rendering items
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
    this.element.dispatchEvent(new CustomEvent(TodoEvents.TOGGLE, {
      bubbles: true,
      detail: { id, completed: item.completed }
    }));
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
      this.element.dispatchEvent(new CustomEvent(TodoEvents.DELETE, {
        bubbles: true,
        detail: { id }
      }));
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
    const filteredItems = this.options.showCompleted === false
      ? this.items.filter(item => !item.completed)
      : this.items;
    
    // Check if empty
    if (filteredItems.length === 0) {
      const emptyItem = document.createElement('li');
      emptyItem.className = 'c-todo__empty';
      emptyItem.textContent = 'No items to display';
      this.listElement.appendChild(emptyItem);
      return;
    }
    
    // Create items
    filteredItems.forEach(item => {
      const li = document.createElement('li');
      li.className = TODO.CLASSES.ITEM;
      if (item.completed) {
        li.classList.add(TODO.CLASSES.COMPLETED);
      }
      
      const itemContent = document.createElement('div');
      itemContent.className = 'c-todo__item-content';
      
      // Checkbox label
      const label = document.createElement('label');
      label.className = 'c-todo__checkbox-label';
      
      // Checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'c-todo__checkbox c-checkbox';
      checkbox.checked = item.completed;
      checkbox.disabled = Boolean(this.options.disabled);
      checkbox.setAttribute('aria-label', `Mark "${item.text}" as ${item.completed ? 'incomplete' : 'complete'}`);
      checkbox.dataset.id = item.id;
      checkbox.addEventListener('change', () => this._handleToggle(item.id));
      
      // Text
      const text = document.createElement('span');
      text.className = 'c-todo__item-text';
      text.textContent = item.text;
      
      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'c-todo__delete-btn c-btn c-btn--error c-btn--sm';
      deleteBtn.disabled = Boolean(this.options.disabled);
      deleteBtn.setAttribute('aria-label', `Delete "${item.text}"`);
      deleteBtn.dataset.id = item.id;
      deleteBtn.addEventListener('click', () => this._handleDelete(item.id));

      // Trash icon (SVG)
      const svgNS = 'http://www.w3.org/2000/svg';
      const iconSvg = document.createElementNS(svgNS, 'svg');
      iconSvg.setAttribute('width', '16');
      iconSvg.setAttribute('height', '16');
      iconSvg.setAttribute('viewBox', '0 0 256 256');
      iconSvg.setAttribute('xmlns', svgNS);

      // Create the trash icon path
      const iconPath = document.createElementNS(svgNS, 'path');
      iconPath.setAttribute('d', 'M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z');
      iconPath.setAttribute('fill', 'currentColor');
      
      iconSvg.appendChild(iconPath);
      deleteBtn.appendChild(iconSvg);
      
      // Build component
      label.appendChild(checkbox);
      label.appendChild(text);
      
      itemContent.appendChild(label);
      itemContent.appendChild(deleteBtn);
      
      li.appendChild(itemContent);
      
      // Make sure listElement is still present before appending
      if (this.listElement) {
        this.listElement.appendChild(li);
      }
    });
  }

  /**
   * Add a new todo item
   * @public
   * @param text - Todo text
   * @returns The new todo item
   */
  public addTodo(text: string): TodoItem | null {
    if (!text.trim()) return null;
    
    const newItem: TodoItem = {
      id: uuidv4(),
      text: text.trim(),
      completed: false
    };
    
    this.items.push(newItem);
    this._renderItems();
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent(TodoEvents.ADD, {
      bubbles: true,
      detail: { item: newItem }
    }));
    
    return newItem;
  }

  /**
   * Toggle a todo item
   * @public
   * @param id - Item ID
   * @returns Updated item or null if not found
   */
  public toggleTodo(id: string): TodoItem | null {
    const item = this.items.find(item => item.id === id);
    if (!item) return null;
    
    item.completed = !item.completed;
    this._renderItems();
    
    return item;
  }

  /**
   * Delete a todo item
   * @public
   * @param id - Item ID
   * @returns Whether the item was successfully deleted
   */
  public deleteTodo(id: string): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter(item => item.id !== id);
    
    if (initialLength !== this.items.length) {
      this._renderItems();
      return true;
    }
    
    return false;
  }

  /**
   * Update items
   * @public
   * @param items - New items array
   */
  public updateItems(items: TodoItem[]): void {
    this.items = [...items];
    this._renderItems();
  }

  /**
   * Update component options
   * @public
   * @param options - New options
   */
  public update(options: Partial<TodoOptions>): void {
    this.options = { ...this.options, ...options };
    
    // Update DOM based on new options
    if (options.title && this.element.querySelector('.c-todo__title')) {
      const titleEl = this.element.querySelector('.c-todo__title') as HTMLElement;
      titleEl.textContent = options.title;
    }
    
    if (options.placeholder && this.inputElement) {
      this.inputElement.placeholder = options.placeholder;
    }
    
    if (options.disabled !== undefined) {
      if (this.inputElement) {
        this.inputElement.disabled = Boolean(options.disabled);
      }
      
      const addButton = this.element.querySelector('.c-todo__add-btn') as HTMLButtonElement | null;
      if (addButton) {
        addButton.disabled = Boolean(options.disabled);
      }
      
      const checkboxes = this.element.querySelectorAll('.c-todo__checkbox') as NodeListOf<HTMLInputElement>;
      checkboxes.forEach(checkbox => {
        checkbox.disabled = Boolean(options.disabled);
      });
      
      const deleteButtons = this.element.querySelectorAll('.c-todo__delete-btn') as NodeListOf<HTMLButtonElement>;
      deleteButtons.forEach(button => {
        button.disabled = Boolean(options.disabled);
      });
      
      if (options.disabled) {
        this.element.classList.add('c-todo--disabled');
      } else {
        this.element.classList.remove('c-todo--disabled');
      }
    }
    
    if (options.size) {
      this.element.classList.remove('c-todo--sm', 'c-todo--md', 'c-todo--lg');
      if (options.size !== 'md') {
        this.element.classList.add(`c-todo--${options.size}`);
      }
    }
    
    // Update items if provided
    if (options.items) {
      this.updateItems(options.items);
    }
    // Or re-render if showCompleted changed
    else if (options.showCompleted !== undefined) {
      this._renderItems();
    }
  }

  /**
   * Destroy the component
   * @public
   */
  public destroy(): void {
    // Remove event listeners
    if (this.formElement) {
      this.formElement.removeEventListener('submit', this._handleSubmit.bind(this));
    }
    
    // Clean up DOM
    this.element.innerHTML = '';
    this.element.classList.remove('c-todo', 'c-todo--sm', 'c-todo--md', 'c-todo--lg', 'c-todo--disabled');
    
    // Clear references
    this.listElement = null;
    this.formElement = null;
    this.inputElement = null;
  }

  /**
   * Initialize all Todo components on the page
   * @public
   * @static
   */
  public static initializeAll(selector = '[data-component="todo"]'): Todo[] {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(element => {
      // Try to get options from data attributes
      const options: TodoOptions = {};
      
      // Get title
      const title = element.getAttribute('data-title');
      if (title) options.title = title;
      
      // Get placeholder
      const placeholder = element.getAttribute('data-placeholder');
      if (placeholder) options.placeholder = placeholder;
      
      // Get size
      const size = element.getAttribute('data-size') as 'sm' | 'md' | 'lg' | null;
      if (size && ['sm', 'md', 'lg'].includes(size)) options.size = size;
      
      // Get disabled state
      const disabled = element.getAttribute('data-disabled');
      options.disabled = disabled === 'true';
      
      // Get showCompleted state
      const showCompleted = element.getAttribute('data-show-completed');
      options.showCompleted = showCompleted !== 'false';
      
      // Get items from data attribute
      const itemsAttr = element.getAttribute('data-items');
      if (itemsAttr) {
        try {
          options.items = JSON.parse(itemsAttr);
        } catch (e) {
          console.error('Todo: Error parsing items data attribute', e);
        }
      }
      
      return new Todo(element as HTMLElement, options);
    });
  }
} 