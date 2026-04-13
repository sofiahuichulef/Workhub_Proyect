import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header>
      <nav className="navbar">
        <div className="container-fluid navbar-inner">
          <Link to="/" className="title">
            <img className="logo" src="/logo.jpg" alt="Logo WorkHub Coworking" />
            <h2 className="title-text">CoWork</h2>
          </Link>

          <div className="mobile-controls">
            <Link to="/login" className="btn-login">Login</Link>
            <button
              className={`hamburger ${open ? 'open' : ''}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
            >
              <span /><span /><span />
            </button>
          </div>

          <div className={`nav-menu ${open ? 'nav-menu--open' : ''}`}>
            <ul className="nav-links">
              <li><Link className="nav-link" to="/spaces" onClick={() => setOpen(false)}>Spaces</Link></li>
              <li><Link className="nav-link" to="/#amenities" onClick={() => setOpen(false)}>Amenities</Link></li>
              <li><Link className="nav-link" to="/#pricing" onClick={() => setOpen(false)}>Pricing</Link></li>
              <li><Link className="nav-link" to="/#about" onClick={() => setOpen(false)}>About</Link></li>
            </ul>
            <Link to="/login" className="btn-login desktop-only">Login</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
