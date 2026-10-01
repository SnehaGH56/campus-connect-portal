// Campus Connect Portal - Student In-Memory Data Model (Experiment 6)
// Provides in-memory data persistence and CRUD operations

let students = [
  {
    id: 1,
    name: "Sneha Biswas",
    email: "snehabiswasbsc24@rvu.edu.in",
    department: "Computer Science & Engineering",
    year: 2,
    status: "Active"
  },
  {
    id: 2,
    name: "Aarav Sharma",
    email: "aarav.sharma@rvu.edu.in",
    department: "Computer Science & Engineering",
    year: 3,
    status: "Active"
  },
  {
    id: 3,
    name: "Priya Nair",
    email: "priya.nair@rvu.edu.in",
    department: "Data Science & AI",
    year: 1,
    status: "Active"
  }
];

let nextId = 4;

const studentModel = {
  // Read all students (with optional department filter)
  getAll: (filter = {}) => {
    if (filter.department) {
      return students.filter(
        (s) => s.department.toLowerCase() === filter.department.toLowerCase()
      );
    }
    return [...students];
  },

  // Read a single student by numeric ID
  getById: (id) => {
    const numId = parseInt(id, 10);
    return students.find((s) => s.id === numId) || null;
  },

  // Create a new student record
  create: (data) => {
    const newStudent = {
      id: nextId++,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      department: data.department.trim(),
      year: data.year ? parseInt(data.year, 10) : 1,
      status: data.status || "Active"
    };
    students.push(newStudent);
    return newStudent;
  },

  // Update an existing student
  update: (id, data) => {
    const numId = parseInt(id, 10);
    const index = students.findIndex((s) => s.id === numId);
    if (index === -1) return null;

    students[index] = {
      ...students[index],
      ...(data.name && { name: data.name.trim() }),
      ...(data.email && { email: data.email.trim().toLowerCase() }),
      ...(data.department && { department: data.department.trim() }),
      ...(data.year && { year: parseInt(data.year, 10) }),
      ...(data.status && { status: data.status })
    };

    return students[index];
  },

  // Delete a student by ID
  remove: (id) => {
    const numId = parseInt(id, 10);
    const index = students.findIndex((s) => s.id === numId);
    if (index === -1) return null;

    const [deleted] = students.splice(index, 1);
    return deleted;
  }
};

module.exports = studentModel;
