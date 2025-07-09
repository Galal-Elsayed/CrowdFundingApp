import React, { useState } from 'react';
import { submitDonation } from '../services/donationService';
import '../styles/Form.css';

const DonationForm = ({ campaign, onClose }) => {
  const [formData, setFormData] = useState({
    name: "", email: "", amount: "", phone: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitDonation({
        ...formData,
        project: campaign.id
      });
      alert("Thanks for your donation!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error submitting donation.");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Donate to {campaign.title}</h3>
      <input name="name" placeholder="Name" required onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
      <input name="amount" type="number" placeholder="Amount (EGP)" required onChange={handleChange} />
      <input name="phone" placeholder="Phone" required onChange={handleChange} />
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default DonationForm;
