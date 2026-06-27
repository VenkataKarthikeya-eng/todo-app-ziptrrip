/**
 * Centralized error-handling middleware.
 * Catches all errors forwarded via next(err) and returns a consistent JSON response.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  // Log the full stack trace in development for easier debugging
  if (process.env.NODE_ENV !== 'production') {
    console.error('❌  Error:', err.stack || err.message);
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = statusCode === 500 ? 'Internal server error' : err.message;

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
    },
  });
};

module.exports = errorHandler;
