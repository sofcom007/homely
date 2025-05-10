import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from "react-router"
//api url
import { useApiUrl } from '../context/apiContext'
//import components
import AdminNav from '../components/adminNav'
import AdminFooter from '../components/adminFooter'
//import css
import '../css/admin_general.css'

const adminLayout = () => {

  //naviagate
  const navigate = useNavigate()
  
  //url
  const backendUrl = useApiUrl()

  //token
  const token = localStorage.getItem('token')
  console.log(token)

  //check if not authenticated
  const [authenticated, setAuthenticated] = useState(false)
  async function checkNotAuth () {
    try {
      const response = await fetch(`${backendUrl}/users/check-unauthenticated`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(response.status === 200)
        return navigate('/login')
      setAuthenticated(true)
    } catch (error) {
      console.error("Error checking if not authenticated", error)
      alert("Error: Couldn't check if not authenticated")
    }
  }

  useEffect(() => {
    //check authentication
    const checkAuth = async () => {
      await checkNotAuth()
    }
    checkAuth()
  }, [])

  return (
    <>
      {authenticated? 
      <div id='admin_layout'>
        <AdminNav />

        <main id='admin_main'>
          <Outlet />
          <AdminFooter />
        </main>
      </div>
      : <h1>You're not authenticated</h1>}
    </>
  )
}

export default adminLayout