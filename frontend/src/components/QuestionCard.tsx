import React from 'react';

type Props = {
  title: string;
  description: string;
  author: string;
};

const QuestionCard = ({ title, description, author }: Props) => {
  return (
    <div className="border p-4 rounded shadow-sm bg-white mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <p className="text-sm text-gray-500 mt-2">Asked by {author}</p>
    </div>
  );
};

export default QuestionCard;