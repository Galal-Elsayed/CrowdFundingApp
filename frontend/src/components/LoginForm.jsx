import React, { useState } from "react";
import { login, getCurrentUser, getToken, logout, changePassword } from "../services/authService";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      setEmail("");
      setPassword("");
      if (onLogin) onLogin();
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <label>Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
    </form>
  );
};

export default LoginForm; 