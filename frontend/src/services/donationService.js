import axios from 'axios';

const DONATION_API = '/api/donations/';

// Submit a donation
export const submitDonation = async (donationData) => {
  try {
    const response = await axios.post(DONATION_API, donationData);
    return response.data;
  } catch (error) {
    console.error("Donation submission error:", error);
    throw error;
  }
};
