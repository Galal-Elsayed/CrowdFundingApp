import React, { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import ProjectCard from "../components/ProjectCard";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError("An error occurred while fetching projects");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        padding: "20px",
        marginTop: "7rem",
      }}
    >
      {projects.length > 0 ? (
        projects.map((project) => (
          <Link to={`/project/${project?.id}`}>
            <ProjectCard key={project.id} project={project} />
          </Link>
        ))
      ) : (
        <div style={{ textAlign: "center", width: "100%" }}>
          <p>No projects available at the moment</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
