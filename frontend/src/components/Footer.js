// Footer.js

import React from 'react';


const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Your company description goes here. Keep it concise and engaging.</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            {/* Add your social media icons or links here */}
            {/* Example: <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a> */}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Your Website. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
