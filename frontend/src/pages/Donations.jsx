import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CampaignCard from '../components/CampaignCard';
import DonationForm from '../components/DonationForm';
import '../styles/Projects.css';

const Donations = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    axios.get('/api/projects/')
      .then(res => setCampaigns(res.data))
      .catch(err => console.error('Failed to fetch campaigns', err));
  }, []);

  return (
    <div className="projects-container">
      {campaigns.map(c => (
        <CampaignCard key={c.id} campaign={c} onDonate={setSelectedCampaign} />
      ))}

      {selectedCampaign && (
        <div className="form-popup">
          <DonationForm campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
        </div>
      )}
    </div>
  );
};

export default Donations;
