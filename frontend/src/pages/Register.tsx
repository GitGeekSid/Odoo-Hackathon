import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // register logic here
    console.log(username, email, password);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full p-2 border rounded" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;