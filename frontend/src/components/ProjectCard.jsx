import React, { useState } from "react";
import "../styles/ProjectCard.css";

const ProjectCard = ({ project }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const shouldShowReadMore =
    project.description && project.description.length > 100;

  return (
    <div className="project-card">
      <div className="image-container">
        {project.image ? (
          <img src={`${project.image}`} alt={project.title} />
        ) : (
          <span style={{ color: "#666", fontSize: "14px" }}>Project Image</span>
        )}
      </div>

      <h3>{project.title}</h3>

      <div className="description-container">
        <p>
          {isDescriptionExpanded
            ? project.description
            : truncateDescription(project.description)}
        </p>
        {shouldShowReadMore && (
          <button
            className="read-more-btn"
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          >
            {isDescriptionExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      <div className="info-section">
        <div className="info-row">
          <span className="info-label">Goal:</span>
          <span className="info-value">
            {parseFloat(project.target_amount).toLocaleString()} EGP
          </span>
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
            From {formatDate(project.start_date)} to{" "}
            {formatDate(project.end_date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
