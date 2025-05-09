import React from 'react';

const publicationsData = [
  {
    title: 'AI and the Future of Computing',
    author: 'John Doe',
    year: 2024,
    link: '#'
  },
  {
    title: 'Quantum Computing Breakthrough',
    author: 'Jane Smith',
    year: 2023,
    link: '#'
  }
];

export default function Publications() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Publications</h1>
      <ul className="space-y-4">
        {publicationsData.map((pub, index) => (
          <li key={index} className="border p-4 rounded shadow">
            <a href={pub.link} className="text-lg font-semibold text-blue-600 hover:underline">
              {pub.title}
            </a>
            <p className="text-sm text-gray-600">Author: {pub.author}, {pub.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
