import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login';
import Signup from './components/Signup';
import Course from './components/Course';
import Admin from './components/Admin';
import { useAuth } from './context-api/AuthContext';

// Shown to logged-in users who are not admins
function AdminOnly() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center bg-white p-8 rounded-sm border border-slate-50 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Admin only</h1>
        <p className="text-gray-600">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
}

function App() {
  // `role` must be provided by your AuthContext (see note below)
  const { token, role } = useAuth();

  return (
    <Routes>
      {token ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Course />} />
          <Route
            path="/admin"
            element={role === 'admin' ? <Admin /> : <AdminOnly />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;