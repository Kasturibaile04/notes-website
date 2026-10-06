import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context-api/AuthContext';


function Navbar() {
  const {token, Logout} = useAuth();
  return (
   <nav className='sticky top-0 z-50 shadow-md bg-white'>
    <div className='max-w-7xl mx-auto px-8 h-16 flex items-center justify-between'>
      <img src="logo.png" alt="logo" className="h-40 w-70" />
      <div className='flex items-center gap-8'>
        <Link to="/" className='text-gray-900 hover:text-blue-500 font-medium transition'>Home</Link>
        <Link to="/course" className='text-gray-900 hover:text-blue-500 font-medium transition'>Course</Link>
        {token ? (
          <button onClick={Logout} className='bg-blue-600 text-white rounded-md hover:bg-blue-800  px-5 py-2 font-medium transition'>
            Logout
          </button>
        ) : (
          <Link to="/login" className='bg-blue-600 text-white rounded-md hover:bg-blue-800  px-5 py-2 font-medium transition'>
            Login
          </Link>
        )}

      </div>
    </div>
   </nav>
  )
}

export default Navbar