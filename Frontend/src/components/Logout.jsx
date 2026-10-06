import React from 'react';
import { useAuth } from '../context-api/AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const {Logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        Logout();
        navigate('/login');
    }
  return (
   <button onClick={handleLogout} 
   className='bg-blue-600 text-white rounded-md hover:bg-blue-800  px-5 py-2 font-medium transition'>
    Logout
    </button>
  )
}

export default Logout