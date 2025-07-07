import { useEffect, useState } from "react";
import "../styles/Form.css";
import { fetchCategories } from "../services/projectService";
import { useNavigate } from "react-router-dom";

function ProjectForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target_amount: "",
    start_date: "",
    end_date: "",
    category: "",
    image: null,
    ...initialData,
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const normalizeDate = (date) => {
      if (!date) return "";
      return new Date(date).toISOString().split("T")[0];
    };
    setFormData((prev) => ({
      ...prev,
      ...initialData,
      start_date: normalizeDate(initialData.start_date),
      end_date: normalizeDate(initialData.end_date),
    }));
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="form-input"
        placeholder="Title"
      />
      {errors.title && <p className="error-message">{errors.title[0]}</p>}

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="form-input"
        placeholder="Description"
      />
      {errors.description && (
        <p className="error-message">{errors.description[0]}</p>
      )}

      <input
        name="target_amount"
        type="number"
        value={formData.target_amount}
        onChange={handleChange}
        className="form-input"
        placeholder="Target Amount"
      />

      <input
        name="start_date"
        type="date"
        className="form-input"
        value={formData.start_date}
        onChange={handleChange}
      />
      <input
        name="end_date"
        type="date"
        className="form-input"
        value={formData.end_date}
        onChange={handleChange}
      />

      <input
        type="file"
        className="form-input"
        name="image"
        onChange={handleChange}
      />
      {errors.image && <p className="error-message">{errors.image[0]}</p>}

      <select
        name="category"
        value={formData.category}
        className="form-input"
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button type="submit">Save</button>
    </form>
  );
}

export default ProjectForm;
