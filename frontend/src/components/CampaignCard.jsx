import React from 'react';
import '../styles/ProjectCard.css';

const CampaignCard = ({ campaign, onDonate }) => {
  const collected = campaign.collected_amount || 0;
  const remaining = campaign.target_amount - collected;

  return (
    <div className="project-card">
      <h3>{campaign.title}</h3>
      <p>{campaign.description}</p>
      <p><strong>Target:</strong> {campaign.target_amount} EGP</p>
      <p><strong>Collected:</strong> {collected} EGP</p>
      <p><strong>Remaining:</strong> {remaining} EGP</p>
      <button onClick={() => onDonate(campaign)}>Donate Now</button>
    </div>
  );
};

export default CampaignCard;
