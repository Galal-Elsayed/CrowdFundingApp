import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/projectService';
import donationService from '../services/donationService';
import '../styles/Home.css';
import '../styles/Donations.css';


const Donations = () => {
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function fetchData() {
      const projs = await getProjects();
      setProjects(projs);
      const res = await fetch('/api/donations/');
      const dons = await res.json();
      setDonations(dons);
    }
    fetchData();
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await donationService.createDonation({
        project: selectedProject,
        amount,
        name,
        email,
      });
      setSuccess('Donation successful!');
      setAmount('');
      setName('');
      setEmail('');
      setSelectedProject('');
    } catch {
      setError('Failed to donate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <div className="donations-container">
        <form onSubmit={handleSubmit} className="donation-form">
          <h2>Donate to a Campaign</h2>
          <label>Campaign:
            <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} required>
              <option value="">Select a campaign</option>
              {projects
                .filter(p => Number(p.donated_amount) < Number(p.target_amount))
                .map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
            </select>
          </label>
          <label>Amount (EGP):
            <input type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} required />
          </label>
          <label>Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </label>
          <label>Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <button type="submit" disabled={loading}>{loading ? 'Donating...' : 'Donate'}</button>
        </form>
        <div className="donation-log">
          <h2>Donation Log</h2>
          <ul style={{ maxHeight: 300, overflowY: 'auto', padding: 0, listStyle: 'none' }}>
            {donations.length === 0 ? <li>No donations yet.</li> : donations
              .filter(d => {
                const project = projects.find(p => p.id === d.project);
                return project && Number(project.donated_amount) < Number(project.target_amount);
              })
              .map(d => (
                <li key={d.id} style={{ borderBottom: '1px solid #eee', padding: 8 }}>
                  <strong>{d.donor_name}</strong> ({d.donor_email}) donated <strong>{d.amount} EGP</strong> to <strong>{projects.find(p => p.id === d.project)?.title || 'Unknown'}</strong> on {new Date(d.donated_at).toLocaleString()}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Donations;
