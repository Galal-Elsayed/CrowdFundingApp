import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/tokenStorage';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import '../styles/Header.css'

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleLogout = () => {
        removeToken();
        setIsLoggedIn(false);
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search logic or navigation here
    };

    return (
        <div className="navbar-outer">
            <nav className="navbar-pill">
                <form className="search-bar" onSubmit={handleSearch}>
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for projects"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>
                <div className="navbar-logo" onClick={()=> navigate('/')}>CROWDFUND</div>
                <div className="nav-group">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/projects" className="nav-link">Projects</Link>
                    <Link to="/donations" className="nav-link">Donations</Link>
                    {!isLoggedIn ? (
                        <button className="signin-btn" onClick={() => navigate('/login')}>Sign in</button>
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
        </div>
    );
};

export default Header;
