'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy authentication logic
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-yellow-100 via-red-100 to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <form onSubmit={handleLogin} className="w-96 p-8 shadow-lg rounded-lg bg-white text-black dark:bg-gray-700 dark:text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600 dark:text-red-300">
          Admin Restaurant Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-gray-600 dark:border-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-gray-600 dark:border-gray-500"
        />
        <button type="submit" className="w-full p-3 bg-red-600 text-white rounded hover:bg-red-700 transition dark:bg-red-500 dark:hover:bg-red-400">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
