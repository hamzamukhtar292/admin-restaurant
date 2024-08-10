"use client"
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginMutation } from './api/mutations/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, status, error } = useMutation({
    mutationFn:loginMutation,
    onSuccess: (data:any) => {
      localStorage.setItem('token', data.token);
      alert('Login successful');
    },
    onError: (error:any) => {
      console.error('Login error:', error.message);
    },
  })
   
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base">
      <h2 className="text-4xl font-bold text-textMain mb-8">
        Admin Panel
      </h2>
      <div className="w-96 p-8 shadow-lg rounded-lg bg-base border border-borderBase">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block  text-grey6 font-normal text-[14px] mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
              required
              className="w-full p-3 rounded-md border-none placeholder-textMain bg-inputMain"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-grey6 font-normal text-[14px] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-red-400 p-3 border-none placeholder-textMain rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-grey6 text-white rounded-md transition"
          >
            Login
          </button>
        </form>
        {status === 'pending' && <p className="text-center mt-4">Logging in...</p>}
        {status === 'success' && <p className="text-green-500 text-center mt-4">Login successful!</p>}
        {status === 'error' && <p className="text-red-500 text-center mt-4">Login failed: {error?.message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;