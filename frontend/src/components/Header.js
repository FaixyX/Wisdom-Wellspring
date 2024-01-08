import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';


export default function Header(props) {
 
  return (
    <nav className="navbar">
    <div className="logo">{props.title}</div>
    <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/myblog">My Blogs</NavLink></li>
        <li><NavLink to="/makepost">Publish a Post</NavLink></li>
    </ul >
    <ul className="nav-links">
      <li><NavLink to="/login">Login</NavLink></li>
      <li><NavLink to="/signup">Signup</NavLink></li>
    </ul> 
  </nav>
  )
}
Header.propTypes={
  title : PropTypes.string
}
