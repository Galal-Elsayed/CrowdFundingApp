import React from 'react';
import '../styles/ProjectCard.css';

const ProjectCard = ({ project }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="project-card">
      <div className="image-container">
        {project.image ? (
          <img
            src={`${project.image}`}
            alt={project.title}
          />
        ) : (
          <span style={{ color: "#666", fontSize: "14px" }}>
            Project Image
          </span>
        )}
      </div>

      <h3>{project.title}</h3>

      <p>{project.description}</p>

      <div className="info-section">
        <div className="info-row">
          <span className="info-label">Goal:</span>
          <span className="info-value">
            {parseFloat(project.target_amount).toLocaleString()} EGP
          </span>
        </div>

        <div className="info-row">
          <span className="info-label">Ends in:</span>
          <span className="info-value">
            {getDaysRemaining(project.end_date)} days
          </span>
        </div>

        <div className="date-range">
          From {formatDate(project.start_date)} to {formatDate(project.end_date)}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
