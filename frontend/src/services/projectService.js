import axios from "axios";
import { getToken } from "../utils/tokenStorage";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://127.0.0.1:8000/projects/";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Always add cache-busting param
    if (!config.params) config.params = {};
    config.params._cb = Date.now();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getProjects = async (params) => {
  try {
    const response = await apiClient.get("", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await apiClient.get(`${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

export const createProject = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.user_id;
    const formData = new FormData();

    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    formData.append("created_by", userId);

    const response = await apiClient.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const updateProject = async (id, data) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }

  const response = await apiClient.patch(`${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchCategories = async () => {
  try {
    const response = await apiClient.get("http://127.0.0.1:8000/categories/");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
