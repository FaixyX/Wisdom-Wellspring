import { useAuthContext } from '../hooks/useAuthContext';


import React from 'react';


const Footer = () => {

  const { user } = useAuthContext()

  return (

    <footer className="footer-container">
      {user && (<div className="footer-content">
      <div className="footer-section">
          <h3>About Us</h3>
          <p>Your company description goes here. Keep it concise and engaging.</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: faizanfaizy97@gmail.com</p>
          <p>Phone: +92 347 7271064</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            {/* Add your social media icons or links here */}
            {/* Example: <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a> */}
          </div>
        </div>
      </div>)}
      <div className="footer-bottom">
        <p>&copy; 2024 Your Website. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
