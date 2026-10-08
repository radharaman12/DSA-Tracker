import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const isDataStructureActive = [
    '/data-structures', '/arrays', '/linked-list', 
    '/stack', '/queue', '/tree', '/graph'
  ].includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          DSA Tracker
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>

            <li>
              <div className="dropdown">
                <Link 
                  to="/data-structures" 
                  className={`dropdown-title ${isDataStructureActive ? 'active' : ''}`}
                >
                  Data Structures ▾
                </Link>
                <div className="dropdown-content">
                  <Link to="/arrays" className={location.pathname === '/arrays' ? 'active' : ''}>Arrays</Link>
                  <Link to="/linked-list" className={location.pathname === '/linked-list' ? 'active' : ''}>Linked List</Link>
                  <Link to="/stack" className={location.pathname === '/stack' ? 'active' : ''}>Stack</Link>
                  <Link to="/queue" className={location.pathname === '/queue' ? 'active' : ''}>Queue</Link>
                  <Link to="/tree" className={location.pathname === '/tree' ? 'active' : ''}>Tree</Link>
                  <Link to="/graph" className={location.pathname === '/graph' ? 'active' : ''}>Graph</Link>
                </div>
              </div>
            </li>
            <li>
              <Link to="/algorithms" className={location.pathname === '/algorithms' ? 'active' : ''}>
                Algorithms
              </Link>
            </li>
            <li>
              <Link to="/sheet" className={location.pathname === '/sheet' ? 'active' : ''}>
                DSA Sheet
              </Link>
            </li>
        
        {/* Auth Navigation */}
        {user ? (
          <li className="dropdown">
            <span 
              className={`dropdown-title ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Profile ▾
            </span>
            <div className="dropdown-content profile-dropdown">
              <Link 
                to="/dashboard" 
                className={location.pathname === '/dashboard' ? 'active' : ''}
              >
                Profile
              </Link>
              <button onClick={handleLogout} className="dropdown-item-btn">
                Logout
              </button>
            </div>
          </li>
        ) : (
          <li className="auth-nav-item" style={{ flexDirection: 'row', gap: '8px', padding: 0 }}>
            <Link to="/login" className="auth-link login-link">Login</Link>
            <Link to="/register" className="auth-link register-link">Sign Up</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
