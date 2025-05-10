import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useEffect, useState, useRef } from 'react'
//api url
import { useApiUrl } from '../context/apiContext'

const login = () => {  

  const navigate = useNavigate()

  //url
  const backendUrl = useApiUrl()

  //token
  const token = localStorage.getItem('token')

  //check if already authenticated
  async function checkAltAuth () {
    if(token) {
      try {
        const response = await fetch(`${backendUrl}/users/check-authenticated`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(response.status === 200) {
          navigate('/the-under-belly')
        }
      } catch (error) {
        alert("Error: Couldn't check if already authenticated")
        console.error("Error checking if already authenticated", error)
      }
    }
  }
  checkAltAuth()
  
  //log in
  const usernameFieldRef = useRef()
  const passwordFieldRef = useRef()
  async function logIn() {
    try {
      //assemble request body
      const formData = JSON.stringify({
        email: usernameFieldRef.current.value,
        password: passwordFieldRef.current.value
      })

      //make request
      const response = await fetch(`${backendUrl}/users/login`,{
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: formData,
        credentials: 'include'
      })
      const result = await response.json()
      if(result.error)
        alert(result.error)
      
      localStorage.setItem('token', result.token)

      if(response.status === 200)
        navigate('/the-under-belly')

    } catch (error) {
      console.error("Error logging in:", error)
      alert("Error: couldn't log in")
    }
  }
  
  useEffect(() => {
    document.title = "Login | Homely Admin"
  }, [])

  return (
    <section id='login_sec'>
        <h1>Login</h1>
        <form method='GET' action="/login">
            <input ref={usernameFieldRef} type="text" name="username" id="" placeholder='Email or username' required />
            <input ref={passwordFieldRef} type="password" name="password" id="" placeholder='Password' required />
            <button type="button" className='cta' style={{ width: '100%' }} onClick={async () => { await logIn() }}><p>Login</p></button>
        </form>
        <ul>
          <li><Link to={'/'}><p>Home</p></Link></li>
          <li><Link to={'/about'}><p>About</p></Link></li>
          <li><Link to={'/portfolio'}><p>Portfolio</p></Link></li>
          <li><Link to={'/articles'}><p>Articles</p></Link></li>
          <li><Link to={'/contact'}><p>Contact</p></Link></li>
        </ul>
    </section>
  )
}

export default login