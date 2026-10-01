// Campus Connect Portal - Student Controller (Experiment 6)
// Handles incoming requests, executes business logic, and returns RESTful responses

const studentModel = require('../models/studentModel');

// @desc    Get all students (supports ?department= query)
// @route   GET /api/students
// @access  Public
const getAllStudents = (req, res, next) => {
  try {
    const { department } = req.query;
    const students = studentModel.getAll({ department });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
// @access  Public
const getStudentById = (req, res, next) => {
  try {
    const { id } = req.params;
    const student = studentModel.getById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: `Student with ID ${id} not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Public
const createStudent = (req, res, next) => {
  try {
    const { name, email, department, year, status } = req.body;

    const newStudent = studentModel.create({
      name,
      email,
      department,
      year,
      status
    });

    res.status(201).json({
      success: true,
      message: "Student record created successfully.",
      data: newStudent
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update student details by ID
// @route   PUT /api/students/:id
// @access  Public
const updateStudent = (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedStudent = studentModel.update(id, req.body);

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        error: `Cannot update. Student with ID ${id} not found.`
      });
    }

    res.status(200).json({
      success: true,
      message: `Student with ID ${id} updated successfully.`,
      data: updatedStudent
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete student record by ID
// @route   DELETE /api/students/:id
// @access  Public
const deleteStudent = (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStudent = studentModel.remove(id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        error: `Cannot delete. Student with ID ${id} not found.`
      });
    }

    res.status(200).json({
      success: true,
      message: `Student with ID ${id} deleted successfully.`,
      data: deletedStudent
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
