# Todo

The Todo component provides a complete task management interface with add, toggle, and delete functionality. It's perfect for creating todo lists, task trackers, and simple project management interfaces with a clean and intuitive design.

## Overview

The Todo component combines a task input field with a dynamic list that supports task completion states, deletion, and filtering. It provides both controlled and uncontrolled modes of operation, making it flexible for different use cases from simple static lists to complex task management systems.

## Installation

The Todo component is included in the Atomix package. Import it in your React components:

```jsx
import { Todo } from '@shohojdhara/atomix';
```

For vanilla JavaScript projects, the todo styles and functionality are available through the CSS classes and JavaScript modules.

## Basic Usage

### React

```jsx
import { Todo } from '@shohojdhara/atomix';

function MyComponent() {
  const [todoItems, setTodoItems] = useState([
    { id: '1', text: 'Complete project documentation', completed: false },
    { id: '2', text: 'Review code changes', completed: true },
    { id: '3', text: 'Deploy to production', completed: false }
  ]);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    setTodoItems(prev => [...prev, newTodo]);
  };

  const handleToggleTodo = (id) => {
    setTodoItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodoItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Todo
      title="My Tasks"
      items={todoItems}
      onAddTodo={handleAddTodo}
      onToggleTodo={handleToggleTodo}
      onDeleteTodo={handleDeleteTodo}
      placeholder="Add a new task..."
    />
  );
}
```

### HTML/CSS

```html
<!-- Todo list structure -->
<div class="c-todo">
  <div class="c-todo__header">
    <h3 class="c-todo__title">Todo List</h3>
  </div>
  
  <form class="c-todo__form">
    <input 
      type="text" 
      class="c-todo__input" 
      placeholder="Add a new todo..."
    />
    <button type="submit" class="c-todo__add-button">
      <svg class="c-icon"><!-- Plus icon --></svg>
    </button>
  </form>
  
  <ul class="c-todo__list">
    <li class="c-todo__item">
      <label class="c-todo__item-label">
        <input type="checkbox" class="c-todo__checkbox" />
        <span class="c-todo__item-text">Task item text</span>
      </label>
      <button class="c-todo__delete-button">
        <svg class="c-icon"><!-- Trash icon --></svg>
      </button>
    </li>
    
    <li class="c-todo__item c-todo__item--completed">
      <label class="c-todo__item-label">
        <input type="checkbox" class="c-todo__checkbox" checked />
        <span class="c-todo__item-text">Completed task</span>
      </label>
      <button class="c-todo__delete-button">
        <svg class="c-icon"><!-- Trash icon --></svg>
      </button>
    </li>
  </ul>
</div>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TodoItem[]` | `[]` | Array of todo items |
| `title` | `string` | `'Todo List'` | Title displayed at the top of the component |
| `onAddTodo` | `(text: string) => void` | - | Callback when a new todo is added |
| `onToggleTodo` | `(id: string) => void` | - | Callback when a todo is toggled |
| `onDeleteTodo` | `(id: string) => void` | - | Callback when a todo is deleted |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant of the todo component |
| `placeholder` | `string` | `'Add a new todo'` | Placeholder text for the input field |
| `showCompleted` | `boolean` | `true` | Whether to show completed todos |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Whether the todo component is disabled |

### TodoItem Interface

```typescript
interface TodoItem {
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
```

## Examples

### Basic Todo List

```jsx
function BasicTodoList() {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Learn React', completed: true },
    { id: '2', text: 'Build a todo app', completed: false },
    { id: '3', text: 'Deploy the app', completed: false }
  ]);

  return (
    <Todo
      title="My Learning Goals"
      items={todos}
      onAddTodo={(text) => {
        setTodos(prev => [...prev, {
          id: Date.now().toString(),
          text,
          completed: false
        }]);
      }}
      onToggleTodo={(id) => {
        setTodos(prev => prev.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
      }}
      onDeleteTodo={(id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      }}
    />
  );
}
```

### Different Sizes

```jsx
function TodoSizes() {
  const sampleTodos = [
    { id: '1', text: 'Small todo item', completed: false },
    { id: '2', text: 'Another task', completed: true }
  ];

  return (
    <div className="todo-sizes-demo">
      <Todo
        title="Small Todo"
        items={sampleTodos}
        size="sm"
        placeholder="Add small task..."
      />
      
      <Todo
        title="Medium Todo"
        items={sampleTodos}
        size="md"
        placeholder="Add medium task..."
      />
      
      <Todo
        title="Large Todo"
        items={sampleTodos}
        size="lg"
        placeholder="Add large task..."
      />
    </div>
  );
}
```

### Project Task Manager

```jsx
function ProjectTaskManager() {
  const [projects, setProjects] = useState({
    design: [
      { id: '1', text: 'Create wireframes', completed: true },
      { id: '2', text: 'Design mockups', completed: false },
      { id: '3', text: 'User testing', completed: false }
    ],
    development: [
      { id: '4', text: 'Set up project structure', completed: true },
      { id: '5', text: 'Implement components', completed: false },
      { id: '6', text: 'Write tests', completed: false }
    ],
    marketing: [
      { id: '7', text: 'Create landing page', completed: false },
      { id: '8', text: 'Social media campaign', completed: false }
    ]
  });

  const handleProjectTodoAdd = (projectKey) => (text) => {
    setProjects(prev => ({
      ...prev,
      [projectKey]: [...prev[projectKey], {
        id: Date.now().toString(),
        text,
        completed: false
      }]
    }));
  };

  const handleProjectTodoToggle = (projectKey) => (id) => {
    setProjects(prev => ({
      ...prev,
      [projectKey]: prev[projectKey].map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  const handleProjectTodoDelete = (projectKey) => (id) => {
    setProjects(prev => ({
      ...prev,
      [projectKey]: prev[projectKey].filter(todo => todo.id !== id)
    }));
  };

  return (
    <div className="project-manager">
      <h2>Project Task Manager</h2>
      <div className="project-columns">
        {Object.entries(projects).map(([projectKey, todos]) => (
          <div key={projectKey} className="project-column">
            <Todo
              title={projectKey.charAt(0).toUpperCase() + projectKey.slice(1)}
              items={todos}
              onAddTodo={handleProjectTodoAdd(projectKey)}
              onToggleTodo={handleProjectTodoToggle(projectKey)}
              onDeleteTodo={handleProjectTodoDelete(projectKey)}
              placeholder={`Add ${projectKey} task...`}
              className="project-todo"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Todo with Statistics

```jsx
function TodoWithStats() {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Morning workout', completed: true },
    { id: '2', text: 'Read for 30 minutes', completed: true },
    { id: '3', text: 'Complete project report', completed: false },
    { id: '4', text: 'Call mom', completed: false },
    { id: '5', text: 'Grocery shopping', completed: false }
  ]);

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="todo-with-stats">
      <div className="todo-stats">
        <div className="stat-item">
          <span className="stat-number">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{totalCount - completedCount}</span>
          <span className="stat-label">Remaining</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{Math.round(completionPercentage)}%</span>
          <span className="stat-label">Progress</span>
        </div>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <Todo
        title="Daily Goals"
        items={todos}
        onAddTodo={(text) => {
          setTodos(prev => [...prev, {
            id: Date.now().toString(),
            text,
            completed: false
          }]);
        }}
        onToggleTodo={(id) => {
          setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ));
        }}
        onDeleteTodo={(id) => {
          setTodos(prev => prev.filter(todo => todo.id !== id));
        }}
      />
    </div>
  );
}
```

### Filtered Todo Views

```jsx
function FilteredTodoViews() {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Buy groceries', completed: false },
    { id: '2', text: 'Walk the dog', completed: true },
    { id: '3', text: 'Finish presentation', completed: false },
    { id: '4', text: 'Call dentist', completed: true }
  ]);

  const [filter, setFilter] = useState('all'); // all, active, completed

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="filtered-todo">
      <div className="filter-tabs">
        {['all', 'active', 'completed'].map(filterType => (
          <button
            key={filterType}
            className={`filter-tab ${filter === filterType ? 'active' : ''}`}
            onClick={() => setFilter(filterType)}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      <Todo
        title={`${filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks`}
        items={filteredTodos}
        showCompleted={true}
        onAddTodo={(text) => {
          setTodos(prev => [...prev, {
            id: Date.now().toString(),
            text,
            completed: false
          }]);
        }}
        onToggleTodo={(id) => {
          setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ));
        }}
        onDeleteTodo={(id) => {
          setTodos(prev => prev.filter(todo => todo.id !== id));
        }}
      />
    </div>
  );
}
```

### Todo with Categories

```jsx
function CategorizedTodo() {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Review pull requests', completed: false, category: 'work' },
    { id: '2', text: 'Buy birthday gift', completed: false, category: 'personal' },
    { id: '3', text: 'Schedule team meeting', completed: true, category: 'work' },
    { id: '4', text: 'Plan weekend trip', completed: false, category: 'personal' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'work', 'personal'];
  const filteredTodos = selectedCategory === 'all' 
    ? todos 
    : todos.filter(todo => todo.category === selectedCategory);

  return (
    <div className="categorized-todo">
      <div className="category-selector">
        <label htmlFor="category-select">Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <Todo
        title={`${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tasks`}
        items={filteredTodos.map(({ category, ...todo }) => todo)}
        onAddTodo={(text) => {
          setTodos(prev => [...prev, {
            id: Date.now().toString(),
            text,
            completed: false,
            category: selectedCategory === 'all' ? 'work' : selectedCategory
          }]);
        }}
        onToggleTodo={(id) => {
          setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ));
        }}
        onDeleteTodo={(id) => {
          setTodos(prev => prev.filter(todo => todo.id !== id));
        }}
        placeholder={`Add ${selectedCategory} task...`}
      />
    </div>
  );
}
```

### Persistent Todo List

```jsx
function PersistentTodoList() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todoItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const handleToggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date().toISOString() : null }
        : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <div className="persistent-todo">
      <Todo
        title="My Persistent Todo List"
        items={todos}
        onAddTodo={handleAddTodo}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
        placeholder="Add a task (auto-saved)..."
      />
      
      {todos.some(todo => todo.completed) && (
        <div className="todo-actions">
          <button onClick={clearCompleted} className="clear-completed-btn">
            Clear Completed
          </button>
        </div>
      )}
    </div>
  );
}
```

## Accessibility

The Todo component follows WCAG accessibility guidelines:

### Keyboard Support

- **Tab**: Navigate through input field, checkboxes, and delete buttons
- **Enter**: Add new todo (when input is focused) or toggle todo (when checkbox is focused)
- **Space**: Toggle checkbox when focused
- **Delete/Backspace**: Delete todo when delete button is focused

### ARIA Attributes

- `role="list"` on the todo list container
- `role="listitem"` on individual todo items
- `aria-label` for delete buttons and checkboxes
- `aria-describedby` for todo statistics
- `aria-live="polite"` for status updates

### Screen Reader Support

```jsx
function AccessibleTodo() {
  const [todos, setTodos] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    setTodos(prev => [...prev, newTodo]);
    setStatusMessage(`Added task: ${text}`);
    
    // Clear status message after announcement
    setTimeout(() => setStatusMessage(''), 1000);
  };

  const handleToggleTodo = (id) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        setStatusMessage(`Task ${updatedTodo.completed ? 'completed' : 'reopened'}: ${todo.text}`);
        return updatedTodo;
      }
      return todo;
    }));
  };

  return (
    <div>
      <Todo
        title="Accessible Todo List"
        items={todos}
        onAddTodo={handleAddTodo}
        onToggleTodo={handleToggleTodo}
        aria-label="Task management interface"
      />
      
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {statusMessage}
      </div>
    </div>
  );
}
```

### Best Practices

1. **Provide clear labels** for all interactive elements
2. **Use semantic HTML** for list structure
3. **Include status updates** for screen readers
4. **Ensure keyboard accessibility** for all functions
5. **Maintain focus management** when items are added/removed

## Styling

### CSS Custom Properties

The Todo component uses CSS custom properties for theming:

```css
:root {
  /* Container */
  --atomix-todo-bg: var(--atomix-white);
  --atomix-todo-border: 1px solid var(--atomix-border-color);
  --atomix-todo-border-radius: var(--atomix-border-radius-lg);
  --atomix-todo-padding: 1.5rem;
  --atomix-todo-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  /* Header */
  --atomix-todo-title-font-size: 1.25rem;
  --atomix-todo-title-font-weight: 600;
  --atomix-todo-title-color: var(--atomix-text-primary);
  --atomix-todo-title-margin: 0 0 1.5rem;

  /* Input */
  --atomix-todo-input-border: 1px solid var(--atomix-border-color);
  --atomix-todo-input-border-radius: var(--atomix-border-radius);
  --atomix-todo-input-padding: 0.75rem;
  --atomix-todo-input-font-size: 1rem;

  /* List */
  --atomix-todo-list-gap: 0.5rem;
  --atomix-todo-item-padding: 0.75rem;
  --atomix-todo-item-border: 1px solid var(--atomix-border-color-light);
  --atomix-todo-item-border-radius: var(--atomix-border-radius);
  --atomix-todo-item-bg: var(--atomix-white);

  /* Checkbox */
  --atomix-todo-checkbox-size: 1.25rem;
  --atomix-todo-checkbox-border: 2px solid var(--atomix-border-color);
  --atomix-todo-checkbox-checked-bg: var(--atomix-primary);
  --atomix-todo-checkbox-checked-border: var(--atomix-primary);

  /* Text */
  --atomix-todo-text-color: var(--atomix-text-primary);
  --atomix-todo-text-completed-color: var(--atomix-text-muted);
  --atomix-todo-text-font-size: 1rem;

  /* Delete button */
  --atomix-todo-delete-size: 2rem;
  --atomix-todo-delete-color: var(--atomix-error);
  --atomix-todo-delete-hover-bg: var(--atomix-error-alpha-10);

  /* Size variants */
  --atomix-todo-sm-padding: 1rem;
  --atomix-todo-sm-input-padding: 0.5rem;
  --atomix-todo-sm-item-padding: 0.5rem;
  --atomix-todo-sm-font-size: 0.875rem;

  --atomix-todo-lg-padding: 2rem;
  --atomix-todo-lg-input-padding: 1rem;
  --atomix-todo-lg-item-padding: 1rem;
  --atomix-todo-lg-font-size: 1.125rem;
}
```

### CSS Classes

The component uses BEM methodology for CSS classes:

```css
/* Base todo component */
.c-todo {
  background: var(--atomix-todo-bg);
  border: var(--atomix-todo-border);
  border-radius: var(--atomix-todo-border-radius);
  padding: var(--atomix-todo-padding);
  box-shadow: var(--atomix-todo-shadow);
}

/* Header */
.c-todo__header {
  margin-bottom: 1.5rem;
}

.c-todo__title {
  font-size: var(--atomix-todo-title-font-size);
  font-weight: var(--atomix-todo-title-font-weight);
  color: var(--atomix-todo-title-color);
  margin: var(--atomix-todo-title-margin);
}

/* Form */
.c-todo__form {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.c-todo__input {
  flex: 1;
  padding: var(--atomix-todo-input-padding);
  border: var(--atomix-todo-input-border);
  border-radius: var(--atomix-todo-input-border-radius);
  font-size: var(--atomix-todo-input-font-size);
  font-family: inherit;
}

.c-todo__input:focus {
  outline: none;
  border-color: var(--atomix-primary);
  box-shadow: 0 0 0 3px var(--atomix-primary-alpha-20);
}

.c-todo__add-button {
  padding: var(--atomix-todo-input-padding);
  background: var(--atomix-primary);
  color: var(--atomix-white);
  border: none;
  border-radius: var(--atomix-todo-input-border-radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.c-todo__add-button:hover {
  background: var(--atomix-primary-dark);
}

.c-todo__add-button:disabled {
  background: var(--atomix-gray-400);
  cursor: not-allowed;
}

/* List */
.c-todo__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--atomix-todo-list-gap);
}

/* Items */
.c-todo__item {
  display: flex;
  align-items: center;
  padding: var(--atomix-todo-item-padding);
  background: var(--atomix-todo-item-bg);
  border: var(--atomix-todo-item-border);
  border-radius: var(--atomix-todo-item-border-radius);
  transition: background-color 0.2s ease;
}

.c-todo__item:hover {
  background: var(--atomix-gray-50);
}

.c-todo__item--completed {
  opacity: 0.7;
}

.c-todo__item-label {
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
  gap: 0.75rem;
}

/* Checkbox */
.c-todo__checkbox {
  width: var(--atomix-todo-checkbox-size);
  height: var(--atomix-todo-checkbox-size);
  border: var(--atomix-todo-checkbox-border);
  border-radius: var(--atomix-border-radius-sm);
  appearance: none;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
}

.c-todo__checkbox:checked {
  background: var(--atomix-todo-checkbox-checked-bg);
  border-color: var(--atomix-todo-checkbox-checked-border);
}

.c-todo__checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--atomix-white);
  font-size: 0.875rem;
  font-weight: bold;
}

.c-todo__checkbox:focus {
  outline: 2px solid var(--atomix-primary);
  outline-offset: 2px;
}

/* Text */
.c-todo__item-text {
  font-size: var(--atomix-todo-text-font-size);
  color: var(--atomix-todo-text-color);
  min-width: 0;
  word-wrap: break-word;
}

.c-todo__item--completed .c-todo__item-text {
  text-decoration: line-through;
  color: var(--atomix-todo-text-completed-color);
}

/* Delete button */
.c-todo__delete-button {
  width: var(--atomix-todo-delete-size);
  height: var(--atomix-todo-delete-size);
  border: none;
  background: none;
  color: var(--atomix-todo-delete-color);
  cursor: pointer;
  border-radius: var(--atomix-border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s ease, background-color 0.2s ease;
}

.c-todo__delete-button:hover {
  opacity: 1;
  background: var(--atomix-todo-delete-hover-bg);
}

.c-todo__delete-button:focus {
  outline: 2px solid var(--atomix-error);
  outline-offset: 1px;
}

/* Size variants */
.c-todo--sm {
  padding: var(--atomix-todo-sm-padding);
}

.c-todo--sm .c-todo__input,
.c-todo--sm .c-todo__add-button {
  padding: var(--atomix-todo-sm-input-padding);
  font-size: var(--atomix-todo-sm-font-size);
}

.c-todo--sm .c-todo__item {
  padding: var(--atomix-todo-sm-item-padding);
}

.c-todo--lg {
  padding: var(--atomix-todo-lg-padding);
}

.c-todo--lg .c-todo__input,
.c-todo--lg .c-todo__add-button {
  padding: var(--atomix-todo-lg-input-padding);
  font-size: var(--atomix-todo-lg-font-size);
}

.c-todo--lg .c-todo__item {
  padding: var(--atomix-todo-lg-item-padding);
}

.c-todo--lg .c-todo__item-text {
  font-size: var(--atomix-todo-lg-font-size);
}

/* Disabled state */
.c-todo--disabled {
  opacity: 0.6;
  pointer-events: none;
}

/* Empty state */
.c-todo__empty {
  text-align: center;
  color: var(--atomix-text-muted);
  font-style: italic;
  padding: 2rem;
}
```

### Customization Examples

```css
/* Dark theme */
.c-todo--dark {
  --atomix-todo-bg: var(--atomix-gray-800);
  --atomix-todo-border: 1px solid var(--atomix-gray-700);
  --atomix-todo-title-color: var(--atomix-white);
  --atomix-todo-text-color: var(--atomix-gray-200);
  --atomix-todo-item-bg: var(--atomix-gray-750);
  --atomix-todo-item-border: 1px solid var(--atomix-gray-700);
}

.c-todo--dark .c-todo__input {
  background: var(--atomix-gray-700);
  color: var(--atomix-white);
  border-color: var(--atomix-gray-600);
}

.c-todo--dark .c-todo__item:hover {
  background: var(--atomix-gray-700);
}

/* Minimal style */
.c-todo--minimal {
  border: none;
  box-shadow: none;
  background: transparent;
  padding: 1rem 0;
}

/* Compact variant */
.c-todo--compact .c-todo__list {
  --atomix-todo-list-gap: 0.25rem;
}

.c-todo--compact .c-todo__item {
  --atomix-todo-item-padding: 0.5rem;
}

/* Colorful checkboxes */
.c-todo--colorful .c-todo__checkbox:checked {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
}
```

## Common Patterns

### Daily Task Planner
```jsx
function DailyTaskPlanner() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const todaysTasksKey = `tasks-${selectedDate}`;
  const todaysTasks = tasks.filter(task => task.date === selectedDate);

  return (
    <div className="daily-planner">
      <div className="date-selector">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <Todo
        title={`Tasks for ${new Date(selectedDate).toLocaleDateString()}`}
        items={todaysTasks}
        onAddTodo={(text) => {
          setTasks(prev => [...prev, {
            id: Date.now().toString(),
            text,
            completed: false,
            date: selectedDate
          }]);
        }}
        onToggleTodo={(id) => {
          setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ));
        }}
        onDeleteTodo={(id) => {
          setTasks(prev => prev.filter(task => task.id !== id));
        }}
        placeholder="Add today's task..."
      />
    </div>
  );
}
```

### Team Task Dashboard
```jsx
function TeamTaskDashboard() {
  const [teamTasks, setTeamTasks] = useState({
    alice: [{ id: '1', text: 'Review PR #123', completed: false }],
    bob: [{ id: '2', text: 'Deploy to staging', completed: true }],
    carol: [{ id: '3', text: 'Update documentation', completed: false }]
  });

  return (
    <div className="team-dashboard">
      <h2>Team Task Dashboard</h2>
      <div className="team-columns">
        {Object.entries(teamTasks).map(([member, tasks]) => (
          <div key={member} className="member-column">
            <Todo
              title={member.charAt(0).toUpperCase() + member.slice(1)}
              items={tasks}
              size="sm"
              onAddTodo={(text) => {
                setTeamTasks(prev => ({
                  ...prev,
                  [member]: [...prev[member], {
                    id: Date.now().toString(),
                    text,
                    completed: false
                  }]
                }));
              }}
              onToggleTodo={(id) => {
                setTeamTasks(prev => ({
                  ...prev,
                  [member]: prev[member].map(task =>
                    task.id === id ? { ...task, completed: !task.completed } : task
                  )
                }));
              }}
              onDeleteTodo={(id) => {
                setTeamTasks(prev => ({
                  ...prev,
                  [member]: prev[member].filter(task => task.id !== id)
                }));
              }}
              placeholder={`Add task for ${member}...`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Performance Considerations

1. **List virtualization**: For large todo lists, consider using virtualization
2. **Local state optimization**: Use `useCallback` for event handlers
3. **Storage efficiency**: Debounce localStorage writes
4. **Memory management**: Clean up event listeners and timers

```jsx
// Optimized todo with performance improvements
const OptimizedTodo = memo(({ items, onAddTodo, onToggleTodo, onDeleteTodo, ...props }) => {
  const handleAddTodo = useCallback((text) => {
    onAddTodo?.(text);
  }, [onAddTodo]);

  const handleToggleTodo = useCallback((id) => {
    onToggleTodo?.(id);
  }, [onToggleTodo]);

  const handleDeleteTodo = useCallback((id) => {
    onDeleteTodo?.(id);
  }, [onDeleteTodo]);

  return (
    <Todo
      {...props}
      items={items}
      onAddTodo={handleAddTodo}
      onToggleTodo={handleToggleTodo}
      onDeleteTodo={handleDeleteTodo}
    />
  );
});
```

## Integration Examples

### With Backend API
```jsx
// Integration with REST API
function APITodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (text) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, completed: false })
      });
      const newTodo = await response.json();
      setTodos(prev => [...prev, newTodo]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      });
      setTodos(prev => prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  if (loading) return <Todo skeleton={true} />;

  return (
    <Todo
      title="API Todo List"
      items={todos}
      onAddTodo={handleAddTodo}
      onToggleTodo={handleToggleTodo}
      onDeleteTodo={handleDeleteTodo}
    />
  );
}
```

### With State Management
```jsx
// Redux integration
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './todoSlice';

function ReduxTodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.items);

  return (
    <Todo
      title="Redux Todo List"
      items={todos}
      onAddTodo={(text) => dispatch(addTodo({ text }))}
      onToggleTodo={(id) => dispatch(toggleTodo({ id }))}
      onDeleteTodo={(id) => dispatch(deleteTodo({ id }))}
    />
  );
}
```

## Browser Support

The Todo component supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Related Components

- **[Button](./button.md)** - Used for add and delete actions
- **[Icon](./icon.md)** - Used in buttons and status indicators
- **[Input](./input.md)** - Base input component
- **[Checkbox](./checkbox.md)** - Individual checkbox component
- **[Progress](./progress.md)** - For showing completion progress

## Migration Guide

### From Custom Todo Implementation

```jsx
// Before (custom todo)
<div className="todo-list">
  <input type="text" placeholder="Add task..." />
  <button>Add</button>
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <input type="checkbox" />
        <span>{item.text}</span>
        <button>Delete</button>
      </li>
    ))}
  </ul>
</div>

// After (Atomix Todo)
<Todo
  items={items}
  onAddTodo={handleAdd}
  onToggleTodo={handleToggle}
  onDeleteTodo={handleDelete}
  placeholder="Add task..."
/>
```

### From Other Libraries

```jsx
// Migration from other todo libraries
// Most props map directly to Atomix Todo props
<Todo
  items={todoItems}        // Previously: todos, tasks, items
  onAddTodo={addHandler}   // Previously: onAdd, addTodo, handleAdd
  onToggleTodo={toggleHandler} // Previously: onToggle, toggleTodo
  onDeleteTodo={deleteHandler} // Previously: onDelete, deleteTodo, onRemove
  title="My Tasks"         // Previously: header, title, name
  placeholder="Add new task..." // Previously: inputPlaceholder, addPlaceholder
/>
```
