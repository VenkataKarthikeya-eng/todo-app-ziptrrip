const { v4: uuidv4 } = require('uuid');
const Todo = require('../models/Todo');

/**
 * GET /api/todos
 * Returns all todos. Supports optional ?status=pending|completed filter.
 */
const getAllTodos = (req, res, next) => {
  try {
    let todos = Todo.readAll();

    const { status } = req.query;
    if (status && ['pending', 'completed'].includes(status)) {
      todos = todos.filter((todo) => todo.status === status);
    }

    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/todos/:id
 * Returns a single todo or 404 if not found.
 */
const getTodoById = (req, res, next) => {
  try {
    const todo = Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        error: { message: `Todo with id "${req.params.id}" not found`, status: 404 },
      });
    }

    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/todos
 * Creates a new todo with auto-generated UUID and timestamps.
 */
const createTodo = (req, res, next) => {
  try {
    const { title, description = '', priority = 'medium' } = req.body;
    const now = new Date().toISOString();

    const newTodo = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      status: 'pending',
      priority,
      createdAt: now,
      updatedAt: now,
    };

    const created = Todo.create(newTodo);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/todos/:id
 * Partially updates an existing todo. Returns 404 if not found.
 */
const updateTodo = (req, res, next) => {
  try {
    const existing = Todo.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        error: { message: `Todo with id "${req.params.id}" not found`, status: 404 },
      });
    }

    // Only allow whitelisted fields to be updated
    const allowedFields = ['title', 'description', 'status', 'priority'];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = typeof req.body[field] === 'string' ? req.body[field].trim() : req.body[field];
      }
    }

    updates.updatedAt = new Date().toISOString();

    const updated = Todo.update(req.params.id, updates);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/todos/:id
 * Removes a todo. Returns 404 if not found, 204 on success.
 */
const deleteTodo = (req, res, next) => {
  try {
    const existing = Todo.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        error: { message: `Todo with id "${req.params.id}" not found`, status: 404 },
      });
    }

    Todo.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
