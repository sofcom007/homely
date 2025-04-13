import React, { useState } from 'react'
import logo from '../assets/images/branding/homely_symbol_logo.png'
import { Link , NavLink} from 'react-router'
import "../css/public_nav.css"

const publicNav = () => {
  const [navOn, setNavOn] = useState( false )

  return (
    <>
      <nav id='public_nav'>
          <Link to="/"><img src={logo} alt="" /></Link>        
          <ul>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>About</p></NavLink></li>
            <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Portfolio</p></NavLink></li>
            <li><NavLink to="/articles" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Articles</p></NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Contact</p></NavLink></li>
          </ul>
      </nav>
      <button id="p_mnav_btn" onClick={() => {setNavOn(!navOn)}}>&#9776;</button>

      <nav id="public_mobile_nav" className={navOn? "on": ""}>       
          <ul>
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Home</p></NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>About</p></NavLink></li>
            <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Portfolio</p></NavLink></li>
            <li><NavLink to="/articles" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Articles</p></NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'nav_link current' : 'nav_link'}><p>Contact</p></NavLink></li>
          </ul>      
      </nav>
    </>
  )
}

export default publicNav