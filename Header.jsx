import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Promotional Banner */}
      <div className="promo-banner">
        <div className="container">
          <p>
            <strong>5 - 6 & 19 - 20 July:</strong> Skip showroom-hopping! Meet multiple designers at the Ez-ID Meetup event. 😎 <strong>RSVP now</strong> ›
          </p>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <Link to="/">
                <img src="/ez_id_logo.png" alt="Ez-ID Logo" />
              </Link>
            </div>

            {/* Navigation */}
            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
              <Link to="/browse-designers">Browse Designers</Link>
              <Link to="/design-ideas">Design Ideas</Link>
              <Link to="/articles">Articles</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </nav>

            {/* User Actions */}
            <div className="user-actions">
              <div className="profile-icon">
                <img src="/api/placeholder/32/32" alt="Profile" />
              </div>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

