import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const dsPaths = ['/data-structures', '/arrays', '/linked-list', '/stack', '/queue', '/tree', '/graph'];
  const isDsActive = dsPaths.some(p => location.pathname.startsWith(p));

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">DSA Tracker</Link>
      </div>
      <ul className="navbar-links">
        <li className="dropdown">
          <Link to="/data-structures" className={`dropdown-title ${isDsActive ? 'active' : ''}`}>
            Data Structures ▾
          </Link>
          <div className="dropdown-content">
            <Link to="/arrays" className={location.pathname === '/arrays' ? 'active' : ''}>Arrays</Link>
            <Link to="/linked-list" className={location.pathname === '/linked-list' ? 'active' : ''}>Linked List</Link>
            <Link to="/stack" className={location.pathname === '/stack' ? 'active' : ''}>Stack</Link>
            <Link to="/queue" className={location.pathname === '/queue' ? 'active' : ''}>Queue</Link>
            <Link to="/tree" className={location.pathname === '/tree' ? 'active' : ''}>Binary Tree</Link>
            <Link to="/graph" className={location.pathname === '/graph' ? 'active' : ''}>Graph</Link>
          </div>
        </li>
        <li>
          <Link to="/algorithms" className={location.pathname === '/algorithms' ? 'active' : ''}>
            Algorithms
          </Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
