import React from 'react';

const resources = [
  {
    title: "Coping with Exam Stress",
    url: "https://www.mentalhealth.org.uk/exams",
    rating: 5,
  },
  {
    title: "Managing Anxiety",
    url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety/",
    rating: 4,
  },
];

const ResourceLibrary = () => {
  return (
    <div className="resource-library">
      <h2>Helpful Resources</h2>
      {resources.map((res, i) => (
        <div key={i} className="resource-item">
          <a href={res.url} target="_blank" rel="noopener noreferrer">{res.title}</a>
          <p>Rating: {res.rating}/5</p>
        </div>
      ))}
    </div>
  );
};

export default ResourceLibrary;
