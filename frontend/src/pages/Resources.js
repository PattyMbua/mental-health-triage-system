import React from 'react';
import './Resources.css';

const resources = [
  {
    title: "Mental Health Kenya",
    description: "Support and resources for mental health in Kenya.",
    link: "https://mental.health.go.ke/"
  },
  {
    title: "Mindfulness App",
    description: "A free app for guided meditations and stress relief.",
    link: "https://www.calm.com/"
  },
  {
    title: "Strathmore Mentoring Office",
    description: "Book mentoring support for academic stress, peer issues, or personal guidance.",
    link: "https://www.strathmore.edu/mentoring"
  },
  {
    title: "OpenCounseling (Free Resources)",
    description: "Free therapy content, crisis support and local therapists.",
    link: "https://www.opencounseling.com/"
  }
];

const Resources = () => {
  return (
    <div className="resources-page">
      <h2>Helpful Resources</h2>
      <div className="resource-list">
        {resources.map((r, index) => (
          <div className="resource-card" key={index}>
            <h3>{r.title}</h3>
            <p>{r.description}</p>
            <a href={r.link} target="_blank" rel="noreferrer">Visit Site</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
