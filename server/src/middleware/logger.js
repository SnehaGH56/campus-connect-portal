// Campus Connect Portal - Request Logger Middleware (Experiment 6)
// Intercepts every incoming request, logs details, and records processing duration

const requestLogger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Listen to response finish event to calculate elapsed time
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} -> Status: ${statusCode} (${duration}ms)`
    );
  });

  next();
};

module.exports = requestLogger;
