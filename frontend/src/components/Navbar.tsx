import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between">
      <Link to="/" className="font-bold text-xl">StackIt</Link>
      <div className="space-x-4">
        <Link to="/ask">Ask</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;