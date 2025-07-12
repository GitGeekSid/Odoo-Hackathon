import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert("Login successful!");
    } catch (err: any) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
