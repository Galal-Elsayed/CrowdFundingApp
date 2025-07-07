import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/tokenStorage";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Header.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Crowdfunding
          </Link>
          <Link to="/projects" className="nav-link">
            Projects
          </Link>
          <Link to="/donations" className="nav-link">
            Donations
          </Link>
          <Link to="/create-project" className="nav-link">
            Create a project
          </Link>
        </div>

        <div className="auth-section">
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <FaUserCircle className="profile-icon" />
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
