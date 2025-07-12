import React from 'react';
import Navbar from '../components/Navbar';
import QuestionCard from '../components/QuestionCard';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Recent Questions</h1>
        <QuestionCard title="How to learn React?" description="I'm a beginner and need help learning React." author="Ishan" />
      </div>
    </>
  );
};

export default Home;