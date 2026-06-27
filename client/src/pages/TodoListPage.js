import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/api';

/**
 * Filter options for the todo list.
 */
const FILTER_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
];

/**
 * TodoListPage — Main page that displays all todos with filtering, creation, and management.
 */
const TodoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch todos from the API, optionally filtered by status.
   */
  const loadTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchTodos(filter || undefined);
      setTodos(data);
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Failed to load todos.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  /**
   * Handle creating a new todo.
   * Returns true if successful (so the form can reset), false otherwise.
   */
  const handleCreateTodo = async (todoData) => {
    setIsSubmitting(true);

    try {
      const newTodo = await createTodo(todoData);
      // If we're filtering, only add to the list if it matches the filter
      if (!filter || filter === 'pending') {
        setTodos((prev) => [newTodo, ...prev]);
      }
      return true;
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Failed to create todo.';
      setError(message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Toggle a todo's status between 'pending' and 'completed'.
   */
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

    try {
      const updatedTodo = await updateTodo(id, { status: newStatus });

      if (filter && filter !== newStatus) {
        // Remove from the filtered list since it no longer matches
        setTodos((prev) => prev.filter((t) => t.id !== id));
      } else {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? updatedTodo : t))
        );
      }
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Failed to update todo.';
      setError(message);
    }
  };

  /**
   * Delete a todo by ID.
   */
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Failed to delete todo.';
      setError(message);
    }
  };

  return (
    <div className="page todo-list-page">
      <div className="container">
        {/* Add Todo Form */}
        <TodoForm onSubmit={handleCreateTodo} isSubmitting={isSubmitting} />

        {/* Filter Controls */}
        <div className="filter-section">
          <div className="filter-header">
            <h2 className="section-title">Your Todos</h2>
            {!isLoading && !error && (
              <span className="todo-count">
                {todos.length} {todos.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>

          <div className="filter-buttons">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.value}
                className={`btn btn-filter ${filter === option.value ? 'active' : ''}`}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠</span>
            <span>{error}</span>
            <button className="btn btn-text" onClick={() => setError(null)}>
              Dismiss
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading todos...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && todos.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3 className="empty-title">
              {filter ? `No ${filter} todos` : 'No todos yet'}
            </h3>
            <p className="empty-description">
              {filter
                ? `You don't have any ${filter} todos. Try a different filter or add a new one.`
                : 'Get started by adding your first todo above.'}
            </p>
          </div>
        )}

        {/* Todo List */}
        {!isLoading && todos.length > 0 && (
          <div className="todo-list">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoListPage;
