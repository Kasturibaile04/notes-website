import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login';
import Signup from './components/Signup';
import Course from './components/Course';
import { useAuth } from './context-api/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      {token ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Course />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

export default App;