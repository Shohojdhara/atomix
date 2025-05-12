/**
 * Todo item interface
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