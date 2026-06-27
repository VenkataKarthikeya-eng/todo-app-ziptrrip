const fs = require('fs');
const path = require('path');

// Resolve the path to the JSON data file relative to the project root
const DATA_FILE = path.join(__dirname, '..', '..', 'data', 'todos.json');

/**
 * File-based persistence layer for Todo items.
 * Uses a JSON file as a lightweight data store.
 */
class Todo {
  /**
   * Read the JSON data file. Creates an empty array if the file doesn't exist.
   * @returns {Array} Raw array of todo objects.
   * @private
   */
  static _readFile() {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (err) {
      // If the file or directory doesn't exist, bootstrap with an empty array
      if (err.code === 'ENOENT') {
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
        return [];
      }
      throw err;
    }
  }

  /**
   * Persist the todo array back to the JSON file.
   * @param {Array} todos - The full array of todo objects to write.
   * @private
   */
  static _writeFile(todos) {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), 'utf-8');
  }

  /** Retrieve all todos. */
  static readAll() {
    return this._readFile();
  }

  /** Find a single todo by its unique ID. */
  static findById(id) {
    const todos = this._readFile();
    return todos.find((todo) => todo.id === id) || null;
  }

  /** Append a new todo object and persist. */
  static create(todoData) {
    const todos = this._readFile();
    todos.push(todoData);
    this._writeFile(todos);
    return todoData;
  }

  /** Merge partial updates into an existing todo and persist. */
  static update(id, updates) {
    const todos = this._readFile();
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) return null;

    todos[index] = { ...todos[index], ...updates };
    this._writeFile(todos);
    return todos[index];
  }

  /** Remove a todo by ID and persist. Returns true if removed, false otherwise. */
  static remove(id) {
    const todos = this._readFile();
    const filtered = todos.filter((todo) => todo.id !== id);

    if (filtered.length === todos.length) return false;

    this._writeFile(filtered);
    return true;
  }
}

module.exports = Todo;
