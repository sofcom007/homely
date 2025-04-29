import React from 'react'
import { Link } from 'react-router'
//import css
import '../css/general.css'
//import img
import textLogo from '../assets/images/branding/homely_text_symbol_logo.png'

const errorPage = () => {
  return (
    <div id='not_found'>
      <img src={textLogo} alt="" style={{ width: '200px', maxWidth: '100%' }} />
      <h1>Page Not Found</h1>
      <h2>Try going to: </h2>
      <ul>
        <li><Link to={'/'}><p>Home</p></Link></li>
        <li><Link to={'/about'}><p>About</p></Link></li>
        <li><Link to={'/portfolio'}><p>Portfolio</p></Link></li>
        <li><Link to={'/articles'}><p>Articles</p></Link></li>
        <li><Link to={'/contact'}><p>Contect</p></Link></li>
      </ul>
    </div>
  )
}

export default errorPage
