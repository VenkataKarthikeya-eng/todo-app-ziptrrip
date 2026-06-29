import axios from 'axios';

/**
 * Axios instance configured with the base URL for the Todo API.
 * The proxy setting in package.json forwards /api requests to http://localhost:5000.
 */


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all todos, optionally filtered by status.
 * @param {string} [status] - Filter by 'pending' or 'completed'. Omit for all todos.
 * @returns {Promise<Array>} Array of todo objects.
 */
export const fetchTodos = async (status) => {
  const params = status ? { status } : {};
  const response = await api.get('/todos', { params });
  return response.data;
};

/**
 * Fetch a single todo by its ID.
 * @param {string} id - The todo ID.
 * @returns {Promise<Object>} The todo object.
 */
export const fetchTodoById = async (id) => {
  const response = await api.get(`/todos/${id}`);
  return response.data;
};

/**
 * Create a new todo.
 * @param {Object} data - The todo data ({ title, description?, priority? }).
 * @returns {Promise<Object>} The created todo object.
 */
export const createTodo = async (data) => {
  const response = await api.post('/todos', data);
  return response.data;
};

/**
 * Update an existing todo.
 * @param {string} id - The todo ID.
 * @param {Object} data - Fields to update ({ title?, description?, status?, priority? }).
 * @returns {Promise<Object>} The updated todo object.
 */
export const updateTodo = async (id, data) => {
  const response = await api.put(`/todos/${id}`, data);
  return response.data;
};

/**
 * Delete a todo by its ID.
 * @param {string} id - The todo ID.
 * @returns {Promise<Object>} The deletion confirmation response.
 */
export const deleteTodo = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
