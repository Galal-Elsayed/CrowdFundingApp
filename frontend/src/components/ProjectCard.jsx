import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/ProjectCard.css";
import donationService from "../services/donationService";
import { deleteProject } from "../services/projectService";
import { getCurrentUser, getToken } from "../services/authService";

const ProjectCard = ({
  project,
  openDonationModal,
  disableDonate,
  onProjectDeleted,
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [donated, setDonated] = useState(project.donated_amount || 0);
  const [notification, setNotification] = useState("");
  const [showDonationsModal, setShowDonationsModal] = useState(false);
  const [donations, setDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const [donationsError, setDonationsError] = useState("");
  const [user, setUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate(); 

  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      setUser(u);
    })();
  }, []);

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

  const isOwner = user && project.created_by?.email === user.email;

  const goal = parseFloat(project.target_amount);
  const progress = Math.min((donated / goal) * 100, 100);

  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const payload = {
        project: project.id,
        amount,
      };
      if (!user) {
        payload.name = name;
        payload.email = email;
      }
      await donationService.createDonation(payload, token);
      setDonated((prev) => parseFloat(prev) + parseFloat(amount));
      setNotification("Thank you for your donation!");
      setTimeout(() => setNotification(""), 2000);
      setAmount("");
      setName("");
      setEmail("");
    } catch (err) {
      setError("Failed to donate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-project/${project.id}`);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      const token = getToken();
      await deleteProject(project.id, token);
      setNotification("Project deleted successfully!");
      setTimeout(() => {
        setNotification("");
        if (onProjectDeleted) {
          onProjectDeleted(project.id);
        }
      }, 1500);
    } catch (error) {
      setNotification("Failed to delete project. Please try again.");
      setTimeout(() => setNotification(""), 3000);
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const fetchDonations = async () => {
    setLoadingDonations(true);
    setDonationsError("");
    try {
      const res = await fetch(`/api/donations/?project=${project.id}`);
      const data = await res.json();
      setDonations(data);
    } catch (err) {
      setDonationsError("Failed to load donations.");
    } finally {
      setLoadingDonations(false);
    }
  };

  useEffect(() => {
    if (showDonationsModal) {
      fetchDonations();
    }
  }, [showDonationsModal]);

  return (
    <div className="project-card">
      <div className="image-container">
        {project.image ? (
          <img src={`${project.image}`} alt={project.title} />
        ) : (
          <span style={{ color: "#666", fontSize: "14px" }}>Project Image</span>
        )}
        <button
          className="donate-btnn"
          onClick={openDonationModal}
          disabled={disableDonate}
        >
          Donate Now!
        </button>
      </div>

      <h3>{project.title}</h3>

      <p className="created-by">
        Created by: {project.created_by?.email || "Unknown"}
      </p>

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
        <div className="info-row">
          <span className="info-label">Ends in:</span>
          <span className="info-value">{getDaysRemaining(project.end_date)} days</span>
        </div>
        <div className="date-range">
          From {formatDate(project.start_date)} to {formatDate(project.end_date)}
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          <span className="progress-label">
            {donated.toLocaleString()} EGP raised
          </span>
        </div>
      </div>

      <button
        className="view-donations-btn"
        onClick={() => setShowDonationsModal(true)}
      >
        View Donations
      </button>

      {isOwner && (
        <div className="owner-actions">
          <button
            className="edit-btn"
            onClick={handleEdit}
            disabled={deleting}
          >
            Edit
          </button>
          <button
            className="delete-btn"
            onClick={handleDeleteClick}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}

      {notification && (
        <div className="donation-notification">{notification}</div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={handleDeleteCancel}>
          <div
            className="modal-content confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Confirm Delete</h2>
            <p>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>
            <div className="confirm-actions">
              <button
                className="confirm-btn"
                onClick={handleDeleteConfirm}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                className="cancel-btn"
                onClick={handleDeleteCancel}
                disabled={deleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDonationsModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDonationsModal(false)}
        >
          <div
            className="modal-content transparent-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Recent Donations</h2>
            {loadingDonations ? (
              <p>Loading...</p>
            ) : donationsError ? (
              <p className="error">{donationsError}</p>
            ) : donations.length === 0 ? (
              <p>No donations yet.</p>
            ) : (
              <ul className="donations-list">
                {donations.map((d) => (
                  <li key={d.id}>
                    <strong>{d.donor_name}</strong> ({d.donor_email}) donated{" "}
                    <strong>{d.amount} EGP</strong> on{" "}
                    {new Date(d.donated_at).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowDonationsModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
