const API_BASE = "http://127.0.0.1:8000";
const API_URL = `${API_BASE}/auth/jwt/create/`;
const USER_URL = `${API_BASE}/auth/users/me/`;
const CHANGE_PASSWORD_URL = `${API_BASE}/auth/users/set_password/`;
const USERS_URL = `${API_BASE}/auth/users/`;
const UPDATE_USER_URL = `${API_BASE}/auth/users/me/`;

const login = async (email, password) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  localStorage.setItem("token", data.access);
  return data;
};

const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const response = await fetch(USER_URL, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!response.ok) return null;
  return response.json();
};

const getToken = () => localStorage.getItem("token");
const logout = () => localStorage.removeItem("token");

const changePassword = async (current_password, new_password) => {
  const token = localStorage.getItem("token");
  const res = await fetch(CHANGE_PASSWORD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ current_password, new_password })
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }
  // Djoser returns 204 No Content on success, so just return true
  return true;
};

const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(USERS_URL, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('You are not superuser, so you can not fetch users');
  return res.json();
};

const updateUser = async (data) => {
  const token = localStorage.getItem("token");
  const res = await fetch(UPDATE_USER_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw errorData;
  }
  return res.json();
};

export { login, getCurrentUser, getToken, logout, changePassword, getAllUsers, updateUser };
