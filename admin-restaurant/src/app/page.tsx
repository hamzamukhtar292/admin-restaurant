'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div className="flex justify-center items-center h-screen bg-bg">
      <form
        onSubmit={handleLogin}
        className="w-96 p-8 shadow-lg rounded-lg bg-card-bg text-text border border-border"
      >
        <h2 className="text-3xl font-bold mb-6 text-accent text-center">
          Admin Restaurant Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-placeholder text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-placeholder text-black"
        />
        <button
          type="submit"
          className="w-full p-3 bg-button text-white rounded hover:bg-red-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
