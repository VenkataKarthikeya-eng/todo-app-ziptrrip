const VALID_PRIORITIES = ['low', 'medium', 'high'];
const VALID_STATUSES = ['pending', 'completed'];

/**
 * Validation middleware for POST /api/todos.
 * Ensures required fields are present and optional fields have valid values.
 */
const validateCreate = (req, res, next) => {
  const errors = [];
  const { title, priority } = req.body;

  // Title is required and must be a non-empty string
  if (title === undefined || title === null) {
    errors.push('Title is required');
  } else if (typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title must be a non-empty string');
  }

  // Priority is optional, but must be valid if provided
  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: { message: 'Validation failed', details: errors, status: 400 },
    });
  }

  next();
};

/**
 * Validation middleware for PUT /api/todos/:id.
 * Ensures at least one updatable field is provided and values are valid.
 */
const validateUpdate = (req, res, next) => {
  const errors = [];
  const { title, description, status, priority } = req.body;
  const updatableFields = ['title', 'description', 'status', 'priority'];

  // At least one field must be present in the request body
  const hasField = updatableFields.some((field) => req.body[field] !== undefined);
  if (!hasField) {
    return res.status(400).json({
      error: {
        message: 'Validation failed',
        details: [`At least one field must be provided: ${updatableFields.join(', ')}`],
        status: 400,
      },
    });
  }

  // Validate individual fields when present
  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    errors.push('Title must be a non-empty string');
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.push('Description must be a string');
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: { message: 'Validation failed', details: errors, status: 400 },
    });
  }

  next();
};

module.exports = { validateCreate, validateUpdate };
