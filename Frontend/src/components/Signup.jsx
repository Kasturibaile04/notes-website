import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const navigate = useNavigate()

const handleSignup = async () => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/user/signup",
      {
        username,
        email,
        password,
        role,
      }
    );

    alert(res.data.message);
    navigate("/");

  } catch (error) {
    console.log("Signup error:", error.response?.data);
  }
};
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white w-80 p-6 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

        <input
          type="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
        />

       

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button  onClick={handleSignup}
        className="bg-blue-600 text-white rounded-md hover:bg-blue-800 px-5 py-2 font-medium transition w-full">
          Sign Up
        </button>

        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </a>
        </p>

      </div>
    </div>
  );
}

export default Signup;

