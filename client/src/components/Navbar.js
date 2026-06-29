import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar component displayed on every page.
 */
const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">✓</span>
          <span className="navbar-title">Todo App</span>
          <span className="navbar-subtitle">Ziptrrip</span>
        </Link>
        <div className="navbar-links">
          <Link
            to="/"
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            All Todos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
