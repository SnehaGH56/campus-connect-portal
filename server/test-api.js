// Campus Connect Portal - Automated API Test Runner (Experiment 6)
// Tests all 5 CRUD operations, middleware validation, and error handling

const http = require('http');
const app = require('./src/app');

const PORT = 5055; // Dedicated test port
let server;

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: '127.0.0.1',
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload && { 'Content-Length': Buffer.byteLength(payload) })
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let parsed;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        resolve({ status: res.statusCode, body: parsed });
      });
    });

    req.on('error', (err) => reject(err));
    if (payload) req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('\n======================================================');
  console.log('  RUNNING EXPERIMENT 6 REST API AUTOMATED TEST SUITE  ');
  console.log('======================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, testName, details = '') {
    total++;
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${testName} - ${details}`);
    }
  }

  try {
    // Test 1: GET / (Root Health Check)
    console.log('[1] Testing Root Endpoint (GET /)...');
    const rootRes = await makeRequest('GET', '/');
    assert(
      rootRes.status === 200 && rootRes.body.status === 'Online',
      'GET / returns 200 OK and Online status'
    );

    // Test 2: GET /api/students (Read All)
    console.log('\n[2] Testing Read All Students (GET /api/students)...');
    const getAllRes = await makeRequest('GET', '/api/students');
    assert(
      getAllRes.status === 200 && Array.isArray(getAllRes.body.data),
      'GET /api/students returns 200 OK and student array',
      `Count: ${getAllRes.body.count}`
    );

    // Test 3: POST /api/students (Create New Student)
    console.log('\n[3] Testing Create Student (POST /api/students)...');
    const newStudentData = {
      name: "Rohan Verma",
      email: "rohan.verma@rvu.edu.in",
      department: "Computer Science & Engineering",
      year: 2,
      status: "Active"
    };
    const createRes = await makeRequest('POST', '/api/students', newStudentData);
    const createdId = createRes.body.data ? createRes.body.data.id : null;
    assert(
      createRes.status === 201 && createdId !== null,
      'POST /api/students returns 201 Created and assigned an ID',
      `Created ID: ${createdId}`
    );

    // Test 4: Middleware Validation (POST /api/students with missing fields)
    console.log('\n[4] Testing Validation Middleware (POST /api/students with invalid data)...');
    const invalidRes = await makeRequest('POST', '/api/students', { name: "Incomplete" });
    assert(
      invalidRes.status === 400 && invalidRes.body.success === false,
      'POST /api/students with missing email returns 400 Bad Request',
      `Error: ${invalidRes.body.error}`
    );

    // Test 5: GET /api/students/:id (Read Single Student)
    console.log(`\n[5] Testing Read Single Student (GET /api/students/${createdId})...`);
    const getSingleRes = await makeRequest('GET', `/api/students/${createdId}`);
    assert(
      getSingleRes.status === 200 && getSingleRes.body.data.name === "Rohan Verma",
      `GET /api/students/${createdId} returns 200 OK and matches created student`
    );

    // Test 6: PUT /api/students/:id (Update Student)
    console.log(`\n[6] Testing Update Student (PUT /api/students/${createdId})...`);
    const updateRes = await makeRequest('PUT', `/api/students/${createdId}`, {
      year: 3,
      department: "Software Engineering"
    });
    assert(
      updateRes.status === 200 && updateRes.body.data.year === 3,
      `PUT /api/students/${createdId} returns 200 OK and updated year to 3`
    );

    // Test 7: DELETE /api/students/:id (Delete Student)
    console.log(`\n[7] Testing Delete Student (DELETE /api/students/${createdId})...`);
    const deleteRes = await makeRequest('DELETE', `/api/students/${createdId}`);
    assert(
      deleteRes.status === 200 && deleteRes.body.success === true,
      `DELETE /api/students/${createdId} returns 200 OK and success flag`
    );

    // Test 8: Verify Deletion (GET /api/students/:id should return 404)
    console.log(`\n[8] Verifying Deletion (GET /api/students/${createdId} after delete)...`);
    const verifyDeleteRes = await makeRequest('GET', `/api/students/${createdId}`);
    assert(
      verifyDeleteRes.status === 404,
      `GET /api/students/${createdId} returns 404 Not Found after deletion`
    );

    // Test 9: Unknown route 404 handling
    console.log('\n[9] Testing 404 Middleware (GET /api/nonexistent)...');
    const notFoundRes = await makeRequest('GET', '/api/nonexistent');
    assert(
      notFoundRes.status === 404 && notFoundRes.body.success === false,
      'GET /api/nonexistent triggers 404 middleware with JSON response'
    );

  } catch (err) {
    console.error('Test execution failed:', err);
  } finally {
    server.close(() => {
      console.log('\n======================================================');
      console.log(`  TEST RESULTS: ${passed}/${total} TESTS PASSED`);
      console.log('======================================================\n');
      process.exit(passed === total ? 0 : 1);
    });
  }
}

// Start server and begin tests
server = app.listen(PORT, '127.0.0.1', () => {
  runTests();
});
