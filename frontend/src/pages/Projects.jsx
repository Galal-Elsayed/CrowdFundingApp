import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/projectService';
import ProjectCard from '../components/ProjectCard';
import '../styles/Home.css';
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser, getToken } from '../services/authService';
import donationService from '../services/donationService';


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDonationProjectId, setOpenDonationProjectId] = useState(null);
  const [donationForm, setDonationForm] = useState({ amount: '', name: '', email: '' });
  const [donationLoading, setDonationLoading] = useState(false);
  const [donationError, setDonationError] = useState('');
  const [donationNotification, setDonationNotification] = useState('');
  const [user, setUser] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('An error occurred while fetching projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      setUser(u);
    })();
  }, []);

  const handleDonate = async (e) => {
    e.preventDefault();
    setDonationLoading(true);
    setDonationError('');
    try {
      const token = getToken();
      const payload = {
        project: openDonationProjectId,
        amount: donationForm.amount,
      };
      if (user) {
        payload.donor = user.id;        
        payload.name = user.name;
        payload.email = user.email;
      } else {
        payload.name = donationForm.name;
        payload.email = donationForm.email;
      }
      await donationService.createDonation(payload, token);
      setDonationNotification('Thank you for your donation!');
      setTimeout(async () => {
        // Add cache-busting param
        const data = await getProjects({ t: Date.now() });
        setProjects(data);
      }, 350);
      setOpenDonationProjectId(null);
      setDonationForm({ amount: '', name: '', email: '' });
    } catch (err) {
      setDonationError('Failed to donate. Please try again.');
    } finally {
      setDonationLoading(false);
    }
  };

  const filteredProjects = projects
    .filter((project) => project.title.toLowerCase().includes(searchQuery))
    .filter((project) => Number(project.donated_amount) < Number(project.target_amount));

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="projects-grid projects-main">
        {projects.length > 0 ? (
            filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              openDonationModal={() => setOpenDonationProjectId(project.id)}
              disableDonate={openDonationProjectId !== null && openDonationProjectId !== project.id}
              openDropdownId={openDropdownId}
              setOpenDropdownId={setOpenDropdownId}
            />
          ))
        ) : (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <p>No projects available at the moment</p>
          </div>
        )}
      </div>
      {openDonationProjectId && (
        <div className="modal-overlay" onClick={() => setOpenDonationProjectId(null)}>
          <div className="modal-content transparent-modal" onClick={e => e.stopPropagation()}>
            <form className="donation-form" onSubmit={handleDonate}>
              <h2>Donate to this Campaign</h2>
              <label>Amount (EGP):
                <input type="number" min="1" value={donationForm.amount} onChange={e => setDonationForm(f => ({ ...f, amount: e.target.value }))} required />
              </label>
              {!user && (
                <>
                  <label>Name:
                    <input type="text" value={donationForm.name} onChange={e => setDonationForm(f => ({ ...f, name: e.target.value }))} required />
                  </label>
                  <label>Email:
                    <input type="email" value={donationForm.email} onChange={e => setDonationForm(f => ({ ...f, email: e.target.value }))} required />
                  </label>
                </>
              )}
              {donationError && <div className="error">{donationError}</div>}
              <div className="form-actions">
                <button type="submit" disabled={donationLoading}>{donationLoading ? "Donating..." : "Donate"}</button>
                <button type="button" onClick={() => setOpenDonationProjectId(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {donationNotification && <div className="donation-notification">{donationNotification}</div>}
    </>
  );

};

export default Projects;
