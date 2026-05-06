import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <div className="container-fluid navbar-inner">
          <Link to="/" className="title">
            <img className="logo" src="/logo.png" alt="Logo WorkHub Coworking" />
            <h2 className="title-text animate__animated animate__bounceInLeft">CoWork</h2>
          </Link>

          <div className="mobile-controls">
            <button
              type="button"
              className="theme-toggle mobile-only"
              onClick={onToggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
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
              <li><Link className="nav-link" to="/amenities" onClick={() => setOpen(false)}>Amenities</Link></li>
              <li><Link className="nav-link" to="/pricing" onClick={() => setOpen(false)}>Pricing</Link></li>
              <li><Link className="nav-link" to="/about" onClick={() => setOpen(false)}>About</Link></li>
            </ul>
            <button
              type="button"
              className="theme-toggle desktop-only"
              onClick={onToggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <Link to="/login" className="btn-login desktop-only">Login</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
