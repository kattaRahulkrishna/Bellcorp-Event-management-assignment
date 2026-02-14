import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css'; // We will create this

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">B</span> Bellcorp Events
                </Link>

                <div className="navbar-menu">
                    <Link to="/" className="nav-link">Browse Events</Link>
                    {user && <Link to="/dashboard" className="nav-link">My Dashboard</Link>}
                </div>

                <div className="navbar-auth">
                    {user ? (
                        <div className="user-menu">
                            <span className="user-name">{user.username}</span>
                            <button onClick={handleLogout} className="btn-logout" title="Logout">
                                <span className="logout-icon">⏻</span>
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="btn-primary">Login/Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
