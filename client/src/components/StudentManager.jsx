// Campus Connect Portal - Student Management REST Consumer (Experiment 6)
// Consumes backend RESTful API endpoints for full CRUD operations

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = '/api/students';

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [lastApiLog, setLastApiLog] = useState(null);

  // Form state for creating or editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Computer Science & Engineering',
    year: '1',
    status: 'Active'
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch all students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const logResponse = (method, endpoint, status, data) => {
    setLastApiLog({
      timestamp: new Date().toLocaleTimeString(),
      method,
      endpoint,
      status,
      data
    });
  };

  // READ ALL: GET /api/students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setStudents(res.data.data);
      logResponse('GET', API_BASE, res.status, res.data);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      setStatusMessage({ type: 'error', text: `Fetch failed: ${errMsg}` });
      logResponse('GET', API_BASE, err.response?.status || 500, err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Handle inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // CREATE: POST /api/students  OR  UPDATE: PUT /api/students/:id
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    try {
      if (editingId) {
        // UPDATE: PUT /api/students/:id
        const res = await axios.put(`${API_BASE}/${editingId}`, formData);
        setStatusMessage({ type: 'success', text: `Student #${editingId} updated successfully!` });
        logResponse('PUT', `${API_BASE}/${editingId}`, res.status, res.data);
        setEditingId(null);
      } else {
        // CREATE: POST /api/students
        const res = await axios.post(API_BASE, formData);
        setStatusMessage({ type: 'success', text: 'New student added successfully!' });
        logResponse('POST', API_BASE, res.status, res.data);
      }

      // Reset form & refresh list
      setFormData({
        name: '',
        email: '',
        department: 'Computer Science & Engineering',
        year: '1',
        status: 'Active'
      });
      fetchStudents();
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      setStatusMessage({ type: 'error', text: `Operation failed: ${errMsg}` });
      logResponse(
        editingId ? 'PUT' : 'POST',
        editingId ? `${API_BASE}/${editingId}` : API_BASE,
        err.response?.status || 500,
        err.response?.data
      );
    }
  };

  // Start editing
  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year.toString(),
      status: student.status
    });
    setStatusMessage(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      department: 'Computer Science & Engineering',
      year: '1',
      status: 'Active'
    });
  };

  // DELETE: DELETE /api/students/:id
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete student: "${name}" (ID: ${id})?`)) {
      return;
    }

    try {
      const res = await axios.delete(`${API_BASE}/${id}`);
      setStatusMessage({ type: 'success', text: `Student #${id} deleted successfully!` });
      logResponse('DELETE', `${API_BASE}/${id}`, res.status, res.data);
      fetchStudents();
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      setStatusMessage({ type: 'error', text: `Delete failed: ${errMsg}` });
      logResponse('DELETE', `${API_BASE}/${id}`, err.response?.status || 500, err.response?.data);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.badge}>EXPERIMENT 6: RESTful API</div>
        <h1 style={styles.title}>Student Services & Records</h1>
        <p style={styles.subtitle}>
          Campus Connect Portal &bull; Full CRUD Operations over Express Backend
        </p>
      </div>

      {/* Status Alert */}
      {statusMessage && (
        <div
          style={{
            ...styles.alert,
            backgroundColor: statusMessage.type === 'error' ? '#ffebee' : '#e8f5e9',
            borderColor: statusMessage.type === 'error' ? '#ef5350' : '#66bb6a',
            color: statusMessage.type === 'error' ? '#c62828' : '#2e7d32'
          }}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Main Grid: Form (Create/Update) + List */}
      <div style={styles.grid}>
        {/* Left: Form */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>
            {editingId ? `Edit Student (ID: ${editingId})` : 'Add New Student'}
          </h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ananya Rao"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. ananya@rvu.edu.in"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Data Science & AI">Data Science & AI</option>
                <option value="Design & Innovation">Design & Innovation</option>
                <option value="Business Management">Business Management</option>
                <option value="Liberal Arts">Liberal Arts</option>
              </select>
            </div>

            <div style={styles.row}>
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.label}>Year of Study</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                  <option value="4">Year 4</option>
                </select>
              </div>

              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.label}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="Active">Active</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.primaryBtn}>
                {editingId ? 'Save Changes (PUT)' : 'Create Student (POST)'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={styles.secondaryBtn}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right: Table / List */}
        <div style={styles.card}>
          <div style={styles.listHeader}>
            <h2 style={styles.sectionTitle}>
              Enrolled Students ({students.length})
            </h2>
            <button onClick={fetchStudents} style={styles.refreshBtn} title="Refresh">
              {loading ? 'Refreshing...' : '🔄 Reload'}
            </button>
          </div>

          {loading && students.length === 0 ? (
            <p style={styles.mutedText}>Loading student records from server...</p>
          ) : students.length === 0 ? (
            <p style={styles.mutedText}>No students found. Use the form to create one!</p>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeadRow}>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Department</th>
                    <th style={styles.th}>Year</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} style={styles.tableRow}>
                      <td style={styles.td}><strong>#{student.id}</strong></td>
                      <td style={styles.td}>{student.name}</td>
                      <td style={styles.td}><code style={styles.emailCode}>{student.email}</code></td>
                      <td style={styles.td}>{student.department}</td>
                      <td style={styles.td}>Year {student.year}</td>
                      <td style={styles.td}>
                        <div style={styles.actionBtns}>
                          <button
                            onClick={() => handleEdit(student)}
                            style={styles.editBtn}
                            title="Edit Student"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(student.id, student.name)}
                            style={styles.deleteBtn}
                            title="Delete Student"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Live REST API Inspector Console */}
      <div style={styles.consoleCard}>
        <div style={styles.consoleHeader}>
          <span style={styles.consoleTitle}>📡 Live REST API Inspector</span>
          {lastApiLog && (
            <span style={styles.consoleMeta}>
              {lastApiLog.method} {lastApiLog.endpoint} &bull; HTTP {lastApiLog.status} &bull; {lastApiLog.timestamp}
            </span>
          )}
        </div>
        <pre style={styles.consoleContent}>
          {lastApiLog
            ? JSON.stringify(lastApiLog, null, 2)
            : '// Perform any CRUD operation above to see real-time REST API requests & responses'}
        </pre>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px 16px',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    color: '#212529'
  },
  header: {
    backgroundColor: '#0A2240',
    color: '#ffffff',
    borderRadius: '10px',
    padding: '24px 30px',
    marginBottom: '24px',
    boxShadow: '0 4px 12px rgba(10,34,64,0.15)',
    textAlign: 'center'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#F2A900',
    color: '#0A2240',
    fontWeight: '700',
    fontSize: '12px',
    letterSpacing: '1px',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '10px'
  },
  title: {
    margin: '0 0 6px 0',
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff'
  },
  subtitle: {
    margin: 0,
    fontSize: '14px',
    color: '#e0e0e0'
  },
  alert: {
    padding: '12px 18px',
    borderRadius: '6px',
    border: '1px solid transparent',
    marginBottom: '20px',
    fontSize: '14px',
    fontWeight: '500'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.8fr',
    gap: '24px',
    marginBottom: '24px'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '22px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    border: '1px solid #e9ecef'
  },
  sectionTitle: {
    margin: '0 0 18px 0',
    fontSize: '18px',
    color: '#0A2240',
    fontWeight: '600'
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  refreshBtn: {
    padding: '6px 12px',
    backgroundColor: '#f1f3f5',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  row: {
    display: 'flex',
    gap: '12px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057'
  },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '6px'
  },
  primaryBtn: {
    flex: 1,
    padding: '11px',
    backgroundColor: '#0A2240',
    color: '#F2A900',
    fontWeight: '700',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  secondaryBtn: {
    padding: '11px 16px',
    backgroundColor: '#6c757d',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px'
  },
  tableHeadRow: {
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #dee2e6'
  },
  th: {
    textAlign: 'left',
    padding: '10px 12px',
    color: '#495057',
    fontWeight: '600'
  },
  tableRow: {
    borderBottom: '1px solid #f1f3f5'
  },
  td: {
    padding: '10px 12px',
    verticalAlign: 'middle'
  },
  emailCode: {
    backgroundColor: '#f8f9fa',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#0A2240'
  },
  actionBtns: {
    display: 'flex',
    gap: '6px'
  },
  editBtn: {
    padding: '4px 8px',
    backgroundColor: '#e7f5ff',
    color: '#1971c2',
    border: '1px solid #a5d8ff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  },
  deleteBtn: {
    padding: '4px 8px',
    backgroundColor: '#ffe3e3',
    color: '#e03131',
    border: '1px solid #ffc9c9',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  },
  mutedText: {
    color: '#868e96',
    textAlign: 'center',
    padding: '24px 0'
  },
  consoleCard: {
    backgroundColor: '#1e1e1e',
    color: '#a6e22e',
    borderRadius: '8px',
    padding: '16px 20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  },
  consoleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    borderBottom: '1px solid #333',
    paddingBottom: '8px'
  },
  consoleTitle: {
    color: '#f8f9fa',
    fontWeight: '600',
    fontSize: '13px'
  },
  consoleMeta: {
    color: '#F2A900',
    fontSize: '12px',
    fontFamily: 'monospace'
  },
  consoleContent: {
    margin: 0,
    fontSize: '12px',
    fontFamily: 'Courier New, monospace',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    color: '#a9dc76',
    maxHeight: '160px'
  }
};
