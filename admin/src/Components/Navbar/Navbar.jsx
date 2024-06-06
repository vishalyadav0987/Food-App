import React from 'react'
import {assets} from '../../assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-container">
        <img src={assets.logo} alt="" className="logo" />
        <img src={assets.profile_image} alt="" className="admin-logo" />
      </div>
    </div>
  )
}

export default Navbar
Navbar