import { AtomixGlassProps } from './atomixGlass';
import { Size, BaseComponentProps } from './common';


/**
 * Todo item data structure
 */
export interface TodoItem {
  /**
   * Unique identifier for the todo
   */
  id: string;

  /**
   * Todo item text
   */
  text: string;

  /**
   * Whether the todo is completed
   */
  completed: boolean;
}


/**
 * Todo component properties
 */
export interface TodoProps extends BaseComponentProps {
  /**
   * List of todo items
   */
  items: TodoItem[];

  /**
   * Callback when a todo item is added
   */
  onAddTodo?: (text: string) => void;

  /**
   * Callback when a todo item is toggled
   */
  onToggleTodo?: (id: string) => void;

  /**
   * Callback when a todo item is deleted
   */
  onDeleteTodo?: (id: string) => void;

  /**
   * Title of the todo list
   */
  title?: string;

  /**
   * Size variant for the todo component
   */
  size?: Size;

  /**
   * Placeholder text for the new todo input
   */
  placeholder?: string;

  /**
   * Whether to show the completed todos
   */
  showCompleted?: boolean;

  /**
   * Glass morphism effect for the todo component
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}
