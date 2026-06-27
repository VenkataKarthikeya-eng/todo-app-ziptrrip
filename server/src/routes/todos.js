const { Router } = require('express');
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todosController');
const { validateCreate, validateUpdate } = require('../middleware/validate');

const router = Router();

// GET  /api/todos          — List all todos (supports ?status=pending|completed)
router.get('/', getAllTodos);

// GET  /api/todos/:id      — Retrieve a single todo by ID
router.get('/:id', getTodoById);

// POST /api/todos          — Create a new todo (validation applied)
router.post('/', validateCreate, createTodo);

// PUT  /api/todos/:id      — Update an existing todo (validation applied)
router.put('/:id', validateUpdate, updateTodo);

// DELETE /api/todos/:id    — Remove a todo by ID
router.delete('/:id', deleteTodo);

module.exports = router;
