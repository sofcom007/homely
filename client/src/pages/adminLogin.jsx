import React from 'react'
import { Link } from 'react-router'
//api url
import { useApiUrl } from '../context/apiContext'

const adminLogin = () => {
  return (
    <section id='login_sec'>
        <h1>Login</h1>
        <form action="">
            <input type="text" name="" id="" placeholder='Email or username' />
            <input type="password" name="" id="" placeholder='Password' />
            <button type="button" className='cta' style={{ width: '100%' }}><p>Login</p></button>
            <ul>
                <li><Link to={'/'}><p>Home</p></Link></li>
                <li><Link to={'/about'}><p>About</p></Link></li>
                <li><Link to={'/portfolio'}><p>Portfolio</p></Link></li>
                <li><Link to={'/articles'}><p>Articles</p></Link></li>
                <li><Link to={'/contact'}><p>Contact</p></Link></li>
            </ul>
        </form>
    </section>
  )
}

export default adminLogin