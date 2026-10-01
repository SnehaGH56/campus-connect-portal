import { useState } from 'react';
import AuthModule from './components/AuthModule.jsx';
import StudentManager from './components/StudentManager.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('student-manager');

  return (
    <div style={appStyles.container}>
      {/* Top Navigation Bar */}
      <nav style={appStyles.navbar}>
        <div style={appStyles.navBrand}>
          <span style={appStyles.logoIcon}>🎓</span>
          <span style={appStyles.brandText}>Campus Connect Portal</span>
        </div>
        <div style={appStyles.navTabs}>
          <button
            onClick={() => setActiveTab('student-manager')}
            style={activeTab === 'student-manager' ? appStyles.tabActive : appStyles.tabInactive}
          >
            📋 Student Services (Experiment 6)
          </button>
          <button
            onClick={() => setActiveTab('auth')}
            style={activeTab === 'auth' ? appStyles.tabActive : appStyles.tabInactive}
          >
            🔐 Portal Authentication
          </button>
        </div>
      </nav>

      {/* Main View */}
      <main style={appStyles.mainContent}>
        {activeTab === 'student-manager' ? (
          <StudentManager />
        ) : (
          <AuthModule initialMode="login" />
        )}
      </main>
    </div>
  );
}

const appStyles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#0A2240',
    color: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logoIcon: {
    fontSize: '22px'
  },
  brandText: {
    fontSize: '18px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    color: '#F2A900'
  },
  navTabs: {
    display: 'flex',
    gap: '8px'
  },
  tabActive: {
    padding: '8px 16px',
    backgroundColor: '#F2A900',
    color: '#0A2240',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '13px'
  },
  tabInactive: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '13px'
  },
  mainContent: {
    padding: '16px 8px'
  }
};

export default App;