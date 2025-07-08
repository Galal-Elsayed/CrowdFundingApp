import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProject } from "../services/projectService";
import Form from "../components/Form";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getProjectById(id);
      setInitialData(data);
    };
    fetch();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    await updateProject(id, updatedData);
    navigate(`/project/${id}`);
  };

  if (!initialData) return <p>Loading...</p>;

  return <Form initialData={initialData} onSubmit={handleUpdate} />;
};

export default EditProject;
