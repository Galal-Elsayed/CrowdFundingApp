import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import { getToken } from './utils/tokenStorage';
import Profile from './pages/Profile';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      await axios.get('http://127.0.0.1:8000/auth/users/me/', {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Router>

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="main" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/donations" element={<h1>Donations Page</h1>} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
