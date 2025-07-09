const API_URL = "/api/donations/";

const createDonation = async (data, token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create donation");
  }
  return response.json();
};

export default { createDonation };
