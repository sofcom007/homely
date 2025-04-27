import React, { useEffect } from 'react'
import { Outlet } from "react-router"
//import components
import AdminNav from '../components/adminNav'
import AdminFooter from '../components/adminFooter'
//import css
import '../css/admin_general.css'

const adminLayout = () => {
  return (
    <div id='admin_layout'>
      <AdminNav />

      <main id='admin_main'>
        <Outlet />
        <AdminFooter />
      </main>
    </div>
  )
}

export default adminLayout