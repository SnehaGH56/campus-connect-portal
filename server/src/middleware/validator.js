// Campus Connect Portal - Request Validation Middleware (Experiment 6)
// Validates payload for student creation and update requests

const validateStudent = (req, res, next) => {
  const { name, email, department } = req.body;
  const isPost = req.method === 'POST';

  // For POST, name, email, and department are strictly required
  if (isPost) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Validation Error: 'name' is required and must be a non-empty string."
      });
    }

    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Validation Error: 'email' is required and must be a valid email format."
      });
    }

    if (!department || typeof department !== 'string' || department.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Validation Error: 'department' is required and must be a non-empty string."
      });
    }
  }

  // For PUT, validate any provided fields
  if (req.method === 'PUT') {
    if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
      return res.status(400).json({
        success: false,
        error: "Validation Error: 'name' cannot be empty."
      });
    }

    if (email !== undefined && (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email))) {
      return res.status(400).json({
        success: false,
        error: "Validation Error: 'email' must have a valid format."
      });
    }

    if (department !== undefined && (typeof department !== 'string' || department.trim().length === 0)) {
      return res.status(400).json({
        success: false,
        error: "Validation Error: 'department' cannot be empty."
      });
    }
  }

  next();
};

module.exports = { validateStudent };
