import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable todo item component displayed in the todo list.
 * Shows title, status, priority, and provides toggle/delete actions.
 *
 * @param {Object} props
 * @param {Object} props.todo - The todo object.
 * @param {Function} props.onToggleStatus - Callback to toggle the todo's status.
 * @param {Function} props.onDelete - Callback to delete the todo.
 */
const TodoItem = ({ todo, onToggleStatus, onDelete }) => {
  const isCompleted = todo.status === 'completed';

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleStatus(todo.id, todo.status);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      onDelete(todo.id);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`todo-item ${isCompleted ? 'todo-completed' : ''}`}>
      <div className="todo-item-checkbox">
        <button
          className={`checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={handleToggle}
          aria-label={`Mark "${todo.title}" as ${isCompleted ? 'pending' : 'completed'}`}
          title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
        >
          {isCompleted && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6L5 9L10 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      <Link to={`/todo/${todo.id}`} className="todo-item-content">
        <div className="todo-item-header">
          <h3 className={`todo-item-title ${isCompleted ? 'title-completed' : ''}`}>
            {todo.title}
          </h3>
          <div className="todo-item-badges">
            <span className={`badge badge-priority ${getPriorityClass(todo.priority)}`}>
              {todo.priority}
            </span>
            <span className={`badge badge-status ${isCompleted ? 'status-completed' : 'status-pending'}`}>
              {todo.status}
            </span>
          </div>
        </div>
        {todo.description && (
          <p className="todo-item-description">{todo.description}</p>
        )}
        <span className="todo-item-date">Created {formatDate(todo.createdAt)}</span>
      </Link>

      <button
        className="btn btn-delete-icon"
        onClick={handleDelete}
        aria-label={`Delete "${todo.title}"`}
        title="Delete todo"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 4H14M5 4V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V4M6 7V11M10 7V11M3 4L4 13C4 13.5523 4.44772 14 5 14H11C11.5523 14 12 13.5523 12 13L13 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
