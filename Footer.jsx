import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Call to Action Section */}
        <div className="footer-cta">
          <h2>Your renovation journey starts here.</h2>
          <p>Join over 95,000 homeowners who have used Ez-ID to find reliable interior designers.</p>
          <button className="btn btn-primary">Find a Designer</button>
        </div>

        {/* About Section */}
        <div className="footer-about">
          <h3>About Ez-ID</h3>
          <p>
            Looking to transform your space? Find everything you need to renovate with assurance, only on Ez-ID. 
            Discover local interior design ideas for HDBs, condos and landed homes to inspire your home's look. 
            Read useful articles and browse our home shopping guides to help with your renovation planning. 
            And when you're all set, get in touch with reliable interior designers and enjoy additional perks 
            to safeguard your renovation, including the $50,000 Ez-ID Guarantee. A safer, simpler renovation journey starts here.
          </p>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><a href="#browse">Browse Designers</a></li>
              <li><a href="#quote">Get Free Quotes</a></li>
              <li><a href="#meetup">Ez-ID Meetup</a></li>
              <li><a href="#guarantee">Ez-ID Guarantee</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="#ideas">Design Ideas</a></li>
              <li><a href="#articles">Articles</a></li>
              <li><a href="#guides">Shopping Guides</a></li>
              <li><a href="#tips">Renovation Tips</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-logo">
            <img src="/ez_id_logo.png" alt="Ez-ID Logo" />
          </div>
          <div className="footer-copyright">
            <p>&copy; 2024 Ez-ID. All rights reserved.</p>
          </div>
          <div className="footer-chat">
            <button className="chat-button">Chat</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

