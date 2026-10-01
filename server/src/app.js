// Campus Connect Portal - Express Backend Server (Experiment 6)
// RESTful API Service supporting CRUD operations with custom middleware pipeline

const express = require('express');
const cors = require('cors');

// Import custom middleware
const requestLogger = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

// Import routes
const studentRoutes = require('./routes/studentRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. Built-in & Third-party Middleware
// ==========================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 2. Custom Application-Level Middleware
// ==========================================
app.use(requestLogger);

// ==========================================
// 3. API Routes
// ==========================================

// Root endpoint: API overview & health check
app.get('/', (req, res) => {
  res.status(200).json({
    project: "Campus Connect Portal",
    service: "RESTful API Backend",
    experiment: "Experiment 6 - Node.js and Express RESTful API",
    status: "Online",
    endpoints: {
      getAllStudents: "GET /api/students",
      getStudentById: "GET /api/students/:id",
      createStudent: "POST /api/students",
      updateStudent: "PUT /api/students/:id",
      deleteStudent: "DELETE /api/students/:id"
    }
  });
});

// Resource routes
app.use('/api/students', studentRoutes);

// ==========================================
// 4. Error Handling Middleware
// ==========================================
app.use(notFoundHandler);
app.use(errorHandler);

// ==========================================
// 5. Server Initialization
// ==========================================
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` Campus Connect Backend Server (Experiment 6)`);
    console.log(` Server running at: http://localhost:${PORT}`);
    console.log(` Endpoints:`);
    console.log(`   - GET    http://localhost:${PORT}/api/students`);
    console.log(`   - POST   http://localhost:${PORT}/api/students`);
    console.log(`   - GET    http://localhost:${PORT}/api/students/:id`);
    console.log(`   - PUT    http://localhost:${PORT}/api/students/:id`);
    console.log(`   - DELETE http://localhost:${PORT}/api/students/:id`);
    console.log(`====================================================`);
  });
}

module.exports = app;
