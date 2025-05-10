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

  //check if not authenticated
  const [authenticated, setAuthenticated] = useState(false)
  async function checkAuth() {
    try {
      const response = await fetch(`${backendUrl}/users/check-authenticated`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setAuthenticated(true);
      } else {
        navigate('/login'); // token is missing, invalid, or expired
      }
    } catch (error) {
      console.error("Error checking authentication", error);
      alert("Could not check authentication status");
    }
  }

  useEffect(() => {
    //check authentication
    const checkAlrAuth = async () => {
      await checkAuth()
    }
    checkAlrAuth()
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
      : <h1>Loading</h1>}
    </>
  )
}

export default adminLayout