import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';


export default function Header(props) {

  const { logout } =useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
 
  return (
    <nav className="navbar">
      <div className="logo">{props.title}</div>
      {user && (<ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/myblog">My Blogs</NavLink></li>
          <li><NavLink to="/makepost">Publish a Post</NavLink></li>
      </ul >)}
      {user && (<div>
        <span>Login as: {user.username} </span>
        <button className='Logout' onClick={handleClick}>Logout</button>
      </div>)}
    {!user && (<ul className="nav-links">
      <li><NavLink to="/login">Login</NavLink></li>
      <li><NavLink to="/signup">Signup</NavLink></li>
    </ul> )}
  </nav>
  )
}
Header.propTypes={
  title : PropTypes.string
}
