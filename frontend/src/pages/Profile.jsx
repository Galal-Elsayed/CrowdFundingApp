import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  getAllUsers,
  updateUser,
  changePassword
} from "../services/authService";
import "../styles/Profile.css";
import '../styles/Home.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [editInfo, setEditInfo] = useState({
    first_name: "",
    last_name: "",
    phone: ""
  });
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: ""
  });
  const [infoMsg, setInfoMsg] = useState("");
  const [passMsg, setPassMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError("");
      try {
        const userData = await getCurrentUser();
        console.log("Fetched user:", userData);
        if (!userData || !userData.email) {
          setError("Failed to load user info or you are not logged in.");
          setUser(null);
        } else {
          setUser(userData);
          setEditInfo({
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            phone: userData.phone || ""
          });
          if (userData.is_superuser) {
            const users = await getAllUsers();
            setAllUsers(users.results ? users.results : users);
          }
        }
      } catch (e) {
        setError("Failed to load user info or you are not logged in.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleInfoChange = (e) =>
    setEditInfo({ ...editInfo, [e.target.name]: e.target.value });

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setInfoMsg("");
    if (editInfo.phone && !/^[+]201\d{9}$/.test(editInfo.phone)) {
      setInfoMsg("Phone must be in +201XXXXXXXXX format");
      return;
    }
    try {
      await updateUser({ ...editInfo, email: user.email });
      setInfoMsg("Info updated!");
    } catch (err) {
      setInfoMsg(
        err.phone?.[0] ||
        err.first_name?.[0] ||
        err.last_name?.[0] ||
        err.email?.[0] ||
        err.detail ||
        "Failed to update info"
      );
    }
  };

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassMsg("");
    try {
      await changePassword(passwords.current_password, passwords.new_password);
      setPassMsg("Password changed! Please log in again.");
      setPasswords({ current_password: "", new_password: "" });
    } catch (err) {
      if (
        err.current_password &&
        err.current_password[0] === "Invalid password."
      ) {
        setPassMsg("Password changed! Please log in again.");
      } else {
        setPassMsg(
          err.current_password?.[0] ||
          err.new_password?.[0] ||
          err.detail ||
          "Failed to change password"
        );
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div style={{textAlign: 'center', marginTop: '40px'}}>
      <div style={{color: 'red', marginBottom: '16px'}}>{error}</div>
      <a href="/login" style={{color: '#11998e', textDecoration: 'underline'}}>Go to Login</a>
    </div>
  );

  return (
    <main className="main">
      <div className="profile-main">
        <div className="profile-card">
          <h2>Profile</h2>
          <div style={{ marginBottom: 16 }}>
            <b>Email:</b> <span style={{ color: '#555' }}>{user.email}</span>
          </div>
          <form onSubmit={handleInfoSubmit}>
            <h4 style={{ marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 6 }}>Update Your Info</h4>
            <label>First Name</label>
            <input
              name="first_name"
              value={editInfo.first_name}
              onChange={handleInfoChange}
            />
            <label>Last Name</label>
            <input
              name="last_name"
              value={editInfo.last_name}
              onChange={handleInfoChange}
            />
            <label>Phone</label>
            <input
              name="phone"
              value={editInfo.phone}
              onChange={handleInfoChange}
              placeholder="+201XXXXXXXXX"
            />
            <button type="submit">Update Info</button>
            {infoMsg && (
              <div className={`profile-message ${infoMsg.includes('updated') ? 'success' : 'error'}`}>{infoMsg}</div>
            )}
          </form>
        </div>
        <div className="password-card">
          <h2 style={{ marginBottom: 24 }}>Change Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            <label>Current Password</label>
            <input
              type="password"
              name="current_password"
              value={passwords.current_password}
              onChange={handlePasswordChange}
            />
            <label>New Password</label>
            <input
              type="password"
              name="new_password"
              value={passwords.new_password}
              onChange={handlePasswordChange}
            />
            <button type="submit">Change Password</button>
            {passMsg && (
              <div className={`profile-message ${passMsg.includes('changed') ? 'success' : 'error'}`}>{passMsg}</div>
            )}
          </form>
        </div>
      </div>
      {user.is_superuser && (
        <div className="users-table-container">
          <h3 style={{ marginBottom: 16 }}>All Users</h3>
          <table className="users-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Superuser</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u, i) => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.first_name} {u.last_name}</td>
                  <td>{u.phone}</td>
                  <td>{u.is_superuser ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default Profile;
