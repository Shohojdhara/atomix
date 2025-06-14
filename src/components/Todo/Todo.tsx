import React, { useState, useEffect } from 'react';
import { TodoProps } from '../../lib/types/components';
import { useTodo } from '../../lib/composables/useTodo';
import { Icon } from '../Icon/Icon';
import { TODO } from '../../lib/constants/components';
import { v4 as uuidv4 } from 'uuid';

export const Todo: React.FC<TodoProps> = ({
  items = [],
  title = 'Todo List',
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  size = 'md',
  placeholder = 'Add a new todo',
  showCompleted = true,
  className = '',
  disabled = false,
}) => {
  const { inputText, setInputText, addTodo, generateTodoClasses, generateItemClasses } = useTodo({
    items,
    title,
    size,
    placeholder,
    showCompleted,
    disabled,
  });

  // State to manage local items
  const [localItems, setLocalItems] = useState(items);

  // Update local items when props change
  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  // Handle item toggle
  const handleToggle = (id: string) => {
    if (disabled) return;

    setLocalItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );

    if (onToggleTodo) {
      onToggleTodo(id);
    }
  };

  // Handle item delete
  const handleDelete = (id: string) => {
    if (disabled) return;

    setLocalItems(prevItems => prevItems.filter(item => item.id !== id));

    if (onDeleteTodo) {
      onDeleteTodo(id);
    }
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !inputText.trim()) return;

    // Create a new todo item with a unique ID
    const newTodo = {
      id: uuidv4(),
      text: inputText.trim(),
      completed: false,
    };

    // Update local state
    setLocalItems(prevItems => [...prevItems, newTodo]);

    // Call parent callback if provided
    if (onAddTodo) {
      onAddTodo(inputText);
    }

    // Clear the input field
    setInputText('');
  };

  // Filter items based on showCompleted prop
  const filteredItems = showCompleted ? localItems : localItems.filter(item => !item.completed);

  // Generate component classes
  const todoClass = generateTodoClasses({ size, className, disabled });

  return (
    <div className={todoClass}>
      {title && <h2 className="c-todo__title">{title}</h2>}

      <form className="c-todo__form" onSubmit={handleFormSubmit}>
        <div className="c-todo__form-group">
          <input
            type="text"
            className="c-todo__input c-input"
            placeholder={placeholder}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            disabled={disabled}
            aria-label="Add a new todo"
          />
          <button
            type="submit"
            className="c-todo__add-btn c-btn c-btn--primary"
            disabled={disabled || !inputText.trim()}
            aria-label="Add todo"
          >
            <Icon name="Plus" size="sm" />
          </button>
        </div>
      </form>

      <ul className="c-todo__list">
        {filteredItems.length === 0 ? (
          <li className="c-todo__empty">No items to display</li>
        ) : (
          filteredItems.map(item => (
            <li key={item.id} className={generateItemClasses(item)}>
              <div className="c-todo__item-content">
                <label className="c-todo__checkbox-label">
                  <input
                    type="checkbox"
                    className="c-todo__checkbox c-checkbox"
                    checked={item.completed}
                    onChange={() => handleToggle(item.id)}
                    disabled={disabled}
                    aria-label={`Mark "${item.text}" as ${item.completed ? 'incomplete' : 'complete'}`}
                  />
                  <span className="c-todo__item-text">{item.text}</span>
                </label>

                <button
                  type="button"
                  className="c-todo__delete-btn c-btn c-btn--error c-btn--sm"
                  onClick={() => handleDelete(item.id)}
                  disabled={disabled}
                  aria-label={`Delete "${item.text}"`}
                >
                  <Icon name="Trash" size="sm" />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

Todo.displayName = 'Todo';

export type { TodoProps };

export default Todo;
