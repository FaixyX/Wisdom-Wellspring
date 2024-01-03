import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';





export default function Header(props) {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleSubscribeClick = () => {
    setPopoverOpen(!isPopoverOpen);
  };
 
  return (
    <nav className="navbar">
    <div className="logo">{props.title}</div>
    <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/blog">Blog</NavLink></li>
        {/*<li><NavLink to="/services">Services</NavLink></li>*/}
        <li><NavLink to="/contact">Contact us</NavLink></li>
        {/*<li><NavLink to="/about">About us</NavLink></li>*/}
    </ul>
    <button className='login' onClick={handleSubscribeClick}>Subscribe</button>
    {isPopoverOpen && (
        <div className="popover">
          <div className="subscription-layout">
            <p className="subscription-text">
              Subscribe to our newsletter for updates and special offers!
            </p>
            <input type="email" placeholder="Enter your email" className="email-input" required/>
            <button className="subscribe-button">Subscribe</button>
          </div>
          
          <i className="fas fa-times-circle cancel" onClick={handleSubscribeClick}></i>
          
          
          
        </div>
      )}
    
    
  </nav>
  )
}
Header.propTypes={
  title : PropTypes.string
}
