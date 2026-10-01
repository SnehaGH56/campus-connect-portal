// Campus Connect Portal - Error Handling Middleware (Experiment 6)
// Provides centralized error handling and 404 response routing

// 404 Handler for undefined API routes
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`
  });
};

// Global Express error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Server Error:", err.stack || err.message);

  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = { notFoundHandler, errorHandler };
