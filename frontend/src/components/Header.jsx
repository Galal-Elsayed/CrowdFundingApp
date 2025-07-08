import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/tokenStorage";
import { FaUserCircle, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import "../styles/Header.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/projects?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setShowSearchOverlay(false);
    }
  };

  // Close menu on navigation
  const handleNavClick = (to) => {
    navigate(to);
    setMenuOpen(false);
  };

  return (
    <div className="navbar-outer">
      <nav className="navbar-pill">
        {/* Burger icon for mobile */}
        <button
          className="burger-menu"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNavClick("/")}>CROWDFUND</div>
        {/* Search icon (always visible) */}
        <button
          className="search-icon-btn"
          aria-label="Open search"
          onClick={() => setShowSearchOverlay(true)}
        >
          <FaSearch size={20} />
        </button>
        {/* Nav links (desktop or mobile) */}
        <div className={`nav-group${menuOpen ? " open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => handleNavClick("/")}>Home</Link>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Campaigns
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="/projects">
                  All Campaigns
                </a>
              </li>
              {isLoggedIn && (
                <li>
                  <a className="dropdown-item" href="/create-project">
                    Add campaign
                  </a>
                </li>
              )}
            </ul>
          </div>
          <Link to="/donations" className="nav-link" onClick={() => handleNavClick("/donations")}>Donations</Link>
          <Link to="/contact-us" className="nav-link" onClick={() => handleNavClick("/contact-us")}>Contact</Link>
          {!isLoggedIn ? (
            <>
              <button className="login-btn" onClick={() => handleNavClick("/login")}>Sign in</button>
              <button className="register-btn" onClick={() => handleNavClick("/register")}>Register</button>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={() => handleNavClick("/profile")}> <FaUserCircle className="profile-icon" /> </Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
        </div>
        {/* Search overlay */}
        {showSearchOverlay && (
          <div className="search-overlay" onClick={() => setShowSearchOverlay(false)}>
            <form className="search-overlay-form" onSubmit={handleSearch} onClick={e => e.stopPropagation()}>
              <input
                type="text"
                className="search-overlay-input"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoFocus
              />
              <button type="submit" className="search-overlay-btn"><FaSearch /></button>
            </form>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
