// Campus Connect Portal - Student Routes (Experiment 6)
// Defines RESTful endpoint routes and binds validation middleware to controller actions

const express = require('express');
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

const { validateStudent } = require('../middleware/validator');

// Routes for /api/students
router
  .route('/')
  .get(getAllStudents)                     // GET  /api/students     (Read all)
  .post(validateStudent, createStudent);   // POST /api/students     (Create new)

// Routes for /api/students/:id
router
  .route('/:id')
  .get(getStudentById)                      // GET    /api/students/:id (Read by ID)
  .put(validateStudent, updateStudent)     // PUT    /api/students/:id (Update by ID)
  .delete(deleteStudent);                  // DELETE /api/students/:id (Delete by ID)

module.exports = router;
