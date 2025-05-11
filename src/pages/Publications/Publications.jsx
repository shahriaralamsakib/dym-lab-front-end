import React from 'react';


import { useEffect, useState } from 'react';
import { fetchPublicationData } from '../../services/api';

export default function Publications() {
  const [publicationsData, setPublicationsData] = useState([]);

  useEffect(() => {
    fetchPublicationData().then(res => {
      if (res.data.length > 0) setPublicationsData(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Publications</h1>
      <ul className="space-y-4">
        {publicationsData.map((pub, index) => (
          <li key={index} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-blue-600 hover:underline">
              {pub.title}
            </h2>
            <p className="text-sm text-gray-600">Authors: {pub.authors}, {pub.year}</p>
            <a href={pub.link} className="text-sm text-gray-600">{pub.link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}