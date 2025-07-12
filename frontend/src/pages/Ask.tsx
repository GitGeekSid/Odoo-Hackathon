import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axios';

const Ask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/questions', { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Question posted!");
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to post question");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
        <form onSubmit={handleAsk} className="space-y-4">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded h-40"></textarea>
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Ask;
