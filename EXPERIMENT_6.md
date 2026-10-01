# EXPERIMENT 6: Developing and Consuming Backend Services Using RESTful API Principles (Node.js and Express)

---

## 🎯 Aim
To develop and consume backend services that follow RESTful API principles, supporting basic CRUD (Create, Read, Update, Delete) operations with middleware handling using Node.js and Express.

---

## 📚 Learning Outcomes
After completing this experiment, the student will be able to:
1. **Explain the purpose** of a backend server and the core principles of a REST API.
2. **Understand the four basic CRUD operations** and how they map to standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
3. **Design clear and consistent API routes** for creating, reading, updating, and deleting university resources (`students`).
4. **Implement middleware** for JSON body parsing, incoming request logging, input validation, and centralized error handling.
5. **Consume backend services** from a frontend application (React client) and test API endpoints using an automated test suite and Postman.

---

## 🔧 Prerequisites
- Basic understanding of the Client-Server architecture.
- Working knowledge of JavaScript (ES6+ async/await, arrow functions, modules).
- Node.js (v18+) and npm installed.
- A REST API testing client such as **Postman** or **cURL**.

---

## 📖 Theory

### 1. The Role of a Backend Server
A backend is the server-side portion of an application that handles data storage, business logic, authentication, and communication protocols that cannot or should not execute securely inside a user's browser. Node.js provides a high-performance JavaScript runtime on the server, while Express provides a robust and minimalist web application framework.

### 2. RESTful API Architecture
**REST** (*Representational State Transfer*) organizes communication around **resources** (e.g., `students`, `courses`, `faculty`) that are uniquely identified by URI endpoints. Operations on these resources are executed using standard HTTP verbs:
- **`GET` (Read)**: Retrieves representation of a resource without side effects (safe & idempotent).
- **`POST` (Create)**: Submits data to create a new resource on the server.
- **`PUT` (Update)**: Replaces or updates the targeted resource with the provided representation (idempotent).
- **`DELETE` (Delete)**: Removes the specified resource from storage (idempotent).

### 3. Middleware Pipeline
Middleware is a function that has access to the request object (`req`), the response object (`res`), and the `next` function in the application's request-response lifecycle. Express processes middleware in the sequence they are registered (`app.use`):
```text
Client Request
      │
      ▼
┌──────────────────────────────────────────────┐
│ 1. CORS Middleware                          │
├──────────────────────────────────────────────┤
│ 2. JSON Body Parser (express.json())        │
├──────────────────────────────────────────────┤
│ 3. Request Logger (Console timestamp & URI) │
├──────────────────────────────────────────────┤
│ 4. Route Validator (validateStudent)        │
├──────────────────────────────────────────────┤
│ 5. Controller Handler (Business logic)       │
├──────────────────────────────────────────────┤
│ 6. Central Error Handler (errorHandler)      │
└──────────────────────────────────────────────┘
      │
      ▼
Client Response (JSON)
```

---

## 📋 REST API Route Design

| HTTP Method | Route Endpoint | Purpose / Description | Success Code | Error Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | API status and root documentation | `200 OK` | `500` |
| `GET` | `/api/students` | Read all student records (supports `?department=`) | `200 OK` | `500` |
| `GET` | `/api/students/:id` | Read a single student by numeric ID | `200 OK` | `404 Not Found` |
| `POST` | `/api/students` | Create a new student (validates `name`, `email`, `department`) | `201 Created` | `400 Bad Request` |
| `PUT` | `/api/students/:id` | Update an existing student's details | `200 OK` | `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/api/students/:id` | Remove a student record from storage | `200 OK` | `404 Not Found` |

---

## ⚙️ Middleware Implementation

### 1. Request Logger Middleware (`server/src/middleware/logger.js`)
Intercepts all incoming HTTP requests, records the timestamp, method, URL, and calculates latency:
```javascript
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} -> Status: ${res.statusCode} (${duration}ms)`);
  });

  next();
};
```

### 2. Request Validator Middleware (`server/src/middleware/validator.js`)
Validates that incoming POST and PUT requests include non-empty values for required fields and proper email format before reaching the controller:
```javascript
const validateStudent = (req, res, next) => {
  const { name, email, department } = req.body;
  if (req.method === 'POST') {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ success: false, error: "'name' is required." });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, error: "Valid 'email' is required." });
    }
    if (!department) {
      return res.status(400).json({ success: false, error: "'department' is required." });
    }
  }
  next();
};
```

### 3. Central Error & 404 Middleware (`server/src/middleware/errorHandler.js`)
Intercepts nonexistent routes and handles any uncaught runtime exceptions uniformly in JSON format.

---

## 🛠️ Step-by-Step Algorithm

1. **Step 1: Resource Planning**: Choose the `students` resource with attributes (`id`, `name`, `email`, `department`, `year`, `status`).
2. **Step 2: Server Setup**: Initialize Express server with `express.json()`, `cors()`, and custom logger middleware.
3. **Step 3: In-Memory Storage**: Implement `studentModel.js` with array data and CRUD helper methods.
4. **Step 4: Controller Logic**: Implement controller methods for `getAllStudents`, `getStudentById`, `createStudent`, `updateStudent`, and `deleteStudent`.
5. **Step 5: Router Mapping**: Bind Express router routes to controller methods, injecting validation middleware where appropriate.
6. **Step 6: Frontend Consumption**: Connect the React client (`StudentManager.jsx`) via Axios to consume all CRUD endpoints.
7. **Step 7: Testing & Verification**: Execute automated test script (`npm test`) and Postman collection to verify status codes and responses.

---

## 🧪 Testing & Verification Guide

### 1. Automated Test Suite
Run the built-in test runner which exercises all 9 test scenarios:
```bash
cd server
npm test
```
**Sample Output:**
```text
======================================================
  RUNNING EXPERIMENT 6 REST API AUTOMATED TEST SUITE  
======================================================

[1] Testing Root Endpoint (GET /)...
  [PASS] GET / returns 200 OK and Online status

[2] Testing Read All Students (GET /api/students)...
  [PASS] GET /api/students returns 200 OK and student array

[3] Testing Create Student (POST /api/students)...
  [PASS] POST /api/students returns 201 Created and assigned an ID

[4] Testing Validation Middleware (POST /api/students with invalid data)...
  [PASS] POST /api/students with missing email returns 400 Bad Request

[5] Testing Read Single Student (GET /api/students/4)...
  [PASS] GET /api/students/4 returns 200 OK and matches created student

[6] Testing Update Student (PUT /api/students/4)...
  [PASS] PUT /api/students/4 returns 200 OK and updated year to 3

[7] Testing Delete Student (DELETE /api/students/4)...
  [PASS] DELETE /api/students/4 returns 200 OK and success flag

[8] Verifying Deletion (GET /api/students/4 after delete)...
  [PASS] GET /api/students/4 returns 404 Not Found after deletion

[9] Testing 404 Middleware (GET /api/nonexistent)...
  [PASS] GET /api/nonexistent triggers 404 middleware with JSON response

======================================================
  TEST RESULTS: 9/9 TESTS PASSED
======================================================
```

---

### 2. Manual Postman / cURL Testing

#### A. Read All Students (`GET /api/students`)
```bash
curl -X GET http://localhost:5000/api/students
```
**Response (`200 OK`):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Sneha Biswas",
      "email": "snehabiswasbsc24@rvu.edu.in",
      "department": "Computer Science & Engineering",
      "year": 2,
      "status": "Active"
    }
  ]
}
```

#### B. Create Student (`POST /api/students`)
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rohan Verma",
    "email": "rohan.verma@rvu.edu.in",
    "department": "Computer Science & Engineering",
    "year": 2,
    "status": "Active"
  }'
```
**Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Student record created successfully.",
  "data": {
    "id": 4,
    "name": "Rohan Verma",
    "email": "rohan.verma@rvu.edu.in",
    "department": "Computer Science & Engineering",
    "year": 2,
    "status": "Active"
  }
}
```

#### C. Validation Failure (`POST /api/students`)
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name": "Invalid Student"}'
```
**Response (`400 Bad Request`):**
```json
{
  "success": false,
  "error": "Validation Error: 'email' is required and must be a valid email format."
}
```

#### D. Update Student (`PUT /api/students/1`)
```bash
curl -X PUT http://localhost:5000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"year": 3}'
```
**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Student with ID 1 updated successfully.",
  "data": {
    "id": 1,
    "name": "Sneha Biswas",
    "email": "snehabiswasbsc24@rvu.edu.in",
    "department": "Computer Science & Engineering",
    "year": 3,
    "status": "Active"
  }
}
```

#### E. Delete Student (`DELETE /api/students/2`)
```bash
curl -X DELETE http://localhost:5000/api/students/2
```
**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Student with ID 2 deleted successfully.",
  "data": {
    "id": 2,
    "name": "Aarav Sharma"
  }
}
```

---

## 🚀 How to Run the Project

### Start Backend API Server
```bash
cd server
npm start
```
Server runs at `http://localhost:5000`.

### Start Frontend Client
```bash
cd client
npm run dev
```
Client runs at `http://localhost:5173`. Open in your browser to view the **Student Services (Experiment 6)** interactive interface.

---

## 🏁 Conclusion
In this experiment, a RESTful API backend service was designed and constructed using Node.js and Express. The service adheres to REST conventions by mapping CRUD actions to HTTP methods (`GET`, `POST`, `PUT`, `DELETE`). Modular middleware was integrated for request logging, JSON body parsing, schema validation, and centralized error handling. The service was consumed through a React client interface and validated using automated tests and Postman.
