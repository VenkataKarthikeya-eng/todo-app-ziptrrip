import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { fetchTodoById, updateTodo, deleteTodo } from '../services/api';

/**
 * TodoDetailPage — Displays a single todo's full details.
 * Reads the todo ID from the ?id= query parameter.
 * Supports inline editing, updating, and deleting.
 */
const TodoDetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const todoId = searchParams.get('id');

  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Editable fields
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const [editStatus, setEditStatus] = useState('pending');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (!todoId) {
      setError('No todo ID provided. Please navigate from the todo list.');
      setIsLoading(false);
      return;
    }

    const loadTodo = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchTodoById(todoId);
        setTodo(data);
        setEditTitle(data.title);
        setEditDescription(data.description || '');
        setEditPriority(data.priority);
        setEditStatus(data.status);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Todo not found. It may have been deleted.');
        } else {
          const message =
            err.response?.data?.error || err.message || 'Failed to load todo.';
          setError(message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTodo();
  }, [todoId]);

  /**
   * Enter edit mode with current todo values.
   */
  const handleStartEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority);
    setEditStatus(todo.status);
    setValidationError('');
    setIsEditing(true);
  };

  /**
   * Cancel editing and revert to displayed values.
   */
  const handleCancelEdit = () => {
    setIsEditing(false);
    setValidationError('');
  };

  /**
   * Save changes via the API.
   */
  const handleSave = async () => {
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) {
      setValidationError('Title is required.');
      return;
    }

    setIsSaving(true);
    setValidationError('');

    try {
      const updatedTodo = await updateTodo(todoId, {
        title: trimmedTitle,
        description: editDescription.trim(),
        priority: editPriority,
        status: editStatus,
      });

      setTodo(updatedTodo);
      setIsEditing(false);
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Failed to update todo.';
      setValidationError(message);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Delete the current todo and navigate back to the list.
   */
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      return;
    }

    try {
      await deleteTodo(todoId);
      navigate('/');
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Failed to delete todo.';
      setError(message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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

  // Loading State
  if (isLoading) {
    return (
      <div className="page detail-page">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading todo...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="page detail-page">
        <div className="container">
          <div className="error-container">
            <div className="error-icon-large">⚠</div>
            <h2 className="error-title">Something went wrong</h2>
            <p className="error-message">{error}</p>
            <Link to="/" className="btn btn-primary">
              ← Back to Todos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // No todo found (shouldn't happen normally if error is set correctly)
  if (!todo) {
    return null;
  }

  const isCompleted = todo.status === 'completed';

  return (
    <div className="page detail-page">
      <div className="container">
        {/* Breadcrumb / Back navigation */}
        <div className="detail-nav">
          <Link to="/" className="btn btn-back">
            ← Back to Todos
          </Link>
          <div className="detail-actions">
            {!isEditing ? (
              <>
                <button className="btn btn-secondary" onClick={handleStartEdit}>
                  ✏ Edit
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  🗑 Delete
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : '💾 Save'}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Detail Card */}
        <div className="detail-card">
          {/* Title */}
          <div className="detail-field">
            <label className="detail-label">Title</label>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  className={`form-input ${validationError ? 'input-error' : ''}`}
                  value={editTitle}
                  onChange={(e) => {
                    setEditTitle(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  disabled={isSaving}
                />
                {validationError && (
                  <span className="form-error">{validationError}</span>
                )}
              </div>
            ) : (
              <h1 className={`detail-title ${isCompleted ? 'title-completed' : ''}`}>
                {todo.title}
              </h1>
            )}
          </div>

          {/* Description */}
          <div className="detail-field">
            <label className="detail-label">Description</label>
            {isEditing ? (
              <textarea
                className="form-textarea"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={4}
                placeholder="No description"
                disabled={isSaving}
              />
            ) : (
              <p className="detail-description">
                {todo.description || 'No description provided.'}
              </p>
            )}
          </div>

          {/* Status & Priority */}
          <div className="detail-meta-row">
            <div className="detail-field">
              <label className="detail-label">Status</label>
              {isEditing ? (
                <select
                  className="form-select"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  disabled={isSaving}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              ) : (
                <span
                  className={`badge badge-status ${isCompleted ? 'status-completed' : 'status-pending'}`}
                >
                  {todo.status}
                </span>
              )}
            </div>

            <div className="detail-field">
              <label className="detail-label">Priority</label>
              {isEditing ? (
                <select
                  className="form-select"
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  disabled={isSaving}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              ) : (
                <span
                  className={`badge badge-priority ${getPriorityClass(todo.priority)}`}
                >
                  {todo.priority}
                </span>
              )}
            </div>
          </div>

          {/* Timestamps */}
          <div className="detail-timestamps">
            <div className="detail-field">
              <label className="detail-label">Created</label>
              <span className="detail-date">{formatDate(todo.createdAt)}</span>
            </div>
            <div className="detail-field">
              <label className="detail-label">Last Updated</label>
              <span className="detail-date">{formatDate(todo.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPage;
