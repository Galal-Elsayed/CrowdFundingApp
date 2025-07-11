import { useEffect, useState } from "react";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";

function ProjectForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target_amount: "",
    start_date: "",
    end_date: "",
    image: null,
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      navigate("/");
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  useEffect(() => {
    // Only update formData if initialData is not empty and has changed
    if (initialData && Object.keys(initialData).length > 0) {
      const normalizeDate = (date) => {
        if (!date) return "";
        // If already in yyyy-mm-dd format, return as is
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
        return new Date(date).toISOString().split("T")[0];
      };
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        start_date: normalizeDate(initialData.start_date),
        end_date: normalizeDate(initialData.end_date),
      }));
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="form-input"
        placeholder="Title"
      />
      {errors.title && <p className="error-message">{errors.title[0]}</p>}

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="form-input"
        placeholder="Description"
      />
      {errors.description && (
        <p className="error-message">{errors.description[0]}</p>
      )}

      <label htmlFor="target_amount">Target Amount</label>
      <input
        id="target_amount"
        name="target_amount"
        type="number"
        value={formData.target_amount}
        onChange={handleChange}
        className="form-input"
        placeholder="Target Amount"
      />

      <label htmlFor="start_date">Start Date</label>
      <input
        id="start_date"
        name="start_date"
        type="date"
        className="form-input"
        value={formData.start_date}
        onChange={handleChange}
      />

      <label htmlFor="end_date">End Date</label>
      <input
        id="end_date"
        name="end_date"
        type="date"
        className="form-input"
        value={formData.end_date}
        onChange={handleChange}
      />

      <label htmlFor="image">Image</label>
      {formData.image && typeof formData.image === "string" && (
        <div className="preview-image">
          <img
            src={formData.image}
            alt="Preview"
            style={{ maxWidth: "100%", marginBottom: "10px" }}
          />
        </div>
      )}
      <input
        id="image"
        type="file"
        className="form-input"
        name="image"
        onChange={handleChange}
      />
      {errors.image && <p className="error-message">{errors.image[0]}</p>}

      <button className="form-button" type="submit">
        Save
      </button>
    </form>
  );
}

export default ProjectForm;
