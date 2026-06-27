import React, { useState } from 'react';

/**
 * Reusable form component for creating a new todo.
 * @param {Object} props
 * @param {Function} props.onSubmit - Callback invoked with the new todo data ({ title, description, priority }).
 * @param {boolean} props.isSubmitting - Whether a submission is currently in progress.
 */
const TodoForm = ({ onSubmit, isSubmitting }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setValidationError('Title is required.');
      return;
    }

    setValidationError('');

    const todoData = {
      title: trimmedTitle,
      description: description.trim() || undefined,
      priority,
    };

    const success = await onSubmit(todoData);

    if (success) {
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2 className="todo-form-title">Add New Todo</h2>

      <div className="form-group">
        <label htmlFor="todo-title" className="form-label">
          Title <span className="required">*</span>
        </label>
        <input
          id="todo-title"
          type="text"
          className={`form-input ${validationError ? 'input-error' : ''}`}
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (validationError) setValidationError('');
          }}
          disabled={isSubmitting}
        />
        {validationError && (
          <span className="form-error">{validationError}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="todo-description" className="form-label">
          Description
        </label>
        <textarea
          id="todo-description"
          className="form-textarea"
          placeholder="Add some details (optional)"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="todo-priority" className="form-label">
            Priority
          </label>
          <select
            id="todo-priority"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="btn-spinner"></span>
              Adding...
            </>
          ) : (
            '+ Add Todo'
          )}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
