import React from 'react';
import './Publications.css';


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
    <div className="publications-container">
      <h1 className="publications-title">Publications</h1>
      <ul className="publications-list">
        {publicationsData.map((pub, index) => (
          <li key={index} className="publication-item">
            <h2 className="publication-title">
              {pub.title}
            </h2>
            <p className="publication-meta">Authors: {pub.authors}, {pub.year}</p>
            <a href={pub.link} className="publication-link">{pub.link}</a>
          </li>
        ))}
      </ul>
    </div>

  );
}