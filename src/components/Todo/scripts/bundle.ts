import { Todo, TodoEvents } from './index';
import { initializeAllTodos, filterTodoItems, sortTodoItems } from './todoInteractions';

// Initialize global namespace if not exists
window.Atomix = window.Atomix || {};

// Add Todo to global namespace
window.Atomix.Todo = Todo;
window.Atomix.TodoEvents = TodoEvents;
window.Atomix.initializeAllTodos = initializeAllTodos;
window.Atomix.filterTodoItems = filterTodoItems;
window.Atomix.sortTodoItems = sortTodoItems;

export default Todo;
