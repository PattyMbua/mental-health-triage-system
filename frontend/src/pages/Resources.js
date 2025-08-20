import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaExternalLinkAlt } from 'react-icons/fa'; // For the "Visit Site" icon
import './Resources.css';

// Replace with your partner's IP and port
const BACKEND_URL = 'http://127.0.0.1:8000'; // 

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/resources/`);
        setResources(response.data);
      } catch (err) {
        setError('Failed to load resources. Check backend connection.');
        setResources([
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
        ]); // Fallback to hardcoded data
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) return <div className="resources-page__loading">Loading resources...</div>;
  if (error) return <div className="resources-page__error">{error}</div>;

  return (
    <div className="resources-page">
      <h2>Helpful Resources</h2>
      <div className="resource-list">
        {resources.map((r, index) => (
          <div className="resource-card" key={index}>
            <h3 className="resource-card__title">{r.title}</h3>
            <p className="resource-card__description">{r.description}</p>
            <a href={r.link} target="_blank" rel="noreferrer" className="resource-card__link">
              Visit Site <FaExternalLinkAlt className="resource-card__icon" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;