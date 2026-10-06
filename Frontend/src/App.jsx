import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login';
import Signup from './components/Signup';
import Course from './components/Course';
import { useAuth } from './context-api/AuthContext';

function App() {
  const {token} = useAuth();
  return (
    <>
      { token ? (
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/course' element={<Course />} />
        
        </Routes>
         
      ):(
        
        <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        </Routes>
        
      )}
      </>
    );
}

export default App;