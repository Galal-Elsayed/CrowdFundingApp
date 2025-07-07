import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { createProject } from "../services/projectService";

const CreateProject = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await createProject(data);
    navigate("/projects");
  };

  return <Form onSubmit={handleCreate} />;
};

export default CreateProject;
