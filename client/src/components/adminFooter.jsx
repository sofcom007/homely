import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/images/branding/homely_text_symbol_logo.png'

const adminFooter = () => {
  return (
    <footer id='admin_footer' className='topped bottomed fixed_lefted righted'>
      <img src={logo} alt="" />
      <ul>
        <li><Link to='/'><p>Home</p></Link></li>
        <li><Link to='/about'><p>About</p></Link></li>
        <li><Link to='/portfolio'><p>Portfolio</p></Link></li>
        <li><Link to='/articles'><p>Articles</p></Link></li>
        <li><Link to='/contact'><p>Contact</p></Link></li>
      </ul>
    </footer>
  )
}

export default adminFooter
