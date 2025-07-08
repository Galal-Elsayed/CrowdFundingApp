import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProjectById } from "../services/projectService";
import "../styles/Projects.css";
import { Link } from "react-router-dom";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [error, setError] = useState(null);
  const fetchProjcet = async () => {
    try {
      const response = await getProjectById(id);
      setProject(response);
    } catch (error) {
      console.error("Error fetching project:", err);
      setError("Failed to load project");
    }
  };

  useEffect(() => {
    fetchProjcet();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!project) {
    return <p>Loading project...</p>;
  }

  return (
    <div className="project-details">
      {project.image && <img src={`${project.image}`} alt={project.title} />}
      <div className="text">
        <h3>Project Title</h3>
        <p>{project.title}</p>
        <h3>Project Description</h3>
        <p>{project.description}</p>
        <h3>Target Amount</h3>
        <p> {project.target_amount}</p>
        <h3>Start Date</h3>
        <p> {project.start_date}</p>
        <h3>End Date</h3>
        <p> {project.end_date}</p>
        <Link className="btn" to={`/edit-project/${project.id}`}>
          Edit Project
        </Link>
      </div>
    </div>
  );
}

export default ProjectDetails;
