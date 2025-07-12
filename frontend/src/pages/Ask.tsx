import { useState } from 'react';
import axios from 'axios';

const Ask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleAsk = async () => {
    try {
      await axios.post('/api/questions', {
        title,
        description,
        tags: tags.split(',').map((t) => t.trim()),
      }, {
        headers: {
          Authorization: `Bearer YOUR_TOKEN_HERE`,
        },
      });
      alert('Question posted');
    } catch (err) {
      alert('Failed to post question');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl mb-4">Ask a Question</h2>
      <input className="border p-2 w-full mb-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="border p-2 w-full mb-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      <input className="border p-2 w-full mb-2" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleAsk}>Post</button>
    </div>
  );
};

export default Ask;